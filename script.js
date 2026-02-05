// ===========================================
// JavaScript for Collins Mupalia Portfolio
// ===========================================

// Initialize AOS Animation Library
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // CV Download Button Functionality
    const downloadCVButton = document.getElementById('downloadCV');
    if (downloadCVButton) {
        downloadCVButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a sample CV content
            const cvContent = `
                COLLINS MUPALIA - PORTFOLIO CV
                
                ============================================
                CONTACT INFORMATION
                ============================================
                Name: Collins Mupalia
                Email: collinsmupalia123@gmail.com 
                Phone: +(254) 703715677
                Location: Nairobi, Kenya
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
                • Frontend: HTML5, CSS3, JavaScript, React.js, Bootstrap
                • Tools: Git, VS Code, Figma, Adobe Creative Suite
                • Methodologies: Responsive Design, Mobile-First, Agile/Scrum
                • Cybersecurity 
                • Database Design
                
                ============================================
                WORK EXPERIENCE
                ============================================
                Frontend Developer | Tech Solutions Inc. | 2021 - Present
                - Developed responsive web applications using React and Bootstrap
                - Improved website performance by 40% through optimization techniques
                - Collaborated with UI/UX designers to implement pixel-perfect designs
                
                Web Developer | Digital Creations | 2020 - 2021
                - Built and maintained client websites using HTML, CSS, JavaScript
                - Implemented responsive designs for mobile and desktop devices
                - Provided technical support and website maintenance
                
                ============================================
                EDUCATION
                ============================================
                Diploma in Computer Science 
                Baringo National Polytechnic | 2017 - 2020
                Bachelor of Computer Science
                University of Nairobi | 2021 - 2025
                
                ============================================
                PROJECTS
                ============================================
                • E-commerce Website: Built with React and Node.js
                • Finance Dashboard: Interactive data visualization with Chart.js
                • Travel Blog: Responsive blog with image galleries and maps
                
                ============================================
                CERTIFICATIONS
                ============================================
                • Frontend Web Development Certification - Code Academy
                • React.js Specialist - Udemy
                • Responsive Web Design - FreeCodeCamp
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
            
            // Show success message
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
            
            // In a real application, you would send the data to a server here
            // For demo purposes, we'll just show a success message
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Message sent successfully! I will get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Log the form data (in a real app, this would be sent to a server)
                console.log('Contact Form Submission:', { name, email, subject, message });
            }, 1000);
        });
    }
    
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
                
                // Update URL hash without scrolling
                history.pushState(null, null, href);
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
    
    // Notification function
    function showNotification(message, type = 'info') {
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
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
        
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
    
    // Social media icons click tracking (optional)
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const platform = this.className.includes('whatsapp') ? 'WhatsApp' :
                           this.className.includes('github') ? 'GitHub' :
                           this.className.includes('linkedin') ? 'LinkedIn' :
                           this.className.includes('twitter') ? 'Twitter' :
                           this.className.includes('facebook') ? 'Facebook' :
                           this.className.includes('instagram') ? 'Instagram' : 'Social Media';
            
            console.log(`${platform} icon clicked`);
            // In a real application, you could send analytics data here
        });
    });
    
    // Initialize with active nav link
    updateActiveNavLink();
});
