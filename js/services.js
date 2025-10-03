// js/services.js — Page-specific functionality for Services page

document.addEventListener('DOMContentLoaded', function () {

  // =============
  // MODAL FUNCTIONALITY
  // =============
  const inquiryButtons = document.querySelectorAll('.btn-inquire');
  const modal = document.getElementById('inquiryModal');
  
  if (!modal) return;

  const closeBtn = document.querySelector('.close');
  const modalTitle = document.getElementById('modalServiceTitle');
  const inquiryForm = document.getElementById('inquiryForm');

  inquiryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const service = button.getAttribute('data-service');
      modalTitle.innerText = `Request Quote: ${service}`;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Form submission
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('✅ Thank you! Our team will contact you shortly regarding your service request.');
      inquiryForm.reset();
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  // =============
  // SERVICE TABS
  // =============
  const tabButtons = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active tab
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const category = button.getAttribute('data-tab');

      // Filter cards
      serviceCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // =============
  // STATS COUNTER ANIMATION
  // =============
  function animateCounters() {
    const counters = document.querySelectorAll('.count');
    const speed = 200;

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      let count = 0;
      const increment = target / speed;

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          counter.innerText = target + (target === 98 ? '%' : '+');
          clearInterval(timer);
        } else {
          counter.innerText = Math.ceil(count) + (target === 98 ? '%' : '+');
        }
      }, 10);
    });
  }

  // Trigger when stats section is in view
  const statsSection = document.querySelector('.stats-banner');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  // =============
  // SEARCH FUNCTIONALITY
  // =============
  window.searchSite = function() {
    const input = document.getElementById('searchInput');
    if (!input) return;

    const searchTerm = input.value.toLowerCase().trim();
    if (!searchTerm) return;

    let found = false;

    serviceCards.forEach(card => {
      const title = card.querySelector('h3').innerText.toLowerCase();
      const desc = card.querySelector('p').innerText.toLowerCase();

      if (title.includes(searchTerm) || desc.includes(searchTerm)) {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
        found = true;
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });

    if (!found) {
      alert('No services match your search: "' + searchTerm + '"');
    }
  };

  // =============
  // STAGGERED CARD ANIMATION ON LOAD
  // =============
  const cards = document.querySelectorAll('.service-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 150);
  });

  // =============
  // SMOOTH SCROLL FOR ANCHOR LINKS (NEW)
  // =============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        
        // Calculate offset for fixed header (announcement bar + header)
        const headerOffset = 120; // 40px (announcement) + 80px (header)
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});