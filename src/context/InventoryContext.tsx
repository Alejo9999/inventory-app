import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { Product, InventoryContextType } from '../types';

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

const STORAGE_KEY = '@inventory_products';

interface InventoryProviderProps {
    children: ReactNode;
}

export const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);

    // Cargar productos al iniciar la app
    useEffect(() => {
        loadProducts();
    }, []);

    // Guardar productos cada vez que cambien
    useEffect(() => {
        saveProducts();
    }, [products]);

    const loadProducts = async () => {
        try {
            const storedProducts = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedProducts) {
                setProducts(JSON.parse(storedProducts));
            }
        } catch (error) {
            console.error('Error loading products:', error);
        }
    };

    const saveProducts = async () => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        } catch (error) {
            console.error('Error saving products:', error);
        }
    };

    const addProduct = (productData: Omit<Product, 'id'>) => {
        const newProduct: Product = {
            ...productData,
            id: uuidv4(),
        };
        setProducts(prev => [...prev, newProduct]);
    };

    const removeProduct = (id: string) => {
        setProducts(prev => prev.filter(product => product.id !== id));
    };

    const updateProduct = (id: string, updates: Partial<Product>) => {
        setProducts(prev =>
            prev.map(product =>
                product.id === id ? { ...product, ...updates } : product
            )
        );
    };

    const findProductByBarcode = (barcode: string): Product | undefined => {
        return products.find(product => product.barcode === barcode);
    };

    const value: InventoryContextType = {
        products,
        addProduct,
        removeProduct,
        updateProduct,
        findProductByBarcode,
    };

    return (
        <InventoryContext.Provider value={value}>
            {children}
        </InventoryContext.Provider>
    );
};

export const useInventory = (): InventoryContextType => {
    const context = useContext(InventoryContext);
    if (context === undefined) {
        throw new Error('useInventory must be used within an InventoryProvider');
    }
    return context;
};
