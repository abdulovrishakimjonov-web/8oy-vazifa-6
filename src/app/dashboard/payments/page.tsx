"use client";

import { useEffect, useState } from "react";
import JsonPostCard from "../components/JsonPostCard";

type Item = { id: number; student?: string; amount?: number; status?: string };

export default function PaymentsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ok = true;
    (async () => {
      try {
        const r = await fetch("/api/payments", { cache: "no-store" });
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
      <h1 className="text-2xl font-bold mb-4">To'lovlar</h1>

      <div className="mb-6">
        <JsonPostCard
          title="Studentga to‘lov qilish (payment-student)"
          endpoint="/api/payment/payment-student"
          defaultJson={JSON.stringify(
            {
              // TODO: backend schema
              studentId: "",
              amount: 0,
              paymentType: "cash",
            },
            null,
            2
          )}
        />
      </div>

      {loading ? (
        <div className="text-white/70">Yuklanmoqda...</div>
      ) : (
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/70 border-b border-white/10">
                <th className="text-left py-2 pr-4">Student</th>
                <th className="text-left py-2 pr-4">Summa</th>
                <th className="text-left py-2">Holat</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-b border-white/10">
                  <td className="py-3 pr-4">{p.student || "-"}</td>
                  <td className="py-3 pr-4">
                    {typeof p.amount === "number" ? p.amount.toLocaleString() + " so'm" : "-"}
                  </td>
                  <td className="py-3">{p.status || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
