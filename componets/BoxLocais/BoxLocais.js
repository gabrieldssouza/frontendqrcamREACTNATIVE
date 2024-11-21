import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

function BoxLocais( {data} ) {
  console.log(data)
  return (
    <View className="containerBoxBem">
      <View style={{ backgroundColor: "#3C4568", width: Dimensions.get("screen").width * 0.85, height: 100, borderRadius: 15, padding: 15, flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
        <View style={{ paddingLeft: 20, justifyContent: "center"}}>
        <Text className="textTitleBem" style={{ paddingBottom: 10, fontWeight: "bold", fontSize: 21}}>{data.nome}</Text>
          <Text className="textNumeroBem">Responsável da {data.nome}: {data.responsavel}</Text>
        </View>
      </View>
    </View>
  );
}

export default BoxLocais;