import express from "express";

import authController from "../../controllers/auth-controller.js";

import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import {
  userSignUpSchema,
  userSignInSchema,
  userEmailSchema,
} from "../../models/user.js";

const userSignUpValidate = validateBody(userSignUpSchema);
const userSignInValidate = validateBody(userSignInSchema);
const userEmailValidate = validateBody(userEmailSchema);

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  userSignUpValidate,
  authController.signup
);

authRouter.get("/verify/:verificationCode", authController.verify);

authRouter.post(
  "/verify",
  isEmptyBody,
  userEmailValidate,
  authController.resentVerifyEmail
);

authRouter.post(
  "/signin",
  isEmptyBody,
  userSignInValidate,
  authController.signin
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  authController.updateAvatar
);

export default authRouter;
