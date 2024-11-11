
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

 export default function CameraLevantamento({route}) {
  const [facing, setFacing] = useushState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);
  const navigation = useNavigation();
  const idLevantamento = route.params?.idLevantamento;
  const idLocal = route.params?.idLocal;
  console.log("idLevantamento recebido:", idLevantamento);

  console.log("id levantamento cam", idLevantamento)


  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarcodeScanned = async ({ type, data }) => {
    setScanned(true);
    let idbem;  // Definir idbem aqui para usar em todo o escopo da função
  
    try {
      const qrJson = JSON.parse(data);
      console.log('QR JSON:', qrJson);
  
      if (!qrJson.idbem) {
        throw new Error('idbem não encontrado no QR code');
      }
  
      idbem = qrJson.idbem;  // Atribuir idbem aqui
      console.log('ID do Bem:', idbem);

  
      const response = await fetch(`http://192.168.1.56:3000/listarbem/${idbem}`);
      if (!response.ok) {
        throw new Error('Erro ao pegar dados');
      }
      const bem = await response.json();
      console.log("testando o if de local errado:", bem.idLocais + " 2: " + idLocal)
      if (bem.idLocais != idLocal){
        //pega e ja coloca um aviso de lugar errado entao vai faz a routa de edição puxa deixa tudo igual
        // e muda o pendencias locais para false 
        //aproveita q ta ai e faz a mudanca de lugar, enviando avisos para ambas as pessoas
        
        navigation.navigate('EditBemLev', { id: idbem, pendenciaLocal: false }); 
      }

      navigation.navigate('EditBemLev', { id: idbem });
  
      // Criação do novo objeto com os dados do bem
      let newData = {
        bem_idbem: idbem,
        Levantamento_idLevantamento: idLevantamento  // Verifique se isso é o que você precisa
      };
      console.log("data: ", newData);
  
      // Requisição para adicionar o bem ao levantamento
      console.log("entrou no try do add ");
      const addResponse = await fetch('http://192.168.1.56:3000/addBensLevantamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
  
      const result = await addResponse.json();
      if (!addResponse.ok) {
        throw new Error(result.message || 'Erro na solicitação');
      }
  
      // Navegação para a tela inicial só após o sucesso da requisição POST

    } catch (error) {
      console.error('Erro ao processar QR code', error);
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