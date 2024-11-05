import express from "express";
const UserRoutes = express.Router();
import UserController from "../controllers/UserController.js";

UserRoutes.get("/", UserController.findAll);
UserRoutes.get("/:id", UserController.findById);


export default UserRoutes;
