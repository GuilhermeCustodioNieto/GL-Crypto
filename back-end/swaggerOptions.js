import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crypto GL Api",
      version: "1.0.0",
      description:
        "API completa para um site estudantil de criptomoedas promovido pela Etec Cidade Tiradentes, e pelos estudantes Guilherme Custódio Nieto e Lucas Caribé Araújo",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpects = swaggerJSDoc(options);

export default swaggerSpects;
