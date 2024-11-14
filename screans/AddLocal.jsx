import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions} from "react-native";
import React from "react";
import { enableFreeze } from "react-native-screens";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddLocalForms from "../componets/AddLocal/AddLocalForms";
import LogoTop from "../componets/LogoTop/LogoTop";

export default function AddLocal(){ 
    const navigation = useNavigation();


        return(
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#29304B', position: "relative"}} >
                <LogoTop/>
                <AddLocalForms/>
            </View>
          );
    }
    
    