import React, { useState } from 'react';
import { View, Alert, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RelatorioCategoria from '../RelatorioCat/RelatCat';

export default function DropdownRelat() {
  const [openRelat, setopenRelat] = useState(false);
  const [valueRelat, setvalueRelat] = useState(null);
  const [items, setItems] = useState([
    { label: 'Todos', value: 'todos' },
    { label: 'Estados de Conservação', value: 'estados' },
    { label: 'Locais', value: 'locais' },
    { label: 'Local Individual', value: 'local' },
    { label: 'Categorias', value: 'categorias' },
    { label: 'Categoria Individual', value: 'categoria' },
  ]);

  const handleSelection = (selectedValue) => {
    if (!selectedValue) return;
    setopenRelat(false);
    // Executa a função associada
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
  const handleTodos = () => Alert.alert('Todos selecionados');
  const handleEstados = () => <RelatorioCategoria/>
  const handleLocais = () => Alert.alert('Locais selecionados');
  const handleLocalIndividual = () => Alert.alert('Local Individual selecionado');
  const handleCategorias = () => Alert.alert('Categorias selecionadas');
  const handleCategoriaIndividual = () => Alert.alert('Categoria Individual selecionada');

  return (
    <View style={styles.container}>
      {/* Botão para abrir o DropDown */}
      <TouchableOpacity
        onPress={() => setopenRelat(!openRelat)}
        style={styles.button}
      >
        <Ionicons size={35} name="document-outline" color="white" />
      </TouchableOpacity>

      {/* DropDownPicker */}
      {openRelat && (   
      <DropDownPicker
        open={openRelat}
        value={valueRelat}
        items={items}
        setOpen={setopenRelat}
        setValue={setvalueRelat}
        setItems={setItems}
        onSelectItem={(item) => handleSelection(item.value)} // Chama a função ao selecionar
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        zIndex={1000} // Mantém acima de outros itens
        placeholder="" // Remove texto de placeholder
        showArrowIcon={false} // Remove o ícone de seta
        showTickIcon={false} // Remove o ícone de seleção
      />
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Posiciona no final da tela
    alignItems: 'flex-end', // Alinha os itens ao lado direito
    padding: 10, // Adiciona um pouco de espaço nas bordas
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
    width: Dimensions.get('window').width * 0.5, // Define a largura do dropdown
    position: 'absolute',
    right: 0, // Alinha o dropdown com o lado direito do botão
  },
  dropdownContainer: {
    width: Dimensions.get('window').width * 0.5,
    position: 'absolute',
    right: 0,
  },
});
