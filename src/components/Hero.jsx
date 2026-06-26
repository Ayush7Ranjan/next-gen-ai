import arrowTrending from "@assets/arrow-trending-up_1782467003733.svg";
import chartPie from "@assets/chart-pie_1782467003733.svg";
import chevronRight from "@assets/chevron-right_1782467003734.svg";

export default function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-heading">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid-bg" />
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
      </div>

      <div className="container" style={{ width: "100%", position: "relative" }}>
        <div className="hero__content">
          <div className="hero__badge" role="status">
            <span className="hero__badge-dot" aria-hidden="true" />
            Now in General Availability - v3.0
          </div>

          <h1 id="hero-heading" className="hero__heading">
            Automate the Future<br />with <em>Neural AI</em><br />Workflows
          </h1>

          <p className="hero__sub">
            NexaFlow AI is the enterprise-grade data automation platform that learns, adapts, and scales - turning complex multi-step workflows into a single intelligent system.
          </p>

          <div className="hero__actions">
            <a href="#pricing" className="btn-primary-large">
              Start Free Trial
              <img src={chevronRight} alt="" width="18" height="18" style={{ filter: "brightness(0) invert(0.1)" }} />
            </a>
            <a href="#features" className="btn-secondary-large">
              Explore Features
            </a>
          </div>

          <div className="hero__stats" aria-label="Platform statistics">
            <div className="hero__stat">
              <span className="hero__stat-value">10B+</span>
              <span className="hero__stat-label">Events processed daily</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat">
              <span className="hero__stat-value">99.99%</span>
              <span className="hero__stat-label">Uptime SLA</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat">
              <span className="hero__stat-value">500+</span>
              <span className="hero__stat-label">Enterprise integrations</span>
            </div>
          </div>
        </div>

        <aside className="hero__visual" aria-label="Live dashboard preview" aria-hidden="true">
          <div className="hero__visual-card">
            <div className="hero__visual-header">
              <span className="hero__visual-dot" style={{ background: "var(--forsythia)" }} />
              <span className="hero__visual-dot" style={{ background: "var(--deep-saffron)" }} />
              <span className="hero__visual-dot" style={{ background: "var(--mystic-mint)" }} />
              <span className="hero__visual-title">Automation Overview</span>
            </div>

            {[
              { label: "AI Processing Rate", pct: 94, value: "94%" },
              { label: "Workflow Efficiency", pct: 87, value: "87%" },
              { label: "Data Accuracy", pct: 99, value: "99.4%" },
            ].map((m) => (
              <div key={m.label} className="hero__visual-metric">
                <div className="hero__visual-metric-label">{m.label}</div>
                <div className="hero__visual-metric-bar">
                  <div
                    className="hero__visual-metric-fill"
                    style={{ width: `${m.pct}%` }}
                    role="progressbar"
                    aria-valuenow={m.pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={m.label}
                  />
                </div>
                <div className="hero__visual-metric-value">{m.value}</div>
              </div>
            ))}

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
              <div style={{
                flex: 1, background: "rgba(255,200,1,0.08)", border: "1px solid rgba(255,200,1,0.2)",
                borderRadius: "var(--radius-sm)", padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.3rem"
              }}>
                <img src={arrowTrending} alt="" width="16" height="16" style={{ filter: "brightness(0) saturate(100%) invert(78%) sepia(66%) saturate(600%) hue-rotate(5deg)" }} />
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: "700", color: "var(--forsythia)" }}>+38%</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Throughput</div>
              </div>
              <div style={{
                flex: 1, background: "rgba(255,153,50,0.08)", border: "1px solid rgba(255,153,50,0.2)",
                borderRadius: "var(--radius-sm)", padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.3rem"
              }}>
                <img src={chartPie} alt="" width="16" height="16" style={{ filter: "brightness(0) saturate(100%) invert(60%) sepia(80%) saturate(500%) hue-rotate(345deg)" }} />
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: "700", color: "var(--deep-saffron)" }}>1.2ms</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Avg latency</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
