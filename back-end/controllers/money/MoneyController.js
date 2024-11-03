import Money from "../../models/cryptos/Money.js";
import Crypto from "../../models/cryptos/Crypto.js";
import RealMoney from "../../models/cryptos/RealMoney.js";

const MoneyController = {
  getAllMoney: async (req, res) => {
    try {
      const moneyItems = await Money.findAll({
        include: [
          { model: Crypto, as: "Crypto" },
          { model: RealMoney, as: "RealMoney" },
        ],
      });

      res.status(200).json(moneyItems);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on fetching all money items", err: `${err}` });
    }
  },

  getById: async (req, res) => {
    try {
      const moneyItem = await Money.findByPk(req.params.id, {
        include: [
          { model: Crypto, as: "Crypto" },
          { model: RealMoney, as: "RealMoney" },
        ],
      });

      if (moneyItem) {
        res.json(moneyItem);
      } else {
        res.status(404).json({ message: "Money item not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on fetching money item by ID", err: err });
    }
  },
};

export default MoneyController;
