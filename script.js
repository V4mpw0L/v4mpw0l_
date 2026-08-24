/* ==========================================================================
   V4MPW0L // TIAGO CARDOSO — PORTAL ENGINE (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // State
    let currentLang = localStorage.getItem('v4mp_lang') || 'pt';
    let currentDevlogPage = 1;
    const postsPerPage = 4;

    // Translations Dictionary
    const I18N = {
        pt: {
            'nav-transmissions': 'DevLog',
            'nav-protocols': 'Protocolos',
            'nav-uplink': 'Contato',
            
            'hero-beacon': 'ONLINE',
            'hero-role': 'Engenheiro de Software & Arquiteto de Sistemas',
            'hero-bio': 'Fundador da <a href="https://gennisys.com" target="_blank" rel="noopener" class="hero-brand-link">Gennisys</a>. Construindo software de alto desempenho, arquiteturas <em>local-first</em>, motores procedurais e ecossistemas digitais independentes.',
            'hero-btn-transmissions': 'Ler Notícias',
            'hero-btn-gennisys': 'Acessar Gennisys Studio ↗',
            
            'term-role': 'Arquiteto de Sistemas // Fundador @<a href="https://gennisys.com" target="_blank" rel="noopener" class="term-brand-link">Gennisys</a>',
            'term-protocols': '[Zero-Bloat, Local-First, JS-Puro, C, Async-IO]',
            'term-listening': 'aguardando notícias..._',

            'devlog-meta': 'LOGS & NOTÍCIAS',
            'devlog-title': 'DevLog & Notas',
            'devlog-desc': 'Registros de arquitetura, lançamentos, experimentos de baixo nível e notas de desenvolvimento sem filtros corporativos.',
            'read-more': 'Abrir Notícia →',

            'protocols-meta': 'DIRETIVAS DE ENGENHARIA',
            'protocols-title': 'Princípios & Protocolos',
            'protocols-desc': 'Diretrizes fundamentais que regem cada linha de código e sistema que desenvolvo.',
            'proto-1-title': 'Zero Bloat // Desempenho Puro',
            'proto-1-desc': 'Aplicações leves construídas com tecnologias fundamentais (Vanilla JS, C, Node), garantindo tempos de resposta sub-50ms e 60 FPS consistentes.',
            'proto-2-title': 'Local-First & Soberania',
            'proto-2-desc': 'Os dados pertencem ao usuário. Criptografia client-side (AES-GCM / Zero-Knowledge) e funcionamento offline sem dependência de nuvens intrusivas.',
            'proto-3-title': 'Arquitetura Autoral',
            'proto-3-desc': 'Construção a partir dos primeiros princípios, dominando cada camada da pilha em vez de colar dependências frágeis de terceiros.',

            'uplink-meta': 'CONTATO & CANAIS',
            'uplink-title': 'Contato Direto',
            'uplink-desc': 'Canais diretos para contato profissional, segurança, colaborações técnicas e trocas de ideias.',
            'studio-box-title': 'Gennisys Studio',
            'studio-box-desc': 'Nosso estúdio independente dedicado a criar jogos autorais, ferramentas de produtividade e experiências interativas.',
            'studio-btn': 'Explorar Estúdio Gennisys →',
            
            'footer-status': 'SISTEMAS OPERANDO NORMALMENTE',
            'footer-copy': '© 2026 Tiago Cardoso (v4mpw0l). Todos os direitos reservados.'
        },
        en: {
            'nav-transmissions': 'DevLog',
            'nav-protocols': 'Protocols',
            'nav-uplink': 'Contact',
            
            'hero-beacon': 'ONLINE',
            'hero-role': 'Software Engineer & Systems Architect',
            'hero-bio': 'Founder of <a href="https://gennisys.com" target="_blank" rel="noopener" class="hero-brand-link">Gennisys</a>. Engineering high-performance software, <em>local-first</em> architectures, procedural engines, and independent digital worlds.',
            'hero-btn-transmissions': 'Read News',
            'hero-btn-gennisys': 'Access Gennisys Studio ↗',
            
            'term-role': 'Systems Architect // Founder @<a href="https://gennisys.com" target="_blank" rel="noopener" class="term-brand-link">Gennisys</a>',
            'term-protocols': '[Zero-Bloat, Local-First, Pure-JS, C, Async-IO]',
            'term-listening': 'listening for updates..._',

            'devlog-meta': 'LOGS & NEWS',
            'devlog-title': 'DevLog & Notes',
            'devlog-desc': 'Architecture chronicles, releases, low-level experiments, and technical deep-dives without corporate filters.',
            'read-more': 'Read Article →',

            'protocols-meta': 'ENGINEERING DIRECTIVES',
            'protocols-title': 'Principles & Protocols',
            'protocols-desc': 'Core architectural principles governing every system and line of code I craft.',
            'proto-1-title': 'Zero Bloat // Pure Speed',
            'proto-1-desc': 'Lightweight applications crafted on fundamental foundations (Vanilla JS, C, Node), guaranteeing sub-50ms latency and steady 60 FPS.',
            'proto-2-title': 'Local-First & Data Sovereignty',
            'proto-2-desc': 'User sovereignty first. Client-side cryptography (AES-GCM / Zero-Knowledge) with full offline functionality without intrusive cloud locks.',
            'proto-3-title': 'First-Principles Architecture',
            'proto-3-desc': 'Crafting solutions from foundational roots, owning the stack rather than stacking fragile third-party dependencies.',

            'uplink-meta': 'CONTACT & CHANNELS',
            'uplink-title': 'Direct Contact',
            'uplink-desc': 'Direct communication channels for professional inquiries, security reports, and technical exchanges.',
            'studio-box-title': 'Gennisys Studio',
            'studio-box-desc': 'Our independent studio crafting proprietary games, productivity tools, and interactive digital worlds.',
            'studio-btn': 'Explore Gennisys Studio →',
            
            'footer-status': 'SYSTEMS OPERATING NOMINALLY',
            'footer-copy': '© 2026 Tiago Cardoso (v4mpw0l). All rights reserved.'
        }
    };

    // Format Date with highlighted day and year numbers
    function formatStyledDate(dateStr) {
        if (!dateStr) return '';
        const parts = String(dateStr).trim().split(' ');
        if (parts.length === 3) {
            return `<span class="date-num">${parts[0]}</span> <span class="date-month">${parts[1]}</span> <span class="date-num">${parts[2]}</span>`;
        }
        return dateStr;
    }

    // Helper: Get DevLog Data safely
    function getDevlogData() {
        return window.DEVLOG_DATA || [];
    }

    // Set Language
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('v4mp_lang', lang);

        // Update Toggle Buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Translate Static Elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (I18N[lang] && I18N[lang][key]) {
                el.innerHTML = I18N[lang][key];
            }
        });

        // Re-render DevLogs
        renderDevlogs();
    }

    // Language Toggle Click Handlers
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang && lang !== currentLang) {
                setLanguage(lang);
            }
        });
    });

    // Render DevLogs Grid & Pagination
    function renderDevlogs() {
        const grid = document.getElementById('devlog-grid');
        const pagination = document.getElementById('devlog-pagination');
        if (!grid) return;

        const allLogs = getDevlogData();
        const totalPages = Math.ceil(allLogs.length / postsPerPage) || 1;
        if (currentDevlogPage > totalPages) currentDevlogPage = 1;

        const startIdx = (currentDevlogPage - 1) * postsPerPage;
        const pageLogs = allLogs.slice(startIdx, startIdx + postsPerPage);

        const readMoreText = I18N[currentLang]['read-more'] || 'Abrir Notícia →';

        grid.innerHTML = pageLogs.map(log => `
            <div class="devlog-card" data-id="${log.id}">
                <div>
                    <div class="devlog-header">
                        <span class="devlog-badge ${log.badgeClass}">${log.badge[currentLang] || log.badge.pt}</span>
                        <span class="devlog-date">${formatStyledDate(log.date[currentLang] || log.date.pt)}</span>
                    </div>
                    <h3 class="devlog-title">${log.title[currentLang] || log.title.pt}</h3>
                    <div class="devlog-excerpt">${log.excerpt[currentLang] || log.excerpt.pt}</div>
                </div>
                <div class="devlog-footer">
                    <span class="devlog-read-btn">${readMoreText}</span>
                </div>
            </div>
        `).join('');

        // Wire Click Events to Open Modal
        grid.querySelectorAll('.devlog-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                openTransmissionModal(id);
            });
        });

        // Render Pagination
        renderPaginationControls(pagination, currentDevlogPage, totalPages, (newPage) => {
            currentDevlogPage = newPage;
            renderDevlogs();
        });
    }

    // Reusable Pagination Generator
    function renderPaginationControls(container, currentPage, totalPages, onPageChange) {
        if (!container) return;

        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }

        let html = `
            <button class="page-btn prev-btn" ${currentPage === 1 ? 'disabled' : ''} aria-label="Previous Page">‹</button>
        `;
        for (let i = 1; i <= totalPages; i++) {
            html += `
                <button class="page-btn num-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>
            `;
        }
        html += `
            <button class="page-btn next-btn" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Next Page">›</button>
        `;
        container.innerHTML = html;

        container.querySelectorAll('.num-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                onPageChange(parseInt(btn.dataset.page, 10));
            });
        });

        const prevBtn = container.querySelector('.prev-btn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    onPageChange(currentPage - 1);
                }
            });
        }

        const nextBtn = container.querySelector('.next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    onPageChange(currentPage + 1);
                }
            });
        }
    }

    // Transmission Modal Logic
    const modal = document.getElementById('transmission-modal');
    const modalContent = document.getElementById('modal-content-area');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    function openTransmissionModal(logId) {
        const item = getDevlogData().find(l => l.id === logId);
        if (!item || !modal || !modalContent) return;

        const lang = currentLang;
        const fullText = (item.texto && item.texto[lang]) ? item.texto[lang] : `<p>${item.excerpt ? item.excerpt[lang] : ''}</p>`;
        const dateHtml = (item.date && item.date[lang]) ? `<span class="modal-date">${formatStyledDate(item.date[lang])}</span>` : '';

        modalContent.innerHTML = `
            <div class="modal-top">
                <span class="devlog-badge ${item.badgeClass}">${item.badge[lang] || item.badge.pt}</span>
            </div>
            <h3 class="modal-title">${item.title[lang] || item.title.pt}</h3>
            <div class="modal-body-card">
                ${fullText}
            </div>
            <div class="modal-footer">
                ${dateHtml}
            </div>
        `;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
            closeModal();
        }
    });

    // Floating Back to Top Logic
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Scroll to Top on Brand Logo Click
    const brandLogoBtn = document.getElementById('brand-logo-btn') || document.querySelector('.brand-sigil');
    if (brandLogoBtn) {
        brandLogoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            history.pushState(null, null, window.location.pathname);
        });
    }

    // Mobile Drawer Navigation (Matching Gennisys Studio)
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    if (mobileBtn && mobileDrawer) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = mobileDrawer.classList.toggle('open');
            mobileBtn.classList.toggle('open', isOpen);
            mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        mobileDrawer.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
                mobileBtn.classList.remove('open');
                mobileBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
                mobileDrawer.classList.remove('open');
                mobileBtn.classList.remove('open');
                mobileBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js').catch(() => {});
        });
    }

    
    // ----------------------------------------------------------------------
    // STEALTH CYBER ETHER PARTICLES & CONSTELLATION ENGINE
    // ----------------------------------------------------------------------
    const canvas = document.getElementById('cyber-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let particles = [];
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 35 : 70;

        class CyberNode {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
                this.radius = Math.random() * 1.5 + 0.6;
                // Monochrome grey/stealth particles with subtle emerald spark
                const isEmerald = Math.random() > 0.65;
                this.color = isEmerald ? 'rgba(0, 255, 136,' : 'rgba(180, 200, 190,';
                this.alpha = Math.random() * 0.4 + 0.15;
                this.baseAlpha = this.alpha;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x += (dx / dist) * force * 2.2;
                        this.y += (dy / dist) * force * 2.2;
                        this.alpha = Math.min(0.9, this.baseAlpha + 0.45);
                    } else {
                        this.alpha = this.baseAlpha;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `${this.color} ${this.alpha})`;
                ctx.fill();
            }
        }

        const mouse = {
            x: null,
            y: null,
            radius: 120
        };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initNodes();
        }, { passive: true });

        function initNodes() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new CyberNode());
            }
        }

        function drawConnections() {
            const maxDistance = isMobile ? 80 : 110;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
                        ctx.lineWidth = 0.7;
                        ctx.stroke();
                    }
                }
            }
        }

        function renderScene() {
            ctx.clearRect(0, 0, width, height);
            drawConnections();
            particles.forEach(node => {
                node.update();
                node.draw();
            });
            requestAnimationFrame(renderScene);
        }

        initNodes();
        renderScene();
    }

    // Initialize Language & Render
    setLanguage(currentLang);
});
