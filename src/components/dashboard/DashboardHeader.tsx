import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Settings, Plus } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export const DashboardHeader = memo(function DashboardHeader({
  title,
  subtitle,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="border-border hover:bg-secondary"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="border-border hover:bg-secondary"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4" />
        </Button>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Course
        </Button>
      </div>
    </header>
  );
});
