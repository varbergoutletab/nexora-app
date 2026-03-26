"use client";

import { useEffect, useState } from "react";

type Invite = {
  id: string;
  inviter: string;
  invitedUser: string;
  status: "pending" | "rewarded";
  date: string;
};

export default function ReferralsPage() {
  const user =
    typeof window !== "undefined"
      ? localStorage.getItem("logged_user") || "admin"
      : "admin";

  const [bonus, setBonus] = useState(25);
  const [invitedUser, setInvitedUser] = useState("");
  const [invites, setInvites] = useState<Invite[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setBonus(Number(localStorage.getItem(`referralBonus_${user}`) || "25"));

    const allInvites: Invite[] = JSON.parse(localStorage.getItem("invites") || "[]");
    setInvites(allInvites.filter((i) => i.inviter === user));
  }, [user]);

  const createInvite = () => {
    if (!invitedUser.trim()) {
      setMessage("Please enter invited username.");
      return;
    }

    const allInvites: Invite[] = JSON.parse(localStorage.getItem("invites") || "[]");

    const newInvite: Invite = {
      id: `inv_${Date.now()}`,
      inviter: user,
      invitedUser: invitedUser.trim(),
      status: "pending",
      date: new Date().toLocaleString(),
    };

    const updated = [newInvite, ...allInvites];
    localStorage.setItem("invites", JSON.stringify(updated));
    setInvites(updated.filter((i) => i.inviter === user));
    setInvitedUser("");
    setMessage("Referral saved.");
  };

  const claimDemoBonus = (id: string) => {
    const allInvites: Invite[] = JSON.parse(localStorage.getItem("invites") || "[]");
    const target = allInvites.find((i) => i.id === id);

    if (!target || target.status !== "pending") return;

    target.status = "rewarded";

    const currentBalance = Number(localStorage.getItem(`balance_${user}`) || "0");
    localStorage.setItem(`balance_${user}`, String(currentBalance + bonus));

    localStorage.setItem("invites", JSON.stringify(allInvites));
    setInvites(allInvites.filter((i) => i.inviter === user));
    setMessage(`Direct referral bonus added: ${bonus} USDT`);
  };

  return (
    <div className="min-h-screen bg-gradient-main px-4 py-8 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold text-yellow-400">Referrals</h1>

        <div className="card p-6">
          <div className="mb-4 text-sm text-gray-400">
            Direct referral bonus: {bonus} USDT
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr,auto]">
            <input
              type="text"
              placeholder="Invited username"
              value={invitedUser}
              onChange={(e) => setInvitedUser(e.target.value)}
              className="w-full rounded-xl border border-red-900/40 bg-black px-4 py-3 text-white outline-none"
            />

            <button
              onClick={createInvite}
              className="rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-red-500 hover:text-white"
            >
              Add Referral
            </button>
          </div>

          {message && (
            <div className="mt-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-yellow-400">
              {message}
            </div>
          )}
        </div>

        <div className="mt-8 card p-6">
          <h2 className="mb-4 text-xl font-semibold text-yellow-400">
            Direct Referral Records
          </h2>

          <div className="space-y-3">
            {invites.length === 0 ? (
              <div className="rounded-xl border border-red-900/40 bg-black p-4 text-gray-400">
                No referrals yet.
              </div>
            ) : (
              invites.map((i) => (
                <div
                  key={i.id}
                  className="flex flex-col gap-3 rounded-xl border border-red-900/40 bg-black p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="text-white">{i.invitedUser}</div>
                    <div className="text-xs text-gray-500">{i.date}</div>
                  </div>

                  <div
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      i.status === "rewarded"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {i.status}
                  </div>

                  {i.status === "pending" && (
                    <button
                      onClick={() => claimDemoBonus(i.id)}
                      className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white"
                    >
                      Apply Bonus
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}