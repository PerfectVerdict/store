import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

//* Authenticate user. Check for the user credentials and the token.
//* If the token is valid the user will be able to login and logou.
//* if the token is not valid throw an error.
const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  // Read JWT from the 'jwt' cookie.
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      console.log(req.user.isAdmin);  // Debugging the isAdmin value here

    } catch {
      res.status(401);
      throw new Error("Not authorized. token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized. No token.");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin.");
  }
};

export { authenticate, authorizeAdmin };
