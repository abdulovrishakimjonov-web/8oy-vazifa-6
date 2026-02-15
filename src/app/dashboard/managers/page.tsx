async function getManagers() {
  const res = await fetch("http://localhost:3000/api/managers", { cache: "no-store" });
  return res.json();
}

export default async function ManagersPage() {
  const data = await getManagers();
  const items = data?.items || data?.data || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Managerlar</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {items.map((u: any) => (
          <div key={u.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="font-semibold">{u.name || u.fullName}</div>
            <div className="text-white/60 text-sm">{u.email || u.phone}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
