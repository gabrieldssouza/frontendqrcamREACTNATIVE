import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
;

export default function RelatorioCategoria() {
  console.log("pelo menso ta")
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
      setEstados({ otimo, bom, ruim, pessimo });
      console.log("carregados")
    } catch (error) {
      console.error('Erro ao carregar os estados', error);
    }
  };

  useEffect(() => {
    carregarEstados();
  }, []);

  useEffect(() => {
    if (estados.otimo.length > 0) {
      gerarPDF();
    }
  }, [estados]);

  const gerarPDF = async () => {
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

    try {
      const { uri } = await Print.printToFileAsync({ html });
      await shareAsync(uri);
    } catch (error) {
      console.error('Erro ao gerar ou compartilhar o PDF', error);
    }
  };
  
    return (
      <View>
       
      </View>
    );// Não renderiza nada na tela
  }

