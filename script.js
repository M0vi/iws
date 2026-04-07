/**
 * IWS Brasil – script.js
 * Engenheiro Sênior Front-End | Especialista AppSec
 *
 * ══════════════════════════════════════════════════════════
 * AUDITORIA DE SEGURANÇA – RESUMO
 * ──────────────────────────────────────────────────────────
 * ✔ XSS Prevention:
 *     - Todo conteúdo dinâmico usa createElement + textContent.
 *     - Nenhum innerHTML recebe dados externos ou input do usuário.
 *     - Função sanitizeText() para escape de caracteres especiais HTML.
 *
 * ✔ Input Validation (defesa em profundidade):
 *     - Validação por Regex antes de qualquer processamento de formulário.
 *     - Whitelist de valores para o campo <select>.
 *     - Limites de maxlength já declarados no HTML + validados no JS.
 *
 * ✔ Rate Limiting (client-side):
 *     - Botão desabilitado por COOLDOWN_MS após cada tentativa de envio.
 *     - Contador de tentativas: após MAX_ATTEMPTS, bloqueia por BLOCK_MS.
 *     - AVISO: o rate limiting real DEVE ser implementado no backend
 *       (ex: 5 req / IP / 10 min, com CSRF token e sanitização server-side).
 *
 * ✔ Honeypot anti-bot: campo "website" oculto via CSS; se preenchido,
 *   o formulário é silenciosamente ignorado (não revela o mecanismo ao bot).
 *
 * ✔ Sem dependências externas: zero CDN de JS → sem risco de supply-chain.
 * ✔ Sem eval(), Function(), document.write() ou innerHTML inseguro.
 * ✔ Event listeners registrados programaticamente (sem atributos onX=).
 * ══════════════════════════════════════════════════════════
 */

'use strict';

/* ═══════════════════════════════════════════════
   CONFIGURAÇÕES
═══════════════════════════════════════════════ */
const FORM_CONFIG = {
  COOLDOWN_MS:  30_000,   // Bloqueio após 1 envio bem-sucedido
  MAX_ATTEMPTS: 5,        // Máximo de tentativas antes de bloqueio estendido
  BLOCK_MS:     300_000,  // 5 min de bloqueio após MAX_ATTEMPTS
  MESSAGE_MAX:  1000,
  NAME_MAX:     100,
  EMAIL_MAX:    150,
  COMPANY_MAX:  120,
};

// Assuntos permitidos (whitelist — previne manipulação de select no DevTools)
const ALLOWED_SUBJECTS = new Set([
  'brocas', 'laboratorio', 'cimentacao', 'fluidos',
  'solidos', 'ia', 'nanotec', 'outro',
]);

/* ═══════════════════════════════════════════════
   UTILITÁRIOS DE SEGURANÇA
═══════════════════════════════════════════════ */

/**
 * Escapa caracteres HTML para prevenir XSS ao inserir texto no DOM.
 * Embora usemos textContent (que já é seguro), esta função é mantida
 * para uso explícito em qualquer contexto onde innerHTML for inevitável.
 * @param {string} str
 * @returns {string}
 */
function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Cria um elemento DOM de forma segura (sem innerHTML).
 * @param {string} tag
 * @param {object} attrs  - atributos a setar
 * @param {string} [text] - textContent
 * @returns {HTMLElement}
 */
function el(tag, attrs = {}, text = '') {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'className') { node.className = v; }
    else { node.setAttribute(k, v); }
  });
  if (text) node.textContent = text;  // textContent é sempre XSS-safe
  return node;
}

/* ═══════════════════════════════════════════════
   DADOS – SOLUÇÕES (sem CDN de ícones; usa emoji)
═══════════════════════════════════════════════ */
const SOLUCOES_DATA = [
  {
    icon: '🪨',
    tag: 'Perfuração',
    title: 'Brocas PDC & Tricônicas Premium',
    desc: 'Brocas customizadas para Pré-Sal e OnShore com tecnologia VAREL. Comprovado aumento de 64% em ROP e redução de custos de até 75% por poço. Disponíveis nos diâmetros 8½" e 12¼".',
  },
  {
    icon: '🧪',
    tag: 'Laboratório',
    title: 'Equipamentos OFITE',
    desc: 'Linha completa de instrumentação para análise e controle de fluidos de perfuração. Viscosímetros, filtros API, células HPHT e muito mais — padrão mundial em laboratórios de O&G.',
  },
  {
    icon: '🔩',
    tag: 'Completação',
    title: 'Acessórios de Cimentação & Revestimento',
    desc: 'Portfólio DIGGER: sapatas escareadoras, colares de estágio, packers mecânicos/hidráulicos, bridge plugs e CaseRunner. Compatíveis com materiais L-80 a Q-125, certificados API.',
  },
  {
    icon: '📊',
    tag: 'Data Science / IA',
    title: 'Otimização em Tempo Real – DEEPVIEW',
    desc: 'Software embarcado na plataforma que consome dados EDR a cada segundo. Recomenda parâmetros ótimos, detecta stall de motor, gerencia MSE e estabilidade rotacional — comprovado com economias de 34% por poço.',
  },
  {
    icon: '🌊',
    tag: 'Fluidos',
    title: 'Engenharia de Fluidos de Perfuração',
    desc: 'Serviço completo de DESC Engineer + campo: seleção do fluido, controle de pressão, prevenção de danos à formação, monitoramento reológico em tempo real com MUDWATCHER.',
  },
  {
    icon: '⚙️',
    tag: 'Controle de Sólidos',
    title: 'Controle de Sólidos & Filtração',
    desc: 'Centrifugas decantadoras GN Solids Control, secadoras de cascalho, unidades de filtração modulares e bombas NEMO. Reduz desgaste, melhora produtividade e minimiza impacto ambiental.',
  },
  {
    icon: '🔬',
    tag: 'Nanotecnologia',
    title: 'Reservoir Solutions – TenEx NanoCLEAR®',
    desc: 'Nanofluidos de óxido-metálico que combinam forças químicas + mecânicas para aumentar recuperação de óleo. Resultados médios de +98% de produção de óleo por 16 meses em múltiplas bacias norte-americanas.',
  },
  {
    icon: '🤖',
    tag: 'Inteligência Artificial',
    title: 'Sistema IA – Gerenciamento de Riscos',
    desc: 'IA embarcada para análise de dados em tempo real, manutenção preditiva de equipamentos e tomada de decisão automatizada. Integração com sensores P/T, EDR e sistemas BEC/DAQ+.',
  },
];

/* ═══════════════════════════════════════════════
   DADOS – PRODUTOS OFITE (do catálogo)
═══════════════════════════════════════════════ */
const OFITE_PRODUCTS = [
  {
    num: '01',
    title: 'Viscosímetro Rotativo (Model 900)',
    desc: 'Medição de viscosidade plástica, ponto de escoamento e gel em fluidos de perfuração base água e óleo. Compatível com normas API RP 13B-1 e 13B-2.',
  },
  {
    num: '02',
    title: 'Filtro Prensa API (LP/LT)',
    desc: 'Determinação do filtrado e reboco de fluidos de perfuração a baixa pressão e temperatura. Modelo padrão para controle de qualidade em campo e laboratório.',
  },
  {
    num: '03',
    title: 'Célula HPHT – Alto Pressão / Temperatura',
    desc: 'Medição de filtração em condições de fundo de poço, até 500°F e 1.000 psi. Essencial para fluidos de perfuração em poços deep/ultra-deepwater e Pré-Sal.',
  },
  {
    num: '04',
    title: 'Balança de Lama (Mud Balance)',
    desc: 'Determinação precisa da densidade do fluido de perfuração em campo ou laboratório. Construção em alumínio anodizado de alta durabilidade.',
  },
  {
    num: '05',
    title: 'Analisador de Sólidos (Retort Kit)',
    desc: 'Determinação volumétrica de óleo, água e sólidos no fluido de perfuração por destilação. Indispensável para o controle da fase sólida e custo por barril.',
  },
  {
    num: '06',
    title: 'Testador de Areia & Sólidos Grossos',
    desc: 'Quantificação de areia e partículas grossas no fluido. Leitura direta em percentual de volume, conforme API RP 13B.',
  },
  {
    num: '07',
    title: 'Kit de Alcalinidade & Dureza (Water Analysis)',
    desc: 'Análise completa de íons (Cl⁻, Ca²⁺, Mg²⁺) e pH em fluidos de perfuração. Kits completos para monitoramento de fase aquosa em campo.',
  },
  {
    num: '08',
    title: 'Consistômetro Atmosférico & HPHT',
    desc: 'Avaliação do tempo de espessamento de cimento em condições simuladas de fundo de poço. Fundamental para o projeto e controle de operações de cimentação.',
  },
];

/* ═══════════════════════════════════════════════
   DADOS – CLIENTES
   Mapeamento arquivo → nome exibido.
   Convenção: chave = nome do arquivo em clientes/
   (sem extensão, case-sensitive conforme arquivo real).
   O JS tenta .png primeiro, com fallback para .jpg.
═══════════════════════════════════════════════ */
const CLIENTS_DATA = [
  { file: 'Petrobras',        label: 'Petrobras' },
  { file: 'Eneva',            label: 'Eneva' },
  { file: 'PetroReconcavo',   label: 'PetroReconcavo' },
  { file: '3R-Petroleum',     label: '3R Petroleum' },
  { file: 'Imetame',          label: 'Imetame' },
  { file: 'Carmo-Energy',     label: 'Carmo Energy' },
  { file: 'Equinor',          label: 'Equinor' },
  { file: 'Origem',           label: 'Origem' },
  { file: 'Baker-Hughes',     label: 'Baker Hughes' },
  { file: 'Matra',            label: 'Matra' },
  { file: 'Acu-Petroleo',     label: 'Açu Petróleo' },
  { file: 'Seacrest',         label: 'Seacrest Petróleo' },
  { file: 'Great-Energy',     label: 'Great Energy' },
];

/* ═══════════════════════════════════════════════
   RENDER – SOLUÇÕES
═══════════════════════════════════════════════ */
function renderSolucoes() {
  const grid = document.getElementById('solucoes-grid');
  if (!grid) return;

  SOLUCOES_DATA.forEach((item, i) => {
    const card = el('div', {
      className: 'sol-card',
      role: 'listitem',
      'data-animate': '',
      'data-animate-delay': String(Math.min(i % 3 + 1, 4)),
    });

    const iconDiv = el('div', { className: 'sol-card__icon', 'aria-hidden': 'true' });
    iconDiv.textContent = item.icon;  // textContent – seguro

    const tagSpan = el('span', { className: 'sol-card__tag' });
    tagSpan.textContent = item.tag;

    const titleEl = el('h3', { className: 'sol-card__title' });
    titleEl.textContent = item.title;  // textContent – XSS-safe

    const descEl = el('p', { className: 'sol-card__desc' });
    descEl.textContent = item.desc;  // textContent – XSS-safe

    card.appendChild(iconDiv);
    card.appendChild(tagSpan);
    card.appendChild(titleEl);
    card.appendChild(descEl);
    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════════════
   RENDER – PRODUTOS OFITE
═══════════════════════════════════════════════ */
function renderProdutos() {
  const grid = document.getElementById('produtos-grid');
  if (!grid) return;

  OFITE_PRODUCTS.forEach((item, i) => {
    const card = el('div', {
      className: 'prod-card',
      role: 'listitem',
      'data-animate': '',
      'data-animate-delay': String(Math.min(i % 4 + 1, 4)),
    });

    const numEl  = el('span', { className: 'prod-card__num' });
    numEl.textContent = item.num;

    const titleEl = el('h3', { className: 'prod-card__title' });
    titleEl.textContent = item.title;

    const descEl  = el('p', { className: 'prod-card__desc' });
    descEl.textContent = item.desc;

    card.appendChild(numEl);
    card.appendChild(titleEl);
    card.appendChild(descEl);
    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════════════
   RENDER – CLIENTES
   XSS-safe: nome do arquivo é lido de array hardcoded
   (não de URL params, localStorage ou qualquer fonte externa).
   A imagem é construída programaticamente; o alt text usa textContent.
═══════════════════════════════════════════════ */
function renderClientes() {
  const grid = document.getElementById('clientes-grid');
  if (!grid) return;

  CLIENTS_DATA.forEach((client, i) => {
    const card = el('div', {
      className: 'client-card',
      role: 'listitem',
      'data-animate': '',
      'data-animate-delay': String(Math.min(i % 4 + 1, 4)),
    });

    // Imagem com fallback gracioso
    const img = el('img', {
      className: 'client-card__img',
      // Atributo src construído com valor hardcoded (array), nunca com input externo
      src: `clientes/${client.file}.png`,
      loading: 'lazy',
      decoding: 'async',
    });
    img.alt = client.label;  // alt via propriedade (seguro)

    // Fallback: se PNG não existir, tenta JPG; depois mostra placeholder
    img.addEventListener('error', function onImgError() {
      if (this.src.endsWith('.png')) {
        this.src = `clientes/${client.file}.jpg`;
      } else {
        // Substitui img por placeholder com inicial da empresa
        const ph = el('div', { className: 'client-card__placeholder' });
        // Pega apenas a inicial — XSS-safe via textContent
        ph.textContent = client.label.charAt(0).toUpperCase();
        this.replaceWith(ph);
      }
    }, { once: false });

    const nameEl = el('span', { className: 'client-card__name' });
    nameEl.textContent = client.label;  // textContent – XSS-safe

    card.appendChild(img);
    card.appendChild(nameEl);
    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════════════
   NAVBAR – Scroll + Hambúrguer + Active Link
═══════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger-btn');
  const nav = document.getElementById('main-nav');
  const links = document.querySelectorAll('.navbar__link');

  if (!navbar || !hamburger || !nav) return;

  // Classe "scrolled" ao rolar
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hambúrguer toggle
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('open', !isOpen);
    // Previne scroll do body quando menu aberto
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  });

  // Fecha menu ao clicar num link (mobile)
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Fecha menu se Escape pressionado
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      hamburger.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.focus();
    }
  });

  // Active link por IntersectionObserver
  const sections = document.querySelectorAll('main section[id]');
  if (sections.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            links.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.navbar__link[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
          }
        });
      },
      { rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'))}px 0px -60% 0px` }
    );
    sections.forEach(s => obs.observe(s));
  }
}

/* ═══════════════════════════════════════════════
   SCROLL TO TOP
═══════════════════════════════════════════════ */
function initScrollTop() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ═══════════════════════════════════════════════
   INTERSECTION OBSERVER – Animações de entrada
═══════════════════════════════════════════════ */
function initAnimations() {
  if (!('IntersectionObserver' in window)) {
    // Sem suporte: mostra tudo imediatamente
    document.querySelectorAll('[data-animate]').forEach(el => el.classList.add('in-view'));
    return;
  }

  const obs = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);  // Anima apenas uma vez
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('[data-animate]').forEach(el => obs.observe(el));
}

/* ═══════════════════════════════════════════════
   FORMULÁRIO DE CONTATO
   ─────────────────────────────────────────────
   SEGURANÇA EM CAMADAS:
   1. Honeypot: campo "website" oculto via CSS. Se preenchido por bot,
      requisição é silenciosamente ignorada.
   2. Validação por Regex + whitelist antes de qualquer processamento.
   3. Rate limiting client-side:
      - COOLDOWN_MS entre envios.
      - Após MAX_ATTEMPTS: bloqueio por BLOCK_MS.
   4. Todo feedback ao usuário usa textContent (XSS-safe).
   5. maxlength nos inputs + verificação de comprimento no JS.

   AVISOS DE BACKEND (obrigatórios para produção):
   ⚠ Implementar rate limit por IP: máx. 5 req / 10 min.
   ⚠ Implementar CSRF token (double-submit cookie ou synchronizer token).
   ⚠ Sanitizar e validar todos os campos server-side (nunca confiar no front).
   ⚠ Rejeitar requisição se campo "website" vier preenchido (honeypot).
   ⚠ Configurar SPF/DKIM/DMARC antes de enviar e-mails transacionais.
═══════════════════════════════════════════════ */

/* Estado de rate limiting (persistido em closure – não em localStorage
   pois isso poderia ser manipulado pelo usuário) */
const formRateState = {
  attempts: 0,
  lastSubmit: 0,
  blocked: false,
  blockUntil: 0,
};

/* Regex de validação
   EMAIL: RFC-5321 simplificado — permite endereços corporativos comuns
   sem aceitar payloads maliciosos típicos de injeção.           */
const VALIDATORS = {
  // Nome: só letras (latinas + acentos), espaços, hífens, apóstrofes
  name:    /^[\p{L}\s'\-\.]{2,100}$/u,
  // Email: formato básico user@domínio.tld — sem espaços, sem caracteres de controle
  email:   /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
  // Empresa: alfanumérico, espaços, sinais comuns de nomes empresariais
  company: /^[\p{L}0-9\s&\-\.\,\(\)\/]{0,120}$/u,
  // Mensagem: qualquer caractere exceto caracteres de controle (< \x20 exceto espaços)
  // Previne injeção de null bytes, etc.
  message: /^[^\x00-\x08\x0B\x0C\x0E-\x1F\x7F]{10,1000}$/,
};

function getFieldError(name, value) {
  const trimmed = value.trim();

  if (name === 'name') {
    if (!trimmed) return 'Nome é obrigatório.';
    if (trimmed.length < 2) return 'Nome muito curto.';
    if (trimmed.length > FORM_CONFIG.NAME_MAX) return `Máximo ${FORM_CONFIG.NAME_MAX} caracteres.`;
    if (!VALIDATORS.name.test(trimmed)) return 'Nome contém caracteres inválidos.';
  }

  if (name === 'email') {
    if (!trimmed) return 'E-mail é obrigatório.';
    if (trimmed.length > FORM_CONFIG.EMAIL_MAX) return `Máximo ${FORM_CONFIG.EMAIL_MAX} caracteres.`;
    if (!VALIDATORS.email.test(trimmed)) return 'Formato de e-mail inválido.';
  }

  if (name === 'company') {
    if (trimmed && trimmed.length > FORM_CONFIG.COMPANY_MAX) return `Máximo ${FORM_CONFIG.COMPANY_MAX} caracteres.`;
    if (trimmed && !VALIDATORS.company.test(trimmed)) return 'Empresa contém caracteres inválidos.';
  }

  if (name === 'subject') {
    if (!trimmed) return 'Selecione um assunto.';
    // Whitelist: rejeita qualquer valor não previsto (manipulação via DevTools)
    if (!ALLOWED_SUBJECTS.has(trimmed)) return 'Assunto inválido.';
  }

  if (name === 'message') {
    if (!trimmed) return 'Mensagem é obrigatória.';
    if (trimmed.length < 10) return 'Mensagem muito curta (mínimo 10 caracteres).';
    if (trimmed.length > FORM_CONFIG.MESSAGE_MAX) return `Máximo ${FORM_CONFIG.MESSAGE_MAX} caracteres.`;
    if (!VALIDATORS.message.test(trimmed)) return 'Mensagem contém caracteres não permitidos.';
  }

  return '';  // sem erro
}

function setFieldStatus(inputEl, errEl, errorMsg) {
  if (!inputEl || !errEl) return;
  if (errorMsg) {
    inputEl.classList.add('error');
    errEl.textContent = errorMsg;  // textContent – XSS-safe
    inputEl.setAttribute('aria-invalid', 'true');
  } else {
    inputEl.classList.remove('error');
    errEl.textContent = '';
    inputEl.setAttribute('aria-invalid', 'false');
  }
}

function validateForm(form) {
  let isValid = true;
  const fields = ['name', 'email', 'company', 'subject', 'message'];

  fields.forEach(name => {
    const input = form.elements[name];
    const errEl = document.getElementById(`f-${name}-err`);
    if (!input) return;
    const error = getFieldError(name, input.value);
    setFieldStatus(input, errEl, error);
    if (error) isValid = false;
  });

  return isValid;
}

function setFormStatus(statusEl, message, type) {
  if (!statusEl) return;
  statusEl.textContent = message;  // textContent – XSS-safe
  statusEl.className = `form__status ${type}`;
}

function initContactForm() {
  const form   = document.getElementById('contact-form');
  const btn    = document.getElementById('submit-btn');
  const status = document.getElementById('form-status');
  const msgTxt = document.getElementById('f-message');
  const charCt = document.getElementById('f-message-count');

  if (!form || !btn) return;

  // Contador de caracteres em tempo real
  if (msgTxt && charCt) {
    msgTxt.addEventListener('input', () => {
      const len = msgTxt.value.length;
      charCt.textContent = `${len} / ${FORM_CONFIG.MESSAGE_MAX}`;
      charCt.style.color = len > FORM_CONFIG.MESSAGE_MAX * 0.9 ? '#fc8181' : '';
    });
  }

  // Validação inline ao sair do campo (blur)
  ['name', 'email', 'company', 'subject', 'message'].forEach(name => {
    const input = form.elements[name];
    const errEl = document.getElementById(`f-${name}-err`);
    if (!input || !errEl) return;
    input.addEventListener('blur', () => {
      const error = getFieldError(name, input.value);
      setFieldStatus(input, errEl, error);
    });
  });

  // Submit
  form.addEventListener('submit', handleSubmit);

  function handleSubmit(e) {
    e.preventDefault();

    /* ── Honeypot check ─────────────────────────────
       Se o campo oculto "website" estiver preenchido,
       é quase certo que é um bot. Simula sucesso sem
       enviar nada (não revela o mecanismo ao atacante). */
    const honey = form.elements['website'];
    if (honey && honey.value.trim() !== '') {
      simulateSuccess();
      return;
    }

    /* ── Rate limiting client-side ──────────────────
       NOTA: Este controle é apenas uma primeira camada.
       O servidor DEVE implementar rate limiting próprio. */
    const now = Date.now();

    if (formRateState.blocked && now < formRateState.blockUntil) {
      const secsLeft = Math.ceil((formRateState.blockUntil - now) / 1000);
      setFormStatus(status,
        `Muitas tentativas. Aguarde ${secsLeft} segundos antes de tentar novamente.`,
        'error'
      );
      return;
    }

    if (formRateState.blocked && now >= formRateState.blockUntil) {
      formRateState.blocked = false;
      formRateState.attempts = 0;
    }

    if (now - formRateState.lastSubmit < FORM_CONFIG.COOLDOWN_MS) {
      const secsLeft = Math.ceil((FORM_CONFIG.COOLDOWN_MS - (now - formRateState.lastSubmit)) / 1000);
      setFormStatus(status,
        `Por favor, aguarde ${secsLeft} segundos antes de enviar novamente.`,
        'error'
      );
      return;
    }

    /* ── Validação dos campos ───────────────────── */
    if (!validateForm(form)) {
      setFormStatus(status, 'Corrija os campos marcados acima.', 'error');
      // Foca no primeiro campo com erro
      const firstErr = form.querySelector('[aria-invalid="true"]');
      if (firstErr) firstErr.focus();
      return;
    }

    /* ── Bloqueia botão (anti-double-submit) ──────
       Desabilita o botão imediatamente ao clicar,
       independente do resultado do envio. */
    btn.disabled = true;
    const originalBtnText = btn.textContent;
    btn.textContent = 'Enviando…';
    setFormStatus(status, '', '');

    formRateState.attempts++;
    formRateState.lastSubmit = Date.now();

    if (formRateState.attempts >= FORM_CONFIG.MAX_ATTEMPTS) {
      formRateState.blocked = true;
      formRateState.blockUntil = Date.now() + FORM_CONFIG.BLOCK_MS;
    }

    /* ── Construção do payload ───────────────────
       Os dados são coletados APÓS validação.
       Nunca use FormData + fetch sem validar server-side também.

       Para produção:
         fetch('/api/contato', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             'X-CSRF-Token': getCsrfToken(),  // obrigatório!
           },
           body: JSON.stringify(payload),
         })
         ⚠ O endpoint deve ter rate limiting, CSRF, sanitização e logging.
    */
    const payload = {
      name:    form.elements['name'].value.trim(),
      email:   form.elements['email'].value.trim(),
      company: form.elements['company'].value.trim(),
      subject: form.elements['subject'].value,
      message: form.elements['message'].value.trim(),
    };

    // Simulação de envio (substitua pelo fetch real em produção)
    simulateSend(payload)
      .then(() => {
        simulateSuccess();
        form.reset();
        if (charCt) charCt.textContent = `0 / ${FORM_CONFIG.MESSAGE_MAX}`;
      })
      .catch(err => {
        console.error('[IWS Contact Form] Erro no envio:', err);
        setFormStatus(status,
          'Erro ao enviar. Tente novamente ou entre em contato diretamente pelo e-mail.',
          'error'
        );
      })
      .finally(() => {
        // Reabilita botão após cooldown
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = originalBtnText;
        }, FORM_CONFIG.COOLDOWN_MS);
      });
  }

  /**
   * Simula um POST assíncrono.
   * Em produção, substitua por fetch('/api/contato', { ... }).
   * @param {object} payload
   * @returns {Promise<void>}
   */
  function simulateSend(payload) {
    // Em produção: return fetch('/api/contato', { method:'POST', ... })
    // O payload está pronto para ser serializado com JSON.stringify(payload)
    void payload;  // evita aviso de "unused variable" em linters
    return new Promise(resolve => setTimeout(resolve, 1200));
  }

  function simulateSuccess() {
    setFormStatus(status,
      '✓ Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.',
      'success'
    );
  }
}

/* ═══════════════════════════════════════════════
   FOOTER – Ano dinâmico (XSS-safe: textContent)
═══════════════════════════════════════════════ */
function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear().toString();
}

/* ═══════════════════════════════════════════════
   INIT – ponto de entrada
═══════════════════════════════════════════════ */
function init() {
  renderSolucoes();
  renderProdutos();
  renderClientes();
  initNavbar();
  initScrollTop();
  initContactForm();
  setFooterYear();
  // Animações por último (elementos já foram renderizados)
  requestAnimationFrame(initAnimations);
}

// Garante execução após o DOM estar completamente parseado.
// O script é carregado com `defer`, então DOMContentLoaded já ocorreu,
// mas usamos readyState como salvaguarda.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}