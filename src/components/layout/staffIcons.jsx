import {
  Home, BookOpen, BarChart3, Bookmark, Gamepad2, ShieldCheck, NotebookText,
  Swords, MessageSquare, Shield, Terminal, MessagesSquare, Crown, FileText,
  GraduationCap, UserCheck, Wrench, Users, FileUser, TrendingUp, HelpCircle,
  BookCopy, Star, FileSearch,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Nevada State Roleplay — unified navigation icon system.
// One pack: white monochrome line icons, identical stroke weight + size.
// ─────────────────────────────────────────────────────────────────────────────
const ICON_SIZE = 18;
const ICON_STROKE = 1.75;

export const icons = {
  home: Home,
  staffGuide: BookOpen,
  staffActivity: BarChart3,
  staffResources: Bookmark,
  inGameRules: Gamepad2,
  moderatorRules: ShieldCheck,
  moderationHandbook: NotebookText,
  sceneProcedures: Swords,
  discordModeration: MessageSquare,
  melonlyGuide: Shield,
  staffCommands: Terminal,
  staffCommunication: MessagesSquare,
  administrationRules: Crown,
  serverRules: FileText,
  trainingInfo: GraduationCap,
  staffExpectations: UserCheck,
  scenarioTraining: Wrench,
  interviews: Users,
  promotionInfo: TrendingUp,
  faq: HelpCircle,
  knowledgeBase: BookCopy,
  instructorGuide: Star,
  staffApplications: FileUser,
  applicationReview: FileSearch,
};

// Fixed-width slot keeps icons perfectly aligned and prevents text shifting,
// and icons never change size when a page is selected.
export function NavIcon({ icon: Icon, className = '' }) {
  return (
    <span className="w-[18px] h-[18px] flex items-center justify-center flex-shrink-0">
      <Icon size={ICON_SIZE} strokeWidth={ICON_STROKE} className={className} aria-hidden="true" />
    </span>
  );
}