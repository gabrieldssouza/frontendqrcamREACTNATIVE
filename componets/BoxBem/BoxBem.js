import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

function BoxBem({ data }) {
  console.log("FOTO", data.foto);
  return (
    <View className="containerBoxBem">
      <View style={{ backgroundColor: "#3C4568", width: Dimensions.get("screen").width * 0.85, height: 120, borderRadius: 15, padding: 15, flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
        <View>
          <Image
            source={{ uri: data.foto }}
            style={{ width: 90, height: 90, backgroundColor: "black", borderRadius: 15 }}
          />
        </View>
        <View style={{ paddingLeft: 20, justifyContent: "center" }}>
          <Text className="textTitleBem" style={{ paddingBottom: 5, fontWeight: "bold", fontSize: 18 }}>{data.nome}</Text>
          <Text className="textNumeroBem">Número: {data.numero}</Text>
          <Text className="textLocalBem">Local: {data.local}</Text>
        </View>
      </View>
    </View>
  );
}

export default BoxBem;