import { memo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  DollarSign,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCard {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
}

const metrics: MetricCard[] = [
  { title: "Total Revenue", value: "$124,500", change: 12.5, icon: DollarSign },
  { title: "New Students", value: "1,247", change: 8.3, icon: Users },
  { title: "Course Sales", value: "3,892", change: -2.4, icon: BookOpen },
  { title: "Completion Rate", value: "73.2%", change: 5.1, icon: TrendingUp },
];

const AnalyticsPage = memo(function AnalyticsPage() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-background pt-24 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                Analytics
              </h1>
              <p className="text-muted-foreground mt-1">
                Track your platform performance and growth
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Select defaultValue="30d">
                <SelectTrigger className="w-40 bg-secondary/50 border-border">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-border">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </header>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              const isPositive = metric.change > 0;

              return (
                <DashboardCard
                  key={metric.title}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` } as React.CSSProperties}
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-lg bg-primary/15">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div
                      className={cn(
                        "flex items-center text-sm font-medium",
                        isPositive ? "text-success" : "text-destructive"
                      )}
                    >
                      {isPositive ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {Math.abs(metric.change)}%
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      {metric.value}
                    </p>
                  </div>
                </DashboardCard>
              );
            })}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <DashboardCard
              title="Revenue Over Time"
              description="Monthly revenue breakdown"
              action={
                <Button variant="outline" size="sm" className="border-border">
                  View Report
                </Button>
              }
            >
              <div className="h-64 flex items-center justify-center rounded-lg bg-secondary/30 border border-dashed border-border">
                <div className="text-center">
                  <TrendingUp className="w-10 h-10 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Line chart visualization</p>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard
              title="Enrollment Distribution"
              description="Students by course category"
              action={
                <Button variant="outline" size="sm" className="border-border">
                  View Report
                </Button>
              }
            >
              <div className="h-64 flex items-center justify-center rounded-lg bg-secondary/30 border border-dashed border-border">
                <div className="text-center">
                  <BarChart3 className="w-10 h-10 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Bar chart visualization</p>
                </div>
              </div>
            </DashboardCard>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <DashboardCard
              title="Top Performing Courses"
              description="By revenue this period"
              className="lg:col-span-2"
            >
              <div className="space-y-4">
                {[
                  { name: "Advanced React Patterns", revenue: "$12,450", students: 245 },
                  { name: "TypeScript Masterclass", revenue: "$9,800", students: 189 },
                  { name: "Node.js Fundamentals", revenue: "$8,200", students: 312 },
                  { name: "AWS Solutions Architect", revenue: "$7,650", students: 156 },
                ].map((course, index) => (
                  <div
                    key={course.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground w-6">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{course.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {course.students} students
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-primary">{course.revenue}</span>
                  </div>
                ))}
              </div>
            </DashboardCard>

            <DashboardCard
              title="Quick Stats"
              description="Platform overview"
            >
              <div className="space-y-4">
                {[
                  { label: "Avg. Session Duration", value: "24 min" },
                  { label: "Course Completion", value: "68%" },
                  { label: "Student Retention", value: "82%" },
                  { label: "Instructor Rating", value: "4.7/5" },
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <span className="font-medium text-foreground">{stat.value}</span>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>
        </div>
      </main>
    </>
  );
});

export default AnalyticsPage;
