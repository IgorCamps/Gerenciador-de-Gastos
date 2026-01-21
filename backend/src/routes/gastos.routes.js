const express = require("express");
const { listarGastos, adicionarGasto, excluirGasto } = require("../services/gastos.service");
const { randomUUID } = require("crypto");

const router = express.Router();

// GET /gastos → listar todos os gastos
router.get("/", (req, res) => {
  const gastos = listarGastos();
  res.json(gastos);
});

// POST /gastos → adicionar novo gasto
router.post("/", (req, res) => {
  const { descricao, valor, categoria, data } = req.body;

  // validação mínima
  if (!descricao || !valor || !categoria || !data) {
    return res.status(400).json({
      error: "Todos os campos são obrigatórios"
    });
  }

  const novoGasto = {
    id: randomUUID(),
    descricao,
    valor,
    categoria,
    data
  };

  const gastoCriado = adicionarGasto(novoGasto);
  res.status(201).json(gastoCriado);
});

// DELETE - excluir um gasto
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  excluirGasto(id);

  res.status(204).send();
});

module.exports = router;