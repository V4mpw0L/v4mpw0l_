/**
 * MODERN PROFESSIONAL PORTFOLIO - GENNISYS INSPIRED
 * Advanced animations, mobile responsive, GitHub integration
 */

// ===============================================
// GLOBAL VARIABLES & CONFIGURATION
// ===============================================

const CONFIG = {
  GITHUB_USER: 'v4mpw0l',
  ANIMATION_DURATION: 300,
  SCROLL_THRESHOLD: 100,
  PARTICLE_COUNT: 30,
  TYPING_SPEED: 50,
  API_CACHE_TIME: 5 * 60 * 1000, // 5 minutes
};

let isLoading = false;
let scrollY = 0;
let ticking = false;

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

const utils = {
  // Throttle function for performance
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
    }
  },

  // Debounce function
  debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },

  // Random number generator
  random(min, max) {
    return Math.random() * (max - min) + min;
  },

  // Check if element is in viewport
  isInViewport(element, threshold = 0.1) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= windowHeight * (1 - threshold) && rect.bottom >= windowHeight * threshold;
  },

  // Smooth scroll to element
  scrollToElement(element, offset = 0) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// ===============================================
// NAVIGATION FUNCTIONALITY
// ===============================================

class Navigation {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.navToggle = document.getElementById('nav-toggle');
    this.navMenu = document.getElementById('nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('section[id]');
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.handleScroll();
    this.updateActiveLink();
  }

  setupEventListeners() {
    // Mobile menu toggle
    this.navToggle?.addEventListener('click', () => this.toggleMobileMenu());
    
    // Close mobile menu when clicking on links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          utils.scrollToElement(targetSection, 80);
          this.closeMobileMenu();
        }
      });
    });

    // Handle scroll for navbar styling and active links
    window.addEventListener('scroll', utils.throttle(() => {
      this.handleScroll();
      this.updateActiveLink();
    }, 16));

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navbar.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    this.navToggle.classList.toggle('active');
    this.navMenu.classList.toggle('active');
    document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.navToggle.classList.remove('active');
    this.navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  handleScroll() {
    const scrolled = window.pageYOffset > CONFIG.SCROLL_THRESHOLD;
    this.navbar.classList.toggle('scrolled', scrolled);
  }

  updateActiveLink() {
    let currentSection = '';
    
    this.sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop <= 120 && sectionTop > -section.offsetHeight + 120) {
        currentSection = section.getAttribute('id');
      }
    });

    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
}

// ===============================================
// PARTICLE BACKGROUND ANIMATION
// ===============================================

class ParticleAnimation {
  constructor() {
    this.container = document.getElementById('particles');
    this.particles = [];
    this.animationId = null;
    
    this.init();
  }

  init() {
    if (!this.container) return;
    
    this.createParticles();
    this.animate();
    
    // Handle window resize
    window.addEventListener('resize', utils.debounce(() => {
      this.handleResize();
    }, 250));
  }

  createParticles() {
    for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = utils.random(1, 3);
    const x = utils.random(0, window.innerWidth);
    const y = utils.random(window.innerHeight, window.innerHeight + 100);
    const speed = utils.random(0.5, 2);
    const opacity = utils.random(0.3, 0.8);
    
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      opacity: ${opacity};
      animation-duration: ${20 / speed}s;
      animation-delay: ${utils.random(0, 20)}s;
    `;
    
    this.container.appendChild(particle);
    this.particles.push({
      element: particle,
      x: x,
      y: y,
      speed: speed,
      size: size,
      opacity: opacity
    });
  }

  handleResize() {
    // Remove existing particles
    this.particles.forEach(particle => {
      particle.element.remove();
    });
    this.particles = [];
    
    // Create new particles for new window size
    this.createParticles();
  }

  animate() {
    this.particles.forEach(particle => {
      particle.y -= particle.speed;
      particle.x += Math.sin(particle.y * 0.01) * 0.5;
      
      if (particle.y < -10) {
        particle.y = window.innerHeight + 10;
        particle.x = utils.random(0, window.innerWidth);
      }
      
      particle.element.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0)`;
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.particles.forEach(particle => {
      particle.element.remove();
    });
  }
}

// ===============================================
// SCROLL ANIMATIONS
// ===============================================

class ScrollAnimations {
  constructor() {
    this.observer = null;
    this.animatedElements = document.querySelectorAll('.fade-in, .service-card, .project-card, .about-item, .skill-category');
    
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.observeElements();
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, options);
  }

  observeElements() {
    this.animatedElements.forEach(element => {
      element.classList.add('fade-in');
      this.observer.observe(element);
    });
  }

  animateElement(element) {
    element.classList.add('visible');
    
    // Add stagger animation for grid items
    if (element.parentElement?.classList.contains('services-grid') || 
        element.parentElement?.classList.contains('portfolio-grid')) {
      const siblings = Array.from(element.parentElement.children);
      const index = siblings.indexOf(element);
      element.style.animationDelay = `${index * 0.1}s`;
    }
  }
}

// ===============================================
// TYPING ANIMATION
// ===============================================

class TypingAnimation {
  constructor(element, texts, speed = CONFIG.TYPING_SPEED) {
    this.element = element;
    this.texts = texts;
    this.speed = speed;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.isWaiting = false;
    
    this.init();
  }

  init() {
    if (!this.element || !this.texts.length) return;
    this.type();
  }

  type() {
    const currentText = this.texts[this.textIndex];
    const shouldDelete = this.isDeleting;
    
    if (shouldDelete) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.speed;
    if (shouldDelete) {
      typeSpeed = this.speed / 2;
    }

    if (!shouldDelete && this.charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      this.isDeleting = true;
    } else if (shouldDelete && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      typeSpeed = 500; // Pause before next text
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// ===============================================
// GITHUB PROJECTS LOADER
// ===============================================

class GitHubProjects {
  constructor() {
    this.container = document.getElementById('portfolio-grid');
    this.cache = new Map();
    this.isLoading = false;
    
    this.init();
  }

  init() {
    if (!this.container) return;
    this.loadProjects();
  }

  async loadProjects() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.showLoading();

    try {
      const projects = await this.fetchProjects();
      this.renderProjects(projects);
    } catch (error) {
      console.error('Error loading projects:', error);
      this.showError();
    } finally {
      this.isLoading = false;
      this.hideLoading();
    }
  }

  async fetchProjects() {
    const cacheKey = `github-${CONFIG.GITHUB_USER}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CONFIG.API_CACHE_TIME) {
      return cached.data;
    }

    const response = await fetch(
      `https://api.github.com/users/${CONFIG.GITHUB_USER}/repos?per_page=50&sort=updated`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    const filteredProjects = data
      .filter(repo => !repo.fork && !repo.private && repo.description)
      .slice(0, 6);

    this.cache.set(cacheKey, {
      data: filteredProjects,
      timestamp: Date.now()
    });

    return filteredProjects;
  }

  renderProjects(projects) {
    this.container.innerHTML = '';

    if (!projects.length) {
      this.container.innerHTML = `
        <div class="no-projects">
          <p>No public projects found.</p>
        </div>
      `;
      return;
    }

    projects.forEach((project, index) => {
      const projectCard = this.createProjectCard(project);
      projectCard.style.animationDelay = `${index * 0.1}s`;
      this.container.appendChild(projectCard);
    });

    // Trigger scroll animations for new elements
    const cards = this.container.querySelectorAll('.project-card');
    cards.forEach(card => {
      card.classList.add('fade-in');
      if (utils.isInViewport(card)) {
        setTimeout(() => card.classList.add('visible'), 100);
      }
    });
  }

  createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const technologies = this.getTechnologies(project);
    const description = project.description || 'No description available';
    
    card.innerHTML = `
      <div class="project-header">
        <h3 class="project-title">${project.name}</h3>
        <p class="project-description">${description}</p>
        <div class="project-tags">
          ${technologies.map(tech => `<span class="project-tag">${tech}</span>`).join('')}
        </div>
      </div>
      <div class="project-footer">
        <a href="${project.html_url}" target="_blank" rel="noopener" class="project-link">
          View Code
        </a>
        ${project.homepage ? `
          <a href="${project.homepage}" target="_blank" rel="noopener" class="project-link">
            Live Demo
          </a>
        ` : ''}
      </div>
    `;

    // Add hover effects
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });

    return card;
  }

  getTechnologies(project) {
    const technologies = [];
    
    if (project.language) {
      technologies.push(project.language);
    }
    
    if (project.topics && project.topics.length) {
      technologies.push(...project.topics.slice(0, 4));
    }
    
    return technologies.slice(0, 5);
  }

  showLoading() {
    this.container.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Loading projects...</p>
      </div>
    `;
    this.container.classList.add('loading');
  }

  hideLoading() {
    this.container.classList.remove('loading');
  }

  showError() {
    this.container.innerHTML = `
      <div class="error-message">
        <p>Failed to load projects. Please try again later.</p>
        <button onclick="gitHubProjects.loadProjects()" class="btn btn-secondary">
          Retry
        </button>
      </div>
    `;
  }
}

// ===============================================
// FORM HANDLER
// ===============================================

class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.submitBtn = this.form?.querySelector('button[type="submit"]');
    this.originalBtnText = this.submitBtn?.innerHTML;
    
    this.init();
  }

  init() {
    if (!this.form) return;
    
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Add real-time validation
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (!this.validateForm()) {
      return;
    }

    this.setSubmitting(true);

    try {
      // The form will submit normally via FormSubmit
      // We're just adding visual feedback
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.showSuccess();
      this.form.reset();
    } catch (error) {
      this.showError('Failed to send message. Please try again.');
    } finally {
      this.setSubmitting(false);
    }
  }

  validateForm() {
    const inputs = this.form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      errorMessage = 'This field is required';
      isValid = false;
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = 'Please enter a valid email address';
        isValid = false;
      }
    }

    this.setFieldError(field, errorMessage);
    return isValid;
  }

  setFieldError(field, message) {
    this.clearFieldError(field);
    
    if (message) {
      field.classList.add('error');
      const errorElement = document.createElement('div');
      errorElement.className = 'field-error';
      errorElement.textContent = message;
      field.parentNode.appendChild(errorElement);
    }
  }

  clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  setSubmitting(isSubmitting) {
    if (!this.submitBtn) return;
    
    this.submitBtn.disabled = isSubmitting;
    this.submitBtn.innerHTML = isSubmitting 
      ? '<span>Sending...</span>' 
      : this.originalBtnText;
  }

  showSuccess() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = 'Message sent successfully! I\'ll get back to you soon.';
    
    this.form.parentNode.insertBefore(message, this.form);
    
    setTimeout(() => {
      message.remove();
    }, 5000);
  }

  showError(errorText) {
    const message = document.createElement('div');
    message.className = 'error-message';
    message.textContent = errorText;
    
    this.form.parentNode.insertBefore(message, this.form);
    
    setTimeout(() => {
      message.remove();
    }, 5000);
  }
}

// ===============================================
// PERFORMANCE OPTIMIZATIONS
// ===============================================

class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.preloadCriticalResources();
    this.lazyLoadImages();
    this.setupReducedMotionSupport();
  }

  preloadCriticalResources() {
    // Preload critical fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];

    fontLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });
  }

  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
      });
    }
  }

  setupReducedMotionSupport() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.body.classList.add('reduce-motion');
    }

    prefersReducedMotion.addEventListener('change', () => {
      document.body.classList.toggle('reduce-motion', prefersReducedMotion.matches);
    });
  }
}

// ===============================================
// MAIN INITIALIZATION
// ===============================================

class App {
  constructor() {
    this.components = {};
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      // Initialize all components
      this.components.navigation = new Navigation();
      this.components.particles = new ParticleAnimation();
      this.components.scrollAnimations = new ScrollAnimations();
      this.components.gitHubProjects = new GitHubProjects();
      this.components.contactForm = new ContactForm();
      this.components.performanceOptimizer = new PerformanceOptimizer();

      // Initialize typing animation for hero title
      const heroTitle = document.querySelector('.gradient-text');
      if (heroTitle) {
        this.components.typingAnimation = new TypingAnimation(heroTitle, [
          'Solutions',
          'Innovation',
          'Excellence',
          'Technology'
        ]);
      }

      // Global error handler
      window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
      });

      // Expose to global scope for debugging
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.app = this;
      }

      console.log('🚀 Portfolio initialized successfully');
    } catch (error) {
      console.error('Failed to initialize app:', error);
    }
  }

  destroy() {
    // Cleanup all components
    Object.values(this.components).forEach(component => {
      if (component && typeof component.destroy === 'function') {
        component.destroy();
      }
    });
  }
}

// ===============================================
// GLOBAL EXPORTS
// ===============================================

// Initialize the application
const app = new App();

// Export for external access if needed
window.gitHubProjects = app.components?.gitHubProjects;

// ===============================================
// ADDITIONAL UTILITIES
// ===============================================

// Smooth scroll polyfill for older browsers
if (!window.CSS || !window.CSS.supports || !window.CSS.supports('scroll-behavior', 'smooth')) {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
  script.onload = () => {
    window.__forceSmoothScrollPolyfill__ = true;
    window.smoothscroll.polyfill();
  };
  document.head.appendChild(script);
}

// Add CSS for additional animations
const additionalStyles = `
  .loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 0;
    color: var(--text-secondary);
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--border);
    border-top: 3px solid var(--primary-500);
    border-radius: 50%;
    animation: rotate 1s linear infinite;
    margin-bottom: 1rem;
  }

  .error-message, .success-message {
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    text-align: center;
  }

  .success-message {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid var(--primary-500);
    color: var(--primary-400);
  }

  .error-message {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid #ef4444;
    color: #f87171;
  }

  .field-error {
    color: #f87171;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }

  .form-group input.error,
  .form-group textarea.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
