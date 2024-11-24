import express from "express";
const UserRoutes = express.Router();
import UserController from "../controllers/UserController.js";
import { userMiddleware } from "./middlewares/authMiddleware.js";

UserRoutes.get("/", UserController.findAll);
UserRoutes.get("/:id", userMiddleware, UserController.findById);
UserRoutes.get("/getAllData/:id", userMiddleware, UserController.getAllData);

export default UserRoutes;
