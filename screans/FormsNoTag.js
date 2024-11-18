import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions} from "react-native";
import React from "react";
import { enableFreeze } from "react-native-screens";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BemForm from "../componets/NewBemForms/BemForm";
import LogoTop from "../componets/LogoTop/LogoTop";
import FormNoTag from "../componets/FormNoTag/FormNoTag";


export default function FormsNoTag({route}){ 
    const navigation = useNavigation();
    let etiqueta = route.params?.etiqueta;
    console.log(etiqueta)

        return(
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#29304B', position: "relative"}} >
            <LogoTop />
            <FormNoTag />
</View>
            
        
          );
    }
    
    