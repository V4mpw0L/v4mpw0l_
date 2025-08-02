// ========= MATRIX RAIN DARK BLOOD ===========
window.addEventListener('DOMContentLoaded', function() {
  const matrixCanvas = document.getElementById('matrix-bg');
  if (!matrixCanvas) return;
  const mCtx = matrixCanvas.getContext('2d');
  let w = window.innerWidth, h = window.innerHeight;
  let fontSize = 20;
  let columns = Math.floor(w / fontSize);
  let drops = Array(columns).fill(1);
  const matrixChars = 'V4MPW0L01🩸†#'.split('');

  function resizeMatrix() {
    w = window.innerWidth;
    h = window.innerHeight;
    matrixCanvas.width = w;
    matrixCanvas.height = h;
    columns = Math.floor(w / fontSize);
    drops = Array(columns).fill(1);
  }
  window.addEventListener('resize', resizeMatrix);

  function drawMatrix() {
    mCtx.fillStyle = "rgba(36,10,20,0.13)";
    mCtx.fillRect(0, 0, w, h);
    mCtx.font = fontSize + "px 'Share Tech Mono', monospace";
    for (let i = 0; i < columns; i++) {
      let text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
      mCtx.fillStyle = "#d1022f";
      mCtx.shadowColor = "#300";
      mCtx.shadowBlur = Math.random() > 0.8 ? 7 : 3;
      mCtx.globalAlpha = Math.random() > 0.93 ? 0.95 : 0.64;
      mCtx.fillText(text, i * fontSize, drops[i] * fontSize);
      mCtx.shadowBlur = 0;
      mCtx.globalAlpha = 1;
      if (drops[i] * fontSize > h && Math.random() > 0.955) drops[i] = 0;
      drops[i]++;
    }
    setTimeout(drawMatrix, 39);
  }
  resizeMatrix();
  drawMatrix();
});

// ========= TERMINAL INTERATIVO VAMP ===========
const terminal = document.getElementById("terminalbox");
let lines = [
  { cmd: "🩸 Bem-vind0 ao cyberlair do V4mpw0l 🧛‍♂️🐺", type: "out" },
  { cmd: "Digite <b style='color:#d1022f'>help</b> para explorar...", type: "out" }
];
const terminalCmds = {
  help: `
    <b>Comandos:</b> <span class='term-cmd'>help</span>, 
    <span class='term-cmd'>about</span>, 
    <span class='term-cmd'>skills</span>, 
    <span class='term-cmd'>projects</span>, 
    <span class='term-cmd'>clear</span>, 
    <span class='term-cmd'>blood</span>, 
    <span class='term-cmd'>wolf</span>
  `,
  about: "<span style='color:#d1022f'>Eu sou V4mpw0l</span>.<br>Full stack dev, cybersecurity, automação & game dev.<br>Metade <b>vampiro</b>, metade <b>lobo</b>... <i>100% hacker</i>.",
  skills: "JS, Node.js, Flutter, Cybersecurity, GameDev, Automation, Linux, SQL/Postgres, AI",
  projects: "Veja os cards na seção <b style='color:#d1022f'>Projetos</b> abaixo 👾",
  blood: "<span style='color:#d1022f'>🩸 Blood is the code, code is the blood 🩸</span>",
  wolf: "🐺 <b>L0b0 iN Th3 Cyb3r W00ds...</b> <i>Auuu~</i>",
  clear: "__CLEAR__"
};

function renderTerminal() {
  terminal.innerHTML = "";
  lines.forEach(l => {
    if (l.type === "cmd") {
      terminal.innerHTML += `<div class="term-line"><span style="color:#d1022f">v4mpw0l@cyberlair:~$</span> <span>${l.cmd}</span></div>`;
    } else if (l.type === "err") {
      terminal.innerHTML += `<div class="term-line term-err">${l.cmd}</div>`;
    } else {
      terminal.innerHTML += `<div class="term-line term-out">${l.cmd}</div>`;
    }
  });
  terminal.innerHTML += `<div class="term-line"><span style="color:#d1022f">v4mpw0l@cyberlair:~$</span> <span class="term-input" contenteditable="true" spellcheck="false"></span><span class="cursor">|</span></div>`;
  terminal.scrollTop = terminal.scrollHeight;
  const inp = terminal.querySelector(".term-input");
  if (inp) inp.focus();
  inp.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const val = inp.innerText.trim().toLowerCase();
      if (val) {
        lines.push({cmd: val, type:"cmd"});
        if(terminalCmds[val]){
          if(terminalCmds[val] === "__CLEAR__"){ lines = []; }
          else lines.push({cmd: terminalCmds[val], type:"out"});
        } else if(val === "sangue" || val === "blood" || val === "🩸"){
          lines.push({cmd: "🩸 O código é sangue e o sangue é código!", type:"out"});
        } else if(val === "v4mpw0l"){
          lines.push({cmd: "👾 V4mpw0l n4 áre4! 🩸🐺", type:"out"});
        } else {
          lines.push({cmd: "Comando não reconhecido: "+val, type:"err"});
        }
      }
      if(lines.length > 20) lines = lines.slice(-14);
      renderTerminal();
    }
  });
}
renderTerminal();

// ========= PROJETOS DO GITHUB ===========
const GITHUB_USER = "v4mpw0l";
async function loadProjects() {
  const cont = document.getElementById("projetos-cards");
  cont.innerHTML = "<div style='color:#d1022f;margin:1.2em;'>Carregando projetos vamp...</div>";
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      { headers: { Accept: "application/vnd.github.mercy-preview+json" } }
    );
    if (!res.ok) throw new Error("Erro ao buscar");
    const data = await res.json();
    cont.innerHTML = "";
    const projetos = data.filter(r => !r.fork && !r.private);
    if(!projetos.length) cont.innerHTML = "<div style='color:#fff'>Nenhum projeto público encontrado!</div>";
    projetos.forEach((repo, idx) => {
      let tags = [];
      if (repo.language) tags.push(repo.language);
      if (repo.topics && repo.topics.length) tags = tags.concat(repo.topics.slice(0,5));
      const card = document.createElement("div");
      card.className = "proj-card";
      card.innerHTML = `
        <div class="proj-title">${repo.name}</div>
        <div class="proj-desc">${repo.description || "<i>Sem descrição</i>"}</div>
        <div class="proj-tags">${tags.map(tag=>`<span class="proj-tag">${tag}</span>`).join('')}</div>
        <div class="proj-links">
          <a href="${repo.html_url}" target="_blank" class="proj-link">GitHub</a>
          ${repo.homepage && repo.homepage.startsWith("http") ? `<a href="${repo.homepage}" target="_blank" class="proj-link">Site</a>`:""}
        </div>
        <span class="card-blood" style="display:block;position:absolute;left:${40+Math.random()*130}px;top:-9px;">
          <svg height="23" width="13">
            <ellipse cx="6" cy="11" rx="4" ry="7" fill="#d1022f" fill-opacity="0.74">
              <animate attributeName="cy" values="9;16;9" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.55;1" dur="1.5s" repeatCount="indefinite" />
            </ellipse>
          </svg>
        </span>
      `;
      cont.appendChild(card);
    });
    // Fade-in animado
    const cards = Array.from(document.querySelectorAll('.proj-card'));
    const animOnScroll = () => {
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if(rect.top < window.innerHeight-40) card.classList.add('visible');
      });
    };
    animOnScroll();
    window.addEventListener('scroll', animOnScroll);
  } catch (e) {
    cont.innerHTML = "<div style='color:#ff6a99'>Erro ao buscar projetos.</div>";
  }
}
window.addEventListener("DOMContentLoaded", loadProjects);

// ========== UX: SCROLL SUAVE ==========
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const id = a.getAttribute("href").slice(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ========== ANIMAÇÃO HEADER SHINE ==========
document.querySelectorAll('.logo, .logo-blink').forEach(el=>{
  el.addEventListener("mouseenter", ()=>{
    el.style.textShadow = "0 0 15px #f12c43, 0 0 22px #d1022f";
    el.style.filter = "brightness(1.12) saturate(1.19)";
  });
  el.addEventListener("mouseleave", ()=>{
    el.style.textShadow = "";
    el.style.filter = "";
  });
});
