import express from "express";
import WalletController from "../controllers/WalletController.js";
const WalletsRouter = express.Router();
import { userMiddleware } from "./middlewares/authMiddleware.js";

/**
 * @swagger
 * tags:
 *   name: Wallet
 *   description: Rota de gerenciamento de carteira geral.
 */

/**
 * @swagger
 * /wallets:
 *   get:
 *     tags: [Wallet]
 *     summary: Retorna todos os registros de carteiras
 *     responses:
 *       202:
 *         description: Busca realizada com sucesso
 *       500:
 *         description: Erro inesperado ocorreu no sistema
 */
WalletsRouter.get("/", WalletController.findAll);

/**
 * @swagger
 * /wallets/{id}:
 *   get:
 *     tags: [Wallet]
 *     summary: Retorna uma carteira pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da carteira
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carteira encontrada
 *       404:
 *         description: Carteira não encontrada
 *       500:
 *         description: Erro inesperado ocorreu no sistema
 */
WalletsRouter.get("/:id", userMiddleware, WalletController.findByid);

/**
 * @swagger
 * /wallets:
 *   post:
 *     tags: [Wallet]
 *     summary: Cria uma nova carteira
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Aqui você pode adicionar propriedades se necessário
 *     responses:
 *       201:
 *         description: Carteira criada com sucesso
 *       500:
 *         description: Erro ao criar a carteira
 */
WalletsRouter.post("/", WalletController.create);

/**
 * @swagger
 * /wallets/{id}:
 *   delete:
 *     tags: [Wallet]
 *     summary: Remove uma carteira pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da carteira a ser removida
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Carteira removida com sucesso
 *       404:
 *         description: Carteira não encontrada
 *       500:
 *         description: Erro ao remover a carteira
 */
WalletsRouter.delete("/:id", userMiddleware, WalletController.delete);

export default WalletsRouter;
