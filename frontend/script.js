const API_URL = "http://localhost:3000/gastos";

const lista = document.getElementById("lista-gastos");
const form = document.getElementById("form-gasto");
const totalGastosElemento = document.getElementById("total-gastos");
const filtro = document.getElementById("filtro-categoria");

let gastosGlobais = [];

// Atualiza total
function atualizarTotalGastos(gastos) {
  const total = gastos.reduce((soma, gasto) => {
    return soma + Number(gasto.valor);
  }, 0);

  totalGastosElemento.textContent = total.toFixed(2);
}

// Renderiza lista
function renderizarGastos(gastos) {
  lista.innerHTML = "";

  gastos.forEach((gasto) => {
    const li = document.createElement("li");

    const texto = document.createElement("span");
    texto.textContent = `${gasto.descricao} - R$ ${Number(
      gasto.valor
    ).toFixed(2)} (${gasto.categoria})`;

    const button = document.createElement("button");
    button.textContent = "Excluir";

    button.addEventListener("click", async () => {
      await fetch(`${API_URL}/${gasto.id}`, {
        method: "DELETE",
      });
      carregarGastos();
    });

    li.appendChild(texto);
    li.appendChild(button);
    lista.appendChild(li);
  });

  atualizarTotalGastos(gastos);
}

// Carrega gastos
async function carregarGastos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Erro ao buscar gastos");

    const gastos = await response.json();
    gastosGlobais = gastos;
    renderizarGastos(gastosGlobais);
  } catch (error) {
    alert("Erro ao carregar os gastos");
    console.error(error);
  }
}

// Filtro por categoria
filtro.addEventListener("change", () => {
  const categoriaSelecionada = filtro.value;

  if (categoriaSelecionada === "") {
    renderizarGastos(gastosGlobais);
    return;
  }

  const gastosFiltrados = gastosGlobais.filter(
    (gasto) => gasto.categoria === categoriaSelecionada
  );

  renderizarGastos(gastosFiltrados);
});

// Envio do formulário
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const gasto = {
    descricao: document.getElementById("descricao").value,
    valor: Number(document.getElementById("valor").value),
    categoria: document.getElementById("categoria").value,
    data: document.getElementById("data").value,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gasto),
    });

    if (!response.ok) throw new Error("Erro ao salvar gasto");

    form.reset();
    carregarGastos();
  } catch (error) {
    alert("Erro ao salvar o gasto");
    console.error(error);
  }
});

// Inicialização
carregarGastos();
