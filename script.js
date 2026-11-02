const formulario = document.querySelector("#form-cozinha");
const campoNome = document.querySelector("#nome");
const mensagemErro = document.querySelector("#erro-formulario");

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

formulario.addEventListener("submit", (evento) => {
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
});
