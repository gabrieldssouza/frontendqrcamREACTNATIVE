import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from 'react-native-dropdown-picker';
import api from "../../services/api";
import { Ionicons } from '@expo/vector-icons'; 

export default function BemFormEdit(props) {
  const navigation = useNavigation();
  const { id } = props;
  const [openEstadoConservacao, setOpenEstadoConservacao] = useState(false);
  const [local, setLocal] = useState('');
  const [IDcategoria, setIDcategoria] = useState('');

  const [Bem, setBem] = useState(null);
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [codigo, setCodigo] = useState('');
  const [dataAquisicao, setAquisicao] = useState('');
  const [estadoConservacao, setEstadoConservacao] = useState('');
  const [valor, setValor] = useState('');
  const [responsavelMovimento, setResponsavelMovimento] = useState('');

  const [locais, setLocais] = useState([]);
  const [openLocal, setOpenLocal] = useState(false);
  const [valueLocal, setValueLocal] = useState(null);
  const [itemsLocal, setItemsLocal] = useState([]);

  const [categorias, setCategorias] = useState([]);
  const [openCategoria, setOpenCategoria] = useState(false);
  const [valueCategoria, setValueCategoria] = useState(null);
  const [itemsCategoria, setItemsCategoria] = useState([]);

  useEffect(() => {
    const fetchBem = async () => {
      try {
        const response = await api.get(`/listarBem/${id}`);
        const bem = response.data;
        setNome(bem.nome);
        setNumero(bem.numero);
        setCodigo(bem.codigo);
        setAquisicao(bem.data_aquisicao);
        setEstadoConservacao(bem.estado_conservacao);
        setValor(bem.valor_aquisicao);
        setValueLocal(bem.local_idLocais); 
        setValueCategoria(bem.categoria_idCategoria);
        setResponsavelMovimento(bem.responsavel_movimento);
      } catch (error) {
        console.error('Erro ao buscar bem:', error);
      }
    };

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

    fetchBem();
    fetchLocais();
    fetchCategorias();
  }, [id]);

  const handleEditar = async () => {
    if (!nome || !numero || !codigo || !estadoConservacao || !valueLocal || !valueCategoria ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    const formData = {
      idbem: id,
      nome,
      numero,
      codigo,
      data_aquisicao: dataAquisicao,
      estado_conservacao: estadoConservacao,
      valor_aquisicao: valor,
      local_idLocais: valueLocal,
      categoria_idCategoria: valueCategoria,
    };

    console.log(formData)

    try {
      const response = await api.put('/editarBem', formData);
      console.log('Bem editado com sucesso:', response.data);
      navigation.navigate('BemLocLev');
      console.log("editado ");
    } catch (error) {
      console.error('Erro ao editar bem:', error);
      Alert.alert('Erro', 'Erro ao editar bem. Tente novamente.');
    }
    navigation.navigate('BemLocLev');
  };

  return (
    <ScrollView>
      <View>
        <Text style={{color:"white"}}>Nome:</Text>
        <TextInput value={nome} onChangeText={setNome} style={styles.input} />
        <Text style={{color:"white"}}>Número:</Text>
        <TextInput value={numero} onChangeText={setNumero} style={styles.input} />
        <Text style={{color:"white"}}>Código:</Text>
        <TextInput value={codigo} onChangeText={setCodigo} style={styles.input} />
        <Text style={{color:"white"}}>Data de Aquisição:</Text>
        <TextInput value={dataAquisicao} onChangeText={setAquisicao} style={styles.input} />
        <Text style={{color:"white"}}>Valor:</Text>
        <TextInput value={valor} onChangeText={setValor} style={styles.input} />
        <Text style={{color:"white"}}>Estado de Conservação:</Text>
        <View style={{ zIndex: openEstadoConservacao ? 2000 : 1000 }}>
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
    containerStyle={{
      zIndex: openEstadoConservacao ? 2000 : 1000,
      height: 40,
      width: Dimensions.get("window").width * 0.85,
      marginBottom: 10
    }}
    style={{ borderColor: "#ccc", borderWidth: 1, borderRadius: 15, padding: 9, backgroundColor: '#29304B' }}
    dropDownContainerStyle={{
      backgroundColor: '#29304B',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      zIndex: 2000
    }}
    textStyle={{
      color: '#D1D5DB', 
    }}
    arrowIconStyle={{
      tintColor: '#ECAA71', // Cor da seta
    }}
  />
</View>

<Text style={{color:"white", marginVertical: 5,
    borderRadius: 15,
    marginTop: 10,}}>Local:</Text>
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
    containerStyle={{
      zIndex: openLocal ? 2000 : 1000,
      height: 40,
      width: Dimensions.get("window").width * 0.85,
      marginBottom: 10
    }}
    style={{ borderColor: "#ccc", borderWidth: 1, borderRadius: 15, padding: 9, backgroundColor: '#29304B' }}
    dropDownContainerStyle={{
      backgroundColor: '#29304B',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      zIndex: 2000
    }}
    textStyle={{
      color: '#D1D5DB', 
    }}
    onChangeValue={setLocal}
    arrowIconStyle={{
      tintColor: '#ECAA71', // Cor da seta
    }}
  />
</View>
<Text style={{color:"white", marginVertical: 5,
    borderRadius: 15,
    marginTop: 10}}>Categoria:</Text>
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
            onChangeValue={setIDcategoria}   textStyle={{
              color: '#D1D5DB', 
            }}
            arrowIconStyle={{
              tintColor: '#ECAA71', // Cor da seta
            }}
          />
        </View>
        <TouchableOpacity onPress={() => handleEditar()}>
          <Text style={{ paddingHorizontal: 5, margin: 20 , fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'white',  width: Dimensions.get("window").width * 0.85, backgroundColor: "#ECAA71", borderRadius: 30, paddingVertical: 10 }}>Editar BEM</Text>
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
  },buttonContainer: {
    flexDirection: 'row',
    justifyContent: "space-around",
    marginBottom: 10
  },
});