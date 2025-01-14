import React, { useState } from "react";
import RegisterStock from "../RegisterStock/RegisterStock";
import RegisterItem from "../RegisterItem/RegisterItem";
import StockList from "../StockList/StockList";
import DowngradesItems from "../DowngradesItems/DowngradesItems"; // Import do novo componente

const StockRecord: React.FC = () => {
    const [view, setView] = useState<"cards" | "register" | "list" | "registerItem" | "downgrades">("cards");

    const handleItemSubmit = (data: { productCode: string; productDescription: string; price: number }) => {
        console.log("Dados enviados:", data);
        setView("cards"); // Voltar para os cards após salvar
    };

    return (
        <div className="container my-4">
            {/* Cards de Ações */}
            {view === "cards" && (
                <div className="row justify-content-center">
                    <div className="col-lg-4 mb-4">
                        <div className="card text-center h-100" onClick={() => setView("register")}>
                            <div className="card-body">
                                <i className="bi bi-plus-circle-fill text-primary" style={{ fontSize: "3rem" }}></i>
                                <h5 className="card-title mt-3">Registrar Estoque</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4">
                        <div className="card text-center h-100" onClick={() => setView("list")}>
                            <div className="card-body">
                                <i className="bi bi-card-list text-success" style={{ fontSize: "3rem" }}></i>
                                <h5 className="card-title mt-3">Listar Estoque</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4">
                        <div className="card text-center h-100" onClick={() => setView("registerItem")}>
                            <div className="card-body">
                                <i className="bi bi-box-seam text-warning" style={{ fontSize: "3rem" }}></i>
                                <h5 className="card-title mt-3">Registrar Item</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4">
                        <div className="card text-center h-100" onClick={() => setView("downgrades")}>
                            <div className="card-body">
                                <i className="bi bi-arrow-down-circle text-danger" style={{ fontSize: "3rem" }}></i>
                                <h5 className="card-title mt-3">Rebaixar Estoque</h5>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Renderização Condicional dos Componentes */}
            {view === "register" && <RegisterStock onBack={() => setView("cards")} />}
            {view === "list" && <StockList onBack={() => setView("cards")} />}
            {view === "registerItem" && (
                <RegisterItem onBack={() => setView("cards")} onSubmit={handleItemSubmit} />
            )}
            {view === "downgrades" && <DowngradesItems onBack={() => setView("cards")} />}
        </div>
    );
};

export default StockRecord;
