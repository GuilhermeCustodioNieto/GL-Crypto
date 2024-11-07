import express from "express";
const UserRoutes = express.Router();
import UserController from "../controllers/UserController.js";
import authMiddleware from "./middlewares/authMiddleware.js";

UserRoutes.get("/", UserController.findAll);
UserRoutes.get("/:id", authMiddleware, UserController.findById);
UserRoutes.get("/getAllData/:id", UserController.getAllData);

export default UserRoutes;
