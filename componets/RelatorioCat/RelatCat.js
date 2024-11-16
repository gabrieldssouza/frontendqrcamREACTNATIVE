import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Ionicons } from '@expo/vector-icons';

export default function RelatorioCategoria({ data }) {
  // Correção: inicialize estados corretamente como um objeto vazio com useState
  const [estados, setEstados] = useState({ otimo: [], bom: [], ruim: [], pessimo: [] });

  const filtroEstado = async (est) => {
    try {
      const response = await fetch(`http://192.168.1.114:3000/listarEstados/${est}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erro ao buscar dados', error);
      return [];
    }
  };

  const carregarEstados = async () => {
    try {
      const otimo = await filtroEstado('otimo');
      const bom = await filtroEstado('bom');
      const ruim = await filtroEstado('ruim');
      const pessimo = await filtroEstado('pessimo');

      // Atualize o estado com os dados carregados
      setEstados({ otimo, bom, ruim, pessimo });
    } catch (error) {
      console.error('Erro ao carregar os estados', error);
    }
  };

  useEffect(() => {
    carregarEstados();
  }, []);

  const UnicoEstado = () => {
    const html = `
      <html>
        <body>
          <h1>Relatório de Patrimônios - Produtos em estado de conservação</h1>
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

  const ALLEstados = () => {
    const html = `
      <html>
        <body>
          <h1>Relatório de Patrimônios - Todos os Bens</h1>
          <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Estado de Conservação</th>
              </tr>
            </thead>
            <tbody>
              ${Object.keys(estados).map(est => `
                <tr>
                  <td colspan="4" style="background-color: #f2f2f2; font-weight: bold;">Faixa para ${est}</td>
                </tr>
                ${estados[est].map(item => `
                  <tr>
                    <td>${item.codigo}</td>
                    <td>${item.nome}</td>
                    <td>R$ ${item.valor_aquisicao}</td>
                    <td>${item.estado_conservacao}</td>
                  </tr>
                `).join('')}
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
     
      <TouchableOpacity onPress={ALLEstados} style={{ width: Dimensions.get("window").width * 0.12, backgroundColor: '#ECAA71', borderRadius: 15, height: 49 }}>
        <Text style={{ textAlign: 'center', color: 'white', paddingVertical: 7 }}>
          <Ionicons size={35} name="document-outline" /> Todos os Estados
        </Text>
      </TouchableOpacity>
    </View>
  );
}
