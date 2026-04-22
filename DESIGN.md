# AIPSA Premium Enterprise ERP Design System

## Purpose
National-level SaaS platform for managing 1000+ private schools across India with premium, data-dense interface for super admins, school administrators, teachers, and finance teams.

## Visual Direction
**Luxury + Industrial Precision**: Dark-mode-first, cool palette (deep navy primary, electric blue accents), glassmorphic layering, minimal radius, enterprise trust. Benchmark: Stripe, Linear, SAP SuccessFactors.

## Tone
Refined, trustworthy, authoritative. No playfulness. Clarity and precision for mission-critical operations (student records, financials, compliance).

## Differentiation
- **Glassmorphic cards** with `backdrop-blur-md` layered over deep blue backgrounds
- **Data-dense KPI tiles** with trend indicators (↑ green, ↓ red) in tabular rhythm
- **Cool navy palette** (L:60 primary) with electric blue accents (L:65) for actionable states
- **Micro-animations** on all interactive elements (0.3s cubic-bezier)
- **Collapsible sidebar** with electric blue active states; role switcher in header

## Color Palette (Dark Mode Primary)

| Token | Purpose | OKLCH | Sample |
|-------|---------|-------|--------|
| `--primary` | Deep navy, page background, cards | 60 0.01 264 | Primary brand |
| `--accent` | Electric blue, CTAs, active states | 65 0.22 258 | Data-actionable |
| `--success` | Emerald green, metrics, approvals | 62 0.15 148 | Growth indicators |
| `--warning` | Amber, cautions, expiry | 72 0.18 74 | Attention-grabbing |
| `--destructive` | Red, errors, critical actions | 60 0.20 25 | Urgent states |
| `--muted` | Dark slate, secondary surfaces | 25 0.01 268 | Neutral depth |
| `--border` | Cool grey borders, inputs | 22 0.005 264 | Subtle separation |
| `--foreground` | Off-white text | 93 0 0 | Primary text |

## Typography

| Type | Family | Weights | Use |
|------|--------|---------|-----|
| Display | General Sans | 500, 600, 700 | Module titles, dashboard headers, KPI labels |
| Body | DM Sans | 400, 500, 600 | Content, table data, form labels, nav items |
| Mono | JetBrains Mono | 400, 500 | Amounts, IDs, codes, system feedback |

**Type Scale**: 12px (caption) → 14px (body) → 16px (body-lg) → 18px (subtitle) → 20px (title) → 28px (heading-2) → 36px (heading-1).

## Shape Language
- **Radius**: `0.375rem` (sharp, industrial, modern — not rounded)
- **Cards**: `rounded-lg` with `border border-border/30`
- **Glass effect**: `.glass` utility — `bg-card/40 backdrop-blur-md border-border/30`
- **Buttons**: `rounded-sm` for primary action, `rounded-md` for secondary
- **Inputs**: `rounded-md` with `bg-input/50`

## Elevation & Depth

| Zone | Technique | Usage |
|------|-----------|-------|
| **Base** | `bg-primary` + dark navy | Page background (L:10) |
| **Card** | Glassmorphic `bg-card/40` | Content containers (L:16) |
| **Popover** | Higher opacity `bg-card/60` | Modals, dropdowns (L:20) |
| **Elevated** | `shadow-glass-elevated` | Floating panels (8px blur, 0.3 opacity) |
| **Interactive** | Borders shift `border-border/30` → `/50` on hover | No drop shadows |

## Structural Zones

| Zone | Treatment | Intent |
|------|-----------|--------|
| **Header** | Solid `bg-primary` with `border-b border-border` | Search, role switcher, notifications, profile menu |
| **Sidebar** | Gradient navy `bg-primary` with collapsible state | Primary navigation; active item uses `bg-accent` |
| **Main Content** | `bg-background` (L:10 navy) with card grid | Data-dense layout, KPI tiles, tables, charts |
| **KPI Dashboard** | Glassmorphic grid (3–4 cols) with trend indicators | Key metrics, state-wise stats, sales pipeline |
| **Data Tables** | Alternating rows (`bg-card/30` / `bg-card/20`) | Scannable financial records, student lists |
| **Footer** | Minimal `bg-primary` with `border-t` | Copyright, legal links only |

## Spacing & Rhythm
- **Container padding**: `2rem` (32px) for mobile, `3rem` (48px) for desktop
- **Card padding**: `1.5rem` (24px)
- **Gap between sections**: `2rem` (32px)
- **Sidebar width**: `280px` (expanded), `80px` (collapsed)
- **Mobile breakpoint**: `768px` (tablet cutoff)

## Component Patterns
- **Cards**: `.glass` + `p-6` + title/content/footer structure
- **KPI Tiles**: `.kpi-tile` + numerical value (large, mono) + label + trend (↑/↓ with color)
- **Buttons**: Primary (electric blue bg, white text), Secondary (inverted), Tertiary (text-only)
- **Form inputs**: `bg-input/50` with `border-border` focus ring in electric blue
- **Sidebar items**: Hover state uses `bg-accent/10` until active (then `bg-accent`)
- **Modals/popovers**: Use higher opacity glass effect with 1px border

## Motion & Micro-interactions
- **Transition default**: `transition-smooth` (0.3s cubic-bezier(0.4, 0, 0.2, 1))
- **Entry animations**: `.fade-in` (0.3s opacity), `.slide-up` (0.3s translate + opacity)
- **Loading states**: `.pulse-soft` (2s pulse at 70% opacity)
- **Hover effects**: Borders and backgrounds brighten; interactive elements subtly expand
- **No animation**: Avoid bounce, rotate, or high-energy effects — maintain enterprise trust

## Constraints & Anti-Patterns
- ❌ No drop shadows — only borders and opacity layers create depth
- ❌ No gradients on text or full backgrounds — used sparingly on accent elements only
- ❌ No rounded buttons — keep radius minimal for industrial precision
- ❌ No decorative elements — every pixel serves data or navigation
- ❌ No animations on scroll — only on user interaction or data state change

## Signature Detail
**Glassmorphic stacking**: KPI tiles and card panels layer over a deep navy gradient background with `backdrop-blur-md` at 40% opacity. This creates a premium "floating" effect while maintaining data density and dark mode comfort. Borders use `border-border/30` (subtle separation without visual noise).

## Accessibility & Responsive
- **WCAG AA+ contrast**: All text/bg pairs verified for dark mode
- **Focus states**: Electric blue ring (`ring-2 ring-accent`) on keyboard navigation
- **Mobile-first**: Sidebar collapses to hamburger menu below 768px; cards stack single-column
- **Touch targets**: Minimum 44px height for interactive elements
- **Reduced motion**: Respect `prefers-reduced-motion` via `@media` queries
