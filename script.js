'use strict';

/* ═══════════════════════════════════════
   DADOS
═══════════════════════════════════════ */
const SOLUCOES = [
  { icon:'🪨', tag:'Perfuração', title:'Brocas PDC & Tricônicas Premium', desc:'Brocas customizadas para Pré-Sal e OnShore com tecnologia VAREL. Aumento comprovado de 64% em ROP e redução de custos de até 75% por poço nos diâmetros 8½" e 12¼".' },
  { icon:'🧪', tag:'Laboratório', title:'Equipamentos OFITE', desc:'Linha completa para análise e controle de fluidos: viscosímetros, filtros API, células HPHT e analisadores de sólidos — padrão mundial em laboratórios de O&G.' },
  { icon:'🔩', tag:'Completação', title:'Acessórios de Cimentação – DIGGER', desc:'Sapatas escareadoras, colares de estágio, packers mecânicos/hidráulicos, bridge plugs e CaseRunner. Materiais L-80 a Q-125, certificados API.' },
  { icon:'📊', tag:'Data Science / IA', title:'Otimização em Tempo Real – DEEPVIEW', desc:'Software EDR a 1 seg/ciclo. Recomenda parâmetros ótimos, detecta stall, gerencia MSE e vibração. Economia comprovada de 34% por poço em múltiplas operadoras.' },
  { icon:'🌊', tag:'Fluidos', title:'Engenharia de Fluidos de Perfuração', desc:'DESC Engineer + campo: seleção do fluido, controle de pressão, prevenção de danos à formação e monitoramento reológico em tempo real com MUDWATCHER.' },
  { icon:'⚙️', tag:'Controle de Sólidos', title:'Controle de Sólidos & Filtração', desc:'Centrifugas decantadoras GN Solids Control, secadoras de cascalho, unidades de filtração modulares e bombas NEMO para redução de desgaste e impacto ambiental.' },
  { icon:'🔬', tag:'Nanotecnologia', title:'Reservoir Solutions – TenEx NanoCLEAR®', desc:'Nanofluidos de óxido-metálico que combinam forças químicas + mecânicas. Resultados médios de +98% de produção de óleo sustentados por 16 meses.' },
  { icon:'🤖', tag:'Inteligência Artificial', title:'Sistema IA – Gerenciamento de Riscos', desc:'IA embarcada para análise em tempo real, manutenção preditiva e tomada de decisão automatizada. Integração com sensores P/T, EDR e sistemas BEC/DAQ+.' },
];

/*
  Lista de clientes com seus nomes reais.
  Arquivo esperado: clientes/{file}.png  (fallback .jpg, depois inicial)
  Edite os valores de "file" para corresponder EXATAMENTE aos nomes dos
  arquivos dentro da pasta clientes/ (sem extensão, case-sensitive).
*/
const CLIENTS = [
  { file: 'Petrobras',       label: 'Petrobras' },
  { file: 'Eneva',           label: 'Eneva' },
  { file: 'PetroReconcavo',  label: 'PetroReconcavo' },
  { file: '3R-Petroleum',    label: '3R Petroleum' },
  { file: 'Imetame',         label: 'Imetame' },
  { file: 'Carmo-Energy',    label: 'Carmo Energy' },
  { file: 'Equinor',         label: 'Equinor' },
  { file: 'Origem',          label: 'Origem' },
  { file: 'Baker-Hughes',    label: 'Baker Hughes' },
  { file: 'Matra',           label: 'Matra' },
  { file: 'Acu-Petroleo',    label: 'Açu Petróleo' },
  { file: 'Seacrest',        label: 'Seacrest Petróleo' },
  { file: 'Great-Energy',    label: 'Great Energy' },
];

/* ═══════════════════════════════════════
   UTILITÁRIOS
═══════════════════════════════════════ */
function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls)  n.className = cls;
  if (text) n.textContent = text;  // sempre textContent → XSS-safe
  return n;
}

/* ═══════════════════════════════════════
   RENDER – SOLUÇÕES
═══════════════════════════════════════ */
function renderSolucoes() {
  const grid = document.getElementById('sol-grid');
  if (!grid) return;
  SOLUCOES.forEach(s => {
    const card = el('div', 'sol-card');
    card.setAttribute('role', 'listitem');
    const icon = el('div', 'sol-card__icon'); icon.textContent = s.icon;
    const tag  = el('span', 'sol-card__tag', s.tag);
    const h    = el('h3',  'sol-card__title', s.title);
    const p    = el('p',   'sol-card__desc',  s.desc);
    card.append(icon, tag, h, p);
    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════
   RENDER – CLIENTES (marquee infinito)
   Duplicamos os cards para criar o loop.
═══════════════════════════════════════ */
function buildClientCard(client) {
  const card = el('div', 'client-card');

  const img = document.createElement('img');
  img.className  = 'client-card__img';
  img.alt        = client.label;
  img.loading    = 'lazy';
  img.decoding   = 'async';
  img.src        = `clientes/${client.file}.png`;

  // Fallback: .png → .jpg → placeholder com inicial
  img.addEventListener('error', function onErr() {
    if (this.src.endsWith('.png')) {
      this.src = `clientes/${client.file}.jpg`;
    } else {
      const ph = el('div', 'client-card__ph');
      ph.textContent = client.label.charAt(0).toUpperCase();
      this.replaceWith(ph);
    }
  });

  const name = el('span', 'client-card__name', client.label);
  card.append(img, name);
  return card;
}

function renderClientes() {
  const track = document.getElementById('marquee-track');
  if (!track) return;

  // Inserimos os cards duas vezes para criar o loop visual sem JS extra
  [...CLIENTS, ...CLIENTS].forEach(client => {
    track.appendChild(buildClientCard(client));
  });

  // Ajusta a animação: duração proporcional ao nº de itens
  const speed = 3.2; // segundos por item
  const totalItems = CLIENTS.length;
  track.style.animationDuration = `${totalItems * speed}s`;
}

/* ═══════════════════════════════════════
   NAVBAR
═══════════════════════════════════════ */
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger-btn');
  const nav       = document.getElementById('main-nav');
  if (!navbar || !hamburger || !nav) return;

  // Scroll class
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hambúrguer
  hamburger.addEventListener('click', () => {
    const open = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
    document.body.style.overflow = !open ? 'hidden' : '';
  });

  // Fecha ao clicar num link
  nav.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Fecha com Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      hamburger.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Active link via IntersectionObserver
  if ('IntersectionObserver' in window) {
    const links = document.querySelectorAll('.navbar__link[href^="#"]');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          const a = document.querySelector(`.navbar__link[href="#${entry.target.id}"]`);
          if (a) a.classList.add('active');
        }
      });
    }, { rootMargin: `-${68}px 0px -55% 0px` });
    document.querySelectorAll('main section[id]').forEach(s => obs.observe(s));
  }
}

/* ═══════════════════════════════════════
   SCROLL TO TOP
═══════════════════════════════════════ */
function initScrollTop() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 380);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ═══════════════════════════════════════
   ANIMAÇÕES DE ENTRADA
═══════════════════════════════════════ */
function initAnimations() {
  const els = document.querySelectorAll('[data-animate]');
  if (!('IntersectionObserver' in window)) {
    els.forEach(e => e.classList.add('in-view'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(e => obs.observe(e));
}

/* ═══════════════════════════════════════
   FOOTER YEAR
═══════════════════════════════════════ */
function setYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */
function init() {
  renderSolucoes();
  renderClientes();
  initNavbar();
  initScrollTop();
  setYear();
  requestAnimationFrame(initAnimations);
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init)
  : init();