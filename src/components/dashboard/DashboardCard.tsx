import { memo, ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
  interactive?: boolean;
  style?: CSSProperties;
}

export const DashboardCard = memo(function DashboardCard({
  children,
  className,
  style,
  title,
  description,
  action,
  interactive = false,
}: DashboardCardProps) {
  return (
    <section
      className={cn(
        "dashboard-card",
        interactive && "dashboard-card-interactive cursor-pointer",
        className
      )}
      style={style}
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
