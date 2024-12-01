import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/connection.js";

class Crypto extends Model {}

Crypto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Crypto",
    tableName: "cryptos",
    timestamps: true,
  }
);

export default Crypto;
