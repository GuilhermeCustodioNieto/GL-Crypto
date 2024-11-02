import Money from "../models/cryptos/Money.js";
import CryptoWallet from "../models/CryptoWallet.js";

const CryptoWalletController = {
  findAll: async (req, res) => {
    try {
      const cryptoWallets = await CryptoWallet.findAll();
      res.json(cryptoWallets);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on creation of the crypto", err: err });
    }
  },
  findById: async (req, res) => {
    try {
      const cryptoWallet = await CryptoWallet.findByPk(req.params.id);
      if (cryptoWallet) {
        res.json(cryptoWallet);
      } else {
        res.json({ err: "Crypto Wallet not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on creation of the crypto", err: err });
    }
  },
  createNewCryptoWallet: async (req, res) => {
    try {
      const { lastPurchase, balance, totalInDollar, moneyTypeId } = req.body;

      const cryptoWallet = await CryptoWallet.create({
        lastPurchase,
        balance,
        totalInDollar,
        moneyTypeId,
      });

      res.json(cryptoWallet);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on creation of the crypto", err: err });
    }
  },
  updateCryptoWallet: async (req, res) => {
    try {
      const { lastPurchase, balance, totalInDollar } = req.body;

      const cryptoWallet = await CryptoWallet.findByPk(req.params.id);

      if (cryptoWallet) {
        const moneyTypeIdLasted = cryptoWallet.moneyTypeId;
        await cryptoWallet.update({
          lastPurchase,
          balance,
          totalInDollar,
          moneyTypeId,
        });
        res.json(cryptoWallet);
      } else {
        res.json({ err: "Crypto Wallet not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on updating of the crypto", err: err });
    }
  },
  deleteCryptoWallet: async (req, res) => {
    try {
      const cryptoWallet = await CryptoWallet.findByPk(req.params.id);
      if (cryptoWallet) {
        await cryptoWallet.destroy();
        res.json();
      } else {
        res.json({ err: "Crypto Wallet not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on creation of the crypto", err: err });
    }
  },
};

export default CryptoWalletController;
