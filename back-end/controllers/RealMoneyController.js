import RealMoney from "../models/RealMoney.js";

const RealMoneyController = {
  findAllRealMoney: async (req, res) => {
    try {
      const realMoneys = await RealMoney.findAll();
      res.json(realMoneys);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on find all real moneys", err: err });
    }
  },

  findById: async (req, res) => {
    try {
      const realMoney = await RealMoney.findByPk(req.params.id);
      if (realMoney) {
        res.json(realMoney);
      } else {
        res.status(404).json({
          message: "RealMoney not found",
        });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on find the RealMoney", err: err });
    }
  },

  createRealMoney: async (req, res) => {
    try {
      const { name, type, country, abbreviation, value, symbol } = req.body;
      const realMoney = RealMoney.create({
        name,
        type,
        country,
        abbreviation,
        value,
        symbol,
      });

      res.status(201).json(realMoney);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on creation of the RealMoney", err: err });
    }
  },

  updateRealMoney: async (req, res) => {
    try {
      const { name, type, country, abbreviation, value } = req.body;
      const realMoney = await RealMoney.findByPk(req.params.id);
      if (realMoney) {
        await realMoney.update({ name, type, country, abbreviation, value });
        res.json({});
      } else {
        res.status(404).json({ message: "Real money not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on update the RealMoney", err: err });
    }
  },

  deleteRealMoney: async (req, res) => {
    try {
      const realMoney = await RealMoney.findByPk(req.params.id);
      if (realMoney) {
        realMoney.destroy();
        res.status(204).json({});
      } else {
        res.status(404).json({ message: "RealMoney not fount" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on creation of the crypto", err: err });
    }
  },
};

export default RealMoneyController;
