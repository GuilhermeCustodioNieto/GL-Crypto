import sequelize from "../config/connection.js";
import Wallet from "../models/Wallet.js";
import CryptoWallet from "../models/CryptoWallet.js";

const WalletController = {
  findAll: async (req, res) => {
    try {
      const wallets = Wallet.findAll({
        include: [{ model: CryptoWallet, as: "cryptoWallets" }],
      });
      res.status(202).json(wallets);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on creation of the crypto", err: err });
    }
  },
};

export default WalletController;
