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
    <div className="row g-2">
      {keys.map((row, i) => (
        <div key={i} className="col-12">
          <div className="row g-2">
            {row.map((key, j) => (
              <div key={`${i}-${j}`} className="col-3">
                <button
                  className={`btn ${/[0-9.]/.test(key) ? 'btn-outline-secondary' : 'btn-secondary'} w-100`}
                  onClick={() => onInput(key)}
                >
                  {key}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}