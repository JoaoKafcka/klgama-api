const db = require('../config/database');

const criarCliente = async (nome, ativo) => {
    const query = `
        INSERT INTO clientes (nome, ativo)
        VALUES ($1, $2)
        RETURNING id, nome, ativo;
        `;
    const values = [nome, ativo !== undefined ? ativo : true];
    const result = await db.query(query, values);
    return result.rows[0];
};

const listarClientes = async () => {
    const query = 'SELECT * FROM clientes';
    const result = await db.query(query);
    return result.rows;
};
const atualizarCliente = async (id, nome, ativo) => {
    const query = `
        UPDATE clientes 
        SET nome = $1, ativo = $2
        WHERE id = $3
        RETURNING id, nome, ativo;
    `;
    const values = [nome, ativo !== undefined ? ativo : true, id];
    const result = await db.query(query, values);
    return result.rows[0];
};

module.exports = { criarCliente, listarClientes, atualizarCliente };