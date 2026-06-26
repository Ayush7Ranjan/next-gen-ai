import { useEffect, useRef } from "react";

const testimonials = [
  {
    quote: "NexaFlow AI cut our data pipeline build time by 70%. What used to take weeks of engineering now deploys in hours. The neural routing is genuinely intelligent.",
    name: "Sarah Chen",
    title: "CTO, DataStream Labs",
    initials: "SC",
    color: "#FFC801",
    stars: 5,
  },
  {
    quote: "The bento of features is incredible - we replaced four separate tools with NexaFlow. Our team went from 40 manual workflows to 3 automated ones.",
    name: "Marcus Williams",
    title: "VP Engineering, Apex Financial",
    initials: "MW",
    color: "#FF9932",
    stars: 5,
  },
  {
    quote: "I was skeptical about AI automation at enterprise scale, but NexaFlow's 99.99% uptime SLA and SOC 2 compliance made the decision easy for our legal team.",
    name: "Priya Nair",
    title: "Head of Operations, MedCore Systems",
    initials: "PN",
    color: "#114C5A",
    stars: 5,
  },
];

const logos = [
  "DataStream Labs",
  "Apex Financial",
  "MedCore Systems",
  "VertexOps",
  "ClearPath AI",
  "NovaStar Corp",
];

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll(".reveal").forEach((node, i) => {
              setTimeout(() => node.classList.add("visible"), i * 100);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="testimonials"
      className="section testimonials-section"
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        <div className="section__header section__header--center">
          <div className="section__label">Social Proof</div>
          <h2 id="testimonials-heading" className="section__heading">
            Trusted by Teams That <em>Ship Fast</em>
          </h2>
          <p className="section__sub">
            From early-stage startups to Fortune 500 enterprises - NexaFlow AI is the automation backbone for teams that can't afford downtime.
          </p>
        </div>

        <div className="testimonials-grid" role="list">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="testimonial-card reveal"
              role="listitem"
              aria-label={`Testimonial from ${t.name}`}
            >
              <div className="testimonial-card__stars" aria-label={`${t.stars} out of 5 stars`}>
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="testimonial-card__star" aria-hidden="true">*</span>
                ))}
              </div>
              <blockquote className="testimonial-card__quote">
                "{t.quote}"
              </blockquote>
              <footer className="testimonial-card__author">
                <div
                  className="testimonial-card__avatar"
                  style={{ background: `${t.color}20`, color: t.color }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <div className="testimonial-card__author-name">{t.name}</div>
                  <div className="testimonial-card__author-title">{t.title}</div>
                </div>
              </footer>
            </article>
          ))}
        </div>

        <nav className="logos-row" aria-label="Partner companies">
          {logos.map((logo) => (
            <span key={logo} className="logo-item" aria-label={logo}>
              {logo}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
