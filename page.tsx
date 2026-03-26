import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#0b0b0b] to-black px-4 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-red-900/40 bg-zinc-950 px-4 py-2 text-sm text-yellow-400">
              Digital Asset Platform Demo
            </div>

            <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-yellow-400 md:text-6xl">
              Nexora
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-gray-300">
              A professional digital asset platform demo designed for licensing,
              compliance presentation, and internal product review.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400">
              This platform is built in accordance with European financial
              compliance and regulatory standards.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">
                KYC Verified
              </span>
              <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
                AML Compliant
              </span>
              <span className="rounded-full bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">
                EU Standards
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-red-500 hover:text-white"
              >
                Open Dashboard
              </Link>

              <Link
                href="/kyc"
                className="rounded-xl border border-red-500 px-6 py-3 font-semibold text-yellow-300 transition hover:bg-red-600 hover:text-white"
              >
                View Verification
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="card p-4 text-center">
                <div className="text-sm text-gray-400">Compliance</div>
                <div className="mt-1 font-bold text-yellow-400">EU Ready</div>
              </div>

              <div className="card p-4 text-center">
                <div className="text-sm text-gray-400">Verification</div>
                <div className="mt-1 font-bold text-green-400">KYC Enabled</div>
              </div>

              <div className="card p-4 text-center">
                <div className="text-sm text-gray-400">Security</div>
                <div className="mt-1 font-bold text-blue-400">Encrypted</div>
              </div>

              <div className="card p-4 text-center">
                <div className="text-sm text-gray-400">Mode</div>
                <div className="mt-1 font-bold text-red-400">Demo</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-red-900/40 bg-zinc-950 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Platform Overview</div>
                <div className="mt-2 text-3xl font-bold text-yellow-400">
                  Compliance-Ready Demo
                </div>
              </div>

              <div className="rounded-xl bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">
                Active
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="card p-5">
                <div className="text-sm text-gray-400">User Accounts</div>
                <div className="mt-2 text-2xl font-bold text-yellow-400">
                  3 Demo Users
                </div>
              </div>

              <div className="card p-5">
                <div className="text-sm text-gray-400">Verification Flow</div>
                <div className="mt-2 text-2xl font-bold text-yellow-400">
                  Enabled
                </div>
              </div>

              <div className="card p-5">
                <div className="text-sm text-gray-400">Wallet Interface</div>
                <div className="mt-2 text-2xl font-bold text-yellow-400">
                  Demo Mode
                </div>
              </div>

              <div className="card p-5">
                <div className="text-sm text-gray-400">Admin Controls</div>
                <div className="mt-2 text-2xl font-bold text-yellow-400">
                  Available
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-red-900/40 bg-black p-5">
              <div className="mb-2 text-sm text-gray-400">Notice</div>
              <p className="text-sm leading-7 text-gray-300">
                This build is intended for licensing review, operational
                presentation, and internal evaluation. Market information is
                display-only in the current demo environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}