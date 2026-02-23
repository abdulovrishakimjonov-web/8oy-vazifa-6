"use client";

import { useEffect, useState } from "react";
import JsonPostCard from "../components/JsonPostCard";

type Item = { id: number; fullName?: string; phone?: string };

export default function StudentsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ok = true;
    (async () => {
      try {
        const r = await fetch("/api/students", { cache: "no-store" });
        const data = await r.json().catch(() => ({}));
        if (!ok) return;
        setItems(data?.items || []);
      } finally {
        if (ok) setLoading(false);
      }
    })();
    return () => {
      ok = false;
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Studentlar</h1>

      <div className="mb-6">
        <JsonPostCard
          title="Student yaratish (create-student)"
          endpoint="/api/student/create-student"
          defaultJson={JSON.stringify(
            {
              // TODO: backend schema
              fullName: "",
              phone: "",
              email: "",
              groupId: "",
            },
            null,
            2
          )}
        />
      </div>

      {loading ? (
        <div className="text-white/70">Yuklanmoqda...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((u) => (
            <div key={u.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="font-semibold">{u.fullName || "-"}</div>
              <div className="text-white/60 text-sm">{u.phone || "-"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
