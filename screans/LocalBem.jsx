import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions, ScrollView} from "react-native";
import React, { useState , useEffect} from "react";
import { enableFreeze } from "react-native-screens";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BemForm from "../componets/NewBemForms/BemForm";
import LogoTop from "../componets/LogoTop/LogoTop";

export default function LocalBem({route}){  
    const navigation = useNavigation();
    const id = route.params?.id;

    console.log(id)

    const data = [
        {
            id_movimento: 3, 
            data_hora_movimento: "2024-08-02 18:02:00",
            responsavel_movimento: "Kort",
            local_idLocais: 2,
            bem_idbem: 4
        },
        {
            id_movimento: 4, 
            data_hora_movimento: "2024-08-02 18:02:21",
            responsavel_movimento: "Kort",
            local_idLocais: 2,
            bem_idbem: 4
        }

    ];
    
    

    return(
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#29304B', position: "relative"}} > 

             <LogoTop/>



< View > 
            <Text style={{fontSize: 25, color: "white", marginLeft: 10, marginTop: 30, color: "white"}}>Bem </Text>

            <View style={{ height: 2,
backgroundColor: "#ECAA71", width: Dimensions.get("window").width * 0.85, marginTop: 4
}} />
                   
</View>

            <ScrollView style={{width: Dimensions.get('window').width * 0.85, marginTop: 10}}> 

                    {data.map((item) => {
                        return(
                           <View key={item.id_movimento} style={{borderBottomColor: "white", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", height: 80}}> 
                           <Text style={{ padding: 10, color: "white"}}> icon </Text>
                           <View style={{paddingLeft: 30, color: "white", paddingBottom: 5}}> 
                               <Text style={{color: "white"}}>{item.data_hora_movimento}</Text>
                               <Text style={{color: "white", paddingHorizontal: 5, fontWeight: "bold", fontSize: 18}}>{item.id_movimento}</Text>
                               <Text style={{color: "white"}}>Responsável: {item.responsavel_movimento}</Text>
                           </View>
                           <View style={{flex: 1}} />
                               <Text style={{padding: 20, color: "white"}}>Edit</Text>
                           </View>)
                    })}
                <TouchableOpacity onPress={() =>  navigation.navigate('Bem')} style={{ width: Dimensions.get("window").width * 0.50, backgroundColor: "#ECAA71", borderRadius: 15, justifyContent: "center", alignItems: "center",  margin: "auto", marginTop: 40}}>
        <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: 'white', paddingVertical: 15}}>Atualizar local</Text>
      </TouchableOpacity>   
            </ScrollView> 

               
</View>
    
      );
   
    }
    
    