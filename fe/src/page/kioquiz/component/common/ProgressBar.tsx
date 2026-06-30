type ProgressBarProps = {
  current: number;
  total: number;
};

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full h-3 bg-[#FFFFFF]/20 rounded-full overflow-hidden">
      <div
        className="
          h-full
          bg-[#9AF09E]
          rounded-full
          transition-all duration-300 ease-out
        "
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};
