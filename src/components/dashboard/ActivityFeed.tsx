import { memo } from "react";
import { DashboardCard } from "./DashboardCard";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  UserPlus,
  BookCheck,
  Award,
  MessageSquare,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Activity {
  id: string;
  type: "enrollment" | "completion" | "achievement" | "comment" | "notification";
  title: string;
  description: string;
  timestamp: string;
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "enrollment",
    title: "New Enrollment",
    description: "12 students enrolled in React Patterns",
    timestamp: "2 min ago",
  },
  {
    id: "2",
    type: "completion",
    title: "Course Completed",
    description: "Node.js Fundamentals reached 100%",
    timestamp: "15 min ago",
  },
  {
    id: "3",
    type: "achievement",
    title: "Milestone Reached",
    description: "TypeScript course passed 500 completions",
    timestamp: "1 hour ago",
  },
  {
    id: "4",
    type: "comment",
    title: "New Review",
    description: "5-star review on AWS Solutions course",
    timestamp: "3 hours ago",
  },
  {
    id: "5",
    type: "notification",
    title: "System Update",
    description: "Platform maintenance scheduled for Sunday",
    timestamp: "5 hours ago",
  },
];

const activityIcons: Record<Activity["type"], LucideIcon> = {
  enrollment: UserPlus,
  completion: BookCheck,
  achievement: Award,
  comment: MessageSquare,
  notification: Bell,
};

const activityColors: Record<Activity["type"], string> = {
  enrollment: "text-info",
  completion: "text-success",
  achievement: "text-warning",
  comment: "text-primary",
  notification: "text-muted-foreground",
};

export const ActivityFeed = memo(function ActivityFeed() {
  return (
    <DashboardCard
      title="Recent Activity"
      description="Latest platform updates"
      action={
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          View all
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      }
    >
      <div className="space-y-1">
        {mockActivities.map((activity, index) => {
          const Icon = activityIcons[activity.type];
          const iconColor = activityColors[activity.type];
          
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className="p-2 rounded-lg bg-secondary/50 shrink-0"
                aria-hidden="true"
              >
                <Icon className={cn("w-4 h-4", iconColor)} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-medium text-foreground">
                    {activity.title}
                  </h3>
                  <time className="text-xs text-muted-foreground shrink-0">
                    {activity.timestamp}
                  </time>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5 truncate">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
});
