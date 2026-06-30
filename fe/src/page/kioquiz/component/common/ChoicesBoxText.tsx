type ChoicesBoxTextProps = {
  label: string;
};
export const ChoicesBoxText = ({ label }: ChoicesBoxTextProps) => {
  return (
    <div className="h-full py-3 font-semibold flex items-center justify-center bg-[#6EA8C1]/55 text-white rounded-xl">
      {label}
    </div>
  );
};
