import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Ionicons } from '@expo/vector-icons';

export default function RelatorioEstado({ data }) {
  // Correção: inicialize estados corretamente como um objeto vazio com useState

  const filtroEstado = async (cat) => {
    try {
      const response = await fetch(`http://192.168.1.114:3000/listarCategoria/:idCategoria${cat}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erro ao buscar dados', error);
      return [];
    }
  };


  const UnicoEstado = () => {
    const html = `
      <html>
        <body>
          <h1>Relatório de Patrimônios - Produtos por categoria</h1>
          <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Estado de conservação</th>
              </tr>
            </thead>
            <tbody>
              ${data.map(item => `
                <tr>
                  <td>${item.codigo}</td>
                  <td>${item.nome}</td>
                  <td>R$ ${item.valor_aquisicao}</td>
                  <td>${item.estado_conservacao}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    generetePDF(html);
  };


  const generetePDF = async (html) => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);
  };

  return (
    <View style={{ alignItems: "center" }}>
     
      <TouchableOpacity onPress={UnicoEstado} style={{ width: Dimensions.get("window").width * 0.12, backgroundColor: '#ECAA71', borderRadius: 15, height: 49 }}>
        <Text style={{ textAlign: 'center', color: 'white', paddingVertical: 7 }}>
          <Ionicons size={35} name="document-outline" />
        </Text>
      </TouchableOpacity>
    </View>
  );
}
