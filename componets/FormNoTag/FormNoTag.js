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
    formData.append('etiqueta',  false);

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
        <Text style={styles.label}>Nome:</Text>
        <TextInput value={nome} onChangeText={setNome} style={styles.input} />
        <Text style={styles.label}>Número:</Text>
        <TextInput value={numero} onChangeText={setNumero} style={styles.input} />
        <Text style={styles.label}>Código:</Text>
        <TextInput value={codigo} onChangeText={setCodigo} style={styles.input} />
        <Text style={styles.label}>Data de Aquisição:</Text>
        <TextInput value={dataAquisicao} onChangeText={setAquisicao} style={styles.input} />
        <Text style={styles.label}>Estado de Conservação:</Text>
        <TextInput value={estadoConservacao} onChangeText={setEstadoConservacao} style={styles.input} />
        <Text style={styles.label}>Valor:</Text>
        <TextInput value={valor} onChangeText={setValor} style={styles.input} />
        <Text style={styles.label}>Local:</Text>
        <View style={{ zIndex: openLocal ? 2000 : 1000 }}>
          <DropDownPicker
            open={openLocal}
            value={valueLocal}
            items={itemsLocal}
            setOpen={setOpenLocal}
            setValue={setValueLocal}
            setItems={setItemsLocal}
            placeholder="Selecione um local"
            placeholderStyle={{ color: '#ccc' }}
            containerStyle={styles.dropDownContainer}
            style={styles.dropDown}
            dropDownContainerStyle={styles.dropDownList}
            onChangeValue={setLocal}
          />
        </View>
        <Text style={styles.label}>Categoria:</Text>
        <View style={{ zIndex: openCategoria ? 2000 : 800 }}>
          <DropDownPicker
            open={openCategoria}
            value={valueCategoria}
            items={itemsCategoria}
            setOpen={setOpenCategoria}
            setValue={setValueCategoria}
            setItems={setItemsCategoria}
            placeholder="Selecione uma categoria"
            placeholderStyle={{ color: '#ccc' }}
            containerStyle={styles.dropDownContainer}
            style={styles.dropDown}
            dropDownContainerStyle={styles.dropDownList}
            dropDownDirection="DOWN"
            onChangeValue={setIDcategoria}
          />
        </View>

        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.buttonFoto}>Escolher Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto}>
          <Text style={styles.buttonFoto}>Tirar Foto</Text>
        </TouchableOpacity>
        </View>
        {foto && <Image source={{ uri: foto }} style={styles.image} />}
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
    color: "white",
    backgroundColor: '#29304B'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    backgroundColor: "#ECAA71",
    borderRadius: 30,
    paddingVertical: 10
  }, buttonFoto: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    backgroundColor: "#ECAA71",
    borderRadius: 30,
    paddingHorizontal: 30, 
    paddingVertical: 10, 
    marginTop: 10
  },
  label: {
    color: 'white',
    marginBottom: 5
  },
  dropDownContainer: {
    height: 40,
    width: Dimensions.get("window").width * 0.85,
    marginBottom: 10,
    zIndex: 2000,
  },
  dropDown: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    padding: 9,
    backgroundColor: '#29304B'
  },
  dropDownList: {
    backgroundColor: '#29304B',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    zIndex: 2000
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: "space-around",
    marginBottom: 10
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 10
  }
});
