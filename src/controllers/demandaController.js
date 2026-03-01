const demandaService = require('../services/demandaService');

const criar = async (req, res) => {
    try {
        const idUsuario = req.usuarioId;
        const idCliente = req.idCliente;

        const novaDemanda = await demandaService.criarDemanda(req.body, idUsuario, idCliente);
        return res.status(201).json(novaDemanda);
    } catch(error) {
        return res.status(400).json({erro: error.message});
    }
};

const listar = async (req, res) => {
    try{
        const idUsuario = req.usuarioId;
        const idCliente = req.idCliente;
        const gestor = req.usuarioGestor;

        const demandas = await demandaService.listarDemandas(idUsuario, idCliente, gestor);
        return res.status(200).json(demandas);
    }catch(error) {
        return res.status(400).json({erro: error.message});
    }
};

module.exports = {criar, listar};