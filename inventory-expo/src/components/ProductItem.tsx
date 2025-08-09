import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput, Modal } from 'react-native';
import { Product } from '../types';

interface ProductItemProps {
  product: Product;
  onUpdate: (id: string, updates: Partial<Product>) => void;
  onDelete: (id: string) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(product.name);
  const [editQuantity, setEditQuantity] = useState(product.quantity.toString());
  const [editPrice, setEditPrice] = useState(product.price.toString());

  const handleUpdate = () => {
    if (!editName.trim()) {
      Alert.alert('Error', 'El nombre no puede estar vacío');
      return;
    }
    
    const newQuantity = parseInt(editQuantity, 10);
    const newPrice = parseFloat(editPrice);
    
    if (isNaN(newQuantity) || newQuantity < 0) {
      Alert.alert('Error', 'La cantidad debe ser un número válido mayor o igual a 0');
      return;
    }
    
    if (isNaN(newPrice) || newPrice <= 0) {
      Alert.alert('Error', 'El precio debe ser un número válido mayor a 0');
      return;
    }

    onUpdate(product.id, {
      name: editName.trim(),
      quantity: newQuantity,
      price: newPrice,
    });
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(product.name);
    setEditQuantity(product.quantity.toString());
    setEditPrice(product.price.toString());
    setIsEditing(false);
  };

  const handleQuickQuantityUpdate = (change: number) => {
    const newQuantity = Math.max(0, product.quantity + change);
    onUpdate(product.id, { quantity: newQuantity });
  };

  const getStockStatus = () => {
    if (product.quantity === 0) return { text: 'Sin stock', color: '#f44336' };
    if (product.quantity < 5) return { text: 'Stock bajo', color: '#ff9800' };
    return { text: 'En stock', color: '#4caf50' };
  };

  const stockStatus = getStockStatus();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{product.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: stockStatus.color }]}>
          <Text style={styles.statusText}>{stockStatus.text}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.detail}>Código: {product.barcode}</Text>
        <Text style={styles.detail}>
          Cantidad: <Text style={styles.quantity}>{product.quantity}</Text>
        </Text>
        <Text style={styles.detail}>
          Precio: <Text style={styles.price}>₡{product.price.toLocaleString('es-CR')}</Text>
        </Text>
        <Text style={styles.detail}>
          Valor total: <Text style={styles.totalValue}>
            ₡{(product.price * product.quantity).toLocaleString('es-CR')}
          </Text>
        </Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.quantityButton, styles.decreaseButton]}
          onPress={() => handleQuickQuantityUpdate(-1)}
          disabled={product.quantity === 0}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.quantityButton, styles.increaseButton]}
          onPress={() => handleQuickQuantityUpdate(1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => setIsEditing(true)}
        >
          <Text style={styles.buttonText}>✏️ Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.removeButton]}
          onPress={() => onDelete(product.id)}
        >
          <Text style={styles.buttonText}>🗑️ Eliminar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de edición */}
      <Modal
        visible={isEditing}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Editar Producto</Text>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                value={editName}
                onChangeText={setEditName}
                placeholder="Nombre del producto"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Cantidad</Text>
              <TextInput
                style={styles.input}
                value={editQuantity}
                onChangeText={setEditQuantity}
                keyboardType="numeric"
                placeholder="Cantidad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Precio (₡)</Text>
              <TextInput
                style={styles.input}
                value={editPrice}
                onChangeText={setEditPrice}
                keyboardType="decimal-pad"
                placeholder="Precio"
              />
            </View>
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={handleUpdate}
            >
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  details: {
    marginBottom: 12,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  quantity: {
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontWeight: 'bold',
    color: '#2196F3',
  },
  totalValue: {
    fontWeight: 'bold',
    color: '#4caf50',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  decreaseButton: {
    backgroundColor: '#ff5722',
  },
  increaseButton: {
    backgroundColor: '#4caf50',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  removeButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    backgroundColor: '#2196F3',
    paddingVertical: 20,
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  modalContent: {
    flex: 1,
    padding: 20,
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
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 0,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#4caf50',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProductItem;