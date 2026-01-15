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

module.exports = {
  listarGastos,
  adicionarGasto
};
