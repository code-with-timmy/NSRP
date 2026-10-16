import { rolePalette } from '@/lib/roleColors';

export default function RankBadge({ rank, size = 'sm' }) {
  return (
    <span className={`rank-badge border ${rolePalette(rank).badge} ${size === 'xs' ? 'text-[9px] px-1.5 py-0.5' : ''}`}>
      {rank}
    </span>
  );
}