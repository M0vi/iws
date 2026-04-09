'use strict';

/* ── DADOS SOLUÇÕES ── */
var SOLUCOES = [
  {ico:'🪨', tag:'Perfuração', title:'Brocas PDC & Tricônicas Premium', desc:'Brocas customizadas VAREL para Pré-Sal e OnShore. +64% ROP médio, redução de custo de até 75% por poço nos diâmetros 8½" e 12¼".'},
  {ico:'🧪', tag:'Laboratório', title:'Equipamentos OFITE', desc:'Linha completa para análise e controle de fluidos: viscosímetros, filtros API, células HPHT — padrão mundial em laboratórios de O&G.'},
  {ico:'🔩', tag:'Completação', title:'Acessórios de Cimentação – DIGGER', desc:'Sapatas, colares de estágio, packers mecânicos/hidráulicos, bridge plugs e CaseRunner. Materiais L-80 a Q-125, certificados API.'},
  {ico:'📊', tag:'Data Science / IA', title:'Otimização em Tempo Real – DEEPVIEW', desc:'Software EDR em 1 seg/ciclo. Recomenda parâmetros ótimos, detecta stall de motor e gerencia MSE. Economia comprovada de 34% por poço.'},
  {ico:'🌊', tag:'Fluidos', title:'Engenharia de Fluidos de Perfuração', desc:'DESC Engineer + campo: seleção do fluido, controle de pressão, prevenção de danos à formação e monitoramento reológico com MUDWATCHER.'},
  {ico:'⚙️', tag:'Controle de Sólidos', title:'Controle de Sólidos & Filtração', desc:'Centrifugas GN Solids Control, secadoras de cascalho, unidades de filtração modulares e bombas NEMO para operações mais limpas e eficientes.'},
  {ico:'🔬', tag:'Nanotecnologia', title:'Reservoir Solutions – TenEx NanoCLEAR®', desc:'Nanofluidos de óxido-metálico com forças químicas + mecânicas. Média de +98% na produção de óleo sustentada por 16 meses em múltiplas bacias.'},
  {ico:'🤖', tag:'Inteligência Artificial', title:'Sistema IA – Gerenciamento de Riscos', desc:'IA para análise em tempo real, manutenção preditiva e tomada de decisão automatizada. Integra sensores P/T, EDR e sistemas BEC/DAQ+.'},
];

/*
  CLIENTES: "file" = nome exato do arquivo dentro da pasta clientes/
  (sem extensão). O código tenta .png, depois .jpg, depois mostra inicial.
  Edite os valores de "file" conforme os arquivos reais na sua pasta clientes/.
*/
var CLIENTS = [
  {file:'Petrobras',      label:'Petrobras'},
  {file:'Eneva',          label:'Eneva'},
  {file:'PetroReconcavo', label:'PetroReconcavo'},
  {file:'3R-Petroleum',   label:'3R Petroleum'},
  {file:'Imetame',        label:'Imetame'},
  {file:'Carmo-Energy',   label:'Carmo Energy'},
  {file:'Equinor',        label:'Equinor'},
  {file:'Origem',         label:'Origem'},
  {file:'Baker-Hughes',   label:'Baker Hughes'},
  {file:'Matra',          label:'Matra'},
  {file:'Acu-Petroleo',   label:'Açu Petróleo'},
  {file:'Seacrest',       label:'Seacrest Petróleo'},
  {file:'Great-Energy',   label:'Great Energy'},
];

/* ── RENDER SOLUÇÕES ── */
function renderSolucoes() {
  var grid = document.getElementById('sol-grid');
  if (!grid) return;
  SOLUCOES.forEach(function(s) {
    var card = document.createElement('div');
    card.className = 'sol-card';

    var ico = document.createElement('div');
    ico.className = 'sc-ico';
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
  var card = document.createElement('div');
  card.className = 'client-card';

  var img = document.createElement('img');
  img.alt = c.label;
  img.loading = 'lazy';
  img.src = 'clientes/' + c.file + '.png';

  // Fallback: .png → .jpg → placeholder com inicial
  var tried = false;
  img.onerror = function() {
    if (!tried) {
      tried = true;
      img.src = 'clientes/' + c.file + '.jpg';
    } else {
      // Substitui por placeholder
      var ph = document.createElement('div');
      ph.className = 'cc-ph';
      ph.textContent = c.label.charAt(0).toUpperCase();
      img.parentNode.replaceChild(ph, img);
    }
  };

  var name = document.createElement('span');
  name.className = 'cc-name';
  name.textContent = c.label;

  card.appendChild(img);
  card.appendChild(name);
  return card;
}

function renderClientes() {
  var track = document.getElementById('mq-track');
  if (!track) return;

  // Insere 2x para loop visual contínuo
  var all = CLIENTS.concat(CLIENTS);
  all.forEach(function(c) {
    track.appendChild(makeClientCard(c));
  });

  // Ajusta duração: ~2.8s por card
  track.style.animationDuration = (CLIENTS.length * 2.8) + 's';
}

/* ── NAVBAR ── */
function initNav() {
  var nav     = document.getElementById('nav');
  var burger  = document.getElementById('burger');
  var links   = document.getElementById('nav-links');
  if (!nav || !burger || !links) return;

  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, {passive: true});

  burger.addEventListener('click', function() {
    var open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    links.classList.toggle('open', !open);
    document.body.style.overflow = !open ? 'hidden' : '';
  });

  links.querySelectorAll('.nl').forEach(function(a) {
    a.addEventListener('click', function() {
      burger.setAttribute('aria-expanded', 'false');
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      burger.setAttribute('aria-expanded', 'false');
      links.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Active link
  if ('IntersectionObserver' in window) {
    var nls = document.querySelectorAll('.nl[href^="#"]');
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          nls.forEach(function(l) { l.classList.remove('active'); });
          var a = document.querySelector('.nl[href="#' + e.target.id + '"]');
          if (a) a.classList.add('active');
        }
      });
    }, {rootMargin: '-68px 0px -55% 0px'});
    document.querySelectorAll('main section[id]').forEach(function(s) { obs.observe(s); });
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