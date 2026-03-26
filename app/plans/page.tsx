import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$140",
    subtitle: "Entry-level access",
    features: [
      "Basic dashboard access",
      "Wallet interface",
      "Standard reporting",
      "Email support",
    ],
    badge: "Entry",
  },
  {
    name: "Pro",
    price: "$240",
    subtitle: "Balanced professional tier",
    features: [
      "Advanced dashboard layout",
      "Extended wallet management",
      "Reward and referral access",
      "Priority support",
    ],
    badge: "Popular",
  },
  {
    name: "Advanced",
    price: "$480",
    subtitle: "Expanded operational access",
    features: [
      "Enhanced reporting tools",
      "Expanded portfolio overview",
      "Internal activity history",
      "Review-ready compliance flow",
    ],
    badge: "Growth",
  },
  {
    name: "Elite",
    price: "$1440",
    subtitle: "High-tier institutional style",
    features: [
      "Premium interface controls",
      "Detailed internal monitoring",
      "Advanced user management view",
      "Priority administrative workflows",
    ],
    badge: "Elite",
  },
  {
    name: "Institutional",
    price: "$2880",
    subtitle: "Enterprise-oriented access",
    features: [
      "Institutional-grade dashboard concept",
      "Expanded operational overview",
      "Structured compliance presentation",
      "High-level internal management tools",
    ],
    badge: "Enterprise",
  },
];

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-gradient-main px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-yellow-400">Subscription Plans</h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
            This section presents the platform subscription structure in a clear
            and professional format for product review, licensing presentation,
            and operational demonstration.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="rounded-full bg-green-600/20 px-4 py-2 text-sm text-green-400">
              KYC Workflow Enabled
            </span>
            <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm text-blue-400">
              AML-Oriented Design
            </span>
            <span className="rounded-full bg-yellow-600/20 px-4 py-2 text-sm text-yellow-400">
              EU Compliance Standards
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-6 ${
                index === 1
                  ? "border-yellow-400 bg-zinc-950 shadow-lg shadow-yellow-500/10"
                  : "border-red-900/40 bg-zinc-950"
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-yellow-400">{plan.name}</h2>
                <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
                  {plan.badge}
                </span>
              </div>

              <div className="text-3xl font-extrabold text-white">{plan.price}</div>
              <div className="mt-2 text-sm text-gray-400">{plan.subtitle}</div>

              <div className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-xl border border-red-900/40 bg-black px-4 py-3 text-sm text-gray-300"
                  >
                    {feature}
                  </div>
                ))}
              </div>

              <button className="mt-6 w-full rounded-xl bg-yellow-400 px-4 py-3 font-semibold text-black transition hover:bg-red-500 hover:text-white">
                Select Plan
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="card p-6">
            <h2 className="mb-4 text-xl font-semibold text-yellow-400">
              Plan Structure Notice
            </h2>

            <p className="text-sm leading-7 text-gray-300">
              The plan structure presented in this demo environment is intended
              to illustrate subscription segmentation, access levels, product
              presentation, and user-facing onboarding flow. It is provided for
              licensing review and internal product evaluation purposes.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="mb-4 text-xl font-semibold text-yellow-400">
              Next Step
            </h2>

            <p className="mb-4 text-sm leading-7 text-gray-300">
              Continue to onboarding, verification, wallet access, or admin
              review modules to inspect the complete demo workflow.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/kyc"
                className="rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black"
              >
                Open KYC
              </Link>

              <Link
                href="/dashboard"
                className="rounded-xl border border-red-500 px-5 py-3 font-semibold text-yellow-300"
              >
                Open Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}