import { Button } from "@/components/ui/button";

interface KeypadProps {
  onInput: (value: string) => void;
}

export default function Keypad({ onInput }: KeypadProps) {
  const keys = [
    ['MC', 'MR', 'M+', 'M-'],
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '⌫', '=']
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {keys.map((row, i) => (
        row.map((key, j) => (
          <Button
            key={`${i}-${j}`}
            variant={/[0-9.]/.test(key) ? "outline" : "secondary"}
            className={key === '0' ? "col-span-1" : ""}
            onClick={() => onInput(key)}
          >
            {key}
          </Button>
        ))
      ))}
    </div>
  );
}
