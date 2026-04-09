'use strict';

/* ── DADOS SOLUÇÕES ── */
var SOLUCOES = [
  {ico:'🪨', tag:'Perfuração', title:'Brocas PDC & Tricônicas Premium', desc:'Brocas customizadas VAREL para Pré-Sal e OnShore. +64% ROP médio, redução de custo de até 75% por poço nos diâmetros 8½" e 12¼".'},
  {ico:'🧪', tag:'Laboratório', title:'Equipamentos OFITE', desc:'Linha completa para análise e controle de fluidos: viscosímetros, filtros API, células HPHT — padrão mundial em laboratórios de O&G.'},
  {ico:'🔩', tag:'Completação', title:'Acessórios de Cimentação – DIGGER', desc:'Sapatas, colares de estágio, packers mecânicos/hidráulicos, bridge plugs e CaseRunner. Materiais L-80 a Q-125, certificados API.'},
  {ico:'📊', tag:'Data Science / IA', title:'Otimização em Tempo Real – DEEPVIEW', desc:'Software EDR em 1 seg/ciclo. Recomenda parâmetros ótimos, detecta stall de motor e gerencia MSE. Economia comprovada de 34% por poço.'},
  {ico:'🌊', tag:'Fluidos', title:'Engenharia de Fluidos de Perfuração', desc:'DESC Engineer + campo: seleção do fluido, controle de pressão, prevenção de danos à formação e monitoramento reológico com MUDWATCHER.'},
  {ico:'⚙️', tag:'Controle de Sólidos', title:'Controle de Sólidos & Filtração', desc:'Centrífugas GN Solids Control, secadoras de cascalho, unidades de filtração modulares e bombas NEMO para operações mais limpas e eficientes.'},
  {ico:'🔬', tag:'Nanotecnologia', title:'Reservoir Solutions – TenEx NanoCLEAR®', desc:'Nanofluidos de óxido-metálico com forças químicas + mecânicas. Média de +98% na produção de óleo sustentada por 16 meses em múltiplas bacias.'},
  {ico:'🤖', tag:'Inteligência Artificial', title:'Sistema IA – Gerenciamento de Riscos', desc:'IA para análise em tempo real, manutenção preditiva e tomada de decisão automatizada. Integra sensores P/T, EDR e sistemas BEC/DAQ+.'},
];

/*
  CLIENTES — "file" deve corresponder exatamente ao nome do arquivo
  dentro da pasta clientes/ (sem extensão, case-sensitive no Linux).
*/
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

/* ─────────────────────────────────────────────
   SEGURANÇA: valida que um nome de arquivo
   de cliente não contém caracteres que
   permitiriam path traversal ou injeção.
   Aceita apenas letras, números, espaços e
   alguns símbolos seguros.
───────────────────────────────────────────── */
var SAFE_FILENAME = /^[A-Za-z0-9À-ÿ _\-&.]+$/;

function safeClientFile(name) {
  return SAFE_FILENAME.test(name) ? name : '';
}

/* ── RENDER SOLUÇÕES ── */
function renderSolucoes() {
  var grid = document.getElementById('sol-grid');
  if (!grid) return;

  SOLUCOES.forEach(function(s) {
    /* Todos os dados são internos/hardcoded — inseridos via textContent
       para garantir que nenhum HTML seja interpretado                   */
    var card = document.createElement('div');
    card.className = 'sol-card';
    card.setAttribute('role', 'listitem');

    var ico = document.createElement('div');
    ico.className = 'sc-ico';
    ico.setAttribute('aria-hidden', 'true');
    ico.textContent = s.ico;

    var tag = document.createElement('span');
    tag.className = 'sc-tag';
    tag.textContent = s.tag;

    var h3 = document.createElement('h3');
    h3.className = 'sc-title';
    h3.textContent = s.title;

    var p = document.createElement('p');
    p.className = 'sc-desc';
    p.textContent = s.desc;

    card.appendChild(ico);
    card.appendChild(tag);
    card.appendChild(h3);
    card.appendChild(p);
    grid.appendChild(card);
  });
}

/* ── RENDER CLIENTES (marquee) ── */
function makeClientCard(c) {
  var safeFile  = safeClientFile(c.file);
  var safeLabel = String(c.label).replace(/[<>"'&]/g, '');   /* strip HTML chars */

  var card = document.createElement('div');
  card.className = 'client-card';

  if (safeFile) {
    var img = document.createElement('img');
    /* Construct path safely — never interpolate untrusted data */
    img.alt     = safeLabel;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.src     = 'clientes/' + safeFile + '.png';

    /* Fallback: .png → .jpg → text placeholder */
    var triedJpg = false;
    img.onerror = function() {
      if (!triedJpg) {
        triedJpg = true;
        /* Reset onerror before changing src to avoid infinite loop */
        img.onerror = function() {
          img.onerror = null;
          showPlaceholder(card, img, safeLabel);
        };
        img.src = 'clientes/' + safeFile + '.jpg';
      }
    };

    card.appendChild(img);
  } else {
    showPlaceholder(card, null, safeLabel);
  }

  var name = document.createElement('span');
  name.className = 'cc-name';
  name.textContent = safeLabel;
  card.appendChild(name);

  return card;
}

function showPlaceholder(card, imgEl, label) {
  var ph = document.createElement('div');
  ph.className = 'cc-ph';
  ph.setAttribute('aria-hidden', 'true');
  ph.textContent = (label || '?').charAt(0).toUpperCase();
  if (imgEl && imgEl.parentNode) {
    imgEl.parentNode.replaceChild(ph, imgEl);
  } else {
    card.insertBefore(ph, card.firstChild);
  }
}

function renderClientes() {
  var track = document.getElementById('mq-track');
  if (!track) return;

  /* Duplicate list for seamless CSS loop */
  var all = CLIENTS.concat(CLIENTS);
  var frag = document.createDocumentFragment();
  all.forEach(function(c) {
    frag.appendChild(makeClientCard(c));
  });
  track.appendChild(frag);

  /* ~2.8 s per card */
  track.style.animationDuration = (CLIENTS.length * 2.8) + 's';
}

/* ── NAVBAR ── */
function initNav() {
  var nav     = document.getElementById('nav');
  var burger  = document.getElementById('burger');
  var links   = document.getElementById('nav-links');
  var overlay = document.getElementById('nav-overlay');
  if (!nav || !burger || !links) return;

  function openMenu() {
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Fechar menu');
    links.classList.add('open');
    if (overlay) overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menu');
    links.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  /* Scroll → add .scrolled class */
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, {passive: true});

  /* Burger toggle */
  burger.addEventListener('click', function() {
    if (burger.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    } else {
      openMenu();
    }
  });

  /* Close on link click */
  links.querySelectorAll('.nl').forEach(function(a) {
    a.addEventListener('click', closeMenu);
  });

  /* Close on overlay click */
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  /* Close on Escape */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      closeMenu();
      burger.focus();
    }
  });

  /* Active link via IntersectionObserver */
  if ('IntersectionObserver' in window) {
    var navLinks = document.querySelectorAll('.nl[href^="#"]');
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function(l) { l.classList.remove('active'); });
          /* Safely escape the id before using it as a CSS attribute selector */
          var id = entry.target.id.replace(/[^\w-]/g, '');
          var active = document.querySelector('.nl[href="#' + id + '"]');
          if (active) active.classList.add('active');
        }
      });
    }, {rootMargin: '-68px 0px -55% 0px', threshold: 0});

    document.querySelectorAll('main section[id]').forEach(function(s) {
      observer.observe(s);
    });
  }
}

/* ── SCROLL TOP ── */
function initScrollTop() {
  var btn = document.getElementById('scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    btn.classList.toggle('show', window.scrollY > 380);
  }, {passive: true});
  btn.addEventListener('click', function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
}

/* ── FOOTER YEAR ── */
function setYear() {
  var el = document.getElementById('yr');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── INIT ── */
function init() {
  renderSolucoes();
  renderClientes();
  initNav();
  initScrollTop();
  setYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}