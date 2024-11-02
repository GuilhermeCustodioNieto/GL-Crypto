import sequelize from "../config/connection.js";
import { DataTypes, INTEGER, Model } from "sequelize";
import Money from "./cryptos/Money.js";
import Wallet from "./Wallet.js";

class CryptoWallet extends Model {}

CryptoWallet.init(
  {
    lastPurchase: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    totalInDollar: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CryptoWallet",
  }
);

export default CryptoWallet;
