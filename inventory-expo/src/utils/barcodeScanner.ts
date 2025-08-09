import { Alert } from 'react-native';

export const scanBarcode = async (): Promise<string | null> => {
    try {
        // Simulador de escáner - no requiere módulos nativos
        return new Promise((resolve) => {
            Alert.prompt(
                'Simulador de Escáner',
                'Por favor ingresa un código de barras (o presiona OK para generar uno aleatorio):',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                        onPress: () => resolve(null),
                    },
                    {
                        text: 'OK',
                        onPress: (text) => {
                            const barcode = text || generateRandomBarcode();
                            resolve(barcode);
                        },
                    },
                ],
                'plain-text'
            );
        });
        
    } catch (error) {
        console.error('Error scanning barcode:', error);
        Alert.alert('Error', 'No se pudo escanear el código de barras. Inténtalo de nuevo.');
        return null;
    }
};

const generateRandomBarcode = (): string => {
    return Math.floor(Math.random() * 900000000000) + 100000000000 + '';
};