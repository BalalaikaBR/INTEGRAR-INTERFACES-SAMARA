const Perfil = require("../models/perfil");

const criarPerfil = async (req, res) => {
  const { matricula, telefone, endereco, alunoId } = req.body;

  try {
    const novoPerfil = new Perfil({
      matricula,
      telefone,
      endereco,
      aluno: alunoId,
    });

    await novoPerfil.save();

    await Aluno.updateOne(
      { _id: alunoId },
      { $set: { perfil: novoPerfil._id } }
    );

    res.json({
      message: "Perfil criado com sucesso!",
      perfil: novoPerfil,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message + `Não foi possivel criar o perfil` });
  }
};

const obterTodosPerfis = async (req, res) => {
  try {
    const perfis = await Perfil.find().populate('aluno');
    res.json(perfis);
  } catch (err) {
    res
      .status(404)
      .json({ message: err.message + `Não foi possivel obter os perfis` });
  }
};

const deletarPerfil = async (req, res) => {
  const { id } = req.params;

  try {
    await Perfil.deleteOne({ _id: id });
    res.json({ message: "Perfil removido com sucesso!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message + `Não foi possivel deletar o perfil` });
  }
};

const editarPerfil = async (req, res) => {
  const { id } = req.params;
  const { matricula, telefone, endereco, alunoId } = req.body;

  try {
    let perfil = await Perfil.findByIdAndUpdate(id, { matricula, telefone, endereco, aluno: alunoId });
    res.status(200).json({
      message: "Perfil atualizado com sucesso!",
      perfil,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message + `Não foi possivel atualizar o perfil` });
  }
};

module.exports = {
  criarPerfil,
  obterTodosPerfis,
  deletarPerfil,
  editarPerfil,
};
