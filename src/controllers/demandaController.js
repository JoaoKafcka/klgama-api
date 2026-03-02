const demandaService = require('../services/demandaService');

const criar = async (req, res) => {
    try {
        const idUsuario = req.usuarioId;
        const idCliente = req.idCliente;

        const novaDemanda = await demandaService.criarDemanda(req.body, idUsuario, idCliente);
        return res.status(201).json(novaDemanda);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

const listar = async (req, res) => {
    try {
        const idUsuario = req.usuarioId;
        const idCliente = req.idCliente;
        const gestor = req.usuarioGestor;

        const demandas = await demandaService.listarDemandas(idUsuario, idCliente, gestor);
        return res.status(200).json(demandas);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};
const atualizar = async (req, res) => {
    try {
        const id = req.params.id;
        const idUsuario = req.usuarioId;
        const idCliente = req.idCliente;
        const demandaAtualizada = await demandaService.atualizarDemanda(id, req.body, idUsuario, idCliente);
        return res.status(200).json(demandaAtualizada);
    } catch (error) {
        if (error.message === 'Demanda não encontrada ou não pertence a este cliente/usuário.') {
            return res.status(404).json({ erro: error.message });
        }
        return res.status(400).json({ erro: error.message });
    }
};

module.exports = { criar, listar, atualizar };