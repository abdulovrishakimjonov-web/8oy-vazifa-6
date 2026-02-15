import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex  bg-[#0B0B0F] text-white">
      {/* LEFT */}
      <Sidebar />

      {/* RIGHT */}
      <div className="">
        {/* TOPBAR */}
        <header className="h-[72px] shrink-0 border-b border-white/10 bg-black/25 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 grid place-items-center">
              ☰
            </div>
            <div className="text-lg font-semibold">Dashboard</div>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition grid place-items-center">
              ☀️
            </button>

            <div className="text-right leading-4">
              <div className="font-semibold">Olim Olimov</div>
              <div className="text-white/60 text-sm">Manager</div>
            </div>

            <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5" />
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 min-w-0 p-6">
          <div className="min-h-full rounded-2xl border border-white/10 bg-black/25 p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
