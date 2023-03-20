const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const RequestError = require("../helpers/RequestError");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    const error = RequestError(401, "Not authorized");
    next(error);
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      const error = RequestError(401, "Not authorized");
      next(error);
    }

    req.user = user;
    next();
  } catch {
    const error = RequestError(401, "Not authorized");
    next(error);
  }
};

module.exports = auth;
