import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
    const navigation = useNavigation();

  
    return (
        <SafeAreaView style={styles.container} >
 
            <View  style={styles.imageContainer}>
                <Image
                    source={require("../assets/logotccbranca.png")}
                   style={styles.image}
                />
            </View>
            <View >
                <TouchableOpacity
                    style={
                        styles.buttonLog
                    }
                    onPress={() => navigation.navigate('SingUp')}
                >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
                    <Text style={{ color: 'white' }}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ fontWeight: '600', color: '#ECAA71', marginLeft: 4 }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#29304B",
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
    },
    image: {
        width: 230, // Ajuste conforme necessário
        height: 230, // Ajuste conforme necessário
        resizeMode: 'contain',
    }, 
    buttonLog: {
        paddingVertical: 12,
        marginTop: 40,
        backgroundColor: '#ECAA71',
        marginHorizontal: 28,
        borderRadius: 10
    }


})
