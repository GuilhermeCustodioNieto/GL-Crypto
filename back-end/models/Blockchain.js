import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js";

class Blockchain extends Model {}

Blockchain.init(
  {
    pib: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Blockchain",
  }
);

export default Blockchain;
