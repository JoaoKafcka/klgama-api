const db = require('../config/database');
const readline = require('readline');
const clienteService = require('./clienteService');
const usuarioService = require('./usuarioService');

const askQuestion = (rl, question) => {
    return new Promise(resolve => {
        rl.question(question, answer => resolve(answer));
    });
};

const checkAndSeed = async () => {
    try {
        const clientsResult = await db.query('SELECT COUNT(*) FROM clientes');
        const usersResult = await db.query('SELECT COUNT(*) FROM usuarios');

        const clientsCount = parseInt(clientsResult.rows[0].count, 10);
        const usersCount = parseInt(usersResult.rows[0].count, 10);

        if (clientsCount === 0 || usersCount === 0) {
            console.log('Nenhum cliente ou usuário encontrado.');
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            const answer = await askQuestion(rl, 'Deseja adicionar um cliente e usuário inicial de admin? (s/n): ');
            if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'sim') {
                const clienteNome = await askQuestion(rl, 'Nome do cliente inicial: ');
                const adminNome = await askQuestion(rl, 'Nome do usuário admin: ');
                const adminEmail = await askQuestion(rl, 'E-mail do administrador: ');
                const adminSenha = await askQuestion(rl, 'Senha do administrador: ');

                console.log('\nCriando cliente...');
                const cliente = await clienteService.criarCliente({ nome: clienteNome, ativo: true });
                console.log(`Cliente "${cliente.nome}" criado com sucesso!`);

                console.log('Criando usuário admin...');
                const usuario = await usuarioService.registrarUsuario({
                    nome: adminNome,
                    email: adminEmail,
                    senha: adminSenha,
                    gestor: true
                });
                console.log(`Usuário admin "${usuario.nome}" criado com sucesso!`);

                console.log('\nSeeding concluído com sucesso!');
            } else {
                console.log('Seeding ignorado pelo usuário.');
            }

            rl.close();
            console.log('Continuando a inicialização da API...\n');
        }
    } catch (error) {
        console.error('Erro durante o processo de seeding:', error.message);
    }
};

module.exports = { checkAndSeed };
