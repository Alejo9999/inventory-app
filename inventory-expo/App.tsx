import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { InventoryProvider } from './src/context/InventoryContext';
import InventoryScreen from './src/screens/InventoryScreen';
import AddProductScreen from './src/screens/AddProductScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <InventoryProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Inventory"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2196F3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Inventory" 
            component={InventoryScreen}
            options={{ title: 'Inventario' }}
          />
          <Stack.Screen 
            name="AddProduct" 
            component={AddProductScreen}
            options={{ title: 'Agregar Producto' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </InventoryProvider>
  );
}
