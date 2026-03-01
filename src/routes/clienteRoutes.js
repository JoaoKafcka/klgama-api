const express = require('express');
const clienteController = require('../controllers/clienteController');
const {autenticar} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/clientes', autenticar, clienteController.criar);
router.get('/clientes', autenticar, clienteController.listar);

module.exports = router;