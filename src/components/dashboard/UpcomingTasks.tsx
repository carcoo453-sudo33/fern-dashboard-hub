import { memo } from "react";
import { DashboardCard } from "./DashboardCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  dueTime: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Review course submissions",
    dueDate: "Today",
    dueTime: "5:00 PM",
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    title: "Update TypeScript curriculum",
    dueDate: "Tomorrow",
    dueTime: "12:00 PM",
    priority: "medium",
    completed: false,
  },
  {
    id: "3",
    title: "Respond to student queries",
    dueDate: "Today",
    dueTime: "6:00 PM",
    priority: "high",
    completed: true,
  },
  {
    id: "4",
    title: "Prepare weekly analytics report",
    dueDate: "Fri, Jan 12",
    dueTime: "9:00 AM",
    priority: "low",
    completed: false,
  },
];

const priorityStyles: Record<Task["priority"], string> = {
  high: "border-l-destructive",
  medium: "border-l-warning",
  low: "border-l-muted-foreground",
};

export const UpcomingTasks = memo(function UpcomingTasks() {
  return (
    <DashboardCard
      title="Upcoming Tasks"
      description="Your scheduled activities"
      action={
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          View all
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      }
    >
      <div className="space-y-2">
        {mockTasks.map((task, index) => (
          <div
            key={task.id}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border-l-2 hover:bg-secondary/50 transition-colors animate-fade-in",
              priorityStyles[task.priority],
              task.completed && "opacity-60"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              className="mt-0.5 border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
            />
            
            <div className="flex-1 min-w-0">
              <label
                htmlFor={`task-${task.id}`}
                className={cn(
                  "text-sm font-medium text-foreground cursor-pointer",
                  task.completed && "line-through"
                )}
              >
                {task.title}
              </label>
              
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" aria-hidden="true" />
                  {task.dueDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  {task.dueTime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
});
