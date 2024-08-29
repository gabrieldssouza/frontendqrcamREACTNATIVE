import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const NavigationbarBem = () => {
    // Estado para rastrear o botão selecionado
    const [selected, setSelected] = useState(null);

    // Função para definir o botão selecionado
    const handlePress = (button) => {
        setSelected(button);
    };

    return (
        <View style={styles.container}>
            <View> 
            <TouchableOpacity
                onPress={() => handlePress('Lugar')}
                style={[
                    styles.button,
                    { backgroundColor: selected === 'Lugar' ? 'ECAA71' : '#4A6382' }
                ]}
            >
                <Text style={styles.text}>Lugar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handlePress('Categoria')}
                style={[
                    styles.button,
                    { backgroundColor: selected === 'Categoria' ? 'ECAA71' : '#4A6382' }
                ]}
            >
                <Text style={styles.text}>Categoria</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handlePress('Tudo')}
                style={[
                    styles.button,
                    { backgroundColor: selected === 'Tudo' ? 'ECAA71' : '#4A6382' }
                ]}
            >
                <Text style={styles.text}>Tudo</Text>
            </TouchableOpacity></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5,
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});

export default NavigationbarBem;
