#!/usr/bin/env python3
"""
MiddlePark Rebrand: green #00953d + black #0d0e0f
Replaces all hardcoded old color references across the project.
"""

import os, re

SRC = '/Users/mmtsmacbook/Documents/middlepark-website/src'
EXTS = ('.tsx', '.ts', '.css', '.mjs')

# ─── Global replacements (safe everywhere) ─────────────────────────────────
GLOBAL = [
    # Old hex greens → new green
    ('#286B38', '#00953d'),
    ('#1E522A', '#007a33'),
    ('#358A49', '#00b34a'),
    ('#C8D9CC', '#a3d4b8'),
    # Old green tints (F0F4F1 used in globals as --green-tint)
    # Only replace exact CSS variable / inline hardcoded references, not Tailwind class names
    # Old charcoal dark → new black
    ('#1C1C1E', '#0d0e0f'),
    # Old rgba greens (no spaces after comma)
    ('rgba(40,107,56,', 'rgba(0,149,61,'),
    # Old rgba greens (with spaces)
    ('rgba(40, 107, 56,', 'rgba(0, 149, 61,'),
    # AmenityChip bg / border tint (old green-tint)
    ('bg-[#F0F4F1]', 'bg-[#e6f7ed]'),
    ('border-[#C8D9CC]', 'border-[#a3d4b8]'),
    # DevelopmentCard status pills
    ("bg: 'bg-[#286B38]'", "bg: 'bg-[#00953d]'"),
    ("bg-[#286B38]", "bg-[#00953d]"),
    # LoadingSpinner border colors
    ('border-t-[#286B38]', 'border-t-[#00953d]'),
    ('border-r-[#286B38]', 'border-r-[#00953d]'),
    # tailwind.config charcoal-gradient (if present)
    ("'charcoal-gradient': 'linear-gradient(135deg, #3A3A3C 0%, #1C1C1E 100%)'",
     "'charcoal-gradient': 'linear-gradient(135deg, #3A3A3C 0%, #0d0e0f 100%)'"),
]

# ─── File-specific line replacements ────────────────────────────────────────
# Format: { filepath: [(line_number_1based, old, new), ...] }
FILE_SPECIFIC = {
    'lib/design-system.ts': [
        # green.DEFAULT (line 17) — change red → green
        (17, "DEFAULT: '#ED1B24',           // MiddlePark Red — primary CTAs, overlines, active states",
             "DEFAULT: '#00953d',           // MiddlePark Green — primary CTAs, overlines, active states"),
        (18, "dark: '#C41720',              // Deep red — hover/pressed states",
             "dark: '#007a33',              // Deep green — hover/pressed states"),
        (19, "light: '#F04950',             // Lighter red — secondary actions",
             "light: '#00b34a',             // Lighter green — secondary actions"),
        (20, "tint: '#FDF2F2',              // Red tint — subtle hover fills",
             "tint: '#e6f7ed',              // Green tint — subtle hover fills"),
        (21, "muted: '#F5C6C8',             // Muted red — borders, dividers",
             "muted: '#a3d4b8',             // Muted green — borders, dividers"),
        (22, "alpha10: 'rgba(237, 27, 36, 0.10)',",
             "alpha10: 'rgba(0, 149, 61, 0.10)',"),
        (23, "alpha20: 'rgba(237, 27, 36, 0.20)',",
             "alpha20: 'rgba(0, 149, 61, 0.20)',"),
        # Header comment
        (9,  "Palette: MiddlePark Red, Grey, White (Corporate)",
             "Palette: MiddlePark Green, Black, White (Corporate)"),
        (15, "// Note: Structural variable is 'green', but maps to Brand Red",
             "// Primary Brand — MiddlePark Green"),
        (36, "dark: '#1C1C1E',              // Deep Slate — footer, dark sections",
             "dark: '#0d0e0f',              // MiddlePark Black — footer, dark sections"),
    ],
}

def apply_global(content, replacements):
    for old, new in replacements:
        content = content.replace(old, new)
    return content

def apply_file_specific(filepath, lines, specs):
    changed = False
    for lineno, old_text, new_text in specs:
        idx = lineno - 1
        if idx < len(lines):
            stripped_line = lines[idx].rstrip('\n')
            if old_text.strip() in stripped_line:
                lines[idx] = lines[idx].replace(old_text.strip(), new_text.strip())
                print(f"  L{lineno}: replaced in {filepath}")
                changed = True
    return changed

total_files = 0
total_changes = 0

for root, dirs, files in os.walk(SRC):
    # Skip node_modules and .next
    dirs[:] = [d for d in dirs if d not in ('node_modules', '.next', '.git')]
    for fname in files:
        if not fname.endswith(EXTS):
            continue
        fpath = os.path.join(root, fname)
        rel = os.path.relpath(fpath, SRC)

        with open(fpath, 'r', encoding='utf-8') as f:
            original = f.read()

        content = apply_global(original, GLOBAL)
        changed = content != original

        # File-specific line replacements
        if rel in FILE_SPECIFIC:
            lines = content.splitlines(keepends=True)
            file_changed = apply_file_specific(rel, lines, FILE_SPECIFIC[rel])
            if file_changed:
                content = ''.join(lines)
                changed = True

        if changed:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Updated: {rel}")
            total_files += 1

# Also update tailwind.config.ts at project root
TAILWIND = '/Users/mmtsmacbook/Documents/middlepark-website/tailwind.config.ts'
with open(TAILWIND, 'r') as f:
    tw = f.read()
orig_tw = tw
tw = tw.replace("'charcoal-gradient': 'linear-gradient(135deg, #3A3A3C 0%, #1C1C1E 100%)'",
                 "'charcoal-gradient': 'linear-gradient(135deg, #3A3A3C 0%, #0d0e0f 100%)'")
if tw != orig_tw:
    with open(TAILWIND, 'w') as f:
        f.write(tw)
    print("✓ Updated: tailwind.config.ts (charcoal-gradient)")

print(f"\nDone — {total_files} files updated.")
