// ============================================================
// app.js — Q-Trainer CBMAP | 5º PEL APH CFSD 2026.2
// Vanilla JS puro — sem dependências externas
// ============================================================

// ── VERSÃO DO APP ────────────────────────────────────────────
const APP_VERSION = '1.1.0'; // ← atualizar a cada deploy

// ── BANCO DE DADOS DOS CÓDIGOS Q ────────────────────────────
const codigoQ = [
  { codigo: "QAP", significado: "Quando acionado, pronto",                prova: true,  uso: "Indica que a viatura ou operador está acionado e pronto para responder. Ex: 'Alfa-01 QAP — aguardando ordens.'" },
  { codigo: "QAR", significado: "Desligar / Encerrar o serviço",                        uso: "Encerra definitivamente o turno de operação. Ex: 'Alfa-01 — QAR. Fim do serviço.'" },
  { codigo: "QRA", significado: "Qual o nome do operador",                prova: true,  uso: "Identifica o operador em comunicação. Ex: 'QRA — Cabo Silva, Viatura de Resgate.'" },
  { codigo: "QRB", significado: "Distância aproximada",                                 uso: "Informa a distância até o local da ocorrência. Ex: 'QRB de 3 quilômetros da central.'" },
  { codigo: "QRD", significado: "Deslocamento",                           prova: true,  uso: "Informa que a viatura está em deslocamento para o local. Ex: 'Alfa-01 QRD para o endereço informado.'" },
  { codigo: "QRE", significado: "Qual o horário estimado da chegada",     prova: true,  uso: "Pergunta ou informa o horário previsto de chegada ao destino. Ex: 'QRE? — Previsto em 10 minutos.'" },
  { codigo: "QRG", significado: "Frequência exata / Canal",                             uso: "Indica a frequência ou canal de comunicação. Ex: 'Operar no QRG 2, canal tático.'" },
  { codigo: "QRJ", significado: "Refeição em geral",                      prova: true,  uso: "Informa que o operador está em pausa para refeição. Ex: 'Central, Alfa-01 em QRJ por 30 minutos.'" },
  { codigo: "QRK", significado: "Qualidade da transmissão (1 a 5)",                    uso: "Informa a inteligibilidade do sinal. Ex: 'QRK 4 — recebendo bem.'" },
  { codigo: "QRL", significado: "Canal ocupado / Estação em operação",                 uso: "Sinaliza que o canal está em uso. Ex: 'QRL — aguarde para transmitir.'" },
  { codigo: "QRM", significado: "Interferência na transmissão",                         uso: "Indica ruído ou interferência de outras transmissões. Ex: 'Muito QRM nessa frequência.'" },
  { codigo: "QRN", significado: "Interferência atmosférica / Estática",                uso: "Indica interferência de origem natural (chuva, relâmpago). Ex: 'QRN alto na área.'" },
  { codigo: "QRO", significado: "Aumentar potência de transmissão",                    uso: "Solicita aumento de potência para melhorar o sinal. Ex: 'Faça QRO, sinal fraco.'" },
  { codigo: "QRP", significado: "Diminuir potência de transmissão",                    uso: "Solicita redução de potência. Ex: 'Pode fazer QRP, sinal forte aqui.'" },
  { codigo: "QRR", significado: "Pronto para uso automático",                          uso: "Indica que o equipamento está em modo automático de operação." },
  { codigo: "QRS", significado: "Fale mais devagar",                                   uso: "Solicita que o interlocutor reduza a velocidade da fala. Ex: 'Por favor, QRS — muito rápido.'" },
  { codigo: "QRT", significado: "Parar a transmissão / Encerrar comunicação",          uso: "Sinaliza o encerramento da comunicação. Ex: 'Central para Alfa-01, QRT por ora.'" },
  { codigo: "QRU", significado: "Negativo",                               prova: true,  uso: "Resposta negativa ou confirmação de que não há nada a transmitir. Ex: 'QRU — sem ocorrências na área.'" },
  { codigo: "QRV", significado: "Prossiga!",                              prova: true,  uso: "Autoriza o prosseguimento da comunicação ou da missão. Ex: 'Central para Alfa-01: QRV, pode prosseguir.'" },
  { codigo: "QRX", significado: "Aguarde",                                prova: true,  uso: "Solicita que a estação aguarde antes de transmitir. Ex: 'QRX — verificando dados no sistema.'" },
  { codigo: "QRZ", significado: "Quem está chamando?",                                 uso: "Pergunta a identidade de quem transmitiu. Ex: 'QRZ? Identifique-se.'" },
  { codigo: "QSA", significado: "Clareza do sinal — como me recebe? (1 a 5)", prova: true, uso: "Escala de clareza do sinal: 1-Péssimo, 2-Ruim, 3-Regular, 4-Bom, 5-Ótimo. Ex: 'QSA 4 — recebendo bem.'" },
  { codigo: "QSB", significado: "Sinal com variações / Fading",                       uso: "Indica que o sinal está oscilando. Ex: 'Muito QSB nessa faixa.'" },
  { codigo: "QSD", significado: "Transmissão incorreta / Defeituosa",                 uso: "Indica problemas na qualidade da transmissão em código." },
  { codigo: "QSJ", significado: "Dinheiro / Coleta / Pagamento",          prova: true,  uso: "Referência a valores monetários em comunicação. Ex: 'QSJ da operação foi coberto pelo solicitante.'" },
  { codigo: "QSL", significado: "Entendido / Compreendido",               prova: true,  uso: "Confirmação de recebimento. Ex: 'QSL, Central — mensagem recebida.'" },
  { codigo: "QSM", significado: "Repita a mensagem",                      prova: true,  uso: "Solicita repetição da última mensagem. Ex: 'QSM — não compreendi, repita.'" },
  { codigo: "QSO", significado: "Permissão para comunicar diretamente",   prova: true,  uso: "Solicita ou indica comunicação ponto a ponto direta entre estações. Ex: 'QSO com Bravo-02 autorizado.'" },
  { codigo: "QSP", significado: "Permissão para ponte com outra estação", prova: true,  uso: "Solicita que uma estação intermédia retransmita a mensagem. Ex: 'QSP via Charlie-03 para Delta-04.'" },
  { codigo: "QSS", significado: "Frequência de trabalho",                              uso: "Indica a frequência operacional em uso." },
  { codigo: "QSW", significado: "Transmitir nesta frequência",                        uso: "Instrução para operar na frequência indicada." },
  { codigo: "QSX", significado: "Escutar outra estação / Frequência",                 uso: "Solicita monitoramento de outra frequência ou estação." },
  { codigo: "QSY", significado: "Mudar de frequência",                    prova: true,  uso: "Instrui a mudança de canal ou frequência. Ex: 'QSY para canal 3.'" },
  { codigo: "QSZ", significado: "Transmitir cada palavra duas vezes",                 uso: "Usado em condições de sinal ruim para garantir recepção." },
  { codigo: "QTA", significado: "Última mensagem / Cancelar ocorrência",  prova: true,  uso: "Anula ou cancela a última comunicação enviada. Ex: 'QTA — ocorrência cancelada pelo solicitante.'" },
  { codigo: "QTC", significado: "Mensagem Geral",                         prova: true,  uso: "Informa uma mensagem ou nova ocorrência. Ex: 'QTC para Alfa-01: vítima em via pública.'" },
  { codigo: "QTH", significado: "Qual endereço / Localização atual",      prova: true,  uso: "Informa ou solicita a posição atual da viatura. Ex: 'QTH: Rua das Flores, 100.'" },
  { codigo: "QTI", significado: "Qual a sua localização exata",           prova: true,  uso: "Solicita ou informa a localização precisa da unidade. Ex: 'QTI? — Cruzamento da Av. Brasil com R. 7 de Setembro.'" },
  { codigo: "QTJ", significado: "Velocidade atual",                                    uso: "Informa a velocidade de deslocamento da viatura." },
  { codigo: "QTO", significado: "Ocorrência",                             prova: true,  uso: "Registra ou informa uma ocorrência em andamento. Ex: 'QTO — acidente de trânsito, dois feridos.'" },
  { codigo: "QTR", significado: "Que horas são?",                         prova: true,  uso: "Solicita ou informa o horário oficial. Ex: 'QTR — 14h35, todos sincronizem.'" },
  { codigo: "QTV", significado: "Aguardando em vigilância",                             uso: "Indica que a estação permanece em escuta vigilante." },
  { codigo: "QTX", significado: "Permanecer em funcionamento",                         uso: "Solicita que a estação mantenha comunicação aberta." },
  { codigo: "QUA", significado: "Notícias de outra estação",                           uso: "Solicita informações sobre estação específica." },
  { codigo: "QVO", significado: "Ronda / Patrulhamento",                  prova: true,  uso: "Indica que a viatura está realizando ronda ou patrulhamento na área. Ex: 'Alfa-01 em QVO no setor Norte.'" },
  { codigo: "TKS", significado: "Obrigado (Thanks)",                                   uso: "Agradecimento abreviado em comunicação. Ex: 'TKS pelo apoio, Central.'" }
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
  const countEl     = $('#code-count');
  const list        = $('#codes-list');
  const filterBtn   = $('#filter-prova-btn');

  let soProva = false; // estado do filtro

  // Contador total
  if (countEl) countEl.textContent = codigoQ.length;

  // Renderizar lista completa na inicialização
  renderCodeList(codigoQ, '');

  // Função interna para aplicar busca + filtro juntos
  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    let items = soProva ? codigoQ.filter((i) => i.prova) : [...codigoQ];
    if (query) {
      items = items.filter(
        (item) =>
          item.codigo.toLowerCase().includes(query) ||
          item.significado.toLowerCase().includes(query)
      );
    }
    renderCodeList(items, query);
    if (countEl) countEl.textContent = items.length;
  }

  // Evento de busca em tempo real
  searchInput.addEventListener('input', () => {
    clearBtn.classList.toggle('visible', searchInput.value.trim().length > 0);
    applyFilters();
  });

  // Botão de limpar busca
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.classList.remove('visible');
    applyFilters();
    searchInput.focus();
  });

  // Filtro Só Prova
  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      soProva = !soProva;
      filterBtn.classList.toggle('active', soProva);
      filterBtn.setAttribute('aria-pressed', soProva);
      applyFilters();
      if (soProva) showToast(`⭐ ${codigoQ.filter((i) => i.prova).length} códigos da prova`);
    });
  }
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
    div.className = item.prova ? 'code-item code-item-prova' : 'code-item';
    div.setAttribute('role', 'button');
    div.setAttribute('tabindex', '0');
    div.setAttribute('aria-label', `${item.codigo}: ${item.significado}`);

    const codigoHL  = highlight(item.codigo, query);
    const meaningHL = highlight(item.significado, query);
    const provaBadge = item.prova
      ? '<span class="prova-badge" title="Cobrado pelo instrutor">⭐ PROVA</span>'
      : '';

    div.innerHTML = `
      <div class="code-badge">${codigoHL}</div>
      <div class="code-meaning-wrap">
        <div class="code-meaning">${meaningHL}</div>
        ${provaBadge}
      </div>
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

  // Badge de prova no card
  const provaBadge = $('#card-prova-badge');
  if (provaBadge) {
    provaBadge.style.display = item.prova ? 'flex' : 'none';
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

  // Flip ao clicar/tocar no card
  const doFlip = () => {
    state.flashcard.isFlipped = !state.flashcard.isFlipped;
    card.classList.toggle('flipped', state.flashcard.isFlipped);
  };

  scene.setAttribute('tabindex', '0');
  scene.setAttribute('role', 'button');
  scene.setAttribute('aria-label', 'Toque para revelar o significado');

  // ── Lógica de toque separada para mobile ─────────────────────
  // Usamos touchstart/touchend para detectar toque vs swipe sem
  // conflito com o evento click (que em mobile tem delay de 300ms
  // e pode ser bloqueado ou duplicado quando há touchend handler).
  let touchStartX = 0;
  let touchStartY = 0;
  let touchHandled = false; // flag para evitar que o click dispare depois

  scene.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchHandled = false;
  }, { passive: true });

  scene.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    touchHandled = true;

    // Swipe horizontal: navegar entre cards
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) $('#fc-btn-next').click(); // Swipe esquerda → próximo
      else        $('#fc-btn-prev').click(); // Swipe direita → anterior
      return;
    }

    // Toque simples (sem movimento significativo): virar o card
    if (Math.abs(dx) < 15 && Math.abs(dy) < 15) {
      doFlip();
    }
  }, { passive: true });

  // Click para desktop (ignora se já foi tratado pelo touch)
  scene.addEventListener('click', () => {
    if (touchHandled) {
      touchHandled = false;
      return;
    }
    doFlip();
  });

  // Suporte a teclado: espaço/enter vira o card
  scene.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      doFlip();
    }
  });

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
      const mode = btn.dataset.mode;
      if (mode === 'prova') {
        // Modo Prova: só cards marcados como prova
        state.flashcard.showMeaning = false;
        state.flashcard.provaMode   = true;
        state.flashcard.deck  = shuffle(codigoQ.filter((i) => i.prova));
        state.flashcard.index = 0;
        showToast(`⭐ Modo Prova — ${state.flashcard.deck.length} códigos`);
      } else {
        state.flashcard.showMeaning = mode === 'meaning';
        state.flashcard.provaMode   = false;
        state.flashcard.deck  = shuffle([...codigoQ]);
        state.flashcard.index = 0;
      }
      renderFlashcard();
    });
  });

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

// ── PWA INSTALL BANNER & MODAL ───────────────────────────────
// ── PWA STATUS & EVENTOS NATIVOS ─────────────────────────────
window.addEventListener('appinstalled', () => {
  showToast('🎉 Q-Trainer instalado na sua Tela Inicial!');
});

// ── STATUS OFFLINE/ONLINE ────────────────────────────────────
function initNetworkStatus() {
  window.addEventListener('offline', () => showToast('Sem conexão — Modo Offline ativo'));
  window.addEventListener('online',  () => showToast('Conexão restaurada'));
}

// ── INICIALIZAÇÃO GERAL ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Exibir versão no header
  const versionBadge = $('#version-badge');
  if (versionBadge) versionBadge.textContent = `v${APP_VERSION}`;

  initNavigation();
  initDicionario();
  initFlashcards();
  initQuiz();
  initModal();
  initNetworkStatus();

  console.log(`%c Q-Trainer CBMAP 🚒
%c 5º PEL APH | CFSD 2026.2
%c ${codigoQ.length} Códigos Q carregados`,
    'font-size:18px; font-weight:bold; color:#3b74f5;',
    'font-size:12px; color:#8899bb;',
    'font-size:11px; color:#22c55e;'
  );
});
