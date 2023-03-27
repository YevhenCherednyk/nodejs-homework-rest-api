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
      error.message = "missing fields";
      next(error);
      return;
    }
    next();
  };
};

const validationUpdateStatusContact = (schema) => {
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

const validationRegister = (schema) => {
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

const validationUpdateSubscription = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const fieldName = error.details[0].context.label;
      error.status = 400;
      error.message = `${fieldName} field is required and must be one of the list: starter, pro, business`;
      next(error);
      return;
    }
    next();
  };
};

const validationVeryfyEmail = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      error.status = 400;
      error.message = "missing required field email";
      next(error);
      return;
    }
  };
};
module.exports = {
  validationAddContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validationRegister,
  validationUpdateSubscription,
  validationVeryfyEmail,
};
