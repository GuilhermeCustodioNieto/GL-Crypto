import e from "express";
import AuthController from "../controllers/AuthController.js";
const AuthRoutes = e.Router();

AuthRoutes.post("/login", AuthController.login);
AuthRoutes.post("/register", AuthController.register);

export default AuthRoutes;
