import { memo } from "react";
import { DashboardCard } from "./DashboardCard";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  students: number;
  status: "active" | "pending" | "completed" | "draft";
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    instructor: "Sarah Chen",
    progress: 78,
    students: 1240,
    status: "active",
  },
  {
    id: "2",
    title: "TypeScript Masterclass",
    instructor: "Marcus Johnson",
    progress: 45,
    students: 890,
    status: "active",
  },
  {
    id: "3",
    title: "Node.js Fundamentals",
    instructor: "Emily Rodriguez",
    progress: 100,
    students: 2100,
    status: "completed",
  },
  {
    id: "4",
    title: "GraphQL Deep Dive",
    instructor: "David Kim",
    progress: 0,
    students: 0,
    status: "draft",
  },
  {
    id: "5",
    title: "AWS Solutions Architect",
    instructor: "Lisa Thompson",
    progress: 12,
    students: 456,
    status: "pending",
  },
];

const statusLabels: Record<Course["status"], string> = {
  active: "Active",
  pending: "Pending",
  completed: "Completed",
  draft: "Draft",
};

export const RecentCourses = memo(function RecentCourses() {
  return (
    <DashboardCard
      title="Recent Courses"
      description="Your course catalog overview"
      action={
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          View all
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      }
    >
      <div className="space-y-4">
        {mockCourses.map((course, index) => (
          <div
            key={course.id}
            className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="p-2 rounded-lg bg-secondary" aria-hidden="true">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-medium text-foreground truncate">
                  {course.title}
                </h3>
                <span
                  className={cn(
                    "status-badge shrink-0",
                    `status-${course.status}`
                  )}
                >
                  {statusLabels[course.status]}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mt-0.5">
                {course.instructor} · {course.students.toLocaleString()} students
              </p>
              
              {course.status !== "draft" && (
                <div className="mt-2 flex items-center gap-3">
                  <Progress
                    value={course.progress}
                    className="h-1.5 flex-1 bg-secondary"
                  />
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {course.progress}%
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
});
