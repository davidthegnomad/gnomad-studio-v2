/**
 * McDaniel Family Chiropractic - Main Script
 * Handles mobile interaction, sticky header, and scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');

            // Animate hamburger to X
            const bars = mobileBtn.querySelectorAll('.bar');
            if (mobileMenu.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                // Reset hamburger
                const bars = mobileBtn.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // --- Sticky Header Scroll Effect ---
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // --- Business Hours Logic ---
    const updateOpenStatus = () => {
        const container = document.getElementById('open-status-container');
        if (!container) return;

        const now = new Date();
        const day = now.getDay(); // 0 (Sun) to 6 (Sat)
        const hour = now.getHours();
        const minutes = now.getMinutes();
        const currentTime = hour + minutes / 60;

        // Mon-Fri: 9:00 AM - 5:00 PM
        const opens = 9;
        const closes = 17;

        let isOpen = false;
        let statusMessage = "";
        let nextOpenMessage = "";

        if (day >= 1 && day <= 5) { // Mon-Fri
            if (currentTime >= opens && currentTime < closes) {
                isOpen = true;
                statusMessage = "Open Now";
            } else if (currentTime < opens) {
                statusMessage = "Closed";
                nextOpenMessage = "Opens at 9:00 AM today";
            } else {
                statusMessage = "Closed";
                if (day === 5) { // Friday after 5pm
                    nextOpenMessage = "Opens Monday at 9:00 AM";
                } else {
                    nextOpenMessage = "Opens tomorrow at 9:00 AM";
                }
            }
        } else { // Weekend
            statusMessage = "Closed";
            if (day === 0) { // Sunday
                nextOpenMessage = "Opens tomorrow at 9:00 AM";
            } else { // Saturday
                nextOpenMessage = "Opens Monday at 9:00 AM";
            }
        }

        container.innerHTML = `
            <div class="status-bubble ${isOpen ? 'status-open' : 'status-closed'}">
                <span class="status-dot"></span>
                <div class="status-content">
                    <span class="status-text">${statusMessage}</span>
                    ${!isOpen ? `<span class="next-open">${nextOpenMessage}</span>` : ''}
                </div>
            </div>
        `;
    };

    updateOpenStatus();
    // Update every minute
    setInterval(updateOpenStatus, 60000);

});
