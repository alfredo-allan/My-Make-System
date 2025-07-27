import React, { useState, useEffect } from "react";
import { fetchVendas, Venda } from "./api";

const SalesReport: React.FC = () => {
    const [vendas, setVendas] = useState<Venda[]>([]);
    const [filteredVendas, setFilteredVendas] = useState<Venda[]>([]);
    const [date, setDate] = useState<string>("");
    const [totalValue, setTotalValue] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Função para formatar valores em Real brasileiro
    const formatCurrency = (value: number): string => {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };

    // Função específica para valores que precisam ser divididos por 10
    const formatCurrencyDivided = (value: number): string => {
        const realValue = value / 10;
        return realValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };

    useEffect(() => {
        const fetchAllSales = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchVendas(); // Busca todas as vendas
                setVendas(data); // Atualiza o estado com todas as vendas
            } catch (err) {
                console.error("Erro ao buscar vendas:", err);
                setError("Erro ao carregar vendas.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllSales();
    }, []);

    useEffect(() => {
        if (date) {
            // Filtra as vendas pela data selecionada
            const filtered = vendas.filter((venda) =>
                venda.data_venda.startsWith(date)
            );

            // Atualiza as vendas filtradas e calcula o total
            setFilteredVendas(filtered);
            calculateTotalValue(filtered);
        } else {
            setFilteredVendas([]);
            setTotalValue(0);
        }
    }, [date, vendas]);

    const calculateTotalValue = (filteredVendas: Venda[]) => {
        const total = filteredVendas.reduce((acc, venda) => acc + venda.valor_total, 0);
        setTotalValue(total);
    };

    return (
        <div className="card" style={{ cursor: 'pointer' }}>
            <div className="card-header">
                <h5 className="card-title mb-0">Relatório de Vendas</h5>
            </div>
            <div className="card-body">
                {loading ? (
                    <p className="text-center">Carregando...</p>
                ) : error ? (
                    <p className="text-center text-danger">{error}</p>
                ) : (
                    <>
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <label htmlFor="date" className="form-label">
                                    Data da Venda
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    className="form-control"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>

                        {filteredVendas.length > 0 ? (
                            <>
                                <h4 className="text-success mb-3">
                                    Total de Vendas: {formatCurrencyDivided(totalValue)}
                                </h4>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Descrição</th>
                                                <th>Código do Item</th>
                                                <th>Quantidade</th>
                                                <th>Valor Unitário</th>
                                                <th>Valor Total</th>
                                                <th>Operador</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredVendas.map((venda) =>
                                                venda.itens.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.descricao}</td>
                                                        <td>{item.item_codigo}</td>
                                                        <td>{item.quantidade}</td>
                                                        <td>{formatCurrency(item.valor_unitario)}</td>
                                                        <td className="fw-bold">{formatCurrencyDivided(item.valor_total)}</td>
                                                        <td>{venda.operador}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <p className="text-center">Nenhuma venda encontrada para a data selecionada.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SalesReport;