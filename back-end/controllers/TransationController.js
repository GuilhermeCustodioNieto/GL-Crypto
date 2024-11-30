import Crypto from "../models/cryptos/Crypto.js";
import CryptoWallet from "../models/CryptoWallet.js";
import Wallet from "../models/Wallet.js";
import sequelize from "../config/connection.js";
import User from "../models/User.js";
import getConversion from "../utils/MoneyConversor.js";
import Money from "../models/cryptos/Money.js";
import Transation from "../models/Transation.js";
import RealMoney from "../models/cryptos/RealMoney.js";

function createNewTransation(
  amount,
  date,
  status,
  money,
  paymentMoney,
  sender,
  receiver,
  tipoTransacao
) {
  const transaction = Transation.create({
    amount,
    date,
    status,
    money,
    paymentMoney,
    sender,
    receiver,
    tipoTransacao,
  });

  return transaction;
}

const TransactionController = {
  purchaseCrypto: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { idMoneyInput, idUser, balance, idMoneyOutput } = req.body;

      if (!idMoneyInput || !idUser || !balance || !idMoneyOutput) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      // 1. Buscar usuário com a carteira
      const user = await User.findByPk(idUser, {
        include: [{ model: Wallet, as: "wallet" }],
        transaction,
      });

      if (!user || !user.wallet) {
        await transaction.rollback();
        return res.status(404).json({ message: "User or wallet not found." });
      }

      const wallet = await Wallet.findByPk(user.walletId, {
        include: [{ model: CryptoWallet, as: "cryptoWallets" }],
        transaction,
      });
      const moneyInput = await Money.findByPk(idMoneyInput, {
        transaction,
      });

      const moneyOutput = await Money.findByPk(idMoneyOutput, {
        transaction,
      });

      // Verifica se os objetos foram carregados corretamente
      if (!moneyInput || !moneyOutput) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ message: "Crypto or associated Money not found." });
      }

      const inputAbbreviation = moneyInput.abbreviation;
      const outputAbbreviation = moneyOutput.abbreviation;

      // 3. Buscar carteiras de criptomoedas existentes
      const cryptoWalletInput = wallet.cryptoWallets.find(
        (cw) => cw.moneyTypeId === idMoneyInput
      );
      const cryptoWalletOutput = wallet.cryptoWallets.find(
        (cw) => cw.moneyTypeId === idMoneyOutput
      );

      if (!cryptoWalletOutput) {
        await transaction.rollback();
        return res
          .status(400)
          .json({ message: "Output crypto wallet not found." });
      }

      // 4. Obter a taxa de conversão
      const conversionRate = await getConversion(
        inputAbbreviation,
        outputAbbreviation
      );

      const conversionRateInput = await getConversion(
        outputAbbreviation,
        inputAbbreviation
      );

      if (!conversionRate) {
        await transaction.rollback();
        return res
          .status(500)
          .json({ message: "Error retrieving conversion rate." });
      }

      const totalOutputRequired = Number(balance) * conversionRate;
      const totalInputRequired = Number(balance) * conversionRateInput;

      // 5. Validar saldo suficiente
      if (Number(cryptoWalletOutput.balance) < totalOutputRequired) {
        await transaction.rollback();
        return res
          .status(400)
          .json({ message: "Insufficient balance in output wallet." });
      }

      // 6. Atualizar saldos
      await CryptoWallet.update(
        {
          balance:
            Number(cryptoWalletOutput.balance) - Number(totalOutputRequired),
        },
        {
          where: { id: cryptoWalletOutput.id },
          transaction,
        }
      );

      if (cryptoWalletInput) {
        await CryptoWallet.update(
          {
            balance: Number(balance) + Number(cryptoWalletInput.balance),
          },
          {
            where: { id: cryptoWalletInput.id },
            transaction,
          }
        );
      } else {
        await CryptoWallet.create(
          {
            walletId: wallet.id,
            moneyTypeId: idMoneyInput,
            balance: Number(balance),
            lastPurchase: new Date(),
            totalInDollar: moneyInput.valueInDollar * Number(balance),
          },
          { transaction }
        );
      }

      const receiverUserId = null;

      await Transation.create({
        amount: balance,
        date: new Date(),
        status: "Complete",
        tipoTransacao: "Buy",
        moneyId: idMoneyInput,
        paymentMoneyId: idMoneyOutput,
        senderId: idUser,
        receiverId: receiverUserId || null,
      });

      await transaction.commit();

      return res.status(201).json({
        message: "Transaction successful.",
        wallet: await Wallet.findByPk(wallet.id, {
          include: [{ model: CryptoWallet, as: "cryptoWallets" }],
        }),
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Error in purchaseCrypto:", error);
      return res.status(500).json({
        message: "Error processing transaction.",
        error: error.message,
      });
    }
  },
  sellCrypto: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { idMoneySell, idUser, amountToSell, idMoneyReceive } = req.body;

      if (!idMoneySell || !idUser || !amountToSell || !idMoneyReceive) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      // 1. Buscar usuário com a carteira
      const user = await User.findByPk(idUser, {
        include: [{ model: Wallet, as: "wallet" }],
        transaction,
      });

      if (!user || !user.wallet) {
        await transaction.rollback();
        return res.status(404).json({ message: "User or wallet not found." });
      }

      const wallet = await Wallet.findByPk(user.walletId, {
        include: [{ model: CryptoWallet, as: "cryptoWallets" }],
        transaction,
      });

      // 2. Buscar informações das criptos
      const moneySell = await Money.findByPk(idMoneySell, {
        transaction,
      });

      const moneyReceive = await Crypto.findByPk(idMoneyReceive, {
        transaction,
      });

      if (!moneySell || !moneyReceive) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ message: "Crypto or associated Money not found." });
      }

      const sellAbbreviation = moneySell.abbreviation;
      const receiveAbbreviation = moneyReceive.abbreviation;

      // 3. Buscar carteiras de criptomoedas existentes
      const moneyWalletSell = wallet.cryptoWallets.find(
        (cw) => cw.moneyTypeId === idMoneySell
      );
      const moneyWalletReceive = wallet.cryptoWallets.find(
        (cw) => cw.moneyTypeId === idMoneyReceive
      );

      if (!moneyWalletSell || Number(moneyWalletSell.balance) < amountToSell) {
        await transaction.rollback();
        return res
          .status(400)
          .json({ message: "Insufficient balance in sell wallet." });
      }

      // 4. Obter a taxa de conversão
      const conversionRate = await getConversion(
        sellAbbreviation,
        receiveAbbreviation
      );

      if (!conversionRate) {
        await transaction.rollback();
        return res
          .status(500)
          .json({ message: "Error retrieving conversion rate." });
      }

      const totalReceived = Number(amountToSell) * conversionRate;

      // 5. Atualizar saldos usando o método update
      await CryptoWallet.update(
        {
          balance: Number(moneyWalletSell.balance) - Number(amountToSell),
        },
        {
          where: { id: moneyWalletSell.id },
          transaction,
        }
      );

      if (moneyWalletReceive) {
        await CryptoWallet.update(
          {
            balance: Number(moneyWalletReceive.balance) + Number(totalReceived),
          },
          {
            where: { id: moneyWalletReceive.id },
            transaction,
          }
        );
      } else {
        await CryptoWallet.create(
          {
            walletId: wallet.id,
            moneyTypeId: idCryptoReceive,
            balance: Number(totalReceived),
            lastPurchase: new Date(),
            totalInDollar: cryptoReceive.valueInDollar * Number(totalReceived),
          },
          { transaction }
        );
      }

      // 6. Commit da transação
      await transaction.commit();

      await Transation.create({
        amount: amountToSell,
        date: new Date(),
        status: "Complete",
        tipoTransacao: "Sell",
        moneyId: idMoneySell,
        paymentMoneyId: idMoneyReceive,
        receiverId: idUser,
        senderId: null,
      });

      return res.status(201).json({
        message: "Sell transaction successful.",
        wallet: await Wallet.findByPk(wallet.id, {
          include: [{ model: CryptoWallet, as: "cryptoWallets" }],
        }),
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Error in sellCrypto:", error);
      return res.status(500).json({
        message: "Error processing transaction.",
        error: error.message,
      });
    }
  },
  deposit: async (req, res) => {
    const { balance, idUser, typePaymet } = req.body;
  },
  convertBetweenCurrencies: async (req, res) => {
    const { idMoneyInput, idMoneyOutput, balance } = req.body;

    const moneyInput = await Money.findByPk(idMoneyInput, {});

    const moneyOutput = await Money.findByPk(idMoneyOutput, {});

    // Verifica se os objetos foram carregados corretamente
    if (!moneyInput || !moneyOutput) {
      return res
        .status(404)
        .json({ message: "Crypto or associated Money not found." });
    }

    const inputAbbreviation = moneyInput.abbreviation;
    const outputAbbreviation = moneyOutput.abbreviation;

    const conversionRate = await getConversion(
      inputAbbreviation,
      outputAbbreviation
    );

    const output = Number(conversionRate) * Number(balance);

    res.json({ "converted-value": output });
  },
  getAllTransactions: async (req, res) => {
    try {
      const transations = await Transation.findAll({
        include: [
          {
            model: Money,
            as: "money",
            include: [
              { model: Crypto, as: "Crypto" },
              { model: RealMoney, as: "RealMoney" },
            ],
          },
          {
            model: Money,
            as: "paymentMoney",
            include: [
              { model: Crypto, as: "Crypto" },
              { model: RealMoney, as: "RealMoney" },
            ],
          },
          {
            model: User,
            as: "sender",
          },
          {
            model: User,
            as: "receiverUser",
          },
        ],
      });

      res.json(transations);
    } catch (error) {
      res.status(500).json({ message: "Error on get history", err: error });
    }
  },
};

export default TransactionController;
