export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b0b] to-black px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Title */}
        <h1 className="mb-6 text-3xl font-bold text-yellow-400">
          Compliance & Regulatory Overview
        </h1>

        <p className="mb-10 max-w-3xl text-sm text-gray-400">
          This platform is designed as a structured digital asset system aligned
          with European compliance principles including KYC, AML, and operational
          transparency. The current version is a controlled demo environment
          intended for licensing review and regulatory presentation.
        </p>

        {/* Overview */}
        <div className="card mb-8 p-6">
          <h2 className="mb-3 text-xl text-yellow-400">Platform Overview</h2>
          <p className="text-sm leading-7 text-gray-300">
            Nexora provides a simulated environment for digital asset operations
            including user onboarding, wallet management, transaction tracking,
            and administrative control. The system reflects a compliance-ready
            structure designed to meet regulatory expectations within the
            European financial framework.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* KYC */}
          <div className="card p-6">
            <h2 className="mb-3 text-yellow-400">KYC Verification System</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Identity verification workflow</li>
              <li>• Document upload and review</li>
              <li>• Manual approval / rejection</li>
              <li>• Status tracking for users</li>
            </ul>
          </div>

          {/* AML */}
          <div className="card p-6">
            <h2 className="mb-3 text-yellow-400">AML Framework</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Transaction monitoring (demo simulation)</li>
              <li>• Risk profile review</li>
              <li>• Source of funds verification</li>
              <li>• Suspicious activity indicators</li>
            </ul>
          </div>

          {/* Wallet */}
          <div className="card p-6">
            <h2 className="mb-3 text-yellow-400">Wallet & Transactions</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Deposit request system</li>
              <li>• Proof of transfer upload</li>
              <li>• Withdrawal request management</li>
              <li>• Internal balance tracking</li>
            </ul>
          </div>

          {/* Admin */}
          <div className="card p-6">
            <h2 className="mb-3 text-yellow-400">Administrative Controls</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• User management panel</li>
              <li>• KYC approval system</li>
              <li>• Transaction oversight</li>
              <li>• Platform configuration controls</li>
            </ul>
          </div>

        </div>

        {/* Compliance Tags */}
        <div className="mt-10 flex flex-wrap gap-3">
          <span className="rounded-full bg-green-500/10 px-4 py-2 text-xs font-semibold text-green-400">
            KYC Verified Structure
          </span>

          <span className="rounded-full bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-400">
            AML Compliant Framework
          </span>

          <span className="rounded-full bg-yellow-500/10 px-4 py-2 text-xs font-semibold text-yellow-400">
            EU Regulatory Alignment
          </span>

          <span className="rounded-full bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400">
            Demo Environment
          </span>
        </div>

        {/* Notice */}
        <div className="mt-10 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-6">
          <h2 className="mb-3 text-yellow-400">Important Notice</h2>
          <p className="text-sm leading-7 text-gray-300">
            This platform is presented as a controlled demonstration system for
            licensing evaluation, regulatory review, and operational presentation.
            It does not represent a live financial service or active trading
            environment. All data, transactions, and balances are simulated for
            demonstration purposes only.
          </p>
        </div>

      </div>
    </div>
  );
}