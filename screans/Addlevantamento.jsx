import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import LogoTop from "../componets/LogoTop/LogoTop";
import AddInventario from "../componets/AddInvent/AddInventario";

export default function Addlevantamento(){ 
    const navigation = useNavigation();


        return(
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#29304B', position: "relative"}} >
                <LogoTop/>
                <AddInventario/>
            </View>
          );
    }
    
    