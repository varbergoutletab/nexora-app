"use client";

import { useEffect, useMemo, useState } from "react";

type Withdraw = {
  id: string;
  user: string;
  amount: number;
  fee: number;
  net: number;
  status: string;
  date: string;
};

type Deposit = {
  id: string;
  user: string;
  amount: number;
  status: string;
  date: string;
};

export default function DashboardPage() {
  const user =
    typeof window !== "undefined"
      ? localStorage.getItem("logged_user") || "admin"
      : "admin";

  const [balance, setBalance] = useState(0);
  const [rate, setRate] = useState(0);
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [withdraws, setWithdraws] = useState<Withdraw[]>([]);
  const [bonus, setBonus] = useState(0);

  const formatUSDT = (num: number) =>
    `${num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} USDT`;

  useEffect(() => {
    let currentBalance = Number(localStorage.getItem(`balance_${user}`) || "1000");
    const todayRate = Number(localStorage.getItem(`todayRate_${user}`) || "0");

    const today = new Date().toDateString();
    const last = localStorage.getItem(`lastRate_${user}`);

    if (last !== today) {
      const change = (currentBalance * todayRate) / 100;
      currentBalance += change;

      localStorage.setItem(`balance_${user}`, String(currentBalance));
      localStorage.setItem(`lastRate_${user}`, today);
    }

    const allDeposits: Deposit[] = JSON.parse(
      localStorage.getItem("deposit_requests") || "[]"
    );

    const allWithdraws: Withdraw[] = JSON.parse(
      localStorage.getItem("withdraw_requests") || "[]"
    );

    const invites = JSON.parse(localStorage.getItem("invites") || "[]");
    const myBonus = invites
      .filter((i: any) => i.inviter === user && i.status === "rewarded")
      .length * Number(localStorage.getItem(`referralBonus_${user}`) || "0");

    setBonus(myBonus);
    setBalance(currentBalance);
    setRate(todayRate);
    setDeposits(allDeposits.filter((d) => d.user === user));
    setWithdraws(allWithdraws.filter((w) => w.user === user));
  }, [user]);

  const todayResult = useMemo(() => {
    return (balance * rate) / 100;
  }, [balance, rate]);

  return (
    <div className="min-h-screen bg-gradient-main px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-6 text-3xl font-bold text-yellow-400">
          Dashboard
        </h1>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-4">

          <div className="card p-5">
            <div className="text-gray-400 text-sm">Balance</div>
            <div className="text-2xl text-yellow-400 font-bold mt-2">
              {formatUSDT(balance)}
            </div>
          </div>

          <div className="card p-5">
            <div className="text-gray-400 text-sm">Today Rate</div>
            <div className="text-2xl text-green-400 font-bold mt-2">
              {rate}%
            </div>
          </div>

          <div className="card p-5">
            <div className="text-gray-400 text-sm">Today Result</div>
            <div className="text-2xl text-green-400 font-bold mt-2">
              {formatUSDT(todayResult)}
            </div>
          </div>

          <div className="card p-5">
            <div className="text-gray-400 text-sm">Referral Bonus</div>
            <div className="text-2xl text-yellow-400 font-bold mt-2">
              {formatUSDT(bonus)}
            </div>
          </div>

        </div>

        {/* Activity */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          {/* Deposits */}
          <div className="card p-6">
            <h2 className="text-xl text-yellow-400 mb-4">
              Recent Deposits
            </h2>

            {deposits.length === 0 ? (
              <div className="text-gray-400">No deposits</div>
            ) : (
              deposits.slice(0, 5).map((d) => (
                <div
                  key={d.id}
                  className="border border-red-900/40 p-3 rounded mb-2 bg-black"
                >
                  <div>{formatUSDT(d.amount)}</div>
                  <div className="text-xs text-gray-500">{d.date}</div>
                  <div className="text-xs text-yellow-400">{d.status}</div>
                </div>
              ))
            )}
          </div>

          {/* Withdraws */}
          <div className="card p-6">
            <h2 className="text-xl text-yellow-400 mb-4">
              Recent Withdrawals
            </h2>

            {withdraws.length === 0 ? (
              <div className="text-gray-400">No withdrawals</div>
            ) : (
              withdraws.slice(0, 5).map((w) => (
                <div
                  key={w.id}
                  className="border border-red-900/40 p-3 rounded mb-2 bg-black"
                >
                  <div>
                    {formatUSDT(w.amount)} → {formatUSDT(w.net)}
                  </div>
                  <div className="text-xs text-gray-500">{w.date}</div>
                  <div className="text-xs text-red-400">
                    Fee: {formatUSDT(w.fee)}
                  </div>
                  <div className="text-xs text-yellow-400">{w.status}</div>
                </div>
              ))
            )}
          </div>

        </div>

        {/* Info */}
        <div className="mt-8 card p-6">
          <h2 className="text-xl text-yellow-400 mb-4">
            System Info
          </h2>

          <p className="text-gray-300 text-sm">
            Daily rate is controlled by admin and may change depending on
            system conditions. All balances are displayed in USDT.
          </p>
        </div>

      </div>
    </div>
  );
}