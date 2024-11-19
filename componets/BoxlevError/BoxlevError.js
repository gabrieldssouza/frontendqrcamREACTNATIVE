import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import api from "../../services/api";

export default function BoxLevError({ errorplace }) {
  const [bemDetails, setBemDetails] = useState([]); 
  console.log("Conteúdo de errorplace:", errorplace.bem_idbem);

  const fetchBem = async (idBem) => {
    console.log("feachBem")
    try {
      const response = await api.get(`/listarbem/${idBem}`);
      if (response.status !== 200) {
        throw new Error("Erro ao pegar dados");
      }
      console.log("ERROR", response.data) 
      setBemDetails(response.data);
      // Retorna os dados do bem
    } catch (error) {
      console.error("Erro ao buscar bem id do bem:", idBem, error);
      return null; // Retorna null em caso de erro
    }
  };

  // Função para buscar os dados de todos os itens de errorplace
  useEffect(() => {
    fetchBem(errorplace.bem_idbem); // Chama a função ao montar o componente
  }, []);

  console.log("DATA DO ERROR", bemDetails)

  return (
    <View className="containerBoxBem">
        <View
          key={bemDetails.bem_idbem}
          style={{
            backgroundColor: "#3C4568",
            width: Dimensions.get("screen").width * 0.85,
            height: 120,
            borderRadius: 15,
            padding: 15,
            flexDirection: "row",
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <View>
            <Image
              source={{ uri: bemDetails.foto }}
              style={{
                width: 90,
                height: 90,
                backgroundColor: "black",
                borderRadius: 15,
              }}
            />
          </View>
          <View style={{ paddingLeft: 20, justifyContent: "center" }}>
            <Text
              className="textTitleBem"
              style={{
                paddingBottom: 5,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              {bemDetails.nome}
            </Text>
            <Text className="textNumeroBem">Número: {bemDetails.numero}</Text>
          </View>
        </View>
    </View>
  );
}


