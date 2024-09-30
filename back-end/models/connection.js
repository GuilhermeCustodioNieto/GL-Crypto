const mysql = require("mysql");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "dbCrypto",
});

connection.getConnection(err).then((err) => {
  if (err != null) {
    console.log(err);
  } else {
    console.log(`the connection is a sucessful `);
  }
});

module.exports = connection;
