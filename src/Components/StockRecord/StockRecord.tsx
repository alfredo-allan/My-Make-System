import React, { useState } from "react";

const StockRecord: React.FC = () => {
    const [view, setView] = useState<"cards" | "register" | "list">("cards");

    const mockData = [
        { id: 1, code: "001", description: "Cadeira de Escritório", quantity: 10, operator: "João" },
        { id: 2, code: "002", description: "Mesa de Reunião", quantity: 5, operator: "Maria" },
    ];

    return (
        <div className="container my-4">
            {view === "cards" && (
                <div className="row justify-content-center">
                    <div className="col-lg-4 mb-4">
                        <div className="card text-center h-100" onClick={() => setView("register")}>
                            <div className="card-body">
                                <i className="bi bi-plus-circle-fill text-primary" style={{ fontSize: "3rem" }}></i>
                                <h5 className="card-title mt-3">Registrar Estoque</h5>
                                <p className="card-text">Adicione novos itens ao estoque.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4">
                        <div className="card text-center h-100" onClick={() => setView("list")}>
                            <div className="card-body">
                                <i className="bi bi-card-list text-success" style={{ fontSize: "3rem" }}></i>
                                <h5 className="card-title mt-3">Listar Estoque</h5>
                                <p className="card-text">Veja os itens registrados no estoque.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Formulário de Registro */}
            {view === "register" && (
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title mb-0">Registrar Estoque</h5>
                    </div>
                    <div className="card-body">
                        <form>
                            {/* Nome do Operador */}
                            <div className="mb-3">
                                <label htmlFor="operatorName" className="form-label">
                                    Nome do Operador <i className="bi bi-person-fill ms-2 text-muted"></i>
                                </label>
                                <input type="text" id="operatorName" className="form-control" />
                            </div>
                            {/* Código do Item */}
                            <div className="mb-3">
                                <label htmlFor="itemCode" className="form-label">
                                    Código do Item <i className="bi bi-upc-scan ms-2 text-muted"></i>
                                </label>
                                <input type="text" id="itemCode" className="form-control" />
                            </div>
                            {/* Descrição */}
                            <div className="mb-3">
                                <label htmlFor="itemDescription" className="form-label">
                                    Descrição <i className="bi bi-card-text ms-2 text-muted"></i>
                                </label>
                                <textarea id="itemDescription" className="form-control" rows={3}></textarea>
                            </div>
                            {/* Quantidade */}
                            <div className="mb-3">
                                <label htmlFor="itemQuantity" className="form-label">
                                    Quantidade <i className="bi bi-stack ms-2 text-muted"></i>
                                </label>
                                <input type="number" id="itemQuantity" className="form-control" />
                            </div>
                            {/* Botões */}
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-secondary" onClick={() => setView("cards")}>
                                    Voltar
                                </button>
                                <button className="btn btn-primary" type="submit">
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Listagem de Estoque */}
            {view === "list" && (
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title mb-0">Listagem de Estoque</h5>
                    </div>
                    <div className="card-body">
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
                                {mockData.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.code}</td>
                                        <td>{item.description}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.operator}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="btn btn-secondary mt-3" onClick={() => setView("cards")}>
                            Voltar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StockRecord;
