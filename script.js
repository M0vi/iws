'use strict';

var SOLUCOES = [
  {
    tag: 'Perfuração',
    title: 'Brocas PDC & Tricônicas Premium',
    desc: 'Brocas customizadas VAREL para Pré-Sal e OnShore. +64% ROP médio, redução de custo de até 75% por poço nos diâmetros 8½" e 12¼".',
    svg: '<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="20,4 24,16 36,16 26,24 30,36 20,28 10,36 14,24 4,16 16,16" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" fill="none"/><circle cx="20" cy="20" r="4" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>'
  },
  {
    tag: 'Laboratório',
    title: 'Equipamentos OFITE',
    desc: 'Linha completa para análise e controle de fluidos: viscosímetros, filtros API, células HPHT — padrão mundial em laboratórios de O&G.',
    svg: '<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 6v14l-7 12h24L25 20V6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><line x1="13" y1="6" x2="27" y2="6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="17" cy="27" r="1.5" fill="currentColor"/><circle cx="23" cy="30" r="1.5" fill="currentColor"/></svg>'
  },
  {
    tag: 'Completação',
    title: 'Acessórios de Cimentação – DIGGER',
    desc: 'Sapatas, colares de estágio, packers mecânicos/hidráulicos, bridge plugs e CaseRunner. Materiais L-80 a Q-125, certificados API.',
    svg: '<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="4" width="12" height="32" rx="2" stroke="currentColor" stroke-width="1.8"/><line x1="14" y1="12" x2="26" y2="12" stroke="currentColor" stroke-width="1.8"/><line x1="14" y1="20" x2="26" y2="20" stroke="currentColor" stroke-width="1.8"/><line x1="14" y1="28" x2="26" y2="28" stroke="currentColor" stroke-width="1.8"/><path d="M10 8h4M26 8h4M10 24h4M26 24h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
  },
  {
    tag: 'Data Science / IA',
    title: 'Otimização em Tempo Real – DEEPVIEW',
    desc: 'Software EDR em 1 seg/ciclo. Recomenda parâmetros ótimos, detecta stall de motor e gerencia MSE. Economia comprovada de 34% por poço.',
    svg: '<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="4,28 12,18 18,22 26,10 36,16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="26" cy="10" r="2.5" stroke="currentColor" stroke-width="1.8" fill="none"/><line x1="4" y1="32" x2="36" y2="32" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'
  },
  {
    tag: 'Fluidos',
    title: 'Engenharia de Fluidos de Perfuração',
    desc: 'DESC Engineer + campo: seleção do fluido, controle de pressão, prevenção de danos à formação e monitoramento reológico com MUDWATCHER.',
    svg: '<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6 C14 14 8 18 8 24a12 12 0 0024 0c0-6-6-10-12-18z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" fill="none"/><path d="M14 26 q6-4 12 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/></svg>'
  },
  {
    tag: 'Controle de Sólidos',
    title: 'Controle de Sólidos & Filtração',
    desc: 'Centrífugas GN Solids Control, secadoras de cascalho, unidades de filtração modulares e bombas NEMO para operações mais limpas e eficientes.',
    svg: '<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="14" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="20" cy="20" r="6" stroke="currentColor" stroke-width="1.8" fill="none"/><line x1="20" y1="6" x2="20" y2="14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="20" y1="26" x2="20" y2="34" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="6" y1="20" x2="14" y2="20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="26" y1="20" x2="34" y2="20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
  },
  {
    tag: 'Nanotecnologia',
    title: 'Reservoir Solutions – TenEx NanoCLEAR®',
    desc: 'Nanofluidos de óxido-metálico com forças químicas + mecânicas. Média de +98% na produção de óleo sustentada por 16 meses em múltiplas bacias.',
    svg: '<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="4" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="20" cy="8" r="2.5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="20" cy="32" r="2.5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="8" cy="20" r="2.5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="32" cy="20" r="2.5" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="20" y1="10.5" x2="20" y2="16" stroke="currentColor" stroke-width="1.3" opacity="0.5"/><line x1="20" y1="24" x2="20" y2="29.5" stroke="currentColor" stroke-width="1.3" opacity="0.5"/><line x1="10.5" y1="20" x2="16" y2="20" stroke="currentColor" stroke-width="1.3" opacity="0.5"/><line x1="24" y1="20" x2="29.5" y2="20" stroke="currentColor" stroke-width="1.3" opacity="0.5"/></svg>'
  },
  {
    tag: 'Inteligência Artificial',
    title: 'Sistema IA – Gerenciamento de Riscos',
    desc: 'IA para análise em tempo real, manutenção preditiva e tomada de decisão automatizada. Integra sensores P/T, EDR e sistemas BEC/DAQ+.',
    svg: '<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="16" height="16" rx="3" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="20" cy="18" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M16 10V7M24 10V7M16 30v3M24 30v3M10 14H7M10 22H7M30 14h3M30 22h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
  },
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

var SAFE_FILENAME = /^[A-Za-z0-9À-ÿ _\-&.]+$/;

function safeClientFile(name) {
  return SAFE_FILENAME.test(name) ? name : '';
}

function renderSolucoes() {
  var grid = document.getElementById('sol-grid');
  if (!grid) return;

  SOLUCOES.forEach(function(s) {
    var card = document.createElement('div');
    card.className = 'sol-card';
    card.setAttribute('role', 'listitem');

    var ico = document.createElement('div');
    ico.className = 'sc-ico';
    ico.setAttribute('aria-hidden', 'true');
    ico.innerHTML = s.svg;

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

function makeClientCard(c) {
  var safeFile  = safeClientFile(c.file);
  var safeLabel = String(c.label).replace(/[<>"'&]/g, '');

  var card = document.createElement('div');
  card.className = 'client-card';

  if (safeFile) {
    var img = document.createElement('img');
    img.alt      = safeLabel;
    img.loading  = 'lazy';
    img.decoding = 'async';
    img.src      = 'clientes/' + safeFile + '.png';

    var triedJpg = false;
    img.onerror = function() {
      if (!triedJpg) {
        triedJpg = true;
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

  var all = CLIENTS.concat(CLIENTS);
  var frag = document.createDocumentFragment();
  all.forEach(function(c) { frag.appendChild(makeClientCard(c)); });
  track.appendChild(frag);
  track.style.animationDuration = (CLIENTS.length * 2.8) + 's';
}

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

  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, {passive: true});

  burger.addEventListener('click', function() {
    if (burger.getAttribute('aria-expanded') === 'true') { closeMenu(); } else { openMenu(); }
  });

  links.querySelectorAll('.nl').forEach(function(a) { a.addEventListener('click', closeMenu); });

  if (overlay) { overlay.addEventListener('click', closeMenu); }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      closeMenu();
      burger.focus();
    }
  });

  if ('IntersectionObserver' in window) {
    var navLinks = document.querySelectorAll('.nl[href^="#"]');
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function(l) { l.classList.remove('active'); });
          var id = entry.target.id.replace(/[^\w-]/g, '');
          var active = document.querySelector('.nl[href="#' + id + '"]');
          if (active) active.classList.add('active');
        }
      });
    }, {rootMargin: '-68px 0px -55% 0px', threshold: 0});

    document.querySelectorAll('main section[id]').forEach(function(s) { observer.observe(s); });
  }
}

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

function setYear() {
  var el = document.getElementById('yr');
  if (el) el.textContent = new Date().getFullYear();
}

function lockInteractions() {
  document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
  document.addEventListener('selectstart', function(e) { e.preventDefault(); });
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'a' || e.key === 'A' || e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')) {
      e.preventDefault();
    }
  });
}

function init() {
  renderSolucoes();
  renderClientes();
  initNav();
  initScrollTop();
  setYear();
  lockInteractions();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}