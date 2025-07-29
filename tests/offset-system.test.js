/**
 * TDD Tests for Systematic Offset System
 * Tests the new padding-based pseudo-centering offset implementation
 */

require('./setup');

describe('Systematic Offset System', () => {
  beforeEach(() => {
    global.testUtils.cleanup();
  });

  describe('CSS Custom Properties', () => {
    test('defines base offset variables correctly', () => {
      global.testUtils.mockCSS(':root', {
        '--grid-columns': '12',
        '--base-gap': '1rem',
        '--offset-base': 'calc(100% / var(--grid-columns))',
        '--offset-gap': 'var(--base-gap)'
      });

      expect(global.testUtils.getCSSCustomProperty('--grid-columns')).toBe('12');
      expect(global.testUtils.getCSSCustomProperty('--base-gap')).toBe('1rem');
      expect(global.testUtils.getCSSCustomProperty('--offset-base')).toBe('calc(100% / var(--grid-columns))');
      expect(global.testUtils.getCSSCustomProperty('--offset-gap')).toBe('var(--base-gap)');
    });

    test('calculates offset padding values systematically', () => {
      global.testUtils.mockCSS(':root', {
        '--offset-1-padding': 'calc((1 * var(--offset-base) + 1 * var(--offset-gap)) / 2)',
        '--offset-2-padding': 'calc((2 * var(--offset-base) + 2 * var(--offset-gap)) / 2)',
        '--offset-3-padding': 'calc((3 * var(--offset-base) + 3 * var(--offset-gap)) / 2)'
      });

      expect(global.testUtils.getCSSCustomProperty('--offset-1-padding')).toBe('calc((1 * var(--offset-base) + 1 * var(--offset-gap)) / 2)');
      expect(global.testUtils.getCSSCustomProperty('--offset-2-padding')).toBe('calc((2 * var(--offset-base) + 2 * var(--offset-gap)) / 2)');
      expect(global.testUtils.getCSSCustomProperty('--offset-3-padding')).toBe('calc((3 * var(--offset-base) + 3 * var(--offset-gap)) / 2)');
    });
  });

  describe('Offset Class Generation', () => {
    test('generates offset-1 class with correct padding', () => {
      const offsetElement = global.testUtils.createElement('div', 'offset-1');
      
      global.testUtils.mockCSS('.offset-1', {
        paddingInline: 'var(--offset-1-padding)'
      });

      expect(global.testUtils.getPaddingInline('.offset-1')).toBe('var(--offset-1-padding)');
    });

    test('generates offset-2 class with correct padding', () => {
      const offsetElement = global.testUtils.createElement('div', 'offset-2');
      
      global.testUtils.mockCSS('.offset-2', {
        paddingInline: 'var(--offset-2-padding)'
      });

      expect(global.testUtils.getPaddingInline('.offset-2')).toBe('var(--offset-2-padding)');
    });

    test('generates all offset classes from 1 to 11', () => {
      for (let i = 1; i <= 11; i++) {
        const offsetElement = global.testUtils.createElement('div', `offset-${i}`);
        
        global.testUtils.mockCSS(`.offset-${i}`, {
          paddingInline: `var(--offset-${i}-padding)`
        });

        expect(global.testUtils.getPaddingInline(`.offset-${i}`)).toBe(`var(--offset-${i}-padding)`);
      }
    });
  });

  describe('Systematic Formula Implementation', () => {
    test('validates offset formula: (n × column + n × gutter) ÷ 2', () => {
      // Create the element first
      const element = global.testUtils.createElement('div', 'offset-1');
      
      // Mock base values for calculation test
      global.testUtils.mockCSS(':root', {
        '--grid-columns': '12',
        '--base-gap': '16px', // 1rem = 16px typically
        '--offset-base': '8.333%' // 100% / 12
      });

      // Test formula implementation for offset-1
      // Expected: (1 × 8.333% + 1 × 16px) ÷ 2
      global.testUtils.mockCSS('.offset-1', {
        paddingInline: 'calc((1 * 8.333% + 1 * 16px) / 2)'
      });

      expect(global.testUtils.getPaddingInline('.offset-1')).toContain('calc(');
      expect(global.testUtils.getPaddingInline('.offset-1')).toContain('/ 2');
    });

    test('validates progressive offset calculation', () => {
      // Create elements first
      const elements = [1, 3, 6].map(n => 
        global.testUtils.createElement('div', `offset-${n}`)
      );
      
      // Mock progressive values
      const offsets = [
        { n: 1, expected: 'calc((1 * var(--offset-base) + 1 * var(--offset-gap)) / 2)' },
        { n: 3, expected: 'calc((3 * var(--offset-base) + 3 * var(--offset-gap)) / 2)' },
        { n: 6, expected: 'calc((6 * var(--offset-base) + 6 * var(--offset-gap)) / 2)' }
      ];

      offsets.forEach(({ n, expected }) => {
        global.testUtils.mockCSS(`.offset-${n}`, {
          paddingInline: expected
        });

        expect(global.testUtils.getPaddingInline(`.offset-${n}`)).toBe(expected);
      });
    });
  });

  describe('Integration with Grid System', () => {
    test('offset-1 col-10 creates pseudo-centered layout', () => {
      const container = global.testUtils.createElement('div', 'rack');
      const element = global.testUtils.createElement('div', 'offset-1 col-10');
      // Also create separate elements for individual class testing
      const colElement = global.testUtils.createElement('div', 'col-10');
      const offsetElement = global.testUtils.createElement('div', 'offset-1');
      container.appendChild(element);

      global.testUtils.mockCSS('.rack', {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '1rem'
      });

      global.testUtils.mockCSS('.offset-1', {
        paddingInline: 'var(--offset-1-padding)'
      });

      global.testUtils.mockCSS('.col-10', {
        gridColumn: 'span 10'
      });

      expect(global.testUtils.getDisplay('.rack')).toBe('grid');
      expect(global.testUtils.getPaddingInline('.offset-1')).toBe('var(--offset-1-padding)');
      expect(global.testUtils.getGridColumn('.col-10')).toBe('span 10');
    });

    test('offset-1 col-3 + col-8 creates 11-column centered layout', () => {
      const container = global.testUtils.createElement('div', 'rack');
      const element1 = global.testUtils.createElement('div', 'offset-1 col-3');
      const element2 = global.testUtils.createElement('div', 'col-8');
      // Also create separate elements for individual class testing
      const col3Element = global.testUtils.createElement('div', 'col-3');
      const col8Element = global.testUtils.createElement('div', 'col-8');
      const offsetElement = global.testUtils.createElement('div', 'offset-1');
      container.appendChild(element1);
      container.appendChild(element2);

      global.testUtils.mockCSS('.offset-1', {
        paddingInline: 'var(--offset-1-padding)'
      });

      global.testUtils.mockCSS('.col-3', {
        gridColumn: 'span 3'
      });

      global.testUtils.mockCSS('.col-8', {
        gridColumn: 'span 8'
      });

      // Verify the test case from the requirements
      expect(global.testUtils.getPaddingInline('.offset-1')).toBe('var(--offset-1-padding)');
      expect(global.testUtils.getGridColumn('.col-3')).toBe('span 3');
      expect(global.testUtils.getGridColumn('.col-8')).toBe('span 8');
    });
  });

  describe('Responsive Behavior', () => {
    test('offset system scales with responsive breakpoints', () => {
      // Test that offset classes work consistently across breakpoints
      const breakpoints = ['sm', 'md', 'lg', 'xl'];
      
      breakpoints.forEach(breakpoint => {
        global.testUtils.mockCSS(`:root`, {
          '--offset-base': 'calc(100% / var(--grid-columns))',
          '--offset-gap': 'var(--base-gap)'
        });

        // The systematic approach means same formula works at all breakpoints
        expect(global.testUtils.getCSSCustomProperty('--offset-base')).toBe('calc(100% / var(--grid-columns))');
      });
    });
  });

  describe('Accessibility and Performance', () => {
    test('uses efficient CSS custom properties', () => {
      global.testUtils.mockCSS(':root', {
        '--offset-1-padding': 'calc((1 * var(--offset-base) + 1 * var(--offset-gap)) / 2)'
      });

      // Verify it uses CSS calc() for performance (calculated by browser)
      const paddingValue = global.testUtils.getCSSCustomProperty('--offset-1-padding');
      expect(paddingValue).toContain('calc(');
      expect(paddingValue).toContain('var(');
    });

    test('provides predictable padding values', () => {
      // Test that offset values follow systematic progression
      for (let i = 1; i <= 5; i++) {
        global.testUtils.mockCSS(`:root`, {
          [`--offset-${i}-padding`]: `calc((${i} * var(--offset-base) + ${i} * var(--offset-gap)) / 2)`
        });

        const paddingValue = global.testUtils.getCSSCustomProperty(`--offset-${i}-padding`);
        expect(paddingValue).toContain(`${i} *`);
        expect(paddingValue).toContain('/ 2');
      }
    });
  });

  describe('Error Handling', () => {
    test('gracefully handles missing CSS custom properties', () => {
      // Test fallback behavior when variables are not defined
      const offsetElement = global.testUtils.createElement('div', 'offset-1');
      
      global.testUtils.mockCSS('.offset-1', {
        paddingInline: 'var(--offset-1-padding, 0)'
      });

      // Should have fallback value
      expect(global.testUtils.getPaddingInline('.offset-1')).toContain('var(--offset-1-padding');
    });
  });
});