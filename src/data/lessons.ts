import type { Lesson } from '../lib/types';
import curriculum from './curriculum.json';

type Raw = typeof curriculum;
type Source = Raw['parts'][number]['sources'][number];

const part1 = curriculum.parts[0];
const part2 = curriculum.parts[1];
const part3 = curriculum.parts[2];

const findSource = (sources: readonly Source[], id: string) =>
  sources.find((s) => s.source_id === id)!;

const linalg = findSource(part1.sources, '3b1b_linalg') as Source & {
  videos: { number: number; title: string; url: string; duration_min: number }[];
};
const calc = findSource(part1.sources, '3b1b_calc') as Source & {
  videos: { number: number; title: string; url: string; duration_min: number }[];
};
const khan = findSource(part1.sources, 'khan_stats') as Source & {
  units: { name: string; url: string }[];
};

const pandas = findSource(part2.sources, 'kaggle_pandas') as Source & {
  main_url: string;
  lessons: { number: number; title: string }[];
};
const introML = findSource(part2.sources, 'kaggle_intro_ml') as Source & {
  main_url: string;
  lessons: { number: number; title: string }[];
};
const dataviz = findSource(part2.sources, 'kaggle_dataviz') as Source & {
  main_url: string;
  lessons: { number: number; title: string }[];
};
const project = findSource(part2.sources, 'personal_project') as Source & {
  suggested_dataset_sources: { name: string; url: string }[];
};

const ng = findSource(part3.sources, 'andrew_ng_mls');

const PART1 = { number: 1 as const, title: part1.title };
const PART2 = { number: 2 as const, title: part2.title };
const PART3 = { number: 3 as const, title: part3.title };

const LA_WHY: Record<number, string> = {
  0: 'A 7-min on-ramp into the whole series. Sets the intuition for everything that follows.',
  1: 'Vectors are the atom of linear algebra — everything builds from here.',
  2: 'Span and basis tell you what your data can and can\'t represent.',
  3: 'Matrices are functions that move space. This reframing changes everything.',
  4: 'Matrix multiplication is composition of transformations — not a memorised algorithm.',
  5: 'A short, satisfying extension to 3D. Sets up the determinant.',
  6: 'The determinant measures how a transformation stretches space.',
  7: 'Solving linear systems = inverting a transformation.',
  8: 'Nonsquare matrices appear in PCA and dimensionality reduction.',
  9: 'Dot products = projection. Heart of similarity in ML (cosine sim, attention).',
  10: 'Cross products — a 3D geometry primitive you\'ll meet again.',
  11: 'Cross products through the linear-transformation lens.',
  12: 'Cramer\'s rule, but more importantly the geometric intuition behind it.',
  13: 'Change of basis = what PCA does at the core.',
  14: 'Eigen-things are everywhere in ML: PCA, spectral methods, stability.',
  15: 'The grand finale — linear algebra applies far beyond ℝⁿ.',
};

const CA_WHY: Record<number, string> = {
  1: 'The big picture before the formulas. Why calculus exists.',
  2: 'Derivatives, properly visualised. Critical for gradient descent later.',
  3: 'Derivative formulas you\'ll see again and again.',
  4: 'The chain rule is literally how backpropagation works.',
  5: 'e shows up everywhere in ML — softmax, gradients, probability.',
  6: 'Implicit differentiation — useful, weird, worth seeing once.',
  7: 'Limits and L\'Hopital — the fine print under derivatives.',
  8: 'The fundamental theorem of calculus — areas and derivatives are two sides of one coin.',
  9: 'A short geometric payoff for everything above.',
  10: 'Second derivatives — curvature, used in optimisation.',
  11: 'Taylor series approximate functions — central to optimisation.',
  12: 'A reflective closer to the series.',
};

const KHAN_WHY: Record<number, string> = {
  0: 'Categorical data shows up everywhere in real datasets.',
  1: 'Histograms, box plots, distributions — the visual vocabulary of data.',
  2: 'Mean, median, variance — the daily vocabulary of data science.',
  3: 'Probability is how ML reasons about uncertainty.',
};

const PANDAS_WHY: Record<number, string> = {
  1: 'Pandas is the daily driver of ML. Loading data is step zero.',
  2: 'Indexing is the single most common operation you\'ll do in pandas.',
  3: 'Summary stats and maps replace loops. Vectorised thinking starts here.',
  4: 'groupby is where pandas shines — most real questions are group questions.',
  5: 'Real data is dirty. Missing values are the rule, not the exception.',
  6: 'Combining datasets is half the work in any real project.',
};

const INTROML_WHY: Record<number, string> = {
  1: 'A model is just a function fit to data. Start with that intuition.',
  2: 'Exploration before modelling — always.',
  3: 'Your first model. The fastest way to build instinct is to ship one.',
  4: 'Validation is what separates research from wishful thinking.',
  5: 'Underfitting/overfitting is THE central tension of ML.',
  6: 'Random forests are still a strong baseline in 2026.',
  7: 'Kaggle competitions are a great loop for fast feedback.',
};

const DATAVIZ_WHY: Record<number, string> = {
  1: 'Seaborn is opinionated and good — start here, not raw matplotlib.',
  2: 'Line charts for trends — the workhorse plot.',
  3: 'Heatmaps are how you read a correlation matrix.',
  4: 'Scatter plots reveal relationships your tables hide.',
  5: 'Distributions tell you what shape your data has.',
  6: 'Picking the right plot is half the skill.',
  7: 'A small project to consolidate everything.',
};

const laLesson = (n: number): Lesson => {
  const v = linalg.videos.find((x) => x.number === n)!;
  return {
    id: `la-${n}`,
    kind: 'video',
    title: `LA #${v.number}: ${v.title}`,
    sourceId: linalg.source_id,
    sourceName: linalg.name,
    sourceShort: 'Linear Algebra',
    partNumber: PART1.number,
    partTitle: PART1.title,
    url: v.url,
    durationMin: v.duration_min,
    whyItMatters: LA_WHY[n] ?? 'Builds your linear algebra intuition.',
  };
};

const caLesson = (n: number): Lesson => {
  const v = calc.videos.find((x) => x.number === n)!;
  return {
    id: `ca-${n}`,
    kind: 'video',
    title: `Calc #${v.number}: ${v.title}`,
    sourceId: calc.source_id,
    sourceName: calc.name,
    sourceShort: 'Calculus',
    partNumber: PART1.number,
    partTitle: PART1.title,
    url: v.url,
    durationMin: v.duration_min,
    whyItMatters: CA_WHY[n] ?? 'Builds your calculus intuition.',
  };
};

const khanLesson = (i: number): Lesson => {
  const u = khan.units[i];
  return {
    id: `khan-${i}`,
    kind: 'exercise',
    title: `Khan Stats: ${u.name}`,
    sourceId: khan.source_id,
    sourceName: khan.name,
    sourceShort: 'Khan Stats',
    partNumber: PART1.number,
    partTitle: PART1.title,
    url: u.url,
    durationMin: 45,
    durationEstimated: true,
    whyItMatters: KHAN_WHY[i] ?? 'Statistics fundamentals for ML.',
  };
};

const pandasLesson = (n: number): Lesson => {
  const l = pandas.lessons.find((x) => x.number === n)!;
  return {
    id: `pandas-${n}`,
    kind: 'exercise',
    title: `Pandas — L${n}: ${l.title}`,
    sourceId: pandas.source_id,
    sourceName: pandas.name,
    sourceShort: 'Kaggle Pandas',
    partNumber: PART2.number,
    partTitle: PART2.title,
    url: pandas.main_url,
    durationMin: 45,
    durationEstimated: true,
    whyItMatters: PANDAS_WHY[n] ?? 'Pandas fundamentals.',
  };
};

const introMLLesson = (n: number): Lesson => {
  const l = introML.lessons.find((x) => x.number === n)!;
  return {
    id: `introml-${n}`,
    kind: 'exercise',
    title: `Intro ML — L${n}: ${l.title}`,
    sourceId: introML.source_id,
    sourceName: introML.name,
    sourceShort: 'Kaggle Intro ML',
    partNumber: PART2.number,
    partTitle: PART2.title,
    url: introML.main_url,
    durationMin: 45,
    durationEstimated: true,
    whyItMatters: INTROML_WHY[n] ?? 'Intro ML fundamentals.',
  };
};

const datavizLesson = (n: number): Lesson => {
  const l = dataviz.lessons.find((x) => x.number === n)!;
  return {
    id: `dataviz-${n}`,
    kind: 'exercise',
    title: `Data Viz — L${n}: ${l.title}`,
    sourceId: dataviz.source_id,
    sourceName: dataviz.name,
    sourceShort: 'Kaggle Data Viz',
    partNumber: PART2.number,
    partTitle: PART2.title,
    url: dataviz.main_url,
    durationMin: 45,
    durationEstimated: true,
    whyItMatters: DATAVIZ_WHY[n] ?? 'Data visualization fundamentals.',
  };
};

const projectLesson = (): Lesson => ({
  id: 'personal-project',
  kind: 'project',
  title: 'Personal Data Analysis Project',
  sourceId: project.source_id,
  sourceName: project.name,
  sourceShort: 'Project',
  partNumber: PART2.number,
  partTitle: PART2.title,
  url: project.suggested_dataset_sources[0].url,
  durationMin: 300,
  durationEstimated: true,
  whyItMatters:
    'Pick a dataset you care about, ask 3 real questions, ship a notebook. Doing > watching. Paste the link to your notebook in the note when done.',
  extraNote: 'Estimated 4–6 hours total. Spread across a few sessions if needed — just mark complete when the notebook is shipped.',
});

const ngWeek = (week: 1 | 2 | 3, suffix: 'lectures' | 'lab' | 'notes', title: string, why: string, mins: number): Lesson => ({
  id: `ng-c1w${week}-${suffix}`,
  kind: suffix === 'notes' ? 'review' : suffix === 'lab' ? 'exercise' : 'video',
  title: `Andrew Ng C1W${week} — ${title}`,
  sourceId: ng.source_id,
  sourceName: ng.name,
  sourceShort: 'Andrew Ng C1',
  partNumber: PART3.number,
  partTitle: PART3.title,
  noLink: true,
  durationMin: mins,
  durationEstimated: true,
  whyItMatters: why,
  extraNote: suffix === 'lectures'
    ? 'A Coursera "week" runs ~3 hours. If your budget can\'t fit it, do as much as you can and mark complete when the week is fully watched.'
    : undefined,
});

const ngWrapup = (): Lesson => ({
  id: 'ng-c1-wrapup',
  kind: 'review',
  title: 'Andrew Ng C1 — Final notes & reflection',
  sourceId: ng.source_id,
  sourceName: ng.name,
  sourceShort: 'Andrew Ng C1',
  partNumber: PART3.number,
  partTitle: PART3.title,
  noLink: true,
  durationMin: 60,
  durationEstimated: true,
  whyItMatters: 'Write the 3-page summary of Course 1 you wish you had at the start. This is what makes it stick.',
});

const part1Queue: Lesson[] = [
  laLesson(0), laLesson(1), caLesson(1),
  laLesson(2), caLesson(2), khanLesson(0),
  laLesson(3), caLesson(3), laLesson(4), caLesson(4),
  laLesson(5), khanLesson(1),
  laLesson(6), caLesson(5), laLesson(7), caLesson(6),
  laLesson(8), khanLesson(2),
  laLesson(9), caLesson(7), laLesson(10), caLesson(8),
  laLesson(11), khanLesson(3),
  laLesson(12), caLesson(9), laLesson(13),
  caLesson(10), laLesson(14), caLesson(11), caLesson(12),
  laLesson(15),
];

const part2Queue: Lesson[] = [
  pandasLesson(1), pandasLesson(2), pandasLesson(3),
  pandasLesson(4), pandasLesson(5), pandasLesson(6),
  introMLLesson(1), introMLLesson(2), introMLLesson(3),
  introMLLesson(4), introMLLesson(5), introMLLesson(6), introMLLesson(7),
  datavizLesson(1), datavizLesson(2), datavizLesson(3),
  datavizLesson(4), datavizLesson(5), datavizLesson(6), datavizLesson(7),
  projectLesson(),
];

const part3Queue: Lesson[] = [
  ngWeek(1, 'lectures', 'Week 1 lectures (intro, regression, cost, gradient descent)', 'The cleanest mental map of supervised ML. Linear regression, cost functions, gradient descent — the algorithmic core.', 180),
  ngWeek(1, 'lab', 'Week 1 lab + practice quizzes', 'Run the code. Break it. Fix it. That\'s how it sticks.', 90),
  ngWeek(1, 'notes', 'Week 1 notes — 1-page summary', 'Spaced writing > spaced repetition. Distill the week in your own words.', 30),
  ngWeek(2, 'lectures', 'Week 2 lectures (multiple features, vectorisation, feature scaling)', 'Real data has many columns. Vectorisation is a 10–100x speedup. Feature scaling is the #1 reason GD fails.', 180),
  ngWeek(2, 'lab', 'Week 2 lab + practice quizzes', 'Linear regression on real data, with vectorisation.', 90),
  ngWeek(2, 'notes', 'Week 2 notes — 1-page summary', 'Re-derive one formula from memory. That\'s the test.', 30),
  ngWeek(3, 'lectures', 'Week 3 lectures (logistic regression, decision boundary, regularisation)', 'Switching from predicting numbers to predicting classes. Why log loss, not squared error. Regularisation keeps models honest.', 180),
  ngWeek(3, 'lab', 'Week 3 lab + practice quizzes', 'Logistic regression on real data.', 90),
  ngWeek(3, 'notes', 'Week 3 notes — 1-page summary', 'Compare linear vs logistic in your own words. Same algorithm, new model.', 30),
  ngWrapup(),
];

export const LESSON_QUEUE: Lesson[] = [...part1Queue, ...part2Queue, ...part3Queue];

export const SOURCE_ORDER: { id: string; short: string; partNumber: 1 | 2 | 3 }[] = [
  { id: '3b1b_linalg', short: 'Linear Algebra', partNumber: 1 },
  { id: '3b1b_calc', short: 'Calculus', partNumber: 1 },
  { id: 'khan_stats', short: 'Khan Stats', partNumber: 1 },
  { id: 'kaggle_pandas', short: 'Kaggle Pandas', partNumber: 2 },
  { id: 'kaggle_intro_ml', short: 'Kaggle Intro ML', partNumber: 2 },
  { id: 'kaggle_dataviz', short: 'Kaggle Data Viz', partNumber: 2 },
  { id: 'personal_project', short: 'Personal Project', partNumber: 2 },
  { id: 'andrew_ng_mls', short: 'Andrew Ng C1', partNumber: 3 },
];

export const LESSON_BY_ID: Record<string, Lesson> = Object.fromEntries(
  LESSON_QUEUE.map((l) => [l.id, l]),
);
