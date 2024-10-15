import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function VerificationScreen({ route }) {
    const { scannedItems } = route.params;
    const expectedItems = [/* Lista de bens esperados */];

    const missingItems = expectedItems.filter(item => 
        !scannedItems.some(scannedItem => scannedItem.idbem === item.idbem)
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bens Escaneados</Text>
            <FlatList
                data={scannedItems}
                keyExtractor={item => item.idbem}
                renderItem={({ item }) => (
                    <Text style={styles.item}>{item.nome}</Text>
                )}
            />
            <Text style={styles.title}>Bens Faltando</Text>
            <FlatList
                data={missingItems}
                keyExtractor={item => item.idbem}
                renderItem={({ item }) => (
                    <Text style={styles.item}>{item.nome}</Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    item: {
        fontSize: 16,
        marginVertical: 5,
    },
});