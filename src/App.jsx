import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import FeatureShowcase from "./components/FeatureShowcase.jsx";
import BentoAccordion from "./components/BentoAccordion.jsx";
import Pricing from "./components/Pricing.jsx";
import Testimonials from "./components/Testimonials.jsx";
import CTA from "./components/CTA.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  useEffect(() => {
    // Dismiss the entry loader within 500ms constraint
    const loader = document.getElementById("loader");
    if (loader) {
      const t = setTimeout(() => loader.classList.add("hidden"), 380);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <>
      <a
        href="#main-content"
        style={{
          position: "absolute",
          left: "-9999px",
          zIndex: 9999,
          padding: "0.5rem 1rem",
          background: "var(--forsythia)",
          color: "var(--oceanic-noir)",
          fontWeight: 600,
        }}
        onFocus={(e) => (e.target.style.left = "1rem")}
        onBlur={(e) => (e.target.style.left = "-9999px")}
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content">
        <Hero />
        <FeatureShowcase />
        <BentoAccordion />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
