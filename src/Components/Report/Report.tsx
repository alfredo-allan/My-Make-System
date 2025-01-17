import React, { useState, useEffect } from "react";
import { fetchLogs } from "./api";

type Log = {
    id: number;
    data_operacao: string;
    estoque_id: number;
    quantidade_alterada: number;
    tipo_operacao: string;
    item_codigo: string;
};

const Report: React.FC = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [filteredLogs, setFilteredLogs] = useState<Log[]>([]);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [itemCode, setItemCode] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadLogs = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchLogs();
                setLogs(data);
                setFilteredLogs(data);
            } catch (err) {
                console.error("Erro ao carregar logs:", err);
                setError("Não foi possível carregar os logs.");
            } finally {
                setLoading(false);
            }
        };

        loadLogs();
    }, []);

    const applyFilters = () => {
        let filtered = logs;

        if (startDate) {
            filtered = filtered.filter(
                (log) => new Date(log.data_operacao) >= new Date(startDate)
            );
        }

        if (endDate) {
            filtered = filtered.filter(
                (log) => new Date(log.data_operacao) <= new Date(endDate)
            );
        }

        if (itemCode.trim() !== "") {
            filtered = filtered.filter((log) =>
                log.item_codigo.toLowerCase().includes(itemCode.toLowerCase())
            );
        }

        setFilteredLogs(filtered);
    };

    const resetFilters = () => {
        setStartDate("");
        setEndDate("");
        setItemCode("");
        setFilteredLogs(logs);
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title mb-0">Relatório de Movimentações</h5>
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
                                <label htmlFor="startDate" className="form-label">
                                    Data Inicial
                                </label>
                                <input
                                    type="date"
                                    id="startDate"
                                    className="form-control"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="endDate" className="form-label">
                                    Data Final
                                </label>
                                <input
                                    type="date"
                                    id="endDate"
                                    className="form-control"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="itemCode" className="form-label">
                                    Código do Item
                                </label>
                                <input
                                    type="text"
                                    id="itemCode"
                                    className="form-control"
                                    placeholder="Digite o código do item"
                                    value={itemCode}
                                    onChange={(e) => setItemCode(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <button
                                className="btn btn-primary me-2"
                                onClick={applyFilters}
                            >
                                Aplicar Filtros
                            </button>
                            <button className="btn btn-secondary" onClick={resetFilters}>
                                Limpar Filtros
                            </button>
                        </div>
                        {filteredLogs.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Data da Operação</th>
                                            <th>Código do Item</th>
                                            <th>Quantidade</th>
                                            <th>Operação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredLogs.map((log) => (
                                            <tr key={log.id}>
                                                <td>{log.id}</td>
                                                <td>{new Date(log.data_operacao).toLocaleString()}</td>
                                                <td>{log.item_codigo}</td>
                                                <td>{log.quantidade_alterada}</td>
                                                <td>
                                                    {log.tipo_operacao === "POST"
                                                        ? "Entrada"
                                                        : log.tipo_operacao === "DELETE"
                                                            ? "Saída"
                                                            : log.tipo_operacao}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-center">Nenhum log encontrado.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Report;
