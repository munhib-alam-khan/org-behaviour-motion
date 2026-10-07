// ─────────────────────────────────────────────────────────────
// LOCKED RESEARCH VALUES
// Every number shown on screen comes from this file.
// Verified against the raw survey workbook (see scripts/verify-data.ts).
// Do not edit without re-running `npm run verify`.
// ─────────────────────────────────────────────────────────────

export const STUDY = {
  institution: 'Karachi School of Business & Leadership',
  institutionShort: 'KSBL',
  course: 'Organizational Behaviour',
  term: 'Fall 2026',
  instructor: 'Dr. Faryal Razzaq',
  title: 'Redesigning the Checkout Cashier Role',
  subtitle: 'Using the Job Characteristics Model',
  context: 'Checkout cashiers · Imtiaz stores · Karachi',
  team: ['Munhib Alam Khan', 'Abdullah Khan', 'Rabie Sami', 'Karan Kumar'],
  question:
    'How can the Job Characteristics Model be used to assess and redesign the checkout cashier role at Imtiaz stores in Karachi to improve employee motivation and job satisfaction?',
  reference:
    'Hackman, J. R., & Oldham, G. R. (1976). Motivation through the design of work: Test of a theory. Organizational Behavior and Human Performance, 16(2), 250–279.',
} as const;

export const SAMPLE = {
  n: 25,
  scale: { min: 1, max: 5 },
  method: [
    'Interviewer-administered',
    'Questions read aloud & explained',
    'Voluntary participation',
    'No names · no ID<span style="text-transform:none">s</span> · no phone numbers',
  ],
  limits: 'Small cross-sectional sample',
  where: 'Multiple Imtiaz branches · Karachi',
} as const;

export type Tier = 'strong' | 'moderate' | 'weak' | 'lowest';
export type DimKey = 'SV' | 'TI' | 'TS' | 'AU' | 'FB';

export interface Dimension {
  key: DimKey;
  name: string;
  mean: number;
  label: string; // exactly as displayed
  tier: Tier;
}

export const JCM: Record<DimKey, Dimension> = {
  TS: { key: 'TS', name: 'Task Significance', mean: 4.09, label: '4.09', tier: 'strong' },
  TI: { key: 'TI', name: 'Task Identity', mean: 4.04, label: '4.04', tier: 'strong' },
  FB: { key: 'FB', name: 'Feedback', mean: 3.4, label: '3.40', tier: 'moderate' },
  AU: { key: 'AU', name: 'Autonomy', mean: 2.84, label: '2.84', tier: 'weak' },
  SV: { key: 'SV', name: 'Skill Variety', mean: 2.55, label: '2.55', tier: 'lowest' },
};

/** Model order used when introducing the five characteristics. */
export const JCM_ORDER: DimKey[] = ['SV', 'TI', 'TS', 'AU', 'FB'];
/** Ranked high → low (used by the comparison chart). */
export const JCM_RANKED: DimKey[] = ['TS', 'TI', 'FB', 'AU', 'SV'];

export const OUTCOMES = {
  IWM: { name: 'Internal Work Motivation', mean: 3.46, label: '3.46' },
  JS: { name: 'Job Satisfaction', mean: 2.84, label: '2.84' },
} as const;

export const PREFERENCES = {
  authority: { name: 'Greater authority to resolve routine issues', short: 'Authority', mean: 4.32, label: '4.32' },
  ownership: { name: 'Greater responsibility & ownership', short: 'Ownership', mean: 4.16, label: '4.16' },
  feedback: { name: 'More regular performance feedback', short: 'Feedback', mean: 4.04, label: '4.04' },
  rotation: { name: 'Rotation into suitable responsibilities', short: 'Rotation', mean: 3.28, label: '3.28' },
} as const;

/** Exploratory multiple-response item ("select up to three" was not enforced). */
export const MULTI_RESPONSE = {
  learnSkills: { name: 'Opportunities to learn additional skills', count: 14 },
  ownership: { name: 'Greater responsibility & ownership', count: 14 },
  of: 25,
  caveat: 'Exploratory multiple-response item',
} as const;

/** Exploratory Pearson correlation. ASSOCIATION ONLY — never causal. */
export const CORRELATION = {
  x: 'Skill Variety',
  y: 'Job Satisfaction',
  r: 0.54,
  label: 'r ≈ .54',
  caveat: 'n = 25 · exploratory · cross-sectional',
} as const;

export const REDESIGN = {
  name: 'Enriched Checkout Cashier',
  components: [
    { n: '01', name: 'Structured Micro-Rotation', target: 'Skill Variety' },
    { n: '02', name: 'Controlled Decision Authority', target: 'Autonomy' },
    { n: '03', name: 'Checkout-Zone Ownership', target: 'Responsibility' },
    { n: '04', name: 'Structured Feedback', target: 'Feedback' },
  ],
  rotation: [
    'Queue coordination',
    'Basic price-verification coordination',
    'Checkout-area readiness checks',
    'Onboarding / shadow support',
    'Customer checkout guidance',
  ],
  supervisorRetains: [
    'Significant refunds',
    'Discretionary discounts',
    'Suspected fraud',
    'Security issues',
    'Major price disputes',
    'Unusual exceptions',
  ],
  ownership: [
    'Queue buildup',
    'Recurring POS / pricing issues',
    'Checkout-area readiness',
    'Customer concerns',
    'Handover communication',
  ],
  feedbackTopics: ['Accuracy', 'Customer Service', 'Reliability', 'Improvement', 'Recognition'],
} as const;

/** PROPOSED pilot — has NOT been conducted. No outcomes exist. */
export const PILOT = {
  weeks: 6,
  branches: 1,
  cashiers: '~10–12',
  employeeMeasures: ['Skill Variety', 'Autonomy', 'Feedback', 'Internal Work Motivation', 'Job Satisfaction'],
  safeguards: ['Transaction / error rate', 'Cash discrepancies', 'Routine escalations', 'Checkout complaints'],
  decisions: ['Scale', 'Modify', 'Stop'],
} as const;
