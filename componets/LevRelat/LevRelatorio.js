import React from 'react';
import { View, Button, TextInput } from 'react-native';
import {printToFileAsync} from 'expo-print'
import { useState } from 'react';
import {shareAsync} from 'expo-sharing'
import { Text, TouchableOpacity, Dimensions } from 'react-native';
import { useEffect } from 'react';


 
export default function RelatorioFaltas({faltando, encontrados, lugarErrado,  lugar, quantidade, bensFinded}) {

  function obterDataAtualFormatada() {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }


  const fetchData = async () => {
    try {

      const response = await api.get(`/local/2`);
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

    const UnicoEstado = () => {   
  const html = `
<html>
  <body>
    <!-- Cabeçalho com logo e título -->
    <table style="width: 100%; border: none;">
      <tr>
        <td style="width: 10%;"><img src="logo-do-app.png" alt="Logo" style="width: 100px; height: auto;"></td>
        <td style="text-align: center; font-size: 18px; font-weight: bold;">Relatório de Gerenciamento Patrimonial - Inventário ${lugar}</td>
        <td style="width: 10%;"></td>
      </tr>
    </table>

    <!-- Informações adicionais -->
    <div style="; font-size: 14px; margin-top: 20px;">
      <p><strong>Período do Levantamento:</strong> ${obterDataAtualFormatada()}</p>
      <p><strong>Entidade:</strong> [Nome da Entidade]</p>
      <p><strong>Total de itens no/a local seguinte levantamento anterior: ${quantidade}</strong></p>
      <p><strong>Total de itens encontrados no/a local: ${bensFinded}</strong></p>
    
    </div>

    <!-- Tabela de itens faltando -->
    <h2 style="font-size: 16px; text-align: center; margin-bottom: 25px; margin-top: 40px;">Bens Ausentes ou Não Localizados</h2>
    <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="width: 20%;">Código</th>
          <th style="width: 50%;">Nome</th>
          <th style="width: 25%;">Valor</th>
          <th style="width: 15%;">Estado de Conservação</th>
        </tr>
      </thead>
      <tbody>
        ${faltando.map(item => `
                <tr>
                  <td>${item.codigo}</td>
                  <td>${item.nome}</td>
                  <td>R$ ${item.valor_aquisicao}</td>
                  <td>${item.estado_conservacao}</td>
                </tr>
              `).join('')}      </tbody>
    </table>

    <!-- Tabela de itens encontrados -->
    <h2 style="font-size: 16px; text-align: center; margin-bottom: 25px; margin-top: 40px;">Itens Encontrados</h2>
    <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="width: 20%;">Código</th>
          <th style="width: 50%;">Nome</th>
          <th style="width: 25%;">Valor</th>
          <th style="width: 15%;">Estado de Conservação</th>
        </tr>
      </thead>
      <tbody>
           ${encontrados.map(item => `
                <tr>
                  <td>${item.codigo}</td>
                  <td>${item.nome}</td>
                  <td>R$ ${item.valor_aquisicao}</td>
                  <td>${item.estado_conservacao}</td>
                </tr>
              `).join('')}      </tbody>
    </table>

    <!-- Tabela de itens no lugar errado -->
    <h2 style="font-size: 16px; text-align: center; margin-bottom: 25px; margin-top: 40px;">Itens no Lugar Errado</h2>
    <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="width: 20%;">Código</th>
          <th style="width: 50%;">Nome</th>
          <th style="width: 25%;">Valor</th>
          <th style="width: 15%;">Estado de Conservação</th>
        </tr>
      </thead>
      <tbody>
      ${lugarErrado.map(item => `
        <tr>
          <td>${item.codigo}</td>
          <td>${item.nome}</td>
          <td>R$ ${item.valor_aquisicao}</td>
          <td>${item.estado_conservacao}</td>
        </tr>
      `).join('')}      </tbody>
    </table>

    <!-- Rodapé com local, data e assinaturas -->
    <table style="width: 100%; margin-top: 30px;">
      <tr>
        <td style="text-align: left;">Local, ${obterDataAtualFormatada()}</td>
        <td style="text-align: right;">
          <div>____________________________________</div>
          <div>Diretor(a) de Administração</div>
        </td>
      </tr>
      <tr>
        <td style="text-align: left;"></td>
        <td style="text-align: right;">
          <div>____________________________________</div>
          <div>Responsável</div>
        </td>
      </tr>
    </table>
  </body>
</html>

  `;
  generetePDF(html)
}
  const generetePDF = async (html) => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);
  }

 return(
  <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between",  width: Dimensions.get("window").width * 0.28, }}> 
    <TouchableOpacity onPress={UnicoEstado} style={{ width: Dimensions.get("window").width * 0.28, backgroundColor: "#ECAA71", borderRadius: 15,  marginRight: 10 }}>
        <Text style={{paddingVertical: 11, fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: 'white', paddingVertical: 9}}>Gerar {'\n'} relatório </Text>
  </TouchableOpacity> 
  </View>
 );
}