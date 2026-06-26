import { useState, useEffect, useRef, useCallback } from "react";
import { features } from "../data/features.js";
import cubeIcon from "@assets/cube-16-solid_1782467003735.svg";
import arrowPath from "@assets/arrow-path_1782467003733.svg";
import arrowTrending from "@assets/arrow-trending-up_1782467003733.svg";
import chartPie from "@assets/chart-pie_1782467003733.svg";
import linkIcon from "@assets/link_1782467003736.svg";
import cogIcon from "@assets/cog-8-tooth_1782467003735.svg";
import chevronDown from "@assets/chevron-down_1782467003734.svg";

const ICON_MAP = {
  cube: cubeIcon,
  "arrow-path": arrowPath,
  trending: arrowTrending,
  "chart-pie": chartPie,
  link: linkIcon,
  cog: cogIcon,
};

const MOBILE_BP = 768;

function isMobile() {
  return window.innerWidth <= MOBILE_BP;
}

export default function BentoAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [mobile, setMobile] = useState(() => (typeof window !== "undefined" ? isMobile() : false));
  const sectionRef = useRef(null);

  // On resize: transfer active index from bento to accordion
  useEffect(() => {
    let prev = isMobile();
    const onResize = () => {
      const now = isMobile();
      if (!prev && now) {
        // Transitioning desktop to mobile: transfer activeIndex to openIndex
        if (activeIndex !== null) {
          setOpenIndex(activeIndex);
        }
      }
      prev = now;
      setMobile(now);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [activeIndex]);

  // Scroll reveal
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleBentoHover = useCallback((idx) => {
    setActiveIndex(idx);
  }, []);

  const handleBentoLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const toggleAccordion = useCallback((idx) => {
    setOpenIndex((prev) => {
      const next = prev === idx ? null : idx;
      // Sync back to activeIndex so if they resize back to desktop, state is preserved
      setActiveIndex(next);
      return next;
    });
  }, []);

  return (
    <section
      id="features"
      className="section features-section"
      ref={sectionRef}
      aria-labelledby="features-heading"
    >
      <div className="container">
        <div className="section__header">
          <div className="section__label">Core Features</div>
          <h2 id="features-heading" className="section__heading">
            Every Tool You Need to<br /><em>Move Faster</em>
          </h2>
          <p className="section__sub">
            Six intelligent modules that work together to eliminate manual effort, surface insights, and orchestrate your entire data ecosystem.
          </p>
        </div>

        {/* BENTO (desktop) */}
        <div
          className="bento-grid reveal"
          role="list"
          aria-label="Features bento grid"
        >
          {features.map((feat, idx) => {
            const isLarge = feat.size === "large";
            const isActive = activeIndex === idx;
            return (
              <article
                key={feat.id}
                role="listitem"
                className={`bento-cell${isLarge ? " bento-cell--large" : ""}${isActive ? " active" : ""}`}
                onMouseEnter={() => handleBentoHover(idx)}
                onMouseLeave={handleBentoLeave}
                onFocus={() => handleBentoHover(idx)}
                onBlur={handleBentoLeave}
                tabIndex={0}
                aria-label={feat.title}
              >
                <div
                  className="bento-cell__accent-bar"
                  style={{ background: `linear-gradient(90deg, ${feat.accent}, transparent)` }}
                  aria-hidden="true"
                />
                <div
                  className="bento-cell__icon"
                  style={{ background: `${feat.accent}20` }}
                  aria-hidden="true"
                >
                  <img
                    src={ICON_MAP[feat.icon]}
                    alt=""
                    width="22"
                    height="22"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
                <h3 className="bento-cell__title">{feat.title}</h3>
                <p className="bento-cell__desc">{feat.description}</p>
              </article>
            );
          })}
        </div>

        {/* ACCORDION (mobile) */}
        <div
          className="accordion-list"
          role="list"
          aria-label="Features accordion"
        >
          {features.map((feat, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={feat.id}
                role="listitem"
                className={`accordion-item${isOpen ? " open" : ""}`}
              >
                <button
                  className="accordion-trigger"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-panel-${feat.id}`}
                  id={`accordion-trigger-${feat.id}`}
                >
                  <div className="accordion-trigger-left">
                    <div
                      className="accordion-icon"
                      style={{ background: `${feat.accent}20` }}
                      aria-hidden="true"
                    >
                      <img
                        src={ICON_MAP[feat.icon]}
                        alt=""
                        width="18"
                        height="18"
                        style={{ filter: "brightness(0) invert(1)" }}
                      />
                    </div>
                    <span className="accordion-title">{feat.title}</span>
                  </div>
                  <span className="accordion-chevron" aria-hidden="true">
                    <img
                      src={chevronDown}
                      alt=""
                      width="18"
                      height="18"
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  </span>
                </button>
                <div
                  id={`accordion-panel-${feat.id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${feat.id}`}
                  className="accordion-panel"
                >
                  <div className="accordion-panel-inner">
                    {feat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
