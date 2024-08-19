import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from 'axios';  // Importe axios se não estiver importado
import api from "../services/api";  // Certifique-se de que 'api' está corretamente configurado
import BoxBem from "../componets/BoxBem/BoxBem";

export default function HomeScreen() {
  const [user, setUser] = useState(null); // Estado para armazenar um único usuário

  useEffect(() => {
  
    const getUserById = async (userId) => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/usuarios/${userId}`);
        console.log('Dados do usuário:', response.data);
        setUser(response.data); // Define o usuário encontrado no estado
      } catch (error) {
        console.error('Erro ao buscar usuário:', error.message);
      }
    };

    // Chama a função para buscar o usuário com o ID desejado
    const userId = '668b5d966edf321c2011bcda'; // ID do usuário desejado
    getUserById(userId);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <BoxBem></BoxBem>
      {user ? (
        <View>
          <Text>Nome: {user.name}</Text>
          <Text>Idade: {user.age}</Text>
          <Text>Email: {user.email}</Text>
        </View>
      ) : (
        <Text>Carregando usuário...</Text>
      )}
    </View>
  );
}
