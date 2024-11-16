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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBens = async () => {
      try {
        const response = await api.get(`/listarlocal/${idLocal}`);
        if (response.status !== 200) {
          throw new Error('Erro ao pegar dados');
        }
        setBens(response.data);
      } catch (error) {
        console.error('Erro ao buscar bens', error);
        setError(error.message);
      }
    };
    fetchBens();
  }, [idLocal]);

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#29304B', position: "relative" }}>
      <LogoTop />
      <View>
        <Text style={{ fontSize: 25, color: "white", marginLeft: 10, marginTop: 30 }}>Bens do Local</Text>
        <View style={{ height: 3, backgroundColor: 'white', width: Dimensions.get("window").width * 0.85, marginTop: 4 }} />
      </View>
      <ScrollView style={{ marginTop: 30 }}>
        {bens.map((item) => (
          <TouchableOpacity onPress={() => navigation.navigate('Bem', { idbem: item.idbem, key: item.idbem })} key={item.idbem}>
            <BoxBem data={item} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}