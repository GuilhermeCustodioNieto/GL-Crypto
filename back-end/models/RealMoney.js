import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js";

class RealMoney extends Model {}

RealMoney.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    abbreviation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "RealMoney",
    discriminator: "type",
  }
);

export default RealMoney;
