import React, { useState, useSyncExternalStore, useEffect, useCallback} from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Dimensions, Image, TextInput } from 'react-native';
import BoxBem from '../componets/BoxBem/BoxBem';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import LogoTop from '../componets/LogoTop/LogoTop';
import DropDownPicker from 'react-native-dropdown-picker';
import FilterBem from '../componets/FilterBem/FilterBem';
import RelatórioEstado from '../componets/RelatorioEstado/RelatorioEstado';
import { Ionicons } from '@expo/vector-icons';

export default function Levantamento() {
  //vai ter que mudar tudo nessa bomba  e vai muda o banco de dados também 
  //atualizei o banco de dados e criei duas tabelas a mais
 
  const route = useRoute();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isAllbensVIsible, setIsAllbensVIsible] = useState(true);
  const [isCategoriasVIsible, setIsCategoriasVIsible] = useState(false);
  const [estadoConservacao, setEstadoConservacao] = useState('');
  const [isOpem, setIsOpem] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const [DataEstadoFiltro, setDataEstadoFiltro] = useState([]);

  const itens = [
    {label: 'ótimo', value: 'otimo'},
    {label: 'bom', value: 'bom'},
    {label: 'ruim', value: 'ruim'},
    {label: 'péssimo', value: 'pessimo'} , 
 ]

const filtroEstado = async () => {
  console.log(estadoConservacao)
    try {
      const response = await fetch(`http://192.168.1.56:3000/listarEstados/${estadoConservacao}`);
      const result = await response.json();
      setDataEstadoFiltro(result);
      setIsAllbensVIsible(false)
      console.log(DataEstadoFiltro)
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
      const response = await fetch('http://192.168.1.56:3000/listarbens');
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
     return  <RelatórioEstado data={DataEstadoFiltro}/>
    }
    else{
     return  <FilterBem data={data}/>
    }
  }

  useFocusEffect(
    React.useCallback(() => { 
      fetchData();
    }, [])  
  )

  const [searchText, setSearchText] = useState('');

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#29304B', position: "relative" }}>
      <LogoTop/>

      < View > 
                    <Text style={{fontSize: 25, color: "white", marginLeft: 10, marginTop: 30}}>Levantamento</Text>

                    <View style={{ height: 3,
    backgroundColor: 'white', width: Dimensions.get("window").width * 0.85, marginTop: 4
    }} />
                           
      </View>

      < View style={{flexDirection: "row", justifyContent: "space-around", paddingTop: 30}}> 
      <TouchableOpacity  onPress={() =>  navigation.navigate('Cam')} style={{ justifyContent: 'center', textAlign: 'center', width: Dimensions.get("window").width * 0.80,
         backgroundColor: "#ECAA71", height: 50, alignItems: "center", borderRadius: 10
      }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', alignItems: "center", color: 'white',   
        }}>Começar levantamento</Text>
      </TouchableOpacity>

      </View>

     
      <ScrollView >
        {(isAllbensVIsible ? data : DataEstadoFiltro).map((item) => (
          <TouchableOpacity onPress={() => navigation.navigate('Bem', {idbem: item.idbem, key: item.idbem})}  key={item.idbem} >
               <BoxBem data={item} key={item.idbem}/>
              
          </TouchableOpacity>
        ))}
     </ScrollView>
    </View>

  
  );
}
