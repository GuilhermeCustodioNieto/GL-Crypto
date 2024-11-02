import sequelize from "../config/connection.js";
import { Model, DataTypes } from "sequelize";
import CryptoWallet from "./CryptoWallet.js";

class Wallet extends Model {}

Wallet.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Wallet",
  }
);

export default Wallet;
