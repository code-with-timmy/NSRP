export default function ActivityCard({ role, hours, desc, palette }) {
  return (
    <div className={`glass border ${palette.border} ${palette.glow} rounded-2xl p-5 transition-[transform,border-color] duration-200 hover:-translate-y-0.5`}>
      <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${palette.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${palette.dot}`} />
          {role}
        </span>
        <span className={`text-sm font-black ${palette.text}`}>{hours}</span>
      </div>
      <p className="text-sm text-white/55 leading-relaxed">{desc}</p>
    </div>
  );
}