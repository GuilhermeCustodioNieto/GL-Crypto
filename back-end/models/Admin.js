import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js";

class Admin extends Model {}

Admin.init(
  {
    personalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adminPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Tb_admin",
    modelName: "Tb_admin",
  }
);

export default Admin;
