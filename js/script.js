// Hero Slide Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

function changeSlide(direction) {
  currentSlide += direction;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  if (currentSlide >= totalSlides) currentSlide = 0;
  showSlide(currentSlide);
}

// Auto-slide every 5 seconds
if (slides.length > 0) {
  setInterval(() => changeSlide(1), 5000);
}

// Search functionality
function searchSite() {
  const query = document.getElementById('searchInput')?.value.toLowerCase().trim();
  if (!query) return;

  const links = document.querySelectorAll('a');
  let found = false;

  links.forEach(link => {
    const text = link.textContent.toLowerCase();
    if (text.includes(query)) {
      window.location.href = link.href;
      found = true;
    }
  });

  if (!found) alert("No matching page found.");
}

// Smooth scroll to contact form
document.querySelectorAll('a[href="#contact-form"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// =============
// MOBILE MENU TOGGLE (NEW)
// =============
document.addEventListener('DOMContentLoaded', function () {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.navbar ul');

  if (mobileToggle && navMenu) {
    // Toggle menu on button click
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Update icon
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close menu when clicking a nav link
    document.querySelectorAll('.navbar a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }
});