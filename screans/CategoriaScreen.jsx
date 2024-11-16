
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BoxBem from '../componets/BoxBem/BoxBem';
import { useNavigation, useRoute } from '@react-navigation/native';
import LogoTop from '../componets/LogoTop/LogoTop';
import useFetchData from '../componets/FetchData/FetchData';
import BemForm from '../componets/NewBemForms/BemForm';
import api from '../services/api';
import RelatorioCategoria from '../componets/RelatorioCat/RelatCat';

export default function CategoriaScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [dataCategoria, setDataCategoria] = useState([]);
  const [BemCategoria, setBemCategoria] = useState([]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const fetchDataCategorias = async () => {
    try {
      const response = await fetch('http://192.168.1.114:3000/listarCategorias');
      if (!response.ok) {
        throw new Error('Erro ao pegar dados');
      }
      const result = await response.json();
      setDataCategoria(result);

      setItems(result.map(item => ({ label: item.nome, value: item.idCategoria })));
    } catch (error) {
      console.error('Erro ao buscar dados', error);
    }
  };

  useEffect(() => {
    fetchDataCategorias();
  }, []);

  const fetchBemCategoria = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.114:3000/listarCategoria/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao pegar dados');
      }
      const result = await response.json();
      setBemCategoria(result);
    } catch (error) {
      console.error('Erro ao buscar dados', error);
    }
  };

  useEffect(() => {
    if (value !== null) {
      fetchBemCategoria(value);
    }
  }, [value]);


  const [searchText, setSearchText] = useState('');

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#29304B', position: "relative" }}>

      <LogoTop />
      <View>
        <Text style={{ fontSize: 25, color: "white", marginLeft: 10, marginTop: 30 }}>Nome da filial</Text>
        <View style={{ height: 3, backgroundColor: 'white', width: Dimensions.get("window").width * 0.85, marginTop: 4 }} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: 30 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Initial')} style={{ justifyContent: 'center', textAlign: 'center', width: Dimensions.get("window").width * 0.28, backgroundColor: "#4A6382", height: 50, alignItems: "center", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', alignItems: "center", color: 'white' }}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Local')} style={{ justifyContent: 'center', textAlign: 'center', width: Dimensions.get("window").width * 0.28, backgroundColor: "#4A6382", height: 50, alignItems: "center" }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Locais</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Categoria')} style={{ justifyContent: 'center', textAlign: 'center', width: Dimensions.get("window").width * 0.28, backgroundColor: "#ECAA71", height: 50, alignItems: "center", borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Categoria</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 30, marginBottom: 20, flexDirection: "row", justifyContent: "space-between", width: Dimensions.get('window').width * 0.85 }}>
        <View style={{ marginBottom: 20, flex: 1, zIndex: 1000 }}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Selecione a categoria"
            containerStyle={{ height: 40 }}
            style={{ borderColor: "black", borderWidth: 2, width: Dimensions.get("window").width * 0.35, borderRadius: 15, padding: 9, backgroundColor: '#29304B', zIndex: 1001 }}
            dropDownContainerStyle={{
              backgroundColor: '#29304B',
              borderColor: 'black',
              borderWidth: 2,
              borderRadius: 10,
              width: Dimensions.get("window").width * 0.35,
            }}
            listItemLabelStyle={{
              color: 'black',
              borderBottomColor: "black"
            }}
          />
        </View>
        <RelatorioCategoria data={BemCategoria}/> 
        <View style={{ flex: 0.8 }}>
          <TextInput
            placeholder='Pesquisar'
            value={searchText}
            onChangeText={setSearchText}
            style={{ borderColor: "black", borderWidth: 2, width: '100%', height: 40, borderRadius: 15, padding: 9 }}
          />
        </View>
      </View>
      <ScrollView>
        {BemCategoria.map((item, index) => (
          <BoxBem data={item} key={item.idbem} />
        ))}
      </ScrollView>
    </View>
  );
}