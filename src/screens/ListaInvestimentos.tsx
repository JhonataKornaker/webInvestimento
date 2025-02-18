import { useEffect, useState } from "react";
import { buscarInvestimentos, excluirInvestimento } from "../service/InvestimentoService";
import ModalEdicao from "../components/ModalEdicao";
import { Investimento } from "../types/Investimento";
import ModalConfirmacao from "../components/ModalConfirmacao";
import { useNavigate } from "react-router-dom";

const ListaInvestimentos = () => {
    const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
    const [investimentoSelecionado, setInvestimentoSelecionado] = useState<Investimento | null>(null);
    const [investimentoParaExcluir, setInvestimentoParaExcluir] = useState<Investimento | null>(null);
    const [mostrarModalEdicao, setMostrarModalEdicao] = useState(false);
    const [mostrarModalConfirmacao, setMostrarModalConfirmacao] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        carregarInvestimentos();
    }, []);

    const carregarInvestimentos = async () => {
        setLoading(true);
        try {
            const data = await buscarInvestimentos();
            setInvestimentos(data);
        } catch (error) {
            console.error("Erro ao carregar investimentos:", error);
        } finally {
            setLoading(false);
        }
    };

    const abrirModalEdicao = (investimento: Investimento) => {
        setInvestimentoSelecionado(investimento);
        setMostrarModalEdicao(true);
    };


    const fecharModalEdicao = () => {
        setMostrarModalEdicao(false);
        setInvestimentoSelecionado(null);
        carregarInvestimentos();
    };

    const abrirModalConfirmacao = (investimento: Investimento) => {
        setInvestimentoParaExcluir(investimento);
        setMostrarModalConfirmacao(true);
    };

    const fecharModalConfirmacao = () => {
        setMostrarModalConfirmacao(false);
        setInvestimentoParaExcluir(null);
    };

    const confirmarExclusao = async () => {
        if (investimentoParaExcluir) {
            const sucesso = await excluirInvestimento(investimentoParaExcluir.id);
            if (sucesso) {
                setInvestimentos(investimentos.filter(item => item.id !== investimentoParaExcluir.id));
            }
            fecharModalConfirmacao();
        }
    };

    return (
        <>
            <h1>Controle de Investimento</h1>

            {loading ? (
                <p>Carregando...</p>
            ) : investimentos.length === 0 ? (
                <p>Lista vazia</p>
            ) : (
                investimentos.map((investimento) => (
                    <div key={investimento.id} style={{
                        width: 600,
                        border: "1px solid white",
                        margin: "0 auto",
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "5px"
                    }}>
                        <p>Nome: {investimento.nome}</p>
                        <p>Tipo: {investimento.tipo}</p>
                        <p>Data: {investimento.data}</p>
                        <p>Valor: {investimento.valor}</p>

                        <button onClick={() => abrirModalEdicao(investimento)}>Editar</button>
                        <button onClick={() => abrirModalConfirmacao(investimento)} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>
                            Excluir
                        </button>
                    </div>
                ))
            )}

            {mostrarModalEdicao && (
                <ModalEdicao investimento={investimentoSelecionado} fecharModal={fecharModalEdicao} />
            )}

            <ModalConfirmacao
                isOpen={mostrarModalConfirmacao}
                onClose={fecharModalConfirmacao}
                onConfirm={confirmarExclusao}
            />
            <button onClick={() => navigate("/cadastro")}>Cadastrar Investimento</button>
        </>
    );
};

export default ListaInvestimentos;