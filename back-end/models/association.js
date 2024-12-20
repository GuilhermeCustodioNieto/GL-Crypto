import Wallet from "./Wallet.js";
import CryptoWallet from "./CryptoWallet.js";
import Money from "./cryptos/Money.js";
import User from "./User.js";

Wallet.hasMany(CryptoWallet, {
  foreignKey: "walletId",
  as: "cryptoWallets",
});

CryptoWallet.belongsTo(Wallet, {
  foreignKey: "walletId",
  as: "wallet",
});

CryptoWallet.belongsTo(Money, {
  foreignKey: "moneyTypeId",
  as: "moneyType",
});

User.belongsTo(Wallet, {
  foreignKey: "walletId",
  as: "wallet",
});
