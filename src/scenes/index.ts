// Scene order = presentation order. Each act lives in its own module.
import { again, lastPerson, question, title } from './act1';
import { diagnoseFirst, fiveLenses, twentyFive } from './act2';
import { drop, narrow, strong } from './act3';
import { association, signal, value } from './act4';
import { theory } from './act5';
import { authority, enriched, feedback, ownership, rotation } from './act6';
import { balance, hypothesis, pilot } from './act7';
import { finale, routine } from './act8';

export const SCENES = [
  title, lastPerson, again, question, // I · Observe
  twentyFive, fiveLenses, diagnoseFirst, // II · Investigate
  strong, drop, narrow, // III · Reveal
  value, association, signal, // IV · Go deeper
  theory, // V · Interpret
  enriched, rotation, authority, ownership, feedback, // VI · Redesign
  hypothesis, pilot, balance, // VII · Test
  routine, finale, // VIII · Conclude
];
