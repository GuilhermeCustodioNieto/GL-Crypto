import Crypto from "../models/Crypto.js";
import RealMoney from "../models/RealMoney.js";

const MoneyController = {
  getAllMoney: async (req, res) => {
    try {
      const [cryptos, realMoneys] = await Promise.all([
        Crypto.findAll(),
        RealMoney.findAll(),
      ]);

      const moneys = [...cryptos, ...realMoneys];
      res.status(200).json(moneys);
    } catch (err) {
      res
        .status(500)
        .json({ message: "erro ao buscar cryptos", err: `${err}` });
    }
  },
  getMoneyById: async (req, res) => {
    try {
      const { id } = req.params;

      // Fazer as duas consultas simultaneamente
      const [crypto, realMoney] = await Promise.all([
        Crypto.findByPk(id),
        RealMoney.findByPk(id),
      ]);

      if (crypto) {
        return res.json(crypto);
      } else if (realMoney) {
        return res.json(realMoney);
      }

      res.status(404).json({ message: "Money not found" });
    } catch (err) {
      res.status(500).json({
        message: "Error on getting money by id",
        err: err,
      });
    }
  },
};

export default MoneyController;
