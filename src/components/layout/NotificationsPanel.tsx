import { memo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  UserPlus,
  BookCheck,
  Award,
  MessageSquare,
  AlertCircle,
  Check,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Notification {
  id: string;
  type: "enrollment" | "completion" | "achievement" | "comment" | "alert";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "enrollment",
    title: "New Enrollments",
    description: "12 students enrolled in React Patterns",
    timestamp: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "completion",
    title: "Course Milestone",
    description: "Node.js Fundamentals reached 100% completion",
    timestamp: "15 min ago",
    read: false,
  },
  {
    id: "3",
    type: "achievement",
    title: "Achievement Unlocked",
    description: "TypeScript course passed 500 completions",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "4",
    type: "comment",
    title: "New Review",
    description: "5-star review on AWS Solutions course",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "alert",
    title: "System Alert",
    description: "Platform maintenance scheduled for Sunday 2AM",
    timestamp: "5 hours ago",
    read: true,
  },
];

const notificationIcons: Record<Notification["type"], LucideIcon> = {
  enrollment: UserPlus,
  completion: BookCheck,
  achievement: Award,
  comment: MessageSquare,
  alert: AlertCircle,
};

const notificationColors: Record<Notification["type"], string> = {
  enrollment: "text-info",
  completion: "text-success",
  achievement: "text-warning",
  comment: "text-primary",
  alert: "text-destructive",
};

interface NotificationsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NotificationsPanel = memo(function NotificationsPanel({
  open,
  onOpenChange,
}: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="bg-card border-border w-96 p-0">
        <SheetHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-foreground">
              <Bell className="w-5 h-5" />
              Notifications
              {unreadCount > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-medium bg-destructive/20 text-destructive rounded-full">
                  {unreadCount}
                </span>
              )}
            </SheetTitle>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                <Check className="w-3 h-3 mr-1" />
                Mark all read
              </Button>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="p-4 space-y-2">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">No notifications</p>
                <p className="text-sm text-muted-foreground/70">
                  You're all caught up!
                </p>
              </div>
            ) : (
              notifications.map((notification, index) => {
                const Icon = notificationIcons[notification.type];
                const iconColor = notificationColors[notification.type];

                return (
                  <div
                    key={notification.id}
                    className={cn(
                      "group relative p-4 rounded-lg transition-colors animate-fade-in",
                      notification.read
                        ? "bg-secondary/20"
                        : "bg-secondary/50 border-l-2 border-primary"
                    )}
                    style={{ animationDelay: `${index * 30}ms` }}
                    onClick={() => markAsRead(notification.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") markAsRead(notification.id);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="p-2 rounded-lg bg-secondary shrink-0"
                        aria-hidden="true"
                      >
                        <Icon className={cn("w-4 h-4", iconColor)} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-sm font-medium text-foreground">
                            {notification.title}
                          </h3>
                          <time className="text-xs text-muted-foreground shrink-0">
                            {notification.timestamp}
                          </time>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {notification.description}
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        aria-label="Delete notification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
});
