import axios from "axios";

// Configuração do Axios
const api = axios.create({
  baseURL: "https://supermarketapp25.pythonanywhere.com", // Atualize com o endereço do backend
});

// Função para buscar a descrição do produto pelo código
export const getProductDescription = async (itemCode: string) => {
  try {
    const response = await api.get("/items"); // Obtém todos os itens
    const items = response.data;

    // Procura pelo item com o código fornecido
    const foundItem = items.find(
      (item: { codigo: string }) => item.codigo === itemCode
    );

    if (foundItem) {
      return foundItem.descricao;
    } else {
      throw new Error(`Item com código ${itemCode} não encontrado.`);
    }
  } catch (error) {
    console.error("Erro ao buscar descrição do produto:", error);
    throw error;
  }
};

// Função para registrar uma venda
export const createSale = async (saleData: {
  operador: string;
  itens: Array<{ item_codigo: string; quantidade: number }>;
}) => {
  try {
    const response = await api.post("/vendas", saleData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar venda:", error);
    throw error;
  }
};

export default api;
