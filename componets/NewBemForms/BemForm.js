import React, { useState } from 'react';
import { ScrollView, Alert, StyleSheet, Dimensions, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BemForm() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [codigo, setCodigo] = useState('');
  const [dataAquisicao, setAquisicao] = useState('');
  const [estadoConservacao, setEstadoConservacao] = useState('');
  const [valor, setValor] = useState('');
  const [local, setLocal] = useState('');
  const [IDcategoria, setIDcategoria] = useState([]);
    const handleCadastrar = async () => {
    let newData = {
      nome,
      numero,
      codigo,
      data_aquisicao: dataAquisicao,
      valor_aquisicao: valor,
      estado_conservacao: estadoConservacao,
      categoria_idCategoria: IDcategoria,
      local: local,
    };
  
    try {
      const response = await fetch('http://192.168.1.23:3000/criarbem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
  
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Erro na solicitação');
      }
  
      console.log('QR Code URL:', result.qrcode);
      Alert.alert("Bem cadastrado com sucesso");
      setNome('');
      setNumero('');
      setCodigo('');
      setAquisicao('');
      setValor('');
      setEstadoConservacao('');
      setIDcategoria('');
      setLocal('');
      navigation.navigate('Initial'); 
    } catch (error) {
      console.error('Erro ao cadastrar bem:', error);
    }
  };

  return (
    <ScrollView>
    <View style={{ margin: "8%" }}>

      <TextInput
        value={nome}
        placeholder="Nome"
        onChangeText={setNome}
        style={styles.input}
        placeholderTextColor="black"
        
      />
      <TextInput
        value={numero}
        placeholder="Número"
        onChangeText={setNumero}
        style={styles.input}
        placeholderTextColor="black"
      />

      
      <TextInput
        value={codigo}
        placeholder="Código"
        onChangeText={setCodigo}
        style={styles.input}
        placeholderTextColor="black"
      />
      <TextInput
        value={dataAquisicao}
        placeholder="Data de Aquisição"
        onChangeText={setAquisicao}
        style={styles.input}
        placeholderTextColor="black"
      />
      <TextInput
        value={valor}
        placeholder="Valor do Bem"
        onChangeText={setValor}
        style={styles.input}
        placeholderTextColor="black"
      />
      <TextInput
        value={estadoConservacao}
        placeholder="Estado de Conservação do Bem"
        onChangeText={setEstadoConservacao}
        style={styles.input}
        placeholderTextColor="black"
      />
      <TextInput
        value={local}
        placeholder="Local que se encontra"
        onChangeText={setLocal}
        style={styles.input}
        placeholderTextColor="black"
      />
      <TextInput
        value={IDcategoria}
        placeholder="Categoria do bem"
        onChangeText={setIDcategoria}
        style={styles.input}
        placeholderTextColor="black"
      />
      <TouchableOpacity onPress={handleCadastrar}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'white', backgroundColor: "#ECAA71", borderRadius: 30, paddingVertical: 10 }}>Adicionar Bem</Text>
        </TouchableOpacity>
      
    </View>
    </ScrollView>
  );
} 

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: Dimensions.get("window").width * 0.85,
        marginVertical: 5,
        borderRadius: 15,
        marginBottom: 10,
        color: "white"
      },
      

})

