import React from 'react';
import { View, Text, Button } from 'react-native';
import ProductList from '../components/ProductList';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../types';

const InventoryScreen: React.FC<{ products: Product[]; onRemoveProduct: (id: string) => void; onUpdateProduct: (product: Product) => void; }> = ({ products, onRemoveProduct, onUpdateProduct }) => {
    const navigation = useNavigation();

    return (
        <View>
            <Text>Inventory</Text>
            <ProductList products={products} onRemoveProduct={onRemoveProduct} onUpdateProduct={onUpdateProduct} />
            <Button title="Add Product" onPress={() => navigation.navigate('AddProductScreen')} />
        </View>
    );
};

export default InventoryScreen;