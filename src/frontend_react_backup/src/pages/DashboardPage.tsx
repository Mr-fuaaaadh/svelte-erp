import KPICard from "@/components/ui/KPICard";
import StatusBadge from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  mockDashboardStats,
  mockLeads,
  mockMonthlyRevenue,
  mockNotifications,
  mockStateStats,
} from "@/data/mockData";
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  BellOff,
  CalendarClock,
  CheckCircle2,
  CreditCard,
  ExternalLink,
  Headphones,
  IndianRupee,
  Info,
  School,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Support Tickets (inline mock) ───────────────────────────────────────────
const mockSupportTickets = [
  {
    id: "t1",
    title: "Login issue after password reset",
    school: "Scindia School, Gwalior",
    priority: "High" as const,
    status: "Open",
    opened: "2026-04-21",
  },
  {
    id: "t2",
    title: "Fee collection module not loading",
    school: "DAV Public School, Kolkata",
    priority: "High" as const,
    status: "In Progress",
    opened: "2026-04-20",
  },
  {
    id: "t3",
    title: "Timetable export producing blank PDF",
    school: "Ryan International School, Pune",
    priority: "Medium" as const,
    status: "Open",
    opened: "2026-04-19",
  },
  {
    id: "t4",
    title: "Bulk student import CSV error",
    school: "Amity International School, Lucknow",
    priority: "Medium" as const,
    status: "Open",
    opened: "2026-04-18",
  },
  {
    id: "t5",
    title: "Parent app notifications delayed",
    school: "G.D. Goenka Public School, Gurugram",
    priority: "Low" as const,
    status: "Open",
    opened: "2026-04-17",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getRelativeTime(timestamp: string): string {
  const now = new Date("2026-04-22T10:00:00");
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins} min ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

const priorityConfig = {
  High: {
    dot: "bg-rose-400",
    text: "text-rose-400",
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  },
  Medium: {
    dot: "bg-amber-400",
    text: "text-amber-400",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  Low: {
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
};

const notifIconMap = {
  info: <Info className="w-4 h-4 text-blue-400" />,
  success: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
  warning: <AlertTriangle className="w-4 h-4 text-amber-400" />,
  error: <AlertCircle className="w-4 h-4 text-rose-400" />,
};

const notifRingMap = {
  info: "ring-blue-500/20 bg-blue-500/10",
  success: "ring-emerald-500/20 bg-emerald-500/10",
  warning: "ring-amber-500/20 bg-amber-500/10",
  error: "ring-rose-500/20 bg-rose-500/10",
};

// ─── Total max schools for % calc ───────────────────────────────────────────
const maxSchools = Math.max(...mockStateStats.map((s) => s.schools));

// ─── Quick Stats Data ────────────────────────────────────────────────────────
const quickStats = [
  {
    label: "New Schools This Month",
    value: "47",
    icon: School,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    label: "Demos Scheduled",
    value: "23",
    icon: CalendarClock,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    label: "Renewals Due (30d)",
    value: "18",
    icon: TrendingUp,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    label: "Avg Revenue / School",
    value: "₹20,200",
    icon: IndianRupee,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const stats = mockDashboardStats;
  const [notifRead, setNotifRead] = useState(false);
  const recentNotifs = mockNotifications.slice(0, 5);
  const recentLeads = mockLeads.slice(0, 5);

  return (
    <div
      className="space-y-6 animate-in fade-in duration-500"
      data-ocid="dashboard.page"
    >
      {/* ── Greeting Header ─────────────────────────────────────────────── */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        data-ocid="dashboard.header"
      >
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground leading-tight">
            Good morning, Rajesh Kumar 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here's what's happening with AIPSA today.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs"
            data-ocid="dashboard.export_button"
          >
            Export Report
          </Button>
          <Button
            type="button"
            size="sm"
            className="text-xs"
            data-ocid="dashboard.add_school_button"
          >
            + Add School
          </Button>
        </div>
      </div>

      {/* ── Section 1: KPI Tiles ────────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        data-ocid="dashboard.kpi.section"
      >
        <KPICard
          title="Total Schools"
          value="2,847"
          change={stats.schoolGrowth}
          changeType="up"
          icon={School}
          color="blue"
          subtitle="Across 28 states"
        />
        <KPICard
          title="Active Subscriptions"
          value="2,413"
          change={5.9}
          changeType="up"
          icon={CreditCard}
          color="emerald"
          subtitle="Enterprise + Pro + Basic"
        />
        <KPICard
          title="Monthly Revenue"
          value="₹48.5L"
          change={stats.revenueGrowth}
          changeType="up"
          icon={IndianRupee}
          color="violet"
          subtitle="April 2026"
        />
        <KPICard
          title="Support Tickets"
          value="23 open"
          change={14.3}
          changeType="down"
          icon={Headphones}
          color="amber"
          subtitle="Pending resolution"
        />
      </div>

      {/* ── Section 2: Revenue Chart + State Distribution ───────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue AreaChart (2/3) */}
        <Card
          className="lg:col-span-2 glass border-border/30"
          data-ocid="dashboard.revenue_chart"
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">
                  Revenue Overview — FY 2024-25
                </CardTitle>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Monthly recurring revenue in ₹ Lakhs
                </p>
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                ↑ {stats.revenueGrowth}% YoY
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-1">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart
                data={mockMonthlyRevenue}
                margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="oklch(0.65 0.22 258)"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor="oklch(0.65 0.22 258)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.22 0.005 264)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10, fill: "oklch(0.55 0 0)" }}
                  tickLine={false}
                  axisLine={false}
                  interval={1}
                  tickFormatter={(v: string) => v.split(" ")[0]}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "oklch(0.55 0 0)" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) => `₹${v}L`}
                  domain={[0, "auto"]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.16 0.005 258)",
                    border: "1px solid oklch(0.22 0.005 264)",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "oklch(0.93 0 0)",
                  }}
                  formatter={(value: number) => [`₹${value}L`, "Revenue"]}
                  labelStyle={{ color: "oklch(0.6 0 0)" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="oklch(0.65 0.22 258)"
                  fill="url(#revGrad)"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: "oklch(0.65 0.22 258)",
                    strokeWidth: 0,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* State-wise Distribution (1/3) */}
        <Card
          className="glass border-border/30"
          data-ocid="dashboard.state_distribution"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">
              State-wise Distribution
            </CardTitle>
            <p className="text-[11px] text-muted-foreground">
              Top 10 states by school count
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {mockStateStats.slice(0, 10).map((s, i) => {
                const pct = Math.round((s.schools / maxSchools) * 100);
                const subPct =
                  Math.round(
                    (s.schools / mockDashboardStats.totalSchools) * 100 * 10,
                  ) / 10;
                return (
                  <div
                    key={s.state}
                    className="flex flex-col gap-1 px-4 py-2.5"
                    data-ocid={`dashboard.state.item.${i + 1}`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground truncate">
                        {s.state}
                      </span>
                      <span className="text-muted-foreground shrink-0 ml-2">
                        {s.schools} sch · {subPct}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-muted/50">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-accent transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Section 3: Notifications | Leads | Support ───────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Recent Notifications */}
        <Card
          className="glass border-border/30"
          data-ocid="dashboard.notifications.panel"
        >
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-accent" />
              <CardTitle className="text-sm font-semibold">
                Notifications
              </CardTitle>
              {!notifRead && (
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-[11px] h-6 px-2 text-muted-foreground hover:text-foreground"
              onClick={() => setNotifRead(true)}
              data-ocid="dashboard.notifications.mark_read_button"
            >
              <BellOff className="w-3 h-3 mr-1" />
              Mark all read
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {recentNotifs.map((n, i) => (
                <div
                  key={n.id}
                  className={`flex gap-3 px-4 py-3 hover:bg-muted/10 transition-colors ${!n.read && !notifRead ? "bg-accent/5" : ""}`}
                  data-ocid={`dashboard.notification.item.${i + 1}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full ring-1 flex items-center justify-center shrink-0 ${notifRingMap[n.type]}`}
                  >
                    {notifIconMap[n.type]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-semibold text-foreground leading-tight">
                      {n.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                      {n.message}
                    </p>
                    <p className="text-[10px] text-muted-foreground/60 mt-1">
                      {getRelativeTime(n.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* New Leads This Week */}
        <Card
          className="glass border-border/30"
          data-ocid="dashboard.leads.panel"
        >
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-cyan-400" />
              <CardTitle className="text-sm font-semibold">
                New Leads This Week
              </CardTitle>
            </div>
            <a
              href="/crm"
              className="flex items-center gap-1 text-[11px] text-accent hover:text-accent/80 transition-colors"
              data-ocid="dashboard.leads.view_crm_link"
            >
              View CRM
              <ExternalLink className="w-3 h-3" />
            </a>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {recentLeads.map((lead, i) => (
                <div
                  key={lead.id}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-muted/10 transition-colors"
                  data-ocid={`dashboard.lead.item.${i + 1}`}
                >
                  <div className="w-7 h-7 rounded-full bg-cyan-500/10 ring-1 ring-cyan-500/20 flex items-center justify-center shrink-0">
                    <School className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-semibold text-foreground truncate leading-tight">
                      {lead.schoolName}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {lead.state} · {lead.assignedTo}
                    </p>
                    <div className="mt-1">
                      <StatusBadge status={lead.stage} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support Tickets */}
        <Card
          className="glass border-border/30"
          data-ocid="dashboard.support.panel"
        >
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-amber-400" />
              <CardTitle className="text-sm font-semibold">
                Support Tickets
              </CardTitle>
            </div>
            <a
              href="/settings"
              className="flex items-center gap-1 text-[11px] text-accent hover:text-accent/80 transition-colors"
              data-ocid="dashboard.support.open_link"
            >
              Open Support
              <ExternalLink className="w-3 h-3" />
            </a>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {mockSupportTickets.map((ticket, i) => {
                const p = priorityConfig[ticket.priority];
                return (
                  <div
                    key={ticket.id}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-muted/10 transition-colors"
                    data-ocid={`dashboard.ticket.item.${i + 1}`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] font-semibold text-foreground line-clamp-1 leading-tight">
                        {ticket.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                        {ticket.school}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${p.badge}`}
                        >
                          {ticket.priority}
                        </span>
                        <span className="text-[10px] text-muted-foreground/60">
                          {ticket.opened}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Section 4: Quick Stats Row ───────────────────────────────────── */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        data-ocid="dashboard.quick_stats.section"
      >
        {quickStats.map((qs, i) => {
          const QsIcon = qs.icon;
          return (
            <div
              key={qs.label}
              className="glass rounded-xl p-4 border border-border/30 flex items-center gap-3 hover:scale-[1.02] transition-transform duration-200"
              data-ocid={`dashboard.quick_stat.item.${i + 1}`}
            >
              <div
                className={`w-9 h-9 rounded-lg ${qs.bg} flex items-center justify-center shrink-0`}
              >
                <QsIcon className={`w-4 h-4 ${qs.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-display font-bold text-foreground leading-tight">
                  {qs.value}
                </p>
                <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                  {qs.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
