"use client";

import { useMemo, useState } from "react";

type Props = {
  title: string;
  endpoint: string; // Next.js api route
  defaultJson?: string;
};

export default function JsonPostCard({ title, endpoint, defaultJson }: Props) {
  const initial = useMemo(
    () =>
      defaultJson ??
      JSON.stringify(
        {
          // TODO: backend body schema'ni berganingdan keyin buni aniq fieldlarga moslab beramiz
        },
        null,
        2
      ),
    [defaultJson]
  );

  const [text, setText] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      let payload: any;
      try {
        payload = JSON.parse(text);
      } catch {
        throw new Error("JSON noto‘g‘ri (format)");
      }

      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        throw new Error(data?.message || data?.error || `HTTP ${r.status}`);
      }
      setResult(data);
    } catch (e: any) {
      setError(e?.message || "Xatolik");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4 md:p-5">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="text-lg font-semibold text-[#111827]">{title}</h3>
        <button
          onClick={submit}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-[#145fcb] text-white font-medium disabled:opacity-60"
        >
          {loading ? "Yuborilmoqda..." : "Create"}
        </button>
      </div>

      <p className="text-sm text-[#6b7280] mb-3">
        Hozircha body’ni JSON ko‘rinishda yuboryapmiz. API body schema’ni tashlasang, buni real input formaga aylantirib beraman.
      </p>

      <textarea
        className="w-full min-h-[140px] rounded-xl border border-black/10 bg-[#f8fafc] p-3 font-mono text-sm outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

      {result && (
        <pre className="mt-3 overflow-auto rounded-xl bg-[#0b1020] p-3 text-xs text-white">
{JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
