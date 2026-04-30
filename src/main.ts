import './style.css';
import type { PlayerProgress, GameState, Page } from './types';
import { LEVEL_CONFIGS } from './levels';
import { getQuestionsForLevel } from './questions';
import {
  loadProgress, initProgress, saveProgress, updateLevelResult,
  isLevelUnlocked, getLevelStars, resetProgress, savePlayerName,
  loadPlayerName, getLeaderboard, saveToLeaderboard
} from './storage';
import {
  renderTypingQuestion, attachTypingHandler,
  renderMultiChoiceQuestion, attachMultiChoiceHandler,
  renderDragDropQuestion, attachDragDropHandler,
  renderSpeechQuestion, attachSpeechHandler
} from './components';

// ─── App State ───────────────────────────────────────────────────────────────
let progress: PlayerProgress | null = null;
let gameState: GameState = {
  currentPage: 'menu',
  currentLevel: 1,
  currentQuestionIndex: 0,
  score: 0,
  startTime: Date.now(),
  answers: [],
};

const app = document.getElementById('app')!;

// ─── Router ──────────────────────────────────────────────────────────────────
function navigate(page: Page, level?: number): void {
  gameState.currentPage = page;
  if (level !== undefined) gameState.currentLevel = level;
  render();
}

function render(): void {
  switch (gameState.currentPage) {
    case 'menu':        renderMenu(); break;
    case 'dashboard':   renderDashboard(); break;
    case 'levelSelect': renderLevelSelect(); break;
    case 'game':        renderGame(); break;
    case 'result':      renderResult(); break;
    case 'leaderboard': renderLeaderboard(); break;
  }
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function navbarHTML(active: Page): string {
  const links: { page: Page; label: string; icon: string }[] = [
    { page: 'menu', label: 'Home', icon: '🏠' },
    { page: 'dashboard', label: 'Dashboard', icon: '📊' },
    { page: 'levelSelect', label: 'Play', icon: '🎮' },
    { page: 'leaderboard', label: 'Scores', icon: '🏆' },
  ];
  return `
    <nav class="navbar">
      <div class="nav-brand">
        <span class="nav-logo">🦅</span>
        <span class="nav-title">KalSel Quiz</span>
      </div>
      <div class="nav-links">
        ${links.map(l => `
          <button 
            class="nav-btn ${active === l.page ? 'active' : ''}" 
            onclick="navigateTo('${l.page}')"
          >
            <span>${l.icon}</span> ${l.label}
          </button>
        `).join('')}
      </div>
      <div class="nav-player">
        <span class="player-badge">👤 ${progress?.playerName ?? 'Guest'}</span>
        <span class="player-score">⭐ ${progress?.totalScore ?? 0}</span>
      </div>
    </nav>
  `;
}

// ─── Menu Page ───────────────────────────────────────────────────────────────
function renderMenu(): void {
  const hasProgress = !!progress;
  app.innerHTML = `
    ${navbarHTML('menu')}
    <main class="page-menu">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="hero-badge">🌟 South Kalimantan Edition</div>
        <h1 class="hero-title">KalSel Quiz</h1>
        <p class="hero-subtitle">
          Test your knowledge about <strong>Kalimantan Selatan</strong> —<br/>
          the Land of a Thousand Rivers, diamonds, and the iconic Banjar culture.
        </p>
        <div class="hero-stats">
          <div class="stat-pill">🎯 10 Levels</div>
          <div class="stat-pill">🎤 Speech to Text</div>
          <div class="stat-pill">🖱️ Drag & Drop</div>
          <div class="stat-pill">✏️ Typing</div>
        </div>
        ${!hasProgress ? `
          <div class="name-form" id="name-form">
            <h3>Enter your name to begin</h3>
            <div class="name-input-row">
              <input type="text" id="player-name-input" class="name-input" 
                placeholder="Your name..." maxlength="24" />
              <button class="btn-primary" id="start-btn">Start Adventure →</button>
            </div>
          </div>
        ` : `
          <div class="welcome-back">
            <p>Welcome back, <strong>${progress!.playerName}</strong>! 🎉</p>
            <p>Total Score: <strong>${progress!.totalScore}</strong> pts</p>
          </div>
          <div class="menu-actions">
            <button class="btn-primary" onclick="navigateTo('levelSelect')">Continue Playing →</button>
            <button class="btn-secondary" onclick="resetGame()">New Game</button>
          </div>
        `}
      </div>
      <div class="floating-icons">
        <span class="fi fi-1">🦅</span>
        <span class="fi fi-2">💎</span>
        <span class="fi fi-3">🌊</span>
        <span class="fi fi-4">🎋</span>
        <span class="fi fi-5">🏺</span>
      </div>
    </main>
  `;

  if (!hasProgress) {
    const startBtn = document.getElementById('start-btn');
    const input = document.getElementById('player-name-input') as HTMLInputElement;
    const doStart = () => {
      const name = input?.value.trim();
      if (!name) { input.classList.add('shake'); setTimeout(() => input.classList.remove('shake'), 500); return; }
      savePlayerName(name);
      progress = initProgress(name);
      navigate('levelSelect');
    };
    startBtn?.addEventListener('click', doStart);
    input?.addEventListener('keydown', (e) => { if (e.key === 'Enter') doStart(); });
  }
}

// ─── Dashboard Page ──────────────────────────────────────────────────────────
function renderDashboard(): void {
  if (!progress) { navigate('menu'); return; }

  const completedLevels = Object.values(progress.levels).filter(l => l.completed).length;
  const totalLevels = 10;
  const overallPct = Math.round((completedLevels / totalLevels) * 100);
  const lastPlayed = new Date(progress.lastPlayed).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  app.innerHTML = `
    ${navbarHTML('dashboard')}
    <main class="page-dashboard">
      <div class="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Track your progress and achievements</p>
        </div>
        <div class="dashboard-player-card">
          <div class="big-avatar">👤</div>
          <div>
            <div class="big-name">${progress.playerName}</div>
            <div class="big-since">Since ${new Date(progress.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-num">${progress.totalScore}</div>
          <div class="stat-label">Total Score</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-num">${completedLevels}/${totalLevels}</div>
          <div class="stat-label">Levels Completed</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📅</div>
          <div class="stat-num" style="font-size:1.2rem">${lastPlayed}</div>
          <div class="stat-label">Last Played</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔥</div>
          <div class="stat-num">${Object.values(progress.levels).reduce((s, l) => s + l.attempts, 0)}</div>
          <div class="stat-label">Total Attempts</div>
        </div>
      </div>

      <div class="progress-section">
        <div class="progress-header">
          <span>Overall Progress</span>
          <span>${overallPct}%</span>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width: ${overallPct}%"></div>
        </div>
      </div>

      <div class="levels-table">
        <h2>Level History</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Level</th><th>Name</th><th>Type</th><th>Score</th><th>Stars</th><th>Best Time</th><th>Attempts</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${LEVEL_CONFIGS.map(cfg => {
                const res = progress!.levels[cfg.level];
                const stars = res ? getLevelStars(res.score, res.maxScore) : 0;
                const isUnlocked = isLevelUnlocked(progress!, cfg.level);
                return `
                  <tr class="${!isUnlocked ? 'locked-row' : ''}">
                    <td><span class="level-badge-sm" style="background:${cfg.color}20;color:${cfg.color}">${cfg.icon} ${cfg.level}</span></td>
                    <td>${cfg.title}</td>
                    <td><span class="type-tag">${cfg.type}</span></td>
                    <td>${res ? `${res.score}/${res.maxScore}` : '—'}</td>
                    <td>${res ? '⭐'.repeat(stars) + '☆'.repeat(3 - stars) : '—'}</td>
                    <td>${res ? `${res.bestTime}s` : '—'}</td>
                    <td>${res ? res.attempts : '—'}</td>
                    <td>
                      ${!isUnlocked
                        ? '<span class="badge-locked">🔒 Locked</span>'
                        : res?.completed
                          ? '<span class="badge-done">✅ Done</span>'
                          : '<span class="badge-open">▶️ Play</span>'
                      }
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="dashboard-actions">
        <button class="btn-primary" onclick="navigateTo('levelSelect')">Go to Levels →</button>
        <button class="btn-danger" onclick="confirmReset()">Reset Progress</button>
      </div>
    </main>
  `;
}

// ─── Level Select Page ───────────────────────────────────────────────────────
function renderLevelSelect(): void {
  if (!progress) { navigate('menu'); return; }

  app.innerHTML = `
    ${navbarHTML('levelSelect')}
    <main class="page-levels">
      <div class="levels-header">
        <h1>Choose Your Level</h1>
        <p>Complete each level to unlock the next challenge!</p>
      </div>
      <div class="levels-grid">
        ${LEVEL_CONFIGS.map(cfg => {
          const unlocked = isLevelUnlocked(progress!, cfg.level);
          const res = progress!.levels[cfg.level];
          const stars = res ? getLevelStars(res.score, res.maxScore) : 0;
          return `
            <div 
              class="level-card ${unlocked ? 'unlocked' : 'locked'} ${res?.completed ? 'completed' : ''}"
              style="--level-color: ${cfg.color}"
              ${unlocked ? `onclick="startLevel(${cfg.level})"` : ''}
            >
              <div class="level-card-top">
                <span class="level-icon">${cfg.icon}</span>
                <span class="level-num">Level ${cfg.level}</span>
                ${!unlocked ? '<span class="lock-icon">🔒</span>' : ''}
              </div>
              <h3 class="level-title">${cfg.title}</h3>
              <p class="level-subtitle">${cfg.subtitle}</p>
              <p class="level-desc">${cfg.description}</p>
              <div class="level-footer">
                <span class="type-pill">${getTypeEmoji(cfg.type)} ${cfg.type}</span>
                <span class="q-count">${cfg.totalQuestions}Q</span>
              </div>
              ${res ? `
                <div class="level-stars">
                  ${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}
                  <span class="score-sm">${res.score}pts</span>
                </div>
              ` : ''}
              ${!unlocked ? '<div class="locked-overlay">Complete previous level to unlock</div>' : ''}
            </div>
          `;
        }).join('')}
      </div>
    </main>
  `;
}

function getTypeEmoji(type: string): string {
  const map: Record<string, string> = {
    typing: '✏️', speech: '🎤', dragdrop: '🖱️', multichoice: '🎯',
  };
  return map[type] ?? '❓';
}

// ─── Game Page ───────────────────────────────────────────────────────────────
function renderGame(): void {
  if (!progress) { navigate('menu'); return; }

  const level = gameState.currentLevel;
  const cfg = LEVEL_CONFIGS.find(c => c.level === level)!;
  const questions = getQuestionsForLevel(level);
  const qi = gameState.currentQuestionIndex;

  if (qi >= questions.length) {
    finishLevel();
    return;
  }

  const question = questions[qi];
  const totalPts = questions.reduce((s, q) => s + q.points, 0);
  const pct = Math.round((qi / questions.length) * 100);

  let questionHTML = '';
  switch (question.type) {
    case 'typing':      questionHTML = renderTypingQuestion(question, handleAnswer); break;
    case 'multichoice': questionHTML = renderMultiChoiceQuestion(question, handleAnswer); break;
    case 'dragdrop':    questionHTML = renderDragDropQuestion(question, handleAnswer); break;
    case 'speech':      questionHTML = renderSpeechQuestion(question, handleAnswer); break;
  }

  app.innerHTML = `
    ${navbarHTML('game')}
    <main class="page-game" style="--level-color: ${cfg.color}">
      <div class="game-header">
        <div class="game-level-info">
          <span class="game-level-badge">${cfg.icon} Level ${cfg.level} — ${cfg.title}</span>
          <span class="game-type">${getTypeEmoji(cfg.type)} ${cfg.type.toUpperCase()}</span>
        </div>
        <div class="game-progress-row">
          <span>Question ${qi + 1} / ${questions.length}</span>
          <div class="progress-bar-track mini">
            <div class="progress-bar-fill" style="width:${pct}%"></div>
          </div>
          <span>Score: ${gameState.score} / ${totalPts}</span>
        </div>
      </div>
      <div class="game-body">
        <div id="question-container">
          ${questionHTML}
        </div>
        <div id="feedback-area"></div>
      </div>
    </main>
  `;

  // Attach handlers
  gameState.startTime = Date.now();
  switch (question.type) {
    case 'typing':      attachTypingHandler(question, handleAnswer); break;
    case 'multichoice': attachMultiChoiceHandler(question, handleAnswer); break;
    case 'dragdrop':    attachDragDropHandler(question, handleAnswer); break;
    case 'speech':      attachSpeechHandler(question, handleAnswer); break;
  }
}

let answering = false;

function handleAnswer(userAnswer: string): void {
  if (answering) return;
  answering = true;

  const level = gameState.currentLevel;
  const questions = getQuestionsForLevel(level);
  const question = questions[gameState.currentQuestionIndex];
  const timeTaken = Math.round((Date.now() - gameState.startTime) / 1000);

  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  const correct = normalize(userAnswer).includes(normalize(question.answer)) ||
                  normalize(question.answer).includes(normalize(userAnswer)) ||
                  normalize(userAnswer) === normalize(question.answer);

  if (correct) gameState.score += question.points;

  gameState.answers.push({
    questionId: question.id,
    userAnswer,
    correct,
    timeTaken,
  });

  // Show feedback
  const feedbackArea = document.getElementById('feedback-area');
  const qContainer = document.getElementById('question-container');
  if (qContainer) qContainer.style.opacity = '0.5';
  if (feedbackArea) {
    feedbackArea.innerHTML = `
      <div class="feedback ${correct ? 'feedback-correct' : 'feedback-wrong'}">
        <span class="feedback-icon">${correct ? '🎉' : '❌'}</span>
        <div>
          <strong>${correct ? 'Correct!' : 'Wrong!'}</strong>
          ${!correct ? `<p>Correct answer: <em>${question.answer}</em></p>` : ''}
        </div>
        <span class="feedback-pts">${correct ? `+${question.points}` : '+0'} pts</span>
      </div>
    `;
    feedbackArea.classList.add('show');
  }

  setTimeout(() => {
    answering = false;
    gameState.currentQuestionIndex++;
    renderGame();
  }, 1800);
}

// ─── Finish Level ────────────────────────────────────────────────────────────
function finishLevel(): void {
  const level = gameState.currentLevel;
  const questions = getQuestionsForLevel(level);
  const maxScore = questions.reduce((s, q) => s + q.points, 0);
  const score = gameState.score;
  const cfg = LEVEL_CONFIGS.find(c => c.level === level)!;
  const pct = Math.round((score / maxScore) * 100);
  const completed = pct >= cfg.requiredScore;
  const totalTimeSec = gameState.answers.reduce((s, a) => s + a.timeTaken, 0);
  const stars = getLevelStars(score, maxScore);

  progress = updateLevelResult(progress!, level, {
    completed,
    score,
    maxScore,
    bestTime: totalTimeSec,
  });

  if (completed) {
    saveToLeaderboard(progress!.playerName, progress!.totalScore);
  }

  gameState.currentPage = 'result';
  renderResult(score, maxScore, stars, completed, pct, totalTimeSec, cfg.requiredScore);
}

// ─── Result Page ─────────────────────────────────────────────────────────────
function renderResult(
  score = 0, maxScore = 0, stars = 0,
  passed = false, pct = 0, timeSec = 0, required = 60
): void {
  const level = gameState.currentLevel;
  const cfg = LEVEL_CONFIGS.find(c => c.level === level)!;
  const nextCfg = LEVEL_CONFIGS.find(c => c.level === level + 1);
  const correctCount = gameState.answers.filter(a => a.correct).length;
  const total = gameState.answers.length;

  app.innerHTML = `
    ${navbarHTML('result')}
    <main class="page-result" style="--level-color: ${cfg.color}">
      <div class="result-card">
        <div class="result-anim">${passed ? '🎊' : '😅'}</div>
        <h2>${passed ? 'Level Cleared!' : 'Keep Trying!'}</h2>
        <p class="result-level">${cfg.icon} Level ${cfg.level} — ${cfg.title}</p>

        <div class="result-stars">
          ${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}
        </div>

        <div class="result-score-big">${score} <span>/ ${maxScore}</span></div>
        <div class="result-pct ${pct >= required ? 'pass' : 'fail'}">${pct}%</div>

        <div class="result-details">
          <div class="rd-item"><span>✅ Correct</span><strong>${correctCount}/${total}</strong></div>
          <div class="rd-item"><span>⏱️ Time</span><strong>${timeSec}s</strong></div>
          <div class="rd-item"><span>🎯 Required</span><strong>${required}%</strong></div>
        </div>

        <div class="result-answers">
          ${gameState.answers.map((a, i) => {
            const questions = getQuestionsForLevel(level);
            const q = questions[i];
            return `
              <div class="answer-row ${a.correct ? 'correct' : 'wrong'}">
                <span class="ar-num">Q${i + 1}</span>
                <span class="ar-icon">${a.correct ? '✅' : '❌'}</span>
                <span class="ar-text">${q?.question.slice(0, 60)}...</span>
                <span class="ar-ans">${a.userAnswer}</span>
              </div>
            `;
          }).join('')}
        </div>

        <div class="result-actions">
          <button class="btn-secondary" onclick="retryLevel()">🔄 Retry Level</button>
          ${passed && nextCfg
            ? `<button class="btn-primary" onclick="startLevel(${nextCfg.level})">Next Level →</button>`
            : `<button class="btn-primary" onclick="navigateTo('levelSelect')">Level Select</button>`
          }
        </div>
      </div>
    </main>
  `;
}

// ─── Leaderboard Page ────────────────────────────────────────────────────────
function renderLeaderboard(): void {
  const board = getLeaderboard();
  app.innerHTML = `
    ${navbarHTML('leaderboard')}
    <main class="page-leaderboard">
      <h1>🏆 Leaderboard</h1>
      <p>Top players who conquered KalSel Quiz!</p>
      ${board.length === 0
        ? '<div class="empty-board">No scores yet. Be the first to finish a level!</div>'
        : `
          <div class="board-table">
            ${board.map((entry, i) => `
              <div class="board-row ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}">
                <span class="board-rank">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}</span>
                <span class="board-name">${entry.name}</span>
                <span class="board-score">⭐ ${entry.score}</span>
                <span class="board-date">${new Date(entry.date).toLocaleDateString()}</span>
              </div>
            `).join('')}
          </div>
        `
      }
      <button class="btn-primary" style="margin-top:2rem" onclick="navigateTo('levelSelect')">Play Now →</button>
    </main>
  `;
}

// ─── Global Helpers exposed to onclick handlers ───────────────────────────────
(window as any).navigateTo = (page: Page) => navigate(page);
(window as any).startLevel = (level: number) => {
  gameState.currentLevel = level;
  gameState.currentQuestionIndex = 0;
  gameState.score = 0;
  gameState.answers = [];
  gameState.startTime = Date.now();
  answering = false;
  navigate('game');
};
(window as any).retryLevel = () => (window as any).startLevel(gameState.currentLevel);
(window as any).resetGame = () => {
  if (confirm('Are you sure you want to reset ALL progress? This cannot be undone.')) {
    resetProgress();
    progress = null;
    navigate('menu');
  }
};
(window as any).confirmReset = () => (window as any).resetGame();

// ─── Init ────────────────────────────────────────────────────────────────────
progress = loadProgress();
render();
