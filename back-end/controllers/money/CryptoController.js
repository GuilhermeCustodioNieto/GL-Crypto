import Crypto from "../../models/cryptos/Crypto.js";
import Money from "../../models/cryptos/Money.js";

const CryptoController = {
  getAllCryptos: async (req, res) => {
    try {
      const cryptos = await Crypto.findAll({
        include: Money,
      });

      res.json(cryptos);
    } catch (err) {
      res.status(500).json({
        message: "Error on get all cryptos",
        err: err,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const cryptos = await Crypto.findByPk(req.params.id);
      if (cryptos) {
        res.json(cryptos);
      } else {
        res.status(404).json({ message: "Crypto not found" });
      }
    } catch (err) {
      res.status(500).json({
        message: "Error on get a crypto by id",
        err: err,
      });
    }
  },
  createNewCrypto: async (req, res) => {
    try {
      const { name, quantity, abbreviation, author, valueInDollar } = req.body;

      const newCrypto = await Crypto.create({
        quantity,
        author,
        valueInDollar,
      });

      const newMoney = await Money.create({
        name,
        abbreviation,
        type: "Crypto",
        cryptoId: newCrypto.id,
      });

      res.status(201).json({
        crypto: newCrypto,
        money: newMoney,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on creation of the crypto", err: err });
      console.log(err);
    }
  },

  updateCrypto: async (req, res) => {
    try {
      const crypto = await Crypto.findByPk(req.params.id);
      const { name, quantity, abbreviation, author, valueInDollar } = req.body;

      if (crypto) {
        await crypto.update({ quantity, author, valueInDollar });
      } else {
        res.status(404).json({ message: "Crypto not found" });
      }

      const money = await Money.findOne({ where: { cryptoId: crypto.id } });
      if (money) {
        await money.update({ name, abbreviation });
        res.json({ crypto, money });
      } else {
        res.status(404).json({ message: "Crypto not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error on update the crypto", err: err });
      console.log(err);
    }
  },

  deleteCrypto: async (req, res) => {
    try {
      const crypto = await Crypto.findByPk(req.params.id);
      if (crypto) {
        await Money.destroy({ where: { cryptoId: crypto.id } });
        await crypto.destroy();
        res.status(202).json();
      } else {
        res.status(404).json({ message: "Crypto not fount" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on creation of the crypto", err: err });
    }
  },
};

export default CryptoController;
/*
try {
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on creation of the crypto", err: err });
    } */
