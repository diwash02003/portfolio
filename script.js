// Portfolio Data
const portfolioData = {
  projects: [
    {
      id: "cv-generator",
      title: "Modern CV Generator",
      category: "web",
      image: "./cv.webp?height=300&width=400",
      description:
        "Interactive web application for creating professional resumes and CVs with multiple templates, real-time preview, and export options.",
      tags: ["React", "TypeScript", "Redux"],
      features: [
        "Multiple professional templates",
        "Drag-and-drop section editor",
        "Real-time preview functionality",
        "PDF and Word export options",
        "Save and load functionality",
        "Responsive design for all devices",
      ],
      technologies: ["React", "TypeScript", "Redux", "HTML5", "CSS3", "PDF.js", "Node.js"],
      demoLink: "https://cv-generator-demo.netlify.app",
      githubLink: "https://github.com/diwash02003/cv-generator",
    },
    {
      id: "crm-system",
      title: "Enterprise CRM System",
      category: "backend",
      image: "/crm.webp?height=300&width=400",
      description:
        "Comprehensive customer relationship management system developed during internship at mSOft International with advanced features.",
      tags: ["Spring Boot", "Thymeleaf", "MySQL"],
      features: [
        "Customer and lead management",
        "Sales pipeline tracking",
        "Advanced reporting and analytics",
        "Email integration and automation",
        "User role and permission management",
        "RESTful API architecture",
      ],
      technologies: ["Java", "Spring Boot", "Thymeleaf", "MySQL", "Bootstrap", "jQuery", "Maven"],
      demoLink: "https://crm-demo.msoft.com",
      githubLink: "https://github.com/diwash02003/crm-system",
    },
    {
      id: "event-system",
      title: "College Event Management Portal",
      category: "web",
      image: "/young-student-woman-giving-lecture-to-students-at-the-university.webp?height=300&width=400",
      description:
        "Full-stack platform for managing college events, registrations, attendee tracking with QR code integration.",
      tags: ["Java", "Spring Boot", "React"],
      features: [
        "Event creation and management",
        "Online registration and ticketing",
        "QR code check-in system",
        "Attendee tracking and analytics",
        "Email notifications and reminders",
        "Payment gateway integration",
      ],
      technologies: ["Java", "Spring Boot", "React", "MySQL", "Bootstrap", "Chart.js", "PayPal API"],
      demoLink: "https://event-system-demo.netlify.app",
      githubLink: "https://github.com/diwash02003/event-management",
    },
    {
      id: "elearning",
      title: "Interactive E-Learning Platform",
      category: "web",
      image: "/online-learning-text.webp?height=300&width=400",
      description:
        "Feature-rich online learning platform with course management, progress tracking, interactive quizzes, and certificates.",
      tags: ["React", "Node.js", "MongoDB"],
      features: [
        "Course creation and management",
        "Video lectures with timestamps",
        "Interactive quizzes and assignments",
        "Progress tracking and analytics",
        "Discussion forums and chat",
        "Certificate generation",
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "AWS S3", "Stripe"],
      demoLink: "https://elearning-demo.netlify.app",
      githubLink: "https://github.com/diwash02003/elearning-platform",
    },
    {
      id: "mobile-app",
      title: "Task Management Mobile App",
      category: "mobile",
      image: "/taskmgmt.webp?height=300&width=400",
      description: "Cross-platform mobile application for task and project management with offline capabilities.",
      tags: ["React Native", "Firebase", "Redux"],
      features: [
        "Cross-platform compatibility",
        "Offline data synchronization",
        "Push notifications",
        "Team collaboration features",
        "Time tracking and reporting",
        "Dark mode support",
      ],
      technologies: ["React Native", "Firebase", "Redux", "AsyncStorage", "Push Notifications"],
      demoLink: "https://play.google.com/store/apps/details?id=com.taskmanager",
      githubLink: "https://github.com/diwash02003/task-manager-mobile",
    },
    {
      id: "api-gateway",
      title: "Microservices API Gateway",
      category: "backend",
      image: "/apigateway.webp?height=300&width=400",
      description:
        "Scalable API gateway built with Spring Cloud for microservices architecture with advanced routing and security.",
      tags: ["Spring Cloud", "Docker", "Kubernetes"],
      features: [
        "Dynamic routing and load balancing",
        "Authentication and authorization",
        "Rate limiting and throttling",
        "Request/response transformation",
        "Monitoring and logging",
        "Circuit breaker pattern",
      ],
      technologies: ["Spring Cloud Gateway", "Docker", "Kubernetes", "Redis", "Prometheus", "Grafana"],
      demoLink: "https://api-gateway-demo.herokuapp.com",
      githubLink: "https://github.com/diwash02003/microservices-gateway",
    },
  ],
}

// DOM Elements
const navbar = document.getElementById("navbar")
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")
const themeToggle = document.getElementById("theme-toggle")
const projectsGrid = document.getElementById("projects-grid")
const projectModal = document.getElementById("project-modal")
const modalOverlay = document.getElementById("modal-overlay")
const modalClose = document.getElementById("modal-close")
const contactForm = document.getElementById("contact-form")

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  initializeProjects()
  initializeContactForm()
  initializeScrollEffects()
  initializeAnimations()
})

// Navigation Management
function initializeNavigation() {
  // Mobile menu toggle
  navToggle.addEventListener("click", toggleMobileMenu)

  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      closeMobileMenu()
    }
  })

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Update active navigation link on scroll
  window.addEventListener("scroll", updateActiveNavLink)
}

function toggleMobileMenu() {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")

  // Update ARIA attributes
  const isOpen = navMenu.classList.contains("active")
  navToggle.setAttribute("aria-expanded", isOpen)

  // Animate hamburger menu
  const spans = navToggle.querySelectorAll("span")
  if (isOpen) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
    spans[1].style.opacity = "0"
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
  } else {
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  }
}

function closeMobileMenu() {
  navMenu.classList.remove("active")
  navToggle.classList.remove("active")
  navToggle.setAttribute("aria-expanded", "false")

  // Reset hamburger menu
  const spans = navToggle.querySelectorAll("span")
  spans[0].style.transform = "none"
  spans[1].style.opacity = "1"
  spans[2].style.transform = "none"
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let currentSection = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.offsetHeight

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active")
    }
  })
}

// Projects Management
function initializeProjects() {
  renderProjects()
  initializeProjectFilters()
}

function renderProjects(filter = "all") {
  const filteredProjects =
    filter === "all" ? portfolioData.projects : portfolioData.projects.filter((project) => project.category === filter)

  projectsGrid.innerHTML = ""

  filteredProjects.forEach((project, index) => {
    const projectCard = createProjectCard(project, index)
    projectsGrid.appendChild(projectCard)
  })

  // Add click event listeners to project cards
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const projectId = card.getAttribute("data-project-id")
      openProjectModal(projectId)
    })
  })
}

function createProjectCard(project, index) {
  const card = document.createElement("div")
  card.className = "project-card fade-in-up"
  card.setAttribute("data-project-id", project.id)
  card.style.animationDelay = `${index * 0.1}s`

  card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <span class="project-badge">${project.category}</span>
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join("")}
            </div>
            <div class="project-actions">
                <button class="btn btn-primary btn-sm">View Details</button>
            </div>
        </div>
    `

  return card
}

function initializeProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      // Get filter value and render projects
      const filter = button.getAttribute("data-filter")
      renderProjects(filter)
    })
  })
}

function openProjectModal(projectId) {
  const project = portfolioData.projects.find((p) => p.id === projectId)

  if (!project) return

  // Populate modal content
  document.getElementById("modal-title").textContent = project.title
  document.getElementById("modal-image").src = project.image
  document.getElementById("modal-image").alt = project.title
  document.getElementById("modal-description").textContent = project.description
  document.getElementById("modal-demo-link").href = project.demoLink
  document.getElementById("modal-github-link").href = project.githubLink

  // Populate tags
  const modalTags = document.getElementById("modal-tags")
  modalTags.innerHTML = project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join("")

  // Populate features
  const modalFeatures = document.getElementById("modal-features-list")
  modalFeatures.innerHTML = project.features.map((feature) => `<li>${feature}</li>`).join("")

  // Populate technologies
  const modalTechTags = document.getElementById("modal-tech-tags")
  modalTechTags.innerHTML = project.technologies.map((tech) => `<span class="skill-tag">${tech}</span>`).join("")

  // Show modal
  projectModal.classList.add("active")
  document.body.style.overflow = "hidden"

  // Focus on close button for accessibility
  setTimeout(() => modalClose.focus(), 100)
}

function closeProjectModal() {
  projectModal.classList.remove("active")
  document.body.style.overflow = ""
}

// Modal event listeners
modalClose.addEventListener("click", closeProjectModal)
modalOverlay.addEventListener("click", closeProjectModal)

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && projectModal.classList.contains("active")) {
    closeProjectModal()
  }
})

// Contact Form Management
function initializeContactForm() {
  contactForm.addEventListener("submit", handleContactFormSubmit)
}

async function handleContactFormSubmit(e) {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const data = Object.fromEntries(formData)

  // Show loading state
  const submitButton = contactForm.querySelector('button[type="submit"]')
  const originalText = submitButton.innerHTML
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
  submitButton.disabled = true

  try {
    // Simulate form submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Show success message
    showNotification("Message sent successfully! I'll get back to you soon.", "success")
    contactForm.reset()
  } catch (error) {
    // Show error message
    showNotification("Failed to send message. Please try again.", "error")
  } finally {
    // Reset button state
    submitButton.innerHTML = originalText
    submitButton.disabled = false
  }
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "var(--accent)" : "var(--danger)"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow-lg);
        z-index: var(--z-tooltip);
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-out"
    setTimeout(() => notification.remove(), 300)
  }, 5000)

  // Manual close
  notification.querySelector(".notification-close").addEventListener("click", () => {
    notification.style.animation = "slideOutRight 0.3s ease-out"
    setTimeout(() => notification.remove(), 300)
  })
}

// Scroll Effects
function initializeScrollEffects() {
  // Navbar background on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Parallax effect for hero background shapes
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const shapes = document.querySelectorAll(".bg-shape")

    shapes.forEach((shape, index) => {
      const speed = 0.5 + index * 0.1
      shape.style.transform = `translateY(${scrolled * speed}px)`
    })
  })
}

// Animations
function initializeAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".fade-in-up, .section-header, .about-content, .experience-content, .contact-content",
  )
  animatedElements.forEach((el) => observer.observe(el))
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Performance optimizations
const debouncedResize = debounce(() => {
  // Handle resize events
  if (window.innerWidth >= 768) {
    closeMobileMenu()
  }
}, 250)

window.addEventListener("resize", debouncedResize)

// Add CSS animations for notifications
const notificationStyles = document.createElement("style")
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: var(--radius);
        transition: background-color 0.2s;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: var(--shadow);
    }
    
    [data-theme="dark"] .navbar.scrolled {
        background: rgba(15, 23, 42, 0.98);
    }
`

document.head.appendChild(notificationStyles)

// Error handling
window.addEventListener("error", (e) => {
  console.error("An error occurred:", e.error)
})

// Service Worker registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
