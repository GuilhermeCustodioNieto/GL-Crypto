import express from "express";
const MoneyRoutes = express.Router();
import MoneyController from "../controllers/MoneyController.js";
import CryptoController from "../controllers/CryptoController.js";
import RealMoneyController from "../controllers/RealMoneyController.js";

MoneyRoutes.get("/cryptos", CryptoController.getAllCryptos);
MoneyRoutes.get("/cryptos/:id", CryptoController.getById);
MoneyRoutes.post("/cryptos", CryptoController.createNewCrypto);
MoneyRoutes.put("/cryptos/:id", CryptoController.updateCrypto);
MoneyRoutes.delete("/cryptos/:id", CryptoController.deleteCrypto);

MoneyRoutes.get("/realMoney", RealMoneyController.getAllRealMoney);
MoneyRoutes.get("/realMoney/:id", RealMoneyController.getById);
MoneyRoutes.post("/realMoney", RealMoneyController.createNewRealMoney);
MoneyRoutes.put("/realMoney/:id", RealMoneyController.updateRealMoney);
MoneyRoutes.delete("/realMoney/:id", RealMoneyController.deleteRealMoney);

MoneyRoutes.get("/", MoneyController.getAllMoney);
MoneyRoutes.get("/:id", MoneyController.getById);
export default MoneyRoutes;
