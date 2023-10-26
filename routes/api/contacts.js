import express from "express";

import contactsController from "../../controllers/contacts-controllers.js";

import { isEmptyBody, isValidId } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import {
  contactAddSchema,
  updateStatusContactSchema,
} from "../../models/contacts.js";

const contactAddValidate = validateBody(contactAddSchema);
const updateStatusContactValidate = validateBody(updateStatusContactSchema);

const router = express.Router();

router.get("/", contactsController.listContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  isEmptyBody,
  contactAddValidate,
  contactsController.addContact
);

router.delete("/:contactId", isValidId, contactsController.removeContact);

router.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  contactAddValidate,
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  updateStatusContactValidate,
  contactsController.updateFavorite
);

export default router;
