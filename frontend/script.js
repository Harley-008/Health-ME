const API_URL = "https://health-me-backend-yags.onrender.com/remi";

async function carregarRemedios() {
  try {
    const response = await fetch(API_URL);
    const remedios = await response.json();

    const container = document.querySelector(".container");

    const AddBtnHTML = `<div class="box"> <button class="plus-btn"> <img src="img/plus.png" class="plus-img" alt="Adicionar Remédio"> </button><p class="info"> Adicionar um remedio... </p> </div>`;

    container.innerHTML = "";

    remedios.forEach((remedio) => {
      const card = document.createElement("div");
      card.classList.add("box");

      card.innerHTML = `
      <div class="img-box"><img src="${remedio.img || "img/padrao.png"}" alt="${remedio.nome}"></div>
                <div class="box-info">
                    <h2>${remedio.nome}</h2>
                    <ul class="tags">
                        <li>R$ ${remedio.valor}</li>
                    </ul>
                </div>
                <div class="box-btn"><button class="btn">Saber mais</button></div>
      `;

      container.appendChild(card);
    });

    container.insertAdjacentHTML("beforeend", AddBtnHTML);

    const botaoAdicionar = document.querySelector(".plus-btn");
    botaoAdicionar.addEventListener("click", addRemedio);
  } catch (error) {
    console.log("Erro ao conectar com a API Remi: ", error);
  }
}

async function addRemedio() {
  const nome = prompt("Digite o nome do remédio:");
  if (!nome) return;
  const valor = prompt("Digite o valor do remédio:");
  if (!valor) return;
  const descricao = prompt("Digite a descrição do remédio:");
  if (!descricao) return;
  const img = prompt(
    "Digite a URL da imagem do remédio (ex: https://example.com/imagem.jpg) ou deixe em branco:",
  );

  const newRemedio = {
    nome: nome,
    valor: valor,
    descricao: descricao,
    img: img || "",
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRemedio),
    });
    if (response.ok) {
      alert("Remédio adicionado com sucesso!");
      carregarRemedios();
    } else {
      const erroDados = await response.json();
      alert(`Erro ao adicionar: ${erroDados.error || erroDados.erro}`);
    }
  } catch (erro) {
    console.error("Erro na requisição POST:", erro);
    alert("Não foi possível conectar ao servidor.");
  }
}

window.addEventListener("DOMContentLoaded", carregarRemedios);
