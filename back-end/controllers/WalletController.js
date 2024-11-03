import sequelize from "../config/connection.js";
import Wallet from "../models/Wallet.js";
import CryptoWallet from "../models/CryptoWallet.js";

const WalletController = {
  findAll: async (req, res) => {
    try {
      const wallets = await Wallet.findAll({
        include: [{ model: CryptoWallet, as: "cryptoWallets" }],
      });
      res.status(202).json(wallets);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on searching the wallets", err: err });
    }
  },
  findByid: async (req, res) => {
    try {
      const wallet = await Wallet.findByPk(req.params.id, {
        include: [{ model: CryptoWallet, as: "cryptoWallets" }],
      });
      if (wallet) {
        res.json(wallet);
      } else {
        res.status(404).json({ err: "Wallet not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on searching the wallet", err: err });
    }
  },
  create: async (req, res) => {
    try {
      await Wallet.create({});
      res.status(201).json();
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on creation of the wallet", err: err });
    }
  },
  delete: async (req, res) => {
    try {
      const wallet = await findByPk(req.params.id, {
        include: [{ model: CryptoWallet, as: "cryptoWallets" }],
      });

      if (wallet) {
        await wallet.destroy();
      } else {
        res.status(404).json({ err: "Cyrpto not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on deletation of the wallet", err: err });
    }
  },
};

export default WalletController;
