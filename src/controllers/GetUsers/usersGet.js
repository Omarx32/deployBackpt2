const { Users, UsersGoogle } = require("../../db");

const usersGet = async (req, res) => {
  try {
    const [users, usersGoogle] = await Promise.all([
      Users.findAll(),
      UsersGoogle.findAll(),
    ]);

    const combinedUsers = users.concat(usersGoogle);

    res.json(combinedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

module.exports = {
  usersGet,
};