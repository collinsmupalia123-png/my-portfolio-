// Custom JavaScript for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    
    // CV Download Button Functionality
    const cvDownloadBtn = document.getElementById('cvDownloadBtn');
    
    cvDownloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create a sample CV content (in real scenario, this would be your actual CV)
        const cvContent = `
            COLLINS MUPALIA - PORTFOLIO CV
            
            ============================================
            CONTACT INFORMATION
            ============================================
            Name: Collins Mupalia
            Email: collinsmupalia123@gmail.com 
            Phone: +254-703715677
            Location:Nairobi.Kenya
            Website: https://collinsmupalia.com
            
            ============================================
            PROFESSIONAL SUMMARY
            ============================================
            Experienced Frontend Developer with over 3 years of expertise 
            in building responsive, user-friendly web applications. 
            Skilled in HTML5, CSS3, JavaScript, React.js, and Bootstrap.
            Passionate about creating clean, efficient code and 
            exceptional user experiences.
            
            ============================================
            TECHNICAL SKILLS
            ============================================
            • Frontend: HTML5, CSS3, JavaScript, React.js, Bootstrap, Vue.js
            • Backend: Node.js, Express, MongoDB, REST APIs, MySQL
            • Tools: Git, VS Code, Figma, Adobe Creative Suite
            • Methodologies: Responsive Design, Mobile-First, Agile/Scrum
            • CyberSecurity
            • IT technicians 
            
            ============================================
            WORK EXPERIENCE
            ============================================
            Frontend Developer | CollinsTech Solutions Inc. | 2021 - Present
            - Developed responsive web applications using React and Bootstrap
            - Improved website performance by 40% through optimization techniques
            - Collaborated with UI/UX designers to implement pixel-perfect designs
            - Implemented RESTful APIs for seamless frontend-backend communication
            
            Web Developer | Digital Creations | 2020 - 2021
            - Built and maintained client websites using HTML, CSS, JavaScript
            - Implemented responsive designs for mobile and desktop devices
            - Provided technical support and website maintenance
            - Improved client website loading speed by 60%
            
            ============================================
            EDUCATION
            ============================================
            Bachelor of Computer Science
            University of Eldoret 
            Diploma in Cyber Security
            
            ============================================
            PROJECTS
            ============================================
            • E-commerce Website: Built with React and Node.js
            • Task Management App: Productivity application with drag-and-drop
            • Portfolio Website: Modern template using Bootstrap
            • Blog Platform: CMS for bloggers with Laravel
            • Weather App: Responsive app with API integration
            • Social Media Dashboard: Analytics with real-time data
            
            ============================================
            CERTIFICATIONS
            ============================================
            • Frontend Web Development Certification - Code Academy
            • React.js Specialist - Udemy
            • Responsive Web Design - FreeCodeCamp
            • JavaScript Algorithms and Data Structures - FreeCodeCamp
        `;
        
        // Create a Blob with the CV content
        const blob = new Blob([cvContent], { type: 'text/plain' });
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Collins_Mupalia_CV.txt';
        
        // Append to the body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success notification
        showNotification('CV downloaded successfully!', 'success');
    });
    
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
            
            // Simulate API call (replace with actual form submission)
            setTimeout(() => {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('Message sent successfully! I will get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Log the form data (in a real app, this would be sent to a server)
                console.log('Contact Form Submission:', { name, email, subject, message });
            }, 1500);
        });
    }
    
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
    
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '';
            navbar.style.backdropFilter = '';
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
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
            // In a real application, you could send analytics data here
        });
    });
    
    // WhatsApp specific functionality
    document.querySelectorAll('.whatsapp').forEach(whatsappBtn => {
        whatsappBtn.addEventListener('click', function() {
            // You can add additional WhatsApp tracking or functionality here
            console.log('WhatsApp contact initiated');
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
        notification.className = `custom-notification alert alert-${type === 'error' ? 'danger' : 'success'}`;
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
    
    // Project card hover effect enhancement
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // Initialize with active nav link
    updateActiveNavLink();
    
    // Add current year to footer (optional)
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('footer p');
    if (yearElement && yearElement.textContent.includes('2023')) {
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
    }
});
