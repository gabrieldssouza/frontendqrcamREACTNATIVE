import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import api from "../services/api";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigation = useNavigation();

    async function handleLogin() {
        if (email === '' || senha === '') {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const response = await api.post('/logar', { email, senha });
            if (response) {
                navigation.navigate('Initial');
            } else {
                alert("Email ou senha incorretos.");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error.message);
            alert("Erro ao fazer login. Tente novamente.");
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        const userFromApi = await api.get('/usuarios');
        users = userFromApi.data;
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.containerBoxTop}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require("../assets/logotccbranca.png")}
                        style={styles.image}
                    />
                </View>
            </SafeAreaView>

            <View style={styles.containerBoxBottom}>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                        style={{ borderRadius: 15, borderWidth: 2, borderColor: 'black', padding: 10, alignItems: 'left', marginLeft: 20 }}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={20} color="black" />
                    </TouchableOpacity>

                    <Text style={{ paddingHorizontal: "28%", justifyContent: "center", fontSize: 22, borderBottomColor: "black", borderBottomWidth: 1, fontWeight: "600" }}>Entrar</Text>
                </View>

                <View className="form" style={{ margin: "8%" }}>
                    <Text style={{ marginLeft: 4, fontWeight: "500", marginVertical: 10, fontSize: 17 }}>Email</Text>
                    <TextInput
                        style={{ padding: 8, backgroundColor: "#3D4364", width: "100%", borderRadius: 10 }}
                        value={email}
                        placeholder="email"
                        onChangeText={setEmail}
                        placeholderTextColor="black"
                    />

                    <Text style={{ marginLeft: 4, fontWeight: "500", marginVertical: 10, fontSize: 17 }}>Senha</Text>
                    <TextInput
                        style={{ padding: 8, backgroundColor: "#3D4364", width: "100%", borderRadius: 10 }}
                        secureTextEntry
                        value={senha}
                        placeholder="senha"
                        placeholderTextColor="black"
                        onChangeText={setSenha}
                    />

                    <TouchableOpacity style={[styles.buttonLog, { alignItems: "center" }]} onPress={handleLogin}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'white'}}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#29304B",
        justifyContent: "center",
        alignItems: "center",
        color: "white"
    },
    containerBoxTop: {
        width: "80%",
        height: "35%",
        paddingTop: 20,
    },
    containerBoxBottom: {
        paddingTop: 30,
        backgroundColor: "#333B5C",
        width: "100%",
        height: "65%",
        borderRadius: 35,
        shadowRadius: 20
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    buttonLog: {
        paddingVertical: 12,
        marginTop: 40,
        backgroundColor: '#ECAA71',
        marginHorizontal: 70,
        borderRadius: 10
    }
});