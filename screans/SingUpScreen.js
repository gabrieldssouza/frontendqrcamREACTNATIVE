import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput} from "react-native";
import React, {useState} from "react";
import { enableFreeze } from "react-native-screens";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../services/api";

export default function SingUpScreen(){ 
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [telefone, setTelefone] = useState("");

    async function handleSingUp(){
        if(email === '' || senha === '' || confirmSenha === '' || nome === '' || sobrenome === '' || telefone === ''){
            alert("Por favor, preencha todos os campos.");
            return;
        }
        if(senha !== confirmSenha){
            alert("As senhas não conferem.");
            return;
        }
        try{
            const response = await api.post('/registrar', {nome, sobrenome, telefone, email, senha});
            console.log(response)
            if(response){
                navigation.navigate('Initial');
            }else{
                alert("Erro ao cadastrar usuário.");
            }
        }catch(error){
            console.error("Erro ao cadastrar usuário:", error.message);
            alert("Erro ao cadastrar usuário. Tente novamente.");
        }
    }    

        return(
            <View style={styles.container}> 
               <SafeAreaView style={styles.containerBoxTop}> 
                
                 <View  style={styles.imageContainer}>
                    <Image
                        source={require("../assets/logotccbranca.png")}
                       style={styles.image}  
                    />
                </View>
            
               </SafeAreaView>
    
            <View style={styles.containerBoxBottom}> 
               <View style={{flexDirection: "row"}}> 
                    <TouchableOpacity style={{borderRadius: 50, borderWidth: 2, borderColor: 'black', padding: 10, alignItems: 'left', marginLeft: 20
      }} 
                    onPress={() => navigation.goBack()}> 
                        <Text> k-----</Text>   
                    </TouchableOpacity>
    
                    <Text style={{paddingHorizontal: "24%", justifyContent: "center", 
                        fontSize: 22, borderBottomColor: "black", borderBottomWidth: 1, fontWeight: 600}}>Cadastrar</Text>
                 </View>

                    
    
                    <View className="form" style={{margin: "8%"}} >

                    <Text style={{marginLeft: 4, fontWeight: 400, marginVertical: 10, }}>Nome</Text> 
                        <TextInput style={{padding: 8, backgroundColor: "#3D4364", width: "100%", borderRadius: 15}} 
                        value={nome}
                        placeholder="nome"
                        onChangeText={setNome}/>

                    <Text style={{marginLeft: 4, fontWeight: 400, marginVertical: 10, }}>Sobrenome</Text> 
                        <TextInput style={{padding: 8, backgroundColor: "#3D4364", width: "100%", borderRadius: 15}} 
                        value={sobrenome}
                        placeholder="sobrenome"
                        onChangeText={setSobrenome}/>

                    <Text style={{marginLeft: 4, fontWeight: 400, marginVertical: 10, }}>Telefone</Text> 
                        <TextInput style={{padding: 8, backgroundColor: "#3D4364", width: "100%", borderRadius: 15}} 
                        value={telefone}
                        placeholder="telefone"
                        onChangeText={setTelefone}/>
        
                    <Text style={{marginLeft: 4, fontWeight: 400, marginVertical: 10, }}>Email</Text> 
                        <TextInput style={{padding: 8, backgroundColor: "#3D4364", width: "100%", borderRadius: 15}} 
                        value={email}
                        placeholder="email"
                        onChangeText={setEmail}/>
    
                    <Text style={{marginLeft: 4, fontWeight: 400, marginVertical: 10 }}>Senha</Text> 
                        <TextInput style={{padding: 8, backgroundColor: "#3D4364", width: "100%", borderRadius: 15}} 
                        secureTextEntry
                        value={senha}
                        placeholder="senha"
                        onChangeText={setSenha}/>
                    
                    <Text style={{marginLeft: 4, fontWeight: 400, marginVertical: 10 }}>Confirme a senha</Text> 
                        <TextInput style={{padding: 8, backgroundColor: "#3D4364", width: "100%", borderRadius: 15}} 
                        secureTextEntry
                        value={confirmSenha} 
                        placeholder="Confirmar senha"
                        onChangeText={setConfirmSenha}/>
                       
                        
                        <TouchableOpacity onPress={handleSingUp} style={styles.buttonLog}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', 
                            textAlign: 'center', color: 'white', paddingHorizontal: 50 }}>Cadastrar</Text>
                        </TouchableOpacity>
                    
    
                    </View>
    
                    
    
                 </View>
            </View>
    
        );
    }
    
    const styles = StyleSheet.create({
       
        container:{
            flex: 1,
            backgroundColor: "#29304B",
            justifyContent: "center",
            alignItems: "center",
            color: "white"
        },
        containerBoxTop:{
                width: "80%",
                height: 0,
                paddingTop: 20,
           
             }, 
             containerBoxBottom:{
                paddingTop: 30,
                backgroundColor: "#333B5C",
                width: "100%",
                height : "100%",
                borderRadius: 35,
                shadowRadius: 20
               
                 }, 
    
             buttonLog: {
                paddingVertical: 12,
                marginTop: 40,
                backgroundColor: '#ECAA71',
                marginHorizontal: 28,
                borderRadius: 10
            },   imageContainer: {
                width: '100%',
                alignItems: 'center',
            },
            image: {
                width: 200, // Ajuste conforme necessário
                height: 200, // Ajuste conforme necessário
                resizeMode: 'contain',
            }, 
        
       
            }
    )
