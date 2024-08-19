import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import BoxBem from '../componets/BoxBem/BoxBem';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import LogoTop from '../componets/LogoTop/LogoTop';
import DropDownPicker from 'react-native-dropdown-picker';
import FilterBem from '../componets/FilterBem/FilterBem';
import RelatórioEstado from '../componets/RelatorioEstado/RelatorioEstado';
import { Ionicons } from '@expo/vector-icons';

export default function InitialScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isAllbensVIsible, setIsAllbensVIsible] = useState(true);
  const [estadoConservacao, setEstadoConservacao] = useState('');
  const [isOpem, setIsOpem] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const [DataEstadoFiltro, setDataEstadoFiltro] = useState([]);
  const [searchText, setSearchText] = useState('');

  const itens = [
    {label: 'ótimo', value: 'otimo'},
    {label: 'bom', value: 'bom'},
    {label: 'ruim', value: 'ruim'},
    {label: 'péssimo', value: 'pessimo'}
  ];

  const filtroEstado = async () => {
    try {
      const response = await fetch(`http://192.168.1.23:3000/listarEstados/${estadoConservacao}`);
      const result = await response.json();
      setDataEstadoFiltro(result);
      setIsAllbensVIsible(false);
    } catch (error) {
      console.error('Erro ao buscar dados', error);
      setError(error.message);
    } 
  };

  useEffect(() => {
    if (estadoConservacao) {
      filtroEstado();
    }
  }, [estadoConservacao]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.1.23:3000/listarbens');
      if (!response.ok) {
        throw new Error('Erro ao pegar dados');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Erro ao buscar dados', error);
      setError(error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const renderRelatorio = () => {
    if (estadoConservacao) {
      return <RelatórioEstado data={DataEstadoFiltro} />;
    } else {
      return <FilterBem data={data} />;
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#29304B', position: "relative" }}>
      <LogoTop/>
      <View>
        <Text style={{fontSize: 25, color: "white", marginLeft: 10, marginTop: 30}}>Nome da filial</Text>
        <View style={{ height: 3, backgroundColor: 'white', width: Dimensions.get("window").width * 0.85, marginTop: 4 }} />
      </View>

      <View style={{flexDirection: "row", justifyContent: "space-around", paddingTop: 30}}> 
        <TouchableOpacity onPress={() => setIsAllbensVIsible(true)} style={{ justifyContent: 'center', textAlign: 'center', width: Dimensions.get("window").width * 0.28, backgroundColor: "#ECAA71", height: 50, alignItems: "center", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Local')} style={{ justifyContent: 'center', textAlign: 'center', width: Dimensions.get("window").width * 0.28, backgroundColor: "#4A6382", height: 50, alignItems: "center" }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Locais</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Categoria')} style={{ justifyContent: 'center', textAlign: 'center', width: Dimensions.get("window").width * 0.28, backgroundColor: "#4A6382", height: 50, alignItems: "center", borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Categoria</Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: "row", justifyContent: "space-between", width: Dimensions.get("window").width * 0.85, zIndex: 1001 }}>
        <View style={{marginTop: 30, marginBottom: 20, flex: 1}}> 
          <DropDownPicker
            items={itens}
            open={isOpem} 
            setOpen={setIsOpem}
            value={currentValue}
            setValue={setCurrentValue}
            placeholder="Estado de Conservação"
            style={{borderColor: "black", borderWidth: 2 , width: Dimensions.get("window").width * 0.35, borderRadius: 15, padding: 9, backgroundColor: '#29304B' }}
            onChangeValue={value => setEstadoConservacao(value)}
            dropDownContainerStyle={{ backgroundColor: '#29304B', borderColor: 'black', borderWidth: 2, borderRadius: 10, width: Dimensions.get("window").width * 0.35 }}
            listItemLabelStyle={{ color: 'black', borderBottomColor: "black" }}
          />
        </View>

        <View style={{marginTop: 30, marginBottom: 20}}> 
          <TextInput
            placeholder ='Pesquisar'
            value={searchText}
            onChangeText={setSearchText}
            style={{borderColor: "black", borderWidth: 2 , width: Dimensions.get("window").width * 0.45, textAlign: "left", height: 49, borderRadius: 15, padding: 9}}
          />
        </View>
      </View>

      <ScrollView style={{zIndex: 0, marginBottom: 50}} >
        {(isAllbensVIsible ? data : DataEstadoFiltro).map((item) => (
          <TouchableOpacity onPress={() => navigation.navigate('Bem', {idbem: item.idbem, key: item.idbem})} key={item.idbem}>
            <BoxBem data={item} key={item.idbem}/>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {renderRelatorio()}

      <TouchableOpacity onPress={() => navigation.navigate('Forms')} style={{position: "absolute", bottom: 60, right: 30, width: Dimensions.get("window").width * 0.18, backgroundColor: "#ECAA71", borderRadius: 50}}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'white', paddingVertical: 11 }}>
          <Ionicons name="add" size={48} color="white" />
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cam')} style={{position: "absolute", bottom: 60, left: 30, width: Dimensions.get("window").width * 0.18, backgroundColor: "#ECAA71", borderRadius: 50}}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'white', paddingVertical: 11 }}>
          <Ionicons name="camera" size={48} color="white" />
        </Text>
      </TouchableOpacity> 
    </View>
  );
}
