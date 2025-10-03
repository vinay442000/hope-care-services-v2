// js/our-work.js — Page-specific functionality for Our Work page

document.addEventListener('DOMContentLoaded', function () {

  // =============
  // MODAL FUNCTIONALITY
  // =============
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('projectModal');
  
  if (!modal) return; // Exit if not on this page

  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeBtn = document.querySelector('.close');

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.querySelector('.card-image img').src;
      const title = card.querySelector('h3').innerText;
      const desc = card.querySelector('p').innerText;

      modalImg.src = imgSrc;
      modalTitle.innerText = title;
      modalDesc.innerText = desc;

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

  // =============
  // PROJECT FILTERING
  // =============
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projects.forEach(project => {
        if (filter === 'all' || project.getAttribute('data-category') === filter) {
          project.style.display = 'block';
          setTimeout(() => {
            project.style.opacity = '1';
            project.style.transform = 'translateY(0) scale(1)';
          }, 100);
        } else {
          project.style.opacity = '0';
          project.style.transform = 'translateY(20px)';
          setTimeout(() => {
            project.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // =============
  // SEARCH FUNCTION
  // =============
  window.searchSite = function () {
    const input = document.getElementById('searchInput');
    if (!input) return;

    const searchTerm = input.value.toLowerCase().trim();
    if (!searchTerm) return;

    let found = false;

    projects.forEach(project => {
      const title = project.querySelector('h3').innerText.toLowerCase();
      const desc = project.querySelector('p').innerText.toLowerCase();

      if (title.includes(searchTerm) || desc.includes(searchTerm)) {
        project.style.display = 'block';
        project.style.opacity = '1';
        project.style.transform = 'translateY(0) scale(1)';
        found = true;
      } else {
        project.style.opacity = '0';
        project.style.transform = 'translateY(20px)';
        setTimeout(() => {
          project.style.display = 'none';
        }, 300);
      }
    });

    if (!found) {
      alert('No projects match your search: "' + searchTerm + '"');
    }
  };

  // =============
  // STATS COUNTER ANIMATION
  // =============
  function animateCounters() {
    const counters = document.querySelectorAll('.count');
    const speed = 200; // Lower = faster

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      let count = 0;
      const increment = target / speed;

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          counter.innerText = target + (target === 100 ? '' : '+');
          clearInterval(timer);
        } else {
          counter.innerText = Math.ceil(count) + (target === 100 ? '' : '+');
        }
      }, 10);
    });
  }

  // Trigger counters when in viewport
  const statsSection = document.querySelector('.achievement-stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  }

  // =============
  // CARD STAGGERED ANIMATION ON LOAD
  // =============
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 200);
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