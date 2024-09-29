
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions} from "react-native";
import React from "react";
import { enableFreeze } from "react-native-screens";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BemForm from "../componets/NewBemForms/BemForm";
import LogoTop from "../componets/LogoTop/LogoTop";
import BemFormEdit from "../componets/BemFormsEdit/BemFormsEdit";

export default function FormsEditBem({route}){ 

    const navigation = useNavigation();
    const id = route.params?.id;
    console.log("ID DA PDOGINA" + id)
    
        return(
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#29304B', position: "relative"}} > 

            <LogoTop/>
           <BemFormEdit id={id}> </BemFormEdit>

            <TouchableOpacity onPress={() =>  navigation.navigate('Bem',  {id: id, key: id} )}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'white',  width: Dimensions.get("window").width * 0.85, backgroundColor: "#ECAA71", borderRadius: 30, paddingVertical: 10 }}>confirmado</Text>
            </TouchableOpacity>
</View>

          );
    }
    
    