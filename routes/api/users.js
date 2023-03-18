const express = require("express");

const { ctrlWrapper, validationRegister } = require("../../middlewares");
const { register, login } = require("../../controllers/usersController");
const { joiSchema } = require("../../models/user");

const router = express.Router();

router.post("/register", validationRegister(joiSchema), ctrlWrapper(register));

router.post("/login", validationRegister(joiSchema), ctrlWrapper(login));

module.exports = router;
