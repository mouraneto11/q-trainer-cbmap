// ============================================================
// app.js — Q-Trainer CBMAP | 5º PEL APH CFSD 2026.2
// Vanilla JS puro — sem dependências externas
// ============================================================

// ── BANCO DE DADOS DOS CÓDIGOS Q ────────────────────────────
const codigoQ = [
  { codigo: "QAP", significado: "Na escuta / Pronto para copiar",        uso: "Usado para indicar que a estação está na escuta e pronta para receber mensagens. Ex: 'QAP — Central, aguardando comunicação.'" },
  { codigo: "QRA", significado: "Nome do operador ou da viatura",         uso: "Identifica a viatura ou operador em comunicação. Ex: 'QRA Alfa-01, Viatura de Resgate.'" },
  { codigo: "QRB", significado: "Distância aproximada",                   uso: "Informa a distância até o local da ocorrência. Ex: 'QRB de 3 quilômetros da central.'" },
  { codigo: "QRG", significado: "Frequência exata / Canal",               uso: "Indica a frequência ou canal de comunicação. Ex: 'Operar no QRG 2, canal tático.'" },
  { codigo: "QRK", significado: "Qualidade da transmissão (1 a 5)",       uso: "Informa a inteligibilidade do sinal. Ex: 'QRK 4 — recebendo bem.'" },
  { codigo: "QRL", significado: "Canal ocupado / Estação em operação",    uso: "Sinaliza que o canal está em uso. Ex: 'QRL — aguarde para transmitir.'" },
  { codigo: "QRM", significado: "Interferência na transmissão",           uso: "Indica ruído ou interferência de outras transmissões. Ex: 'Muito QRM nessa frequência.'" },
  { codigo: "QRN", significado: "Interferência atmosférica / Estática",   uso: "Indica interferência de origem natural (chuva, relâmpago). Ex: 'QRN alto na área.'" },
  { codigo: "QRO", significado: "Aumentar potência de transmissão",       uso: "Solicita aumento de potência para melhorar o sinal. Ex: 'Faça QRO, sinal fraco.'" },
  { codigo: "QRP", significado: "Diminuir potência de transmissão",       uso: "Solicita redução de potência. Ex: 'Pode fazer QRP, sinal forte aqui.'" },
  { codigo: "QRR", significado: "Pronto para uso automático",             uso: "Indica que o equipamento está em modo automático de operação." },
  { codigo: "QRS", significado: "Fale mais devagar",                      uso: "Solicita que o interlocutor reduza a velocidade da fala. Ex: 'Por favor, QRS — muito rápido.'" },
  { codigo: "QRT", significado: "Parar a transmissão / Encerrar comunicação", uso: "Sinaliza o encerramento da comunicação. Ex: 'Central para Alfa-01, QRT por ora.'" },
  { codigo: "QRU", significado: "Sem mensagens / Nada para transmitir",   uso: "Indica que não há mensagens pendentes. Ex: 'QRU — tudo em ordem.'" },
  { codigo: "QRV", significado: "À disposição / Preparado",               uso: "Indica prontidão para receber ou executar. Ex: 'Alfa-01, QRV para a missão.'" },
  { codigo: "QRX", significado: "Aguarde na linha / Tempo de pausa",      uso: "Solicita que a estação aguarde. Ex: 'QRX 5 minutos — verificando dados.'" },
  { codigo: "QRZ", significado: "Quem está chamando?",                    uso: "Pergunta a identidade de quem transmitiu. Ex: 'QRZ? Identifique-se.'" },
  { codigo: "QSA", significado: "Intensidade do sinal (1 a 5)",           uso: "Escala de intensidade do sinal recebido. Ex: 'QSA 3 — sinal médio.'" },
  { codigo: "QSB", significado: "Sinal com variações / Fading",           uso: "Indica que o sinal está oscilando. Ex: 'Muito QSB nessa faixa.'" },
  { codigo: "QSD", significado: "Transmissão incorreta / Defeituosa",     uso: "Indica problemas na qualidade da transmissão em código." },
  { codigo: "QSJ", significado: "Dinheiro / Custo",                       uso: "Referência a valores monetários em comunicação. Ex: 'QSJ da operação foi coberto.'" },
  { codigo: "QSL", significado: "Entendido / Compreendido",               uso: "Confirmação de recebimento. Ex: 'QSL, Central — mensagem recebida.'" },
  { codigo: "QSM", significado: "Repita a mensagem",                      uso: "Solicita repetição da última mensagem. Ex: 'QSM — não compreendi.'" },
  { codigo: "QSO", significado: "Comunicação direta entre estações",      uso: "Indica comunicação ponto a ponto. Ex: 'Estabelecer QSO com Bravo-02.'" },
  { codigo: "QSP", significado: "Retransmitir mensagem",                  uso: "Pede retransmissão para outra estação. Ex: 'QSP para Charlie-03.'" },
  { codigo: "QSS", significado: "Frequência de trabalho",                 uso: "Indica a frequência operacional em uso." },
  { codigo: "QSW", significado: "Transmitir nesta frequência",            uso: "Instrução para operar na frequência indicada." },
  { codigo: "QSX", significado: "Escutar outra estação / Frequência",     uso: "Solicita monitoramento de outra frequência ou estação." },
  { codigo: "QSY", significado: "Mudar de frequência",                    uso: "Instrui a mudança de canal ou frequência. Ex: 'QSY para canal 3.'" },
  { codigo: "QSZ", significado: "Transmitir cada palavra duas vezes",     uso: "Usado em condições de sinal ruim para garantir recepção." },
  { codigo: "QTA", significado: "Cancelar última mensagem / Ocorrência cancelada", uso: "Anula a última comunicação enviada. Ex: 'QTA — ocorrência cancelada pelo solicitante.'" },
  { codigo: "QTC", significado: "Mensagem / Ocorrência",                  uso: "Informa uma mensagem ou nova ocorrência. Ex: 'QTC para Alfa-01: vítima em via pública.'" },
  { codigo: "QTH", significado: "Localização / Endereço atual",           uso: "Informa a posição atual da viatura. Ex: 'QTH: Rua das Flores, 100.'" },
  { codigo: "QTI", significado: "Destino / A caminho de",                 uso: "Indica o deslocamento para um destino. Ex: 'QTI Hospital de Emergência.'" },
  { codigo: "QTJ", significado: "Velocidade atual",                       uso: "Informa a velocidade de deslocamento da viatura." },
  { codigo: "QTO", significado: "Ida ao banheiro / Pausa pessoal",        uso: "Sinaliza uma breve ausência pessoal. Ex: 'Central, QTO por 3 minutos.'" },
  { codigo: "QTR", significado: "Horário exato",                          uso: "Solicita ou informa o horário oficial. Ex: 'QTR: 14h35 — todos sincronizem.' " },
  { codigo: "QTV", significado: "Aguardando em vigilância",               uso: "Indica que a estação permanece em escuta vigilante." },
  { codigo: "QTX", significado: "Permanecer em funcionamento",            uso: "Solicita que a estação mantenha comunicação aberta." },
  { codigo: "QUA", significado: "Notícias de outra estação",              uso: "Solicita informações sobre estação específica." },
  { codigo: "QAR", significado: "Desligar / Encerrar o serviço",          uso: "Encerra definitivamente o turno de operação. Ex: 'Alfa-01 — QAR. Fim do serviço.'" },
  { codigo: "TKS", significado: "Obrigado (Thanks)",                      uso: "Agradecimento abreviado em comunicação. Ex: 'TKS pelo apoio, Central.'" }
];

// ── ESTADO DA APLICAÇÃO ──────────────────────────────────────
const state = {
  currentView:      'dicionario',
  flashcard: {
    index:          0,
    deck:           [],
    isFlipped:      false,
    showMeaning:    false, // modo: false = código na frente, true = significado na frente
  },
  quiz: {
    correct:        0,
    wrong:          0,
    total:          0,
    answered:       false,
    currentQuestion: null,
  },
};

// ── REFERÊNCIAS DO DOM ───────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ── REGISTRO DO SERVICE WORKER ───────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('./sw.js');
      console.log('[App] Service Worker registrado:', reg.scope);

      // Detectar atualização disponível
      reg.addEventListener('updatefound', () => {
        const worker = reg.installing;
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            showToast('🔄 Atualização disponível! Recarregue o app.');
          }
        });
      });
    } catch (err) {
      console.warn('[App] Falha ao registrar Service Worker:', err);
    }
  });
}

// ── GERAÇÃO DINÂMICA DE ÍCONES (via Canvas) ─────────────────
// Gera ícones SVG inline para o manifest sem precisar de arquivos externos
function generateIcons() {
  const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
  sizes.forEach((size) => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Fundo azul marinho
    const bg = ctx.createLinearGradient(0, 0, size, size);
    bg.addColorStop(0, '#152a5c');
    bg.addColorStop(1, '#0a1628');
    ctx.fillStyle = bg;
    roundRect(ctx, 0, 0, size, size, size * 0.2);
    ctx.fill();

    // Círculo vermelho central
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = '#e53e3e';
    ctx.fill();

    // Texto "Q"
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${size * 0.32}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Q', size / 2, size / 2 + size * 0.02);

    // Exportar como PNG e criar link fictício para o manifest
    // (O manifest já referencia os paths — no PWA real, usar arquivos reais)
    // Aqui usamos para apple-touch-icon e favicon embutido
    if (size === 192) {
      const link = document.querySelector("link[rel='apple-touch-icon']");
      if (link) link.href = canvas.toDataURL('image/png');
      const favicon = document.querySelector("link[rel='icon']");
      if (favicon) favicon.href = canvas.toDataURL('image/png');
    }
  });
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ── NAVEGAÇÃO POR ABAS ───────────────────────────────────────
function initNavigation() {
  const navBtns = $$('.nav-btn');
  const views   = $$('.view');

  navBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.view;
      navBtns.forEach((b) => b.classList.remove('active'));
      views.forEach((v) => v.classList.remove('active'));
      btn.classList.add('active');
      $(`#view-${target}`).classList.add('active');
      state.currentView = target;

      // Inicializar a tela ao ativar
      if (target === 'flashcards') initFlashcardView();
      if (target === 'quiz') resetQuiz();

      // Hash na URL para atalhos do manifest
      history.replaceState(null, '', `#${target}`);
    });
  });

  // Suporte a hash na URL (manifest shortcuts)
  const hash = location.hash.replace('#', '');
  if (hash && ['dicionario', 'flashcards', 'quiz'].includes(hash)) {
    $(`[data-view="${hash}"]`)?.click();
  }
}

// ── TELA 1: DICIONÁRIO ───────────────────────────────────────
function initDicionario() {
  const searchInput = $('#search-input');
  const clearBtn    = $('#search-clear');
  const countEl    = $('#code-count');
  const list        = $('#codes-list');

  // Contador total
  if (countEl) countEl.textContent = codigoQ.length;

  // Renderizar lista completa na inicialização
  renderCodeList(codigoQ, '');

  // Evento de busca em tempo real
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    clearBtn.classList.toggle('visible', query.length > 0);

    const filtered = codigoQ.filter(
      (item) =>
        item.codigo.toLowerCase().includes(query) ||
        item.significado.toLowerCase().includes(query)
    );

    renderCodeList(filtered, query);
    if (countEl) countEl.textContent = filtered.length;
  });

  // Botão de limpar busca
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.classList.remove('visible');
    renderCodeList(codigoQ, '');
    if (countEl) countEl.textContent = codigoQ.length;
    searchInput.focus();
  });
}

function renderCodeList(items, query) {
  const list = $('#codes-list');
  list.innerHTML = '';

  if (items.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">!</div>
        <p>Nenhum código encontrado para "<strong>${escapeHtml(query)}</strong>"</p>
      </div>`;
    return;
  }

  items.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'code-item';
    div.setAttribute('role', 'button');
    div.setAttribute('tabindex', '0');
    div.setAttribute('aria-label', `${item.codigo}: ${item.significado}`);

    const codigoHL  = highlight(item.codigo, query);
    const meaningHL = highlight(item.significado, query);

    div.innerHTML = `
      <div class="code-badge">${codigoHL}</div>
      <div class="code-meaning">${meaningHL}</div>
      <span class="code-arrow">›</span>`;

    // Ripple effect
    div.addEventListener('click', (e) => {
      addRipple(e, div);
      setTimeout(() => openModal(item), 150);
    });

    div.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openModal(item);
    });

    list.appendChild(div);
  });
}

function highlight(text, query) {
  if (!query) return escapeHtml(text);
  const escaped = escapeHtml(text);
  const escapedQ = escapeHtml(query).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return escaped.replace(new RegExp(`(${escapedQ})`, 'gi'), '<span class="highlight">$1</span>');
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── MODAL DE DETALHES ────────────────────────────────────────
function openModal(item) {
  const overlay    = $('#modal-overlay');
  const codeEl     = $('#modal-code');
  const meaningEl  = $('#modal-meaning');
  const usageEl    = $('#modal-usage');

  codeEl.textContent    = item.codigo;
  meaningEl.textContent = item.significado;
  usageEl.textContent   = item.uso || 'Sem exemplo de uso disponível.';

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  $('#modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function initModal() {
  const overlay = $('#modal-overlay');
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  $('#modal-close').addEventListener('click', closeModal);

  // Swipe down para fechar (mobile)
  let startY = 0;
  const card = $('#modal-card');
  card.addEventListener('touchstart', (e) => { startY = e.touches[0].clientY; }, { passive: true });
  card.addEventListener('touchend',   (e) => {
    if (e.changedTouches[0].clientY - startY > 80) closeModal();
  }, { passive: true });
}

// ── TELA 2: FLASHCARDS ───────────────────────────────────────
function initFlashcardView() {
  const fc = state.flashcard;
  // Criar deck embaralhado
  fc.deck    = shuffle([...codigoQ]);
  fc.index   = 0;
  fc.isFlipped = false;
  renderFlashcard();
}

function renderFlashcard() {
  const fc     = state.flashcard;
  const item   = fc.deck[fc.index];
  const card   = $('#flashcard');
  const scene  = $('#flashcard-scene');

  // Reset flip
  card.classList.remove('flipped');
  fc.isFlipped = false;

  const total    = fc.deck.length;
  const current  = fc.index + 1;
  const pct      = (current / total) * 100;

  // Atualizar progresso
  $('#fc-progress-fill').style.width = `${pct}%`;
  $('#fc-current').textContent  = current;
  $('#fc-total').textContent    = total;

  // Frente: sempre o código (padrão do treinamento militar)
  if (!fc.showMeaning) {
    $('#card-front-code').textContent    = item.codigo;
    $('#card-front-code').className      = 'card-code-big';
    $('#card-back-code-label').style.display = 'block';
    $('#card-back-code-label').textContent = item.codigo;
    $('#card-back-meaning').textContent  = item.significado;
    $('#card-back-meaning').className    = 'card-meaning-big';
  } else {
    // Modo invertido: frente = significado, verso = código
    $('#card-front-code').textContent    = item.significado;
    $('#card-front-code').className      = 'card-meaning-big';
    $('#card-back-code-label').style.display = 'none';
    $('#card-back-meaning').textContent  = item.codigo;
    $('#card-back-meaning').className    = 'card-code-big';
  }

  // Animação de entrada
  scene.style.opacity = '0';
  scene.style.transform = 'scale(0.94)';
  requestAnimationFrame(() => {
    scene.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    scene.style.opacity = '1';
    scene.style.transform = 'scale(1)';
  });

  // Controles prev/next
  $('#fc-btn-prev').disabled = fc.index === 0;
  $('#fc-btn-prev').style.opacity = fc.index === 0 ? '0.4' : '1';
}

function initFlashcards() {
  const card    = $('#flashcard');
  const scene   = $('#flashcard-scene');

  // Flip ao clicar no card
  const doFlip = () => {
    state.flashcard.isFlipped = !state.flashcard.isFlipped;
    card.classList.toggle('flipped', state.flashcard.isFlipped);
  };

  scene.addEventListener('click', doFlip);
  // Suporte a teclado: espaço vira o card
  scene.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') doFlip();
  });
  scene.setAttribute('tabindex', '0');
  scene.setAttribute('role', 'button');
  scene.setAttribute('aria-label', 'Clique para revelar o significado');

  // Próximo card
  $('#fc-btn-next').addEventListener('click', () => {
    const fc = state.flashcard;
    if (fc.index < fc.deck.length - 1) {
      fc.index++;
    } else {
      // Completou o deck — reiniciar com novo embaralhamento
      fc.deck  = shuffle([...codigoQ]);
      fc.index = 0;
      showToast('Deck completo! Reiniciando...');
    }
    renderFlashcard();
  });

  // Card anterior
  $('#fc-btn-prev').addEventListener('click', () => {
    if (state.flashcard.index > 0) {
      state.flashcard.index--;
      renderFlashcard();
    }
  });

  // Embaralhar
  $('#fc-btn-shuffle').addEventListener('click', () => {
    state.flashcard.deck  = shuffle([...codigoQ]);
    state.flashcard.index = 0;
    renderFlashcard();
    showToast('Deck embaralhado!');
  });

  // Modos de treino
  $$('.mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('.mode-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.flashcard.showMeaning = btn.dataset.mode === 'meaning';
      renderFlashcard();
    });
  });

  // Swipe para navegar (mobile)
  let touchStartX = 0;
  scene.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  scene.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 60) {
      if (dx < 0) $('#fc-btn-next').click(); // Swipe esquerda → próximo
      else         $('#fc-btn-prev').click(); // Swipe direita → anterior
    } else {
      doFlip(); // Pequeno swipe = toque = vira
    }
  }, { passive: true });

  // Inicializar deck
  initFlashcardView();
}

// ── TELA 3: SIMULADO (QUIZ) ──────────────────────────────────
function generateQuestion() {
  // Escolher um item aleatório como resposta correta
  const correctItem = codigoQ[Math.floor(Math.random() * codigoQ.length)];

  // Decidir tipo de pergunta (50/50): Código→Significado ou Significado→Código
  const askForMeaning = Math.random() > 0.5;

  // Gerar 3 distratores únicos
  const distractors = shuffle(
    codigoQ.filter((item) => item.codigo !== correctItem.codigo)
  ).slice(0, 3);

  // Montar e embaralhar as 4 opções
  const options = shuffle([correctItem, ...distractors]);

  return {
    correctItem,
    askForMeaning,  // true = "O que significa X?", false = "Qual código para Y?"
    options,
  };
}

function renderQuiz() {
  const q = state.quiz.currentQuestion;
  if (!q) return;

  const { correctItem, askForMeaning, options } = q;

  // Rótulo da pergunta
  const typeLabel = $('#quiz-type-label');
  const qText     = $('#quiz-question-text');
  const codeDisp  = $('#quiz-code-display');

  if (askForMeaning) {
    typeLabel.textContent = 'O que significa este código?';
    qText.textContent    = '';
    codeDisp.textContent = correctItem.codigo;
  } else {
    typeLabel.textContent = 'Qual é o código correto?';
    qText.textContent    = correctItem.significado;
    codeDisp.textContent = '';
  }

  // Renderizar opções
  const optionsContainer = $('#quiz-options');
  optionsContainer.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  options.forEach((item, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.setAttribute('id', `quiz-option-${i}`);
    btn.innerHTML = `
      <span class="option-letter">${letters[i]}</span>
      <span class="option-text">${askForMeaning ? item.significado : item.codigo}</span>`;

    btn.addEventListener('click', (e) => {
      addRipple(e, btn);
      handleAnswer(item, correctItem, askForMeaning);
    });

    optionsContainer.appendChild(btn);
  });

  // Esconder feedback e botão
  const fb  = $('#quiz-feedback');
  const nb  = $('#quiz-next-btn');
  fb.className  = 'quiz-feedback';
  nb.className  = 'quiz-next-btn';
  state.quiz.answered = false;
}

function handleAnswer(selected, correct, askForMeaning) {
  if (state.quiz.answered) return;
  state.quiz.answered = true;
  state.quiz.total++;

  const isCorrect = selected.codigo === correct.codigo;
  if (isCorrect) state.quiz.correct++;
  else           state.quiz.wrong++;

  // Atualizar pontuação
  updateScoreUI();

  // Estilizar opções
  const options = $$('.quiz-option');
  options.forEach((btn) => {
    const text = btn.querySelector('.option-text').textContent.trim();
    const matchText = askForMeaning ? correct.significado : correct.codigo;
    const selectedText = askForMeaning ? selected.significado : selected.codigo;

    btn.disabled = true;

    if (text === matchText) {
      btn.classList.add(text === selectedText && isCorrect ? 'correct' : 'correct-reveal');
    } else if (text === selectedText && !isCorrect) {
      btn.classList.add('wrong');
    }
  });

  // Feedback
  const fb = $('#quiz-feedback');
  if (isCorrect) {
    fb.className = 'quiz-feedback correct show';
    fb.innerHTML = `
      <span class="feedback-icon">V</span>
      <div class="feedback-text">
        <strong>Correto! Muito bem!</strong>
        ${correct.codigo} = ${correct.significado}
      </div>`;
  } else {
    fb.className = 'quiz-feedback wrong show';
    fb.innerHTML = `
      <span class="feedback-icon">X</span>
      <div class="feedback-text">
        <strong>Incorreto!</strong>
        A resposta era: <em>${correct.codigo} = ${correct.significado}</em>
      </div>`;
  }

  // Exibir botão nova pergunta
  $('#quiz-next-btn').className = 'quiz-next-btn show';
}

function updateScoreUI() {
  const s = state.quiz;
  $('#score-correct').textContent = s.correct;
  $('#score-wrong').textContent   = s.wrong;
  $('#score-total').textContent   = s.total;

  // Porcentagem de acerto
  const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
  const pctEl = $('#score-pct');
  if (pctEl) pctEl.textContent = `${pct}%`;
}

function nextQuestion() {
  state.quiz.currentQuestion = generateQuestion();
  renderQuiz();
}

function resetQuiz() {
  state.quiz.correct   = 0;
  state.quiz.wrong     = 0;
  state.quiz.total     = 0;
  state.quiz.answered  = false;
  updateScoreUI();
  nextQuestion();
}

function initQuiz() {
  $('#quiz-next-btn').addEventListener('click', nextQuestion);
  $('#quiz-reset-btn').addEventListener('click', () => {
    resetQuiz();
    showToast('Simulado reiniciado!');
  });
}

// ── UTILITÁRIO: Embaralhar array (Fisher-Yates) ──────────────
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ── UTILITÁRIO: Efeito Ripple ────────────────────────────────
function addRipple(e, el) {
  const rect  = el.getBoundingClientRect();
  const x     = (e.clientX || rect.left + rect.width / 2) - rect.left;
  const y     = (e.clientY || rect.top + rect.height / 2) - rect.top;
  const size  = Math.max(rect.width, rect.height) * 1.5;

  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.cssText = `
    width: ${size}px; height: ${size}px;
    left: ${x - size / 2}px; top: ${y - size / 2}px;`;

  el.style.position = 'relative';
  el.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

// ── UTILITÁRIO: Toast ────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const toast = $('#toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ── PWA INSTALL BANNER ───────────────────────────────────────
let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;

  // Mostrar banner personalizado após 3 segundos
  setTimeout(() => {
    $('#install-banner').classList.add('show');
  }, 3000);
});

function initInstallBanner() {
  const banner    = $('#install-banner');
  const installBtn = $('#install-confirm-btn');
  const dismissBtn = $('#install-dismiss-btn');

  installBtn.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    banner.classList.remove('show');
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    console.log('[App] Resposta à instalação:', outcome);
    deferredInstallPrompt = null;
    if (outcome === 'accepted') showToast('App instalado com sucesso!');
  });

  dismissBtn.addEventListener('click', () => {
    banner.classList.remove('show');
  });

  // Confirmar quando já instalado
  window.addEventListener('appinstalled', () => {
    banner.classList.remove('show');
    showToast('Q-Trainer instalado!');
    deferredInstallPrompt = null;
  });
}

// ── STATUS OFFLINE/ONLINE ────────────────────────────────────
function initNetworkStatus() {
  window.addEventListener('offline', () => showToast('Sem conexão — Modo Offline ativo'));
  window.addEventListener('online',  () => showToast('Conexão restaurada'));
}

// ── INICIALIZAÇÃO GERAL ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  generateIcons();
  initNavigation();
  initDicionario();
  initFlashcards();
  initQuiz();
  initModal();
  initInstallBanner();
  initNetworkStatus();

  console.log(`%c Q-Trainer CBMAP 🚒
%c 5º PEL APH | CFSD 2026.2
%c ${codigoQ.length} Códigos Q carregados`,
    'font-size:18px; font-weight:bold; color:#3b74f5;',
    'font-size:12px; color:#8899bb;',
    'font-size:11px; color:#22c55e;'
  );
});
