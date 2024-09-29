import React, { useState, useSyncExternalStore, useEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Dimensions, Image, TextInput } from 'react-native';
import BoxBem from '../componets/BoxBem/BoxBem';
import { useNavigation, useRoute } from '@react-navigation/native';
import LogoTop from '../componets/LogoTop/LogoTop';
import useFetchData from '../componets/FetchData/FetchData';
import BemForm from '../componets/NewBemForms/BemForm';
import BoxLocais from '../componets/BoxLocais/BoxLocais';
 import { Ionicons } from '@expo/vector-icons';

export default function LevLocais({route}) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const idLevantamento = route.params?.idLevantamento; // Verifica se idLevantamento foi passado corretamente
  console.log("id levantamento cam", idLevantamento); 
 

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.23:3000/listarLocais');
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

    fetchData();
  }, []); 


  const [searchText, setSearchText] = useState('');

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#29304B', position: "relative" }}>
      <LogoTop/>
      

      < View  > 
                    <Text style={{fontSize: 25, color: "white", marginLeft: 10, marginTop: 30}}>Nome da filial</Text>

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
         
     <TouchableOpacity onPress={() =>  navigation.navigate('Forms')} style={{position: "absolute", bottom: 50, right: 30,  width: Dimensions.get("window").width * 0.18, backgroundColor: "#ECAA71", borderRadius: 50  }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'white', paddingVertical: 11}}><Ionicons name="add" size={48} color="white" /></Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('CamLev', { action: 'encontrar' })}
 style={{position: "absolute", bottom: 50, left: 30,  width: Dimensions.get("window").width * 0.18, backgroundColor: "#ECAA71", borderRadius: 50  }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'white', paddingVertical: 11}}><Ionicons name="camera" size={48} color="white" /></Text>
    </TouchableOpacity> 


    </View>

  
  );
}