import React, { useState, useEffect, useRef } from "react";

const Academia = () => {
  const [activeTab, setActiveTab] = useState("metodologia");
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const observerRef = useRef();

  const tabs = [
    { id: "metodologia", name: "Metodología", icon: "🎯" },
    { id: "certificaciones", name: "Certificaciones", icon: "🏆" },
    { id: "profesores", name: "Profesores", icon: "👨‍🏫" },
    { id: "tecnologia", name: "Tecnología", icon: "💻" },
  ];

  const certifications = [
    {
      id: 1,
      name: "Trader Certificado NEXORIUM",
      level: "Básico",
      duration: "3 meses",
      icon: "🥉",
      requirements: [
        "Completar curso básico",
        "Aprobar examen teórico",
        "Demostrar rentabilidad en demo",
      ],
      benefits: [
        "Certificado digital",
        "Badge LinkedIn",
        "Acceso comunidad básica",
      ],
    },
    {
      id: 2,
      name: "Trader Profesional NEXORIUM",
      level: "Intermedio",
      duration: "6 meses",
      icon: "🥈",
      requirements: [
        "Certificación básica",
        "200+ operaciones rentables",
        "Curso avanzado completado",
      ],
      benefits: [
        "Certificado físico",
        "Descuentos especiales",
        "Acceso room VIP",
        "Señales premium",
      ],
    },
    {
      id: 3,
      name: "Master Trader NEXORIUM",
      level: "Avanzado",
      duration: "12 meses",
      icon: "🥇",
      requirements: [
        "Certificación profesional",
        "Cuenta fondeada $10K+",
        "Mentoría completada",
      ],
      benefits: [
        "Certificado ISO",
        "Revenue sharing",
        "Programa affiliate",
        "Capital funding",
      ],
    },
  ];

  const professors = [
    {
      id: 1,
      name: "Dr. Carlos Mendoza",
      position: "Director Académico",
      specialization: "Análisis Técnico Institucional",
      experience: "15+ años",
      image: "👨‍🏫",
      achievements: [
        "Ex-Goldman Sachs Senior Analyst",
        "PhD en Finanzas Cuantitativas MIT",
        "+$500M en assets under management",
        "Autor de 'Advanced Trading Strategies'",
      ],
      courses: ["Trading Avanzado Pro", "Análisis Institucional"],
      rating: 4.9,
    },
    {
      id: 2,
      name: "Ana Rodriguez",
      position: "Head of Risk Management",
      specialization: "Gestión de Riesgo & Psychology",
      experience: "12+ años",
      image: "👩‍🏫",
      achievements: [
        "Ex-JP Morgan Risk Director",
        "CFA Chartered Financial Analyst",
        "Especialista en Behavioral Finance",
        "Speaker TEDx Financial Psychology",
      ],
      courses: ["Psychology Trading", "Risk Management"],
      rating: 4.8,
    },
    {
      id: 3,
      name: "Luis Silva",
      position: "Crypto & DeFi Specialist",
      specialization: "Criptomonedas & Blockchain",
      experience: "8+ años",
      image: "👨‍💻",
      achievements: [
        "Binance Advisory Board Member",
        "Ethereum Foundation Grant Recipient",
        "Founder of 3 DeFi protocols",
        "$100M+ in DeFi transactions",
      ],
      courses: ["Crypto Master", "DeFi Trading"],
      rating: 4.7,
    },
  ];

  const testimonials = [
    {
      name: "María González",
      position: "Estudiante Destacada 2024",
      image: "👩‍💼",
      text: "La metodología de NEXORIUM es increíble. En 8 meses pasé de no saber nada a tener una cuenta fondeada de $50K.",
      profit: "+420%",
      country: "🇲🇽 México",
      certification: "Master Trader",
    },
    {
      name: "Roberto Silva",
      position: "Ex-Ingeniero",
      image: "👨‍💻",
      text: "Dejé mi trabajo de ingeniería gracias a lo que aprendí en NEXORIUM. Ahora vivo del trading profesionalmente.",
      profit: "+280%",
      country: "🇨🇴 Colombia",
      certification: "Trader Profesional",
    },
    {
      name: "Carmen López",
      position: "Empresaria",
      image: "👩‍🚀",
      text: "La certificación NEXORIUM me abrió puertas increíbles. Ahora gestiono carteras de inversión institucionales.",
      profit: "+350%",
      country: "🇪🇸 España",
      certification: "Master Trader",
    },
  ];

  const methodology = [
    {
      phase: "Fase 1",
      title: "Fundamentos Sólidos",
      duration: "4-6 semanas",
      icon: "🏗️",
      description: "Construimos las bases teóricas indispensables",
      topics: [
        "Mercados financieros globales",
        "Análisis técnico fundamental",
        "Plataformas y herramientas",
        "Psicología del trader principiante",
      ],
    },
    {
      phase: "Fase 2",
      title: "Estrategias Avanzadas",
      duration: "8-10 semanas",
      icon: "⚡",
      description: "Desarrollo de estrategias probadas y rentables",
      topics: [
        "Patrones chartistas avanzados",
        "Algoritmos de trading",
        "Gestión avanzada de riesgo",
        "Backtesting y optimización",
      ],
    },
    {
      phase: "Fase 3",
      title: "Trading en Vivo",
      duration: "12+ semanas",
      icon: "🚀",
      description: "Aplicación práctica con capital real supervisado",
      topics: [
        "Room de trading en vivo",
        "Mentoría personalizada 1:1",
        "Evaluación de performance",
        "Preparación para funding",
      ],
    },
  ];

  // Intersection Observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.dataset.sectionId;
            setVisibleSections((prev) => new Set([...prev, sectionId]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const sections = document.querySelectorAll("[data-section-id]");
    sections.forEach((section) => {
      observerRef.current.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "metodologia":
        return (
          <div className="methodology-content">
            <div className="methodology-intro">
              <h3>Metodología Probada Científicamente</h3>
              <p>
                Nuestra metodología ha sido desarrollada y refinada durante más
                de 10 años, combinando técnicas institucionales con innovación
                tecnológica para crear traders exitosos y consistentemente
                rentables.
              </p>
            </div>
            <div className="methodology-phases">
              {methodology.map((phase, index) => (
                <div
                  key={phase.phase}
                  className={`methodology-phase ${
                    visibleSections.has(`phase-${index}`) ? "visible" : ""
                  }`}
                  data-section-id={`phase-${index}`}
                >
                  <div className="phase-icon">{phase.icon}</div>
                  <div className="phase-content">
                    <div className="phase-header">
                      <span className="phase-number">{phase.phase}</span>
                      <h4>{phase.title}</h4>
                      <span className="phase-duration">{phase.duration}</span>
                    </div>
                    <p className="phase-description">{phase.description}</p>
                    <ul className="phase-topics">
                      {phase.topics.map((topic, idx) => (
                        <li key={idx}>✓ {topic}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "certificaciones":
        return (
          <div className="certifications-content">
            <div className="certifications-intro">
              <h3>Certificaciones Reconocidas Internacionalmente</h3>
              <p>
                Nuestras certificaciones son reconocidas por las principales
                instituciones financieras y prop firms a nivel mundial.
              </p>
            </div>
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <div
                  key={cert.id}
                  className={`certification-card ${
                    visibleSections.has(`cert-${index}`) ? "visible" : ""
                  }`}
                  data-section-id={`cert-${index}`}
                >
                  <div className="cert-header">
                    <div className="cert-icon">{cert.icon}</div>
                    <div className="cert-info">
                      <h4>{cert.name}</h4>
                      <span className="cert-level">{cert.level}</span>
                      <span className="cert-duration">⏱ {cert.duration}</span>
                    </div>
                  </div>

                  <div className="cert-requirements">
                    <h5>Requisitos:</h5>
                    <ul>
                      {cert.requirements.map((req, idx) => (
                        <li key={idx}>• {req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="cert-benefits">
                    <h5>Beneficios:</h5>
                    <ul>
                      {cert.benefits.map((benefit, idx) => (
                        <li key={idx}>✓ {benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <button className="btn btn-primary cert-btn">
                    Comenzar Certificación
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "profesores":
        return (
          <div className="professors-content">
            <div className="professors-intro">
              <h3>Aprende de los Mejores</h3>
              <p>
                Nuestro equipo docente está compuesto por ex-traders
                institucionales de las firmas más prestigiosas del mundo.
              </p>
            </div>
            <div className="professors-grid">
              {professors.map((professor, index) => (
                <div
                  key={professor.id}
                  className={`professor-card ${
                    visibleSections.has(`prof-${index}`) ? "visible" : ""
                  }`}
                  data-section-id={`prof-${index}`}
                >
                  <div className="professor-header">
                    <div className="professor-image">{professor.image}</div>
                    <div className="professor-info">
                      <h4>{professor.name}</h4>
                      <p className="professor-position">{professor.position}</p>
                      <div className="professor-meta">
                        <span className="experience">
                          📅 {professor.experience}
                        </span>
                        <div className="rating">
                          <span className="stars">⭐</span>
                          <span>{professor.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="professor-specialization">
                    <strong>Especialización:</strong> {professor.specialization}
                  </div>

                  <div className="professor-achievements">
                    <h5>Logros Destacados:</h5>
                    <ul>
                      {professor.achievements.map((achievement, idx) => (
                        <li key={idx}>🏆 {achievement}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="professor-courses">
                    <h5>Cursos que imparte:</h5>
                    <div className="courses-tags">
                      {professor.courses.map((course, idx) => (
                        <span key={idx} className="course-tag">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "tecnologia":
        return (
          <div className="technology-content">
            <div className="technology-intro">
              <h3>Tecnología de Vanguardia</h3>
              <p>
                Utilizamos las herramientas más avanzadas de la industria para
                garantizar una experiencia de aprendizaje de clase mundial.
              </p>
            </div>

            <div className="tech-features">
              <div className="tech-feature" data-section-id="tech-1">
                <div className="tech-icon">🤖</div>
                <h4>Inteligencia Artificial</h4>
                <p>
                  Algoritmos de ML que analizan tu progreso y personalizan tu
                  experiencia de aprendizaje en tiempo real.
                </p>
              </div>

              <div className="tech-feature" data-section-id="tech-2">
                <div className="tech-icon">📱</div>
                <h4>Plataforma Móvil</h4>
                <p>
                  Accede a todo el contenido desde cualquier dispositivo. Apps
                  nativas para iOS y Android.
                </p>
              </div>

              <div className="tech-feature" data-section-id="tech-3">
                <div className="tech-icon">🔒</div>
                <h4>Seguridad Bancaria</h4>
                <p>
                  Encriptación de grado militar y protocolos de seguridad
                  utilizados por los bancos más grandes del mundo.
                </p>
              </div>

              <div className="tech-feature" data-section-id="tech-4">
                <div className="tech-icon">📊</div>
                <h4>Analytics Avanzado</h4>
                <p>
                  Dashboard personalizado con métricas detalladas de tu progreso
                  y performance en tiempo real.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="academia-page">
      {/* Hero Section */}
      <section className="academia-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🎓</span>
              <span>Academia #1 en Latinoamérica</span>
            </div>
            <h1 className="hero-title">
              La Academia Más
              <span className="gradient-text"> Innovadora</span> del Mundo
            </h1>
            <p className="hero-description">
              Metodología científicamente probada, profesores de clase mundial y
              tecnología de vanguardia para formar traders exitosos.
            </p>
            <div className="hero-metrics">
              <div className="metric">
                <div className="metric-number">500M+</div>
                <div className="metric-label">Ganancias Generadas</div>
              </div>
              <div className="metric">
                <div className="metric-number">96.8%</div>
                <div className="metric-label">Tasa de Éxito</div>
              </div>
              <div className="metric">
                <div className="metric-number">ISO 9001</div>
                <div className="metric-label">Certificado</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="academy-stats">
              <div className="stat-card">
                <div className="stat-icon">🏆</div>
                <div className="stat-info">
                  <div className="stat-number">15,247</div>
                  <div className="stat-label">Estudiantes Exitosos</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🌍</div>
                <div className="stat-info">
                  <div className="stat-number">47</div>
                  <div className="stat-label">Países</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💼</div>
                <div className="stat-info">
                  <div className="stat-number">89%</div>
                  <div className="stat-label">Fondeo Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="academia-tabs">
        <div className="container">
          <div className="tabs-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-name">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="academia-content">
        <div className="container">
          <div className="tab-content">{renderTabContent()}</div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Lo que Dicen Nuestros Graduados</h2>
            <p>Historias reales de transformación profesional</p>
          </div>

          <div className="testimonials-carousel">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-text">
                  "{testimonials[currentTestimonial].text}"
                </div>
                <div className="testimonial-author">
                  <div className="author-image">
                    {testimonials[currentTestimonial].image}
                  </div>
                  <div className="author-info">
                    <div className="author-name">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="author-position">
                      {testimonials[currentTestimonial].position}
                    </div>
                    <div className="author-meta">
                      <span className="profit">
                        {testimonials[currentTestimonial].profit} ROI
                      </span>
                      <span className="country">
                        {testimonials[currentTestimonial].country}
                      </span>
                      <span className="certification">
                        🏆 {testimonials[currentTestimonial].certification}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonials-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${
                    index === currentTestimonial ? "active" : ""
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="academia-cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>¿Listo para Transformar tu Futuro?</h2>
              <p>
                Únete a los miles de estudiantes que ya han cambiado sus vidas
                con nuestra metodología probada.
              </p>
            </div>
            <div className="cta-actions">
              <button className="btn btn-primary cta-btn">
                Comenzar Ahora
              </button>
              <button className="btn btn-ghost cta-btn-secondary">
                Agendar Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academia;
