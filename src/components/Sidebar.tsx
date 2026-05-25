import type { ViewKey } from '../lib/types';

type Item = { key: ViewKey; label: string; soon?: boolean };

const ITEMS: Item[] = [
  { key: 'today', label: 'Today' },
  { key: 'history', label: 'History' },
  { key: 'notes', label: 'Notes' },
  { key: 'progress', label: 'Progress' },
  { key: 'settings', label: 'Settings' },
];

export function Sidebar({
  active,
  onNavigate,
}: {
  active: ViewKey;
  onNavigate: (k: ViewKey) => void;
}) {
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
            <button
              key={it.key}
              onClick={() => !it.soon && onNavigate(it.key)}
              disabled={it.soon}
              className={
                'px-3 py-2 rounded-md text-sm flex items-center justify-between text-left ' +
                (isActive
                  ? 'bg-panel text-fg'
                  : it.soon
                    ? 'text-muted cursor-default'
                    : 'text-muted hover:text-fg hover:bg-panel/50')
              }
            >
              <span>{it.label}</span>
              {it.soon && <span className="text-[10px] uppercase tracking-wider text-muted">soon</span>}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto text-[11px] text-muted leading-relaxed">
        Pick a session length.<br />
        Work the queue. Rest when you close the tab.
      </div>
    </aside>
  );
}
