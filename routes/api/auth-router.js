import express from "express";

import authController from "../../controllers/auth-controller.js";

import { authenticate, isEmptyBody } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import { userSignUpSchema, userSignInSchema } from "../../models/user.js";

const userSignUpValidate = validateBody(userSignUpSchema);
const userSignInValidate = validateBody(userSignInSchema);

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  userSignUpValidate,
  authController.signup
);

authRouter.post(
  "/signin",
  isEmptyBody,
  userSignInValidate,
  authController.signin
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

export default authRouter;
