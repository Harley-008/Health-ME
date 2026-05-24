const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

const caminho = "src/database/remi.json";

async function lerDados() {
  try {
    const dados = await fs.readFile(caminho, "utf8");
    return JSON.parse(dados);
  } catch (error) {
    return []; 
  }
}

async function salvarDados(dados) {
  await fs.writeFile(caminho, JSON.stringify(dados, null, 2));
}

// LISTAR
exports.listar = async (req, res) => {
  try {
    const remi = await lerDados();
    res.json(remi);
  } catch (error) {
    res.status(500).json({ error: "Erro ao ler os dados!" });
  }
};

// CRIAR
exports.criar = async (req, res) => {
  try {
    const remi = await lerDados();

    const newRemi = {
      id: uuidv4(), // Mantém o ID como String única
      ...req.body,
    };

    remi.push(newRemi);
    await salvarDados(remi);

    res.status(201).json({
      mensagem: "Remédio Criado!",
      remi: newRemi,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar dados." });
  }
};

// ATUALIZAR
exports.atualizar = async (req, res) => {
  try {
    const remi = await lerDados();
    const id = req.params.id; 

    const index = remi.findIndex((r) => r.id === id);

    if (index === -1) {
      return res.status(404).json({
        error: "Remédio Não Encontrado!",
      });
    }

    remi[index] = {
      id,
      ...req.body,
    };

    await salvarDados(remi);

    res.json({
      mensagem: "Atualizado!",
      remi: remi[index]
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar dados." });
  }
};

// DELETAR
exports.deletar = async (req, res) => {
  try {
    const remi = await lerDados();
    const id = req.params.id;

    const existe = remi.some((r) => r.id === id); 

    if (!existe) {
      return res.status(404).json({
        error: "Remédio Não Encontrado!",
      });
    }

    const newLista = remi.filter((r) => r.id !== id);
    await salvarDados(newLista); 

    res.json({
      mensagem: "Remédio Deletado!",
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar dados." });
  }
};