# JavaScript Organization Structure

This directory contains all JavaScript files for direct public access.

## Directory Structure

```
/public/js/
└── demo.js               # Grid system demo functionality
```

## Core Files

- **demo.js**: Complete functionality for the grid system demo page including:
  - Viewport breakpoint detection (sm/md/lg/xl)
  - Container toggle (rack/rail) functionality  
  - Real-time measurement display
  - Responsive behavior indicators

## Features

### Viewport Management
- Modern Tailwind v4 compatible breakpoints (sm, md, lg, xl)
- Real-time breakpoint indicator
- Responsive column span calculations

### Interactive Demos
- Container type switching (CSS Grid vs Flexbox)
- Live measurement updates
- Column width calculations in pixels, rem, and percentages

### Grid System Testing
- Comprehensive measurement display
- Responsive behavior validation
- Real-time updates on window resize

## Single Source of Truth

All JavaScript files here are the canonical versions for public access. The original plugin versions in `/plugins/psp-layout/demo/` are maintained for plugin structure but views should reference files from `/public/js/` for consistency.

## Usage

Include in ERB views as:
```erb
<script src="/js/demo.js"></script>
```

## Testing Support

The demo.js file includes export functionality for Node.js testing environments, enabling comprehensive test coverage of grid system functionality.