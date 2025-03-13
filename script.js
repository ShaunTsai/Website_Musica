// Animation Observer for scroll animations
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

// Intersection Observer for lazy loading
const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            if (target.tagName.toLowerCase() === 'iframe') {
                const src = target.getAttribute('data-src');
                if (src) {
                    target.src = src;
                }
            }
            observer.unobserve(target);
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.1
});

// Performance optimization for images
function optimizeImageLoading() {
    // Add loading placeholder for lazy-loaded images
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        // Create and insert placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'loading-placeholder';
        img.parentNode.insertBefore(placeholder, img);
        
        // Add lazy-image class for fade-in effect
        img.classList.add('lazy-image');

        // Handle lazy loading
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            img.setAttribute('decoding', 'async');
            // Handle image load event
            img.addEventListener('load', () => {
                img.classList.add('loaded');
                const placeholder = img.previousElementSibling;
                if (placeholder?.classList.contains('loading-placeholder')) {
                    placeholder.remove();
                }
            });
        } else {
            // Fallback to Intersection Observer
            lazyLoadObserver.observe(img);
        }
    });
}

// Optimize iframe loading
function optimizeIframeLoading() {
    const iframes = document.querySelectorAll('iframe[loading="lazy"]');
    iframes.forEach(iframe => {
        const src = iframe.src;
        iframe.removeAttribute('src');
        iframe.setAttribute('data-src', src);
        lazyLoadObserver.observe(iframe);
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    // Add animation classes to elements
    const animatedElements = [
        '.feature-item',
        '.about-content',
        '.mastercamp-content',
        '.line-contact-content'
    ];
    
    animatedElements.forEach((selector, index) => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('animate-on-scroll');
            // Add delay for staggered animation
            element.style.animationDelay = `${index * 0.2}s`;
            animationObserver.observe(element);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize lazy loading and animations
    optimizeImageLoading();
    optimizeIframeLoading();
    initScrollAnimations();
    // Smooth scrolling for navigation links
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

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Here you would typically send the form data to your backend
            // For now, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
});
