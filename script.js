// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.style.transform = navMenu.classList.contains('active') 
                ? `rotate(${index === 1 ? 45 : index === 0 ? 45 : -45}deg) translate(${index === 1 ? 0 : index === 0 ? 5 : -5}px, ${index === 1 ? 0 : index === 0 ? 5 : -5}px)`
                : 'none';
        });
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
            });
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Animate Skill Bars on Scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level');
                skillBar.style.width = (level * 20) + '%';
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    animateSkillBars();
});

// Add scroll-triggered animations for sections
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.project-card, .skill-category, .credential, .contact-link');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Delay to ensure CSS is loaded
    setTimeout(addScrollAnimations, 100);
});

// Add typing effect to hero title
function typeWriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerHTML;
    const words = originalText.split(' ');
    heroTitle.innerHTML = '';
    
    let wordIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (wordIndex < words.length) {
            const currentWord = words[wordIndex];
            
            if (charIndex < currentWord.length) {
                heroTitle.innerHTML += currentWord.charAt(charIndex);
                charIndex++;
                setTimeout(type, 50);
            } else {
                // Add space after word (except last word)
                if (wordIndex < words.length - 1) {
                    heroTitle.innerHTML += ' ';
                }
                wordIndex++;
                charIndex = 0;
                setTimeout(type, 100);
            }
        }
    }
    
    // Start typing effect after a delay
    setTimeout(type, 500);
}

// Project card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Removed parallax effect for cleaner design

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Contact form handling (if added later)
function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted');
        });
    }
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    
    // Add subtle animation delay to elements
    const animatedElements = document.querySelectorAll('.credential, .project-card:not(.featured)');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Navbar background change
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
    
    // Removed parallax effect
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Translation System
const translations = {
    en: {
        'nav.about': 'About',
        'nav.projects': 'Projects',
        'nav.experience': 'Experience',
        'nav.skills': 'Skills',
        'nav.contact': 'Contact',
        'hero.title1': 'Research Engineer',
        'hero.title2': 'Software Developer',
        'hero.subtitle': 'Bridging neuroscience and technology through innovative applications. Specializing in brain-computer interfaces, mobile apps, and cross-platform development.',
        'hero.cta1': 'Explore My Work',
        'hero.cta2': 'Connect'
    },
    de: {
        'nav.about': 'Über mich',
        'nav.projects': 'Projekte',
        'nav.experience': 'Erfahrung',
        'nav.skills': 'Fähigkeiten',
        'nav.contact': 'Kontakt',
        'hero.title1': 'Forschungsingenieur',
        'hero.title2': 'Softwareentwickler',
        'hero.subtitle': 'Verbindung von Neurowissenschaft und Technologie durch innovative Anwendungen. Spezialisiert auf Gehirn-Computer-Schnittstellen, mobile Apps und plattformübergreifende Entwicklung.',
        'hero.cta1': 'Meine Arbeit entdecken',
        'hero.cta2': 'Verbinden'
    },
    fr: {
        'nav.about': 'À propos',
        'nav.projects': 'Projets',
        'nav.experience': 'Expérience',
        'nav.skills': 'Compétences',
        'nav.contact': 'Contact',
        'hero.title1': 'Ingénieur de recherche',
        'hero.title2': 'Développeur logiciel',
        'hero.subtitle': 'Connecter les neurosciences et la technologie par des applications innovantes. Spécialisé dans les interfaces cerveau-ordinateur, les applications mobiles et le développement multiplateforme.',
        'hero.cta1': 'Explorer mon travail',
        'hero.cta2': 'Se connecter'
    },
    es: {
        'nav.about': 'Acerca de',
        'nav.projects': 'Proyectos',
        'nav.experience': 'Experiencia',
        'nav.skills': 'Habilidades',
        'nav.contact': 'Contacto',
        'hero.title1': 'Ingeniero de investigación',
        'hero.title2': 'Desarrollador de software',
        'hero.subtitle': 'Conectando neurociencia y tecnología a través de aplicaciones innovadoras. Especializado en interfaces cerebro-computadora, aplicaciones móviles y desarrollo multiplataforma.',
        'hero.cta1': 'Explorar mi trabajo',
        'hero.cta2': 'Conectar'
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

// Coin flip animation on page load
function initializeCoinAnimation() {
    const coin = document.querySelector('.coin');
    if (coin) {
        let currentRotation = 0;
        let isOnLogoSide = false; // Start on profile side
        
        // Trigger animation after a short delay to ensure page is loaded
        setTimeout(() => {
            coin.classList.add('spinning');
            
            // Remove the spinning class after animation completes
            // Animation ends on same face (profile picture)
            setTimeout(() => {
                coin.classList.remove('spinning');
                currentRotation = 720; // 2 full rotations, still on profile side
                coin.style.transform = 'rotateY(720deg)'; // Keep it on the profile side
            }, 2000); // Match animation duration
        }, 500); // Small delay for page load
        
        // Handle hover to flip to opposite side only
        coin.addEventListener('mouseenter', () => {
            if (!coin.classList.contains('spinning')) {
                if (!isOnLogoSide) {
                    // Currently on profile, flip to logo
                    currentRotation += 540; // 1.5 spins to logo side
                    isOnLogoSide = true;
                } else {
                    // Currently on logo, flip back to profile
                    currentRotation += 540; // 1.5 spins back to profile side  
                    isOnLogoSide = false;
                }
                coin.style.transform = `rotateY(${currentRotation}deg)`;
            }
        });
    }
}

// Initialize language system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguageSelector();
    initializeCoinAnimation();
});