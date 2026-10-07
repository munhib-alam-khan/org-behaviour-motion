// Guards the locked numbers. Run: npm run verify
import { JCM, OUTCOMES, CORRELATION, SAMPLE } from '../src/data/research.ts';
import { SV_JS_ITEM_SUMS, ITEMS_PER_CONSTRUCT } from '../src/data/respondents.ts';

const fail = (m: string) => { console.error('✗ ' + m); process.exitCode = 1; };
const mean = (a: number[]) => a.reduce((s, v) => s + v, 0) / a.length;
const sv = SV_JS_ITEM_SUMS.map(([s]) => s / ITEMS_PER_CONSTRUCT);
const js = SV_JS_ITEM_SUMS.map(([, j]) => j / ITEMS_PER_CONSTRUCT);

if (SV_JS_ITEM_SUMS.length !== SAMPLE.n) fail(`respondent count ${SV_JS_ITEM_SUMS.length} ≠ ${SAMPLE.n}`);
if (mean(sv).toFixed(2) !== JCM.SV.label) fail(`SV mean ${mean(sv).toFixed(3)} ≠ ${JCM.SV.label}`);
if (mean(js).toFixed(2) !== OUTCOMES.JS.label) fail(`JS mean ${mean(js).toFixed(3)} ≠ ${OUTCOMES.JS.label}`);

const mx = mean(sv), my = mean(js);
let sxy = 0, sxx = 0, syy = 0;
sv.forEach((x, i) => { sxy += (x - mx) * (js[i] - my); sxx += (x - mx) ** 2; syy += (js[i] - my) ** 2; });
const r = sxy / Math.sqrt(sxx * syy);
if (r.toFixed(2) !== CORRELATION.r.toFixed(2)) fail(`r ${r.toFixed(3)} ≠ ${CORRELATION.r}`);

const locked: Record<string, string> = { TS: '4.09', TI: '4.04', FB: '3.40', AU: '2.84', SV: '2.55' };
for (const [k, v] of Object.entries(locked)) if (JCM[k as keyof typeof JCM].label !== v) fail(`${k} label changed`);
if (OUTCOMES.IWM.label !== '3.46') fail('IWM label changed');

if (!process.exitCode) console.log(`✓ data verified · n=${sv.length} · SV=${mean(sv).toFixed(3)} · JS=${mean(js).toFixed(3)} · r=${r.toFixed(3)}`);
