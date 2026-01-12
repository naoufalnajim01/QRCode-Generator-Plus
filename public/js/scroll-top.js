/**
 * scroll-top.js - Scroll to top button functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    if (!scrollTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
