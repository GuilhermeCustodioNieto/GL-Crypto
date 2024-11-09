import sequelize from "../config/connection.js";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userAuthController = {
  register: async (req, res) => {
    try {
      const { name, age, rg, cpf, email, password, secondPassword } = req.body;

      const query = await User.findOne({ where: { email: email } });
      if (query) {
        return res.status(409).json("The user already exists on the system.");
      }

      if (password !== secondPassword) {
        return res.status(400).json("The passwords aren't equals.");
      } else if (age < 18) {
        return res.status(403).json("age is less than eighteen (18) years")
      }

      const newPassword = await bcryptjs.hash(password, 10);

      const user = await User.create({
        name,
        age,
        rg,
        cpf,
        email,
        password: newPassword,
      });
      return res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: "Error on register a new user", err });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });

      if (!user || (await bcryptjs.compare(password, user.password))) {
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
