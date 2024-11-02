import e from "express";
import WalletController from "../controllers/WalletController.js";
const WalletsRouter = e.Router();
WalletsRouter.get("/", WalletController.findAll);

export default WalletsRouter;
