const { UsersGoogle } = require('../../db'); // Asegúrate de importar el modelo

const userGoogle = async (req, res) => {
  try {
    const { email, familyName, givenName, googleId, imageUrl, name } = req.body;
    
    const newUser = await UsersGoogle.create({
      email,
      familyName,
      givenName,
      googleId,
      imageUrl,
      name,
      isBanned: false // Valor predeterminado
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};

module.exports = {
    userGoogle
};
