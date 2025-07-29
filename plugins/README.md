# PSP Plugins - Organized Plugin Ecosystem

> **Professional Plugin Architecture**  
> Created by Pattaya Upara (everysundays@gmail.com)

## Overview

The PSP (Pattaya Studio Project) plugins directory provides a standardized, organized structure for tools, extensions, and plugins used in web development projects. This system promotes modularity, reusability, and maintainability.

## Plugin Directory Structure

```
plugins/
├── manifest.json          # Plugin registry and metadata
├── README.md              # This documentation
├── psp-layout/            # CSS Grid/Flexbox layout system
│   ├── package.json       # Plugin configuration
│   ├── README.md          # Plugin documentation
│   ├── scripts/           # JavaScript functionality
│   ├── styles/            # CSS implementations
│   ├── demo/              # Demo files and examples
│   └── doc/               # Technical documentation
└── psp-debug/             # Visual debugging tools
    ├── package.json       # Plugin configuration  
    ├── README.md          # Plugin documentation
    ├── scripts/           # Debug functionality
    └── styles/            # Debug UI styles
```

## Available Plugins

### 🎨 PSP Layout (psp-layout)
**Advanced CSS Grid and Flexbox Layout System**

- **Version**: 2.0.0
- **Type**: Layout System
- **Features**:
  - CSS Grid (Rack) containers with 12-column system
  - Flexbox (Rail) containers with fixed widths
  - Mobile-first responsive design
  - Perfect centering utilities
  - TDD-tested implementation

**Usage**:
```html
<link href="/plugins/psp-layout/demo/demo.css" rel="stylesheet">
<script src="/plugins/psp-layout/demo/demo.js"></script>
```

### 🔍 PSP Debug (psp-debug)
**Visual Debugging and Inspection Tools**

- **Version**: 1.0.0  
- **Type**: Debug Tools
- **Features**:
  - Real-time element inspector
  - Viewport controls and breakpoint indicators
  - Smart tooltip positioning
  - Persistent debug state
  - Non-intrusive UI integration

**Usage**:
```html
<link href="/plugins/psp-debug/styles/debug-mode.css" rel="stylesheet">
<script src="/plugins/psp-debug/scripts/debug-mode.js"></script>
```

## Plugin Standards

### Naming Convention
- **Format**: `psp-{plugin-name}`
- **Examples**: `psp-layout`, `psp-debug`, `psp-forms`
- **Rules**: Lowercase, hyphen-separated, descriptive

### Required Files
Every plugin must include:
- `package.json` - Plugin configuration and metadata
- `README.md` - Comprehensive documentation

### Optional Structure
```
psp-{name}/
├── package.json       # Required
├── README.md          # Required  
├── scripts/           # JavaScript files
├── styles/            # CSS files
├── demo/              # Demo and example files
├── doc/               # Technical documentation
├── tests/             # Test files
└── assets/            # Images, fonts, etc.
```

### Version Management
- **System**: Semantic Versioning (semver)
- **Format**: MAJOR.MINOR.PATCH
- **Examples**: 1.0.0, 2.1.5, 1.0.0-beta.1

## Plugin Manifest

The `manifest.json` file serves as a central registry:

```json
{
  "plugins": {
    "psp-layout": {
      "name": "PSP Layout",
      "version": "2.0.0",
      "description": "Advanced CSS Grid and Flexbox layout system",
      "type": "layout-system",
      "status": "active",
      "author": "Pattaya Upara <everysundays@gmail.com>"
    }
  }
}
```

## Integration Patterns

### Single Plugin Integration
```html
<!-- For specific functionality -->
<link href="/plugins/psp-layout/demo/demo.css" rel="stylesheet">
<script src="/plugins/psp-layout/demo/demo.js"></script>
```

### Multiple Plugin Integration  
```html
<!-- Layout system -->
<link href="/plugins/psp-layout/demo/demo.css" rel="stylesheet">

<!-- Debug tools (development only) -->
<link href="/plugins/psp-debug/styles/debug-mode.css" rel="stylesheet">

<!-- Scripts -->
<script src="/plugins/psp-layout/demo/demo.js"></script>
<script src="/plugins/psp-debug/scripts/debug-mode.js"></script>
```

### Conditional Loading
```html
<!-- Debug tools only in development -->
<% if development? %>
  <link href="/plugins/psp-debug/styles/debug-mode.css" rel="stylesheet">
  <script src="/plugins/psp-debug/scripts/debug-mode.js"></script>
<% end %>
```

## Plugin Development Guidelines

### Creating a New Plugin

1. **Create Directory**:
   ```bash
   mkdir plugins/psp-{name}
   cd plugins/psp-{name}
   ```

2. **Initialize Package**:
   ```json
   {
     "name": "psp-{name}",
     "version": "1.0.0",
     "description": "Plugin description",
     "author": "Your Name <email@example.com>",
     "license": "MIT"
   }
   ```

3. **Create Documentation**:
   ```markdown
   # PSP {Name} - Plugin Description
   > Created by Your Name (email@example.com)
   
   ## Overview
   Plugin functionality description...
   ```

4. **Update Manifest**:
   Add entry to `plugins/manifest.json`

### Code Standards
- **JavaScript**: ES2015+ syntax, clear function names
- **CSS**: Modern CSS features, custom properties, mobile-first
- **Documentation**: Comprehensive README with examples
- **Licensing**: MIT License preferred

### Testing Requirements
- Unit tests for core functionality
- Browser compatibility testing
- Integration testing with other plugins
- Performance impact assessment

## Plugin Types

### Layout Systems (`layout-system`)
- Grid systems and layout utilities
- Responsive design frameworks
- CSS architecture tools

### Debug Tools (`debug-tools`)  
- Visual debugging aids
- Development utilities
- Performance monitoring tools

### UI Components (`ui-components`)
- Reusable interface elements
- Form controls and inputs
- Navigation components

### Utilities (`utilities`)
- Helper functions and tools
- Build process enhancements
- Development workflow tools

## Browser Compatibility

### Minimum Requirements
- **Chrome**: 57+ (CSS Grid support)
- **Firefox**: 52+ (CSS Grid support)
- **Safari**: 12+ (Modern CSS support)
- **Edge**: 16+ (CSS Grid support)

### Feature Requirements
- CSS Grid and Flexbox support
- CSS Custom Properties
- Modern JavaScript (ES2015+)
- Local Storage (for state persistence)

## Performance Guidelines

### File Size Limits
- **JavaScript**: < 50KB per plugin (minified)
- **CSS**: < 25KB per plugin (minified)
- **Total**: < 100KB per plugin (all assets)

### Loading Strategy
- Lazy loading for non-critical plugins
- Async loading when possible
- Conditional loading based on features needed

## Maintenance

### Update Schedule
- **Major Updates**: Annually or for breaking changes
- **Minor Updates**: Quarterly for new features
- **Patch Updates**: As needed for bug fixes

### Documentation Updates
- Keep README files current
- Update manifest.json for all changes
- Maintain changelog for version history

## Contributing

### Adding New Plugins
1. Follow naming conventions
2. Include required documentation
3. Update manifest.json
4. Test browser compatibility
5. Submit for review

### Modifying Existing Plugins
1. Maintain backward compatibility
2. Update version numbers appropriately
3. Document all changes
4. Test integration with other plugins

## License

MIT License - All plugins created by Pattaya Upara (everysundays@gmail.com)

Individual plugins may have their own licensing terms - check plugin-specific README files.

---

*Part of the PSP (Pattaya Studio Project) ecosystem - Professional web development tools and frameworks*