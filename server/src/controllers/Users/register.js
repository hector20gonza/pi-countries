const bcrypt = require('bcrypt');
const { User } = require('../../db');

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Hash de la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear un nuevo usuario
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = registerUser;
