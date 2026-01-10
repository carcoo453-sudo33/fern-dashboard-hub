import { memo, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
}

export const DashboardCard = memo(function DashboardCard({
  children,
  className,
  title,
  description,
  action,
}: DashboardCardProps) {
  return (
    <section
      className={cn("dashboard-card", className)}
      aria-label={title}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
});
