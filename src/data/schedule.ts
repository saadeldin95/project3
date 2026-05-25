import type { Task } from '../lib/types';
import curriculum from './curriculum.json';

const part = (n: 1 | 2 | 3) => curriculum.parts[n - 1];

const linalg = part(1).sources.find((s) => s.source_id === '3b1b_linalg')!;
const calc = part(1).sources.find((s) => s.source_id === '3b1b_calc')!;
const khan = part(1).sources.find((s) => s.source_id === 'khan_stats')!;

const pandas = part(2).sources.find((s) => s.source_id === 'kaggle_pandas')!;
const introML = part(2).sources.find((s) => s.source_id === 'kaggle_intro_ml')!;
const dataviz = part(2).sources.find((s) => s.source_id === 'kaggle_dataviz')!;
const project = part(2).sources.find((s) => s.source_id === 'personal_project')!;

const ng = part(3).sources.find((s) => s.source_id === 'andrew_ng_mls')!;

type LinAlgVideo = { number: number; title: string; url: string; duration_min: number };
type KhanUnit = { name: string; url: string };
type KaggleLesson = { number: number; title: string };

const la = (n: number, why?: string): Task => {
  const v = (linalg as unknown as { videos: LinAlgVideo[] }).videos.find((x) => x.number === n)!;
  return {
    day: 0,
    partNumber: 1,
    partTitle: part(1).title,
    sourceId: '3b1b_linalg',
    sourceName: linalg.name,
    title: `Linear Algebra #${v.number}: ${v.title}`,
    kind: 'video',
    url: v.url,
    durationMin: v.duration_min,
    whyItMatters: why ?? 'Linear algebra is the language of ML — matrices, vectors, and transformations underlie everything from data tables to neural networks.',
  };
};

const ca = (n: number, why?: string): Task => {
  const v = (calc as unknown as { videos: LinAlgVideo[] }).videos.find((x) => x.number === n)!;
  return {
    day: 0,
    partNumber: 1,
    partTitle: part(1).title,
    sourceId: '3b1b_calc',
    sourceName: calc.name,
    title: `Calculus #${v.number}: ${v.title}`,
    kind: 'video',
    url: v.url,
    durationMin: v.duration_min,
    whyItMatters: why ?? 'Derivatives and integrals power gradient descent — the engine behind every ML model that learns.',
  };
};

const kh = (i: number, why?: string): Task => {
  const u = (khan as unknown as { units: KhanUnit[] }).units[i];
  return {
    day: 0,
    partNumber: 1,
    partTitle: part(1).title,
    sourceId: 'khan_stats',
    sourceName: khan.name,
    title: `Khan: ${u.name}`,
    kind: 'exercise',
    url: u.url,
    durationMin: 60,
    whyItMatters: why ?? 'Probability and statistics are how models reason about uncertainty. ML is applied statistics.',
  };
};

const rest = (note: string): Task => ({
  day: 0,
  partNumber: 1,
  partTitle: 'Rest & Review',
  sourceId: 'rest',
  sourceName: 'Rest',
  title: note,
  kind: 'rest',
  whyItMatters: 'Rest is part of the plan. Burnout is the #1 killer of self-study. Recover, review what stuck, and come back fresh.',
});

const restPart = (n: 1 | 2 | 3, note: string): Task => ({
  ...rest(note),
  partNumber: n,
  partTitle: 'Rest & Review',
});

const kaggleLesson = (
  source: typeof pandas | typeof introML | typeof dataviz,
  n: number,
  durationMin: number,
  why: string,
): Task => {
  const s = source as unknown as {
    source_id: string;
    name: string;
    main_url: string;
    lessons: KaggleLesson[];
  };
  const lesson = s.lessons.find((x) => x.number === n)!;
  return {
    day: 0,
    partNumber: 2,
    partTitle: part(2).title,
    sourceId: s.source_id,
    sourceName: s.name,
    title: `${s.name.replace('Kaggle Learn - ', '')} — L${n}: ${lesson.title}`,
    kind: 'exercise',
    url: s.main_url,
    durationMin,
    whyItMatters: why,
  };
};

const projectDay = (title: string, why: string): Task => ({
  day: 0,
  partNumber: 2,
  partTitle: part(2).title,
  sourceId: 'personal_project',
  sourceName: project.name,
  title,
  kind: 'exercise',
  url: (project as unknown as { suggested_dataset_sources: { url: string }[] }).suggested_dataset_sources[0].url,
  durationMin: 90,
  whyItMatters: why,
});

const ngDay = (title: string, why: string): Task => ({
  day: 0,
  partNumber: 3,
  partTitle: part(3).title,
  sourceId: 'andrew_ng_mls',
  sourceName: ng.name,
  title,
  kind: 'video',
  noLink: true,
  durationMin: 60,
  whyItMatters: why,
});

const ngReview = (title: string): Task => ({
  ...ngDay(title, 'Spaced repetition and writing your own notes is what turns watched lectures into real understanding.'),
  kind: 'review',
});

const tasks: Task[] = [
  la(0, 'A 7-minute on-ramp into the whole series. Sets the intuition for everything that follows.'),
  la(1, 'Vectors are the atom of linear algebra — everything builds from here.'),
  ca(1, 'The big picture before the formulas. Why calculus exists.'),
  la(2, 'Span and basis tell you what your data can and can\'t represent.'),
  ca(2, 'Derivatives, properly visualised. Critical for gradient descent later.'),
  kh(0, 'Categorical data shows up everywhere in real datasets — start with the foundations.'),
  rest('Week 1 rest & review: skim notes, rewatch one tough video if needed.'),

  la(3, 'Matrices are functions that move space. This reframing changes everything.'),
  ca(3),
  la(4, 'Matrix multiplication is composition of transformations — not just a memorised algorithm.'),
  ca(4, 'The chain rule is literally how backpropagation works.'),
  la(5, 'A short, satisfying extension to 3D. Sets up the determinant.'),
  kh(1),
  rest('Week 2 rest: walk, re-watch favourites, leave the books closed.'),

  la(6, 'The determinant measures how a transformation stretches space.'),
  ca(5, 'e shows up everywhere in ML — softmax, gradients, probability.'),
  la(7, 'Solving linear systems = inverting a transformation.'),
  ca(6),
  la(8, 'Nonsquare matrices appear in PCA and dimensionality reduction.'),
  kh(2, 'Mean, median, variance — the daily vocabulary of data science.'),
  rest('Week 3 rest: do something fun. Brain consolidates while you\'re away.'),

  la(9, 'Dot products = projection. They\'re the heart of similarity in ML (cosine similarity, attention).'),
  ca(7),
  la(10),
  ca(8, 'The fundamental theorem of calculus — areas and derivatives are two sides of the same coin.'),
  la(11),
  kh(3, 'Probability is how ML reasons about uncertainty. Bayes is around the corner.'),
  rest('Week 4 rest: long walk, no screens.'),

  la(12, 'Cramer\'s rule, but more importantly the geometric intuition behind it.'),
  ca(9),
  la(13, 'Change of basis = what PCA does at the core.'),
  { ...ca(10, 'Short one (5 min). Sets up Taylor series tomorrow.'), durationMin: 5 },
  la(14, 'Eigen-things are everywhere in ML: PCA, spectral methods, stability.'),
  {
    ...ca(11, 'Taylor series approximate functions — central to optimisation. Wrap with Calc #12 reflection (16 min).'),
    title: 'Calculus #11 + #12: Taylor series + What they won\'t teach you',
    durationMin: 38,
  },
  la(15, 'The grand finale — abstraction is the point. Linear algebra applies far beyond ℝⁿ.'),

  kaggleLesson(pandas, 1, 45, 'Pandas is the daily driver of ML. Loading data is step zero.'),
  kaggleLesson(pandas, 2, 45, 'Indexing is the single most common operation you\'ll do in pandas.'),
  kaggleLesson(pandas, 3, 45, 'Summary stats and maps replace loops. Vectorised thinking starts here.'),
  kaggleLesson(pandas, 4, 45, 'groupby is where pandas shines — most real questions are group questions.'),
  kaggleLesson(pandas, 5, 45, 'Real data is dirty. Missing values are the rule, not the exception.'),
  kaggleLesson(pandas, 6, 45, 'Combining datasets is half the work in any real project.'),
  restPart(2, 'Week 6 rest: open a small CSV of your own and just poke at it. No goal.'),

  kaggleLesson(introML, 1, 30, 'A model is just a function fit to data. Start with that intuition.'),
  kaggleLesson(introML, 2, 30, 'Exploration before modelling — always.'),
  kaggleLesson(introML, 3, 45, 'Your first model. The fastest way to build instinct is to ship one.'),
  kaggleLesson(introML, 4, 45, 'Validation is what separates research from wishful thinking.'),
  kaggleLesson(introML, 5, 45, 'Underfitting/overfitting is THE central tension of ML.'),
  kaggleLesson(introML, 6, 45, 'Random forests are still a strong baseline in 2026.'),
  restPart(2, 'Week 7 rest: read one short ML blog post for fun.'),

  kaggleLesson(introML, 7, 45, 'Kaggle competitions are a great loop for fast feedback.'),
  kaggleLesson(dataviz, 1, 30, 'Seaborn is opinionated and good — start here, not matplotlib.'),
  kaggleLesson(dataviz, 2, 30, 'Line charts for trends — the workhorse plot.'),
  kaggleLesson(dataviz, 3, 30, 'Heatmaps are how you read a correlation matrix.'),
  kaggleLesson(dataviz, 4, 30, 'Scatter plots reveal relationships your tables hide.'),
  {
    ...kaggleLesson(dataviz, 5, 60, 'Distributions tell you what shape your data has.'),
    title: 'Data Visualization — L5–6: Distributions + Plot Types',
  },
  restPart(2, 'Week 8 rest: pick the dataset for next week\'s project.'),

  kaggleLesson(dataviz, 7, 60, 'Wraps the data viz mini-arc with a small project.'),
  projectDay('Personal Project: pick & explore dataset', 'Doing > watching. A messy real dataset will teach more than 5 tutorials.'),
  projectDay('Personal Project: clean + 3 questions', 'Frame questions you actually care about — sports, music, games. Curiosity = retention.'),
  projectDay('Personal Project: visualise findings + ship notebook', 'A notebook you can show is a milestone. Even rough output beats nothing.'),

  ngDay('Andrew Ng C1W1 — Intro & supervised vs unsupervised', 'The cleanest possible mental map of ML. Anchors everything.'),
  ngDay('Andrew Ng C1W1 — Regression model', 'Linear regression is the hello-world of ML.'),
  ngDay('Andrew Ng C1W1 — Cost function', 'Cost functions = the thing you minimise. Understand this and the rest follows.'),
  ngDay('Andrew Ng C1W1 — Gradient descent (intuition)', 'Gradient descent is THE algorithm. Pay attention here.'),
  ngDay('Andrew Ng C1W1 — Gradient descent for linear regression + lab', 'Where math, code, and intuition meet for the first time.'),
  ngReview('Notes day: write a 1-page summary of Week 1 in your own words.'),
  restPart(3, 'Week 9 rest: brain consolidation. No videos today.'),

  ngDay('Andrew Ng C1W2 — Multiple features', 'Real data has many columns. The notation matters.'),
  ngDay('Andrew Ng C1W2 — Vectorisation with NumPy', 'Vectorisation is a 10–100x speedup. Learn it once, use forever.'),
  ngDay('Andrew Ng C1W2 — Feature scaling + GD checks', 'Feature scaling is the #1 reason your model fails to converge.'),
  ngDay('Andrew Ng C1W2 — Feature engineering + polynomial regression', 'Feature engineering still beats most fancy models on tabular data.'),
  ngDay('Andrew Ng C1W2 — Lab: linear regression on real data', 'Lab time. Run it, break it, fix it.'),
  ngReview('Notes day: 1-page summary of Week 2 + redo one lab from memory.'),
  restPart(3, 'Week 10 rest: walk and let it settle.'),

  ngDay('Andrew Ng C1W3 — Classification + logistic regression', 'Switching from predicting numbers to predicting classes.'),
  ngDay('Andrew Ng C1W3 — Decision boundary', 'A picture of what your classifier actually does.'),
  ngDay('Andrew Ng C1W3 — Cost function for logistic regression', 'Why log loss, not squared error. The intuition is worth the time.'),
  ngDay('Andrew Ng C1W3 — Gradient descent for logistic regression + lab', 'Same algorithm, new model. The pattern is the point.'),
  ngDay('Andrew Ng C1W3 — Overfitting + regularisation', 'Regularisation is how you keep models honest.'),
  ngReview('Final notes day: write the 3-page summary of Course 1 you wish you had at the start.'),
  restPart(3, 'Day 77. Summer foundation done. Reflect, rest, plan year 2.'),
];

if (tasks.length !== 77) {
  throw new Error(`Schedule must have 77 days, got ${tasks.length}`);
}

export const SCHEDULE: Task[] = tasks.map((t, i) => ({ ...t, day: i + 1 }));

export const TOTAL_DAYS = SCHEDULE.length;
