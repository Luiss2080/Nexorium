import React, { useState, useEffect, useRef } from "react";

const Home = () => {
  console.log("🏠 NEXORIUM: Home component renderizando...");

  // Estados para animaciones y carruseles
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [currentCourseSlide, setCurrentCourseSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentSignal, setCurrentSignal] = useState(0);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const observerRef = useRef();

  const texts = [
    "Maestro del Trading",
    "Experto en Forex",
    "Trader Profesional",
    "Financieramente Libre",
  ];

  // Datos para carruseles
  const courses = [
    {
      id: 1,
      title: "Forex Básico",
      description: "Aprende los fundamentos del mercado de divisas",
      price: "$199",
      image: "📊",
      level: "Principiante",
      duration: "6 semanas",
      students: "2,847",
    },
    {
      id: 2,
      title: "Trading Avanzado",
      description: "Estrategias profesionales para traders experimentados",
      price: "$399",
      image: "📈",
      level: "Avanzado",
      duration: "12 semanas",
      students: "1,234",
    },
    {
      id: 3,
      title: "Índices Sintéticos",
      description: "Domina los mercados sintéticos de alta volatilidad",
      price: "$299",
      image: "🎯",
      level: "Intermedio",
      duration: "8 semanas",
      students: "987",
    },
    {
      id: 4,
      title: "Análisis Técnico",
      description: "Interpreta gráficos como un profesional",
      price: "$249",
      image: "📉",
      level: "Intermedio",
      duration: "10 semanas",
      students: "1,567",
    },
  ];

  const testimonials = [
    {
      name: "Carlos Mendoza",
      position: "Trader Profesional",
      image: "👨‍💼",
      text: "NEXORIUM transformó mi vida financiera completamente. En 6 meses logré la libertad financiera que buscaba.",
      profit: "+285%",
      country: "🇲🇽 México",
    },
    {
      name: "Ana Rodriguez",
      position: "Inversionista",
      image: "👩‍💼",
      text: "Las estrategias que aprendí me permitieron generar ingresos pasivos consistentes. Altamente recomendado.",
      profit: "+190%",
      country: "🇪🇸 España",
    },
    {
      name: "Luis Silva",
      position: "Empresario",
      image: "👨‍💻",
      text: "La mejor inversión que he hecho. El ROI fue increíble y ahora vivo del trading profesionalmente.",
      profit: "+340%",
      country: "🇨🇴 Colombia",
    },
  ];

  const signals = [
    {
      pair: "EUR/USD",
      action: "BUY",
      entry: "1.0875",
      tp: "1.0925",
      sl: "1.0825",
      status: "ACTIVE",
      profit: "+45 pips",
    },
    {
      pair: "GBP/JPY",
      action: "SELL",
      entry: "189.45",
      tp: "188.90",
      sl: "190.00",
      status: "CLOSED",
      profit: "+55 pips",
    },
    {
      pair: "USD/CAD",
      action: "BUY",
      entry: "1.3650",
      tp: "1.3700",
      sl: "1.3600",
      status: "PENDING",
      profit: "---",
    },
  ];

  const team = [
    {
      name: "Roberto García",
      position: "CEO & Trader Senior",
      experience: "15+ años",
      specialty: "Forex & Commodities",
      image: "👨‍💼",
      description: "Ex-trader de Goldman Sachs con más de $50M gestionados",
    },
    {
      name: "María Fernández",
      position: "Directora de Educación",
      experience: "12+ años",
      specialty: "Análisis Técnico",
      image: "👩‍🏫",
      description: "Certificada CFA con especialización en mercados emergentes",
    },
    {
      name: "David López",
      position: "Head of Research",
      experience: "10+ años",
      specialty: "Algoritmos & IA",
      image: "👨‍🔬",
      description: "PhD en Finanzas Cuantitativas, ex-JPMorgan",
    },
  ];

  // Efectos para carruseles y animaciones
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentText(texts[textIndex]);
  }, [textIndex]);

  // Carrusel de cursos automático
  useEffect(() => {
    const courseInterval = setInterval(() => {
      setCurrentCourseSlide((prev) => (prev + 1) % courses.length);
    }, 4000);
    return () => clearInterval(courseInterval);
  }, []);

  // Carrusel de testimonios
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(testimonialInterval);
  }, []);

  // Rotación de señales
  useEffect(() => {
    const signalInterval = setInterval(() => {
      setCurrentSignal((prev) => (prev + 1) % signals.length);
    }, 3000);
    return () => clearInterval(signalInterval);
  }, []);

  // Intersection Observer para animaciones
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  // Función para registrar elementos observables
  const observeElement = (element) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000000 0%, #1a0000 100%)",
        color: "#ffffff",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Estilos dinámicos */}
      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 0, 0, 0.6);
          }
        }

        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        @keyframes morphing {
          0%,
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
        }

        .card-visible {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .card-hidden {
          opacity: 0;
          transform: translateY(50px);
        }

        .hover-card {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
        }

        .hover-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px rgba(255, 0, 0, 0.25);
        }

        .carousel-container {
          overflow: hidden;
          position: relative;
        }

        .carousel-track {
          display: flex;
          transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .hover-card:hover .shine-effect {
          transform: translateX(100%);
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(50px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(-10px);
          }
          70% {
            transform: scale(0.9) translateY(5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .feature-card-animate {
          animation: bounceIn 0.8s ease-out forwards;
        }

        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(
              auto-fit,
              minmax(350px, 1fr)
            ) !important;
          }
        }

        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .course-card-grid {
            grid-template-columns: 1fr !important;
          }
          .testimonial-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
          .features-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
      {/* HERO SECTION - ULTRA PROFESIONAL */}
      <section
        id="inicio"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          position: "relative",
          overflow: "hidden",
          background: `
            linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(10,0,0,0.98) 50%, rgba(0,0,0,0.95) 100%),
            url('./images/hero/trading-bg.jpg') center/cover no-repeat
          `,
        }}
      >
        {/* Video de fondo (opcional) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(ellipse at center, rgba(255,0,0,0.03) 0%, transparent 70%),
              linear-gradient(45deg, rgba(255,102,0,0.02) 0%, transparent 50%),
              conic-gradient(from 0deg at 50% 50%, rgba(255,0,0,0.01) 0deg, transparent 90deg, rgba(255,102,0,0.01) 180deg, transparent 270deg)
            `,
            animation: "pulse 6s ease-in-out infinite",
            zIndex: 1,
          }}
        />

        {/* Particles flotantes */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: `
            radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 80% 70%, rgba(255,0,0,0.4), transparent),
            radial-gradient(1px 1px at 60% 20%, rgba(255,102,0,0.3), transparent)
          `,
            backgroundSize: "200px 200px, 150px 150px, 100px 100px",
            animation: "float 15s ease-in-out infinite",
            zIndex: 1,
          }}
        />

        <div
          className="hero-grid"
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            zIndex: 10,
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            gap: "4rem",
          }}
        >
          {/* Contenido principal */}
          <div style={{ textAlign: "left" }}>
            {/* Badge premium */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background:
                  "linear-gradient(135deg, rgba(255,0,0,0.15) 0%, rgba(255,102,0,0.15) 100%)",
                border: "1px solid rgba(255,0,0,0.3)",
                borderRadius: "50px",
                padding: "0.8rem 1.8rem",
                marginBottom: "2.5rem",
                fontSize: "0.9rem",
                fontWeight: "600",
                color: "#FF6600",
                backdropFilter: "blur(10px)",
                animation: "glow 3s ease-in-out infinite",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>🏆</span>
              <span>Academia #1 de Trading en Latinoamérica</span>
              <span
                style={{
                  background: "#FF0000",
                  color: "white",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "20px",
                  fontSize: "0.7rem",
                  marginLeft: "0.5rem",
                }}
              >
                CERTIFICADA
              </span>
            </div>

            {/* Título principal ultra profesional */}
            <h1
              style={{
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                fontWeight: "900",
                marginBottom: "1.5rem",
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "-1px",
                lineHeight: "1.1",
              }}
            >
              <span style={{ color: "#ffffff" }}>Transforma tu</span>
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #FF0000 0%, #FF6600 50%, #FF0000 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  backgroundSize: "200% 200%",
                  animation: "gradientShift 3s ease-in-out infinite",
                  display: "inline-block",
                  position: "relative",
                }}
              >
                {currentText}
              </span>
            </h1>

            {/* Subtítulo profesional */}
            <p
              style={{
                fontSize: "1.4rem",
                marginBottom: "2rem",
                lineHeight: "1.7",
                color: "rgba(255,255,255,0.9)",
                fontWeight: "400",
                maxWidth: "600px",
              }}
            >
              Únete a la élite de traders profesionales con nuestra metodología
              <span
                style={{
                  color: "#FF6600",
                  fontWeight: "600",
                  background:
                    "linear-gradient(135deg, #FF6600 0%, #FF0000 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {" "}
                probada científicamente
              </span>{" "}
              que ha generado
              <strong style={{ color: "#00ff88" }}> +$50M en ganancias </strong>
              para nuestros estudiantes.
            </p>

            {/* Features destacadas */}
            <div
              style={{
                display: "flex",
                gap: "2rem",
                marginBottom: "3rem",
                flexWrap: "wrap",
              }}
            >
              {[
                {
                  icon: "🎯",
                  text: "95% Tasa de Éxito",
                  subtext: "Comprobada",
                },
                {
                  icon: "⚡",
                  text: "Resultados en 30 días",
                  subtext: "Garantizado",
                },
                {
                  icon: "🏅",
                  text: "Mentores Certificados",
                  subtext: "Ex-Goldman Sachs",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    padding: "1rem 1.5rem",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,0,0,0.2)",
                    backdropFilter: "blur(10px)",
                    animation: `fadeInUp 0.6s ease-out ${
                      0.3 + index * 0.2
                    }s backwards`,
                  }}
                >
                  <span style={{ fontSize: "1.8rem" }}>{item.icon}</span>
                  <div>
                    <div
                      style={{
                        color: "#FF0000",
                        fontWeight: "700",
                        fontSize: "0.95rem",
                      }}
                    >
                      {item.text}
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "0.8rem",
                      }}
                    >
                      {item.subtext}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats con animaciones */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "2rem",
                marginBottom: "3rem",
                maxWidth: "600px",
                margin: "0 auto 3rem",
              }}
            >
              {[
                { value: "10K+", label: "Estudiantes Activos", delay: "0.4s" },
                { value: "95%", label: "Tasa de Éxito", delay: "0.6s" },
                { value: "24/7", label: "Soporte Premium", delay: "0.8s" },
              ].map((stat, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: "center",
                    animation: `fadeInUp 0.8s ease-out ${stat.delay} backwards`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "800",
                      background:
                        "linear-gradient(135deg, #FF0000 0%, #FF6600 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ color: "#cccccc" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Botones CTA ultra profesionales */}
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                animation: "fadeInUp 0.8s ease-out 0.8s backwards",
                flexWrap: "wrap",
              }}
            >
              <button
                className="hover-card"
                style={{
                  background:
                    "linear-gradient(135deg, #FF0000 0%, #FF6600 50%, #FF0000 100%)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "16px",
                  padding: "1.5rem 3rem",
                  fontSize: "1.2rem",
                  fontWeight: "800",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  boxShadow:
                    "0 15px 35px rgba(255, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-3px) scale(1.02)";
                  e.target.style.boxShadow = "0 20px 40px rgba(255, 0, 0, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0) scale(1)";
                  e.target.style.boxShadow = "0 15px 35px rgba(255, 0, 0, 0.4)";
                }}
              >
                <span style={{ position: "relative", zIndex: 2 }}>
                  🚀 ACCESO INMEDIATO
                </span>
              </button>

              <button
                className="hover-card"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#FF0000",
                  border: "2px solid #FF0000",
                  borderRadius: "16px",
                  padding: "1.5rem 3rem",
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 0, 0, 0.1)";
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.borderColor = "#FF6600";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.1)";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.borderColor = "#FF0000";
                }}
              >
                📹 DEMO EN VIVO
              </button>
            </div>

            {/* Trust indicators */}
            <div
              style={{
                marginTop: "3rem",
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span>⭐⭐⭐⭐⭐</span>
                <span>4.9/5 (2,847 reseñas)</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span>🔒</span>
                <span>SSL Seguro</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span>✓</span>
                <span>Garantía 30 días</span>
              </div>
            </div>
          </div>

          {/* Columna derecha - Imagen/Video Hero */}
          <div
            style={{
              position: "relative",
              height: "600px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Imagen principal */}
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "24px",
                background: `
                linear-gradient(135deg, rgba(255,0,0,0.1) 0%, rgba(255,102,0,0.1) 100%),
                url('./images/hero/trading-dashboard.jpg') center/cover no-repeat
              `,
                border: "1px solid rgba(255,0,0,0.2)",
                backdropFilter: "blur(10px)",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
              }}
            >
              {/* Overlay de stats en tiempo real */}
              <div
                style={{
                  position: "absolute",
                  top: "2rem",
                  right: "2rem",
                  background: "rgba(0,0,0,0.8)",
                  borderRadius: "12px",
                  padding: "1rem 1.5rem",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,0,0,0.3)",
                }}
              >
                <div
                  style={{
                    color: "#00ff88",
                    fontSize: "1.5rem",
                    fontWeight: "800",
                  }}
                >
                  +$24,750
                </div>
                <div
                  style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8rem" }}
                >
                  Profit Today
                </div>
              </div>

              {/* Indicador de trading en vivo */}
              <div
                style={{
                  position: "absolute",
                  bottom: "2rem",
                  left: "2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  background: "rgba(0,0,0,0.8)",
                  borderRadius: "12px",
                  padding: "1rem 1.5rem",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,0,0,0.3)",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#00ff88",
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    color: "white",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                  }}
                >
                  Live Trading Session
                </span>
              </div>

              {/* Play button para video */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "rgba(255,0,0,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  animation: "pulse 3s ease-in-out infinite",
                  fontSize: "2rem",
                  color: "white",
                }}
              >
                ▶️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN ¿POR QUÉ ELEGIR NEXORIUM? - ULTRA DINÁMICA */}
      <section
        style={{
          padding: "8rem 2rem",
          background: `
            linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(26,0,0,0.98) 50%, rgba(0,0,0,0.95) 100%),
            url('./images/backgrounds/why-choose-bg.jpg') center/cover no-repeat
          `,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background elements */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
            radial-gradient(circle at 20% 20%, rgba(255,0,0,0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255,102,0,0.05) 0%, transparent 50%),
            conic-gradient(from 45deg at 50% 50%, rgba(255,0,0,0.02) 0deg, transparent 120deg, rgba(255,102,0,0.02) 240deg, transparent 360deg)
          `,
            animation: "morphing 8s ease-in-out infinite",
            zIndex: 1,
          }}
        />

        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Header ultra profesional */}
          <div style={{ textAlign: "center", marginBottom: "6rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.8rem",
                background:
                  "linear-gradient(135deg, rgba(255,0,0,0.15) 0%, rgba(255,102,0,0.15) 100%)",
                border: "1px solid rgba(255,0,0,0.3)",
                borderRadius: "50px",
                padding: "1rem 2.5rem",
                marginBottom: "2.5rem",
                fontSize: "1rem",
                fontWeight: "700",
                color: "#FF6600",
                backdropFilter: "blur(15px)",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>⚡</span>
              <span>Ventajas Competitivas</span>
            </div>

            <h2
              style={{
                fontSize: "clamp(3rem, 5vw, 5.5rem)",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: "900",
                marginBottom: "2rem",
                letterSpacing: "-2px",
                lineHeight: "1.1",
              }}
            >
              <span style={{ color: "#ffffff" }}>¿Por qué elegir</span>
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #FF0000 0%, #FF6600 50%, #FF0000 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% 200%",
                  animation: "gradientShift 4s ease-in-out infinite",
                }}
              >
                NEXORIUM?
              </span>
            </h2>

            <p
              style={{
                fontSize: "1.4rem",
                color: "rgba(255,255,255,0.9)",
                maxWidth: "800px",
                margin: "0 auto",
                lineHeight: "1.7",
                fontWeight: "400",
              }}
            >
              La diferencia entre el éxito y el fracaso en el trading está en la
              <strong style={{ color: "#FF6600" }}>
                {" "}
                metodología, el mentorship y la comunidad
              </strong>
              . Descubre por qué somos la opción #1 en Latinoamérica.
            </p>
          </div>

          {/* Grid de ventajas dinámicas */}
          <div
            className="features-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
              gap: "2.5rem",
              marginBottom: "4rem",
            }}
          >
            {[
              {
                id: 1,
                icon: "🚀",
                title: "Trading Profesional de Élite",
                subtitle: "Metodología Institucional",
                description:
                  "Estrategias exclusivas utilizadas por hedge funds y bancos de inversión. Aprende de traders que han gestionado más de $500M.",
                image: "./images/features/professional-trading.jpg",
                stats: { value: "500M+", label: "Gestionados" },
                badge: "EXCLUSIVO",
                color: "#FF0000",
              },
              {
                id: 2,
                title: "Resultados Garantizados",
                subtitle: "96.8% Tasa de Éxito",
                description:
                  "Nuestra metodología probada garantiza resultados. Si no ves mejoras en 30 días, te devolvemos el 100% de tu inversión.",
                image: "./images/features/guaranteed-results.jpg",
                stats: { value: "96.8%", label: "Éxito Comprobado" },
                badge: "GARANTÍA",
                color: "#00ff88",
              },
              {
                id: 3,
                icon: "🏅",
                title: "Certificación Internacional",
                subtitle: "Reconocimiento Global",
                description:
                  "Certificados avalados por la Financial Trading Association y reconocidos por las principales instituciones financieras.",
                image: "./images/features/international-certification.jpg",
                stats: { value: "ISO 9001", label: "Certificación" },
                badge: "OFICIAL",
                color: "#FFD700",
              },
              {
                id: 4,
                icon: "👑",
                title: "Comunidad VIP Exclusiva",
                subtitle: "Network de Élite",
                description:
                  "Acceso directo a nuestra comunidad privada de 15,000+ traders profesionales. Networking, señales premium y mentoría 24/7.",
                image: "./images/features/vip-community.jpg",
                stats: { value: "15K+", label: "Miembros VIP" },
                badge: "PREMIUM",
                color: "#9d4edd",
              },
              {
                id: 5,
                icon: "🤖",
                title: "Tecnología de Vanguardia",
                subtitle: "AI & Machine Learning",
                description:
                  "Plataforma potenciada por inteligencia artificial que analiza mercados en tiempo real y genera señales con 89% de precisión.",
                image: "./images/features/ai-technology.jpg",
                stats: { value: "89%", label: "Precisión IA" },
                badge: "INNOVACIÓN",
                color: "#00bfff",
              },
              {
                id: 6,
                icon: "📊",
                title: "Soporte Institucional",
                subtitle: "Mentoría 24/7/365",
                description:
                  "Soporte premium con traders certificados disponibles 24/7. Análisis personalizado de tu portfolio y estrategias individualizadas.",
                image: "./images/features/institutional-support.jpg",
                stats: { value: "24/7", label: "Soporte Live" },
                badge: "PREMIUM",
                color: "#ff6b35",
              },
            ].map((feature, index) => (
              <div
                key={feature.id}
                className={`hover-card ${
                  visibleCards.has(`feature-${index}`)
                    ? "card-visible"
                    : "card-hidden"
                }`}
                ref={(el) => observeElement(el)}
                id={`feature-${index}`}
                style={{
                  background: `
                    linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,0,0,0.05) 50%, rgba(255,102,0,0.08) 100%)
                  `,
                  border: "1px solid rgba(255,0,0,0.2)",
                  borderRadius: "24px",
                  padding: "0",
                  overflow: "hidden",
                  position: "relative",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  transformOrigin: "center",
                  animation: `fadeInUp 0.8s ease-out ${index * 0.1}s backwards`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-15px) scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 30px 60px rgba(255,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.3)";
                }}
              >
                {/* Imagen de fondo con overlay */}
                <div
                  style={{
                    height: "200px",
                    background: `
                    linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(255,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%),
                    url('${feature.image}') center/cover no-repeat
                  `,
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "1.5rem",
                  }}
                >
                  {/* Badge flotante */}
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      background: feature.color || "#FF0000",
                      color: "white",
                      padding: "0.5rem 1.2rem",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: "800",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      animation: "pulse 2s ease-in-out infinite",
                    }}
                  >
                    {feature.badge}
                  </div>

                  {/* Stats overlay */}
                  <div
                    style={{
                      background: "rgba(0,0,0,0.8)",
                      borderRadius: "12px",
                      padding: "0.8rem 1.2rem",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "900",
                        color: feature.color || "#FF0000",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {feature.stats.value}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.8)",
                        fontWeight: "600",
                      }}
                    >
                      {feature.stats.label}
                    </div>
                  </div>
                </div>

                {/* Contenido de la card */}
                <div style={{ padding: "2rem" }}>
                  {/* Icono y título */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {feature.icon && (
                      <div
                        style={{
                          fontSize: "2.5rem",
                          padding: "0.8rem",
                          background: `linear-gradient(135deg, ${
                            feature.color || "#FF0000"
                          }20 0%, ${feature.color || "#FF0000"}10 100%)`,
                          borderRadius: "16px",
                          border: `1px solid ${feature.color || "#FF0000"}30`,
                        }}
                      >
                        {feature.icon}
                      </div>
                    )}
                    <div>
                      <h3
                        style={{
                          fontSize: "1.4rem",
                          fontWeight: "800",
                          color: "#ffffff",
                          marginBottom: "0.3rem",
                          lineHeight: "1.2",
                        }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: feature.color || "#FF6600",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Descripción */}
                  <p
                    style={{
                      color: "rgba(255,255,255,0.9)",
                      fontSize: "1rem",
                      lineHeight: "1.6",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {feature.description}
                  </p>

                  {/* CTA Button */}
                  <button
                    style={{
                      width: "100%",
                      background: `linear-gradient(135deg, ${
                        feature.color || "#FF0000"
                      } 0%, ${feature.color || "#FF6600"} 100%)`,
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                      padding: "1rem 1.5rem",
                      fontSize: "1rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      transition: "all 0.3s ease",
                      boxShadow: `0 8px 25px ${feature.color || "#FF0000"}30`,
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.02)";
                      e.target.style.boxShadow = `0 12px 30px ${
                        feature.color || "#FF0000"
                      }40`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = `0 8px 25px ${
                        feature.color || "#FF0000"
                      }30`;
                    }}
                  >
                    Saber Más →
                  </button>
                </div>

                {/* Efecto de brillo al hover */}
                <div
                  style={{
                    position: "absolute",
                    top: "-50%",
                    left: "-50%",
                    width: "200%",
                    height: "200%",
                    background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
                    transform: "translateX(-100%)",
                    transition: "transform 0.6s ease",
                    pointerEvents: "none",
                  }}
                  className="shine-effect"
                />
              </div>
            ))}
          </div>

          {/* CTA Section final */}
          <div
            style={{
              textAlign: "center",
              background:
                "linear-gradient(135deg, rgba(255,0,0,0.1) 0%, rgba(255,102,0,0.1) 100%)",
              border: "1px solid rgba(255,0,0,0.3)",
              borderRadius: "24px",
              padding: "3rem 2rem",
              backdropFilter: "blur(20px)",
              position: "relative",
            }}
          >
            <h3
              style={{
                fontSize: "2.2rem",
                fontWeight: "800",
                color: "#ffffff",
                marginBottom: "1rem",
              }}
            >
              ¿Listo para unirte a la élite?
            </h3>
            <p
              style={{
                fontSize: "1.2rem",
                color: "rgba(255,255,255,0.8)",
                marginBottom: "2rem",
                maxWidth: "600px",
                margin: "0 auto 2rem",
              }}
            >
              Más de 15,000 traders ya han transformado su futuro financiero. Tu
              turno de ser el siguiente success story.
            </p>
            <button
              className="hover-card"
              style={{
                background: "linear-gradient(135deg, #FF0000 0%, #FF6600 100%)",
                color: "white",
                border: "none",
                borderRadius: "16px",
                padding: "1.5rem 4rem",
                fontSize: "1.3rem",
                fontWeight: "800",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "1px",
                boxShadow: "0 15px 35px rgba(255,0,0,0.4)",
                position: "relative",
              }}
            >
              🚀 COMENZAR TRANSFORMACIÓN
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN CURSOS - CON CARRUSEL DINÁMICO */}
      <section
        id="cursos"
        style={{
          padding: "6rem 2rem",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a0000 100%)",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Header de sección profesional */}
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div
              style={{
                display: "inline-block",
                background:
                  "linear-gradient(135deg, rgba(255,0,0,0.1) 0%, rgba(255,102,0,0.1) 100%)",
                border: "1px solid rgba(255,0,0,0.3)",
                borderRadius: "50px",
                padding: "0.8rem 2rem",
                marginBottom: "2rem",
                fontSize: "0.9rem",
                fontWeight: "600",
                color: "#FF6600",
                backdropFilter: "blur(10px)",
              }}
            >
              🎓 PROGRAMAS CERTIFICADOS
            </div>

            <h2
              style={{
                fontSize: "clamp(2.5rem, 4vw, 4rem)",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: "900",
                marginBottom: "1.5rem",
                letterSpacing: "-1px",
                lineHeight: "1.2",
              }}
            >
              <span style={{ color: "#ffffff" }}>Cursos de</span>
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #FF0000 0%, #FF6600 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Élite Mundial
              </span>
            </h2>

            <p
              style={{
                fontSize: "1.3rem",
                color: "rgba(255,255,255,0.8)",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: "1.6",
                fontWeight: "400",
              }}
            >
              Metodología exclusiva desarrollada por ex-traders de
              <strong style={{ color: "#FF6600" }}>
                {" "}
                Goldman Sachs, JPMorgan y Deutsche Bank
              </strong>
              . Transforma tu carrera en solo 12 semanas.
            </p>

            {/* Stats de confianza */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "3rem",
                marginTop: "2.5rem",
                flexWrap: "wrap",
              }}
            >
              {[
                { number: "10,247", label: "Graduados Exitosos" },
                { number: "96.8%", label: "Tasa de Aprobación" },
                { number: "$127M", label: "Ganancias Generadas" },
                { number: "4.9★", label: "Calificación Media" },
              ].map((stat, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: "center",
                    animation: `fadeInUp 0.6s ease-out ${
                      0.2 + index * 0.1
                    }s backwards`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "900",
                      background:
                        "linear-gradient(135deg, #FF0000 0%, #FF6600 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      color: "rgba(255,255,255,0.7)",
                      fontWeight: "500",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carrusel de cursos */}
          <div
            className="carousel-container"
            style={{ position: "relative", marginBottom: "3rem" }}
          >
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentCourseSlide * 100}%)`,
              }}
            >
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  style={{
                    minWidth: "100%",
                    padding: "0 1rem",
                  }}
                >
                  <div
                    className="hover-card"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 0, 0, 0.2)",
                      borderRadius: "16px",
                      padding: "2rem",
                      maxWidth: "800px",
                      margin: "0 auto",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <div
                      className="course-card-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "350px 1fr",
                        gap: "3rem",
                        alignItems: "stretch",
                      }}
                    >
                      {/* Imagen del curso */}
                      <div style={{ position: "relative" }}>
                        <div
                          style={{
                            width: "100%",
                            height: "280px",
                            borderRadius: "16px",
                            background: `
                            linear-gradient(135deg, rgba(255,0,0,0.1) 0%, rgba(255,102,0,0.1) 100%),
                            url('./images/courses/course-${course.id}.jpg') center/cover no-repeat
                          `,
                            border: "1px solid rgba(255,0,0,0.2)",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          {/* Badge del curso */}
                          <div
                            style={{
                              position: "absolute",
                              top: "1rem",
                              left: "1rem",
                              background:
                                course.id === 1
                                  ? "#FF0000"
                                  : course.id === 2
                                  ? "#00ff88"
                                  : "#FF6600",
                              color: "white",
                              padding: "0.5rem 1rem",
                              borderRadius: "20px",
                              fontSize: "0.8rem",
                              fontWeight: "700",
                              textTransform: "uppercase",
                            }}
                          >
                            {course.id === 1
                              ? "MÁS POPULAR"
                              : course.id === 2
                              ? "NUEVO"
                              : "PREMIUM"}
                          </div>

                          {/* Rating del curso */}
                          <div
                            style={{
                              position: "absolute",
                              top: "1rem",
                              right: "1rem",
                              background: "rgba(0,0,0,0.8)",
                              color: "white",
                              padding: "0.5rem 1rem",
                              borderRadius: "20px",
                              fontSize: "0.9rem",
                              fontWeight: "600",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.3rem",
                            }}
                          >
                            <span>⭐</span>
                            <span>4.9</span>
                          </div>

                          {/* Play button overlay */}
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: "60px",
                              height: "60px",
                              borderRadius: "50%",
                              background: "rgba(255,0,0,0.9)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              fontSize: "1.5rem",
                              color: "white",
                              transition: "all 0.3s ease",
                            }}
                          >
                            ▶️
                          </div>
                        </div>

                        {/* Level badge debajo */}
                        <div
                          style={{
                            marginTop: "1rem",
                            textAlign: "center",
                            background:
                              "linear-gradient(135deg, #FF0000 0%, #FF6600 100%)",
                            color: "white",
                            padding: "0.7rem 1.5rem",
                            borderRadius: "25px",
                            fontSize: "0.9rem",
                            fontWeight: "700",
                            textTransform: "uppercase",
                          }}
                        >
                          {course.level}
                        </div>
                      </div>

                      {/* Información del curso */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              fontSize: "2.2rem",
                              color: "#FF0000",
                              marginBottom: "0.5rem",
                              fontFamily: "'Montserrat', sans-serif",
                              fontWeight: "800",
                              lineHeight: "1.2",
                            }}
                          >
                            {course.title}
                          </h3>

                          <p
                            style={{
                              color: "rgba(255,255,255,0.9)",
                              fontSize: "1.2rem",
                              lineHeight: "1.7",
                              marginBottom: "2rem",
                              fontWeight: "400",
                            }}
                          >
                            {course.description}
                          </p>

                          {/* Features list */}
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              gap: "1rem",
                              marginBottom: "2rem",
                            }}
                          >
                            {[
                              {
                                icon: "📚",
                                label: course.duration,
                                desc: "Duración completa",
                              },
                              {
                                icon: "👥",
                                label: course.students + "+",
                                desc: "Estudiantes activos",
                              },
                              {
                                icon: "🏆",
                                label: "Certificado",
                                desc: "Al completar",
                              },
                              {
                                icon: "💬",
                                label: "24/7",
                                desc: "Soporte premium",
                              },
                            ].map((feature, idx) => (
                              <div
                                key={idx}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.8rem",
                                  padding: "1rem",
                                  background: "rgba(255,255,255,0.03)",
                                  borderRadius: "10px",
                                  border: "1px solid rgba(255,0,0,0.1)",
                                }}
                              >
                                <span style={{ fontSize: "1.3rem" }}>
                                  {feature.icon}
                                </span>
                                <div>
                                  <div
                                    style={{
                                      color: "#FF6600",
                                      fontWeight: "700",
                                      fontSize: "0.95rem",
                                    }}
                                  >
                                    {feature.label}
                                  </div>
                                  <div
                                    style={{
                                      color: "rgba(255,255,255,0.6)",
                                      fontSize: "0.8rem",
                                    }}
                                  >
                                    {feature.desc}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Precio y CTA */}
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "1.5rem",
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  fontSize: "2.5rem",
                                  fontWeight: "900",
                                  background:
                                    "linear-gradient(135deg, #FF0000 0%, #FF6600 100%)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "1rem",
                                }}
                              >
                                {course.price}
                                <span
                                  style={{
                                    fontSize: "1.2rem",
                                    color: "rgba(255,255,255,0.5)",
                                    textDecoration: "line-through",
                                    fontWeight: "400",
                                  }}
                                >
                                  $599
                                </span>
                              </div>
                              <div
                                style={{
                                  color: "#00ff88",
                                  fontSize: "0.9rem",
                                  fontWeight: "600",
                                }}
                              >
                                ¡Ahorra $200! Oferta por tiempo limitado
                              </div>
                            </div>
                          </div>

                          <div style={{ display: "flex", gap: "1rem" }}>
                            <button
                              className="hover-card"
                              style={{
                                background:
                                  "linear-gradient(135deg, #FF0000 0%, #FF6600 100%)",
                                color: "white",
                                border: "none",
                                borderRadius: "12px",
                                padding: "1.2rem 2.5rem",
                                fontSize: "1.1rem",
                                fontWeight: "700",
                                cursor: "pointer",
                                fontFamily: "'Montserrat', sans-serif",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                                boxShadow: "0 8px 25px rgba(255, 0, 0, 0.3)",
                                flex: 1,
                              }}
                            >
                              INSCRIBIRSE AHORA
                            </button>

                            <button
                              className="hover-card"
                              style={{
                                background: "rgba(255,255,255,0.1)",
                                color: "#FF0000",
                                border: "2px solid #FF0000",
                                borderRadius: "12px",
                                padding: "1.2rem 1.5rem",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                                cursor: "pointer",
                                backdropFilter: "blur(10px)",
                              }}
                            >
                              📋 MÁS INFO
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controles del carrusel */}
            <button
              onClick={() =>
                setCurrentCourseSlide((prev) =>
                  prev === 0 ? courses.length - 1 : prev - 1
                )
              }
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255, 0, 0, 0.8)",
                border: "none",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                color: "white",
                fontSize: "1.5rem",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              ‹
            </button>
            <button
              onClick={() =>
                setCurrentCourseSlide((prev) => (prev + 1) % courses.length)
              }
              style={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255, 0, 0, 0.8)",
                border: "none",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                color: "white",
                fontSize: "1.5rem",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              ›
            </button>
          </div>

          {/* Indicadores del carrusel */}
          <div
            style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}
          >
            {courses.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCourseSlide(index)}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  border: "none",
                  background:
                    currentCourseSlide === index
                      ? "#FF0000"
                      : "rgba(255, 255, 255, 0.3)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN ACADEMIA - CON TESTIMONIOS CARRUSEL */}
      <section
        id="academy"
        style={{
          padding: "6rem 2rem",
          background: "linear-gradient(135deg, #111111 0%, #0a0a0a 100%)",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Header testimonios */}
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div
              style={{
                display: "inline-block",
                background:
                  "linear-gradient(135deg, rgba(255,0,0,0.1) 0%, rgba(255,102,0,0.1) 100%)",
                border: "1px solid rgba(255,0,0,0.3)",
                borderRadius: "50px",
                padding: "0.8rem 2rem",
                marginBottom: "2rem",
                fontSize: "0.9rem",
                fontWeight: "600",
                color: "#FF6600",
                backdropFilter: "blur(10px)",
              }}
            >
              💬 TESTIMONIOS REALES
            </div>

            <h2
              style={{
                fontSize: "clamp(2.5rem, 4vw, 4rem)",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: "900",
                marginBottom: "1.5rem",
                letterSpacing: "-1px",
                lineHeight: "1.2",
              }}
            >
              <span style={{ color: "#ffffff" }}>Lo que dicen nuestros</span>
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #FF0000 0%, #FF6600 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Graduados Exitosos
              </span>
            </h2>

            <p
              style={{
                fontSize: "1.3rem",
                color: "rgba(255,255,255,0.8)",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: "1.6",
                fontWeight: "400",
              }}
            >
              Más de{" "}
              <strong style={{ color: "#FF6600" }}>10,000 traders</strong> han
              transformado sus vidas financieras con nuestra metodología
              exclusiva. Estos son sus resultados reales.
            </p>
          </div>

          {/* Carrusel de testimonios premium */}
          <div style={{ position: "relative", marginBottom: "4rem" }}>
            <div
              style={{
                background: `
                  linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,0,0,0.05) 50%, rgba(255,102,0,0.08) 100%)
                `,
                border: "1px solid rgba(255, 0, 0, 0.2)",
                borderRadius: "24px",
                padding: "4rem 3rem",
                backdropFilter: "blur(20px)",
                animation: "fadeInUp 0.6s ease-out",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative elements */}
              <div
                style={{
                  position: "absolute",
                  top: "-50px",
                  right: "-50px",
                  width: "100px",
                  height: "100px",
                  background:
                    "linear-gradient(135deg, rgba(255,0,0,0.1) 0%, rgba(255,102,0,0.1) 100%)",
                  borderRadius: "50%",
                  filter: "blur(20px)",
                }}
              />

              <div
                className="testimonial-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr",
                  gap: "3rem",
                  alignItems: "center",
                  textAlign: "left",
                }}
              >
                {/* Profile section */}
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      background: `
                      linear-gradient(135deg, rgba(255,0,0,0.2) 0%, rgba(255,102,0,0.2) 100%),
                      url('./images/testimonials/testimonial-${
                        currentTestimonial + 1
                      }.jpg') center/cover no-repeat
                    `,
                      border: "4px solid rgba(255,0,0,0.3)",
                      margin: "0 auto 1.5rem",
                      position: "relative",
                    }}
                  >
                    {/* Verified badge */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        background: "#00ff88",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.8rem",
                        color: "white",
                      }}
                    >
                      ✓
                    </div>
                  </div>

                  {/* Profit highlight */}
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,255,136,0.2) 0%, rgba(0,200,100,0.2) 100%)",
                      border: "1px solid rgba(0,255,136,0.3)",
                      borderRadius: "20px",
                      padding: "1rem 1.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: "900",
                        color: "#00ff88",
                        marginBottom: "0.3rem",
                      }}
                    >
                      {testimonials[currentTestimonial].profit}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.7)",
                        textTransform: "uppercase",
                        fontWeight: "600",
                      }}
                    >
                      ROI en 6 meses
                    </div>
                  </div>

                  {/* Rating stars */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "0.2rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    {"⭐".repeat(5)}
                  </div>
                </div>

                {/* Testimonial content */}
                <div>
                  {/* Quote */}
                  <blockquote
                    style={{
                      fontSize: "1.4rem",
                      fontStyle: "italic",
                      color: "rgba(255,255,255,0.95)",
                      marginBottom: "2rem",
                      lineHeight: "1.7",
                      position: "relative",
                      paddingLeft: "2rem",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: "0",
                        top: "-10px",
                        fontSize: "3rem",
                        color: "#FF0000",
                        fontFamily: "Georgia, serif",
                      }}
                    >
                      "
                    </span>
                    {testimonials[currentTestimonial].text}
                  </blockquote>

                  {/* Author info */}
                  <div
                    style={{
                      borderTop: "1px solid rgba(255,0,0,0.2)",
                      paddingTop: "1.5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          color: "#FF0000",
                          fontSize: "1.3rem",
                          marginBottom: "0.3rem",
                          fontWeight: "700",
                        }}
                      >
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p
                        style={{
                          color: "#FF6600",
                          marginBottom: "0.3rem",
                          fontSize: "1rem",
                          fontWeight: "600",
                        }}
                      >
                        {testimonials[currentTestimonial].position}
                      </p>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.7)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {testimonials[currentTestimonial].country}
                      </p>
                    </div>

                    {/* LinkedIn badge */}
                    <div
                      style={{
                        background: "#0077b5",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "20px",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span>in</span>
                      <span>Perfil verificado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicadores */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.5rem",
                marginTop: "2rem",
              }}
            >
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    border: "none",
                    background:
                      currentTestimonial === index
                        ? "#FF0000"
                        : "rgba(255, 255, 255, 0.3)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN SEÑALES - LIVE TRADING SIGNALS */}
      <section
        id="senales"
        style={{
          padding: "6rem 2rem",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a0000 100%)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "3rem",
                fontFamily: "'Montserrat', sans-serif",
                color: "#FF0000",
                marginBottom: "1rem",
                textTransform: "uppercase",
              }}
            >
              🔴 Señales en Vivo
            </h2>
            <p style={{ fontSize: "1.2rem", color: "#cccccc" }}>
              Señales profesionales actualizadas en tiempo real
            </p>
          </div>

          {/* Dashboard de señales */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "2rem",
            }}
          >
            {signals.map((signal, index) => (
              <div
                key={index}
                className={`hover-card ${
                  visibleCards.has(`signal-${index}`)
                    ? "card-visible"
                    : "card-hidden"
                }`}
                ref={(el) => observeElement(el)}
                id={`signal-${index}`}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: `2px solid ${
                    signal.status === "ACTIVE"
                      ? "#00ff00"
                      : signal.status === "CLOSED"
                      ? "#FF0000"
                      : "#ffaa00"
                  }`,
                  borderRadius: "16px",
                  padding: "2rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Status badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    background:
                      signal.status === "ACTIVE"
                        ? "#00ff00"
                        : signal.status === "CLOSED"
                        ? "#FF0000"
                        : "#ffaa00",
                    color: signal.status === "ACTIVE" ? "#000" : "#fff",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                  }}
                >
                  {signal.status}
                </div>

                {/* Par de divisas */}
                <h3
                  style={{
                    fontSize: "2rem",
                    color: "#FF0000",
                    marginBottom: "1rem",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {signal.pair}
                </h3>

                {/* Acción */}
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "800",
                    color: signal.action === "BUY" ? "#00ff00" : "#ff0000",
                    marginBottom: "1.5rem",
                  }}
                >
                  {signal.action === "BUY" ? "📈 BUY" : "📉 SELL"}
                </div>

                {/* Detalles de la señal */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div>
                    <span style={{ color: "#FF6600", fontWeight: "600" }}>
                      Entry:
                    </span>
                    <div style={{ color: "#fff", fontSize: "1.1rem" }}>
                      {signal.entry}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: "#FF6600", fontWeight: "600" }}>
                      TP:
                    </span>
                    <div style={{ color: "#00ff00", fontSize: "1.1rem" }}>
                      {signal.tp}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: "#FF6600", fontWeight: "600" }}>
                      SL:
                    </span>
                    <div style={{ color: "#ff0000", fontSize: "1.1rem" }}>
                      {signal.sl}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: "#FF6600", fontWeight: "600" }}>
                      Profit:
                    </span>
                    <div
                      style={{
                        color: signal.profit.includes("+")
                          ? "#00ff00"
                          : "#cccccc",
                        fontSize: "1.1rem",
                        fontWeight: "600",
                      }}
                    >
                      {signal.profit}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA para señales */}
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <button
              className="hover-card"
              style={{
                background: "linear-gradient(135deg, #FF0000 0%, #FF6600 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "1.5rem 3rem",
                fontSize: "1.2rem",
                fontWeight: "700",
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                textTransform: "uppercase",
              }}
            >
              🚀 Acceder a Señales Premium
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN NOSOTROS - EQUIPO CON CARDS ANIMADAS */}
      <section
        id="nosotros"
        style={{
          padding: "6rem 2rem",
          background: "linear-gradient(135deg, #111111 0%, #0a0a0a 100%)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "3rem",
                fontFamily: "'Montserrat', sans-serif",
                color: "#FF0000",
                marginBottom: "1rem",
                textTransform: "uppercase",
              }}
            >
              Nuestro Equipo
            </h2>
            <p
              style={{
                fontSize: "1.2rem",
                color: "#cccccc",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Expertos con décadas de experiencia en mercados financieros
              globales
            </p>
          </div>

          {/* Grid del equipo */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "2rem",
            }}
          >
            {team.map((member, index) => (
              <div
                key={index}
                className={`hover-card ${
                  visibleCards.has(`team-${index}`)
                    ? "card-visible"
                    : "card-hidden"
                }`}
                ref={(el) => observeElement(el)}
                id={`team-${index}`}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 0, 0, 0.2)",
                  borderRadius: "20px",
                  padding: "2.5rem",
                  textAlign: "center",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Avatar */}
                <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>
                  {member.image}
                </div>

                {/* Información del miembro */}
                <h3
                  style={{
                    fontSize: "1.5rem",
                    color: "#FF0000",
                    marginBottom: "0.5rem",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {member.name}
                </h3>

                <p
                  style={{
                    color: "#FF6600",
                    fontWeight: "600",
                    marginBottom: "1rem",
                  }}
                >
                  {member.position}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1.5rem",
                    fontSize: "0.9rem",
                  }}
                >
                  <span style={{ color: "#cccccc" }}>
                    <strong style={{ color: "#FF6600" }}>Experiencia:</strong>{" "}
                    {member.experience}
                  </span>
                </div>

                <div
                  style={{
                    background: "rgba(255, 0, 0, 0.1)",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    marginBottom: "1rem",
                    color: "#FF6600",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                  }}
                >
                  {member.specialty}
                </div>

                <p
                  style={{
                    color: "#cccccc",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                  }}
                >
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN CONTACTO - FORMULARIO INTERACTIVO */}
      <section
        id="contacto"
        style={{
          padding: "6rem 2rem",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a0000 100%)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "3rem",
                fontFamily: "'Montserrat', sans-serif",
                color: "#FF0000",
                marginBottom: "1rem",
                textTransform: "uppercase",
              }}
            >
              Comienza Hoy
            </h2>
            <p style={{ fontSize: "1.2rem", color: "#cccccc" }}>
              ¿Listo para transformar tu futuro financiero? Hablemos
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "start",
            }}
          >
            {/* Información de contacto */}
            <div>
              <h3
                style={{
                  fontSize: "2rem",
                  color: "#FF0000",
                  marginBottom: "2rem",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Información de Contacto
              </h3>

              {[
                {
                  icon: "📍",
                  label: "Dirección",
                  value: "Av. Tecnológica #456\nSanta Cruz, Bolivia",
                },
                { icon: "📞", label: "Teléfono", value: "+591 3 789-0123" },
                { icon: "📧", label: "Email", value: "info@nexorium.edu.bo" },
                {
                  icon: "🕒",
                  label: "Horarios",
                  value: "Lun-Vie: 7:00-19:00\nSáb: 8:00-12:00",
                },
              ].map((contact, index) => (
                <div
                  key={index}
                  className="hover-card"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    padding: "1.5rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 0, 0, 0.2)",
                    borderRadius: "12px",
                    marginBottom: "1rem",
                  }}
                >
                  <span style={{ fontSize: "2rem" }}>{contact.icon}</span>
                  <div>
                    <h4 style={{ color: "#FF6600", marginBottom: "0.5rem" }}>
                      {contact.label}
                    </h4>
                    <p style={{ color: "#cccccc", whiteSpace: "pre-line" }}>
                      {contact.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Formulario de contacto */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 0, 0, 0.2)",
                borderRadius: "20px",
                padding: "3rem",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  color: "#FF0000",
                  marginBottom: "2rem",
                  textAlign: "center",
                }}
              >
                Solicita una Consulta Gratuita
              </h3>

              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Nombre"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 0, 0, 0.3)",
                      borderRadius: "8px",
                      padding: "1rem",
                      color: "#fff",
                      fontSize: "1rem",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Apellido"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 0, 0, 0.3)",
                      borderRadius: "8px",
                      padding: "1rem",
                      color: "#fff",
                      fontSize: "1rem",
                    }}
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 0, 0, 0.3)",
                    borderRadius: "8px",
                    padding: "1rem",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                />

                <input
                  type="tel"
                  placeholder="Teléfono"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 0, 0, 0.3)",
                    borderRadius: "8px",
                    padding: "1rem",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                />

                <select
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 0, 0, 0.3)",
                    borderRadius: "8px",
                    padding: "1rem",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                >
                  <option value="">Selecciona tu nivel</option>
                  <option value="principiante">Principiante</option>
                  <option value="intermedio">Intermedio</option>
                  <option value="avanzado">Avanzado</option>
                </select>

                <textarea
                  placeholder="Mensaje (opcional)"
                  rows="4"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 0, 0, 0.3)",
                    borderRadius: "8px",
                    padding: "1rem",
                    color: "#fff",
                    fontSize: "1rem",
                    resize: "vertical",
                  }}
                />

                <button
                  type="submit"
                  className="hover-card"
                  style={{
                    background:
                      "linear-gradient(135deg, #FF0000 0%, #FF6600 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    padding: "1.2rem 2rem",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    fontFamily: "'Montserrat', sans-serif",
                    textTransform: "uppercase",
                  }}
                >
                  🚀 Solicitar Consulta Gratuita
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
