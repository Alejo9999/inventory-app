export interface Product {
    id: string;
    name: string;
    quantity: number;
    barcode: string;
    price: number;
}

export interface InventoryContextType {
    products: Product[];
    addProduct: (product: Omit<Product, 'id'>) => void;
    removeProduct: (id: string) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
    findProductByBarcode: (barcode: string) => Product | undefined;
}