import axios from "axios";

const API_URL = "https://supermarketapp25.pythonanywhere.com";

interface ItemData {
  codigo: string;
  descricao: string;
  valor: number;
}

export const createItem = async (data: ItemData) => {
  try {
    const response = await axios.post(`${API_URL}/items`, data, {
      headers: {
        "Content-Type": "application/json", // Garantindo que o cabeçalho esteja correto
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Erro inesperado ao criar item."
      );
    }
    throw new Error("Erro ao se comunicar com o servidor.");
  }
};
