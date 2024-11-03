import User from "../models/User.js";

const UserController = {
  findUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuários", error: err });
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = await User.create({ name, email, password });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ message: "Erro ao criar usuário", err: err });
    }
  },
};

export default UserController;
