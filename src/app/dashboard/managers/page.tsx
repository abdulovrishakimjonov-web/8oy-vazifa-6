"use client";

import { useEffect, useState } from "react";
import JsonPostCard from "../components/JsonPostCard";

type Manager = { id: number; fullName?: string; name?: string; email?: string; phone?: string };

export default function ManagersPage() {
  const [items, setItems] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ok = true;
    (async () => {
      try {
        const r = await fetch("/api/managers", { cache: "no-store" });
        const data = await r.json().catch(() => ({}));
        if (!ok) return;
        setItems(data?.items || data?.data || []);
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
      <h1 className="text-2xl font-bold mb-4">Managerlar</h1>

      <div className="mb-6">
        <JsonPostCard
          title="Manager yaratish (create-manager)"
          endpoint="/api/staff/create-manager"
          defaultJson={JSON.stringify(
            {
              // TODO: backend schema
              fullName: "",
              email: "",
              password: "",
              phone: "",
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
              <div className="font-semibold">{u.fullName || u.name || "-"}</div>
              <div className="text-white/60 text-sm">{u.email || u.phone || "-"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
