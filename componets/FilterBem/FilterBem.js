import React from 'react';
import { View, Button, TextInput } from 'react-native';
import {printToFileAsync} from 'expo-print'
import { useState } from 'react';
import {shareAsync} from 'expo-sharing'
import { Text, TouchableOpacity, Dimensions } from 'react-native';


export default function FilterBem({data}) {

  const html = `
 <html>
        <body>
          <h1 style="font-size: 16px; text-align: center; margin-bottom: 40px,  margin-top: 40px;">Relatório de Patrimônios - Todos os Bens</h1>
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

  const generetePDF = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);

  }

 

 return(

  <View style={{alignItems: "center",}}> 
  <TouchableOpacity onPress={generetePDF}style={{  width: Dimensions.get("window").width * 0.85, backgroundColor: "#ECAA71", borderRadius: 15, marginTop: 10  }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'white', paddingVertical: 7}}>Gerar Relatório de {'\n'} todos os bens</Text>
  </TouchableOpacity> 
  </View>
 );
}