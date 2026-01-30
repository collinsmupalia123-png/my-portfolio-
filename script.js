// Collins Mupalia Portfolio - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        delay: 100
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.style.boxShadow = 'none';
        }
        
        // Back to top button visibility
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    // Animated counter for stats
    function animateCounter(element, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Initialize counters when in viewport
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const expYears = document.getElementById('exp-years');
                const projectsCompleted = document.getElementById('projects-completed');
                const clientSatisfaction = document.getElementById('client-satisfaction');
                
                if (expYears) animateCounter(expYears, 0, 5, 2000, '+');
                if (projectsCompleted) animateCounter(projectsCompleted, 0, 40, 2000, '+');
                if (clientSatisfaction) animateCounter(clientSatisfaction, 0, 100, 2000, '%');
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) observer.observe(heroSection);

    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                projectType: document.getElementById('projectType').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
            submitBtn.disabled = true;
            
            // In production, replace with actual API call
            // For demo, simulate API call with timeout
            setTimeout(() => {
                // Log form data (in production, send to server)
                console.log('Form submitted:', formData);
                
                // Show success message
                showAlert('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Track form submission (analytics)
                trackEvent('contact_form_submission', formData.projectType);
            }, 1500);
        });
    }

    // CV download tracking
    const cvDownloadBtn = document.querySelector('a[href="collins_mupalia_CV.pdf"]');
    if (cvDownloadBtn) {
        cvDownloadBtn.addEventListener('click', function() {
            // Add download animation
            this.classList.add('download-cv');
            
            // Track CV download
            trackEvent('cv_download', 'portfolio_cv');
            
            // Remove animation after 1 second
            setTimeout(() => {
                this.classList.remove('download-cv');
            }, 1000);
            
            // Check if file exists (simulated)
            setTimeout(() => {
                // In production, you might want to check file existence
                // For now, we'll assume it downloads successfully
                console.log('CV download initiated:', this.href);
            }, 500);
        });
    }

    // Alert notification system
    function showAlert(message, type) {
        // Remove existing alerts
        document.querySelectorAll('.alert-dismissible').forEach(alert => {
            alert.remove();
        });
        
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alertDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            max-width: 90%;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            border: none;
            border-radius: 10px;
            animation: slideInRight 0.3s ease;
        `;
        
        const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
        const title = type === 'success' ? 'Success!' : type === 'error' ? 'Error!' : 'Info!';
        
        alertDiv.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi bi-${icon}-fill me-3 fs-4 text-${type}"></i>
                <div class="flex-grow-1">
                    <strong class="me-2">${title}</strong>
                    ${message}
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (alertDiv.parentNode) {
                        alertDiv.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .alert-success {
            background-color: #d1e7dd;
            color: #0f5132;
            border-left: 4px solid #0f5132;
        }
        
        .alert-danger {
            background-color: #f8d7da;
            color: #842029;
            border-left: 4px solid #842029;
        }
        
        .alert-info {
            background-color: #cff4fc;
            color: #055160;
            border-left: 4px solid #055160;
        }
    `;
    document.head.appendChild(style);

    // Back to top button functionality
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, targetId);
            }
        });
    });

    // Portfolio card hover effects
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Tech icon hover effects
    const techIcons = document.querySelectorAll('.tech-icon-item');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.progress-bar');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
                
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Image error handling
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            // Keep the placeholder if it's already a placeholder
            if (!this.src.includes('unsplash')) {
                this.style.backgroundColor = '#f8f9fa';
                this.style.padding = '20px';
                this.alt = 'Image not available - ' + this.alt;
            }
        });
    });

    // Analytics tracking function
    function trackEvent(eventName, eventData) {
        // In production, integrate with Google Analytics, Facebook Pixel, etc.
        console.log(`Tracking event: ${eventName}`, eventData);
        
        // Example: Google Analytics event tracking (uncomment and add your GA ID)
        /*
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                'event_category': 'portfolio_interaction',
                'event_label': eventData
            });
        }
        */
    }

    // Page load tracking
    trackEvent('page_view', window.location.pathname);

    // Add active class to current nav link
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink(); // Initial call

    // Add loading animation to page
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add subtle animation to profile image
        const profileImg = document.querySelector('.profile-img');
        if (profileImg) {
            setTimeout(() => {
                profileImg.style.opacity = '1';
                profileImg.style.transform = 'scale(1)';
            }, 500);
        }
        
        // Track page load complete// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });
    
    // Feedback Form Submission
    const feedbackForm = document.getElementById('feedbackForm');
    const formMessage = document.getElementById('formMessage');
    
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const rating = document.querySelector('input[name="rating"]:checked') ? document.querySelector('input[name="rating"]:checked').value : 'Not specified';
        
        // Simple validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // In a real implementation, you would send this data to a server
        // For this example, we'll simulate a successful submission
        
        // Show loading state
        const submitBtn = feedbackForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(function() {
            // Reset form
            feedbackForm.reset();
            
            // Reset rating stars
            const ratingInputs = document.querySelectorAll('input[name="rating"]');
            ratingInputs.forEach(input => {
                input.checked = false;
            });
            
            // Show success message
            showFormMessage('Thank you for your feedback! I will get back to you soon.', 'success');
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // In a real implementation, you would use Formspree or similar service
            // Example with Formspree:
            // const formData = new FormData(feedbackForm);
            // fetch('https://formspree.io/f/YOUR_FORM_ID', {
            //     method: 'POST',
            //     body: formData,
            //     headers: {
            //         'Accept': 'application/json'
            //     }
            // })
            // .then(response => {
            //     if (response.ok) {
            //         showFormMessage('Thank you for your feedback! I will get back to you soon.', 'success');
            //         feedbackForm.reset();
            //     } else {
            //         showFormMessage('There was an error sending your message. Please try again.', 'error');
            //     }
            // })
            // .catch(error => {
            //     showFormMessage('There was an error sending your message. Please try again.', 'error');
            // });
            
        }, 1500);
    });
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        
        // Hide message after 5 seconds
        setTimeout(function() {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or if it's the feedback form submit button
            if (href === '#' || this.classList.contains('submit-btn')) return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Formspree integration setup
    // To use Formspree, follow these steps:
    // 1. Go to https://formspree.io and create a free account
    // 2. Create a new form and get your form ID
    // 3. Replace 'YOUR_FORM_ID' in the form action with your actual Formspree form ID
    // 4. Uncomment the fetch code in the form submission handler above
    
    // Current form uses a simulated submission for demo purposes
    // To make it functional, you need to set up Formspree as described above
});
        trackEvent('page_loaded', 'portfolio_loaded');
    });

    // Prevent form resubmission on page refresh
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
});

