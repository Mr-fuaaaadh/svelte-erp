import KPICard from "@/components/ui/KPICard";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockInvoices, mockStateStats } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useSchoolStore } from "@/store/schoolStore";
import type { School, SchoolStatus, SubscriptionPlan } from "@/types";
import {
  AlertTriangle,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Edit,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  RefreshCw,
  School as SchoolIcon,
  Search,
  Sparkles,
  TrendingUp,
  UserCircle,
  Users,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

// ─── Plan Badge ───────────────────────────────────────────────────────────────
const planColors: Record<SubscriptionPlan, string> = {
  Enterprise: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Professional: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Basic: "bg-muted text-muted-foreground border-border",
};

function PlanBadge({ plan }: { plan: SubscriptionPlan }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] font-medium",
        planColors[plan],
      )}
    >
      {plan === "Enterprise" && <Sparkles className="w-2.5 h-2.5" />}
      {plan}
    </span>
  );
}

// ─── State Distribution Card ───────────────────────────────────────────────
function StateDistributionCard({
  activeState,
  onStateClick,
}: {
  activeState: string;
  onStateClick: (state: string) => void;
}) {
  const maxSchools = Math.max(...mockStateStats.map((s) => s.schools));
  const sorted = [...mockStateStats]
    .sort((a, b) => b.schools - a.schools)
    .slice(0, 10);

  const stateColors = [
    "from-blue-500 to-blue-400",
    "from-violet-500 to-violet-400",
    "from-emerald-500 to-emerald-400",
    "from-amber-500 to-amber-400",
    "from-cyan-500 to-cyan-400",
    "from-rose-500 to-rose-400",
    "from-indigo-500 to-indigo-400",
    "from-teal-500 to-teal-400",
    "from-orange-500 to-orange-400",
    "from-pink-500 to-pink-400",
  ];

  return (
    <div className="glass rounded-xl border border-border/30 flex flex-col h-full">
      <div className="px-4 pt-4 pb-3 border-b border-border/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              State-wise Distribution
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Top 10 states by school count
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/40 px-2 py-1 rounded-lg">
            <Building2 className="w-3 h-3" />
            <span>{mockStateStats.length} states</span>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 py-3">
        <div className="space-y-2.5">
          {sorted.map((stat, i) => {
            const pct = (stat.schools / maxSchools) * 100;
            const isActive = activeState === stat.state;
            return (
              <button
                type="button"
                key={stat.state}
                onClick={() => onStateClick(isActive ? "All" : stat.state)}
                data-ocid={`schools.state_filter.${i + 1}`}
                className={cn(
                  "w-full text-left rounded-lg px-3 py-2.5 transition-all duration-200 group",
                  isActive
                    ? "bg-accent/10 border border-accent/30"
                    : "hover:bg-muted/40 border border-transparent",
                )}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={cn(
                      "text-xs font-medium transition-colors",
                      isActive ? "text-accent" : "text-foreground",
                    )}
                  >
                    {stat.state}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {stat.schools} schools
                  </span>
                </div>
                <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full bg-gradient-to-r transition-all duration-500",
                      stateColors[i % stateColors.length],
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {stat.students.toLocaleString("en-IN")} students · ₹
                  {(stat.revenue / 100000).toFixed(1)}L revenue
                </p>
              </button>
            );
          })}
        </div>
      </ScrollArea>

      {activeState !== "All" && (
        <div className="px-4 pb-4 pt-2 border-t border-border/30">
          <button
            type="button"
            onClick={() => onStateClick("All")}
            className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1"
          >
            <XCircle className="w-3 h-3" />
            Clear state filter
          </button>
        </div>
      )}
    </div>
  );
}

// ─── School Detail Modal ───────────────────────────────────────────────────
function SchoolDetailModal({
  school,
  onClose,
}: {
  school: School;
  onClose: () => void;
}) {
  const [autoRenew, setAutoRenew] = useState(school.status === "Active");
  const schoolInvoices = mockInvoices
    .filter((inv) => inv.schoolName === school.name)
    .slice(0, 3);

  const subscriptionEnd = new Date(
    new Date(school.joinedDate).setFullYear(
      new Date(school.joinedDate).getFullYear() + 1,
    ),
  );
  const daysLeft = Math.max(
    0,
    Math.ceil((subscriptionEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
  );

  const attendanceRate = Math.floor(Math.random() * 10) + 88; // 88–97%

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl p-0 overflow-hidden border-border/40"
        data-ocid="schools.detail.dialog"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 bg-gradient-to-br from-card to-muted/20 border-b border-border/30">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <SchoolIcon className="w-5 h-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <DialogTitle className="text-base font-semibold text-foreground leading-snug">
                    {school.name}
                  </DialogTitle>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
                    <span className="text-xs text-muted-foreground truncate">
                      {school.address}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <PlanBadge plan={school.subscriptionPlan} />
                <StatusBadge status={school.status} />
              </div>
            </div>
          </DialogHeader>
        </div>

        <ScrollArea className="max-h-[70vh]">
          <div className="px-6 py-4 space-y-5">
            {/* Contact Info */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Contact Information
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: UserCircle,
                    label: "Principal",
                    value: school.principal,
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: school.phone,
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: school.email,
                  },
                  {
                    icon: MapPin,
                    label: "District",
                    value: `${school.district}, ${school.state}`,
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="glass rounded-lg px-3 py-2.5 border-border/20"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
                        {label}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-foreground truncate">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="opacity-30" />

            {/* Subscription */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Subscription
              </h4>
              <div className="glass rounded-xl p-4 border-border/20">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">
                      Plan
                    </p>
                    <PlanBadge plan={school.subscriptionPlan} />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">
                      Start Date
                    </p>
                    <p className="text-xs font-medium text-foreground">
                      {new Date(school.joinedDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">
                      End Date
                    </p>
                    <p
                      className={cn(
                        "text-xs font-medium",
                        daysLeft < 30 ? "text-amber-400" : "text-foreground",
                      )}
                    >
                      {subscriptionEnd.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      {daysLeft < 60 && (
                        <span className="ml-1 text-[10px]">
                          ({daysLeft}d left)
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">
                      Annual Value
                    </p>
                    <p className="text-base font-bold font-mono text-foreground">
                      ₹{school.revenue.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      +18% GST applicable
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Auto-renew
                    </span>
                    <Switch
                      checked={autoRenew}
                      onCheckedChange={setAutoRenew}
                      data-ocid="schools.detail.autorenew_switch"
                    />
                  </div>
                </div>

                {/* GST */}
                <div className="mt-3 pt-3 border-t border-border/30">
                  <p className="text-[10px] text-muted-foreground">
                    GST No:{" "}
                    <span className="font-mono text-foreground/70">
                      {school.gstNo}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <Separator className="opacity-30" />

            {/* Stats */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                School Statistics
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    icon: GraduationCap,
                    label: "Students",
                    value: school.studentCount.toLocaleString("en-IN"),
                    color: "text-blue-400",
                    bg: "bg-blue-500/10",
                  },
                  {
                    icon: Users,
                    label: "Teachers",
                    value: school.teacherCount.toString(),
                    color: "text-violet-400",
                    bg: "bg-violet-500/10",
                  },
                  {
                    icon: TrendingUp,
                    label: "Attendance",
                    value: `${attendanceRate}%`,
                    color: "text-emerald-400",
                    bg: "bg-emerald-500/10",
                  },
                ].map(({ icon: Icon, label, value, color, bg }) => (
                  <div
                    key={label}
                    className="glass rounded-lg px-3 py-3 border-border/20 text-center"
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center",
                        bg,
                      )}
                    >
                      <Icon className={cn("w-4 h-4", color)} />
                    </div>
                    <p className="text-base font-bold font-mono text-foreground">
                      {value}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Invoices */}
            {schoolInvoices.length > 0 && (
              <>
                <Separator className="opacity-30" />
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Recent Invoices
                  </h4>
                  <div className="space-y-2">
                    {schoolInvoices.map((inv) => (
                      <div
                        key={inv.id}
                        className="flex items-center justify-between glass rounded-lg px-3 py-2.5 border-border/20"
                      >
                        <div>
                          <p className="text-xs font-medium text-foreground">
                            {inv.invoiceNo}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {new Date(inv.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-medium text-foreground">
                            ₹{inv.totalAmount.toLocaleString("en-IN")}
                          </span>
                          <StatusBadge status={inv.status} dot={false} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>

        {/* Actions Footer */}
        <div className="px-6 py-4 border-t border-border/30 bg-muted/10 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={onClose}
            data-ocid="schools.detail.close_button"
          >
            Close
          </Button>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
              data-ocid="schools.detail.edit_button"
            >
              <Edit className="w-3.5 h-3.5" />
              Edit
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs text-amber-400 border-amber-500/30 hover:bg-amber-500/10"
              data-ocid="schools.detail.renew_button"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Renew
            </Button>
            <Button
              type="button"
              size="sm"
              className="gap-1.5 text-xs"
              data-ocid="schools.detail.view_profile_button"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Full Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Filter Bar ────────────────────────────────────────────────────────────
function FilterDropdown({
  label,
  value,
  options,
  onChange,
  ocid,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  ocid: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 text-xs gap-1.5 min-w-[120px] justify-between"
          data-ocid={ocid}
        >
          <span className={value === "All" ? "text-muted-foreground" : ""}>
            {value === "All" ? label : value}
          </span>
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-40 max-h-64 overflow-y-auto"
      >
        <DropdownMenuItem className="text-xs" onClick={() => onChange("All")}>
          All {label}s
        </DropdownMenuItem>
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt}
            className={cn("text-xs", value === opt && "bg-accent/10")}
            onClick={() => onChange(opt)}
          >
            {opt}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function SchoolsPage() {
  const { schools, filters, setFilters } = useSchoolStore();
  const [detailSchool, setDetailSchool] = useState<School | null>(null);

  // Filtered data based on store filters
  const filteredData = useMemo(() => {
    return schools.filter((s) => {
      const matchState = filters.state === "All" || s.state === filters.state;
      const matchPlan =
        filters.plan === "All" || s.subscriptionPlan === filters.plan;
      const matchStatus =
        filters.status === "All" || s.status === filters.status;
      const matchSearch =
        !filters.search ||
        s.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        s.district.toLowerCase().includes(filters.search.toLowerCase()) ||
        s.state.toLowerCase().includes(filters.search.toLowerCase());
      return matchState && matchPlan && matchStatus && matchSearch;
    });
  }, [schools, filters]);

  // KPI aggregations
  const activeCount = schools.filter((s) => s.status === "Active").length;
  const totalCount = 2847; // total across all of India

  const stateOptions = Array.from(new Set(schools.map((s) => s.state))).sort();
  const planOptions: SubscriptionPlan[] = [
    "Basic",
    "Professional",
    "Enterprise",
  ];
  const statusOptions: SchoolStatus[] = [
    "Active",
    "Inactive",
    "Pending",
    "Expired",
  ];

  // Table pagination
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  const pageData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleAll = () => {
    setSelected(
      selected.size === pageData.length
        ? new Set()
        : new Set(pageData.map((r) => r.id)),
    );
  };

  const toggleRow = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  return (
    <div className="space-y-6" data-ocid="schools.page">
      <PageHeader
        title="Schools Management"
        description="Central dashboard for all registered schools across India"
        actions={
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              data-ocid="schools.export_button"
            >
              Export CSV
            </Button>
            <Button
              type="button"
              size="sm"
              className="gap-1.5"
              data-ocid="schools.add_school_button"
            >
              <Building2 className="w-3.5 h-3.5" />
              Add School
            </Button>
          </>
        }
      />

      {/* KPI Row */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        data-ocid="schools.kpi_row"
      >
        <KPICard
          title="Total Schools"
          value={totalCount.toLocaleString("en-IN")}
          subtitle="Across 28 states"
          icon={SchoolIcon}
          color="blue"
          change={12.5}
          changeType="up"
        />
        <KPICard
          title="Active"
          value={activeCount.toLocaleString("en-IN")}
          subtitle={`${Math.round((activeCount / schools.length) * 100)}% of registered`}
          icon={CheckCircle2}
          color="emerald"
          change={3.2}
          changeType="up"
        />
        <KPICard
          title="Expiring (30 days)"
          value="134"
          subtitle="Renewal action needed"
          icon={AlertTriangle}
          color="amber"
          change={8}
          changeType="down"
        />
        <KPICard
          title="New This Month"
          value="47"
          subtitle="April 2026"
          icon={TrendingUp}
          color="violet"
          change={18}
          changeType="up"
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Table Column (2/3) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Filter bar */}
          <div
            className="glass rounded-xl border border-border/30 px-4 py-3 flex flex-wrap items-center gap-3"
            data-ocid="schools.filter_bar"
          >
            {/* Search */}
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Search school, district…"
                value={filters.search}
                onChange={(e) => {
                  setFilters({ search: e.target.value });
                  setPage(1);
                }}
                data-ocid="schools.search_input"
                className="pl-8 h-8 text-xs"
              />
            </div>

            <FilterDropdown
              label="State"
              value={filters.state}
              options={stateOptions}
              onChange={(v) => {
                setFilters({ state: v });
                setPage(1);
              }}
              ocid="schools.filter_state.select"
            />
            <FilterDropdown
              label="Plan"
              value={filters.plan}
              options={planOptions}
              onChange={(v) => {
                setFilters({ plan: v as SubscriptionPlan | "All" });
                setPage(1);
              }}
              ocid="schools.filter_plan.select"
            />
            <FilterDropdown
              label="Status"
              value={filters.status}
              options={statusOptions}
              onChange={(v) => {
                setFilters({ status: v as SchoolStatus | "All" });
                setPage(1);
              }}
              ocid="schools.filter_status.select"
            />

            {(filters.state !== "All" ||
              filters.plan !== "All" ||
              filters.status !== "All" ||
              filters.search) && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-muted-foreground"
                onClick={() => {
                  setFilters({
                    state: "All",
                    plan: "All",
                    status: "All",
                    search: "",
                  });
                  setPage(1);
                }}
                data-ocid="schools.filter_clear_button"
              >
                <XCircle className="w-3 h-3 mr-1" />
                Clear
              </Button>
            )}

            <div className="ml-auto text-xs text-muted-foreground">
              {filteredData.length} of {schools.length} schools
            </div>
          </div>

          {/* Table */}
          <div className="glass rounded-xl border border-border/30 overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border/30">
                    <TableHead className="w-8 pr-0">
                      <Checkbox
                        checked={
                          pageData.length > 0 &&
                          selected.size === pageData.length
                        }
                        onCheckedChange={toggleAll}
                        data-ocid="schools.table_select_all"
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="text-xs font-semibold min-w-[180px]">
                      School Name
                    </TableHead>
                    <TableHead className="text-xs font-semibold">
                      State
                    </TableHead>
                    <TableHead className="text-xs font-semibold hidden md:table-cell">
                      District
                    </TableHead>
                    <TableHead className="text-xs font-semibold">
                      Plan
                    </TableHead>
                    <TableHead className="text-xs font-semibold hidden lg:table-cell">
                      Students
                    </TableHead>
                    <TableHead className="text-xs font-semibold hidden lg:table-cell">
                      Teachers
                    </TableHead>
                    <TableHead className="text-xs font-semibold hidden xl:table-cell">
                      Revenue
                    </TableHead>
                    <TableHead className="text-xs font-semibold">
                      Status
                    </TableHead>
                    <TableHead className="text-xs font-semibold hidden xl:table-cell">
                      GST No
                    </TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={11}
                        className="text-center text-sm text-muted-foreground py-16"
                        data-ocid="schools.table.empty_state"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <SchoolIcon className="w-8 h-8 text-muted-foreground/40" />
                          <p>No schools match your filters</p>
                          <button
                            type="button"
                            onClick={() => {
                              setFilters({
                                state: "All",
                                plan: "All",
                                status: "All",
                                search: "",
                              });
                            }}
                            className="text-xs text-accent underline"
                          >
                            Clear all filters
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    pageData.map((school, i) => (
                      <TableRow
                        key={school.id}
                        className={cn(
                          "cursor-pointer transition-all duration-150 border-b border-border/20",
                          "hover:bg-accent/5",
                          selected.has(school.id) && "bg-accent/5",
                        )}
                        onClick={() => setDetailSchool(school)}
                        data-ocid={`schools.table.item.${(page - 1) * PAGE_SIZE + i + 1}`}
                      >
                        <TableCell
                          className="pr-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Checkbox
                            checked={selected.has(school.id)}
                            onCheckedChange={() => toggleRow(school.id)}
                            data-ocid={`schools.table.checkbox.${i + 1}`}
                            aria-label={`Select ${school.name}`}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-foreground truncate max-w-[200px]">
                              {school.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              {school.principal}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {school.state}
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {school.district}
                          </span>
                        </TableCell>
                        <TableCell>
                          <PlanBadge plan={school.subscriptionPlan} />
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-xs font-mono text-foreground">
                            {school.studentCount.toLocaleString("en-IN")}
                          </span>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-xs font-mono text-foreground">
                            {school.teacherCount}
                          </span>
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          <span className="text-xs font-mono text-foreground whitespace-nowrap">
                            ₹{school.revenue.toLocaleString("en-IN")}/yr
                          </span>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={school.status} />
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {school.gstNo}
                          </span>
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                data-ocid={`schools.table.row_actions.${i + 1}`}
                                aria-label="School actions"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-44"
                              data-ocid={`schools.table.row_menu.${i + 1}`}
                            >
                              <DropdownMenuItem
                                className="text-xs cursor-pointer gap-2"
                                onClick={() => setDetailSchool(school)}
                              >
                                <ExternalLink className="w-3 h-3" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-xs cursor-pointer gap-2">
                                <Edit className="w-3 h-3" />
                                Edit School
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-xs cursor-pointer gap-2 text-amber-400">
                                <RefreshCw className="w-3 h-3" />
                                Renew Subscription
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-xs cursor-pointer gap-2 text-destructive focus:text-destructive">
                                <XCircle className="w-3 h-3" />
                                Deactivate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredData.length > PAGE_SIZE && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-border/30 text-xs text-muted-foreground">
                <span>
                  Showing{" "}
                  <span className="text-foreground font-medium">
                    {(page - 1) * PAGE_SIZE + 1}–
                    {Math.min(page * PAGE_SIZE, filteredData.length)}
                  </span>{" "}
                  of{" "}
                  <span className="text-foreground font-medium">
                    {filteredData.length}
                  </span>
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    data-ocid="schools.table.pagination_prev"
                    aria-label="Previous page"
                  >
                    <ChevronDown className="w-3 h-3 rotate-90" />
                  </Button>
                  <span className="px-2 font-medium text-foreground">
                    {page} / {totalPages}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    data-ocid="schools.table.pagination_next"
                    aria-label="Next page"
                  >
                    <ChevronDown className="w-3 h-3 -rotate-90" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Bulk action bar */}
          {selected.size > 0 && (
            <div
              className="glass rounded-xl border border-accent/20 px-4 py-3 flex items-center justify-between"
              data-ocid="schools.bulk_action_bar"
            >
              <span className="text-xs text-foreground">
                <span className="font-semibold">{selected.size}</span> school
                {selected.size !== 1 ? "s" : ""} selected
              </span>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="text-[11px] cursor-pointer hover:bg-muted/50"
                >
                  <RefreshCw className="w-2.5 h-2.5 mr-1" />
                  Bulk Renew
                </Badge>
                <Badge
                  variant="outline"
                  className="text-[11px] cursor-pointer hover:bg-muted/50 text-destructive border-destructive/30"
                >
                  <XCircle className="w-2.5 h-2.5 mr-1" />
                  Bulk Deactivate
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* State Distribution (1/3) */}
        <div className="flex flex-col" data-ocid="schools.state_distribution">
          <StateDistributionCard
            activeState={filters.state}
            onStateClick={(state) => {
              setFilters({ state });
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* School Detail Modal */}
      {detailSchool && (
        <SchoolDetailModal
          school={detailSchool}
          onClose={() => setDetailSchool(null)}
        />
      )}
    </div>
  );
}
