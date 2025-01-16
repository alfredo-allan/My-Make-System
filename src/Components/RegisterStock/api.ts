import axios from "axios";

export const createOrUpdateEstoque = async (data: {
  operador: string;
  quantidade: number;
  item_codigo: string;
}) => {
  try {
    const response = await axios.post(
      "https://supermarketapp25.pythonanywhere.com/estoque",
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao registrar/atualizar estoque");
  }
};
