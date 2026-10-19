const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Mobile Navigation Toggle
function initializeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (!navToggle || !navMenu) return;

    const setMenuOpen = (open) => {
        navMenu.classList.toggle('active', open);
        navToggle.classList.toggle('active', open);
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    navToggle.addEventListener('click', () => {
        setMenuOpen(!navMenu.classList.contains('active'));
    });

    // Close mobile menu when clicking on links
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setMenuOpen(false));
    });
}

// Smooth scrolling and the fixed-nav offset are handled in CSS (scroll-behavior, scroll-margin-top)

// Reveal cards as they scroll into view
function addScrollAnimations() {
    if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const elementsToAnimate = document.querySelectorAll('.project-card, .experience-card, .skill-category, .timeline-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
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
}

function updateNavbarBackground() {
    const nav = document.querySelector('.nav');

    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(updateNavbarBackground, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler, { passive: true });

// Translation System
const translations = {
    en: {
        'nav.about': 'About',
        'nav.projects': 'Projects',
        'nav.experience': 'Experience',
        'nav.skills': 'Skills',
        'hero.title1': 'Research Engineer',
        'hero.title2': 'Software Developer',
        'hero.subtitle': 'I build software for neuroscience research and for everyday use: brain-computer interfaces, signal processing tools, and mobile and desktop apps.',
        'hero.cta1': 'Explore My Work',
        'hero.cta2': 'View on GitHub'
    },
    de: {
        'nav.about': 'Über mich',
        'nav.projects': 'Projekte',
        'nav.experience': 'Erfahrung',
        'nav.skills': 'Fähigkeiten',
        'hero.title1': 'Forschungsingenieur',
        'hero.title2': 'Softwareentwickler',
        'hero.subtitle': 'Ich entwickle Software für die neurowissenschaftliche Forschung und für den Alltag: Gehirn-Computer-Schnittstellen, Werkzeuge zur Signalverarbeitung sowie Mobil- und Desktop-Apps.',
        'hero.cta1': 'Meine Arbeit entdecken',
        'hero.cta2': 'Auf GitHub ansehen'
    },
    fr: {
        'nav.about': 'À propos',
        'nav.projects': 'Projets',
        'nav.experience': 'Expérience',
        'nav.skills': 'Compétences',
        'hero.title1': 'Ingénieur de recherche',
        'hero.title2': 'Développeur logiciel',
        'hero.subtitle': 'Je développe des logiciels pour la recherche en neurosciences et pour le quotidien : interfaces cerveau-ordinateur, outils de traitement du signal, applications mobiles et de bureau.',
        'hero.cta1': 'Explorer mon travail',
        'hero.cta2': 'Voir sur GitHub'
    },
    es: {
        'nav.about': 'Acerca de',
        'nav.projects': 'Proyectos',
        'nav.experience': 'Experiencia',
        'nav.skills': 'Habilidades',
        'hero.title1': 'Ingeniero de investigación',
        'hero.title2': 'Desarrollador de software',
        'hero.subtitle': 'Desarrollo software para la investigación en neurociencia y para el día a día: interfaces cerebro-computadora, herramientas de procesamiento de señales y aplicaciones móviles y de escritorio.',
        'hero.cta1': 'Explorar mi trabajo',
        'hero.cta2': 'Ver en GitHub'
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function translatePage(language) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = language;

    // Save language preference
    localStorage.setItem('language', language);
    currentLanguage = language;
}

function initializeLanguageSelector() {
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        // Set current language
        languageSelect.value = currentLanguage;

        // Add event listener
        languageSelect.addEventListener('change', (e) => {
            translatePage(e.target.value);
        });

        // Translate page on load
        translatePage(currentLanguage);
    }
}

// Coin flip between the portrait and the mascot
function initializeCoinAnimation() {
    const coinContainer = document.querySelector('.coin-container');
    const coin = document.querySelector('.coin');
    if (!coinContainer || !coin) return;

    let currentRotation = 0;
    let isOnMascotSide = false; // Start on profile side
    let isSpinning = false;
    let lastPointerType = '';

    const flip = () => {
        if (isSpinning) return;
        currentRotation += 540; // 1.5 spins to the opposite side
        isOnMascotSide = !isOnMascotSide;
        coin.style.transform = `rotateY(${currentRotation}deg)`;
        coinContainer.setAttribute('aria-pressed', String(isOnMascotSide));
    };

    // Two full spins on page load, ending on the profile picture
    if (!prefersReducedMotion.matches) {
        isSpinning = true;
        setTimeout(() => {
            coin.classList.add('spinning');

            setTimeout(() => {
                coin.classList.remove('spinning');
                currentRotation = 720; // 2 full rotations, still on profile side
                coin.style.transform = 'rotateY(720deg)';
                isSpinning = false;
            }, 2000); // Match animation duration
        }, 500); // Small delay for page load
    }

    // Mouse flips on hover; touch and pen flip on tap; keyboard flips on Enter or Space
    coinContainer.addEventListener('pointerdown', (e) => {
        lastPointerType = e.pointerType;
    });

    coinContainer.addEventListener('pointerenter', (e) => {
        if (e.pointerType === 'mouse') flip();
    });

    coinContainer.addEventListener('click', () => {
        if (lastPointerType !== 'mouse') flip();
        lastPointerType = '';
    });

    coinContainer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            flip();
        }
    });
}

// Dark Mode System
const systemDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

function getSavedTheme() {
    try {
        return localStorage.getItem('theme');
    } catch (e) {
        return null;
    }
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
        themeColor.setAttribute('content', theme === 'dark' ? '#123F26' : '#F3F9EC');
    }

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = `<i class="fas fa-${theme === 'dark' ? 'sun' : 'moon'}" aria-hidden="true"></i>`;
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
}

function initializeThemeSystem() {
    // The inline script in <head> already set data-theme before first paint
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            try {
                localStorage.setItem('theme', newTheme);
            } catch (e) {}
            applyTheme(newTheme);
        });
    }

    // Follow the OS setting until the visitor picks a theme explicitly
    systemDarkQuery.addEventListener('change', (e) => {
        if (!getSavedTheme()) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

function initializeFooterYear() {
    const year = document.getElementById('current-year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeLanguageSelector();
    initializeCoinAnimation();
    initializeThemeSystem();
    initializeFooterYear();
    addScrollAnimations();
    updateNavbarBackground();
});
