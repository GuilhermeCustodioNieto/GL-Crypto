import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection";
import Money from "./cryptos/Money";
import CryptoWallet from "./CryptoWallet";

class WalletMoney extends Model {}

WalletMoney.init({
  balance: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

CryptoWallet.belongsToMany(Money, {
  through: WalletMoney,
  foreignKey: "walletId",
  as: "moneys",
});

Money.belongsToMany(CryptoWallet, {
  through: WalletMoney,
  foreignKey: "moneyId",
  as: "wallets",
});

export default WalletMoney;
