import React from "react";

interface HeaderProps {
    onNavigate: (view: "PropertyGrid" | "StockRecord" | "SalesBox" | "Sales" | "Report" | "Help") => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a
                    className="navbar-brand"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault(); // Evita recarregamento da página
                        onNavigate("PropertyGrid"); // Navega para a página inicial
                    }}
                >
                    My-Make-System
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate("StockRecord"); // Navega para o componente Estoque
                                }}
                            >
                                Estoque
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate("SalesBox"); // Navegação para Caixa PDV (não implementado ainda)
                                }}
                            >
                                Caixa PDV
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate("Sales"); // Navegação para Caixa (não implementado ainda)
                                }}
                            >
                                Caixa
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate("Report"); // Navegação para Relatórios (não implementado ainda)
                                }}
                            >
                                Relatório
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate("Help"); // Navegação para Ajuda (não implementado ainda)
                                }}
                            >
                                Ajuda
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
