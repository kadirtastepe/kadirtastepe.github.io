// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize dark mode toggle
  initializeDarkModeToggle();
  // Initialize timeline year display
  initializeTimelineYears();
});

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
 * Initialize and open the default tab on page load
 */
function initializeDefaultTab() {
  const defaultTab = document.querySelector('.tablinks');
  if (defaultTab) {
    // Simulate a click on the first tab
    const tabName = defaultTab.getAttribute('onclick').match(/'([^']+)'/)[1];
    const tabContent = document.getElementById(tabName);
    
    if (tabContent) {
      tabContent.style.display = 'block';
      defaultTab.classList.add('active');
      defaultTab.setAttribute('aria-selected', 'true');
    }
  }
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
 * Open a specific tab and close all others, or collapse if already open
 * @param {Event} evt - The click event
 * @param {string} tabName - The ID of the tab to open
 */
function openTab(evt, tabName) {
  const selectedTab = document.getElementById(tabName);
  const clickedButton = evt.currentTarget;
  
  // Check if the clicked tab is already active
  const isActive = clickedButton.classList.contains('active');
  
  // Hide all tab content
  const tabContents = document.getElementsByClassName('tabcontent');
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = 'none';
  }

  // Remove active class from all tab links
  const tabLinks = document.getElementsByClassName('tablinks');
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove('active');
    tabLinks[i].setAttribute('aria-selected', 'false');
  }

  // If tab was not active, show it and mark as active
  // If it was active, leave it collapsed (already hidden above)
  if (selectedTab && !isActive) {
    selectedTab.style.display = 'block';
    clickedButton.classList.add('active');
    clickedButton.setAttribute('aria-selected', 'true');
    
    // Smooth scroll to top of content on mobile
    if (window.innerWidth <= 768) {
      selectedTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
