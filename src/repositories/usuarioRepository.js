const db = require('../config/database');

const criarUsuario = async (nome, email, senhaHash, gestor) => {
    const query = `
        INSERT INTO usuarios (nome, email, senha, gestor)
        VALUES ($1, $2, $3, $4)
        RETURNING id, nome, email, ativo, gestor;
    `;
    const values = [nome, email, senhaHash, gestor || false];
    const result = await db.query(query, values);
    return result.rows[0];
};

const buscarUsuarioPorEmail = async (email) => {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
};

module.exports = {criarUsuario, buscarUsuarioPorEmail};