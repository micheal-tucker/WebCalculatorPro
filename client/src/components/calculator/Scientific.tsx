import { Button } from "@/components/ui/button";

interface ScientificProps {
  onInput: (value: string) => void;
}

export default function Scientific({ onInput }: ScientificProps) {
  const functions = [
    ['sin', 'cos', 'tan', 'π'],
    ['asin', 'acos', 'atan', 'e'],
    ['log', 'ln', '√', '^'],
    ['(', ')', '!', '|x|']
  ];

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-4 gap-2">
        {functions.map((row, i) => (
          row.map((fn, j) => (
            <Button
              key={`${i}-${j}`}
              variant="secondary"
              onClick={() => onInput(fn)}
            >
              {fn}
            </Button>
          ))
        ))}
      </div>
    </div>
  );
}
