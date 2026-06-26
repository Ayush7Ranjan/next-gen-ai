import { useEffect, useRef } from "react";
import cubeIcon from "@assets/cube-16-solid_1782467003735.svg";
import arrowPath from "@assets/arrow-path_1782467003733.svg";
import arrowTrending from "@assets/arrow-trending-up_1782467003733.svg";
import chartPie from "@assets/chart-pie_1782467003733.svg";
import linkIcon from "@assets/link_1782467003736.svg";
import cogIcon from "@assets/cog-8-tooth_1782467003735.svg";

const ICONS = {
  cube: cubeIcon,
  "arrow-path": arrowPath,
  trending: arrowTrending,
  "chart-pie": chartPie,
  link: linkIcon,
  cog: cogIcon,
};

const items = [
  { icon: "cube", label: "Neural Core", desc: "Adaptive model selection routing tasks to the optimal neural architecture per context.", color: "#FFC801" },
  { icon: "arrow-path", label: "Auto-Healing", desc: "Self-repairing pipelines that detect and recover from failures without human intervention.", color: "#FF9932" },
  { icon: "trending", label: "Predictive I/O", desc: "Forecast data bottlenecks and preemptively scale compute resources by 300ms ahead.", color: "#FFC801" },
  { icon: "chart-pie", label: "Analytics Engine", desc: "Real-time multi-dimensional metrics with sub-100ms query latency.", color: "#FF9932" },
  { icon: "link", label: "Mesh Connect", desc: "Universal adapter layer with guaranteed exactly-once delivery across 500+ services.", color: "#114C5A" },
  { icon: "cog", label: "Policy Engine", desc: "Enforce compliance, rate limits, and data governance rules at the edge layer.", color: "#114C5A" },
];

export default function FeatureShowcase() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll(".reveal").forEach((node, i) => {
              setTimeout(() => node.classList.add("visible"), i * 60);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="showcase"
      className="section features-showcase"
      ref={sectionRef}
      aria-labelledby="showcase-heading"
    >
      <div className="container">
        <div className="section__header section__header--center">
          <div className="section__label">Technical Capabilities</div>
          <h2 id="showcase-heading" className="section__heading">
            Built for Enterprise-Grade <em>Reliability</em>
          </h2>
          <p className="section__sub">
            Every component is engineered for production workloads - from distributed consensus to sub-millisecond edge processing.
          </p>
        </div>

        <div className="showcase-grid" role="list">
          {items.map((item) => (
            <article key={item.label} className="showcase-item reveal" role="listitem">
              <div
                className="showcase-item__icon"
                style={{ background: `${item.color}18` }}
                aria-hidden="true"
              >
                <img
                  src={ICONS[item.icon]}
                  alt=""
                  width="20"
                  height="20"
                  style={{ filter: `brightness(0) saturate(100%) invert(1)`, opacity: 0.9 }}
                />
              </div>
              <h3 className="showcase-item__title">{item.label}</h3>
              <p className="showcase-item__desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
