// Portfólio hacker 3D - Repos GitHub em cards animados (by V4mpw0l)
const GITHUB_USER = 'v4mpw0l'; // Troque para o seu username se precisar

// 3D Neon background effect
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

// Repositórios em cards
async function carregarRepos() {
  const container = document.getElementById('repos-container');
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`);
    if (!res.ok) throw new Error('Erro ao buscar repositórios');
    const data = await res.json();
    container.innerHTML = '';
    // Filtra forks e repositórios ocultos
    const projetos = data.filter(repo => !repo.fork && !repo.private);
    projetos.forEach(repo => {
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
    if(projetos.length == 0) {
      container.innerHTML = "<p style='color:#00ff99;font-size:1.16em'>Nenhum projeto público encontrado!</p>";
    }
  } catch (e) {
    container.innerHTML = "<p style='color:#f76a6a;font-size:1.11em'>Erro ao buscar projetos, tente recarregar.</p>";
  }
}
window.addEventListener('DOMContentLoaded', carregarRepos);
