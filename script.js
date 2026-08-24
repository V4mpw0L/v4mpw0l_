/* ==========================================================================
   V4MPW0L // TIAGO CARDOSO — PORTAL ENGINE (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // State
    let currentLang = localStorage.getItem('v4mp_lang') || 'pt';
    let currentDevlogPage = 1;
    let currentArmoryPage = 1;
    const postsPerPage = 4;
    const armoryPerPage = 4;

    // Translations Dictionary
    const I18N = {
        pt: {
            'nav-transmissions': 'DevLog',
            'nav-armory': 'Projetos',
            'nav-protocols': 'Protocolos',
            'nav-uplink': 'Contato',
            
            'hero-beacon': 'ONLINE',
            'hero-role': 'Engenheiro de Software & Arquiteto de Sistemas',
            'hero-bio': 'Fundador da <strong>Gennisys</strong>. Construindo software de alto desempenho, arquiteturas <em>local-first</em>, motores procedurais e ecossistemas digitais independentes.',
            'hero-btn-transmissions': 'Ler Transmissões',
            'hero-btn-gennisys': 'Acessar Gennisys Studio ↗',
            
            'devlog-meta': 'LOGS & TRANSMISSÕES',
            'devlog-title': 'DevLog & Notas de Engenharia',
            'devlog-desc': 'Registros de arquitetura, lançamentos, experimentos de baixo nível e notas de desenvolvimento sem filtros corporativos.',
            'read-more': 'Abrir Transmissão →',

            'armory-meta': 'PROJETOS & REPOSITÓRIOS',
            'armory-title': 'Projetos Selecionados',
            'armory-desc': 'Sistemas autorais construídos do zero com foco em velocidade, soberania de dados e zero dependências desnecessárias.',
            'launch-btn': 'Acessar Demo',
            'repo-btn': 'Código Fonte',

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
            'nav-armory': 'Projects',
            'nav-protocols': 'Protocols',
            'nav-uplink': 'Contact',
            
            'hero-beacon': 'ONLINE',
            'hero-role': 'Software Engineer & Systems Architect',
            'hero-bio': 'Founder of <strong>Gennisys</strong>. Engineering high-performance software, <em>local-first</em> architectures, procedural engines, and independent digital worlds.',
            'hero-btn-transmissions': 'Read Transmissions',
            'hero-btn-gennisys': 'Access Gennisys Studio ↗',
            
            'devlog-meta': 'LOGS & TRANSMISSIONS',
            'devlog-title': 'DevLog & Engineering Notes',
            'devlog-desc': 'Architecture chronicles, releases, low-level experiments, and technical deep-dives without corporate filters.',
            'read-more': 'Open Transmission →',

            'armory-meta': 'PROJECTS & REPOSITORIES',
            'armory-title': 'Selected Projects',
            'armory-desc': 'Proprietary systems built from first principles prioritizing raw speed, user sovereignty, and zero bloat.',
            'launch-btn': 'Live Demo',
            'repo-btn': 'Source Code',

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

    // Armory Projects Dataset
    const ARMORY_PROJECTS = [
        {
            id: 'proj-passmap',
            icon: '🛡️',
            status: { pt: 'LIVE // ZERO-KNOWLEDGE', en: 'LIVE // ZERO-KNOWLEDGE' },
            title: 'PassMap',
            desc: {
                pt: 'Cofre de credenciais e senhas com criptografia client-side AES-GCM / PBKDF2. Zero nuvem forçada, zero telemetria invasiva.',
                en: 'Zero-knowledge credential and password vault with client-side AES-GCM / PBKDF2 encryption. No forced cloud, no invasive telemetry.'
            },
            tags: ['WebCrypto', 'AES-GCM', 'Local-First'],
            launch: 'https://v4mpw0l.github.io/PassMap/',
            repo: 'https://github.com/v4mpw0l/PassMap'
        },
        {
            id: 'proj-fazendarpg',
            icon: '🌾',
            status: { pt: 'v1.4 // 60 FPS', en: 'v1.4 // 60 FPS' },
            title: 'FazendaRPG',
            desc: {
                pt: 'Simulador agrícola e RPG ecológico construído em Vanilla JS sem engines pesadas. Ciclos climáticos e persistência assíncrona.',
                en: 'Agricultural simulation & ecological RPG engine built in Vanilla JS without heavy runtimes. Dynamic weather and async persistence.'
            },
            tags: ['Vanilla JS', 'Procedural Loops', 'Async Storage'],
            launch: 'https://v4mpw0l.github.io/fazendarpg/',
            repo: 'https://github.com/v4mpw0l/fazendarpg'
        },
        {
            id: 'proj-hacker0s',
            icon: '📟',
            status: { pt: 'BUILD 2.1 // TACTICAL', en: 'BUILD 2.1 // TACTICAL' },
            title: 'Hacker0s',
            desc: {
                pt: 'Simulador cibernético de terminal CRT com nós de invasão lógica, decodificação hash em tempo real e desafios de engenharia reversa.',
                en: 'Cybernetic CRT terminal simulator featuring logic infiltration nodes, real-time hash deciphering, and reverse-engineering challenges.'
            },
            tags: ['Terminal Core', 'CRT Scanlines', 'Crypto Puzzles'],
            launch: 'https://v4mpw0l.github.io/hacker0S/',
            repo: 'https://github.com/v4mpw0l/hacker0S'
        },
        {
            id: 'proj-packetclicker',
            icon: '⚡',
            status: { pt: 'v2.0 // HIGH-THROUGHPUT', en: 'v2.0 // HIGH-THROUGHPUT' },
            title: 'PacketClicker',
            desc: {
                pt: 'Simulador incremental de tráfego de dados e clusters quânticos com árvores de habilidades e progressão offline precisa.',
                en: 'Incremental network traffic and quantum cluster simulator featuring progression trees and deterministic offline calculations.'
            },
            tags: ['Network Math', 'Automation', 'Petabyte Scaling'],
            launch: 'https://v4mpw0l.github.io/PacketClicker-MMO/',
            repo: 'https://github.com/v4mpw0l/PacketClicker-MMO'
        },
        {
            id: 'proj-gencalc',
            icon: '🧮',
            status: { pt: 'STABLE // IEEE-754', en: 'STABLE // IEEE-754' },
            title: 'GenCalc & BudgetBox',
            desc: {
                pt: 'Suíte de utilitários rápidos com precisão de ponto flutuante calibrada, ergonomia 100% via teclado e exportação analítica.',
                en: 'Productivity utility suite with IEEE-754 precision correction, 100% keyboard-driven ergonomics, and cashflow charts.'
            },
            tags: ['Financial Engine', 'Keyboard UX', 'Zero Bloat'],
            launch: 'https://v4mpw0l.github.io/GenCalc/',
            repo: 'https://github.com/v4mpw0l/GenCalc'
        },
        {
            id: 'proj-gennisys',
            icon: '🌐',
            status: { pt: 'STUDIO CORE // LIVE', en: 'STUDIO CORE // LIVE' },
            title: 'Gennisys Studio',
            desc: {
                pt: 'Portal central e design system atmosférico com suporte a auras místicas, catálogo de criações e sistema autoral de transmissões.',
                en: 'Central portal and atmospheric design system supporting dynamic auras, creations catalog, and proprietary transmissions engine.'
            },
            tags: ['Design System', 'Atmospheric Aura', '60 FPS'],
            launch: 'https://gennisys.com',
            repo: 'https://github.com/V4mpw0L/Gennisys'
        }
    ];

    
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

        // Update All Toggle Buttons
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

        // Re-render DevLogs & Armory
        renderDevlogs();
        renderArmory();
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

    // Render DevLogs Grid & Pagination (No tabs, pure clean pagination)
    function renderDevlogs() {
        const grid = document.getElementById('devlog-grid');
        const pagination = document.getElementById('devlog-pagination');
        if (!grid) return;

        const allLogs = getDevlogData();
        const totalPages = Math.ceil(allLogs.length / postsPerPage) || 1;
        if (currentDevlogPage > totalPages) currentDevlogPage = 1;

        const startIdx = (currentDevlogPage - 1) * postsPerPage;
        const pageLogs = allLogs.slice(startIdx, startIdx + postsPerPage);

        const readMoreText = I18N[currentLang]['read-more'] || 'Abrir Transmissão →';

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
                    <span class="devlog-tag">${log.tag || ''}</span>
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
            const sec = document.getElementById('devlog');
            if (sec) {
                const y = sec.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    }

    // Render Armory Projects Grid & Pagination
    function renderArmory() {
        const grid = document.getElementById('armory-grid');
        const pagination = document.getElementById('armory-pagination');
        if (!grid) return;

        const allProjects = ARMORY_PROJECTS;
        const totalPages = Math.ceil(allProjects.length / armoryPerPage) || 1;
        if (currentArmoryPage > totalPages) currentArmoryPage = 1;

        const startIdx = (currentArmoryPage - 1) * armoryPerPage;
        const pageProjects = allProjects.slice(startIdx, startIdx + armoryPerPage);

        const launchText = I18N[currentLang]['launch-btn'] || 'Acessar Demo';
        const repoText = I18N[currentLang]['repo-btn'] || 'Código Fonte';

        grid.innerHTML = pageProjects.map(proj => `
            <div class="armory-card">
                <div class="armory-top">
                    <div class="armory-meta">
                        <span class="armory-icon">${proj.icon}</span>
                        <span class="armory-status">${proj.status[currentLang] || proj.status.pt}</span>
                    </div>
                    <h3 class="armory-title">${proj.title}</h3>
                    <p class="armory-desc">${proj.desc[currentLang] || proj.desc.pt}</p>
                    <div class="armory-tags">
                        ${proj.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                </div>
                <div class="armory-actions">
                    <a href="${proj.launch}" target="_blank" rel="noopener" class="armory-btn armory-btn-launch">${launchText}</a>
                    <a href="${proj.repo}" target="_blank" rel="noopener" class="armory-btn armory-btn-repo">${repoText}</a>
                </div>
            </div>
        `).join('');

        // Render Pagination
        renderPaginationControls(pagination, currentArmoryPage, totalPages, (newPage) => {
            currentArmoryPage = newPage;
            renderArmory();
            const sec = document.getElementById('armory');
            if (sec) {
                const y = sec.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
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
        const tagHtml = item.tag ? `<span class="modal-tag">${item.tag}</span>` : '<span></span>';
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
                ${tagHtml}
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

    // Scroll to Top on Brand Logo Click
    const brandLogoBtn = document.getElementById('brand-logo-btn') || document.querySelector('.brand-sigil');
    if (brandLogoBtn) {
        brandLogoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            history.pushState(null, null, window.location.pathname);
        });
    }

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
        });
    }

    
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

    // Initialize Language & Render
    setLanguage(currentLang);
});

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js').catch(() => {});
        });
    }
