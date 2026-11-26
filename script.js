(() => {
  "use strict";

  /* ===== Ilustrações geradas em SVG (funcionam sem Internet) ===== */
  const DESENHOS = {
    "Portáteis": '<rect x="90" y="70" width="220" height="140" rx="10" fill="#333333"/><rect x="100" y="80" width="200" height="120" fill="#218088"/><path d="M60 215h280l-15 22H75z" fill="#333333"/>',
    "Computadores de secretária": '<rect x="70" y="70" width="180" height="120" rx="8" fill="#333333"/><rect x="80" y="80" width="160" height="100" fill="#218088"/><path d="M145 190h30l10 40h-50z" fill="#333333"/><rect x="275" y="80" width="65" height="150" rx="8" fill="#333333"/><circle cx="307" cy="105" r="8" fill="#218088"/>',
    "Monitores": '<rect x="60" y="55" width="280" height="160" rx="10" fill="#333333"/><rect x="70" y="65" width="260" height="140" fill="#218088"/><path d="M185 215h30v25h45v10H140v-10h45z" fill="#333333"/>',
    "Smartphones": '<rect x="140" y="35" width="120" height="230" rx="22" fill="#333333"/><rect x="150" y="55" width="100" height="185" rx="6" fill="#218088"/><circle cx="200" cy="45" r="4" fill="#D9DEDF"/>',
    "Auscultadores": '<path d="M110 170v-30a90 90 0 01180 0v30" fill="none" stroke="#333333" stroke-width="18"/><rect x="85" y="150" width="50" height="85" rx="22" fill="#218088"/><rect x="265" y="150" width="50" height="85" rx="22" fill="#218088"/>',
    "Teclados": '<rect x="45" y="95" width="310" height="120" rx="14" fill="#333333"/><path d="M65 120h270M65 150h270" stroke="#D9DEDF" stroke-width="18" stroke-dasharray="20 8"/><path d="M120 185h160" stroke="#218088" stroke-width="18"/>',
    "Ratos": '<rect x="145" y="60" width="110" height="180" rx="55" fill="#333333"/><path d="M200 65v75M150 140h100" stroke="#D9DEDF" stroke-width="4"/><rect x="191" y="85" width="18" height="35" rx="9" fill="#218088"/>',
    "Carregadores": '<rect x="130" y="100" width="140" height="140" rx="22" fill="#333333"/><path d="M170 100V60M230 100V60" stroke="#333333" stroke-width="16"/><path d="M210 125l-35 55h25l-10 40 38-58h-26z" fill="#218088"/>',
    "Cabos": '<path d="M90 90c150-30 10 130 120 130s0-130 100-100" fill="none" stroke="#333333" stroke-width="14"/><rect x="55" y="75" width="48" height="34" rx="7" fill="#218088"/><rect x="298" y="105" width="48" height="34" rx="7" fill="#218088"/>',
    "Colunas Bluetooth": '<rect x="80" y="90" width="240" height="130" rx="40" fill="#333333"/><circle cx="145" cy="155" r="40" fill="#218088"/><circle cx="255" cy="155" r="40" fill="#218088"/><circle cx="145" cy="155" r="14" fill="#D9DEDF"/><circle cx="255" cy="155" r="14" fill="#D9DEDF"/>'
  };
  const criarImagem = (tipo) => "data:image/svg+xml," + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300"><rect width="400" height="300" fill="#F3F4F5"/>${DESENHOS[tipo]}</svg>`);

  /* ===== Catálogo (dados fictícios). Preços em kwanzas. =====
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

  /* ===== Renderização dos produtos ===== */
  function blocoPreco(p) {
    const anterior = p.promocao ? `<s class="preco-anterior"><span class="oculto-visualmente">Preço anterior: </span>${formatarPreco(p.preco)}</s>` : "";
    return `<p class="bloco-preco"><span class="preco-produto">${formatarPreco(precoActual(p))}</span>${anterior}</p>`;
  }
  const textoStock = (p) => p.stock > 0
    ? `<p class="estado-stock">Em stock: ${p.stock} unidades</p>`
    : '<p class="estado-stock sem-stock">Esgotado</p>';

  const criarCartao = (p) => `
    <article class="cartao-produto">
      <img class="imagem-produto" src="${p.imagem}" alt="Ilustração de ${p.nome}" loading="lazy" width="400" height="300">
      ${p.promocao ? `<span class="etiqueta-promocao">Promoção -${Math.round((1 - p.promocao / p.preco) * 100)}%</span>` : ""}
      <div class="informacao-produto">
        <p class="categoria-produto">${p.categoria} · ${p.tipo}</p>
        <h3 class="nome-produto">${p.nome}</h3>
        ${blocoPreco(p)}
        ${textoStock(p)}
        <div class="accoes-produto">
          <button type="button" class="botao botao-contorno" data-detalhes="${p.id}" aria-label="Ver detalhes de ${p.nome}">Ver detalhes</button>
          <button type="button" class="botao botao-principal botao-adicionar" data-adicionar="${p.id}" ${p.stock ? `aria-label="Adicionar ao carrinho: ${p.nome}"` : "disabled"}>${p.stock ? "Adicionar ao carrinho" : "Esgotado"}</button>
        </div>
      </div>
    </article>`;

  /* ===== Pesquisa e filtros combinados ===== */
  function filtrarProdutos() {
    const termo = normalizar(elementos.pesquisa.value);
    const [tipoFiltro, valorFiltro] = elementos.categoria.value.split(":");
    const minimo = elementos.minimo.value === "" ? 0 : Number(elementos.minimo.value);
    const maximo = elementos.maximo.value === "" ? Infinity : Number(elementos.maximo.value);
    const intervaloInvalido = minimo > maximo;
    elementos.erro.hidden = !intervaloInvalido;

    const resultados = intervaloInvalido ? [] : PRODUTOS.filter((p) =>
      normalizar(p.nome).includes(termo) &&
      (!categoriaPagina || p.categoria === categoriaPagina) &&
      (tipoFiltro === "todas" || (tipoFiltro === "cat" ? p.categoria : p.tipo) === valorFiltro) &&
      precoActual(p) >= minimo && precoActual(p) <= maximo);

    elementos.catalogo.innerHTML = resultados.map(criarCartao).join("");
    elementos.semResultados.hidden = resultados.length > 0 || intervaloInvalido;
    elementos.contagem.textContent = resultados.length === 1 ? "1 produto encontrado" : `${resultados.length} produtos encontrados`;
  }

  function limparFiltros() {
    elementos.categoria.value = filtroInicial;
    elementos.minimo.value = elementos.maximo.value = elementos.pesquisa.value = "";
    filtrarProdutos();
  }

  // Preenche a lista de categorias; nas páginas de categoria mostra só os seus tipos.
  function prepararCatalogo() {
    const nomes = categoriaPagina ? [categoriaPagina] : Object.keys(CATEGORIAS);
    const todas = categoriaPagina ? "" : '<option value="todas">Todas as categorias</option>';
    elementos.categoria.innerHTML = todas + nomes.map((categoria) => {
      const tipos = [...new Set(PRODUTOS.filter((p) => p.categoria === categoria).map((p) => p.tipo))];
      return `<optgroup label="${categoria}"><option value="cat:${categoria}">${categoria} (todos)</option>${tipos.map((t) => `<option value="tipo:${t}">${t}</option>`).join("")}</optgroup>`;
    }).join("");
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

  function prepararInicio() {
    $("#imagem-principal").src = criarImagem("Portáteis");
    const paginas = { "Computadores": "computadores.html", "Telemóveis": "telemoveis.html", "Acessórios": "acessorios.html" };
    $("#lista-categorias").innerHTML = Object.entries(CATEGORIAS).map(([categoria, desenho]) =>
      `<a class="cartao-categoria" href="${paginas[categoria]}">
        <img class="imagem-categoria" src="${criarImagem(desenho)}" alt=""><span>${categoria}</span>
      </a>`).join("");
    $("#lista-destaques").innerHTML = PRODUTOS.filter((p) => p.destaque).map(criarCartao).join("");
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
    // Cada página só prepara o conteúdo que possui.
    if (elementos.catalogo) prepararCatalogo();
    else prepararInicio();
    desenharCarrinho();
    ligarEventos();
  }

  iniciar();
})();
