import express from "express";
import TransationController from "../controllers/TransationController.js";
const TransationRoutes = express.Router()

TransationRoutes.get('/buy', TransationController.buyCrypto)

export default TransationRoutes