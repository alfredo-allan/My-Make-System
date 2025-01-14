import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

// Função para buscar o ID do item pelo código
export const fetchItemIdByCode = async (
  itemCode: string
): Promise<number | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items`);
    const item = response.data.find((item: any) => item.codigo === itemCode);

    if (item) {
      return item.id; // Retorna o ID do item encontrado
    } else {
      console.error("Item não encontrado.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar o ID do item:", error);
    return null;
  }
};

// Função para deletar quantidade ou registro do estoque
export const deleteStock = async (
  itemId: number,
  quantidade: number,
  dataOperacao: string
): Promise<any> => {
  try {
    // A rota DELETE aceita o corpo no parâmetro `data`
    const response = await axios.delete(`${API_BASE_URL}/estoque/${itemId}`, {
      data: {
        quantidade,
        data_operacao: dataOperacao, // Garantir que "data_operacao" seja enviado
      },
    });

    return response.data; // Retorna a resposta da API para o componente utilizar
  } catch (error: any) {
    // Trata o erro e exibe a mensagem de resposta do backend (se disponível)
    console.error(
      "Erro ao deletar o estoque:",
      error.response?.data || error.message
    );
    throw error;
  }
};
