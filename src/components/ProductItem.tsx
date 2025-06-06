import React from 'react';
import { View, Text, Button } from 'react-native';
import { Product } from '../types';

interface ProductItemProps {
  product: Product;
  onUpdate: (product: Product) => void;
  onRemove: (id: string) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onUpdate, onRemove }) => {
  return (
    <View>
      <Text>{product.name}</Text>
      <Text>Quantity: {product.quantity}</Text>
      <Text>Barcode: {product.barcode}</Text>
      <Button title="Update" onPress={() => onUpdate(product)} />
      <Button title="Remove" onPress={() => onRemove(product.id)} />
    </View>
  );
};

export default ProductItem;