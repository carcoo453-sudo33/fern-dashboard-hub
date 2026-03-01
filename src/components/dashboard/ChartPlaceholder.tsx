import { memo } from "react";
import { DashboardCard } from "./DashboardCard";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp } from "lucide-react";

interface ChartPlaceholderProps {
  title: string;
  description?: string;
  type?: "bar" | "line";
}

export const ChartPlaceholder = memo(function ChartPlaceholder({
  title,
  description,
  type = "bar",
}: ChartPlaceholderProps) {
  const Icon = type === "bar" ? BarChart3 : TrendingUp;

  return (
    <DashboardCard
      title={title}
      description={description}
      action={
        <Button variant="outline" size="sm" className="text-muted-foreground border-border hover:bg-secondary">
          Export
        </Button>
      }
    >
      <div className="flex flex-col items-center justify-center h-48 rounded-lg bg-secondary/30 border border-dashed border-border">
        <Icon className="w-10 h-10 text-muted-foreground mb-3" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">Chart visualization</p>
        <p className="text-xs text-muted-foreground mt-1">Data will appear here</p>
      </div>
    </DashboardCard>
  );
});
