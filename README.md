# Web de Gerenciamento de Investimentos

Esta é o front end em React Typescript para gerenciar investimentos. Ela permite cadastrar, listar, atualizar e excluir investimentos, além de realizar validações para garantir a integridade dos dados.

## Funcionalidades

- **Cadastro de Investimentos:**
    - Nome do investimento (ex.: Fundo X, Ação Y).
    - Tipo de investimento (ex.: Ação, Fundo, Título).
    - Valor investido.
    - Data do investimento.

- **Listagem de Investimentos:**
    - Retorna todos os investimentos cadastrados.

- **Atualização de Investimentos:**
    - Permite editar os dados de um investimento específico.

- **Exclusão de Investimentos:**
    - Remove um investimento do sistema.

- **Validações:**
    - O valor investido deve ser maior que 0.
    - A data do investimento não pode estar no futuro.

## Tecnologias Utilizadas

- **React** Framework para desenvolvimento de aplicações Java.
- **TypeScript:** Banco de dados relacional para armazenamento dos dados.

## Configuração

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/JhonataKornaker/webInvestimento.git
   cd webInvestimento
   
## Executando a Aplicação

1. **Compile e execute o projeto**

    Na raiz do projeto, execute:

    ```bash
   npm run dev
   
2. **Acesse o Swagger para testar a API**

    ```bash
   http://localhost:5173/