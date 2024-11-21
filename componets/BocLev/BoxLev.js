import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

function BoxLev({data, errorplace}) {
  console.log("FOTO", data.foto);
  console.log("eror", errorplace);


  const fetchBem = async (idBem) => {
    try {
      const response = await api.get(`/listarbem/${idBem}`);
      if (response.status !== 200) {
        throw new Error('Erro ao pegar dados');
      }
      console.log("dat")
      return response.data; // Retorna os dados do bem
    } catch (error) {
      console.error('Err ao buscar bem id do bem:', idBem, error);
      return null; // Retorna null em caso de erro
    }
  };

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
         
        </View>
      </View>
    </View>
  );
}

export default BoxLev;