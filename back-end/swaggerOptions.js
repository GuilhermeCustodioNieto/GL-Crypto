import swaggerJSDoc from "swagger-jsdoc";

const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: "Crypto GL Api",
                version: "1.0.0",
                description: 'API completa para um site de criptomoedas'
            }
        },
        apis: ['./routes/*.js']
}

const swaggerSpects = swaggerJSDoc(options)

export default swaggerSpects