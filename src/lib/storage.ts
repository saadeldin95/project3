import { LESSON_BY_ID, SOURCE_ORDER } from '../data/lessons';
import type { AppState, BudgetMin, LessonRecord, LessonStatus, SessionLock } from './types';
import { formatDate } from './session';

const V2_KEY = 'summer-tracker:state:v2';
const V1_KEY = 'summer-tracker:progress:v1';

const DEFAULT_BUDGET: BudgetMin = 60;

const empty = (): AppState => ({
  version: 2,
  records: {},
  budgetMin: DEFAULT_BUDGET,
  session: null,
});

const V1_DAY_TO_LESSON_IDS: Record<number, string[]> = {
  1: ['la-0'], 2: ['la-1'], 3: ['ca-1'], 4: ['la-2'], 5: ['ca-2'], 6: ['khan-0'],
  8: ['la-3'], 9: ['ca-3'], 10: ['la-4'], 11: ['ca-4'], 12: ['la-5'], 13: ['khan-1'],
  15: ['la-6'], 16: ['ca-5'], 17: ['la-7'], 18: ['ca-6'], 19: ['la-8'], 20: ['khan-2'],
  22: ['la-9'], 23: ['ca-7'], 24: ['la-10'], 25: ['ca-8'], 26: ['la-11'], 27: ['khan-3'],
  29: ['la-12'], 30: ['ca-9'], 31: ['la-13'], 32: ['ca-10'], 33: ['la-14'],
  34: ['ca-11', 'ca-12'], 35: ['la-15'],
  36: ['pandas-1'], 37: ['pandas-2'], 38: ['pandas-3'], 39: ['pandas-4'],
  40: ['pandas-5'], 41: ['pandas-6'],
  43: ['introml-1', 'introml-2'], 44: ['introml-3'], 45: ['introml-4'],
  46: ['introml-5'], 47: ['introml-6'], 48: ['introml-7'],
  50: ['dataviz-1', 'dataviz-2'], 51: ['dataviz-3', 'dataviz-4'],
  52: ['dataviz-5', 'dataviz-6'], 53: ['dataviz-7'],
  54: ['personal-project'], 55: ['personal-project'],
  57: ['ng-c1w1-lectures'], 58: ['ng-c1w1-lectures'], 59: ['ng-c1w1-lectures'],
  60: ['ng-c1w1-lab'], 61: ['ng-c1w1-lab'], 62: ['ng-c1w1-notes'],
  64: ['ng-c1w2-lectures'], 65: ['ng-c1w2-lectures'], 66: ['ng-c1w2-lectures'],
  67: ['ng-c1w2-lab'], 68: ['ng-c1w2-lab'], 69: ['ng-c1w2-notes'],
  71: ['ng-c1w3-lectures'], 72: ['ng-c1w3-lectures'], 73: ['ng-c1w3-lectures'],
  74: ['ng-c1w3-lab'], 75: ['ng-c1w3-lab'], 76: ['ng-c1w3-notes'],
};

type V1Status = 'pending' | 'done' | 'skipped' | 'postponed';
type V1Day = { status: V1Status; completedAt?: string; note?: string };
type V1Shape = { currentDay: number; days: Record<number, V1Day> };

function migrateFromV1(): AppState {
  const raw = localStorage.getItem(V1_KEY);
  if (!raw) return empty();
  let v1: V1Shape | null = null;
  try {
    v1 = JSON.parse(raw) as V1Shape;
  } catch {
    return empty();
  }
  if (!v1 || !v1.days) return empty();

  const records: Record<string, LessonRecord> = {};
  for (const [dayStr, day] of Object.entries(v1.days)) {
    if (!day || day.status === 'pending') continue;
    const ids = V1_DAY_TO_LESSON_IDS[Number(dayStr)];
    if (!ids) continue;
    for (const id of ids) {
      const existing = records[id];
      if (existing?.status === 'done' && day.status !== 'done') continue;
      records[id] = {
        status: day.status as LessonStatus,
        updatedAt: day.completedAt ?? new Date().toISOString(),
        note: day.note,
      };
    }
  }
  return { version: 2, records, budgetMin: DEFAULT_BUDGET, session: null };
}

const BUDGET_OPTIONS: BudgetMin[] = [30, 60, 120, 180, 240];

function normaliseBudget(n: unknown): BudgetMin {
  return typeof n === 'number' && (BUDGET_OPTIONS as number[]).includes(n)
    ? (n as BudgetMin)
    : DEFAULT_BUDGET;
}

function normaliseSession(s: unknown): SessionLock | null {
  if (!s || typeof s !== 'object') return null;
  const obj = s as Partial<SessionLock>;
  if (typeof obj.date !== 'string' || !Array.isArray(obj.lessonIds)) return null;
  return {
    date: obj.date,
    lessonIds: obj.lessonIds.filter((x): x is string => typeof x === 'string'),
    endedAt: typeof obj.endedAt === 'string' ? obj.endedAt : undefined,
  };
}

export function loadState(): AppState {
  if (typeof localStorage === 'undefined') return empty();
  const raw = localStorage.getItem(V2_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Partial<AppState>;
      return {
        version: 2,
        records: parsed.records ?? {},
        budgetMin: normaliseBudget(parsed.budgetMin),
        session: normaliseSession(parsed.session),
      };
    } catch {
      return empty();
    }
  }
  const migrated = migrateFromV1();
  if (Object.keys(migrated.records).length > 0) {
    try {
      localStorage.setItem(V2_KEY, JSON.stringify(migrated));
    } catch {
      /* ignore */
    }
  }
  return migrated;
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(V2_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function setRecord(state: AppState, lessonId: string, record: LessonRecord): AppState {
  return {
    ...state,
    records: { ...state.records, [lessonId]: record },
  };
}

export function setBudget(state: AppState, budget: BudgetMin): AppState {
  return { ...state, budgetMin: budget };
}

export function lockSession(state: AppState, date: string, lessonIds: string[]): AppState {
  return { ...state, session: { date, lessonIds } };
}

export function dropFromSession(state: AppState, lessonId: string): AppState {
  if (!state.session) return state;
  if (!state.session.lessonIds.includes(lessonId)) return state;
  return {
    ...state,
    session: {
      ...state.session,
      lessonIds: state.session.lessonIds.filter((id) => id !== lessonId),
    },
  };
}

export function endSession(state: AppState): AppState {
  if (!state.session) return state;
  return {
    ...state,
    session: { ...state.session, endedAt: new Date().toISOString() },
  };
}

export function resetAll(): AppState {
  try {
    localStorage.removeItem(V2_KEY);
    localStorage.removeItem(V1_KEY);
  } catch {
    /* ignore */
  }
  return empty();
}

export function exportNotesAsMarkdown(records: Record<string, LessonRecord>): string {
  const lines: string[] = [];
  lines.push('# Summer Tracker — Notes');
  lines.push('');
  lines.push(`*Exported ${formatDate(new Date().toISOString())}*`);
  lines.push('');

  type Item = { lessonId: string; record: LessonRecord };
  const bySource = new Map<string, Item[]>();
  for (const [id, record] of Object.entries(records)) {
    if (!record.note || !record.note.trim()) continue;
    const lesson = LESSON_BY_ID[id];
    if (!lesson) continue;
    const arr = bySource.get(lesson.sourceId) ?? [];
    arr.push({ lessonId: id, record });
    bySource.set(lesson.sourceId, arr);
  }

  let total = 0;
  for (const src of SOURCE_ORDER) {
    const items = bySource.get(src.id);
    if (!items || items.length === 0) continue;
    lines.push(`## ${src.short}`);
    lines.push('');
    items.sort((a, b) => (a.record.updatedAt > b.record.updatedAt ? 1 : -1));
    for (const it of items) {
      const lesson = LESSON_BY_ID[it.lessonId];
      lines.push(`### ${lesson.title}`);
      lines.push(`*${formatDate(it.record.updatedAt)}*`);
      lines.push('');
      lines.push(it.record.note!);
      lines.push('');
      lines.push('---');
      lines.push('');
      total += 1;
    }
  }
  if (total === 0) {
    lines.push('_No notes written yet._');
    lines.push('');
  }
  return lines.join('\n');
}
