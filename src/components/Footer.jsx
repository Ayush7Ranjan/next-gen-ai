import cubeIcon from "@assets/cube-16-solid_1782467003735.svg";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#hero" className="header__logo" aria-label="NexaFlow AI Home">
              <div className="header__logo-mark" aria-hidden="true">
                <img src={cubeIcon} alt="" width="16" height="16" />
              </div>
              NexaFlow<span style={{ color: "var(--forsythia)" }}>AI</span>
            </a>
            <p className="footer__tagline">
              The enterprise-grade neural automation platform for teams that move fast without breaking things.
            </p>
          </div>

          <nav aria-label="Product links">
            <div className="footer__col-title">Product</div>
            <ul className="footer__links">
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#showcase">Integrations</a></li>
              <li><a href="#cta">Changelog</a></li>
              <li><a href="#cta">Roadmap</a></li>
            </ul>
          </nav>

          <nav aria-label="Developers links">
            <div className="footer__col-title">Developers</div>
            <ul className="footer__links">
              <li><a href="#cta">Documentation</a></li>
              <li><a href="#cta">API Reference</a></li>
              <li><a href="#cta">SDKs</a></li>
              <li><a href="#cta">Status Page</a></li>
              <li><a href="#cta">GitHub</a></li>
            </ul>
          </nav>

          <nav aria-label="Company links">
            <div className="footer__col-title">Company</div>
            <ul className="footer__links">
              <li><a href="#testimonials">Customers</a></li>
              <li><a href="#cta">Blog</a></li>
              <li><a href="#cta">Careers</a></li>
              <li><a href="#cta">Security</a></li>
              <li><a href="#cta">Contact</a></li>
            </ul>
          </nav>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            Copyright {year} NexaFlow AI, Inc. All rights reserved.
          </p>
          <nav className="footer__legal" aria-label="Legal links">
            <a href="#footer">Privacy Policy</a>
            <a href="#footer">Terms of Service</a>
            <a href="#footer">Cookie Settings</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
