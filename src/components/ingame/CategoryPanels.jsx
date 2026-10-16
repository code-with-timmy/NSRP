import AccordionSection from '@/components/ui/AccordionSection';
import RuleList from './RuleList';
import { inGameRuleCategories } from '@/data/inGameRules';

export default function CategoryPanels() {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-white pt-4">Rule Categories</h2>
      {inGameRuleCategories.map((cat) => (
        <AccordionSection key={cat.title} title={cat.title}>
          <RuleList rules={cat.rules} />
        </AccordionSection>
      ))}
    </div>
  );
}