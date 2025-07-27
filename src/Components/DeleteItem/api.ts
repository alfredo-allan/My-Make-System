import axios from "axios";

const API_BASE_URL = "https://supermarketapp25.pythonanywhere.com"; // ou sua URL pública se for prod

// Interface para o objeto Estoque retornado pela API
interface EstoqueItem {
    id: number;
    item_id: number;
    item_codigo: string;
    item_descricao: string;
    quantidade: number;
    operador: string;
    created_at: string;
    updated_at: string;
}

// Busca o ID do estoque a partir do código do item
export const fetchEstoqueIdByItemCode = async (
    itemCode: string
): Promise<number | null> => {
    try {
        // Busca todos os registros de estoque diretamente
        const estoqueResponse = await axios.get(`${API_BASE_URL}/estoque`);
        const estoqueData: EstoqueItem[] = estoqueResponse.data;

        // Procura o estoque que tem o item_codigo correspondente
        const estoqueItem = estoqueData.find(estoque => estoque.item_codigo === itemCode.trim());

        return estoqueItem ? estoqueItem.id : null;

    } catch (error) {
        console.error("Erro ao buscar estoque:", error);
        return null;
    }
};

// Função para REDUZIR quantidade do estoque (rebaixar)
export const reduceStock = async (
    estoqueId: number,
    quantidade: number
): Promise<string> => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/estoque/${estoqueId}/reduce`, {
            data: {
                quantidade: quantidade
            }
        });

        return response.data.message;

    } catch (error: any) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error || "Erro ao reduzir estoque.");
        }
        throw new Error("Erro de conexão com o servidor.");
    }
};

// Função para EXCLUIR item completamente do sistema
export const deleteItemCompletely = async (
    estoqueId: number,
    operador: string
): Promise<string> => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/estoque/${estoqueId}/delete-complete`, {
            data: {
                operador: operador
            }
        });

        return response.data.message;

    } catch (error: any) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error || "Erro ao excluir item completamente.");
        }
        throw new Error("Erro de conexão com o servidor.");
    }
};

// Função original mantida para compatibilidade (usa a nova rota de reduzir)
export const deleteStock = async (
    estoqueId: number,
    quantidade: number,
    dataOperacao: string
): Promise<void> => {
    try {
        await reduceStock(estoqueId, quantidade);
    } catch (error) {
        throw error;
    }
};

// Deleta um item completamente pelo ID do estoque (função original refatorada)
export async function deleteItemById(estoqueId: number): Promise<string> {
    try {
        // Usa a rota de exclusão completa que remove tanto do estoque quanto da tabela Item
        const response = await axios.delete(`${API_BASE_URL}/estoque/${estoqueId}/delete-complete`, {
            data: {
                operador: "Sistema" // Operador padrão, pode ser ajustado se necessário
            }
        });

        return response.data.message;
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error || "Erro ao deletar item.");
        }
        throw new Error("Erro de conexão com o servidor.");
    }
}

// Versão alternativa que aceita operador personalizado
export async function deleteItemByIdWithOperator(estoqueId: number, operador: string): Promise<string> {
    try {
        const response = await axios.delete(`${API_BASE_URL}/estoque/${estoqueId}/delete-complete`, {
            data: {
                operador: operador
            }
        });

        return response.data.message;
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error || "Erro ao deletar item.");
        }
        throw new Error("Erro de conexão com o servidor.");
    }
}

// Função auxiliar para buscar todos os itens do estoque
export const fetchAllStock = async (): Promise<EstoqueItem[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/estoque`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar todos os estoques:", error);
        throw new Error("Erro ao carregar estoque");
    }
};

// Função auxiliar para buscar um item específico do estoque
export const fetchStockById = async (estoqueId: number): Promise<EstoqueItem | null> => {
    try {
        const allStock = await fetchAllStock();
        return allStock.find(item => item.id === estoqueId) || null;
    } catch (error) {
        console.error("Erro ao buscar item do estoque:", error);
        return null;
    }
};