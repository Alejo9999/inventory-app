# Inventory Management App

This is a cross-platform mobile application for managing inventory items, designed for both Android and iOS. The app allows users to easily add, remove, update, and view products in their inventory. 

## Features

- **Add Product**: Users can add new products by scanning barcodes using their device's camera.
- **Remove Product**: Users can remove products from the inventory.
- **Update Product**: Users can update the details of existing products.
- **View Inventory**: Users can view a list of all products in the inventory.

## Project Structure

```
inventory-app
├── src
│   ├── components
│   │   ├── ProductList.tsx
│   │   ├── ProductItem.tsx
│   │   └── AddProduct.tsx
│   ├── screens
│   │   ├── InventoryScreen.tsx
│   │   └── AddProductScreen.tsx
│   ├── utils
│   │   └── barcodeScanner.ts
│   ├── App.tsx
│   └── types
│       └── index.ts
├── android
├── ios
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd inventory-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the application:
   - For Android:
     ```
     npm run android
     ```
   - For iOS:
     ```
     npm run ios
     ```

## Usage

- Launch the app on your device or emulator.
- Use the camera to scan barcodes for adding products.
- Navigate through the app to manage your inventory effectively.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.