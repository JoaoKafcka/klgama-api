const express = require('express');
const demandaController = require('../controllers/demandaController');
const {autenticar} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/demandas', autenticar, demandaController.criar);
router.get('/demandas', autenticar, demandaController.listar);

module.exports = router;