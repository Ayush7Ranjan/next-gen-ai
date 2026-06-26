export const pricingMatrix = {
  tiers: {
    starter: {
      name: "Starter",
      base: 29,
      description: "Perfect for individuals and small teams exploring AI automation.",
      features: [
        "5 AI Workflows",
        "10,000 API calls/month",
        "Basic analytics dashboard",
        "Email support",
        "2 integrations",
        "Community access"
      ],
      highlighted: false,
      badge: null
    },
    pro: {
      name: "Pro",
      base: 89,
      description: "Built for growing teams that need advanced automation at scale.",
      features: [
        "Unlimited AI Workflows",
        "500,000 API calls/month",
        "Advanced analytics & insights",
        "Priority support 24/7",
        "50+ integrations",
        "Custom model fine-tuning",
        "Team collaboration tools",
        "API access"
      ],
      highlighted: true,
      badge: "Most Popular"
    },
    enterprise: {
      name: "Enterprise",
      base: 249,
      description: "Dedicated infrastructure and compliance for large organizations.",
      features: [
        "Everything in Pro",
        "Unlimited API calls",
        "Dedicated infrastructure",
        "SLA guarantees (99.99%)",
        "Custom integrations",
        "On-premise deployment",
        "Dedicated account manager",
        "SOC 2 & HIPAA compliance",
        "Custom SLA"
      ],
      highlighted: false,
      badge: null
    }
  },
  currency: {
    USD: { symbol: "$", tariff: 1.0, code: "USD" },
    INR: { symbol: "₹", tariff: 83.5, code: "INR" },
    EUR: { symbol: "€", tariff: 0.92, code: "EUR" }
  },
  billing: {
    monthly: { multiplier: 1, discount: 0, label: "Monthly" },
    annual: { multiplier: 12, discount: 0.2, label: "Annual" }
  }
};

export function computePrice(tierKey, currencyKey, billingKey) {
  const tier = pricingMatrix.tiers[tierKey];
  const currency = pricingMatrix.currency[currencyKey];
  const billing = pricingMatrix.billing[billingKey];

  const baseMonthly = tier.base;
  const discountedMonthly = baseMonthly * (1 - billing.discount);
  const inUsd = billingKey === "annual" ? discountedMonthly : baseMonthly;
  const converted = inUsd * currency.tariff;

  if (currencyKey === "INR") {
    return Math.round(converted);
  }

  return Math.round(converted * 10) / 10;
}
