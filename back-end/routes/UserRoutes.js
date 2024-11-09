import express from "express";
const UserRoutes = express.Router();
import UserController from "../controllers/UserController.js";

UserRoutes.get("/:id", authMiddleware, UserController.findById);
UserRoutes.get("/getAllData/:id", authMiddleware, UserController.getAllData);

export default UserRoutes;
