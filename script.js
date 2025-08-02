// --- Configurações ---
const GITHUB_USER = 'v4mpw0l'; // Altere aqui para seu user

// ======= Matrix Rain =======
const matrix = document.getElementById('matrix-rain');
const mtxCtx = matrix.getContext('2d');
let matrixChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+=-{}[]'.split('');
let columns, drops;
function resizeMatrix() {
  matrix.width = window.innerWidth;
  matrix.height = window.innerHeight;
  columns = Math.floor(window.innerWidth / 18);
  drops = Array(columns).fill(1);
}
function drawMatrix() {
  mtxCtx.fillStyle = 'rgba(11,24,20,0.14)';
  mtxCtx.fillRect(0,0,matrix.width,matrix.height);
  mtxCtx.font = '16px Share Tech Mono, monospace';
  for(let i=0;i<columns;i++){
    const text = matrixChars[Math.floor(Math.random()*matrixChars.length)];
    mtxCtx.fillStyle = '#00ff99';
    mtxCtx.shadowColor = "#00ff99";
    mtxCtx.shadowBlur = 13;
    mtxCtx.fillText(text, i*18, drops[i]*18);
    mtxCtx.shadowBlur = 0;
    if(drops[i]*18 > matrix.height && Math.random() > 0.975) drops[i]=0;
    drops[i]++;
  }
  setTimeout(drawMatrix, 52);
}
resizeMatrix();
window.addEventListener('resize', resizeMatrix);
drawMatrix();

// ======= Neon Particles Bg =======
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
let t = 0;
function drawBg() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let i=0;i<80;i++){
    let x = Math.sin(i*0.2 + t)*190 + canvas.width/2;
    let y = Math.cos(i*0.27 + t)*150 + canvas.height/2;
    ctx.beginPath();
    ctx.arc(x, y, 0.8 + Math.abs(Math.sin(t+i))*2.3, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(0,255,153,${0.11+Math.abs(Math.cos(t+i)*0.14)})`;
    ctx.shadowColor = "#00ff99";
    ctx.shadowBlur = 13;
    ctx.fill();
  }
  t += 0.01;
  requestAnimationFrame(drawBg);
}
drawBg();

// ======= Terminal Fake Interativo =======
const terminal = document.getElementById('terminal');
let terminalHistory = [];
const commands = {
  help: "Comandos: <span class='terminal-cmd'>help</span>, <span class='terminal-cmd'>about</span>, <span class='terminal-cmd'>skills</span>, <span class='terminal-cmd'>contact</span>, <span class='terminal-cmd'>projects</span>, <span class='terminal-cmd'>clear</span>",
  about: "Eu sou V4mpw0l, hacker, dev full stack, entusiasta de segurança e automação.",
  skills: "JavaScript, Node.js, Flutter, Cybersecurity, Linux, SQL/Postgres, GameDev, Automation",
  contact: "Contato: <a href='mailto:seuemail@email.com' target='_blank'>Email</a> | <a href='https://t.me/seuuser' target='_blank'>Telegram</a> | <a href='https://linkedin.com/in/seuuser' target='_blank'>LinkedIn</a>",
  projects: "Veja meus projetos na seção <span class='terminal-cmd'>Projetos em Destaque</span> abaixo ou <a href='https://github.com/v4mpw0l' target='_blank'>no GitHub</a>.",
  clear: "__CLEAR__"
};
function printTerminalLine(text, type='output') {
  const div = document.createElement('div');
  div.className = type === 'error' ? 'terminal-error' :
                  type === 'help' ? 'terminal-help' : 'terminal-output';
  div.innerHTML = text;
  terminal.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
}
function printPrompt(cmd='') {
  const line = document.createElement('div');
  line.className = 'terminal-input-line';
  line.innerHTML = `<span class="terminal-prompt">v4mpw0l@portfolio:~$</span>
    <span class="terminal-cmd" contenteditable="true" spellcheck="false"></span>`;
  terminal.appendChild(line);
  const input = line.querySelector('.terminal-cmd');
  input.focus();
  input.innerText = cmd || '';
  // Move cursor to end
  document.execCommand('selectAll', false, null);
  document.getSelection().collapseToEnd();

  input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      const value = input.innerText.trim();
      terminalHistory.push(value);
      handleCommand(value);
      line.remove();
      printPrompt();
    } else if(e.key === 'ArrowUp') {
      e.preventDefault();
      if(terminalHistory.length) {
        input.innerText = terminalHistory[terminalHistory.length-1];
        document.execCommand('selectAll', false, null);
        document.getSelection().collapseToEnd();
      }
    }
  });
}
function handleCommand(cmd) {
  if(!cmd) return;
  if(commands[cmd]) {
    if(commands[cmd]==='__CLEAR__') {
      terminal.innerHTML = '';
      return;
    }
    printTerminalLine(commands[cmd], 'help');
  } else {
    printTerminalLine(`Comando não reconhecido: <span class='terminal-cmd'>${cmd}</span>`, 'error');
  }
}
function showTerminalWelcome() {
  printTerminalLine("Bem-vindo ao terminal hacker do <b>V4mpw0l</b>! Digite <span class='terminal-cmd'>help</span> para ver comandos.");
  printPrompt();
}
terminal.setAttribute('tabindex', '0');
showTerminalWelcome();

// ==== Skills: barras já animadas no CSS ====

// ======= Projetos do GitHub + Ranking =======
async function carregarRepos() {
  const container = document.getElementById('repos-container');
  const rankingDiv = document.getElementById('ranking-projetos');
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`);
    if (!res.ok) throw new Error('Erro ao buscar repositórios');
    const data = await res.json();
    container.innerHTML = '';
    rankingDiv.innerHTML = '';
    // Filtra forks e repositórios ocultos
    const projetos = data.filter(repo => !repo.fork && !repo.private);
    // Top 3 por estrelas
    const top3 = [...projetos].sort((a,b)=>b.stargazers_count-a.stargazers_count).slice(0,3);
    top3.forEach((repo, i) => {
      rankingDiv.innerHTML += `<span class="ranking-badge">#${i+1} ⭐ ${repo.name} (${repo.stargazers_count})</span>`;
    });

    // Exibe todos em cards, animando ao scroll
    projetos.forEach((repo, idx) => {
      const el = document.createElement('div');
      el.className = 'repo-card';
      el.innerHTML = `
        <div class="repo-title">${repo.name}</div>
        <div class="repo-desc">${repo.description || "<i>Sem descrição</i>"}</div>
        <div class="repo-links">
          <a href="${repo.html_url}" target="_blank" class="repo-link" title="Ver no GitHub">
            <svg height="17" width="17" viewBox="0 0 16 16" fill="currentColor" style="margin-right:2px"><path d="M8 .2a8 8 0 00-2.5 15.6c.4.1.6-.2.6-.5v-2c-2.5.5-3-.6-3-1.2 0-.3-.1-.6-.4-.8-.2-.1-.5-.5 0-.5.3 0 .6.2.7.3.4.7 1 .5 1.2.4.1-.3.2-.5.4-.6-2-.2-4-1-4-4.4 0-1 .4-1.8 1-2.4-.1-.2-.5-1.1.1-2.2 0 0 .8-.2 2.5.9.8-.2 1.6-.3 2.4-.3.8 0 1.6.1 2.4.3 1.7-1.1 2.5-.9 2.5-.9.6 1.1.2 2 .1 2.2.7.6 1 1.4 1 2.4 0 3.4-2 4.2-4 4.4.3.2.5.6.5 1.2v1.8c0 .3.2.6.6.5A8 8 0 008 .2"></path></svg>
            GitHub
          </a>
          ${repo.homepage && repo.homepage.startsWith('http') ? `
          <a href="${repo.homepage}" target="_blank" class="repo-link" title="Ver site do projeto">
            <svg height="17" width="17" viewBox="0 0 24 24" fill="currentColor"><path d="M14 3v2h3.59l-4.83 4.83 1.41 1.41L19 6.41V10h2V3z"/><path d="M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z"/></svg>
            Site
          </a>` : ''}
        </div>
      `;
      container.appendChild(el);
    });

    // Animar cards ao aparecer no scroll
    const cards = Array.from(document.querySelectorAll('.repo-card'));
    const animOnScroll = () => {
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if(rect.top < window.innerHeight-50) {
          card.classList.add('visible');
        }
      });
    };
    animOnScroll();
    window.addEventListener('scroll', animOnScroll);
    if(projetos.length == 0) {
      container.innerHTML = "<p style='color:#00ff99;font-size:1.16em'>Nenhum projeto público encontrado!</p>";
    }
  } catch (e) {
    container.innerHTML = "<p style='color:#f76a6a;font-size:1.11em'>Erro ao buscar projetos, tente recarregar.</p>";
  }
}
window.addEventListener('DOMContentLoaded', carregarRepos);
