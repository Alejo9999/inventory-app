import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useInventory } from '../context/InventoryContext';
import { useMockData } from '../mocks/useMockData';
import ProductList from '../components/ProductList';

const InventoryScreen: React.FC = () => {
    const navigation = useNavigation();
    const { products, removeProduct, updateProduct } = useInventory();
    const { loadMockData, clearAllData, mockDataCount } = useMockData();

    const handleRemoveProduct = (id: string) => {
        Alert.alert(
            'Confirmar eliminación',
            '¿Estás seguro de que quieres eliminar este producto?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => removeProduct(id),
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Total de productos: {products.length}
                </Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddProduct' as never)}
                >
                    <Text style={styles.addButtonText}>+ Agregar Producto</Text>
                </TouchableOpacity>
            </View>
            
            {products.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No hay productos en el inventario</Text>
                    <Text style={styles.emptySubtext}>Agrega tu primer producto para comenzar</Text>
                    
                    <View style={styles.mockDataButtons}>
                        <TouchableOpacity
                            style={styles.mockDataButton}
                            onPress={loadMockData}
                        >
                            <Text style={styles.mockDataButtonText}>
                                📦 Cargar {mockDataCount} productos de prueba
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.inventoryContainer}>
                    <View style={styles.toolsContainer}>
                        <TouchableOpacity
                            style={styles.toolButton}
                            onPress={loadMockData}
                        >
                            <Text style={styles.toolButtonText}>📦 + Datos de prueba</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={[styles.toolButton, styles.clearButton]}
                            onPress={clearAllData}
                        >
                            <Text style={[styles.toolButtonText, styles.clearButtonText]}>🗑️ Limpiar todo</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <ProductList 
                        products={products} 
                        onDelete={handleRemoveProduct} 
                        onUpdate={updateProduct} 
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#fff',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    addButton: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginBottom: 24,
    },
    mockDataButtons: {
        marginTop: 20,
        width: '100%',
    },
    mockDataButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    mockDataButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    inventoryContainer: {
        flex: 1,
    },
    toolsContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    toolButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    clearButton: {
        backgroundColor: '#f44336',
    },
    toolButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    clearButtonText: {
        color: '#fff',
    },
});

export default InventoryScreen;