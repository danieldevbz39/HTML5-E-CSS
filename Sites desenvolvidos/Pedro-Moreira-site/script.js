document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const header = document.getElementById("header");
    const navLinks = document.querySelectorAll(".nav-link");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");
    const galleryItems = document.querySelectorAll(".gallery-item img");
    const newsletterForm = document.getElementById("newsletter-form");

    // Mobile menu
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const icon = menuToggle.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            const icon = menuToggle.querySelector("i");
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        });
    });

    // Header scroll effect
    window.addEventListener("scroll", () => {
        if (window.scrollY > 60) {
            header.style.backgroundColor = "rgba(11, 11, 11, 0.97)";
            header.style.boxShadow = "0 4px 30px rgba(0,0,0,0.4)";
        } else {
            header.style.backgroundColor = "rgba(11, 11, 11, 0.9)";
            header.style.boxShadow = "none";
        }
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll("section[id]");
    const observerNav = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove("active");
                        if (link.getAttribute("href") === `#${entry.target.id}`) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        },
        { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(section => observerNav.observe(section));

    // Scroll reveal
    const revealElements = document.querySelectorAll(".reveal");
    const observerReveal = new IntersectionObserver(
        entries => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add("visible"), i * 80);
                    observerReveal.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );
    revealElements.forEach(el => observerReveal.observe(el));

    // Animated counters
    const statNums = document.querySelectorAll(".stat-num");
    const observerStats = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observerStats.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );
    statNums.forEach(el => observerStats.observe(el));

    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target;
        }
        requestAnimationFrame(update);
    }

    // Gallery lightbox
    galleryItems.forEach(img => {
        img.closest(".gallery-item").addEventListener("click", () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", e => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    // Newsletter form
    newsletterForm.addEventListener("submit", e => {
        e.preventDefault();
        const input = newsletterForm.querySelector("input");
        if (input.value.trim()) {
            input.value = "";
            alert("Obrigado! Você foi inscrito na nossa newsletter.");
        }
    });

    // Parallax on hero
    const heroBg = document.querySelector(".hero-bg");
    if (heroBg) {
        window.addEventListener("scroll", () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrolled * 0.25}px)`;
            }
        });
    }
});
