
import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface SuggestionCardProps {
  title: string;
  before: string;
  after: string;
  explanation: string;
  icon: React.ReactNode;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({
  title,
  before,
  after,
  explanation,
  icon,
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b flex items-center gap-2">
        {icon}
        <h4 className="font-medium text-sm">{title}</h4>
      </div>
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Original:</p>
          <p className="text-sm bg-secondary/50 p-2 rounded">{before}</p>
        </div>
        <div className="flex justify-center">
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Mejorado:</p>
          <p className="text-sm bg-primary/10 p-2 rounded border border-primary/20">{after}</p>
        </div>
        <div className="pt-2">
          <p className="text-xs text-muted-foreground">{explanation}</p>
        </div>
      </div>
    </Card>
  );
};

export default SuggestionCard;
