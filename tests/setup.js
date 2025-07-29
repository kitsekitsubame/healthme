/**
 * Jest setup file for grid system testing
 * Provides utilities for testing CSS properties and responsive behavior
 */

// Mock CSS parsing and computed styles
global.getComputedStyle = jest.fn();

// Utility functions for testing
global.testUtils = {
  // Create a DOM element with CSS classes
  createElement(tagName, classes = '', innerHTML = '') {
    const element = document.createElement(tagName);
    if (classes) element.className = classes;
    if (innerHTML) element.innerHTML = innerHTML;
    document.body.appendChild(element);
    return element;
  },

  // Clean up DOM after tests
  cleanup() {
    document.body.innerHTML = '';
    this._mockStyles.clear();
  },

  // Set viewport width for responsive testing
  setViewport(width) {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    window.dispatchEvent(new Event('resize'));
  },

  // Get CSS Grid properties
  getGridColumns(selector) {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Element ${selector} not found`);
    return window.getComputedStyle(element).gridTemplateColumns;
  },

  // Get Flexbox properties
  getDisplay(selector) {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Element ${selector} not found`);
    return window.getComputedStyle(element).display;
  },

  // Get overflow properties
  getOverflowX(selector) {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Element ${selector} not found`);
    return window.getComputedStyle(element).overflowX;
  },

  // Get grid column span
  getGridColumn(selector) {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Element ${selector} not found`);
    return window.getComputedStyle(element).gridColumn;
  },

  // Get grid column start position
  getGridColumnStart(selector) {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Element ${selector} not found`);
    return window.getComputedStyle(element).gridColumnStart;
  },

  // Store mocked CSS values for multiple selectors
  _mockStyles: new Map(),

  // Mock CSS values for testing
  mockCSS(selector, properties) {
    // Clean up !important flags for testing
    const cleanProperties = {};
    Object.keys(properties).forEach(key => {
      let value = properties[key];
      if (typeof value === 'string' && value.includes('!important')) {
        value = value.replace(' !important', '');
      }
      cleanProperties[key] = value;
    });
    
    // Store the mocked styles
    this._mockStyles.set(selector, cleanProperties);
    
    // Update the global getComputedStyle mock
    global.getComputedStyle.mockImplementation((element) => {
      // Check all stored mock styles
      for (const [mockSelector, mockProperties] of this._mockStyles) {
        // Handle class-based selectors
        if (mockSelector.startsWith('.')) {
          const className = mockSelector.substring(1);
          if (element.classList && element.classList.contains(className)) {
            return mockProperties;
          }
        }
        
        // Handle element.matches() for complex selectors
        if (element.matches && element.matches(mockSelector)) {
          return mockProperties;
        }
      }
      
      return {};
    });
  },

  // Load CSS content for testing
  loadCSS(cssContent) {
    const style = document.createElement('style');
    style.textContent = cssContent;
    document.head.appendChild(style);
    return style;
  }
};

// Clean up after each test
afterEach(() => {
  global.testUtils.cleanup();
  jest.clearAllMocks();
});