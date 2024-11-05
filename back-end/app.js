import express from "express";
import sequelize from "./config/connection.js";
<<<<<<< Updated upstream
=======
import swaggerSpects from "./swaggerOptions.js";
import swaggerUI from "swagger-ui-express";
>>>>>>> Stashed changes
import UserRoutes from "./routes/UserRoutes.js";
import MoneyRoutes from "./routes/MoneyRoutes.js";
import CryptoWalletRoutes from "./routes/CryptoWalletRoutes.js";
import "./models/association.js";
import walletsRouter from "./routes/WalletRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log("Banco de dados sincronizado com sucesso");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco de dados", err);
  });

<<<<<<< Updated upstream
=======
app.use("/auth", AuthRoutes);
>>>>>>> Stashed changes
app.use("/users", UserRoutes);
app.use("/money", MoneyRoutes);
app.use("/crypto-wallet", CryptoWalletRoutes);
app.use("/wallets", walletsRouter);
<<<<<<< Updated upstream
=======
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpects));
>>>>>>> Stashed changes

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
