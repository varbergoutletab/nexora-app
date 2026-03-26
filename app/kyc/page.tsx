"use client";

import { useEffect, useState } from "react";

export default function KycPage() {
  const [user, setUser] = useState("admin");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    const loggedUser = localStorage.getItem("logged_user") || "admin";
    setUser(loggedUser);

    const savedKyc = localStorage.getItem(`kyc_${loggedUser}`);
    if (savedKyc) {
      setStatus(savedKyc);
    }
  }, []);

  const updateStatus = (newStatus: string) => {
    setStatus(newStatus);
    localStorage.setItem(`kyc_${user}`, newStatus);
  };

  return (
    <div className="min-h-screen bg-gradient-main px-4 py-8 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold text-yellow-400">
          Verification Center
        </h1>

        <p className="mb-6 text-sm text-gray-400">
          Demo user: <span className="text-white">{user}</span>
        </p>

        <div className="mb-6 card p-6">
          <div className="text-sm text-gray-400">Current Status</div>
          <div
            className={`mt-2 text-3xl font-bold ${
              status === "Approved"
                ? "text-green-400"
                : status === "Rejected"
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          >
            {status}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="mb-4 text-xl font-semibold text-yellow-400">
              Identity Documents
            </h2>

            <div className="space-y-4">
              <div className="rounded-xl border border-red-900/40 bg-black p-4">
                Government ID Upload
              </div>
              <div className="rounded-xl border border-red-900/40 bg-black p-4">
                Selfie Verification
              </div>
              <div className="rounded-xl border border-red-900/40 bg-black p-4">
                Proof of Address
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="mb-4 text-xl font-semibold text-yellow-400">
              Compliance Review
            </h2>

            <div className="space-y-4">
              <div className="rounded-xl border border-red-900/40 bg-black p-4">
                Source of Funds Questionnaire
              </div>
              <div className="rounded-xl border border-red-900/40 bg-black p-4">
                Risk Profile Review
              </div>
              <div className="rounded-xl border border-red-900/40 bg-black p-4">
                Manual Compliance Approval
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 card p-6">
          <h2 className="mb-4 text-xl font-semibold text-yellow-400">
            Demo Status Controls
          </h2>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => updateStatus("Pending")}
              className="rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black"
            >
              Set Pending
            </button>

            <button
              onClick={() => updateStatus("Approved")}
              className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white"
            >
              Set Approved
            </button>

            <button
              onClick={() => updateStatus("Rejected")}
              className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white"
            >
              Set Rejected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}