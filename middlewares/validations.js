const validationAddContact = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const fieldName = error.details[0].context.label;
      error.status = 400;
      error.message = `missing required ${fieldName} field`;
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
      error.message = "missing field favorite";
      next(error);
      return;
    }
    next();
  };
};

module.exports = { validationAddContact, validationUpdateContact };
