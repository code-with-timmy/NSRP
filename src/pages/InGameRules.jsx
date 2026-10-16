import PageHeader from '@/components/ui/PageHeader';
import PunishmentPanels from '@/components/ingame/PunishmentPanels';
import PolicyPanels from '@/components/ingame/PolicyPanels';
import CategoryPanels from '@/components/ingame/CategoryPanels';

export default function InGameRules() {
  return (
    <div className="w-full max-w-[1100px] mx-auto space-y-6">
      <PageHeader
        className="mb-4"
        title="In-Game Rules"
        subtitle="Staff reference for in-game rules and punishments."
      />

      <PolicyPanels />

      <div className="space-y-3">
        <PunishmentPanels />
      </div>

      <CategoryPanels />
    </div>
  );
}