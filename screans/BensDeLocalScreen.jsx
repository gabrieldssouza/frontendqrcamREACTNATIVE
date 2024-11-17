import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LogoTop from '../componets/LogoTop/LogoTop';
import BoxBem from '../componets/BoxBem/BoxBem';
import api from '../services/api';

export default function BensDeLocalScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { idLocal } = route.params;
  const [bens, setBens] = useState([]);
  const [locais, setLocais] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBens = async () => {
      try {
        const response = await api.get(`/listarlocal/${idLocal}`);
        if (response.status !== 200) {
          throw new Error('Erro ao pegar dados');
        }
        const result = response.data;
        setBens(result);
      } catch (error) {
        console.error('Erro ao buscar bens do local:', error);
        setError(error.message);
      }
    };

    const fetchLocais = async () => {
      try {
        const response = await api.get('/listarlocais');
        if (response.status !== 200) {
          throw new Error('Erro ao pegar locais');
        }
        setLocais(response.data);
      } catch (error) {
        console.error('Erro ao buscar locais:', error);
      }
    };

    fetchBens();
    fetchLocais();
  }, [idLocal]);

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#29304B', position: "relative" }}>
      <LogoTop />
      <View>
        <Text style={{ fontSize: 25, color: "white", marginLeft: 10, marginTop: 30 }}>Bens do Local</Text>
        <View style={{ height: 3, backgroundColor: 'white', width: Dimensions.get("window").width * 0.85, marginTop: 4 }} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: 30, marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Initial')} style={{
          justifyContent: 'center', textAlign: 'center', width: Dimensions.get("window").width * 0.28,
          backgroundColor: "#4A6382", height: 50, alignItems: "center", borderTopLeftRadius: 10, borderBottomLeftRadius: 10
        }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', alignItems: "center", color: 'white' }}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Local')} style={{
          justifyContent: 'center', textAlign: 'center', width: Dimensions.get("window").width * 0.28,
          backgroundColor: "#ECAA71", height: 50, alignItems: "center"
        }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Locais</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Categoria')} style={{
          justifyContent: 'center', textAlign: 'center', width: Dimensions.get("window").width * 0.28,
          backgroundColor: "#4A6382", height: 50, alignItems: "center", borderTopRightRadius: 10, borderBottomRightRadius: 10
        }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Categoria</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {bens.map((bem) => (
          <TouchableOpacity onPress={() => navigation.navigate('Bem', { idbem: bem.idbem, key: bem.idbem })} key={bem.idbem}>
            <BoxBem data={bem} locais={locais} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}