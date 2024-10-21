import sequelize from "../config/connection.js";
import { DataTypes, Model } from "sequelize";

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
    },
  },
  {
    sequelize,
    modelName: "CryptoWallet",
  }
);

CryptoWallet.belongsTo(Money, {
  foreignKey: "moneyTypeId",
  as: "money",
});

export default CryptoWallet;
