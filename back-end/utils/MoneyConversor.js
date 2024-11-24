import axios from "axios";

export default async function getConversion(input, output) {
  const url = "https://min-api.cryptocompare.com/data/price";
  const apiKey =
    "6add71f794b87620f023c98ba204248731dff87c11e7cfbe5dec490e4022ee8c";

  // Parâmetros
  const params = {
    fsym: input, // Moeda de origem
    tsyms: output, // Moeda de destino
  };

  try {
    // Requisição com async/await
    const response = await axios.get(url, {
      params,
      headers: { Authorization: `Apikey ${apiKey}` },
    });

    // Validação do retorno
    if (!response.data || !response.data[output]) {
      throw new Error("Conversão não encontrada ou inválida.");
    }

    return response.data[output]; // Retorna o valor da conversão
  } catch (error) {
    console.error("Erro ao buscar conversão:", error.message);
    throw error; // Propaga o erro para o controlador
  }
}
