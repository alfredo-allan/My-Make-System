import React, { useState } from "react";
import { createItem } from "./api";

type RegisterItemProps = {
    onBack: () => void;
    onSubmit: (data: { productCode: string; productDescription: string; price: number }) => void;
};

const RegisterItem: React.FC<RegisterItemProps> = ({ onBack, onSubmit }) => {
    const [formData, setFormData] = useState({
        productCode: "",
        productDescription: "",
        price: "0,00",
    });

    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    // Função de formatação para o preço
    const formatPrice = (value: string): string => {
        // Remove qualquer caractere que não seja número
        let numericValue = value.replace(/\D/g, "");

        // Se não houver valor, retorna "0,00"
        if (!numericValue) return "0,00";

        // Garante que o valor tenha pelo menos 3 caracteres para centavos
        if (numericValue.length === 1) {
            numericValue = "00" + numericValue; // Ex: "1" -> "001"
        } else if (numericValue.length === 2) {
            numericValue = "0" + numericValue; // Ex: "12" -> "012"
        }

        // Formata o valor, adicionando a vírgula para centavos
        const integerPart = numericValue.slice(0, -2); // Parte inteira
        const decimalPart = numericValue.slice(-2);   // Centavos

        return `${parseInt(integerPart, 10)},${decimalPart}`;
    };


    // Formatar o valor para enviar à API
    const formatPriceForApi = (value: string): number => {
        return parseFloat(value.replace(",", "."));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === "price") {
            setFormData({ ...formData, [name]: formatPrice(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const formattedPrice = formatPriceForApi(formData.price);

            // Enviar os dados à API
            await createItem({
                codigo: formData.productCode,
                descricao: formData.productDescription,
                valor: formattedPrice,
            });

            setShowModal(true);
            setFormData({ productCode: "", productDescription: "", price: "0,00" });
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro inesperado.");
            }
            setShowErrorModal(true);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title mb-0">Registrar Item</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="productCode" className="form-label">
                            Código do Produto
                        </label>
                        <input
                            type="text"
                            id="productCode"
                            name="productCode"
                            className="form-control"
                            value={formData.productCode}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productDescription" className="form-label">
                            Descrição
                        </label>
                        <input
                            type="text"
                            id="productDescription"
                            name="productDescription"
                            className="form-control"
                            value={formData.productDescription}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                            Valor (R$)
                        </label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            className="form-control"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-secondary" type="button" onClick={onBack}>
                            Voltar
                        </button>
                        <button className="btn btn-primary" type="submit">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal de Sucesso */}
            <div
                className={`modal fade ${showModal ? "show" : ""}`}
                tabIndex={-1}
                aria-hidden={!showModal}
                style={{ display: showModal ? "block" : "none" }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Sucesso</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setShowModal(false)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>Item criado com sucesso!</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => setShowModal(false)}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Erro */}
            <div
                className={`modal fade ${showErrorModal ? "show" : ""}`}
                tabIndex={-1}
                aria-hidden={!showErrorModal}
                style={{ display: showErrorModal ? "block" : "none" }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Erro</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setShowErrorModal(false)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>{error || "Ocorreu um erro inesperado."}</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowErrorModal(false)}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterItem;
