import { memo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  Search,
  Filter,
  Mail,
  BookOpen,
  Award,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: number;
  completedCourses: number;
  progress: number;
  status: "active" | "inactive" | "pending";
  joinedAt: string;
}

const students: Student[] = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex.t@example.com",
    enrolledCourses: 5,
    completedCourses: 3,
    progress: 78,
    status: "active",
    joinedAt: "Jan 15, 2024",
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria.g@example.com",
    enrolledCourses: 3,
    completedCourses: 2,
    progress: 92,
    status: "active",
    joinedAt: "Feb 3, 2024",
  },
  {
    id: "3",
    name: "James Wilson",
    email: "james.w@example.com",
    enrolledCourses: 7,
    completedCourses: 4,
    progress: 65,
    status: "active",
    joinedAt: "Dec 20, 2023",
  },
  {
    id: "4",
    name: "Sarah Chen",
    email: "sarah.c@example.com",
    enrolledCourses: 2,
    completedCourses: 0,
    progress: 15,
    status: "pending",
    joinedAt: "Mar 8, 2024",
  },
  {
    id: "5",
    name: "David Kim",
    email: "david.k@example.com",
    enrolledCourses: 4,
    completedCourses: 4,
    progress: 100,
    status: "active",
    joinedAt: "Nov 12, 2023",
  },
  {
    id: "6",
    name: "Emily Brown",
    email: "emily.b@example.com",
    enrolledCourses: 1,
    completedCourses: 0,
    progress: 0,
    status: "inactive",
    joinedAt: "Jan 28, 2024",
  },
];

const statusStyles: Record<Student["status"], string> = {
  active: "status-active",
  inactive: "status-draft",
  pending: "status-pending",
};

const statusLabels: Record<Student["status"], string> = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
};

const StudentsPage = memo(function StudentsPage() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-background px-4 pb-4 pt-28 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                Students
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage student enrollments and progress
              </p>
            </div>
            
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Users className="w-4 h-4 mr-2" />
              Invite Students
            </Button>
          </header>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <DashboardCard className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/15">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-foreground">2,847</p>
              </div>
            </DashboardCard>
            <DashboardCard className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/15">
                <BookOpen className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Courses</p>
                <p className="text-2xl font-bold text-foreground">3.4</p>
              </div>
            </DashboardCard>
            <DashboardCard className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-warning/15">
                <Award className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold text-foreground">68%</p>
              </div>
            </DashboardCard>
          </div>

          {/* Filters */}
          <DashboardCard className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-9 bg-secondary/50 border-border"
                />
              </div>
              <Button variant="outline" className="border-border">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </DashboardCard>

          {/* Student List */}
          <DashboardCard>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Student
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                      Courses
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">
                      Progress
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student.id}
                      className="border-b border-border/50 hover:bg-secondary/30 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-secondary text-foreground text-sm">
                              {student.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">
                              {student.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 hidden sm:table-cell">
                        <div className="text-sm">
                          <span className="text-foreground font-medium">
                            {student.completedCourses}
                          </span>
                          <span className="text-muted-foreground">
                            {" / "}{student.enrolledCourses} courses
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {student.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={cn("status-badge", statusStyles[student.status])}>
                          {statusLabels[student.status]}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-card border-border">
                            <DropdownMenuItem className="cursor-pointer">
                              <Mail className="w-4 h-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <ChevronRight className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashboardCard>
        </div>
      </main>
    </>
  );
});

export default StudentsPage;
