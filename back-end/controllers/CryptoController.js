import Crypto from "../models/Crypto.js";

const CryptoController = {
  getAllCryptos: async (req, res) => {
    try {
      const cryptos = await Crypto.findAll();

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
      const {
        name,
        usersCount,
        quantity,
        abbreviation,
        author,
        valueInDollar,
      } = req.body;
      const type = "Crypto";
      const newMoney = await Crypto.create({
        name,
        type,
        usersCount,
        quantity,
        abbreviation,
        author,
        valueInDollar,
      });

      res.status(201).json(newMoney);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on creation of the crypto", err: err });
    }
  },

  updateCrypto: async (req, res) => {
    try {
      const crypto = Money.findByPk(req.params.id);
      const { name, usersCount, quantity, abbreviation, autor, valueinDolar } =
        req.body;
      if (crypto) {
        await crypto.update({
          name,
          usersCount,
          quantity,
          abbreviation,
          autor,
          valueinDolar,
        });
      } else {
        res.status(404).json({ message: "Crypto not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error on update the crypto", err: err });
    }
  },

  deleteCrypto: async (req, res) => {
    try {
      const crypto = Crypto.findByPk(req.params.id);
      if (crypto) {
        await crypto.destroy();
        res.status(204).json();
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
