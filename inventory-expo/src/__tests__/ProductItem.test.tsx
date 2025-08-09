import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import ProductItem from '../components/ProductItem';
import { mockProducts } from '../mocks/mockData';

// Mock Alert
jest.spyOn(Alert, 'alert');
const mockedAlert = Alert.alert as jest.MockedFunction<typeof Alert.alert>;

describe('ProductItem Component', () => {
  const mockOnUpdate = jest.fn();
  const mockOnDelete = jest.fn();
  const testProduct = mockProducts[0];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render product information correctly', () => {
    const { getByText } = render(
      <ProductItem
        product={testProduct}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    expect(getByText(testProduct.name)).toBeTruthy();
    expect(getByText(`Cantidad: ${testProduct.quantity}`)).toBeTruthy();
    expect(getByText(`Precio: ₡${testProduct.price.toFixed(2)}`)).toBeTruthy();
    expect(getByText(testProduct.barcode)).toBeTruthy();
  });

  it('should show edit and delete buttons', () => {
    const { getByText } = render(
      <ProductItem
        product={testProduct}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    expect(getByText('✏️ Editar')).toBeTruthy();
    expect(getByText('🗑️ Eliminar')).toBeTruthy();
  });

  it('should call onDelete when delete button is pressed', async () => {
    const { getByText } = render(
      <ProductItem
        product={testProduct}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.press(getByText('🗑️ Eliminar'));
    
    expect(mockOnDelete).toHaveBeenCalledWith(testProduct.id);
  });

  it('should enter edit mode when edit button is pressed', async () => {
    const { getByText, getByDisplayValue } = render(
      <ProductItem
        product={testProduct}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.press(getByText('✏️ Editar'));

    // Should show input fields with current values
    expect(getByDisplayValue(testProduct.name)).toBeTruthy();
    expect(getByDisplayValue(testProduct.quantity.toString())).toBeTruthy();
    expect(getByDisplayValue(testProduct.price.toString())).toBeTruthy();
  });

  it('should update product when save button is pressed with valid data', async () => {
    const { getByText, getByDisplayValue } = render(
      <ProductItem
        product={testProduct}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    // Enter edit mode
    fireEvent.press(getByText('✏️ Editar'));

    // Update values
    const nameInput = getByDisplayValue(testProduct.name);
    const quantityInput = getByDisplayValue(testProduct.quantity.toString());
    const priceInput = getByDisplayValue(testProduct.price.toString());

    fireEvent.changeText(nameInput, 'Updated Product Name');
    fireEvent.changeText(quantityInput, '50');
    fireEvent.changeText(priceInput, '2000');

    // Save changes
    fireEvent.press(getByText('💾 Guardar'));

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith(testProduct.id, {
        name: 'Updated Product Name',
        quantity: 50,
        price: 2000,
      });
    });
  });

  it('should show error for invalid quantity', async () => {
    const { getByText, getByDisplayValue } = render(
      <ProductItem
        product={testProduct}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    // Enter edit mode
    fireEvent.press(getByText('✏️ Editar'));

    // Set invalid quantity
    const quantityInput = getByDisplayValue(testProduct.quantity.toString());
    fireEvent.changeText(quantityInput, '-5');

    // Try to save
    fireEvent.press(getByText('💾 Guardar'));

    await waitFor(() => {
      expect(mockedAlert).toHaveBeenCalledWith(
        'Error',
        'La cantidad debe ser un número válido mayor o igual a 0'
      );
    });

    expect(mockOnUpdate).not.toHaveBeenCalled();
  });

  it('should show error for invalid price', async () => {
    const { getByText, getByDisplayValue } = render(
      <ProductItem
        product={testProduct}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    // Enter edit mode
    fireEvent.press(getByText('✏️ Editar'));

    // Set invalid price
    const priceInput = getByDisplayValue(testProduct.price.toString());
    fireEvent.changeText(priceInput, '-100');

    // Try to save
    fireEvent.press(getByText('💾 Guardar'));

    await waitFor(() => {
      expect(mockedAlert).toHaveBeenCalledWith(
        'Error',
        'El precio debe ser un número válido mayor a 0'
      );
    });

    expect(mockOnUpdate).not.toHaveBeenCalled();
  });

  it('should cancel edit mode without saving', async () => {
    const { getByText, getByDisplayValue, queryByDisplayValue } = render(
      <ProductItem
        product={testProduct}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    // Enter edit mode
    fireEvent.press(getByText('✏️ Editar'));

    // Verify we're in edit mode
    expect(getByDisplayValue(testProduct.name)).toBeTruthy();

    // Cancel
    fireEvent.press(getByText('❌ Cancelar'));

    // Should exit edit mode without calling onUpdate
    expect(queryByDisplayValue(testProduct.name)).toBeFalsy();
    expect(mockOnUpdate).not.toHaveBeenCalled();
  });
});
