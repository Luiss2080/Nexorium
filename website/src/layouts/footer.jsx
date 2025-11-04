import React, { useEffect } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Importar el script del footer cuando el componente se monta
    const script = document.createElement("script");
    script.src = "/javaScript/footer.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup: remover el script cuando el componente se desmonta
    return () => {
      const existingScript = document.querySelector(
        'script[src="/javaScript/footer.js"]'
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer-wrapper">
        {/* Contenido Principal del Footer */}
        <div className="footer-main">
          <div className="footer-container">
            {/* Sección de Contacto */}
            <div className="footer-section footer-contact">
              <h3 className="footer-title">Contacto</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div className="contact-text">
                    <span>Av. Tecnológica #456</span>
                    <span>Santa Cruz, Bolivia</span>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <span>+591 3 789-0123</span>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <span>info@nexorium.edu.bo</span>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                  </div>
                  <div className="contact-text">
                    <span>Lun - Vie: 7:00 - 19:00</span>
                    <span>Sáb: 8:00 - 12:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección del Sistema */}
            <div className="footer-section footer-system">
              <h3 className="footer-title">Sistema</h3>
              <div className="system-links">
                <a href="#dashboard" className="system-link">
                  <div className="system-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                    </svg>
                  </div>
                  Dashboard
                </a>

                <a href="#estudiantes" className="system-link">
                  <div className="system-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  Estudiantes
                </a>

                <a href="#cursos" className="system-link">
                  <div className="system-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                    </svg>
                  </div>
                  Cursos
                </a>

                <a href="#biblioteca" className="system-link">
                  <div className="system-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
                    </svg>
                  </div>
                  Biblioteca
                </a>

                <a href="#materiales" className="system-link">
                  <div className="system-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                    </svg>
                  </div>
                  Materiales
                </a>

                <a href="#usuarios" className="system-link">
                  <div className="system-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M16 7c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5 5-2.24 5-5zm-5 6c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  Usuarios
                </a>
              </div>
            </div>

            {/* Sección NEXORIUM */}
            <div className="footer-section footer-nexorium">
              <h3 className="footer-title">NEXORIUM</h3>
              <div className="nexorium-content">
                <p className="nexorium-description">
                  Academia de excelencia en trading y tecnología financiera.
                  Formamos profesionales capacitados para liderar la revolución
                  tecnológica del futuro.
                </p>

                <div className="nexorium-features">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span>Certificado</span>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <span>Innovador</span>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <span>Accesible</span>
                  </div>
                </div>

                <div className="version-info">
                  <div className="version-badge">Versión 2.0</div>
                  <span className="build-info">Build #2025.1</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección del Logo y Redes Sociales */}
        <div className="footer-brand">
          <div className="footer-brand-container">
            <div className="footer-logo">
              <img
                src="/images/LogoNexorium.png"
                alt="NEXORIUM Trading Academy"
                className="footer-logo-image"
              />
              <div className="footer-logo-text">
                <span className="footer-logo-name">NEXORIUM</span>
                <span className="footer-logo-tagline">
                  Academia de Robótica y Tecnología
                </span>
              </div>
            </div>

            <div className="footer-social">
              <a
                href="#"
                className="social-link facebook"
                aria-label="Facebook"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="#"
                className="social-link instagram"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.23 2.471c3.807 0 7.299 0 7.299 0s3.492.193 4.514 1.215c1.022 1.022 1.215 4.514 1.215 4.514s0 3.492 0 7.299 0 7.299 0 7.299-.193 3.492-1.215 4.514c-1.022 1.022-4.514 1.215-4.514 1.215s-3.492 0-7.299 0-7.299 0-7.299 0-.193-3.492-1.215-4.514C2.708 19.021 2.515 15.529 2.515 15.529s0-3.492 0-7.299 0-7.299 0-7.299S2.708 4.439 3.73 3.417C4.752 2.395 8.23 2.471 8.23 2.471zM12.017 7.552c-2.455 0-4.434 1.979-4.434 4.434s1.979 4.434 4.434 4.434 4.434-1.979 4.434-4.434-1.979-4.434-4.434-4.434zm0 1.638c1.549 0 2.796 1.247 2.796 2.796s-1.247 2.796-2.796 2.796-2.796-1.247-2.796-2.796 1.247-2.796 2.796-2.796zm5.408-2.882c0 .573-.464 1.037-1.037 1.037s-1.037-.464-1.037-1.037.464-1.037 1.037-1.037 1.037.464 1.037 1.037z" />
                </svg>
              </a>

              <a href="#" className="social-link twitter" aria-label="Twitter">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>

              <a
                href="#"
                className="social-link whatsapp"
                aria-label="WhatsApp"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.085" />
                </svg>
              </a>

              <a
                href="#"
                className="social-link linkedin"
                aria-label="LinkedIn"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a href="#" className="social-link youtube" aria-label="YouTube">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-container">
            <div className="footer-copyright">
              <span>
                © {currentYear} Instituto Nexorium. Todos los derechos
                reservados.
              </span>
            </div>
            <div className="footer-links">
              <a href="#privacy" className="footer-link">
                Política de Privacidad
              </a>
              <span className="footer-separator">|</span>
              <a href="#terms" className="footer-link">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
