const validationAddContact = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required name field";
      next(error);
      return;
    }
    next();
  };
};

const validationUpdateContact = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing fields";
      next(error);
      return;
    }
    next();
  };
};

module.exports = { validationAddContact, validationUpdateContact };
