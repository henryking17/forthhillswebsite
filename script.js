 // Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu after clicking (only when a nav <ul> exists)
        if (navUl) navUl.classList.remove('show');
    });
});


// Dynamic text update
const overlay = document.querySelectorAll(".overlay-text");
 overlay.forEach((overlay, index) => { overlay.innerText = "Forthhills Activities " + (index + 1); });


 // Update text video dynamically
  setTimeout(() => { document.getElementById("vidText").innerText = "FORTHHILLS DANCE CLUB"; }, 5000);


//video playback control
 const video = document.getElementById("myVideo");

  function playVideo() {
    video.play();
  }

  function pauseVideo() {
    video.pause();
  }


// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navUl = document.querySelector('nav ul');

if (hamburger && navUl) {
    hamburger.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });
}


// Show alert
    function showMessage() {
      alert("Welcome to Forthhills School! Explore our programs and join our family.");
    }

    // Reveal sections on scroll
    const sections = document.querySelectorAll("section");
    const articles = document.querySelectorAll(".news article");

    function revealOnScroll() {
      const triggerBottom = window.innerHeight * 0.85;
      sections.forEach(sec => {
        const boxTop = sec.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
          sec.classList.add("visible");
        }
      });
      articles.forEach(article => {
        const boxTop = article.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
          article.classList.add("visible");
        }
      });
    }
// Enhanced contact form validation and submission
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !email || !subject || !message) {
            showFormStatus('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormStatus('Please enter a valid email address.', 'error');
            return;
        }
        
        if (phone && !isValidPhone(phone)) {
            showFormStatus('Please enter a valid phone number.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Prepare local fallback data
        const contactData = {
            name,
            email,
            phone,
            subject,
            message,
            timestamp: new Date().toISOString()
        };

        // Attempt to submit to the configured action (Web3Forms)
        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm)
        })
        .then(response => response.json())
        .then(data => {
            const success = data && (data.success === true || data.success === 'true' || (data.message && /success/i.test(data.message)));
            if (success) {
                contactForm.reset();
                showFormStatus('Thank you for your message! We will get back to you within 24 hours.', 'success');
                console.log('Contact form submitted (web3forms):', data);
            } else {
                // fallback: store locally and inform user
                let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
                contacts.push(contactData);
                localStorage.setItem('contacts', JSON.stringify(contacts));
                showFormStatus('Submission failed — your message was saved locally. Please try again.', 'error');
                console.error('Web3Forms responded with an error:', data);
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
            contacts.push(contactData);
            localStorage.setItem('contacts', JSON.stringify(contacts));
            showFormStatus('Network error — your message was saved locally. Please try again later.', 'error');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Remove spaces, dashes and parentheses but keep leading plus if any
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    // Accept local format: 0 followed by 10 digits (e.g., 08012345678)
    const localRegex = /^0\d{10}$/;
    // Accept Nigerian international format: +234 followed by 10 digits
    const intlNaira = /^\+234\d{10}$/;
    // Accept general E.164-like numbers as a fallback
    const e164 = /^\+?[1-9]\d{7,14}$/;
    return localRegex.test(cleaned) || intlNaira.test(cleaned) || e164.test(cleaned);
}

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = type;
    formStatus.style.display = 'block';
    
    if (type === 'success') {
        // little pop animation and highlight the form briefly
        formStatus.classList.add('animate');
        contactForm.classList.add('success');
        setTimeout(() => {
            formStatus.classList.remove('animate');
            contactForm.classList.remove('success');
        }, 1200);
    }

    // Hide after 5 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

// Phone input formatting (simple, non-destructive)
function formatPhoneInput(value) {
    const hasPlus = value.trim().startsWith('+') ? '+' : '';
    const digits = value.replace(/\D/g, '');
    if (!digits) return hasPlus;
    const groups = [];
    for (let i = 0; i < digits.length; i += 3) {
        groups.push(digits.substr(i, 3));
    }
    return hasPlus + groups.join(' ');
}

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        const formatted = formatPhoneInput(this.value);
        this.value = formatted;
        // keep caret at the end for simplicity
        this.setSelectionRange(this.value.length, this.value.length);
    });
    phoneInput.addEventListener('blur', function() {
        this.value = formatPhoneInput(this.value);
    });
}




    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // initial check