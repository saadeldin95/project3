import { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TodayView } from './views/TodayView';
import { HistoryView } from './views/HistoryView';
import { NotesView } from './views/NotesView';
import { ProgressView } from './views/ProgressView';
import { loadState, saveState, setBudget, setRecord } from './lib/storage';
import type { AppState, BudgetMin, ViewKey } from './lib/types';

export default function App() {
  const [state, setState] = useState<AppState>(() => loadState());
  const [view, setView] = useState<ViewKey>('today');

  useEffect(() => {
    saveState(state);
  }, [state]);

  const onComplete = (id: string, note: string | undefined) => {
    setState((s) =>
      setRecord(s, id, {
        status: 'done',
        updatedAt: new Date().toISOString(),
        note,
      }),
    );
  };

  const onSkip = (id: string) => {
    setState((s) =>
      setRecord(s, id, {
        status: 'skipped',
        updatedAt: new Date().toISOString(),
        note: s.records[id]?.note,
      }),
    );
  };

  const onPostpone = (id: string) => {
    setState((s) =>
      setRecord(s, id, {
        status: 'postponed',
        updatedAt: new Date().toISOString(),
        note: s.records[id]?.note,
      }),
    );
  };

  const onBudgetChange = (b: BudgetMin) => {
    setState((s) => setBudget(s, b));
  };

  return (
    <div className="min-h-screen flex bg-bg text-fg">
      <Sidebar active={view} onNavigate={setView} />
      <main className="flex-1 min-w-0">
        {view === 'today' && (
          <TodayView
            state={state}
            actions={{ onComplete, onSkip, onPostpone, onBudgetChange }}
          />
        )}
        {view === 'history' && <HistoryView state={state} />}
        {view === 'notes' && <NotesView state={state} />}
        {view === 'progress' && <ProgressView state={state} />}
      </main>
    </div>
  );
}
