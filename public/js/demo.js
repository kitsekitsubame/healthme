/**
 * Modern Rack & Rail Grid System Demo Script
 * TDD-tested implementation with CSS Grid and Flexbox
 * Created by Pattaya Upara (everysundays@gmail.com)
 * 
 * This is the canonical demo JS file - all references should point here
 */

// Modern viewport constants matching Tailwind v4 breakpoints
const VIEWPORTS = {
  sm: {
    minWidth: 375,
    maxWidth: 767,
    description: 'Small devices'
  },
  md: {
    minWidth: 768,
    maxWidth: 1023,
    description: 'Medium devices'
  },
  lg: {
    minWidth: 1024,
    maxWidth: 1279,
    description: 'Large devices'
  },
  xl: {
    minWidth: 1280,
    maxWidth: Infinity,
    description: 'Extra large devices'
  }
};

// Rack column grid spans - matches new CSS Grid system
const RACK_COLUMNS = {
  sm: {
    1: 'span 6', 2: 'span 6', 3: 'span 12', 4: 'span 12', 5: 'span 12', 6: 'span 12',
    7: 'span 12', 8: 'span 12', 9: 'span 12', 10: 'span 12', 11: 'span 12', 12: 'span 12'
  },
  md: {
    1: 'span 2', 2: 'span 3', 3: 'span 5', 4: 'span 7', 5: 'span 9', 6: 'span 10',
    7: 'span 12', 8: 'span 12', 9: 'span 12', 10: 'span 12', 11: 'span 12', 12: 'span 12'
  },
  lg: {
    1: 'span 1', 2: 'span 2', 3: 'span 3', 4: 'span 4', 5: 'span 5', 6: 'span 6',
    7: 'span 7', 8: 'span 8', 9: 'span 9', 10: 'span 10', 11: 'span 11', 12: 'span 12'
  },
  xl: {
    1: 'span 1', 2: 'span 2', 3: 'span 3', 4: 'span 4', 5: 'span 5', 6: 'span 6',
    7: 'span 7', 8: 'span 8', 9: 'span 9', 10: 'span 10', 11: 'span 11', 12: 'span 12'
  }
};

// Rail fixed widths (consistent across breakpoints)
const RAIL_WIDTHS = {
  1: '16rem', 2: '20rem', 3: '24rem', 4: '28rem', 5: '32rem', 6: '36rem',
  7: '40rem', 8: '44rem', 9: '48rem', 10: '52rem', 11: '56rem', 12: '100%'
};

// Perfect centering positions
const CENTER_POSITIONS = {
  1: '6 / span 1',   // Column 6, span 1
  2: '6 / span 2',   // Column 6, span 2  
  3: '5 / span 3',   // Column 5, span 3
  4: '5 / span 4',   // Column 5, span 4
  5: '4 / span 5',   // Column 4, span 5
  6: '4 / span 6',   // Column 4, span 6
  7: '3 / span 7',   // Column 3, span 7
  8: '3 / span 8',   // Column 3, span 8
  9: '2 / span 9',   // Column 2, span 9
  10: '2 / span 10', // Column 2, span 10
  11: '1 / span 11'  // Column 1, span 11
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  setupContainerToggle();
  updateBreakpointIndicator();
  updateAllInfo();
});

// Update on window resize
window.addEventListener('resize', function() {
  updateBreakpointIndicator();
  updateAllInfo();
});

// Get current breakpoint
function getCurrentBreakpoint() {
  const width = window.innerWidth;
  
  if (width >= VIEWPORTS.xl.minWidth) return 'xl';
  if (width >= VIEWPORTS.lg.minWidth) return 'lg';
  if (width >= VIEWPORTS.md.minWidth) return 'md';
  return 'sm';
}

// Update breakpoint indicator
function updateBreakpointIndicator() {
  const indicator = document.getElementById('breakpoint-indicator');
  if (!indicator) return;
  
  const breakpoint = getCurrentBreakpoint();
  const viewport = VIEWPORTS[breakpoint];
  
  indicator.textContent = `${breakpoint.toUpperCase()} (${window.innerWidth}px) - ${viewport.description}`;
}

// Format measurements
function formatMeasurement(pixels) {
  const rem = (pixels / 16).toFixed(2);
  return `${Math.round(pixels)}px / ${rem}rem`;
}

// Update all information displays
function updateAllInfo() {
  updateColumnInfo();
  updateOffsetInfo();
  updateRailInfo();
}

// Update column information for rack containers
function updateColumnInfo() {
  const breakpoint = getCurrentBreakpoint();
  const demoContainer = document.getElementById('demo-container');
  if (!demoContainer) return;
  
  const isRail = demoContainer.classList.contains('rail');
  
  // Update main demo columns
  for (let i = 1; i <= 12; i++) {
    const infoElement = document.getElementById(`col-${i}-info`);
    const columnElement = demoContainer.querySelector(`.col-${i}`);
    
    if (infoElement && columnElement) {
      const computedStyle = window.getComputedStyle(columnElement);
      const widthPx = parseFloat(computedStyle.width);
      
      if (isRail) {
        // Rail container info
        const expectedWidth = RAIL_WIDTHS[i];
        infoElement.textContent = `Fixed: ${expectedWidth} / ${formatMeasurement(widthPx)}`;
      } else {
        // Rack container info
        const expectedValue = RACK_COLUMNS[breakpoint][i];
        const percentage = ((widthPx / demoContainer.offsetWidth) * 100).toFixed(1);
        const label = breakpoint === 'sm' ? 'Width' : 'Grid';
        infoElement.textContent = `${label}: ${expectedValue} / ${percentage}% / ${formatMeasurement(widthPx)}`;
      }
    }
  }
  
  // Update responsive examples
  updateResponsiveInfo();
}

// Update responsive column information
function updateResponsiveInfo() {
  const breakpoint = getCurrentBreakpoint();
  const responsiveElements = document.querySelectorAll('[id*="responsive-col-"]');
  
  responsiveElements.forEach(element => {
    const match = element.id.match(/responsive-col-(\d+)-info-\d+/);
    if (!match) return;
    
    const columnSize = parseInt(match[1]);
    const columnElement = element.closest(`.col-${columnSize}`);
    
    if (columnElement) {
      const computedStyle = window.getComputedStyle(columnElement);
      const widthPx = parseFloat(computedStyle.width);
      const containerWidth = columnElement.parentElement.offsetWidth;
      const percentage = ((widthPx / containerWidth) * 100).toFixed(1);
      
      const expectedValue = RACK_COLUMNS[breakpoint][columnSize];
      element.textContent = `${breakpoint}: ${expectedValue} / ${percentage}% / ${formatMeasurement(widthPx)}`;
    }
  });
}

// Update offset information
function updateOffsetInfo() {
  const offsetElements = document.querySelectorAll('[id*="offset-"][id*="-info"]');
  
  offsetElements.forEach(element => {
    const match = element.id.match(/offset-(\d+)-info/);
    if (!match) return;
    
    const offsetSize = parseInt(match[1]);
    const columnElement = element.closest(`.offset-center-${offsetSize}`);
    
    if (columnElement) {
      const computedStyle = window.getComputedStyle(columnElement);
      const gridColumn = computedStyle.gridColumn || 'auto';
      const widthPx = parseFloat(computedStyle.width);
      
      const expectedPosition = CENTER_POSITIONS[offsetSize];
      element.textContent = `Position: ${expectedPosition} / ${formatMeasurement(widthPx)}`;
    }
  });
}

// Update rail container information
function updateRailInfo() {
  const railElements = document.querySelectorAll('[id*="rail-col-"]');
  
  railElements.forEach(element => {
    const match = element.id.match(/rail-col-(\d+)-info/);
    if (!match) return;
    
    const columnSize = parseInt(match[1]);
    const columnElement = element.closest(`.col-${columnSize}`);
    
    if (columnElement) {
      const computedStyle = window.getComputedStyle(columnElement);
      const widthPx = parseFloat(computedStyle.width);
      
      const expectedWidth = RAIL_WIDTHS[columnSize];
      const expectedPx = columnSize === 12 ? widthPx : parseFloat(expectedWidth) * 16;
      
      element.textContent = `Fixed: ${expectedWidth} / ${formatMeasurement(widthPx)}`;
    }
  });
}

// Setup container toggle functionality
function setupContainerToggle() {
  const rackToggle = document.getElementById('rack-toggle');
  const railToggle = document.getElementById('rail-toggle');
  const rackCodeBlock = document.getElementById('rack-code-block');
  const railCodeBlock = document.getElementById('rail-code-block');
  const demoContainer = document.getElementById('demo-container');
  
  if (!rackToggle || !railToggle || !demoContainer) return;
  
  // Rack toggle
  rackToggle.addEventListener('change', function() {
    if (this.checked) {
      demoContainer.className = getDebugModeClass('rack');
      if (rackCodeBlock) rackCodeBlock.style.display = 'block';
      if (railCodeBlock) railCodeBlock.style.display = 'none';
      updateAllInfo();
    }
  });
  
  // Rail toggle
  railToggle.addEventListener('change', function() {
    if (this.checked) {
      demoContainer.className = getDebugModeClass('rail');
      if (rackCodeBlock) rackCodeBlock.style.display = 'none';
      if (railCodeBlock) railCodeBlock.style.display = 'block';
      updateAllInfo();
    }
  });
}


// Get container class with debug mode consideration
function getDebugModeClass(containerType) {
  const isDebugMode = document.body.classList.contains('debug-mode');
  return containerType; // CSS handles debug styling via .debug-mode body class
}

// Utility: Convert rem to pixels
function remToPx(rem) {
  return parseFloat(rem) * 16;
}

// Debug: Log current system state
function debugGridSystem() {
  const breakpoint = getCurrentBreakpoint();
  console.log('Grid System Debug:', {
    breakpoint,
    windowWidth: window.innerWidth,
    rackColumns: RACK_COLUMNS[breakpoint],
    railWidths: RAIL_WIDTHS
  });
}

// Export for testing (if in Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getCurrentBreakpoint,
    VIEWPORTS,
    RACK_COLUMNS,
    RAIL_WIDTHS,
    CENTER_POSITIONS
  };
}