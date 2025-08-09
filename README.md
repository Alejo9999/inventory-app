# 📦 Inventory App - Aplicación de Gestión de Inventario

Una aplicación móvil multiplataforma desarrollada en React Native para gestionar inventarios de manera eficiente con escaneo de códigos de barras.

## 🚀 Funcionalidades Implementadas

### ✅ MVP Funcional Completado

#### 1. **Gestión Básica de Productos**
- ✅ **Añadir Producto**: Introducir manualmente código de barras, nombre, cantidad inicial y precio
- ✅ **Quitar Producto**: Eliminar productos del inventario con confirmación
- ✅ **Actualizar Producto**: Modificar cantidad, nombre o precio de productos existentes
- ✅ **Visualización del Inventario**: Lista completa con todos los detalles del producto

#### 2. **Escaneo de Códigos de Barras**
- ✅ **Integración con cámara**: Funcionalidad de escaneo implementada (actualmente con simulador)
- ✅ **Identificación de productos existentes**: Detecta si el producto ya existe en el inventario
- ✅ **Pre-llenado inteligente**: Auto-completa campos para productos existentes
- ✅ **Registro de nuevos productos**: Facilita el registro con código de barras pre-llenado

#### 3. **Persistencia de Datos Local**
- ✅ **Almacenamiento automático**: Guarda el inventario en AsyncStorage
- ✅ **Carga automática**: Restaura el inventario al iniciar la aplicación
- ✅ **Sincronización en tiempo real**: Los datos se guardan automáticamente con cada cambio

#### 4. **Interfaz de Usuario Intuitiva**
- ✅ **Navegación fluida**: Stack Navigator para moverse entre pantallas
- ✅ **Mensajes de éxito/error**: Retroalimentación clara para todas las operaciones
- ✅ **Diseño moderno**: UI/UX optimizada para móviles
- ✅ **Indicadores de stock**: Alertas visuales para productos con stock bajo o agotados

## 🎯 Características Destacadas

### 📊 **Dashboard de Inventario**
- Contador total de productos
- Valor total del inventario
- Estados de stock visuales (En stock, Stock bajo, Sin stock)
- Acciones rápidas para ajustar cantidades (+/-)

### 🔍 **Gestión Inteligente de Productos**
- Detección automática de productos duplicados
- Actualización de cantidades en productos existentes
- Validación de formularios completa
- Edición in-situ con modal especializado

### 💰 **Control Financiero**
- Seguimiento de precios por producto
- Cálculo automático de valor total por producto
- Valor total del inventario en tiempo real
- Formato de moneda localizado (Colones ₡)

### 🎨 **Experiencia de Usuario**
- Interfaz limpia y moderna
- Iconos intuitivos para todas las acciones
- Confirmaciones de seguridad para operaciones críticas
- Indicadores de carga y estados

## 🛠️ Tecnologías Utilizadas

- **React Native 0.64.2**: Framework principal
- **TypeScript**: Tipado estático para mayor robustez
- **React Navigation 6**: Navegación moderna entre pantallas
- **AsyncStorage**: Persistencia de datos local
- **React Context**: Gestión de estado global
- **UUID**: Generación de IDs únicos para productos

## 📱 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── AddProduct.tsx   # Formulario para agregar productos
│   ├── ProductItem.tsx  # Item individual del producto
│   └── ProductList.tsx  # Lista de productos
├── context/             # Contextos de React
│   └── InventoryContext.tsx  # Estado global del inventario
├── screens/             # Pantallas principales
│   ├── AddProductScreen.tsx  # Pantalla para agregar productos
│   └── InventoryScreen.tsx   # Pantalla principal del inventario
├── types/               # Definiciones de tipos TypeScript
│   └── index.ts
├── utils/               # Utilidades y helpers
│   └── barcodeScanner.ts     # Lógica del escáner de códigos
└── App.tsx              # Componente principal
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 14 o superior
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS)

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tuusuario/inventory-app.git
   cd inventory-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Ejecutar en Android**
   ```bash
   npm run android
   ```

4. **Ejecutar en iOS**
   ```bash
   npm run ios
   ```

## 📋 Uso de la Aplicación

### Agregar un Producto
1. Toca el botón "+ Agregar Producto"
2. Completa el formulario con:
   - Nombre del producto
   - Cantidad inicial
   - Precio en colones
   - Código de barras (manual o escaneado)
3. Toca "Agregar Producto"

### Gestionar Productos Existentes
- **Ajustar cantidad**: Usa los botones +/- para cambios rápidos
- **Editar completo**: Toca "Editar" para modificar todos los campos
- **Eliminar**: Toca "Eliminar" y confirma la acción

### Escanear Códigos de Barras
1. En el formulario de agregar producto, toca "📷 Escanear"
2. Permite acceso a la cámara
3. El código se detectará automáticamente
4. Si el producto existe, se pre-llenarán los campos para actualización

## 🔮 Próximas Mejoras Planificadas

### 📸 **Escáner Real de Códigos de Barras**
- Integración con react-native-camera
- Soporte para múltiples formatos de códigos
- Escáner en tiempo real con overlay

### 📊 **Reportes y Analytics**
- Productos más vendidos
- Historial de movimientos
- Alertas de restock automático
- Exportación de datos

### 🔄 **Sincronización en la Nube**
- Backup automático en la nube
- Sincronización entre dispositivos
- Colaboración en equipo

### 🏷️ **Categorización Avanzada**
- Organización por categorías
- Filtros y búsqueda avanzada
- Etiquetas personalizadas

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

⭐ ¡No olvides dar una estrella al proyecto si te resulta útil!