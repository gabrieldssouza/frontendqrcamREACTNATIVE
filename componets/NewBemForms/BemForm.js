import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, StyleSheet, Dimensions, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function BemForm() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [codigo, setCodigo] = useState('');
  const [dataAquisicao, setAquisicao] = useState('');
  const [estadoConservacao, setEstadoConservacao] = useState('');
  const [valor, setValor] = useState('');
  const [local, setLocal] = useState(''); // Atualiza este estado com o valor do local selecionado
  const [IDcategoria, setIDcategoria] = useState([]);
  const [DataLocais, setDataLocais] = useState([]); // Lista de locais para o DropDownPicker
  const [isOpen, setIsOpen] = useState(false); // Abre ou fecha o dropdown
  const [currentValue, setCurrentValue] = useState(''); // Valor atual selecionado no dropdown

  useEffect(() => {
    const filtroEstado = async () => {
      try {
        const response = await fetch('http://192.168.1.167:3000/listarLocais');
        const result = await response.json();
  
        // Converte o resultado no formato esperado para o DropDownPicker
        const locaisFormatados = result.map((local) => ({
          label: local.nome, // Nome do local para exibição
          value: local.idLocais, // ID do local como valor
        }));
  
        // Atualiza o estado com os locais formatados
        setDataLocais(locaisFormatados);
        console.log(locaisFormatados);
        
      } catch (error) {
        console.error('Erro ao buscar dados', error);
      }
    };
  
    filtroEstado();
  }, []);
  
  const handleCadastrar = async () => {
    let newData = {
      nome,
      numero,
      codigo,
      data_aquisicao: dataAquisicao,
      valor_aquisicao: valor,
      estado_conservacao: estadoConservacao,
      categoria_idCategoria: IDcategoria,
      local: local, // Usa o estado `local`, que armazena o valor selecionado no DropDownPicker
    };
    console.log(newData)

    try {
      const response = await fetch('http://192.168.1.167:3000/criarbem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
  
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Erro na solicitação');
      }
  
      console.log('QR Code URL:', result.qrcode);
      Alert.alert("Bem cadastrado com sucesso");
      setNome('');
      setNumero('');
      setCodigo('');
      setAquisicao('');
      setValor('');
      setEstadoConservacao('');
      setIDcategoria('');
      setLocal('');
      navigation.navigate('Initial'); 
    } catch (error) {
      console.error('Erro ao cadastrar bem:', error);
    }
  };

  return (
    <ScrollView>
      <View style={{ margin: "8%" }}>
        <TextInput
          value={nome}
          placeholder="Nome"
          onChangeText={setNome}
          style={styles.input}
        />
        <TextInput
          value={numero}
          placeholder="Número"
          onChangeText={setNumero}
          style={styles.input}
        />
        <TextInput
          value={codigo}
          placeholder="Código"
          onChangeText={setCodigo}
          style={styles.input}
        />
        <TextInput
          value={dataAquisicao}
          placeholder="Data de Aquisição"
          onChangeText={setAquisicao}
          style={styles.input}
        />
        <TextInput
          value={valor}
          placeholder="Valor do Bem"
          onChangeText={setValor}
          style={styles.input}
        />
        <TextInput
          value={estadoConservacao}
          placeholder="Estado de Conservação do Bem"
          onChangeText={setEstadoConservacao}
          style={styles.input}
        />

        <View style={{ marginTop: 30, marginBottom: 20, flex: 1, zIndex: 1000 }}> 
          <DropDownPicker
            items={DataLocais} // Use o estado atualizado aqui
            open={isOpen} 
            setOpen={setIsOpen}
            value={currentValue}
            setValue={(val) => {
              setCurrentValue(val);
              setLocal(val); // Atualiza o estado `local` com o valor selecionado
            }}
            maxHeight={200}
            autoScroll
            placeholder="Local que se encontra"
            style={{
              borderColor: "black", 
              borderWidth: 2, 
              width: Dimensions.get("window").width * 0.35, 
              borderRadius: 15, 
              padding: 9, 
              backgroundColor: '#29304B', 
              zIndex: 1001
            }}
            dropDownContainerStyle={{
              backgroundColor: '#29304B',
              borderColor: 'black', 
              borderWidth: 2, 
              borderRadius: 10, 
              width: Dimensions.get("window").width * 0.35,
            }}
            listItemLabelStyle={{
              color: 'black',
              borderBottomColor: "black" 
            }}
            placeholderStyle={{
              color: 'white',
            }}
          />
        </View>

        <TextInput
          value={IDcategoria}
          placeholder="Categoria do bem"
          onChangeText={setIDcategoria}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleCadastrar}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'white', backgroundColor: "#ECAA71", borderRadius: 30, paddingVertical: 10 }}>Confirmado</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: Dimensions.get("window").width * 0.85,
    marginVertical: 5,
    borderRadius: 15,
    marginBottom: 10,
    color: "white"
  },
});
