import { ScrollArea } from "@/components/ui/scroll-area";

interface HistoryProps {
  history: { expression: string; result: string }[];
}

export default function History({ history }: HistoryProps) {
  return (
    <div>
      <h3 className="font-semibold mb-2">History</h3>
      <ScrollArea className="h-[500px]">
        <div className="space-y-2">
          {history.map((entry, index) => (
            <div
              key={index}
              className="p-2 border rounded-md"
            >
              <div className="text-sm text-muted-foreground">
                {entry.expression}
              </div>
              <div className="text-lg font-semibold">
                = {entry.result}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
