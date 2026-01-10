import { memo } from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const KPICard = memo(function KPICard({
  title,
  value,
  icon: Icon,
  trend,
  className,
}: KPICardProps) {
  return (
    <article
      className={cn("kpi-card animate-fade-in", className)}
      aria-label={`${title}: ${value}`}
    >
      <div className="kpi-icon" aria-hidden="true">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="kpi-label">{title}</p>
        <p className="kpi-value">{value}</p>
        {trend && (
          <div
            className={cn(
              "kpi-trend",
              trend.isPositive ? "kpi-trend-up" : "kpi-trend-down"
            )}
          >
            {trend.isPositive ? (
              <TrendingUp className="w-3 h-3" aria-hidden="true" />
            ) : (
              <TrendingDown className="w-3 h-3" aria-hidden="true" />
            )}
            <span>
              {trend.isPositive ? "+" : ""}
              {trend.value}% from last month
            </span>
          </div>
        )}
      </div>
    </article>
  );
});
