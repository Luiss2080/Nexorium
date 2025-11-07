import React, { useState, useEffect } from "react";

const Header = ({ currentView, changeView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);

    // Prevenir scroll del body cuando el menú móvil está abierto
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const handleNavClick = (e, view) => {
    e.preventDefault();

    // Cambiar la vista usando la función del App
    changeView(view);

    // Actualizar la URL hash
    window.history.pushState(null, null, `#${view}`);

    // Cerrar menú móvil si está abierto
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <header className={`header ${isScrolled ? "header-scrolled" : ""}`}>
      <div className="header-wrapper">
        <div className="header-container">
          {/* Logo Profesional */}
          <div className="logo-container">
            <img
              src="/images/LogoNexorium.png"
              alt="NEXORIUM Trading Academy"
              className="logo-image"
            />
            <div className="logo-text-container">
              <span className="logo-text">NEXORIUM</span>
              <span className="logo-tagline">Trading Academy</span>
            </div>
          </div>

          {/* Navegación Profesional */}
          <nav className={`nav ${isMobileMenuOpen ? "nav-mobile-open" : ""}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <a
                  href="#inicio"
                  className={`nav-link ${
                    currentView === "inicio" ? "active" : ""
                  }`}
                  onClick={(e) => handleNavClick(e, "inicio")}
                >
                  <span>Inicio</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#cursos"
                  className={`nav-link ${
                    currentView === "cursos" ? "active" : ""
                  }`}
                  onClick={(e) => handleNavClick(e, "cursos")}
                >
                  <span>Cursos</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#academy"
                  className={`nav-link ${
                    currentView === "academy" ? "active" : ""
                  }`}
                  onClick={(e) => handleNavClick(e, "academy")}
                >
                  <span>Academia</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#senales"
                  className={`nav-link ${
                    currentView === "senales" ? "active" : ""
                  }`}
                  onClick={(e) => handleNavClick(e, "senales")}
                >
                  <span>Señales</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#nosotros"
                  className={`nav-link ${
                    currentView === "nosotros" ? "active" : ""
                  }`}
                  onClick={(e) => handleNavClick(e, "nosotros")}
                >
                  <span>Nosotros</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#contacto"
                  className={`nav-link ${
                    currentView === "contacto" ? "active" : ""
                  }`}
                  onClick={(e) => handleNavClick(e, "contacto")}
                >
                  <span>Contacto</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Buscador del Header */}
          <div className="header-search">
            <div className="search-container">
              <input
                type="text"
                placeholder="¿Qué quieres aprender?"
                className="search-input"
              />
              <button className="search-btn">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Acciones del Header */}
          <div className="header-actions">
            <div className="auth-buttons">
              <a
                href="http://localhost/Nexorium/system/app/auth/login.php"
                className="btn btn-ghost"
                target="_blank"
              >
                <span>Iniciar Sesión</span>
              </a>
              <a href="#registro" className="btn btn-primary">
                <span>Únete Ahora</span>
              </a>
            </div>

            {/* Botón Móvil */}
            <button
              className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
              onClick={toggleMobileMenu}
              aria-label="Menú móvil"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
