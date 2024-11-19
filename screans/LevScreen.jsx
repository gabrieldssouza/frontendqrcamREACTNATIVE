
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

 export default function LevScreen()  {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await api.get('/listarLevantamentos');
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

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#29304B', position: "relative" }}>
      <LogoTop/>
      

      < View  > 
                    <Text style={{fontSize: 25, color: "white", marginLeft: 10, marginTop: 30}}>Inventários</Text>
                    <View style={{ height: 3,
    backgroundColor: 'white', width: Dimensions.get("window").width * 0.85, marginTop: 4
    }} />
                           
      </View>
      <ScrollView style={{ marginTop: 30}}>
      
        {data.map((item, index) => (
        <TouchableOpacity onPress={() => navigation.navigate('Levantamento', { idLevantamento: item.idLevantamento, anoLev: item.ano})}>

                   <View className="containerBoxBem" key={item.idbem}>
                        <View style={{ backgroundColor: "#3C4568", width: Dimensions.get("screen").width * 0.85, height: 120, borderRadius: 15, padding: 15, flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                            <View style={{ paddingLeft: 20, justifyContent: "center"}}>
                            <Text  style={{ paddingBottom: 5, fontWeight: "bold", fontSize: 18}}>Inventário - {item.ano}</Text>
                            <Text >Responsável: {item.responsavel}</Text>
                            </View>
                        </View>
                    </View>

          </TouchableOpacity>
        ))}

     </ScrollView>
         
    </View>

  
  );
}