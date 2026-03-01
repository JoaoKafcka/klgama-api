const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

router.post('/usuarios', usuarioController.registrar);
router.post('/login', usuarioController.login);

module.exports = router;