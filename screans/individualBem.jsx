import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions, ScrollView} from "react-native";
import React, { useState , useEffect} from "react";
import { enableFreeze } from "react-native-screens";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BemForm from "../componets/NewBemForms/BemForm";
import LogoTop from "../componets/LogoTop/LogoTop";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";

export default function IndividualBem({ route }) {
  const navigation = useNavigation();
  const idbem = route.params?.idbem;
  console.log(idbem);
  const [Bem, setBem] = useState(null);

  useEffect(() => {
    const fetchBem = async () => {
      try {
<<<<<<< HEAD

        const response = await fetch(`http://192.168.1.167:3000/listarbem/${idbem}`);

        if (!response.ok) {
=======
        const response = await api.get(`/listarbem/${idbem}`);
        if (!response.status === 200) {
>>>>>>> gabriel
          throw new Error('Erro ao pegar dados');
        }
        const result = response.data;
        setBem(result);
      } catch (error) {
        console.error('Erro ao buscar bem', error);
      }
    };
    fetchBem();
  }, [idbem]);

  console.log(Bem);
    return(

        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#29304B', position: "relative"}} > 

        <LogoTop/>

        < View > 

                <View style={{flexDirection: "row"}}>
                    <Text style={{fontSize: 25, color: "white", marginLeft: 10, marginTop: 30, color: "white"}}>Bem {Bem?.codigo}</Text>
                    
             <TouchableOpacity onPress={() => navigation.navigate('BemFormEdit', {id:idbem})} > 
             <Ionicons name="pencil" size={25} color="white" style={{left: 160, top: 35}} />
            </TouchableOpacity>
            </View>


                    <View style={{ height: 2,
    backgroundColor: "#ECAA71", width: Dimensions.get("window").width * 0.85, marginTop: 4
    }} />
                           
      </View>

      <ScrollView style={{width: Dimensions.get('window').width * 0.85, marginTop: 10}}> 

        <View style={{borderBottomColor: "white", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", height: 80}}> 
        <Text style={{ padding: 10,  color: "white"}}> icon </Text>
        <View style={{paddingLeft: 30,  color: "white"}}> 
            <Text style={{ color: "white"}}>Número</Text>
            <Text style={{ paddingBottom: 5, fontWeight: "bold", fontSize: 18,  color: "white"}}>{Bem?.numero}</Text>
        </View>
       
        </View>

        <View style={{borderBottomColor: "white", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", height: 80}}> 
        <Text style={{ padding: 10, color: "white"}}> icon </Text>
        <View style={{paddingLeft: 30, color: "white" }}> 
            <Text style={{color: "white"}}>Código</Text>
            <Text style={{ paddingBottom: 5, fontWeight: "bold", fontSize: 18, color: "white"}}>{Bem?.codigo}</Text>
        </View>
        
        </View>

        <View style={{borderBottomColor: "white", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", height: 80}}> 
        <Text style={{ padding: 10, color: "white"}}> icon </Text>
        <View style={{paddingLeft: 30 }}> 
            <Text style={{color: "white"}}>Nome:</Text>
            <Text style={{ paddingBottom: 5, fontWeight: "bold", fontSize: 18, color: "white"}}>{Bem?.nome}</Text>
        </View>
        
        </View>

        <View style={{borderBottomColor: "white", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", height: 80}}> 
        <Text style={{ padding: 10, color: "white"}}> icon </Text>
        <View style={{paddingLeft: 30 }}> 
            <Text style={{color: "white"}}>Data de aquisição</Text>
            <Text style={{ color: "white", paddingBottom: 5, fontWeight: "bold", fontSize: 18}}>{Bem?.data_aquisicao}</Text>
        </View>
        
        </View>

        <View style={{borderBottomColor: "white", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", height: 80}}> 
        <Text style={{ padding: 10, color: "white"}}> icon </Text>
        <View style={{paddingLeft: 30 }}> 
            <Text style={{color: "white"}}>valor de aquisição</Text>
            <Text style={{ paddingBottom: 5, fontWeight: "bold", fontSize: 18, color: "white"}}>{Bem?.valor_aquisicao}</Text>
        </View>
        
        </View>
        
        <View style={{borderBottomColor: "white", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", height: 80}}> 
        <Text style={{ padding: 10, color: "white"}}> icon </Text>
        <View style={{paddingLeft: 30, color: "white" }}> 
            <Text style={{color: "white"}}>Estado de conservação</Text>
            <Text style={{color: "white", paddingBottom: 5, fontWeight: "bold", fontSize: 18}}>{Bem?.estado_conservacao}</Text>
        </View>
        
        </View>

        <View style={{borderBottomColor: "white", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", height: 80}}> 
        <Text style={{ padding: 10,  color: "white" }}>icon</Text>
        <View style={{paddingLeft: 30,  color: "white"}}> 
            <Text style={{ color: "white"}}>Categoria</Text>
            <Text style={{  color: "white", paddingBottom: 5, fontWeight: "bold", fontSize: 18}}>{Bem?.categoria_idCategoria}</Text>
        </View>
        <View style={{flex: 1}} />

        <TouchableOpacity onPress={() => navigation.navigate('LocalBem', {id:id})}
                        >
                        <Text style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center', color: 'white', backgroundColor: "#ECAA71", borderRadius: 15, paddingVertical: 7, width: 100}}>Locais {'\n'} passados</Text>
                    </TouchableOpacity>
        </View>

      </ScrollView> 


        



      
</View>
        

    
      );
   
    }
    
    