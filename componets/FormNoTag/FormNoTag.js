import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, StyleSheet, Dimensions, View, TextInput, TouchableOpacity, Text, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';

export default function FormNoTag() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [codigo, setCodigo] = useState('');
  const [dataAquisicao, setAquisicao] = useState('');
  const [estadoConservacao, setEstadoConservacao] = useState('');
  const [valor, setValor] = useState('');
  const [local, setLocal] = useState('');
  const [IDcategoria, setIDcategoria] = useState('');
  const [foto, setFoto] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);

    }
  };

  const handleCadastrar = async () => {
    if (!nome || !numero || !codigo || !estadoConservacao || !local || !IDcategoria) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('numero', numero);
    formData.append('codigo', codigo);
    formData.append('data_aquisicao', dataAquisicao);
    formData.append('estado_conservacao', estadoConservacao);
    formData.append('valor_aquisicao', valor);
    formData.append('local', local);
    formData.append('categoria_idCategoria', IDcategoria);
    formData.append('etiqueta', true);
    if (foto) {
        const filename = foto.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
        formData.append('foto', {
            uri: foto,
            name: filename,
            type,
        });
    }
    console.log(formData);
    try {
        const response = await api.post('/criarbem', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Bem criado com sucesso:', response.data);
        navigation.navigate('Initial');
    } catch (error) {
        console.error('Erro ao criar bem:', error);
        Alert.alert('Erro', 'Erro ao criar bem. Tente novamente.');
    }
};

  return (
    <ScrollView>
      <View>
        <Text>Nome:</Text>
        <TextInput value={nome} onChangeText={setNome} style={styles.input} />
        <Text>Número:</Text>
        <TextInput value={numero} onChangeText={setNumero} style={styles.input} />
        <Text>Código:</Text>
        <TextInput value={codigo} onChangeText={setCodigo} style={styles.input} />
        <Text>Data de Aquisição:</Text>
        <TextInput value={dataAquisicao} onChangeText={setAquisicao} style={styles.input} />
        <Text>Estado de Conservação:</Text>
        <TextInput value={estadoConservacao} onChangeText={setEstadoConservacao} style={styles.input} />
        <Text>Valor:</Text>
        <TextInput value={valor} onChangeText={setValor} style={styles.input} />
        <Text>Local:</Text>
        <TextInput value={local} onChangeText={setLocal} style={styles.input} />
        <Text>Categoria:</Text>
        <TextInput value={IDcategoria} onChangeText={setIDcategoria} style={styles.input} />
        <Button title="Escolher Foto" onPress={pickImage} />
        {foto && <Image source={{ uri: foto }} style={{ width: 200, height: 200 }} />}
        <TouchableOpacity onPress={handleCadastrar}>
          <Text style={styles.buttonText}>Confirmar</Text>
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
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    backgroundColor: "#ECAA71",
    borderRadius: 30,
    paddingVertical: 10
  }
});