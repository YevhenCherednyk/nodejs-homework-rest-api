const { Contact } = require("../models/contact");
const RequestError = require("../helpers/RequestError");

const getAllContacts = async (req, res, next) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json(contact);
};

const addContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);

  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json({ message: "contact deleted" });
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json(contact);
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
};
