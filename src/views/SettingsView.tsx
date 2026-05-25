import { useState } from 'react';
import type { AppState } from '../lib/types';
import { exportNotesAsMarkdown } from '../lib/storage';
import { todayKey } from '../lib/session';

export function SettingsView({
  state,
  onReset,
}: {
  state: AppState;
  onReset: () => void;
}) {
  const [confirming, setConfirming] = useState(false);

  const handleReset = () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    onReset();
    setConfirming(false);
  };

  const handleExport = () => {
    const md = exportNotesAsMarkdown(state.records);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `summer-tracker-notes-${todayKey()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 pt-12 pb-24">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <section className="rounded-xl border border-border bg-panel p-6 mb-4">
        <h2 className="text-sm font-medium mb-2">Export notes</h2>
        <p className="text-xs text-muted mb-4">
          Download every note you've written as a single Markdown file, grouped by source.
        </p>
        <button
          onClick={handleExport}
          className="px-4 py-2 rounded-md border border-border text-sm hover:border-accent hover:text-accent"
        >
          Export notes as Markdown
        </button>
      </section>

      <section className="rounded-xl border border-border bg-panel p-6">
        <h2 className="text-sm font-medium mb-2">Reset all progress</h2>
        <p className="text-xs text-muted mb-4">
          Wipes every lesson record, every note, and the current session. This cannot be undone.
        </p>
        <button
          onClick={handleReset}
          onBlur={() => setConfirming(false)}
          className={
            'px-4 py-2 rounded-md text-sm ' +
            (confirming
              ? 'bg-red-500/20 border border-red-500/60 text-red-300 hover:bg-red-500/30'
              : 'border border-border text-muted hover:text-fg hover:border-fg')
          }
        >
          {confirming ? 'Click again to confirm reset' : 'Reset all progress'}
        </button>
      </section>
    </div>
  );
}
