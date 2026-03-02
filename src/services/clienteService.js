const clienteRepository = require('../repositories/clienteRepository');

const criarCliente = async (dados) => {
    const { nome, ativo } = dados;

    if (!nome) {
        throw new Error('O nome do cliente é obrigatório.');
    }

    const novoCliente = await clienteRepository.criarCliente(nome, ativo);
    return novoCliente;
};

const listarClientes = async () => {
    return await clienteRepository.listarClientes();
};
const atualizarCliente = async (id, dados) => {
    const { nome, ativo } = dados;

    if (!nome) {
        throw new Error('O nome do cliente é obrigatório.');
    }

    const clienteAtualizado = await clienteRepository.atualizarCliente(id, nome, ativo);
    if (!clienteAtualizado) {
        throw new Error('Cliente não encontrado.');
    }
    return clienteAtualizado;
};

module.exports = { criarCliente, listarClientes, atualizarCliente };