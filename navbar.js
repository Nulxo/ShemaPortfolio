function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            
            // Initialize navbar functionality AFTER it's loaded
            initNavbar(); // <-- This now includes title update
        })
        .catch(error => console.error('Navbar error:', error));
}

// Initialize navbar toggle functionality AND update page title
function initNavbar() {
    const navBtn = document.querySelector('.nav-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log('Navbar initialized - button found:', navBtn);
    console.log('Navbar initialized - menu found:', navMenu);
    
    // *** ADD PAGE TITLE UPDATE HERE ***
    function getPageTitle() {
        const path = window.location.pathname;
        console.log('Current path:', path);
        const page = path.split('/').pop().split('.').slice(0, -1).join('.') || 'index';
        
        const titleMap = {
            'index': 'Home',
            'photos': 'Photos',
            'videos': 'Videos',
            'graphics': 'Graphics',
            'about': 'About'
        };
        
        return titleMap[page] || page.charAt(0).toUpperCase() + page.slice(1);
    }

    const titleElement = document.getElementById('pageTitle');
    console.log('Title element found:', titleElement);
    if (titleElement) {
        const title = getPageTitle();
        titleElement.innerHTML = ` ❘ ${title}`;
        console.log('Title updated to:', titleElement.innerHTML);
    }
    
    if (navBtn && navMenu) {
        // Toggle menu on button click
        navBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('open');
            console.log('Menu toggled, open?', navMenu.classList.contains('open'));
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navBtn.contains(e.target)) {
                navMenu.classList.remove('open');
            }
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('open');
            });
        });
    } else {
        console.error('Navbar elements not found after load!');
    }
}

// Load navbar when DOM is ready
document.addEventListener('DOMContentLoaded', loadNavbar);