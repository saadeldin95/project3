import { useLayoutEffect, useMemo } from 'react';
import type { AppState, BudgetMin, Lesson } from '../lib/types';
import { LESSON_BY_ID, LESSON_QUEUE } from '../data/lessons';
import {
  activeQueue,
  formatMinutes,
  isTodayEnded,
  pickSessionLessons,
  sessionMinutes,
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
  onLockSession: (date: string, ids: string[]) => void;
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
  const activeForToday = useMemo(
    () => activeQueue(LESSON_QUEUE, state.records),
    [state.records],
  );

  const hasSessionForToday = state.session?.date === today;
  const ended = isTodayEnded(state, today);

  const { onLockSession } = actions;
  // Lock in a session for today if none exists yet AND something fits the budget.
  useLayoutEffect(() => {
    if (hasSessionForToday) return;
    if (activeForToday.length === 0) {
      onLockSession(today, []);
      return;
    }
    const picked = pickSessionLessons(activeForToday, state.budgetMin);
    if (picked.length > 0) {
      onLockSession(today, picked.map((l) => l.id));
    }
    // else: leave session null, the oversize message will render below
  }, [hasSessionForToday, today, state.budgetMin, activeForToday, onLockSession]);

  const sessionLessons: Lesson[] = useMemo(() => {
    if (!hasSessionForToday) return [];
    return state.session!.lessonIds
      .map((id) => LESSON_BY_ID[id])
      .filter((l): l is Lesson => Boolean(l));
  }, [hasSessionForToday, state.session]);

  return (
    <div className="max-w-2xl mx-auto px-6 pt-12 pb-24">
      <div className="mb-6 text-xs text-muted uppercase tracking-widest">{todayDateLabel()}</div>

      <BudgetPicker
        budget={state.budgetMin}
        onChange={actions.onBudgetChange}
        hint={
          hasSessionForToday && sessionLessons.length > 0
            ? "Locked for today. Changing this only affects tomorrow's session."
            : undefined
        }
      />

      <TodayBody
        state={state}
        today={today}
        ended={ended}
        activeForToday={activeForToday}
        sessionLessons={sessionLessons}
        hasSessionForToday={hasSessionForToday}
        actions={actions}
      />
    </div>
  );
}

function BudgetPicker({
  budget,
  onChange,
  hint,
}: {
  budget: BudgetMin;
  onChange: (b: BudgetMin) => void;
  hint?: string;
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
      {hint && <p className="mt-2 text-[11px] text-muted italic">{hint}</p>}
    </div>
  );
}

function TodayBody({
  state,
  today,
  ended,
  activeForToday,
  sessionLessons,
  hasSessionForToday,
  actions,
}: {
  state: AppState;
  today: string;
  ended: boolean;
  activeForToday: Lesson[];
  sessionLessons: Lesson[];
  hasSessionForToday: boolean;
  actions: Actions;
}) {
  if (ended) {
    const doneToday = sessionLessons.filter((l) => {
      const r = state.records[l.id];
      return r?.status === 'done' || r?.status === 'skipped';
    }).length;
    const hasMore = activeForToday.length > 0;
    return (
      <SessionCompleteState
        completedCount={doneToday}
        canStartNext={hasMore}
        onStartNext={actions.onStartNext}
      />
    );
  }

  if (activeForToday.length === 0) {
    return <QueueClearState />;
  }

  if (!hasSessionForToday || sessionLessons.length === 0) {
    const next = activeForToday[0];
    return <OversizeState lesson={next} budgetMin={state.budgetMin} />;
  }

  const totalMins = sessionMinutes(sessionLessons);

  return (
    <>
      <div className="text-sm text-muted">
        Today's session:{' '}
        <span className="text-fg">{formatMinutes(totalMins)}</span> across{' '}
        <span className="text-fg">{sessionLessons.length}</span> lesson
        {sessionLessons.length === 1 ? '' : 's'}
        <span className="text-border mx-2">·</span>
        <span>{activeForToday.length} left in the queue</span>
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

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => {
            if (confirm("End today's session? You can come back tomorrow.")) {
              actions.onEndSession();
            }
          }}
          className="px-5 py-2.5 rounded-lg border border-border text-sm text-muted hover:text-fg hover:border-fg"
        >
          End today's session
        </button>
      </div>
      <p className="mt-3 text-center text-[11px] text-muted">
        {today /* re-render anchor: dynamic date */}
      </p>
    </>
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
