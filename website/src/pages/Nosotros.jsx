import React, { useState, useEffect, useRef } from "react";

const Nosotros = () => {
  const [activeSection, setActiveSection] = useState("mision");
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stats, setStats] = useState({
    students: 15000,
    countries: 47,
    revenue: 500,
    winRate: 89.6,
  });
  const observerRef = useRef();

  const sections = [
    { id: "mision", name: "Misión & Visión", icon: "🎯" },
    { id: "historia", name: "Historia", icon: "📈" },
    { id: "valores", name: "Valores", icon: "💎" },
    { id: "equipo", name: "Equipo", icon: "👥" },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Dr. Carlos Mendoza",
      position: "Founder & CEO",
      image: "👨‍💼",
      background: "Ex-Goldman Sachs Senior Analyst, PhD MIT",
      experience: "15+ años en mercados institucionales",
      specialization: "Algorithmic Trading & Risk Management",
      achievements: [
        "Gestionó +$2B en assets institucionales",
        "Desarrolló 12 algoritmos patentados",
        "Profesor invitado en Harvard Business School",
        "Autor de 'Institutional Trading Secrets'",
      ],
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      id: 2,
      name: "Ana Rodriguez",
      position: "Chief Technology Officer",
      image: "👩‍💻",
      background: "Ex-Microsoft Senior Engineer, Stanford CS",
      experience: "12+ años en fintech",
      specialization: "AI/ML Trading Systems",
      achievements: [
        "Líder técnico en Binance durante 5 años",
        "Pionera en blockchain trading algorithms",
        "TEDx Speaker 'Future of Trading'",
        "Fundó 2 startups fintech exitosas",
      ],
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      id: 3,
      name: "Luis Silva",
      position: "Head of Research",
      image: "👨‍🔬",
      background: "Ex-JPMorgan Quantitative Analyst, PhD Physics",
      experience: "10+ años en research cuantitativo",
      specialization: "Quantitative Analysis & Market Research",
      achievements: [
        "Desarrolló modelos predictivos para JPM",
        "Publicó 25+ papers en journals financieros",
        "Ganador Bloomberg Trading Competition 2019",
        "Consultor para 3 hedge funds top-tier",
      ],
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      id: 4,
      name: "María González",
      position: "Global Head of Education",
      image: "👩‍🏫",
      background: "Ex-Wharton Professor, CFA Institute Board",
      experience: "18+ años en educación financiera",
      specialization: "Financial Education & Curriculum Development",
      achievements: [
        "Formó +50,000 traders profesionales",
        "Diseñó curriculum para 15 universidades",
        "Autora de 'Psychology of Successful Trading'",
        "Reconocida como Top 10 Finance Educator",
      ],
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
  ];

  const milestones = [
    {
      year: "2019",
      title: "Fundación de NEXORIUM",
      description:
        "Nace la visión de democratizar el trading institucional para traders independientes.",
      icon: "🚀",
    },
    {
      year: "2020",
      title: "Primera Certificación ISO",
      description:
        "Obtenemos certificación ISO 9001 por excelencia en educación financiera.",
      icon: "🏆",
    },
    {
      year: "2021",
      title: "Expansión Internacional",
      description:
        "Llegamos a 25 países y superamos los 5,000 estudiantes activos.",
      icon: "🌍",
    },
    {
      year: "2022",
      title: "Tecnología IA Integrada",
      description:
        "Lanzamos nuestros algoritmos de IA para análisis y señales automatizadas.",
      icon: "🤖",
    },
    {
      year: "2023",
      title: "Partnership Institucional",
      description:
        "Alianza estratégica con prop firms para funding de nuestros graduados.",
      icon: "🤝",
    },
    {
      year: "2024",
      title: "Líder Regional",
      description: "Reconocidos como la #1 Trading Academy en Latinoamérica.",
      icon: "👑",
    },
  ];

  const values = [
    {
      title: "Excelencia",
      description:
        "Buscamos la perfección en cada curso, cada señal, cada interacción con nuestros estudiantes.",
      icon: "⭐",
      color: "#ff4757",
    },
    {
      title: "Transparencia",
      description:
        "Compartimos todos nuestros resultados, tanto éxitos como fracasos, para generar confianza total.",
      icon: "🔍",
      color: "#2ed573",
    },
    {
      title: "Innovación",
      description:
        "Siempre a la vanguardia tecnológica, implementando las herramientas más avanzadas del mercado.",
      icon: "💡",
      color: "#3742fa",
    },
    {
      title: "Integridad",
      description:
        "Actuamos con honestidad y ética en cada decisión, priorizando el éxito de nuestros estudiantes.",
      icon: "🛡️",
      color: "#ff6348",
    },
    {
      title: "Comunidad",
      description:
        "Creamos una red global de traders exitosos que se apoyan mutuamente para crecer juntos.",
      icon: "🤝",
      color: "#ffa502",
    },
    {
      title: "Resultado",
      description:
        "Nos enfocamos en generar resultados tangibles y medibles para cada uno de nuestros estudiantes.",
      icon: "📊",
      color: "#1dd1a1",
    },
  ];

  const testimonials = [
    {
      name: "Roberto Martínez",
      position: "Ex-Estudiante, Ahora Prop Trader",
      image: "👨‍💼",
      text: "NEXORIUM no solo me enseñó a hacer trading, me cambió la vida completamente. Pasé de ser empleado a manejar una cuenta de $250K en una prop firm.",
      country: "🇲🇽 México",
      result: "Cuenta fondeada $250K",
      year: "Graduado 2023",
    },
    {
      name: "Carmen López",
      position: "Trader Independiente",
      image: "👩‍💼",
      text: "La metodología es increíble. En 18 meses generé más dinero que en mis 10 años anteriores como contadora. Ahora soy financieramente libre.",
      country: "🇪🇸 España",
      result: "+€150K generados",
      year: "Graduada 2022",
    },
    {
      name: "Diego Silva",
      position: "Founder Trading Firm",
      image: "👨‍💻",
      text: "Después de graduarme, fundé mi propia firm de trading. Ya tenemos 25 traders trabajando y generamos $2M anuales. Gracias NEXORIUM.",
      country: "🇨🇴 Colombia",
      result: "Fundó firma exitosa",
      year: "Graduado 2021",
    },
  ];

  // Animación de contadores
  useEffect(() => {
    const animateCounter = (target, key, duration = 2000) => {
      const start = 0;
      const increment = target / (duration / 50);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setStats((prev) => ({ ...prev, [key]: Math.floor(current) }));
      }, 50);
    };

    if (visibleElements.has("stats")) {
      animateCounter(15247, "students");
      animateCounter(47, "countries");
      animateCounter(500, "revenue");
      animateCounter(89.6, "winRate");
    }
  }, [visibleElements]);

  // Intersection Observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.dataset.elementId;
            setVisibleElements((prev) => new Set([...prev, elementId]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const elements = document.querySelectorAll("[data-element-id]");
    elements.forEach((element) => {
      observerRef.current.observe(element);
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
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderSectionContent = () => {
    switch (activeSection) {
      case "mision":
        return (
          <div className="mission-content">
            <div className="mission-vision">
              <div className="mission-item" data-element-id="mission">
                <div className="mission-icon">🎯</div>
                <h3>Nuestra Misión</h3>
                <p>
                  Democratizar el acceso al trading institucional de alta
                  calidad, proporcionando educación, herramientas y mentorías de
                  clase mundial para transformar traders independientes en
                  profesionales exitosos y financieramente libres.
                </p>
              </div>

              <div className="mission-item" data-element-id="vision">
                <div className="mission-icon">🌟</div>
                <h3>Nuestra Visión</h3>
                <p>
                  Ser la academia de trading #1 a nivel mundial, reconocida por
                  formar la nueva generación de traders profesionales que
                  lideren la revolución financiera del futuro, con tecnología de
                  vanguardia y metodologías científicamente probadas.
                </p>
              </div>
            </div>

            <div className="impact-stats" data-element-id="stats">
              <h3>Nuestro Impacto Global</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">
                    {stats.students.toLocaleString()}+
                  </div>
                  <div className="stat-label">Estudiantes Formados</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{stats.countries}</div>
                  <div className="stat-label">Países Presentes</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">${stats.revenue}M+</div>
                  <div className="stat-label">Generado por Alumnos</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{stats.winRate}%</div>
                  <div className="stat-label">Tasa de Éxito</div>
                </div>
              </div>
            </div>
          </div>
        );

      case "historia":
        return (
          <div className="history-content">
            <div className="history-intro" data-element-id="history-intro">
              <h3>Nuestra Historia</h3>
              <p>
                NEXORIUM nació de una visión simple pero poderosa: hacer que el
                trading institucional sea accesible para todos. Desde nuestros
                humildes inicios hasta convertirnos en líderes globales, cada
                hito ha sido construido con dedicación y excelencia.
              </p>
            </div>

            <div className="timeline">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`timeline-item ${
                    visibleElements.has(`milestone-${index}`) ? "visible" : ""
                  }`}
                  data-element-id={`milestone-${index}`}
                >
                  <div className="timeline-year">{milestone.year}</div>
                  <div className="timeline-content">
                    <div className="timeline-icon">{milestone.icon}</div>
                    <div className="timeline-text">
                      <h4>{milestone.title}</h4>
                      <p>{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "valores":
        return (
          <div className="values-content">
            <div className="values-intro" data-element-id="values-intro">
              <h3>Nuestros Valores</h3>
              <p>
                Estos valores guían cada decisión que tomamos y definen la
                cultura única que hace de NEXORIUM un lugar especial para
                aprender y crecer profesionalmente.
              </p>
            </div>

            <div className="values-grid">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className={`value-card ${
                    visibleElements.has(`value-${index}`) ? "visible" : ""
                  }`}
                  data-element-id={`value-${index}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className="value-icon"
                    style={{ backgroundColor: value.color }}
                  >
                    {value.icon}
                  </div>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "equipo":
        return (
          <div className="team-content">
            <div className="team-intro" data-element-id="team-intro">
              <h3>Nuestro Equipo de Expertos</h3>
              <p>
                Conoce a los profesionales de clase mundial que han dedicado sus
                carreras a crear la experiencia educativa más avanzada en
                trading e inversiones.
              </p>
            </div>

            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`team-card ${
                    visibleElements.has(`team-${index}`) ? "visible" : ""
                  }`}
                  data-element-id={`team-${index}`}
                >
                  <div className="team-header">
                    <div className="team-image">{member.image}</div>
                    <div className="team-info">
                      <h4>{member.name}</h4>
                      <p className="team-position">{member.position}</p>
                      <p className="team-background">{member.background}</p>
                    </div>
                  </div>

                  <div className="team-details">
                    <div className="team-experience">
                      <strong>Experiencia:</strong> {member.experience}
                    </div>
                    <div className="team-specialization">
                      <strong>Especialización:</strong> {member.specialization}
                    </div>
                  </div>

                  <div className="team-achievements">
                    <h5>Logros Destacados:</h5>
                    <ul>
                      {member.achievements.map((achievement, idx) => (
                        <li key={idx}>🏆 {achievement}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="team-social">
                    <a href={member.social.linkedin} className="social-link">
                      📎 LinkedIn
                    </a>
                    <a href={member.social.twitter} className="social-link">
                      🐦 Twitter
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="nosotros-page">
      {/* Hero Section */}
      <section className="nosotros-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🏆</span>
              <span>Academia #1 en Latinoamérica</span>
            </div>
            <h1 className="hero-title">
              Conoce la Historia detrás de
              <span className="gradient-text"> NEXORIUM</span>
            </h1>
            <p className="hero-description">
              Desde 2019, hemos transformado la vida de más de 15,000 personas,
              convirtiéndolos en traders profesionales exitosos con metodologías
              institucionales y tecnología de vanguardia.
            </p>

            <div className="hero-achievements">
              <div className="achievement">
                <span className="achievement-icon">🎓</span>
                <div className="achievement-info">
                  <span className="achievement-number">15,247+</span>
                  <span className="achievement-label">Graduados Exitosos</span>
                </div>
              </div>
              <div className="achievement">
                <span className="achievement-icon">🌍</span>
                <div className="achievement-info">
                  <span className="achievement-number">47</span>
                  <span className="achievement-label">Países</span>
                </div>
              </div>
              <div className="achievement">
                <span className="achievement-icon">💰</span>
                <div className="achievement-info">
                  <span className="achievement-number">$500M+</span>
                  <span className="achievement-label">
                    Generado por Alumnos
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="company-showcase">
              <div className="showcase-item">
                <div className="showcase-icon">🏆</div>
                <div className="showcase-text">
                  <div className="showcase-title">ISO 9001</div>
                  <div className="showcase-subtitle">
                    Certificado Internacional
                  </div>
                </div>
              </div>
              <div className="showcase-item">
                <div className="showcase-icon">⭐</div>
                <div className="showcase-text">
                  <div className="showcase-title">4.9/5</div>
                  <div className="showcase-subtitle">Rating Promedio</div>
                </div>
              </div>
              <div className="showcase-item">
                <div className="showcase-icon">🚀</div>
                <div className="showcase-text">
                  <div className="showcase-title">89.6%</div>
                  <div className="showcase-subtitle">Tasa de Éxito</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="nosotros-tabs">
        <div className="container">
          <div className="tabs-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`tab-btn ${
                  activeSection === section.id ? "active" : ""
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="tab-icon">{section.icon}</span>
                <span className="tab-name">{section.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="nosotros-content">
        <div className="container">
          <div className="tab-content">{renderSectionContent()}</div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="success-stories">
        <div className="container">
          <div className="section-header">
            <h2>Historias de Éxito</h2>
            <p>Conoce cómo NEXORIUM ha transformado vidas reales</p>
          </div>

          <div className="testimonial-showcase">
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
                      <span className="country">
                        {testimonials[currentTestimonial].country}
                      </span>
                      <span className="result">
                        {testimonials[currentTestimonial].result}
                      </span>
                      <span className="year">
                        {testimonials[currentTestimonial].year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonials-nav">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`nav-dot ${
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
      <section className="nosotros-cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>¿Listo para Ser Parte de Nuestra Historia?</h2>
              <p>
                Únete a miles de traders exitosos que han transformado sus vidas
                con nuestra metodología probada y mentorías de clase mundial.
              </p>
            </div>
            <div className="cta-actions">
              <button className="btn btn-primary cta-btn">
                Comenzar Mi Transformación
              </button>
              <button className="btn btn-ghost cta-btn-secondary">
                Agendar Consulta Gratuita
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
