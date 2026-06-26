import { useRef, useEffect, useCallback } from "react";
import { pricingMatrix, computePrice } from "../data/pricingMatrix.js";

const TIERS = Object.keys(pricingMatrix.tiers);
const CURRENCIES = Object.keys(pricingMatrix.currency);
const BILLINGS = Object.keys(pricingMatrix.billing);

export default function Pricing() {
  // Isolated refs so changing currency/billing does NOT re-render this component
  const billingRef = useRef("monthly");
  const currencyRef = useRef("USD");

  // DOM refs for every price text node
  const amountRefs = useRef({});
  const symbolRefs = useRef({});
  const savingsRefs = useRef({});

  // Billing button refs
  const billingBtnRefs = useRef({});
  // Currency button refs
  const currencyBtnRefs = useRef({});

  // Directly mutate price text nodes: zero React re-renders
  const updatePrices = useCallback(() => {
    const billing = billingRef.current;
    const currency = currencyRef.current;
    const sym = pricingMatrix.currency[currency].symbol;
    const discount = pricingMatrix.billing[billing].discount;

    TIERS.forEach((tier) => {
      const amount = computePrice(tier, currency, billing);
      if (amountRefs.current[tier]) {
        amountRefs.current[tier].textContent = amount.toLocaleString();
      }
      if (symbolRefs.current[tier]) {
        symbolRefs.current[tier].textContent = sym;
      }
      if (savingsRefs.current[tier]) {
        savingsRefs.current[tier].textContent =
          billing === "annual"
            ? `Save ${Math.round(discount * 100)}% vs. monthly`
            : "\u00a0";
      }
    });
  }, []);

  // Update billing active state (button highlight) without re-render
  const updateBillingButtons = useCallback((active) => {
    BILLINGS.forEach((b) => {
      const el = billingBtnRefs.current[b];
      if (!el) return;
      if (b === active) el.classList.add("active");
      else el.classList.remove("active");
    });
  }, []);

  // Update currency active state (button highlight) without re-render
  const updateCurrencyButtons = useCallback((active) => {
    CURRENCIES.forEach((c) => {
      const el = currencyBtnRefs.current[c];
      if (!el) return;
      if (c === active) el.classList.add("active");
      else el.classList.remove("active");
    });
  }, []);

  const handleBilling = useCallback(
    (b) => {
      if (billingRef.current === b) return;
      billingRef.current = b;
      updateBillingButtons(b);
      updatePrices();
    },
    [updateBillingButtons, updatePrices]
  );

  const handleCurrency = useCallback(
    (c) => {
      if (currencyRef.current === c) return;
      currencyRef.current = c;
      updateCurrencyButtons(c);
      updatePrices();
    },
    [updateCurrencyButtons, updatePrices]
  );

  // Initialise prices after mount (single paint)
  useEffect(() => {
    updatePrices();
  }, [updatePrices]);

  // Scroll reveal
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
      id="pricing"
      className="section pricing-section"
      ref={sectionRef}
      aria-labelledby="pricing-heading"
    >
      <div className="container">
        <div className="section__header section__header--center">
          <div className="section__label">Pricing</div>
          <h2 id="pricing-heading" className="section__heading">
            Transparent Pricing,<br /><em>Real Value</em>
          </h2>
          <p className="section__sub">
            Start free. Scale as you grow. Every plan includes full access to the core neural automation engine.
          </p>
        </div>

        {/* Controls: isolated state via refs and direct DOM mutation */}
        <div className="pricing-controls" role="group" aria-label="Pricing options">
          {/* Billing toggle */}
          <div className="billing-toggle" role="radiogroup" aria-label="Billing cycle">
            {BILLINGS.map((b) => (
              <button
                key={b}
                ref={(el) => (billingBtnRefs.current[b] = el)}
                className={`billing-toggle__btn${b === "monthly" ? " active" : ""}`}
                role="radio"
                aria-checked={b === "monthly"}
                onClick={() => handleBilling(b)}
              >
                {pricingMatrix.billing[b].label}
                {b === "annual" && (
                  <span className="billing-toggle__badge" aria-label="Save 20%">-20%</span>
                )}
              </button>
            ))}
          </div>

          {/* Currency switcher */}
          <div className="currency-select" role="radiogroup" aria-label="Currency">
            {CURRENCIES.map((c) => (
              <button
                key={c}
                ref={(el) => (currencyBtnRefs.current[c] = el)}
                className={`currency-select__btn${c === "USD" ? " active" : ""}`}
                role="radio"
                aria-checked={c === "USD"}
                onClick={() => handleCurrency(c)}
                aria-label={`${c} - ${pricingMatrix.currency[c].symbol}`}
              >
                {pricingMatrix.currency[c].symbol} {c}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing cards */}
        <div className="pricing-grid reveal" role="list">
          {TIERS.map((tierKey) => {
            const tier = pricingMatrix.tiers[tierKey];
            return (
              <article
                key={tierKey}
                className={`pricing-card reveal${tier.highlighted ? " pricing-card--highlighted" : ""}`}
                role="listitem"
                aria-label={`${tier.name} plan`}
              >
                {tier.badge && (
                  <div className="pricing-card__badge" aria-label={tier.badge}>
                    {tier.badge}
                  </div>
                )}

                <header className="pricing-card__header">
                  <div className="pricing-card__name">{tier.name}</div>
                  <p className="pricing-card__desc">{tier.description}</p>
                </header>

                <div>
                  <div className="pricing-card__price-block" aria-live="polite">
                    <span
                      className="pricing-card__currency"
                      ref={(el) => (symbolRefs.current[tierKey] = el)}
                      aria-label="Currency symbol"
                    >
                      $
                    </span>
                    <span
                      className="pricing-card__amount"
                      ref={(el) => (amountRefs.current[tierKey] = el)}
                      aria-label="Price"
                    >
                      ...
                    </span>
                    <span className="pricing-card__period">/mo</span>
                  </div>
                  <div
                    className="pricing-card__savings"
                    ref={(el) => (savingsRefs.current[tierKey] = el)}
                    aria-live="polite"
                  >
                    &nbsp;
                  </div>
                </div>

                <div className="pricing-card__divider" aria-hidden="true" />

                <ul className="pricing-card__features" aria-label={`${tier.name} features`}>
                  {tier.features.map((f) => (
                    <li key={f} className="pricing-card__feature">
                      <span className="pricing-card__feature-check" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`pricing-card__cta${tier.highlighted ? " pricing-card__cta--primary" : " pricing-card__cta--secondary"}`}
                  aria-label={`Get started with ${tier.name}`}
                >
                  {tier.highlighted ? "Get Started" : "Start Free Trial"}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
