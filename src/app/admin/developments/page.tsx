'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  Building2,
  Search,
  Plus,
  Eye,
  Trash2,
  Star,
  ChevronDown,
  GripVertical,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import {
  adminListDevelopments,
  adminDeleteDevelopment,
  adminToggleFeatured,
  adminUpdateDevelopment,
  adminUpdateDevelopmentStatus,
  adminReorderDevelopments,
} from '@/lib/api'
import { cn, formatNaira } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import DevelopmentEditorPanel from '@/components/admin/DevelopmentEditorPanel'
import type { Development } from '@/types'

type Status = 'for-sale' | 'off-plan' | 'completed' | 'sold-out'

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  'for-sale': { bg: 'bg-green/10', text: 'text-green', label: 'For Sale' },
  'off-plan': { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Off Plan' },
  completed: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Completed' },
  'sold-out': { bg: 'bg-red-100', text: 'text-red-700', label: 'Sold Out' },
}

type Row = Development & { isFeatured?: boolean }

type EditableField = 'name' | 'neighborhood' | 'priceFrom' | 'totalUnits'

interface CellEdit {
  id: string
  field: EditableField
}

export default function AdminDevelopments() {
  const { data: session } = useSession()
  const token = session?.accessToken as string | undefined

  const [developments, setDevelopments] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [toast, setToast] = useState<string | null>(null)
  const [editingCell, setEditingCell] = useState<CellEdit | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [panelId, setPanelId] = useState<string | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    const fetchDevelopments = async () => {
      if (!token) return
      try {
        const res = await adminListDevelopments(token)
        if (res.success && res.data) {
          const items = ((res.data as any).items ?? res.data) as Row[]
          setDevelopments(items)
        }
      } catch (error) {
        console.error('Failed to fetch developments:', error)
        showToast('Failed to load developments')
      } finally {
        setLoading(false)
      }
    }
    fetchDevelopments()
  }, [token])

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Delete this development? This cannot be undone.')) return
    const prev = developments
    setDevelopments((p) => p.filter((d) => d.id !== id))
    try {
      await adminDeleteDevelopment(token, id)
    } catch (e) {
      console.error(e)
      setDevelopments(prev)
      showToast('Delete failed')
    }
  }

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    if (!token) return
    setDevelopments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isFeatured: !featured } : d))
    )
    try {
      await adminToggleFeatured(token, id, !featured)
    } catch (e) {
      console.error(e)
      setDevelopments((prev) =>
        prev.map((d) => (d.id === id ? { ...d, isFeatured: featured } : d))
      )
      showToast('Featured toggle failed')
    }
  }

  const handleStatusChange = async (id: string, status: Status) => {
    if (!token) return
    const prev = developments
    setDevelopments((p) => p.map((d) => (d.id === id ? { ...d, status } : d)))
    try {
      await adminUpdateDevelopmentStatus(token, id, status)
    } catch (e) {
      console.error(e)
      setDevelopments(prev)
      showToast('Status update failed')
    }
  }

  const handleInlineSave = async (id: string, field: EditableField, value: string) => {
    if (!token) {
      setEditingCell(null)
      return
    }
    const prev = developments
    let parsed: string | number = value
    if (field === 'priceFrom' || field === 'totalUnits') {
      parsed = Number(value)
      if (Number.isNaN(parsed)) {
        setEditingCell(null)
        return
      }
    }
    const current = prev.find((d) => d.id === id)
    if (!current || (current as any)[field] === parsed) {
      setEditingCell(null)
      return
    }
    setDevelopments((p) => p.map((d) => (d.id === id ? { ...d, [field]: parsed } : d)))
    setEditingCell(null)
    try {
      await adminUpdateDevelopment(token, id, { [field]: parsed })
    } catch (e) {
      console.error(e)
      setDevelopments(prev)
      showToast('Save failed')
    }
  }

  const toggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filtered = useMemo(
    () =>
      developments.filter((d) => {
        const q = search.toLowerCase()
        const matchesText =
          !q ||
          d.name?.toLowerCase().includes(q) ||
          d.neighborhood?.toLowerCase().includes(q) ||
          d.id?.toLowerCase().includes(q)
        const matchesStatus = statusFilter === 'all' || d.status === statusFilter
        const matchesFeatured = !featuredOnly || d.isFeatured
        return matchesText && matchesStatus && matchesFeatured
      }),
    [developments, search, statusFilter, featuredOnly]
  )

  const allSelected = filtered.length > 0 && filtered.every((d) => selected.has(d.id))
  const toggleAll = () => {
    if (allSelected) setSelected(new Set())
    else setSelected(new Set(filtered.map((d) => d.id)))
  }

  const onDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e
    if (!over || active.id === over.id || !token) return
    // Only allow drag-reorder when no filters/search applied
    const reorderable = !search && statusFilter === 'all' && !featuredOnly
    if (!reorderable) {
      showToast('Clear filters to reorder')
      return
    }
    const prev = developments
    const oldIdx = prev.findIndex((d) => d.id === active.id)
    const newIdx = prev.findIndex((d) => d.id === over.id)
    if (oldIdx < 0 || newIdx < 0) return
    const next = arrayMove(prev, oldIdx, newIdx)
    setDevelopments(next)
    try {
      await adminReorderDevelopments(
        token,
        next.map((d) => d.id)
      )
    } catch (err) {
      console.error(err)
      setDevelopments(prev)
      showToast('Reorder failed')
    }
  }

  const openPanel = (id: string) => {
    setPanelId(id)
    setPanelOpen(true)
  }

  const handleSaved = (dev: Development) => {
    setDevelopments((prev) =>
      prev.map((d) => (d.id === dev.id ? ({ ...d, ...dev } as Row) : d))
    )
    showToast('Saved')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-cormorant text-charcoal text-3xl font-bold">Developments</h2>
          <p className="text-charcoal-light text-sm">
            {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'}
            {selected.size > 0 && ` · ${selected.size} selected`}
          </p>
        </div>
        <Link
          href="/admin/developments/new"
          className="bg-green text-white px-5 py-2.5 rounded-sm text-sm font-medium flex items-center gap-2 w-fit hover:bg-green-dark transition-colors"
        >
          <Plus size={16} /> NEW DEVELOPMENT
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-cream-divider rounded-card p-3 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
          <input
            type="text"
            placeholder="Search by name, ID, or neighborhood…"
            className="w-full pl-10 pr-4 py-2 bg-cream rounded-sm text-sm border border-transparent focus:border-green-tint focus:outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-cream rounded-sm pl-3 pr-9 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-green/20"
            >
              <option value="all">All Status</option>
              <option value="for-sale">For Sale</option>
              <option value="off-plan">Off Plan</option>
              <option value="completed">Completed</option>
              <option value="sold-out">Sold Out</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-light pointer-events-none" />
          </div>
          <label className="flex items-center gap-2 px-3 py-2 bg-cream rounded-sm text-sm text-charcoal cursor-pointer hover:bg-cream-dark transition-colors">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(e) => setFeaturedOnly(e.target.checked)}
              className="accent-green"
            />
            Featured only
          </label>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-cream-divider rounded-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-cream/60 text-left text-[11px] uppercase tracking-widest text-charcoal-light">
                <th className="px-2 py-3 w-8" />
                <th className="px-3 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="accent-green"
                  />
                </th>
                <th className="px-2 py-3 w-20">Image</th>
                <th className="px-2 py-3 w-20">Featured</th>
                <th className="px-3 py-3 w-32">Status</th>
                <th className="px-3 py-3">Listing Title</th>
                <th className="px-3 py-3 w-48">Neighborhood</th>
                <th className="px-3 py-3 w-36 text-right">Price From</th>
                <th className="px-3 py-3 w-24 text-center">Units</th>
                <th className="px-3 py-3 w-32">ID</th>
                <th className="px-3 py-3 w-24 text-right">Actions</th>
              </tr>
            </thead>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext
                items={filtered.map((d) => d.id)}
                strategy={verticalListSortingStrategy}
              >
                <tbody>
                  {loading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                      <tr key={i} className="border-t border-cream-divider">
                        <td colSpan={11} className="px-4 py-4">
                          <div className="h-8 bg-cream animate-pulse rounded-sm" />
                        </td>
                      </tr>
                    ))
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="py-20 text-center">
                        <Building2 size={40} className="mx-auto text-cream-divider mb-3" />
                        <p className="text-charcoal-light italic text-sm">No developments found.</p>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((dev) => (
                      <SortableRow
                        key={dev.id}
                        dev={dev}
                        isSelected={selected.has(dev.id)}
                        editingCell={editingCell}
                        onToggleSelect={() => toggleRow(dev.id)}
                        onToggleFeatured={() =>
                          handleToggleFeatured(dev.id, !!dev.isFeatured)
                        }
                        onDelete={() => handleDelete(dev.id)}
                        onStatusChange={(s) => handleStatusChange(dev.id, s)}
                        onEditCell={(field) => setEditingCell({ id: dev.id, field })}
                        onSaveCell={(field, val) => handleInlineSave(dev.id, field, val)}
                        onCancelEdit={() => setEditingCell(null)}
                        onOpenPanel={() => openPanel(dev.id)}
                      />
                    ))
                  )}
                </tbody>
              </SortableContext>
            </DndContext>
          </table>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-charcoal text-white text-sm px-4 py-2.5 rounded-sm shadow-lg z-50">
          {toast}
        </div>
      )}

      <DevelopmentEditorPanel
        open={panelOpen}
        developmentId={panelId}
        token={token}
        onClose={() => setPanelOpen(false)}
        onSaved={handleSaved}
      />
    </div>
  )
}

// ─── Row ──────────────────────────────────────────────────────────────────────

interface SortableRowProps {
  dev: Row
  isSelected: boolean
  editingCell: CellEdit | null
  onToggleSelect: () => void
  onToggleFeatured: () => void
  onDelete: () => void
  onStatusChange: (s: Status) => void
  onEditCell: (field: EditableField) => void
  onSaveCell: (field: EditableField, val: string) => void
  onCancelEdit: () => void
  onOpenPanel: () => void
}

function SortableRow({
  dev,
  isSelected,
  editingCell,
  onToggleSelect,
  onToggleFeatured,
  onDelete,
  onStatusChange,
  onEditCell,
  onSaveCell,
  onCancelEdit,
  onOpenPanel,
}: SortableRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: dev.id,
  })
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }
  const s = STATUS_STYLES[dev.status] ?? {
    bg: 'bg-cream',
    text: 'text-charcoal',
    label: dev.status,
  }
  const isEditing = (f: EditableField) => editingCell?.id === dev.id && editingCell?.field === f

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={cn(
        'border-t border-cream-divider hover:bg-cream/40 transition-colors group',
        isSelected && 'bg-green-tint/30',
        isDragging && 'bg-cream/60'
      )}
    >
      <td className="px-2 py-3">
        <button
          {...attributes}
          {...listeners}
          className="p-1 text-charcoal-light hover:text-charcoal cursor-grab active:cursor-grabbing opacity-30 group-hover:opacity-100 transition-opacity"
          title="Drag to reorder"
          aria-label="Drag handle"
        >
          <GripVertical size={14} />
        </button>
      </td>
      <td className="px-3 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="accent-green"
        />
      </td>
      <td className="px-2 py-2">
        <button
          onClick={onOpenPanel}
          className="block relative w-14 h-11 rounded-[6px] overflow-hidden bg-cream"
          title="Open editor"
        >
          {dev.images?.[0] ? (
            <Image
              src={dev.images[0]}
              alt={dev.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          ) : (
            <Building2 size={20} className="absolute inset-0 m-auto text-cream-divider" />
          )}
        </button>
      </td>
      <td className="px-2 py-3">
        <button
          onClick={onToggleFeatured}
          className={cn(
            'relative inline-flex h-5 w-9 items-center rounded-full transition-colors',
            dev.isFeatured ? 'bg-green' : 'bg-cream-divider'
          )}
          title="Toggle featured"
          aria-label="Toggle featured"
        >
          <span
            className={cn(
              'inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform',
              dev.isFeatured ? 'translate-x-4' : 'translate-x-0.5'
            )}
          />
        </button>
      </td>
      {/* Status (inline select) */}
      <td className="px-3 py-3">
        <div className="relative inline-block">
          <select
            value={dev.status}
            onChange={(e) => onStatusChange(e.target.value as Status)}
            className={cn(
              'appearance-none cursor-pointer rounded-full pl-2.5 pr-7 py-1 text-[11px] font-semibold border border-transparent focus:outline-none focus:border-green/40',
              s.bg,
              s.text
            )}
          >
            <option value="for-sale">For Sale</option>
            <option value="off-plan">Off Plan</option>
            <option value="completed">Completed</option>
            <option value="sold-out">Sold Out</option>
          </select>
          <ChevronDown size={11} className={cn('absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none', s.text)} />
        </div>
      </td>
      {/* Listing Title (inline editable) */}
      <td className="px-3 py-3 min-w-0">
        {isEditing('name') ? (
          <InlineInput
            initial={dev.name}
            onSave={(v) => onSaveCell('name', v)}
            onCancel={onCancelEdit}
          />
        ) : (
          <button
            onClick={() => onEditCell('name')}
            onDoubleClick={onOpenPanel}
            className="text-left w-full font-semibold text-charcoal hover:text-green transition-colors line-clamp-1"
            title={`${dev.name} — double-click to open editor`}
          >
            {dev.name}
            {dev.tagline && (
              <span className="block text-[11px] font-normal text-charcoal-light line-clamp-1 mt-0.5">
                {dev.tagline}
              </span>
            )}
          </button>
        )}
      </td>
      {/* Neighborhood */}
      <td className="px-3 py-3 text-charcoal-light">
        {isEditing('neighborhood') ? (
          <InlineInput
            initial={dev.neighborhood}
            onSave={(v) => onSaveCell('neighborhood', v)}
            onCancel={onCancelEdit}
          />
        ) : (
          <button
            onClick={() => onEditCell('neighborhood')}
            className="text-left w-full line-clamp-1 hover:text-charcoal transition-colors"
            title={`${dev.neighborhood}, ${dev.city}`}
          >
            {dev.neighborhood}
            {dev.city ? `, ${dev.city}` : ''}
          </button>
        )}
      </td>
      {/* Price From */}
      <td className="px-3 py-3 text-right font-semibold text-charcoal tabular-nums">
        {isEditing('priceFrom') ? (
          <InlineInput
            initial={String(dev.priceFrom ?? '')}
            type="number"
            align="right"
            onSave={(v) => onSaveCell('priceFrom', v)}
            onCancel={onCancelEdit}
          />
        ) : (
          <button
            onClick={() => onEditCell('priceFrom')}
            className="w-full text-right hover:text-green transition-colors"
          >
            {formatNaira(Number(dev.priceFrom))}
          </button>
        )}
      </td>
      {/* Units */}
      <td className="px-3 py-3 text-center text-charcoal tabular-nums">
        {isEditing('totalUnits') ? (
          <InlineInput
            initial={String(dev.totalUnits ?? '')}
            type="number"
            align="center"
            onSave={(v) => onSaveCell('totalUnits', v)}
            onCancel={onCancelEdit}
          />
        ) : (
          <button
            onClick={() => onEditCell('totalUnits')}
            className="w-full text-center hover:text-green transition-colors"
            title="Click to edit total units"
          >
            <span className="font-semibold">{dev.availableUnits}</span>
            <span className="text-charcoal-light"> / {dev.totalUnits}</span>
          </button>
        )}
      </td>
      <td className="px-3 py-3">
        <code className="text-[11px] font-mono text-charcoal-light">{dev.id}</code>
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/developments/${dev.slug}`}
            target="_blank"
            className="p-1.5 hover:bg-cream rounded-sm text-charcoal-light hover:text-green transition-colors"
            title="View public page"
          >
            <Eye size={14} />
          </Link>
          <button
            onClick={onToggleFeatured}
            className={cn(
              'p-1.5 hover:bg-cream rounded-sm transition-colors',
              dev.isFeatured ? 'text-amber-500' : 'text-charcoal-light hover:text-amber-500'
            )}
            title="Toggle featured"
          >
            <Star size={14} fill={dev.isFeatured ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 hover:bg-red-50 rounded-sm text-charcoal-light hover:text-red-600 transition-colors"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  )
}

// ─── Inline editor ────────────────────────────────────────────────────────────

function InlineInput({
  initial,
  type = 'text',
  align = 'left',
  onSave,
  onCancel,
}: {
  initial: string
  type?: 'text' | 'number'
  align?: 'left' | 'right' | 'center'
  onSave: (v: string) => void
  onCancel: () => void
}) {
  const [val, setVal] = useState(initial)
  return (
    <input
      autoFocus
      type={type}
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onBlur={() => onSave(val)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          ;(e.target as HTMLInputElement).blur()
        } else if (e.key === 'Escape') {
          e.preventDefault()
          onCancel()
        }
      }}
      className={cn(
        'w-full px-2 py-1 bg-white border border-green/40 rounded-sm text-sm focus:outline-none focus:border-green',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center'
      )}
    />
  )
}
