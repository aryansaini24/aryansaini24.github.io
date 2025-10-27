// Modern Portfolio JavaScript with Interactive Features

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeToggleText();
}

function toggleTheme() {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeToggleText();
}

function updateThemeToggleText() {
  const theme = html.getAttribute('data-theme');
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// Animated Skill Charts
function animateSkills() {
  const skillCards = document.querySelectorAll('.skill-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });
  
  skillCards.forEach(card => {
    observer.observe(card);
  });
}

// Project Filtering
let currentFilter = 'all';

function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Get filter category
      const category = button.getAttribute('data-category');
      currentFilter = category;
      
      // Filter projects
      filterProjects(category);
    });
  });
}

function filterProjects(category) {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    
    if (category === 'all' || cardCategory === category) {
      card.classList.remove('hidden');
      // Add fade-in animation
      card.style.animation = 'fadeInUp 0.5s ease';
    } else {
      card.classList.add('hidden');
    }
  });
}

// Project Modals
function initProjectModals() {
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.querySelector('.modal');
  const modalClose = document.querySelector('.modal-close');
  const modalContent = document.querySelector('.modal-content');
  
  if (!modal || !modalContent) return;
  
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3').textContent;
      const description = card.querySelector('p').textContent;
      const tags = Array.from(card.querySelectorAll('.tag'))
        .map(tag => tag.textContent)
        .join(', ');
      const fullDescription = card.getAttribute('data-description') || description;
      const technologies = card.getAttribute('data-technologies') || tags;
      const github = card.getAttribute('data-github') || '#';
      const demo = card.getAttribute('data-demo') || '#';
      
      // Build modal content
      const content = `
        <button class="modal-close">✕</button>
        <h2>${title}</h2>
        <p><strong>Description:</strong> ${fullDescription}</p>
        <p><strong>Technologies:</strong> ${technologies}</p>
        <div style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
          ${github !== '#' ? `<a href="${github}" target="_blank" class="btn btn-primary">View GitHub</a>` : ''}
          ${demo !== '#' ? `<a href="${demo}" target="_blank" class="btn btn-secondary">View Demo</a>` : ''}
        </div>
      `;
      
      modalContent.innerHTML = content;
      modal.classList.add('active');
      
      // Re-attach close button listener
      const newCloseBtn = modalContent.querySelector('.modal-close');
      if (newCloseBtn) {
        newCloseBtn.addEventListener('click', closeModal);
      }
    });
  });
  
  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close modal with close button
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function closeModal() {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Scroll Reveal Animation
function initScrollReveal() {
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}

// Contact Form Validation (if needed)
function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = contactForm.querySelector('#name').value;
      const email = contactForm.querySelector('#email').value;
      const message = contactForm.querySelector('#message').value;
      
      if (name && email && message) {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
      } else {
        alert('Please fill in all fields.');
      }
    });
  }
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  animateSkills();
  initProjectFilters();
  initProjectModals();
  initSmoothScroll();
  initScrollReveal();
  initContactForm();
  
  // Add loading animation complete
  document.body.classList.add('loaded');
});

// Add active state to current nav section
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
