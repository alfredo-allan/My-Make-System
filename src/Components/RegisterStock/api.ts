import axios from "axios";

export const createOrUpdateEstoque = async (data: {
  operador: string;
  quantidade: number;
  item_codigo: string;
}) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/estoque", data);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao registrar/atualizar estoque");
  }
};
