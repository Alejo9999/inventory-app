/**
 * @jest-environment node
 */
import { mockProducts, mockProductData } from '../mocks/mockData';

describe('Mock Data', () => {
  it('should have valid mock products', () => {
    expect(mockProducts).toBeDefined();
    expect(mockProducts.length).toBe(8);
    expect(mockProducts[0]).toHaveProperty('id');
    expect(mockProducts[0]).toHaveProperty('name');
    expect(mockProducts[0]).toHaveProperty('quantity');
    expect(mockProducts[0]).toHaveProperty('barcode');
    expect(mockProducts[0]).toHaveProperty('price');
  });

  it('should have Costa Rican products', () => {
    expect(mockProducts[0].name).toBe('Coca Cola 500ml');
    expect(mockProducts[1].name).toBe('Pepsi 600ml');
    expect(mockProducts[2].name).toBe('Agua Cristal 1L');
    expect(mockProducts[4].name).toBe('Leche Dos Pinos 1L');
  });

  it('should have valid prices in colones', () => {
    mockProducts.forEach(product => {
      expect(product.price).toBeGreaterThan(0);
      expect(typeof product.price).toBe('number');
    });
  });

  it('should have valid quantities', () => {
    mockProducts.forEach(product => {
      expect(product.quantity).toBeGreaterThanOrEqual(0);
      expect(typeof product.quantity).toBe('number');
    });
  });

  it('should have unique barcodes', () => {
    const barcodes = mockProducts.map(p => p.barcode);
    const uniqueBarcodes = new Set(barcodes);
    expect(uniqueBarcodes.size).toBe(barcodes.length);
  });

  it('should have valid test data', () => {
    expect(mockProductData.valid).toBeDefined();
    expect(mockProductData.valid.name).toBe('Producto Test');
    expect(mockProductData.valid.quantity).toBe(10);
    expect(mockProductData.valid.price).toBe(1500.00);
    expect(mockProductData.valid.barcode).toBe('1234567890123');
  });

  it('should have invalid test cases for validation', () => {
    expect(mockProductData.invalid.emptyName.name).toBe('');
    expect(mockProductData.invalid.negativeQuantity.quantity).toBe(-5);
    expect(mockProductData.invalid.emptyBarcode.barcode).toBe('');
    expect(mockProductData.invalid.negativePrice.price).toBe(-100.00);
  });
});
