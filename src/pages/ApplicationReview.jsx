import { useState } from 'react';
import { ClipboardList, CheckCircle2, XCircle, MessageSquare, Clock, User, ChevronDown, ChevronUp, RefreshCw, Trash2, Info } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import ReviewModal from '@/components/ReviewModal';
import { SAMPLE_APPLICATIONS } from '@/data/sampleApplications';

const STATUS_COLORS = {
  'Pending Review': 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  'Accepted': 'bg-green-500/15 text-green-400 border-green-500/30',
  'Denied': 'bg-red-500/15 text-red-400 border-red-500/30',
  'Interview Required': 'bg-purple-500/15 text-purple-400 border-purple-500/30',
};

const STATUS_ICONS = {
  'Pending Review': Clock,
  'Accepted': CheckCircle2,
  'Denied': XCircle,
  'Interview Required': MessageSquare,
};

const SCENARIOS = [
  { id: 'scenario1', label: 'Q1 — What is a staff member hired for?' },
  { id: 'scenario2', label: 'Q2 — What is RDM? How do you handle it?' },
  { id: 'scenario3', label: 'Q3 — What is VDM? How do you handle it?' },
  { id: 'scenario4', label: 'Q4 — What is FRP? How do you handle it?' },
  { id: 'scenario5', label: 'Scenario 1 — Accidental RDM' },
  { id: 'scenario6', label: 'Scenario 2 — Staff members arguing' },
  { id: 'scenario7', label: 'Scenario 3 — High-ranking rule breaker' },
];

function StatusBadge({ status }) {
  const Icon = STATUS_ICONS[status] || Clock;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_COLORS[status] || 'bg-white/10 text-white/50 border-white/10'}`}>
      <Icon size={11} />
      {status}
    </span>
  );
}

function ReviewField({ label, value }) {
  return (
    <div className="py-2 border-b border-white/5 last:border-0">
      <div className="text-[10px] font-bold uppercase tracking-wider text-white/30 mb-0.5">{label}</div>
      <div className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{value || <span className="italic text-white/20">Not provided</span>}</div>
    </div>
  );
}

function ApplicationCard({ app, onOpenModal, onDelete, isAdmin }) {
  const [expanded, setExpanded] = useState(false);
  const isPending = app.status === 'Pending Review';

  const handleDelete = () => {
    if (!confirm(`Remove ${app.robloxUsername} from this preview list?`)) return;
    onDelete(app.id);
  };

  return (
    <div className="glass-strong border border-white/8 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-5 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-white">{app.robloxUsername}</span>
              <StatusBadge status={app.status} />
            </div>
            <div className="text-xs text-white/35 mt-0.5">{app.discordUsername}</div>
            <div className="text-[10px] text-white/20 mt-1 font-mono">
              {app.submittedAt ? new Date(app.submittedAt).toLocaleString() : new Date(app.created_date).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {isAdmin && (
            <button
              onClick={handleDelete}
              className="glass border border-red-500/20 rounded-xl p-2 text-red-400/50 hover:text-red-400 hover:border-red-500/40 transition-all"
              title="Remove from preview list"
            >
              <Trash2 size={15} />
            </button>
          )}
          <button
            onClick={() => setExpanded(e => !e)}
            className="glass border border-white/10 rounded-xl p-2 text-white/40 hover:text-white/70 transition-all"
          >
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* Quick info row */}
      <div className="px-5 pb-4 flex flex-wrap gap-2">
        {[
          { label: 'Age', val: app.age },
          { label: 'Timezone', val: app.timezone },
          { label: 'Device', val: app.device },
          { label: 'Grammar', val: app.grammarRating ? `${app.grammarRating}/10` : null },
          { label: 'Rules', val: app.rulesKnowledge ? `${app.rulesKnowledge}/10` : null },
          { label: 'Hours/Day', val: app.hoursPerDay },
        ].map(({ label, val }) => val ? (
          <div key={label} className="glass border border-white/8 rounded-lg px-2.5 py-1">
            <span className="text-[9px] text-white/30 uppercase tracking-wider">{label}: </span>
            <span className="text-xs text-white/60 font-medium">{val}</span>
          </div>
        ) : null)}
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="px-5 pb-4 border-t border-white/5 pt-4 space-y-1">
          <ReviewField label="Roblox Profile" value={app.robloxProfileLink} />
          <ReviewField label="Available Days" value={(app.availableDays || []).join(', ')} />
          <ReviewField label="Active Time" value={app.activeTime} />
          <ReviewField label="Previous Experience" value={app.experience} />
          <ReviewField label="Why Staff?" value={app.whyStaff} />
          {SCENARIOS.map(s => (
            <ReviewField key={s.id} label={s.label} value={app[s.id]} />
          ))}
          {app.additionalInfo && <ReviewField label="Additional Info" value={app.additionalInfo} />}
          {app.reviewerName && (
            <div className="mt-3 pt-3 border-t border-white/5">
              <div className="text-[10px] text-white/25">
                Reviewed by <span className="text-white/45 font-semibold">{app.reviewerName}</span>
                {app.reviewedAt && ` · ${new Date(app.reviewedAt).toLocaleString()}`}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Reviewer actions — admin only, only for pending */}
      {isPending && isAdmin && (
        <div className="px-5 py-4 border-t border-white/5 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-white/25 mr-1">Review:</span>
          <button
            onClick={() => onOpenModal(app, 'accept')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-green-500/15 border border-green-500/30 text-green-400 hover:bg-green-500/25 transition-all min-h-[44px]"
          >
            <CheckCircle2 size={12} />
            Accept
          </button>
          <button
            onClick={() => onOpenModal(app, 'deny')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 transition-all min-h-[44px]"
          >
            <XCircle size={12} />
            Deny
          </button>
        </div>
      )}
    </div>
  );
}

const FILTERS = ['All', 'Pending Review', 'Accepted', 'Denied', 'Interview Required'];

export default function ApplicationReview() {
  // Static preview: this build has no database, so sample records stand in
  // for real submissions and decisions are never saved.
  const [apps, setApps] = useState(SAMPLE_APPLICATIONS);
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(null); // { app, action }

  const reset = () => {
    setApps(SAMPLE_APPLICATIONS);
    setFilter('All');
  };

  const handleOpenModal = (app, action) => {
    setModal({ app, action });
  };

  // Updates the list on screen only — nothing is stored.
  const handleConfirm = () => {
    if (!modal) return;
    setSubmitting(true);
    setApps(prev => prev.map(a => a.id === modal.app.id ? {
      ...a,
      status: modal.action === 'accept' ? 'Accepted' : 'Denied',
      reviewerName: 'Preview Reviewer',
      reviewedAt: new Date().toISOString(),
    } : a));
    setSubmitting(false);
    setModal(null);
  };

  const handleDelete = (id) => setApps(prev => prev.filter(a => a.id !== id));

  const filtered = filter === 'All' ? apps : apps.filter(a => a.status === filter);
  const isAdmin = true;

  const counts = FILTERS.slice(1).reduce((acc, f) => {
    acc[f] = apps.filter(a => a.status === f).length;
    return acc;
  }, {});

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in">
      <PageHeader
        title="Application Review"
        subtitle="Review and manage staff applications submitted by community members."
        icon={ClipboardList}
        badge={`${apps.filter(a => a.status === 'Pending Review').length} Pending`}
      />

      {/* Filter tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              filter === f
                ? 'bg-blue-500/20 border-blue-500/40 text-blue-400'
                : 'glass border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
            }`}
          >
            {f}
            {f !== 'All' && counts[f] > 0 && (
              <span className="ml-1.5 text-[10px] opacity-70">{counts[f]}</span>
            )}
          </button>
        ))}
        <button
          onClick={reset}
          title="Reset preview data"
          className="ml-auto glass border border-white/10 rounded-xl p-1.5 text-white/30 hover:text-white/60 transition-all"
        >
          <RefreshCw size={13} />
        </button>
      </div>

      <div className="glass border border-amber-500/25 bg-amber-500/5 rounded-xl px-4 py-3 flex items-start gap-2.5">
        <Info size={14} className="text-amber-400/80 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-300/80 leading-relaxed">
          <span className="font-semibold text-amber-300">Preview only.</span> This static build has no database — the applications below are sample records and review decisions are not saved anywhere. Real applications are submitted and reviewed in Discord.
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="glass border border-white/5 rounded-2xl p-12 text-center text-sm text-white/25">
          No applications in this view.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(app => (
            <ApplicationCard
              key={app.id}
              app={app}
              onOpenModal={handleOpenModal}
              onDelete={handleDelete}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      )}

      {/* Review Modal */}
      {modal && (
        <ReviewModal
          app={modal.app}
          action={modal.action}
          onConfirm={handleConfirm}
          onClose={() => setModal(null)}
          submitting={submitting}
        />
      )}
    </div>
  );
}