'use strict';

/* ─── DADOS ─────────────────────────────────────────────────────────────── */

var SOLUCOES = [
  {
    tag: 'Perfuração',
    title: 'Brocas PDC & Tricônicas VAREL',
    desc: 'Brocas customizadas para Pré-Sal e OnShore. +64% ROP médio, redução de custo de até 75% por poço nos diâmetros 8½\" e 12¼\".',
    svgPath: 'M20,4 24,16 36,16 26,24 30,36 20,28 10,36 14,24 4,16 16,16z',
    svgExtra: 'circle'
  },
  {
    tag: 'Laboratório',
    title: 'Equipamentos OFITE',
    desc: 'Linha completa para análise e controle de fluidos: viscosímetros, filtros API, células HPHT — padrão mundial em laboratórios de O&G.',
    svgPath: null
  },
  {
    tag: 'Completação',
    title: 'Acessórios de Cimentação — DIGGER',
    desc: 'Sapatas, colares de estágio, packers mecânicos/hidráulicos, bridge plugs e CaseRunner. Materiais L-80 a Q-125, certificados API.',
    svgPath: null
  },
  {
    tag: 'Data Science / IA',
    title: 'Otimização em Tempo Real — DEEPVIEW',
    desc: 'Software EDR em ciclos de 1 segundo. Recomenda parâmetros ótimos, detecta stall de motor e gerencia MSE. Economia comprovada de 34% por poço.',
    svgPath: null
  },
  {
    tag: 'Fluidos',
    title: 'Engenharia de Fluidos de Perfuração',
    desc: 'Seleção do fluido, controle de pressão, prevenção de danos à formação e monitoramento reológico com MUDWATCHER em campo.',
    svgPath: null
  },
  {
    tag: 'Controle de Sólidos',
    title: 'Controle de Sólidos & Filtração',
    desc: 'Centrífugas GN Solids Control, secadoras de cascalho e unidades de filtração modulares para operações mais limpas e eficientes.',
    svgPath: null
  },
  {
    tag: 'Nanotecnologia',
    title: 'Reservoir Solutions — TenEx NanoCLEAR®',
    desc: 'Nanofluidos de óxido-metálico com atuação química e mecânica. +98% de produção de óleo sustentados por 16 meses em múltiplas bacias.',
    svgPath: null
  },
  {
    tag: 'Inteligência Artificial',
    title: 'Sistema IA — Gerenciamento de Riscos',
    desc: 'Análise em tempo real, manutenção preditiva e decisão automatizada. Integra sensores P/T, EDR e sistemas BEC/DAQ+.',
    svgPath: null
  },
];

/* SVGs estáticos por índice — evita innerHTML com conteúdo dinâmico */
var SOL_SVGS = [
  '<svg viewBox="0 0 40 40" fill="none"><polygon points="20,4 24,16 36,16 26,24 30,36 20,28 10,36 14,24 4,16 16,16" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="20" cy="20" r="4" stroke="currentColor" stroke-width="1.8"/></svg>',
  '<svg viewBox="0 0 40 40" fill="none"><path d="M15 6v14l-7 12h24L25 20V6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><line x1="13" y1="6" x2="27" y2="6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="17" cy="27" r="1.5" fill="currentColor"/><circle cx="23" cy="30" r="1.5" fill="currentColor"/></svg>',
  '<svg viewBox="0 0 40 40" fill="none"><rect x="14" y="4" width="12" height="32" rx="2" stroke="currentColor" stroke-width="1.8"/><line x1="14" y1="12" x2="26" y2="12" stroke="currentColor" stroke-width="1.8"/><line x1="14" y1="20" x2="26" y2="20" stroke="currentColor" stroke-width="1.8"/><line x1="14" y1="28" x2="26" y2="28" stroke="currentColor" stroke-width="1.8"/><path d="M10 8h4M26 8h4M10 24h4M26 24h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  '<svg viewBox="0 0 40 40" fill="none"><polyline points="4,28 12,18 18,22 26,10 36,16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="26" cy="10" r="2.5" stroke="currentColor" stroke-width="1.8"/><line x1="4" y1="32" x2="36" y2="32" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".4"/></svg>',
  '<svg viewBox="0 0 40 40" fill="none"><path d="M20 6C14 14 8 18 8 24a12 12 0 0024 0c0-6-6-10-12-18z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 26q6-4 12 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".6"/></svg>',
  '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="currentColor" stroke-width="1.8"/><circle cx="20" cy="20" r="6" stroke="currentColor" stroke-width="1.8"/><line x1="20" y1="6" x2="20" y2="14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="20" y1="26" x2="20" y2="34" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="6" y1="20" x2="14" y2="20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="26" y1="20" x2="34" y2="20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="4" stroke="currentColor" stroke-width="1.8"/><circle cx="20" cy="8" r="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="20" cy="32" r="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="20" r="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="32" cy="20" r="2.5" stroke="currentColor" stroke-width="1.5"/><line x1="20" y1="10.5" x2="20" y2="16" stroke="currentColor" stroke-width="1.3" opacity=".5"/><line x1="20" y1="24" x2="20" y2="29.5" stroke="currentColor" stroke-width="1.3" opacity=".5"/><line x1="10.5" y1="20" x2="16" y2="20" stroke="currentColor" stroke-width="1.3" opacity=".5"/><line x1="24" y1="20" x2="29.5" y2="20" stroke="currentColor" stroke-width="1.3" opacity=".5"/></svg>',
  '<svg viewBox="0 0 40 40" fill="none"><rect x="12" y="10" width="16" height="16" rx="3" stroke="currentColor" stroke-width="1.8"/><circle cx="20" cy="18" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M16 10V7M24 10V7M16 30v3M24 30v3M10 14H7M10 22H7M30 14h3M30 22h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
];

var CLIENTS = [
  {file:'PETROBRAS',      label:'Petrobras'},
  {file:'ENEVA',          label:'Eneva'},
  {file:'PETRORECONCAVO', label:'PetroReconcavo'},
  {file:'3R PETROLEUM',   label:'3R Petroleum'},
  {file:'IMETAME',        label:'Imetame'},
  {file:'CARMO ENERGY',   label:'Carmo Energy'},
  {file:'EQUINOR',        label:'Equinor'},
  {file:'ORIGEM',         label:'Origem'},
  {file:'BAKER HUGHES',   label:'Baker Hughes'},
  {file:'MATRA',          label:'Matra'},
  {file:'SEACREST',       label:'Seacrest'},
  {file:'GREAT ENERGY',   label:'Great Energy'},
];

/* ─── UTILITÁRIOS ───────────────────────────────────────────────────────── */

function usuarioEstaNoCelular() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

/* ─── SPLASH ────────────────────────────────────────────────────────────── */

function mostrarTelaDeEntrada() {
  var splash = document.getElementById('splash');
  if (!splash) return;

  function removerSplash() {
    if (splash.parentNode) splash.parentNode.removeChild(splash);
  }

  function esconderSplash() {
    splash.style.pointerEvents = 'none';
    splash.style.userSelect    = 'none';
    splash.classList.add('hide');
    setTimeout(removerSplash, 550);
    setTimeout(removerSplash, 900);
    setTimeout(removerSplash, 1400);
  }

  if (document.readyState === 'complete') {
    esconderSplash();
  } else {
    window.addEventListener('load', esconderSplash, { once: true });
  }
  setTimeout(esconderSplash, 1200);
  setTimeout(esconderSplash, 2000);
}

/* ─── REVEAL (scroll) ───────────────────────────────────────────────────── */

function ativarAnimacoesDeEntrada() {
  var els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function(el) { el.classList.add('in'); });
    return;
  }
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });
  els.forEach(function(el) { observer.observe(el); });
}

/* ─── CONTADORES ────────────────────────────────────────────────────────── */

function animarNumero(el) {
  var alvo     = parseInt(el.getAttribute('data-target'), 10);
  var prefixo  = el.getAttribute('data-prefix') || '';
  var sufixo   = el.getAttribute('data-suffix') || '';
  var duracao  = 1600;
  var inicio   = null;
  function suavizar(t) { return t < .5 ? 2*t*t : -1+(4-2*t)*t; }
  function passo(ts) {
    if (!inicio) inicio = ts;
    var progresso = Math.min((ts - inicio) / duracao, 1);
    el.textContent = prefixo + Math.round(suavizar(progresso) * alvo) + sufixo;
    if (progresso < 1) requestAnimationFrame(passo);
    else el.textContent = prefixo + alvo + sufixo;
  }
  requestAnimationFrame(passo);
}

function ligarContadores() {
  if (!('IntersectionObserver' in window)) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animarNumero(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.case-stat[data-target]').forEach(function(el) {
    observer.observe(el);
  });
}

/* ─── SOLUÇÕES (render) ─────────────────────────────────────────────────── */

function montarCardsDeSolucoes() {
  var grid = document.getElementById('sol-grid');
  if (!grid) return;
  SOLUCOES.forEach(function(s, i) {
    var card = document.createElement('div');
    card.className = 'sol-card reveal';
    card.setAttribute('role', 'listitem');

    var ico = document.createElement('div');
    ico.className = 'sc-ico';
    ico.setAttribute('aria-hidden', 'true');
    /* SVGs são estáticos e confiáveis — definidos no próprio código */
    if (SOL_SVGS[i]) ico.innerHTML = SOL_SVGS[i];

    var tag   = document.createElement('span'); tag.className = 'sc-tag';   tag.textContent = s.tag;
    var h3    = document.createElement('h3');   h3.className  = 'sc-title'; h3.textContent  = s.title;
    var p     = document.createElement('p');    p.className   = 'sc-desc';  p.textContent   = s.desc;

    card.appendChild(ico);
    card.appendChild(tag);
    card.appendChild(h3);
    card.appendChild(p);
    grid.appendChild(card);
  });
}

/* ─── CLIENTES (carrossel) ──────────────────────────────────────────────── */

var SAFE_FILENAME = /^[A-Za-z0-9À-ÿ _\-&.]+$/;
function validarNomeDeArquivo(nome) { return SAFE_FILENAME.test(nome) ? nome : ''; }

function exibirInicialDoCliente(card, imgEl, label) {
  var ph = document.createElement('div');
  ph.className = 'cc-ph';
  ph.setAttribute('aria-hidden', 'true');
  ph.textContent = (label || '?').charAt(0).toUpperCase();
  if (imgEl && imgEl.parentNode) imgEl.parentNode.replaceChild(ph, imgEl);
  else card.insertBefore(ph, card.firstChild);
}

function criarCardDeCliente(c) {
  var nomeSeguro  = validarNomeDeArquivo(c.file);
  var labelSeguro = String(c.label).replace(/[<>"'&]/g, '');
  var card = document.createElement('div');
  card.className = 'client-card';

  if (nomeSeguro) {
    var img = document.createElement('img');
    img.alt = labelSeguro; img.loading = 'lazy'; img.decoding = 'async';
    img.src = 'clientes/' + nomeSeguro + '.png';
    var tentouJpg = false;
    img.onerror = function() {
      if (!tentouJpg) {
        tentouJpg = true;
        img.onerror = function() { img.onerror = null; exibirInicialDoCliente(card, img, labelSeguro); };
        img.src = 'clientes/' + nomeSeguro + '.jpg';
      }
    };
    card.appendChild(img);
  } else {
    exibirInicialDoCliente(card, null, labelSeguro);
  }

  var nome = document.createElement('span');
  nome.className = 'cc-name';
  nome.textContent = labelSeguro;
  card.appendChild(nome);
  return card;
}

function montarCarrosselDeClientes(track) {
  var todos = CLIENTS.concat(CLIENTS);
  var frag  = document.createDocumentFragment();
  todos.forEach(function(c) { frag.appendChild(criarCardDeCliente(c)); });
  track.appendChild(frag);
}

function exibirCarrosselDeClientes() {
  var track = document.getElementById('mq-track');
  if (!track) return;
  if (!('IntersectionObserver' in window)) { montarCarrosselDeClientes(track); return; }
  var alvo = document.getElementById('clientes') || track;
  var observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) { montarCarrosselDeClientes(track); observer.disconnect(); }
  }, { rootMargin: '300px' });
  observer.observe(alvo);
}

/* ─── CATÁLOGO (download mobile) ────────────────────────────────────────── */

function configurarLinksDoCatalogo() {
  var ids = ['catalog-link-hero', 'catalog-link-section'];
  ids.forEach(function(id) {
    var link = document.getElementById(id);
    if (!link) return;
    if (usuarioEstaNoCelular()) {
      link.setAttribute('download', 'OFITE_Catalog.pdf');
      link.removeAttribute('target');
    } else {
      link.setAttribute('target', '_blank');
      link.removeAttribute('download');
    }
  });
}

/* ─── NAVEGAÇÃO ─────────────────────────────────────────────────────────── */

function ligarMenuDeNavegacao() {
  var nav     = document.getElementById('nav');
  var burger  = document.getElementById('burger');
  var links   = document.getElementById('nav-links');
  var overlay = document.getElementById('nav-overlay');
  if (!nav || !burger || !links) return;

  var primeiroLink = links.querySelector('.nl');

  function abrirMenu() {
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Fechar menu');
    links.classList.add('open');
    if (overlay) {
      overlay.removeAttribute('aria-hidden');
      overlay.classList.add('visible');
    }
    document.body.style.overflow = 'hidden';
    if (primeiroLink) primeiroLink.focus();
  }

  function fecharMenu() {
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menu');
    links.classList.remove('open');
    if (overlay) {
      overlay.setAttribute('aria-hidden', 'true');
      overlay.classList.remove('visible');
    }
    document.body.style.overflow = '';
    burger.focus();
  }

  links.addEventListener('keydown', function(e) {
    if (!links.classList.contains('open')) return;
    if (e.key !== 'Tab') return;
    var focusaveis = Array.from(links.querySelectorAll('a'));
    var primeiro = focusaveis[0], ultimo = focusaveis[focusaveis.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
  });

  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  burger.addEventListener('click', function() {
    if (burger.getAttribute('aria-expanded') === 'true') fecharMenu();
    else abrirMenu();
  });

  links.querySelectorAll('.nl').forEach(function(a) {
    a.addEventListener('click', fecharMenu);
  });

  if (overlay) overlay.addEventListener('click', fecharMenu);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && links.classList.contains('open')) fecharMenu();
  });

  if ('IntersectionObserver' in window) {
    var navLinks = document.querySelectorAll('.nl[href^="#"]');
    var secaoObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function(l) { l.classList.remove('active'); });
        var id     = entry.target.id.replace(/[^\w-]/g, '');
        var ativo  = document.querySelector('.nl[href="#' + id + '"]');
        if (ativo) ativo.classList.add('active');
      });
    }, { rootMargin: '-68px 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(function(s) {
      secaoObserver.observe(s);
    });
  }
}

/* ─── SCROLL TO TOP ─────────────────────────────────────────────────────── */

function ligarBotaoVoltarAoTopo() {
  var btn = document.getElementById('scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    btn.classList.toggle('show', window.scrollY > 380);
  }, { passive: true });
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── ANO NO FOOTER ─────────────────────────────────────────────────────── */

function atualizarAnoDoPe() {
  var el = document.getElementById('yr');
  if (el) el.textContent = new Date().getFullYear();
}

/* ─── INICIALIZAÇÃO ─────────────────────────────────────────────────────── */

function iniciar() {
  mostrarTelaDeEntrada();
  montarCardsDeSolucoes();
  exibirCarrosselDeClientes();
  ligarMenuDeNavegacao();
  ativarAnimacoesDeEntrada();
  ligarContadores();
  ligarBotaoVoltarAoTopo();
  configurarLinksDoCatalogo();
  atualizarAnoDoPe();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciar);
} else {
  iniciar();
}