import type { ReactNode } from "react";

type BackgroundProps = {
  children: ReactNode;
};

export const Background = ({ children }: BackgroundProps) => {
  return (
    <div
      className="
        relative
        min-h-screen
        w-full
        flex
        items-center
        justify-center
        px-4
        bg-gradient-to-b
        from-[#FFFFFF]
        to-[#0F0404]
        overflow-hidden
      "
    >
      {/* SVG 배경 */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/Pattern.svg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* 중앙 카드 */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-[420px]
          sm:max-w-[480px]
          md:max-w-[540px]
          h-screen
          rounded-xl
          bg-[#040303]/30
          flex
        "
      >
        {children}
      </div>
    </div>
  );
};
