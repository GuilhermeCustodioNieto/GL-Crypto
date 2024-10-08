import express from "express";
const UserRoutes = express.Router();
import UserController from "../controllers/UserController.js";

UserRoutes.get("/", UserController.getUsers);

export default UserRoutes;
