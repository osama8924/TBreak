/* ========================================
   Navbar Toggle & Navigation
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = document.querySelector('.navbar').contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    /* ========================================
       Search Functionality
       ======================================== */
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            performSearch(query);
        }
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                performSearch(query);
            }
        }
    });

    function performSearch(query) {
        console.log('Searching for:', query);
        // Filter menu items based on search query
        const menuCards = document.querySelectorAll('.item-card');
        let found = 0;

        menuCards.forEach(card => {
            const title = card.querySelector('.item-info h3').textContent.toLowerCase();
            const description = card.querySelector('.item-info p').textContent.toLowerCase();
            
            if (title.includes(query.toLowerCase()) || description.includes(query.toLowerCase())) {
                card.style.display = 'block';
                found++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show message if no results
        if (found === 0) {
            console.log('No items found for:', query);
            alert('لم نجد نتائج لـ: ' + query);
        }
    }

    /* ========================================
       Scroll Active Link Highlighting
       ======================================== */
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section, main');
        let currentSection = '';

        sections.forEach(section => {
            if (section.id) {
                const rect = section.getBoundingClientRect();
                if (rect.top > 0 && rect.top < window.innerHeight / 2) {
                    currentSection = section.id;
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection) && currentSection) {
                link.classList.add('active');
            }
        });
    });

    /* ========================================
       Smooth Scrolling
       ======================================== */
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    /* ========================================
       Order Button Action
       ======================================== */
    const orderBtn = document.querySelector('.order-btn');
    if (orderBtn) {
        orderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Redirect to messaging or booking page
            const message = encodeURIComponent('أرغب في طلب وجبة من TBreak');
            window.location.href = `https://wa.me/?text=${message}`;
        });
    }
});

/* ========================================
   Navbar Background Change on Scroll
   ======================================== */
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 8px 30px rgba(255, 102, 0, 0.25)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(255, 102, 0, 0.15)';
        navbar.style.backdropFilter = 'none';
    }
});
