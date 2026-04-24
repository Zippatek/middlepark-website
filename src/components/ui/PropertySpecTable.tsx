'use client'

import React from 'react'

interface PropertySpecTableProps {
  specs: {
    label: string
    value: string | number
    isBold?: boolean
  }[]
}

export default function PropertySpecTable({ specs }: PropertySpecTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-sm border border-cream-border bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <tbody>
          {specs.map((spec, index) => (
            <tr 
              key={index} 
              className={`${index !== specs.length - 1 ? 'border-bottom border-cream-border' : ''} hover:bg-[#F0F4F1] transition-colors`}
            >
              <td className="py-4 px-6 text-xs uppercase tracking-widest text-green font-semibold w-1/3">
                {spec.label}
              </td>
              <td className={`py-4 px-6 text-base text-charcoal ${spec.isBold ? 'font-bold' : 'font-medium'}`}>
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .border-bottom {
          border-bottom: 1px solid #F8F7F3;
        }
      `}</style>
    </div>
  )
}
