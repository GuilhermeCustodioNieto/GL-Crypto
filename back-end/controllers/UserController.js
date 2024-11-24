import Crypto from "../models/cryptos/Crypto.js";
import Money from "../models/cryptos/Money.js";
import RealMoney from "../models/cryptos/RealMoney.js";
import CryptoWallet from "../models/CryptoWallet.js";
import User from "../models/User.js";
import Wallet from "../models/Wallet.js";

const UserController = {
  findAll: async (req, res) => {
    try {
      const users = await User.findAll({
        include: { model: Wallet, as: "wallet" },
      });
      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error on searching the users", error: err });
    }
  },
  findById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: { model: Wallet, as: "wallet" },
      });

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on searching the user", err: err });
    }
  },
  getAllData: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: {
          model: Wallet,
          as: "wallet",
          include: {
            model: CryptoWallet,
            as: "cryptoWallets",
            include: {
              model: Money,
              as: "moneyType",
              include: [
                { model: Crypto, as: "Crypto" },
                { model: RealMoney, as: "RealMoney" },
              ],
            },
          },
        },
      });

      res.json(user);
    } catch (err) {
      console.log(err);

      res.status(500).json({ message: "Error on get all data", err: err });
    }
  },
};

export default UserController;
