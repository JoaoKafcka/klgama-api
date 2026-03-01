const usuarioService = require('../services/usuarioService');

const registrar = async (req, res) => {
    try {
        const novoUsuario = await usuarioService.registrarUsuario(req.body);
        return res.status(201).json(novoUsuario);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

const login = async (req, res) => {
    try {
        const {email, senha, idCliente} = req.body;
        const resultado = await usuarioService.login(email, senha, idCliente);
        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(401).json({ erro: error.message });
    }
};

module.exports = { registrar, login };