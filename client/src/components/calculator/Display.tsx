import { Card } from "@/components/ui/card";

interface DisplayProps {
  expression: string;
  result: string;
  memory: number | null;
}

export default function Display({ expression, result, memory }: DisplayProps) {
  return (
    <Card className="mb-4">
      <div className="p-4 space-y-2">
        {memory !== null && (
          <div className="text-sm text-muted-foreground">M = {memory}</div>
        )}
        <div className="text-lg text-muted-foreground min-h-[1.5rem]">
          {expression}
        </div>
        <div className="text-3xl font-bold text-right">{result}</div>
      </div>
    </Card>
  );
}
