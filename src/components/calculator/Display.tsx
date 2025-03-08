interface DisplayProps {
  expression: string;
  result: string;
  memory: number | null;
}

export default function Display({ expression, result, memory }: DisplayProps) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        {memory !== null && (
          <div className="small text-muted">M = {memory}</div>
        )}
        <div className="fs-5 text-muted min-vh-1">
          {expression}
        </div>
        <div className="fs-1 fw-bold text-end">
          {result}
        </div>
      </div>
    </div>
  );
}