import { memo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Filter,
  Search,
  Plus,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  students: number;
  rating: number;
  progress: number;
  status: "active" | "draft" | "archived";
  thumbnail?: string;
  duration: string;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    instructor: "Sarah Chen",
    category: "Development",
    students: 1240,
    rating: 4.8,
    progress: 78,
    status: "active",
    duration: "12h 30m",
  },
  {
    id: "2",
    title: "TypeScript Masterclass",
    instructor: "Marcus Johnson",
    category: "Development",
    students: 890,
    rating: 4.9,
    progress: 45,
    status: "active",
    duration: "18h 15m",
  },
  {
    id: "3",
    title: "Node.js Fundamentals",
    instructor: "Emily Rodriguez",
    category: "Backend",
    students: 2100,
    rating: 4.7,
    progress: 100,
    status: "active",
    duration: "8h 45m",
  },
  {
    id: "4",
    title: "GraphQL Deep Dive",
    instructor: "David Kim",
    category: "API",
    students: 0,
    rating: 0,
    progress: 0,
    status: "draft",
    duration: "10h 00m",
  },
  {
    id: "5",
    title: "AWS Solutions Architect",
    instructor: "Lisa Thompson",
    category: "Cloud",
    students: 456,
    rating: 4.6,
    progress: 12,
    status: "active",
    duration: "24h 00m",
  },
  {
    id: "6",
    title: "Docker & Kubernetes",
    instructor: "James Wilson",
    category: "DevOps",
    students: 678,
    rating: 4.5,
    progress: 67,
    status: "active",
    duration: "15h 30m",
  },
];

const statusLabels: Record<Course["status"], string> = {
  active: "Active",
  draft: "Draft",
  archived: "Archived",
};

const CoursesPage = memo(function CoursesPage() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-background px-4 pb-4 pt-28 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                Courses
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage and organize your course catalog
              </p>
            </div>
            
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Course
            </Button>
          </header>

          {/* Filters */}
          <DashboardCard className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  className="pl-9 bg-secondary/50 border-border"
                />
              </div>
              <Button variant="outline" className="border-border">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </DashboardCard>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course, index) => (
              <DashboardCard
                key={course.id}
                interactive
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` } as React.CSSProperties}
              >
                {/* Thumbnail placeholder */}
                <div className="aspect-video bg-secondary/50 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-muted-foreground/30" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs text-primary font-medium">
                        {course.category}
                      </span>
                      <h3 className="font-semibold text-foreground mt-1 line-clamp-1">
                        {course.title}
                      </h3>
                    </div>
                    <span
                      className={cn(
                        "status-badge shrink-0",
                        `status-${course.status}`
                      )}
                    >
                      {statusLabels[course.status]}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    by {course.instructor}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                    {course.rating > 0 && (
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        {course.rating}
                      </span>
                    )}
                  </div>

                  {/* Progress */}
                  {course.status !== "draft" && (
                    <div className="flex items-center gap-3">
                      <Progress
                        value={course.progress}
                        className="h-1.5 flex-1 bg-secondary"
                      />
                      <span className="text-xs text-muted-foreground">
                        {course.progress}%
                      </span>
                    </div>
                  )}

                  {/* Action */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between text-muted-foreground hover:text-foreground mt-2"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </DashboardCard>
            ))}
          </div>
        </div>
      </main>
    </>
  );
});

export default CoursesPage;
