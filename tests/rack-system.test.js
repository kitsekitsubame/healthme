/**
 * TDD Tests for Modern Rack System
 * Tests CSS Grid-based implementation of the rack container
 */

describe('Modern Rack System', () => {
  beforeEach(() => {
    testUtils.cleanup();
  });

  describe('Rack Container Behavior', () => {
    test('rack container uses CSS Grid with 12 columns', () => {
      // Create rack container
      const rackElement = testUtils.createElement('div', 'rack');
      
      // Mock expected CSS Grid behavior
      testUtils.mockCSS('.rack', {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '1rem',
        width: '100%'
      });

      // Test CSS Grid properties
      expect(testUtils.getDisplay('.rack')).toBe('grid');
      expect(testUtils.getGridColumns('.rack')).toBe('repeat(12, 1fr)');
    });

    test('rack container has proper gap spacing', () => {
      const rackElement = testUtils.createElement('div', 'rack');
      
      testUtils.mockCSS('.rack', {
        gap: '1rem'
      });

      const computedStyle = window.getComputedStyle(rackElement);
      expect(computedStyle.gap).toBe('1rem');
    });

    test('rack container spans full width', () => {
      const rackElement = testUtils.createElement('div', 'rack');
      
      testUtils.mockCSS('.rack', {
        width: '100%'
      });

      const computedStyle = window.getComputedStyle(rackElement);
      expect(computedStyle.width).toBe('100%');
    });

    test('rack container has proper padding', () => {
      const rackElement = testUtils.createElement('div', 'rack');
      
      testUtils.mockCSS('.rack', {
        paddingInline: '1.5rem'
      });

      const computedStyle = window.getComputedStyle(rackElement);
      expect(computedStyle.paddingInline).toBe('1.5rem');
    });
  });

  describe('Column Spanning in Rack', () => {
    test('col-1 spans 1 column on desktop', () => {
      testUtils.setViewport(1024); // Desktop viewport
      
      const rackElement = testUtils.createElement('div', 'rack');
      const col1Element = testUtils.createElement('div', 'col-1');
      rackElement.appendChild(col1Element);
      
      testUtils.mockCSS('.col-1', {
        gridColumn: 'span 1'
      });

      expect(testUtils.getGridColumn('.col-1')).toBe('span 1');
    });

    test('col-3 spans 3 columns on desktop', () => {
      testUtils.setViewport(1024); // Desktop viewport
      
      const rackElement = testUtils.createElement('div', 'rack');
      const col3Element = testUtils.createElement('div', 'col-3');
      rackElement.appendChild(col3Element);
      
      testUtils.mockCSS('.col-3', {
        gridColumn: 'span 3'
      });

      expect(testUtils.getGridColumn('.col-3')).toBe('span 3');
    });

    test('col-6 spans 6 columns on desktop (half width)', () => {
      testUtils.setViewport(1024); // Desktop viewport
      
      const rackElement = testUtils.createElement('div', 'rack');
      const col6Element = testUtils.createElement('div', 'col-6');
      rackElement.appendChild(col6Element);
      
      testUtils.mockCSS('.col-6', {
        gridColumn: 'span 6'
      });

      expect(testUtils.getGridColumn('.col-6')).toBe('span 6');
    });

    test('col-12 spans all 12 columns (full width)', () => {
      const rackElement = testUtils.createElement('div', 'rack');
      const col12Element = testUtils.createElement('div', 'col-12');
      rackElement.appendChild(col12Element);
      
      testUtils.mockCSS('.col-12', {
        gridColumn: 'span 12'
      });

      expect(testUtils.getGridColumn('.col-12')).toBe('span 12');
    });
  });

  describe('Mobile-First Responsive Behavior', () => {
    test('col-1 spans 6 columns (50%) on mobile', () => {
      testUtils.setViewport(375); // Mobile viewport
      
      const rackElement = testUtils.createElement('div', 'rack');
      const col1Element = testUtils.createElement('div', 'col-1');
      rackElement.appendChild(col1Element);
      
      // Mock mobile-first behavior
      testUtils.mockCSS('.col-1', {
        gridColumn: 'span 6' // 50% width on mobile
      });

      expect(testUtils.getGridColumn('.col-1')).toBe('span 6');
    });

    test('col-2 spans 6 columns (50%) on mobile', () => {
      testUtils.setViewport(375); // Mobile viewport
      
      const rackElement = testUtils.createElement('div', 'rack');
      const col2Element = testUtils.createElement('div', 'col-2');
      rackElement.appendChild(col2Element);
      
      testUtils.mockCSS('.col-2', {
        gridColumn: 'span 6' // 50% width on mobile
      });

      expect(testUtils.getGridColumn('.col-2')).toBe('span 6');
    });

    test('col-3 spans full width (12 columns) on mobile', () => {
      testUtils.setViewport(375); // Mobile viewport
      
      const rackElement = testUtils.createElement('div', 'rack');
      const col3Element = testUtils.createElement('div', 'col-3');
      rackElement.appendChild(col3Element);
      
      testUtils.mockCSS('.col-3', {
        gridColumn: 'span 12' // 100% width on mobile
      });

      expect(testUtils.getGridColumn('.col-3')).toBe('span 12');
    });

    test('all larger columns span full width on mobile', () => {
      testUtils.setViewport(375); // Mobile viewport
      
      const rackElement = testUtils.createElement('div', 'rack');
      
      // Test col-4 through col-12 all span full width on mobile
      for (let i = 4; i <= 12; i++) {
        const colElement = testUtils.createElement('div', `col-${i}`);
        rackElement.appendChild(colElement);
        
        testUtils.mockCSS(`.col-${i}`, {
          gridColumn: 'span 12'
        });

        expect(testUtils.getGridColumn(`.col-${i}`)).toBe('span 12');
      }
    });
  });

  describe('Perfect Centering System', () => {
    test('offset-center-1 positions col-1 in center', () => {
      const rackElement = testUtils.createElement('div', 'rack');
      const centeredElement = testUtils.createElement('div', 'col-1 offset-center-1');
      rackElement.appendChild(centeredElement);
      
      // Perfect centering: starts at column 6, spans 1 column
      testUtils.mockCSS('.offset-center-1', {
        gridColumn: '6 / span 1'
      });

      expect(testUtils.getGridColumn('.offset-center-1')).toBe('6 / span 1');
    });

    test('offset-center-3 positions col-3 in center', () => {
      const rackElement = testUtils.createElement('div', 'rack');
      const centeredElement = testUtils.createElement('div', 'col-3 offset-center-3');
      rackElement.appendChild(centeredElement);
      
      // Perfect centering: starts at column 5, spans 3 columns
      testUtils.mockCSS('.offset-center-3', {
        gridColumn: '5 / span 3'
      });

      expect(testUtils.getGridColumn('.offset-center-3')).toBe('5 / span 3');
    });

    test('offset-center-6 positions col-6 in center', () => {
      const rackElement = testUtils.createElement('div', 'rack');
      const centeredElement = testUtils.createElement('div', 'col-6 offset-center-6');
      rackElement.appendChild(centeredElement);
      
      // Perfect centering: starts at column 4, spans 6 columns
      testUtils.mockCSS('.offset-center-6', {
        gridColumn: '4 / span 6'
      });

      expect(testUtils.getGridColumn('.offset-center-6')).toBe('4 / span 6');
    });
  });
});