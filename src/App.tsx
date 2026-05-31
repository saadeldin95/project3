import { useCallback, useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TodayView } from './views/TodayView';
import { HistoryView } from './views/HistoryView';
import { NotesView } from './views/NotesView';
import { ProgressView } from './views/ProgressView';
import { SettingsView } from './views/SettingsView';
import {
  clearSession,
  endSession as endSessionInState,
  loadState,
  resetAll,
  saveState,
  setBudget,
  setRecord,
} from './lib/storage';
import { todayKey } from './lib/session';
import { applyTheme, loadTheme, saveTheme } from './lib/theme';
import type { AppState, BudgetMin, Theme, ViewKey } from './lib/types';

function useToday(): string {
  const [today, setToday] = useState<string>(() => todayKey());
  useEffect(() => {
    const tick = () => {
      const t = todayKey();
      setToday((cur) => (cur === t ? cur : t));
    };
    const id = window.setInterval(tick, 30_000);
    const onVisible = () => {
      if (document.visibilityState === 'visible') tick();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);
  return today;
}

export default function App() {
  const [state, setState] = useState<AppState>(() => loadState());
  const [theme, setThemeState] = useState<Theme>(() => loadTheme());
  const [view, setView] = useState<ViewKey>('today');
  const today = useToday();

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  const onComplete = useCallback((id: string, note: string | undefined) => {
    setState((s) =>
      setRecord(s, id, {
        status: 'done',
        updatedAt: new Date().toISOString(),
        note,
      }),
    );
  }, []);

  const onSkip = useCallback((id: string) => {
    setState((s) =>
      setRecord(s, id, {
        status: 'skipped',
        updatedAt: new Date().toISOString(),
        note: s.records[id]?.note,
      }),
    );
  }, []);

  const onPostpone = useCallback((id: string) => {
    setState((s) =>
      setRecord(s, id, {
        status: 'postponed',
        updatedAt: new Date().toISOString(),
        note: s.records[id]?.note,
      }),
    );
  }, []);

  const onBudgetChange = useCallback((b: BudgetMin) => {
    setState((s) => setBudget(s, b));
  }, []);

  const onEndSession = useCallback(() => {
    setState((s) => endSessionInState(s, todayKey()));
  }, []);

  const onStartNext = useCallback(() => {
    setState((s) => clearSession(s));
  }, []);

  const onReset = useCallback(() => {
    setState(resetAll());
  }, []);

  const onThemeChange = useCallback((t: Theme) => {
    setThemeState(t);
  }, []);

  return (
    <div className="min-h-screen flex bg-bg text-fg">
      <Sidebar active={view} onNavigate={setView} />
      <main className="flex-1 min-w-0">
        {view === 'today' && (
          <TodayView
            state={state}
            today={today}
            actions={{
              onComplete,
              onSkip,
              onPostpone,
              onBudgetChange,
              onEndSession,
              onStartNext,
            }}
          />
        )}
        {view === 'history' && <HistoryView state={state} today={today} />}
        {view === 'notes' && <NotesView state={state} />}
        {view === 'progress' && <ProgressView state={state} />}
        {view === 'settings' && (
          <SettingsView
            state={state}
            theme={theme}
            onThemeChange={onThemeChange}
            onReset={onReset}
          />
        )}
      </main>
    </div>
  );
}
