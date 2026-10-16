import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Shield, ArrowRight, CheckCircle2, Clock, Lock } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import AccordionSection from '@/components/ui/AccordionSection';
import RankBadge from '@/components/ui/RankBadge';

const positions = [
  {
    title: 'Trial Moderator',
    rank: 'Trial Moderator',
    status: 'Open',
    statusColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    titleColor: 'text-[#3691FF]',
    badgeColor: 'bg-[#3691FF]/15 text-[#3691FF] border-[#3691FF]/30',
    accentColor: '#3691FF',
    requirements: [
      'Must be 13+ years of age',
      'Community member for at least 1 day',
      'Two-Factor Authentication (2FA) enabled on Discord',
      'No active bans or serious disciplinary actions',
      'Functioning Discord account and microphone',
      'Minimum 3 hours of in-server activity in the past 7 days',
    ],
    evaluation: null,
    process: 'Reviewed by the Management Team within 5–7 business days.',
  },
  {
    title: 'Internal Affairs',
    rank: 'Internal Affairs',
    status: 'By Invite',
    statusColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    titleColor: 'text-[#9B59B6]',
    badgeColor: 'bg-[#9B59B6]/15 text-[#B07FCC] border-[#9B59B6]/30',
    accentColor: '#9B59B6',
    requirements: [
      'Must hold the rank of Administrator or higher',
      'Minimum 3 weeks on the staff team',
      'Two-Factor Authentication (2FA) enabled on Discord',
      'Spotless disciplinary record and good standing',
      'Exceptional professionalism, maturity, and impartiality',
      'Ability to handle investigations without bias or favoritism',
      'Full confidentiality regarding all Internal Affairs matters',
    ],
    evaluation: {
      label: 'Internal Affairs Evaluation',
      bullets: [
        '7-day evaluation period',
        'Investigation skills monitored',
        'Professionalism and impartiality assessed',
        'Appointment granted upon successful completion',
      ],
    },
    process: 'Invitation-only — you cannot apply directly.',
  },
  {
    title: 'Administrator',
    rank: 'Administrator',
    status: 'Closed',
    statusColor: 'bg-red-500/20 text-red-400 border-red-500/30',
    titleColor: 'text-[#E74C3C]',
    badgeColor: 'bg-[#E74C3C]/15 text-[#EF7A72] border-[#E74C3C]/30',
    accentColor: '#E74C3C',
    requirements: [
      'Must currently hold the rank of Moderator',
      'Two-Factor Authentication (2FA) enabled on Discord',
      'Active participation and consistent moderation duties',
      'Professionalism, leadership, and sound judgment',
      'Positive staff record and good standing',
      'Assist and mentor lower-ranking staff members',
    ],
    evaluation: {
      label: 'Administrator Trial Period',
      bullets: [
        '3-day evaluation period',
        'Leadership and activity monitored',
        'Administrative performance assessed',
        'Promotion granted upon successful completion',
      ],
    },
    process: null,
  },
];

function StaffPortalModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-md glass-strong border border-white/10 rounded-3xl overflow-hidden animate-fade-in">
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-400" />
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl btn-glow flex items-center justify-center">
              <Shield size={18} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Staff Portal Access</div>
              <div className="text-xs text-white/40">Granted through Discord roles</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="glass border border-white/10 rounded-xl px-4 py-3">
              <p className="text-xs text-white/50 leading-relaxed">
                Staff portal access is granted through Discord roles. This website is a static guide and does not check staff membership — open a ticket in the Discord server if you need your access reviewed.
              </p>
            </div>
            <a
              href="https://discord.com/channels/1240254671189180416/1241959413397585990"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-glow text-white text-sm font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <ArrowRight size={15} />
              Open Discord
            </a>
            <button onClick={onClose} className="w-full text-xs text-white/25 hover:text-white/50 transition-colors py-1">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StaffApplicationsHub() {
  const [showPortalModal, setShowPortalModal] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header row with Staff Portal button in top-right */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <PageHeader
          title="Staff Applications"
          subtitle="Apply to join the Nevada State Roleplay staff team. Review the requirements and open positions below."
          icon={ClipboardList}
          badge="Recruitment Open"
        />
        <button
          onClick={() => setShowPortalModal(true)}
          className="flex-shrink-0 sm:mt-1 flex items-center gap-3 btn-glow text-white hover:opacity-90 transition-all rounded-2xl px-7 py-4 text-base font-bold min-h-[44px] w-full sm:w-auto justify-center"
        >
          <Lock size={17} />
          Staff Portal
        </button>
      </div>

      {/* ── PRIMARY: Apply hero card ── */}
      <div className="relative glass-strong border border-white/8 rounded-3xl overflow-hidden p-7">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 via-transparent to-transparent pointer-events-none" />
        <div
          className="absolute top-0 right-0 w-64 h-48 pointer-events-none"
          style={{ background: 'radial-gradient(closest-side, rgba(59, 130, 246, 0.10), transparent 100%)' }}
        />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-green-400 uppercase tracking-widest">Applications Open</span>
          </div>
          <h3 className="text-xl font-black text-white tracking-tight mb-2">Apply to Join the Staff Team</h3>
          <p className="text-sm text-white/50 leading-relaxed max-w-xl mb-5">
            Nevada State Roleplay is actively recruiting for Trial Moderators. We're looking for dedicated, professional, and community-driven individuals who want to help maintain a safe and fun environment.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Link
              to="/staff-application"
              className="btn-glow text-white text-sm font-bold px-6 py-3 rounded-xl inline-flex items-center justify-center gap-2 min-h-[44px]"
            >
              <ClipboardList size={15} />
              Apply Now
            </Link>
            <div className="glass border border-white/10 rounded-xl px-4 py-3 text-xs text-white/40 flex items-center gap-2 min-h-[44px]">
              <Clock size={12} className="text-blue-400" />
              Reviewed within 5–7 business days
            </div>
          </div>
        </div>
      </div>

      {/* ── Open positions ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {positions.map(p => (
          <div key={p.title} className="glass border border-white/5 rounded-2xl p-4">
            <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${p.badgeColor}`}>{p.rank}</span>
            <div className="mt-3 flex items-center justify-between">
              <div className={`text-sm font-semibold ${p.titleColor}`}>{p.title}</div>
              <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${p.statusColor}`}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Accordions ── */}
      <div className="space-y-3">
        <AccordionSection title="Requirements by Position" defaultOpen>
          <div className="space-y-6">
            {positions.map(p => (
              <div key={p.title} className="glass border border-white/8 rounded-2xl p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className={`text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${p.badgeColor}`}>{p.rank}</span>
                  <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${p.statusColor}`}>{p.status}</span>
                </div>

                {/* Requirements */}
                <ul className="space-y-3 mb-5">
                  {p.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: p.accentColor, opacity: 0.8 }} />
                      <span className="text-sm text-white/70 leading-snug">{r}</span>
                    </li>
                  ))}
                </ul>

                {/* Evaluation Period */}
                {p.evaluation && (
                  <div className="mb-5 border-t border-white/5 pt-4">
                    <p className={`text-xs font-bold uppercase tracking-widest mb-3`} style={{ color: p.accentColor }}>{p.evaluation.label}</p>
                    <ul className="space-y-2">
                      {p.evaluation.bullets.map((b, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.accentColor, opacity: 0.6 }} />
                          <span className="text-sm text-white/55">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Footer */}
                <p className="text-xs text-white/30 border-t border-white/5 pt-4 italic">
                  {p.process ?? (
                    <>
                      Currently closed — watch for announcements in our{' '}
                      <a
                        href="https://discord.com/channels/1240254671189180416/1242090155364585595"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400/70 hover:text-blue-400 underline underline-offset-2 transition-colors"
                      >
                        announcements channel
                      </a>
                      .
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection title="Application Tips & Best Practices">
          <ul className="space-y-4">
            {[
              { text: 'Be honest in your application. False information, lying, or misleading answers may result in an immediate denial.' },
              { text: 'Write in complete sentences. Low-effort applications, poor grammar, or one-word answers may be denied.' },
              { text: 'Explain why you want to help the community and what makes you a good candidate for staff.' },
              { text: 'Reference relevant moderation, leadership, or roleplay experience when applicable.' },
              { text: 'Do not ping Management or direct message staff members regarding your application status.' },
              { text: 'A working microphone is REQUIRED. Applications submitted without microphone access will be automatically denied.', warn: true },
              { text: 'Two-Factor Authentication (2FA) is REQUIRED on your Discord account. Applications submitted without 2FA enabled will be automatically denied.', warn: true },
              { text: 'If denied, wait for the required cooldown period before reapplying.' },
            ].map((tip, i) => (
              tip.warn ? (
                <li key={i} className="flex items-start gap-3 bg-amber-500/8 border border-amber-500/25 rounded-xl px-4 py-3">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">!</span>
                  <span className="text-sm text-amber-300/90 font-medium leading-snug">{tip.text}</span>
                </li>
              ) : (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-sm text-white/65 leading-snug">{tip.text}</span>
                </li>
              )
            ))}
          </ul>
        </AccordionSection>

        <AccordionSection title="Appeal & Reapplication Policy">
          <div className="grid sm:grid-cols-3 gap-4 mb-5">
            {[
              { reason: 'First Denial', wait: '1 Week' },
              { reason: 'Second Denial', wait: '2 Weeks' },
              { reason: 'Third+ Denial', wait: '3 Weeks' },
            ].map(item => (
              <div key={item.reason} className="glass border border-white/8 rounded-2xl p-5 text-center">
                <div className="text-xs text-white/35 font-medium mb-2">{item.reason}</div>
                <div className="text-2xl font-black text-white mb-1">{item.wait}</div>
                <div className="text-xs text-white/25 uppercase tracking-wider">Cooldown</div>
              </div>
            ))}
          </div>
          <div className="flex items-start gap-3 bg-white/3 border border-white/8 rounded-xl px-4 py-3">
            <span className="text-white/25 text-lg leading-none mt-0.5">ℹ</span>
            <p className="text-sm text-white/45 leading-relaxed">Applicants who fail to meet minimum requirements, including microphone access and Discord Two-Factor Authentication (2FA), will be automatically denied and must wait the appropriate cooldown period before submitting another application.</p>
          </div>
        </AccordionSection>
      </div>

      {/* ── SECONDARY: Staff Portal compact card ── */}
      <div className="glass border border-blue-500/20 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl glass border border-blue-500/30 flex items-center justify-center flex-shrink-0">
            <Shield size={16} className="text-blue-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              Staff Portal
              <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400">Staff Only</span>
            </div>
            <div className="text-xs text-white/35 mt-0.5">Current staff members can access internal guides and tools here.</div>
          </div>
        </div>
        <button
          onClick={() => setShowPortalModal(true)}
          className="flex-shrink-0 btn-glow text-white text-sm font-bold px-5 py-3 rounded-xl inline-flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto"
        >
          <Lock size={12} />
          Enter Portal
          <ArrowRight size={12} className="opacity-70" />
        </button>
      </div>

      {showPortalModal && <StaffPortalModal onClose={() => setShowPortalModal(false)} />}
    </div>
  );
}