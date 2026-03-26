"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    localStorage.setItem("logged_user", username);

    if (!localStorage.getItem(`balance_${username}`)) {
      localStorage.setItem(`balance_${username}`, "2450");
    }

    if (!localStorage.getItem(`credits_${username}`)) {
      localStorage.setItem(`credits_${username}`, "0");
    }

    if (!localStorage.getItem(`points_${username}`)) {
      localStorage.setItem(`points_${username}`, "0");
    }

    if (!localStorage.getItem(`kyc_${username}`)) {
      localStorage.setItem(`kyc_${username}`, "Pending");
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-main px-4 py-10 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-red-900/40 bg-zinc-950 p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-yellow-400">Login</h1>
          <p className="mt-2 text-sm text-gray-400">
            Demo access for licensing presentation and internal review
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-gray-300">Username</label>
            <select
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-red-900/40 bg-black px-4 py-3 text-white outline-none"
            >
              <option value="admin">admin</option>
              <option value="wife">wife</option>
              <option value="brother">brother</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-red-900/40 bg-black px-4 py-3 text-white outline-none"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-red-500 hover:text-white"
          >
            Sign In
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-red-900/40 bg-black p-4 text-sm text-gray-300">
          Demo users:
          <div className="mt-3 grid gap-2">
            <div className="rounded-lg border border-red-900/40 px-3 py-2">
              admin
            </div>
            <div className="rounded-lg border border-red-900/40 px-3 py-2">
              wife
            </div>
            <div className="rounded-lg border border-red-900/40 px-3 py-2">
              brother
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}