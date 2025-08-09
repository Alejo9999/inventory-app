import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { InventoryProvider } from './context/InventoryContext';
import InventoryScreen from './screens/InventoryScreen';
import AddProductScreen from './screens/AddProductScreen';

const Stack = createStackNavigator();

const App = () => {
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
};

export default App;