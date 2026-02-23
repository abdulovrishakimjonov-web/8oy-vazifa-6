"use client";

import { useEffect, useState } from "react";
import JsonPostCard from "../components/JsonPostCard";

type Item = { id: number; title?: string; price?: number };

export default function CoursesPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ok = true;
    (async () => {
      try {
        const r = await fetch("/api/courses", { cache: "no-store" });
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
      <h1 className="text-2xl font-bold mb-4">Kurslar</h1>

      <div className="mb-6">
        <JsonPostCard
          title="Kurs kategoriya yaratish (create-category)"
          endpoint="/api/course/create-category"
          defaultJson={JSON.stringify(
            {
              // TODO: backend schema
              title: "",
              description: "",
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
          {items.map((c) => (
            <div key={c.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="font-semibold">{c.title || "-"}</div>
              <div className="text-white/60 text-sm">
                {typeof c.price === "number" ? c.price.toLocaleString() + " so'm" : "-"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
