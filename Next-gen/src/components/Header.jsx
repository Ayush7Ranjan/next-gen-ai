import { useState, useEffect } from "react";
import cubeIcon from "@assets/cube-16-solid_1782467003735.svg";
import xMark from "@assets/x-mark_1782467003737.svg";
import chevronDown from "@assets/chevron-down_1782467003734.svg";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`} role="banner">
      <div className="container">
        <div className="header__inner">
          <a href="#hero" className="header__logo" aria-label="NexaFlow AI Home">
            <div className="header__logo-mark" aria-hidden="true">
              <img src={cubeIcon} alt="" width="16" height="16" />
            </div>
            NexaFlow<span style={{ color: "var(--forsythia)" }}>AI</span>
          </a>

          <nav className="header__nav" aria-label="Main navigation">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#testimonials">Customers</a>
            <a href="#footer">Docs</a>
          </nav>

          <div className="header__actions">
            <a href="#" className="btn-ghost">Sign in</a>
            <a href="#pricing" className="btn-primary">
              Start Free Trial
              <img src={chevronDown} alt="" width="14" height="14" style={{ transform: "rotate(-90deg)", filter: "brightness(0) invert(0) sepia(1) saturate(0)" }} />
            </a>
          </div>

          <button
            className="header__mobile-toggle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <img
              src={mobileOpen ? xMark : chevronDown}
              alt=""
              width="20"
              height="20"
              style={{ filter: "brightness(0) invert(1)", transform: mobileOpen ? "none" : "none" }}
            />
          </button>
        </div>

        <nav
          className={`header__mobile-nav${mobileOpen ? " open" : ""}`}
          aria-label="Mobile navigation"
          aria-hidden={!mobileOpen}
        >
          <a href="#features" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#pricing" onClick={() => setMobileOpen(false)}>Pricing</a>
          <a href="#testimonials" onClick={() => setMobileOpen(false)}>Customers</a>
          <a href="#footer" onClick={() => setMobileOpen(false)}>Docs</a>
          <a href="#pricing" onClick={() => setMobileOpen(false)} className="btn-primary" style={{ textAlign: "center", marginTop: "0.5rem" }}>
            Start Free Trial
          </a>
        </nav>
      </div>
    </header>
  );
}
