const express = require("express");
const {
  createUserHandler,
  getUsersHandler,
} = require("../../handlers/UserHandler/UserHandler");
const { loginUsers } = require("../../controllers/Users/LoginUsers");
const { userGoogle } = require("../../controllers/Users/loginUsersGoogle");
const { usersGet } = require("../../controllers/GetUsers/usersGet");
const { usersAdmin } = require("../../controllers/Users/usersAdmin");

const router = express.Router();

router.post("/create", createUserHandler);
router.post("/login", loginUsers);
router.post("/googleLogin", userGoogle);
router.get("/getAll", getUsersHandler);
router.get("/userget", usersGet);
router.put("/userAdmin/:id", usersAdmin);

module.exports = router;