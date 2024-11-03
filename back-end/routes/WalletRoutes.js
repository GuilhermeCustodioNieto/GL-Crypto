import e from "express";
import WalletController from "../controllers/WalletController.js";
const WalletsRouter = e.Router();

WalletsRouter.get("/", WalletController.findAll);
WalletsRouter.get("/:id", WalletController.findByid);
WalletsRouter.post("/", WalletController.create);
WalletsRouter.delete("/:id", WalletController.delete);

export default WalletsRouter;
