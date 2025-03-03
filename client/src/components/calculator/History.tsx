interface HistoryProps {
  history: { expression: string; result: string }[];
}

export default function History({ history }: HistoryProps) {
  return (
    <div>
      <h3 className="h5 mb-3">History</h3>
      <div className="overflow-auto" style={{ maxHeight: '500px' }}>
        {history.map((entry, index) => (
          <div
            key={index}
            className="p-2 border rounded mb-2"
          >
            <div className="small text-muted">
              {entry.expression}
            </div>
            <div className="fs-5 fw-semibold">
              = {entry.result}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}