// ===== Terminal Fake Minimalista =====
const terminal = document.getElementById("terminalbox");
const lines = [
  { cmd: "Bem-vindo ao portfólio!", type: "out" },
  { cmd: "help", type: "cmd" }
];
const terminalCmds = {
  help: "Comandos: help, about, skills, projects, clear",
  about: "Sou V4mpw0l, full stack dev, hacker, automação, apaixonado por cyber!",
  skills: "JavaScript, Node.js, Flutter, Cybersecurity, GameDev, Automation, Linux",
  projects: "Veja os cards na seção Projetos 👾",
  clear: "__CLEAR__"
};

function renderTerminal() {
  terminal.innerHTML = "";
  lines.forEach(l => {
    if (l.type === "cmd") {
      terminal.innerHTML += `<div class="term-line"><span style="color:#ad7aff">v4mpw0l@portfolio:~$</span> ${l.cmd}</div>`;
    } else if (l.type === "err") {
      terminal.innerHTML += `<div class="term-line term-err">${l.cmd}</div>`;
    } else {
      terminal.innerHTML += `<div class="term-line term-out">${l.cmd}</div>`;
    }
  });
  // fake input com foco
  terminal.innerHTML += `<div class="term-line"><span style="color:#ad7aff">v4mpw0l@portfolio:~$</span> <span class="term-input" contenteditable="true" spellcheck="false"></span><span class="cursor">|</span></div>`;
  terminal.scrollTop = terminal.scrollHeight;
  const inp = terminal.querySelector(".term-input");
  if(inp) inp.focus();
  inp.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const val = inp.innerText.trim();
      if (val) {
        lines.push({cmd: val, type:"cmd"});
        if(terminalCmds[val]){
          if(terminalCmds[val] === "__CLEAR__"){ lines.length = 0; }
          else lines.push({cmd: terminalCmds[val], type:"out"});
        } else {
          lines.push({cmd: "Comando não reconhecido: "+val, type:"err"});
        }
      }
      renderTerminal();
    }
  });
}
renderTerminal();

// ===== Projetos do GitHub =====
const GITHUB_USER = "v4mpw0l";
async function loadProjects() {
  const cont = document.getElementById("projetos-cards");
  cont.innerHTML = "<div style='color:#ad7aff;margin:1.2em;'>Carregando projetos...</div>";
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
    projetos.forEach(repo => {
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
      `;
      cont.appendChild(card);
    });
    // Animação de fadein ao scroll
    const cards = Array.from(document.querySelectorAll('.proj-card'));
    const animOnScroll = () => {
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if(rect.top < window.innerHeight-50) card.classList.add('visible');
      });
    };
    animOnScroll();
    window.addEventListener('scroll', animOnScroll);
  } catch (e) {
    cont.innerHTML = "<div style='color:#ff6a99'>Erro ao buscar projetos.</div>";
  }
}
window.addEventListener("DOMContentLoaded", loadProjects);
