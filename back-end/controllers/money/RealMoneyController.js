import RealMoney from "../../models/cryptos/RealMoney.js";
import Money from "../../models/cryptos/Money.js";

const RealMoneyController = {
  getAllRealMoney: async (req, res) => {
    try {
      const realMoneys = await RealMoney.findAll({
        include: Money,
      });
      res.json(realMoneys);
    } catch (err) {
      res.status(500).json({
        message: "Error on get all real money",
        err: err,
      });
    }
  },

  getById: async (req, res) => {
    try {
      const realMoney = await RealMoney.findByPk(req.params.id, {
        include: Money,
      });
      if (realMoney) {
        res.json(realMoney);
      } else {
        res.status(404).json({ message: "RealMoney not found" });
      }
    } catch (err) {
      res.status(500).json({
        message: "Error on get a real money by id",
        err: err,
      });
    }
  },

  createNewRealMoney: async (req, res) => {
    try {
      const { name, country, abbreviation, value, symbol } = req.body;

      const newRealMoney = await RealMoney.create({
        country,
        value,
        symbol,
      });

      const newMoney = await Money.create({
        name,
        abbreviation,
        type: "RealMoney",
        realMoneyId: newRealMoney.id,
      });

      res.status(201).json({ realMoney: newRealMoney, money: newMoney });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on creation of the real money", err: err });
    }
  },

  updateRealMoney: async (req, res) => {
    try {
      const realMoney = await RealMoney.findByPk(req.params.id);
      if (realMoney) {
        const { name, country, abbreviation, value, symbol } = req.body;

        await realMoney.update({ country, value, symbol });

        const money = await Money.findOne({
          where: { realMoneyId: realMoney.id },
        });
        if (money) {
          await money.update({ name, abbreviation });
        }

        res.json({ realMoney, money });
      } else {
        res.status(404).json({ message: "RealMoney not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on update the real money", err: err });
    }
  },

  deleteRealMoney: async (req, res) => {
    try {
      const realMoney = await RealMoney.findByPk(req.params.id);
      if (realMoney) {
        await Money.destroy({ where: { realMoneyId: realMoney.id } });

        await realMoney.destroy();
        res.status(204).json();
      } else {
        res.status(404).json({ message: "RealMoney not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on delete the real money", err: err });
    }
  },
};

export default RealMoneyController;
