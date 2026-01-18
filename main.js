/**
 * Forge Structural - Main JavaScript
 * Handles navigation, scroll effects, FAQ toggles, and form interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // =============================================
    // NAVIGATION
    // =============================================
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    
    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when scrolling down
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // =============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =============================================
    // SCROLL ANIMATIONS
    // =============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Apply fade-in animation to elements
    const animatedElements = document.querySelectorAll(
        '.service-card, .project-card, .testimonial-card, .value-item, .process-step, .credential, .deliverable-item, .area-region, .faq-item, .trust-item'
    );
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index % 4 * 100}ms`;
        fadeInObserver.observe(el);
    });
    
    // Animate section headers
    document.querySelectorAll('.section-header, .about-content, .contact-info, .cta-content').forEach(el => {
        el.classList.add('fade-in');
        fadeInObserver.observe(el);
    });
    
    // =============================================
    // FAQ ACCORDION (OPTIONAL ENHANCEMENT)
    // =============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        const answer = item.querySelector('p');
        
        // Add toggle functionality if you want accordion style
        // Currently showing all answers - uncomment below for accordion
        /*
        answer.style.display = 'none';
        question.style.cursor = 'pointer';
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';
            
            // Close all other answers
            faqItems.forEach(otherItem => {
                otherItem.querySelector('p').style.display = 'none';
                otherItem.classList.remove('active');
            });
            
            // Toggle current answer
            if (!isOpen) {
                answer.style.display = 'block';
                item.classList.add('active');
            }
        });
        */
    });
    
    // =============================================
    // CONTACT FORM HANDLING
    // =============================================
    const contactForm = document.getElementById('contact-form');
    
    contactForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Validate required fields
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (!isValid) {
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
            </svg>
            Sending...
        `;
        
        // Simulate form submission (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success state
        submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6L9 17l-5-5"/>
            </svg>
            Message Sent!
        `;
        submitBtn.style.background = '#22c55e';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 3000);
    });
    
    // Real-time form validation feedback
    const formInputs = contactForm?.querySelectorAll('input, textarea, select');
    formInputs?.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        input.addEventListener('input', () => {
            input.classList.remove('error');
        });
    });
    
    // =============================================
    // COUNTER ANIMATION FOR STATS
    // =============================================
    const stats = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const hasH = text.includes('h');
        const target = parseInt(text.replace(/\D/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                let suffix = '';
                if (hasPlus) suffix = '+';
                if (hasPercent) suffix = '%';
                if (hasH) suffix = 'h';
                element.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                let suffix = '';
                if (hasPlus) suffix = '+';
                if (hasPercent) suffix = '%';
                if (hasH) suffix = 'h';
                element.textContent = target + suffix;
            }
        };
        
        updateCounter();
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));
    
    // =============================================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // =============================================
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNav = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks?.querySelectorAll('a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);
    
    // =============================================
    // PARALLAX EFFECT FOR HERO
    // =============================================
    const heroGlow = document.querySelector('.hero-glow');
    
    if (heroGlow) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroGlow.style.transform = `translateX(-50%) translateY(${scrolled * 0.3}px)`;
        });
    }
    
    // =============================================
    // KEYBOARD NAVIGATION
    // =============================================
    document.addEventListener('keydown', (e) => {
        // Close mobile menu on Escape
        if (e.key === 'Escape') {
            navToggle?.classList.remove('active');
            navLinks?.classList.remove('active');
        }
    });
    
    // =============================================
    // PHONE NUMBER FORMATTING
    // =============================================
    const phoneInput = document.getElementById('phone');
    
    phoneInput?.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length >= 10) {
            value = value.substring(0, 10);
            value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
        } else if (value.length >= 6) {
            value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
        } else if (value.length >= 3) {
            value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
        }
        
        e.target.value = value;
    });
    
    // =============================================
    // SERVICE CARD HOVER EFFECTS
    // =============================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            serviceCards.forEach(c => c.classList.remove('highlighted'));
            card.classList.add('highlighted');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('highlighted');
        });
    });
    
    // =============================================
    // INITIALIZE
    // =============================================
    console.log('🔨 Forge Structural - Site Initialized');
    console.log('📍 Serving Ontario with precision structural engineering');
});

// Add CSS for spinner animation and form validation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    .spinner {
        animation: spin 1s linear infinite;
    }
    .nav-links a.active {
        color: var(--color-text-primary);
    }
    .nav-links a.active::after {
        width: 100%;
    }
    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    .service-card.highlighted {
        border-color: var(--color-accent);
    }
`;
document.head.appendChild(style);
