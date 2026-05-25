import { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TodayCard } from './components/TodayCard';
import { SCHEDULE, TOTAL_DAYS } from './data/schedule';
import { loadProgress, saveProgress, setDay, advance } from './lib/storage';
import type { Progress } from './lib/types';

export default function App() {
  const [progress, setProgress] = useState<Progress>(() => loadProgress());

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const day = progress.currentDay;
  const task = SCHEDULE[day - 1];
  const dayProgress = progress.days[day];

  const onComplete = (note: string | undefined) => {
    setProgress((p) => {
      const updated = setDay(p, day, {
        status: 'done',
        completedAt: new Date().toISOString(),
        note,
      });
      return advance(updated, TOTAL_DAYS);
    });
  };

  const onSkip = () => {
    setProgress((p) => {
      const updated = setDay(p, day, {
        status: 'skipped',
        completedAt: new Date().toISOString(),
      });
      return advance(updated, TOTAL_DAYS);
    });
  };

  const onPostpone = () => {
    setProgress((p) => {
      const updated = setDay(p, day, { status: 'postponed' });
      return advance(updated, TOTAL_DAYS);
    });
  };

  return (
    <div className="min-h-screen flex bg-bg text-fg">
      <Sidebar active="today" />
      <main className="flex-1 min-w-0">
        <TodayCard
          task={task}
          totalDays={TOTAL_DAYS}
          progress={dayProgress}
          onComplete={onComplete}
          onPostpone={onPostpone}
          onSkip={onSkip}
        />
      </main>
    </div>
  );
}
