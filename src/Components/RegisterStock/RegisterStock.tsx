import React, { useState } from "react";
import axios from "axios";

interface RegisterStockProps {
    onBack: () => void; // Função para voltar à tela anterior
}

const RegisterStock: React.FC<RegisterStockProps> = ({ onBack }) => {
    const [formData, setFormData] = useState({
        productCode: "",
        quantity: "",
        operatorName: "",
    });

    const [itemFound, setItemFound] = useState(false); // Controle de item encontrado
    const [error, setError] = useState(""); // Para exibir erros
    const [showModal, setShowModal] = useState(false); // Controle de exibição do modal
    const [modalMessage, setModalMessage] = useState(""); // Mensagem do modal
    const [modalType, setModalType] = useState<"success" | "error">("success"); // Tipo de modal (sucesso ou erro)

    // Função para consultar a existência do item
    const checkItemExists = async (itemCode: string) => {
        try {
            const response = await axios.get(` https://supermarketapp25.pythonanywhere.com/items`);
            // Verifica se o código do item está na resposta
            const item = response.data.find((item: any) => item.codigo === itemCode);

            if (item) {
                setItemFound(true); // Item encontrado
                setError(""); // Limpar erro
            } else {
                setItemFound(false); // Item não encontrado
                setError("Item não encontrado.");
            }
        } catch (err) {
            setItemFound(false); // Em caso de erro, não encontramos o item
            setError("Erro ao consultar itens.");
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        if (name === "productCode") {
            checkItemExists(value); // Verifica a existência do item ao digitar o código
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!itemFound) {
            setError("Por favor, insira um código de item válido.");
            return;
        }

        try {
            const response = await axios.post(" https://supermarketapp25.pythonanywhere.com/estoque", {
                operador: formData.operatorName,
                quantidade: formData.quantity,
                item_codigo: formData.productCode,
            });

            if (response.status === 201 || response.status === 200) {
                setModalMessage("Estoque atualizado com sucesso!");
                setModalType("success");
            } else {
                setModalMessage("Erro ao atualizar estoque.");
                setModalType("error");
            }
        } catch (err) {
            setModalMessage("Erro ao atualizar estoque.");
            setModalType("error");
        }

        setShowModal(true); // Exibe o modal após a operação
    };

    const closeModal = () => {
        setShowModal(false); // Fecha o modal
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title mb-0">Registrar Estoque</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="operatorName" className="form-label">
                            Nome do Operador <i className="bi bi-person-fill ms-2 text-muted"></i>
                        </label>
                        <input
                            type="text"
                            id="operatorName"
                            name="operatorName"
                            className="form-control"
                            value={formData.operatorName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productCode" className="form-label">
                            Código do Item <i className="bi bi-upc-scan ms-2 text-muted"></i>
                        </label>
                        <input
                            type="text"
                            id="productCode"
                            name="productCode"
                            className="form-control"
                            value={formData.productCode}
                            onChange={handleInputChange}
                        />
                        {/* Mensagem de status abaixo do campo de código */}
                        <div className={`mt-2 ${itemFound ? 'text-success' : 'text-danger'}`}>
                            {itemFound ? "Item encontrado!" : error}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">
                            Quantidade <i className="bi bi-stack ms-2 text-muted"></i>
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            className="form-control"
                            value={formData.quantity}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-secondary" type="button" onClick={onBack}>
                            Voltar
                        </button>
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={!itemFound} // O botão só é habilitado se o item for encontrado
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal de sucesso ou erro */}
            {showModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block" }}
                    tabIndex={-1}
                    aria-labelledby="modalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalLabel">
                                    {modalType === "success" ? "Sucesso!" : "Erro!"}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={closeModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                {modalMessage}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterStock;
