// Road So Far data source - single source of truth
const roadSoFarData = [
  {
    year: '2025',
    image: 'pics/DESY_MCSchool.png',
    alt: 'Hamburg, Germany 2025 - DESY',
    caption: 'Hamburg, Germany 2025 - DESY <br> Terascale Monte Carlo School'
  },
  {
    year: '2025',
    image: 'pics/SAP.jpg',
    alt: 'Walldorf, Germany 2025 - SAP',
    caption: 'Walldorf, Germany 2025 - SAP'
  },
  {
    year: '2024',
    image: 'pics/DELL.jpg',
    alt: 'Frankfurt, Germany 2024 - DELL Technologies',
    caption: 'Frankfurt, Germany 2024 - DELL Technologies'
  },
  {
    year: '2024',
    image: 'pics/CHEP2024.png',
    alt: 'Krakow, Poland 2024 - CHEP Conference',
    caption: 'Krakow, Poland 2024 - CHEP <br> (Computing in High Energy Physics)'
  },
  {
    year: '2024',
    image: 'pics/CERN_2024.jpg',
    alt: 'Geneva, Switzerland 2024 - CERN',
    caption: 'Geneva, Switzerland 2024 - CERN'
  },
  {
    year: '2023',
    image: 'pics/Bosseln.png',
    alt: 'Heidelberg, Germany 2023',
    caption: 'Heidelberg, Germany 2023 <br> Physikalishes Institut Heidelberg <br> Boßeln Day'
  },
  {
    year: '2023',
    image: 'pics/PSI2023.jpg',
    alt: 'Villigen, Switzerland 2023 - Paul Scherrer Institute',
    caption: 'Villigen, Switzerland 2023 <br> Paul Scherrer Institute'
  },
  {
    year: '2022',
    image: 'pics/IPP.png',
    alt: 'Greifswald, Germany 2022 - Max Planck Institute IPP Summer University',
    caption: 'Greifswald, Germany 2022 - Max Planck Institute IPP Summer University for Plasma Physics and Fusion Research'
  },
  {
    year: '2020',
    image: 'pics/pfbu2020.png',
    alt: 'Istanbul, Turkey 2020 - Istanbul University Winter School',
    caption: 'Istanbul, Turkey 2020 - Istanbul University Computing Applications in Particle Physics Winter School'
  },
  {
    year: '2019',
    image: 'pics/PPSS_2019.jpg',
    alt: 'Krakow, Poland 2019 - Particle Physics Summer Student Programme',
    caption: 'Krakow, Poland 2019 - Particle Physics Summer Student Programme<br>(The Henryk Niewodniczański Institute of Nuclear Physics Polish Academy of Sciences)'
  }
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize dark mode toggle
  initializeDarkModeToggle();
  // Initialize hamburger menu
  initializeHamburgerMenu();
  // Render timeline and gallery from data
  renderTimelineView();
  renderGalleryView();
  // Initialize timeline year display
  initializeTimelineYears();
  // Initialize smooth scrolling
  initializeSmoothScrolling();
  // Initialize scroll spy for active navigation
  initializeScrollSpy();
  // Initialize back to top button
  initializeBackToTop();
  // Initialize contact form
  initializeContactForm();
});

/**
 * Render timeline view from data
 */
function renderTimelineView() {
  const timelineContainer = document.getElementById('timeline-container');
  if (!timelineContainer) return;
  
  timelineContainer.innerHTML = '';
  
  roadSoFarData.forEach(item => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';
    timelineItem.setAttribute('data-year', item.year);
    
    timelineItem.innerHTML = `
      <div class="timeline-marker"></div>
      <div class="timeline-content" onclick="openLightbox(this.querySelector('.polaroid'))">
        <div class="polaroid">
          <img src="${item.image}" alt="${item.alt}" loading="lazy" decoding="async">
          <div class="polaroid-caption">
            <p>${item.caption}</p>
          </div>
        </div>
      </div>
    `;
    
    timelineContainer.appendChild(timelineItem);
  });
}

/**
 * Render gallery view from data
 */
function renderGalleryView() {
  const galleryView = document.getElementById('gallery-view');
  if (!galleryView) return;
  
  galleryView.innerHTML = '';
  
  roadSoFarData.forEach(item => {
    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid';
    polaroid.setAttribute('onclick', 'openLightbox(this)');
    
    polaroid.innerHTML = `
      <img src="${item.image}" alt="${item.alt}" loading="lazy" decoding="async">
      <div class="polaroid-caption">
        <p>${item.caption}</p>
      </div>
    `;
    
    galleryView.appendChild(polaroid);
  });
}

/**
 * Initialize timeline to show years only once
 */
function initializeTimelineYears() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  let lastYear = null;
  
  timelineItems.forEach(item => {
    const currentYear = item.getAttribute('data-year');
    
    if (currentYear === lastYear) {
      // Hide the year label for duplicate years
      item.classList.add('hide-year');
    }
    
    lastYear = currentYear;
  });
}

/**
 * Initialize smooth scrolling for navigation links
 */
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without scrolling
        history.pushState(null, null, `#${targetId}`);
      }
    });
  });
}

/**
 * Initialize scroll spy to highlight active navigation item
 */
function initializeScrollSpy() {
  const sections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  
  // Create an intersection observer
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        
        // Remove active class from all nav links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to corresponding nav link
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);
  
  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });
}

/**
 * Initialize back to top button
 */
function initializeBackToTop() {
  const backToTopButton = document.getElementById('backToTop');
  
  if (!backToTopButton) return;
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  // Scroll to top when clicked
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * @deprecated This function is no longer used with scrollable navigation
 * Open a specific tab and close all others, or collapse if already open
 * @param {Event} evt - The click event
 * @param {string} tabName - The ID of the tab to open
 */
function openTab(evt, tabName) {
  // This function is kept for backwards compatibility but is no longer used
  console.warn('openTab is deprecated with scrollable navigation');
}

/**
 * Initialize hamburger menu functionality
 */
function initializeHamburgerMenu() {
  const hamburger = document.getElementById('hamburgerBtn');
  const navContainer = document.getElementById('navContainer');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!hamburger || !navContainer) return;
  
  // Toggle menu on hamburger click
  hamburger.addEventListener('click', function() {
    const isActive = hamburger.classList.contains('active');
    
    if (isActive) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  
  // Close menu when clicking on a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      const isClickInside = navContainer.contains(e.target) || hamburger.contains(e.target);
      if (!isClickInside && hamburger.classList.contains('active')) {
        closeMenu();
      }
    }
  });
  
  // Helper functions
  function openMenu() {
    hamburger.classList.add('active');
    navContainer.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMenu() {
    hamburger.classList.remove('active');
    navContainer.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = 'auto';
  }
  
  // Reset on window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

/**
 * Initialize dark mode toggle functionality
 */
function initializeDarkModeToggle() {
  const toggle = document.getElementById('toggleDark');
  const body = document.body;

  if (!toggle) return;

  toggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    // Toggle icon
    const icon = this.querySelector('i');
    if (icon) {
      if (body.classList.contains('dark-mode')) {
        icon.classList.remove('bi-brightness-high-fill');
        icon.classList.add('bi-moon');
      } else {
        icon.classList.remove('bi-moon');
        icon.classList.add('bi-brightness-high-fill');
      }
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
  });

  // Check for saved dark mode preference
  const darkModePreference = localStorage.getItem('darkMode');
  if (darkModePreference === 'true') {
    body.classList.add('dark-mode');
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.classList.remove('bi-brightness-high-fill');
      icon.classList.add('bi-moon');
    }
  }
}


/**
 * Open lightbox with the clicked image
 * @param {HTMLElement} polaroidElement - The polaroid div that was clicked
 */
function openLightbox(polaroidElement) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  
  // Get the image and caption from the clicked polaroid
  const img = polaroidElement.querySelector('img');
  const caption = polaroidElement.querySelector('.polaroid-caption p');
  
  if (img && lightbox && lightboxImg) {
    lightbox.style.display = 'block';
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    
    if (caption && lightboxCaption) {
      lightboxCaption.innerHTML = caption.innerHTML;
    }
    
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Open lightbox with the clicked bird image
 * @param {HTMLElement} birdElement - The bird figure element that was clicked
 */
function openBirdLightbox(birdElement) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  
  // Get the image and caption from the clicked bird entry
  const img = birdElement.querySelector('img');
  const caption = birdElement.querySelector('figcaption');
  
  if (img && lightbox && lightboxImg) {
    lightbox.style.display = 'block';
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    
    if (caption && lightboxCaption) {
      lightboxCaption.innerHTML = caption.innerHTML;
    }
    
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Close the lightbox
 */
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.style.display = 'none';
    // Restore body scrolling
    document.body.style.overflow = 'auto';
  }
}

// Close lightbox on Escape key press
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' || event.key === 'Esc') {
    closeLightbox();
  }
});

/**
 * Switch between timeline and gallery views
 * @param {string} view - The view to switch to ('timeline' or 'gallery')
 */
function switchView(view) {
  const timelineView = document.getElementById('timeline-view');
  const galleryView = document.getElementById('gallery-view');
  const buttons = document.querySelectorAll('.view-btn');
  
  if (view === 'timeline') {
    timelineView.style.display = 'block';
    galleryView.style.display = 'none';
    buttons[0].classList.add('active');
    buttons[1].classList.remove('active');
  } else if (view === 'gallery') {
    timelineView.style.display = 'none';
    galleryView.style.display = 'flex';
    buttons[0].classList.remove('active');
    buttons[1].classList.add('active');
  }
}

/**
 * Toggle collapsible sections
 * @param {HTMLElement} button - The button element that was clicked
 */
function toggleCollapsible(button) {
  const content = button.parentElement.querySelector('.collapsible-content');
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  
  if (isExpanded) {
    // Collapse
    button.setAttribute('aria-expanded', 'false');
    content.classList.remove('expanded');
  } else {
    // Expand
    button.setAttribute('aria-expanded', 'true');
    content.classList.add('expanded');
  }
}

/**
 * Initialize contact form with mailto fallback
 */
function initializeContactForm() {
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Check if Formspree is configured
    const formAction = form.getAttribute('action');
    
    if (formAction.includes('YOUR_FORM_ID')) {
      // Fallback to mailto if Formspree is not configured
      const mailtoLink = `mailto:ktastepe@cern.ch?subject=${encodeURIComponent('Portfolio Contact Message')}&body=${encodeURIComponent(
        `From: ${name} (${email})\n\n${message}`
      )}`;
      
      window.location.href = mailtoLink;
      
      formStatus.textContent = 'Opening your email client...';
      formStatus.className = 'form-status success';
      
      setTimeout(() => {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
        form.reset();
      }, 3000);
    } else {
      // Use Formspree if configured
      fetch(formAction, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
          formStatus.className = 'form-status success';
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        formStatus.textContent = 'Oops! There was a problem sending your message. Please try emailing directly.';
        formStatus.className = 'form-status error';
      })
      .finally(() => {
        setTimeout(() => {
          formStatus.className = 'form-status';
          formStatus.textContent = '';
        }, 5000);
      });
    }
  });
}
