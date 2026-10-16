export default function PageHeader({ title, subtitle, icon: Icon, badge, className = 'mb-8' }) {
  return (
    <div className={className}>
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="w-12 h-12 rounded-2xl btn-glow flex items-center justify-center flex-shrink-0 mt-1">
            <Icon size={22} className="text-white" />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{title}</h1>
            {badge && (
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-white/40 mt-1.5 leading-relaxed max-w-2xl">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="mt-5 h-px bg-gradient-to-r from-blue-500/30 via-white/5 to-transparent" />
    </div>
  );
}