const API_URL = "http://localhost:3000/gastos";

const lista = document.getElementById("lista-gastos");
const form = document.getElementById("form-gasto");

async function carregarGastos() {
    const response = await fetch(API_URL);
    const gastos = await response.json();

    lista.innerHTML = "";

    gastos.forEach(gasto => {
        const li = document.createElement("li");
        li.textContent = `${gasto.descricao} - R$ ${gasto.valor} (${gasto.categoria})`;
        lista.appendChild(li);
    });
}

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const gasto = {
        descricao: document.getElementById('descricao').value,
        valor: Number(document.getElementById("valor").value),
        categoria: document.getElementById("categoria").value,
        data: document.getElementById("data").value
    };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gasto)
    });

    form.reset();
    carregarGastos()
});

carregarGastos();