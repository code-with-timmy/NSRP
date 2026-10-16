import { inGameRuleCategories } from '@/data/inGameRules';

export const flatRules = inGameRuleCategories.flatMap((cat) =>
  cat.rules.map((r) => ({ ...r, category: cat.title })),
);

const LABELS = {
  vw: 'Verbal Warning',
  w: 'Warning',
  k: 'Kick',
  b: 'Ban',
  pb: 'Permanent Ban',
};

// e.g. ['w', 'k'] -> "Warning → Kick"
export const punishmentPath = (punishments = []) =>
  punishments.map((p) => LABELS[p]).join(' → ');

// Rules whose standard (first) punishment is one of the given types.
export const rulesStartingWith = (types) =>
  flatRules.filter((r) => types.includes(r.punishments[0]));