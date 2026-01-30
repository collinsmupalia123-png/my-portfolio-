// Portfolio JavaScript - Complete Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
        
        // Show/hide back to top button
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    // Smooth scrolling for navigation links
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
                    navbarCollapse.classList.remove('show');
                }
                
                // Smooth scroll
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link on scroll
    function updateActiveNavLink() {
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
    
    // Back to Top button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // CV Download Functionality
    function setupCVDownload() {
        const cvButtons = document.querySelectorAll('a[download*="CV"]');
        
        cvButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Optional: Track CV download
                trackDownload('CV');
                
                // Optional: Show confirmation
                setTimeout(() => {
                    showAlert('CV downloaded successfully!', 'success');
                }, 1000);
            });
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation
            if (!name || !email || !message) {
                showAlert('Please fill in all required fields.', 'danger');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address.', 'danger');
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
            submitButton.disabled = true;
            
            // Simulate API call (Replace with Formspree or your backend)
            setTimeout(() => {
                // Prepare form data
                const formData = {
                    name: name,
                    email: email,
                    subject: subject || 'No Subject',
                    message: message,
                    timestamp: new Date().toISOString(),
                    source: 'Portfolio Contact Form'
                };
                
                // Save to localStorage for demo
                saveMessage(formData);
                
                // Show success message
                showAlert(`Thank you, ${name}! Your message has been sent. I'll get back to you within 24 hours.`, 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Track form submission
                trackFormSubmission();
                
            }, 2000);
        });
    }
    
    // Show Alert Function
    function showAlert(message, type) {
        const formMessage = document.getElementById('formMessage');
        if (!formMessage) return;
        
        const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        
        formMessage.innerHTML = `
            <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            const alert = formMessage.querySelector('.alert');
            if (alert) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 5000);
    }
    
    // Save message to localStorage
    function saveMessage(data) {
        try {
            let messages = JSON.parse(localStorage.getItem('portfolioMessages')) || [];
            messages.push(data);
            
            // Keep only last 50 messages
            if (messages.length > 50) {
                messages = messages.slice(-50);
            }
            
            localStorage.setItem('portfolioMessages', JSON.stringify(messages));
            console.log('Message saved:', data);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    }
    
    // Track downloads
    function trackDownload(type) {
        try {
            let downloads = JSON.parse(localStorage.getItem('portfolioDownloads')) || [];
            downloads.push({
                type: type,
                date: new Date().toISOString(),
                userAgent: navigator.userAgent
            });
            
            if (downloads.length > 100) {
                downloads = downloads.slice(-100);
            }
            
            localStorage.setItem('portfolioDownloads', JSON.stringify(downloads));
        } catch (error) {
            console.error('Error tracking download:', error);
        }
    }
    
    // Track form submissions
    function trackFormSubmission() {
        try {
            let submissions = JSON.parse(localStorage.getItem('portfolioFormSubmissions')) || [];
            submissions.push({
                date: new Date().toISOString(),
                page: window.location.href
            });
            
            if (submissions.length > 100) {
                submissions = submissions.slice(-100);
            }
            
            localStorage.setItem('portfolioFormSubmissions', JSON.stringify(submissions));
        } catch (error) {
            console.error('Error tracking form submission:', error);
        }
    }
    
    // Social Media Links - Open in new tab
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // Initialize all Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize all Bootstrap popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Image lazy loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        
        // Add error handling
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            this.style.display = 'none';
        });
    });
    
    // Setup CV download
    setupCVDownload();
    
    // Add animation on scroll
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[class*="animate__"]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animationClass = Array.from(entry.target.classList)
                        .find(className => className.startsWith('animate__'));
                    
                    if (animationClass) {
                        entry.target.classList.add('animate__animated', animationClass);
                    }
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Initialize animations
    initScrollAnimations();
    
    // Project modal image preview
    const projectModals = document.querySelectorAll('[data-bs-target^="#projectModal"]');
    projectModals.forEach(modalTrigger => {
        modalTrigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-bs-target');
            const modal = document.querySelector(modalId);
            
            if (modal) {
                modal.addEventListener('show.bs.modal', function() {
                    console.log('Opening modal:', modalId);
                });
            }
        });
    });
    
    // Console welcome message
    console.log('%c👋 Welcome to Collins Mupalia Portfolio!', 'font-size: 18px; color: #4361ee; font-weight: bold;');
    console.log('%cLet\'s build something amazing together!', 'font-size: 14px; color: #666;');
    
    // Formspree Integration Instructions (for production)
    console.log(`
    ============================================
    FORMSPREE INTEGRATION INSTRUCTIONS:
    
    1. Go to https://formspree.io and sign up
    2. Create a new form
    3. Get your form ID
    4. Replace the form submission handler with:
    
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showAlert('Thank you! Message sent successfully.', 'success');
            form.reset();
        } else {
            showAlert('Oops! Something went wrong.', 'danger');
        }
    });
    ============================================
    `);
});
