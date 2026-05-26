import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { QuizQuestion } from '../lib/types';

type Props = {
  questions: QuizQuestion[];
  lessonTitle: string;
  onClose: () => void;
};

export function QuizModal({ questions, lessonTitle, onClose }: Props) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (questions.length === 0) return null;
  const q = questions[index];
  const isLast = index === questions.length - 1;
  const answered = picked !== null;

  const next = () => {
    if (isLast) {
      onClose();
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  };

  const ui = (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md rounded-xl border border-border p-6 shadow-2xl"
        style={{ backgroundColor: '#1a1a1a' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs uppercase tracking-widest text-accent">Quick check</div>
          <div className="text-xs text-muted">
            {index + 1} of {questions.length}
          </div>
        </div>
        <div className="text-[11px] text-muted mb-4 truncate">{lessonTitle}</div>

        <h3 className="text-base text-fg leading-snug mb-4">{q.question}</h3>

        <div className="flex flex-col gap-2 mb-4">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correct;
            const isPicked = picked === i;
            let cls = 'border-border text-fg hover:border-fg';
            let inline: React.CSSProperties = { backgroundColor: '#0f0f0f' };
            if (answered) {
              if (isCorrect) {
                cls = 'border-accent text-accent';
                inline = { backgroundColor: 'rgba(20, 184, 166, 0.12)' };
              } else if (isPicked) {
                cls = 'border-red-500/60 text-red-300';
                inline = { backgroundColor: 'rgba(239, 68, 68, 0.12)' };
              } else {
                cls = 'border-border text-muted';
                inline = { backgroundColor: '#0f0f0f' };
              }
            }
            return (
              <button
                key={i}
                disabled={answered}
                onClick={() => setPicked(i)}
                style={inline}
                className={
                  'text-left px-4 py-2.5 rounded-md border text-sm transition-colors ' + cls
                }
              >
                <span className="text-muted mr-2 text-xs">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <div
            className={
              'rounded-md border px-3 py-2 mb-4 text-xs leading-relaxed text-fg ' +
              (picked === q.correct ? 'border-accent/40' : 'border-amber-400/30')
            }
            style={{
              backgroundColor:
                picked === q.correct ? 'rgba(20, 184, 166, 0.1)' : 'rgba(251, 191, 36, 0.08)',
            }}
          >
            <span className="font-medium">
              {picked === q.correct ? 'Correct.' : 'Not quite.'}
            </span>{' '}
            {q.explanation}
          </div>
        )}

        <div className="flex justify-between items-center">
          <button onClick={onClose} className="text-xs text-muted hover:text-fg">
            Skip checkpoint
          </button>
          <button
            onClick={next}
            disabled={!answered}
            className={
              'px-4 py-1.5 rounded-md text-sm font-medium ' +
              (answered
                ? 'bg-accent hover:bg-accent-hover text-white'
                : 'border border-border text-muted cursor-not-allowed')
            }
            style={!answered ? { backgroundColor: '#0f0f0f' } : undefined}
          >
            {isLast ? 'Done' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(ui, document.body);
}
