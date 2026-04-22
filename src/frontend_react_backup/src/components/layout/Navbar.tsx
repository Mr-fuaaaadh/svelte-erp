import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/appStore";
import type { UserRole } from "@/types";
import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  User,
} from "lucide-react";

interface NavbarProps {
  title?: string;
}

const roles: { value: UserRole; label: string }[] = [
  { value: "super_admin", label: "Super Admin" },
  { value: "school_admin", label: "School Admin" },
  { value: "teacher", label: "Teacher" },
  { value: "parent", label: "Parent" },
  { value: "student", label: "Student" },
];

const notifColors = {
  info: "bg-blue-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
};

export default function Navbar({ title }: NavbarProps) {
  const {
    isDarkMode,
    toggleDarkMode,
    toggleSidebar,
    searchQuery,
    setSearchQuery,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    currentRole,
    setCurrentRole,
    unreadCount,
  } = useAppStore();

  const unread = unreadCount();
  const currentRoleLabel =
    roles.find((r) => r.value === currentRole)?.label ?? "Super Admin";

  return (
    <header
      data-ocid="navbar"
      className="h-14 bg-card border-b border-border flex items-center gap-3 px-4 shrink-0 shadow-xs"
    >
      {/* Left */}
      <div className="flex items-center gap-2 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          data-ocid="navbar.sidebar_toggle"
          className="shrink-0"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-4 h-4" />
        </Button>
        {title && (
          <h1 className="text-sm font-semibold text-foreground hidden md:block truncate">
            {title}
          </h1>
        )}
      </div>

      {/* Search */}
      <div className="flex-1 max-w-sm mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search schools, students, leads…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-ocid="navbar.search_input"
            className="pl-9 h-8 text-sm bg-muted/50 border-input/50 focus:bg-background"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 text-[10px] text-muted-foreground bg-muted px-1 rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Role switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              data-ocid="navbar.role_switcher"
              className="h-8 text-xs gap-1 hidden md:flex border-input/50"
            >
              {currentRoleLabel}
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel className="text-xs">
              Switch Role
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {roles.map((role) => (
              <DropdownMenuItem
                key={role.value}
                onClick={() => setCurrentRole(role.value)}
                data-ocid={`navbar.role.${role.value}`}
                className={cn(
                  "text-xs cursor-pointer",
                  currentRole === role.value &&
                    "bg-accent text-accent-foreground",
                )}
              >
                {role.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dark mode */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          data-ocid="navbar.theme_toggle"
          className="w-8 h-8"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              data-ocid="navbar.notifications_button"
              className="w-8 h-8 relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unread}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-80 p-0"
            data-ocid="navbar.notifications.popover"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-sm font-semibold">Notifications</span>
              <button
                type="button"
                onClick={markAllNotificationsRead}
                data-ocid="navbar.notifications.mark_all_read"
                className="text-xs text-accent hover:underline"
              >
                Mark all read
              </button>
            </div>
            <ScrollArea className="h-80">
              {notifications.slice(0, 8).map((notif) => (
                <button
                  key={notif.id}
                  type="button"
                  onClick={() => markNotificationRead(notif.id)}
                  data-ocid={`navbar.notification.${notif.id}`}
                  className={cn(
                    "w-full text-left px-4 py-3 border-b border-border/50 hover:bg-muted/50 transition-colors",
                    !notif.read && "bg-accent/5",
                  )}
                >
                  <div className="flex gap-3 items-start">
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full mt-1.5 shrink-0",
                        notifColors[notif.type],
                      )}
                    />
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "text-xs font-semibold truncate",
                          !notif.read && "text-foreground",
                        )}
                      >
                        {notif.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {notif.message}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(notif.timestamp), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </ScrollArea>
          </PopoverContent>
        </Popover>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              data-ocid="navbar.user_menu"
              className="w-8 h-8"
              aria-label="User menu"
            >
              <Avatar className="w-7 h-7">
                <AvatarFallback className="bg-accent text-accent-foreground text-[10px] font-bold">
                  SP
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <p className="text-xs font-semibold">Suresh Prasad</p>
              <p className="text-xs text-muted-foreground font-normal">
                suresh@aipsa.edu.in
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              data-ocid="navbar.profile_link"
              className="text-xs cursor-pointer"
            >
              <User className="w-3 h-3 mr-2" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              data-ocid="navbar.settings_link"
              className="text-xs cursor-pointer"
            >
              <Settings className="w-3 h-3 mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              data-ocid="navbar.logout_button"
              className="text-xs text-destructive cursor-pointer focus:text-destructive"
            >
              <LogOut className="w-3 h-3 mr-2" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
