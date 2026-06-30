import PigCharacter from "./PigCharacter";
import { TreeIcon, HouseIcon, AppleIcon, PondIcon } from "./DestinationIcons";

export type CellType = "empty" | "start" | "tree" | "house" | "apple" | "pond";

interface PathGridProps {
  grid: CellType[][];
  selectedDestination: CellType | null;
  correctAnswer: CellType;
  showResult: boolean;
  onSelectDestination: (destination: CellType) => void;
}

const PathGrid = ({
  grid,
  selectedDestination,
  correctAnswer,
  showResult,
  onSelectDestination,
}: PathGridProps) => {
  const getDestinationClass = (cell: CellType) => {
    if (!showResult) {
      return selectedDestination === cell ? "destination-button-selected" : "";
    }

    if (cell === correctAnswer) return "destination-button-correct";
    if (selectedDestination === cell && cell !== correctAnswer)
      return "destination-button-wrong";

    return "";
  };

  return (
    <div className="relative bg-game-grass rounded-3xl p-4 shadow-inner">
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${grid[0].length}, 1fr)` }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className="aspect-square flex items-center justify-center rounded-lg"
              style={{ minWidth: 48, minHeight: 48 }}
            >
              {cell === "start" && <PigCharacter size={44} />}

              {cell !== "empty" && cell !== "start" && (
                <button
                  onClick={() => !showResult && onSelectDestination(cell)}
                  className={`destination-button ${getDestinationClass(cell)}`}
                  disabled={showResult}
                >
                  {cell === "tree" && <TreeIcon size={56} />}
                  {cell === "house" && <HouseIcon size={56} />}
                  {cell === "apple" && <AppleIcon size={56} />}
                  {cell === "pond" && <PondIcon size={56} />}
                </button>
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default PathGrid;
