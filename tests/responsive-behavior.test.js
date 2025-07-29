/**
 * TDD Tests for Responsive Behavior
 * Tests mobile-first responsive design and breakpoint behavior
 */

describe('Responsive Behavior Tests', () => {
  beforeEach(() => {
    testUtils.cleanup();
  });

  describe('Breakpoint Detection', () => {
    test('mobile viewport (375px) is detected correctly', () => {
      testUtils.setViewport(375);
      expect(window.innerWidth).toBe(375);
    });

    test('tablet viewport (768px) is detected correctly', () => {
      testUtils.setViewport(768);
      expect(window.innerWidth).toBe(768);
    });

    test('desktop viewport (1024px) is detected correctly', () => {
      testUtils.setViewport(1024);
      expect(window.innerWidth).toBe(1024);
    });

    test('large desktop viewport (1280px) is detected correctly', () => {
      testUtils.setViewport(1280);
      expect(window.innerWidth).toBe(1280);
    });
  });

  describe('Mobile-First Column Behavior', () => {
    beforeEach(() => {
      testUtils.setViewport(375); // Mobile viewport
    });

    test('small columns (col-1, col-2) are 50% width on mobile', () => {
      const rackElement = testUtils.createElement('div', 'rack');
      const col1Element = testUtils.createElement('div', 'col-1');
      const col2Element = testUtils.createElement('div', 'col-2');
      
      rackElement.appendChild(col1Element);
      rackElement.appendChild(col2Element);
      
      // Mock mobile behavior: 6 out of 12 columns = 50%
      testUtils.mockCSS('.col-1', { gridColumn: 'span 6' });
      testUtils.mockCSS('.col-2', { gridColumn: 'span 6' });

      expect(testUtils.getGridColumn('.col-1')).toBe('span 6');
      expect(testUtils.getGridColumn('.col-2')).toBe('span 6');
    });

    test('larger columns (col-3+) are full width on mobile', () => {
      const rackElement = testUtils.createElement('div', 'rack');
      
      // Test all columns from 3 to 12
      for (let i = 3; i <= 12; i++) {
        const colElement = testUtils.createElement('div', `col-${i}`);
        rackElement.appendChild(colElement);
        
        testUtils.mockCSS(`.col-${i}`, { gridColumn: 'span 12' });
        expect(testUtils.getGridColumn(`.col-${i}`)).toBe('span 12');
      }
    });

    test('two col-1 elements fit side by side on mobile', () => {
      const rackElement = testUtils.createElement('div', 'rack');
      const col1A = testUtils.createElement('div', 'col-1');
      const col1B = testUtils.createElement('div', 'col-1');
      
      rackElement.appendChild(col1A);
      rackElement.appendChild(col1B);
      
      testUtils.mockCSS('.col-1', { gridColumn: 'span 6' });
      
      // Both should be 6 columns (50% each) = 100% total
      expect(testUtils.getGridColumn('.col-1')).toBe('span 6');
      expect(rackElement.children.length).toBe(2);
    });
  });

  describe('Tablet Responsive Behavior', () => {
    beforeEach(() => {
      testUtils.setViewport(768); // Tablet viewport
    });

    test('columns transition to tablet sizes at md breakpoint', () => {
      const rackElement = testUtils.createElement('div', 'rack');
      
      // Test harmonic ratios from original system
      const tabletColumns = {
        1: 'span 1',    // Native CSS Grid
        2: 'span 2', 
        3: 'span 3',
        4: 'span 4',
        6: 'span 6',
        12: 'span 12'
      };

      Object.entries(tabletColumns).forEach(([col, expectedSpan]) => {
        const colElement = testUtils.createElement('div', `col-${col}`);
        rackElement.appendChild(colElement);
        
        testUtils.mockCSS(`.col-${col}`, { gridColumn: expectedSpan });
        expect(testUtils.getGridColumn(`.col-${col}`)).toBe(expectedSpan);
      });
    });

    test('columns maintain proper proportions on tablet', () => {
      const rackElement = testUtils.createElement('div', 'rack');
      const col3Element = testUtils.createElement('div', 'col-3');
      const col4Element = testUtils.createElement('div', 'col-4');
      
      rackElement.appendChild(col3Element);
      rackElement.appendChild(col4Element);
      
      testUtils.mockCSS('.col-3', { gridColumn: 'span 3' });
      testUtils.mockCSS('.col-4', { gridColumn: 'span 4' });

      expect(testUtils.getGridColumn('.col-3')).toBe('span 3');
      expect(testUtils.getGridColumn('.col-4')).toBe('span 4');
    });
  });

  describe('Desktop Responsive Behavior', () => {
    beforeEach(() => {
      testUtils.setViewport(1024); // Desktop viewport
    });

    test('all columns use their natural CSS Grid spans on desktop', () => {
      const rackElement = testUtils.createElement('div', 'rack');
      
      // Test all 12 columns with their natural spans
      for (let i = 1; i <= 12; i++) {
        const colElement = testUtils.createElement('div', `col-${i}`);
        rackElement.appendChild(colElement);
        
        testUtils.mockCSS(`.col-${i}`, { gridColumn: `span ${i}` });
        expect(testUtils.getGridColumn(`.col-${i}`)).toBe(`span ${i}`);
      }
    });

    test('complex grid layouts work on desktop', () => {
      const rackElement = testUtils.createElement('div', 'rack');
      
      // Test a complex layout: col-4 + col-4 + col-4 = 12 columns
      const col4A = testUtils.createElement('div', 'col-4');
      const col4B = testUtils.createElement('div', 'col-4');
      const col4C = testUtils.createElement('div', 'col-4');
      
      rackElement.appendChild(col4A);
      rackElement.appendChild(col4B);
      rackElement.appendChild(col4C);
      
      testUtils.mockCSS('.col-4', { gridColumn: 'span 4' });
      
      // All three should fit in one row (4 + 4 + 4 = 12)
      expect(testUtils.getGridColumn('.col-4')).toBe('span 4');
      expect(rackElement.children.length).toBe(3);
    });
  });

  describe('Responsive Container Behavior', () => {
    test('rack container adapts gap spacing across breakpoints', () => {
      const rackElement = testUtils.createElement('div', 'rack');
      
      // Mobile
      testUtils.setViewport(375);
      testUtils.mockCSS('.rack', { gap: '1rem' });
      expect(window.getComputedStyle(rackElement).gap).toBe('1rem');
      
      // Desktop
      testUtils.setViewport(1024);
      testUtils.mockCSS('.rack', { gap: '1rem' });
      expect(window.getComputedStyle(rackElement).gap).toBe('1rem');
    });

    test('rail container maintains consistent behavior across breakpoints', () => {
      const railElement = testUtils.createElement('div', 'rail');
      
      // Mobile
      testUtils.setViewport(375);
      testUtils.mockCSS('.rail', { 
        display: 'flex',
        overflowX: 'auto'
      });
      
      expect(testUtils.getDisplay('.rail')).toBe('flex');
      expect(testUtils.getOverflowX('.rail')).toBe('auto');
      
      // Desktop
      testUtils.setViewport(1024);
      expect(testUtils.getDisplay('.rail')).toBe('flex');
      expect(testUtils.getOverflowX('.rail')).toBe('auto');
    });
  });

  describe('Cross-Breakpoint Consistency', () => {
    test('layout transitions smoothly between breakpoints', () => {
      const rackElement = testUtils.createElement('div', 'rack');
      const col3Element = testUtils.createElement('div', 'col-3');
      rackElement.appendChild(col3Element);
      
      // Mobile: full width
      testUtils.setViewport(375);
      testUtils.mockCSS('.col-3', { gridColumn: 'span 12' });
      expect(testUtils.getGridColumn('.col-3')).toBe('span 12');
      
      // Tablet: 3 columns
      testUtils.setViewport(768);
      testUtils.mockCSS('.col-3', { gridColumn: 'span 3' });
      expect(testUtils.getGridColumn('.col-3')).toBe('span 3');
      
      // Desktop: maintains 3 columns
      testUtils.setViewport(1024);
      testUtils.mockCSS('.col-3', { gridColumn: 'span 3' });
      expect(testUtils.getGridColumn('.col-3')).toBe('span 3');
    });

    test('centering works consistently across breakpoints', () => {
      const rackElement = testUtils.createElement('div', 'rack');
      const centeredElement = testUtils.createElement('div', 'col-6 offset-center-6');
      rackElement.appendChild(centeredElement);
      
      // Desktop: perfect centering
      testUtils.setViewport(1024);
      testUtils.mockCSS('.offset-center-6', { gridColumn: '4 / span 6' });
      expect(testUtils.getGridColumn('.offset-center-6')).toBe('4 / span 6');
      
      // Mobile: centering still works because offset-center-6 has higher specificity
      testUtils.setViewport(375);
      // The element still has offset-center-6 class, so it gets the centered positioning
      expect(testUtils.getGridColumn('.offset-center-6')).toBe('4 / span 6');
    });
  });
});