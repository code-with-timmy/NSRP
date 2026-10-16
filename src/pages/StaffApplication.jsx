import { useState } from 'react';
import { ClipboardList, ChevronRight, ChevronLeft, CheckCircle2, Loader2, AlertCircle, User, Shield, MessageSquare, Zap, Calendar, Mic, Lock, Users, FileText, Search, Star, Car, Info } from 'lucide-react';

const TIMEZONES = ['EST (UTC-5)', 'CST (UTC-6)', 'MST (UTC-7)', 'PST (UTC-8)', 'GMT (UTC+0)', 'CET (UTC+1)', 'AEST (UTC+10)', 'Other'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const SCENARIOS = [
  {
    id: 'scenario1',
    label: 'Question 1',
    question: 'What Is a ER:LC private server staff member hired for?',
  },
  {
    id: 'scenario2',
    label: 'Question 2',
    question: 'What Is RDM? - How do you handle It?',
  },
  {
    id: 'scenario3',
    label: 'Question 3',
    question: 'What Is VDM? - How do you handle It?',
  },
  {
    id: 'scenario4',
    label: 'Question 4',
    question: 'What Is FRP? - How do you handle It?',
  },
  {
    id: 'scenario5',
    label: 'Scenario 1',
    question: 'A player is reported for RDM but claims it was an accident. They have no prior warnings. How do you handle this?',
  },
  {
    id: 'scenario6',
    label: 'Scenario 2',
    question: 'Two staff members are arguing publicly in the server, disrupting the community. What steps do you take?',
  },
  {
    id: 'scenario7',
    label: 'Scenario 3',
    question: 'A high-ranking player is breaking server rules but threatens to leave if punished. How do you respond?',
  },
];

const steps = [
  { id: 'personal', label: 'Personal Information', icon: User },
  { id: 'fleet', label: 'Fleet Requirements', icon: Car },
  { id: 'experience', label: 'Experience', icon: Shield },
  { id: 'scenarios', label: 'Moderation Scenarios', icon: MessageSquare },
  { id: 'availability', label: 'Availability', icon: Calendar },
  { id: 'review', label: 'Review', icon: CheckCircle2 },
];

function FieldLabel({ children, required }) {
  return (
    <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
      {children} {required && <span className="text-blue-400">*</span>}
    </label>
  );
}

function TextInput({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all bg-transparent"
    />
  );
}

function TextArea({ value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all bg-transparent resize-none"
    />
  );
}

function SelectInput({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all bg-[#0A0A18] appearance-none"
    >
      <option value="" disabled className="text-white/30">{placeholder}</option>
      {options.map(o => <option key={o} value={o} className="bg-[#0A0A18]">{o}</option>)}
    </select>
  );
}

const DEVICES = ['Computer/Laptop', 'iPad/Tablet', 'Mobile/Phone'];

function StepPersonal({ data, setData }) {
  return (
    <div className="space-y-5">
      <div>
        <FieldLabel required>Roblox Username</FieldLabel>
        <TextInput value={data.robloxUsername} onChange={v => setData({ ...data, robloxUsername: v })} placeholder="YourRobloxUsername" />
      </div>
      <div>
        <FieldLabel required>Roblox Profile Link</FieldLabel>
        <TextInput value={data.robloxProfileLink} onChange={v => setData({ ...data, robloxProfileLink: v })} placeholder="https://www.roblox.com/users/3321906439/profile" />
      </div>
      <div>
        <FieldLabel required>Discord Username</FieldLabel>
        <TextInput value={data.discordUsername} onChange={v => setData({ ...data, discordUsername: v })} placeholder="username#0000 or @username" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <FieldLabel required>Age</FieldLabel>
          <TextInput type="number" value={data.age} onChange={v => setData({ ...data, age: v })} placeholder="16" />
        </div>
        <div>
          <FieldLabel required>Timezone</FieldLabel>
          <SelectInput value={data.timezone} onChange={v => setData({ ...data, timezone: v })} options={TIMEZONES} placeholder="Select timezone" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-white/80 mb-2">What device do you play ERLC on? <span className="text-blue-400">*</span></label>
        <div className="flex gap-3 flex-wrap mt-2">
          {DEVICES.map(device => (
            <button
              key={device}
              type="button"
              onClick={() => setData({ ...data, device })}
              className={`px-6 py-3 rounded-xl text-sm font-bold border transition-all ${
                data.device === device
                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                  : 'glass border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
              }`}
            >
              {device}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function YesNoInput({ value, onChange }) {
  return (
    <div className="flex gap-3">
      {['Yes', 'No'].map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-8 py-3 rounded-xl text-sm font-bold border transition-all ${
            value === opt
              ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
              : 'glass border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

const FLEET_VEHICLES = [
  {
    key: 'ownsFury',
    name: '2022 Bullhorn Determinator SFP Fury',
    image: 'https://media.base44.com/images/public/6a1559683a239521f5263a7b/ba3ef9259_image.png',
    description: "Primary Sheriff's Office patrol vehicle utilized by staff members during patrol operations, ride-alongs, training sessions, and in-game moderation duties. Staff members are strongly encouraged to have access to this vehicle when participating in patrol-related activities.",
  },
  {
    key: 'ownsTruckatron',
    name: '2024 Celestial Truckatron',
    image: 'https://media.base44.com/images/public/6a1559683a239521f5263a7b/643b8461c_image.png',
    description: "Specialized Sheriff's Office support vehicle utilized during staff operations, department events, training exercises, and select patrol assignments. Staff members may be expected to have access to this vehicle when participating in specialized operations.",
  },
];

function StepFleet({ data, setData }) {
  return (
    <div className="space-y-5">

      {/* Intro */}
      <p className="text-sm leading-6 text-white/55">
        Applicants are encouraged to own the recommended Sheriff's Office fleet vehicles listed below. Ownership is not required, however applicants without access to these vehicles may receive lower consideration depending on staffing needs.
      </p>

      {/* Vehicle Cards */}
      {FLEET_VEHICLES.map(vehicle => (
        <div
          key={vehicle.key}
          className="glass border border-white/10 rounded-2xl overflow-hidden flex items-stretch transition-all hover:border-white/20"
          style={{ minHeight: 140 }}
        >
          {/* Left: content — 45% */}
          <div className="flex flex-col justify-center gap-2 px-4 py-4 w-full">
            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/25 self-start leading-none">
              Recommended Vehicle
            </span>
            <p className="text-sm font-bold text-white leading-snug">
              Do you own the {vehicle.name}? <span className="text-blue-400">*</span>
            </p>
            <p className="text-[11px] text-white/50 leading-relaxed">{vehicle.description}</p>
            <YesNoInput value={data[vehicle.key]} onChange={v => setData({ ...data, [vehicle.key]: v })} />
            <div className="flex items-start gap-2 bg-amber-500/8 border border-amber-500/20 rounded-lg px-3 py-2">
              <span className="text-amber-400 text-[11px] flex-shrink-0 mt-0.5">⚠</span>
              <p className="text-[10px] text-amber-300/70 leading-relaxed">
                Vehicle ownership is strongly recommended. These vehicles are regularly used during staff patrols, trainings, ride-alongs, and operational activities. Applicants without access to recommended staff fleet vehicles may receive lower consideration during the application review process and could be denied depending on staffing requirements.
              </p>
            </div>
          </div>


        </div>
      ))}
    </div>
  );
}

const RATINGS = [1,2,3,4,5,6,7,8,9,10];

function StepExperience({ data, setData }) {
  return (
    <div className="space-y-5">
      <div>
        <FieldLabel>Previous Moderation Experience</FieldLabel>
        <p className="text-xs text-white/40 leading-relaxed mt-1 mb-2">
          Please list all previous moderation experience using the format below. Include the server name, your highest rank achieved, and the approximate member count of the server at the time you served.
        </p>
        <div className="glass border border-blue-500/15 rounded-xl p-3 mb-3 space-y-1.5">
          <p className="text-[10px] font-bold text-blue-400/70 uppercase tracking-widest mb-2">Format Example</p>
          {[
            'Nevada State Roleplay — Senior Moderator — 12,000 Members',
            'Lone Star Roleplay — Administrator — 8,500 Members',
            'South Texas Roleplay — Moderator — 4,200 Members',
          ].map((ex) => (
            <div key={ex} className="flex items-start gap-2">
              <span className="text-blue-400/50 text-xs mt-0.5">•</span>
              <span className="text-xs text-white/50 font-mono leading-relaxed">{ex}</span>
            </div>
          ))}
          <div className="border-t border-white/5 mt-2.5 pt-2.5 space-y-1">
            {[
              'Provide the server name, highest rank achieved, and approximate member count.',
              'List each experience separately on a new line.',
              'If you have no previous experience, enter "No Previous Experience."',
            ].map((req) => (
              <div key={req} className="flex items-start gap-2">
                <span className="text-white/20 text-xs mt-0.5">—</span>
                <span className="text-[11px] text-white/35 leading-relaxed">{req}</span>
              </div>
            ))}
          </div>
        </div>
        <TextArea
          value={data.experience}
          onChange={v => setData({ ...data, experience: v })}
          placeholder={"Nevada State Roleplay — Senior Moderator — 12,000 Members\nLone Star Roleplay — Administrator — 8,500 Members"}
          rows={5}
        />
      </div>
      <div>
        <FieldLabel required>Why do you want to become staff?</FieldLabel>
        <TextArea
          value={data.whyStaff}
          onChange={v => setData({ ...data, whyStaff: v })}
          placeholder="Explain your motivation for joining the staff team. What do you bring to the team and why Nevada State Roleplay specifically?"
          rows={5}
        />
      </div>
      <div>
        <FieldLabel required>How good is your Grammar?</FieldLabel>
        <div className="flex gap-2 flex-wrap mt-1">
          {RATINGS.map(n => (
            <button
              key={n}
              type="button"
              onClick={() => setData({ ...data, grammarRating: n })}
              className={`w-10 h-10 rounded-xl text-sm font-bold border transition-all ${
                data.grammarRating === n
                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                  : 'glass border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <div>
        <FieldLabel required>How much knowledge do you know about our Server Rules?</FieldLabel>
        <div className="flex gap-2 flex-wrap mt-1">
          {RATINGS.map(n => (
            <button
              key={n}
              type="button"
              onClick={() => setData({ ...data, rulesKnowledge: n })}
              className={`w-10 h-10 rounded-xl text-sm font-bold border transition-all ${
                data.rulesKnowledge === n
                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                  : 'glass border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepScenarios({ data, setData }) {
  return (
    <div className="space-y-6">
      {SCENARIOS.map((s) => (
        <div key={s.id}>
          <div className="glass border border-blue-500/15 rounded-xl p-4 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">{s.label}</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">{s.question}</p>
          </div>
          <TextArea
            value={data[s.id] || ''}
            onChange={v => setData({ ...data, [s.id]: v })}
            placeholder="Your response..."
            rows={6}
          />
        </div>
      ))}
    </div>
  );
}

function StepAvailability({ data, setData }) {
  const toggleDay = (day) => {
    const current = data.availableDays || [];
    const updated = current.includes(day) ? current.filter(d => d !== day) : [...current, day];
    setData({ ...data, availableDays: updated });
  };

  return (
    <div className="space-y-5">
      <div>
        <FieldLabel required>Available Days</FieldLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
          {DAYS.map(day => {
            const active = (data.availableDays || []).includes(day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  active
                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                    : 'glass border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <FieldLabel required>Hours Available Per Day</FieldLabel>
          <SelectInput
            value={data.hoursPerDay}
            onChange={v => setData({ ...data, hoursPerDay: v })}
            options={['1-2 hours', '2-4 hours', '4-6 hours', '6+ hours']}
            placeholder="Select hours"
          />
        </div>
        <div>
          <FieldLabel>Active Time of Day</FieldLabel>
          <SelectInput
            value={data.activeTime}
            onChange={v => setData({ ...data, activeTime: v })}
            options={['Morning (6am–12pm)', 'Afternoon (12pm–5pm)', 'Evening (5pm–10pm)', 'Night (10pm–2am)', 'Varies']}
            placeholder="Select time"
          />
        </div>
      </div>
      <div>
        <FieldLabel>Anything else we should know?</FieldLabel>
        <TextArea
          value={data.additionalInfo}
          onChange={v => setData({ ...data, additionalInfo: v })}
          placeholder="Any upcoming schedule changes, notes, or anything else relevant to your application..."
          rows={3}
        />
      </div>
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div className="flex gap-3 py-2.5 border-b border-white/5 last:border-0">
      <span className="text-xs text-white/35 w-36 flex-shrink-0 pt-0.5">{label}</span>
      <span className="text-xs text-white/75 leading-relaxed">{value || <span className="italic text-white/20">Not provided</span>}</span>
    </div>
  );
}

function StepReview({ data }) {
  return (
    <div className="space-y-5">
      <div className="glass border border-white/8 rounded-xl p-4">
        <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Personal Info</p>
        <ReviewRow label="Roblox Username" value={data.robloxUsername} />
        <ReviewRow label="Roblox Profile Link" value={data.robloxProfileLink} />
        <ReviewRow label="Discord" value={data.discordUsername} />
        <ReviewRow label="Age" value={data.age} />
        <ReviewRow label="Timezone" value={data.timezone} />
        <ReviewRow label="Device" value={data.device} />
      </div>
      <div className="glass border border-white/8 rounded-xl p-4">
        <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Fleet Requirements</p>
        <ReviewRow label="Owns Fury" value={data.ownsFury} />
        <ReviewRow label="Owns Truckatron" value={data.ownsTruckatron} />
      </div>
      <div className="glass border border-white/8 rounded-xl p-4">
        <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Experience</p>
        <ReviewRow label="Past Experience" value={data.experience} />
        <ReviewRow label="Why Staff?" value={data.whyStaff} />
        <ReviewRow label="Grammar Rating" value={data.grammarRating ? `${data.grammarRating}/10` : ''} />
        <ReviewRow label="Rules Knowledge" value={data.rulesKnowledge ? `${data.rulesKnowledge}/10` : ''} />
      </div>
      <div className="glass border border-white/8 rounded-xl p-4">
        <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Questions & Scenarios</p>
        {SCENARIOS.map(s => <ReviewRow key={s.id} label={s.label} value={data[s.id]} />)}
      </div>
      <div className="glass border border-white/8 rounded-xl p-4">
        <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Availability</p>
        <ReviewRow label="Days" value={(data.availableDays || []).join(', ')} />
        <ReviewRow label="Hours/Day" value={data.hoursPerDay} />
        <ReviewRow label="Active Time" value={data.activeTime} />
        <ReviewRow label="Additional Info" value={data.additionalInfo} />
      </div>
    </div>
  );
}

// Builds a plain-text copy of the application so applicants can post it in Discord.
function buildApplicationText(data) {
  const lines = [
    'NEVADA STATE ROLEPLAY — STAFF APPLICATION',
    '',
    `Roblox Username: ${data.robloxUsername || '—'}`,
    `Roblox Profile: ${data.robloxProfileLink || '—'}`,
    `Discord Username: ${data.discordUsername || '—'}`,
    `Age: ${data.age || '—'}`,
    `Timezone: ${data.timezone || '—'}`,
    `Device: ${data.device || '—'}`,
    `Grammar Rating: ${data.grammarRating ? `${data.grammarRating}/10` : '—'}`,
    `Rules Knowledge: ${data.rulesKnowledge ? `${data.rulesKnowledge}/10` : '—'}`,
    '',
    'PREVIOUS EXPERIENCE',
    data.experience || '—',
    '',
    'WHY DO YOU WANT TO BE STAFF?',
    data.whyStaff || '—',
    '',
    'QUESTIONS & SCENARIOS',
  ];

  SCENARIOS.forEach((s, i) => {
    lines.push(`${i + 1}. ${s.question}`);
    lines.push(data[s.id] || '—');
    lines.push('');
  });

  lines.push('RECOMMENDED FLEET OWNERSHIP');
  FLEET_VEHICLES.forEach(v => lines.push(`${v.name}: ${data[v.key] || '—'}`));
  lines.push('');
  lines.push('AVAILABILITY');
  lines.push(`Days: ${(data.availableDays || []).join(', ') || '—'}`);
  lines.push(`Hours Per Day: ${data.hoursPerDay || '—'}`);
  lines.push(`Active Time: ${data.activeTime || '—'}`);

  if (data.additionalInfo) {
    lines.push('');
    lines.push('ADDITIONAL INFO');
    lines.push(data.additionalInfo);
  }

  return lines.join('\n');
}

export default function StaffApplication() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const [data, setData] = useState({
    robloxUsername: '',
    robloxProfileLink: '',
    discordUsername: '',
    age: '',
    timezone: '',
    device: '',
    experience: '',
    whyStaff: '',
    grammarRating: null,
    rulesKnowledge: null,
    scenario1: '',
    scenario2: '',
    scenario3: '',
    scenario4: '',
    scenario5: '',
    scenario6: '',
    scenario7: '',
    ownsFury: '',
    ownsTruckatron: '',
    availableDays: [],
    hoursPerDay: '',
    activeTime: '',
    additionalInfo: '',
  });

  const validateStep = () => {
    if (currentStep === 0) {
      if (!data.robloxUsername || !data.robloxProfileLink || !data.discordUsername || !data.age || !data.timezone || !data.device) {
        setError('Please fill in all required fields.');
        return false;
      }
      if (parseInt(data.age) < 13) {
        setError('You must be at least 13 years old to apply.');
        return false;
      }
    }
    if (currentStep === 1 && (!data.ownsFury || !data.ownsTruckatron)) {
      setError('Please answer both vehicle ownership questions.');
      return false;
    }
    if (currentStep === 2 && (!data.whyStaff || !data.grammarRating || !data.rulesKnowledge)) {
      setError('Please fill in all required fields.');
      return false;
    }
    if (currentStep === 3 && (!data.scenario1 || !data.scenario2 || !data.scenario3 || !data.scenario4 || !data.scenario5 || !data.scenario6 || !data.scenario7)) {
      setError('Please answer all questions.');
      return false;
    }
    if (currentStep === 4 && (!data.availableDays.length || !data.hoursPerDay)) {
      setError('Please select your available days and hours.');
      return false;
    }
    setError('');
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    setCurrentStep(s => s + 1);
  };

  const back = () => {
    setError('');
    setCurrentStep(s => s - 1);
  };

  const applicationText = buildApplicationText(data);

  // This site is static — nothing is sent to a server. The applicant finishes
  // the form here and posts the generated summary in Discord themselves.
  const handleSubmit = () => {
    setError('');
    setCopied(false);
    setSubmitted(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(applicationText);
      setCopied(true);
    } catch (err) {
      setError('Copy failed — select the text below and copy it manually.');
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="glass-strong border border-white/8 rounded-3xl p-7 text-center">
          <div className="w-16 h-16 rounded-2xl btn-glow flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={28} className="text-white" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Application Complete</h2>
          <p className="text-sm text-white/40 max-w-md mx-auto leading-relaxed">
            This staff hub is a static guide and cannot submit applications for you. Copy your answers below and post them in the staff applications channel in Discord so the Management Team can review them.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              onClick={handleCopy}
              className="btn-glow text-white text-sm font-semibold px-6 py-3 rounded-xl inline-flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto"
            >
              {copied ? <><CheckCircle2 size={15} /> Copied</> : <><FileText size={15} /> Copy Application</>}
            </button>
            <a
              href="https://discord.com/channels/1240254671189180416/1241959413397585990"
              target="_blank"
              rel="noopener noreferrer"
              className="glass border border-white/10 text-white/70 hover:text-white px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 min-h-[44px] transition-all hover:border-white/20 w-full sm:w-auto"
            >
              <MessageSquare size={15} />
              Open Discord Channel
            </a>
          </div>

          {error && (
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <AlertCircle size={14} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="mt-6 text-left glass border border-white/8 rounded-2xl p-4 max-h-80 overflow-y-auto scrollbar-thin">
            <pre className="text-[11px] text-white/50 whitespace-pre-wrap font-mono leading-relaxed">{applicationText}</pre>
          </div>
        </div>
      </div>
    );
  }

  const stepComponents = [
    <StepPersonal data={data} setData={setData} />,
    <StepFleet data={data} setData={setData} />,
    <StepExperience data={data} setData={setData} />,
    <StepScenarios data={data} setData={setData} />,
    <StepAvailability data={data} setData={setData} />,
    <StepReview data={data} />,
  ];

  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">

      {/* ── HERO ── */}
      <div className="relative glass-strong border border-white/8 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent pointer-events-none" />
        <div
          className="absolute top-0 right-0 w-80 h-60 pointer-events-none"
          style={{ background: 'radial-gradient(closest-side, rgba(59, 130, 246, 0.10), transparent 100%)' }}
        />
        <div className="relative p-8 sm:p-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Applications Open</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3 leading-tight">
            Nevada State Roleplay<br />
            <span className="text-blue-400">Staff Recruitment</span>
          </h1>
          <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-2xl mb-4">
            Join the Nevada State Roleplay Staff Team and help maintain a professional, immersive, and welcoming roleplay environment.
          </p>
          <p className="text-sm text-white/35 leading-relaxed max-w-2xl mb-7">
            Staff members are responsible for assisting players, enforcing server rules, handling moderation situations, de-escalating conflicts, and helping the community grow. We are looking for dedicated, professional, and community-driven individuals who are committed to maintaining a high-quality experience for every player.
          </p>
          <button
            onClick={scrollToForm}
            className="btn-glow text-white text-sm font-bold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 min-h-[44px]"
          >
            <ClipboardList size={16} />
            Apply Now
            <ChevronRight size={15} className="opacity-70" />
          </button>
        </div>
      </div>

      {/* ── REQUIREMENTS SNAPSHOT + PROCESS (side by side on desktop) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Minimum Requirements */}
        <div className="glass border border-white/8 rounded-2xl p-6">
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-5">Minimum Requirements</p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-green-500/15 border border-green-500/25 flex items-center justify-center flex-shrink-0">
                <Users size={13} className="text-green-400" />
              </div>
              <span className="text-sm text-white/65">13+ Years Old</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Lock size={13} className="text-amber-400" />
              </div>
              <div>
                <span className="text-sm text-amber-300/90 font-medium">Discord 2FA Required</span>
                <p className="text-xs text-white/30 mt-0.5">Applications without 2FA enabled are automatically denied</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Mic size={13} className="text-amber-400" />
              </div>
              <div>
                <span className="text-sm text-amber-300/90 font-medium">Working Microphone Required</span>
                <p className="text-xs text-white/30 mt-0.5">Applications without microphone access are automatically denied</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-green-500/15 border border-green-500/25 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={13} className="text-green-400" />
              </div>
              <span className="text-sm text-white/65">Minimum 1 Day Community Membership</span>
            </li>
          </ul>
        </div>

        {/* Application Process */}
        <div className="glass border border-white/8 rounded-2xl p-6">
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-5">Application Process</p>
          {/* Vertical timeline on mobile, horizontal on desktop */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-0 sm:gap-0">
            {[
              { step: 1, icon: FileText, label: 'Submit Application' },
              { step: 2, icon: Search, label: 'Management Review' },
              { step: 3, icon: MessageSquare, label: 'Staff Interview' },
              { step: 4, icon: CheckCircle2, label: 'Final Decision' },
            ].map((item, i, arr) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="flex sm:flex-col items-start sm:items-center flex-1">
                  {/* Mobile: vertical connector above, Desktop: none */}
                  <div className="flex sm:hidden flex-col items-center mr-4">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-blue-400" />
                    </div>
                    {i < arr.length - 1 && <div className="w-px flex-1 min-h-[28px] bg-white/10 my-1" />}
                  </div>
                  {/* Mobile text */}
                  <div className="flex sm:hidden flex-col pb-5">
                    <span className="text-[9px] font-black text-blue-400/60 uppercase tracking-widest">Step {item.step}</span>
                    <span className="text-sm text-white/65 font-medium mt-0.5">{item.label}</span>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden sm:flex flex-col items-center flex-1 w-full">
                    <div className="flex items-center w-full">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                        <Icon size={14} className="text-blue-400" />
                      </div>
                      {i < arr.length - 1 && <div className="flex-1 h-px bg-white/10 mx-1" />}
                    </div>
                    <div className="mt-2.5 text-center px-1">
                      <span className="text-[9px] font-black text-blue-400/60 uppercase tracking-widest block">Step {item.step}</span>
                      <span className="text-xs text-white/55 font-medium leading-tight mt-0.5 block">{item.label}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── APPLICATION FORM ── */}
      <div id="application-form" className="scroll-mt-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl btn-glow flex items-center justify-center flex-shrink-0">
            <ClipboardList size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">Staff Application Form</h2>
            <p className="text-xs text-white/35 mt-0.5">Complete all sections to submit your application</p>
          </div>
          <span className="ml-auto text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/25 text-green-400">Now Open</span>
        </div>
      </div>

      {/* Step Progress + Form wrapped together */}
      <div className="space-y-4">
      <div className="glass border border-white/5 rounded-2xl p-5">
        <div className="flex items-center justify-between gap-1">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const active = i === currentStep;
            const done = i < currentStep;
            return (
              <div key={step.id} className="flex items-center gap-1 flex-1">
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                    done ? 'btn-glow' : active ? 'bg-blue-500/20 border border-blue-500/40' : 'glass border border-white/10'
                  }`}>
                    <Icon size={15} className={done ? 'text-white' : active ? 'text-blue-400' : 'text-white/25'} />
                  </div>
                  <span className={`text-[9px] font-semibold uppercase tracking-wider text-center hidden md:block leading-tight max-w-[70px] ${active ? 'text-blue-400' : done ? 'text-white/50' : 'text-white/20'}`}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-px flex-1 mx-1 mb-4 md:mb-6 transition-all ${done ? 'bg-blue-500/40' : 'bg-white/8'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="glass-strong border border-white/8 rounded-2xl p-7">
        <div className="flex items-center gap-2 mb-7">
          {(() => { const Icon = steps[currentStep].icon; return <Icon size={17} className="text-blue-400" />; })()}
          <h2 className="text-base font-bold text-white">{steps[currentStep].label}</h2>
          <span className="ml-auto text-xs text-white/25">{currentStep + 1} / {steps.length}</span>
        </div>

        {stepComponents[currentStep]}

        {error && (
          <div className="mt-4 flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            <AlertCircle size={14} className="flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/5">
          <button
            onClick={back}
            disabled={currentStep === 0}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 disabled:opacity-0 transition-all min-h-[44px] px-2"
          >
            <ChevronLeft size={16} />
            Back
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={next}
              className="btn-glow text-white text-sm font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2 min-h-[44px]"
            >
              Continue
              <ChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn-glow text-white text-sm font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2 min-h-[44px]"
            >
              <Zap size={15} />
              Prepare Application
            </button>
          )}
        </div>
      </div>
      </div>{/* end space-y-4 wrapper */}
    </div>
  );
}