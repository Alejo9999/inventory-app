import React from 'react';
import { FlatList, View, Text, Button } from 'react-native';
import ProductItem from './ProductItem';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onRemove: (id: string) => void;
  onUpdate: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onRemove, onUpdate }) => {
  const renderItem = ({ item }: { item: Product }) => (
    <ProductItem product={item} onRemove={onRemove} onUpdate={onUpdate} />
  );

  return (
    <View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ProductList;