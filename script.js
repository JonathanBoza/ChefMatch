const formulario = document.querySelector("#form-cozinha");
const campoNome = document.querySelector("#nome");
const mensagemErro = document.querySelector("#erro-formulario");
const statusReceitas = document.querySelector("#status-receitas");
const secaoResultados = document.querySelector("#secao-resultados");
const saudacaoResultados = document.querySelector("#saudacao-resultados");
const recomendacaoPrincipal = document.querySelector(
  "#recomendacao-principal",
);
const listaReceitas = document.querySelector("#lista-receitas");

class Receita {
  constructor(id, nome, categoria, ingredientes, tempoMinutos) {
    this.id = id;
    this.nome = nome;
    this.categoria = categoria;
    this.ingredientes = ingredientes;
    this.tempoMinutos = tempoMinutos;
  }

  exibirResumo() {
    return `${this.nome} · ${this.categoria} · ${this.tempoMinutos} min`;
  }

  calcularCompatibilidade(ingredientesUsuario) {
    const ingredientesEmComum = this.ingredientes.filter((ingrediente) =>
      ingredientesUsuario.includes(ingrediente),
    );

    return Math.round(
      (ingredientesEmComum.length / this.ingredientes.length) * 100,
    );
  }

  ingredientesFaltantes(ingredientesUsuario) {
    return this.ingredientes.filter(
      (ingrediente) => !ingredientesUsuario.includes(ingrediente),
    );
  }

  classificarCompatibilidade(percentual) {
    if (percentual === 100) {
      return "Dá pra fazer agora!";
    }

    if (percentual >= 50) {
      return "Falta pouco";
    }

    return "Fica pra outro dia";
  }
}

class ReceitaRapida extends Receita {
  exibirResumo() {
    return `${super.exibirResumo()} · Receita rápida!`;
  }
}

function criarInstanciasDeReceitas(dados) {
  return dados.map((receita) =>
    receita.tempoMinutos <= 20
      ? new ReceitaRapida(
          receita.id,
          receita.nome,
          receita.categoria,
          receita.ingredientes,
          receita.tempoMinutos,
        )
      : new Receita(
          receita.id,
          receita.nome,
          receita.categoria,
          receita.ingredientes,
          receita.tempoMinutos,
        ),
  );
}

function organizarRecomendacoes(compatibilidades) {
  if (compatibilidades.length === 0) {
    return {
      recomendacaoPrincipal: null,
      outrasRecomendacoes: [],
    };
  }

  const recomendacaoPrincipal = compatibilidades.reduce((melhor, atual) =>
    atual.compatibilidade > melhor.compatibilidade ? atual : melhor,
  );

  const outrasRecomendacoes = compatibilidades
    .filter((resultado) => resultado !== recomendacaoPrincipal)
    .sort((a, b) => b.compatibilidade - a.compatibilidade);

  return {
    recomendacaoPrincipal,
    outrasRecomendacoes,
  };
}

function criarParagrafo(rotulo, valor) {
  const paragrafo = document.createElement("p");
  const destaque = document.createElement("strong");

  destaque.textContent = `${rotulo}: `;
  paragrafo.append(destaque, valor);
  return paragrafo;
}

function criarCardReceita(resultado, principal = false) {
  const card = document.createElement("article");
  const titulo = document.createElement("h3");
  const resumo = document.createElement("p");
  const metricas = document.createElement("div");
  const compatibilidade = document.createElement("p");
  const percentual = document.createElement("strong");
  const rotuloPercentual = document.createElement("span");
  const classificacao = document.createElement("p");
  const faltantes = resultado.ingredientesFaltantes.length
    ? resultado.ingredientesFaltantes.join(", ")
    : "Nenhum";

  card.className = principal
    ? "card-receita card-receita--principal"
    : "card-receita";

  if (principal) {
    const identificacao = document.createElement("p");
    identificacao.className = "card-receita__destaque";
    identificacao.textContent = "Recomendação principal";
    card.append(identificacao);
  }

  titulo.textContent = resultado.receita.nome;
  resumo.className = "card-receita__resumo";
  resumo.textContent = resultado.receita.exibirResumo();
  metricas.className = "card-receita__metricas";
  compatibilidade.className = "card-receita__compatibilidade";
  percentual.textContent = `${resultado.compatibilidade}%`;
  rotuloPercentual.textContent = "compatível";
  classificacao.className = "card-receita__classificacao";
  classificacao.textContent = resultado.classificacao;

  compatibilidade.append(percentual, rotuloPercentual);
  metricas.append(compatibilidade, classificacao);

  card.append(
    titulo,
    resumo,
    metricas,
    criarParagrafo("Ingredientes que faltam", faltantes),
  );

  return card;
}

function renderizarResultados(usuario, recomendacoes) {
  recomendacaoPrincipal.replaceChildren();
  listaReceitas.replaceChildren();

  saudacaoResultados.textContent = `${usuario.nome}, olha o que dá para cozinhar hoje.`;

  if (!recomendacoes.recomendacaoPrincipal) {
    statusReceitas.textContent = "Nenhuma recomendação está disponível.";
    return;
  }

  recomendacaoPrincipal.append(
    criarCardReceita(recomendacoes.recomendacaoPrincipal, true),
  );

  recomendacoes.outrasRecomendacoes.forEach((resultado) => {
    listaReceitas.append(criarCardReceita(resultado));
  });

  const total = recomendacoes.outrasRecomendacoes.length + 1;
  statusReceitas.textContent = `${total} receitas analisadas e ordenadas por compatibilidade.`;
  secaoResultados.focus();
}

async function buscarReceitas() {
  recomendacaoPrincipal.replaceChildren();
  listaReceitas.replaceChildren();
  saudacaoResultados.textContent = "";
  statusReceitas.textContent = "Procurando receitas...";

  try {
    const resposta = await fetch("receitas.json");

    if (!resposta.ok) {
      throw new Error(`Não foi possível carregar as receitas (${resposta.status}).`);
    }

    const dados = await resposta.json();

    if (!Array.isArray(dados) || dados.length === 0) {
      statusReceitas.textContent = "Nenhuma receita foi encontrada no catálogo.";
      return [];
    }

    const catalogoValido = dados.every(
      (receita) =>
        Number.isInteger(receita.id) &&
        typeof receita.nome === "string" &&
        typeof receita.categoria === "string" &&
        Array.isArray(receita.ingredientes) &&
        receita.ingredientes.length > 0 &&
        Number.isFinite(receita.tempoMinutos),
    );

    if (!catalogoValido) {
      throw new Error("O catálogo de receitas possui dados inválidos.");
    }

    const receitas = criarInstanciasDeReceitas(dados);

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
    const compatibilidades = receitas.map((receita) => {
      const compatibilidade = receita.calcularCompatibilidade(
        usuario.ingredientes,
      );

      return {
        receita,
        compatibilidade,
        classificacao: receita.classificarCompatibilidade(compatibilidade),
        ingredientesFaltantes: receita.ingredientesFaltantes(
          usuario.ingredientes,
        ),
      };
    });

    const recomendacoes = organizarRecomendacoes(compatibilidades);

    renderizarResultados(usuario, recomendacoes);
  }
});
