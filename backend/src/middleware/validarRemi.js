const { error } = require("node:console");

module.exports = (req, res, next) => {
  const { nome, valor, descricao, img } = req.body;

  if (!nome || !valor || !descricao) {
    return res.status(400).json({
      error: "Nome, valor e descrição são obrigatórios!",
    });
  }
  next();
};
