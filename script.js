// Custom JavaScript for Collins Mupalia Portfolio

document.addEventListener('DOMContentLoaded', function() {
    console.log('Collins Mupalia Portfolio loaded');
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    // CV Button functionality
    const cvButtons = document.querySelectorAll('a[download]');
    cvButtons.forEach(button => {
        if (button.href.includes('CV_Collins_Mupalia.pdf')) {
            button.addEventListener('click', function(e) {
                // Check if file exists
                fetch('CV_Collins_Mupalia.pdf')
                    .then(response => {
                        if (!response.ok) {
                            // Create a simple PDF if file doesn't exist
                            e.preventDefault();
                            createSampleCV();
                        }
                    })
                    .catch(() => {
                        // Create a simple PDF if file doesn't exist
                        e.preventDefault();
                        createSampleCV();
                    });
            });
        }
    });
    
    // Function to create sample CV
    function createSampleCV() {
        // Create a simple text file as CV
        const cvContent = `
            COLLINS MUPALIA
            ====================
            
            Professional Web Developer
            Email: collinsmupalia123@gmail.com
            Phone: 0703715677
            Location: Port Moresby, Papua New Guinea
            
            SUMMARY
            ----------
            Passionate full-stack web developer with 3+ years of experience creating dynamic, 
            responsive websites and web applications. Specialized in turning ideas into 
            beautiful, functional digital experiences.
            
            SKILLS
            ----------
            • HTML/CSS: 95%
            • JavaScript: 85%
            • React: 80%
            • UI/UX Design: 90%
            • Bootstrap: 95%
            • Node.js: 75%
            
            EXPERIENCE
            ----------
            • 15+ Projects Completed
            • 8+ Happy Clients
            • 100% Client Satisfaction
            
            CONTACT
            ----------
            Portfolio: https://collinsmupalia123-png.github.io/my-portfolio-/
            Email: collinsmupalia123@gmail.com
            Phone: 0703715677
            
            © ${new Date().getFullYear()} Collins Mupalia. All rights reserved.
        `;
        
        const blob = new Blob([cvContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'CV_Collins_Mupalia.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        alert('CV downloaded successfully! For a complete PDF version, please contact me directly.');
    }
    
    // Animate achievement counters
    function animateCounters() {
        const counters = document.querySelectorAll('.achievement-number');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const increment = target / speed;
            let count = 0;
            
            const updateCounter = () => {
                if (count < target) {
                    count += increment;
                    counter.textContent = Math.floor(count);
                    setTimeout(updateCounter, 10);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Start counter when in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    // Initialize counters
    animateCounters();
    
    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.progress-animated');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width') + '%';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 300);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(bar);
        });
    }
    
    // Initialize skill bars
    animateSkillBars();
    
    // Contact form submission
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
            if (!name || !email || !subject || !message) {
                showAlert('Please fill in all required fields.', 'danger');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address.', 'danger');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // In a real application, you would send the data to a server here
                console.log('Form submitted:', { name, email, subject, message });
                
                // Show success message
                showAlert('Thank you for your message! I will get back to you within 24 hours.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Send email notification (in a real app, this would be server-side)
                sendEmailNotification(name, email, subject, message);
            }, 1500);
        });
    }
    
    // Show alert function
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Insert after the form
        const form = document.getElementById('contactForm');
        if (form) {
            form.parentNode.insertBefore(alertDiv, form.nextSibling);
            
            // Remove alert after 5 seconds
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.remove();
                }
            }, 5000);
        }
    }
    
    // Simulate email notification
    function sendEmailNotification(name, email, subject, message) {
        // In a real application, this would be a server-side API call
        console.log('Email notification would be sent:', {
            to: 'collinsmupalia123@gmail.com',
            from: email,
            subject: `New Contact Form: ${subject}`,
            body: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetId = href;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse.show');
                if (navbarCollapse) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current section in navigation
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                currentSectionId = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // Social media links validation
    const socialLinks = document.querySelectorAll('.social-icon, .social-icon-footer');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href === '#' || !this.href.includes('http')) {
                e.preventDefault();
                alert('This social media link is not configured yet. Please check back soon!');
            }
        });
    });
    
    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Floating elements animation
    function animateFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.5}s`;
        });
    }
    
    animateFloatingElements();
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remove loading spinner if exists
        const loadingSpinner = document.querySelector('.loading-spinner');
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
    });
    
    // Initialize with a loading state
    document.body.classList.add('loading');
    
    // Add click-to-call functionality
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!confirm('Would you like to call Collins Mupalia?')) {
                e.preventDefault();
            }
        });
    });
    
    // Add click-to-email functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!confirm('Would you like to email Collins Mupalia?')) {
                e.preventDefault();
            }
        });
    });
});

// Add beforeunload event to show loading state
window.addEventListener('beforeunload', function() {
    document.body.classList.add('loading');
});
