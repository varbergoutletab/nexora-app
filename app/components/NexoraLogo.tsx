export default function NexoraLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 via-red-500 to-red-700 shadow-lg shadow-red-900/40">
        <span className="text-xl font-black text-black">N</span>
        <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-yellow-300" />
      </div>

      <div className="leading-tight">
        <div className="text-2xl font-extrabold tracking-wide text-yellow-400">
          Nexora
        </div>
        <div className="text-[11px] uppercase tracking-[0.22em] text-red-400">
          Digital Asset Platform
        </div>
      </div>
    </div>
  );
}