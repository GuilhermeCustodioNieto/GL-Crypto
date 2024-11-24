import e from "express";
import {
  userAuthController,
  adminAuthController,
} from "../controllers/AuthController.js";
const AuthRoutes = e.Router();

AuthRoutes.post("/user/login", userAuthController.login);
AuthRoutes.post("/user/register", userAuthController.register);

AuthRoutes.post("/admin/login", adminAuthController.login);
AuthRoutes.post("/admin/register", adminAuthController.register);

export default AuthRoutes;
