import React, { useState, useSyncExternalStore, useEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Dimensions, Image, TextInput } from 'react-native';
import BoxBem from '../componets/BoxBem/BoxBem';
import { useNavigation, useRoute } from '@react-navigation/native';
import LogoTop from '../componets/LogoTop/LogoTop';
import useFetchData from '../componets/FetchData/FetchData';
import BemForm from '../componets/NewBemForms/BemForm';
import BoxLocais from '../componets/BoxLocais/BoxLocais';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';

export default function LevLocais({route}) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const idLevantamento = route.params?.idLevantamento; 
  const ano = route.params?.anoLev; 
  console.log("id levantamento cam", idLevantamento); 
  console.log("ano", ano);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const response = await api.get('/listarLocais');
        if (!response.status === 200) {

          throw new Error('Erro ao pegar dados');
        }
        const result = response.data;
        setData(result);
      } catch (error) {
        console.error('Erro ao buscar dados', error);
        setError(error.message);
      } 
    };

    fetchData();
  }, []); 


  const [searchText, setSearchText] = useState('');

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#29304B', position: "relative" }}>
      <LogoTop/>
      

      < View  > 
                    <Text style={{fontSize: 25, color: "white", marginLeft: 10, marginTop: 30}}>Locais - inventário {ano}</Text>

                    <View style={{ height: 3,
    backgroundColor: 'white', width: Dimensions.get("window").width * 0.85, marginTop: 4
    }} />
                           
      </View>



      <ScrollView style={{ marginTop: 30}}>
      
        {data.map((item, index) => (
          <TouchableOpacity key={item.idbem} onPress={() => navigation.navigate('BemLocLev', { idLocal: item.idLocais, idLevantamento: idLevantamento, idBem: item.idbem })}>
               <BoxLocais data={item} key={item.idbem}/>
          </TouchableOpacity>
        ))}

     </ScrollView>
         


    </View>

  
  );
}