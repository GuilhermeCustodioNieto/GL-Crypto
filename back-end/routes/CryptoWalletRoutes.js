import express from "express";
import CryptoWalletController from "../controllers/CryptoWalletController.js";
import { userMiddleware } from "./middlewares/authMiddleware.js";
const CryptoWalletRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: CryptoWallet
 *   description: Gerenciamento de carteiras de criptomoedas
 */

/**
 * @swagger
 * /crypto-wallet:
 *   get:
 *     tags: [CryptoWallet]
 *     summary: Retorna todas as carteiras de criptomoedas
 *     responses:
 *       200:
 *         description: Lista de carteiras de criptomoedas recuperada com sucesso
 *       500:
 *         description: Erro inesperado no servidor
 */
CryptoWalletRoutes.get("/", CryptoWalletController.findAll);

/**
 * @swagger
 * /crypto-wallet/{id}:
 *   get:
 *     tags: [CryptoWallet]
 *     summary: Retorna uma carteira de criptomoedas específica pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da carteira de criptomoedas
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carteira de criptomoedas encontrada com sucesso
 *       404:
 *         description: Carteira de criptomoedas não encontrada
 *       500:
 *         description: Erro inesperado no servidor
 */
CryptoWalletRoutes.get("/:id", userMiddleware, CryptoWalletController.findById);

/**
 * @swagger
 * /crypto-wallet:
 *   post:
 *     tags: [CryptoWallet]
 *     summary: Cria uma nova carteira de criptomoedas
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
  userMiddleware,
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
  userMiddleware,
  CryptoWalletController.deleteCryptoWallet
);

export default CryptoWalletRoutes;
