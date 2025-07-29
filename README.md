# PSP-ENV Grid System

CSS Grid (Rack) + Flexbox (Rail) layout system with visual debugging tools.

## Quick Start

```bash
npm install       # Install dependencies
npm run build:css # Build CSS
npm test          # Run 60 tests
npm run dev       # Start server + CSS watch
```

View demo: `http://localhost:4567/demo`

## Grid Systems

**Rack (CSS Grid)** - Responsive wrapping columns:
```html
<div class="rack">
  <div class="col-6">50% width</div>
  <div class="col-6">50% width</div>
</div>
```

**Rail (Flexbox)** - Fixed-width scrolling:
```html
<div class="rail">
  <div class="col-3">Fixed width</div>
  <div class="col-3">Fixed width</div>
</div>
```

## Features

- **12-column grid** with mobile-first responsive design
- **Visual debug mode** with element inspector
- **Perfect centering** with offset utilities
- **60 passing tests** with TDD methodology
- **Tailwind CSS v4** integration

## Tech Stack

- **CSS**: Tailwind v4, CSS Grid, Flexbox
- **Backend**: Ruby/Sinatra  
- **Testing**: Jest with jsdom
- **Build**: npm scripts

## Commands

```bash
npm run build:css     # Compile CSS
npm run watch:css     # Watch CSS changes  
npm run test          # Run test suite
npm run test:watch    # Watch tests
npm run dev           # Development server
npm run demo          # Open demo page
```

## Browser Support

Chrome 60+, Firefox 55+, Safari 12+, Edge 79+

*Created by Pattaya Upara (everysundays@gmail.com)*