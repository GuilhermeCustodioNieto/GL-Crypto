import express from "express";
import TransationController from "../controllers/TransationController.js";
import { userMiddleware } from "./middlewares/authMiddleware.js";

const TransationRoutes = express.Router();

TransationRoutes.post(
  "/buy",

  TransationController.purchaseCrypto
);
TransationRoutes.post("/sell", TransationController.sellCrypto);

export default TransationRoutes;
