// Portfolio Website JavaScript

// Portfolio Data
const portfolioItems = [
    {
        id: 1,
        title: "E-commerce Website",
        category: "web",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        description: "Modern e-commerce platform with payment integration",
        tags: ["HTML", "CSS", "JavaScript", "PHP"],
        link: "#"
    },
    {
        id: 2,
        title: "Hotel Booking System",
        category: "app",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
        description: "Complete hotel reservation system with admin panel",
        tags: ["Bootstrap", "JavaScript", "PHP", "MySQL"],
        link: "#"
    },
    {
        id: 3,
        title: "Portfolio Website",
        category: "web",
        image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&h=400&fit=crop",
        description: "Responsive portfolio website with modern design",
        tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        link: "#"
    },
    {
        id: 4,
        title: "Task Management App",
        category: "app",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
        description: "Web application for managing tasks and projects",
        tags: ["React", "Node.js", "MongoDB", "Express"],
        link: "#"
    },
    {
        id: 5,
        title: "Restaurant Website",
        category: "web",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
        description: "Restaurant website with online ordering system",
        tags: ["HTML", "CSS", "JavaScript", "PHP"],
        link: "#"
    },
    {
        id: 6,
        title: "Mobile App UI",
        category: "mobile",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
        description: "Modern mobile application user interface",
        tags: ["React Native", "Figma", "UI/UX"],
        link: "#"
    }
];

// Typing Effect
const typedTextSpan = document.getElementById('typed');
const textArray = ["Web Developer", "UI/UX Designer", "Full Stack Developer", "Problem Solver"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 1000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (typedTextSpan) {
        setTimeout(type, newTextDelay + 250);
    }
});

// Render Portfolio Items
function renderPortfolio(filter = 'all') {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (!portfolioGrid) return;
    
    let filteredItems = portfolioItems;
    if (filter !== 'all') {
        filteredItems = portfolioItems.filter(item => item.category === filter);
    }
    
    portfolioGrid.innerHTML = filteredItems.map(item => `
        <div class="col-md-6 col-lg-4 portfolio-item" data-category="${item.category}">
            <div class="card border-0 shadow-sm h-100">
                <div class="position-relative overflow-hidden">
                    <img src="${item.image}" class="portfolio-img card-img-top" alt="${item.title}">
                    <div class="portfolio-overlay">
                        <div class="text-center">
                            <h5 class="text-white mb-3">${item.title}</h5>
                            <a href="${item.link}" class="btn btn-light me-2">
                                <i class="fas fa-eye me-1"></i> View
                            </a>
                            <a href="#" class="btn btn-outline-light">
                                <i class="fab fa-github me-1"></i> Code
                            </a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text text-muted">${item.description}</p>
                    <div class="tags">
                        ${item.tags.map(tag => `<span class="badge bg-light text-dark me-1">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Portfolio Filter
function initializePortfolioFilter() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-primary');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            this.classList.add('btn-primary');
            this.classList.remove('btn-outline-primary');
            
            // Filter portfolio items
            const filter = this.getAttribute('data-filter');
            renderPortfolio(filter);
        });
    });
}

// Contact Form Submission
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                alert('Message sent successfully! I\'ll get back to you soon.');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Navbar Scroll Effect
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Add fade-in class to elements
    document.querySelectorAll('.skill-item, .portfolio-item, .timeline-content, .tech-icon').forEach(el => {
        el.classList.add('fade-in');
    });
}

// Bootstrap Scrollspy Fix
function initializeScrollSpy() {
    const scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbar',
        offset: 100
    });
}

// Main Initialization
function init() {
    console.log('🚀 Initializing Portfolio...');
    
    // Initialize components
    renderPortfolio();
    initializePortfolioFilter();
    initializeContactForm();
    initializeBackToTop();
    initializeNavbar();
    initializeAnimations();
    initializeScrollSpy();
    
    console.log('✅ Portfolio initialized successfully!');
}

// Start the application
document.addEventListener('DOMContentLoaded', init);

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile navbar if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navbarCollapse);
            }
            
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add current year to footer
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.querySelector('footer .current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Export functions for global use
window.viewPortfolioItem = function(id) {
    const item = portfolioItems.find(item => item.id === id);
    if (item) {
        alert(`Viewing: ${item.title}\n\n${item.description}`);
    }
};
