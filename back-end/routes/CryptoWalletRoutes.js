import express from "express";
import CryptoWalletController from "../controllers/CryptoWalletController.js";
const CryptoWalletRoutes = express.Router();

CryptoWalletRoutes.get("/", CryptoWalletController.findAll);
CryptoWalletRoutes.get("/:id", CryptoWalletController.findById);
CryptoWalletRoutes.post("/", CryptoWalletController.createNewCryptoWallet);
CryptoWalletRoutes.put("/:id", CryptoWalletController.updateCryptoWallet);
CryptoWalletRoutes.delete("/:id", CryptoWalletController.deleteCryptoWallet);

export default CryptoWalletRoutes;
