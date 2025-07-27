import axios from "axios";

const API_BASE_URL = " https://supermarketapp25.pythonanywhere.com";

// Função para buscar todos os itens do estoque
export const fetchAllStockItems = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/estoque`);
    return response.data; // Retorna os itens do estoque
  } catch (error: any) {
    console.error(
      "Erro ao buscar itens do estoque:",
      error.response?.data || error.message
    );
    throw error;
  }
};
