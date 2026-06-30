interface IconProps {
  size?: number;
  className?: string;
}

export const TreeIcon = ({ size = 48, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    {/* Trunk */}
    <rect x="27" y="40" width="10" height="16" rx="2" fill="hsl(25 50% 40%)" />

    {/* Foliage layers */}
    <ellipse cx="32" cy="18" rx="16" ry="14" fill="hsl(130 45% 50%)" />
    <ellipse cx="26" cy="28" rx="12" ry="10" fill="hsl(130 45% 55%)" />
    <ellipse cx="38" cy="28" rx="12" ry="10" fill="hsl(130 45% 55%)" />
    <ellipse cx="32" cy="32" rx="14" ry="12" fill="hsl(130 45% 60%)" />

    {/* Highlights */}
    <circle cx="26" cy="14" r="4" fill="hsl(130 50% 65%)" opacity="0.7" />
    <circle cx="38" cy="22" r="3" fill="hsl(130 50% 65%)" opacity="0.7" />
  </svg>
);

export const HouseIcon = ({ size = 48, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    {/* Main building */}
    <rect x="12" y="28" width="40" height="28" rx="2" fill="hsl(35 70% 85%)" />

    {/* Roof */}
    <polygon points="32,8 6,28 58,28" fill="hsl(25 70% 55%)" />
    <polygon points="32,12 12,28 52,28" fill="hsl(25 70% 60%)" />

    {/* Door */}
    <rect x="26" y="38" width="12" height="18" rx="1" fill="hsl(25 50% 45%)" />
    <circle cx="35" cy="48" r="1.5" fill="hsl(45 70% 60%)" />

    {/* Windows */}
    <rect x="16" y="34" width="8" height="8" rx="1" fill="hsl(200 60% 75%)" />
    <rect x="40" y="34" width="8" height="8" rx="1" fill="hsl(200 60% 75%)" />

    {/* Window frames */}
    <line
      x1="20"
      y1="34"
      x2="20"
      y2="42"
      stroke="hsl(35 40% 70%)"
      strokeWidth="1"
    />
    <line
      x1="16"
      y1="38"
      x2="24"
      y2="38"
      stroke="hsl(35 40% 70%)"
      strokeWidth="1"
    />
    <line
      x1="44"
      y1="34"
      x2="44"
      y2="42"
      stroke="hsl(35 40% 70%)"
      strokeWidth="1"
    />
    <line
      x1="40"
      y1="38"
      x2="48"
      y2="38"
      stroke="hsl(35 40% 70%)"
      strokeWidth="1"
    />

    {/* Chimney */}
    <rect x="44" y="12" width="8" height="14" rx="1" fill="hsl(0 40% 55%)" />
  </svg>
);

export const AppleIcon = ({ size = 48, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    {/* Main apple body */}
    <ellipse cx="32" cy="38" rx="18" ry="20" fill="hsl(0 70% 55%)" />

    {/* Apple indent at top */}
    <ellipse cx="32" cy="20" rx="6" ry="4" fill="hsl(var(--game-grass))" />

    {/* Highlight */}
    <ellipse
      cx="24"
      cy="32"
      rx="6"
      ry="8"
      fill="hsl(0 70% 65%)"
      opacity="0.6"
    />

    {/* Stem */}
    <rect x="30" y="10" width="4" height="12" rx="2" fill="hsl(25 50% 35%)" />

    {/* Leaf */}
    <ellipse
      cx="40"
      cy="14"
      rx="8"
      ry="4"
      fill="hsl(130 50% 50%)"
      transform="rotate(30 40 14)"
    />
  </svg>
);

export const PondIcon = ({ size = 48, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
    {/* Pond base */}
    <ellipse cx="32" cy="36" rx="26" ry="18" fill="hsl(200 60% 65%)" />

    {/* Water surface */}
    <ellipse cx="32" cy="34" rx="24" ry="16" fill="hsl(200 65% 75%)" />

    {/* Ripples */}
    <ellipse
      cx="24"
      cy="32"
      rx="8"
      ry="4"
      fill="none"
      stroke="hsl(200 50% 85%)"
      strokeWidth="1.5"
    />
    <ellipse
      cx="40"
      cy="36"
      rx="6"
      ry="3"
      fill="none"
      stroke="hsl(200 50% 85%)"
      strokeWidth="1.5"
    />

    {/* Lily pad */}
    <ellipse cx="44" cy="30" rx="6" ry="3" fill="hsl(130 45% 55%)" />
    <path d="M44 30 L44 27" stroke="hsl(130 45% 45%)" strokeWidth="1" />

    {/* Small flower on lily */}
    <circle cx="46" cy="26" r="3" fill="hsl(350 70% 75%)" />
    <circle cx="46" cy="26" r="1.5" fill="hsl(45 80% 65%)" />

    {/* Reeds */}
    <line
      x1="14"
      y1="40"
      x2="14"
      y2="24"
      stroke="hsl(130 40% 45%)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="18"
      y1="38"
      x2="18"
      y2="20"
      stroke="hsl(130 40% 45%)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <ellipse cx="14" cy="22" rx="2" ry="4" fill="hsl(25 40% 50%)" />
    <ellipse cx="18" cy="18" rx="2" ry="4" fill="hsl(25 40% 50%)" />
  </svg>
);
