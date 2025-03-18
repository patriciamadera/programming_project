const jwt = require('jsonwebtoken');

async function TokenVerification(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acceso denegado, token no proporcionado o formato incorrecto' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const claveSecreta = process.env.SECRET_KEY;

    if (!claveSecreta) {
      console.error('Error: La variable de entorno SECRET_KEY no está definida.');
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    // Verificar si el token está en la lista negra
    const blacklistToken = await BlacklistToken.findOne({ token });
    if (blacklistToken) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    const decoded = jwt.verify(token, claveSecreta);

    req.user = decoded;
    next();
  } catch (error) {
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