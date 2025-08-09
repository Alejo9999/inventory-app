import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import AddProduct from '../components/AddProduct';
import { mockProductData } from '../mocks/mockData';

// Mock Alert
jest.spyOn(Alert, 'alert');
const mockedAlert = Alert.alert as jest.MockedFunction<typeof Alert.alert>;

// Mock barcode scanner
jest.mock('../utils/barcodeScanner', () => ({
  scanBarcode: jest.fn().mockResolvedValue('mocked-barcode-123'),
}));

describe('AddProduct Component', () => {
  const mockOnAddProduct = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all form fields', () => {
    const { getByPlaceholderText, getByText } = render(
      <AddProduct onAddProduct={mockOnAddProduct} />
    );

    expect(getByPlaceholderText('Ej. Coca Cola 500ml')).toBeTruthy();
    expect(getByPlaceholderText('Ej. 10')).toBeTruthy();
    expect(getByPlaceholderText('Ej. 1500.00')).toBeTruthy();
    expect(getByText('📷 Escanear')).toBeTruthy();
    expect(getByText('Agregar Producto')).toBeTruthy();
  });

  it('should validate form with valid data', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AddProduct onAddProduct={mockOnAddProduct} />
    );

    // Fill form with valid data
    fireEvent.changeText(getByPlaceholderText('Ej. Coca Cola 500ml'), mockProductData.valid.name);
    fireEvent.changeText(getByPlaceholderText('Ej. 10'), mockProductData.valid.quantity.toString());
    fireEvent.changeText(getByPlaceholderText('Ej. 1500.00'), mockProductData.valid.price.toString());
    
    // Manually set barcode (since scanning is mocked)
    const barcodeInput = getByPlaceholderText('Escanea o ingresa manualmente');
    fireEvent.changeText(barcodeInput, mockProductData.valid.barcode);

    // Submit form
    fireEvent.press(getByText('Agregar Producto'));

    await waitFor(() => {
      expect(mockOnAddProduct).toHaveBeenCalledWith({
        name: mockProductData.valid.name,
        quantity: mockProductData.valid.quantity,
        barcode: mockProductData.valid.barcode,
        price: mockProductData.valid.price,
      });
    });
  });

  it('should show error for empty name', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AddProduct onAddProduct={mockOnAddProduct} />
    );

    // Fill form with empty name
    fireEvent.changeText(getByPlaceholderText('Ej. 10'), '10');
    fireEvent.changeText(getByPlaceholderText('Ej. 1500.00'), '1500');
    fireEvent.changeText(getByPlaceholderText('Escanea o ingresa manualmente'), '123456789');

    fireEvent.press(getByText('Agregar Producto'));

    await waitFor(() => {
      expect(mockedAlert).toHaveBeenCalledWith('Error', 'El nombre del producto es requerido');
    });

    expect(mockOnAddProduct).not.toHaveBeenCalled();
  });

  it('should show error for invalid quantity', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AddProduct onAddProduct={mockOnAddProduct} />
    );

    // Fill form with invalid quantity
    fireEvent.changeText(getByPlaceholderText('Ej. Coca Cola 500ml'), 'Test Product');
    fireEvent.changeText(getByPlaceholderText('Ej. 10'), '-5');
    fireEvent.changeText(getByPlaceholderText('Ej. 1500.00'), '1500');
    fireEvent.changeText(getByPlaceholderText('Escanea o ingresa manualmente'), '123456789');

    fireEvent.press(getByText('Agregar Producto'));

    await waitFor(() => {
      expect(mockedAlert).toHaveBeenCalledWith('Error', 'La cantidad debe ser un número mayor a 0');
    });

    expect(mockOnAddProduct).not.toHaveBeenCalled();
  });

  it('should show error for empty barcode', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AddProduct onAddProduct={mockOnAddProduct} />
    );

    // Fill form without barcode
    fireEvent.changeText(getByPlaceholderText('Ej. Coca Cola 500ml'), 'Test Product');
    fireEvent.changeText(getByPlaceholderText('Ej. 10'), '10');
    fireEvent.changeText(getByPlaceholderText('Ej. 1500.00'), '1500');

    fireEvent.press(getByText('Agregar Producto'));

    await waitFor(() => {
      expect(mockedAlert).toHaveBeenCalledWith('Error', 'El código de barras es requerido');
    });

    expect(mockOnAddProduct).not.toHaveBeenCalled();
  });

  it('should show error for invalid price', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AddProduct onAddProduct={mockOnAddProduct} />
    );

    // Fill form with invalid price
    fireEvent.changeText(getByPlaceholderText('Ej. Coca Cola 500ml'), 'Test Product');
    fireEvent.changeText(getByPlaceholderText('Ej. 10'), '10');
    fireEvent.changeText(getByPlaceholderText('Ej. 1500.00'), '-100');
    fireEvent.changeText(getByPlaceholderText('Escanea o ingresa manualmente'), '123456789');

    fireEvent.press(getByText('Agregar Producto'));

    await waitFor(() => {
      expect(mockedAlert).toHaveBeenCalledWith('Error', 'El precio debe ser un número mayor a 0');
    });

    expect(mockOnAddProduct).not.toHaveBeenCalled();
  });

  it('should clear form after successful submission', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AddProduct onAddProduct={mockOnAddProduct} />
    );

    const nameInput = getByPlaceholderText('Ej. Coca Cola 500ml');
    const quantityInput = getByPlaceholderText('Ej. 10');
    const priceInput = getByPlaceholderText('Ej. 1500.00');
    const barcodeInput = getByPlaceholderText('Escanea o ingresa manualmente');

    // Fill form
    fireEvent.changeText(nameInput, 'Test Product');
    fireEvent.changeText(quantityInput, '10');
    fireEvent.changeText(priceInput, '1500');
    fireEvent.changeText(barcodeInput, '123456789');

    // Submit form
    fireEvent.press(getByText('Agregar Producto'));

    await waitFor(() => {
      expect(mockOnAddProduct).toHaveBeenCalled();
    });

    // Check if form is cleared
    expect(nameInput.props.value).toBe('');
    expect(quantityInput.props.value).toBe('');
    expect(priceInput.props.value).toBe('');
    expect(barcodeInput.props.value).toBe('');
  });

  it('should handle barcode scan', async () => {
    const { getByText, getByPlaceholderText } = render(
      <AddProduct onAddProduct={mockOnAddProduct} />
    );

    const scanButton = getByText('📷 Escanear');
    fireEvent.press(scanButton);

    await waitFor(() => {
      const barcodeInput = getByPlaceholderText('Escanea o ingresa manualmente');
      expect(barcodeInput.props.value).toBe('mocked-barcode-123');
    });
  });
});
