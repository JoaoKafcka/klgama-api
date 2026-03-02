const demandaRepository = require('../repositories/demandaRepository');

const criarDemanda = async (dados, idUsuario, idCliente) => {
    const { descricao, data_vencimento } = dados;

    if (!descricao) {
        throw new Error('A descrição da demanda é obrigatoria.');
    }

    const novaDemanda = await demandaRepository.criarDemanda(descricao, data_vencimento, idUsuario, idCliente);
    return novaDemanda
}

const listarDemandas = async (idUsuario, idCliente, gestor) => {
    if (gestor) {
        return await demandaRepository.listarDemandasPorCliente(idCliente);
    }
    return await demandaRepository.listarDemandasPorUsuario(idUsuario, idCliente);
};
const atualizarDemanda = async (id, dados, idUsuario, idCliente) => {
    const { descricao, data_vencimento } = dados;

    if (!descricao) {
        throw new Error('A descrição da demanda é obrigatória.');
    }

    const demandaAtualizada = await demandaRepository.atualizarDemanda(id, descricao, data_vencimento, idCliente);
    if (!demandaAtualizada) {
        throw new Error('Demanda não encontrada ou não pertence a este cliente/usuário.');
    }
    return demandaAtualizada;
};

module.exports = { criarDemanda, listarDemandas, atualizarDemanda };