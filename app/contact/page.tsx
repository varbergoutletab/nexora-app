export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-main px-4 py-8 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold text-yellow-400">
          Contact & Support
        </h1>

        <p className="mb-8 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
          This support section is included to demonstrate a structured assistance
          channel, onboarding communication path, and operational support layer
          as part of the platform demo and licensing presentation.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="mb-4 text-xl font-semibold text-yellow-400">
              Support Availability
            </h2>

            <div className="space-y-4">
              <div className="rounded-xl border border-red-900/40 bg-black p-4 text-gray-300">
                24/7 customer assistance channel
              </div>
              <div className="rounded-xl border border-red-900/40 bg-black p-4 text-gray-300">
                Demo onboarding support
              </div>
              <div className="rounded-xl border border-red-900/40 bg-black p-4 text-gray-300">
                Operational inquiry response workflow
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="mb-4 text-xl font-semibold text-yellow-400">
              Telegram Support
            </h2>

            <div className="rounded-xl border border-red-900/40 bg-black p-5">
              <div className="text-sm text-gray-400">Primary contact channel</div>
              <div className="mt-2 text-lg font-semibold text-yellow-400">
                @yourtelegramusername
              </div>
            </div>

            <a
              href="https://t.me/yourtelegramusername"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-red-500 hover:text-white"
            >
              Open Telegram
            </a>
          </div>
        </div>

        <div className="mt-8 card p-6">
          <h2 className="mb-4 text-xl font-semibold text-yellow-400">
            Compliance Statement
          </h2>

          <p className="text-sm leading-7 text-gray-300">
            The communication channels presented in this demo are intended to
            reflect structured customer assistance, operational support, and
            compliance-oriented user guidance under a controlled product review
            environment.
          </p>
        </div>
      </div>
    </div>
  );
}