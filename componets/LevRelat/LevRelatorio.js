import React from 'react';
import { View, Button, TextInput } from 'react-native';
import {printToFileAsync} from 'expo-print'
import { useState } from 'react';
import {shareAsync} from 'expo-sharing'
import { Text, TouchableOpacity, Dimensions } from 'react-native';
import { useEffect } from 'react';


 
export default function RelatorioFaltas({faltando, encontrados, lugarErrado}) {

    const UnicoEstado = () => {   
  html = `
 <html>
        <body>
          <h1 style="font-size: 20px; text-align: center; margin-bottom: 40px;  margin-top: 40px;"> Relatório de Patrimônios - Itens Faltando em sala </h1>
           <h2 style="font-size: 16px; text-align: center; margin-bottom: 40px;  margin-top: 40px;">Periodo do levantamento: data bonita</h2>

            <h2 style="font-size: 16px; text-align: center; margin-bottom: 25px; margin-top: 40px;">Itens não encontrados</h2>
          
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
              ${faltando.map(item => `
                <tr>
                  <td>${item.codigo}</td>
                  <td>${item.nome}</td>
                  <td>R$ ${item.valor_aquisicao}</td>
                  <td>${item.estado_conservacao}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <h2 style="font-size: 16px; text-align: center; margin-bottom: 25px; margin-top: 40px;">Itens encontrados</h2>
          
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
              ${encontrados.map(item => `
                <tr>
                  <td>${item.codigo}</td>
                  <td>${item.nome}</td>
                  <td>R$ ${item.valor_aquisicao}</td>
                  <td>${item.estado_conservacao}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>


           <h2 style="font-size: 16px; text-align: center; margin-bottom: 25px; margin-top: 40px;">Itens no lugar errado</h2>
          
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
              ${lugarErrado.map(item => `
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
  const generetePDF = async (html) => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);

  }

 return(
  <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between",  width: Dimensions.get("window").width * 0.85}}> 
    <TouchableOpacity onPress={UnicoEstado} style={{  width: Dimensions.get("window").width * 0.85, backgroundColor: "#ECAA71", borderRadius: 15, marginTop: 10  }}>
        <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'white', paddingVertical: 9}}>Gerar Relatório {'\n'} de itens nao encontrados</Text>
  </TouchableOpacity> 
  </View>
 );
}