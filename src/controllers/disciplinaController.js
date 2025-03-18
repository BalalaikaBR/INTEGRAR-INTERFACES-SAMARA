const Disciplina = require("../models/disciplina");

const criarDisciplina = async (req, res) => {
  const { nome, descricao, dataInicio, dataFim, tarefasIds } = req.body;

  try {
    const novaDisciplina = new Disciplina({
      nome,
      descricao,
      dataInicio,
      dataFim,
      tarefas: tarefasIds,
    });

    await novaDisciplina.save();

    // Atualiza as tarefas associadas à disciplina
    await Tarefa.updateMany(
      { _id: { $in: tarefasIds } },
      { $push: { disciplinas: novaDisciplina._id } }
    );

    res.json({
      message: "Disciplina criada com sucesso!",
      disciplina: novaDisciplina,
    });
  } catch (err) {
    res.status(500).json({ message: err.message + `Não foi possivel criar a disciplina` });
  }
};

const obterTodasDisciplinas = async (req, res) => {
  try {
    const disciplinas = await Disciplina.find().populate('tarefas');
    res.json(disciplinas);
  } catch (err) {
    res
      .status(404)
      .json({ message: err.message + `Não foi possivel obter as disciplinas` });
  }
};

const deletarDisciplina = async (req, res) => {
  const { id } = req.params;

  try {
    await Disciplina.deleteOne({ _id: id });
    res.json({ message: "Disciplina removida com sucesso!" });
  } catch (err) {
    res
      .status(404)
      .json({ message: err.message + `Não foi possivel deletar a disciplina` });
  }
};

const editarDisciplina = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, dataInicio, dataFim, tarefasIds } = req.body;

  try {
    let disciplina = await Disciplina.findByIdAndUpdate(id, { nome, descricao, dataInicio, dataFim, tarefas: tarefasIds });
    res.status(200).json({
      message: "Disciplina atualizada com sucesso!",
      disciplina,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message + `Não foi possivel editar a disciplina` });
  }
};

module.exports = {
  criarDisciplina,
  obterTodasDisciplinas,
  deletarDisciplina,
  editarDisciplina,
};
