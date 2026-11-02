# Roteiro de apresentação — ChefMatch

Roteiro básico para gravar um vídeo de **até 4 minutos**. Você pode apresentar
em Libras, com legendas, por voz ou da maneira que preferir.

## 1. Apresentação

Olá! Meu nome é **Jonathan Euzébio Boza**.

Este é o **ChefMatch: O que dá para cozinhar hoje?**, projeto desenvolvido para
o Projeto de Recuperação do Módulo 1.

## 2. Problema e solução

O ChefMatch ajuda a pessoa a descobrir receitas que pode preparar com os
ingredientes disponíveis em casa.

O usuário informa o nome, seleciona os ingredientes e recebe recomendações
classificadas pelo nível de compatibilidade.

## 3. Demonstração

Durante a gravação:

1. Mostre a página inicial e o formulário.
2. Digite um nome.
3. Selecione alguns ingredientes.
4. Clique em **Ver receitas**.
5. Mostre a recomendação principal.
6. Mostre os ingredientes disponíveis e os que ainda faltam.
7. Mostre as classificações:
   - **Dá pra fazer agora!** — 100% de compatibilidade;
   - **Falta pouco** — de 50% a 99%;
   - **Fica pra outro dia** — abaixo de 50%.
8. Redimensione rapidamente a tela para mostrar a responsividade no celular.

## 4. Tecnologias e código

O projeto foi desenvolvido com **HTML semântico, CSS responsivo, Flexbox e
JavaScript puro**.

As receitas são carregadas do arquivo `receitas.json` com `fetch`,
`async/await` e tratamento de erros.

O JavaScript utiliza manipulação do DOM, métodos de arrays e as classes
`Receita` e `ReceitaRapida`. A classe `ReceitaRapida` herda de `Receita` e
sobrescreve o método `exibirResumo()`.

O sistema calcula a porcentagem de compatibilidade, organiza as receitas e
cria os cards dinamicamente.

## 5. Encerramento

O código está disponível em um repositório público no GitHub. O projeto possui
as branches `main` e `feature/chefmatch`, com commits organizados durante o
desenvolvimento.

Obrigado pela atenção!

## Checklist antes de enviar

- [ ] O vídeo possui no máximo 4 minutos.
- [ ] A página e o funcionamento do formulário aparecem no vídeo.
- [ ] As recomendações e classificações são demonstradas.
- [ ] As principais tecnologias são explicadas.
- [ ] O vídeo está configurado como público ou acessível por link.
- [ ] O link público do vídeo foi adicionado ao `README.md`.
- [ ] O link público do repositório foi enviado na atividade.

## Links para a entrega

- Repositório: <https://github.com/JonathanBoza/ChefMatch>
- Vídeo: <https://drive.google.com/file/d/1fLPMx9m9nISdkV4PSIIz-kr7iyNmkiCH/view?usp=sharing>
