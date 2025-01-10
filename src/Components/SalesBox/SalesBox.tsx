import React, { useState } from "react";

const SalesBox: React.FC = () => {
    const [formData, setFormData] = useState({
        operatorName: "",
        itemCode: "",
        quantity: "",
        price: "",
    });

    const [modalMessage, setModalMessage] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);

    const showModal = (message: string) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    const closeModal = () => setModalVisible(false);

    // Atualiza os dados do formulário
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Gera um arquivo .txt com os dados do formulário
    const generateTxtFile = () => {
        const { operatorName, itemCode, quantity, price } = formData;

        if (!operatorName || !itemCode || !quantity || !price) {
            showModal("Por favor, preencha todos os campos antes de gerar o arquivo.");
            return;
        }

        const fileContent = `Operador: ${operatorName}
Código do Item: ${itemCode}
Quantidade: ${quantity}
Valor: R$ ${price}`;
        const blob = new Blob([fileContent], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "sales_record.txt";
        link.click();

        showModal("Arquivo gerado com sucesso!");
    };

    return (
        <div className="container my-4">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title mb-0">Registro de Venda</h5>
                </div>
                <div className="card-body">
                    <form>
                        {/* Nome do Operador */}
                        <div className="mb-3">
                            <label htmlFor="operatorName" className="form-label">
                                Nome do Operador <i className="bi bi-person-fill ms-2 text-muted"></i>
                            </label>
                            <input
                                type="text"
                                id="operatorName"
                                name="operatorName"
                                className="form-control"
                                placeholder="Ex.: João Silva"
                                value={formData.operatorName}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Código do Item */}
                        <div className="mb-3">
                            <label htmlFor="itemCode" className="form-label">
                                Código do Item <i className="bi bi-upc-scan ms-2 text-muted"></i>
                            </label>
                            <input
                                type="text"
                                id="itemCode"
                                name="itemCode"
                                className="form-control"
                                placeholder="Ex.: 001"
                                value={formData.itemCode}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Quantidade */}
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">
                                Quantidade <i className="bi bi-stack ms-2 text-muted"></i>
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                className="form-control"
                                placeholder="Ex.: 10"
                                value={formData.quantity}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Valor */}
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">
                                Valor (R$) <i className="bi bi-currency-dollar ms-2 text-muted"></i>
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                className="form-control"
                                placeholder="Ex.: 150.00"
                                value={formData.price}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Botões */}
                        <div className="d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    setFormData({ operatorName: "", itemCode: "", quantity: "", price: "" });
                                    showModal("Formulário limpo com sucesso!");
                                }}
                            >
                                Limpar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={generateTxtFile}
                            >
                                Imprimir
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal de Bootstrap */}
            {isModalVisible && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Aviso</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <p>{modalMessage}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={closeModal}>
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

export default SalesBox;
