/**
 * @jest-environment node
 */

// Funciones de validación extraídas para testing
const validateProductName = (name: string): boolean => {
  return name.trim().length > 0;
};

const validateQuantity = (quantity: string): boolean => {
  const num = parseInt(quantity, 10);
  return !isNaN(num) && num >= 0 && !quantity.includes('.');
};

const validatePrice = (price: string): boolean => {
  const num = parseFloat(price);
  return !isNaN(num) && num > 0;
};

const validateBarcode = (barcode: string): boolean => {
  return barcode.trim().length > 0;
};

const calculateTotalValue = (products: Array<{quantity: number, price: number}>): number => {
  return products.reduce((total, product) => total + (product.price * product.quantity), 0);
};

describe('Product Validation Functions', () => {
  describe('validateProductName', () => {
    it('should return true for valid names', () => {
      expect(validateProductName('Coca Cola')).toBe(true);
      expect(validateProductName('Producto 123')).toBe(true);
      expect(validateProductName('  Valid Name  ')).toBe(true);
    });

    it('should return false for invalid names', () => {
      expect(validateProductName('')).toBe(false);
      expect(validateProductName('  ')).toBe(false);
      expect(validateProductName('\t\n')).toBe(false);
    });
  });

  describe('validateQuantity', () => {
    it('should return true for valid quantities', () => {
      expect(validateQuantity('0')).toBe(true);
      expect(validateQuantity('1')).toBe(true);
      expect(validateQuantity('100')).toBe(true);
      expect(validateQuantity('999')).toBe(true);
    });

    it('should return false for invalid quantities', () => {
      expect(validateQuantity('')).toBe(false);
      expect(validateQuantity('-1')).toBe(false);
      expect(validateQuantity('abc')).toBe(false);
      expect(validateQuantity('1.5')).toBe(false);
    });
  });

  describe('validatePrice', () => {
    it('should return true for valid prices', () => {
      expect(validatePrice('1')).toBe(true);
      expect(validatePrice('1.5')).toBe(true);
      expect(validatePrice('1000')).toBe(true);
      expect(validatePrice('1500.50')).toBe(true);
    });

    it('should return false for invalid prices', () => {
      expect(validatePrice('')).toBe(false);
      expect(validatePrice('0')).toBe(false);
      expect(validatePrice('-1')).toBe(false);
      expect(validatePrice('abc')).toBe(false);
    });
  });

  describe('validateBarcode', () => {
    it('should return true for valid barcodes', () => {
      expect(validateBarcode('123456789')).toBe(true);
      expect(validateBarcode('ABC123')).toBe(true);
      expect(validateBarcode('  12345  ')).toBe(true);
    });

    it('should return false for invalid barcodes', () => {
      expect(validateBarcode('')).toBe(false);
      expect(validateBarcode('  ')).toBe(false);
      expect(validateBarcode('\t\n')).toBe(false);
    });
  });

  describe('calculateTotalValue', () => {
    it('should calculate total value correctly', () => {
      const products = [
        { quantity: 2, price: 1500 },
        { quantity: 3, price: 800 },
        { quantity: 1, price: 2200 }
      ];
      
      const expected = (2 * 1500) + (3 * 800) + (1 * 2200);
      expect(calculateTotalValue(products)).toBe(expected);
    });

    it('should return 0 for empty array', () => {
      expect(calculateTotalValue([])).toBe(0);
    });

    it('should handle zero quantities', () => {
      const products = [
        { quantity: 0, price: 1500 },
        { quantity: 2, price: 800 }
      ];
      
      expect(calculateTotalValue(products)).toBe(1600);
    });
  });
});
