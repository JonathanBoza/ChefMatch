# ChefMatch

O **ChefMatch** é uma aplicação web que recomenda receitas de acordo com os
ingredientes disponíveis na cozinha da pessoa usuária. O projeto foi
desenvolvido individualmente por **Jonathan Euzébio Boza** para a recuperação
do Módulo 1.

## Problema que resolve

Muitas pessoas têm ingredientes em casa, mas não sabem qual receita conseguem
preparar. O ChefMatch compara os ingredientes selecionados com um catálogo
local, calcula a compatibilidade de cada receita e informa o que ainda está
faltando.

## Funcionalidades

- formulário com nome e 12 opções de ingredientes;
- validação acessível com mensagens exibidas na página;
- carregamento assíncrono do catálogo `receitas.json`;
- tratamento visual de carregamento, catálogo vazio e erro;
- classes `Receita` e `ReceitaRapida` com herança;
- cálculo do percentual de compatibilidade;
- identificação dos ingredientes faltantes;
- classificação em três faixas de compatibilidade;
- recomendação principal em destaque;
- demais receitas ordenadas da maior para a menor compatibilidade;
- cards criados dinamicamente pelo JavaScript;
- interface responsiva para celular, tablet e desktop.

## Tecnologias e técnicas

- HTML5 semântico;
- CSS externo;
- Flexbox e media queries;
- JavaScript puro;
- DOM e eventos;
- `fetch`, `async/await`, `try/catch` e `response.ok`;
- classes, construtores, `this`, herança e `super`;
- métodos de array: `map`, `filter`, `reduce`, `sort`, `every` e `forEach`;
- acessibilidade com `label`, `fieldset`, `legend`, `role`, `aria-live`,
  `aria-invalid` e foco visível;
- SEO básico com idioma, título e meta description.

## Estrutura do projeto

```text
ChefMatch/
├── index.html
├── style.css
├── script.js
├── receitas.json
└── README.md
```

## Como executar

O projeto precisa ser servido por HTTP, pois o navegador bloqueia o `fetch` do
arquivo JSON quando o `index.html` é aberto diretamente.

### Opção 1: extensão Live Server

1. Abra a pasta do projeto no Visual Studio Code.
2. Instale a extensão **Live Server**, caso ainda não esteja instalada.
3. Abra o arquivo `index.html`.
4. Clique em **Go Live**.

### Opção 2: terminal

Com Node.js instalado, execute na raiz do projeto:

```bash
npx live-server
```

Depois, abra o endereço informado no terminal.

## Como usar

1. Digite seu nome.
2. Marque pelo menos um ingrediente.
3. Clique em **Ver receitas**.
4. Confira a recomendação principal e os demais cards ordenados.

## Regra de compatibilidade

```text
compatibilidade = ingredientes disponíveis / total de ingredientes da receita × 100
```

O resultado é arredondado e classificado assim:

| Percentual | Classificação |
| --- | --- |
| 100% | Dá pra fazer agora! |
| 50% a 99% | Falta pouco |
| 0% a 49% | Fica pra outro dia |

## Git e GitHub

O desenvolvimento utiliza as branches exigidas no documento oficial:

- `main`: versão estável;
- `feature/chefmatch`: implementação dos requisitos.

Repositório público:
<https://github.com/JonathanBoza/ChefMatch>

## Vídeo de apresentação

O link público será adicionado aqui depois da gravação do vídeo de até quatro
minutos.

## Melhorias futuras

- guardar o nome e os ingredientes com `localStorage`;
- filtrar resultados por categoria;
- publicar a aplicação no GitHub Pages;
- substituir o catálogo local por uma API pública de receitas.
