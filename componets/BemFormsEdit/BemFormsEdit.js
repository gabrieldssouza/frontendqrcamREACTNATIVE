import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from 'react-native-dropdown-picker';
import api from "../../services/api";
import { Ionicons } from '@expo/vector-icons'; // Importe o ícone que deseja usar

export default function BemFormEdit(props) {
  const navigation = useNavigation();
  const { id } = props;

  const [Bem, setBem] = useState(null);
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [codigo, setCodigo] = useState('');
  const [dataAquisicao, setAquisicao] = useState('');
  const [estadoConservacao, setEstadoConservacao] = useState('');
  const [valor, setValor] = useState('');
  const [IDcategoria, setIDcategoria] = useState('');
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
        setValueLocal(bem.local_idLocais); // Use setValueLocal para definir o valor inicial do DropDownPicker
        setValueCategoria(bem.categoria_idCategoria); // Use setValueCategoria para definir o valor inicial do DropDownPicker
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
    if (!nome || !numero || !codigo || !estadoConservacao || !valueLocal || !valueCategoria || !responsavelMovimento) {
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
      responsavelMovimento: responsavelMovimento
    };

    try {
      const response = await api.put(`/editarBem`, formData);
      console.log('Bem editado com sucesso:', response.data);
      navigation.navigate('Initial');
      console.log("novo local: "+valueLocal);
    } catch (error) {
      console.error('Erro ao editar bem:', error);
      Alert.alert('Erro', 'Erro ao editar bem. Tente novamente.');
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
        <TextInput value={estadoConservacao} onChangeText={setEstadoConservacao} style={styles.input} />
        <Text>Local:</Text>
        <View style={{ zIndex: openLocal ? 1000 : 1 }}>
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
              zIndex: 1000
            }}
            listItemContainerStyle={{ backgroundColor: '#29304B' }}
            listItemLabelStyle={{ color: 'white' }}
            selectedItemContainerStyle={{ backgroundColor: '#4A6382' }}
            ArrowDownIconComponent={({ style }) => <Ionicons name="chevron-down" size={24} color="white" style={style} />}
            ArrowUpIconComponent={({ style }) => <Ionicons name="chevron-up" size={24} color="white" style={style} />}
            onChangeValue={setValueLocal}
          />
        </View>
        <Text>Categoria:</Text>
        <View style={{ zIndex: openCategoria ? 1000 : 1 }}>
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
            style={{ borderColor: "#ccc", borderWidth: 1, borderRadius: 15, padding: 9, backgroundColor: '#29304B' }}
            dropDownContainerStyle={{
              backgroundColor: '#29304B',
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 10,
              zIndex: 1000
            }}
            listItemContainerStyle={{ backgroundColor: '#29304B' }}
            listItemLabelStyle={{ color: 'white' }}
            selectedItemContainerStyle={{ backgroundColor: '#4A6382' }}
            ArrowDownIconComponent={({ style }) => <Ionicons name="chevron-down" size={24} color="white" style={style} />}
            ArrowUpIconComponent={({ style }) => <Ionicons name="chevron-up" size={24} color="white" style={style} />}
            onChangeValue={setValueCategoria}
          />
        </View>
        <Text>Responsável pelo Movimento:</Text>
        <TextInput value={responsavelMovimento} onChangeText={setResponsavelMovimento} style={styles.input} />
        <TouchableOpacity onPress={handleEditar}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'white', paddingHorizontal: 5, margin: 20 }}>Editar BEM</Text>
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