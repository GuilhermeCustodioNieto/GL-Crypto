import Crypto from "../../models/cryptos/Crypto.js";
import Money from "../../models/cryptos/Money.js";

const CryptoController = {
  getAllCryptos: async (req, res) => {
    try {
      const cryptos = await Crypto.findAll({
        include: {
          model: Money, // Inclui a relação com Money
          as: "Money", // Certifique-se de usar o alias correto, se houver
        },
      });

      res.json(cryptos);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: "Error on get all cryptos",
        error: err,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const cryptos = await Crypto.findByPk(req.params.id, {
        include: {
          model: Money, // Inclui a relação com Money
          as: "Money", // Certifique-se de usar o alias correto, se houver
        },
      });

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
  getByAbbreviation: async (req, res) => {
    try {
      const crypto = await Crypto.findOne({
        include: {
          model: Money, // Inclui o modelo relacionado
          where: {
            abbreviation: req.params.abbreviation, // Filtra pelo campo abbreviation
          },
        },
      });

      if (crypto) {
        res.json(crypto);
      } else {
        res.status(404).json({ message: "Crypto not found" });
      }
    } catch (err) {
      res.status(500).json({
        message: "Error on get a crypto by abbreviation",
        err: err.message,
      });
    }
  },

  createNewCrypto: async (req, res) => {
    try {
      const { name, imgUrl, abbreviation, author, valueInDollar } = req.body;

      const newCrypto = await Crypto.create({
        author,
        valueInDollar,
      });

      const newMoney = await Money.create({
        name,
        imgUrl,
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
      const { name, imgUrl, abbreviation, author, valueInDollar } = req.body;

      if (crypto) {
        await crypto.update({ author, valueInDollar });
      } else {
        res.status(404).json({ message: "Crypto not found" });
      }

      const money = await Money.findOne({ where: { cryptoId: crypto.id } });
      if (money) {
        await money.update({ name, imgUrl, abbreviation });
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
