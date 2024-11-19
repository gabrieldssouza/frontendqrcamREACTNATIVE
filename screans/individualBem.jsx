import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions, ScrollView} from "react-native";
import React, { useState , useEffect} from "react";
import { enableFreeze } from "react-native-screens";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BemForm from "../componets/NewBemForms/BemForm";
import LogoTop from "../componets/LogoTop/LogoTop";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import api from "../services/api";

export default function IndividualBem({ route }) {
  const navigation = useNavigation();
  const idbem = route.params?.idbem;
  console.log("id", idbem);
  const [Bem, setBem] = useState(null);
 

  useEffect(() => {
    
    fetchBem();
    
  }, [idbem]);

  const fetchBem = async () => {
    try {
      const response = await api.get(`/listarbem/${idbem}`);
      setBem(response.data); // Atualiza o estado com os dados do bem
      console.log("passou no Bem ");
    } catch (error) {
      console.error('Erro ao buscar bem', error);
    }
  };

  const [Local, setLocal] = useState(null); // Estado para armazenar os dados do local
const [LocalName, setLocalName] = useState(''); // Estado para armazenar o nome do local

useEffect(() => {
  if (Bem && Bem.local_idLocais) {
    fetchLocal(); // Chama a função fetchLocal quando Bem e local_idLocais estão definidos
  }
}, [Bem]);

const fetchLocal = async () => {
  if (!Bem.local_idLocais) {
    console.log("Local ID não disponível.");
    return;
  }

  try {
    const response = await api.get(`/local/${Bem.local_idLocais}`);
    setLocal(response.data); // Atualiza o estado com os dados do local
    console.log("Local data:", response.data);
  } catch (error) {
    console.error('Erro ao buscar local', error);
  }
};

useEffect(() => {
  if (Local && Local.nome) {
    setLocalName(Local.nome);
  
  }
}, [Local]);
    return(

        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#29304B', position: "relative"}} > 

        <LogoTop/>

        < View > 
                <View style={{flexDirection: "row"}}>
                    <Text style={{fontSize: 25, color: "white", marginLeft: 5, marginTop: 35, color: "white"}}>Bem {Bem?.codigo}</Text>
                    
             <TouchableOpacity onPress={() => navigation.navigate('BemFormEdit', {id:idbem})} > 
             <Ionicons name="pencil" size={25} color="white" style={{left: 185, top: 35}} />
            </TouchableOpacity>
            </View>
                    <View style={{ height: 2,
    backgroundColor: "#ECAA71", width: Dimensions.get("window").width * 0.85, marginTop: 4
    }} /> 
      </View>

      <ScrollView style={{width: Dimensions.get('window').width * 0.85, marginTop: 10}}> 

        <View style={{borderBottomColor: "white", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", height: 70}}> 
      
        <View style={{paddingLeft: 30,  color: "white"}}>
            <Text style={{ color: "white"}}>Número</Text>
            <Text style={{ paddingBottom: 5, fontWeight: "bold", fontSize: 18,  color: "white"}}>{Bem?.numero}</Text>
        </View>
       
        </View>

        <View style={{borderBottomColor: "white", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", height: 70}}> 
       
        <View style={{paddingLeft: 30, color: "white" }}> 
            <Text style={{color: "white"}}>Código</Text>
            <Text style={{ paddingBottom: 5, fontWeight: "bold", fontSize: 18, color: "white"}}>{Bem?.codigo}</Text>
        </View>
        
        </View>

        <View style={{borderBottomColor: "white", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", height: 70}}> 
       
        <View style={{paddingLeft: 30 }}> 
            <Text style={{color: "white"}}>Nome:</Text>
            <Text style={{ paddingBottom: 5, fontWeight: "bold", fontSize: 18, color: "white"}}>{Bem?.nome}</Text>
        </View>
        
        </View>

        <View style={{borderBottomColor: "white", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", height: 70}}> 
        <View style={{paddingLeft: 30 }}> 
            <Text style={{color: "white"}}>Data de aquisição</Text>
            <Text style={{ color: "white", paddingBottom: 5, fontWeight: "bold", fontSize: 18}}>{Bem?.data_aquisicao}</Text>
        </View>
        
        </View>

        <View style={{borderBottomColor: "white", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", height: 70}}> 
       
        <View style={{paddingLeft: 30 }}> 
            <Text style={{color: "white"}}>valor de aquisição</Text>
            <Text style={{ paddingBottom: 5, fontWeight: "bold", fontSize: 18, color: "white"}}>{Bem?.valor_aquisicao}</Text>
        </View>
        
        </View>
        
        <View style={{borderBottomColor: "white", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", height: 70}}> 
       
        <View style={{paddingLeft: 30, color: "white" }}> 
            <Text style={{color: "white"}}>Estado de conservação</Text>
            <Text style={{color: "white", paddingBottom: 5, fontWeight: "bold", fontSize: 18}}>{Bem?.estado_conservacao}</Text>
        </View>

        
        
        </View>

        <View style={{borderBottomColor: "white", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", height: 70}}> 
       
       <View style={{paddingLeft: 30, color: "white" }}> 
           <Text style={{color: "white"}}>Local</Text>
           <Text style={{color: "white", paddingBottom: 5, fontWeight: "bold", fontSize: 18}}>c108</Text>
       </View>
       </View>

        <View style={{borderBottomColor: "white", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", height: 70}}> 
      
        <View style={{paddingLeft: 30,  color: "white"}}> 
            <Text style={{ color: "white"}}>Categoria</Text>
            <Text style={{  color: "white", paddingBottom: 5, fontWeight: "bold", fontSize: 18}}>Eletrônicos</Text>
        </View>
        <View style={{flex: 1}} />
        </View>
      </ScrollView>     
</View>
        

    
      );
   
    }
  