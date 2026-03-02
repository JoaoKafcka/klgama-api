# KL Gama API - Configuração Inicial

Esta é a aplicação backend (API Node.js + PostgreSQL) do desafio técnico da KL Gama. Ela gerencia o sistema multi-tenant de clientes, usuários e demandas de forma segura utilizando JWT.

## Como iniciar a API na sua máquina

Siga os três passos abaixo para rodar o backend localmente:

### 1. Instale as dependências
Acesse a pasta do projeto da API pelo terminal e execute:
```bash
npm install
```

### 2. Configure as variáveis de ambiente
Crie um arquivo chamado `.env` na pasta do projeto e defina as variáveis de conexão. Você pode encontrar um modelo destas variáveis no arquivo `.env.example`.

Exemplo de formato para o arquivo `.env`:
```env
DATABASE_URL="Url_do_banco"
PORT=3000
JWT_SECRET="Chave_jwt"
```

### 3. Inicie o Servidor Local
Com as bibliotecas instaladas e o `.env` configurado, inicie a API:
```bash
npm start
```
Aparecerá no console que o servidor está rodando na porta configurada no `.env`.

## Configuração do Banco de Dados (Supabase)

Para inicializar o banco de dados do zero no [Supabase](https://supabase.com/):

1. Clique em **SQL Editor**.
2. Copie todo o conteúdo do arquivo `schema.sql` e cole no editor.
3. Clique no botão **Run** no canto inferior direito para criar todas as tabelas, relações e índices necessários para a API funcionar.
4. Clique em **Connect** na barra superior, copie a sua *URL* e coloque-a na variável `DATABASE_URL` no seu arquivo `.env`.

## Configurando o insomnia para testar a API

Abra o Insomnia e importe o arquivo `insomnia_collection.yaml` que se encontra na pasta do projeto.
