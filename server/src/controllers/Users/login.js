const bcrypt = require('bcrypt');
const { User } = require('../../db');

const loggin = async (req, res) => {
  try {
    const { email, password } = req.query;

    if (!email || !password) {
      return res.status(400).json({ error: 'Data missing at login' });
    }

    const userFound = await User.findOne({ where: { email } });

    if (!userFound) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, userFound.password);

    if (!isPasswordValid) {
      return res.status(403).json({ error: 'Wrong password!' });
    }

    res.status(200).json({ access: true, user: userFound });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = loggin;
