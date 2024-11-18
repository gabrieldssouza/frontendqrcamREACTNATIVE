
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions} from "react-native";
import React from "react";
import { enableFreeze } from "react-native-screens";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BemForm from "../componets/NewBemForms/BemForm";
import LogoTop from "../componets/LogoTop/LogoTop";
import BemFormEdit from "../componets/BemFormsEdit/BemFormsEdit";

export default function EditBemLevScreen({route}){ 

    const navigation = useNavigation();
    const id = route.params?.id;
    const pendenciaLocal = route.params?.pendenciaLocal;
    console.log("ID DA PDOGINA" + id)
    
        return(
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#29304B', position: "relative"}} > 

            <LogoTop/>
           <BemFormEdit id={id} pendenciaLocal={pendenciaLocal}></BemFormEdit>     
</View>

          );
    }