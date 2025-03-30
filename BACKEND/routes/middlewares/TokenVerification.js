const jwt = require('jsonwebtoken');
const BlacklistToken = require('../../models/BlackListedToken');

async function TokenVerification(req, res, next) {
    const authHeader = req.header('Authorization');
    console.log("Encabezado Authorization:", authHeader); // Log del encabezado

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Acceso denegado, token no proporcionado o formato incorrecto' });
    }

    const token = authHeader.split(' ')[1];
    console.log("Token extraído:", token); // Log del token

    try {
        const claveSecreta = process.env.SECRET_KEY;
        console.log("Clave secreta:", claveSecreta); // Log de la clave secreta

        if (!claveSecreta) {
            console.error('Error: La variable de entorno SECRET_KEY no está definida.');
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        // Verificar si el token está en la lista negra
        const blacklistToken = await BlacklistToken.findOne({ token });
        console.log("Token en lista negra:", blacklistToken); // Log de la lista negra

        if (blacklistToken) {
            return res.status(403).json({ error: 'Token inválido' });
        }

        const decoded = jwt.verify(token, claveSecreta);
        console.log("Token decodificado:", decoded); // Log del token decodificado

        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error en verificación de token:", error); // Log del error
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(403).json({ error: 'Token expirado' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ error: 'Token inválido' });
        } else {
            return res.status(500).json({ error: 'Error de autenticación' });
        }
    }
}

module.exports = TokenVerification;