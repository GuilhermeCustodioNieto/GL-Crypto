import Crypto from "../models/cryptos/Crypto.js";
import CryptoWallet from "../models/CryptoWallet.js";
import Wallet from "../models/Wallet.js";
import sequelize from "../config/connection.js";
import User from "../models/User.js";

const TransactionController = {
  purchaseCrypto: async (req, res) => {
    const transaction = await sequelize.transaction(); // Inicia uma transação
    try {
      const { idCryptoInput, idUser, balance, idCryptoOutput } = req.body;

      if (!idCryptoInput || !idUser || !balance | idCryptoOutput) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      const user = await User.findByPk(idUser, {
        include: [{ model: Wallet, as: "wallet" }],
        transaction,
      });

      if (!user || !user.wallet) {
        await transaction.rollback();
        return res.status(404).json({ message: "User or wallet not found." });
      }

      let wallet = await Wallet.findByPk(user.walletId, {
        include: [{ model: CryptoWallet, as: "cryptoWallets" }],
      });

      const cryptoInput = await Crypto.findByPk(idCryptoInput, { transaction });
      const cryptoOutput = await Crypto.findByPk(idCryptoOutput, {
        transaction,
      });

      if (!cryptoInput) {
        await transaction.rollback();
        return res.status(404).json({ message: "Crypto not found." });
      }

      const existingCryptoWallet = await CryptoWallet.findOne({
        where: {
          walletId: wallet.id,
          moneyTypeId: idCryptoInput,
        },
        transaction,
      });

      if (existingCryptoWallet) {
        // Atualiza valores se já existir a CryptoWallet
        const newBalance =
          Number(balance) + Number(existingCryptoWallet.balance);
        const totalInDollar = Number(crypto.valueInDollar) * newBalance;

        await existingCryptoWallet.update(
          {
            lastPurchase: new Date().toISOString(),
            balance: newBalance,
            totalInDollar: totalInDollar,
          },
          { transaction }
        );

        await transaction.commit();

        wallet = await Wallet.findByPk(user.walletId, {
          include: [{ model: CryptoWallet, as: "cryptoWallets" }],
        });
        return res.status(201).json({
          message: "The transaction was successful",
          wallet: wallet,
        });
      }

      // Cria uma nova CryptoWallet
      const totalInDollar = Number(crypto.valueInDollar) * balance;

      await CryptoWallet.create(
        {
          lastPurchase: new Date().toISOString(),
          balance: balance,
          totalInDollar: totalInDollar,
          moneyTypeId: crypto.id,
          walletId: wallet.id,
        },
        { transaction }
      );

      await transaction.commit();

      wallet = await Wallet.findByPk(user.walletId, {
        include: [{ model: CryptoWallet, as: "cryptoWallets" }],
      });

      return res.status(201).json({
        message: "New crypto has been added to the Wallet",
        wallet: wallet,
      });
    } catch (err) {
      await transaction.rollback();
      console.error("Error on purchaseCrypto:", err);
      res
        .status(500)
        .json({ message: "Error when purchasing crypto", error: err.message });
    }
  },
  sellCrypto: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { idCrypto, idUser, balance } = req.body;

      if (!idCrypto || !idWallet || !balance) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      const user = await User.findByPk(req.params.id, {
        include: {
          model: Wallet,
          as: "wallet",
        },
        transaction,
      });

      let wallet = user.wallet;

      const crypto = await Crypto.findByPk(idCrypto, { transaction });

      if (!wallet || !crypto) {
        await transaction.rollback();
        return res.status(404).json({ message: "Wallet or Crypto not found." });
      }

      const existingCryptoWallet = wallet.cryptoWallets.find(
        (cryptoWallet) => cryptoWallet.moneyTypeId === crypto.id
      );

      if (existingCryptoWallet) {
        if (Number(balance) > existingCryptoWallet.balance) {
          return res.status(401).json({
            message:
              "The user is trying to sell a greater amount than he has in his wallet",
          });
        }

        const newBalance =
          Number(existingCryptoWallet.balance) - Number(balance);
        const totalInDollar = Number(crypto.valueInDollar) * newBalance;

        await existingCryptoWallet.update(
          {
            lastPurchase: new Date().toISOString(),
            balance: newBalance,
            totalInDollar: totalInDollar,
          },
          { transaction }
        );

        await transaction.commit();
        return res.status(201).json({
          message: "The transaction was successful",
          wallet: wallet,
        });
      }

      const totalInDollar = Number(crypto.valueInDollar) * balance;

      await CryptoWallet.create(
        {
          lastPurchase: new Date().toISOString(),
          balance: balance,
          totalInDollar: totalInDollar,
          moneyTypeId: crypto.id,
          walletId: idWallet,
        },
        { transaction }
      );

      wallet = await Wallet.findByPk(idWallet, {
        include: [{ model: CryptoWallet, as: "cryptoWallets" }],
        transaction,
      });

      await transaction.commit();

      return res.status(201).json({
        message: "New crypto has been added to the Wallet",
        wallet: wallet,
      });
    } catch (err) {
      await transaction.rollback();
      console.error("Error on purchaseCrypto:", err);
      res
        .status(500)
        .json({ message: "Error when purchasing crypto", error: err.message });
    }
  },
};

export default TransactionController;
