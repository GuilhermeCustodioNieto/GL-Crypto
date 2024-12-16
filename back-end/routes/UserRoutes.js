import express from "express";
const UserRoutes = express.Router();
import UserController from "../controllers/UserController.js";
import { userMiddleware } from "./middlewares/authMiddleware.js";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Gerenciamento de usuários e suas informações
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [User]
 *     summary: Retorna todos os usuários
 *     responses:
 *       200:
 *         description: Lista de todos os usuários
 *       500:
 *         description: Erro inesperado no sistema
 */
UserRoutes.get("/", UserController.findAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [User]
 *     summary: Retorna um usuário pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro inesperado no sistema
 */
UserRoutes.get("/:id", userMiddleware, UserController.findById);

/**
 * @swagger
 * /users/getAllData/{id}:
 *   get:
 *     tags: [User]
 *     summary: Retorna todos os dados de um usuário, incluindo carteiras e criptomoedas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do usuário encontrados
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro inesperado no sistema
 */
UserRoutes.get("/getAllData/:id", userMiddleware, UserController.getAllData);

export default UserRoutes;
