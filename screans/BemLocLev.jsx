import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import LogoTop from '../componets/LogoTop/LogoTop';
import BoxBem from '../componets/BoxBem/BoxBem';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';
import axios from 'axios';
import RelatorioFaltas from '../componets/LevRelat/LevRelatorio';
import FormNoTag from '../componets/FormNoTag/FormNoTag';
import BemForm from '../componets/NewBemForms/BemForm';

import AsyncStorage from '@react-native-async-storage/async-storage';



import ModalNoTag from '../componets/ModalNoTag/ModalNoTag';
export default function BemLocLev({route}) {
  const navigation = useNavigation();
  
  const [data, setData] = useState([]);
  const [countData, setCountData] = useState(0);
  const [error, setError] = useState(null);
  const [bensLevantamento, setBensLevantamento] = useState([]);
  const [countBensLevantamento, setCountBensLevantamento] = useState(0);
  const [bensNotag, setBensNotag] = useState([]);
  const idLocal = route.params?.idLocal;
  const idBem = route.params?.idBem;
  const idLevantamento = route.params?.idLevantamento;
  const [BemIdsTag, setBemIdsTag] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); 
  const [IdLevantamento, setIdLevantamento] = useState(null)
  const matchingItems = [];

  console.log("idLocal:", idLocal);
  console.log("idBem:", idBem);
  console.log("idLevantamento:", idLevantamento);

  const saveIdLevantamento = async (idLevantamento) => {
    try {
      // Salvar o idLevantamento no AsyncStorage
      await AsyncStorage.setItem('idLevantamento', idLevantamento.toString());
    } catch (error) {
      console.error('Erro ao salvar o idLevantamento:', error);
    }
}
  useEffect(() => {
    const fetchIdLevantamento = async () => {
         

      const storedIdLevantamento = await AsyncStorage.getItem('idLevantamento');
      if (storedIdLevantamento) {
        setIdLevantamento(storedIdLevantamento);
      }
    };
    if(idLevantamento){
      saveIdLevantamento(idLevantamento)
    }
    fetchIdLevantamento();
  }, []);

  console.log("IdLevantamento:", IdLevantamento );

  const fetchData = async () => {
    try {

      const response = await api.get(`/listarlocal/1`);
      if (response.status !== 200) {

        throw new Error('Erro ao pegar dados');
      }
      const result = response.data;
      setData(result);
      setCountData(result.length);
    } catch (error) {
      console.error('Erro ao buscar dados', error);
      setError(error.message);
    }
  };

  const fetchBensLevantamento = async () => {
    try {
      const response = await api.get('/listarBensLevantamento');
      if (response.status !== 200) {

        throw new Error('Erro ao pegar dados');
      }
      const result = response.data;
      console.log(result)

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
        const response = await axios.get(`/listarbem/${idBem}`);

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
    item.pendencia_local == false &&
    !bensLevantamento.some(scannedItem => scannedItem.bem_idbem == item.idbem)
  );

  const findItems = expectedItems.filter(item =>
    bensLevantamento.some(scannedItem => scannedItem.bem_idbem == item.idbem)
  );

  const errorplace = expectedItems.filter(item =>
    item.pendencia_local == true &&
    bensLevantamento.some(scannedItem => scannedItem.bem_idbem === item.idbem)
  );
  console.log("place", errorplace)

  const verifyNoTag = async () => {
    console.log("entro no verify");
    try {
      const response = await api.get('/listarbens');
      if (response.status !== 200) {
        throw new Error('Erro ao pegar dados');
      }
      const result = await response.data;
  
      const filteredResult = result.filter(bem => bem.etiqueta == false);
      setBensNotag(filteredResult); // Atualiza o estado com os bens sem etiqueta
  
      console.log("nottagbens", filteredResult);
  
      // Inicializa um array para armazenar os itens correspondentes
      
  
      // A lógica para encontrar os bens com os mesmos nomes
      missingItems.forEach((missingBem) => {
        const matchedBem = filteredResult.find(bem => bem.nome === missingBem.nome);
        console.log(missingBem.nome);
        if (matchedBem) {
          // Adiciona os IDs no array se os nomes coincidirem
          matchingItems.push({ id1: missingBem.idbem, id2: matchedBem.idbem });
          console.log("Itens correspondentes:", matchingItems);
        }
      });
  
      // Filtrar duplicados em matchingItems (caso haja algum)
      const uniqueItems = matchingItems.filter((value, index, self) =>
        index == self.findIndex((t) => (
          t.id1 == value.id1 && t.id2 == value.id2
        ))
      );
  
      // Verifica se há itens correspondentes e chama a função `FindBensNoTag`
      if (uniqueItems.length > 0) {
        console.log('Itens encontrados:', uniqueItems);
        // Envia o array de itens para a função `FindBensNoTag`
        FindBensNoTag(uniqueItems);
      } else {
        console.log('Nenhum item com nome correspondente encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar dados', error);
      setError(error.message);
    }
  };
  
  const FindBensNoTag = async (itemsArray) => {
    console.log("chegou no FindBensNoTag");
    try {
      for (const item of itemsArray) {
        const { id1, id2 } = item; // Extrai os IDs do objeto
        const ids = [id1, id2]; // Cria um array com os dois IDs
        for (const id of ids) {
          const response = await fetch(`http://192.168.1.114:3000/listarbem/${id}`);
          if (!response.ok) {
            throw new Error('Erro ao pegar dados');
          }
          const result = await response.json();
          console.log("data", result); // Exibe o resultado do bem encontrado
  
          // Aqui você precisa garantir que está manipulando o estado corretamente.
          setBemIdsTag(prevBemIdsTag => [...prevBemIdsTag, result]);
        }
      }
      
      // Após o loop, torna o modal visível
      setModalVisible(true); 
    } catch (error) {
      console.error('Erro ao buscar bem', error);
    }
  };
  

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
    return <RelatorioFaltas faltando={missingItems} encontrados={findItems} lugarErrado={errorplace}/>;
  };

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
      <ScrollView>
        {findItems.map((item) => (
          <TouchableOpacity onPress={() => navigation.navigate('Bem', { idbem: item.idbem, key: item.idbem })} key={item.idbem}>
            <BoxBem data={item} key={item.idbem} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TouchableOpacity onPress={() => navigation.navigate('CamLev', { idLevantamento: idLevantamento })} style={{  marginBottom: 25, position: "absolute", bottom: 50, right: 30, width: Dimensions.get("window").width * 0.18, backgroundColor: "#ECAA71", borderRadius: 50 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'white', paddingVertical: 11 }}>
          <Ionicons name="add" size={48} color="white" />
        </Text>
      </TouchableOpacity>

      <View  style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, }} > 
      <TouchableOpacity onPress={verifyNoTag} style={{ marginRight: 10, flex: 0.4, width: Dimensions.get("window").width * 0.10, backgroundColor: "#ECAA71", borderRadius: 20}}>
       <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'white', paddingVertical: 11 }}>
       encontrar bens s/ identificação
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Forms", { etiqueta: false})} style={{ marginRight: 10, flex:0.3 , width: Dimensions.get("window").width * 0.10, backgroundColor: "#ECAA71", borderRadius: 20 }}>
       <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'white', paddingVertical: 11 }}>
         Sem identificação
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={{ flex:0.3 }}>
       {renderRelatorio()}
      </TouchableOpacity>
      </View>
      {modalVisible && (
  <ModalNoTag
    data={BemIdsTag} // Passando os dados encontrados
    onClose={() => setModalVisible(false)} // Função para esconder o modal
  />
)}

    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    color: 'white',
    padding: 10,
  },
});
