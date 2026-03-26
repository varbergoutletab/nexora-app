"use client";

import { useEffect, useState } from "react";

export default function RewardsPage() {
  const [points, setPoints] = useState(0);
  const [credits, setCredits] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedPoints = localStorage.getItem("demo_points");
    const savedCredits = localStorage.getItem("demo_credits");

    if (savedPoints) setPoints(Number(savedPoints));
    if (savedCredits) setCredits(Number(savedCredits));
  }, []);

  const redeemReward = (
    cost: number,
    rewardValue: number,
    rewardName: string
  ) => {
    if (points < cost) {
      setMessage("Not enough points.");
      return;
    }

    const newPoints = points - cost;
    const newCredits = credits + rewardValue;

    setPoints(newPoints);
    setCredits(newCredits);

    localStorage.setItem("demo_points", String(newPoints));
    localStorage.setItem("demo_credits", String(newCredits));

    setMessage(`${rewardName} redeemed successfully.`);
  };

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold text-green-400">
          Rewards & Points
        </h1>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <div className="rounded-2xl bg-gray-900 p-6">
            <h2 className="text-gray-400">Total Points</h2>
            <p className="mt-2 text-3xl font-bold text-cyan-400">{points}</p>
          </div>

          <div className="rounded-2xl bg-gray-900 p-6">
            <h2 className="text-gray-400">Service Credits</h2>
            <p className="mt-2 text-3xl font-bold text-green-400">
              ${credits}
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-gray-900 p-6">
            <h3 className="text-xl font-semibold mb-2">10$ Bonus</h3>
            <p className="text-gray-400 mb-4">Redeem for 500 points</p>
            <button
              onClick={() => redeemReward(500, 10, "10$ Bonus")}
              className="w-full rounded-xl bg-green-400 px-4 py-3 font-semibold text-black"
            >
              Redeem
            </button>
          </div>

          <div className="rounded-2xl bg-gray-900 p-6">
            <h3 className="text-xl font-semibold mb-2">25$ Bonus</h3>
            <p className="text-gray-400 mb-4">Redeem for 1000 points</p>
            <button
              onClick={() => redeemReward(1000, 25, "25$ Bonus")}
              className="w-full rounded-xl bg-green-400 px-4 py-3 font-semibold text-black"
            >
              Redeem
            </button>
          </div>

          <div className="rounded-2xl bg-gray-900 p-6">
            <h3 className="text-xl font-semibold mb-2">50$ Bonus</h3>
            <p className="text-gray-400 mb-4">Redeem for 1500 points</p>
            <button
              onClick={() => redeemReward(1500, 50, "50$ Bonus")}
              className="w-full rounded-xl bg-green-400 px-4 py-3 font-semibold text-black"
            >
              Redeem
            </button>
          </div>
        </div>

        {message && (
          <div className="mt-6 rounded-xl border border-green-500 bg-green-500/10 p-4 text-green-400">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}