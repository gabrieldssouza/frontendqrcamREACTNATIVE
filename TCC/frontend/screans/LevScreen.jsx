
import React, { useState, useSyncExternalStore, useEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Dimensions, Image, TextInput } from 'react-native';
import BoxBem from '../componets/BoxBem/BoxBem';
import { useNavigation, useRoute } from '@react-navigation/native';
import LogoTop from '../componets/LogoTop/LogoTop';
import useFetchData from '../componets/FetchData/FetchData';
import BemForm from '../componets/NewBemForms/BemForm';
import BoxLocais from '../componets/BoxLocais/BoxLocais';
 import { Ionicons } from '@expo/vector-icons';

 export default function LevScreen()  {
  const route = useRoute();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.167:3000/listarLevantamentos');
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
        <TouchableOpacity onPress={() => navigation.navigate('Levantamento', { idLevantamento: item.idLevantamento })}>

                   <View className="containerBoxBem" key={item.idbem}>
                        <View style={{ backgroundColor: "#3C4568", width: Dimensions.get("screen").width * 0.85, height: 120, borderRadius: 15, padding: 15, flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                            <View>
                            <Image
                                source={{uri: data.qrcode}}
                                style={{ width: 90, height: 90, backgroundColor: "black", borderRadius: 15 }}
                            />
                            </View>
                            <View style={{ paddingLeft: 20, justifyContent: "center"}}>
                            <Text className="textTitleBem" style={{ paddingBottom: 5, fontWeight: "bold", fontSize: 18}}>{item.ano}</Text>
                            <Text className="textNumeroBem">Responsável: {item.responsavel}</Text>
                            <Text className="textLocalBem">data: { item.idLevantamento}</Text>
                            </View>
                        </View>
                    </View>

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