import { Product } from '../types';

export const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Coca Cola 500ml',
        quantity: 25,
        barcode: '7501055300006',
        price: 1500.00
    },
    {
        id: '2',
        name: 'Pepsi 600ml',
        quantity: 18,
        barcode: '7501055301006',
        price: 1600.00
    },
    {
        id: '3',
        name: 'Agua Cristal 1L',
        quantity: 50,
        barcode: '7501055302006',
        price: 800.00
    },
    {
        id: '4',
        name: 'Galletas Oreo',
        quantity: 12,
        barcode: '7501055303006',
        price: 2200.00
    },
    {
        id: '5',
        name: 'Leche Dos Pinos 1L',
        quantity: 8,
        barcode: '7501055304006',
        price: 1850.00
    },
    {
        id: '6',
        name: 'Pan Bimbo Integral',
        quantity: 15,
        barcode: '7501055305006',
        price: 1200.00
    },
    {
        id: '7',
        name: 'Arroz Tío Pelón 1kg',
        quantity: 30,
        barcode: '7501055306006',
        price: 1100.00
    },
    {
        id: '8',
        name: 'Aceite Capullo 1L',
        quantity: 6,
        barcode: '7501055307006',
        price: 3200.00
    }
];

export const mockProductData = {
    valid: {
        name: 'Producto Test',
        quantity: 10,
        barcode: '1234567890123',
        price: 1500.00
    },
    invalid: {
        emptyName: {
            name: '',
            quantity: 10,
            barcode: '1234567890123',
            price: 1500.00
        },
        negativeQuantity: {
            name: 'Producto Test',
            quantity: -5,
            barcode: '1234567890123',
            price: 1500.00
        },
        emptyBarcode: {
            name: 'Producto Test',
            quantity: 10,
            barcode: '',
            price: 1500.00
        },
        negativePrice: {
            name: 'Producto Test',
            quantity: 10,
            barcode: '1234567890123',
            price: -100.00
        }
    }
};
