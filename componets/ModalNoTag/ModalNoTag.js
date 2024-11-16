import React from 'react';
import { Text, ScrollView, TouchableOpacity, View, Dimensions, StyleSheet } from 'react-native';
import ModalContainer from 'react-native-modal';
import BoxBem from '../BoxBem/BoxBem'; // Supondo que você tenha esse componente para exibir os bens
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export default function ModalNoTag({ data, onClose }) {
  console.log("oimodal");
  console.log("data do modal", data);
  const navigation = useNavigation();

  const missingTag = async (id_atual, id_antigo) => {
    console.log("IDS merge missing", id_atual, id_antigo)
    try {
      console.log("tentando merge missing")
      const response = await api.put('/missingTag', {
        id_bem_atual: id_atual,
        id_bem_antigo: id_antigo
      });
      console.log('Resposta do servidor:', response.data);
    } catch (error) {
      console.error('Erro ao atualizar o bem:', error);
    }
  }
    
  

  return (
    <ModalContainer onBackdropPress={onClose} isVisible={true} style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Identificações Potencialmente Relacionadas</Text>
        <Text style={styles.subtitle}>Clique no box para ver mais informações sobre o bem.</Text>
        <Text style={styles.description}>
          As identificações abaixo podem ser relativas ao mesmo bem devido à perda de etiqueta. Caso sejam o mesmo patrimônio, clique em "São o mesmo Patrimônio!" para restaurar as informações.
        </Text>

        <ScrollView style={styles.scrollContainer}>
          {data.map((item) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Bem', { idbem: item.idbem, key: item.idbem })}
              key={item.idbem}
              style={styles.itemContainer}
            >
              <BoxBem data={item} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => missingTag(data[0].idbem, data[1].idbem)} style={styles.confirmButton}>
            <Text style={styles.buttonText}>São o mesmo Patrimônio!</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    width: Dimensions.get('window').width * 0.9,
    maxHeight: Dimensions.get('window').height * 0.8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
    textAlign: 'justify',
  },
  scrollContainer: {
    maxHeight: Dimensions.get('window').height * 0.4,
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#ECAA71',
    borderRadius: 15,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#ECAA71',
    fontSize: 16,
    fontWeight: 'bold',
  },
});




