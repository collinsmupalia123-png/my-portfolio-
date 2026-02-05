// ===========================================
// JavaScript for Collins Mupalia Portfolio
// ===========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Profile image fallback
    const profileImage = document.getElementById('profileImage');
    profileImage.addEventListener('error', function() {
        this.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80';
        console.log('Profile image not found, using fallback image');
    });
    
    // CV Download Button Functionality
    const cvDownloadBtn = document.getElementById('cvDownloadBtn');
    if (cvDownloadBtn) {
        cvDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a sample CV content with personal details
            const cvContent = `
                COLLINS LUKHALE MUPALIA - PORTFOLIO CV
                
                ============================================
                PERSONAL INFORMATION
                ============================================
                Full Name: Collins Lukhale Mupalia
                Email: collinsmupalia123@gmail.com
                Phone: +254 703 715 677
                Location: Nairobi, Kenya
                Website: https://collinsmupalia123-png.github.io/my-portfolio-/
                
                ============================================
                PROFESSIONAL SUMMARY
                ============================================
                Experienced Web Developer with expertise in creating responsive, 
                user-friendly websites and applications. Skilled in HTML5, CSS3, 
                JavaScript, Bootstrap, and React.js. Passionate about creating 
                clean, efficient code and exceptional user experiences.
                
                ============================================
                TECHNICAL SKILLS
                ============================================
                • Frontend: HTML5, CSS3, JavaScript, React.js, Bootstrap, Vue.js
                • Backend: Node.js, Express, MongoDB, REST APIs
                • Tools: Git, VS Code, Figma, Adobe Creative Suite
                • Methodologies: Responsive Design, Mobile-First, Agile/Scrum
                
                ============================================
                WORK EXPERIENCE
                ============================================
                Frontend Developer | Tech Solutions Kenya | 2021 - Present
                - Developed responsive web applications using React and Bootstrap
                - Improved website performance by 40% through optimization
                - Collaborated with UI/UX designers to implement designs
                
                Web Developer | Digital Solutions Africa | 2020 - 2021
                - Built and maintained client websites using modern technologies
                - Implemented responsive designs for all devices
                - Provided technical support and website maintenance
                
                ============================================
                EDUCATION
                ============================================
                Bachelor of Computer Science
                University of Nairobi | 2016 - 2020
                
                ============================================
                PROJECTS
                ============================================
                • E-commerce Website: Built with React and Node.js
                • Finance Dashboard: Interactive data visualization
                • Travel Blog: Responsive blog with image galleries
                • Weather App: API integration with location detection
                • Blog Platform: CMS for bloggers
                • Social Media Dashboard: Analytics with real-time data
                
                ============================================
                CERTIFICATIONS
                ============================================
                • Frontend Web Development Certification
                • React.js Specialist Certification
                • Responsive Web Design Certification
                
                ============================================
                REFERENCES
                ============================================
                Available upon request.
            `;
            
            // Create a Blob with the CV content
            const blob = new Blob([cvContent], { type: 'text/plain' });
            
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Collins_Lukhale_Mupalia_CV.txt';
            
            // Append to the body, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show success notification
            showNotification('CV downloaded successfully!', 'success');
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
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call (in real app, this would connect to a backend)
            setTimeout(() => {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('Message sent successfully! I will get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Log the form data (in a real app, this would be sent to a server)
                console.log('Contact Form Submission:', { 
                    name, 
                    email, 
                    subject, 
                    message,
                    to: 'collinsmupalia123@gmail.com'
                });
                
                // In a real application, you would send this data to your server
                // fetch('your-backend-endpoint', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ name, email, subject, message })
                // })
            }, 1500);
        });
    }
    
    // Animate skill bars when they come into view
    const skillItems = document.querySelectorAll('.skill-item');
    
    const animateSkillBars = () => {
        skillItems.forEach(item => {
            const skillPercent = item.getAttribute('data-skill');
            const progressBar = item.querySelector('.progress-bar');
            const percentElement = item.querySelector('.skill-percent');
            
            // Check if element is in viewport
            const rect = item.getBoundingClientRect();
            const isInView = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
            
            if (isInView && !item.classList.contains('animated')) {
                item.classList.add('animated');
                
                // Animate the progress bar
                let current = 0;
                const target = parseInt(skillPercent);
                const increment = target / 50; // 50 steps
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    progressBar.style.width = current + '%';
                    percentElement.textContent = Math.round(current) + '%';
                }, 20);
            }
        });
    };
    
    // Run on load and scroll
    window.addEventListener('load', animateSkillBars);
    window.addEventListener('scroll', animateSkillBars);
    
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        // Back to top button visibility
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
        
        // Navbar background on scroll
        const navbar = document.querySelector('.navbar');
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link based on scroll position
        updateActiveNavLink();
    });
    
    // Back to top button functionality
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let currentSectionId = '';
        
        // Find the current section in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSectionId = section.id;
            }
        });
        
        // Update active class on nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Project card hover effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // View project buttons
    document.querySelectorAll('.view-project').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Project details would open here in a complete implementation', 'info');
        });
    });
    
    // Social media icons click tracking
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const platform = this.className.includes('whatsapp') ? 'WhatsApp' :
                           this.className.includes('github') ? 'GitHub' :
                           this.className.includes('linkedin') ? 'LinkedIn' :
                           this.className.includes('twitter') ? 'Twitter' :
                           this.className.includes('facebook') ? 'Facebook' :
                           this.className.includes('instagram') ? 'Instagram' : 'Social Media';
            
            console.log(`${platform} icon clicked - Opening ${this.href}`);
        });
    });
    
    // WhatsApp specific functionality
    document.querySelectorAll('.whatsapp').forEach(whatsappBtn => {
        whatsappBtn.addEventListener('click', function() {
            console.log('WhatsApp contact initiated for Collins Mupalia');
            // You can add analytics tracking here
        });
    });
    
    // Notification function
    function showNotification(message, type = 'success') {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.custom-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `custom-notification alert alert-${type === 'error' ? 'danger' : type === 'info' ? 'info' : 'success'}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '9999';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        notification.style.maxWidth = '300px';
        notification.style.animation = 'slideIn 0.3s ease-out';
        
        // Add to document
        document.body.appendChild(notification);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
        
        // Add CSS animations if not already present
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Add floating animation to profile badges
    const profileBadges = document.querySelectorAll('.profile-badge');
    profileBadges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Initialize with active nav link
    updateActiveNavLink();
});
