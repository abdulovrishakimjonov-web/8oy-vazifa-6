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
        body: JSON.stringify({ email: email.trim(), password }),
      });

<<<<<<< HEAD
      const data = await res.json().catch(() => ({} as any));

      if (!res.ok) {
=======
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // ✅ backend xatoni to‘liq ko‘ramiz
>>>>>>> 5541485 (news)
        console.log("LOGIN ERROR:", data);
        throw new Error(data?.message || "Login xato");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (e: any) {
      setErr(e?.message || "Xatolik");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C0A09] text-white p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-[450px] space-y-4 border border-white/20 rounded-3xl p-8 bg-[#181616]"
      >
        <h1 className="text-3xl font-semibold text-center">Xush kelibsiz👋</h1>
        <p className="text-white text-sm font-semibold text-center">
          Hisobingizga kirish uchun email va parolni kiriting
        </p>

        <div className="space-y-2">
          <label className="text-sm text-white font-semibold">Email</label>
          <input
            className="w-full rounded-xl bg-[#2B323F] border border-white/70 px-4 py-2 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/80">Parol</label>
          <input
            className="w-full rounded-xl bg-[#2B323F] border border-white/70 px-4 py-2 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>

        {err && <div className="text-sm text-red-300">{err}</div>}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-white text-black py-2 font-medium disabled:opacity-60"
        >
          {loading ? "Kirilmoqda..." : "Kirish"}
        </button>
      </form>
    </div>
  );
}