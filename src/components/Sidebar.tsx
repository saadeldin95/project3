type Item = { key: string; label: string; soon?: boolean };

const ITEMS: Item[] = [
  { key: 'today', label: 'Today' },
  { key: 'week', label: 'Week', soon: true },
  { key: 'progress', label: 'Progress', soon: true },
  { key: 'notes', label: 'Notes', soon: true },
  { key: 'settings', label: 'Settings', soon: true },
];

export function Sidebar({ active }: { active: string }) {
  return (
    <aside className="w-56 shrink-0 border-r border-border h-screen sticky top-0 px-5 py-8 hidden md:flex md:flex-col">
      <div className="mb-10">
        <div className="text-xs uppercase tracking-widest text-muted">Summer</div>
        <div className="text-lg font-semibold">Day Tracker</div>
      </div>
      <nav className="flex flex-col gap-1">
        {ITEMS.map((it) => {
          const isActive = it.key === active;
          return (
            <div
              key={it.key}
              className={
                'px-3 py-2 rounded-md text-sm flex items-center justify-between ' +
                (isActive
                  ? 'bg-panel text-fg'
                  : 'text-muted hover:text-fg cursor-default')
              }
            >
              <span>{it.label}</span>
              {it.soon && <span className="text-[10px] uppercase tracking-wider text-muted">soon</span>}
            </div>
          );
        })}
      </nav>
      <div className="mt-auto text-[11px] text-muted leading-relaxed">
        One focused task per day.<br />
        That's the whole point.
      </div>
    </aside>
  );
}
