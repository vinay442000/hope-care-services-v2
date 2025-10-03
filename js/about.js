document.addEventListener('DOMContentLoaded', function() {

  // Animate Stats on Scroll
  function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return; // Safety check

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Observe when stats section enters viewport
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateValue('projects', 0, 120, 2000);
        animateValue('personnel', 0, 5000, 2000);
        animateValue('states', 0, 18, 2000);
        statsObserver.disconnect(); // Stop observing after animation
      }
    });
  }, { 
    threshold: 0.3, // Trigger earlier for better UX
    rootMargin: '0px 0px -50px 0px' // Compensate for fixed header
  });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

});