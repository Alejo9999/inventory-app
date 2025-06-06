import React from 'react';
import { View, Button } from 'react-native';
import AddProduct from '../components/AddProduct';

const AddProductScreen = ({ navigation }) => {
    const handleAddProduct = () => {
        // Logic to handle adding the product
        navigation.navigate('Inventory');
    };

    return (
        <View>
            <AddProduct onAddProduct={handleAddProduct} />
        </View>
    );
};

export default AddProductScreen;