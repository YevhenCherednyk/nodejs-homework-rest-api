const express = require("express");

const {
  ctrlWrapper,
  validationRegister,
  validationUpdateSubscription,
  auth,
} = require("../../middlewares");
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controllers/usersController");
const { joiSchema, updateSubscriptionSchema } = require("../../models/user");

const router = express.Router();

router.post("/register", validationRegister(joiSchema), ctrlWrapper(register));

router.post("/login", validationRegister(joiSchema), ctrlWrapper(login));

router.post("/current", auth, ctrlWrapper(getCurrent));

router.post("/logout", auth, ctrlWrapper(logout));

router.patch(
  "/",
  auth,
  validationUpdateSubscription(updateSubscriptionSchema),
  ctrlWrapper(updateSubscription)
);

module.exports = router;
