const fs = require("fs");
const path = require("path");

// caminho absoluto do arquivo gastos.json
const filePath = path.join(__dirname, "..", "data", "gastos.json");

// lê os gastos do arquivo
function listarGastos() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

// adiciona um novo gasto
function adicionarGasto(gasto) {
  const gastos = listarGastos();
  gastos.push(gasto);
  fs.writeFileSync(filePath, JSON.stringify(gastos, null, 2));
  return gasto;
}

// excluir um gasto
function excluirGasto(id) {
  const gastos = listarGastos();
  const gastosFiltrados = gastos.filter((gasto) => gasto.id !== id);

  fs.writeFileSync(
    filePath,
    JSON.stringify(gastosFiltrados, null, 2)
  );

  return gastosFiltrados;
}

// atualizar um gasto
function atualizarGasto(id, dadosAtualizados) {
  const gasto = listarGastos();
  const gastoFiltrado = gasto.map((gasto) => {
    if (gasto.id === id) {
      return {
        ...gasto,
        ...dadosAtualizados
      };
    }

    return gasto;
  });

  fs.writeFileSync(
    filePath,
    JSON.stringify(gastoFiltrado, null, 2)
  );

  return gastoFiltrado;
}

module.exports = {
  listarGastos,
  adicionarGasto,
  excluirGasto,
  atualizarGasto
};
