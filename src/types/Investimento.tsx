// src/types/Investment.ts
export interface Investimento {
    id: number;
    nome: string;
    tipo: string;
    valor: number;
    data: string;
}

export interface CadastroInvestimento {
    nome: string;
    tipo: string;
    valor: number;
    data: string;
}