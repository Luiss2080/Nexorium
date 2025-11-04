// NEXORIUM TRADING ACADEMY - FOOTER JS
// Animaciones y funcionalidades del pie de página

document.addEventListener("DOMContentLoaded", function () {
  // ===== ELEMENTOS DEL DOM =====
  const footer = document.querySelector(".footer");
  const footerSections = document.querySelectorAll(".footer-section");
  const contactItems = document.querySelectorAll(".contact-item");
  const systemLinks = document.querySelectorAll(".system-link");
  const socialLinks = document.querySelectorAll(".social-link");
  const featureItems = document.querySelectorAll(".feature-item");
  const versionBadge = document.querySelector(".version-badge");
  const footerLogo = document.querySelector(".footer-logo");

  // ===== INTERSECTION OBSERVER PARA ANIMACIONES DE ENTRADA =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");

        // Animar elementos hijos con delay progresivo
        if (entry.target.classList.contains("footer-section")) {
          animateFooterSection(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observar secciones del footer
  footerSections.forEach((section) => {
    footerObserver.observe(section);
  });

  // ===== ANIMACIÓN DE SECCIONES CON DELAY =====
  function animateFooterSection(section) {
    const children = section.querySelectorAll(
      ".contact-item, .system-link, .feature-item"
    );

    children.forEach((child, index) => {
      setTimeout(() => {
        child.classList.add("animate-slide-in");
      }, index * 100); // Delay progresivo de 100ms
    });
  }

  // ===== EFECTO HOVER AVANZADO PARA ITEMS DE CONTACTO =====
  contactItems.forEach((item) => {
    const icon = item.querySelector(".contact-icon");

    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateX(10px) scale(1.02)";
      item.style.boxShadow = "0 8px 25px rgba(255, 0, 0, 0.2)";

      if (icon) {
        icon.style.transform = "rotate(360deg) scale(1.2)";
        icon.style.color = "#ff6600";
      }
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateX(0) scale(1)";
      item.style.boxShadow = "";

      if (icon) {
        icon.style.transform = "rotate(0deg) scale(1)";
        icon.style.color = "#ff0000";
      }
    });
  });

  // ===== ANIMACIÓN AVANZADA PARA ENLACES DEL SISTEMA =====
  systemLinks.forEach((link, index) => {
    const icon = link.querySelector(".system-icon");

    link.addEventListener("mouseenter", () => {
      link.style.transform = "translateX(15px) scale(1.05)";
      link.style.background = "rgba(255, 0, 0, 0.15)";

      if (icon) {
        icon.style.transform = "rotate(360deg) scale(1.3)";
        icon.style.color = "#ff6600";
      }

      // Efecto de ondas
      createRippleEffect(link, "rgba(255, 0, 0, 0.3)");
    });

    link.addEventListener("mouseleave", () => {
      link.style.transform = "translateX(0) scale(1)";
      link.style.background = "";

      if (icon) {
        icon.style.transform = "rotate(0deg) scale(1)";
        icon.style.color = "#ff0000";
      }
    });

    // Animación de aparición escalonada
    setTimeout(() => {
      link.classList.add("system-link-visible");
    }, index * 150);
  });

  // ===== ANIMACIONES AVANZADAS PARA REDES SOCIALES =====
  socialLinks.forEach((link, index) => {
    link.addEventListener("mouseenter", () => {
      // Efecto de elevación y rotación
      link.style.transform = "translateY(-8px) rotate(360deg) scale(1.15)";
      link.style.boxShadow = "0 12px 30px rgba(255, 0, 0, 0.4)";

      // Efecto de pulso
      link.classList.add("social-pulse");

      // Crear partículas
      createParticleEffect(link);
    });

    link.addEventListener("mouseleave", () => {
      link.style.transform = "translateY(0) rotate(0deg) scale(1)";
      link.style.boxShadow = "";
      link.classList.remove("social-pulse");
    });

    // Animación de entrada con delay
    setTimeout(() => {
      link.classList.add("social-animate-in");
    }, index * 100 + 500);
  });

  // ===== ANIMACIÓN DEL LOGO DEL FOOTER =====
  if (footerLogo) {
    const logoImage = footerLogo.querySelector(".footer-logo-image");
    const logoText = footerLogo.querySelector(".footer-logo-name");

    footerLogo.addEventListener("mouseenter", () => {
      footerLogo.style.transform = "scale(1.08)";

      if (logoImage) {
        logoImage.style.transform = "rotate(360deg) scale(1.2)";
        logoImage.style.filter =
          "brightness(1.5) drop-shadow(0 0 20px rgba(255, 0, 0, 0.8))";
      }

      if (logoText) {
        logoText.style.textShadow = "0 0 20px rgba(255, 0, 0, 0.8)";
      }
    });

    footerLogo.addEventListener("mouseleave", () => {
      footerLogo.style.transform = "scale(1)";

      if (logoImage) {
        logoImage.style.transform = "rotate(0deg) scale(1)";
        logoImage.style.filter = "";
      }

      if (logoText) {
        logoText.style.textShadow = "";
      }
    });
  }

  // ===== ANIMACIÓN DE CARACTERÍSTICAS =====
  featureItems.forEach((item, index) => {
    const icon = item.querySelector(".feature-icon");

    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateX(8px) scale(1.05)";

      if (icon) {
        icon.style.transform = "rotate(360deg) scale(1.3)";
        icon.style.color = "#ff6600";
      }
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateX(0) scale(1)";

      if (icon) {
        icon.style.transform = "rotate(0deg) scale(1)";
        icon.style.color = "#ff0000";
      }
    });

    // Animación de pulso periódica
    setInterval(() => {
      if (icon) {
        icon.style.transform = "scale(1.2)";
        setTimeout(() => {
          icon.style.transform = "scale(1)";
        }, 200);
      }
    }, 3000 + index * 500); // Pulsos escalonados
  });

  // ===== ANIMACIÓN DEL BADGE DE VERSIÓN =====
  if (versionBadge) {
    versionBadge.addEventListener("mouseenter", () => {
      versionBadge.style.transform = "scale(1.1) rotate(5deg)";
      versionBadge.style.boxShadow = "0 8px 25px rgba(255, 0, 0, 0.5)";
    });

    versionBadge.addEventListener("mouseleave", () => {
      versionBadge.style.transform = "scale(1) rotate(0deg)";
      versionBadge.style.boxShadow = "";
    });

    // Pulso periódico del badge
    setInterval(() => {
      versionBadge.classList.add("version-pulse");
      setTimeout(() => {
        versionBadge.classList.remove("version-pulse");
      }, 1000);
    }, 5000);
  }

  // ===== EFECTO DE ONDAS (RIPPLE) =====
  function createRippleEffect(element, color = "rgba(255, 255, 255, 0.3)") {
    const ripple = document.createElement("div");
    ripple.classList.add("ripple-effect");

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.background = color;
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s linear";
    ripple.style.pointerEvents = "none";
    ripple.style.zIndex = "1";

    element.style.position = "relative";
    element.style.overflow = "hidden";
    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // ===== EFECTO DE PARTÍCULAS =====
  function createParticleEffect(element) {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        const rect = element.getBoundingClientRect();
        particle.style.position = "fixed";
        particle.style.left = rect.left + rect.width / 2 + "px";
        particle.style.top = rect.top + rect.height / 2 + "px";
        particle.style.width = "4px";
        particle.style.height = "4px";
        particle.style.background = "#ff0000";
        particle.style.borderRadius = "50%";
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "9999";

        const angle = i * 60 * (Math.PI / 180);
        const velocity = 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        particle.style.transform = `translate(${vx}px, ${vy}px) scale(0)`;
        particle.style.transition =
          "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        particle.style.opacity = "0";

        document.body.appendChild(particle);

        setTimeout(() => {
          particle.remove();
        }, 800);
      }, i * 50);
    }
  }

  // ===== SCROLL TO TOP FUNCTIONALITY =====
  const scrollToTopBtn = document.createElement("div");
  scrollToTopBtn.classList.add("scroll-to-top");
  scrollToTopBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
    </svg>
  `;
  footer.appendChild(scrollToTopBtn);

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Mostrar/ocultar botón scroll to top
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  // ===== EFECTO PARALLAX SUTIL =====
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.05;

    if (footer) {
      footer.style.transform = `translateY(${rate}px)`;
    }
  });

  // ===== TYPING EFFECT PARA DESCRIPCIÓN =====
  const description = document.querySelector(".nexorium-description");
  if (description) {
    const text = description.textContent;
    description.textContent = "";

    // Observar cuando el texto entre en vista
    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            typeText(description, text, 50);
            textObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    textObserver.observe(description);
  }

  function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(timer);
      }
    }, speed);
  }

  // ===== CONTADOR ANIMADO PARA BUILD NUMBER =====
  const buildInfo = document.querySelector(".build-info");
  if (buildInfo && buildInfo.textContent.includes("#2025.1")) {
    animateCounter(buildInfo, 2025, 1);
  }

  function animateCounter(element, targetYear, targetBuild) {
    let currentYear = 2020;
    let currentBuild = 1;

    const yearTimer = setInterval(() => {
      currentYear++;
      element.textContent = `Build #${currentYear}.${currentBuild}`;

      if (currentYear >= targetYear) {
        clearInterval(yearTimer);
      }
    }, 50);
  }

  // ===== INICIALIZACIÓN =====
  console.log("🎯 NEXORIUM Footer: Animaciones inicializadas correctamente");

  // Agregar clases CSS dinámicas
  addDynamicStyles();

  function addDynamicStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
      }
      
      .animate-slide-in {
        animation: slideInLeft 0.6s ease-out forwards;
      }
      
      .system-link-visible {
        animation: bounceIn 0.6s ease-out forwards;
      }
      
      .social-animate-in {
        animation: zoomIn 0.5s ease-out forwards;
      }
      
      .social-pulse {
        animation: pulse 0.8s ease-in-out infinite;
      }
      
      .version-pulse {
        animation: versionPulse 1s ease-in-out;
      }
      
      .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(255, 0, 0, 0.3);
      }
      
      .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
      }
      
      .scroll-to-top:hover {
        transform: scale(1.1) rotate(360deg);
        box-shadow: 0 8px 25px rgba(255, 0, 0, 0.5);
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes bounceIn {
        0% {
          opacity: 0;
          transform: scale(0.3) translateY(20px);
        }
        50% {
          transform: scale(1.05) translateY(-5px);
        }
        70% {
          transform: scale(0.9) translateY(2px);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      
      @keyframes zoomIn {
        from {
          opacity: 0;
          transform: scale(0);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
      }
      
      @keyframes versionPulse {
        0% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
        }
        70% {
          transform: scale(1.1);
          box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
        }
        100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
        }
      }
      
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      /* Transiciones suaves para elementos */
      .contact-item, .system-link, .social-link, .feature-item, .footer-logo {
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      .contact-icon, .system-icon, .feature-icon {
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      .footer-logo-image {
        transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
    `;
    document.head.appendChild(style);
  }
});
