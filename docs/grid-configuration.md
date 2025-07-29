# Grid Configuration Documentation

## Overview

This document contains detailed documentation for the Rack & Rail Grid System configuration. The grid system provides responsive CSS Grid (Rack) and Flexbox (Rail) containers with mobile-first design principles.

## System Constants

- **Container Padding**: 1.5rem (24px) - Standard padding for all containers
- **Gap**: 1rem (16px) - Standard gap between columns  
- **Max Columns**: 12 - Maximum number of columns supported
- **Min Viewport Width**: 320px - Minimum supported viewport width
- **Max Viewport Width**: 3420px - Maximum supported viewport width

## Viewport Breakpoints

The grid system uses responsive breakpoints aligned with Tailwind CSS standards:

| Breakpoint | Viewport Width | Min Width CSS | Container Padding | Available Space | Description |
|------------|----------------|---------------|-------------------|-----------------|-------------|
| xs | 320px | 0 | 16px | 288px | Extra small devices (below sm) |
| sm | 640px | 0 | 24px | 592px | Small devices (0-639px range) |
| md | 768px | 48rem | 32px | 704px | Medium devices |
| lg | 1024px | 64rem | 32px | 960px | Large devices |
| xl | 1280px | 80rem | 32px | 1216px | Extra large devices |
| 2xl | 1536px | 96rem | 32px | 1472px | 2X-Large devices |
| 3xl | 1974px | 123.375rem | 40px | 1894px | 3X-Large devices |
| 4xl | 2560px | 160rem | 48px | 2464px | 4X-Large devices |

## Hand-Tuned Values Documentation

### Rack Columns - Mobile Optimized (xs/sm breakpoints)

**Target**: 320-639px viewports  
**Strategy**: Mobile-first responsive behavior

- **col-1 to col-2**: 47.5% - allows 2 columns per row with gap
- **col-3 to col-12**: 100% - simplified mobile layout
- **Purpose**: Mobile-first responsive behavior with 2-column grid for small components
- **Note**: Reduced from 49.24% to account for 1rem (16px) gap between columns

### Rack Columns - Perfect Harmonic Theory (md breakpoint)

**Target**: 770px viewport (706px available space) with mathematical precision  
**Implementation**: 6-part harmonic ratio system (1:2:3:3:4:5)  
**Available space for side-by-side columns**: 690px (706px - 16px gap)

**Mathematical Foundation**:
- col-1 = 1/6 × 690px = 115px = 16.29%
- col-2 = 2/6 × 690px = 230px = 32.58%  
- col-3 = 3/6 × 690px = 345px = 48.87%
- col-4 = 3/6 × 690px = 345px = 48.87% (EQUAL to col-3)
- col-5 = 4/6 × 690px = 460px = 65.16%
- col-6 = 5/6 × 690px = 575px = 81.44%

**Perfect 100% Verification**:
- col-1 + col-6 = 16.29% + 81.44% = 97.73% + 2.27% gap = 100% ✓
- col-2 + col-5 = 32.58% + 65.16% = 97.74% + 2.26% gap = 100% ✓
- col-3 + col-4 = 48.87% + 48.87% = 97.74% + 2.26% gap = 100% ✓

**Key Features**: col-3/col-4 equal width, complementary pairs scale harmonically  
**Theory**: Based on musical harmony ratios for perfect proportional relationships

### Rack Columns - 12-Column Grid Theory (lg/xl breakpoints)

**Purpose**: Support all combinations of 12-column layouts with gap consideration  
**Method**: 12-column grid system using pure mathematical precision  
**Formula**: column_width = (base_column × n) + (gap_width × (n-1))

- **lg values**: Base column = 64.8px (from 1024px ÷ 12 - gaps)
- **xl values**: Base column = 85.8px (from 1280px ÷ 12 - gaps)

### Rail Columns

**Purpose**: Fixed-width columns for horizontal scrolling layouts  
**Ideal for**: Image galleries, card carousels, horizontal content

**Special Case**: col-12 uses 100% for slide effect (hand-tuned)

### Rail Gaps - Special Gap Handling

**Slide Mode**: Gap matches container padding for seamless slide transitions
- **Purpose**: Prevent next slide from peeking at viewport edge
- **Use case**: Full-screen sliding content (especially col-12)
- **Critical for**: Multi-screen content experiences

### Offset System - Traditional Approach

The grid system supports traditional offset classes using margin-left:

- offset-1: 8.333% (1/12)
- offset-2: 16.667% (2/12)
- offset-3: 25% (3/12)
- offset-4: 33.333% (4/12)
- offset-5: 41.667% (5/12)
- offset-6: 50% (6/12)
- offset-7: 58.333% (7/12)
- offset-8: 66.667% (8/12)
- offset-9: 75% (9/12)
- offset-10: 83.333% (10/12)
- offset-11: 91.667% (11/12)

**Usage Pattern**: offset-* + col-* classes should total 12 columns for perfect layout
- Example: `offset-3 col-6` (3 + 6 + 3 = 12)
- Example: `offset-2 col-8` + `col-2` (2 + 8 + 2 = 12)

## Implementation Notes

### Preservation Guidelines

- **Do NOT revert hand-tuned values** to mathematical calculations
- These values were adjusted through visual testing and use-case optimization
- Changes affect both responsive behavior and visual balance
- xl breakpoint ratios are intentionally non-proportional for better UX

### Responsive Behavior

- **Mobile-first design**: Starts from 375px with intelligent column sizing
- **Automatic adaptation**: col-1 & col-2 = 50% width, col-3+ = 100% width on sm
- **Natural proportions**: All columns use their mathematical proportions on md+

### Testing Requirements

The grid system includes comprehensive test coverage:
- 47 passing Jest tests covering all grid functionality
- jsdom environment for CSS testing
- Responsive behavior validation
- TDD implementation approach

## Technical Implementation

Built with:
- **Tailwind v4**: CSS-first configuration using `@theme` and `@utility`
- **CSS Grid**: 12-column flexible grid for rack containers
- **Flexbox**: Fixed-width columns with horizontal scroll for rail containers
- **CSS Custom Properties**: Configurable gaps, padding, and column widths
- **Mobile-First**: Responsive breakpoints starting from sm (375px)

## Core CSS Structure

```css
@theme {
  --grid-columns: 12;
  --base-gap: 1rem;
  --container-padding: 1.5rem;
}

@utility rack {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: var(--base-gap);
}

@utility rail {
  display: flex;
  gap: var(--base-gap);
  overflow-x: auto;
}
```