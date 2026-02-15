"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU = [
  { href: "/dashboard", label: "Asosiy" },
  { href: "/dashboard/managers", label: "Managerlar" },
  { href: "/dashboard/admins", label: "Adminlar" },
  { href: "/dashboard/teachers", label: "Ustozlar" },
  { href: "/dashboard/students", label: "Studentlar" },
  { href: "/dashboard/groups", label: "Guruhlar" },
  { href: "/dashboard/courses", label: "Kurslar" },
  { href: "/dashboard/payments", label: "Payment" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[320px]  border-r border-white/10 bg-black/30">
      <div className="p-6 border-b border-white/10">
        <div className="text-2xl font-bold">Admin CRM</div>
      </div>

      <div className="p-4">
        <div className="text-white/70 font-semibold mb-4">Menu</div>

        {/* MUHIM: flex-col bo‘lsin */}
        <nav className="">
          {MENU.map((m) => {
            const active =
              pathname === m.href ||
              (m.href !== "/dashboard" && pathname.startsWith(m.href));

            return (
              <Link
                key={m.href}
                href={m.href}
                className={[
                  "flex items-center gap-3 px-4 py-3 rounded-xl border transition",
                  active
                    ? "border-white/40 bg-white/5"
                    : "border-white/10 hover:bg-white/5 hover:border-white/20",
                ].join(" ")}
              >
                <span className="text-[18px] font-medium">{m.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 text-white/70 font-semibold mb-4">Boshqalar</div>

        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard/settings"
            className="px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition"
          >
            Sozlamalar
          </Link>
          <Link
            href="/dashboard/profile"
            className="px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition"
          >
            Profile
          </Link>
          <Link
            href="/logout"
            className="px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition"
          >
            Chiqish
          </Link>
        </div>
      </div>
    </aside>
  );
}
