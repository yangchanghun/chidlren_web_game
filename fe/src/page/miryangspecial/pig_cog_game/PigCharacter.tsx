interface PigCharacterProps {
  size?: number;
  className?: string;
}

const PigCharacter = ({ size = 48, className = "" }: PigCharacterProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={`animate-float ${className}`}
    >
      {/* Body */}
      <ellipse cx="32" cy="38" rx="20" ry="18" fill="hsl(350 65% 75%)" />

      {/* Head */}
      <circle cx="32" cy="26" r="18" fill="hsl(350 65% 78%)" />

      {/* Left ear */}
      <ellipse cx="18" cy="12" rx="6" ry="8" fill="hsl(350 65% 75%)" />
      <ellipse cx="18" cy="12" rx="4" ry="5" fill="hsl(350 50% 85%)" />

      {/* Right ear */}
      <ellipse cx="46" cy="12" rx="6" ry="8" fill="hsl(350 65% 75%)" />
      <ellipse cx="46" cy="12" rx="4" ry="5" fill="hsl(350 50% 85%)" />

      {/* Snout */}
      <ellipse cx="32" cy="30" rx="10" ry="7" fill="hsl(350 50% 85%)" />

      {/* Nostrils */}
      <ellipse cx="28" cy="30" rx="2" ry="2.5" fill="hsl(350 40% 55%)" />
      <ellipse cx="36" cy="30" rx="2" ry="2.5" fill="hsl(350 40% 55%)" />

      {/* Left eye */}
      <circle cx="24" cy="22" r="4" fill="white" />
      <circle cx="25" cy="22" r="2.5" fill="hsl(25 30% 20%)" />
      <circle cx="26" cy="21" r="1" fill="white" />

      {/* Right eye */}
      <circle cx="40" cy="22" r="4" fill="white" />
      <circle cx="41" cy="22" r="2.5" fill="hsl(25 30% 20%)" />
      <circle cx="42" cy="21" r="1" fill="white" />

      {/* Cheeks */}
      <ellipse
        cx="18"
        cy="28"
        rx="4"
        ry="3"
        fill="hsl(350 70% 80%)"
        opacity="0.6"
      />
      <ellipse
        cx="46"
        cy="28"
        rx="4"
        ry="3"
        fill="hsl(350 70% 80%)"
        opacity="0.6"
      />

      {/* Feet */}
      <ellipse cx="22" cy="54" rx="5" ry="4" fill="hsl(350 50% 70%)" />
      <ellipse cx="42" cy="54" rx="5" ry="4" fill="hsl(350 50% 70%)" />
    </svg>
  );
};

export default PigCharacter;
