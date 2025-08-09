import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useInventory } from '../context/InventoryContext';
import AddProduct from '../components/AddProduct';

interface ProductData {
    name: string;
    quantity: number;
    barcode: string;
    price: number;
}

const AddProductScreen: React.FC = () => {
    const navigation = useNavigation();
    const { addProduct, findProductByBarcode, updateProduct } = useInventory();

    const handleAddProduct = (productData: ProductData) => {
        try {
            // Verificar si el producto ya existe
            const existingProduct = findProductByBarcode(productData.barcode);
            
            if (existingProduct) {
                Alert.alert(
                    'Producto existente',
                    `El producto "${existingProduct.name}" ya existe. ¿Quieres actualizar su cantidad?`,
                    [
                        {
                            text: 'Cancelar',
                            style: 'cancel',
                        },
                        {
                            text: 'Actualizar',
                            onPress: () => {
                                updateProduct(existingProduct.id, {
                                    quantity: existingProduct.quantity + productData.quantity,
                                    price: productData.price, // Actualizar precio también
                                });
                                Alert.alert(
                                    'Éxito',
                                    'Cantidad actualizada correctamente',
                                    [{ text: 'OK', onPress: () => navigation.goBack() }]
                                );
                            },
                        },
                    ]
                );
            } else {
                addProduct(productData);
                Alert.alert(
                    'Éxito',
                    'Producto agregado correctamente',
                    [{ text: 'OK', onPress: () => navigation.goBack() }]
                );
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo agregar el producto. Inténtalo de nuevo.');
        }
    };

    return (
        <View style={styles.container}>
            <AddProduct onAddProduct={handleAddProduct} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
});

export default AddProductScreen;