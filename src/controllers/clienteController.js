const clienteService = require('../services/clienteService');

const criar = async (req, res) => {
    try {
        const novoCliente = await clienteService.criarCliente(req.body);
        return res.status(201).json(novoCliente);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

const listar = async (req, res) => {
    try {
        const clientes = await clienteService.listarClientes(req.body);
        return res.status(200).json(clientes);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

const atualizar = async (req, res) => {
    try {
        const id = req.params.id;
        const clienteAtualizado = await clienteService.atualizarCliente(id, req.body);
        return res.status(200).json(clienteAtualizado);
    } catch (error) {
        if (error.message === 'Cliente não encontrado.') return res.status(404).json({ erro: error.message });
        return res.status(400).json({ erro: error.message });
    }
};

module.exports = { criar, listar, atualizar };