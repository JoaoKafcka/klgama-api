const express = require ('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const demandaRoutes = require('./routes/demandaRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api', usuarioRoutes);
app.use('/api', clienteRoutes);
app.use('/api', demandaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})