import React, { useState } from 'react';
import { View, Alert, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RelatorioCategoria from '../RelatorioCat/RelatCat';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import api from '../../services/api';

export default function DropdownRelat() {
  const [filteredBens, setFilteredBens] = useState([]);
  const [openRelat, setopenRelat] = useState(false);
  const [valueRelat, setvalueRelat] = useState(null);
  const [items, setItems] = useState([
    { label: 'Todos', value: 'todos' },
    { label: 'Estados de Conservação', value: 'estados' },
    { label: 'Locais', value: 'locais' },
  ]);

  const [estados, setEstados] = useState({ otimo: [], bom: [], ruim: [], pessimo: [] });
  const [locais, setLocais] = useState({});
  const [bemLocais, setBemlocais] = useState({});

  function obterDataAtualFormatada() {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); 
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
  const [categorias, setCategorias  ] = useState({});
  const [bemCatgorias, setBemCatgorias] = useState({});


  const fetchLocais = async () => {
    try {
      const response = await api.get('/listarlocais');
      const result = await response.data;
      setLocais(result)
      //console.log(locais[2].nome)
      result.forEach(item => {
        filtroLocal(item.idLocais)}
      )
    } catch (error) {
      console.error('Erro ao buscar locais:', error);
    }
  };

  const filtroLocal = async (loc) => {
    try {
      const response = await fetch(`http://192.168.1.114:3000/listarLocal/${loc}`);
      console.log("loc", loc)
      const result = await response.json();
      setBemlocais((prevState) => ({
        ...prevState,
        [loc]: result
      }));
      
    } catch (error) {
      console.error('Erro ao buscar dados', error);
      return [];
    }
  };

  const gerarPDFLocais = async () => {
    await fetchLocais();
    const html = `
      <html>
        <body>
        <table style="width: 100%; border: none;">
      <tr>
        <td style="width: 10%;"><img src="logo-do-app.png" alt="Logo" style="width: 100px; height: auto;"></td>
        <td style="text-align: center; font-size: 18px; font-weight: bold;">Relatório de Gerenciamento Patrimonial - Bens por lugar</td>
        <td style="width: 10%;"></td>
      </tr>
    </table>
       <!-- Informações adicionais -->
    <div style="; font-size: 14px; margin-top: 20px;">
      <p><strong>Data de expedição do arquivo:</strong> ${obterDataAtualFormatada()}</p>
      <p><strong>Entidade:</strong> [Nome da Entidade]</p>
    </div>
     ${Object.keys(bemLocais).map(est => `
      <tr>
                  <td colspan="4" style="font-weight: bold; padding-top: 20px;">Localizados em </td>
       </tr>
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
                ${bemLocais[est].map(item => `
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
    try {
      const { uri } = await Print.printToFileAsync({ html });
      await shareAsync(uri);
    } catch (error) {
      console.error('Erro ao gerar ou compartilhar o PDF', error);
    }
  };

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


  const gerarPDFEstados = async () => {
    await carregarEstados();
    if (!estados || estados.length == 0) {
      console.log("Nenhum dado encontrado para gerar o PDF");
      return; 
    }
    const html = `
      <html>
        <body>
          <!-- Cabeçalho com logo e título -->
    <table style="width: 100%; border: none;">
      <tr>
        <td style="width: 10%;"><img src="logo-do-app.png" alt="Logo" style="width: 100px; height: auto;"></td>
        <td style="text-align: center; font-size: 18px; font-weight: bold;">Relatório de Gerenciamento Patrimonial - Estados de conservação</td>
        <td style="width: 10%;"></td>
      </tr>
    </table>

    <!-- Informações adicionais -->
    <div style="; font-size: 14px; margin-top: 20px;">
      <p><strong>Data do arquivo:</strong> ${obterDataAtualFormatada()}</p>
      <p><strong>Entidade:</strong> [Nome da Entidade]</p>
  
    </div>
   ${Object.keys(estados).map(est => `
      <tr>
                  <td colspan="4" style="font-weight: bold; padding-top: 20px;"> Em ${est} estado de conservação:</td>
                </tr>
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

    try {
      const { uri } = await Print.printToFileAsync({ html });
      await shareAsync(uri);
    } catch (error) {
      console.error('Erro ao gerar ou compartilhar o PDF', error);
    }
  };

  const fetchData = async () => {
    try {
      let bensData = []; // Armazena todos os dados recebidos
  
     
      for (let i = 0; i < 2; i++) {
        const response = await api.get('/listarbens');
  
        if (response.status !== 200) {
          throw new Error('Erro ao pegar dados');
        }
  
        const result = response.data;
        bensData = [...bensData, ...result];
        console.log("Resultado da requisição:", result);
      }
  
      
      setFilteredBens(bensData);
      console.log("Todos os bens recebidos:", bensData);
    } catch (error) {
      console.error('Erro ao buscar dados', error);
      setError(error.message);
    }
  };
  
  
  const gerarPDFTodos = async () => {
    await fetchData(); 
  
  
    if (!filteredBens || filteredBens.length == 0) {
      console.log("Nenhum dado encontrado para gerar o PDF");
      return; 
    }
  
    const html = `
      <html>
        <body>
          <!-- Cabeçalho com logo e título -->
          <table style="width: 100%; border: none;">
            <tr>
              <td style="width: 10%;"><img src="logo-do-app.png" alt="Logo" style="width: 100px; height: auto;"></td>
              <td style="text-align: center; font-size: 18px; font-weight: bold;">Relatório de Gerenciamento Patrimonial - Todos os bens</td>
              <td style="width: 10%;"></td>
            </tr>
          </table>
  
          <!-- Informações adicionais -->
          <div style="font-size: 14px; margin-top: 20px;">
            <p><strong>Data do arquivo:</strong> ${obterDataAtualFormatada()}</p>
            <p><strong>Entidade:</strong> [Nome da Entidade]</p>
          </div>
  
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
              ${filteredBens.map(item => `
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
  
    try {
      const { uri } = await Print.printToFileAsync({ html });
      await shareAsync(uri);
    } catch (error) {
      console.error('Erro ao gerar ou compartilhar o PDF', error);
    }
  };
  

  const handleSelection = (selectedValue) => {
    if (!selectedValue) return;
    setopenRelat(false);
  
    switch (selectedValue) {
      case 'todos':
        handleTodos();
        break;
      case 'estados':
        handleEstados();
        break;
      case 'locais':
        handleLocais();
        break;
      case 'local':
        handleLocalIndividual();
        break;
      case 'categorias':
        handleCategorias();
        break;
      case 'categoria':
        handleCategoriaIndividual();
        break;
      default:
        Alert.alert('Erro', 'Opção inválida.');
    }

    // Fecha o dropdown
    setopenRelat(false);
  };

  // Funções fictícias para cada caso
  const handleTodos = () => gerarPDFTodos()
  const handleEstados = () => gerarPDFEstados() ;
  const handleLocais = () => gerarPDFLocais()
  const handleLocalIndividual = () => Alert.alert('Local Individual selecionado');
  const handleCategorias = () => Alert.alert('Categorias selecionadas');
  const handleCategoriaIndividual = () => Alert.alert('Categoria Individual selecionada');

  return (
    <View style={styles.container}>
      
      <TouchableOpacity
        onPress={() => setopenRelat(!openRelat)}
        style={styles.button}
      >
        <Ionicons size={35} name="document-outline" color="white" />
      </TouchableOpacity>

    
      {openRelat && (   
      <DropDownPicker
        open={openRelat}
        value={valueRelat}
        items={items}
        setOpen={setopenRelat}
        setValue={setvalueRelat}
        setItems={setItems}
        onSelectItem={(item) => handleSelection(item.value)} 
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        zIndex={1000} 
        placeholder="Opções de relatório"
        
        showArrowIcon={false} 
        showTickIcon={false} 
        textStyle={{
          color: '#D1D5DB', 
        }}
        listItemContainerStyle={{
          marginVertical: 3,        }}
      />
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', 
    alignItems: 'flex-end',
        padding: 10, 
    backgroundColor: '#29304B', 
  },
  button: {
    width: Dimensions.get('window').width * 0.12,
    backgroundColor: '#ECAA71', 
    borderRadius: 15,
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    width: Dimensions.get('window').width * 0.5, 
    backgroundColor: '#29304B', 
    borderColor: 'white',
    borderWidth: 1,
    position: 'absolute',
    right: 0 },
  dropdownContainer: {
    width: Dimensions.get('window').width * 0.5,
    backgroundColor: '#29304B', 
    borderColor: 'white', 
    borderWidth: 1,
    position: 'absolute',
    right: 0,
  },
});


