/**
 * NEXORIUM TRADING ACADEMY - MAIN JAVASCRIPT
 * Funcionalidades principales para todas las páginas
 */

// =============================================================================
// INICIALIZACIÓN GLOBAL
// =============================================================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 NEXORIUM: Sistema iniciado correctamente");

  // Inicializar todas las funcionalidades
  initializeIntersectionObserver();
  initializeScrollEffects();
  initializeCounters();
  initializeTradingBoard();
  initializeParallaxEffects();
  initializeTooltips();

  // Efectos específicos por página
  const currentPage = getCurrentPage();
  initPageSpecificFeatures(currentPage);
});

// =============================================================================
// INTERSECTION OBSERVER PARA ANIMACIONES
// =============================================================================

function initializeIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;

        // Añadir clase visible
        element.classList.add("visible");

        // Efectos específicos según el tipo de elemento
        if (element.classList.contains("counter")) {
          animateCounter(element);
        }

        if (element.classList.contains("progress-bar")) {
          animateProgressBar(element);
        }

        // Dejar de observar una vez animado
        observer.unobserve(element);
      }
    });
  }, observerOptions);

  // Observar elementos animables
  const animatableElements = document.querySelectorAll(`
        .course-card,
        .signal-card,
        .method-card,
        .team-card,
        .certification-card,
        .professor-card,
        .value-card,
        .faq-item,
        .timeline-item,
        .methodology-phase,
        .package-card,
        .table-row,
        [data-element-id],
        [data-section-id]
    `);

  animatableElements.forEach((element) => {
    observer.observe(element);
  });
}

// =============================================================================
// CONTADORES ANIMADOS
// =============================================================================

function initializeCounters() {
  // Los contadores se ejecutarán cuando sean visibles por el observer
}

function animateCounter(element) {
  const target =
    parseInt(element.dataset.target) ||
    parseInt(element.textContent.replace(/[^\d]/g, ""));
  const duration = parseInt(element.dataset.duration) || 2000;
  const increment = target / (duration / 50);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    // Formatear el número según el tipo
    if (element.classList.contains("percentage")) {
      element.textContent = current.toFixed(1) + "%";
    } else if (element.classList.contains("currency")) {
      element.textContent = "$" + Math.floor(current).toLocaleString();
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 50);
}

// =============================================================================
// EFECTOS DE SCROLL
// =============================================================================

function initializeScrollEffects() {
  let ticking = false;

  function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Parallax para elementos hero
    const parallaxElements = document.querySelectorAll(".parallax-element");
    parallaxElements.forEach((element) => {
      element.style.transform = `translateY(${rate}px)`;
    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  });
}

// =============================================================================
// TRADING BOARD EN TIEMPO REAL
// =============================================================================

function initializeTradingBoard() {
  const tradingBoards = document.querySelectorAll(".trading-board");

  tradingBoards.forEach((board) => {
    // Actualizar tiempo cada segundo
    updateBoardTime(board);
    setInterval(() => updateBoardTime(board), 1000);

    // Simular actualizaciones de señales
    simulateSignalUpdates(board);
  });
}

function updateBoardTime(board) {
  const timeElement = board.querySelector(".board-time");
  if (timeElement) {
    timeElement.textContent = new Date().toLocaleTimeString();
  }
}

function simulateSignalUpdates(board) {
  const signals = board.querySelectorAll(".live-signal");

  signals.forEach((signal, index) => {
    setInterval(() => {
      const confidenceBar = signal.querySelector(".confidence-fill");
      if (confidenceBar) {
        const currentWidth = parseInt(confidenceBar.style.width) || 85;
        const newWidth = Math.max(
          75,
          Math.min(98, currentWidth + (Math.random() - 0.5) * 4)
        );
        confidenceBar.style.width = newWidth + "%";

        const confidenceValue = signal.querySelector(
          ".signal-confidence span:last-child"
        );
        if (confidenceValue) {
          confidenceValue.textContent = newWidth.toFixed(1) + "%";
        }
      }
    }, 3000 + index * 1000);
  });
}

// =============================================================================
// EFECTOS PARALLAX
// =============================================================================

function initializeParallaxEffects() {
  const parallaxElements = document.querySelectorAll(
    ".floating-card, .stat-card"
  );

  parallaxElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.2}s`;
  });
}

// =============================================================================
// TOOLTIPS Y HOVER EFFECTS
// =============================================================================

function initializeTooltips() {
  // Crear tooltips dinámicos para elementos con data-tooltip
  const tooltipElements = document.querySelectorAll("[data-tooltip]");

  tooltipElements.forEach((element) => {
    element.addEventListener("mouseenter", showTooltip);
    element.addEventListener("mouseleave", hideTooltip);
  });
}

function showTooltip(e) {
  const text = e.target.dataset.tooltip;
  if (!text) return;

  const tooltip = document.createElement("div");
  tooltip.className = "custom-tooltip";
  tooltip.textContent = text;
  document.body.appendChild(tooltip);

  const rect = e.target.getBoundingClientRect();
  tooltip.style.left =
    rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
  tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + "px";

  setTimeout(() => tooltip.classList.add("visible"), 10);
}

function hideTooltip() {
  const tooltip = document.querySelector(".custom-tooltip");
  if (tooltip) {
    tooltip.remove();
  }
}

// =============================================================================
// FUNCIONES ESPECÍFICAS POR PÁGINA
// =============================================================================

function getCurrentPage() {
  const hash = window.location.hash.substring(1);
  return hash || "inicio";
}

function initPageSpecificFeatures(page) {
  switch (page) {
    case "cursos":
      initializeCursosFeatures();
      break;
    case "academy":
      initializeAcademiaFeatures();
      break;
    case "senales":
      initializeSenalesFeatures();
      break;
    case "nosotros":
      initializeNosotrosFeatures();
      break;
    case "contacto":
      initializeContactoFeatures();
      break;
    default:
      initializeHomeFeatures();
  }
}

// CARACTERÍSTICAS ESPECÍFICAS DE CURSOS
function initializeCursosFeatures() {
  // Filtros de categorías
  const filterTabs = document.querySelectorAll(".filter-tab");
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remover active de todos
      filterTabs.forEach((t) => t.classList.remove("active"));
      // Añadir active al clickeado
      tab.classList.add("active");

      // Filtrar cursos (esto se maneja en React, pero podemos añadir efectos)
      addFilterEffect(tab);
    });
  });

  // Hover effects para course cards
  const courseCards = document.querySelectorAll(".course-card");
  courseCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });
}

function addFilterEffect(tab) {
  // Crear efecto de ondas en el filtro
  const ripple = document.createElement("div");
  ripple.className = "filter-ripple";
  tab.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// CARACTERÍSTICAS ESPECÍFICAS DE ACADEMIA
function initializeAcademiaFeatures() {
  // Tabs de academia
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      addTabClickEffect(btn);
    });
  });

  // Testimonials carousel automático
  const testimonials = document.querySelectorAll(".testimonial-card");
  if (testimonials.length > 1) {
    let currentTestimonial = 0;
    setInterval(() => {
      testimonials[currentTestimonial].style.opacity = "0";
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      testimonials[currentTestimonial].style.opacity = "1";
    }, 6000);
  }
}

function addTabClickEffect(btn) {
  btn.style.transform = "scale(0.95)";
  setTimeout(() => {
    btn.style.transform = "scale(1)";
  }, 150);
}

// CARACTERÍSTICAS ESPECÍFICAS DE SEÑALES
function initializeSenalesFeatures() {
  // Actualizar estadísticas en tiempo real
  updateLiveStats();
  setInterval(updateLiveStats, 5000);

  // Efectos de pulso en señales activas
  const activeSignals = document.querySelectorAll(
    '.signal-card[data-status="ACTIVE"]'
  );
  activeSignals.forEach((signal) => {
    signal.classList.add("pulse-border");
  });

  // Simular nuevas señales
  simulateNewSignals();
}

function updateLiveStats() {
  const statNumbers = document.querySelectorAll(".stat-number");
  statNumbers.forEach((stat) => {
    if (stat.textContent.includes(",")) {
      const current = parseInt(stat.textContent.replace(/,/g, ""));
      const newValue = current + Math.floor(Math.random() * 10);
      stat.textContent = newValue.toLocaleString();
    }
  });
}

function simulateNewSignals() {
  // Añadir efectos de "nueva señal" ocasionalmente
  setInterval(() => {
    const signalCards = document.querySelectorAll(".signal-card");
    if (signalCards.length > 0) {
      const randomCard =
        signalCards[Math.floor(Math.random() * signalCards.length)];
      randomCard.classList.add("new-signal-pulse");
      setTimeout(() => {
        randomCard.classList.remove("new-signal-pulse");
      }, 2000);
    }
  }, 15000);
}

// CARACTERÍSTICAS ESPECÍFICAS DE NOSOTROS
function initializeNosotrosFeatures() {
  // Línea de tiempo interactiva
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("visible");
    }, index * 300);
  });

  // Rotación de testimonios
  initializeTestimonialsRotation();
}

function initializeTestimonialsRotation() {
  const dots = document.querySelectorAll(".nav-dot, .dot");
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      // Lógica de cambio de testimonio (manejada por React)
      addDotClickEffect(dot);
    });
  });
}

function addDotClickEffect(dot) {
  dot.style.transform = "scale(1.3)";
  setTimeout(() => {
    dot.style.transform = "scale(1)";
  }, 200);
}

// CARACTERÍSTICAS ESPECÍFICAS DE CONTACTO
function initializeContactoFeatures() {
  // Validación en tiempo real del formulario
  const form = document.querySelector(".contact-form");
  if (form) {
    const inputs = form.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.addEventListener("blur", validateInput);
      input.addEventListener("input", clearValidationError);
    });
  }

  // Efectos en el mapa de oficinas
  const mapPins = document.querySelectorAll(".map-pin");
  mapPins.forEach((pin) => {
    pin.addEventListener("click", () => {
      addMapPinEffect(pin);
    });
  });

  // Typing indicator en el preview
  animateTypingIndicator();
}

function validateInput(e) {
  const input = e.target;
  const value = input.value.trim();

  // Remover errores previos
  input.classList.remove("error");

  // Validaciones específicas
  if (input.type === "email" && value && !isValidEmail(value)) {
    showInputError(input, "Email inválido");
  } else if (input.required && !value) {
    showInputError(input, "Campo requerido");
  }
}

function clearValidationError(e) {
  const input = e.target;
  input.classList.remove("error");
  const errorMsg = input.parentNode.querySelector(".error-message");
  if (errorMsg) errorMsg.remove();
}

function showInputError(input, message) {
  input.classList.add("error");

  // Crear mensaje de error si no existe
  let errorMsg = input.parentNode.querySelector(".error-message");
  if (!errorMsg) {
    errorMsg = document.createElement("div");
    errorMsg.className = "error-message";
    input.parentNode.appendChild(errorMsg);
  }
  errorMsg.textContent = message;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function addMapPinEffect(pin) {
  pin.style.transform = "translate(-50%, -100%) scale(1.4)";
  setTimeout(() => {
    pin.style.transform = "translate(-50%, -100%) scale(1.2)";
  }, 200);
}

function animateTypingIndicator() {
  const typingDots = document.querySelectorAll(".typing-dot");
  typingDots.forEach((dot, index) => {
    setInterval(() => {
      dot.style.animationDelay = `${index * 0.2}s`;
    }, 1400);
  });
}

// CARACTERÍSTICAS ESPECÍFICAS DE HOME
function initializeHomeFeatures() {
  // Carrusel de texto animado
  initializeTextCarousel();

  // Carruseles automáticos
  initializeAutoCarousels();
}

function initializeTextCarousel() {
  const textElement = document.querySelector(".animated-text");
  if (!textElement) return;

  const texts = [
    "Maestro del Trading",
    "Experto en Forex",
    "Trader Profesional",
    "Financieramente Libre",
  ];
  let currentIndex = 0;

  setInterval(() => {
    textElement.style.opacity = "0";
    setTimeout(() => {
      textElement.textContent = texts[currentIndex];
      textElement.style.opacity = "1";
      currentIndex = (currentIndex + 1) % texts.length;
    }, 300);
  }, 3000);
}

function initializeAutoCarousels() {
  // Carrusel de cursos
  const courseSlides = document.querySelectorAll(".course-slide");
  if (courseSlides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
      courseSlides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % courseSlides.length;
      courseSlides[currentSlide].classList.add("active");
    }, 4000);
  }
}

// =============================================================================
// EFECTOS VISUALES ADICIONALES
// =============================================================================

function animateProgressBar(element) {
  const percentage = element.dataset.percentage || 85;
  const bar = element.querySelector(".progress-fill");
  if (bar) {
    setTimeout(() => {
      bar.style.width = percentage + "%";
    }, 300);
  }
}

// =============================================================================
// UTILIDADES GLOBALES
// =============================================================================

// Función para crear efectos de partículas
function createParticleEffect(element, color = "#ff4757") {
  for (let i = 0; i < 6; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            animation: particle-burst 0.6s ease-out forwards;
        `;

    element.appendChild(particle);

    const angle = (360 / 6) * i;
    const distance = 30;
    const x = Math.cos((angle * Math.PI) / 180) * distance;
    const y = Math.sin((angle * Math.PI) / 180) * distance;

    particle.style.setProperty("--x", x + "px");
    particle.style.setProperty("--y", y + "px");

    setTimeout(() => particle.remove(), 600);
  }
}

// Función para smooth scroll personalizado
function smoothScrollTo(target, duration = 800) {
  const targetElement =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!targetElement) return;

  const startPosition = window.pageYOffset;
  const targetPosition =
    targetElement.getBoundingClientRect().top + startPosition - 100;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// =============================================================================
// ESTILOS CSS DINÁMICOS
// =============================================================================

// Añadir estilos CSS para efectos dinámicos
const dynamicStyles = document.createElement("style");
dynamicStyles.textContent = `
    .custom-tooltip {
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 500;
        z-index: 1000;
        opacity: 0;
        transform: translateY(5px);
        transition: all 0.3s ease;
        pointer-events: none;
        border: 1px solid rgba(255, 71, 87, 0.3);
    }

    .custom-tooltip.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .filter-ripple {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        animation: ripple-expand 0.6s ease-out;
    }

    @keyframes ripple-expand {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }

    .pulse-border {
        animation: pulse-border 2s infinite;
    }

    @keyframes pulse-border {
        0%, 100% {
            border-color: rgba(0, 212, 170, 0.2);
        }
        50% {
            border-color: rgba(0, 212, 170, 0.6);
            box-shadow: 0 0 20px rgba(0, 212, 170, 0.3);
        }
    }

    .new-signal-pulse {
        animation: new-signal-pulse 2s ease-out;
    }

    @keyframes new-signal-pulse {
        0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(0, 212, 170, 0.7);
        }
        70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(0, 212, 170, 0);
        }
        100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(0, 212, 170, 0);
        }
    }

    @keyframes particle-burst {
        to {
            transform: translate(var(--x), var(--y));
            opacity: 0;
        }
    }

    .error {
        border-color: #ff4757 !important;
        box-shadow: 0 0 0 3px rgba(255, 71, 87, 0.1) !important;
    }

    .error-message {
        color: #ff4757;
        font-size: 0.8rem;
        margin-top: 4px;
        font-weight: 500;
    }
`;

document.head.appendChild(dynamicStyles);

// =============================================================================
// EXPORTAR FUNCIONES PARA USO GLOBAL
// =============================================================================

window.NexoriumJS = {
  smoothScrollTo,
  createParticleEffect,
  animateCounter,
  showTooltip,
  hideTooltip,
};

console.log("✅ NEXORIUM: JavaScript principal cargado correctamente");
