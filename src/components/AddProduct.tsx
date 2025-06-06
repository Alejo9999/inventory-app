import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { scanBarcode } from '../utils/barcodeScanner';

const AddProduct = ({ onAddProduct }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [barcode, setBarcode] = useState('');

    const handleAddProduct = () => {
        if (name && quantity && barcode) {
            onAddProduct({ name, quantity: parseInt(quantity), barcode });
            setName('');
            setQuantity('');
            setBarcode('');
        }
    };

    const handleScanBarcode = async () => {
        const scannedBarcode = await scanBarcode();
        if (scannedBarcode) {
            setBarcode(scannedBarcode);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Quantity"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Barcode"
                value={barcode}
                onChangeText={setBarcode}
                editable={false}
            />
            <Button title="Scan Barcode" onPress={handleScanBarcode} />
            <Button title="Add Product" onPress={handleAddProduct} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
});

export default AddProduct;