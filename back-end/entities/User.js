const express = require("express");

let User = {
  name: String,
  age: Number,
  rg: String,
  cpf: String,
  email: String,
  password: String,

  constructor(name, age, rg, cpf, email, password) {
    (this.name = name),
      (this.age = age),
      (this.rg = rg),
      (this.cpf = cpf),
      (this.email = email),
      (this.password = password);
  },
};

exports User;
