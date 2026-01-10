import { memo, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { NotificationsPanel } from "@/components/layout/NotificationsPanel";
import { NewCourseDialog } from "@/components/courses/NewCourseDialog";
import { KPICard } from "@/components/dashboard/KPICard";
import { RecentCourses } from "@/components/dashboard/RecentCourses";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { UpcomingTasks } from "@/components/dashboard/UpcomingTasks";
import { ChartPlaceholder } from "@/components/dashboard/ChartPlaceholder";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { BookOpen, Users, TrendingUp, DollarSign } from "lucide-react";

const Dashboard = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [newCourseOpen, setNewCourseOpen] = useState(false);

  return (
    <>
      <Navbar
        notificationCount={3}
        onNotificationClick={() => setNotificationsOpen(true)}
      />
      
      <NotificationsPanel
        open={notificationsOpen}
        onOpenChange={setNotificationsOpen}
      />
      
      <NewCourseDialog
        open={newCourseOpen}
        onOpenChange={setNewCourseOpen}
      />

      <main className="min-h-screen bg-background pt-24 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <DashboardHeader
            title="Dashboard"
            subtitle="Welcome back! Here's your learning platform overview."
            onNewCourse={() => setNewCourseOpen(true)}
            onNotifications={() => setNotificationsOpen(true)}
          />

          {/* KPI Cards Grid */}
          <section aria-label="Key performance indicators" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KPICard
              title="Total Courses"
              value="48"
              icon={BookOpen}
              trend={{ value: 12, isPositive: true }}
            />
            <KPICard
              title="Active Students"
              value="2,847"
              icon={Users}
              trend={{ value: 8.5, isPositive: true }}
            />
            <KPICard
              title="Completion Rate"
              value="73.2%"
              icon={TrendingUp}
              trend={{ value: 2.3, isPositive: true }}
            />
            <KPICard
              title="Revenue"
              value="$42.5k"
              icon={DollarSign}
              trend={{ value: 4.1, isPositive: false }}
            />
          </section>

          {/* Charts Row */}
          <section aria-label="Analytics charts" className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <ChartPlaceholder
              title="Enrollment Trends"
              description="Monthly student enrollment"
              type="line"
            />
            <ChartPlaceholder
              title="Revenue Overview"
              description="Revenue by course category"
              type="bar"
            />
          </section>

          {/* Main Content Grid */}
          <section aria-label="Dashboard content" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <RecentCourses />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <ActivityFeed />
              <UpcomingTasks />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
