const mongoose = require("mongoose");
require("dotenv").config();
const dbURL =
  process.env.DATABASE_URL || "mongodb://localhost:27017/Avaliacao1";

//const server = 'localhost:27017'; // COLOQUE O NOME DO SEU SERVIDOR DO BANCO DE DADOS
//const database = 'avaliacao1';      // COLOQUE O NOME DO SEU BANCO DE DADOS

const dbConnect = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Conectado ao banco de dados!`);
  } catch (err) {
    console.error(`Não foi possível conectar:  ${err}`);
  }
};

module.exports = dbConnect;