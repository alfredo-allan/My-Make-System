import React, { useState, useEffect } from "react";
import { fetchLogs, deleteLog } from "./api";

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
    const [deletingId, setDeletingId] = useState<number | null>(null);

    // Estados para os modais
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [logToDelete, setLogToDelete] = useState<Log | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

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

    const handleDeleteClick = (log: Log) => {
        setLogToDelete(log);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!logToDelete) return;

        setDeletingId(logToDelete.id);
        setShowDeleteModal(false);

        try {
            await deleteLog(logToDelete.id);

            // Remove o log da lista local
            const updatedLogs = logs.filter(log => log.id !== logToDelete.id);
            const updatedFilteredLogs = filteredLogs.filter(log => log.id !== logToDelete.id);

            setLogs(updatedLogs);
            setFilteredLogs(updatedFilteredLogs);

            setShowSuccessModal(true);

        } catch (err) {
            console.error("Erro ao excluir log:", err);
            setErrorMessage("Erro ao excluir log. Tente novamente.");
            setShowErrorModal(true);
        } finally {
            setDeletingId(null);
            setLogToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setLogToDelete(null);
    };

    return (
        <>
            <div className="card" style={{ cursor: 'pointer' }}>
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
                                                <th>Ações</th>
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
                                                    <td>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleDeleteClick(log)}
                                                            disabled={deletingId === log.id}
                                                            title="Excluir log"
                                                        >
                                                            {deletingId === log.id ? (
                                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            ) : (
                                                                <i className="bi bi-trash"></i>
                                                            )}
                                                        </button>
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

            {/* Modal de Confirmação de Exclusão */}
            {showDeleteModal && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className="bi bi-exclamation-triangle text-warning me-2"></i>
                                    Confirmar Exclusão
                                </h5>
                                <button type="button" className="btn-close" onClick={cancelDelete}></button>
                            </div>
                            <div className="modal-body">
                                <p>Tem certeza que deseja excluir este log?</p>
                                {logToDelete && (
                                    <div className="alert alert-light">
                                        <strong>ID:</strong> {logToDelete.id}<br />
                                        <strong>Item:</strong> {logToDelete.item_codigo}<br />
                                        <strong>Operação:</strong> {logToDelete.tipo_operacao}<br />
                                        <strong>Quantidade:</strong> {logToDelete.quantidade_alterada}
                                    </div>
                                )}
                                <div className="alert alert-warning">
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    <strong>Atenção:</strong> Esta ação não pode ser desfeita!
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                                    <i className="bi bi-trash me-2"></i>
                                    Sim, Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Sucesso */}
            {showSuccessModal && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className="bi bi-check-circle text-success me-2"></i>
                                    Sucesso
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setShowSuccessModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="alert alert-success">
                                    <i className="bi bi-check-circle me-2"></i>
                                    Log excluído com sucesso!
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={() => setShowSuccessModal(false)}>
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Erro */}
            {showErrorModal && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className="bi bi-x-circle text-danger me-2"></i>
                                    Erro
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setShowErrorModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="alert alert-danger">
                                    <i className="bi bi-x-circle me-2"></i>
                                    {errorMessage}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={() => setShowErrorModal(false)}>
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Report;