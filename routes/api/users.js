const express = require("express");

const {
  ctrlWrapper,
  validationRegister,
  validationUpdateSubscription,
  validationVerifyEmail,
  auth,
  upload,
} = require("../../middlewares");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/usersController");
const {
  joiSchema,
  updateSubscriptionSchema,
  verifyEmailSchema,
} = require("../../models/user");

const router = express.Router();

router.post("/register", validationRegister(joiSchema), ctrlWrapper(register));

router.get("/verify/:verificationToken", ctrlWrapper(verifyEmail));

router.post(
  "/verify",
  validationVerifyEmail(verifyEmailSchema),
  ctrlWrapper(resendVerifyEmail)
);

router.post("/login", validationRegister(joiSchema), ctrlWrapper(login));

router.post("/current", auth, ctrlWrapper(getCurrent));

router.post("/logout", auth, ctrlWrapper(logout));

router.patch(
  "/",
  auth,
  validationUpdateSubscription(updateSubscriptionSchema),
  ctrlWrapper(updateSubscription)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);

module.exports = router;
