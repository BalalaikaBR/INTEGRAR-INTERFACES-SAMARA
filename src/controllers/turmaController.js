const Turma = require("../models/turma");

const criarTurma = async (req, res) => {
  const { nome, alunosIds, professorId } = req.body;

  try {
    const novaTurma = new Turma({
      nome,
      alunos: alunosIds,
      professor: professorId,
    });

    await novaTurma.save();

    res.json({
      message: "Turma criada com sucesso!",
      turma: novaTurma,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message + `Não foi possivel criar a turma` });
  }
};

const obterTodasTurmas = async (req, res) => {
  try {
    const turmas = await Turma.find().populate('alunos professor');
    res.json(turmas);
  } catch (err) {
    res
      .status(404)
      .json({ message: err.message + `Não foi possivel obter as turmas` });
  }
};

const deletarTurma = async (req, res) => {
  const { id } = req.params;

  try {
    await Turma.deleteOne({ _id: id });
    res.json({ message: "Turma removida com sucesso!" });
  } catch (err) {
    res
      .status(404)
      .json({ message: err.message + `Não foi possivel deletar a turma` });
  }
};

const editarTurma = async (req, res) => {
  const { id } = req.params;
  const { nome, alunosIds, professorId } = req.body;

  try {
    let turma = await Turma.findByIdAndUpdate(id, { nome, alunos: alunosIds, professor: professorId });
    res.status(200).json({
      message: "Turma atualizada com sucesso!",
      turma,
    });
  } catch (err) {
    res
      .status(404)
      .json({ message: err.message + `Não foi possivel editar a turma` });
  }
};

module.exports = {
  criarTurma,
  obterTodasTurmas,
  deletarTurma,
  editarTurma
};

