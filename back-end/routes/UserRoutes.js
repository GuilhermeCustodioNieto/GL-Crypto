import express from "express";
const UserRoutes = express.Router();
import UserController from "../controllers/UserController.js";

UserRoutes.get("/", UserController.findUsers);

export default UserRoutes;
