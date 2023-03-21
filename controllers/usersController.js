const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");

const RequestError = require("../helpers/RequestError");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);
  const newUser = new User({ password, email, avatarURL });

  await newUser.setPassword(password);
  newUser.save();

  const hashPassword = newUser.password;

  res.status(201).json({ user: { password: hashPassword, email, avatarURL } });
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

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
};
