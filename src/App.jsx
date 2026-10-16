import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SessionProvider, useSession } from '@/lib/session';
import Layout from './components/layout/Layout';
import PageNotFound from './lib/PageNotFound';
import Home from './pages/Home';

const StaffGuide = lazy(() => import('./pages/StaffGuide'));
const ModeratorRules = lazy(() => import('./pages/ModeratorRules'));
const AdministrationRules = lazy(() => import('./pages/AdministrationRules'));
const ServerRules = lazy(() => import('./pages/ServerRules'));
const InGameRules = lazy(() => import('./pages/InGameRules'));
const StaffActivityQuotas = lazy(() => import('./pages/StaffActivityQuotas'));
const TrainingInformation = lazy(() => import('./pages/TrainingInformation'));
const StaffCommands = lazy(() => import('./pages/StaffCommands'));
const ModerationSceneProcedures = lazy(() => import('./pages/ModerationSceneProcedures'));
const ApplicationInformation = lazy(() => import('./pages/ApplicationInformation'));
const FAQ = lazy(() => import('./pages/FAQ'));
const AccessDenied = lazy(() => import('./pages/AccessDenied'));
const DiscordModeration = lazy(() => import('./pages/DiscordModeration'));
const StaffApplication = lazy(() => import('./pages/StaffApplication'));
const ApplicationReview = lazy(() => import('./pages/ApplicationReview'));
const StaffApplicationsHub = lazy(() => import('./pages/StaffApplicationsHub'));
const StaffExpectations = lazy(() => import('./pages/StaffExpectations'));
const ModerationHandbook = lazy(() => import('./pages/ModerationHandbook'));
const StaffCommunication = lazy(() => import('./pages/StaffCommunication'));
const PromotionInformation = lazy(() => import('./pages/PromotionInformation'));
const StaffResources = lazy(() => import('./pages/StaffResources'));
const ScenarioTraining = lazy(() => import('./pages/ScenarioTraining'));
const KnowledgeBase = lazy(() => import('./pages/KnowledgeBase'));
const StaffInstructorGuide = lazy(() => import('./pages/StaffInstructorGuide'));
const MelonlyGuide = lazy(() => import('./pages/MelonlyGuide'));

const fullScreen = {
  minHeight: '100vh',
  display: 'grid',
  placeItems: 'center',
  background: '#0b1020',
  color: 'white',
  fontFamily: 'Arial, sans-serif',
};

function ProtectedRoutes() {
  const { user, checking } = useSession();

  if (checking || !user) {
    return <main style={fullScreen}>Checking NSRP staff access...</main>;
  }

  return (
    <Suspense fallback={<main style={fullScreen}>Loading staff guide...</main>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/staff-guide" element={<StaffGuide />} />
          <Route path="/moderator-rules" element={<ModeratorRules />} />
          <Route path="/administration-rules" element={<AdministrationRules />} />
          <Route path="/server-rules" element={<ServerRules />} />
          <Route path="/in-game-rules" element={<InGameRules />} />
          <Route path="/staff-activity-quotas" element={<StaffActivityQuotas />} />
          <Route path="/training-information" element={<TrainingInformation />} />
          <Route path="/staff-commands" element={<StaffCommands />} />
          <Route path="/moderation-scene-procedures" element={<ModerationSceneProcedures />} />
          <Route path="/application-information" element={<ApplicationInformation />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="/discord-moderation" element={<DiscordModeration />} />
          <Route path="/staff-application" element={<StaffApplication />} />
          <Route path="/application-review" element={<ApplicationReview />} />
          <Route path="/staff-applications" element={<StaffApplicationsHub />} />
          <Route path="/staff-expectations" element={<StaffExpectations />} />
          <Route path="/moderation-handbook" element={<ModerationHandbook />} />
          <Route path="/staff-communication" element={<StaffCommunication />} />
          <Route path="/promotion-information" element={<PromotionInformation />} />
          <Route path="/staff-resources" element={<StaffResources />} />
          <Route path="/scenario-training" element={<ScenarioTraining />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/staff-instructor-guide" element={<StaffInstructorGuide />} />
          <Route path="/melonly-guide" element={<MelonlyGuide />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ProtectedRoutes />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default App;