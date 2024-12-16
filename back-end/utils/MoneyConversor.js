import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export default async function getConversion(input, output) {
  const url = process.env.URL_CONVERSOR;
  const apiKey = process.env.API_KEY_CONVERSOR;

  const params = {
    fsym: input,
    tsyms: output,
  };

  try {
    const response = await axios.get(url, {
      params,
      headers: { Authorization: `Apikey ${apiKey}` },
    });

    if (!response.data || !response.data[output]) {
      throw new Error("Conversão não encontrada ou inválida.");
    }

    return response.data[output];
  } catch (error) {
    console.error("Erro ao buscar conversão:", error.message);
    throw error;
  }
}
