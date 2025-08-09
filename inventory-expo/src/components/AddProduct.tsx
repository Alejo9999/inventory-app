import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert, ScrollView } from 'react-native';
import { scanBarcode } from '../utils/barcodeScanner';

interface ProductData {
    name: string;
    quantity: number;
    barcode: string;
    price: number;
}

interface AddProductProps {
    onAddProduct: (product: ProductData) => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onAddProduct }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [barcode, setBarcode] = useState('');
    const [price, setPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (): boolean => {
        if (!name.trim()) {
            Alert.alert('Error', 'El nombre del producto es requerido');
            return false;
        }
        if (!quantity.trim() || isNaN(Number(quantity)) || Number(quantity) <= 0) {
            Alert.alert('Error', 'La cantidad debe ser un número mayor a 0');
            return false;
        }
        if (!barcode.trim()) {
            Alert.alert('Error', 'El código de barras es requerido');
            return false;
        }
        if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
            Alert.alert('Error', 'El precio debe ser un número mayor a 0');
            return false;
        }
        return true;
    };

    const handleAddProduct = () => {
        if (!validateForm()) return;

        const productData: ProductData = {
            name: name.trim(),
            quantity: parseInt(quantity, 10),
            barcode: barcode.trim(),
            price: parseFloat(price),
        };

        onAddProduct(productData);
        
        // Limpiar formulario
        setName('');
        setQuantity('');
        setBarcode('');
        setPrice('');
    };

    const handleScanBarcode = async () => {
        setIsLoading(true);
        try {
            const scannedBarcode = await scanBarcode();
            if (scannedBarcode) {
                setBarcode(scannedBarcode);
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo escanear el código de barras. Inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Agregar Nuevo Producto</Text>
            
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre del Producto *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej: Coca Cola 500ml"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Cantidad *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej: 10"
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Precio (₡) *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej: 1500.00"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="decimal-pad"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Código de Barras *</Text>
                <TextInput
                    style={[styles.input, styles.barcodeInput]}
                    placeholder="Escanea o ingresa manualmente"
                    value={barcode}
                    onChangeText={setBarcode}
                    editable={!isLoading}
                />
                <TouchableOpacity
                    style={[styles.scanButton, isLoading && styles.scanButtonDisabled]}
                    onPress={handleScanBarcode}
                    disabled={isLoading}
                >
                    <Text style={styles.scanButtonText}>
                        {isLoading ? 'Escaneando...' : '📷 Escanear'}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddProduct}
            >
                <Text style={styles.addButtonText}>Agregar Producto</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    barcodeInput: {
        marginBottom: 10,
    },
    scanButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    scanButtonDisabled: {
        backgroundColor: '#ccc',
    },
    scanButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddProduct;