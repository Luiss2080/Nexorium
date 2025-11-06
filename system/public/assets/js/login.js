/**
 * NEXORIUM TRADING ACADEMY - LOGIN JAVASCRIPT
 * Funcionalidades interactivas para la página de login
 */

// =============================================================================
// INICIALIZACIÓN
// =============================================================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("🔐 NEXORIUM Login: Sistema iniciado");

  // Inicializar todas las funcionalidades
  initializeFormValidation();
  initializePasswordToggle();
  initializeAnimations();
  initializeSocialLinks();
  initializeCounters();

  // Efectos visuales
  initializeParticleEffects();
  initializeTypingEffect();
});

// =============================================================================
// VALIDACIÓN DEL FORMULARIO
// =============================================================================

function initializeFormValidation() {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("loginButton");

  if (!form || !emailInput || !passwordInput || !loginButton) return;

  // Validación en tiempo real
  emailInput.addEventListener("input", () => validateEmail(emailInput));
  emailInput.addEventListener("blur", () => validateEmail(emailInput));

  passwordInput.addEventListener("input", () =>
    validatePassword(passwordInput)
  );
  passwordInput.addEventListener("blur", () => validatePassword(passwordInput));

  // Envío del formulario
  form.addEventListener("submit", handleFormSubmit);

  // Enter key navigation
  emailInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordInput.focus();
    }
  });

  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (validateForm()) {
        form.submit();
      }
    }
  });
}

function validateEmail(input) {
  const emailError = document.getElementById("emailError");
  const email = input.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Limpiar error previo
  clearInputError(input, emailError);

  if (email === "") {
    showInputError(input, emailError, "El email es requerido");
    return false;
  }

  if (!emailRegex.test(email)) {
    showInputError(input, emailError, "Formato de email inválido");
    return false;
  }

  showInputSuccess(input);
  return true;
}

function validatePassword(input) {
  const passwordError = document.getElementById("passwordError");
  const password = input.value;

  // Limpiar error previo
  clearInputError(input, passwordError);

  if (password === "") {
    showInputError(input, passwordError, "La contraseña es requerida");
    return false;
  }

  if (password.length < 6) {
    showInputError(
      input,
      passwordError,
      "La contraseña debe tener al menos 6 caracteres"
    );
    return false;
  }

  showInputSuccess(input);
  return true;
}

function showInputError(input, errorElement, message) {
  input.style.borderColor = "var(--border-error)";
  input.style.boxShadow = "0 0 0 3px rgba(255, 71, 87, 0.1)";
  errorElement.textContent = message;

  // Añadir animación de error
  input.classList.add("error-shake");
  setTimeout(() => input.classList.remove("error-shake"), 600);
}

function showInputSuccess(input) {
  input.style.borderColor = "rgba(0, 212, 170, 0.5)";
  input.style.boxShadow = "0 0 0 3px rgba(0, 212, 170, 0.1)";
}

function clearInputError(input, errorElement) {
  input.style.borderColor = "var(--border-color)";
  input.style.boxShadow = "none";
  errorElement.textContent = "";
}

function validateForm() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const isEmailValid = validateEmail(emailInput);
  const isPasswordValid = validatePassword(passwordInput);

  return isEmailValid && isPasswordValid;
}

// =============================================================================
// MANEJO DEL ENVÍO DEL FORMULARIO
// =============================================================================

function handleFormSubmit(e) {
  e.preventDefault();

  if (!validateForm()) {
    showFormError("Por favor, corrige los errores antes de continuar");
    return;
  }

  const loginButton = document.getElementById("loginButton");
  const buttonText = loginButton.querySelector(".button-text");
  const buttonLoader = loginButton.querySelector(".button-loader");

  // Mostrar estado de carga
  loginButton.classList.add("loading");
  loginButton.disabled = true;

  // Simular delay de autenticación
  setTimeout(() => {
    // Enviar el formulario
    e.target.submit();
  }, 1500);
}

function showFormError(message) {
  const existingAlert = document.querySelector(".alert-error");
  if (existingAlert) {
    existingAlert.remove();
  }

  const alert = createAlert("error", message);
  const formHeader = document.querySelector(".form-header");
  formHeader.insertAdjacentElement("afterend", alert);

  // Auto-remove después de 5 segundos
  setTimeout(() => {
    alert.style.opacity = "0";
    setTimeout(() => alert.remove(), 300);
  }, 5000);
}

function createAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;

  const icon = type === "error" ? "⚠️" : "✅";

  alert.innerHTML = `
        <div class="alert-icon">${icon}</div>
        <div class="alert-message">${message}</div>
    `;

  return alert;
}

// =============================================================================
// TOGGLE DE CONTRASEÑA
// =============================================================================

function initializePasswordToggle() {
  const passwordToggle = document.getElementById("passwordToggle");
  const passwordInput = document.getElementById("password");

  if (!passwordToggle || !passwordInput) return;

  passwordToggle.addEventListener("click", function () {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;

    // Cambiar icono
    const toggleIcon = passwordToggle.querySelector(".toggle-icon");
    toggleIcon.textContent = type === "password" ? "👁️" : "🙈";

    // Efecto visual
    passwordToggle.style.transform = "scale(0.9)";
    setTimeout(() => {
      passwordToggle.style.transform = "scale(1)";
    }, 150);

    // Mantener foco en el input
    passwordInput.focus();
  });
}

// =============================================================================
// ANIMACIONES Y EFECTOS VISUALES
// =============================================================================

function initializeAnimations() {
  // Observador de intersección para animaciones
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observar elementos animables
  const animatableElements = document.querySelectorAll(`
        .stat-item,
        .feature-item,
        .input-group,
        .social-button
    `);

  animatableElements.forEach((element) => {
    observer.observe(element);
  });

  // Efectos hover personalizados
  initializeHoverEffects();
}

function initializeHoverEffects() {
  // Botones con efecto ripple
  const buttons = document.querySelectorAll(
    ".login-button, .social-button, .demo-fill-btn"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      createRippleEffect(e, this);
    });
  });

  // Stats con animación hover
  const statItems = document.querySelectorAll(".stat-item");
  statItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

function createRippleEffect(event, element) {
  const ripple = document.createElement("div");
  ripple.className = "ripple-effect";

  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;

  element.style.position = "relative";
  element.style.overflow = "hidden";
  element.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// =============================================================================
// CONTADORES ANIMADOS
// =============================================================================

function initializeCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 50);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      // Formatear según el contenido
      if (counter.textContent.includes("%")) {
        counter.textContent = Math.floor(current) + "%";
      } else if (counter.textContent.includes("/")) {
        counter.textContent = Math.floor(current) + "/7";
      } else {
        counter.textContent = Math.floor(current).toLocaleString() + "+";
      }
    }, 50);
  });
}

// =============================================================================
// LOGIN SOCIAL
// =============================================================================

function initializeSocialLinks() {
  const socialLinks = document.querySelectorAll(".social-link");

  socialLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const platform = this.classList[1]; // tiktok, facebook, instagram, whatsapp
      handleSocialLink(platform);
    });
  });

  // Register link
  const registerLink = document.getElementById("registerMainLink");
  if (registerLink) {
    registerLink.addEventListener("click", function (e) {
      e.preventDefault();
      showContactModal();
    });
  }
}

function handleSocialLink(platform) {
  let message = "";
  let action = "";

  switch (platform) {
    case "trading-signals":
      message =
        "🚀 Accede a nuestras señales VIP de trading con alta precisión y rentabilidad comprobada.";
      action = "Ver Señales VIP";
      break;
    case "academy":
      message =
        "🎓 Únete a nuestra academia profesional y aprende las estrategias de trading más avanzadas.";
      action = "Ir a Academia Pro";
      break;
    case "community":
      message =
        "👥 Conecta con traders profesionales y comparte estrategias en nuestra comunidad exclusiva.";
      action = "Unirse a Comunidad";
      break;
    case "support":
      message =
        "💬 Nuestro equipo de soporte está disponible 24/7 para resolver tus dudas de trading.";
      action = "Contactar Soporte";
      break;
    case "tiktok":
      message =
        "🎵 Síguenos en TikTok para tips rápidos de trading y contenido exclusivo.";
      action = "Seguir en TikTok";
      break;
    case "facebook":
      message =
        "📘 Únete a nuestra comunidad en Facebook para análisis de mercado y noticias.";
      action = "Seguir en Facebook";
      break;
    case "instagram":
      message =
        "📷 Sigue nuestro Instagram para gráficos de trading y contenido visual.";
      action = "Seguir en Instagram";
      break;
    case "whatsapp":
      message =
        "💬 Contacta directamente con nuestro equipo vía WhatsApp para soporte inmediato.";
      action = "Contactar por WhatsApp";
      break;
    default:
      return;
  }

  showSocialModal(platform, message, action);
}

function showSocialModal(platform, message, action) {
  const modal = document.createElement("div");
  modal.className = "social-modal";
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>💎 NEXORIUM Trading Academy</h3>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <p>${message}</p>
        <p><strong>Esta funcionalidad estará disponible próximamente.</strong></p>
        <p>Mientras tanto, utiliza las credenciales de demo para explorar la plataforma.</p>
        <div class="modal-actions">
          <button class="btn-modal-primary">${action}</button>
          <button class="btn-modal-secondary">Entendido</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Event listeners
  modal.querySelector(".modal-close").addEventListener("click", () => {
    modal.remove();
  });

  modal.querySelector(".btn-modal-secondary").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });

  // Auto-remove después de 8 segundos
  setTimeout(() => {
    if (modal.parentNode) {
      modal.remove();
    }
  }, 8000);
}

function showContactModal() {
  const modal = document.createElement("div");
  modal.className = "social-modal";
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>💎 Acceso VIP - NEXORIUM</h3>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <p><strong>¿Quieres formar parte de la élite del trading?</strong></p>
        <p>Solicita tu acceso exclusivo a NEXORIUM Trading Academy y únete a los traders más exitosos.</p>
        <div class="contact-options">
          <div class="contact-item">
            <strong>📧 Admisiones:</strong> admissions@nexorium.com
          </div>
          <div class="contact-item">
            <strong>� WhatsApp VIP:</strong> +1 (555) 987-6543
          </div>
          <div class="contact-item">
            <strong>📞 Mesa de ayuda:</strong> +1 (555) 123-4567
          </div>
          <div class="contact-item">
            <strong>� Acceso Demo:</strong> admin@nexorium.com / admin123
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Event listeners
  modal.querySelector(".modal-close").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });

  // Auto-remove después de 12 segundos
  setTimeout(() => {
    if (modal.parentNode) {
      modal.remove();
    }
  }, 12000);
}

// =============================================================================
// EFECTOS DE PARTÍCULAS
// =============================================================================

function initializeParticleEffects() {
  // Crear partículas flotantes
  const particleContainer = document.createElement("div");
  particleContainer.className = "particle-container";
  particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;

  document.body.appendChild(particleContainer);

  // Generar partículas
  for (let i = 0; i < 20; i++) {
    setTimeout(() => createParticle(particleContainer), i * 200);
  }

  // Regenerar partículas cada 10 segundos
  setInterval(() => {
    createParticle(particleContainer);
  }, 10000);
}

function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "floating-particle";

  const size = Math.random() * 4 + 2;
  const startX = Math.random() * window.innerWidth;
  const duration = Math.random() * 10 + 10;
  const delay = Math.random() * 2;

  particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 71, 87, 0.3);
        border-radius: 50%;
        left: ${startX}px;
        bottom: -10px;
        animation: floatUp ${duration}s linear ${delay}s infinite;
    `;

  container.appendChild(particle);

  // Remover después de la animación
  setTimeout(() => {
    if (particle.parentNode) {
      particle.remove();
    }
  }, (duration + delay) * 1000);
}

// =============================================================================
// EFECTO DE TYPING
// =============================================================================

function initializeTypingEffect() {
  const welcomeTitle = document.querySelector(".welcome-title");
  if (!welcomeTitle) return;

  const originalText = welcomeTitle.textContent;
  const texts = [
    "¡Bienvenido de vuelta!",
    "¡Listo para operar!",
    "¡Tu éxito nos inspira!",
    "¡Alcanza tus metas!",
  ];

  let currentIndex = 0;

  setInterval(() => {
    welcomeTitle.style.opacity = "0";

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      welcomeTitle.textContent = texts[currentIndex];
      welcomeTitle.style.opacity = "1";
    }, 500);
  }, 4000);
}

// =============================================================================
// UTILIDADES GLOBALES
// =============================================================================

// Función para mostrar notificaciones
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">${
              type === "error" ? "⚠️" : type === "success" ? "✅" : "ℹ️"
            }</div>
            <div class="notification-message">${message}</div>
        </div>
    `;

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "error"
            ? "rgba(255, 71, 87, 0.9)"
            : type === "success"
            ? "rgba(0, 212, 170, 0.9)"
            : "rgba(255, 255, 255, 0.9)"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;

  document.body.appendChild(notification);

  // Animación de entrada
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto-remove
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Función para debug
function debugLogin() {
  console.log("🔐 NEXORIUM Login Debug:", {
    form: document.getElementById("loginForm"),
    email: document.getElementById("email")?.value,
    password: document.getElementById("password")?.value
      ? "[HIDDEN]"
      : "[EMPTY]",
    validation: {
      email: validateEmail(document.getElementById("email")),
      password: validatePassword(document.getElementById("password")),
    },
  });
}

// =============================================================================
// ESTILOS CSS DINÁMICOS
// =============================================================================

// Añadir estilos CSS para efectos dinámicos
const dynamicStyles = document.createElement("style");
dynamicStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes floatUp {
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes error-shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .error-shake {
        animation: error-shake 0.3s ease-in-out;
    }
    
    .social-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    }
    
    .modal-content {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        padding: var(--spacing-lg);
        max-width: 400px;
        width: 90%;
        text-align: center;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-md);
    }
    
    .modal-close {
        background: none;
        border: none;
        color: var(--text-muted);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 4px;
        transition: var(--transition-fast);
    }
    
    .modal-close:hover {
        color: var(--text-primary);
        background: rgba(255, 255, 255, 0.1);
    }
`;

document.head.appendChild(dynamicStyles);

// =============================================================================
// EXPORTAR FUNCIONES GLOBALES
// =============================================================================

window.NexoriumLogin = {
  validateForm,
  showNotification,
  debugLogin,
  createRippleEffect,
};

console.log("✅ NEXORIUM Login: JavaScript cargado correctamente");
