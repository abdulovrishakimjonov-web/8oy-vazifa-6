"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("usern88@mail.ru");
  const [password, setPassword] = useState("12345678");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await fetch("https://admin-crm.onrender.com/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Login xato");

      router.push("/dashboard");
    } catch (e: any) {
      setErr(e.message || "Xatolik");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0B0F] text-white p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 border border-white/10 rounded-2xl p-6 bg-white/5">
        <h1 className="text-2xl font-semibold">Xush kelibsiz</h1>
        <p className="text-white/70 text-sm">Hisobingizga kirish uchun email va parolni kiriting</p>

        <div className="space-y-2">
          <label className="text-sm text-white/80">Email</label>
          <input
            className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/80">Parol</label>
          <input
            className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>

        {err && <div className="text-sm text-red-300">{err}</div>}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-white text-black py-3 font-medium disabled:opacity-60"
        >
          {loading ? "Kirilmoqda..." : "Kirish"}
        </button>
      </form>
    </div>
  );
}
