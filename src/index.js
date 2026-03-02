const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const demandaRoutes = require('./routes/demandaRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', usuarioRoutes);
app.use('/api', clienteRoutes);
app.use('/api', demandaRoutes);

const seedingService = require('./services/seedingService');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await seedingService.checkAndSeed();

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
};

startServer();