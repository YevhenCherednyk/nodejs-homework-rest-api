const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getAll = async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }

  res.json(contact);
};

const add = async (req, res, next) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);

  if (!contact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }

  res.json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);

  if (!contact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }

  res.json(contact);
};

module.exports = { getAll, getById, add, remove, updateById };
