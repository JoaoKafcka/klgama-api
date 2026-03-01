const demandaRepository = require('../repositories/demandaRepository');

const criarDemanda = async (dados, idUsuario, idCliente) => {
    const {descricao, dataVencimento} = dados;

    if (!descricao) {
        throw new Error ('A descrição da demanda é obrigatoria.');
    }

    const novaDemanda = await demandaRepository.criarDemanda(descricao, dataVencimento, idUsuario, idCliente);
    return novaDemanda
}

const listarDemandas = async (idUsuario, idCliente, gestor) => {
    if (gestor) {
        return await demandaRepository.listarDemandasPorCliente(idCliente);
    }
    return await demandaRepository.listarDemandasPorUsuario(idUsuario, idCliente);
};

module.exports = {criarDemanda, listarDemandas};