const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConnect = require("../database/db");
const authToken = require('../middleware/authMiddleware');
const aluno = require("../routes/alunoRoutes");
const disciplina = require("../routes/disciplinaRoutes");
const perfil = require("../routes/perfilRoutes");
const professor = require("../routes/professorRoutes");
const tarefa = require("../routes/tarefaRoutes");
const turma = require("../routes/turmaRoutes");

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors("*"));
dbConnect();

app.use("/aluno", aluno);
app.use("/disciplina", disciplina);
app.use("/perfil", perfil);
app.use("/professor", professor);
app.use("/tarefa", tarefa);
app.use("/turma", turma);

PORT = process.env.PORT;

app.get("/", (req, res) => {
    try {
        console.log("Aleluia Deus é bom");
    } catch (err) {
        throw new errors.UnexpectedError(err);
    }
});

module.exports = app;