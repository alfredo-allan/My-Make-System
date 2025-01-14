import React, { useState, useEffect } from "react";
import { getSalesAndExpenses, closeCashRegister } from "./api";

const Sales: React.FC = () => {
    const [sales, setSales] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [filterDate, setFilterDate] = useState("");
    const [totals, setTotals] = useState({ sales: 0, expenses: 0, profit: 0 });

    // Busca vendas e despesas ao alterar a data
    useEffect(() => {
        if (filterDate) {
            getSalesAndExpenses(filterDate)
                .then(({ sales, expenses }) => {
                    setSales(sales);
                    setExpenses(expenses);

                    // Calcula totais
                    const totalSales = sales.reduce((sum: number, item: any) => sum + item.amount, 0);
                    const totalExpenses = expenses.reduce((sum: number, item: any) => sum + item.amount, 0);
                    setTotals({ sales: totalSales, expenses: totalExpenses, profit: totalSales - totalExpenses });
                })
                .catch((error) => {
                    console.error("Erro ao carregar dados:", error);
                });
        }
    }, [filterDate]);

    // Fecha o caixa
    const handleCloseCashRegister = () => {
        if (!filterDate) {
            alert("Selecione uma data para fechar o caixa.");
            return;
        }

        closeCashRegister({
            date: filterDate,
            totalSales: totals.sales,
            totalExpenses: totals.expenses,
            profit: totals.profit,
        })
            .then(() => alert("Caixa fechado com sucesso!"))
            .catch(() => alert("Erro ao fechar o caixa."));
    };

    return (
        <div className="container my-4">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title mb-0">Fechamento de Caixa</h5>
                </div>
                <div className="card-body">
                    {/* Filtro por Data */}
                    <div className="mb-3">
                        <label htmlFor="filterDate" className="form-label">
                            Filtrar por Data
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
                    <h6>Vendas</h6>
                    <ul className="list-group mb-3">
                        {sales.map((sale: any) => (
                            <li key={sale.id} className="list-group-item d-flex justify-content-between">
                                <span>{sale.description}</span>
                                <span className="badge bg-success">R$ {sale.amount.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Lista de Despesas */}
                    <h6>Despesas</h6>
                    <ul className="list-group mb-3">
                        {expenses.map((expense: any) => (
                            <li key={expense.id} className="list-group-item d-flex justify-content-between">
                                <span>{expense.description}</span>
                                <span className="badge bg-danger">R$ {expense.amount.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Totais */}
                    <div className="mb-3">
                        <p><strong>Total de Vendas:</strong> R$ {totals.sales.toFixed(2)}</p>
                        <p><strong>Total de Despesas:</strong> R$ {totals.expenses.toFixed(2)}</p>
                        <p><strong>Lucro:</strong> R$ {totals.profit.toFixed(2)}</p>
                    </div>

                    {/* Botão para fechar o caixa */}
                    <button className="btn btn-primary" onClick={handleCloseCashRegister}>
                        Fechar Caixa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sales;
