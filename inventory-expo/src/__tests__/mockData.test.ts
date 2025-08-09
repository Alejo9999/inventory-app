import { mockProducts, mockProductData } from '../mocks/mockData';

describe('Mock Data', () => {
  it('should have valid mock products', () => {
    expect(mockProducts).toBeDefined();
    expect(mockProducts.length).toBeGreaterThan(0);
    expect(mockProducts[0]).toHaveProperty('id');
    expect(mockProducts[0]).toHaveProperty('name');
    expect(mockProducts[0]).toHaveProperty('quantity');
    expect(mockProducts[0]).toHaveProperty('barcode');
    expect(mockProducts[0]).toHaveProperty('price');
  });

  it('should have valid test data', () => {
    expect(mockProductData.valid).toBeDefined();
    expect(mockProductData.valid.name).toBe('Producto Test');
    expect(mockProductData.valid.quantity).toBe(10);
    expect(mockProductData.valid.price).toBe(1500);
  });

  it('should have invalid test cases', () => {
    expect(mockProductData.invalid.emptyName.name).toBe('');
    expect(mockProductData.invalid.negativeQuantity.quantity).toBe(-5);
    expect(mockProductData.invalid.negativePrice.price).toBe(-100);
    expect(mockProductData.invalid.emptyBarcode.barcode).toBe('');
  });
});
