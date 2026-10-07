// Respondent-level construct scores used ONLY for the Skill Variety ×
// Job Satisfaction scatterplot. Values are item SUMS (3 items each, 1–5 scale),
// so construct score = sum / 3. Anonymous: no branch, tenure, shift,
// free text or submission metadata is kept. Sorted to remove row order.
export const SV_JS_ITEM_SUMS: ReadonlyArray<readonly [sv: number, js: number]> = [
  [3, 4], [4, 6], [4, 8], [5, 6], [5, 8], [5, 9], [5, 11], [6, 6], [6, 6],
  [7, 7], [7, 9], [8, 6], [8, 7], [8, 7], [8, 10], [8, 13], [9, 6], [9, 11],
  [9, 13], [10, 8], [10, 8], [11, 9], [11, 12], [12, 12], [13, 11],
];

export const ITEMS_PER_CONSTRUCT = 3;
