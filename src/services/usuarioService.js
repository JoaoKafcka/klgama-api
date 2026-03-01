const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioRepository = require('../repositories/usuarioRepository');

const registrarUsuario = async (dados) => {
    const { nome, email, senha, gestor } = dados;

    if (!nome || !email || !senha) {
        throw new Error('Nome, email e senha são obrigatórios.');
    }

    const usuarioExistente = await usuarioRepository.buscarUsuarioPorEmail(email);
    if (usuarioExistente) {
        throw new Error('E-mail já cadastrado.');
    }

    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const novoUsuario = await usuarioRepository.criarUsuario(nome, email, senhaHash, gestor);
    return novoUsuario;
};

const login = async (email, senha, idCliente) => {
    if (!idCliente) {
        throw new Error('O ID do cliente é obrigatório para o login.');
    }

    const usuario = await usuarioRepository.buscarUsuarioPorEmail(email);

    if (!usuario) {
        throw new Error('Usuário ou senha inválidos.');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
        throw new Error('Usuário ou senha inválidos.');
    }

    const token = jwt.sign(
        { id: usuario.id, email: usuario.email, gestor: usuario.gestor, idCliente: idCliente },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );

    return { 
        token, 
        usuario: { 
            id: usuario.id, 
            nome: usuario.nome, 
            email: usuario.email, 
            gestor: usuario.gestor 
        } 
    };
};

module.exports = { registrarUsuario, login };