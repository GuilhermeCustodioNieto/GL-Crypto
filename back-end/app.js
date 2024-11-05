import express from "express";
import sequelize from "./config/connection.js";
import swaggerSpects from "./swaggerOptions.js";
import swaggerUI from "swagger-ui-express";
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

app.use("/auth", AuthRoutes);
app.use("/users", UserRoutes);
app.use("/money", MoneyRoutes);
app.use("/crypto-wallet", CryptoWalletRoutes);
app.use("/wallets", walletsRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpects));


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
