const jwt = require("jsonwebtoken");

const RequestError = require("../helpers/RequestError");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email in use");
  }

  const newUser = new User({ password, email });

  await newUser.setPassword(password);
  newUser.save();

  const hashPassword = newUser.password;

  res.status(201).json({ user: { password: hashPassword, email } });
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

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
};
