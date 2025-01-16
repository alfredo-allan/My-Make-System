import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

const HelpPage: React.FC = () => {
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <h2 className="my-4">Ajuda - Como Funciona o Sistema</h2>
                    <p>Este sistema é dividido em três módulos principais: Estoque, Caixa e Relatórios.</p>

                    <Card className="my-3">
                        <Card.Header>Estoque</Card.Header>
                        <Card.Body>
                            <p><strong>Criar Item:</strong> Registre um novo item no estoque.</p>
                            <p><strong>Atualizar Quantidade:</strong> Altere a quantidade de um item.</p>
                            <p><strong>Baixar Estoque:</strong> Diminua o estoque de um item.</p>
                            <p><strong>Log de Operações:</strong> O operador será registrado a cada alteração.</p>
                        </Card.Body>
                    </Card>

                    <Card className="my-3">
                        <Card.Header>Caixa (PDV)</Card.Header>
                        <Card.Body>
                            <p><strong>Adicionar Item:</strong> Digite o código do item e registre a quantidade.</p>
                            <p><strong>Adicionar mais Itens:</strong> Clique no botão "Adicionar Item" para adicionar mais produtos.</p>
                            <p><strong>Relatório de Vendas:</strong> Visualize os itens vendidos e detalhes da operação.</p>
                        </Card.Body>
                    </Card>

                    <Card className="my-3">
                        <Card.Header>Relatório de Estoque</Card.Header>
                        <Card.Body>
                            <p><strong>Filtragem:</strong> Filtre as alterações por data e código do item.</p>
                            <p><strong>Operações:</strong> Visualize o log de operações, como a quantidade alterada e o operador responsável.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default HelpPage;
