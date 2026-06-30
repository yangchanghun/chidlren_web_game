import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

type Direction = "up" | "down" | "left" | "right";

interface ArrowSequenceProps {
  arrows: Direction[];
}

const arrowIcons: Record<Direction, React.ReactNode> = {
  up: <ArrowUp className="w-8 h-8" strokeWidth={3} />,
  down: <ArrowDown className="w-8 h-8" strokeWidth={3} />,
  left: <ArrowLeft className="w-8 h-8" strokeWidth={3} />,
  right: <ArrowRight className="w-8 h-8" strokeWidth={3} />,
};

const ArrowSequence = ({ arrows }: ArrowSequenceProps) => {
  return (
    <div className="flex items-center justify-center gap-3 p-4">
      {arrows.map((direction, index) => (
        <div
          key={index}
          className="arrow-button arrow-button-active animate-pop"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {arrowIcons[direction]}
        </div>
      ))}
    </div>
  );
};

export default ArrowSequence;
