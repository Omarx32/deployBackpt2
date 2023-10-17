const { Users, UsersGoogle } = require("../../db");

const usersAdmin = async (req, res) => {
  const userId = req.params.id;
  const { isBanned } = req.body;

  if (typeof isBanned !== "boolean") {
    return res
      .status(400)
      .json({ message: "El campo 'isBanned' debe ser un valor booleano" });
  }

  try {
    // Buscar al usuario en la base de datos local
    let user = await Users.findByPk(userId);

    if (!user) {
      // Si el usuario no se encuentra en la base de datos local, busca en UsersGoogle
      user = await UsersGoogle.findByPk(userId);

      if (!user) {
        // Si no se encuentra en UsersGoogle, retorna un error
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
    }

    // Actualizar el estado del usuario
    user.isBanned = isBanned;
    await user.save();

    return res.json({
      message: `El usuario ${user.fullName} ha sido ${
        isBanned === "Baneado" ? "baneado" : "desbaneado"
      }.`,
    });
  } catch (error) {
    console.error("Error al banear/desbanear el usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = { usersAdmin };