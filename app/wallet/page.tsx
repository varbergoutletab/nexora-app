"use client";

import { ChangeEvent, useEffect, useState } from "react";

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

export default function WalletPage() {
  const user =
    typeof window !== "undefined"
      ? localStorage.getItem("logged_user") || "admin"
      : "admin";

  //TMoJ9rSt9wdP39y56twStLT3up536GUTfB
  const platformWallet = "TMoJ9rSt9wdP39y56twStLT3up536GUTfB";
  const networkName = "USDT (TRC20)";

  const [balance, setBalance] = useState(0);
  const [userWallet, setUserWallet] = useState("");
  const [savedWallet, setSavedWallet] = useState("");

  const [depositAmount, setDepositAmount] = useState("");
  const [depositTxid, setDepositTxid] = useState("");
  const [depositProof, setDepositProof] = useState("");

  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [message, setMessage] = useState("");

  const [depositRequests, setDepositRequests] = useState<DepositRequest[]>([]);
  const [withdrawRequests, setWithdrawRequests] = useState<WithdrawRequest[]>([]);

  const withdrawFee = Number(localStorage.getItem(`withdrawFee_${user}`) || "10");

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    platformWallet
  )}`;

  const formatUSDT = (num: number) =>
    `${num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} USDT`;

  useEffect(() => {
    const savedBalance = Number(localStorage.getItem(`balance_${user}`) || "1000");
    const wallet = localStorage.getItem(`wallet_${user}`) || "";

    const allDeposits: DepositRequest[] = JSON.parse(
      localStorage.getItem("deposit_requests") || "[]"
    );

    const allWithdraws: WithdrawRequest[] = JSON.parse(
      localStorage.getItem("withdraw_requests") || "[]"
    );

    setBalance(savedBalance);
    setUserWallet(wallet);
    setSavedWallet(wallet);
    setDepositRequests(allDeposits.filter((d) => d.user === user));
    setWithdrawRequests(allWithdraws.filter((w) => w.user === user));
  }, [user]);

  const refreshRequests = () => {
    const allDeposits: DepositRequest[] = JSON.parse(
      localStorage.getItem("deposit_requests") || "[]"
    );
    const allWithdraws: WithdrawRequest[] = JSON.parse(
      localStorage.getItem("withdraw_requests") || "[]"
    );

    setDepositRequests(allDeposits.filter((d) => d.user === user));
    setWithdrawRequests(allWithdraws.filter((w) => w.user === user));
    setBalance(Number(localStorage.getItem(`balance_${user}`) || "1000"));
  };

  const saveUserWallet = () => {
    if (!userWallet.trim()) {
      setMessage("Please enter your wallet address.");
      return;
    }

    localStorage.setItem(`wallet_${user}`, userWallet.trim());
    setSavedWallet(userWallet.trim());
    setMessage("Your wallet has been linked successfully.");
  };

  const copyPlatformWallet = async () => {
    await navigator.clipboard.writeText(platformWallet);
    setMessage("Platform wallet address copied.");
  };

  const handleProofUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setDepositProof(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const submitDepositNotification = () => {
    const amount = Number(depositAmount);

    if (!amount || amount <= 0) {
      setMessage("Please enter a valid deposit amount.");
      return;
    }

    if (!depositTxid.trim()) {
      setMessage("Please enter the transaction hash (TXID).");
      return;
    }

    if (!depositProof) {
      setMessage("Please upload the payment proof image.");
      return;
    }

    const allDeposits: DepositRequest[] = JSON.parse(
      localStorage.getItem("deposit_requests") || "[]"
    );

    const newDeposit: DepositRequest = {
      id: `dep_${Date.now()}`,
      user,
      amount,
      txid: depositTxid.trim(),
      proofImage: depositProof,
      status: "pending",
      date: new Date().toLocaleString(),
    };

    const updated = [newDeposit, ...allDeposits];
    localStorage.setItem("deposit_requests", JSON.stringify(updated));

    setDepositAmount("");
    setDepositTxid("");
    setDepositProof("");
    setMessage("Payment notification sent successfully.");
    refreshRequests();
  };

  const submitWithdrawRequest = () => {
    const amount = Number(withdrawAmount);

    if (!amount || amount <= 0) {
      setMessage("Please enter a valid withdrawal amount.");
      return;
    }

    if (!savedWallet.trim()) {
      setMessage("Please link your wallet first before withdrawing.");
      return;
    }

    if (amount > balance) {
      setMessage("Insufficient balance.");
      return;
    }

    const net = amount - withdrawFee;

    if (net <= 0) {
      setMessage("Withdrawal amount must be greater than the fee.");
      return;
    }

    const allWithdraws: WithdrawRequest[] = JSON.parse(
      localStorage.getItem("withdraw_requests") || "[]"
    );

    const newWithdraw: WithdrawRequest = {
      id: `wdr_${Date.now()}`,
      user,
      amount,
      fee: withdrawFee,
      net,
      wallet: savedWallet,
      status: "pending",
      approved: false,
      date: new Date().toLocaleString(),
      releaseTime: null,
    };

    const updated = [newWithdraw, ...allWithdraws];
    localStorage.setItem("withdraw_requests", JSON.stringify(updated));

    setWithdrawAmount("");
    setMessage("Withdrawal request submitted successfully.");
    refreshRequests();
  };

  return (
    <div className="min-h-screen bg-gradient-main px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-yellow-400">Wallet Center</h1>
        <p className="mb-8 text-sm text-gray-400">
          Demo account: <span className="text-white">{user}</span>
        </p>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="card p-5">
            <div className="text-sm text-gray-400">Available Balance</div>
            <div className="mt-2 text-2xl font-bold text-yellow-400">
              {formatUSDT(balance)}
            </div>
          </div>

          <div className="card p-5">
            <div className="text-sm text-gray-400">Withdraw Fee</div>
            <div className="mt-2 text-2xl font-bold text-red-400">
              {formatUSDT(withdrawFee)}
            </div>
          </div>

          <div className="card p-5">
            <div className="text-sm text-gray-400">Linked Wallet</div>
            <div className="mt-2 text-sm font-semibold text-green-400 break-all">
              {savedWallet || "Not linked yet"}
            </div>
          </div>

          <div className="card p-5">
            <div className="text-sm text-gray-400">Wallet Status</div>
            <div className="mt-2 text-2xl font-bold text-green-400">Active</div>
          </div>
        </div>

        {message && (
          <div className="mb-6 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-yellow-400">
            {message}
          </div>
        )}

        <div className="mb-8 card p-6">
          <h2 className="mb-4 text-xl font-semibold text-yellow-400">
            Link Your Wallet
          </h2>

          <div className="grid gap-4 md:grid-cols-[1fr,auto]">
            <input
              type="text"
              placeholder="Enter your wallet address"
              value={userWallet}
              onChange={(e) => setUserWallet(e.target.value)}
              className="w-full rounded-xl border border-red-900/40 bg-black px-4 py-3 text-white outline-none"
            />

            <button
              onClick={saveUserWallet}
              className="rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-red-500 hover:text-white"
            >
              Save Wallet
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h2 className="mb-4 text-xl font-semibold text-yellow-400">
              Deposit to Platform
            </h2>

            <div className="grid gap-5 md:grid-cols-[260px,1fr]">
              <div className="rounded-2xl bg-white p-4">
                <img
                  src={qrUrl}
                  alt="Platform Wallet QR"
                  className="h-[240px] w-[240px]"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="mb-2 text-sm text-gray-400">Network</div>
                  <div className="rounded-xl border border-red-900/40 bg-black px-4 py-3 text-white">
                    {networkName}
                  </div>
                </div>

                <div>
                  <div className="mb-2 text-sm text-gray-400">
                    Platform Wallet Address
                  </div>
                  <div className="break-all rounded-xl border border-red-900/40 bg-black px-4 py-3 text-yellow-400">
                    {platformWallet}
                  </div>
                </div>

                <button
                  onClick={copyPlatformWallet}
                  className="rounded-xl border border-yellow-400 px-4 py-2 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                >
                  Copy Address
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <input
                type="number"
                placeholder="Deposit amount (USDT)"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full rounded-xl border border-red-900/40 bg-black px-4 py-3 text-white outline-none"
              />

              <input
                type="text"
                placeholder="Transaction hash (TXID)"
                value={depositTxid}
                onChange={(e) => setDepositTxid(e.target.value)}
                className="w-full rounded-xl border border-red-900/40 bg-black px-4 py-3 text-white outline-none"
              />

              <div className="rounded-xl border border-red-900/40 bg-black p-4">
                <div className="mb-3 text-sm text-gray-400">
                  Upload payment proof / transfer screenshot
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProofUpload}
                  className="block w-full text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-yellow-400 file:px-4 file:py-2 file:font-semibold file:text-black"
                />

                {depositProof && (
                  <img
                    src={depositProof}
                    alt="Proof Preview"
                    className="mt-4 max-h-72 rounded-xl border border-red-900/40"
                  />
                )}
              </div>

              <button
                onClick={submitDepositNotification}
                className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-500"
              >
                Send Payment Notification
              </button>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="mb-4 text-xl font-semibold text-yellow-400">
              Withdraw Request
            </h2>

            <div className="space-y-4">
              <input
                type="number"
                placeholder="Withdrawal amount (USDT)"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full rounded-xl border border-red-900/40 bg-black px-4 py-3 text-white outline-none"
              />

              <input
                type="text"
                value={savedWallet}
                readOnly
                placeholder="Linked wallet will appear here"
                className="w-full rounded-xl border border-red-900/40 bg-zinc-950 px-4 py-3 text-white outline-none"
              />

              <div className="rounded-xl border border-red-900/40 bg-black p-4 text-sm text-gray-300">
                <div>Withdrawal fee: {formatUSDT(withdrawFee)}</div>
                <div>Approved requests are settled after 72 hours.</div>
              </div>

              <button
                onClick={submitWithdrawRequest}
                className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-500"
              >
                Submit Withdrawal Request
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h2 className="mb-4 text-xl font-semibold text-yellow-400">
              Deposit Notifications
            </h2>

            <div className="space-y-3">
              {depositRequests.length === 0 ? (
                <div className="rounded-xl border border-red-900/40 bg-black p-4 text-gray-400">
                  No payment notifications yet.
                </div>
              ) : (
                depositRequests.map((d) => (
                  <div
                    key={d.id}
                    className="rounded-xl border border-red-900/40 bg-black p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white">{formatUSDT(d.amount)}</div>
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

                    <div className="mt-2 text-xs text-gray-400 break-all">
                      TXID: {d.txid}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="mb-4 text-xl font-semibold text-yellow-400">
              Withdraw History
            </h2>

            <div className="space-y-3">
              {withdrawRequests.length === 0 ? (
                <div className="rounded-xl border border-red-900/40 bg-black p-4 text-gray-400">
                  No withdraw requests yet.
                </div>
              ) : (
                withdrawRequests.map((w) => (
                  <div
                    key={w.id}
                    className="rounded-xl border border-red-900/40 bg-black p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white">
                          {formatUSDT(w.amount)} → Net {formatUSDT(w.net)}
                        </div>
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

                    <div className="mt-2 text-xs text-gray-400">
                      Fee: {formatUSDT(w.fee)} / Net: {formatUSDT(w.net)}
                    </div>
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