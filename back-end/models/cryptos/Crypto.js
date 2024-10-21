import { BIGINT, DataTypes, Model } from "sequelize";
import sequelize from "../../config/connection.js";

class Crypto extends Model {}

Crypto.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usersCount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    quantity: {
      type: BIGINT,
      allowNull: false,
    },
    abbreviation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valueInDollar: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Crypto",
    discriminator: "type",
  }
);

export default Crypto;
