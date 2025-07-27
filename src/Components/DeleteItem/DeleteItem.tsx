import React, { useState } from "react";
import { fetchEstoqueIdByItemCode, deleteItemByIdWithOperator } from "./api";

interface DeleteItemProps {
    onBack: () => void;
}

const DeleteItem: React.FC<DeleteItemProps> = ({ onBack }) => {
    const [productCode, setProductCode] = useState("");
    const [operatorName, setOperatorName] = useState("");
    const [itemId, setItemId] = useState<number | null>(null);
    const [itemFound, setItemFound] = useState(false);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState<"success" | "error">("success");

    const handleProductCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const code = e.target.value;
        setProductCode(code);

        if (code.trim()) {
            const fetchedId = await fetchEstoqueIdByItemCode(code.trim());
            if (fetchedId !== null) {
                setItemId(fetchedId);
                setItemFound(true);
                setError("");
            } else {
                setItemId(null);
                setItemFound(false);
                setError("Item não encontrado.");
            }
        } else {
            setItemId(null);
            setItemFound(false);
            setError("");
        }
    };

    const handleOperatorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOperatorName(e.target.value);
    };

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!itemId) {
            setError("Item inválido.");
            return;
        }

        if (!operatorName.trim()) {
            setError("Nome do operador é obrigatório.");
            return;
        }

        try {
            const message = await deleteItemByIdWithOperator(itemId, operatorName.trim());
            setModalMessage(message);
            setModalType("success");

            // Limpa o formulário após sucesso
            setProductCode("");
            setOperatorName("");
            setItemId(null);
            setItemFound(false);
            setError("");

        } catch (err: any) {
            setModalMessage(err.message);
            setModalType("error");
        }

        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title mb-0">
                    <i className="bi bi-trash3 me-2 text-danger"></i>
                    Deletar Item do Estoque
                </h5>
            </div>
            <div className="card-body">
                <div className="alert alert-warning" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    <strong>Atenção:</strong> Esta operação irá remover o item completamente do sistema.
                    Esta ação não pode ser desfeita!
                </div>

                <div>
                    <div className="mb-3">
                        <label htmlFor="operatorName" className="form-label">
                            Nome do Operador <i className="bi bi-person-fill ms-2 text-muted"></i>
                        </label>
                        <input
                            type="text"
                            id="operatorName"
                            name="operatorName"
                            className="form-control"
                            value={operatorName}
                            onChange={handleOperatorNameChange}
                            placeholder="Digite seu nome"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="productCode" className="form-label">
                            Código do Produto <i className="bi bi-upc-scan ms-2 text-muted"></i>
                        </label>
                        <input
                            type="text"
                            id="productCode"
                            name="productCode"
                            className="form-control"
                            value={productCode}
                            onChange={handleProductCodeChange}
                            placeholder="Digite o código do produto"
                        />
                        <div className={`mt-2 ${itemFound ? "text-success" : "text-danger"}`}>
                            {itemFound ? (
                                <><i className="bi bi-check-circle me-1"></i>Item encontrado!</>
                            ) : (
                                error && <><i className="bi bi-x-circle me-1"></i>{error}</>
                            )}
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={onBack}>
                            <i className="bi bi-arrow-left me-2"></i>
                            Voltar
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            disabled={!itemFound || !operatorName.trim()}
                            onClick={(e) => handleDelete(e as any)}
                        >
                            <i className="bi bi-trash3 me-2"></i>
                            Deletar Item
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {modalType === "success" ? (
                                        <><i className="bi bi-check-circle text-success me-2"></i>Sucesso!</>
                                    ) : (
                                        <><i className="bi bi-x-circle text-danger me-2"></i>Erro!</>
                                    )}
                                </h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
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

export default DeleteItem;