/**
 * @jest-environment node
 */

describe('Basic Math', () => {
  it('should add two numbers', () => {
    expect(1 + 1).toBe(2);
  });

  it('should multiply numbers', () => {
    expect(3 * 4).toBe(12);
  });
});
