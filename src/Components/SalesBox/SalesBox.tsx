import React, { useState } from "react";
import { getProductDescription, createSale } from "./api";

const SalesBox: React.FC = () => {
    const [operatorName, setOperatorName] = useState("");
    const [items, setItems] = useState<
        Array<{ itemCode: string; quantity: string; description?: string }>
    >([{ itemCode: "", quantity: "", description: "" }]);
    const [modalMessage, setModalMessage] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);

    const showModal = (message: string) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    const closeModal = () => setModalVisible(false);

    // Atualiza o item na lista ao digitar
    const handleItemChange = (index: number, field: string, value: string) => {
        const updatedItems = [...items];
        updatedItems[index][field as keyof typeof updatedItems[0]] = value;
        setItems(updatedItems);

        // Busca a descrição se o campo for itemCode
        if (field === "itemCode" && value) {
            getProductDescription(value)
                .then((description) => {
                    updatedItems[index].description = description;
                    setItems([...updatedItems]);
                })
                .catch(() => {
                    updatedItems[index].description = "Descrição não encontrada";
                    setItems([...updatedItems]);
                });
        }
    };

    // Adiciona um novo item
    const addItem = () => {
        setItems([...items, { itemCode: "", quantity: "", description: "" }]);
    };

    // Remove um item
    const removeItem = (index: number) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    // Submete a venda
    // Submete a venda
    const submitSale = () => {
        if (!operatorName) {
            showModal("Por favor, insira o nome do operador.");
            return;
        }

        // Prepara os dados removendo a descrição
        const formattedItems = items.map((item) => ({
            item_codigo: item.itemCode,
            quantidade: parseInt(item.quantity),
        }));

        // Envia apenas os dados necessários ao backend
        createSale({ operador: operatorName, itens: formattedItems })
            .then(() => {
                showModal("Venda registrada com sucesso!");
                setOperatorName("");
                setItems([{ itemCode: "", quantity: "", description: "" }]);
            })
            .catch(() => {
                showModal("Erro ao registrar a venda. Tente novamente.");
            });
    };


    return (
        <div className="container my-4" style={{ cursor: 'pointer' }}>
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title mb-0">Registro de Venda</h5>
                </div>
                <div className="card-body">
                    <form>
                        {/* Nome do Operador */}
                        <div className="mb-3">
                            <label htmlFor="operatorName" className="form-label">
                                Nome do Operador
                            </label>
                            <input
                                type="text"
                                id="operatorName"
                                className="form-control"
                                placeholder="Ex.: João Silva"
                                value={operatorName}
                                onChange={(e) => setOperatorName(e.target.value)}
                            />
                        </div>

                        {/* Itens */}
                        {items.map((item, index) => (
                            <div key={index} className="mb-3">
                                <label htmlFor={`itemCode-${index}`} className="form-label">
                                    Código do Item
                                </label>
                                <input
                                    type="text"
                                    id={`itemCode-${index}`}
                                    className="form-control mb-2"
                                    placeholder="Ex.: 001"
                                    value={item.itemCode}
                                    onChange={(e) =>
                                        handleItemChange(index, "itemCode", e.target.value)
                                    }
                                />
                                <label htmlFor={`quantity-${index}`} className="form-label">
                                    Quantidade
                                </label>
                                <input
                                    type="number"
                                    id={`quantity-${index}`}
                                    className="form-control mb-2"
                                    placeholder="Ex.: 10"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleItemChange(index, "quantity", e.target.value)
                                    }
                                />
                                <small className="text-muted">{item.description}</small>
                                <button
                                    type="button"
                                    className="btn btn-link text-danger mt-2"
                                    onClick={() => removeItem(index)}
                                    style={{ textDecoration: "none" }}
                                >
                                    <i className="bi bi-trash-fill"></i>
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            className="btn btn-secondary mb-3"
                            style={{ width: '140px' }}  // Corrigido para um objeto JavaScript com a propriedade e valor
                            onClick={addItem}
                        >
                            Adicionar Item
                        </button>


                        {/* Botões */}
                        <div className="d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={submitSale}
                            >
                                Registrar Venda
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
