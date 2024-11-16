import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';


export default function RelatorioEstado({ data }) {
  // Correção: inicialize estados corretamente como um objeto vazio com useState

  const filtroEstado = async (cat) => {
    try {
      const response = await api.get(`/listarCategoria/${cat}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados', error);
      return [];
    }
  };


  const UnicoEstado = () => {
    const html = `
     <html>
  <body>
    <!-- Cabeçalho com logo e título -->
    <table style="width: 100%; border: none;">
      <tr>
        <td style="width: 10%;"><img src="logo-do-app.png" alt="Logo" style="width: 100px; height: auto;"></td>
        <td style="text-align: center; font-size: 18px; font-weight: bold;">Relatório de Gerenciamento Patrimonial - Por Estado de Conservação</td>
        <td style="width: 10%;"></td>
      </tr>
    </table>

    <!-- Informações adicionais -->
    <div style="text-align: center; font-size: 14px; margin-top: 20px;">
      <p><strong>Categorias:</strong> Bom, Ruim, Péssimo, Ótimo</p>
      <p><strong>Data de Expedição:</strong> <span id="data-expedicao"></span></p>
      <p><strong>Entidade:</strong> 1</p>
    </div>

    <!-- Tabela de dados -->
    <h1 style="text-align: center;">Relatório de Patrimônios - Produtos por Categoria</h1>
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

    <!-- Rodapé com local, data e assinaturas -->
    <table style="width: 100%; margin-top: 30px;">
      <tr>
        <td style="text-align: left;">Local, _____ de ___________ 2018.</td>
        <td style="text-align: right;">
          <div>____________________________________</div>
          <div>Diretor(a) de Administração</div>
        </td>
      </tr>
      <tr>
        <td style="text-align: left;"></td>
        <td style="text-align: right;">
          <div>____________________________________</div>
          <div>Coordenação de Patrimônio</div>
        </td>
      </tr>
    </table>

    <!-- Script para definir a data de expedição -->
    <script>
      function formatarData(data) {
        const opcoes = { year: 'numeric', month: 'long', day: 'numeric' };
        return data.toLocaleDateString('pt-BR', opcoes);
      }

      const dataAtual = new Date();
      const dataExpedicao = formatarData(dataAtual);
      document.getElementById('data-expedicao').textContent = dataExpedicao;
    </script>
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
