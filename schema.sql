CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE clientes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  gestor BOOLEAN DEFAULT FALSE
);

CREATE TABLE demandas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  descricao TEXT NOT NULL,
  data_cadastro TIMESTAMP DEFAULT NOW(),
  data_vencimento TIMESTAMP,
  idusuario UUID REFERENCES usuarios(id),
  idcliente UUID REFERENCES clientes(id)
)