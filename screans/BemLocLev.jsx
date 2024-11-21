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
import BoxLev from '../componets/BocLev/BoxLev';

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
  const [bensNameNotag, setBensNameNotag] = useState([]);
  const idLocal = route.params?.idLocal;
  const idBem = route.params?.idBem;
  const idLevantamento = route.params?.idLevantamento;
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

      const response = await api.get(`/listarlocal/${idLocal}`);
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
       processErrorPlace()
    }, [])
  );

  const [BemErPlace, setBemErPlace] = useState([]); // Estado para armazenar os resultados

const fetchBem = async (idBem) => {
  try {
    const response = await api.get(`/listarbem/${idBem}`);
    if (response.status !== 200) {
      throw new Error('Erro ao pegar dados');
    }
    console.log("dat")
    return response.data; // Retorna os dados do bem
  } catch (error) {
    console.error('Err ao buscar bem id do bem:', idBem, error);
    return null; // Retorna null em caso de erro
  }
};
const errorplace = []
  const processErrorPlace = async () => {
    errorplace = bensLevantamento.filter(scannedItem =>
      !expectedItems.some(item => item.idbem == scannedItem.bem_idbem)
    );
    const resultArray = []; // Array temporário para armazenar os dados
    for (const scannedItem of errorplace) {
      const bemData = await fetchBem(scannedItem.bem_idbem); // Chama a função para cada item
      if (bemData) {
        resultArray.push(bemData); // Adiciona ao array se não for null
      }
    }
    setBemErPlace(resultArray); // Atualiza o estado com os resultados
  };

  if (errorplace.length > 0) {
    processErrorPlace();
  }
 // Executa quando errorplace for atualizado

  
  const expectedItems = data; // Bens Esperados na sala

  // Itens faltantes
  const missingItems = expectedItems.filter(item =>
    !bensLevantamento.some(scannedItem => scannedItem.bem_idbem == item.idbem)
  );
 

  const findItems = expectedItems.filter(item =>
    bensLevantamento.some(scannedItem => scannedItem.bem_idbem == item.idbem)
  );

  console.log("BemErPlae",BemErPlace)

// Função para buscar os dados de um bem específico
// Função para buscar os dados de um bem específico
const fetchBemNome = async (nome) => {
  try {
    console.log("nome enviado", nome);
    const response = await api.get(`/buscarPorNome?nome=${nome}`);
    if (response.status !== 200) {
      throw new Error('Erro ao pegar dados');
    }
    console.log(response.data);
    return response.data; // Retorna os dados do bem encontrado
  } catch (error) {
    console.error('Erro ao buscar dados de nome', error);
    throw error;
  }
};

// Função para verificar os bens sem etiqueta
const verifyNoTag = async () => {
  console.log("Entrou no verify");

  try {
    const response = await api.get('/listarBensNoTag');
    if (response.status !== 200) {
      throw new Error('Erro ao pegar dados');
    }
    const result = await response.data;
    setBensNotag(result); // Atualiza o estado com os bens sem etiqueta

    console.log("Bens sem etiqueta:", result);

    // Agora busca os bens correspondentes para cada bem sem etiqueta
    const bensData = [];
    for (const bemNoTag of result) {
      try {
        const bemNome = await fetchBemNome(bemNoTag.nome);
        bensData.push({ bemNoTag, bensCorrespondentes: bemNome });
      } catch (error) {
        setError(error.message);
      }
    }
    // Atualiza o estado com os bens encontrados e abre o modal
    setBensNameNotag(bensData);
      setModalVisible(true); // Torna o modal visív
  } catch (error) {
    console.error('Erro ao buscar dados do verify', error);
    setError(error.message);
  }
};

// Função para renderizar o modal
const renderModals = () => {
  // Verifica se bensNameNotag é um array e se não está vazio
  if (Array.isArray(bensNameNotag) && bensNameNotag.length > 0) {
    return bensNameNotag.map((item, index) => (
      <ModalNoTag
        key={index}
        NoTag={item.bemNoTag}  // Passa os dados do bem sem etiqueta
        BemNome={item.bensCorrespondentes}  // Passa os bens correspondentes encontrados
        onClose={() => setModalVisible(false)} // Função para esconder o modal
      />
    ));
  }
  return null; // Retorna null se não houver bens para renderizar
};

// A renderização do modal deve ser chamada onde você deseja exibir os modais

const renderRelatorio = () => {
  
    return <RelatorioFaltas faltando={missingItems} encontrados={findItems} lugarErrado={BemErPlace} lugar={idLocal} quantidade={countData} bensFinded={countBensLevantamento}/>;
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
          <Text style={{ textAlign: "center", color: 'white' }}>Totais:{'\n'}{countData + errorplace.length}</Text>
        </View>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={{ textAlign: "center", color: 'white' }}>Levantados:{'\n'}{findItems.length + errorplace.length }</Text>
        </View>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={{ textAlign: "center", color: 'white' }}>Diferença:{'\n'}{(countData + errorplace.length) - (findItems.length + errorplace.length)}</Text>
        </View>
      </View>
      <ScrollView>
        {findItems.map((item) => (
          <TouchableOpacity onPress={() => navigation.navigate('Bem', { idbem: item.idbem, key: item.idbem })} key={item.idbem}>
            <BoxLev data={item} key={item.idbem} />
          </TouchableOpacity>
        ))}
        {BemErPlace.map((item) => (
          <TouchableOpacity onPress={() => navigation.navigate('Bem', { idbem: item.idbem, key: item.idbem })} key={item.idbem}>
            <BoxLev data={item} key={item.idbem} />
          </TouchableOpacity>
        ))}
        
      </ScrollView>

      <TouchableOpacity onPress={() => navigation.navigate('CamLev', { idLevantamento: idLevantamento })} style={{  marginBottom: 25, position: "absolute", bottom: 50, right: 30, width: Dimensions.get("window").width * 0.18, backgroundColor: "#ECAA71", borderRadius: 50 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'white', paddingVertical: 11 }}>
          <Ionicons name="add" size={48} color="white" />
        </Text>
      </TouchableOpacity>

      <View  style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, }} > 
  
      <TouchableOpacity onPress={() => navigation.navigate("FormNoTag", { etiqueta: false})} style={{ marginRight: 10, flex: 0.45 , width: Dimensions.get("window").width * 0.10, backgroundColor: "#ECAA71", borderRadius: 15 }}>
       <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'white', paddingVertical: 11 }}>
         Bem{'\n'} sem identificação
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={{ flex:0.45 }}>
       {renderRelatorio()}
      </TouchableOpacity>
    </View>
    

    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    color: 'white',
    padding: 10,
  },
});