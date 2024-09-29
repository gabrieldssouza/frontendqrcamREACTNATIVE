import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

export default function InventoryCameraScreen({ route }) {
    const { salaId } = route.params;
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scannedItems, setScannedItems] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarcodeScanned = ({ type, data }) => {
        setScanned(true);
        const item = JSON.parse(data);
        setScannedItems([...scannedItems, item]);
        setScanned(false);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera
                style={StyleSheet.absoluteFillObject}
                onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => setScanned(false)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Escanear novamente</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('VerificationScreen', { scannedItems, salaId })}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Verificar Bens</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    button: {
        padding: 10,
        backgroundColor: '#ECAA71',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});