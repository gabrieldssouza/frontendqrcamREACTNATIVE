import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LogoTop from '../componets/LogoTop/LogoTop';
import BoxLocais from '../componets/BoxLocais/BoxLocais';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';

export default function LocaisScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await api.get('/listarlocais');
      if (response.status !== 200) {
        throw new Error('Erro ao pegar dados');
      }
      const result = response.data;
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

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#29304B', position: "relative" }}>
      <LogoTop />
      <View>
        <Text style={{ fontSize: 25, color: "white", marginLeft: 10, marginTop: 30 }}>Nome da filial</Text>
        <View style={{ height: 3, backgroundColor: 'white', width: Dimensions.get("window").width * 0.85, marginTop: 4 }} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: 30 }}>
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
      <View style={{ marginTop: 30, marginBottom: 20 }}>
        <TextInput
          placeholder='Pesquisar'
          value={searchText}
          onChangeText={setSearchText}
          style={{ borderColor: "black", borderWidth: 2, width: Dimensions.get("window").width * 0.75, textAlign: "left", height: 40, borderRadius: 15, padding: 9 }}
        />
      </View>
      <ScrollView>
        {data.map((item) => (
          <TouchableOpacity onPress={() => navigation.navigate('BensDeLocal', { idLocal: item.idLocais })} key={item.idLocais}>
            <BoxLocais data={item} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('NovoLocal')} style={{ position: "absolute", bottom: 50, right: 30, width: Dimensions.get("window").width * 0.18, backgroundColor: "#ECAA71", borderRadius: 30 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'white', paddingVertical: 11 }}>
          <Ionicons name="add" size={48} color="white" />
        </Text>
      </TouchableOpacity>
    </View>
  );
}