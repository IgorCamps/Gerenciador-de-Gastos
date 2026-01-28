const API_URL = "http://localhost:3000/gastos";

const lista = document.getElementById("lista-gastos");
const form = document.getElementById("form-gasto");
const totalGastosElemento = document.getElementById("total-gastos");
const filtro = document.getElementById("filtro-categoria");
const filtroAno = document.getElementById("filtro-ano")
const botaoSubmit = form.querySelector("button[type='submit']");

let gastosGlobais = [];
let gastoEmEdicaoId = null;
let filtrosAtivos = {
  categoria: "",
  ano: ""
};

function atualizarTotalGastos(gastos) {
  const total = gastos.reduce((soma, gasto) => {
    return soma + Number(gasto.valor);
  }, 0);

  totalGastosElemento.textContent = total.toFixed(2);
}

function renderizarGastos(gastos) {
  lista.innerHTML = "";

  gastos.forEach((gasto) => {
    const li = document.createElement("li");

    const texto = document.createElement("span");
    texto.textContent = `${gasto.descricao} - R$ ${Number(
      gasto.valor
    ).toFixed(2)} (${gasto.categoria})`;

    const editarBtn = document.createElement("button");
    editarBtn.textContent = gastoEmEdicaoId === gasto.id ? "Cancelar" : "Editar";

    const excluirBtn = document.createElement("button");
    excluirBtn.textContent = "Excluir";

    // EDITAR / CANCELAR
    editarBtn.addEventListener("click", () => {
      if (gastoEmEdicaoId === gasto.id) {
        gastoEmEdicaoId = null;
        form.reset();
        botaoSubmit.textContent = "Adicionar";
        editarBtn.textContent = "Cancelar"
        renderizarGastos(gastosGlobais);
        return
      }

      document.getElementById("descricao").value = gasto.descricao;
      document.getElementById("valor").value = gasto.valor;
      document.getElementById("categoria").value = gasto.categoria;
      document.getElementById("data").value = gasto.data;

      gastoEmEdicaoId = gasto.id;
      botaoSubmit.textContent = "Salvar edição";

      renderizarGastos(gastosGlobais);
    });


    // EXCLUIR
    excluirBtn.addEventListener("click", async () => {
      await fetch(`${API_URL}/${gasto.id}`, {
        method: "DELETE",
      });

      carregarGastos();
    });

    li.appendChild(texto);
    li.appendChild(editarBtn);
    li.appendChild(excluirBtn);
    lista.appendChild(li);
  });

  atualizarTotalGastos(gastos);
}

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

function aplicarFiltros() {
  let gastosFiltrados = [...gastosGlobais];

  if (filtrosAtivos.categoria) {
    gastosFiltrados = gastosFiltrados.filter(
      (gasto) => gasto.categoria === filtrosAtivos.categoria
    );
  }

  if (filtrosAtivos.ano) {
    gastosFiltrados = gastosFiltrados.filter(
      (gasto) => new Date(gasto.data).getFullYear().toString() === filtrosAtivos.ano
    );
  }

  renderizarGastos(gastosFiltrados);
};

filtro.addEventListener("change", () => {
  filtrosAtivos.categoria = filtro.value;
  aplicarFiltros();
});

filtroAno.addEventListener("change", () => {
  filtrosAtivos.ano = filtroAno.value;
  aplicarFiltros();
})

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const gasto = {
    descricao: document.getElementById("descricao").value,
    valor: Number(document.getElementById("valor").value),
    categoria: document.getElementById("categoria").value,
    data: document.getElementById("data").value,
  };

  try {
    const method = gastoEmEdicaoId ? "PUT" : "POST";
    const url = gastoEmEdicaoId
      ? `${API_URL}/${gastoEmEdicaoId}`
      : API_URL;

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gasto),
    });

    if (!response.ok) {
      throw new Error("Erro ao salvar");
    }

    gastoEmEdicaoId = null;
    botaoSubmit.textContent = "Adicionar";
    form.reset();
    carregarGastos();
  } catch (error) {
    alert("Erro ao salvar o gasto");
    console.error(error);
  }
});

carregarGastos();