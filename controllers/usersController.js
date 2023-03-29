const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");

const RequestError = require("../helpers/RequestError");
const { User } = require("../models/user");
const sendEmail = require("../helpers/sendEmail");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email, { d: "identicon" });
  const verificationToken = uuidv4();
  const newUser = new User({ password, email, avatarURL, verificationToken });

  await newUser.setPassword(password);
  newUser.save();

  const mail = {
    to: email,
    subject: "Confirm registration",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="blank">Сlick to confirm email</a>`,
  };

  await sendEmail(mail);

  const hashPassword = newUser.password;

  res.status(201).json({
    user: { password: hashPassword, email, avatarURL },
  });
};

const login = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }

  const comparePassword = await user.comparePassword(password);

  if (!comparePassword) {
    throw RequestError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw RequestError(400, "Email not verify");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: { email, subscription: user.subscription },
  });
};

const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.status(200).json({ user: { email, subscription } });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;

  if (!_id) {
    throw RequestError(401, "Not authorized");
  }

  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const updateSubscription = async (req, res, next) => {
  const { _id, email } = req.user;
  const { subscription } = req.body;

  if (!_id) {
    throw RequestError(401, "Not authorized");
  }

  await User.findByIdAndUpdate(_id, { subscription });
  res.status(200).json({
    user: { email, subscription },
  });
};

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;
  const avatarName = `${_id}_${filename}`;
  const resultUpload = path.join(avatarsDir, avatarName);
  const avatarImg = await Jimp.read(tempUpload);

  avatarImg.resize(250, 250).write(resultUpload);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", resultUpload);

  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).json({
    avatarURL,
  });
};

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw RequestError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.status(200).json({ message: "Verification successful" });
};

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(404, "User not found");
  }

  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Confirm registration",
    html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="blank">Сlick to confirm email</a>`,
  };

  await sendEmail(mail);
  res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
