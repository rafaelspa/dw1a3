var pontosMaquina = 0
var pontosJogador = 0
var rodadasTotais = 0
var numeroPokemonJogador
var numeroPokemonMaquina
var atributosMaquina = {atributos:[],alt:'', src:'', name:''}
const numeroDePokemonsComSprite = 649 // total de pokemons com gif

function atualizaPlacar() {
  document.querySelector("#pts__jogador").innerHtml = `${pontosJogador}`
  document.querySelector("#pts__maquina").innerHtml = `${pontosMaquina}`
}


function sortearPokemons() {
  // variaveis gerais
  numeroPokemonJogador = parseInt(Math.random() * numeroDePokemonsComSprite);
  numeroPokemonMaquina = parseInt(Math.random() * numeroDePokemonsComSprite);

  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;

  exibirPokemonJogador(numeroPokemonJogador)
  fetchPokemonMaquina(numeroPokemonMaquina)
}

function obterIndiceDoAtributoSelecionado() {
  var radioAtributo = document.getElementsByName("stat__jogador");
  for (let i = 0; i < radioAtributo.length; i++) {
    if (radioAtributo[i].checked) {
      return i;
    }
  }
}

function jogar() {
  var divResultado = document.getElementById("resultado");
  var textoResultado;
  var atributosJogador = obterAtributosJogador();

  var indiceAtributo = obterIndiceDoAtributoSelecionado();
  console.log(`atr - j: ${atributosJogador[indiceAtributo].value} x m: ${atributosMaquina['atributos'][indiceAtributo]}`)
  if (
    atributosJogador[indiceAtributo].value >
    atributosMaquina['atributos'][indiceAtributo]
  ) {
    textoResultado = 'Venceu';
    pontosJogador++;
  } else if (
    atributosJogador[indiceAtributo].value <
    atributosMaquina['atributos'][indiceAtributo]
  ) {
    textoResultado = 'Perdeu';
    pontosMaquina++;
  } else {
    textoResultado = 'Empatou';
  }
  console.log(`pts - j: ${pontosJogador} x m: ${pontosMaquina}`)
  rodadasTotais = pontosJogador + pontosMaquina

  if (rodadasTotais == 7) {
    alert("Fim de jogo, aperte ok para o resultado final")
    if (pontosJogador > pontosMaquina) {
      textoResultado = 'Venceu'
    } else if (pontosJogador < pontosMaquina) {
      textoResultado = 'Perdeu'
    } else {
      textoResultado = 'Empatou'
    }
  } else {
    document.getElementById('btnProximaRodada').disabled = false
  }

  divResultado.innerText = textoResultado;
  document.getElementById('btnJogar').disabled = true

  atualizaPlacar()
  exibirPokemonMaquina(atributosMaquina)
}

function proximaRodada() {
  limparPokemonJogador()
  limparPokemonMaquina()

  document.getElementById("btnSortear").disabled = false
  document.getElementById("btnJogar").disabled = true
  document.getElementById("btnProximaRodada").disabled = true

  document.getElementById("resultado").innerHTML = ''

  document.getElementsByName('stat__jogador').forEach(e => {
    e.checked = false
  })
}

function obterAtributosJogador() {
  return document.getElementsByName("stat__jogador")
}

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
    hp__jogador.value = dados['stats'][0]["base_stat"]
    pokemonJogadorAttackValue.innerHTML = dados['stats'][1]["base_stat"]
    attack__jogador.value = dados['stats'][1]["base_stat"]
    pokemonJogadorDefenseValue.innerHTML = dados['stats'][2]["base_stat"]
    defense__jogador.value = dados['stats'][2]["base_stat"]
    pokemonJogadorSpecialAttackValue.innerHTML = dados['stats'][3]["base_stat"]
    special__attack__jogador.value = dados['stats'][3]["base_stat"]
    pokemonJogadorSpecialDefenseValue.innerHTML = dados['stats'][4]["base_stat"]
    special__defense__jogador.value = dados['stats'][4]["base_stat"]
    pokemonJogadorSpeedValue.innerHTML = dados['stats'][5]["base_stat"]
    speed__jogador.value = dados['stats'][5]["base_stat"]
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
const fetchPokemonMaquina = async (pokemon) => {
  const dados = await fetchPokemon(pokemon);
  
  if (dados) {
    atributosMaquina['name'] = capitaliza(dados['name'])
    atributosMaquina['alt'] = dados.name
    atributosMaquina['src'] = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    atributosMaquina['atributos'][0] = dados['stats'][0]["base_stat"]
    atributosMaquina['atributos'][1] = dados['stats'][1]["base_stat"]
    atributosMaquina['atributos'][2] = dados['stats'][2]["base_stat"]
    atributosMaquina['atributos'][3] = dados['stats'][3]["base_stat"]
    atributosMaquina['atributos'][4] = dados['stats'][4]["base_stat"]
    atributosMaquina['atributos'][5] = dados['stats'][5]["base_stat"]
  } else {
    alert("Pokemon maquina não encontrado")
  }
}

function exibirPokemonMaquina(objetoAtributos) {
  pokemonMaquinaNome.innerHTML = objetoAtributos['name']
  pokemonMaquinaImagem.alt = objetoAtributos['alt']
  pokemonMaquinaImagem.src = objetoAtributos['src']
  pokemonMaquinaHpValue.innerHTML = objetoAtributos['atributos'][0]
  hp__maquina.value = objetoAtributos['atributos'][0]
  pokemonMaquinaAttackValue.innerHTML = objetoAtributos['atributos'][1]
  attack__maquina.value = objetoAtributos['atributos'][1]
  pokemonMaquinaDefenseValue.innerHTML = objetoAtributos['atributos'][2]
  defense__maquina.value = objetoAtributos['atributos'][2]
  pokemonMaquinaSpecialAttackValue.innerHTML = objetoAtributos['atributos'][3]
  special__attack__maquina.value = objetoAtributos['atributos'][3]
  pokemonMaquinaSpecialDefenseValue.innerHTML = objetoAtributos['atributos'][4]
  special__defense__maquina.value = objetoAtributos['atributos'][4]
  pokemonMaquinaSpeedValue.innerHTML = objetoAtributos['atributos'][4]
  speed__maquina.value = objetoAtributos['atributos'][4]
}

function capitaliza(nome) {
  if (typeof nome == "string") {
    return nome[0].toUpperCase() + nome.substring(1)
  }
}

function limparPokemonJogador() {
  pokemonJogadorNome.innerHTML = 'Pokemon Jogador'
  pokemonJogadorImagem.alt = 'pokemon jogador'
  pokemonJogadorImagem.src = './assets/img/pokeball.jpg'
  pokemonJogadorHpValue.innerHTML = 'XX'
  hp__jogador.value = ''
  pokemonJogadorAttackValue.innerHTML = 'XX'
  attack__jogador.value = ''
  pokemonJogadorDefenseValue.innerHTML = 'XX'
  defense__jogador.value = ''
  pokemonJogadorSpecialAttackValue.innerHTML = 'XX'
  special__attack__jogador.value = ''
  pokemonJogadorSpecialDefenseValue.innerHTML = 'XX'
  special__defense__jogador.value = ''
  pokemonJogadorSpeedValue.innerHTML = 'XX'
  speed__jogador.value = 'XX'
}

function limparPokemonMaquina() {
  pokemonMaquinaNome.innerHTML = 'Pokemon Máquina'
  pokemonMaquinaImagem.alt = 'pokemon maquina'
  pokemonMaquinaImagem.src = './assets/img/pokeball.jpg'
  pokemonMaquinaHpValue.innerHTML = 'YY'
  hp__maquina.value = ''
  pokemonMaquinaAttackValue.innerHTML = 'YY'
  attack__maquina.value = ''
  pokemonMaquinaDefenseValue.innerHTML = 'YY'
  defense__maquina.value = ''
  pokemonMaquinaSpecialAttackValue.innerHTML = 'YY'
  special__attack__maquina.value = ''
  pokemonMaquinaSpecialDefenseValue.innerHTML = 'YY'
  special__defense__maquina.value = ''
  pokemonMaquinaSpeedValue.innerHTML = 'YY'
  speed__maquina.value = 'YY'
}