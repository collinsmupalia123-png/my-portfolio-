// Portfolio Enhancement JavaScript
// This file adds interactive features without modifying existing HTML structure

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio enhancement script loaded');
    
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const targetId = href;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add skill bar animation on scroll
    const skillBars = document.querySelectorAll('.skill-bar');
    if (skillBars.length > 0) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Get the width from data attribute or style
                    const bar = entry.target;
                    const targetWidth = bar.getAttribute('data-width') || '100%';
                    bar.style.width = targetWidth;
                    bar.classList.add('animated');
                }
            });
        }, observerOptions);

        skillBars.forEach(bar => skillObserver.observe(bar));
    }

    // Form validation enhancement
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredInputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                    
                    // Add error message if not exists
                    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message text-danger mt-1';
                        errorMsg.style.fontSize = '0.875rem';
                        errorMsg.textContent = 'This field is required';
                        input.parentNode.insertBefore(errorMsg, input.nextSibling);
                    }
                } else {
                    input.style.borderColor = '#28a745';
                    
                    // Remove error message if exists
                    const errorMsg = input.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Show alert only on first invalid form
                if (!this.classList.contains('alert-shown')) {
                    alert('Please fill in all required fields marked with *.');
                    this.classList.add('alert-shown');
                }
            }
        });
        
        // Clear validation on input
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#dee2e6';
                
                // Remove error message if exists
                const errorMsg = this.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
            });
        });
    });

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.classList.add('card-hover');
        
        // Add click effect for mobile
        card.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                this.classList.toggle('active');
            }
        });
    });

    // Initialize achievement counters
    function initAchievementCounters() {
        const counters = document.querySelectorAll('.stat-counter');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            if (!isNaN(target)) {
                let current = 0;
                const increment = target / 50; // Adjust speed
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        if (current > target) current = target;
                        counter.textContent = Math.floor(current) + '+';
                        setTimeout(updateCounter, 30);
                    }
                };
                
                // Start counter when in view
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            updateCounter();
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(counter);
            }
        });
    }
    
    // Initialize counters after a short delay
    setTimeout(initAchievementCounters, 1000);

    // Mobile menu toggle (for potential hamburger menu)
    function initMobileMenu() {
        const nav = document.querySelector('nav');
        if (!nav) return;
        
        // Check if we need a mobile menu
        if (window.innerWidth <= 768) {
            const navList = nav.querySelector('ul');
            if (navList && !nav.querySelector('.menu-toggle')) {
                // Create mobile menu toggle button
                const menuToggle = document.createElement('button');
                menuToggle.className = 'menu-toggle d-md-none';
                menuToggle.innerHTML = '<i class="bi bi-list"></i>';
                menuToggle.style.cssText = `
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                    color: white;
                    padding: 10px 15px;
                    border-radius: 5px;
                    font-size: 1.5rem;
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    z-index: 1001;
                `;
                
                nav.style.position = 'relative';
                nav.appendChild(menuToggle);
                
                // Initially hide nav list on mobile
                navList.style.display = 'none';
                navList.style.position = 'absolute';
                navList.style.top = '100%';
                navList.style.left = '0';
                navList.style.right = '0';
                navList.style.backgroundColor = 'white';
                navList.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                navList.style.zIndex = '1000';
                navList.style.padding = '1rem';
                
                // Toggle menu on click
                menuToggle.addEventListener('click', function() {
                    if (navList.style.display === 'none' || navList.style.display === '') {
                        navList.style.display = 'flex';
                        menuToggle.innerHTML = '<i class="bi bi-x"></i>';
                    } else {
                        navList.style.display = 'none';
                        menuToggle.innerHTML = '<i class="bi bi-list"></i>';
                    }
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', function(e) {
                    if (!nav.contains(e.target) && navList.style.display === 'flex') {
                        navList.style.display = 'none';
                        menuToggle.innerHTML = '<i class="bi bi-list"></i>';
                    }
                });
            }
        } else {
            // Reset for desktop
            const navList = nav.querySelector('ul');
            const menuToggle = nav.querySelector('.menu-toggle');
            
            if (navList) {
                navList.style.display = '';
                navList.style.position = '';
                navList.style.top = '';
                navList.style.left = '';
                navList.style.right = '';
                navList.style.backgroundColor = '';
                navList.style.boxShadow = '';
                navList.style.zIndex = '';
                navList.style.padding = '';
            }
            
            if (menuToggle) {
                menuToggle.remove();
            }
        }
    }
    
    // Initialize mobile menu
    initMobileMenu();
    window.addEventListener('resize', initMobileMenu);

    // Add year to footer copyright
    const copyrightElements = document.querySelectorAll('footer p');
    copyrightElements.forEach(element => {
        if (element.textContent.includes('Copyright') || element.textContent.includes('©')) {
            const currentYear = new Date().getFullYear();
            if (!element.textContent.includes(currentYear)) {
                element.innerHTML = element.innerHTML.replace(/©\s*\d{4}/, `© ${currentYear}`);
            }
        }
    });

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            // Fallback if image fails to load
            img.addEventListener('error', function() {
                this.style.opacity = '1';
            });
        }
    });

    // Back to top button
    const backToTopButton = document.createElement('a');
    backToTopButton.href = '#';
    backToTopButton.className = 'floating-button back-to-top d-none';
    backToTopButton.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTopButton.style.bottom = '90px';
    backToTopButton.title = 'Back to top';
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('d-none');
        } else {
            backToTopButton.classList.add('d-none');
        }
    });
    
    // Smooth scroll to top
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initialize tooltips (if Bootstrap JS is loaded)
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Add active class to current section in navigation
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
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
                link.style.fontWeight = 'bold';
                link.style.color = '#667eea';
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initialize active nav link
    setTimeout(updateActiveNavLink, 100);
});
