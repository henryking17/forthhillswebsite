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
        // Close mobile menu after clicking
        navUl.classList.remove('show');
    });
});


// Dynamic text update
const overlays = document.querySelectorAll(".overlay-text");
 overlays.forEach((overlay, index) => { overlay.innerText = "Forthhills Activities " + (index + 1); });

 // Update text video dynamically
  setTimeout(() => { document.getElementById("vidText").innerText = "Dance club"; }, 5000);


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
        
        // Simulate form submission (in a real website, this would send to a server)
        setTimeout(() => {
            // Store in localStorage for demo purposes
            const contactData = {
                name,
                email,
                phone,
                subject,
                message,
                timestamp: new Date().toISOString()
            };
            
            let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
            contacts.push(contactData);
            localStorage.setItem('contacts', JSON.stringify(contacts));
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            showFormStatus('Thank you for your message! We will get back to you within 24 hours.', 'success');
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            
            console.log('Contact form submitted:', contactData);
        }, 2000); // Simulate 2 second delay
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = type;
    formStatus.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}




    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // initial check