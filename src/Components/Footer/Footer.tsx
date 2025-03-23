import React from "react";

interface FooterProps {
    onNavigate: (view: "PropertyGrid" | "StockRecord" | "SalesBox" | "Sales" | "Report" | "Help") => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="bg-dark text-white py-4 mt-auto">
            <div className="container">
                <div className="row">
                    {/* Coluna 1 */}
                    <div className="col-md-4 mb-3">
                        <h5>Sobre Nós</h5>
                        <p>
                            Unimos criatividade e tecnologia para transformar ideias em soluções que inspiram e impulsionam negócios. Somos uma equipe apaixonada por design gráfico e desenvolvimento de software, dedicada a criar experiências digitais que encantam e entregam resultados excepcionais.                        </p>
                    </div>
                    {/* Coluna 2 */}
                    <div className="col-md-4 mb-3">
                        <h5>Links Rápidos</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a
                                    href="#"
                                    className="text-white text-decoration-none"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onNavigate("StockRecord"); // Navega para o componente Estoque
                                    }}
                                >
                                    Estoque
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-white text-decoration-none"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onNavigate("SalesBox"); // Navegação para Caixa PDV
                                    }}
                                >
                                    Caixa PDV
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-white text-decoration-none"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onNavigate("Sales"); // Navegação para Caixa
                                    }}
                                >
                                    Caixa
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-white text-decoration-none"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onNavigate("Report"); // Navegação para Relatórios
                                    }}
                                >
                                    Relatório
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-white text-decoration-none"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onNavigate("Help"); // Navegação para Ajuda
                                    }}
                                >
                                    Ajuda
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Coluna 3 */}
                    <div className="col-md-4 mb-3">
                        <h5>Contato</h5>
                        <p>
                            <i className="bi bi-geo-alt-fill"></i> Rua das Crianças, N°34 - Heliópolis, São Paulo - SP
                        </p>
                        <p>
                            <i className="bi bi-telephone-fill"></i> (11) 99410 2660
                        </p>
                        <p>
                            <i className="bi bi-envelope-fill"></i> example@email.com
                        </p>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <p className="mb-0">
                        &copy; {new Date().getFullYear()} Leap In Technology. Todos os direitos reservados
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
