import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/connection.js";
import Crypto from "./Crypto.js";
import RealMoney from "./RealMoney.js";
import CryptoWallet from "../CryptoWallet.js";

class Money extends Model {}

Money.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    abbreviation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Crypto", "RealMoney"]],
      },
    },
    valueInDollar: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    cryptoId: {
      type: DataTypes.INTEGER,
      references: {
        model: Crypto,
        key: "id",
      },
      allowNull: true,
    },
    realMoneyId: {
      type: DataTypes.INTEGER,
      references: {
        model: RealMoney,
        key: "id",
      },
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Money",
    tableName: "money",
    timestamps: true,
  }
);

// Relações
Money.belongsTo(Crypto, { foreignKey: "cryptoId", constraints: false });
Money.belongsTo(RealMoney, { foreignKey: "realMoneyId", constraints: false });
Crypto.hasOne(Money, { foreignKey: "cryptoId" });
RealMoney.hasOne(Money, { foreignKey: "realMoneyId" });

export default Money;
