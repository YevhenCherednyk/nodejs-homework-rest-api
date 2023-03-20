const { Contact } = require("../models/contact");
const RequestError = require("../helpers/RequestError");

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const params = favorite ? { owner, favorite } : { owner };

  const contacts = await Contact.find(params, "", {
    skip,
    limit,
  }).populate("owner", "_id, email");
  res.status(200).json(contacts);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId).populate(
    "owner",
    "_id, email"
  );
  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json(contact);
};

const addContact = async (req, res, next) => {
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId).populate(
    "owner",
    "_id, email"
  );

  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json({ message: "contact deleted" });
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  }).populate("owner", "_id, email");

  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json(contact);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  ).populate("owner", "_id, email");

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
  updateStatusContact,
};
