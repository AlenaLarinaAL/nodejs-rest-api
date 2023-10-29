import Contact from "../models/contact.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { limit = 10, page = 5 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findById({ _id: contactId, owner });

  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found!`);
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOneAndDelete({ _id: contactId });

  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found!`);
  }

  res.status(200).json({
    message: "Delete success",
  });
};

const updateContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );

  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found!`);
  }

  res.status(201).json(result);
};

const updateFavorite = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );

  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found!`);
  }

  res.status(201).json(result);
};

export default {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
