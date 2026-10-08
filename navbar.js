function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            initNavbar();
        })
        .catch(error => console.error('Navbar error:', error));
}

function initNavbar() {
    const navBtn = document.querySelector('.nav-btn');
    const navMenu = document.querySelector('.nav-menu');

    // --- Page title ---
    function getPageTitle() {
        const path = window.location.pathname;
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
    if (titleElement) {
        const title = getPageTitle();
        titleElement.innerHTML = ` ❘ ${title}`;
    }

    // --- Menu toggle ---
    if (navBtn && navMenu) {
        navBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            navMenu.classList.toggle('open');
        });

        document.addEventListener('click', function (e) {
            if (!navMenu.contains(e.target) && !navBtn.contains(e.target)) {
                navMenu.classList.remove('open');
            }
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('open');
            });
        });
    } else {
        console.error('Navbar elements not found after load!');
    }

    // --- Scroll behavior ---
    initScrollHide();
}

function initScrollHide() {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;

    // Measure the hero element, or fall back to viewport height
    const hero = document.querySelector('.hero');
    const heroHeight = hero ? hero.offsetHeight : window.innerHeight;

    let lastY = window.scrollY;
    const threshold = 10; // ignore tiny scroll jitters

    window.addEventListener('scroll', () => {
        const y = window.scrollY;

        // Toggle solid background once we're past the hero
        if (y > heroHeight - 100) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }

        // Always show near the top of the page
        if (y <= 50) {
            nav.classList.remove('nav-hidden');
            lastY = y;
            return;
        }

        // Scrolling down → hide. Scrolling up → show.
        if (Math.abs(y - lastY) > threshold) {
            if (y > lastY) {
                nav.classList.add('nav-hidden');    // scrolling down
            } else {
                nav.classList.remove('nav-hidden'); // scrolling up
            }
            lastY = y;
        }
    }, { passive: true });
}

document.addEventListener('DOMContentLoaded', loadNavbar);