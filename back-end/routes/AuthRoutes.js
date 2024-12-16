import e from "express";
import {
  userAuthController,
  adminAuthController,
} from "../controllers/AuthController.js";
const AuthRoutes = e.Router();

AuthRoutes.post("/user/login", userAuthController.login);
AuthRoutes.post("/user/register", userAuthController.register);

AuthRoutes.post("/admin/login", adminAuthController.login);
AuthRoutes.post("/admin/register", adminAuthController.register);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Operações de autenticação para usuários e administradores
 */

/**
 * @swagger
 * /auth/user/login:
 *   post:
 *     tags: [Auth]
 *     summary: Realiza login de um usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 returnData:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     idUser:
 *                       type: string
 *       401:
 *         description: Email ou senha inválidos
 *       500:
 *         description: Erro no sistema
 */

/**
 * @swagger
 * /auth/user/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registra um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personalName:
 *                 type: string
 *               age:
 *                 type: integer
 *               rg:
 *                 type: string
 *               cpf:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               userPassword:
 *                 type: string
 *               secondPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 personalName:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 email:
 *                   type: string
 *       400:
 *         description: Senhas não coincidem
 *       403:
 *         description: Idade menor que 18 anos
 *       409:
 *         description: O usuário já existe no sistema
 *       500:
 *         description: Erro ao registrar o usuário
 */

/**
 * @swagger
 * /auth/admin/login:
 *   post:
 *     tags: [Auth]
 *     summary: Realiza login de um administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Email ou senha inválidos
 *       500:
 *         description: Erro no sistema
 */

/**
 * @swagger
 * /auth/admin/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registra um novo administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personalName:
 *                 type: string
 *               age:
 *                 type: integer
 *               rg:
 *                 type: string
 *               cpf:
 *                 type: string
 *               email:
 *                 type: string
 *               userPassword:
 *                 type: string
 *               secondPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: Administrador registrado com sucesso
 *       400:
 *         description: Senhas não coincidem
 *       403:
 *         description: Idade menor que 18 anos
 *       409:
 *         description: O administrador já existe no sistema
 *       500:
 *         description: Erro ao registrar o administrador
 */

export default AuthRoutes;
