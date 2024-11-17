import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, StyleSheet, Dimensions, View, TextInput, TouchableOpacity, Text, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';

export default function BemForm() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [codigo, setCodigo] = useState('');
  const [dataAquisicao, setAquisicao] = useState('');
  const [estadoConservacao, setEstadoConservacao] = useState('');
  const [valor, setValor] = useState('');
  const [openEstadoConservacao, setOpenEstadoConservacao] = useState(false);
  const [local, setLocal] = useState('');
  const [IDcategoria, setIDcategoria] = useState('');
  const [foto, setFoto] = useState(null);

  const [locais, setLocais] = useState([]);
  const [openLocal, setOpenLocal] = useState(false);
  const [valueLocal, setValueLocal] = useState(null);
  const [itemsLocal, setItemsLocal] = useState([]);

  const [categorias, setCategorias] = useState([]);
  const [openCategoria, setOpenCategoria] = useState(false);
  const [valueCategoria, setValueCategoria] = useState(null);
  const [itemsCategoria, setItemsCategoria] = useState([]);

  useEffect(() => {
    const fetchLocais = async () => {
      try {
        const response = await api.get('/listarlocais');
        const result = response.data;
        setLocais(result);
        setItemsLocal(result.map(item => ({ label: item.nome, value: item.idLocais })));
      } catch (error) {
        console.error('Erro ao buscar locais', error);
      }
    };
    fetchLocais();
  }, []);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get('/listarcategorias');
        const result = response.data;
        setCategorias(result);
        setItemsCategoria(result.map(item => ({ label: item.nome, value: item.idCategoria })));
      } catch (error) {
        console.error('Erro ao buscar categorias', error);
      }
    };
    fetchCategorias();
  }, []);

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

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Erro', 'Permissão para acessar a câmera foi negada.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
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
    formData.append('local_idLocais', local);
    formData.append('categoria_idCategoria', IDcategoria);

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
        <Text>Valor:</Text>
        <TextInput value={valor} onChangeText={setValor} style={styles.input} />
        <Text>Estado de Conservação:</Text>
        <View style={{ zIndex: 1000 }}>
          <DropDownPicker
            open={openEstadoConservacao}
            value={estadoConservacao}
            items={[
              { label: 'Ótimo', value: 'ótimo' },
              { label: 'Bom', value: 'bom' },
              { label: 'Ruim', value: 'ruim' },
              { label: 'Péssimo', value: 'péssimo' }
            ]}
            setOpen={setOpenEstadoConservacao}
            setValue={setEstadoConservacao}
            placeholder="Selecione o estado de conservação"
            placeholderStyle={{ color: '#ccc' }}
            containerStyle={{ height: 40, width: Dimensions.get("window").width * 0.85, marginBottom: 10 }}
            style={{ borderColor: "#ccc", borderWidth: 1, borderRadius: 15, padding: 9, backgroundColor: '#29304B' }}
            dropDownContainerStyle={{
              backgroundColor: '#29304B',
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 10,
              zIndex: 1000
            }}
            listItemContainerStyle={{ zIndex: 1000 }}
          />
        </View>
        <Text>Local:</Text>
        <View style={{ zIndex: 900 }}>
          <DropDownPicker
            open={openLocal}
            value={valueLocal}
            items={itemsLocal}
            setOpen={setOpenLocal}
            setValue={setValueLocal}
            setItems={setItemsLocal}
            placeholder="Selecione um local"
            placeholderStyle={{ color: '#ccc' }}
            containerStyle={{ height: 40, width: Dimensions.get("window").width * 0.85, marginBottom: 10 }}
            style={{ borderColor: "#ccc", borderWidth: 1, borderRadius: 15, padding: 9, backgroundColor: '#29304B' }}
            dropDownContainerStyle={{
              backgroundColor: '#29304B',
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 10,
              zIndex: 900
            }}
            onChangeValue={setLocal}
          />
        </View>
        <Text>Categoria:</Text>
        <View style={{ zIndex: 800 }}>
          <DropDownPicker
            open={openCategoria}
            value={valueCategoria}
            items={itemsCategoria}
            setOpen={setOpenCategoria}
            setValue={setValueCategoria}
            setItems={setItemsCategoria}
            placeholder="Selecione uma categoria"
            placeholderStyle={{ color: '#ccc' }}
            containerStyle={{ height: 40, width: Dimensions.get("window").width * 0.85, marginBottom: 10 }}
            style={{ borderColor: "#ccc", borderWidth: 1, borderRadius: 15, padding: 9, backgroundColor: '#29304B'}}
            dropDownContainerStyle={{
              backgroundColor: '#29304B',
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 10,
              zIndex: 800
            }}
            dropDownDirection="DOWN"
            onChangeValue={setIDcategoria}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Button title="Escolher Foto" onPress={pickImage} />
          <Button title="Tirar Foto" onPress={takePhoto} />
        </View>
        {foto && <Image source={{ uri: foto }} style={{ width: 200, height: 200, alignSelf: 'center', marginBottom: 10 }} />}
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