import React, { useState, useEffect, useRef } from "react";

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    experience: "",
    subject: "",
    message: "",
    newsletter: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [activeMap, setActiveMap] = useState("bolivia");
  const observerRef = useRef();

  const contactMethods = [
    {
      id: 1,
      title: "WhatsApp Business",
      description: "Respuesta inmediata 24/7",
      value: "+591 3 789-0123",
      icon: "💬",
      action: "Chatear Ahora",
      color: "#25d366",
    },
    {
      id: 2,
      title: "Email Corporativo",
      description: "Consultas detalladas",
      value: "info@nexorium.edu.bo",
      icon: "📧",
      action: "Enviar Email",
      color: "#ea4335",
    },
    {
      id: 3,
      title: "Teléfono Directo",
      description: "Atención personalizada",
      value: "+591 3 789-0123",
      icon: "📞",
      action: "Llamar Ahora",
      color: "#4285f4",
    },
    {
      id: 4,
      title: "Telegram Oficial",
      description: "Comunidad y soporte",
      value: "@NexoriumAcademy",
      icon: "🚀",
      action: "Unirse",
      color: "#0088cc",
    },
  ];

  const offices = [
    {
      id: "bolivia",
      name: "Santa Cruz, Bolivia",
      address: "Av. Tecnológica #456",
      city: "Santa Cruz de la Sierra",
      phone: "+591 3 789-0123",
      email: "santacruz@nexorium.edu.bo",
      hours: "Lun - Vie: 7:00 - 19:00\nSáb: 8:00 - 12:00",
      isHeadquarters: true,
      coordinates: { lat: -17.783, lng: -63.182 },
    },
    {
      id: "mexico",
      name: "Ciudad de México",
      address: "Torre Corporativa CDMX",
      city: "Polanco, CDMX",
      phone: "+52 55 1234-5678",
      email: "mexico@nexorium.edu.bo",
      hours: "Lun - Vie: 8:00 - 18:00",
      isHeadquarters: false,
      coordinates: { lat: 19.433, lng: -99.133 },
    },
    {
      id: "colombia",
      name: "Bogotá, Colombia",
      address: "Centro Empresarial 93",
      city: "Bogotá D.C.",
      phone: "+57 1 234-5678",
      email: "bogota@nexorium.edu.bo",
      hours: "Lun - Vie: 8:00 - 18:00",
      isHeadquarters: false,
      coordinates: { lat: 4.711, lng: -74.072 },
    },
    {
      id: "spain",
      name: "Madrid, España",
      address: "Distrito Financiero",
      city: "Madrid, España",
      phone: "+34 91 123-4567",
      email: "madrid@nexorium.edu.bo",
      hours: "Lun - Vie: 9:00 - 18:00",
      isHeadquarters: false,
      coordinates: { lat: 40.416, lng: -3.704 },
    },
  ];

  const faqs = [
    {
      question: "¿Cuánto tiempo toma completar un curso?",
      answer:
        "Nuestros cursos varían entre 6-24 semanas dependiendo del nivel. Los cursos básicos toman 6-8 semanas, intermedios 10-12 semanas, y los programas avanzados hasta 24 semanas con mentorías incluidas.",
    },
    {
      question: "¿Ofrecen garantía de resultados?",
      answer:
        "Sí, ofrecemos garantía de 30 días. Si no estás satisfecho con el curso, te devolvemos el 100% de tu dinero. Además, garantizamos que alcanzarás rentabilidad siguiendo nuestra metodología.",
    },
    {
      question: "¿Necesito capital inicial para empezar?",
      answer:
        "No necesitas capital propio. Enseñamos primero con cuentas demo, y tenemos partnerships con prop firms que pueden fondearte desde $10K hasta $250K una vez demuestres consistencia.",
    },
    {
      question: "¿Los cursos están disponibles en español?",
      answer:
        "Absolutamente. Todos nuestros cursos están completamente en español, con instructores nativos y material diseñado específicamente para el mercado latinoamericano.",
    },
    {
      question: "¿Qué soporte recibo después del curso?",
      answer:
        "Recibes soporte de por vida en nuestra comunidad, acceso a webinars mensuales, actualizaciones gratuitas del material, y descuentos en cursos avanzados.",
    },
    {
      question: "¿Puedo estudiar mientras trabajo?",
      answer:
        "Definitivamente. Nuestros cursos están diseñados para personas que trabajan. Las clases son pregrabadas, tienes acceso 24/7, y puedes estudiar a tu ritmo.",
    },
  ];

  const experienceLevels = [
    "Principiante (Sin experiencia)",
    "Básico (Menos de 1 año)",
    "Intermedio (1-3 años)",
    "Avanzado (3+ años)",
    "Profesional (Trader institucional)",
  ];

  const subjects = [
    "Información sobre cursos",
    "Consulta sobre certificaciones",
    "Soporte técnico",
    "Partnership empresarial",
    "Programa de afiliados",
    "Consultoría personalizada",
    "Otro tema",
  ];

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío del formulario
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        experience: "",
        subject: "",
        message: "",
        newsletter: false,
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentOffice = () => {
    return offices.find((office) => office.id === activeMap);
  };

  return (
    <div className="contacto-page">
      {/* Hero Section */}
      <section className="contacto-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">💬</span>
              <span>Respuesta en menos de 2 horas</span>
            </div>
            <h1 className="hero-title">
              ¿Listo para
              <span className="gradient-text"> Transformar tu Vida?</span>
            </h1>
            <p className="hero-description">
              Nuestro equipo de expertos está aquí para ayudarte a dar el primer
              paso hacia la libertad financiera. Contáctanos y recibe asesoría
              personalizada gratuita.
            </p>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">&lt;2hrs</span>
                <span className="stat-label">Tiempo de Respuesta</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Soporte Disponible</span>
              </div>
              <div className="stat">
                <span className="stat-number">15K+</span>
                <span className="stat-label">Consultas Exitosas</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="contact-preview">
              <div className="preview-header">
                <div className="preview-avatar">👨‍💼</div>
                <div className="preview-info">
                  <div className="preview-name">Asesor NEXORIUM</div>
                  <div className="preview-status">
                    <div className="status-dot online"></div>
                    <span>En línea ahora</span>
                  </div>
                </div>
              </div>
              <div className="preview-messages">
                <div className="message received">
                  <div className="message-content">
                    ¡Hola! 👋 Bienvenido a NEXORIUM. ¿En qué puedo ayudarte hoy?
                  </div>
                  <div className="message-time">Ahora</div>
                </div>
              </div>
              <div className="preview-input">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Métodos de Contacto */}
      <section className="contact-methods">
        <div className="container">
          <div className="section-header">
            <h2>Múltiples Formas de Contactarnos</h2>
            <p>
              Elige el método que más te convenga para recibir atención
              personalizada
            </p>
          </div>

          <div className="methods-grid">
            {contactMethods.map((method, index) => (
              <div
                key={method.id}
                className={`method-card ${
                  visibleElements.has(`method-${index}`) ? "visible" : ""
                }`}
                data-element-id={`method-${index}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="method-icon"
                  style={{ backgroundColor: method.color }}
                >
                  {method.icon}
                </div>
                <div className="method-content">
                  <h3>{method.title}</h3>
                  <p>{method.description}</p>
                  <div className="method-value">{method.value}</div>
                  <button
                    className="btn btn-primary method-btn"
                    style={{ backgroundColor: method.color }}
                  >
                    {method.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section className="contact-form-section">
        <div className="container">
          <div className="form-layout">
            <div className="form-content">
              <div className="form-header" data-element-id="form-header">
                <h2>Envíanos un Mensaje</h2>
                <p>
                  Completa el formulario y nuestro equipo te contactará en menos
                  de 2 horas para ofrecerte la mejor asesoría personalizada.
                </p>
              </div>

              <form
                className="contact-form"
                onSubmit={handleSubmit}
                data-element-id="contact-form"
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nombre Completo *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Teléfono/WhatsApp</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+591 12345678"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="country">País</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecciona tu país</option>
                      <option value="bolivia">🇧🇴 Bolivia</option>
                      <option value="mexico">🇲🇽 México</option>
                      <option value="colombia">🇨🇴 Colombia</option>
                      <option value="spain">🇪🇸 España</option>
                      <option value="argentina">🇦🇷 Argentina</option>
                      <option value="peru">🇵🇪 Perú</option>
                      <option value="chile">🇨🇱 Chile</option>
                      <option value="ecuador">🇪🇨 Ecuador</option>
                      <option value="otro">🌎 Otro</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="experience">Experiencia en Trading</label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecciona tu nivel</option>
                      {experienceLevels.map((level, index) => (
                        <option key={index} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Tema de Consulta *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecciona un tema</option>
                      {subjects.map((subject, index) => (
                        <option key={index} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mensaje *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="Cuéntanos más detalles sobre tu consulta..."
                  ></textarea>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                    />
                    <span className="checkbox-custom"></span>
                    Quiero recibir noticias y ofertas exclusivas de NEXORIUM
                  </label>
                </div>

                <button
                  type="submit"
                  className={`btn btn-primary form-submit ${
                    isSubmitting ? "submitting" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-spinner"></span>
                      Enviando...
                    </>
                  ) : (
                    "Enviar Mensaje"
                  )}
                </button>

                {submitStatus === "success" && (
                  <div className="form-success">
                    ✅ ¡Mensaje enviado exitosamente! Te contactaremos pronto.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="form-error">
                    ❌ Error al enviar el mensaje. Por favor intenta nuevamente.
                  </div>
                )}
              </form>
            </div>

            <div className="form-sidebar">
              <div className="sidebar-card" data-element-id="consultation-card">
                <div className="card-icon">🎯</div>
                <h3>Consulta Gratuita</h3>
                <p>
                  Agenda una videollamada de 30 minutos completamente gratuita
                  con uno de nuestros expertos.
                </p>
                <button className="btn btn-ghost sidebar-btn">
                  Agendar Ahora
                </button>
              </div>

              <div className="sidebar-card" data-element-id="demo-card">
                <div className="card-icon">🚀</div>
                <h3>Demo en Vivo</h3>
                <p>
                  Únete a nuestras demos semanales y ve la plataforma en acción
                  con trading en tiempo real.
                </p>
                <button className="btn btn-ghost sidebar-btn">
                  Ver Horarios
                </button>
              </div>

              <div className="sidebar-card" data-element-id="community-card">
                <div className="card-icon">💬</div>
                <h3>Comunidad Telegram</h3>
                <p>
                  Únete a más de 25,000 traders en nuestra comunidad oficial de
                  Telegram.
                </p>
                <button className="btn btn-ghost sidebar-btn">
                  Unirse Gratis
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Oficinas Globales */}
      <section className="global-offices">
        <div className="container">
          <div className="section-header">
            <h2>Nuestras Oficinas Globales</h2>
            <p>Presencia internacional para brindarte el mejor soporte local</p>
          </div>

          <div className="offices-layout">
            <div className="offices-map" data-element-id="offices-map">
              <div className="map-header">
                <h3>Ubicaciones Worldwide</h3>
                <div className="map-legend">
                  <span className="legend-item">
                    <span className="legend-dot headquarters"></span>
                    Sede Principal
                  </span>
                  <span className="legend-item">
                    <span className="legend-dot branch"></span>
                    Sucursales
                  </span>
                </div>
              </div>

              <div className="world-map">
                {offices.map((office) => (
                  <button
                    key={office.id}
                    className={`map-pin ${
                      office.isHeadquarters ? "headquarters" : "branch"
                    } ${activeMap === office.id ? "active" : ""}`}
                    onClick={() => setActiveMap(office.id)}
                    style={{
                      left: `${((office.coordinates.lng + 180) / 360) * 100}%`,
                      top: `${((90 - office.coordinates.lat) / 180) * 100}%`,
                    }}
                  >
                    <span className="pin-icon">
                      {office.isHeadquarters ? "🏢" : "🏪"}
                    </span>
                    <span className="pin-label">{office.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="office-details" data-element-id="office-details">
              {getCurrentOffice() && (
                <div className="office-card">
                  <div className="office-header">
                    <h3>{getCurrentOffice().name}</h3>
                    {getCurrentOffice().isHeadquarters && (
                      <span className="headquarters-badge">
                        🏆 Sede Principal
                      </span>
                    )}
                  </div>

                  <div className="office-info">
                    <div className="info-item">
                      <span className="info-icon">📍</span>
                      <div>
                        <strong>{getCurrentOffice().address}</strong>
                        <br />
                        {getCurrentOffice().city}
                      </div>
                    </div>

                    <div className="info-item">
                      <span className="info-icon">📞</span>
                      <div>
                        <strong>Teléfono:</strong>
                        <br />
                        {getCurrentOffice().phone}
                      </div>
                    </div>

                    <div className="info-item">
                      <span className="info-icon">📧</span>
                      <div>
                        <strong>Email:</strong>
                        <br />
                        {getCurrentOffice().email}
                      </div>
                    </div>

                    <div className="info-item">
                      <span className="info-icon">🕒</span>
                      <div>
                        <strong>Horarios:</strong>
                        <br />
                        {getCurrentOffice()
                          .hours.split("\n")
                          .map((line, index) => (
                            <div key={index}>{line}</div>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="office-actions">
                    <button className="btn btn-primary">Llamar Oficina</button>
                    <button className="btn btn-ghost">Ver en Mapa</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Preguntas Frecuentes</h2>
            <p>Resolvemos las dudas más comunes de nuestros estudiantes</p>
          </div>

          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${
                  visibleElements.has(`faq-${index}`) ? "visible" : ""
                }`}
                data-element-id={`faq-${index}`}
              >
                <div className="faq-question">
                  <span className="faq-icon">❓</span>
                  <h4>{faq.question}</h4>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-cta" data-element-id="faq-cta">
            <p>¿No encontraste la respuesta que buscabas?</p>
            <button className="btn btn-primary">Contactar Soporte</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;
