import { useMemo } from 'react';
import type { AppState, BudgetMin, Lesson } from '../lib/types';
import { LESSON_QUEUE } from '../data/lessons';
import {
  computeTodaySession,
  formatMinutes,
  isTodayEnded,
  todayDateLabel,
} from '../lib/session';
import { LessonCard } from '../components/LessonCard';

const BUDGETS: BudgetMin[] = [30, 60, 120, 180, 240];

const BUDGET_LABEL: Record<BudgetMin, string> = {
  30: '30 min',
  60: '1 hr',
  120: '2 hr',
  180: '3 hr',
  240: '4 hr',
};

type Actions = {
  onComplete: (id: string, note: string | undefined) => void;
  onSkip: (id: string) => void;
  onPostpone: (id: string) => void;
  onBudgetChange: (b: BudgetMin) => void;
  onEndSession: () => void;
  onStartNext: () => void;
};

export function TodayView({
  state,
  today,
  actions,
}: {
  state: AppState;
  today: string;
  actions: Actions;
}) {
  const session = useMemo(
    () => computeTodaySession(LESSON_QUEUE, state.records, state.budgetMin, today),
    [state.records, state.budgetMin, today],
  );
  const manuallyEnded = isTodayEnded(state, today);
  const sessionLessons = [...session.completedToday, ...session.pendingPicks];
  const totalSessionMin = session.usedMin + session.pendingPicks.reduce((s, l) => s + l.durationMin, 0);

  return (
    <div className="max-w-2xl mx-auto px-6 pt-12 pb-24">
      <div className="mb-6 text-xs text-muted uppercase tracking-widest">{todayDateLabel()}</div>

      <BudgetPicker budget={state.budgetMin} onChange={actions.onBudgetChange} />

      <TodayBody
        state={state}
        today={today}
        manuallyEnded={manuallyEnded}
        sessionLessons={sessionLessons}
        pendingPicks={session.pendingPicks}
        completedToday={session.completedToday}
        active={session.active}
        totalSessionMin={totalSessionMin}
        actions={actions}
      />
    </div>
  );
}

function BudgetPicker({
  budget,
  onChange,
}: {
  budget: BudgetMin;
  onChange: (b: BudgetMin) => void;
}) {
  return (
    <div className="mb-6">
      <div className="text-xs text-muted uppercase tracking-widest mb-2">Session length</div>
      <div className="flex flex-wrap gap-2">
        {BUDGETS.map((b) => {
          const active = budget === b;
          return (
            <button
              key={b}
              onClick={() => onChange(b)}
              className={
                'px-4 py-2 rounded-lg text-sm border ' +
                (active
                  ? 'border-accent text-accent bg-accent/10'
                  : 'border-border text-muted hover:text-fg hover:border-fg')
              }
            >
              {BUDGET_LABEL[b]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TodayBody({
  state,
  today,
  manuallyEnded,
  sessionLessons,
  pendingPicks,
  completedToday,
  active,
  totalSessionMin,
  actions,
}: {
  state: AppState;
  today: string;
  manuallyEnded: boolean;
  sessionLessons: Lesson[];
  pendingPicks: Lesson[];
  completedToday: Lesson[];
  active: Lesson[];
  totalSessionMin: number;
  actions: Actions;
}) {
  const hasMoreInQueue = active.length > 0;

  if (manuallyEnded) {
    return (
      <SessionCompleteState
        completedCount={completedToday.length}
        canStartNext={hasMoreInQueue}
        onStartNext={actions.onStartNext}
      />
    );
  }

  if (active.length === 0 && completedToday.length === 0) {
    return <QueueClearState />;
  }

  // Nothing done today and next lesson alone exceeds the budget.
  if (pendingPicks.length === 0 && completedToday.length === 0) {
    return <OversizeState lesson={active[0]} budgetMin={state.budgetMin} />;
  }

  const budgetFilled = pendingPicks.length === 0 && hasMoreInQueue;
  const allDone = !hasMoreInQueue && pendingPicks.length === 0;

  return (
    <>
      <div className="text-sm text-muted">
        Today's session:{' '}
        <span className="text-fg">{formatMinutes(totalSessionMin)}</span> across{' '}
        <span className="text-fg">{sessionLessons.length}</span> lesson
        {sessionLessons.length === 1 ? '' : 's'}
        <span className="text-border mx-2">·</span>
        <span>{active.length} left in the queue</span>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {sessionLessons.map((l) => (
          <LessonCard
            key={l.id}
            lesson={l}
            record={state.records[l.id]}
            onComplete={(note) => actions.onComplete(l.id, note)}
            onSkip={() => actions.onSkip(l.id)}
            onPostpone={() => actions.onPostpone(l.id)}
          />
        ))}
      </div>

      <BottomBar
        allDone={allDone}
        budgetFilled={budgetFilled}
        onEndSession={actions.onEndSession}
        onStartNext={actions.onStartNext}
      />
      <p className="mt-3 text-center text-[11px] text-muted">
        {today /* re-render anchor: dynamic date */}
      </p>
    </>
  );
}

function BottomBar({
  allDone,
  budgetFilled,
  onEndSession,
  onStartNext,
}: {
  allDone: boolean;
  budgetFilled: boolean;
  onEndSession: () => void;
  onStartNext: () => void;
}) {
  if (allDone) {
    return (
      <div className="mt-8 rounded-lg border border-border bg-panel px-5 py-4 text-center text-sm text-muted">
        🎉 Full curriculum done. Rest easy.
      </div>
    );
  }
  if (budgetFilled) {
    return (
      <div className="mt-8 rounded-lg border border-border bg-panel px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-muted">
          <span className="text-accent">✓</span> Session complete — see you tomorrow.
        </span>
        <button
          onClick={onStartNext}
          className="px-3 py-1.5 rounded-md border border-border text-xs text-muted hover:text-accent hover:border-accent"
        >
          Start tomorrow's session early →
        </button>
      </div>
    );
  }
  return (
    <div className="mt-8 flex justify-center">
      <button
        onClick={() => {
          if (confirm("End today's session? You can come back tomorrow.")) {
            onEndSession();
          }
        }}
        className="px-5 py-2.5 rounded-lg border border-border text-sm text-muted hover:text-fg hover:border-fg"
      >
        End today's session
      </button>
    </div>
  );
}

function OversizeState({ lesson, budgetMin }: { lesson: Lesson; budgetMin: number }) {
  return (
    <div className="rounded-xl border border-amber-400/30 bg-amber-400/5 p-6 mt-2">
      <div className="text-xs uppercase tracking-widest text-amber-400 mb-2">
        Next lesson exceeds budget
      </div>
      <p className="text-sm text-fg leading-relaxed mb-2">
        The next lesson (<span className="font-medium">{formatMinutes(lesson.durationMin)}</span>) is
        longer than your <span className="font-medium">{formatMinutes(budgetMin)}</span> session
        budget.
      </p>
      <p className="text-sm text-muted leading-relaxed">
        Pick a larger budget, or break it up manually
        {lesson.noLink ? ' on Coursera' : ''} and come back when done.
      </p>
      <div className="mt-4 text-xs text-muted">
        Up next: <span className="text-fg">{lesson.title}</span>
      </div>
    </div>
  );
}

function SessionCompleteState({
  completedCount,
  canStartNext,
  onStartNext,
}: {
  completedCount: number;
  canStartNext: boolean;
  onStartNext: () => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-panel p-8 text-center mt-2">
      <div className="text-2xl mb-2">✓</div>
      <div className="text-lg font-semibold mb-2">Session complete</div>
      <p className="text-sm text-muted">
        {completedCount > 0
          ? `${completedCount} lesson${completedCount === 1 ? '' : 's'} done today. See you tomorrow.`
          : 'See you tomorrow.'}
      </p>
      {canStartNext && (
        <button
          onClick={onStartNext}
          className="mt-5 px-4 py-2 rounded-md border border-border text-sm text-muted hover:text-accent hover:border-accent"
        >
          Start tomorrow's session early →
        </button>
      )}
    </div>
  );
}

function QueueClearState() {
  return (
    <div className="rounded-xl border border-border bg-panel p-8 text-center mt-2">
      <div className="text-2xl mb-2">🎉</div>
      <div className="text-lg font-semibold mb-2">Queue clear</div>
      <p className="text-sm text-muted">
        You've worked through every lesson in the plan.
      </p>
    </div>
  );
}
