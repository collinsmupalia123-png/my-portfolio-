// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Feedback Form Submission
    const feedbackForm = document.getElementById('feedbackForm');
    const formMessage = document.getElementById('formMessage');
    
    if (feedbackForm) {
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
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = feedbackForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Prepare form data
            const formData = {
                name: name,
                email: email,
                subject: subject || 'No Subject',
                message: message,
                rating: rating,
                date: new Date().toISOString()
            };
            
            // In a real implementation, you would send this data to a server
            // For GitHub Pages, we can use Formspree or similar service
            // For now, we'll simulate a successful submission and save to localStorage
            setTimeout(function() {
                // Save feedback to localStorage (for demo purposes)
                saveFeedbackToLocalStorage(formData);
                
                // Reset form
                feedbackForm.reset();
                
                // Reset rating stars
                const ratingInputs = document.querySelectorAll('input[name="rating"]');
                ratingInputs.forEach(input => {
                    input.checked = false;
                });
                
                // Show success message
                showFormMessage('Thank you for your feedback, ' + name + '! I will get back to you soon at ' + email + '.', 'success');
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Scroll to the message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
            }, 1500);
        });
    }
    
    function saveFeedbackToLocalStorage(feedback) {
        try {
            // Get existing feedback or create new array
            let allFeedback = JSON.parse(localStorage.getItem('portfolioFeedback')) || [];
            
            // Add new feedback
            allFeedback.push(feedback);
            
            // Save back to localStorage (limit to 50 entries)
            if (allFeedback.length > 50) {
                allFeedback = allFeedback.slice(-50);
            }
            
            localStorage.setItem('portfolioFeedback', JSON.stringify(allFeedback));
            
            // Log to console for debugging
            console.log('Feedback saved:', feedback);
            console.log('Total feedback entries:', allFeedback.length);
        } catch (error) {
            console.error('Error saving feedback to localStorage:', error);
        }
    }
    
    function showFormMessage(message, type) {
        if (!formMessage) return;
        
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        // Hide message after 8 seconds
        setTimeout(function() {
            formMessage.style.display = 'none';
        }, 8000);
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
    
    // Formspree integration setup instructions
    console.log('=== Formspree Integration Instructions ===');
    console.log('To enable actual email sending:');
    console.log('1. Go to https://formspree.io and create a free account');
    console.log('2. Create a new form and get your form ID');
    console.log('3. Replace the form submission handler with Formspree code');
    console.log('4. Example Formspree code:');
    console.log(`
    // Replace the setTimeout in the form submit handler with:
    const formData = new FormData(feedbackForm);
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showFormMessage('Thank you for your feedback! I will get back to you soon.', 'success');
            feedbackForm.reset();
            // Reset rating stars
            const ratingInputs = document.querySelectorAll('input[name="rating"]');
            ratingInputs.forEach(input => input.checked = false);
        } else {
            showFormMessage('There was an error sending your message. Please try again.', 'error');
        }
    })
    .catch(error => {
        showFormMessage('There was an error sending your message. Please try again.', 'error');
    })
    .finally(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
    `);
    console.log('==========================================');
    
    // Image fallback handler
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Set a default placeholder if image fails to load
            if (this.classList.contains('profile-picture') || 
                this.classList.contains('contact-profile-img') || 
                this.getAttribute('src').includes('IMG-20240812-WA0000')) {
                this.src = 'https://via.placeholder.com/300x300/3498db/ffffff?text=CM';
            }
        });
    });
    
    // Add active class to current section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Add active class to nav links on click
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
