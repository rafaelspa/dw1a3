var cartaPaulo = {
  nome: "Shiryu de dragão",
  imagem:
    "http://pm1.narvii.com/6399/96fdb9d4fe6a9e72b9bc60ad418e3c43795e53b4_00.jpg",
  atributos: {
    ataque: 5,
    defesa: 9,
    magia: 10,
  },
};

var cartaRafa = {
  nome: "Bulbasauro",
  imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
  atributos: {
    ataque: 7,
    defesa: 8,
    magia: 6,
  },
};

var cartaGui = {
  nome: "Darth Vader",
  imagem:
    "https://images-na.ssl-images-amazon.com/images/I/41i-0NH0q9L._SX328_BO1,204,203,200_.jpg",
  atributos: {
    ataque: 9,
    defesa: 8,
    magia: 2,
  },
};

var cartaBatman = {
  nome: "Batman",
  imagem:
    "https://images3.alphacoders.com/110/1104546.jpg",
  atributos: {
    ataque: 7,
    defesa: 7,
    magia: 7,
  },
};

var cartaLink = {
  nome: "Link",
  imagem:
    "https://www.freepngimg.com/thumb/the_legend_of_zelda/21552-3-zelda-link.png",
  atributos: {
    ataque: 5,
    defesa: 6,
    magia: 3,
  },
};

var cartaSuper = {
  nome: "Terry Crews",
  imagem:
    "https://media.vanityfair.com/photos/5b92cf1758404f52d391c0f0/master/w_768,c_limit/t-Terry-Crews-Interview.jpg",
  atributos: {
    ataque: 11,
    defesa: 11,
    magia: 11,
  },
};

var pontosMaquina = 0
var pontosJogador = 0

var cartas = [cartaGui, cartaRafa, cartaPaulo, cartaBatman, cartaLink, cartaSuper];

atualizaPlacar()
atualizaQuantidadeDeCartas()

function atualizaQuantidadeDeCartas() {
  var divQuantidadeCartas = document.getElementById("quantidade-cartas")
  var  html = "Quantidade de cartas no jogo: " + cartas.length


  divQuantidadeCartas.innerHTML = html
}

function atualizaPlacar() {
  var divPlacar = document.getElementById('placar')

  var html = "Jogador " + pontosJogador + "/" + pontosMaquina + " Máquina"

  divPlacar.innerHTML = html
}

var cartaMaquina;
var cartaJogador;

function sortearCarta() {
  var numeroCartaMaquina = parseInt(Math.random() * cartas.length);
  cartaMaquina = cartas[numeroCartaMaquina];
  cartas.splice(numeroCartaMaquina, 1)

  var numeroCartaJogador = parseInt(Math.random() * cartas.length);
  cartaJogador = cartas[numeroCartaJogador];
  cartas.splice(numeroCartaJogador, 1)

  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;

  exibirCartaJogador();
}

function exibirCartaJogador() {
  var divCartaJogador = document.getElementById("carta-jogador");
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-' +
    'transparent.png" style=" width: inherit; height: inherit; position: absolute;">';

  divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`;
  var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`;
  opcoesTexto = "";

  for (var atributo in cartaJogador.atributos) {
    opcoesTexto +=
      "<input type='radio' name='atributo' value='" +
      atributo +
      "' />" +
      atributo +
      " " +
      cartaJogador.atributos[atributo] +
      "<br>";
  }

  var html = "<div id='opcoes' class='carta-status'>";

  divCartaJogador.innerHTML = moldura + nome + html + opcoesTexto + "</div>";
}

function exibirOpcoes() {
  var opcoes = document.getElementById("opcoes");
  var opcoesTexto = "";
  for (var atributo in cartaJogador.atributos) {
    opcoesTexto +=
      "<input type='radio' name='atributo' value='" +
      atributo +
      "' />" +
      atributo;
  }
  opcoes.innerHTML = opcoesTexto;
}

function obtemAtributoSelecionado() {
  var radioAtributo = document.getElementsByName("atributo");
  for (var i = 0; i < radioAtributo.length; i++) {
    if (radioAtributo[i].checked) {
      return radioAtributo[i].value;
    }
  }
}

function jogar() {
  var divResultado = document.getElementById("resultado");

  var atributoSelecionado = obtemAtributoSelecionado();

  if (
    cartaJogador.atributos[atributoSelecionado] >
    cartaMaquina.atributos[atributoSelecionado]
  ) {
    htmlResultado = '<p class="resultado-final">Venceu</p>';
    pontosJogador++;
  } else if (
    cartaJogador.atributos[atributoSelecionado] <
    cartaMaquina.atributos[atributoSelecionado]
  ) {
    htmlResultado = '<p class="resultado-final">Perdeu</p>';
    pontosMaquina++;
  } else {
    htmlResultado = '<p class="resultado-final">Empatou</p>';
  }

  if (cartas.length == 0) {
    alert("Fim de jogo")
    if (pontosJogador > pontosMaquina) {
      htmlResultado = '<p class="resultado-final">Venceu</p>'
    } else if (pontosJogador < pontosMaquina) {
      htmlResultado = '<p class="resultado-final">Perdeu</p>'
    } else {
      htmlResultado = '<p class="resultado-final">Empatou</p>'
    }
  } else {
    document.getElementById('btnProximaRodada').disabled = false
  }

  divResultado.innerHTML = htmlResultado;
  document.getElementById('btnJogar').disabled = true

  atualizaPlacar()
  atualizaQuantidadeDeCartas()
  exibirCartaMaquina();
}

function exibirCartaMaquina() {
  var divCartaMaquina = document.getElementById("carta-maquina");
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-' +
    'transparent.png" style=" width: inherit; height: inherit; position: absolute;">';

  divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`;
  var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`;
  opcoesTexto = "";

  for (var atributo in cartaMaquina.atributos) {
    opcoesTexto +=
      "<p type='text' name='atributo' value='" +
      atributo +
      "'</p>" +
      atributo +
      " " +
      cartaMaquina.atributos[atributo] +
      "<br>";
  }

  var html = "<div id='opcoes' class='carta-status'>";

  divCartaMaquina.innerHTML = moldura + nome + html + opcoesTexto + "</div>";
}

function proximaRodada() {
  var divCartas = document.getElementById("cartas")

  divCartas.innerHTML = `<div id="carta-jogador" class="carta"></div> <div id="carta-maquina" class="carta"></div>`

  document.getElementById("btnSortear").disabled = false
  document.getElementById("btnJogar").disabled = true
  document.getElementById("btnProximaRodada").disabled = true

  var divResultado = document.getElementById("resultado")
  divResultado.innerHTML = ""
}

// variaveis gerais
const numeroDePokemonsComSprite = 649 // numero maximo de pokemons com gif
var numeroPokemonJogador = parseInt(Math.random() * numeroDePokemonsComSprite);
var numeroPokemonMaquina = parseInt(Math.random() * numeroDePokemonsComSprite);

// metodo para buscar pokemon na api Pokeapi.co
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

// variaveis do pokemon do jogador
const pokemonJogadorNome = document.querySelector("#pokemon__jogador__nome")
const pokemonJogadorImagem = document.querySelector("#pokemon__jogador__imagem")
const pokemonJogadorHpValue = document.querySelector("#pokemon__jogador__hp__value")
const pokemonJogadorAttackValue = document.querySelector("#pokemon__jogador__attack__value")
const pokemonJogadorDefenseValue = document.querySelector("#pokemon__jogador__defense__value")
const pokemonJogadorSpecialAttackValue = document.querySelector("#pokemon__jogador__special__attack__value")
const pokemonJogadorSpecialDefenseValue = document.querySelector("#pokemon__jogador__special__defense__value")
const pokemonJogadorSpeedValue = document.querySelector("#pokemon__jogador__speed__value")

// metodo para buscar um pokemon para o jogador na api
const exibirPokemonJogador = async (pokemon) => {
  const dados = await fetchPokemon(pokemon);

  if (dados) {
    pokemonJogadorNome.innerHTML = capitaliza(dados['name'])
    pokemonJogadorImagem.alt = dados.name
    pokemonJogadorImagem.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    pokemonJogadorHpValue.innerHTML = dados['stats'][0]["base_stat"]
    pokemonJogadorAttackValue.innerHTML = dados['stats'][1]["base_stat"]
    pokemonJogadorDefenseValue.innerHTML = dados['stats'][2]["base_stat"]
    pokemonJogadorSpecialAttackValue.innerHTML = dados['stats'][3]["base_stat"]
    pokemonJogadorSpecialDefenseValue.innerHTML = dados['stats'][4]["base_stat"]
    pokemonJogadorSpeedValue.innerHTML = dados['stats'][5]["base_stat"]

  } else {
    alert("Pokemon jogador não encontrado")
  }
}

// variaveis do pokemon da maquina
const pokemonMaquinaNome = document.querySelector("#pokemon__maquina__nome")
const pokemonMaquinaImagem = document.querySelector("#pokemon__maquina__imagem")
const pokemonMaquinaHpValue = document.querySelector("#pokemon__maquina__hp__value")
const pokemonMaquinaAttackValue = document.querySelector("#pokemon__maquina__attack__value")
const pokemonMaquinaDefenseValue = document.querySelector("#pokemon__maquina__defense__value")
const pokemonMaquinaSpecialAttackValue = document.querySelector("#pokemon__maquina__special__attack__value")
const pokemonMaquinaSpecialDefenseValue = document.querySelector("#pokemon__maquina__special__defense__value")
const pokemonMaquinaSpeedValue = document.querySelector("#pokemon__maquina__speed__value")


// metodo para buscar um pokemon para a maquina na api
const exibirPokemonMaquina = async (pokemon) => {
  const dados = await fetchPokemon(pokemon);
  
  if (dados) {
    pokemonMaquinaNome.innerHTML = capitaliza(dados['name'])
    pokemonMaquinaImagem.alt = dados.name
    pokemonMaquinaImagem.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    pokemonMaquinaHpValue.innerHTML = dados['stats'][0]["base_stat"]
    pokemonMaquinaAttackValue.innerHTML = dados['stats'][1]["base_stat"]
    pokemonMaquinaDefenseValue.innerHTML = dados['stats'][2]["base_stat"]
    pokemonMaquinaSpecialAttackValue.innerHTML = dados['stats'][3]["base_stat"]
    pokemonMaquinaSpecialDefenseValue.innerHTML = dados['stats'][4]["base_stat"]
    pokemonMaquinaSpeedValue.innerHTML = dados['stats'][5]["base_stat"]

  } else {
    alert("Pokemon maquina não encontrado")
  }
}

function capitaliza(nome) {
  if (typeof nome == "string") {
    return nome[0].toUpperCase() + nome.substring(1)
  }
}

// exibirPokemonJogador(numeroPokemonJogador)
// exibirPokemonMaquina(numeroPokemonMaquina)