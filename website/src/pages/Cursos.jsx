import React, { useState, useEffect, useRef } from "react";

const Cursos = () => {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [visibleCourses, setVisibleCourses] = useState(new Set());
  const observerRef = useRef();

  const categories = [
    { id: "todos", name: "Todos los Cursos", icon: "🎯" },
    { id: "principiante", name: "Principiante", icon: "🌟" },
    { id: "intermedio", name: "Intermedio", icon: "📈" },
    { id: "avanzado", name: "Avanzado", icon: "🚀" },
    { id: "vip", name: "VIP Elite", icon: "👑" },
  ];

  const courses = [
    {
      id: 1,
      title: "Forex para Principiantes",
      description:
        "Aprende los fundamentos del mercado de divisas desde cero. Curso completo con estrategias probadas.",
      price: 199,
      originalPrice: 299,
      image: "📊",
      level: "principiante",
      duration: "6 semanas",
      students: "2,847",
      rating: 4.9,
      lessons: 45,
      certificate: true,
      highlights: [
        "Análisis técnico básico",
        "Gestión de riesgo",
        "Psicología del trading",
        "MetaTrader 4/5",
      ],
    },
    {
      id: 2,
      title: "Trading Avanzado Pro",
      description:
        "Estrategias profesionales para traders experimentados. Técnicas institucionales y algoritmos avanzados.",
      price: 499,
      originalPrice: 699,
      image: "🚀",
      level: "avanzado",
      duration: "12 semanas",
      students: "1,234",
      rating: 4.8,
      lessons: 89,
      certificate: true,
      highlights: [
        "Algoritmos institucionales",
        "Order Flow",
        "Market Making",
        "Backtesting avanzado",
      ],
    },
    {
      id: 3,
      title: "Índices Sintéticos Master",
      description:
        "Domina los mercados sintéticos de alta volatilidad. Estrategias exclusivas para índices artificiales.",
      price: 349,
      originalPrice: 449,
      image: "⚡",
      level: "intermedio",
      duration: "8 semanas",
      students: "987",
      rating: 4.7,
      lessons: 67,
      certificate: true,
      highlights: [
        "Volatility Indices",
        "Crash & Boom",
        "Jump Indices",
        "Estrategias de scalping",
      ],
    },
    {
      id: 4,
      title: "Análisis Técnico Profesional",
      description:
        "Interpreta gráficos como un experto institucional. Patrones avanzados y confluencias técnicas.",
      price: 299,
      originalPrice: 399,
      image: "📉",
      level: "intermedio",
      duration: "10 semanas",
      students: "1,567",
      rating: 4.9,
      lessons: 78,
      certificate: true,
      highlights: [
        "Patrones armónicos",
        "Elliott Wave",
        "Fibonacci avanzado",
        "Volume Profile",
      ],
    },
    {
      id: 5,
      title: "Elite VIP Mentorship",
      description:
        "Mentoría personalizada 1:1 con traders institucionales. Acceso exclusivo a señales premium.",
      price: 1999,
      originalPrice: 2999,
      image: "👑",
      level: "vip",
      duration: "24 semanas",
      students: "156",
      rating: 5.0,
      lessons: "Ilimitado",
      certificate: true,
      highlights: [
        "Mentoría 1:1",
        "Señales premium",
        "Room trading privado",
        "Capital funding",
      ],
    },
    {
      id: 6,
      title: "Criptomonedas & DeFi",
      description:
        "Trading profesional de criptomonedas y finanzas descentralizadas. Del spot al futuro.",
      price: 399,
      originalPrice: 549,
      image: "₿",
      level: "avanzado",
      duration: "14 semanas",
      students: "743",
      rating: 4.6,
      lessons: 92,
      certificate: true,
      highlights: [
        "DeFi trading",
        "NFT flipping",
        "Yield farming",
        "Arbitraje cripto",
      ],
    },
  ];

  const filteredCourses =
    selectedCategory === "todos"
      ? courses
      : courses.filter((course) => course.level === selectedCategory);

  // Intersection Observer para animaciones
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const courseId = parseInt(entry.target.dataset.courseId);
            setVisibleCourses((prev) => new Set([...prev, courseId]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const courseElements = document.querySelectorAll(".course-card");
    courseElements.forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [filteredCourses]);

  const openCourseModal = (course) => {
    setSelectedCourse(course);
    document.body.style.overflow = "hidden";
  };

  const closeCourseModal = () => {
    setSelectedCourse(null);
    document.body.style.overflow = "";
  };

  return (
    <div className="cursos-page">
      {/* Hero Section */}
      <section className="cursos-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🎓</span>
              <span>+15,000 Estudiantes Exitosos</span>
            </div>
            <h1 className="hero-title">
              Transforma tu Futuro con Nuestros
              <span className="gradient-text"> Cursos de Trading</span>
            </h1>
            <p className="hero-description">
              Desde principiante hasta trader profesional. Metodología probada
              que ha generado +$50M en ganancias para nuestros estudiantes.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">96.8%</span>
                <span className="stat-label">Tasa de Éxito</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Soporte</span>
              </div>
              <div className="stat">
                <span className="stat-number">ISO 9001</span>
                <span className="stat-label">Certificado</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card profit-card">
              <div className="card-header">
                <span className="card-icon">💰</span>
                <span className="card-title">Profit Today</span>
              </div>
              <div className="card-value success">+$24,750</div>
            </div>
            <div className="floating-card students-card">
              <div className="card-header">
                <span className="card-icon">👥</span>
                <span className="card-title">Estudiantes Activos</span>
              </div>
              <div className="card-value">15,247</div>
            </div>
            <div className="floating-card success-card">
              <div className="card-header">
                <span className="card-icon">📊</span>
                <span className="card-title">Tasa de Éxito</span>
              </div>
              <div className="card-value success">96.8%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros de Categorías */}
      <section className="courses-filters">
        <div className="container">
          <div className="filter-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-tab ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Cursos */}
      <section className="courses-grid-section">
        <div className="container">
          <div className="courses-grid">
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                className={`course-card ${
                  visibleCourses.has(course.id) ? "visible" : ""
                }`}
                data-course-id={course.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="course-card-inner">
                  <div className="course-image">
                    <div className="course-icon">{course.image}</div>
                    <div className="course-badge">{course.level}</div>
                    {course.originalPrice > course.price && (
                      <div className="discount-badge">
                        {Math.round(
                          ((course.originalPrice - course.price) /
                            course.originalPrice) *
                            100
                        )}
                        % OFF
                      </div>
                    )}
                  </div>

                  <div className="course-content">
                    <div className="course-meta">
                      <span className="course-students">
                        👥 {course.students}
                      </span>
                      <div className="course-rating">
                        <span className="stars">⭐</span>
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-description">{course.description}</p>

                    <div className="course-highlights">
                      {course.highlights.slice(0, 2).map((highlight, idx) => (
                        <span key={idx} className="highlight-tag">
                          ✓ {highlight}
                        </span>
                      ))}
                    </div>

                    <div className="course-info">
                      <div className="course-duration">⏱ {course.duration}</div>
                      <div className="course-lessons">
                        📚 {course.lessons} lecciones
                      </div>
                      {course.certificate && (
                        <div className="course-certificate">🏆 Certificado</div>
                      )}
                    </div>

                    <div className="course-footer">
                      <div className="course-pricing">
                        <span className="current-price">${course.price}</span>
                        {course.originalPrice > course.price && (
                          <span className="original-price">
                            ${course.originalPrice}
                          </span>
                        )}
                      </div>

                      <button
                        className="btn btn-primary course-btn"
                        onClick={() => openCourseModal(course)}
                      >
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de Curso */}
      {selectedCourse && (
        <div className="course-modal-overlay" onClick={closeCourseModal}>
          <div className="course-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeCourseModal}>
              ✕
            </button>

            <div className="modal-header">
              <div className="modal-icon">{selectedCourse.image}</div>
              <div className="modal-title-area">
                <h2>{selectedCourse.title}</h2>
                <div className="modal-meta">
                  <span className="modal-rating">
                    ⭐ {selectedCourse.rating}
                  </span>
                  <span className="modal-students">
                    👥 {selectedCourse.students} estudiantes
                  </span>
                  <span className="modal-level">{selectedCourse.level}</span>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <p className="modal-description">{selectedCourse.description}</p>

              <div className="modal-highlights">
                <h4>Lo que aprenderás:</h4>
                <div className="highlights-grid">
                  {selectedCourse.highlights.map((highlight, idx) => (
                    <div key={idx} className="highlight-item">
                      <span className="highlight-check">✓</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-details">
                <div className="detail-item">
                  <span className="detail-icon">⏱</span>
                  <span>{selectedCourse.duration}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📚</span>
                  <span>{selectedCourse.lessons} lecciones</span>
                </div>
                {selectedCourse.certificate && (
                  <div className="detail-item">
                    <span className="detail-icon">🏆</span>
                    <span>Certificado incluido</span>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <div className="modal-pricing">
                <span className="modal-current-price">
                  ${selectedCourse.price}
                </span>
                {selectedCourse.originalPrice > selectedCourse.price && (
                  <span className="modal-original-price">
                    ${selectedCourse.originalPrice}
                  </span>
                )}
              </div>
              <button className="btn btn-primary modal-enroll-btn">
                Inscribirse Ahora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sección de Garantía */}
      <section className="guarantee-section">
        <div className="container">
          <div className="guarantee-content">
            <div className="guarantee-icon">🛡️</div>
            <h2>Garantía de 30 Días</h2>
            <p>
              Si no estás 100% satisfecho con tu curso, te devolvemos tu dinero
              sin preguntas.
            </p>
            <div className="guarantee-features">
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Reembolso completo</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Sin preguntas</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Proceso rápido</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cursos;
