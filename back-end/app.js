import express from "express";
import sequelize from "./config/connection.js";
import UserRoutes from "./routes/UserRoutes.js";
import MoneyRoutes from "./routes/MoneyRoutes.js";

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

app.use("/users", UserRoutes);
app.use("/money", MoneyRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
