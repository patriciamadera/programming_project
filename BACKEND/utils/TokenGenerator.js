const jwt = require('jsonwebtoken');

function TokenGenerator(usuario) {
  const payload = {
    id: usuario._id || usuario.id, // Maneja _id (MongoDB) o id (PostgreSQL)
    role: usuario.role
  };

  const claveSecreta = process.env.SECRET_KEY;

  if (!claveSecreta) {
    console.error(
      'Error: La variable de entorno SECRET_KEY no está definida.'
    );
    process.exit(1);
  }
  
  const opciones = {
    expiresIn: '8h',
  };

  const token = jwt.sign(payload, claveSecreta, opciones);

  return token;
}

module.exports = TokenGenerator;