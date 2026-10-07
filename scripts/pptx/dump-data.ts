// Dumps the locked research values (the same module the HTML uses) as JSON for the PPTX builder.
import * as R from '../../src/data/research.ts';
import { SV_JS_ITEM_SUMS, ITEMS_PER_CONSTRUCT } from '../../src/data/respondents.ts';
console.log(JSON.stringify({ ...R, SV_JS_ITEM_SUMS, ITEMS_PER_CONSTRUCT }, null, 1));
