"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#0B0B0F] text-white">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile overlay */}
      {open && (
        <button
          aria-label="Close sidebar"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={[
          "fixed z-50 inset-y-0 left-0 w-[320px] md:hidden transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <Sidebar onNavigate={() => setOpen(false)} />
      </div>

      {/* Right side */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* TOPBAR */}
        <header className="h-[72px] shrink-0 border-b border-white/10 bg-black/25 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="md:hidden w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition grid place-items-center"
            >
              ☰
            </button>

            <div className="text-lg font-semibold">Dashboard</div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition grid place-items-center"
              title="Theme"
            >
              ☀️
            </button>

            <div className="text-right leading-4 hidden sm:block">
              <div className="font-semibold">Olim Olimov</div>
              <div className="text-white/60 text-sm">Manager</div>
            </div>

            <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5" />
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 min-w-0 p-4 sm:p-6">
          <div className="min-h-full rounded-2xl border border-white/10 bg-black/25 p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
