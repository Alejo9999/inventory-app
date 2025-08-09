import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Product>) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDelete, onUpdate }) => {
  const renderItem = ({ item }: { item: Product }) => (
    <ProductItem product={item} onDelete={onDelete} onUpdate={onUpdate} />
  );

  const getTotalValue = () => {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Valor total del inventario: ₡{getTotalValue().toLocaleString('es-CR')}
        </Text>
      </View>
      
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
});

export default ProductList;