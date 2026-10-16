import { useState } from 'react';
import { CheckCircle2, XCircle, X, Loader2, Send, User, Hash, Clock } from 'lucide-react';

const ACCEPT_NOTES_PRESETS = [
  'Great application! Your responses were well-thought-out and professional.',
  'Excellent rule knowledge. Your scenario answers show great understanding.',
  'Very professional and mature responses. We look forward to having you on the team.',
  'Outstanding application. Your experience and dedication stood out to us.',
];

const DENY_REASONS_PRESETS = [
  'Your application did not meet our current requirements.',
  'Insufficient detail in your scenario responses.',
  'We are looking for applicants with more moderation experience at this time.',
  'Your application responses did not demonstrate sufficient rule knowledge.',
];

export default function ReviewModal({ app, action, onConfirm, onClose, submitting }) {
  const isAccept = action === 'accept';
  const [note, setNote] = useState('');

  const presets = isAccept ? ACCEPT_NOTES_PRESETS : DENY_REASONS_PRESETS;
  const noteLabel = isAccept ? 'Reviewer Notes' : 'Denial Reason';
  const notePlaceholder = isAccept
    ? 'e.g. Great application! Your responses were professional and detailed.'
    : 'e.g. Your application did not meet our current requirements.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg glass-strong border border-white/10 rounded-2xl overflow-hidden animate-fade-in">
        {/* Top accent bar */}
        <div className={`h-1 w-full ${isAccept ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 'bg-gradient-to-r from-red-500 to-rose-400'}`} />

        {/* Header */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isAccept ? 'bg-green-500/15 border border-green-500/30' : 'bg-red-500/15 border border-red-500/30'}`}>
              {isAccept
                ? <CheckCircle2 size={16} className="text-green-400" />
                : <XCircle size={16} className="text-red-400" />}
            </div>
            <div>
              <div className="text-sm font-bold text-white">{isAccept ? 'Accept Application' : 'Deny Application'}</div>
              <div className="text-xs text-white/35">This decision is saved to the application record.</div>
            </div>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Applicant summary */}
        <div className="px-5 pt-4">
          <div className="glass border border-white/8 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center flex-shrink-0">
              <User size={13} className="text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">{app.robloxUsername}</div>
              <div className="text-[10px] text-white/35 truncate">{app.discordUsername}</div>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-white/25 font-mono flex-shrink-0">
              <Hash size={9} />
              {app.id?.slice(-6)}
            </div>
          </div>
        </div>

        {/* Note / reason field */}
        <div className="p-5 space-y-3">
          <div>
            <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">
              {noteLabel} <span className="text-blue-400">*</span>
            </label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder={notePlaceholder}
              rows={3}
              className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all bg-transparent resize-none"
            />
          </div>

          {/* Presets */}
          <div>
            <div className="text-[10px] text-white/25 uppercase tracking-wider mb-2">Quick Presets</div>
            <div className="flex flex-col gap-1.5">
              {presets.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setNote(p)}
                  className="text-left text-xs text-white/40 hover:text-white/70 glass border border-white/5 hover:border-white/15 rounded-lg px-3 py-2 transition-all leading-relaxed"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            disabled={submitting}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white/40 hover:text-white/70 glass border border-white/8 hover:border-white/15 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(note)}
            disabled={submitting || !note.trim()}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-40 ${
              isAccept
                ? 'bg-green-500/20 border border-green-500/40 text-green-400 hover:bg-green-500/30'
                : 'bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30'
            }`}
          >
            {submitting
              ? <><Loader2 size={12} className="animate-spin" /> Saving...</>
              : <><Send size={12} /> {isAccept ? 'Accept Application' : 'Deny Application'}</>}
          </button>
        </div>
      </div>
    </div>
  );
}