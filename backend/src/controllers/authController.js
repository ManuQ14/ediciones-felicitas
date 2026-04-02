const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { usuario, password } = req.body;

  const validUser = process.env.ADMIN_USER || 'admin';
  const validPass = process.env.ADMIN_PASSWORD || 'admin123';

  if (usuario !== validUser || password !== validPass) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  const token = jwt.sign(
    { usuario },
    process.env.JWT_SECRET || 'ef-secret-dev',
    { expiresIn: '8h' }
  );

  res.json({ token, usuario });
};

module.exports = { login };
