import axios from "axios";

export const API_BASE_URL = "http://127.0.0.1:8000";

// Tipos
export interface Item {
  descricao: string;
  id: number;
  item_codigo: string;
  quantidade: number;
  valor_total: number;
  valor_unitario: number;
  venda_id: number;
}

export interface Venda {
  data_venda: string;
  id: number;
  itens: Item[];
  operador: string;
  valor_total: number;
}

// Função para buscar todas as vendas
export const fetchVendas = async (): Promise<Venda[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/vendas`);
    return response.data;
  } catch (err) {
    console.error("Erro ao buscar vendas:", err);
    throw err; // Propaga o erro para ser tratado no componente
  }
};
