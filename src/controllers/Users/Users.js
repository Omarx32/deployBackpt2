const { Users, UsersGoogle } = require('../../db'); 

const createUser = async (req, res) => {
    try {
      const newUser = await Users.create(req.body); 
      res.status(201).json(newUser);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError' && error.fields.email) {
        res.status(400).json({ message: 'Este correo electrónico ya está registrado.' });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  };

const getAllUsers= async ()=>{
  const users= await Users.findAll();
  const usersGoogle= await UsersGoogle.findAll();

  const allUsers=[...users, ...usersGoogle];

  return allUsers;

}
  
  module.exports = {
    createUser, getAllUsers
  };