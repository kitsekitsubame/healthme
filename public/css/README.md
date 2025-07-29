# CSS Organization Structure

This directory contains all CSS files organized for single source of truth.

## Directory Structure

```
/public/css/
├── main.css              # Compiled Tailwind CSS with all utilities
├── tailwind.css          # Source Tailwind configuration 
├── pages/
│   └── home.css          # Home page specific decorative styles
└── components/
    └── demo.css          # Demo page component styles
```

## Core Files

- **main.css**: Primary stylesheet with all compiled Tailwind utilities, grid system, and base styles
- **tailwind.css**: Source configuration using Tailwind v4 `@theme` and `@utility` syntax

## Page-Specific Styles

Files in `/pages/` contain styling specific to individual pages:
- **home.css**: Removable decorative styling for the home page with pastel theme

## Component Styles

Files in `/components/` contain reusable styling for specific components:
- **demo.css**: Enhanced styling for the grid system demo with interactive elements

## Usage Guidelines

1. **Core styles**: Always include `main.css` in all pages
2. **Page styles**: Include relevant page-specific CSS only when needed
3. **Component styles**: Include component CSS when using those specific components
4. **Removable decorations**: Page-specific CSS can be disabled by commenting out the link tag

## Single Source of Truth

All CSS files here are the canonical versions. The `/plugins/` directory maintains the original plugin structure but views should reference files from `/public/css/` for consistency.