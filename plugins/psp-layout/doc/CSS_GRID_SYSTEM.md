# PSP Layout Plugin v2.0.0 - CSS Grid System

## Overview

The PSP Layout Plugin has been completely refactored to use modern CSS Grid instead of percentage-based flexbox calculations. This provides a cleaner, more maintainable, and more performant grid system.

## Key Changes from v1.x

### From Complex Percentages to Simple Spans
- **Old**: `col-1: '16.29%'` with complex harmonic calculations
- **New**: `col-1: 'span 2'` for MD breakpoint (simple and clear)

### Simplified Breakpoint System
- **SM (0-767px)**: Mobile-first with 2-column capability
- **MD (768px+)**: 7-column system where col-7+ = 100% width
- **LG/XL (1024px+)**: Standard 12-column grid system

## Responsive Behavior

### SM Breakpoint (Mobile-First)
```css
.col-1, .col-2 { grid-column: span 6; }  /* 50% width each */
.col-3+ { grid-column: span 12; }         /* 100% width */
```
- Purpose: Allows 2 small columns side-by-side, larger columns full-width
- Perfect for mobile interfaces with limited screen space

### MD Breakpoint (7-Column System)
```css
.col-1 { grid-column: span 2; }   /* ~16.67% of 12-column grid */
.col-2 { grid-column: span 3; }   /* ~25% of 12-column grid */
.col-3 { grid-column: span 5; }   /* ~41.67% of 12-column grid */
.col-4 { grid-column: span 7; }   /* ~58.33% of 12-column grid */
.col-5 { grid-column: span 9; }   /* ~75% of 12-column grid */
.col-6 { grid-column: span 10; }  /* ~83.33% of 12-column grid */
.col-7+ { grid-column: span 12; } /* 100% width */
```
- Purpose: Proportional columns where col-6 is narrower than 100%
- Allows combinations like col-1 + col-6 to fit on same row

### LG/XL Breakpoints (Standard 12-Column)
```css
.col-1 { grid-column: span 1; }   /* 8.33% */
.col-2 { grid-column: span 2; }   /* 16.67% */
...
.col-12 { grid-column: span 12; } /* 100% */
```
- Standard Bootstrap-style 12-column behavior
- Perfect for desktop layouts with maximum flexibility

## Benefits of CSS Grid Approach

### Performance
- No complex percentage calculations at runtime
- Browser-native CSS Grid optimizations
- Cleaner CSS output

### Maintainability  
- Simple span values instead of hand-tuned percentages
- No more "Perfect Harmonic Theory" calculations
- Easier to understand and modify

### Flexibility
- Better alignment and spacing control
- Automatic wrapping behavior
- Future-proof with CSS Grid evolution

## Migration from v1.x

### HTML Changes
- No changes required to HTML structure
- Same `.rack` containers and `.col-N` classes

### CSS Changes
- Old percentage-based widths replaced with `grid-column: span N`
- Simplified responsive breakpoints
- Removed complex offset calculations

### Configuration Changes
- `RACK_COLUMNS` now contains span strings instead of percentages
- Removed `OFFSETS` (handled by CSS Grid directly)
- Simplified `VIEWPORTS` definitions

## Usage Examples

### Basic Grid
```html
<div class="rack">
  <div class="col-6">Half width</div>
  <div class="col-6">Half width</div>
</div>
```

### Responsive Grid
```html
<div class="rack">
  <div class="col-2">Small on mobile, proportional on MD+</div>
  <div class="col-8">Large on all breakpoints</div>
  <div class="col-2">Small matching first column</div>
</div>
```

### Mixed Column Sizes
```html
<div class="rack">
  <div class="col-1">Narrow (50% on SM, proportional on MD+)</div>
  <div class="col-6">Medium (100% on SM, 83% on MD, 50% on LG+)</div>
  <div class="col-5">Medium-large (100% on SM, 75% on MD, 41.67% on LG+)</div>
</div>
```

## Developer Notes

### No More Hand-Tuned Values
The v1.x system required extensive hand-tuning of percentage values for visual balance. The CSS Grid system eliminates this complexity by using the browser's native grid calculations.

### Simplified Configuration
The configuration file (`grid-config.js`) is now much simpler and easier to understand. No more complex mathematical formulas or harmonic ratios.

### Future Extensibility
Adding new breakpoints or modifying column behavior is now straightforward - just update the span values in the configuration.