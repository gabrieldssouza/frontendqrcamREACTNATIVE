import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarcodeScanned = async ({ type, data }) => {
    setScanned(true);
  
    try {
      const qrJson = JSON.parse(data);
      console.log('QR JSON:', qrJson);
  
      if (!qrJson.idbem) {
        throw new Error('idbem não encontrado no QR code');
      }
  
      const { idbem } = qrJson;
      console.log('ID do Bem:', idbem);
  
<<<<<<< HEAD
      const response = await fetch(`http://192.168.1.167:3000/listarbem/${idbem}`);
=======
      const response = await fetch(`http://192.168.1.23:3000/listarbem/${idbem}`);
>>>>>>> gabriel
      if (!response.ok) {
        throw new Error('Erro ao pegar dados');
      }
      const bem = await response.json();
      navigation.navigate('Bem', { idbem });
    } catch (error) {
      console.error('Erro ao buscar bem', error);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        type={facing}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />
      {qrData && <Text>{qrData}</Text>}
      <TouchableOpacity onPress={() => setScanned(false)} style={styles.button}>
        <Text style={styles.buttonText}>Escanear novamente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});