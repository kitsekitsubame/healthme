# PSP Debug - Visual Debugging Plugin

> **Advanced Layout Debugging Tools**  
> Created by Pattaya Upara (everysundays@gmail.com)

## Overview

PSP Debug is a comprehensive visual debugging plugin designed for layout systems, providing real-time element inspection, viewport controls, and visual debugging aids for CSS Grid and Flexbox implementations.

## Features

### 🔍 **Visual Element Inspector**
- Real-time element highlighting on hover
- Detailed tooltip with element information:
  - Tag name and ID
  - CSS classes
  - Element dimensions
  - Computed styles

### 📱 **Viewport Controls**
- Breakpoint reference with color coding
- Viewport width indicator
- Responsive design testing
- Mobile, tablet, desktop, and XL breakpoints

### 🎛️ **Debug Mode Toggle**
- Persistent debug state (localStorage)
- Clean UI integration
- Non-intrusive debug controls
- Easy enable/disable functionality

### 🎨 **Smart Positioning**
- Intelligent tooltip positioning
- Avoids screen edge cutoffs
- Context-aware placement
- Full-screen element support

## Installation

### Browser Integration

```html
<!-- Include CSS -->
<link rel="stylesheet" href="/plugins/psp-debug/styles/debug-mode.css">

<!-- Include JavaScript -->
<script src="/plugins/psp-debug/scripts/debug-mode.js"></script>
```

### Plugin Loading

The plugin automatically initializes when the script is loaded, adding debug controls to the page.

## Usage

### Basic Setup

1. **Include Files**: Add CSS and JS files to your HTML
2. **Auto-Initialize**: Plugin loads automatically on page load
3. **Toggle Debug**: Use the debug toggle to enable/disable features

### Debug Controls

#### Toggle Button
- Location: Fixed position in top-left corner
- Function: Enable/disable debug mode
- Persistence: State saved in localStorage

#### Viewport Indicator
- Shows current breakpoint and width
- Color-coded by breakpoint:
  - **Mobile** (sm): Orange
  - **Tablet** (md): Blue  
  - **Desktop** (lg): Green
  - **XL**: Purple

#### Element Inspector
- **Activation**: Enabled when debug mode is on
- **Interaction**: Hover over any element
- **Information**: Shows tag, classes, ID, dimensions

### Breakpoint System

```javascript
const VIEWPORTS = {
  sm: { viewportWidth: 640, description: 'Small devices' },
  md: { viewportWidth: 768, description: 'Medium devices' },
  lg: { viewportWidth: 1024, description: 'Desktop' },
  xl: { viewportWidth: 1280, description: 'Large screens' }
};
```

## Configuration

### Default Settings

```javascript
// Debug mode persistence key
const DEBUG_MODE_KEY = 'twlayout-debug-mode';

// Default viewport configurations
const DEFAULT_VIEWPORTS = [
  { value: 320, label: 'sm: 0-639px', breakpoint: 'sm' },
  { value: 640, label: 'sm: 640px', breakpoint: 'sm' },
  { value: 768, label: 'md: 768px', breakpoint: 'md' },
  { value: 1024, label: 'lg: 1024px', breakpoint: 'lg' },
  { value: 1280, label: 'xl: 1280px', breakpoint: 'xl' }
];
```

### Customization

The plugin can be customized by modifying CSS variables and JavaScript constants:

```css
/* Customize debug colors */
:root {
  --debug-primary: #3b82f6;
  --debug-success: #10b981;
  --debug-warning: #f59e0b;
  --debug-danger: #ef4444;
}
```

## API Reference

### Core Functions

#### `getCurrentBreakpoint()`
Returns the current viewport breakpoint based on window width.

```javascript
const breakpoint = getCurrentBreakpoint();
// Returns: 'sm', 'md', 'lg', or 'xl'
```

#### `updateViewportDisplay()`
Updates the viewport indicator with current width and breakpoint.

#### `enableInspector()`
Activates the element inspector functionality.

#### `disableInspector()`
Deactivates the element inspector functionality.

### Event Handlers

```javascript
// Debug toggle
debugToggleCheckbox.addEventListener('change', function() {
  // Toggle debug mode
});

// Window resize
window.addEventListener('resize', () => {
  updateViewportDisplay();
});
```

## Browser Compatibility

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

### Required Features
- CSS Grid support
- Flexbox support
- Local Storage
- Modern DOM Events

## File Structure

```
psp-debug/
├── package.json          # Plugin configuration
├── README.md             # Documentation
├── scripts/
│   └── debug-mode.js     # Main plugin script (463 lines)
└── styles/
    └── debug-mode.css    # Plugin styles
```

## Integration Examples

### With Layout Systems

```html
<!DOCTYPE html>
<html>
<head>
  <link href="/css/main.css" rel="stylesheet">
  <link href="/plugins/psp-debug/styles/debug-mode.css" rel="stylesheet">
</head>
<body>
  <!-- Your layout content -->
  
  <script src="/plugins/psp-debug/scripts/debug-mode.js"></script>
</body>
</html>
```

### With Grid Systems

The plugin works seamlessly with CSS Grid and Flexbox layouts:

```css
.rack {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

.rail {
  display: flex;
  overflow-x: auto;
}
```

## Performance

- **Lightweight**: ~15KB total (JS + CSS)
- **Efficient**: Event delegation and throttling
- **Non-blocking**: Asynchronous initialization
- **Memory-safe**: Proper cleanup and disposal

## Development

### Plugin Architecture

The plugin follows a modular architecture:

1. **Initialization**: Auto-setup on DOM ready
2. **State Management**: localStorage persistence
3. **Event Handling**: Efficient event delegation
4. **UI Updates**: Throttled viewport updates
5. **Inspector Logic**: Smart positioning algorithms

### Extending the Plugin

To add new debugging features:

1. Add new functions to the main script
2. Update CSS for new UI elements
3. Maintain backward compatibility
4. Document new features

## License

MIT License - Created by Pattaya Upara (everysundays@gmail.com)

## Changelog

### v1.0.0 (2025-07-25)
- Initial release
- Element inspector functionality
- Viewport controls and breakpoint system
- Smart tooltip positioning
- localStorage persistence
- Full browser compatibility

---

*Part of the PSP (Pattaya Studio Project) plugin ecosystem*