import express from "express";
import CryptoWalletController from "../controllers/CryptoWalletController.js";
import authMiddleware from "./middlewares/authMiddleware.js";
const CryptoWalletRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: CryptoWallet
 *   description: Rota de gerenciamento de carteira específica para o Money
 */

/**
 * @swagger
 * /crypto-wallet:
 *   get:
 *     tags: [CryptoWallet]
 *     summary: Retorna todos os registros de carteiras de criptomoedas
 *     responses:
 *       200:
 *         description: Busca realizada com sucesso
 *       500:
 *         description: Erro inesperado ocorreu no sistema
 */
CryptoWalletRoutes.get("/", CryptoWalletController.findAll);

/**
 * @swagger
 * /crypto-wallet/{id}:
 *   get:
 *     tags: [CryptoWallet]
 *     summary: Retorna uma carteira de criptomoedas pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da carteira de criptomoedas
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carteira de criptomoedas encontrada
 *       404:
 *         description: Carteira de criptomoedas não encontrada
 *       500:
 *         description: Erro inesperado ocorreu no sistema
 */
CryptoWalletRoutes.get("/:id", authMiddleware, CryptoWalletController.findById);

/**
 * @swagger
 * /crypto-wallet:
 *   post:
 *     tags: [CryptoWallet]
 *     summary: Cria uma nova carteira de criptomoedas na carteira geral descrita. Necessário que a carteira geral exista.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lastPurchase:
 *                 type: string
 *                 format: date-time
 *               balance:
 *                 type: number
 *               totalInDollar:
 *                 type: number
 *               moneyTypeId:
 *                 type: string
 *               walletId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Carteira de criptomoedas criada com sucesso
 *       500:
 *         description: Erro ao criar a carteira de criptomoedas
 */
CryptoWalletRoutes.post("/", CryptoWalletController.createNewCryptoWallet);

/**
 * @swagger
 * /crypto-wallet/{id}:
 *   put:
 *     tags: [CryptoWallet]
 *     summary: Atualiza uma carteira de criptomoedas existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da carteira de criptomoedas a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lastPurchase:
 *                 type: string
 *                 format: date-time
 *               balance:
 *                 type: number
 *               totalInDollar:
 *                 type: number
 *               moneyTypeId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Carteira de criptomoedas atualizada com sucesso
 *       404:
 *         description: Carteira de criptomoedas não encontrada
 *       500:
 *         description: Erro ao atualizar a carteira de criptomoedas
 */
CryptoWalletRoutes.put(
  "/:id",
  authMiddleware,
  CryptoWalletController.updateCryptoWallet
);

/**
 * @swagger
 * /crypto-wallet/{id}:
 *   delete:
 *     tags: [CryptoWallet]
 *     summary: Remove uma carteira de criptomoedas existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da carteira de criptomoedas a ser removida
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Carteira de criptomoedas removida com sucesso
 *       404:
 *         description: Carteira de criptomoedas não encontrada
 *       500:
 *         description: Erro ao remover a carteira de criptomoedas
 */
CryptoWalletRoutes.delete(
  "/:id",
  authMiddleware,
  CryptoWalletController.deleteCryptoWallet
);

export default CryptoWalletRoutes;
