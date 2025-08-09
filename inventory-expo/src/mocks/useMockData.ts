import { useInventory } from '../context/InventoryContext';
import { mockProducts } from './mockData';
import { Alert } from 'react-native';

export const useMockData = () => {
    const { addProduct, products, removeProduct } = useInventory();

    const loadMockData = () => {
        if (products.length > 0) {
            Alert.alert(
                'Datos existentes',
                'Ya hay productos en el inventario. ¿Quieres agregar los datos de prueba de todas formas?',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Sí, agregar', onPress: () => addMockProducts() },
                ]
            );
        } else {
            addMockProducts();
        }
    };

    const addMockProducts = () => {
        try {
            mockProducts.forEach(product => {
                const { id, ...productData } = product;
                addProduct(productData);
            });
            Alert.alert('Éxito', `Se agregaron ${mockProducts.length} productos de prueba`);
        } catch (error) {
            Alert.alert('Error', 'No se pudieron cargar los datos de prueba');
        }
    };

    const clearAllData = () => {
        Alert.alert(
            'Confirmar eliminación',
            'Esto eliminará TODOS los productos del inventario. ¿Estás seguro?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar todo',
                    style: 'destructive',
                    onPress: () => {
                        products.forEach(product => removeProduct(product.id));
                        Alert.alert('Completado', 'Todos los productos han sido eliminados');
                    },
                },
            ]
        );
    };

    return {
        loadMockData,
        clearAllData,
        mockDataCount: mockProducts.length,
    };
};
