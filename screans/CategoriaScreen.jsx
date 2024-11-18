import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import api from '../services/api';
import RelatorioCategoria from '../componets/RelatorioCat/RelatCat';
import { useNavigation } from "@react-navigation/native";
import BoxBem from '../componets/BoxBem/BoxBem';
import LogoTop from '../componets/LogoTop/LogoTop';

export default function CategoriaScreen() {
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [BemCategoria, setBemCategoria] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get('/listarcategorias');
        const categoriasData = response.data.map(categoria => ({
          label: categoria.nome,
          value: categoria.idCategoria,
        }));
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchBemCategoria = async () => {
      if (selectedCategoria) {
        try {
          const response = await api.get(`/listarCategoria/${selectedCategoria}`);
          setBemCategoria(response.data);
        } catch (error) {
          console.error('Erro ao buscar bens da categoria:', error);
        }
      }
    };

    fetchBemCategoria();
  }, [selectedCategoria]);

  useEffect(() => {
    const filtered = BemCategoria.filter(bem =>
      bem.nome.toLowerCase().includes(searchText.toLowerCase())
    );
    setBemCategoria(filtered);
  }, [searchText]);

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#29304B' }}>
      <LogoTop />
      <View>
        <Text style={{ fontSize: 25, color: "white", marginLeft: 10, marginTop: 30 }}>Categorias</Text>
        <View style={{ height: 3, backgroundColor: 'white', width: Dimensions.get("window").width * 0.85, marginTop: 4 }} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: 30 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Initial')} style={{
          justifyContent: 'center', textAlign: 'center', width: Dimensions.get("window").width * 0.28,
          backgroundColor: "#4A6382", height: 50, alignItems: "center", borderTopLeftRadius: 10, borderBottomLeftRadius: 10
        }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', alignItems: "center", color: 'white' }}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Local')} style={{
          justifyContent: 'center', textAlign: 'center', width: Dimensions.get("window").width * 0.28,
          backgroundColor: "#4A6382", height: 50, alignItems: "center"
        }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Locais</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Categoria')} style={{
          justifyContent: 'center', textAlign: 'center', width: Dimensions.get("window").width * 0.28,
          backgroundColor: "#ECAA71", height: 50, alignItems: "center", borderTopRightRadius: 10, borderBottomRightRadius: 10
        }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Categoria</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 30, marginBottom: 20, zIndex: 1000 }}>
        <DropDownPicker
          items={categorias}
          open={isOpen}
          setOpen={setIsOpen}
          value={selectedCategoria}
          setValue={setSelectedCategoria}
          placeholder="Selecione a categoria"
          containerStyle={{ height: 40 }}
          placeholderStyle={{ color: '#ccc' }}
          style={{ borderColor: "#F0F0F0", borderWidth: 2, width: Dimensions.get("window").width * 0.85, borderRadius: 15, padding: 9, backgroundColor: '#29304B', zIndex: 1001 }}
          dropDownContainerStyle={{
            color: "white",
            backgroundColor: '#29304B',
            borderColor: '#F0F0F0',
            borderWidth: 2,
            borderRadius: 10,
            width: Dimensions.get("window").width * 0.35,
          }}
          listItemLabelStyle={{
            color: '#F0F0F0',
            borderBottomColor: "#F0F0F0"
          }}
          textStyle={{
            color: '#D1D5DB', // Cor do texto dos itens (branco suave)
          }}
          arrowIconStyle={{
            tintColor: '#ECAA71', // Cor da seta
          }}
        />
      </View>
          <TextInput
            placeholder='Pesquisar'
            placeholderTextColor='#F0F0F0'
            value={searchText}
            onChangeText={setSearchText}
            style={{  borderColor: "#F0F0F0", color: '#FFFFFF', borderWidth: 2, width: Dimensions.get("window").width * 0.85, textAlign: "left", height: 49, borderRadius: 15, padding: 9, marginRight: '2%' }}
          />
      <ScrollView>
        {BemCategoria.map((bem) => (
          <TouchableOpacity onPress={() => navigation.navigate('Bem', { idbem: bem.idbem, key: bem.idbem })} key={bem.idbem}>
            <BoxBem key={bem.idbem} data={bem} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}