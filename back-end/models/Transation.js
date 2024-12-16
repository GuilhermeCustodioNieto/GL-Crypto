import { Model, DataTypes } from "sequelize";
import Money from "./cryptos/Money.js";
import User from "./User.js";
import sequelize from "../config/connection.js";

class Transation extends Model {}
Transation.init(
  {
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Complete", "Loading", "Unauthorized"]],
      },
    },
    tipoTransacao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Sell", "Buy", "Deposit"]],
      },
    },
  },
  {
    sequelize,
  }
);

Transation.belongsTo(Money, {
  foreignKey: "moneyId",
  as: "money",
});

Transation.belongsTo(Money, {
  foreignKey: "paymentMoneyId",
  as: "paymentMoney",
});

Transation.belongsTo(User, {
  foreignKey: "senderId",
  as: "sender",
});

Transation.belongsTo(User, {
  foreignKey: "receiverId",
  as: "receiverUser",
});

export default Transation;
