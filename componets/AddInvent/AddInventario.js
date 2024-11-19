import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export default function AddInventario() {
  const navigation = useNavigation();
  const [ano, setAno] = useState('');
  const [ responsavel, setResponsavel] = useState('');
  const data_hora = new Date().toISOString().slice(0, 19).replace('T', ' ');



  const handleCadastrar = async () => {
    const data_hora = new Date().toISOString().split('T')[0];
    console.log(data_hora)
    if (!responsavel || !ano) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      console.log("ano", ano)
      const response = await api.post('/addLevantamento', {
        data_hora,
        responsavel,
        ano 
      });
      console.log('Local criado com sucesso:', response.data);
      navigation.navigate('Local'); // Navega de volta para a tela de locais
    } catch (error) {
      console.error('Erro ao criar local:', error);
      Alert.alert('Erro', 'Erro ao criar local. Tente novamente.');
    }
  };


  return (
    
    <View style={{ width: '80%' }}>
      <Text style={{ fontSize: 25, color: "white", marginTop: 30, marginBottom: 10, textAlign: 'center' }}>Adicionar Inventário</Text>
      <View>
        <Text style={{color: "white", paddingLeft: 5, paddingBottom:2}}>Responsável:</Text>
        <TextInput value={responsavel} onChangeText={setResponsavel} style={styles.input} />
      </View>
      <View>
        <Text style={{color: "white", paddingLeft: 5, paddingBottom:2}}>Ano do inventário:</Text>
        <TextInput value={ano} onChangeText={setAno} style={styles.input} />
      </View>
      <TouchableOpacity style={{ borderRadius: 30, paddingTop: 10}} onPress={handleCadastrar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  input: {
    borderColor: "white",
    color:"white",
    borderWidth: 2,
    borderRadius: 15,
    padding: 9,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#ECAA71',
    borderRadius: 30,
    paddingVertical: 10,
  },
};