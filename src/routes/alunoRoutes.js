const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController.js");
const authToken = require('../middleware/authMiddleware');

router.get("/aluno", authToken, alunoController.obterTodosAlunos);
router.post("/aluno", alunoController.criarAluno);
router.delete("/aluno/:id", authToken, alunoController.deletarAluno);
router.put("/aluno/:id", authToken, alunoController.editarAluno);

module.exports = router;