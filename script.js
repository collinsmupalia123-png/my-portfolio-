// Initialize AOS Animation
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
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
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validation
        if (!name || !email || !message) {
            showMessage('Please fill in all required fields.', 'danger');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'danger');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
        submitButton.disabled = true;
        
        // Simulate API call (replace with Formspree or your backend)
        setTimeout(() => {
            // For demo purposes, we'll simulate a successful submission
            // In production, use Formspree or your own backend
            const formData = {
                name: name,
                email: email,
                subject: subject || 'No Subject',
                message: message,
                timestamp: new Date().toISOString()
            };
            
            // Save to localStorage for demo
            saveMessageToLocal(formData);
            
            // Show success message
            showMessage('Thank you! Your message has been sent. I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
        }, 1500);
    });
}

function showMessage(text, type) {
    if (!formMessage) return;
    
    formMessage.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${text}
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

function saveMessageToLocal(data) {
    try {
        let messages = JSON.parse(localStorage.getItem('portfolioMessages')) || [];
        messages.push(data);
        
        // Keep only last 50 messages
        if (messages.length > 50) {
            messages = messages.slice(-50);
        }
        
        localStorage.setItem('portfolioMessages', JSON.stringify(messages));
        console.log('Message saved locally:', data);
    } catch (error) {
        console.error('Error saving message:', error);
    }
}

// Initialize tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

// Formspree Integration Instructions
console.log(`
=== FORMSPREE INTEGRATION ===
To enable actual email submissions:

1. Go to https://formspree.io and sign up
2. Create a new form
3. Get your form ID (e.g., xyz123abc)
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
        showMessage('Thank you! Your message has been sent.', 'success');
        form.reset();
    } else {
        showMessage('Oops! Something went wrong. Please try again.', 'danger');
    }
});
`);
