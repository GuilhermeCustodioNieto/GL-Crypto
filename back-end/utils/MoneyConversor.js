// 16217|XDwvdefGX3t6Wiqf2KKhx7F1bCsxjt7G
import axios from "axios";

// URL da API e chave de autenticação
export default async function getConversion(input, output) {
  const url = "https://min-api.cryptocompare.com/data/price";
  const apiKey =
    "6add71f794b87620f023c98ba204248731dff87c11e7cfbe5dec490e4022ee8c";

  // Parâmetros
  const params = {
    fsym: input, // Moeda de origem
    tsyms: output, // Moedas de destino
  };

  // Fazer a requisição
  axios
    .get(url, {
      params,
      headers: { Authorization: `Apikey ${apiKey}` },
    })
    .then((response) => {
      return response.data[output];
    })
    .catch((error) => {
      console.error("Erro na requisição:", error.message);
    });
}
