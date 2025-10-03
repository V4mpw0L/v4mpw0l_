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
        this.handleLoadingScreen();
        
        console.log('🚀 Gennisys-inspired portfolio initialized successfully');
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

        // Hide/show navbar on scroll (not on mobile)
        if (window.innerWidth > 768) {
            if (scrollY > state.lastScrollY && scrollY > 100) {
                DOM.navbar.style.transform = 'translateY(-100%)';
            } else {
                DOM.navbar.style.transform = 'translateY(0)';
            }
        }

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
                'hero-badge': 'CEO & Founder',
                'hero-title-1': 'Building the Future',
                'hero-title-2': 'of Technology',
                'hero-subtitle': 'One Innovation at a Time',
                'hero-description': 'Leading <strong>cutting-edge development</strong> with proprietary products that transform industries. From AI automation to business intelligence platforms.',
                
                // Vision
                'vision-badge': 'Our Vision',
                'vision-title': 'Innovation Excellence',
                
                // Products
                'products-badge': 'Our Products',
                'products-title': 'Innovative Applications',
                'products-description': 'We develop our own products with cutting-edge technology, creating solutions that revolutionize markets and generate real impact in the business world.',
                
                // Contact
                'contact-badge': 'Get in Touch',
                'contact-title': 'Let\'s Create Something Amazing',
                
                // Buttons
                'btn-contact': 'Get in Touch',
                'btn-portfolio': 'View Portfolio',
                'btn-send': 'Send Message'
            },
            pt: {
                // Navigation
                'nav-about': 'Sobre',
                'nav-produtos': 'Produtos',
                'nav-portfolio': 'Portfólio',
                'nav-contact': 'Contato',
                
                // Hero Section
                'hero-badge': 'CEO & Fundador',
                'hero-title-1': 'Construindo o Futuro',
                'hero-title-2': 'da Tecnologia',
                'hero-subtitle': 'Uma Inovação por Vez',
                'hero-description': 'Liderando <strong>desenvolvimento de ponta</strong> com produtos proprietários que transformam indústrias. Da automação com IA às plataformas de business intelligence.',
                
                // Vision
                'vision-badge': 'Nossa Visão',
                'vision-title': 'Excelência em Inovação',
                
                // Products
                'products-badge': 'Nossos Produtos',
                'products-title': 'Aplicativos Inovadores',
                'products-description': 'Desenvolvemos nossos próprios produtos com tecnologia de ponta, criando soluções que revolucionam mercados e geram impacto real no mundo dos negócios.',
                
                // Contact
                'contact-badge': 'Entre em Contato',
                'contact-title': 'Vamos Criar Algo Incrível',
                
                // Buttons
                'btn-contact': 'Entre em Contato',
                'btn-portfolio': 'Ver Portfólio',
                'btn-send': 'Enviar Mensagem'
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