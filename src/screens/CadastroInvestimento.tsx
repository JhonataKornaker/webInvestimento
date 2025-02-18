import { useState } from "react";
import { cadastrarInvestimento } from "../service/InvestimentoService";
import { useNavigate } from "react-router-dom";

const CadastroInvestimento = () => {
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("");
    const [valor, setValor] = useState("");
    const [data, setData] = useState("");
    const [erros, setErros] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErros({});

        // Validação dos campos
        const novosErros: Record<string, string> = {};
        if (!nome) novosErros.nome = "Nome é obrigatório";
        if (!tipo) novosErros.tipo = "Tipo é obrigatório";
        if (!valor) novosErros.valor = "Valor é obrigatório";
        if (!data) novosErros.data = "Data é obrigatória";

        if (Object.keys(novosErros).length > 0) {
            setErros(novosErros);
            return;
        }

        const valorNumerico = parseFloat(valor);

        try {
            await cadastrarInvestimento({ nome, tipo, valor: valorNumerico, data });
            alert("Investimento cadastrado com sucesso!");
            setNome("");
            setTipo("");
            setValor("");
            setData("");
            navigate("/");
        } catch (error: any) {
            if (error.response?.status === 400 && error.response.data?.fieldErrors) {
                const formattedErrors = error.response.data.fieldErrors.reduce((acc: Record<string, string>, err: { field: string; defaultMessage: string }) => {
                    acc[err.field] = err.defaultMessage;
                    return acc;
                }, {});
                setErros(formattedErrors);
            } else {
                alert("Erro ao cadastrar investimento");
            }
        }
    };

    return (
        <div>
            <h2>Cadastro de Investimento</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                    {erros.nome && <p style={{ color: "red" }}>{erros.nome}</p>}
                </div>

                <div>
                    <label>Tipo:</label>
                    <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                    {erros.tipo && <p style={{ color: "red" }}>{erros.tipo}</p>}
                </div>

                <div>
                    <label>Valor Investido:</label>
                    <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} />
                    {erros.valor && <p style={{ color: "red" }}>{erros.valor}</p>}
                </div>

                <div>
                    <label>Data do Investimento:</label>
                    <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
                    {erros.data && <p style={{ color: "red" }}>{erros.data}</p>}
                </div>

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default CadastroInvestimento;