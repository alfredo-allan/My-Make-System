import React, { useState, useEffect } from "react";
import { fetchAllStockItems } from "./api";

type StockItem = {
    id: number;
    item: {
        codigo: string;
        descricao: string;
    };
    quantidade: number;
    operador: string;
    data_operacao: string;
};

type StockListProps = {
    onBack: () => void;
};

const StockList: React.FC<StockListProps> = ({ onBack }) => {
    const [stockItems, setStockItems] = useState<StockItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<StockItem[]>([]);
    const [filterCode, setFilterCode] = useState("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadStockItems = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchAllStockItems();
                console.log("Dados recebidos da API:", data);
                const formatted = data.map((item: any) => ({
                    id: item.id,
                    item: {
                        codigo: item.item_codigo,
                        descricao: item.item_descricao,
                    },
                    quantidade: item.quantidade,
                    operador: item.operador,
                    data_operacao: item.created_at,
                }));

                setStockItems(formatted);
                setFilteredItems(formatted);
            } catch (err) {
                console.error("Erro ao carregar itens do estoque:", err);
                setError("Não foi possível carregar os itens do estoque.");
            } finally {
                setLoading(false);
            }
        };

        loadStockItems();
    }, []);

    useEffect(() => {
        if (filterCode.trim() === "") {
            setFilteredItems(stockItems);
        } else {
            const filtered = stockItems.filter((item) =>
                item.item.codigo.toLowerCase().includes(filterCode.toLowerCase())
            );
            setFilteredItems(filtered);
        }
    }, [filterCode, stockItems]);

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title mb-0">Listagem de Estoque</h5>
            </div>
            <div className="card-body">
                {loading ? (
                    <p className="text-center">Carregando...</p>
                ) : error ? (
                    <p className="text-center text-danger">{error}</p>
                ) : (
                    <>
                        <div className="mb-3">
                            <label htmlFor="filterCode" className="form-label">
                                Filtrar por Código
                            </label>
                            <input
                                type="text"
                                id="filterCode"
                                className="form-control"
                                placeholder="Digite o código do item"
                                value={filterCode}
                                onChange={(e) => setFilterCode(e.target.value)}
                            />
                        </div>
                        {filteredItems.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Descrição</th>
                                            <th>Quantidade</th>
                                            <th>Operador</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredItems.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.item?.codigo || "N/A"}</td>
                                                <td>{item.item?.descricao || "Descrição indisponível"}</td>
                                                <td>{item.quantidade ?? 0}</td>
                                                <td>{item.operador || "N/A"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-center">Nenhum item encontrado.</p>
                        )}
                    </>
                )}
                <button className="btn btn-secondary mt-3" onClick={onBack}>
                    Voltar
                </button>
            </div>
        </div>
    );
};

export default StockList;
