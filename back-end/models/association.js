import Wallet from "./Wallet.js";
import CryptoWallet from "./CryptoWallet.js";
import Money from "./cryptos/Money.js";

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
