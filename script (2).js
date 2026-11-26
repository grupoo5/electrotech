(() => {
  "use strict";

  // Caminho da ilustração de cada tipo de produto (pasta "imagens").
  const criarImagem = (tipo) => "imagens/" + tipo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".svg";

  /* ===== Catálogo (dados fictícios). Preços em kwanzas. =====
     Os cartões estão escritos no HTML: ao alterar um produto, actualize os dois sítios.
     [id, nome, categoria, tipo, preço, preço promocional, stock, descrição, destaque] */
  const PRODUTOS = [
    [1, "Portátil Aurora 14", "Computadores", "Portáteis", 485000, 439000, 8, "Portátil de 14 polegadas, 16 GB de RAM e SSD de 512 GB. Leve e indicado para estudo e trabalho.", true],
    [2, "Portátil Vértice Pro 15", "Computadores", "Portáteis", 720000, null, 4, "Ecrã de 15,6 polegadas, 32 GB de RAM e SSD de 1 TB para programação e edição.", false],
    [3, "Torre Kuma Office", "Computadores", "Computadores de secretária", 390000, null, 6, "Computador de secretária com 16 GB de RAM e SSD de 512 GB para escritório.", false],
    [4, "Torre Kuma Gamer", "Computadores", "Computadores de secretária", 880000, 815000, 3, "Placa gráfica dedicada, 32 GB de RAM e SSD de 1 TB para jogos.", true],
    [5, "Monitor Lumina 24", "Computadores", "Monitores", 135000, 118000, 12, "Monitor IPS de 24 polegadas, Full HD, 75 Hz, com entradas HDMI e DisplayPort.", true],
    [6, "Monitor Lumina 27 QHD", "Computadores", "Monitores", 245000, null, 0, "Monitor de 27 polegadas com resolução QHD e suporte ajustável em altura.", false],
    [7, "Smartphone Nuvo X5", "Telemóveis", "Smartphones", 185000, 165000, 15, "Ecrã AMOLED de 6,5 polegadas, 128 GB, câmara de 50 MP e bateria de 5000 mAh.", true],
    [8, "Smartphone Zeta Lite", "Telemóveis", "Smartphones", 98000, null, 20, "Telemóvel acessível com 64 GB, duas ranhuras SIM e bateria de longa duração.", false],
    [9, "Smartphone Orion 12 Pro", "Telemóveis", "Smartphones", 520000, null, 5, "Topo de gama com 256 GB, 12 GB de RAM, 5G e câmara tripla.", true],
    [10, "Smartphone Kali Note", "Telemóveis", "Smartphones", 230000, 209000, 7, "Ecrã de 6,7 polegadas, 256 GB e carregamento rápido de 45 W.", false],
    [11, "Auscultadores Eco ANC", "Acessórios", "Auscultadores", 75000, 62000, 14, "Auscultadores Bluetooth com cancelamento de ruído e até 30 horas de autonomia.", true],
    [12, "Teclado Mecânico Tecla K7", "Acessórios", "Teclados", 45000, null, 10, "Teclado mecânico compacto com retroiluminação e ligação USB-C.", false],
    [13, "Rato Sem Fios Deslize M2", "Acessórios", "Ratos", 15000, 12500, 30, "Rato ergonómico sem fios com três níveis de sensibilidade.", true],
    [14, "Carregador Rápido Volt 65 W", "Acessórios", "Carregadores", 22000, null, 25, "Carregador com duas portas USB-C e uma USB-A para telemóveis e portáteis.", false],
    [15, "Cabo USB-C Trançado 2 m", "Acessórios", "Cabos", 5500, null, 50, "Cabo reforçado de 2 metros para carregamento e transferência de dados.", false],
    [16, "Cabo HDMI 2.1 1,5 m", "Acessórios", "Cabos", 8000, 6500, 18, "Cabo HDMI de alta velocidade compatível com vídeo 4K.", false],
    [17, "Coluna Bluetooth Onda Mini", "Acessórios", "Colunas Bluetooth", 32000, 27500, 16, "Coluna portátil resistente a salpicos, com 12 horas de reprodução.", true]
  ].map(([id, nome, categoria, tipo, preco, promocao, stock, descricao, destaque]) =>
    ({ id, nome, categoria, tipo, preco, promocao, stock, descricao, destaque, imagem: criarImagem(tipo) }));

  const CATEGORIAS = { "Computadores": "Portáteis", "Telemóveis": "Smartphones", "Acessórios": "Auscultadores" };
  const CHAVE_CARRINHO = "planalto-carrinho";
  const CHAVE_NOME = "planalto-nome";

  const $ = (selector) => document.querySelector(selector);
  const elementos = {
    menu: $("#menu-navegacao"), botaoMenu: $("#botao-menu"),
    pesquisa: $("#campo-pesquisa"), categoria: $("#filtro-categoria"),
    minimo: $("#filtro-preco-minimo"), maximo: $("#filtro-preco-maximo"),
    erro: $("#erro-filtros"), contagem: $("#contagem-resultados"),
    catalogo: $("#lista-produtos"), semResultados: $("#mensagem-sem-resultados"),
    detalhes: $("#janela-detalhes"), conteudoDetalhes: $("#conteudo-detalhes"),
    carrinho: $("#carrinho-compras"), listaCarrinho: $("#lista-carrinho"),
    contador: $("#contador-carrinho"), notificacoes: $("#area-notificacoes"),
    utilizador: $("#janela-utilizador"), nome: $("#campo-nome-utilizador"), saudacao: $("#saudacao-utilizador")
  };

  // Categoria da página actual (vazia no início e no catálogo geral).
  const categoriaPagina = document.body.dataset.categoria || "";
  const filtroInicial = categoriaPagina ? `cat:${categoriaPagina}` : "todas";

  /* ===== Utilitários ===== */
  const formatarPreco = (valor) => String(valor).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " Kz";
  const precoActual = (produto) => produto.promocao ?? produto.preco;
  const obterProduto = (id) => PRODUTOS.find((p) => p.id === Number(id));
  const normalizar = (texto) => texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

  // O armazenamento pode estar bloqueado; a loja continua a funcionar.
  const ler = (chave) => { try { return localStorage.getItem(chave); } catch { return null; } };
  const guardar = (chave, valor) => {
    try { localStorage.setItem(chave, valor); }
    catch { notificar("Não foi possível guardar os dados neste navegador.", true); }
  };

  // Recupera o carrinho e ignora dados inválidos ou antigos.
  function carregarCarrinho() {
    try {
      const dados = JSON.parse(ler(CHAVE_CARRINHO));
      if (!Array.isArray(dados)) return new Map();
      return new Map(dados
        .filter((par) => Array.isArray(par) && obterProduto(par[0])?.stock > 0 && Number.isInteger(par[1]) && par[1] > 0)
        .map(([id, quantidade]) => [Number(id), Math.min(quantidade, obterProduto(id).stock)]));
    } catch { return new Map(); }
  }
  let carrinho = carregarCarrinho(); // id do produto -> quantidade

  function notificar(mensagem, erro = false) {
    // Dentro de uma janela aberta, a mensagem fica visível por cima dela.
    const destino = document.querySelector("dialog[open]") || document.body;
    destino.append(elementos.notificacoes);
    const aviso = document.createElement("p");
    aviso.className = "notificacao" + (erro ? " notificacao-erro" : "");
    aviso.textContent = mensagem;
    elementos.notificacoes.replaceChildren(aviso);
    setTimeout(() => aviso.remove(), 3000);
  }

  /* ===== Preço e stock (janela de detalhes) ===== */
  function blocoPreco(p) {
    const anterior = p.promocao ? `<s class="preco-anterior"><span class="oculto-visualmente">Preço anterior: </span>${formatarPreco(p.preco)}</s>` : "";
    return `<p class="bloco-preco"><span class="preco-produto">${formatarPreco(precoActual(p))}</span>${anterior}</p>`;
  }
  const textoStock = (p) => p.stock > 0
    ? `<p class="estado-stock">Em stock: ${p.stock} unidades</p>`
    : '<p class="estado-stock sem-stock">Esgotado</p>';

  /* ===== Pesquisa e filtros combinados ===== */
  function filtrarProdutos() {
    const termo = normalizar(elementos.pesquisa.value);
    const [tipoFiltro, valorFiltro] = elementos.categoria.value.split(":");
    const minimo = elementos.minimo.value === "" ? 0 : Number(elementos.minimo.value);
    const maximo = elementos.maximo.value === "" ? Infinity : Number(elementos.maximo.value);
    const intervaloInvalido = minimo > maximo;
    elementos.erro.hidden = !intervaloInvalido;

    const corresponde = (p) => !intervaloInvalido &&
      normalizar(p.nome).includes(termo) &&
      (!categoriaPagina || p.categoria === categoriaPagina) &&
      (tipoFiltro === "todas" || (tipoFiltro === "cat" ? p.categoria : p.tipo) === valorFiltro) &&
      precoActual(p) >= minimo && precoActual(p) <= maximo;

    // Mostra ou esconde cada <article> escrito no HTML.
    const resultados = [...elementos.catalogo.querySelectorAll(".cartao-produto")].filter((cartao) => {
      cartao.hidden = !corresponde(obterProduto(cartao.dataset.id));
      return !cartao.hidden;
    });

    elementos.semResultados.hidden = resultados.length > 0 || intervaloInvalido;
    elementos.contagem.textContent = resultados.length === 1 ? "1 produto encontrado" : `${resultados.length} produtos encontrados`;
  }

  function limparFiltros() {
    elementos.categoria.value = filtroInicial;
    elementos.minimo.value = elementos.maximo.value = elementos.pesquisa.value = "";
    filtrarProdutos();
  }

  function prepararCatalogo() {
    // Recebe a pesquisa feita noutra página (?pesquisa=...).
    const termo = new URLSearchParams(location.search).get("pesquisa") || "";
    limparFiltros();
    elementos.pesquisa.value = termo;
    filtrarProdutos();

    if (categoriaPagina) $("#ligacao-todo-catalogo").hidden = false;
    elementos.pesquisa.addEventListener("input", () => {
      $("#ligacao-todo-catalogo").href = `catalogo.html?pesquisa=${encodeURIComponent(elementos.pesquisa.value)}`;
      filtrarProdutos();
    });
    $("#ligacao-todo-catalogo").href = `catalogo.html?pesquisa=${encodeURIComponent(termo)}`;
    $("#formulario-pesquisa").addEventListener("submit", (evento) => {
      evento.preventDefault();
      filtrarProdutos();
      $("#catalogo").scrollIntoView();
    });
    const filtros = $("#formulario-filtros");
    filtros.addEventListener("input", filtrarProdutos);
    filtros.addEventListener("submit", (evento) => evento.preventDefault());
    filtros.addEventListener("reset", (evento) => {
      evento.preventDefault();
      limparFiltros();
    });
  }

  /* ===== Detalhes do produto ===== */
  function abrirDetalhes(id) {
    const p = obterProduto(id);
    const disponivel = p.stock - (carrinho.get(p.id) || 0);
    elementos.conteudoDetalhes.innerHTML = `
      <img class="imagem-detalhes" src="${p.imagem}" alt="Ilustração ampliada de ${p.nome}">
      <div class="texto-detalhes">
        <p class="categoria-produto">${p.categoria} · ${p.tipo}</p>
        <h2 id="titulo-detalhes">${p.nome}</h2>
        <p>${p.descricao}</p>
        ${blocoPreco(p)}
        ${textoStock(p)}
        <form id="formulario-detalhes" class="formulario-detalhes" data-id="${p.id}" novalidate>
          <label for="campo-quantidade">Quantidade pretendida</label>
          <input type="number" id="campo-quantidade" class="campo-filtro" value="1" min="1" max="${Math.max(disponivel, 1)}" step="1" inputmode="numeric" ${disponivel ? "" : "disabled"}>
          <button type="submit" class="botao botao-principal" ${disponivel ? "" : "disabled"}>${disponivel ? "Adicionar ao carrinho" : (p.stock ? "Todo o stock já está no carrinho" : "Esgotado")}</button>
        </form>
      </div>`;
    elementos.detalhes.showModal();
  }

  /* ===== Carrinho ===== */
  function adicionarAoCarrinho(id, quantidade = 1) {
    const p = obterProduto(id);
    const actual = carrinho.get(p.id) || 0;
    if (!Number.isInteger(quantidade) || quantidade < 1) {
      notificar("Indique uma quantidade inteira igual ou superior a 1.", true);
      return false;
    }
    if (actual + quantidade > p.stock) {
      notificar(`Stock insuficiente: há ${p.stock} unidades e já tem ${actual} no carrinho.`, true);
      return false;
    }
    carrinho.set(p.id, actual + quantidade);
    actualizarCarrinho();
    elementos.contador.classList.remove("contador-saltar");
    void elementos.contador.offsetWidth; // reinicia a animação
    elementos.contador.classList.add("contador-saltar");
    notificar(`${p.nome} adicionado ao carrinho.`);
    return true;
  }

  function actualizarCarrinho() {
    guardar(CHAVE_CARRINHO, JSON.stringify([...carrinho]));
    desenharCarrinho();
  }

  function desenharCarrinho() {
    let total = 0;
    let artigos = 0;
    elementos.listaCarrinho.innerHTML = [...carrinho].map(([id, quantidade]) => {
      const p = obterProduto(id);
      const subtotal = precoActual(p) * quantidade; // preço unitário × quantidade
      total += subtotal;
      artigos += quantidade;
      return `
        <li class="item-carrinho" data-id="${id}">
          <img class="imagem-item" src="${p.imagem}" alt="${p.nome}">
          <div>
            <h3 class="nome-item">${p.nome}</h3>
            <p>Preço unitário: ${formatarPreco(precoActual(p))}</p>
            <p>Subtotal: <strong class="subtotal-item">${formatarPreco(subtotal)}</strong></p>
          </div>
          <div class="controlo-quantidade">
            <button type="button" class="botao-quantidade" data-accao="diminuir" aria-label="Diminuir quantidade de ${p.nome}" ${quantidade === 1 ? "disabled" : ""}>−</button>
            <span class="quantidade-item" aria-label="Quantidade">${quantidade}</span>
            <button type="button" class="botao-quantidade" data-accao="aumentar" aria-label="Aumentar quantidade de ${p.nome}" ${quantidade >= p.stock ? "disabled" : ""}>+</button>
            <button type="button" class="botao-remover" data-accao="remover" aria-label="Remover ${p.nome}">Remover</button>
          </div>
        </li>`;
    }).join("");

    elementos.contador.textContent = artigos;
    $("#carrinho-vazio").hidden = carrinho.size > 0;
    $("#resumo-carrinho").hidden = carrinho.size === 0;
    $("#subtotal-geral").textContent = formatarPreco(total);
    $("#total-compra").textContent = formatarPreco(total); // soma dos subtotais
  }

  function tratarCarrinho(evento) {
    const botao = evento.target.closest("[data-accao]");
    if (!botao) return;
    const item = botao.closest(".item-carrinho");
    const id = Number(item.dataset.id);
    const accao = botao.dataset.accao;
    if (!carrinho.has(id)) return;

    if (accao === "remover") {
      const nome = obterProduto(id).nome;
      item.classList.add("item-removido");
      botao.disabled = true;
      carrinho.delete(id);
      guardar(CHAVE_CARRINHO, JSON.stringify([...carrinho]));
      setTimeout(() => {
        desenharCarrinho();
        elementos.carrinho.querySelector("[data-fechar]").focus();
        notificar(`${nome} removido do carrinho.`);
      }, 200);
      return;
    }
    carrinho.set(id, carrinho.get(id) + (accao === "aumentar" ? 1 : -1));
    actualizarCarrinho();
    // Mantém o foco do teclado depois de redesenhar a lista.
    const novoItem = elementos.listaCarrinho.querySelector(`[data-id="${id}"]`);
    (novoItem.querySelector(`[data-accao="${accao}"]:not(:disabled)`) || novoItem.querySelector("[data-accao]:not(:disabled)")).focus();
  }

  /* ===== Menu móvel e perfil ===== */
  function alternarMenu(abrir) {
    elementos.menu.classList.toggle("menu-aberto", abrir);
    elementos.botaoMenu.setAttribute("aria-expanded", abrir);
    elementos.botaoMenu.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
  }
  function mostrarSaudacao() {
    const nome = ler(CHAVE_NOME) || "";
    elementos.nome.value = nome;
    elementos.saudacao.textContent = nome ? `Olá, ${nome}!` : "Diga-nos como se chama.";
  }

  /* ===== Eventos ===== */
  function ligarEventos() {
    // Um único ouvinte trata os botões criados dinamicamente.
    document.addEventListener("click", (evento) => {
      const alvo = evento.target.closest("[data-detalhes], [data-adicionar], [data-fechar], [data-rede]");
      if (!evento.target.closest(".cabecalho")) alternarMenu(false);
      if (!alvo) return;
      const { detalhes, adicionar, rede } = alvo.dataset;
      if (detalhes) abrirDetalhes(detalhes);
      else if (adicionar) {
        if (adicionarAoCarrinho(adicionar)) {
          alvo.textContent = "Adicionado ✓";
          setTimeout(() => { alvo.textContent = "Adicionar ao carrinho"; }, 1200);
        }
      } else if (rede) notificar(`A página de ${rede} é fictícia nesta demonstração.`);
      else alvo.closest("dialog").close();
    });

    // Clicar no fundo escurecido fecha a janela.
    document.querySelectorAll("dialog").forEach((janela) => {
      janela.addEventListener("click", (evento) => { if (evento.target === janela) janela.close(); });
      janela.addEventListener("close", () => document.body.append(elementos.notificacoes));
    });

    elementos.botaoMenu.addEventListener("click", () => alternarMenu(!elementos.menu.classList.contains("menu-aberto")));
    elementos.menu.addEventListener("click", () => alternarMenu(false));
    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape" && elementos.menu.classList.contains("menu-aberto")) {
        alternarMenu(false);
        elementos.botaoMenu.focus();
      }
    });

    elementos.detalhes.addEventListener("submit", (evento) => {
      evento.preventDefault();
      const quantidade = Number($("#campo-quantidade").value);
      if (adicionarAoCarrinho(evento.target.dataset.id, quantidade)) {
        elementos.detalhes.close();
        notificar("Produto adicionado ao carrinho.");
      }
    });

    $("#botao-carrinho").addEventListener("click", () => elementos.carrinho.showModal());
    elementos.listaCarrinho.addEventListener("click", tratarCarrinho);

    $("#botao-utilizador").addEventListener("click", () => { mostrarSaudacao(); elementos.utilizador.showModal(); });
    $("#formulario-utilizador").addEventListener("submit", (evento) => {
      evento.preventDefault();
      const nome = elementos.nome.value.trim();
      if (!nome) { notificar("Escreva o seu nome antes de guardar.", true); return; }
      guardar(CHAVE_NOME, nome);
      mostrarSaudacao();
      notificar("Nome guardado.");
    });

    window.addEventListener("pageshow", () => { carrinho = carregarCarrinho(); desenharCarrinho(); });

    // Sincroniza o carrinho entre separadores abertos.
    window.addEventListener("storage", (evento) => {
      if (evento.key === CHAVE_CARRINHO || evento.key === null) { carrinho = carregarCarrinho(); desenharCarrinho(); }
    });
  }

  /* ===== Arranque ===== */
  function iniciar() {
    $("#ano-actual").textContent = new Date().getFullYear();
    // Só as páginas com catálogo precisam de preparar os filtros.
    if (elementos.catalogo) prepararCatalogo();
    desenharCarrinho();
    ligarEventos();
  }

  iniciar();
})();
