"use client";

import { useEffect, useState } from "react";
import JsonPostCard from "../components/JsonPostCard";

type Item = { id: number; name?: string; course?: string };

export default function GroupsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ok = true;
    (async () => {
      try {
        const r = await fetch("/api/groups", { cache: "no-store" });
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
      <h1 className="text-2xl font-bold mb-4">Guruhlar</h1>

      <div className="mb-6">
        <JsonPostCard
          title="Guruh yaratish (create-group)"
          endpoint="/api/group/create-group"
          defaultJson={JSON.stringify(
            {
              // TODO: backend schema
              name: "",
              courseId: "",
              teacherId: "",
              startDate: "",
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
          {items.map((g) => (
            <div key={g.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="font-semibold">{g.name || "-"}</div>
              <div className="text-white/60 text-sm">{g.course || "-"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
