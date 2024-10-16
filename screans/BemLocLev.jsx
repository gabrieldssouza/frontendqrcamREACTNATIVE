import React, { useState, useEffect, useCallback} from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import LogoTop from '../componets/LogoTop/LogoTop';
import BoxBem from '../componets/BoxBem/BoxBem';
import { Ionicons } from '@expo/vector-icons';

import RelatórioFaltas from '../componets/LevRelat/LevRelatorio';


export default function BemLocLev({ route }) {
  const navigation = useNavigation();
  
  const [data, setData] = useState([]);
  const [countData, setCountData] = useState(0);
  const [error, setError] = useState(null);
  const [bensLevantamento, setBensLevantamento] = useState([]);
  const [countBensLevantamento, setCountBensLevantamento] = useState(0);
  const idLocal = route.params?.idLocal;
  const idBem = route.params?.idBem;
  const idLevantamento = route.params?.idLevantamento;

  console.log("idLocal:", idLocal);
  console.log("idBem:", idBem);
  console.log("idLevantamento:", idLevantamento);

  const fetchData = async () => {
    try {
<<<<<<< HEAD
      const response = await fetch(`http://192.168.1.167:3000/listarlocal/0`);
=======
      const response = await fetch(`http://192.168.1.23:3000/listarlocal/0`);
>>>>>>> gabriel
      if (!response.ok) {
        throw new Error('Erro ao pegar dados');
      }
      const result = await response.json();
      setData(result);
      setCountData(result.length);
    } catch (error) {
      console.error('Erro ao buscar dados', error);
      setError(error.message);
    }
  };

  const fetchBensLevantamento = async () => {
    try {
<<<<<<< HEAD
      const response = await fetch('http://192.168.1.167:3000/listarBensLevantamento');
=======
      const response = await fetch('http://192.168.1.23:3000/listarBensLevantamento');
>>>>>>> gabriel
      if (!response.ok) {
        throw new Error('Erro ao pegar dados');
      }
      const result = await response.json();
      setBensLevantamento(result);
      setCountBensLevantamento(result.length);
    } catch (error) {
      console.error('Erro ao buscar dados', error);
      setError(error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
      fetchBensLevantamento();
    }, [])
  );
  useEffect(() => {
    const fetchBem = async () => {
      try {
<<<<<<< HEAD
        const response = await fetch(`http://192.168.1.167:3000/listarbem/${idBem}`);
=======
        const response = await fetch(`http://192.168.1.23:3000/listarbem/${idBem}`);
>>>>>>> gabriel
        if (!response.ok) {
          throw new Error('Erro ao pegar dados');
        }
        const result = await response.json();
        setBem(result);
      } catch (error) {
        console.error('Erro ao buscar bem', error);
      }
    };
    fetchBem();
  }, [idBem]);
  
  
  // Determinar itens esperados
   const expectedItems = data;

   // Itens faltantes
   const missingItems = expectedItems.filter(item =>
     !bensLevantamento.some(scannedItem => scannedItem.bem_idbem == item.idbem)
   );

   const findItems = expectedItems.filter(item =>
    bensLevantamento.some(scannedItem => scannedItem.bem_idbem == item.idbem)
  );



  const renderItem = ({ item }) => {
    if (!item.idbem) {
      console.warn('ID do bem não definido', item);
      return null; // Ou um componente de fallback, se necessário
    }
    return (
      <Text style={styles.item}>{item.nome}</Text>
    );
  };

  const renderRelatorio = () => {

     return  <RelatórioFaltas faltando={missingItems} encontrados={findItems} />
   
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#29304B', position: "relative" }}>
      <LogoTop />
      <View>
        <Text style={{ fontSize: 25, color: "white", marginLeft: 10, marginTop: 30 }}>Nome da filial</Text>
        <View style={{ height: 3, backgroundColor: 'white', width: Dimensions.get("window").width * 0.85, marginTop: 4 }} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, width: '100%' }}>
    {error && <Text style={{ color: 'white' }}>{error}</Text>}
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={{ textAlign: "center", color: 'white' }}>Totais:{'\n'}{countData}</Text>
    </View>
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={{ textAlign: "center", color: 'white' }}>Levantados:{'\n'}{countBensLevantamento}</Text>
    </View>
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={{ textAlign: "center", color: 'white' }}>Diferença:{'\n'}{countData - countBensLevantamento}</Text>
    </View>
  </View>
    <ScrollView >
        {findItems.map((item) => (
          <TouchableOpacity onPress={() => navigation.navigate('Bem', {idbem: item.idbem, key: item.idbem})}  key={item.idbem} >
               <BoxBem data={item} key={item.idbem}/>
              
          </TouchableOpacity>
        ))}
     </ScrollView>
      {renderRelatorio()}


      <TouchableOpacity onPress={() => navigation.navigate('CamLev', { idLevantamento: idLevantamento })} style={{ position: "absolute", bottom: 50, right: 30, width: Dimensions.get("window").width * 0.18, backgroundColor: "#ECAA71", borderRadius: 50 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'white', paddingVertical: 11 }}>
          <Ionicons name="add" size={48} color="white" />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
  onPress={() => navigation.navigate('CamLev', { idLevantamento: idLevantamento })}
  style={{ position: "absolute", bottom: 50, left: 30, width: Dimensions.get("window").width * 0.18, backgroundColor: "#ECAA71", borderRadius: 50 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'white', paddingVertical: 11 }}>
          <Ionicons name="camera" size={48} color="white" />
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    color: 'white',
    padding: 10,
  },
});
