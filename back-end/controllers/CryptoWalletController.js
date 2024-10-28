import CryptoWallet from "../models/CryptoWallet.js";

const CryptoWalletController = {
  findAll: async (req, res) => {
    try {
      const cryptoWallets = CryptoWallet.findAll();
      res.json(cryptoWallets);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on creation of the crypto", err: err });
    }
  },
};

export default CryptoWalletController;
