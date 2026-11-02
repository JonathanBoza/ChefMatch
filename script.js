const formulario = document.querySelector("#form-cozinha");
const campoNome = document.querySelector("#nome");
const mensagemErro = document.querySelector("#erro-formulario");
const statusReceitas = document.querySelector("#status-receitas");

async function buscarReceitas() {
  statusReceitas.textContent = "Procurando receitas...";

  try {
    const resposta = await fetch("receitas.json");

    if (!resposta.ok) {
      throw new Error(`Não foi possível carregar as receitas (${resposta.status}).`);
    }

    const receitas = await resposta.json();

    if (!Array.isArray(receitas) || receitas.length === 0) {
      statusReceitas.textContent = "Nenhuma receita foi encontrada no catálogo.";
      return [];
    }

    statusReceitas.textContent = `${receitas.length} receitas carregadas com sucesso.`;
    return receitas;
  } catch (erro) {
    console.error("Erro ao carregar o catálogo:", erro);
    statusReceitas.textContent =
      "Não foi possível carregar as receitas. Tente novamente em instantes.";
    return null;
  }
}

function obterIngredientesMarcados() {
  const marcados = document.querySelectorAll(
    'input[name="ingrediente"]:checked',
  );

  return Array.from(marcados).map((ingrediente) => ingrediente.value);
}

function mostrarErro(mensagem, campo) {
  mensagemErro.textContent = mensagem;
  campo.setAttribute("aria-invalid", "true");
  campo.focus();
}

function limparErros() {
  mensagemErro.textContent = "";
  campoNome.removeAttribute("aria-invalid");

  document
    .querySelectorAll('input[name="ingrediente"]')
    .forEach((ingrediente) => ingrediente.removeAttribute("aria-invalid"));
}

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  limparErros();

  const nome = campoNome.value.trim();
  const ingredientes = obterIngredientesMarcados();

  if (!nome) {
    mostrarErro("Informe seu nome para continuar.", campoNome);
    return;
  }

  if (ingredientes.length === 0) {
    const primeiroIngrediente = document.querySelector(
      'input[name="ingrediente"]',
    );

    document
      .querySelectorAll('input[name="ingrediente"]')
      .forEach((ingrediente) => ingrediente.setAttribute("aria-invalid", "true"));

    mostrarErro(
      "Marque pelo menos um ingrediente para continuar.",
      primeiroIngrediente,
    );
    return;
  }

  const usuario = {
    nome,
    ingredientes,
  };

  console.log("Perfil informado:", usuario);

  const receitas = await buscarReceitas();

  if (receitas) {
    console.log("Catálogo carregado:", receitas);
  }
});
