import { memo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Search,
  Bell,
  Menu,
  Leaf,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Students", href: "/students" },
  { label: "Analytics", href: "/analytics" },
];

interface NavbarProps {
  notificationCount?: number;
  onNotificationClick?: () => void;
}

export const Navbar = memo(function Navbar({
  notificationCount = 3,
  onNotificationClick,
}: NavbarProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="navbar w-[calc(100%-2rem)] max-w-5xl" role="navigation" aria-label="Main navigation">
      <div className="flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-foreground font-semibold shrink-0"
          aria-label="LearnHub Home"
        >
          <div className="p-1.5 rounded-lg bg-primary/20">
            <Leaf className="w-5 h-5 text-primary" />
          </div>
          <span className="hidden sm:inline">LearnHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "navbar-link",
                isActive(item.href) && "navbar-link-active"
              )}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className={cn(
            "relative transition-all duration-200",
            searchFocused ? "w-48" : "w-36"
          )}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-9 h-9 bg-secondary/50 border-border text-sm"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              aria-label="Search courses and content"
            />
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            onClick={onNotificationClick}
            aria-label={`Notifications, ${notificationCount} unread`}
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="notification-dot" aria-hidden="true" />
            )}
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card border-border w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-foreground">
                  <Leaf className="w-5 h-5 text-primary" />
                  LearnHub
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-2" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
});
