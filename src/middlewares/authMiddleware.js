const jwt = require('jsonwebtoken');

const autenticar = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: 'Token não fornecido.' });
    }

    const partes = authHeader.split(' ');

    if (partes.length !== 2) {
        return res.status(401).json({ erro: 'Erro de formato do token.' });
    }

    const [esquema, token] = partes;

    if (!/^Bearer$/i.test(esquema)) {
        return res.status(401).json({ erro: 'Token mal formatado.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ erro: 'Token inválido ou expirado.' });
        }

        req.usuarioId = decoded.id;
        req.usuarioGestor = decoded.gestor;
        req.idCliente = decoded.idCliente;
        
        return next();
    });
};

module.exports = { autenticar };