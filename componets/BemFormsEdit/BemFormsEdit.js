import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BemFormEdit(props) {
  const navigation = useNavigation();

    const { id } = props;

    const [Bem, setBem] = useState(null);

    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [codigo, setCodigo] = useState('');
    const [dataAquisicao, setAquisicao] = useState('');
    const [estadoConservacao, setEstadoConservacao] = useState('');
    const [valor, setValor] = useState('');
    const [IDcategoria, setIDcategoria] = useState('');

    useEffect(() => {
        const handleGetBem = async () => {
            try {
                const response = await fetch(`http://192.168.1.23:3000/listarBem/${id}`);
                if (!response.ok) {
                    throw new Error('Erro ao pegar dados');
                }
                const result = await response.json();
                setBem(result);
                setNome(result.nome);
                setNumero(result.numero);
                setCodigo(result.codigo);
                setAquisicao(result.data_aquisicao);
                setValor(result.valor_aquisicao);
                setEstadoConservacao(result.estado_conservacao);
                setIDcategoria(result.categoria_idCategoria);
            } catch (error) {
                console.error('Erro ao buscar bem', error);
            }
        };
        handleGetBem();
    }, [id]);

    const handleEditar = async () => {
        const newData = {
            idbem: id,
            nome,
            numero,
            codigo,
            data_aquisicao: dataAquisicao,
            valor_aquisicao: valor,
            estado_conservacao: estadoConservacao,
            categoria_idCategoria: IDcategoria
        };

        try {
            const response = await fetch('http://10.0.2.2:3000/editarBem', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData)
            });
            
            Alert.alert("Sucesso", "Bem editado com sucesso!");
            
            // Optionally navigate back or reset the state here
        } catch (error) {
            console.error('Erro ao editar bem:', error);
            Alert.alert("Erro ao editar bem", error.message);
        }
    };

    return (
        <View style={{ margin: "8%" }}>

            <TextInput
                value={nome}
                placeholder= "nome"
                onChangeText={setNome}
                style={styles.input}
            />
            <TextInput
                value={numero}
                placeholder= "numero"
                onChangeText={setNumero}
                style={styles.input}
            />
            <TextInput
                value={codigo}
                placeholder="codigo"
                onChangeText={setCodigo}
                style={styles.input}
            />
            <TextInput
                value={dataAquisicao}
                placeholder= "data"
                onChangeText={setAquisicao}
                style={styles.input}
            />
            <TextInput
                value={valor}
                placeholder= "valor"
                onChangeText={setValor}
                style={styles.input}
            />
            <TextInput
                value={estadoConservacao}
                placeholder="estado"
                onChangeText={setEstadoConservacao}
                style={styles.input}
            />
            <TextInput
                value={IDcategoria}
                placeholder= " id categoria "
                onChangeText={setIDcategoria}
                style={styles.input}
            />
            <TouchableOpacity onPress={handleEditar}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'white', paddingHorizontal: 5, margin: 20 }}>Editar BEM</Text>
            </TouchableOpacity>
        </View>
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