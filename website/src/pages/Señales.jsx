import React, { useState, useEffect, useRef } from "react";

const Señales = () => {
  const [activeSignals, setActiveSignals] = useState([]);
  const [signalHistory, setSignalHistory] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState("all");
  const [liveStats, setLiveStats] = useState({
    totalSignals: 2847,
    winRate: 89.6,
    avgRoi: 24.7,
    activeTraders: 3421,
  });
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Datos de señales en tiempo real (simuladas)
  const signals = [
    {
      id: 1,
      pair: "EUR/USD",
      action: "BUY",
      entry: "1.0875",
      tp: "1.0925",
      sl: "1.0825",
      status: "ACTIVE",
      confidence: 94,
      timeframe: "H4",
      analysis: "Breakout alcista confirmado con volumen institucional",
      timestamp: new Date(Date.now() - 30000),
      profit: null,
      riskReward: "1:2",
    },
    {
      id: 2,
      pair: "GBP/JPY",
      action: "SELL",
      entry: "188.45",
      tp: "187.20",
      sl: "189.15",
      status: "PENDING",
      confidence: 87,
      timeframe: "H1",
      analysis: "Patrón de reversión en resistencia clave",
      timestamp: new Date(Date.now() - 120000),
      profit: null,
      riskReward: "1:1.8",
    },
    {
      id: 3,
      pair: "XAU/USD",
      action: "BUY",
      entry: "2045.50",
      tp: "2065.00",
      sl: "2035.00",
      status: "CLOSED",
      confidence: 91,
      timeframe: "H4",
      analysis: "Soporte fuerte + divergencia alcista RSI",
      timestamp: new Date(Date.now() - 7200000),
      profit: +185.5,
      riskReward: "1:1.9",
    },
    {
      id: 4,
      pair: "BTC/USD",
      action: "BUY",
      entry: "43250",
      tp: "44800",
      sl: "42500",
      status: "ACTIVE",
      confidence: 88,
      timeframe: "H4",
      analysis: "Ruptura de triángulo ascendente + volumen",
      timestamp: new Date(Date.now() - 600000),
      profit: null,
      riskReward: "1:2.1",
    },
  ];

  const recentHistory = [
    {
      pair: "EUR/USD",
      profit: +245.3,
      roi: 24.5,
      date: "2024-11-03",
      status: "WIN",
    },
    {
      pair: "GBP/USD",
      profit: +189.75,
      roi: 18.9,
      date: "2024-11-03",
      status: "WIN",
    },
    {
      pair: "USD/JPY",
      profit: -45.2,
      roi: -4.5,
      date: "2024-11-02",
      status: "LOSS",
    },
    {
      pair: "XAU/USD",
      profit: +567.8,
      roi: 56.7,
      date: "2024-11-02",
      status: "WIN",
    },
    {
      pair: "BTC/USD",
      profit: +1234.5,
      roi: 123.4,
      date: "2024-11-01",
      status: "WIN",
    },
    {
      pair: "ETH/USD",
      profit: +789.25,
      roi: 78.9,
      date: "2024-11-01",
      status: "WIN",
    },
  ];

  const packages = [
    {
      id: 1,
      name: "Señales Básicas",
      price: 97,
      originalPrice: 147,
      period: "mes",
      features: [
        "3-5 señales diarias",
        "Forex & Índices principales",
        "Soporte por Telegram",
        "Análisis básico incluido",
        "Win rate 85%+",
      ],
      popular: false,
      color: "blue",
    },
    {
      id: 2,
      name: "Señales Pro",
      price: 197,
      originalPrice: 297,
      period: "mes",
      features: [
        "8-12 señales diarias",
        "Todos los mercados",
        "Análisis detallado",
        "Soporte 24/7",
        "Win rate 89%+",
        "Room trading VIP",
        "Alertas push móvil",
      ],
      popular: true,
      color: "red",
    },
    {
      id: 3,
      name: "Elite Institutional",
      price: 497,
      originalPrice: 797,
      period: "mes",
      features: [
        "Señales ilimitadas",
        "Acceso algoritmos IA",
        "Mentoría personalizada",
        "Copy trading automático",
        "Win rate 95%+",
        "Revenue sharing",
        "Capital funding disponible",
      ],
      popular: false,
      color: "gold",
    },
  ];

  // Actualizar tiempo y señales cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());

      // Simular actualización de estadísticas
      setLiveStats((prev) => ({
        ...prev,
        totalSignals: prev.totalSignals + Math.floor(Math.random() * 3),
        activeTraders: prev.activeTraders + Math.floor(Math.random() * 10 - 5),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "#00d4aa";
      case "PENDING":
        return "#ffa726";
      case "CLOSED":
        return "#42a5f5";
      default:
        return "#666";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "ACTIVE":
        return "🟢";
      case "PENDING":
        return "🟡";
      case "CLOSED":
        return "🔵";
      default:
        return "⚪";
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "Ahora";
    if (minutes < 60) return `${minutes}m`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h`;
    return `${Math.floor(minutes / 1440)}d`;
  };

  return (
    <div className="senales-page">
      {/* Hero Section con Stats en Vivo */}
      <section className="senales-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge live-badge">
              <span className="live-dot"></span>
              <span>Señales en Tiempo Real</span>
            </div>
            <h1 className="hero-title">
              Señales de Trading
              <span className="gradient-text"> Institucionales</span>
            </h1>
            <p className="hero-description">
              Accede a las mismas señales que utilizan los traders
              institucionales. Algoritmos de IA y análisis humano experto en
              tiempo real.
            </p>

            <div className="live-stats">
              <div className="stat-card" data-element-id="stat-1">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <div className="stat-number">
                    {liveStats.totalSignals.toLocaleString()}
                  </div>
                  <div className="stat-label">Señales Enviadas</div>
                </div>
              </div>

              <div className="stat-card" data-element-id="stat-2">
                <div className="stat-icon">🎯</div>
                <div className="stat-info">
                  <div className="stat-number">{liveStats.winRate}%</div>
                  <div className="stat-label">Win Rate</div>
                </div>
              </div>

              <div className="stat-card" data-element-id="stat-3">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <div className="stat-number">+{liveStats.avgRoi}%</div>
                  <div className="stat-label">ROI Promedio</div>
                </div>
              </div>

              <div className="stat-card" data-element-id="stat-4">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <div className="stat-number">
                    {liveStats.activeTraders.toLocaleString()}
                  </div>
                  <div className="stat-label">Traders Activos</div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="trading-board">
              <div className="board-header">
                <span className="board-title">🚀 Trading Board</span>
                <span className="board-time">
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>
              <div className="live-signals">
                {signals.slice(0, 3).map((signal) => (
                  <div key={signal.id} className="live-signal">
                    <div className="signal-header">
                      <span className="signal-pair">{signal.pair}</span>
                      <span
                        className="signal-status"
                        style={{ color: getStatusColor(signal.status) }}
                      >
                        {getStatusIcon(signal.status)} {signal.status}
                      </span>
                    </div>
                    <div className="signal-action">
                      <span className={`action ${signal.action.toLowerCase()}`}>
                        {signal.action}
                      </span>
                      <span className="entry">@ {signal.entry}</span>
                    </div>
                    <div className="signal-confidence">
                      <div className="confidence-bar">
                        <div
                          className="confidence-fill"
                          style={{ width: `${signal.confidence}%` }}
                        ></div>
                      </div>
                      <span>{signal.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Señales Activas */}
      <section className="active-signals">
        <div className="container">
          <div className="section-header">
            <h2>Señales Activas Ahora</h2>
            <p>Señales en tiempo real de nuestros algoritmos institucionales</p>
          </div>

          <div className="signals-grid">
            {signals.map((signal, index) => (
              <div
                key={signal.id}
                className={`signal-card ${
                  visibleElements.has(`signal-${index}`) ? "visible" : ""
                }`}
                data-element-id={`signal-${index}`}
              >
                <div className="signal-card-header">
                  <div className="signal-pair-info">
                    <h3>{signal.pair}</h3>
                    <span className="timeframe">{signal.timeframe}</span>
                  </div>
                  <div
                    className="signal-status-badge"
                    style={{ backgroundColor: getStatusColor(signal.status) }}
                  >
                    {signal.status}
                  </div>
                </div>

                <div className="signal-action-section">
                  <div
                    className={`action-badge ${signal.action.toLowerCase()}`}
                  >
                    {signal.action}
                  </div>
                  <div className="entry-price">
                    <span className="label">Entry:</span>
                    <span className="price">{signal.entry}</span>
                  </div>
                </div>

                <div className="signal-targets">
                  <div className="target">
                    <span className="label">TP:</span>
                    <span className="value success">{signal.tp}</span>
                  </div>
                  <div className="target">
                    <span className="label">SL:</span>
                    <span className="value danger">{signal.sl}</span>
                  </div>
                  <div className="target">
                    <span className="label">R:R:</span>
                    <span className="value">{signal.riskReward}</span>
                  </div>
                </div>

                <div className="signal-analysis">
                  <p>{signal.analysis}</p>
                </div>

                <div className="signal-footer">
                  <div className="confidence-section">
                    <span className="confidence-label">Confianza:</span>
                    <div className="confidence-bar">
                      <div
                        className="confidence-fill"
                        style={{ width: `${signal.confidence}%` }}
                      ></div>
                    </div>
                    <span className="confidence-value">
                      {signal.confidence}%
                    </span>
                  </div>
                  <div className="signal-time">
                    {formatTime(signal.timestamp)} ago
                  </div>
                </div>

                {signal.profit && (
                  <div
                    className={`profit-badge ${
                      signal.profit > 0 ? "success" : "danger"
                    }`}
                  >
                    {signal.profit > 0 ? "+" : ""}${signal.profit}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historial de Performance */}
      <section className="performance-history">
        <div className="container">
          <div className="section-header">
            <h2>Historial de Performance</h2>
            <p>Resultados reales de nuestras señales recientes</p>
          </div>

          <div className="history-table">
            <div className="table-header">
              <div className="col">Par</div>
              <div className="col">Resultado</div>
              <div className="col">ROI</div>
              <div className="col">Fecha</div>
              <div className="col">Estado</div>
            </div>

            {recentHistory.map((record, index) => (
              <div
                key={index}
                className={`table-row ${
                  visibleElements.has(`history-${index}`) ? "visible" : ""
                }`}
                data-element-id={`history-${index}`}
              >
                <div className="col pair">{record.pair}</div>
                <div className={`col profit ${record.status.toLowerCase()}`}>
                  {record.profit > 0 ? "+" : ""}${record.profit}
                </div>
                <div className={`col roi ${record.status.toLowerCase()}`}>
                  {record.roi > 0 ? "+" : ""}
                  {record.roi}%
                </div>
                <div className="col date">{record.date}</div>
                <div className="col status">
                  <span
                    className={`status-badge ${record.status.toLowerCase()}`}
                  >
                    {record.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planes de Señales */}
      <section className="signals-packages">
        <div className="container">
          <div className="section-header">
            <h2>Planes de Señales Premium</h2>
            <p>Elige el plan que mejor se adapte a tu estilo de trading</p>
          </div>

          <div className="packages-grid">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`package-card ${pkg.popular ? "popular" : ""} ${
                  visibleElements.has(`package-${index}`) ? "visible" : ""
                }`}
                data-element-id={`package-${index}`}
              >
                {pkg.popular && (
                  <div className="popular-badge">🔥 Más Popular</div>
                )}

                <div className="package-header">
                  <h3>{pkg.name}</h3>
                  <div className="package-price">
                    <span className="current-price">${pkg.price}</span>
                    <span className="period">/{pkg.period}</span>
                    {pkg.originalPrice > pkg.price && (
                      <span className="original-price">
                        ${pkg.originalPrice}
                      </span>
                    )}
                  </div>
                  {pkg.originalPrice > pkg.price && (
                    <div className="discount-badge">
                      {Math.round(
                        ((pkg.originalPrice - pkg.price) / pkg.originalPrice) *
                          100
                      )}
                      % OFF
                    </div>
                  )}
                </div>

                <div className="package-features">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="feature">
                      <span className="feature-check">✓</span>
                      <span className="feature-text">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`btn ${
                    pkg.popular ? "btn-primary" : "btn-ghost"
                  } package-btn`}
                >
                  {pkg.popular ? "Comenzar Ahora" : "Seleccionar Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garantía y Testimonios */}
      <section className="guarantee-testimonials">
        <div className="container">
          <div className="guarantee-section">
            <div className="guarantee-content" data-element-id="guarantee">
              <div className="guarantee-icon">🛡️</div>
              <h3>Garantía de Performance</h3>
              <p>
                Si nuestras señales no generan al menos 15% de ROI en tu primer
                mes, te devolvemos el 100% de tu dinero.
              </p>
              <div className="guarantee-stats">
                <div className="stat">
                  <span className="stat-number">7 días</span>
                  <span className="stat-label">Prueba gratis</span>
                </div>
                <div className="stat">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Garantía</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="signals-cta">
        <div className="container">
          <div className="cta-content">
            <h2>¿Listo para Recibir Señales Ganadoras?</h2>
            <p>
              Únete a más de 15,000 traders que ya están generando ganancias
              consistentes con nuestras señales premium.
            </p>
            <div className="cta-actions">
              <button className="btn btn-primary cta-btn">
                Comenzar Prueba Gratis
              </button>
              <div className="cta-guarantee">
                <span>
                  💎 Sin riesgo • 7 días gratis • Cancela cuando quieras
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Señales;
