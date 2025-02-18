import React from "react";

interface ModalConfirmacaoProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ModalConfirmacao: React.FC<ModalConfirmacaoProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
            textAlign: "center",
            minWidth: "300px"
        }}>
            <h2 style={{ color: "black" }}>Confirmar Exclusão</h2>
            <p style={{ color: "black" }}>Tem certeza que deseja excluir este investimento?</p>

            <button onClick={onConfirm} style={{ marginRight: "10px", backgroundColor: "red", color: "white", padding: "5px 10px" }}>
                Confirmar
            </button>
            <button onClick={onClose} style={{ backgroundColor: "gray", color: "white", padding: "5px 10px" }}>
                Cancelar
            </button>
        </div>
    );
};

export default ModalConfirmacao;
