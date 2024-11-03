import sequelize from "../config/connection.js";
import { Model, DataTypes } from "sequelize";
import CryptoWallet from "./CryptoWallet.js";

class Wallet extends Model {}

Wallet.init(
  {},
  {
    sequelize,
    modelName: "Wallet",
  }
);

export default Wallet;
