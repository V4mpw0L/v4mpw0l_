// ===============================================
// GENNISYS-INSPIRED PROFESSIONAL WEBSITE
// Modern CEO Portfolio - Tiago Cardoso  
// ===============================================

// Configuration
const CONFIG = {
    github: {
        username: 'v1k3rn',
        token: '', // Add your GitHub token here if needed
        maxRepos: 12
    },
    animations: {
        duration: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    observer: {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    }
};

// DOM Elements Cache
const DOM = {
    navbar: null,
    navToggle: null,
    navMenu: null,
    navLinks: null,
    loadingScreen: null,
    portfolioGrid: null,
    contactForm: null,
    sections: null,
    tabButtons: null,
    particlesContainer: null,
    backToTop: null,
    langButtons: null
};

// State Management
const state = {
    isNavOpen: false,
    currentSection: 'hero',
    lastScrollY: 0,
    isScrolling: false,
    loadedProjects: new Map()
};

// ===============================================
// INITIALIZATION
// ===============================================

class ModernPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.cacheDOMElements();
        this.setupEventListeners();
        this.initAnimations();
        this.createParticles();
        this.createLoadingParticles();
        this.handleLoadingScreen();
        
        console.log('🚀 Gennisys-inspired portfolio initialized successfully');
        
        // Register Service Worker for PWA
        this.registerServiceWorker();
    }

    cacheDOMElements() {
        DOM.navbar = document.querySelector('.navbar');
        DOM.navToggle = document.querySelector('.nav-toggle');
        DOM.navMenu = document.querySelector('.nav-menu');
        DOM.navLinks = document.querySelectorAll('.nav-link');
        DOM.loadingScreen = document.querySelector('.loading-screen');
        DOM.portfolioGrid = document.querySelector('.portfolio-grid');
        DOM.contactForm = document.querySelector('.contact-form');
        DOM.sections = document.querySelectorAll('section[id]');
        DOM.tabButtons = document.querySelectorAll('.tab-button');
        DOM.particlesContainer = document.querySelector('.bg-particles');
        DOM.backToTop = document.querySelector('.back-to-top');
        DOM.langButtons = document.querySelectorAll('.lang-btn');
    }

    setupEventListeners() {
        // Window events
        window.addEventListener('load', () => this.handleWindowLoad());
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        window.addEventListener('resize', () => this.handleResize(), { passive: true });

        // Navigation events
        this.setupNavigationEvents();
        
        // Portfolio events
        this.setupPortfolioEvents();
        
        // Contact form events
        this.setupContactForm();
        
        // Smooth scrolling
        this.setupSmoothScrolling();
        
        // Back to top button
        this.setupBackToTop();
        
        // Language selector
        this.setupLanguageSelector();
    }

    // ===============================================
    // LOADING SCREEN
    // ===============================================

    handleLoadingScreen() {
        if (!DOM.loadingScreen) return;

        // Simulate loading progress
        const progressBar = DOM.loadingScreen.querySelector('.loading-progress');
        if (progressBar) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress > 95) {
                    progress = 100;
                    clearInterval(interval);
                    setTimeout(() => this.hideLoadingScreen(), 500);
                }
                progressBar.style.width = `${Math.min(progress, 100)}%`;
            }, 200);
        } else {
            setTimeout(() => this.hideLoadingScreen(), 1500);
        }
    }

    handleWindowLoad() {
        // Additional loading complete actions
        document.body.classList.add('loaded');
    }

    hideLoadingScreen() {
        if (DOM.loadingScreen) {
            DOM.loadingScreen.classList.add('hidden');
            setTimeout(() => {
                DOM.loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    // ===============================================
    // NAVIGATION
    // ===============================================

    setupNavigationEvents() {
        // Mobile navigation toggle
        if (DOM.navToggle && DOM.navMenu) {
            DOM.navToggle.addEventListener('click', () => this.toggleMobileNav());
        }

        // Close mobile nav when clicking on links
        DOM.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileNav());
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (state.isNavOpen && !e.target.closest('.navbar')) {
                this.closeMobileNav();
            }
        });
    }

    toggleMobileNav() {
        state.isNavOpen = !state.isNavOpen;
        if (DOM.navToggle) DOM.navToggle.classList.toggle('active');
        if (DOM.navMenu) DOM.navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    }

    closeMobileNav() {
        if (state.isNavOpen) {
            state.isNavOpen = false;
            if (DOM.navToggle) DOM.navToggle.classList.remove('active');
            if (DOM.navMenu) DOM.navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    }

    updateNavbar() {
        if (!DOM.navbar) return;

        const scrollY = window.scrollY;
        
        // Add scrolled class
        if (scrollY > 50) {
            DOM.navbar.classList.add('scrolled');
        } else {
            DOM.navbar.classList.remove('scrolled');
        }

        // Always keep navbar visible
        DOM.navbar.style.transform = 'translateY(0)';

        // Update back to top button
        this.updateBackToTop(scrollY);

        state.lastScrollY = scrollY;
    }

    updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        DOM.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                DOM.navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current link
                if (navLink) {
                    navLink.classList.add('active');
                    state.currentSection = sectionId;
                }
            }
        });
    }

    // ===============================================
    // PORTFOLIO
    // ===============================================

    setupPortfolioEvents() {
        if (!DOM.tabButtons.length || !DOM.portfolioGrid) return;

        DOM.tabButtons.forEach(button => {
            button.addEventListener('click', () => this.handlePortfolioTab(button));
        });

        // Load initial content
        this.loadPortfolioContent('all');
    }

    handlePortfolioTab(button) {
        const filter = button.getAttribute('data-filter') || 'all';
        
        // Update active tab
        DOM.tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Load content based on filter
        this.loadPortfolioContent(filter);
    }

    async loadPortfolioContent(filter) {
        if (!DOM.portfolioGrid) return;

        this.showPortfolioLoading();

        try {
            let projects = [];

            if (filter === 'github') {
                projects = await this.fetchGitHubProjects();
            } else {
                projects = this.getStaticProjects(filter);
            }

            this.renderProjects(projects);
        } catch (error) {
            console.error('Error loading portfolio:', error);
            this.showPortfolioError();
        }
    }

    async fetchGitHubProjects() {
        if (state.loadedProjects.has('github')) {
            return state.loadedProjects.get('github');
        }

        try {
            const headers = {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Modern-Portfolio-App'
            };
            
            if (CONFIG.github.token) {
                headers['Authorization'] = `token ${CONFIG.github.token}`;
            }
            
            const response = await fetch(
                `https://api.github.com/users/${CONFIG.github.username}/repos?sort=updated&per_page=${CONFIG.github.maxRepos}`,
                { headers }
            );
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            
            const repos = await response.json();
            const filteredRepos = repos
                .filter(repo => !repo.fork && repo.name !== CONFIG.github.username)
                .slice(0, 6)
                .map(repo => this.transformGitHubRepo(repo));

            state.loadedProjects.set('github', filteredRepos);
            return filteredRepos;
            
        } catch (error) {
            console.error('GitHub fetch error:', error);
            return [];
        }
    }

    transformGitHubRepo(repo) {
        return {
            id: repo.id,
            title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: repo.description || 'Projeto desenvolvido com foco em soluções inovadoras e tecnologias modernas.',
            tags: [
                `⭐ ${repo.stargazers_count}`,
                `🍴 ${repo.forks_count}`,
                ...(repo.language ? [repo.language] : []),
                ...this.detectTechnologies(repo)
            ].slice(0, 6),
            links: [
                { text: 'Ver Código', url: repo.html_url, icon: '→' },
                ...(repo.homepage ? [{ text: 'Ver Demo', url: repo.homepage, icon: '↗' }] : [])
            ],
            category: 'github',
            featured: repo.stargazers_count > 0
        };
    }

    detectTechnologies(repo) {
        const searchText = `${repo.name} ${repo.description || ''} ${repo.language || ''} ${repo.topics?.join(' ') || ''}`.toLowerCase();
        
        const techMap = {
            'React': ['react', 'jsx', 'next.js'],
            'Vue.js': ['vue', 'nuxt'],
            'Angular': ['angular'],
            'Node.js': ['node', 'express', 'fastify'],
            'Python': ['python', 'django', 'flask'],
            'TypeScript': ['typescript', 'ts'],
            'Docker': ['docker', 'container'],
            'API': ['api', 'rest', 'graphql'],
            'Mobile': ['android', 'ios', 'react-native', 'flutter'],
            'AI/ML': ['ai', 'ml', 'tensorflow', 'pytorch']
        };
        
        return Object.entries(techMap)
            .filter(([, keywords]) => keywords.some(keyword => searchText.includes(keyword)))
            .map(([tech]) => tech)
            .slice(0, 3);
    }

    getStaticProjects(filter) {
        const projectDatabase = {
            all: [
                {
                    id: 1,
                    title: 'Sistema de Gestão Empresarial',
                    description: 'Plataforma completa para gestão de recursos empresariais com dashboard analytics avançado e integração com sistemas legados.',
                    tags: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Docker'],
                    links: [
                        { text: 'Ver Demo', url: '#demo', icon: '↗' },
                        { text: 'Código', url: '#github', icon: '→' }
                    ],
                    category: 'web',
                    featured: true
                },
                {
                    id: 2,
                    title: 'E-commerce Avançado',
                    description: 'Plataforma de e-commerce com sistema de pagamento integrado, gestão de estoque em tempo real e analytics de vendas.',
                    tags: ['Vue.js', 'Laravel', 'MySQL', 'Stripe API', 'Redis'],
                    links: [
                        { text: 'Ver Demo', url: '#demo', icon: '↗' },
                        { text: 'Código', url: '#github', icon: '→' }
                    ],
                    category: 'web',
                    featured: true
                },
                {
                    id: 3,
                    title: 'App Mobile Inovador',
                    description: 'Aplicativo mobile multiplataforma com recursos de geolocalização, push notifications e sincronização offline.',
                    tags: ['React Native', 'Firebase', 'TypeScript', 'Maps API'],
                    links: [
                        { text: 'Ver na Store', url: '#store', icon: '↗' },
                        { text: 'Código', url: '#github', icon: '→' }
                    ],
                    category: 'mobile',
                    featured: false
                },
                {
                    id: 4,
                    title: 'Dashboard Analytics',
                    description: 'Interface web moderna para visualização de dados complexos com gráficos interativos e relatórios personalizáveis.',
                    tags: ['React', 'D3.js', 'Python', 'PostgreSQL'],
                    links: [
                        { text: 'Ver Demo', url: '#demo', icon: '↗' },
                        { text: 'Código', url: '#github', icon: '→' }
                    ],
                    category: 'web',
                    featured: false
                }
            ]
        };

        const allProjects = projectDatabase.all;
        
        if (filter === 'all') return allProjects;
        
        return allProjects.filter(project => project.category === filter);
    }

    renderProjects(projects) {
        if (!DOM.portfolioGrid || !projects.length) {
            this.showNoProjects();
            return;
        }

        const projectsHTML = projects.map(project => this.createProjectCard(project)).join('');
        
        DOM.portfolioGrid.innerHTML = projectsHTML;
        
        // Animate cards in
        setTimeout(() => {
            const cards = DOM.portfolioGrid.querySelectorAll('.project-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            });
        }, 100);
    }

    createProjectCard(project) {
        const tagsHTML = project.tags
            .map(tag => `<span class="project-tag">${tag}</span>`)
            .join('');
            
        const linksHTML = project.links
            .map(link => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="project-link">
                    ${link.text} <span class="btn-icon">${link.icon}</span>
                </a>
            `)
            .join('');

        return `
            <div class="project-card fade-in" data-category="${project.category}">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    ${project.featured ? '<span class="project-badge">⭐ Destaque</span>' : ''}
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">${tagsHTML}</div>
                <div class="project-footer">${linksHTML}</div>
            </div>
        `;
    }

    showPortfolioLoading() {
        if (DOM.portfolioGrid) {
            DOM.portfolioGrid.innerHTML = `
                <div class="portfolio-loading">
                    <div class="loading-spinner"></div>
                    <p>Carregando projetos incríveis...</p>
                </div>
            `;
        }
    }

    showPortfolioError() {
        if (DOM.portfolioGrid) {
            DOM.portfolioGrid.innerHTML = `
                <div class="portfolio-error">
                    <p>Ops! Erro ao carregar projetos.</p>
                    <button onclick="location.reload()" class="btn btn-primary">Tentar Novamente</button>
                </div>
            `;
        }
    }

    showNoProjects() {
        if (DOM.portfolioGrid) {
            DOM.portfolioGrid.innerHTML = `
                <div class="no-projects">
                    <p>Nenhum projeto encontrado nesta categoria.</p>
                </div>
            `;
        }
    }

    // ===============================================
    // CONTACT FORM
    // ===============================================

    setupContactForm() {
        if (!DOM.contactForm) return;

        DOM.contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
    }

    async handleContactSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(DOM.contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form data
        if (!this.validateContactForm(data)) return;
        
        const submitButton = DOM.contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        
        try {
            // Simulate API call (replace with actual endpoint)
            await this.simulateFormSubmission(data);
            
            // Success feedback
            this.showFormSuccess();
            DOM.contactForm.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormError();
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    }

    validateContactForm(data) {
        const required = ['name', 'email', 'message'];
        const missing = required.filter(field => !data[field]?.trim());
        
        if (missing.length > 0) {
            alert(`Por favor, preencha os campos obrigatórios: ${missing.join(', ')}`);
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Por favor, insira um email válido.');
            return false;
        }
        
        return true;
    }

    async simulateFormSubmission(data) {
        // Simulate network delay
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }

    showFormSuccess() {
        // You could implement a toast notification here
        alert('✅ Mensagem enviada com sucesso! Entrarei em contato em breve.');
    }

    showFormError() {
        alert('❌ Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.');
    }

    // ===============================================
    // SMOOTH SCROLLING
    // ===============================================

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleSmoothScroll(e, anchor));
        });
    }

    handleSmoothScroll(e, anchor) {
        e.preventDefault();
        
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const offset = DOM.navbar ? DOM.navbar.offsetHeight : 0;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile nav if open
            this.closeMobileNav();
        }
    }

    // ===============================================
    // ANIMATIONS & EFFECTS
    // ===============================================

    initAnimations() {
        this.setupIntersectionObserver();
        this.initParallax();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, CONFIG.observer);

        // Observe elements with fade-in class
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    initParallax() {
        // Simple parallax effect for hero background
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = hero.querySelector('.hero-bg');
            
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        }, { passive: true });
    }

    createParticles() {
        if (!DOM.particlesContainer) return;

        const particleCount = window.innerWidth > 768 ? 50 : 25;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            
            // Random size variation
            const size = 1 + Math.random() * 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            DOM.particlesContainer.appendChild(particle);
        }
    }

    createLoadingParticles() {
        const loadingParticlesContainer = document.getElementById('loading-particles');
        if (!loadingParticlesContainer) return;

        const particleCount = window.innerWidth > 768 ? 40 : 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (10 + Math.random() * 8) + 's';
            
            // Random size variation
            const size = 1 + Math.random() * 2.5;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            loadingParticlesContainer.appendChild(particle);
        }
    }

    // ===============================================
    // SCROLL HANDLING
    // ===============================================

    handleScroll() {
        if (!state.isScrolling) {
            requestAnimationFrame(() => {
                this.updateNavbar();
                this.updateActiveNavLink();
                state.isScrolling = false;
            });
        }
        state.isScrolling = true;
    }

    handleResize() {
        // Recreate particles on resize
        if (DOM.particlesContainer) {
            DOM.particlesContainer.innerHTML = '';
            this.createParticles();
        }
    }

    // ===============================================
    // PWA SERVICE WORKER
    // ===============================================

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('✅ SW registered successfully:', registration.scope);
                        this.handleInstallPrompt();
                    })
                    .catch(error => {
                        console.log('❌ SW registration failed:', error);
                    });
            });
        }
    }

    handleInstallPrompt() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            setTimeout(() => {
                if (deferredPrompt && !window.matchMedia('(display-mode: standalone)').matches) {
                    this.showInstallBanner(deferredPrompt);
                }
            }, 5000);
        });
    }

    showInstallBanner(deferredPrompt) {
        const banner = document.createElement('div');
        banner.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; background: rgba(26, 26, 46, 0.95); backdrop-filter: blur(20px); border: 1px solid rgba(74, 158, 255, 0.3); border-radius: 16px; padding: 16px; position: fixed; bottom: 20px; left: 20px; right: 20px; z-index: 10000; color: white; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);">
                <span style="font-size: 24px;">📱</span>
                <div style="flex: 1;">
                    <div style="font-weight: 600; margin-bottom: 4px;">Install App</div>
                    <div style="font-size: 14px; opacity: 0.8;">Get the full experience!</div>
                </div>
                <button onclick="this.parentNode.parentNode.install()" style="background: linear-gradient(135deg, #4a9eff, #8b5cf6); border: none; padding: 8px 16px; border-radius: 8px; color: white; font-weight: 600; cursor: pointer;">Install</button>
                <button onclick="this.parentNode.parentNode.remove()" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; opacity: 0.7;">×</button>
            </div>
        `;
        
        banner.install = () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(() => {
                banner.remove();
            });
        };
        
        document.body.appendChild(banner);
        setTimeout(() => banner.remove(), 10000);
    }

    // ===============================================
    // BACK TO TOP BUTTON
    // ===============================================

    setupBackToTop() {
        if (!DOM.backToTop) return;

        DOM.backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    updateBackToTop(scrollY) {
        if (!DOM.backToTop) return;

        if (scrollY > 300) {
            DOM.backToTop.classList.add('visible');
        } else {
            DOM.backToTop.classList.remove('visible');
        }
    }

    // ===============================================
    // LANGUAGE SELECTOR
    // ===============================================

    setupLanguageSelector() {
        if (!DOM.langButtons.length) return;

        DOM.langButtons.forEach(button => {
            button.addEventListener('click', () => this.switchLanguage(button));
        });

        // Initialize with default language (English)
        this.currentLanguage = 'en';
        this.loadLanguageData();
    }

    switchLanguage(button) {
        const lang = button.getAttribute('data-lang');
        
        if (lang === this.currentLanguage) return;

        // Update active button
        DOM.langButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Update current language
        this.currentLanguage = lang;

        // Apply language changes
        this.applyLanguage(lang);
    }

    loadLanguageData() {
        this.translations = {
            en: {
                // Navigation
                'nav-about': 'About',
                'nav-produtos': 'Products',
                'nav-portfolio': 'Portfolio',
                'nav-contact': 'Contact',
                
                // Hero Section
                'hero-badge': 'Independent App Studio',
                'hero-title-1': 'Designing Proprietary',
                'hero-title-2': 'Mobile Applications',
                'hero-subtitle': 'for the digital economy',
                'hero-description': 'CEO & Founder of <strong>Gennisys</strong> — Building AI-first experiences, scalable cloud infrastructure, and innovative mobile solutions that define the future of digital interaction.',
                
                // Vision
                'vision-badge': 'Our Vision',
                'vision-title': 'Innovation Excellence',
                
                // Products
                'products-badge': 'Our Products',
                'products-title': 'Innovative Applications',
                'products-description': 'We develop our own products with cutting-edge technology, creating solutions that revolutionize markets and generate real impact in the business world.',
                
                // Individual Products
                'product1-title': 'GenFlow - Intelligent Automation',
                'product1-desc': 'Revolutionary business automation platform with integrated AI. Optimizes processes, reduces costs by 60% and exponentially increases productivity.',
                'product2-title': 'DataViz Pro - Business Intelligence',
                'product2-desc': 'Complete BI suite with interactive dashboards, machine learning and predictive analytics. Transform data into winning strategic decisions.',
                'product3-title': 'V4mpBot - Conversational AI',
                'product3-desc': 'Automated customer service system with advanced natural language processing. Revolutionizes customer success with AI that truly understands.',
                'product4-title': 'Security & Compliance',
                'product4-desc': 'Comprehensive security audits, penetration testing, and compliance frameworks ensuring enterprise-grade protection.',
                
                // Product Features
                'product1-feat1': 'Generative AI',
                'product1-feat2': 'Intelligent Workflows',
                'product1-feat3': 'Predictive Analytics',
                'product1-feat4': 'Cloud Native',
                'product2-feat1': 'Interactive Dashboards',
                'product2-feat2': 'ML Predictions',
                'product2-feat3': 'Real-time Analytics',
                'product2-feat4': 'Custom Reports',
                'product3-feat1': 'Advanced NLP',
                'product3-feat2': 'Multi-channel',
                'product3-feat3': 'Continuous Learning',
                'product3-feat4': 'API Integrations',
                'product4-feat1': 'Security Audits',
                'product4-feat2': 'Penetration Testing',
                'product4-feat3': 'Compliance Management',
                'product4-feat4': 'Threat Monitoring',
                
                // About Section
                'about-badge': 'About the Founder',
                'about-title': 'Leading Innovation Through Code',
                'about-description': 'With a deep understanding of both business strategy and technical execution, I bridge the gap between vision and reality in the digital space.',
                
                // About Cards
                'about-card1-title': 'Strategic Leadership',
                'about-card1-desc': 'Directing proprietary roadmaps and enforcing disciplined delivery for every product launch across our portfolio.',
                'about-card1-feat1': 'Product Governance',
                'about-card1-feat2': 'Team Orchestration',
                'about-card1-feat3': 'Market Positioning',
                
                'about-card2-title': 'Technical Excellence',
                'about-card2-desc': 'Leading engineering stewardship with resilient infrastructure and continuous innovation standards.',
                'about-card2-feat1': 'Full-Stack Architecture',
                'about-card2-feat2': 'AI-First Development',
                'about-card2-feat3': 'Cloud-Native Solutions',
                
                'about-card3-title': 'Global Vision',
                'about-card3-desc': 'Activating strategic alliances that extend distribution and stakeholder value across international markets.',
                'about-card3-feat1': 'Market Expansion',
                'about-card3-feat2': 'Partnership Development',
                'about-card3-feat3': 'Brand Growth',
                
                // Tech Stack
                'tech-stack-title': 'Core Technologies',
                
                // Contact Section
                'contact-badge': 'Stay Connected',
                'contact-title': 'Follow Our Innovation Journey',
                'contact-description': 'Stay updated with our latest products and technological breakthroughs. Join our community of innovators and tech enthusiasts.',
                
                // Contact Methods
                'email-desc': 'Business inquiries and partnerships',
                'telegram-desc': 'Quick questions and consultations',
                'linkedin-desc': 'Professional networking',
                'github-desc': 'Open source contributions',
                
                // Company Status
                'status-building': 'Building innovative products',
                
                // Company Showcase
                'showcase-innovation-title': 'Innovation First',
                'showcase-innovation-desc': 'Every product we create pushes the boundaries of what\'s possible in technology.',
                'showcase-global-title': 'Global Impact',
                'showcase-global-desc': 'Our applications are designed to solve real-world problems on a global scale.',
                'showcase-ai-title': 'AI-Powered',
                'showcase-ai-desc': 'Artificial Intelligence is at the core of everything we build and deploy.',
                'showcase-security-title': 'Enterprise Security',
                'showcase-security-desc': 'Bank-level security and compliance built into every product from day one.',
                
                // Direct Contact
                'direct-contact-title': 'Want to know more about our products?',
                'direct-contact-desc': 'Follow our journey and get updates on new releases.',
                
                // Trusted By
                'trusted-by': 'Trusted by',
                
                // Buttons
                'btn-contact': 'Get in Touch',
                'btn-portfolio': 'View Portfolio',
                'btn-send': 'Send Message',
                'btn-updates': 'Get Updates',
                'btn-github': 'Follow on GitHub',
                
                // Footer
                'footer-products-title': 'Our Products',
                'footer-genflow': 'GenFlow AI',
                'footer-dataviz': 'DataViz Pro',
                'footer-v4mpbot': 'V4mpBot',
                'footer-more': 'More Products',
                'footer-company-title': 'Company',
                
                // Statistics
                'stat-apps': 'Apps in Production',
                'stat-users': 'Active Users',
                'stat-years': 'Years Leading'
            },
            pt: {
                // Navigation
                'nav-about': 'Sobre',
                'nav-produtos': 'Produtos',
                'nav-portfolio': 'Portfólio',
                'nav-contact': 'Contato',
                
                // Hero Section
                'hero-badge': 'Estúdio Independente de Apps',
                'hero-title-1': 'Projetando Aplicativos',
                'hero-title-2': 'Mobile Proprietários',
                'hero-subtitle': 'para a economia digital',
                'hero-description': 'CEO & Fundador da <strong>Gennisys</strong> — Construindo experiências com IA, infraestrutura de nuvem escalável e soluções móveis inovadoras que definem o futuro da interação digital.',
                
                // Vision
                'vision-badge': 'Nossa Visão',
                'vision-title': 'Excelência em Inovação',
                
                // Products
                'products-badge': 'Nossos Produtos',
                'products-title': 'Aplicativos Inovadores',
                'products-description': 'Desenvolvemos nossos próprios produtos com tecnologia de ponta, criando soluções que revolucionam mercados e geram impacto real no mundo dos negócios.',
                
                // Individual Products
                'product1-title': 'GenFlow - Automação Inteligente',
                'product1-desc': 'Plataforma revolucionária de automação empresarial com IA integrada. Otimiza processos, reduz custos em 60% e aumenta produtividade exponencialmente.',
                'product2-title': 'DataViz Pro - Business Intelligence',
                'product2-desc': 'Suite completa de BI com dashboards interativos, machine learning e análise preditiva. Transforme dados em decisões estratégicas vencedoras.',
                'product3-title': 'V4mpBot - AI Conversacional',
                'product3-desc': 'Sistema de atendimento automatizado com processamento de linguagem natural avançado. Revoluciona o customer success com IA que realmente entende.',
                'product4-title': 'Segurança & Conformidade',
                'product4-desc': 'Auditorias de segurança abrangentes, testes de penetração e estruturas de conformidade garantindo proteção de nível empresarial.',
                
                // Product Features
                'product1-feat1': 'IA Generativa',
                'product1-feat2': 'Workflows Inteligentes',
                'product1-feat3': 'Analytics Preditivo',
                'product1-feat4': 'Cloud Native',
                'product2-feat1': 'Dashboards Interativos',
                'product2-feat2': 'ML Predictions',
                'product2-feat3': 'Real-time Analytics',
                'product2-feat4': 'Custom Reports',
                'product3-feat1': 'NLP Avançado',
                'product3-feat2': 'Multi-channel',
                'product3-feat3': 'Learning Contínuo',
                'product3-feat4': 'API Integrations',
                'product4-feat1': 'Auditorias de Segurança',
                'product4-feat2': 'Testes de Penetração',
                'product4-feat3': 'Gestão de Conformidade',
                'product4-feat4': 'Monitoramento de Ameaças',
                
                // About Section
                'about-badge': 'Sobre o Fundador',
                'about-title': 'Liderando Inovação Através do Código',
                'about-description': 'Com profundo entendimento tanto de estratégia de negócios quanto execução técnica, faço a ponte entre visão e realidade no espaço digital.',
                
                // About Cards
                'about-card1-title': 'Liderança Estratégica',
                'about-card1-desc': 'Direcionando roadmaps proprietários e garantindo entrega disciplinada para cada lançamento de produto em nosso portfólio.',
                'about-card1-feat1': 'Governança de Produto',
                'about-card1-feat2': 'Orquestração de Equipe',
                'about-card1-feat3': 'Posicionamento de Mercado',
                
                'about-card2-title': 'Excelência Técnica',
                'about-card2-desc': 'Liderando gestão de engenharia com infraestrutura resiliente e padrões de inovação contínua.',
                'about-card2-feat1': 'Arquitetura Full-Stack',
                'about-card2-feat2': 'Desenvolvimento IA-First',
                'about-card2-feat3': 'Soluções Cloud-Native',
                
                'about-card3-title': 'Visão Global',
                'about-card3-desc': 'Ativando alianças estratégicas que expandem distribuição e valor para stakeholders em mercados internacionais.',
                'about-card3-feat1': 'Expansão de Mercado',
                'about-card3-feat2': 'Desenvolvimento de Parcerias',
                'about-card3-feat3': 'Crescimento de Marca',
                
                // Tech Stack
                'tech-stack-title': 'Tecnologias Principais',
                
                // Contact Section
                'contact-badge': 'Fique Conectado',
                'contact-title': 'Acompanhe Nossa Jornada de Inovação',
                'contact-description': 'Mantenha-se atualizado com nossos produtos mais recentes e avanços tecnológicos. Junte-se à nossa comunidade de inovadores e entusiastas da tecnologia.',
                
                // Contact Methods
                'email-desc': 'Consultas comerciais e parcerias',
                'telegram-desc': 'Perguntas rápidas e consultorias',
                'linkedin-desc': 'Networking profissional',
                'github-desc': 'Contribuições open source',
                
                // Company Status
                'status-building': 'Construindo produtos inovadores',
                
                // Company Showcase
                'showcase-innovation-title': 'Inovação em Primeiro Lugar',
                'showcase-innovation-desc': 'Cada produto que criamos expande os limites do que é possível na tecnologia.',
                'showcase-global-title': 'Impacto Global',
                'showcase-global-desc': 'Nossos aplicativos são projetados para resolver problemas do mundo real em escala global.',
                'showcase-ai-title': 'Inteligência Artificial',
                'showcase-ai-desc': 'A Inteligência Artificial está no centro de tudo que construímos e implantamos.',
                'showcase-security-title': 'Segurança Empresarial',
                'showcase-security-desc': 'Segurança e conformidade de nível bancário integradas em cada produto desde o primeiro dia.',
                
                // Direct Contact
                'direct-contact-title': 'Quer saber mais sobre nossos produtos?',
                'direct-contact-desc': 'Acompanhe nossa jornada e receba atualizações sobre novos lançamentos.',
                
                // Trusted By
                'trusted-by': 'Confiança de',
                
                // Buttons
                'btn-contact': 'Entre em Contato',
                'btn-portfolio': 'Ver Portfólio',
                'btn-send': 'Enviar Mensagem',
                'btn-updates': 'Receber Atualizações',
                'btn-github': 'Seguir no GitHub',
                
                // Footer
                'footer-products-title': 'Nossos Produtos',
                'footer-genflow': 'GenFlow AI',
                'footer-dataviz': 'DataViz Pro',
                'footer-v4mpbot': 'V4mpBot',
                'footer-more': 'Mais Produtos',
                                'footer-company-title': 'Empresa',
                
                // Statistics
                'stat-apps': 'Apps em Produção',
                'stat-users': 'Usuários Ativos',
                'stat-years': 'Anos Liderando'
            }
        };
    }

    applyLanguage(lang) {
        const translations = this.translations[lang];
        if (!translations) return;

        // Apply translations to elements with data-translate attributes
        Object.keys(translations).forEach(key => {
            const elements = document.querySelectorAll(`[data-translate="${key}"]`);
            elements.forEach(element => {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[key];
                } else {
                    element.innerHTML = translations[key];
                }
            });
        });

        // Store language preference
        localStorage.setItem('preferred-language', lang);
        
        console.log(`🌍 Language switched to: ${lang === 'en' ? 'English' : 'Português'}`);
    }
}

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

const utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    animateCounter(element, target, duration = 2000) {
        const start = parseInt(element.textContent) || 0;
        const increment = (target - start) / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
};

// ===============================================
// ERROR HANDLING
// ===============================================

window.addEventListener('error', (e) => {
    console.error('🚨 JavaScript Error:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        error: e.error
    });
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('🚨 Unhandled Promise Rejection:', e.reason);
});

// ===============================================
// INITIALIZATION
// ===============================================

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ModernPortfolio();
});

// Additional initialization for late-loading elements
window.addEventListener('load', () => {
    console.log('🎉 All resources loaded successfully');
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ModernPortfolio, utils };
}