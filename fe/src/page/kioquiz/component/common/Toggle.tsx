export const Toggle = ({
  checked,
  setChecked,
}: {
  checked: boolean;
  setChecked: (checked: boolean) => void;
}) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />

      <div
        className="
          relative w-9 h-5
          bg-neutral-300
          rounded-full
          peer
          after:content-['']
          after:absolute after:top-[2px] after:left-[2px]
          after:h-4 after:w-4 after:rounded-full
          after:bg-white after:transition-all
          peer-checked:bg-[#6EA8C1]
          peer-checked:after:translate-x-4
        "
      />

      <span className="select-none ms-3 text-sm font-medium text-gray-700">
        답 고르고 해설 바로보기
      </span>
    </label>
  );
};
