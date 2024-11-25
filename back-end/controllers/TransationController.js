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

      if (!conversionRate) {
        await transaction.rollback();
        return res
          .status(500)
          .json({ message: "Error retrieving conversion rate." });
      }

      const totalOutputRequired = Number(balance) * conversionRate;

      console.log(totalOutputRequired);

      // 5. Validar saldo suficiente
      if (Number(cryptoWalletOutput.balance) < totalOutputRequired) {
        await transaction.rollback();
        return res
          .status(400)
          .json({ message: "Insufficient balance in output wallet." });
      }

      // 6. Atualizar saldos
      cryptoWalletOutput.balance -= totalOutputRequired;
      await cryptoWalletOutput.save({ transaction });

      if (cryptoWalletInput) {
        cryptoWalletInput.balance =
          Number(balance) + Number(cryptoWalletInput.balance);
        await cryptoWalletInput.save({ transaction });
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
};

export default TransactionController;
