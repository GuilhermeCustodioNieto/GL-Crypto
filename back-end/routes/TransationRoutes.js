import express from "express";
import TransationController from "../controllers/TransationController.js";
import { userMiddleware } from "./middlewares/authMiddleware.js";

const TransationRoutes = express.Router();

TransationRoutes.post(
  "/buy",

  TransationController.purchaseCrypto
);
TransationRoutes.post("/sell", TransationController.sellCrypto);
TransationRoutes.post(
  "/convert",
  TransationController.convertBetweenCurrencies
);

export default TransationRoutes;
