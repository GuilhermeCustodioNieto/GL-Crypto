import sequelize from "../config/connection.js";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Wallet from "../models/Wallet.js";
import transporter from "../config/Transporter.js";

dotenv.config();

const userAuthController = {
  register: async (req, res) => {
    try {
      const {
        personalName,
        age,
        rg,
        cpf,
        email,
        userPassword,
        secondPassword,
      } = req.body;

      const query = await User.findOne({ where: { email: email } });
      if (query) {
        return res.status(409).json("The user already exists on the system.");
      }

      if (userPassword !== secondPassword) {
        console.log(userPassword);
        console.log(secondPassword);

        return res.status(400).json("The passwords aren't equals.");
      } else if (age < 18) {
        return res.status(403).json("age is less than eighteen (18) years");
      }

      const newPassword = await bcryptjs.hash(userPassword, 10);

      const wallet = await Wallet.create({});

      const user = await User.create({
        personalName,
        age,
        rg,
        cpf,
        email,
        userPassword: newPassword,
        walletId: wallet.id,
      });

      const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Bem-Vindo ao GL_Crypto!",
        text: `
          <h1>Seja bem-vindo ao site GL-Crypto!</h1>
          <p>Seja bem vindo ${personalName} ao GL-Crypto, sua carteira de criptomoedas mais confiável.</p>
          <p>Aqui você pode comprar, vender e fazer transações diversas com aas suas cryptos.<br> Sinta-se livre para utilizar do sistema como um todo! <br></p>
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("email enviado com sucesso");
        }
      });

      return res.status(201).json(user);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on register a new user", err: err });
      console.log(err);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });

      console.log(user);

      if (!user || !(await bcryptjs.compare(password, user.userPassword))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "12h",
      });

      res.json({ message: "Login sucessful", token });
    } catch (err) {
      res.status(500).json({ message: "Error on login", err });
    }
  },
};

const adminAuthController = {
  register: async (req, res) => {
    try {
      const {
        personalName,
        age,
        rg,
        cpf,
        email,
        userPassword,
        secondPassword,
      } = req.body;

      const query = await User.findOne({ where: { email: email } });
      if (query) {
        return res.status(409).json("The admin already exists on the system.");
      }

      if (userPassword !== secondPassword) {
        return res.status(400).json("The passwords aren't equals.");
      } else if (age < 18) {
        return res.status(403).json("age is less than eighteen (18) years");
      }

      const newPassword = await bcryptjs.hash(userPassword, 10);
      const user = await User.create({
        personalName,
        age,
        rg,
        cpf,
        email,
        userPassword: newPassword,
      });
      return res.status(201).json(user);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on register a new admin", err: err });
      console.log(err);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });

      console.log(user);

      if (!user || !(await bcryptjs.compare(password, user.userPassword))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "12h",
      });

      res.json({ message: "Login sucessful", token });
    } catch (err) {
      res.status(500).json({ message: "Error on login", err });
    }
  },
};

export { userAuthController, adminAuthController };
