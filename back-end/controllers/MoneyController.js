import Crypto from "../models/Crypto.js";
import RealMoney from "../models/RealMoney.js";

const MoneyController = {
  getAllMoney: async (req, res) => {
    try {
      const [cryptos, realMoneys] = await Promise.all;
      [Crypto.findAll(), RealMoney.findAll()];

      const moneys = [...cryptos, ...realMoneys];
      res.status(200).json(moneys);
    } catch (err) {
      res
        .status(500)
        .json({ message: "erro ao buscar cryptos", err: `${err}` });
    }
  },
  getById: async (req, res) => {
    try {
      const money = Money.findByPk(req.params.id);
      if (money) {
        res.json(money);
      } else {
        res.status(404).json({
          message: "Money not found",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Error on found money by id",
        err: err,
      });
    }
  },
};

export default MoneyController;
