import jwt from "jsonwebtoken";

import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

import User from "../models/user.js";

const TOKEN_SECRET = `${process.env.JWT_SECRET}`;

// const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401);
  }

  try {
    const { contactId } = jwt.verify(token, TOKEN_SECRET);
    const user = await User.findById(contactId);
    if (!user || !user.token) {
      throw HttpError(401);
    }
    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401));
  }
};

export default ctrlWrapper(authenticate);
