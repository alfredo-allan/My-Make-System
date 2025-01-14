import axios from "axios";

// Configuração do Axios

const api = axios.create({
  baseURL: "http://10.0.0.108:8000", // Atualize conforme necessário
});

// Obter vendas e despesas por data
export const getSalesAndExpenses = async (date: string) => {
  try {
    const response = await api.get(`/finance?date=${date}`); // Supondo que a rota seja `/finance`
    return response.data; // Formato esperado: { sales: [...], expenses: [...] }
  } catch (error) {
    console.error("Erro ao buscar vendas e despesas:", error);
    throw error;
  }
};

// Fechar o caixa (opcional)
export const closeCashRegister = async (data: {
  date: string;
  totalSales: number;
  totalExpenses: number;
  profit: number;
}) => {
  try {
    const response = await api.post("/close-cash", data);
    return response.data; // Resposta esperada
  } catch (error) {
    console.error("Erro ao fechar o caixa:", error);
    throw error;
  }
};

export default api;
