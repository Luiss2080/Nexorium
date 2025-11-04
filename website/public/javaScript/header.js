// NEXORIUM TRADING ACADEMY - HEADER JS
// Funcionalidades del encabezado

document.addEventListener("DOMContentLoaded", function () {
  // Elementos del DOM
  const header = document.querySelector(".header");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-link");

  // Estado del menú móvil
  let isMobileMenuOpen = false;

  // ===== SCROLL EFFECT =====
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  }

  // ===== MOBILE MENU TOGGLE =====
  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;

    if (isMobileMenuOpen) {
      nav.classList.add("nav-mobile-open");
      mobileMenuBtn.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevenir scroll
    } else {
      nav.classList.remove("nav-mobile-open");
      mobileMenuBtn.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // ===== ACTIVE LINK HIGHLIGHT =====
  function updateActiveLink() {
    const currentSection = getCurrentSection();

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");

      if (href === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  // ===== GET CURRENT SECTION =====
  function getCurrentSection() {
    const sections = [
      "inicio",
      "cursos",
      "academy",
      "senales",
      "nosotros",
      "contacto",
    ];

    for (let section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          return section;
        }
      }
    }

    return "inicio"; // Default
  }

  // ===== SMOOTH SCROLL =====
  function smoothScrollToSection(targetId) {
    const targetElement = document.getElementById(targetId.substring(1));

    if (targetElement) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }

  // ===== EVENT LISTENERS =====

  // Scroll effect
  window.addEventListener("scroll", () => {
    handleScroll();
    updateActiveLink();
  });

  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  }

  // Navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Solo para anchors internos
      if (href.startsWith("#")) {
        e.preventDefault();
        smoothScrollToSection(href);

        // Cerrar menú móvil si está abierto
        if (isMobileMenuOpen) {
          toggleMobileMenu();
        }
      }
    });
  });

  // Cerrar menú móvil al hacer click fuera
  document.addEventListener("click", (e) => {
    if (
      isMobileMenuOpen &&
      !nav.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      toggleMobileMenu();
    }
  });

  // Cerrar menú móvil al cambiar tamaño de ventana
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && isMobileMenuOpen) {
      toggleMobileMenu();
    }
  });

  // ===== LOGO ANIMATION =====
  const logoContainer = document.querySelector(".logo-container");
  if (logoContainer) {
    logoContainer.addEventListener("mouseenter", () => {
      logoContainer.style.transform = "scale(1.05)";
    });

    logoContainer.addEventListener("mouseleave", () => {
      logoContainer.style.transform = "scale(1)";
    });
  }

  // ===== INITIALIZE =====
  handleScroll();
  updateActiveLink();

  console.log("🚀 NEXORIUM Header: Inicializado correctamente");
});
