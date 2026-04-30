import type { Question } from './types';

// ────────────────────────────────────────────────────────────────────────────
// Typing Question Component
// ────────────────────────────────────────────────────────────────────────────
export function renderTypingQuestion(
  question: Question,
  onSubmit: (answer: string) => void
): string {
  return `
    <div class="question-card typing-card" id="typing-card-${question.id}">
      <div class="question-type-badge">✏️ Type Your Answer</div>
      <p class="question-text">${question.question}</p>
      ${question.hint ? `<div class="hint-box">💡 <em>${question.hint}</em></div>` : ''}
      <div class="typing-area">
        <input 
          type="text" 
          id="typing-input-${question.id}" 
          class="typing-input" 
          placeholder="Type your answer here..." 
          autocomplete="off"
          autofocus
        />
        <button id="typing-submit-${question.id}" class="btn-submit" onclick="submitTyping_${question.id}()">
          Submit Answer →
        </button>
      </div>
    </div>
  `;
}

export function attachTypingHandler(question: Question, onSubmit: (answer: string) => void): void {
  const input = document.getElementById(`typing-input-${question.id}`) as HTMLInputElement;
  const btn = document.getElementById(`typing-submit-${question.id}`);

  const submit = () => {
    const val = input?.value.trim();
    if (val) onSubmit(val);
  };

  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submit();
    });
  }
  if (btn) {
    btn.addEventListener('click', submit);
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Multiple Choice Component
// ────────────────────────────────────────────────────────────────────────────
export function renderMultiChoiceQuestion(
  question: Question,
  onSubmit: (answer: string) => void
): string {
  const opts = question.options ?? [];
  const shuffled = [...opts].sort(() => Math.random() - 0.5);
  return `
    <div class="question-card multichoice-card">
      <div class="question-type-badge">🎯 Choose the Correct Answer</div>
      <p class="question-text">${question.question}</p>
      ${question.hint ? `<div class="hint-box">💡 <em>${question.hint}</em></div>` : ''}
      <div class="options-grid">
        ${shuffled.map((opt, i) => `
          <button 
            class="option-btn" 
            id="opt-${question.id}-${i}"
            data-value="${opt}"
          >
            <span class="option-letter">${String.fromCharCode(65 + i)}</span>
            ${opt}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

export function attachMultiChoiceHandler(question: Question, onSubmit: (answer: string) => void): void {
  const opts = question.options ?? [];
  opts.forEach((_, i) => {
    const btn = document.getElementById(`opt-${question.id}-${i}`);
    if (btn) {
      btn.addEventListener('click', () => {
        // highlight selected
        document.querySelectorAll(`[id^="opt-${question.id}-"]`).forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        setTimeout(() => {
          const val = btn.getAttribute('data-value') ?? '';
          onSubmit(val);
        }, 400);
      });
    }
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Drag & Drop Component
// ────────────────────────────────────────────────────────────────────────────
export function renderDragDropQuestion(
  question: Question,
  onSubmit: (answer: string) => void
): string {
  const opts = question.options ?? [];
  const shuffled = [...opts].sort(() => Math.random() - 0.5);
  return `
    <div class="question-card dragdrop-card">
      <div class="question-type-badge">🖱️ Drag the Correct Answer</div>
      <p class="question-text">${question.question}</p>
      ${question.hint ? `<div class="hint-box">💡 <em>${question.hint}</em></div>` : ''}
      <div class="drag-area">
        <div class="drag-items" id="drag-items-${question.id}">
          ${shuffled.map((opt, i) => `
            <div 
              class="drag-item" 
              draggable="true" 
              id="drag-${question.id}-${i}"
              data-value="${opt}"
            >
              ${opt}
            </div>
          `).join('')}
        </div>
        <div class="drop-zone" id="drop-zone-${question.id}">
          <span class="drop-hint">← Drop your answer here →</span>
        </div>
      </div>
      <button id="dragdrop-submit-${question.id}" class="btn-submit" style="margin-top:1rem" disabled>
        Confirm Answer →
      </button>
    </div>
  `;
}

export function attachDragDropHandler(question: Question, onSubmit: (answer: string) => void): void {
  const dropZone = document.getElementById(`drop-zone-${question.id}`);
  const submitBtn = document.getElementById(`dragdrop-submit-${question.id}`) as HTMLButtonElement;
  let selected: string | null = null;

  const items = document.querySelectorAll(`[id^="drag-${question.id}-"]`);
  items.forEach(item => {
    item.addEventListener('dragstart', (e) => {
      const de = e as DragEvent;
      de.dataTransfer?.setData('text/plain', (item as HTMLElement).dataset.value ?? '');
      item.classList.add('dragging');
    });
    item.addEventListener('dragend', () => item.classList.remove('dragging'));
    // Touch support
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('touch-selected'));
      item.classList.add('touch-selected');
      selected = (item as HTMLElement).dataset.value ?? null;
      if (dropZone) {
        dropZone.innerHTML = `<span class="dropped-value">${selected}</span>`;
        dropZone.classList.add('has-item');
      }
      if (submitBtn) submitBtn.disabled = false;
    });
  });

  if (dropZone) {
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('drag-over');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      const de = e as DragEvent;
      selected = de.dataTransfer?.getData('text/plain') ?? null;
      dropZone.classList.remove('drag-over');
      dropZone.classList.add('has-item');
      dropZone.innerHTML = `<span class="dropped-value">${selected}</span>`;
      if (submitBtn) submitBtn.disabled = false;
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      if (selected) onSubmit(selected);
    });
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Speech to Text Component
// ────────────────────────────────────────────────────────────────────────────
export function renderSpeechQuestion(
  question: Question,
  _onSubmit: (answer: string) => void
): string {
  return `
    <div class="question-card speech-card">
      <div class="question-type-badge">🎤 Speak Your Answer</div>
      <p class="question-text">${question.question}</p>
      ${question.hint ? `<div class="hint-box">💡 <em>${question.hint}</em></div>` : ''}
      <div class="speech-area">
        <button id="speech-btn-${question.id}" class="speech-btn" title="Click to start speaking">
          <span class="mic-icon">🎤</span>
          <span class="speech-label">Click to Speak</span>
        </button>
        <div class="speech-status" id="speech-status-${question.id}">Ready to listen...</div>
        <div class="speech-transcript" id="speech-transcript-${question.id}"></div>
        <div class="speech-actions" id="speech-actions-${question.id}" style="display:none">
          <button id="speech-retry-${question.id}" class="btn-secondary">🔄 Try Again</button>
          <button id="speech-confirm-${question.id}" class="btn-submit">Confirm →</button>
        </div>
      </div>
    </div>
  `;
}

export function attachSpeechHandler(question: Question, onSubmit: (answer: string) => void): void {
  const btn = document.getElementById(`speech-btn-${question.id}`);
  const status = document.getElementById(`speech-status-${question.id}`);
  const transcript = document.getElementById(`speech-transcript-${question.id}`);
  const actions = document.getElementById(`speech-actions-${question.id}`);
  const confirmBtn = document.getElementById(`speech-confirm-${question.id}`);
  const retryBtn = document.getElementById(`speech-retry-${question.id}`);

  let recognizedText = '';

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    if (status) status.textContent = '⚠️ Speech recognition not supported in this browser.';
    // Fallback: show text input
    if (transcript) {
      transcript.innerHTML = `
        <input type="text" id="speech-fallback-${question.id}" class="typing-input" 
          placeholder="Type your answer (speech not supported)..." />
      `;
    }
    if (actions) actions.style.display = 'flex';
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        const input = document.getElementById(`speech-fallback-${question.id}`) as HTMLInputElement;
        if (input?.value.trim()) onSubmit(input.value.trim());
      });
    }
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  const startRecognition = () => {
    recognizedText = '';
    if (transcript) transcript.textContent = '';
    if (actions) actions.style.display = 'none';
    if (status) status.textContent = '🎙️ Listening...';
    if (btn) btn.classList.add('recording');
    recognition.start();
  };

  recognition.onresult = (e: any) => {
    const result = e.results[e.results.length - 1];
    const text = result[0].transcript;
    if (transcript) transcript.textContent = `"${text}"`;
    if (result.isFinal) {
      recognizedText = text;
      if (status) status.textContent = '✅ Got it! Confirm or try again.';
      if (actions) actions.style.display = 'flex';
      if (btn) btn.classList.remove('recording');
    }
  };

  recognition.onerror = (e: any) => {
    if (status) status.textContent = `❌ Error: ${e.error}. Try again.`;
    if (btn) btn.classList.remove('recording');
  };

  recognition.onend = () => {
    if (btn) btn.classList.remove('recording');
  };

  if (btn) btn.addEventListener('click', startRecognition);
  if (retryBtn) retryBtn.addEventListener('click', startRecognition);
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (recognizedText) onSubmit(recognizedText);
    });
  }
}
