"use client";

import { useEffect, useState } from "react";

type DepositRequest = {
  id: string;
  user: string;
  amount: number;
  txid: string;
  proofImage: string;
  status: "pending" | "approved" | "rejected";
  date: string;
};

type WithdrawRequest = {
  id: string;
  user: string;
  amount: number;
  fee: number;
  net: number;
  wallet: string;
  status: "pending" | "approved" | "completed" | "rejected";
  approved: boolean;
  date: string;
  releaseTime: number | null;
};

type UserConfig = {
  todayRate: number;
  withdrawFee: number;
};

const DEMO_USERS = ["admin", "wife", "brother"];

export default function AdminPage() {
  const [deposits, setDeposits] = useState<DepositRequest[]>([]);
  const [withdraws, setWithdraws] = useState<WithdrawRequest[]>([]);
  const [configs, setConfigs] = useState<Record<string, UserConfig>>({});

  const formatUSDT = (num: number) =>
    `${num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} USDT`;

  const loadAll = () => {
    const allDeposits: DepositRequest[] = JSON.parse(
      localStorage.getItem("deposit_requests") || "[]"
    );

    const allWithdraws: WithdrawRequest[] = JSON.parse(
      localStorage.getItem("withdraw_requests") || "[]"
    );

    const cfg: Record<string, UserConfig> = {};

    DEMO_USERS.forEach((user) => {
      cfg[user] = {
        todayRate: Number(localStorage.getItem(`todayRate_${user}`) || "0"),
        withdrawFee: Number(localStorage.getItem(`withdrawFee_${user}`) || "10"),
      };
    });

    setDeposits(allDeposits);
    setWithdraws(allWithdraws);
    setConfigs(cfg);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const saveUserConfig = (user: string) => {
    localStorage.setItem(`todayRate_${user}`, String(configs[user].todayRate));
    localStorage.setItem(`withdrawFee_${user}`, String(configs[user].withdrawFee));
    alert(`Saved settings for ${user}`);
  };

  const approveDeposit = (id: string) => {
    const allDeposits: DepositRequest[] = JSON.parse(
      localStorage.getItem("deposit_requests") || "[]"
    );

    const target = allDeposits.find((d) => d.id === id);
    if (!target || target.status !== "pending") return;

    target.status = "approved";

    const currentBalance = Number(
      localStorage.getItem(`balance_${target.user}`) || "0"
    );
    const newBalance = currentBalance + target.amount;

    localStorage.setItem(`balance_${target.user}`, String(newBalance));
    localStorage.setItem("deposit_requests", JSON.stringify(allDeposits));

    loadAll();
  };

  const rejectDeposit = (id: string) => {
    const allDeposits: DepositRequest[] = JSON.parse(
      localStorage.getItem("deposit_requests") || "[]"
    );

    const target = allDeposits.find((d) => d.id === id);
    if (!target || target.status !== "pending") return;

    target.status = "rejected";
    localStorage.setItem("deposit_requests", JSON.stringify(allDeposits));

    loadAll();
  };

  const approveWithdraw = (id: string) => {
    const allWithdraws: WithdrawRequest[] = JSON.parse(
      localStorage.getItem("withdraw_requests") || "[]"
    );

    const target = allWithdraws.find((w) => w.id === id);
    if (!target || target.status !== "pending") return;

    const currentBalance = Number(
      localStorage.getItem(`balance_${target.user}`) || "0"
    );

    if (currentBalance < target.amount) {
      alert("User has insufficient balance.");
      return;
    }

    target.status = "approved";
    target.approved = true;
    target.releaseTime = Date.now() + 72 * 60 * 60 * 1000;

    localStorage.setItem("withdraw_requests", JSON.stringify(allWithdraws));
    loadAll();
  };

  const rejectWithdraw = (id: string) => {
    const allWithdraws: WithdrawRequest[] = JSON.parse(
      localStorage.getItem("withdraw_requests") || "[]"
    );

    const target = allWithdraws.find((w) => w.id === id);
    if (!target || target.status !== "pending") return;

    target.status = "rejected";
    target.approved = false;
    target.releaseTime = null;

    localStorage.setItem("withdraw_requests", JSON.stringify(allWithdraws));
    loadAll();
  };

  const pendingDeposits = deposits.filter((d) => d.status === "pending").length;
  const pendingWithdraws = withdraws.filter((w) => w.status === "pending").length;
  const totalApprovedDeposits = deposits
    .filter((d) => d.status === "approved")
    .reduce((sum, d) => sum + d.amount, 0);
  const totalCollectedFees = withdraws
    .filter((w) => w.status === "approved" || w.status === "completed")
    .reduce((sum, w) => sum + w.fee, 0);

  return (
    <div className="min-h-screen bg-gradient-main px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold text-yellow-400">
          Admin Control Center
        </h1>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="card p-5">
            <div className="text-sm text-gray-400">Pending Deposits</div>
            <div className="mt-2 text-2xl font-bold text-yellow-400">
              {pendingDeposits}
            </div>
          </div>

          <div className="card p-5">
            <div className="text-sm text-gray-400">Pending Withdrawals</div>
            <div className="mt-2 text-2xl font-bold text-yellow-400">
              {pendingWithdraws}
            </div>
          </div>

          <div className="card p-5">
            <div className="text-sm text-gray-400">Approved Deposits</div>
            <div className="mt-2 text-2xl font-bold text-green-400">
              {formatUSDT(totalApprovedDeposits)}
            </div>
          </div>

          <div className="card p-5">
            <div className="text-sm text-gray-400">Collected Fees</div>
            <div className="mt-2 text-2xl font-bold text-red-400">
              {formatUSDT(totalCollectedFees)}
            </div>
          </div>
        </div>

        <div className="mb-8 card p-6">
          <h2 className="mb-4 text-xl font-semibold text-yellow-400">
            User Daily Rate & Withdraw Fee
          </h2>

          <div className="space-y-4">
            {DEMO_USERS.map((user) => (
              <div
                key={user}
                className="rounded-xl border border-red-900/40 bg-black p-4"
              >
                <div className="mb-3 text-lg font-semibold text-white">{user}</div>

                <div className="grid gap-4 md:grid-cols-[1fr,1fr,auto]">
                  <input
                    type="number"
                    placeholder="Today Rate %"
                    value={configs[user]?.todayRate ?? 0}
                    onChange={(e) =>
                      setConfigs({
                        ...configs,
                        [user]: {
                          ...configs[user],
                          todayRate: Number(e.target.value),
                        },
                      })
                    }
                    className="rounded-xl border border-red-900/40 bg-zinc-950 px-4 py-3 text-white outline-none"
                  />

                  <input
                    type="number"
                    placeholder="Withdraw Fee USDT"
                    value={configs[user]?.withdrawFee ?? 10}
                    onChange={(e) =>
                      setConfigs({
                        ...configs,
                        [user]: {
                          ...configs[user],
                          withdrawFee: Number(e.target.value),
                        },
                      })
                    }
                    className="rounded-xl border border-red-900/40 bg-zinc-950 px-4 py-3 text-white outline-none"
                  />

                  <button
                    onClick={() => saveUserConfig(user)}
                    className="rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-red-500 hover:text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="card p-6">
            <h2 className="mb-4 text-xl font-semibold text-yellow-400">
              Deposit Requests
            </h2>

            <div className="space-y-4">
              {deposits.length === 0 ? (
                <div className="rounded-xl border border-red-900/40 bg-black p-4 text-gray-400">
                  No deposit requests yet.
                </div>
              ) : (
                deposits.map((d) => (
                  <div
                    key={d.id}
                    className="rounded-xl border border-red-900/40 bg-black p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{d.user}</div>
                        <div className="text-xs text-gray-500">{d.date}</div>
                      </div>

                      <div
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          d.status === "approved"
                            ? "bg-green-500/10 text-green-400"
                            : d.status === "rejected"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {d.status}
                      </div>
                    </div>

                    <div className="mb-3 text-white">
                      Amount: {formatUSDT(d.amount)}
                    </div>

                    <div className="mb-3 rounded-xl border border-red-900/40 bg-zinc-950 p-3 text-sm">
                      <div className="mb-2 text-gray-400">TXID</div>
                      <div className="break-all text-white">{d.txid}</div>
                    </div>

                    <div className="rounded-xl border border-red-900/40 bg-zinc-950 p-3">
                      <div className="mb-2 text-sm text-gray-400">
                        Payment Proof
                      </div>
                      <img
                        src={d.proofImage}
                        alt="Proof"
                        className="max-h-80 rounded-xl border border-red-900/40"
                      />
                    </div>

                    {d.status === "pending" && (
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => approveDeposit(d.id)}
                          className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => rejectDeposit(d.id)}
                          className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="mb-4 text-xl font-semibold text-yellow-400">
              Withdraw Requests
            </h2>

            <div className="space-y-4">
              {withdraws.length === 0 ? (
                <div className="rounded-xl border border-red-900/40 bg-black p-4 text-gray-400">
                  No withdraw requests yet.
                </div>
              ) : (
                withdraws.map((w) => (
                  <div
                    key={w.id}
                    className="rounded-xl border border-red-900/40 bg-black p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{w.user}</div>
                        <div className="text-xs text-gray-500">{w.date}</div>
                      </div>

                      <div
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          w.status === "completed"
                            ? "bg-green-500/10 text-green-400"
                            : w.status === "approved"
                            ? "bg-blue-500/10 text-blue-400"
                            : w.status === "rejected"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {w.status}
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="rounded-xl border border-red-900/40 bg-zinc-950 p-3">
                        <div className="text-xs text-gray-400">Amount</div>
                        <div className="mt-1 text-white">{formatUSDT(w.amount)}</div>
                      </div>

                      <div className="rounded-xl border border-red-900/40 bg-zinc-950 p-3">
                        <div className="text-xs text-gray-400">Fee</div>
                        <div className="mt-1 text-white">{formatUSDT(w.fee)}</div>
                      </div>

                      <div className="rounded-xl border border-red-900/40 bg-zinc-950 p-3">
                        <div className="text-xs text-gray-400">Receive</div>
                        <div className="mt-1 text-white">{formatUSDT(w.net)}</div>
                      </div>
                    </div>

                    <div className="mt-3 rounded-xl border border-red-900/40 bg-zinc-950 p-3 text-sm">
                      <div className="mb-2 text-gray-400">Destination Wallet</div>
                      <div className="break-all text-white">{w.wallet}</div>
                    </div>

                    {w.status === "pending" && (
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => approveWithdraw(w.id)}
                          className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => rejectWithdraw(w.id)}
                          className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white"
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {w.status === "approved" && (
                      <div className="mt-4 rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 text-sm text-blue-300">
                        Approved. Settlement after 72 hours.
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}