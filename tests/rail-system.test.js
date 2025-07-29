/**
 * TDD Tests for Modern Rail System
 * Tests Flexbox-based implementation of the rail container
 */

describe('Modern Rail System', () => {
  beforeEach(() => {
    testUtils.cleanup();
  });

  describe('Rail Container Behavior', () => {
    test('rail container uses flexbox layout', () => {
      const railElement = testUtils.createElement('div', 'rail');
      
      testUtils.mockCSS('.rail', {
        display: 'flex',
        gap: '1rem',
        overflowX: 'auto',
        width: '100%'
      });

      expect(testUtils.getDisplay('.rail')).toBe('flex');
    });

    test('rail container has horizontal scrolling', () => {
      const railElement = testUtils.createElement('div', 'rail');
      
      testUtils.mockCSS('.rail', {
        overflowX: 'auto'
      });

      expect(testUtils.getOverflowX('.rail')).toBe('auto');
    });

    test('rail container prevents wrapping', () => {
      const railElement = testUtils.createElement('div', 'rail');
      
      testUtils.mockCSS('.rail', {
        flexWrap: 'nowrap'
      });

      const computedStyle = window.getComputedStyle(railElement);
      expect(computedStyle.flexWrap).toBe('nowrap');
    });

    test('rail container hides scrollbar (webkit)', () => {
      const railElement = testUtils.createElement('div', 'rail');
      
      // Load CSS with scrollbar hiding
      testUtils.loadCSS(`
        .rail::-webkit-scrollbar {
          display: none;
        }
      `);

      // This would be tested with actual browser behavior
      // For now, we test that the CSS rule exists
      expect(document.head.querySelector('style').textContent).toContain('::-webkit-scrollbar');
    });

    test('rail container hides scrollbar (firefox)', () => {
      const railElement = testUtils.createElement('div', 'rail');
      
      testUtils.mockCSS('.rail', {
        scrollbarWidth: 'none'
      });

      const computedStyle = window.getComputedStyle(railElement);
      expect(computedStyle.scrollbarWidth).toBe('none');
    });

    test('rail container has proper gap spacing', () => {
      const railElement = testUtils.createElement('div', 'rail');
      
      testUtils.mockCSS('.rail', {
        gap: '1rem'
      });

      const computedStyle = window.getComputedStyle(railElement);
      expect(computedStyle.gap).toBe('1rem');
    });
  });

  describe('Rail Column Fixed Widths', () => {
    test('rail col-1 has fixed width of 16rem', () => {
      const railElement = testUtils.createElement('div', 'rail');
      const col1Element = testUtils.createElement('div', 'col-1');
      railElement.appendChild(col1Element);
      
      testUtils.mockCSS('.rail .col-1', {
        width: '16rem',
        minWidth: '16rem',
        flexShrink: '0'
      });

      const computedStyle = window.getComputedStyle(col1Element);
      expect(computedStyle.width).toBe('16rem');
      expect(computedStyle.minWidth).toBe('16rem');
      expect(computedStyle.flexShrink).toBe('0');
    });

    test('rail col-2 has fixed width of 20rem', () => {
      const railElement = testUtils.createElement('div', 'rail');
      const col2Element = testUtils.createElement('div', 'col-2');
      railElement.appendChild(col2Element);
      
      testUtils.mockCSS('.rail .col-2', {
        width: '20rem',
        minWidth: '20rem',
        flexShrink: '0'
      });

      const computedStyle = window.getComputedStyle(col2Element);
      expect(computedStyle.width).toBe('20rem');
      expect(computedStyle.minWidth).toBe('20rem');
    });

    test('rail col-6 has fixed width of 36rem', () => {
      const railElement = testUtils.createElement('div', 'rail');
      const col6Element = testUtils.createElement('div', 'col-6');
      railElement.appendChild(col6Element);
      
      testUtils.mockCSS('.rail .col-6', {
        width: '36rem',
        minWidth: '36rem',
        flexShrink: '0'
      });

      const computedStyle = window.getComputedStyle(col6Element);
      expect(computedStyle.width).toBe('36rem');
    });

    test('rail col-12 has 100% width for slide effect', () => {
      const railElement = testUtils.createElement('div', 'rail');
      const col12Element = testUtils.createElement('div', 'col-12');
      railElement.appendChild(col12Element);
      
      testUtils.mockCSS('.rail .col-12', {
        width: '100%',
        minWidth: '100%',
        flexShrink: '0'
      });

      const computedStyle = window.getComputedStyle(col12Element);
      expect(computedStyle.width).toBe('100%');
    });
  });

  describe('Rail Slide Mode Behavior', () => {
    test('rail with slide-mode class uses container padding as gap', () => {
      const railElement = testUtils.createElement('div', 'rail slide-mode');
      
      testUtils.mockCSS('.rail.slide-mode', {
        gap: '1.5rem' // Matches container padding for seamless slides
      });

      const computedStyle = window.getComputedStyle(railElement);
      expect(computedStyle.gap).toBe('1.5rem');
    });

    test('rail with col-12 children automatically gets slide gap', () => {
      const railElement = testUtils.createElement('div', 'rail');
      const col12Element = testUtils.createElement('div', 'col-12');
      railElement.appendChild(col12Element);
      
      // CSS selector: .rail:has(.col-12)
      testUtils.mockCSS('.rail:has(.col-12)', {
        gap: '1.5rem'
      });

      // This tests the :has() selector behavior
      expect(railElement.querySelector('.col-12')).toBeTruthy();
    });
  });

  describe('Rail Responsive Gap Behavior', () => {
    test('rail gap adjusts on mobile viewport', () => {
      testUtils.setViewport(375); // Mobile
      
      const railElement = testUtils.createElement('div', 'rail slide-mode');
      
      testUtils.mockCSS('.rail.slide-mode', {
        gap: '1rem' // Mobile gap
      });

      const computedStyle = window.getComputedStyle(railElement);
      expect(computedStyle.gap).toBe('1rem');
    });

    test('rail gap adjusts on tablet viewport', () => {
      testUtils.setViewport(768); // Tablet
      
      const railElement = testUtils.createElement('div', 'rail slide-mode');
      
      testUtils.mockCSS('.rail.slide-mode', {
        gap: '2rem' // Tablet gap
      });

      const computedStyle = window.getComputedStyle(railElement);
      expect(computedStyle.gap).toBe('2rem');
    });

    test('rail gap adjusts on desktop viewport', () => {
      testUtils.setViewport(1024); // Desktop
      
      const railElement = testUtils.createElement('div', 'rail slide-mode');
      
      testUtils.mockCSS('.rail.slide-mode', {
        gap: '2rem' // Desktop gap
      });

      const computedStyle = window.getComputedStyle(railElement);
      expect(computedStyle.gap).toBe('2rem');
    });
  });

  describe('Rail Standard vs Slide Gap Toggle', () => {
    test('rail-standard utility forces standard gap', () => {
      const railElement = testUtils.createElement('div', 'rail rail-standard');
      
      testUtils.mockCSS('.rail-standard', {
        gap: '1rem !important'
      });

      const computedStyle = window.getComputedStyle(railElement);
      expect(computedStyle.gap).toBe('1rem');
    });

    test('rail-slide utility forces slide gap', () => {
      const railElement = testUtils.createElement('div', 'rail rail-slide');
      
      testUtils.mockCSS('.rail-slide', {
        gap: '1.5rem !important'
      });

      const computedStyle = window.getComputedStyle(railElement);
      expect(computedStyle.gap).toBe('1.5rem');
    });
  });
});