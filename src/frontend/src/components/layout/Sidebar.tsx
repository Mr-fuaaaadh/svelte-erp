import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/appStore";
import type { UserRole } from "@/types";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Baby,
  BarChart3,
  BookOpen,
  Building2,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  GraduationCap,
  LayoutDashboard,
  School,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  roles: UserRole[];
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
        roles: ["super_admin", "school_admin"],
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        label: "Schools",
        path: "/schools",
        icon: School,
        roles: ["super_admin"],
      },
      {
        label: "Students",
        path: "/students",
        icon: GraduationCap,
        roles: ["super_admin", "school_admin", "teacher"],
      },
      {
        label: "Teachers",
        path: "/teachers",
        icon: Users,
        roles: ["super_admin", "school_admin"],
      },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "CRM", path: "/crm", icon: TrendingUp, roles: ["super_admin"] },
      {
        label: "Finance",
        path: "/finance",
        icon: DollarSign,
        roles: ["super_admin", "school_admin"],
      },
      {
        label: "Analytics",
        path: "/analytics",
        icon: BarChart3,
        roles: ["super_admin", "school_admin"],
      },
    ],
  },
  {
    title: "Portals",
    items: [
      {
        label: "Parent Portal",
        path: "/portal/parent",
        icon: Baby,
        roles: ["super_admin", "school_admin", "parent"],
      },
      {
        label: "Student Portal",
        path: "/portal/student",
        icon: BookOpen,
        roles: ["super_admin", "school_admin", "student", "teacher"],
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Settings",
        path: "/settings",
        icon: Settings,
        roles: ["super_admin", "school_admin"],
      },
    ],
  },
];

const roleLabels: Record<UserRole, string> = {
  super_admin: "Super Admin",
  school_admin: "School Admin",
  teacher: "Teacher",
  parent: "Parent",
  student: "Student",
};

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, currentRole } = useAppStore();
  const location = useLocation();

  const visibleGroups = navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.roles.includes(currentRole)),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <aside
      data-ocid="sidebar"
      className={cn(
        "flex flex-col shrink-0 bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out relative z-20",
        sidebarCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-5 border-b border-sidebar-border",
          sidebarCollapsed && "justify-center px-0",
        )}
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent shrink-0">
          <Building2 className="w-5 h-5 text-accent-foreground" />
        </div>
        {!sidebarCollapsed && (
          <div className="min-w-0">
            <p className="font-display font-bold text-sm text-sidebar-foreground leading-tight">
              AIPSA ERP
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Enterprise Platform
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {visibleGroups.map((group) => (
          <div key={group.title} className="mb-4">
            {!sidebarCollapsed && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-3 mb-1">
                {group.title}
              </p>
            )}
            {group.items.map((item) => {
              const isActive =
                location.pathname === item.path ||
                location.pathname.startsWith(`${item.path}/`);
              const Icon = item.icon;

              const linkEl = (
                <Link
                  key={item.path}
                  to={item.path}
                  data-ocid={`sidebar.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group",
                    sidebarCollapsed && "justify-center px-0 w-10 mx-auto",
                    isActive
                      ? "bg-accent text-accent-foreground shadow-glass-subtle"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "shrink-0",
                      sidebarCollapsed ? "w-5 h-5" : "w-4 h-4",
                    )}
                  />
                  {!sidebarCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Link>
              );

              if (sidebarCollapsed) {
                return (
                  <Tooltip key={item.path} delayDuration={0}>
                    <TooltipTrigger asChild>{linkEl}</TooltipTrigger>
                    <TooltipContent side="right" className="font-medium">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                );
              }
              return linkEl;
            })}
          </div>
        ))}
      </nav>

      {/* User profile */}
      <div
        className={cn(
          "border-t border-sidebar-border p-3 flex items-center gap-3",
          sidebarCollapsed && "justify-center",
        )}
      >
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarFallback className="bg-accent text-accent-foreground text-xs font-bold">
            SA
          </AvatarFallback>
        </Avatar>
        {!sidebarCollapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-sidebar-foreground truncate">
              Suresh Prasad
            </p>
            <Badge variant="outline" className="text-[10px] px-1 h-4 mt-0.5">
              {roleLabels[currentRole]}
            </Badge>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        type="button"
        onClick={toggleSidebar}
        data-ocid="sidebar.collapse_button"
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center shadow-md hover:bg-accent transition-colors z-30"
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {sidebarCollapsed ? (
          <ChevronRight className="w-3 h-3 text-foreground" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-foreground" />
        )}
      </button>
    </aside>
  );
}
