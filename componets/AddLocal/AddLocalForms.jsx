import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export default function AddLocalForms() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [ responsavel, setResponsavel] = useState('');


  const handleCadastrar = async () => {
    if (!nome) {
      Alert.alert('Erro', 'Por favor, preencha o nome do local.');
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);

    console.log(formData);
    try {
      const response = await api.post('/criarlocal', {
        nome, responsavel
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
      <Text style={{ fontSize: 25, color: "white", marginTop: 30, marginBottom: 10, textAlign: 'center' }}>Adicionar Local</Text>
      <View>
        <Text>Nome do Local:</Text>
        <TextInput value={nome} onChangeText={setNome} style={styles.input} />
      </View>
      <View>
        <Text>Nome do Responsável:</Text>
        <TextInput value={responsavel} onChangeText={setResponsavel} style={styles.input} />
      </View>
      <TouchableOpacity style={{ borderRadius: 30 }} onPress={handleCadastrar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  input: {
    borderColor: "black",
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