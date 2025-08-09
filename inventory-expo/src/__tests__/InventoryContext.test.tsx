import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InventoryProvider, useInventory } from '../context/InventoryContext';
import { mockProducts, mockProductData } from '../mocks/mockData';
import { Product } from '../types';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const mockedAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('InventoryContext', () => {
  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <InventoryProvider>{children}</InventoryProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    mockedAsyncStorage.getItem.mockResolvedValue(null);
    mockedAsyncStorage.setItem.mockResolvedValue();
  });

  it('should provide initial empty inventory', async () => {
    const { result } = renderHook(() => useInventory(), { wrapper });
    
    expect(result.current.products).toEqual([]);
  });

  it('should add a product successfully', async () => {
    const { result } = renderHook(() => useInventory(), { wrapper });
    
    await act(async () => {
      result.current.addProduct(mockProductData.valid);
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0]).toMatchObject({
      name: mockProductData.valid.name,
      quantity: mockProductData.valid.quantity,
      barcode: mockProductData.valid.barcode,
      price: mockProductData.valid.price,
    });
    expect(result.current.products[0].id).toBeDefined();
  });

  it('should find product by barcode', async () => {
    const { result } = renderHook(() => useInventory(), { wrapper });
    
    await act(async () => {
      result.current.addProduct(mockProductData.valid);
    });

    const foundProduct = result.current.findProductByBarcode(mockProductData.valid.barcode);
    expect(foundProduct).toBeDefined();
    expect(foundProduct?.barcode).toBe(mockProductData.valid.barcode);
  });

  it('should return undefined when product not found by barcode', async () => {
    const { result } = renderHook(() => useInventory(), { wrapper });
    
    const foundProduct = result.current.findProductByBarcode('nonexistent');
    expect(foundProduct).toBeUndefined();
  });

  it('should remove product by id', async () => {
    const { result } = renderHook(() => useInventory(), { wrapper });
    
    await act(async () => {
      result.current.addProduct(mockProductData.valid);
    });

    const productId = result.current.products[0].id;

    await act(async () => {
      result.current.removeProduct(productId);
    });

    expect(result.current.products).toHaveLength(0);
  });

  it('should update product by id', async () => {
    const { result } = renderHook(() => useInventory(), { wrapper });
    
    await act(async () => {
      result.current.addProduct(mockProductData.valid);
    });

    const productId = result.current.products[0].id;
    const updates = { quantity: 20, price: 2000 };

    await act(async () => {
      result.current.updateProduct(productId, updates);
    });

    expect(result.current.products[0].quantity).toBe(20);
    expect(result.current.products[0].price).toBe(2000);
    expect(result.current.products[0].name).toBe(mockProductData.valid.name);
  });

  it('should load products from AsyncStorage on initialization', async () => {
    mockedAsyncStorage.getItem.mockResolvedValueOnce(
      JSON.stringify(mockProducts.slice(0, 2))
    );

    const { result } = renderHook(() => useInventory(), { wrapper });

    // Wait for useEffect to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.products).toHaveLength(2);
    expect(result.current.products[0].name).toBe(mockProducts[0].name);
  });

  it('should save products to AsyncStorage when products change', async () => {
    const { result } = renderHook(() => useInventory(), { wrapper });
    
    await act(async () => {
      result.current.addProduct(mockProductData.valid);
    });

    // Wait for save effect
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith(
      '@inventory_products',
      expect.stringContaining(mockProductData.valid.name)
    );
  });
});
