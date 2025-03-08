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
    <div className="row g-2">
      {functions.map((row, i) => (
        <div key={i} className="col-12">
          <div className="row g-2">
            {row.map((fn, j) => (
              <div key={`${i}-${j}`} className="col-3">
                <button
                  className="btn btn-secondary w-100"
                  onClick={() => onInput(fn)}
                >
                  {fn}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}