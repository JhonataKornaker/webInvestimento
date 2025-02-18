import { CadastroInvestimento, Investimento } from "../types/Investimento";

const API_URL = "http://localhost:8080/investimentos";

export const buscarInvestimentos = async (): Promise<Investimento[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erro ao buscar investimentos");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const cadastrarInvestimento = async (investimento: CadastroInvestimento): Promise<{ sucesso: boolean; erros?: Record<string, string> }> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(investimento),
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 400 && errorData.fieldErrors) {
                const formattedErrors = errorData.fieldErrors.reduce((acc: Record<string, string>, err: { field: string; defaultMessage: string }) => {
                    acc[err.field] = err.defaultMessage;
                    return acc;
                }, {});
                return { sucesso: false, erros: formattedErrors };
            }
            throw new Error("Erro ao cadastrar investimento");
        }

        return { sucesso: true };
    } catch (error) {
        console.error(error);
        return { sucesso: false };
    }
};

export const excluirInvestimento = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Erro ao excluir investimento");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const atualizarInvestimento = async (id: number, dadosAtualizados: Partial<Investimento>): Promise<Investimento | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosAtualizados),
        });

        if (!response.ok) throw new Error("Erro ao atualizar investimento");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};
