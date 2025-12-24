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

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // initial check