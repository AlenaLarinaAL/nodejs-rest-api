import express from "express";

import contactsController from "../../controllers/contacts-controllers.js";

import {
  isEmptyBody,
  isValidId,
  authenticate,
} from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import {
  contactAddSchema,
  updateStatusContactSchema,
} from "../../models/contact.js";

const contactAddValidate = validateBody(contactAddSchema);
const updateStatusContactValidate = validateBody(updateStatusContactSchema);

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.listContacts);

contactsRouter.get("/:contactId", isValidId, contactsController.getContactById);

contactsRouter.post(
  "/",
  // upload.fields([{name: "avatar", maxCount:1}]),
  // upload.array("avatar", 8),
  // upload.single("avatar"),
  isEmptyBody,
  contactAddValidate,
  contactsController.addContact
);

contactsRouter.delete(
  "/:contactId",
  isValidId,
  contactsController.removeContact
);

contactsRouter.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  contactAddValidate,
  contactsController.updateContact
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  updateStatusContactValidate,
  contactsController.updateFavorite
);

export default contactsRouter;
