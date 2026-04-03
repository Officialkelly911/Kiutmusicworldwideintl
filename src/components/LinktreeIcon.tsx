interface LinktreeIconProps {
  size?: number;
  className?: string;
}

export default function LinktreeIcon({ size = 20, className = "" }: LinktreeIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Linktree"
    >
      {/* Top center node */}
      <circle cx="12" cy="3" r="1.8" />
      {/* Second row: left and right nodes */}
      <circle cx="7" cy="7.5" r="1.8" />
      <circle cx="17" cy="7.5" r="1.8" />
      {/* Lines from top node to second row */}
      <line x1="12" y1="4.8" x2="7" y2="5.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="12" y1="4.8" x2="17" y2="5.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      {/* Third row: left and right nodes */}
      <circle cx="5" cy="12.5" r="1.8" />
      <circle cx="19" cy="12.5" r="1.8" />
      {/* Lines from second row to third row */}
      <line x1="7" y1="9.3" x2="5" y2="10.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="17" y1="9.3" x2="19" y2="10.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      {/* Trunk from top node down */}
      <line x1="12" y1="4.8" x2="12" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      {/* Vertical stem */}
      <line x1="12" y1="14" x2="12" y2="21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
