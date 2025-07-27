import React, { useState } from "react";
import { fetchEstoqueIdByItemCode, deleteStock } from "./api";
import './DowngradesItems.css'
interface DowngradesItensProps {
    onBack: () => void;
}

const DowngradesItens: React.FC<DowngradesItensProps> = ({ onBack }) => {
    const [formData, setFormData] = useState({
        productCode: "",
        quantity: "",
        operatorName: "",
    });

    const [itemId, setItemId] = useState<number | null>(null);
    const [itemFound, setItemFound] = useState(false);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState<"success" | "error">("success");

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        if (name === "productCode") {
            const fetchedId = await fetchEstoqueIdByItemCode(value.trim());
            if (fetchedId !== null) {
                setItemId(fetchedId);
                setItemFound(true);
                setError("");
            } else {
                setItemId(null);
                setItemFound(false);
                setError("Item não encontrado.");
            }
        }
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validações
        if (!itemId) {
            setError("Código do item inválido.");
            return;
        }
        if (!formData.quantity || parseInt(formData.quantity, 10) <= 0) {
            setError("Quantidade deve ser maior que zero.");
            return;
        }

        try {
            const currentDate = new Date().toISOString();

            // Chamada à API para deletar a quantidade no estoque
            await deleteStock(itemId, parseInt(formData.quantity, 10), currentDate);

            // Exibe mensagem de sucesso
            setModalMessage("Estoque atualizado com sucesso!");
            setModalType("success");
        } catch (err) {
            // Exibe mensagem de erro
            setModalMessage("Erro ao atualizar estoque. Verifique os dados e tente novamente.");
            setModalType("error");
        }

        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title mb-0">Rebaixar Estoque</h5>
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
                        <div className={`mt-2 ${itemFound ? "text-success" : "text-danger"}`}>
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
                        <button className="btn btn-primary" type="submit" disabled={!itemFound}>
                            Salvar
                        </button>
                    </div>
                </form>
            </div>

            {showModal && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {modalType === "success" ? "Sucesso!" : "Erro!"}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal}
                                ></button>
                            </div>
                            <div className="modal-body">{modalMessage}</div>
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

export default DowngradesItens;
