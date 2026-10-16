import { punishmentPath } from '@/lib/ingameRules';

// Plain text list of rules. The surrounding accordion is the only container.
// hideStandard: when the rule's only punishment equals the panel's own
// punishment, the label is omitted (the panel title already says it).
export default function RuleList({ rules, hideStandard }) {
  return (
    <div>
      {rules.map((rule, i) => {
        const isStandardOnly =
          hideStandard && rule.punishments.length === 1 && rule.punishments[0] === hideStandard;
        const path = isStandardOnly ? '' : punishmentPath(rule.punishments);

        return (
          <div key={`${rule.name}-${i}`} className="py-3.5 first:pt-0 last:pb-0 border-b border-white/5 last:border-0">
            <p className="text-sm font-semibold text-white/90">{rule.name}</p>
            <p className="text-[13px] text-white/60 leading-relaxed mt-1">{rule.desc}</p>
            {path && <p className="text-xs text-white/40 mt-1.5">{path}</p>}
          </div>
        );
      })}
    </div>
  );
}