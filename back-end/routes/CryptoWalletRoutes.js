import express from "express";
import CryptoWalletController from "../controllers/CryptoWalletController.js";
const CryptoWalletRoutes = express.Router();

CryptoWalletRoutes.get("/", CryptoWalletController.findAll);

export default CryptoWalletRoutes;
