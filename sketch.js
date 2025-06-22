// Lista de perguntas e respostas (perguntas e opções do jogo)
let perguntas = [
  { produto: "Leite", produtoImagem: "leite.png", opcoes: ["Vaca", "Algodao", "Abelha"], correta: "Vaca" },
  { produto: "Camiseta", produtoImagem: "camiseta.png", opcoes: ["Algodao", "Eucalipto", "Milho"], correta: "Algodao" },
  { produto: "Mel", produtoImagem: "mel.png", opcoes: ["Abelha", "Galinha", "Soja"], correta: "Abelha" },
  { produto: "Açúcar", produtoImagem: "acucar.png", opcoes: ["Cana-de-açúcar", "Milho", "Algodao"], correta: "Cana-de-açúcar" },
  { produto: "Biodiesel", produtoImagem: "biodiesel.png", opcoes: ["Soja", "Látex", "Eucalipto"], correta: "Soja" },
  { produto: "Pipoca", produtoImagem: "pipoca.png", opcoes: ["Milho", "Vaca", "Abelha"], correta: "Milho" },
  { produto: "Chiclete", produtoImagem: "chiclete.png", opcoes: ["Látex", "Cana-de-açúcar", "Milho"], correta: "Látex" },
  { produto: "Papel", produtoImagem: "papel.png", opcoes: ["Eucalipto", "Algodao", "Galinha"], correta: "Eucalipto" },
  { produto: "Ovos", produtoImagem: "ovos.png", opcoes: ["Galinha", "Vaca", "Soja"], correta: "Galinha" }
];

// Variáveis globais de imagens, placares, estado e fonte
let imagens = {};
let produtosImagens = {};  // Armazena imagens dos produtos
let agrinhoScore = 0; // Placar de Agrinho
let guilhermeScore = 0; // Placar de Guilherme
let perguntaAtual = 0; // Qual pergunta estamos
let botoes = []; // Armazena os botões de resposta
let imgAgrinho, imgGuilherme; // Imagens dos personagens
let estadoJogo = "introducao"; // Estado atual do jogo
let fonte; // Fonte usada no jogo
let podeClicar = true;  // Controle de atraso nos cliques para evitar clique duplo

// Pré-carrega as imagens e define a fonte
function preload() {
  // Mapeamento dos nomes dos arquivos de imagem
  let mapaNomes = {
    "Vaca": "vaca",
    "Algodao": "algodao",
    "Abelha": "abelha",
    "Cana-de-açúcar": "cana",
    "Soja": "soja",
    "Milho": "milho",
    "Látex": "latex",
    "Eucalipto": "eucalipto",
    "Galinha": "galinha"
  };

  // Carrega as imagens das matérias-primas
  for (let chave in mapaNomes) {
    imagens[chave] = loadImage(mapaNomes[chave] + ".png");
  }

  // Carrega as imagens dos produtos
  for (let pergunta of perguntas) {
    produtosImagens[pergunta.produto] = loadImage(pergunta.produtoImagem);
  }

  // Carrega as imagens dos personagens
  imgAgrinho = loadImage("agrinho.png");
  imgGuilherme = loadImage("guilherme.png");
  fonte = "Comic Sans MS";
}

// Configura o canvas e embaralha as perguntas
function setup() {
  createCanvas(480, 480);
  textFont(fonte); // Define a fonte
  textAlign(CENTER, CENTER); // Centraliza textos por padrão
  perguntas = shuffle(perguntas); // Embaralha as perguntas
  criarBotoes(); // Cria os botões iniciais
}

// Loop principal de desenho do jogo
function draw() {
  background(173, 216, 230); // Fundo azul claro

  // Verifica o estado atual e desenha a tela correspondente
  if (estadoJogo === "introducao") {
    mostrarIntroducao();
  } else if (estadoJogo === "jogo") {
    desenharJogo();
  } else if (estadoJogo === "final") {
    mostrarResultadoFinal();
  }
}

// Tela de introdução do jogo
function mostrarIntroducao() {
  textFont(fonte);
  textSize(28);
  fill(0);
  textAlign(CENTER, CENTER);
  text("Introdução", width / 2, 40);

  textSize(16);
  fill(30);
  textAlign(LEFT, TOP);

  let blocoLargura = 320;
  let xTexto = (width - blocoLargura) / 2;
  let yTexto = 80;

  // Texto de introdução separado por parágrafos
  let paragrafos = [
    "O primo de Agrinho, Guilherme, é muito teimoso e vive dizendo que as coisas mais legais do nosso dia a dia vêm da cidade grande.",
    "Agrinho, diferente de seu primo, acha que absolutamente tudo tem sua origem no campo.",
    "Neste jogo Agrinho pede a sua ajuda para ganhar a aposta que ele fez com o seu primo.",
    "Seu objetivo é selecionar a matéria-prima de cada produto e provar para Guilherme que o campo é a fonte de tudo que a gente usa, come e até veste."
  ];

  let espacamentoEntreParagrafos = 3; // Pequeno espaçamento entre os parágrafos
  let lineHeight = 20; // Altura de cada linha

  // Desenha o texto com quebra automática de linha
  for (let p of paragrafos) {
    let palavras = p.split(' ');
    let linha = '';
    for (let i = 0; i < palavras.length; i++) {
      let testeLinha = linha + palavras[i] + ' ';
      if (textWidth(testeLinha) > blocoLargura) {
        text(linha, xTexto, yTexto);
        yTexto += lineHeight;
        linha = palavras[i] + ' ';
      } else {
        linha = testeLinha;
      }
    }
    text(linha, xTexto, yTexto);
    yTexto += lineHeight + espacamentoEntreParagrafos;
  }

  // Botão "Jogar"
  fill('#A0D468'); 
  stroke('#F7EAC8'); 
  strokeWeight(4);
  rect(width / 2 - 75, height - 80, 150, 50, 10);
  noStroke();
  fill(50);
  textAlign(CENTER, CENTER);
  textSize(18);
  text("Jogar", width / 2, height - 55);
}

// Tela principal de perguntas do jogo
function desenharJogo() {
  textFont(fonte);
  imageMode(CENTER);

  // Desenha os personagens
  image(imgGuilherme, 80, 210, 180, 240);
  image(imgAgrinho, width - 80, 210, 180, 240);

  fill(0);
  textSize(22);
  text("Agrinho", width - 80, 40);
  text("Guilherme", 80, 40);
  textSize(20);
  text("Placar: " + agrinhoScore, width - 80, 70);
  text("Placar: " + guilhermeScore, 80, 70);

  // Verifica se acabou as perguntas
  if (perguntaAtual >= perguntas.length) {
    estadoJogo = "final";
    return;
  }

  // Mostra a pergunta atual
  let pergunta = perguntas[perguntaAtual];
  textSize(32);
  text(pergunta.produto, width / 2, 50);

  // Desenha a imagem do produto
  image(produtosImagens[pergunta.produto], width / 2, 210, 200, 200);

  // Desenha os botões
  for (let btn of botoes) {
    btn.draw();
  }
}

// Cria os botões de resposta para cada pergunta
function criarBotoes() {
  botoes = [];
  let pergunta = perguntas[perguntaAtual];
  let opcoes = shuffle(pergunta.opcoes.slice()); // Embaralha as opções
  let larguraBotao = 120;
  let alturaBotao = 100;

  // Calcula posições dos 3 botões
  let x1 = 80 - larguraBotao / 2;
  let x2 = width / 2 - larguraBotao / 2;
  let x3 = width - 80 - larguraBotao / 2;
  let y = 360; // Altura dos botões

  botoes.push(new Botao(x1, y, larguraBotao, alturaBotao, opcoes[0], pergunta.correta));
  botoes.push(new Botao(x2, y, larguraBotao, alturaBotao, opcoes[1], pergunta.correta));
  botoes.push(new Botao(x3, y, larguraBotao, alturaBotao, opcoes[2], pergunta.correta));
}

// Lida com os cliques do mouse
function mouseClicked() {
  if (!podeClicar) return;  // Impede clique rápido duplo

  // Clique na tela de introdução
  if (estadoJogo === "introducao") {
    if (mouseX > width/2 - 75 && mouseX < width/2 + 75 && mouseY > height - 80 && mouseY < height - 30) {
      estadoJogo = "jogo";
      podeClicar = false;
      setTimeout(() => { podeClicar = true; }, 500);
    }
    return;
  }

  // Clique na tela final
  if (estadoJogo === "final") {
    if (mouseX > width/2 - 75 && mouseX < width/2 + 75 && mouseY > 300 && mouseY < 350) {
      reiniciarJogo();
      podeClicar = false;
      setTimeout(() => { podeClicar = true; }, 500);
    }
    return;
  }

  // Clique nos botões durante o jogo
  for (let btn of botoes) {
    if (btn.isMouseOver()) {
      if (btn.opcao === btn.correta) {
        agrinhoScore++;
      } else {
        guilhermeScore++;
      }
      perguntaAtual++;
      if (perguntaAtual < perguntas.length) {
        criarBotoes();
      } else {
        estadoJogo = "final";
      }
      podeClicar = false;
      setTimeout(() => { podeClicar = true; }, 500);
      break;
    }
  }
}

// Tela de fim de jogo
function mostrarResultadoFinal() {
  background(173, 216, 230);
  textFont(fonte);
  textSize(24);
  fill(0);
  text("Jogo Finalizado!", width / 2, 100);
  textSize(20);
  text("Placar Final - Agrinho: " + agrinhoScore + " | Guilherme: " + guilhermeScore, width / 2, 160);

  if (agrinhoScore > guilhermeScore) {
    text("Agrinho venceu o desafio!", width / 2, 220);
  } else if (guilhermeScore > agrinhoScore) {
    text("Guilherme venceu o desafio!", width / 2, 220);
  } else {
    text("Empate!", width / 2, 220);
  }

  fill('#A0D468');
  stroke('#F7EAC8');
  strokeWeight(4);
  rect(width/2 - 75, 300, 150, 50, 10);
  noStroke();
  fill(50);
  textSize(18);
  text("Jogar Novamente", width/2, 325);
}

// Reinicia o jogo ao clicar em "Jogar Novamente"
function reiniciarJogo() {
  perguntaAtual = 0;
  agrinhoScore = 0;
  guilhermeScore = 0;
  perguntas = shuffle(perguntas);
  criarBotoes();
  estadoJogo = "jogo";
}

// Classe para os botões de resposta
class Botao {
  constructor(x, y, w, h, opcao, correta) {
    this.x = x; // posição x
    this.y = y; // posição y
    this.w = w; // largura
    this.h = h; // altura
    this.opcao = opcao; // texto da opção
    this.correta = correta; // qual é a correta
  }

  draw() {
    fill('#A0D468');
    stroke('#F7EAC8');
    strokeWeight(4);
    rect(this.x, this.y, this.w, this.h, 10);
    noStroke();
    imageMode(CENTER);
    image(imagens[this.opcao], this.x + this.w / 2, this.y + this.h / 2 - 10, 50, 50);
    fill(20);
    textSize(16);
    textFont("Comic Sans MS");
    text(this.opcao, this.x + this.w / 2, this.y + this.h - 20);
  }

  // Verifica se o mouse está sobre o botão
  isMouseOver() {
    return mouseX > this.x && mouseX < this.x + this.w &&
           mouseY > this.y && mouseY < this.y + this.h;
  }
}
