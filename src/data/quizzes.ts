import type { QuizQuestion } from '../lib/types';

const Q = (
  question: string,
  options: [string, string, string, string],
  correct: number,
  explanation: string,
): QuizQuestion => ({ question, options, correct, explanation });

export const LA_QUIZ: Record<number, QuizQuestion[]> = {
  0: [
    Q('What is the central goal of the Essence of Linear Algebra series?', [
      'Memorize matrix multiplication rules',
      'Build geometric intuition for linear algebra',
      'Rigorously prove every theorem',
      'Solve large linear systems by hand',
    ], 1, 'The series prioritises visual intuition over symbolic manipulation.'),
    Q('Who is the intended audience?', [
      'PhD mathematicians',
      'Total beginners with no math background',
      'Students who studied LA mechanically and want intuition',
      'Children learning arithmetic',
    ], 2, 'It is a re-introduction for people who saw LA but never felt it.'),
    Q('Why does geometric thinking matter here?', [
      'It replaces computation entirely',
      'It makes hand calculation easier',
      'It gives computations meaning',
      'It is required for ML job interviews',
    ], 2, 'Geometry tells you what the formulas mean, not just how to crank them.'),
  ],
  1: [
    Q('In the geometric view, the simplest mental model of a vector is...', [
      'A row in a spreadsheet',
      'An arrow with its tail at the origin',
      'A scalar times another scalar',
      'A single number',
    ], 1, 'The "arrow from the origin" picture is the foundational image.'),
    Q('What does scalar multiplication do to a vector geometrically?', [
      'Rotates it 90°',
      'Stretches or shrinks it along its direction',
      'Reflects it across the x-axis',
      'Translates it to a new point',
    ], 1, 'Scaling changes the length (and possibly sign), not the direction.'),
    Q('Adding two vectors geometrically corresponds to...', [
      'Their dot product',
      'Walking along one then the other, tip to tail',
      'The angle between them',
      'Rotating one by the other',
    ], 1, 'Vector addition is the "tip to tail" chained-movement picture.'),
  ],
  2: [
    Q('A linear combination of v and w is any vector of the form...', [
      'v · w',
      'av + bw for some scalars a, b',
      'v × w',
      '|v| + |w|',
    ], 1, 'Linear combinations scale each vector and add the results.'),
    Q('The span of a set of vectors is...', [
      'Their dot product',
      'The set of all linear combinations of them',
      'The magnitude of the longest one',
      'The angle between them',
    ], 1, 'Span is "everywhere you can reach" by combining the vectors with scalars.'),
    Q('When do two 2D vectors fail to form a basis for ℝ²?', [
      'When one is much longer than the other',
      'When they point in the same (or opposite) direction',
      'When one has a negative entry',
      'When their dot product is positive',
    ], 1, 'Parallel vectors only span a line, not the whole plane.'),
  ],
  3: [
    Q('What makes a transformation "linear"?', [
      'It produces a straight line on a graph',
      'Grid lines stay parallel and evenly spaced, and the origin is fixed',
      'It uses the linear regression formula',
      'Every vector is scaled by the same factor',
    ], 1, 'Linearity preserves grid structure and keeps the origin in place.'),
    Q('The columns of a 2×2 transformation matrix represent...', [
      'The eigenvalues',
      'Where the basis vectors î and ĵ land after the transformation',
      'Random coefficients',
      'The determinant',
    ], 1, 'Each column is the image of a basis vector.'),
    Q('Applying matrix M to vector v means...', [
      'Computing det(M) · v',
      'Transforming v by the linear transformation M encodes',
      'Adding M to v',
      'Solving Mx = v',
    ], 1, 'Mv is the result of applying the transformation to v.'),
  ],
  4: [
    Q('Reading the matrix product AB right-to-left means...', [
      'Apply A first, then B',
      'Apply B first, then A',
      'Multiply entries elementwise',
      'Take the transpose of B',
    ], 1, 'Composition reads inside-out — the rightmost transformation acts first.'),
    Q('Is matrix multiplication commutative in general?', [
      'Yes, always',
      'No — AB ≠ BA in general',
      'Only for 2×2 matrices',
      'Only when both are invertible',
    ], 1, 'Order of transformations matters; AB and BA usually differ.'),
    Q('A 2×2 matrix product AB geometrically gives you...', [
      'A new transformation equivalent to doing B then A',
      'The sum of the two transformations',
      'A rotation by the average angle',
      'The same transformation as either A or B',
    ], 0, 'Matrix multiplication is composition of linear transformations.'),
  ],
  5: [
    Q('A 3D linear transformation is encoded by a matrix of size...', [
      '2×2',
      '3×3',
      '3×2',
      '4×4',
    ], 1, 'Three basis vectors → three columns, each with three coordinates.'),
    Q('The columns of a 3×3 transformation matrix tell you where...', [
      'The origin moves to',
      'The basis vectors î, ĵ, k̂ land',
      'The eigenvalues sit',
      'The diagonal entries point',
    ], 1, 'Same idea as 2D, just with three basis vectors.'),
    Q('Composing two 3D linear transformations is done by...', [
      'Adding their matrices',
      'Multiplying their 3×3 matrices',
      'Taking dot products column by column',
      'Computing the trace',
    ], 1, 'Composition in any dimension = matrix multiplication.'),
  ],
  6: [
    Q('What does the determinant of a 2×2 matrix measure geometrically?', [
      'The length of the longest column',
      'How much the transformation scales areas',
      'The trace of the matrix',
      'The sum of its entries',
    ], 1, '|det| is the area-scaling factor of the transformation.'),
    Q('A negative determinant means the transformation...', [
      'Is invalid',
      'Flips orientation (reflects space)',
      'Has complex entries',
      'Has zero rank',
    ], 1, 'The sign of the determinant records whether orientation is preserved or flipped.'),
    Q('det = 0 means the transformation...', [
      'Is the identity',
      'Squishes space onto a lower-dimensional subspace',
      'Doubles every area',
      'Cannot be applied',
    ], 1, 'Zero determinant collapses dimensions — there is no inverse.'),
  ],
  7: [
    Q('The inverse of a matrix A is the matrix that...', [
      'Doubles every output of A',
      'Undoes the transformation A applies',
      'Has the same determinant as A',
      'Is equal to Aᵀ',
    ], 1, 'A⁻¹ takes you back to where you started.'),
    Q('The column space of A is...', [
      'All vectors orthogonal to A\'s rows',
      'The span of A\'s columns — all possible outputs of A',
      'The set of rows in A',
      'The diagonal of A',
    ], 1, 'Column space = image = everywhere A can land you.'),
    Q('The null space of A contains...', [
      'All vectors that A scales by 2',
      'All vectors that A sends to the zero vector',
      'The eigenvectors of A',
      'Only the zero vector, always',
    ], 1, 'Null space (kernel) is everything A collapses to zero.'),
  ],
  8: [
    Q('An m×n matrix represents a transformation from...', [
      'm-dimensional space to n-dimensional space',
      'n-dimensional space to m-dimensional space',
      'Always 2D to 2D',
      'Vectors to scalars',
    ], 1, 'n columns means n input coordinates; m rows means m output coordinates.'),
    Q('A 3×2 matrix maps...', [
      'ℝ³ to ℝ²',
      'ℝ² to ℝ³',
      'ℝ² to ℝ²',
      'ℝ³ to ℝ³',
    ], 1, 'Two columns (2D input), each with 3 coordinates (3D output).'),
    Q('A 2×3 matrix maps...', [
      'ℝ³ to ℝ²',
      'ℝ² to ℝ³',
      'ℝ² to ℝ²',
      'ℝ³ to ℝ³',
    ], 0, 'Three columns (3D input), each with 2 coordinates (2D output).'),
  ],
  9: [
    Q('Geometrically, v · w equals...', [
      'The area of the parallelogram of v and w',
      'The projection of v onto w times |w| (or equivalently |v||w|cosθ)',
      'A new vector perpendicular to both',
      'The determinant of [v w]',
    ], 1, 'Dot product = projection times length.'),
    Q('Two perpendicular nonzero vectors have a dot product of...', [
      'Zero',
      'One',
      'Their magnitudes',
      'A negative number',
    ], 0, 'cos(90°) = 0, so the dot product vanishes.'),
    Q('The "duality" idea says a dot product with v is also...', [
      'A cross product',
      'A linear transformation from vectors to numbers',
      'A scalar multiplication',
      'A determinant',
    ], 1, 'Dotting with v is a linear map ℝⁿ → ℝ — and every such map can be written this way.'),
  ],
  10: [
    Q('The result of a × b in 3D is...', [
      'A scalar',
      'A vector perpendicular to both a and b',
      'A matrix',
      'A complex number',
    ], 1, 'Cross products produce perpendicular vectors.'),
    Q('|a × b| equals...', [
      'a · b',
      'The area of the parallelogram spanned by a and b',
      '|a| + |b|',
      '|a| · |b|',
    ], 1, 'The magnitude of the cross product is the parallelogram area.'),
    Q('The direction of a × b is decided by...', [
      'Alphabetical order',
      'The right-hand rule',
      'Whichever is longer',
      'The dot product\'s sign',
    ], 1, 'Right-hand rule fixes the perpendicular direction\'s sign.'),
  ],
  11: [
    Q('The "linear transformation" view of a × b builds it from...', [
      'A function that takes a vector v and returns det([v, a, b])',
      'The matrix product ab',
      'The angle between a and b',
      'A rotation matrix',
    ], 0, 'Cross product is dual to a specific linear map to ℝ.'),
    Q('This view explains why the cross-product formula involves...', [
      'Square roots',
      'A 3×3 determinant',
      'Eigenvalues',
      'Polar coordinates',
    ], 1, 'The duality view shows the determinant where it comes from naturally.'),
    Q('This perspective also emphasizes that cross products...', [
      'Generalise easily to all dimensions',
      'Are a special trick that lives in 3D',
      'Are the same as dot products',
      'Are always commutative',
    ], 1, 'Cross product is fundamentally a 3D phenomenon.'),
  ],
  12: [
    Q('Cramer\'s rule solves Ax = b using...', [
      'Eigenvectors',
      'Determinants',
      'Newton\'s method',
      'Matrix inversion by row reduction',
    ], 1, 'Each component of x is a ratio of determinants.'),
    Q('In practice, Cramer\'s rule is mostly valued as...', [
      'The fastest way to solve large systems',
      'A conceptual / geometric explanation rather than a fast algorithm',
      'The basis for gradient descent',
      'A trick for nonlinear systems',
    ], 1, 'For computation, elimination is much faster — Cramer is for intuition.'),
    Q('Geometrically, the components of the solution are...', [
      'Random projections',
      'Ratios of signed areas (or volumes)',
      'Angles between rows',
      'Eigenvalues of A',
    ], 1, 'Each xᵢ is a signed-area ratio in the geometric picture.'),
  ],
  13: [
    Q('Changing basis is useful because...', [
      'It makes vectors shorter',
      'Some problems become much simpler in another coordinate system',
      'Computers can\'t handle the standard basis',
      'It removes negative numbers',
    ], 1, 'Picking a basis adapted to the problem can make it almost trivial.'),
    Q('The change-of-basis matrix from a new basis B to the standard basis has...', [
      'B\'s new basis vectors (in standard coords) as columns',
      'Only zeros and ones',
      'The eigenvalues on the diagonal',
      'The same columns as the identity',
    ], 0, 'Its columns say "this is where B\'s basis vectors live in standard coords".'),
    Q('To express a transformation M in a new basis B, you compute...', [
      'BᵀMB',
      'B⁻¹MB',
      'M + B',
      'det(M) · B',
    ], 1, 'Conjugation by B converts the transformation into the new coordinate system.'),
  ],
  14: [
    Q('An eigenvector of a transformation is one that...', [
      'Has unit length',
      'Stays on its own span — the transformation just scales it',
      'Has only positive entries',
      'Is the longest vector in the space',
    ], 1, 'The hallmark of an eigenvector is "direction unchanged".'),
    Q('The eigenvalue is...', [
      'The angle the vector rotates',
      'The factor by which an eigenvector is stretched (or flipped)',
      'A measurement of error',
      'The magnitude of the determinant',
    ], 1, 'Eigenvalue = the scaling factor for its eigenvector.'),
    Q('Why are eigenvectors useful in ML and beyond?', [
      'They\'re the only vectors that exist',
      'They reveal directions invariant under the transformation — used in PCA, stability, etc.',
      'They simplify dot products',
      'They guarantee a model converges',
    ], 1, 'PCA, spectral methods, and stability analysis all lean on eigenvectors.'),
  ],
  15: [
    Q('A "vector space" abstractly requires...', [
      'Only finitely many elements',
      'Closure under addition and scalar multiplication, plus the standard axioms',
      'A geometric picture in 2D or 3D',
      'A determinant defined on it',
    ], 1, 'The definition is structural — anything obeying the axioms qualifies.'),
    Q('Is the set of polynomials a vector space?', [
      'No — they\'re not vectors',
      'Yes, with polynomial addition and scalar multiplication',
      'Only constants are',
      'Only if you fix a basis first',
    ], 1, 'Polynomials add and scale just like vectors do.'),
    Q('Why does the abstract definition matter?', [
      'It removes the need for geometry',
      'It lets all of linear algebra apply far beyond ℝⁿ',
      'It simplifies matrix arithmetic',
      'It is required for the determinant to exist',
    ], 1, 'Abstraction lets functions, polynomials, signals, etc. all use LA tools.'),
  ],
};

export const CA_QUIZ: Record<number, QuizQuestion[]> = {
  1: [
    Q('Calculus is, broadly, the math of...', [
      'Counting discrete things',
      'Smooth, continuous change',
      'Solving polynomials',
      'Geometry of triangles',
    ], 1, 'Calculus studies how quantities change continuously.'),
    Q('The two complementary pillars of calculus are...', [
      'Addition and multiplication',
      'Derivatives and integrals',
      'Limits and infinity',
      'Functions and equations',
    ], 1, 'Derivation and integration are inverse operations.'),
    Q('Why "reinvent" the formulas instead of memorising them?', [
      'The formulas are wrong',
      'Origin stories make the rules feel inevitable, not arbitrary',
      'Reinvention saves time on exams',
      'Formulas change every year',
    ], 1, 'Understanding where a rule comes from makes it stickable and adaptable.'),
  ],
  2: [
    Q('What is the apparent paradox of the derivative?', [
      'Slopes need two points, but a derivative is the slope "at one instant"',
      'Derivatives don\'t exist for continuous functions',
      'The derivative is always zero',
      'Only polynomials have derivatives',
    ], 0, 'You need two points for a slope — but a derivative is about one instant.'),
    Q('The resolution is to take...', [
      'The average value',
      'The limit as the two points get arbitrarily close',
      'Just the right-hand value',
      'A complex-valued perturbation',
    ], 1, 'The derivative is a limit of slopes between nearby points.'),
    Q('The derivative of position with respect to time is...', [
      'Mass',
      'Velocity',
      'Acceleration',
      'Force',
    ], 1, 'Velocity = how position changes per unit time.'),
  ],
  3: [
    Q('Why is d/dx[x²] = 2x, geometrically?', [
      '2 is the leading coefficient',
      'Growing a square of side x by dx adds two thin strips of area x·dx',
      'Squaring always doubles values',
      'It is a memorised rule with no picture',
    ], 1, 'Two new strips of area x·dx each → derivative 2x.'),
    Q('d/dx[sin(x)] = cos(x) means...', [
      'Sin and cos are equal',
      'The rate of change of sin at x equals cos at x',
      'Cos is always positive',
      'Sin and cos are inverses',
    ], 1, 'cos(x) is exactly how fast sin(x) is changing at x.'),
    Q('Why does the power rule drop the exponent by one?', [
      'Convention',
      'An n-dimensional cube has n faces, each of area xⁿ⁻¹',
      'Integers lose 1 when differentiated',
      'Because of e',
    ], 1, 'The n thin "shells" each have area xⁿ⁻¹, giving nxⁿ⁻¹.'),
  ],
  4: [
    Q('The chain rule, intuitively, says...', [
      'Always add the derivatives',
      'Multiply the rates: outer\'(inner) · inner\'(x)',
      'Take the average of the derivatives',
      'Subtract the inner derivative from the outer',
    ], 1, 'Composed functions multiply their rates of change.'),
    Q('The product rule (fg)\' is...', [
      'f\'g\'',
      'f\'g + fg\'',
      '(f + g)\'',
      'f/g',
    ], 1, 'Both pieces vary — sum the two contributions.'),
    Q('Backpropagation in neural nets is fundamentally an application of...', [
      'The chain rule',
      'L\'Hopital\'s rule',
      'The product rule alone',
      'The fundamental theorem of calculus',
    ], 0, 'Backprop chains derivatives through layers.'),
  ],
  5: [
    Q('Why is e (≈ 2.718) special in calculus?', [
      'It is the smallest prime',
      'd/dx[eˣ] = eˣ',
      'It is an integer',
      'It equals π/2',
    ], 1, 'eˣ is its own derivative — the unique exponential with that property.'),
    Q('Continuously compounding at 100% rate for 1 unit of time gives...', [
      '2',
      'e',
      'π',
      '1',
    ], 1, 'The limit of (1 + 1/n)ⁿ as n → ∞ is e.'),
    Q('ln(x) is...', [
      'sin(x) inverted',
      'The inverse function of eˣ',
      'The square root of e',
      'A polynomial',
    ], 1, 'ln "undoes" eˣ — it is the natural log.'),
  ],
  6: [
    Q('Implicit differentiation lets you...', [
      'Differentiate only polynomials',
      'Differentiate equations not solved explicitly for y',
      'Skip the chain rule',
      'Compute integrals',
    ], 1, 'When y is tangled in an equation, treat it as a function and apply the chain rule.'),
    Q('When differentiating an equation containing y, treat y as...', [
      'A constant',
      'A function of x and apply the chain rule',
      'Zero',
      'A complex number',
    ], 1, 'dy/dx is what you\'re solving for.'),
    Q('It is most useful when...', [
      'y is already isolated',
      'Solving for y explicitly is hard or impossible',
      'There are no derivatives involved',
      'You only need a numerical answer',
    ], 1, 'Implicit equations are common — circles, ellipses, level sets.'),
  ],
  7: [
    Q('A limit captures...', [
      'Where a function is undefined',
      'The value a function approaches near a point',
      'The function\'s largest output',
      'Only an integer-valued result',
    ], 1, 'Limits formalise "what value does f get arbitrarily close to?".'),
    Q('L\'Hopital\'s rule applies to indeterminate forms like...', [
      '0/0 or ∞/∞',
      'Only 1/0',
      'Only when the function is a polynomial',
      'Negative numbers only',
    ], 0, 'When direct substitution gives 0/0 or ∞/∞, differentiate top and bottom.'),
    Q('Epsilon-delta is...', [
      'A clever shortcut',
      'A formal definition of "as close as we want"',
      'A way to avoid limits',
      'A method only for integrals',
    ], 1, 'It nails down what "close" means rigorously.'),
  ],
  8: [
    Q('An integral represents...', [
      'A slope',
      'Area under a curve (or accumulated change)',
      'The maximum of a function',
      'A discrete sum only',
    ], 1, 'Integration accumulates infinitesimal pieces.'),
    Q('The Fundamental Theorem of Calculus says differentiation and integration are...', [
      'Unrelated',
      'Inverse operations',
      'Both equal to multiplication',
      'The same operation',
    ], 1, 'FTC ties accumulation and rate-of-change together.'),
    Q('An antiderivative of f is...', [
      'A function whose derivative is f',
      'The derivative of f',
      'f squared',
      'The integral of f \'',
    ], 0, 'Antiderivative = function with derivative f.'),
  ],
  9: [
    Q('The "slope of the antiderivative graph" equals...', [
      'The antiderivative itself',
      'The original function\'s value',
      'Zero',
      'Twice the function',
    ], 1, 'If F\' = f, then slope of F at x is f(x).'),
    Q('Area under f from a to b equals...', [
      'F(a) − F(b)',
      'F(b) − F(a), where F is an antiderivative of f',
      'b − a',
      'f(b) − f(a)',
    ], 1, 'FTC: definite integral = antiderivative difference.'),
    Q('The big takeaway from "area meets slope" is...', [
      'They are unrelated operations',
      'Accumulation and rate of change are two sides of the same coin',
      'Only continuous functions can be integrated',
      'You should always integrate before differentiating',
    ], 1, 'FTC unifies the two pillars.'),
  ],
  10: [
    Q('The second derivative f \'\'(x) measures...', [
      'The function\'s area',
      'The rate of change of the rate of change (concavity / acceleration)',
      'The function\'s value',
      'The original slope',
    ], 1, 'Second derivative = how the slope itself is changing.'),
    Q('If f \'\'(x) > 0, then f is locally...', [
      'Concave down',
      'Concave up',
      'Linear',
      'Constant',
    ], 1, 'Positive second derivative means the curve bends upward.'),
    Q('In physics, the second derivative of position is...', [
      'Mass',
      'Velocity',
      'Acceleration',
      'Force',
    ], 2, 'Acceleration = rate of change of velocity = second derivative of position.'),
  ],
  11: [
    Q('A Taylor series approximates a function by...', [
      'A polynomial built from its derivatives at a single point',
      'A Fourier sum of sines',
      'A geometric series',
      'A random sample',
    ], 0, 'Taylor matches value, slope, curvature, etc. at one point.'),
    Q('The first-order Taylor approximation is...', [
      'The tangent line at the point',
      'The function itself',
      'The second derivative',
      'A constant',
    ], 0, 'First order = linear approximation = tangent.'),
    Q('Why do Taylor series matter in optimisation?', [
      'They prove uniqueness of optima',
      'Many methods rely on local quadratic approximations',
      'They eliminate the need for derivatives',
      'They give exact answers always',
    ], 1, 'Newton\'s method, quasi-Newton, etc. all use Taylor approximations.'),
  ],
  12: [
    Q('The main meta-message of this video is about...', [
      'A specific theorem',
      'The right mindset for learning math — questioning definitions',
      'Memorising more identities',
      'Choosing a textbook',
    ], 1, 'It is a closing reflection on how to learn deeply.'),
    Q('The "define then deduce" style is critiqued because it...', [
      'Hides the motivation behind the definitions',
      'Is mathematically incorrect',
      'Takes too long',
      'Skips the proofs',
    ], 0, 'Good math teaching shows why a definition is the right one.'),
    Q('A productive question when seeing a new definition is...', [
      '"How do I memorise this?"',
      '"Why this definition and not another?"',
      '"What grade is this for?"',
      '"Will it be on the test?"',
    ], 1, 'Asking "why this" leads to deeper understanding.'),
  ],
};

export const KHAN_QUIZ: Record<number, QuizQuestion[]> = {
  0: [
    Q('Which of the following is a categorical variable?', [
      'Height in cm',
      'Eye color',
      'Number of children',
      'Temperature',
    ], 1, 'Categorical = named groups, not numeric magnitudes.'),
    Q('A two-way table displays...', [
      'One variable over time',
      'Joint counts of two categorical variables',
      'A single continuous variable',
      'Cumulative percentages only',
    ], 1, 'Two-way tables show the joint distribution.'),
    Q('A marginal distribution in a two-way table is...', [
      'The smallest count',
      'The diagonal entries',
      'The row or column totals — one variable on its own',
      'Data outside the table',
    ], 2, 'Marginals collapse the table to one variable.'),
  ],
  1: [
    Q('A histogram is best for showing...', [
      'Two categorical variables',
      'How a numeric variable\'s values are distributed across bins',
      'A scatter relationship',
      'A correlation matrix',
    ], 1, 'Histograms show distribution shape.'),
    Q('A box plot summarises...', [
      'The full data point-by-point',
      'Median, quartiles, and range',
      'The mean and standard deviation',
      'Only categorical counts',
    ], 1, 'Box plots compress a distribution into a five-number summary.'),
    Q('A "right-skewed" distribution has...', [
      'A long tail on the right',
      'A long tail on the left',
      'No tail',
      'Two equal tails',
    ], 0, 'Right-skewed = long tail extending to the right.'),
  ],
  2: [
    Q('Which summary statistic is most sensitive to outliers?', [
      'The median',
      'The mean',
      'The mode',
      'The range of the middle 50%',
    ], 1, 'Means get pulled by extreme values; medians don\'t.'),
    Q('The median of a sorted dataset is...', [
      'The most common value',
      'The middle value (or average of the two middle values)',
      'The largest value',
      'The mean',
    ], 1, 'Median splits the data in half.'),
    Q('Variance measures...', [
      'The center of the data',
      'The average squared deviation from the mean',
      'The number of unique values',
      'How many bins to use',
    ], 1, 'Variance = mean of squared deviations.'),
  ],
  3: [
    Q('Probability values always lie in...', [
      '[0, 1]',
      '[−1, 1]',
      '(−∞, ∞)',
      '{0, 1} only',
    ], 0, 'Probabilities range from 0 (impossible) to 1 (certain).'),
    Q('For independent events A and B, P(A ∩ B) equals...', [
      'P(A) + P(B)',
      'P(A) · P(B)',
      'P(A) − P(B)',
      'P(A) / P(B)',
    ], 1, 'Independence ⇔ joint probability factors.'),
    Q('P(A | B) reads as...', [
      'Probability that A and B occur together',
      'Probability of A given B has occurred',
      'Probability of A or B',
      'Probability of A times B',
    ], 1, 'Conditional probability = "given that".'),
  ],
};

export const PANDAS_QUIZ: Record<number, QuizQuestion[]> = {
  1: [
    Q('pd.read_csv("file.csv") returns a...', [
      'NumPy array',
      'DataFrame',
      'Dictionary',
      'List of tuples',
    ], 1, 'CSV reads into a DataFrame by default.'),
    Q('A pandas Series is...', [
      'A 2D table',
      'A single column of data with an index',
      'A dictionary',
      'A SQL query',
    ], 1, 'Series = 1D labelled array; DataFrames are made of Series.'),
    Q('df.to_csv("out.csv") does what?', [
      'Reads a CSV',
      'Writes the DataFrame to a CSV file',
      'Validates the CSV format',
      'Prints to stdout only',
    ], 1, 'to_csv writes; read_csv reads.'),
  ],
  2: [
    Q('df.loc[5] selects...', [
      'The row at integer position 5',
      'The row with label 5',
      'The fifth column',
      'A random row',
    ], 1, 'loc is label-based.'),
    Q('df.iloc[5] selects...', [
      'The row with label 5',
      'The row at integer position 5',
      'The fifth column',
      'A boolean mask',
    ], 1, 'iloc is position-based.'),
    Q('To filter rows where the "age" column is above 30, you write...', [
      'df.filter("age > 30")',
      'df[df["age"] > 30]',
      'df.where(age=30)',
      'df.query[age, 30]',
    ], 1, 'Boolean indexing is the idiomatic pandas filter.'),
  ],
  3: [
    Q('df.describe() gives you...', [
      'Only the column names',
      'Summary statistics (count, mean, std, min, max, quartiles) for numeric columns',
      'A heatmap',
      'The data types only',
    ], 1, 'describe() is the quick-look statistical summary.'),
    Q('series.map(fn) applies fn...', [
      'To each element of the Series',
      'To the whole Series at once',
      'To the index only',
      'In place, modifying the data',
    ], 0, 'map maps element-wise; apply works similarly on DataFrames.'),
    Q('df.apply(fn, axis=1) applies fn...', [
      'To each column',
      'To each row',
      'To each cell',
      'Only to the index',
    ], 1, 'axis=1 → rows; axis=0 (default) → columns.'),
  ],
  4: [
    Q('df.groupby("col") returns a...', [
      'New DataFrame',
      'GroupBy object you can aggregate (.mean(), .sum(), etc.)',
      'List of column names',
      'NumPy array',
    ], 1, 'GroupBy is lazy — you chain an aggregation onto it.'),
    Q('To compute multiple stats per group, you use...', [
      '.describe() only',
      '.agg([...]) on the GroupBy',
      '.merge()',
      '.concat()',
    ], 1, 'agg lets you supply a list of functions per group.'),
    Q('df.sort_values("col") returns...', [
      'The same DataFrame, sorted in place',
      'A new DataFrame sorted by "col"',
      'A Series of sorted indices',
      'A NumPy array of values',
    ], 1, 'By default it returns a new sorted DataFrame.'),
  ],
  5: [
    Q('In pandas, NaN typically represents...', [
      'A negative number',
      'A missing value',
      'A SQL error',
      'A category label',
    ], 1, 'NaN is the pandas "missing" marker.'),
    Q('df.dropna() does what?', [
      'Fills NaN with zeros',
      'Removes rows (or columns) containing NaN',
      'Counts the NaNs',
      'Renames missing values to "NaN"',
    ], 1, 'Drops missing entries (defaults to rows).'),
    Q('df.fillna(0) does what?', [
      'Removes NaNs',
      'Replaces NaNs with 0',
      'Marks zeros as missing',
      'Casts the column to int',
    ], 1, 'Fills missing values with the supplied value.'),
  ],
  6: [
    Q('df.rename(columns={"a": "b"}) does what?', [
      'Renames the column "a" to "b"',
      'Renames every column to "b"',
      'Adds a new column called "b"',
      'Drops column "a"',
    ], 0, 'rename remaps labels; doesn\'t touch the data.'),
    Q('pd.concat([df1, df2]) by default...', [
      'Joins them on a key',
      'Stacks them vertically (row-wise)',
      'Replaces df1 with df2',
      'Computes the difference',
    ], 1, 'axis=0 default stacks rows; axis=1 stacks columns.'),
    Q('df.merge(other, on="key") performs...', [
      'A SQL-style join on the "key" column',
      'A row-wise concat',
      'A groupby',
      'A pivot',
    ], 0, 'merge is pandas\' join.'),
  ],
};

export const INTROML_QUIZ: Record<number, QuizQuestion[]> = {
  1: [
    Q('A decision tree makes predictions by...', [
      'Solving an equation',
      'Asking a sequence of yes/no questions about features',
      'Drawing a regression line',
      'Looking up the answer in a table',
    ], 1, 'Trees split data via comparisons at each node.'),
    Q('"Fitting" a model means...', [
      'Buying a new model',
      'Adjusting its parameters so it matches the training data',
      'Removing missing values',
      'Plotting the data',
    ], 1, 'Fitting = learning parameters from data.'),
    Q('Simple models often work well because...', [
      'They are guaranteed to be correct',
      'They are easier to fit and less likely to overfit',
      'They never make errors',
      'They use no features',
    ], 1, 'Simplicity helps generalisation when data is limited.'),
  ],
  2: [
    Q('df.describe() is useful in exploration because it...', [
      'Returns a model',
      'Gives quick summary stats for every numeric column',
      'Drops outliers',
      'Trains a regression',
    ], 1, 'It\'s the fastest first-look at numeric columns.'),
    Q('df.shape returns...', [
      'A tuple of (rows, columns)',
      'A list of column names',
      'The memory usage',
      'A correlation matrix',
    ], 0, 'shape tells you the size of the table.'),
    Q('Before modelling, exploration helps you...', [
      'Skip data cleaning',
      'Understand structure, distributions, and data quality',
      'Pick the loss function',
      'Choose a Python version',
    ], 1, 'You can\'t model what you don\'t understand.'),
  ],
  3: [
    Q('The "target" in supervised learning is...', [
      'A hyperparameter',
      'The variable you\'re trying to predict',
      'A loss function',
      'A random feature',
    ], 1, 'Target = label / response variable.'),
    Q('"Features" are...', [
      'The model\'s parameters',
      'Input variables used to make predictions',
      'The loss values',
      'The output predictions',
    ], 1, 'Features = X; target = y.'),
    Q('The typical scikit-learn workflow is...', [
      'Predict, then fit',
      'Import → fit(X, y) → predict(X)',
      'Train a tree by hand',
      'Use only NumPy',
    ], 1, 'fit/predict is the standard sklearn API.'),
  ],
  4: [
    Q('Mean Absolute Error (MAE) is...', [
      'The maximum prediction error',
      'The average absolute difference between predicted and actual values',
      'The squared error',
      'A classification metric',
    ], 1, 'MAE = mean of |y_pred − y_true|.'),
    Q('Why not measure error on training data?', [
      'It always equals zero',
      'It\'s optimistically biased — the model has seen the data',
      'It\'s too slow to compute',
      'You can\'t — pandas doesn\'t support it',
    ], 1, 'Training error overestimates how well the model generalises.'),
    Q('train_test_split is used to...', [
      'Hold out a validation set the model doesn\'t see during training',
      'Increase training data',
      'Remove outliers',
      'Pick the best hyperparameters automatically',
    ], 0, 'Splitting gives an honest performance estimate.'),
  ],
  5: [
    Q('Overfitting means a model...', [
      'Generalises perfectly to new data',
      'Memorises training data but performs poorly on new data',
      'Has no parameters',
      'Has been trained too quickly',
    ], 1, 'Overfit models fit noise, not signal.'),
    Q('Underfitting means a model...', [
      'Is too complex',
      'Is too simple to capture the underlying pattern',
      'Has converged',
      'Has zero error',
    ], 1, 'Underfit = high bias, missed pattern.'),
    Q('Increasing a tree\'s max depth tends to...', [
      'Reduce underfitting but risk overfitting',
      'Always improve test performance',
      'Always reduce training error to zero',
      'Have no effect',
    ], 0, 'Deeper trees fit more — too deep, and they overfit.'),
  ],
  6: [
    Q('A random forest is...', [
      'A single deep decision tree',
      'An ensemble of many decision trees',
      'A neural network',
      'A linear model',
    ], 1, 'Forest = many trees, predictions averaged.'),
    Q('Random forests reduce overfitting by...', [
      'Using one perfect tree',
      'Averaging across many trees trained with randomness',
      'Forbidding splits',
      'Pruning each tree heavily',
    ], 1, 'Bagging + feature subsampling kills overfitting.'),
    Q('Compared to a single decision tree, a random forest is...', [
      'Less accurate',
      'Usually more accurate and more robust',
      'Always faster to train',
      'Smaller in memory',
    ], 1, 'You trade speed for accuracy and stability.'),
  ],
  7: [
    Q('A typical Kaggle submission contains...', [
      'Source code only',
      'Your predictions on a test set',
      'Your training data',
      'A copy of the model file',
    ], 1, 'Submissions are predictions evaluated against the hidden ground truth.'),
    Q('The "public leaderboard" is computed on...', [
      'The full test set',
      'A subset of the test set; the rest is hidden for the private leaderboard',
      'The training set',
      'A random sample of the train set',
    ], 1, 'This is why people sometimes overfit to the public leaderboard.'),
    Q('Competitions are useful because they...', [
      'Pay every entrant',
      'Provide fast, clear feedback with a well-defined metric',
      'Always reflect real-world ML problems',
      'Require no coding',
    ], 1, 'Tight feedback loops accelerate learning.'),
  ],
};

export const DATAVIZ_QUIZ: Record<number, QuizQuestion[]> = {
  1: [
    Q('Seaborn is built on top of...', [
      'matplotlib',
      'plotly',
      'd3.js',
      'NumPy directly',
    ], 0, 'Seaborn wraps matplotlib with nicer defaults.'),
    Q('A typical seaborn call returns...', [
      'A NumPy array',
      'A matplotlib Axes (or Figure-level) object',
      'A pandas Series',
      'A JSON spec',
    ], 1, 'You can still tweak the underlying matplotlib object.'),
    Q('Compared to raw matplotlib, seaborn is...', [
      'Lower-level and more flexible',
      'More opinionated with better defaults for statistical plots',
      'Slower for every plot',
      'Incompatible with matplotlib',
    ], 1, 'Seaborn = "fewer knobs, better-looking output".'),
  ],
  2: [
    Q('Line charts are best for...', [
      'Comparing discrete categories',
      'Showing how a value changes across an ordered variable (often time)',
      'Showing the joint distribution of two variables',
      'Counting categories',
    ], 1, 'Lines connect ordered points — great for trends.'),
    Q('sns.lineplot(x=..., y=...) draws...', [
      'A scatter of points only',
      'Points connected by a line',
      'A histogram',
      'A heatmap',
    ], 1, 'lineplot connects (x, y) pairs.'),
    Q('To plot multiple lines on one chart by category, use...', [
      'Different colours via the hue= parameter',
      'Separate plots only',
      'Bars instead',
      'A pie chart',
    ], 0, 'hue maps a categorical column to colour.'),
  ],
  3: [
    Q('Bar charts are best for comparing...', [
      'Two continuous variables',
      'Quantities across discrete categories',
      'A time series',
      'Probability distributions',
    ], 1, 'Bars = category-vs-value comparisons.'),
    Q('Heatmaps are useful for visualising...', [
      'A correlation matrix or grid of values',
      'A single category count',
      'One continuous variable\'s distribution',
      'A scatter pattern',
    ], 0, 'Heatmaps colour-encode each cell of a matrix.'),
    Q('On a heatmap, the colour legend tells you...', [
      'The mapping from colour to numeric value',
      'Which row is most important',
      'The chart title',
      'The plot type',
    ], 0, 'Without the legend, you can\'t decode the colours.'),
  ],
  4: [
    Q('Scatter plots show...', [
      'The distribution of one variable',
      'The relationship between two numeric variables',
      'Time-series trends only',
      'Category counts',
    ], 1, 'Each point is one (x, y) observation.'),
    Q('A regression line overlaid on a scatter plot shows...', [
      'A confidence interval only',
      'The fitted linear trend through the points',
      'The mean of x',
      'The median y',
    ], 1, 'Regression lines summarise the trend.'),
    Q('On a scatter, the hue parameter encodes...', [
      'The x value',
      'A third variable as colour',
      'Point size',
      'The legend title',
    ], 1, 'hue lets a third variable show up as colour.'),
  ],
  5: [
    Q('A histogram shows...', [
      'Two variables\' relationship',
      'How values of a numeric variable are distributed across bins',
      'A category\'s count over time',
      'A scatter',
    ], 1, 'Bin counts → distribution shape.'),
    Q('A KDE plot is...', [
      'A discrete bar chart',
      'A smooth estimate of a distribution',
      'A category count',
      'A box plot',
    ], 1, 'KDE = kernel density estimate, smoother than a histogram.'),
    Q('Looking at a distribution, you can spot...', [
      'Skew, outliers, and modality',
      'Categorical relationships',
      'Time trends only',
      'Causal direction',
    ], 0, 'Shape tells you a lot at a glance.'),
  ],
  6: [
    Q('For two numeric variables, the natural starting plot is...', [
      'A pie chart',
      'A scatter plot',
      'A bar chart',
      'A heatmap',
    ], 1, 'Scatter is the default for numeric-vs-numeric.'),
    Q('For a single numeric variable\'s distribution, the natural choice is...', [
      'A histogram or KDE',
      'A scatter plot',
      'A line plot',
      'A heatmap',
    ], 0, 'Histograms / KDEs visualise distributions.'),
    Q('For counts across a single categorical variable, you would use...', [
      'A scatter',
      'A bar chart',
      'A line plot',
      'A KDE',
    ], 1, 'Bars are the standard for categorical counts.'),
  ],
  7: [
    Q('A small data-viz project should ultimately...', [
      'Look pretty regardless of message',
      'Answer a question with data',
      'Use every chart type available',
      'Avoid labels for cleanliness',
    ], 1, 'The point is communication, not decoration.'),
    Q('Choosing the right chart depends on...', [
      'The question being asked and the variable types',
      'Whichever is trendy',
      'The number of colours available',
      'How fast it renders',
    ], 0, 'Chart choice = "what am I trying to show, with what kinds of data?".'),
    Q('Why are labels and titles so important?', [
      'They make the plot easier to interpret on its own',
      'They are required by Python',
      'They speed up rendering',
      'They are only useful for legal reasons',
    ], 0, 'A good plot tells its own story.'),
  ],
};

export const PROJECT_QUIZ: QuizQuestion[] = [
  Q('A good first step for an analysis project is...', [
    'Pick the model first',
    'Frame a specific question you want to answer',
    'Choose a colour palette',
    'Train a neural network',
  ], 1, 'A clear question shapes everything downstream.'),
  Q('"Cleaning" a dataset typically involves...', [
    'Renaming the file',
    'Handling missing values, fixing types, removing duplicates',
    'Throwing away half the rows',
    'Switching to a different language',
  ], 1, 'Cleaning is unglamorous but most of the real work.'),
  Q('Good visualisations should...', [
    'Decorate the notebook',
    'Make the answer easier to see, with clear labels',
    'Use as many colours as possible',
    'Be removed before sharing',
  ], 1, 'Plots are arguments — they should make the point clearly.'),
];

export const NG_QUIZ: Record<string, QuizQuestion[]> = {
  'ng-c1w1-lectures': [
    Q('What distinguishes supervised learning from unsupervised learning?', [
      'Supervised uses neural networks; unsupervised uses trees',
      'Supervised uses labelled training examples (x, y); unsupervised has only x',
      'Supervised is always classification',
      'Unsupervised needs more data',
    ], 1, 'Labels are the defining feature of supervised learning.'),
    Q('The cost function J(w, b) for linear regression measures...', [
      'The number of features',
      'The average squared error between predictions and labels',
      'The training time',
      'The number of training examples',
    ], 1, 'MSE-style cost: ½ · mean((ŷ − y)²).'),
    Q('Gradient descent updates parameters by...', [
      'Adding a random number',
      'Subtracting a small step in the direction of the gradient',
      'Moving toward the largest data point',
      'Picking the median value',
    ], 1, 'w := w − α · ∂J/∂w — step downhill.'),
  ],
  'ng-c1w1-lab': [
    Q('If the learning rate α is too large, gradient descent will likely...', [
      'Converge instantly',
      'Diverge or oscillate — the cost goes up or bounces around',
      'Stop updating',
      'Find a perfect minimum',
    ], 1, 'Too-large steps overshoot the minimum.'),
    Q('If α is too small, gradient descent will...', [
      'Converge very slowly',
      'Diverge',
      'Reject the input',
      'Always give the wrong answer',
    ], 0, 'Tiny steps eventually get there, but slowly.'),
    Q('A good sanity check during training is that...', [
      'The model has lots of parameters',
      'The cost decreases over iterations',
      'The data is shuffled every step',
      'The features are all integers',
    ], 1, 'A learning curve that goes down means optimisation is working.'),
  ],
  'ng-c1w1-notes': [
    Q('Writing a 1-page summary from memory helps you...', [
      'Avoid having to study at all',
      'See where your understanding actually has gaps',
      'Skip the lecture',
      'Remove the need for practice problems',
    ], 1, 'Writing-as-recall surfaces what you don\'t know.'),
    Q('Spaced repetition spaces reviews over...', [
      'Random intervals',
      'Gradually increasing intervals',
      'A single short session',
      'Only the first week',
    ], 1, 'Increasing spacing is the principle behind SRS tools like Anki.'),
    Q('The best time to take notes is...', [
      'During the video, transcribing it verbatim',
      'After the video, in your own words',
      'Never — notes are unnecessary',
      'Only right before an exam',
    ], 1, 'Active recall + paraphrasing beats verbatim transcription.'),
  ],
  'ng-c1w2-lectures': [
    Q('Why is vectorisation with NumPy faster than a Python for-loop?', [
      'It uses GPUs always',
      'Operations run as optimised array math in C, not interpreted Python',
      'It uses less memory always',
      'It skips error checks',
    ], 1, 'Vectorisation avoids per-element Python overhead.'),
    Q('Feature scaling helps gradient descent because...', [
      'It removes the need for a learning rate',
      'It makes the cost surface more spherical, so GD descends faster',
      'It eliminates overfitting',
      'It guarantees convergence',
    ], 1, 'Unscaled features create elongated cost contours and slow zig-zag descent.'),
    Q('For multiple linear regression with weights w and bias b, the prediction is...', [
      'b alone',
      'w · x + b (dot product plus bias)',
      'w / x + b',
      '|w − x|',
    ], 1, 'A linear model: weighted sum of features plus bias.'),
  ],
  'ng-c1w2-lab': [
    Q('A learning curve typically plots...', [
      'Predictions vs labels',
      'Cost vs iteration (or epoch)',
      'Features vs time',
      'Training size vs accuracy only',
    ], 1, 'Cost-over-iterations is the diagnostic for gradient descent.'),
    Q('After applying feature scaling, you usually observe...', [
      'No change',
      'Faster convergence',
      'Higher error',
      'A divergent cost',
    ], 1, 'Scaling shrinks the number of iterations needed.'),
    Q('numpy.dot(w, x) computes...', [
      'The cross product',
      'The dot product of two vectors',
      'A matrix inverse',
      'A determinant',
    ], 1, 'np.dot returns the dot product for 1D arrays.'),
  ],
  'ng-c1w2-notes': [
    Q('Re-deriving a formula from memory tests whether you...', [
      'Can copy from a book quickly',
      'Actually understand it vs just memorised the symbols',
      'Have a good handwriting',
      'Have read the slides',
    ], 1, 'Re-derivation = understanding test.'),
    Q('A good 1-page weekly summary focuses on...', [
      'Every detail of every video',
      'Key ideas, why they matter, and the central formulas',
      'Only what was on the quiz',
      'A list of every slide title',
    ], 1, 'Compression forces prioritisation.'),
    Q('Comparing two related methods in writing helps you...', [
      'See their similarities and differences clearly',
      'Forget the older one',
      'Choose the prettier formula',
      'Avoid practice problems',
    ], 0, 'Compare-and-contrast is a powerful learning move.'),
  ],
  'ng-c1w3-lectures': [
    Q('Logistic regression outputs...', [
      'A continuous unbounded number',
      'A probability between 0 and 1 (via the sigmoid)',
      'A category label directly, no probability',
      'A cluster id',
    ], 1, 'Sigmoid σ(z) = 1 / (1 + e⁻ᶻ) gives a probability.'),
    Q('The decision boundary is...', [
      'The most likely class',
      'The set of inputs where the model predicts 0.5 (the "tipping point")',
      'The training error',
      'The largest feature value',
    ], 1, 'On one side of the boundary the model predicts class 1, on the other class 0.'),
    Q('L2 regularisation adds a term to the cost that...', [
      'Sets all weights to zero',
      'Penalises large parameter values (sum of squared weights)',
      'Increases overfitting',
      'Removes features automatically',
    ], 1, 'Regularisation keeps weights small to improve generalisation.'),
  ],
  'ng-c1w3-lab': [
    Q('Log loss is used for logistic regression because...', [
      'It is easier to type',
      'It makes the cost convex in the parameters, so GD converges to the global min',
      'It always gives zero error',
      'It is required by NumPy',
    ], 1, 'Squared error on a sigmoid is non-convex; log loss fixes that.'),
    Q('Choosing the regularisation strength λ involves a trade-off because...', [
      'Larger λ underfits; smaller λ overfits',
      'λ has no effect on the model',
      'λ controls the learning rate',
      'λ must always be 1',
    ], 0, 'Tune λ to balance bias and variance.'),
    Q('A "high-bias" model tends to...', [
      'Memorise training noise',
      'Underfit — be too simple to capture the pattern',
      'Always reach zero error',
      'Have no parameters',
    ], 1, 'High bias = underfitting; high variance = overfitting.'),
  ],
  'ng-c1w3-notes': [
    Q('Linear and logistic regression share...', [
      'The same model function',
      'Gradient descent as the optimiser and a similar framework',
      'The same output type',
      'The same loss',
    ], 1, 'Both fit parameters by gradient descent on a (different) cost.'),
    Q('They differ in...', [
      'Whether they use Python',
      'The model function (linear vs sigmoid) and the cost function (MSE vs log loss)',
      'Whether they need data',
      'Whether they use vectors',
    ], 1, 'Same skeleton, different parts.'),
    Q('A defining addition of logistic regression is...', [
      'A new training algorithm',
      'A sigmoid function that squashes outputs into [0, 1]',
      'Higher learning rates',
      'Bigger datasets',
    ], 1, 'Sigmoid turns a linear score into a probability.'),
  ],
  'ng-c1-wrapup': [
    Q('Course 1 covered, in one line...', [
      'Reinforcement learning',
      'Supervised learning: regression and classification',
      'Unsupervised learning only',
      'Deep neural network theory',
    ], 1, 'Title says it: regression and classification, both supervised.'),
    Q('The single biggest idea introduced was arguably...', [
      'Decision trees',
      'Gradient descent as a general optimisation tool',
      'Hyperparameter tuning',
      'Cross-validation',
    ], 1, 'Gradient descent powers nearly every model you\'ll meet later.'),
    Q('A solid way to consolidate the course is...', [
      'Re-watch every video twice',
      'Write a multi-page summary in your own words, with formulas re-derived',
      'Memorise the slide titles',
      'Move on without review',
    ], 1, 'Active synthesis is what makes it stick.'),
  ],
};
