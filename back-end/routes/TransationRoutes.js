import express from "express";
import TransationController from "../controllers/TransationController.js";
import { userMiddleware } from "./middlewares/authMiddleware.js";

const TransationRoutes = express.Router();

TransationRoutes.post("/buy", TransationController.purchaseCrypto);
TransationRoutes.post("/sell", TransationController.sellCrypto);
TransationRoutes.post(
  "/convert",
  TransationController.convertBetweenCurrencies
);
TransationRoutes.post("/deposit", TransationController.depositRealMoney);
TransationRoutes.get("/get-history", TransationController.getAllTransactions);

/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Operações de transações financeiras, como compra, venda, conversão e depósito de criptomoedas
 */

/**
 * @swagger
 * /transaction/buy:
 *   post:
 *     tags: [Transaction]
 *     summary: Realiza a compra de criptomoeda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idMoneyInput:
 *                 type: integer
 *               idUser:
 *                 type: integer
 *               balance:
 *                 type: number
 *               idMoneyOutput:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Transação de compra realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaction successful."
 *                 wallet:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     cryptoWallets:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           balance:
 *                             type: number
 *       400:
 *         description: Parâmetros ausentes ou saldo insuficiente
 *       404:
 *         description: Usuário ou carteiras não encontradas
 *       500:
 *         description: Erro ao processar a transação
 */

/**
 * @swagger
 * /transaction/sell:
 *   post:
 *     tags: [Transaction]
 *     summary: Realiza a venda de criptomoeda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idMoneySell:
 *                 type: integer
 *               idUser:
 *                 type: integer
 *               amountToSell:
 *                 type: number
 *               idMoneyReceive:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Transação de venda realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sell transaction successful."
 *                 wallet:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     cryptoWallets:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           balance:
 *                             type: number
 *       400:
 *         description: Parâmetros ausentes ou saldo insuficiente
 *       404:
 *         description: Usuário ou carteiras não encontradas
 *       500:
 *         description: Erro ao processar a transação
 */

/**
 * @swagger
 * /transaction/convert:
 *   post:
 *     tags: [Transaction]
 *     summary: Realiza a conversão entre duas criptomoedas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idMoneyInput:
 *                 type: integer
 *               idMoneyOutput:
 *                 type: integer
 *               balance:
 *                 type: number
 *     responses:
 *       200:
 *         description: Conversão realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 converted-value:
 *                   type: number
 *       404:
 *         description: Moeda de entrada ou saída não encontrada
 *       500:
 *         description: Erro ao processar a conversão
 */

/**
 * @swagger
 * /transaction/deposit:
 *   post:
 *     tags: [Transaction]
 *     summary: Realiza um depósito em dinheiro real
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               balance:
 *                 type: number
 *               RealMoneyId:
 *                 type: integer
 *               idUser:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Depósito realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Deposit successful."
 *                 wallet:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     cryptoWallets:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           balance:
 *                             type: number
 *       400:
 *         description: Parâmetros ausentes
 *       404:
 *         description: Usuário ou tipo de moeda não encontrado
 *       500:
 *         description: Erro ao processar o depósito
 */

/**
 * @swagger
 * /transaction/get-history:
 *   get:
 *     tags: [Transaction]
 *     summary: Retorna o histórico de transações do usuário
 *     responses:
 *       200:
 *         description: Histórico de transações retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   amount:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *                   tipoTransacao:
 *                     type: string
 *                   money:
 *                     type: object
 *                     properties:
 *                       abbreviation:
 *                         type: string
 *                   paymentMoney:
 *                     type: object
 *                     properties:
 *                       abbreviation:
 *                         type: string
 *                   sender:
 *                     type: object
 *                     properties:
 *                       personalName:
 *                         type: string
 *                   receiverUser:
 *                     type: object
 *                     properties:
 *                       personalName:
 *                         type: string
 *       500:
 *         description: Erro ao recuperar o histórico de transações
 */

export default TransationRoutes;
