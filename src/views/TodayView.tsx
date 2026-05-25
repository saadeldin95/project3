import type { AppState, BudgetMin, Lesson } from '../lib/types';
import { LESSON_QUEUE } from '../data/lessons';
import { activeQueue, computeSession, formatMinutes, sessionMinutes, todayDateLabel } from '../lib/session';
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
};

export function TodayView({ state, actions }: { state: AppState; actions: Actions }) {
  const queue = activeQueue(LESSON_QUEUE, state.records);
  const session = computeSession(queue, state.budgetMin);
  const totalMins = sessionMinutes(session);
  const first = session[0];
  const isOversize = first ? first.durationMin > state.budgetMin : false;

  return (
    <div className="max-w-2xl mx-auto px-6 pt-12 pb-24">
      <div className="mb-6 text-xs text-muted uppercase tracking-widest">{todayDateLabel()}</div>

      <div className="mb-4">
        <div className="text-xs text-muted uppercase tracking-widest mb-2">Session length</div>
        <div className="flex flex-wrap gap-2">
          {BUDGETS.map((b) => {
            const active = state.budgetMin === b;
            return (
              <button
                key={b}
                onClick={() => actions.onBudgetChange(b)}
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

      <SessionHeader session={session} totalMins={totalMins} queueLeft={queue.length} />

      <div className="flex flex-col gap-4 mt-6">
        {session.length === 0 && <DoneState completed={LESSON_QUEUE.length - queue.length} total={LESSON_QUEUE.length} />}
        {session.map((l) => (
          <LessonCard
            key={l.id}
            lesson={l}
            record={state.records[l.id]}
            oversize={l === first && isOversize}
            onComplete={(note) => actions.onComplete(l.id, note)}
            onSkip={() => actions.onSkip(l.id)}
            onPostpone={() => actions.onPostpone(l.id)}
          />
        ))}
      </div>
    </div>
  );
}

function SessionHeader({
  session,
  totalMins,
  queueLeft,
}: {
  session: Lesson[];
  totalMins: number;
  queueLeft: number;
}) {
  if (session.length === 0) return null;
  return (
    <div className="text-sm text-muted">
      Today's session: <span className="text-fg">{formatMinutes(totalMins)}</span> across{' '}
      <span className="text-fg">{session.length}</span> lesson{session.length === 1 ? '' : 's'}
      <span className="text-border mx-2">·</span>
      <span>{queueLeft} left in the queue</span>
    </div>
  );
}

function DoneState({ completed, total }: { completed: number; total: number }) {
  return (
    <div className="rounded-xl border border-border bg-panel p-8 text-center">
      <div className="text-2xl mb-2">🎉</div>
      <div className="text-lg font-semibold mb-2">Queue clear</div>
      <p className="text-sm text-muted">
        You've worked through every lesson in the plan. {completed} of {total} complete.
      </p>
    </div>
  );
}
