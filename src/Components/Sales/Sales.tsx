import React, { useState } from "react";

interface Sale {
    id: number;
    description: string;
    amount: number;
    date: string;
}

const Sales: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([
        { id: 1, description: "Venda 1", amount: 150.0, date: "2025-01-08" },
        { id: 2, description: "Venda 2", amount: 300.0, date: "2025-01-08" },
    ]);

    const [expense, setExpense] = useState({ description: "", amount: "", date: "" });
    const [filterDate, setFilterDate] = useState("");

    // Lida com mudanças nos campos de input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setExpense((prev) => ({ ...prev, [name]: value }));
    };

    // Adiciona uma nova despesa à lista
    const addExpense = () => {
        if (!expense.description || !expense.amount || !expense.date) {
            alert("Preencha todos os campos antes de adicionar a despesa.");
            return;
        }

        const newSale: Sale = {
            id: sales.length + 1,
            description: expense.description,
            amount: parseFloat(expense.amount),
            date: expense.date,
        };

        setSales((prevSales) => [...prevSales, newSale]);
        setExpense({ description: "", amount: "", date: "" });
    };

    // Filtra vendas/despesas pela data
    const filteredSales = filterDate
        ? sales.filter((sale) => sale.date === filterDate)
        : sales;

    return (
        <div className="container my-4">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title mb-0">Lista de Vendas e Despesas</h5>
                </div>
                <div className="card-body">
                    {/* Filtro por Data */}
                    <div className="mb-3">
                        <label htmlFor="filterDate" className="form-label">
                            Filtrar por Data <i className="bi bi-calendar ms-2 text-muted"></i>
                        </label>
                        <input
                            type="date"
                            id="filterDate"
                            className="form-control"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                        />
                    </div>

                    {/* Lista de Vendas */}
                    <h6>Registros</h6>
                    <ul className="list-group mb-4">
                        {filteredSales.length > 0 ? (
                            filteredSales.map((sale) => (
                                <li key={sale.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>
                                        <strong>{sale.description}</strong> <br />
                                        Data: {sale.date}
                                    </span>
                                    <span className="badge bg-primary rounded-pill">
                                        R$ {sale.amount.toFixed(2)}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li className="list-group-item">Nenhum registro encontrado para a data selecionada.</li>
                        )}
                    </ul>

                    {/* Adicionar Despesa */}
                    <h6>Adicionar Despesa</h6>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="description" className="form-label">
                                Descrição <i className="bi bi-pencil ms-2 text-muted"></i>
                            </label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                className="form-control"
                                placeholder="Ex.: Compra de material"
                                value={expense.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="amount" className="form-label">
                                Valor (R$) <i className="bi bi-currency-dollar ms-2 text-muted"></i>
                            </label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                className="form-control"
                                placeholder="Ex.: 120.00"
                                value={expense.amount}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="date" className="form-label">
                                Data <i className="bi bi-calendar-date ms-2 text-muted"></i>
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="form-control"
                                value={expense.date}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button className="btn btn-success mt-3" onClick={addExpense}>
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sales;
