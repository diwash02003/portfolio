// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const menuToggle = document.querySelector('.menu-toggle');
const navMobile = document.querySelector('.nav-mobile');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillCards = document.querySelectorAll('.skill-card');
const projectModal = document.getElementById('project-details-modal');
const closeModalBtn = document.querySelector('.close-button');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('current-year');
const floatingIconsContainer = document.getElementById('floating-icons');

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear();

// Theme Toggle
function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.documentElement.classList.remove('dark');
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }
  localStorage.setItem('theme', theme);
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

// Theme toggle event listener
themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
  navMobile.classList.toggle('active');
  menuToggle.innerHTML = navMobile.classList.contains('active') 
    ? '<i class="fas fa-times"></i>' 
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-mobile .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Tabs functionality
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs and contents
    tabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    tab.classList.add('active');
    const tabId = tab.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

// Project filtering
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all filter buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    // Show/hide projects based on filter
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Project modal functionality
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h3').textContent;
    const description = card.querySelector('p').textContent;
    const tags = card.querySelectorAll('.project-tag');
    const badge = card.querySelector('.project-badge').textContent;
    
    // Set modal content
    document.getElementById('modal-project-title').textContent = title;
    document.getElementById('modal-project-description').textContent = 
      "Detailed description of " + title + ": " + description + 
      " This project showcases my skills in web development and problem-solving. " +
      "It was developed using modern technologies and best practices to create a " +
      "robust and user-friendly solution.";
    
    // Clear and add tags
    const tagsContainer = document.getElementById('modal-project-tags');
    tagsContainer.innerHTML = '';
    tags.forEach(tag => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'project-tag';
      tagSpan.textContent = tag.textContent;
      tagsContainer.appendChild(tagSpan);
    });
    
    // Show modal
    projectModal.style.display = 'flex';
  });
});

// Close modal
closeModalBtn.addEventListener('click', () => {
  projectModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === projectModal) {
    projectModal.style.display = 'none';
  }
});

// Contact form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');
  
  // Simulate form submission
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    // Reset form
    contactForm.reset();
    
    // Show success message
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    
    // Reset button after 3 seconds
    setTimeout(() => {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }, 3000);
  }, 1500);
});

// Create floating icons for hero section
function createFloatingIcons() {
  const icons = ['fas fa-graduation-cap', 'fas fa-book-open', 'fas fa-code'];
  const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];
  
  for (let i = 0; i < 15; i++) {
    const icon = document.createElement('div');
    icon.className = 'floating-icon';
    
    const iconIndex = i % 3;
    const size = Math.random() * 60 + 20;
    
    icon.style.width = `${size}px`;
    icon.style.height = `${size}px`;
    icon.style.left = `${Math.random() * 100}%`;
    icon.style.top = `${Math.random() * 100}%`;
    icon.style.backgroundColor = colors[iconIndex];
    
    const iconElement = document.createElement('i');
    iconElement.className = icons[iconIndex];
    iconElement.style.color = 'white';
    
    icon.appendChild(iconElement);
    floatingIconsContainer.appendChild(icon);
    
    // Add animation with random duration
    animateFloatingIcon(icon);
  }
}

// Animate floating icons with slow movement
function animateFloatingIcon(icon) {
  const speed = 3 + Math.random() * 2; // Slower speed between 3-5 seconds
  
  // Initial position
  const startX = parseFloat(icon.style.left);
  const startY = parseFloat(icon.style.top);
  
  // Random movement range (smaller for slower movement)
  const rangeX = (Math.random() - 0.5) * 10;
  const rangeY = (Math.random() - 0.5) * 10;
  
  let progress = 0;
  let direction = 1;
  
  function moveIcon() {
    progress += 0.005 * direction;
    
    if (progress >= 1) direction = -1;
    if (progress <= 0) direction = 1;
    
    const newX = startX + rangeX * progress;
    const newY = startY + rangeY * progress;
    
    icon.style.left = `${newX}%`;
    icon.style.top = `${newY}%`;
    
    requestAnimationFrame(moveIcon);
  }
  
  moveIcon();
}

// Initialize AOS (Animate on Scroll)
let AOS; // Declare AOS variable

document.addEventListener('DOMContentLoaded', function() {
  AOS = window.AOS; // Assign AOS from window object
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
  
  // Create floating icons
  createFloatingIcons();
  
  // Show skill details on hover
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const details = card.querySelector('.skill-details');
      details.style.display = 'block';
    });
    
    card.addEventListener('mouseleave', () => {
      const details = card.querySelector('.skill-details');
      details.style.display = 'none';
    });
  });
});