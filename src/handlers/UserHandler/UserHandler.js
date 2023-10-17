const { createUser, getAllUsers } = require('../../controllers/Users/Users');

const createUserHandler = async (req, res) => {
  await createUser(req, res);
};

const getUsersHandler= async (req, res)=>{
  try {
    const response= await getAllUsers();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({error:error.message});
  }
}

module.exports = {
  createUserHandler,
  getUsersHandler
};