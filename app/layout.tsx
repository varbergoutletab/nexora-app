import "./globals.css";
import Link from "next/link";
import NexoraLogo from "./components/NexoraLogo";

export const metadata = {
  title: "Nexora",
  description: "Digital Asset Platform Demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        {/* Regulatory Notice */}
        <div className="border-b border-yellow-500/30 bg-yellow-500/10 py-2 text-center text-xs text-yellow-400">
          Demo Platform — Built for Licensing Review & Regulatory Presentation
          (EU Compliance Oriented)
        </div>

        {/* Navbar */}
        <nav className="border-b border-red-900/40 bg-black/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
            <Link href="/" className="shrink-0">
              <NexoraLogo />
            </Link>

            <div className="flex flex-wrap items-center gap-4 text-sm md:gap-6">
              <Link href="/" className="text-yellow-300 hover:text-yellow-400">
                Home
              </Link>

              <Link
                href="/dashboard"
                className="text-yellow-300 hover:text-yellow-400"
              >
                Dashboard
              </Link>

              <Link
                href="/kyc"
                className="text-yellow-300 hover:text-yellow-400"
              >
                KYC
              </Link>

              <Link
                href="/wallet"
                className="text-yellow-300 hover:text-yellow-400"
              >
                Wallet
              </Link>

              <Link
                href="/market"
                className="text-yellow-300 hover:text-yellow-400"
              >
                Market
              </Link>

              <Link
                href="/plans"
                className="text-yellow-300 hover:text-yellow-400"
              >
                Plans
              </Link>

              <Link
                href="/referrals"
                className="text-yellow-300 hover:text-yellow-400"
              >
                Referrals
              </Link>

              <Link
                href="/rewards"
                className="text-yellow-300 hover:text-yellow-400"
              >
                Rewards
              </Link>

              <Link
                href="/contact"
                className="text-yellow-300 hover:text-yellow-400"
              >
                Contact
              </Link>

              <Link
                href="/compliance"
                className="text-yellow-300 hover:text-yellow-400"
              >
                Compliance
              </Link>

              <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                Demo Active
              </span>

              <a
                href="https://t.me/yourtelegramusername"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-yellow-400 px-4 py-2 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
              >
                Support 24/7
              </a>

              <Link
                href="/admin"
                className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-500"
              >
                Admin
              </Link>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        {/* Floating Telegram Button */}
        <a
          href="https://t.me/yourtelegramusername"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 rounded-full bg-yellow-400 px-5 py-3 font-semibold text-black shadow-lg shadow-red-900/40 transition hover:bg-red-500 hover:text-white"
        >
          Telegram 24/7
        </a>
      </body>
    </html>
  );
}