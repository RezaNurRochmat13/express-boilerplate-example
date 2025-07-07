import express from "express";
import { AuthenticationController } from "../controller/authentication.controller";

const authenticationRouter = express.Router();
const { registerUser, loginUser } = AuthenticationController()

authenticationRouter.post("/register", registerUser);
authenticationRouter.post("/login", loginUser);

export default authenticationRouter;