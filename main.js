// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.05,
        multiplier: 0.5
    });

    // Initialize Swiper for Gallery
    const gallerySwiper = new Swiper('.gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animation
    gsap.from('.hero-content h1', {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power4.out'
    });

    gsap.from('.hero-content p', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.5,
        ease: 'power4.out'
    });

    gsap.from('.hero-buttons', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 1,
        ease: 'power4.out'
    });

    // Parallax Effect
    document.addEventListener('mousemove', (e) => {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed');
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            element.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });

    // Scroll Progress Bar
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Navbar Scroll Effect
    const nav = document.querySelector('.main-nav');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    // Menu Category Switching
    const menuCategories = document.querySelectorAll('.menu-category');
    const menuItems = document.querySelectorAll('.menu-item');

    menuCategories.forEach(category => {
        category.addEventListener('click', () => {
            menuCategories.forEach(c => c.classList.remove('active'));
            category.classList.add('active');
            
            const selectedCategory = category.getAttribute('data-category');
            
            menuItems.forEach(item => {
                if (item.getAttribute('data-category') === selectedCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                scroll.scrollTo(target, {
                    offset: -80,
                    duration: 1000,
                    easing: [0.25, 0.1, 0.25, 1]
                });
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Fade Up Animation for Sections
    const fadeUpElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeUpElements.forEach(element => observer.observe(element));

    // Event Listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Add your newsletter subscription logic here
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });

    // Remove loading screen after everything is initialized
    setTimeout(() => {
        const loader = document.querySelector('.loading');
        loader.classList.add('hidden');
    }, 1000);
}); 