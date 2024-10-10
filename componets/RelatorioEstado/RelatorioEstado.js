import React from 'react';
import { View, Button, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {printToFileAsync} from 'expo-print'
import { useState } from 'react';
import {shareAsync} from 'expo-sharing'
import { Text, TouchableOpacity, Dimensions } from 'react-native';
import { useEffect } from 'react';


 
export default function RelatórioEstado({data}) {


const filtroEstado = async (est) => {
    try {
      const response = await fetch(`http://192.168.1.21:3000/listarEstados/${est}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erro ao buscar dados', error);
      setError(error.message);
    } 
  }; 

  const carregarEstados = async () => {
    try {
      const otimo = await filtroEstado('otimo');
      const bom = await filtroEstado('bom');
      const ruim = await filtroEstado('ruim');
      const pessimo = await filtroEstado('pessimo');

      // Verifique os valores retornados
      console.log('Dados obtidos:', { otimo, bom, ruim, pessimo });

      const [estados, setEstados] = {
        otimo,
        bom,
        ruim,
        pessimo,
      };

      // Atualize o estado
      setEstados({ otimo, bom, ruim, pessimo });

      // Verifique o estado atualizado
      console.log('Estado após setEstados:', estados);

  } catch (error) {
      console.error('Erro ao carregar os estados', error);
  }

  };

  useEffect(() => {
    carregarEstados();
  }, []);

    const UnicoEstado = () => {   
  html = `
 <html>
        <body>
          <h1 style="font-size: 16px; text-align: center; margin-bottom: 40px,  margin-top: 40px;"> Relatório de Patrimônios - Produtos em estado de conservação </h1>
           <h1 style="font-size: 16px; text-align: center; margin-bottom: 40px,  margin-top: 40px;>"Periodo de Folha: data bonita/h1>
          
          <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="width: 20%;">Código</th>
                <th style="width: 50%;">Nome</th>
                <th style="width: 25%;">Valor</th>
                 <th style="width: 15%;">Estado de conservação</th>
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
  generetePDF(html)
}

const ALLEstados = () => {
  const html = `
  <html>
    <head>
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
        }
        .row-highlight {
          background-color: #f2f2f2;
          padding: 5px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <h1>Relatório de Patrimônios - Todos os Bens</h1>
      <table>
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
              <td colspan="4" class="row-highlight">Faixa para ${est}</td>
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
  <View style={{alignItems: "center",}}> 
  <TouchableOpacity onPress={generetePDF}style={{  width: Dimensions.get("window").width * 0.12, backgroundColor: '#ECAA71', borderRadius: 15, height: 49}}>
        <Text style={{textAlign: 'center', color: 'white', paddingVertical: 7}}><Ionicons size={35} name="document-outline"></Ionicons></Text>
  </TouchableOpacity> 
  </View>
 );
}