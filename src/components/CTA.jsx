import { useEffect, useRef } from "react";
import chevronRight from "@assets/chevron-right_1782467003734.svg";

export default function CTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll(".reveal").forEach((node, i) => {
              setTimeout(() => node.classList.add("visible"), i * 80);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cta"
      className="cta-section"
      ref={sectionRef}
      aria-labelledby="cta-heading"
    >
      <div className="container">
        <div className="cta-inner reveal">
          <h2 id="cta-heading" className="cta-heading">
            Ready to Automate at Scale?
          </h2>
          <p className="cta-sub">
            Join 10,000+ teams already running on NexaFlow AI. Start your 14-day free trial - no credit card required.
          </p>
          <div className="cta-actions">
            <a href="#pricing" className="btn-primary-large">
              Start Free Trial
              <img
                src={chevronRight}
                alt=""
                width="18"
                height="18"
                style={{ filter: "brightness(0) invert(0.1)" }}
              />
            </a>
            <a href="#showcase" className="btn-secondary-large">
              View Documentation
            </a>
          </div>
          <p className="cta-note">
            14-day free trial | No credit card required | Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
