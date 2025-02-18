import React, { useState } from "react";
import { atualizarInvestimento } from "../service/InvestimentoService";

type ModalEdicaoProps = {
    investimento: any;
    fecharModal: () => void;
};

const ModalEdicao = ({ investimento, fecharModal }: ModalEdicaoProps) => {
    const [dados, setDados] = useState(investimento);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDados({ ...dados, [e.target.name]: e.target.value });
    };

    const salvarEdicao = async () => {
        await atualizarInvestimento(investimento.id, dados);
        fecharModal();
    };

    return (
        <div style={modalOverlay}>
            <div style={modalContent}>
                <h2 style={modalTitle}>Editar Investimento</h2>
                <div style={inputGroup}>
                    <input
                        type="text"
                        name="nome"
                        value={dados.nome}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="Nome"
                    />
                    <input
                        type="text"
                        name="tipo"
                        value={dados.tipo}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="Tipo"
                    />
                    <input
                        type="date"
                        name="data"
                        value={dados.data}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                    <input
                        type="number"
                        name="valor"
                        value={dados.valor}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="Valor"
                    />
                </div>
                <div style={buttonGroup}>
                    <button onClick={salvarEdicao} style={buttonStyle}>
                        Salvar
                    </button>
                    <button
                        onClick={fecharModal}
                        style={{ ...buttonStyle, backgroundColor: "red", color: "white" }}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

// Estilos
const modalOverlay: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const modalContent: React.CSSProperties = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "300px",
    textAlign: "center",
};

const modalTitle: React.CSSProperties = {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
};

const inputGroup: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
};

const inputStyle: React.CSSProperties = {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
};

const buttonGroup: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
};

const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    flex: 1,
};

export default ModalEdicao;