import React from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LogoTop(){
  const navigation = useNavigation();

  function goBack(){
    navigation.navigate.goBack();
  }
 return(
    <View style={{  alignItems: 'center', backgroundColor: '#ECAA71', width: Dimensions.get('window').width * 0.30, height: Dimensions.get('window').width * 0.35, 
    alignItems: "flex-start", borderBottomEndRadius: 20, borderBottomStartRadius: 20, justifyContent:"center"}}>
       
      <Image
                    source={require("../../assets/logotccbranca.png")}
                   style={{ width: 90, 
                    height: 90, 
                    resizeMode: 'contain',  
                    alignItems: 'center', 
                    marginLeft: 10 , justifyContent:"center", 
                marginTop: 30}}

                />
      </View>

 );
}