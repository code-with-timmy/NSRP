import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { BookOpen, Terminal, ArrowRight, Zap } from 'lucide-react';
import { icons } from '@/components/layout/staffIcons';

const quickLinks = [
  { label: 'Staff Guide', path: '/staff-guide', icon: icons.staffGuide, desc: 'Onboarding & general expectations', color: 'from-blue-600/20 to-blue-500/5' },
  { label: 'In-Game Rules', path: '/in-game-rules', icon: icons.inGameRules, desc: 'ER:LC violations & punishment tiers', color: 'from-red-600/20 to-red-500/5' },
  { label: 'Moderator Rules', path: '/moderator-rules', icon: icons.moderatorRules, desc: 'Rules for Trial Mods & Moderators', color: 'from-green-600/20 to-green-500/5' },
  { label: 'Administration Rules', path: '/administration-rules', icon: icons.administrationRules, desc: 'Admin+ policies & expectations', color: 'from-purple-600/20 to-purple-500/5' },
  { label: 'Server Rules', path: '/server-rules', icon: icons.serverRules, desc: 'Official Nevada State Roleplay rules', color: 'from-cyan-600/20 to-cyan-500/5' },
  { label: 'Training Info', path: '/training-information', icon: icons.trainingInfo, desc: 'Training procedures & requirements', color: 'from-yellow-600/20 to-yellow-500/5' },
  { label: 'Staff Commands', path: '/staff-commands', icon: icons.staffCommands, desc: 'In-game command reference', color: 'from-indigo-600/20 to-indigo-500/5' },
  { label: 'Applications', path: '/application-information', icon: icons.staffApplications, desc: 'How to apply for staff roles', color: 'from-pink-600/20 to-pink-500/5' },
  { label: 'FAQ', path: '/faq', icon: icons.faq, desc: 'Common questions answered', color: 'from-teal-600/20 to-teal-500/5' },
];

export default function Home() {
  const heroRef = useRef(null);
  const bannerRef = useRef(null);
  const frameRef = useRef(0);
  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // The banner tilt is written straight to the DOM, at most once per frame,
  // instead of through React state. Previously every mouse move re-rendered the
  // entire page — hero plus all nine quick-link cards — which made the top of
  // the page stutter.
  const handleMouseMove = (e) => {
    if (reducedMotion.current || frameRef.current) return;
    const { clientX, clientY } = e;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      const hero = heroRef.current;
      const banner = bannerRef.current;
      if (!hero || !banner) return;
      const rect = hero.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((clientY - rect.top) / rect.height - 0.5) * 2;
      banner.style.transform = `scale(1.05) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;
    });
  };

  const handleMouseLeave = () => {
    if (bannerRef.current) bannerRef.current.style.transform = 'scale(1.05)';
  };

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative glass-strong border border-white/5 rounded-3xl overflow-hidden p-8 lg:p-12"
        style={{ perspective: '1000px' }}
      >
        {/* Nevada Vegas Strong banner */}
        <div
          ref={bannerRef}
          className="absolute inset-[-8%] bg-no-repeat"
          style={{
            backgroundImage: 'url(https://media.base44.com/images/public/6a1559683a239521f5263a7b/3d6d0c4af_nevadavegasstrong.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.30,
            transform: 'scale(1.05)',
            transition: 'transform 0.3s ease-out',
            maskImage: 'radial-gradient(ellipse 90% 80% at 60% 50%, black 30%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 60% 50%, black 30%, transparent 100%)',
          }}
        />
        {/* Edge fade vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070710]/90 via-transparent to-[#070710]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070710]/60 via-transparent to-[#070710]/70" />
        {/* Glass distortion layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 via-transparent to-blue-900/10" />
        <div
          className="absolute top-0 right-0 w-96 h-64 pointer-events-none"
          style={{ background: 'radial-gradient(closest-side, rgba(59, 130, 246, 0.10), transparent 100%)' }}
        />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-green-400 uppercase tracking-widest">Server Online</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-none mb-3">
            Nevada State Roleplay
          </h1>
          <p className="text-lg lg:text-xl font-bold text-blue-400 mb-4 glow-text">Staff Hub</p>
          <p className="text-sm text-white/40 max-w-lg leading-relaxed mb-6">
            Your complete reference for staff policies, rules, commands, and guides. Everything you need to keep Nevada State Roleplay safe and professional.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <Link to="/staff-guide" className="btn-glow text-white text-sm font-semibold px-5 py-2.5 rounded-xl inline-flex items-center gap-2">
              <BookOpen size={15} />
              Read Staff Guide
            </Link>
            <Link to="/staff-commands" className="glass border border-white/10 text-white/70 hover:text-white text-sm font-medium px-5 py-2.5 rounded-xl inline-flex items-center gap-2 transition-all hover:border-white/20">
              <Terminal size={15} />
              Staff Commands
            </Link>
          </div>
        </div>
      </div>

      {/* Melonly Quick Access */}
      <div className="glass border border-blue-500/15 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <img
          src="https://media.base44.com/images/public/6a1559683a239521f5263a7b/42a988b6a_melonlyLogo.png"
          alt="Melonly"
          loading="lazy"
          decoding="async"
          className="w-8 h-8 object-contain flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white leading-none mb-0.5">Melonly</p>
          <p className="text-xs text-white/40 leading-snug">Official moderation management platform used by all Nevada State Roleplay staff members.</p>
        </div>
        <a
          href="https://melon.ly/join/RCCXFP"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow text-white text-xs font-semibold px-4 py-2 rounded-xl inline-flex items-center gap-1.5 flex-shrink-0 whitespace-nowrap"
        >
          Open Melonly
        </a>
      </div>

      {/* Quick Navigation */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-blue-400" />
          <h2 className="text-base font-bold text-white">Quick Navigation</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="glass border border-white/5 rounded-2xl p-4 card-hover group"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl glass border border-white/5 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{link.label}</div>
                    <div className="text-xs text-white/35 mt-0.5 leading-snug">{link.desc}</div>
                  </div>
                  <ArrowRight size={14} className="text-white/15 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}