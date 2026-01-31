// DOM Elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
const skillBars = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contactForm');

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;
        
        // Update active nav link
        navLinks.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        // Smooth scroll to section
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    // Add/remove scrolled class on navbar
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Show/Hide Back to Top button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Back to Top Functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate Skill Bars on Scroll
const animateSkillBars = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = `${width}%`;
                }, 300);
                
                observer.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
};

// Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData);
    
    // In a real application, you would send this data to a server
    // For now, we'll just show a success message
    showNotification('Message sent successfully! I will get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
});

// Notification System
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bi ${type === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="bi bi-x"></i>
        </button>
    `;
    
    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(76, 201, 240, 0.9)' : 'rgba(255, 101, 132, 0.9)'};
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            max-width: 400px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            color: white;
            font-weight: 500;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
        
        .notification-close {
            background: transparent;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1.2rem;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeBtn.click();
        }
    }, 5000);
}

// Typing Effect for Hero Section (Optional)
function initTypingEffect() {
    const roles = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
    const roleElement = document.querySelector('.hero-role');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    
    // Start typing effect after 1 second
    setTimeout(type, 1000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functions
    animateSkillBars();
    initTypingEffect();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Add hover effect to cards
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Add CSS for smooth transitions
const transitionStyles = document.createElement('style');
transitionStyles.textContent = `
    * {
        transition: background-color 0.3s ease, border-color 0.3s ease;
    }
    
    .fade-in {
        animation: fadeIn 0.8s ease;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    section {
        animation: fadeIn 0.8s ease;
    }
`;
document.head.appendChild(transitionStyles);
