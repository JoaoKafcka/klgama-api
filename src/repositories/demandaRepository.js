const db = require('../config/database');

const criarDemanda = async (descricao, dataVencimento, idUsuario, idCliente) => {
    const query = `
        INSERT INTO demandas (descricao, data_vencimento, idusuario, idcliente)
        VALUES ($1, $2, $3, $4)
        RETURNING id, descricao, data_cadastro, data_vencimento, idusuario, idcliente
    `;
    const values = [descricao, dataVencimento, idUsuario, idCliente];
    const result = await db.query(query, values);
    return result.rows[0];
};

const listarDemandasPorUsuario = async (idUsuario, idCliente) => {
    const query = 'SELECT * FROM demandas WHERE idusuario = $1 AND idcliente = $2';
    const result = await db.query(query, [idUsuario, idCliente]);
    return result.rows;
};

const listarDemandasPorCliente = async (idCliente) => {
    const query = 'SELECT * FROM demandas WHERE idcliente = $1';
    const result = await db.query(query, [idCliente]);
    return result.rows;
}

module.exports = {criarDemanda, listarDemandasPorCliente, listarDemandasPorUsuario};