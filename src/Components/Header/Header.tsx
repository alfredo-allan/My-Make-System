import React from "react";

interface HeaderProps {
    currentView: "PropertyGrid" | "StockRecord" | "SalesBox" | "Sales" | "Report" | "Help";
    onNavigate: (view: "PropertyGrid" | "StockRecord" | "SalesBox" | "Sales" | "Report" | "Help") => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <button
                    className="navbar-brand bg-transparent border-0 text-light"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onNavigate("PropertyGrid")}
                >
                    Leap In Technology ©
                </button>
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
                            <button
                                className={`nav-link bg-transparent border-0 ${currentView === "StockRecord" ? "active" : ""
                                    }`}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: currentView === "StockRecord" ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                                    borderRadius: '4px',
                                    border: currentView === "StockRecord" ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent'
                                }}
                                onClick={() => onNavigate("StockRecord")}
                            >
                                Estoque
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link bg-transparent border-0 ${currentView === "SalesBox" ? "active" : ""
                                    }`}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: currentView === "SalesBox" ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                                    borderRadius: '4px',
                                    border: currentView === "SalesBox" ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent'
                                }}
                                onClick={() => onNavigate("SalesBox")}
                            >
                                Caixa PDV
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link bg-transparent border-0 ${currentView === "Sales" ? "active" : ""
                                    }`}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: currentView === "Sales" ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                                    borderRadius: '4px',
                                    border: currentView === "Sales" ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent'
                                }}
                                onClick={() => onNavigate("Sales")}
                            >
                                Caixa
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link bg-transparent border-0 ${currentView === "Report" ? "active" : ""
                                    }`}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: currentView === "Report" ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                                    borderRadius: '4px',
                                    border: currentView === "Report" ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent'
                                }}
                                onClick={() => onNavigate("Report")}
                            >
                                Relatório
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link bg-transparent border-0 ${currentView === "Help" ? "active" : ""
                                    }`}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: currentView === "Help" ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                                    borderRadius: '4px',
                                    border: currentView === "Help" ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent'
                                }}
                                onClick={() => onNavigate("Help")}
                            >
                                Ajuda
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;