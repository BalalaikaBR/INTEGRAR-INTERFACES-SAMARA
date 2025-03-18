const Professor = require("../models/professor");

const criarProfessor = async (req, res) => {
  const { nome, idade, disciplinasIds } = req.body;

  try {
    const novoProfessor = new Professor({
      nome,
      idade,
      disciplinas: disciplinasIds
    });

    await novoProfessor.save();

    res.json({
      message: "Professor criado com sucesso!",
      professor: novoProfessor,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message + `Não foi possivel criar o professor` });
  }
};

const obterTodosProfessores = async (req, res) => {

  try {
    const professores = await Professor.find().populate('disciplinas');
    res.json(professores);
  } catch (err) {
    res
      .status(404)
      .json({ message: err.message + `Não foi possivel obter os professores` });
  }
};

const deletarProfessor = async (req, res) => {
  const { id } = req.params;
  try {
    await Professor.deleteOne({ _id: id });
    res.json({ message: "Professor removido com sucesso!" });
  } catch (err) {
    res
      .status(404)
      .json({ message: err.message + `Não foi possivel deletar o professor` });
  }
};

const editarProfessor = async (req, res) => {
  const { id } = req.params;
  const { nome, idade, disciplinasIds } = req.body;

  try {
    let professor = await Professor.findByIdAndUpdate(id, { nome, idade, disciplinas: disciplinasIds });
    res.status(200).json({
      message: "Professor atualizado com sucesso!",
      professor,
    });
  } catch (err) {
    res
      .status(404)
      .json({ message: err.message + `Não foi possivel editar o professor` });
  }
};

module.exports = {
  criarProfessor,
  obterTodosProfessores,
  deletarProfessor,
  editarProfessor,
};

//faz o L