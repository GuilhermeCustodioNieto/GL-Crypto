import Crypto from "../models/cryptos/Crypto.js";
import CryptoWallet from "../models/CryptoWallet.js";
import Wallet from "../models/Wallet.js";
import sequelize from "../config/connection.js";
import User from "../models/User.js";
import getConversion from "../utils/MoneyConversor.js";
import Money from "../models/cryptos/Money.js";
const TransactionController = {
  purchaseCrypto: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { idCryptoInput, idUser, balance, idCryptoOutput } = req.body;

      if (!idCryptoInput || !idUser || !balance || !idCryptoOutput) {
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
      const cryptoInput = await Crypto.findByPk(idCryptoInput, {
        include: { model: Money }, // Inclui a relação com Money

        transaction,
      });

      const cryptoOutput = await Crypto.findByPk(idCryptoOutput, {
        include: { model: Money }, // Inclui a relação com Money
        transaction,
      });

      // Verifica se os objetos foram carregados corretamente
      if (
        !cryptoInput ||
        !cryptoOutput ||
        !cryptoInput.Money ||
        !cryptoOutput.Money
      ) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ message: "Crypto or associated Money not found." });
      }

      const inputAbbreviation = cryptoInput.Money.abbreviation;
      const outputAbbreviation = cryptoOutput.Money.abbreviation;

      // 3. Buscar carteiras de criptomoedas existentes
      const cryptoWalletInput = wallet.cryptoWallets.find(
        (cw) => cw.moneyTypeId === idCryptoInput
      );
      const cryptoWalletOutput = wallet.cryptoWallets.find(
        (cw) => cw.moneyTypeId === idCryptoOutput
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

      console.log(totalOutputRequired);

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
            moneyTypeId: idCryptoInput,
            balance: Number(balance),
            lastPurchase: new Date(),
            totalInDollar: cryptoInput.valueInDollar * Number(balance),
          },
          { transaction }
        );
      }

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
      const { idCryptoSell, idUser, amountToSell, idCryptoReceive } = req.body;

      if (!idCryptoSell || !idUser || !amountToSell || !idCryptoReceive) {
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
      const cryptoSell = await Crypto.findByPk(idCryptoSell, {
        include: { model: Money },
        transaction,
      });

      const cryptoReceive = await Crypto.findByPk(idCryptoReceive, {
        include: { model: Money },
        transaction,
      });

      if (
        !cryptoSell ||
        !cryptoReceive ||
        !cryptoSell.Money ||
        !cryptoReceive.Money
      ) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ message: "Crypto or associated Money not found." });
      }

      const sellAbbreviation = cryptoSell.Money.abbreviation;
      const receiveAbbreviation = cryptoReceive.Money.abbreviation;

      // 3. Buscar carteiras de criptomoedas existentes
      const cryptoWalletSell = wallet.cryptoWallets.find(
        (cw) => cw.moneyTypeId === idCryptoSell
      );
      const cryptoWalletReceive = wallet.cryptoWallets.find(
        (cw) => cw.moneyTypeId === idCryptoReceive
      );

      if (
        !cryptoWalletSell ||
        Number(cryptoWalletSell.balance) < amountToSell
      ) {
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
          balance: Number(cryptoWalletSell.balance) - Number(amountToSell),
        },
        {
          where: { id: cryptoWalletSell.id },
          transaction,
        }
      );

      if (cryptoWalletReceive) {
        await CryptoWallet.update(
          {
            balance:
              Number(cryptoWalletReceive.balance) + Number(totalReceived),
          },
          {
            where: { id: cryptoWalletReceive.id },
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
  convertBetweenCurrencies: async (req, res) => {
    const { idCryptoInput, idCryptoOutput, balance } = req.body;

    console.log(req.body);

    const cryptoInput = await Crypto.findByPk(idCryptoInput, {
      include: { model: Money }, // Inclui a relação com Money
    });

    const cryptoOutput = await Crypto.findByPk(idCryptoOutput, {
      include: { model: Money }, // Inclui a relação com Money
    });

    // Verifica se os objetos foram carregados corretamente
    if (
      !cryptoInput ||
      !cryptoOutput ||
      !cryptoInput.Money ||
      !cryptoOutput.Money
    ) {
      return res
        .status(404)
        .json({ message: "Crypto or associated Money not found." });
    }

    const inputAbbreviation = cryptoInput.Money.abbreviation;
    const outputAbbreviation = cryptoOutput.Money.abbreviation;

    const conversionRate = await getConversion(
      inputAbbreviation,
      outputAbbreviation
    );

    const output = Number(conversionRate) * Number(balance);

    res.json({ "converted-value": output });
  },
};

export default TransactionController;
