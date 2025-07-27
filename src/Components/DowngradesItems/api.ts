// Função para remover quantidade do estoque
export const deleteStock = async (
  estoqueId: number,
  quantidade: number,
  dataOperacao: string
): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:5000/estoque/${estoqueId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantidade: quantidade
      })
    });

    // Verifica se a resposta não está ok
    if (!response.ok) {
      let errorMessage = `Erro HTTP: ${response.status}`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (parseError) {
        // Se não conseguir fazer parse do JSON de erro, usa a mensagem padrão
        console.error('Erro ao fazer parse da resposta de erro:', parseError);
      }

      throw new Error(errorMessage);
    }

    // Processa a resposta de sucesso
    try {
      const result = await response.json();
      console.log('Estoque atualizado:', result.message);
    } catch (parseError) {
      // Se não conseguir fazer parse da resposta de sucesso, não é crítico
      console.warn('Resposta de sucesso não contém JSON válido:', parseError);
    }

  } catch (error) {
    console.error('Erro ao deletar estoque:', error);
    throw error; // Re-throw para que o componente possa tratar o erro
  }
};

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

// Função para buscar ID do estoque por código do item
export const fetchEstoqueIdByItemCode = async (itemCode: string): Promise<number | null> => {
  try {
    // Busca todos os registros de estoque
    const response = await fetch('http://localhost:5000/estoque/');

    if (!response.ok) {
      console.error('Resposta HTTP não ok:', response.status, response.statusText);
      return null;
    }

    // Verifica se a resposta tem conteúdo
    const responseText = await response.text();
    if (!responseText.trim()) {
      console.error('Resposta vazia da API');
      return null;
    }

    // Tenta fazer o parse do JSON
    let estoqueData: EstoqueItem[];
    try {
      estoqueData = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Erro ao fazer parse do JSON:', parseError);
      console.error('Resposta recebida:', responseText);
      return null;
    }

    // Verifica se é um array
    if (!Array.isArray(estoqueData)) {
      console.error('Resposta não é um array:', estoqueData);
      return null;
    }

    // Procura o estoque que tem o item_codigo correspondente
    const estoqueItem = estoqueData.find(estoque => estoque.item_codigo === itemCode.trim());

    return estoqueItem ? estoqueItem.id : null;

  } catch (error) {
    console.error('Erro ao buscar item:', error);
    return null;
  }
};