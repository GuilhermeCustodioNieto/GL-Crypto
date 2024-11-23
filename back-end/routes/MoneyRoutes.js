import express from "express";
const MoneyRoutes = express.Router();
import MoneyController from "../controllers/money/MoneyController.js";
import CryptoController from "../controllers/money/CryptoController.js";
import RealMoneyController from "../controllers/money/RealMoneyController.js";

/**
 * @swagger
 * /money/cryptos:
 *   get:
 *     tags: [Money]
 *     summary: Retorna todos os dados de criptomoedas
 *     responses:
 *       200:
 *         description: Busca realizada com sucesso
 *       500:
 *         description: Erro inesperado ocorreu no sistema
 */
MoneyRoutes.get("/cryptos", CryptoController.getAllCryptos);

/**
 * @swagger
 * /money/cryptos/{id}:
 *   get:
 *     tags: [Money]
 *     summary: Retorna dados da criptomoeda pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da criptomoeda
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Criptomoeda encontrada
 *       404:
 *         description: Criptomoeda não encontrada
 *       500:
 *         description: Erro inesperado ocorreu no sistema
 */
MoneyRoutes.get("/cryptos/:id", CryptoController.getById);

/**
 * @swagger
 * /money/cryptos:
 *   post:
 *     tags: [Money]
 *     summary: Cria uma nova criptomoeda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               abbreviation:
 *                 type: string
 *               author:
 *                 type: string
 *               valueInDollar:
 *                 type: number
 *     responses:
 *       201:
 *         description: Criptomoeda criada com sucesso
 *       500:
 *         description: Erro ao criar a criptomoeda
 */
MoneyRoutes.post("/cryptos", CryptoController.createNewCrypto);

/**
 * @swagger
 * /money/cryptos/{id}:
 *   put:
 *     tags: [Money]
 *     summary: Atualiza uma criptomoeda existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da criptomoeda a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *               author:
 *                 type: string
 *               valueInDollar:
 *                 type: number
 *               name:
 *                 type: string
 *               abbreviation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Criptomoeda atualizada com sucesso
 *       404:
 *         description: Criptomoeda não encontrada
 *       500:
 *         description: Erro ao atualizar a criptomoeda
 */
MoneyRoutes.put("/cryptos/:id", CryptoController.updateCrypto);

/**
 * @swagger
 * /money/cryptos/{id}:
 *   delete:
 *     tags: [Money]
 *     summary: Remove uma criptomoeda existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da criptomoeda a ser removida
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Criptomoeda removida com sucesso
 *       404:
 *         description: Criptomoeda não encontrada
 *       500:
 *         description: Erro ao remover a criptomoeda
 */
MoneyRoutes.delete("/cryptos/:id", CryptoController.deleteCrypto);

/**
 * @swagger
 * /money/realMoney:
 *   get:
 *     tags: [Money]
 *     summary: Retorna todos os dados de dinheiro real
 *     responses:
 *       200:
 *         description: Busca realizada com sucesso
 *       500:
 *         description: Erro inesperado ocorreu no sistema
 */
MoneyRoutes.get("/realMoney", RealMoneyController.getAllRealMoney);

/**
 * @swagger
 * /money/realMoney/{id}:
 *   get:
 *     tags: [Money]
 *     summary: Retorna dados do dinheiro real pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do dinheiro real
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dinheiro real encontrado
 *       404:
 *         description: Dinheiro real não encontrado
 *       500:
 *         description: Erro inesperado ocorreu no sistema
 */
MoneyRoutes.get("/realMoney/:id", RealMoneyController.getById);

/**
 * @swagger
 * /money/realMoney:
 *   post:
 *     tags: [Money]
 *     summary: Cria um novo registro de dinheiro real
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *               abbreviation:
 *                 type: string
 *               value:
 *                 type: number
 *               symbol:
 *                 type: string
 *     responses:
 *       201:
 *         description: Dinheiro real criado com sucesso
 *       500:
 *         description: Erro ao criar o dinheiro real
 */
MoneyRoutes.post("/realMoney", RealMoneyController.createNewRealMoney);

/**
 * @swagger
 * /money/realMoney/{id}:
 *   put:
 *     tags: [Money]
 *     summary: Atualiza um registro de dinheiro real existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do dinheiro real a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               country:
 *                 type: string
 *               value:
 *                 type: number
 *               symbol:
 *                 type: string
 *               name:
 *                 type: string
 *               abbreviation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dinheiro real atualizado com sucesso
 *       404:
 *         description: Dinheiro real não encontrado
 *       500:
 *         description: Erro ao atualizar o dinheiro real
 */
MoneyRoutes.put("/realMoney/:id", RealMoneyController.updateRealMoney);

/**
 * @swagger
 * /money/realMoney/{id}:
 *   delete:
 *     tags: [Money]
 *     summary: Remove um registro de dinheiro real existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do dinheiro real a ser removido
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Dinheiro real removido com sucesso
 *       404:
 *         description: Dinheiro real não encontrado
 *       500:
 *         description: Erro ao remover o dinheiro real
 */
MoneyRoutes.delete("/realMoney/:id", RealMoneyController.deleteRealMoney);

/**
 * @swagger
 * tags:
 *   name: Money
 *   description: Rota para o gerenciamento das Moneys.
 */

/**
 * @swagger
 * /money:
 *   get:
 *     tags: [Money]
 *     summary: Retorna os dados de todas as moneys
 *     responses:
 *       200:
 *         description: Busca realizada com sucesso
 *       500:
 *         description: Erro inesperado ocorreu no sistema
 */
MoneyRoutes.get("/", MoneyController.getAllMoney);

/**
 * @swagger
 * /money/{id}:
 *   get:
 *     tags: [Money]
 *     summary: Retorna um item de dinheiro pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do item de dinheiro
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item de dinheiro encontrado
 *       404:
 *         description: Item de dinheiro não encontrado
 *       500:
 *         description: Erro inesperado ocorreu no sistema
 */
MoneyRoutes.get("/:id", MoneyController.getById);

export default MoneyRoutes;
