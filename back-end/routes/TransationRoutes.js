import express from "express";
import TransationController from "../controllers/TransationController.js";
import { userMiddleware } from "./middlewares/authMiddleware.js";

const TransationRoutes = express.Router();

TransationRoutes.post(
  "/buy",
  userMiddleware,
  TransationController.purchaseCrypto
);
TransationRoutes.post("/sell", userMiddleware, TransationController.sellCrypto);

export default TransationRoutes;
