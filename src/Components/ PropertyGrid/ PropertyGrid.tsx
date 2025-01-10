import React from "react";
import stockIcon from "../../Assets/Img/stock.png";
import posIcon from "../../Assets/Img/point-of-sale.png";
import salesIcon from "../../Assets/Img/sales.png";
import reportIcon from "../../Assets/Img/report.png";

interface PropertyGridProps {
    onNavigate: (view: "StockRecord" | "SalesBox" | "Sales" | "Report") => void;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ onNavigate }) => {
    const cards = [
        {
            id: 1,
            image: stockIcon,
            title: "Estoque",
            description: "Gerencie seu estoque de forma eficiente.",
            view: "StockRecord",
        },
        {
            id: 2,
            image: posIcon,
            title: "Caixa PDV",
            description: "Controle suas vendas e pagamentos. Acesso Gerenciado.",
            view: "SalesBox",
        },
        {
            id: 3,
            image: salesIcon,
            title: "Caixa",
            description: "Monitoramento detalhado do fluxo de caixa.",
            view: "Sales",
        },
        {
            id: 4,
            image: reportIcon,
            title: "Relatório",
            description: "Relatórios precisos para análise do negócio.",
            view: "Report",
        },
    ];

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Funcionalidades</h2>
            <div className="row">
                {cards.map((card) => (
                    <div className="col-lg-3 mb-4" key={card.id}>
                        <div className="card h-100">
                            <img src={card.image} className="card-img-top" alt={card.title} />
                            <div className="card-body text-center">
                                <h5 className="card-title">{card.title}</h5>
                                <p className="card-text">{card.description}</p>
                                {card.view && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => onNavigate(card.view as "StockRecord" | "SalesBox" | "Sales" | "Report")}
                                    >
                                        Acessar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyGrid;
