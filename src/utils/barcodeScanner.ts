import { RNCamera } from 'react-native-camera';
import { Alert } from 'react-native';

export const scanBarcode = async (onBarcodeScanned) => {
    try {
        const { uri } = await RNCamera.requestCameraPermissionsAsync();
        if (uri) {
            const barcodeData = await RNCamera.scanBarcode();
            onBarcodeScanned(barcodeData);
        }
    } catch (error) {
        Alert.alert('Error', 'Failed to scan barcode. Please try again.');
    }
};