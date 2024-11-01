import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/connection.js";

class RealMoney extends Model {}

RealMoney.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING,
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
    tableName: "real_moneys",
    timestamps: true,
  }
);

export default RealMoney;
