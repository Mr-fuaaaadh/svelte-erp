import KPICard from "@/components/ui/KPICard";
import PageHeader from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockMonthlyRevenue, mockStateStats } from "@/data/mockData";
import { cn } from "@/lib/utils";
import {
  Download,
  GraduationCap,
  School,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── colour palette ───────────────────────────────────────────────────────────
const BLUE = "#3b82f6";
const EMERALD = "#10b981";
const AMBER = "#f59e0b";
const VIOLET = "#8b5cf6";
const ROSE = "#f43f5e";

// ─── date-range tabs ──────────────────────────────────────────────────────────
const DATE_RANGES = [
  "Last 7 Days",
  "Last 30 Days",
  "Last 90 Days",
  "This Year",
  "Custom",
] as const;
type DateRange = (typeof DATE_RANGES)[number];

// ─── custom tooltip ───────────────────────────────────────────────────────────
function PremiumTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="glass rounded-xl p-3 shadow-xl border border-border/40 min-w-[140px]">
      <p className="text-[10px] font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: entry.color }}
          />
          <span className="text-[11px] text-muted-foreground">
            {entry.name}:
          </span>
          <span className="text-[11px] font-semibold text-foreground">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── chart card ───────────────────────────────────────────────────────────────
function ChartCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn(
        "glass rounded-xl p-5 border border-border/30 flex flex-col gap-4",
        className,
      )}
    >
      <h3 className="text-sm font-semibold text-foreground/90 font-display leading-tight">
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

// ─── analytics data ───────────────────────────────────────────────────────────
const schoolGrowthData = [
  { month: "May '24", registered: 2140, active: 1890 },
  { month: "Jun '24", registered: 2210, active: 1940 },
  { month: "Jul '24", registered: 2295, active: 2005 },
  { month: "Aug '24", registered: 2370, active: 2070 },
  { month: "Sep '24", registered: 2450, active: 2140 },
  { month: "Oct '24", registered: 2530, active: 2210 },
  { month: "Nov '24", registered: 2600, active: 2270 },
  { month: "Dec '24", registered: 2675, active: 2345 },
  { month: "Jan '25", registered: 2720, active: 2390 },
  { month: "Feb '25", registered: 2768, active: 2438 },
  { month: "Mar '25", registered: 2810, active: 2478 },
  { month: "Apr '25", registered: 2847, active: 2518 },
];

const revenueBarData = mockMonthlyRevenue.map((m, i) => ({
  month: m.month.replace(" 20", " '"),
  revenue: m.revenue,
  cumulative: +mockMonthlyRevenue
    .slice(0, i + 1)
    .reduce((s, x) => s + x.revenue, 0)
    .toFixed(1),
}));

const stateDistData = [...mockStateStats]
  .sort((a, b) => b.schools - a.schools)
  .slice(0, 10);

const subscriptionPieData = [
  { name: "Professional", value: 45, amount: "₹10.8Cr", color: BLUE },
  { name: "Enterprise", value: 28, amount: "₹16.1Cr", color: VIOLET },
  { name: "Basic", value: 27, amount: "₹3.2Cr", color: "#64748b" },
];

const newRegistrationsData = mockMonthlyRevenue.map((m) => ({
  month: m.month.replace(" 20", " '"),
  newSchools: m.newSchools,
  isPeak:
    m.newSchools === Math.max(...mockMonthlyRevenue.map((x) => x.newSchools)),
}));

const studentTeacherByState = mockStateStats
  .sort((a, b) => b.students - a.students)
  .slice(0, 8)
  .map((s) => ({
    state: s.state.length > 10 ? `${s.state.slice(0, 8)}…` : s.state,
    students: +(s.students / 1000).toFixed(1),
    teachers: +(s.students / 14.5 / 1000).toFixed(2),
  }));

const renewalData = [
  { month: "May '24", renewal: 88, churn: 12 },
  { month: "Jun '24", renewal: 86, churn: 14 },
  { month: "Jul '24", renewal: 89, churn: 11 },
  { month: "Aug '24", renewal: 87, churn: 13 },
  { month: "Sep '24", renewal: 91, churn: 9 },
  { month: "Oct '24", renewal: 90, churn: 10 },
  { month: "Nov '24", renewal: 92, churn: 8 },
  { month: "Dec '24", renewal: 88, churn: 12 },
  { month: "Jan '25", renewal: 93, churn: 7 },
  { month: "Feb '25", renewal: 91, churn: 9 },
  { month: "Mar '25", renewal: 94, churn: 6 },
  { month: "Apr '25", renewal: 95, churn: 5 },
];

// ─── performance table ────────────────────────────────────────────────────────
interface StatePerf {
  state: string;
  schools: number;
  students: string;
  teachers: string;
  revenue: string;
  avgRevenue: string;
  growth: number;
  renewal: number;
}

// seeded growth/renewal for determinism
const seedGrowth = [
  18.4, 14.2, 11.7, 9.3, 22.1, 8.6, 16.5, 13.4, 7.9, 12.8, 19.3, 10.1, 6.5,
  17.2, 5.8,
];
const seedRenewal = [
  94, 91, 88, 87, 96, 85, 93, 90, 83, 89, 95, 86, 82, 92, 80,
];

const performanceData: StatePerf[] = [...mockStateStats]
  .sort((a, b) => b.schools - a.schools)
  .map((s, i) => ({
    state: s.state,
    schools: s.schools,
    students: s.students.toLocaleString("en-IN"),
    teachers: Math.round(s.students / 14.5).toLocaleString("en-IN"),
    revenue: `₹${(s.revenue / 1000).toFixed(0)}K`,
    avgRevenue: `₹${Math.round(s.revenue / s.schools / 1000)}K`,
    growth: seedGrowth[i] ?? 10,
    renewal: seedRenewal[i] ?? 88,
  }));

type SortKey = keyof StatePerf;

// ─── pie label ────────────────────────────────────────────────────────────────
const RADIAN = Math.PI / 180;

interface PieLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

function PieLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelProps) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

// ─── sort col header ──────────────────────────────────────────────────────────
function SortTh({
  label,
  colKey,
  active,
  asc,
  right,
  onClick,
}: {
  label: string;
  colKey: string;
  active: boolean;
  asc: boolean;
  right?: boolean;
  onClick: () => void;
}) {
  return (
    <th
      className={cn(
        "px-4 py-3 font-semibold text-[10px] text-muted-foreground uppercase tracking-wider cursor-pointer select-none transition-colors hover:text-foreground whitespace-nowrap",
        right && "text-right",
      )}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      data-ocid={`analytics.sort.${colKey}`}
    >
      <span
        className={cn(
          "inline-flex items-center gap-1",
          right && "justify-end w-full",
        )}
      >
        {label}
        {active && <span className="text-blue-400">{asc ? "↑" : "↓"}</span>}
      </span>
    </th>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange>("This Year");
  const [sortKey, setSortKey] = useState<SortKey>("schools");
  const [sortAsc, setSortAsc] = useState(false);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc((p) => !p);
    else {
      setSortKey(key);
      setSortAsc(false);
    }
  }

  const sortedPerf = [...performanceData].sort((a, b) => {
    const parse = (v: string | number) =>
      typeof v === "number"
        ? v
        : Number.parseFloat(String(v).replace(/[₹K,]/g, ""));
    const av = parse(a[sortKey]);
    const bv = parse(b[sortKey]);
    return sortAsc ? av - bv : bv - av;
  });

  return (
    <div className="space-y-6 pb-8">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <PageHeader
        title="Analytics Center"
        description="Platform-wide insights across schools, students, revenue & growth"
        actions={
          <>
            <div
              data-ocid="analytics.date_range_group"
              className="hidden md:flex items-center glass rounded-lg border border-border/30 p-0.5 gap-0.5"
            >
              {DATE_RANGES.map((r) => (
                <button
                  key={r}
                  type="button"
                  data-ocid={`analytics.date_range_${r.toLowerCase().replace(/\s+/g, "_")}`}
                  onClick={() => setDateRange(r)}
                  className={cn(
                    "px-3 py-1.5 text-[11px] font-medium rounded-md transition-all duration-200",
                    dateRange === r
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              data-ocid="analytics.export_button"
              className="gap-2 text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              Export Report
            </Button>
          </>
        }
      />

      {/* ── KPI Row ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {(
          [
            {
              title: "Total Schools",
              value: "2,847",
              change: 12.3,
              changeType: "up" as const,
              icon: School,
              color: "blue" as const,
            },
            {
              title: "Total Students",
              value: "1,24,830",
              change: 8.7,
              changeType: "up" as const,
              icon: GraduationCap,
              color: "emerald" as const,
            },
            {
              title: "Total Teachers",
              value: "8,743",
              change: 5.2,
              changeType: "up" as const,
              icon: Users,
              color: "amber" as const,
            },
            {
              title: "Platform Revenue",
              value: "₹8.2Cr",
              change: 24.8,
              changeType: "up" as const,
              icon: TrendingUp,
              color: "violet" as const,
            },
          ] as const
        ).map((kpi, i) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            data-ocid={`analytics.kpi.${i + 1}`}
          >
            <KPICard {...kpi} subtitle="YoY Growth" />
          </motion.div>
        ))}
      </div>

      {/* ── Row 1: School Growth + Revenue ──────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* School growth area chart */}
        <ChartCard title="School Registration & Subscription Growth">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart
              data={schoolGrowthData}
              margin={{ top: 4, right: 4, bottom: 0, left: -8 }}
            >
              <defs>
                <linearGradient id="gReg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={BLUE} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={BLUE} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gAct" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={EMERALD} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={EMERALD} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#64748b", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                domain={[1800, 3000]}
              />
              <Tooltip content={<PremiumTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              <Area
                type="monotone"
                dataKey="registered"
                name="Total Registered"
                stroke={BLUE}
                strokeWidth={2}
                fill="url(#gReg)"
                dot={false}
                animationDuration={1200}
              />
              <Area
                type="monotone"
                dataKey="active"
                name="Active Subscriptions"
                stroke={EMERALD}
                strokeWidth={2}
                fill="url(#gAct)"
                dot={false}
                animationDuration={1400}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Revenue composed chart */}
        <ChartCard title="Monthly Revenue Performance — FY 2024-25">
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart
              data={revenueBarData}
              margin={{ top: 4, right: 8, bottom: 0, left: -8 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#64748b", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fill: "#64748b", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                unit="L"
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: "#64748b", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                unit="L"
              />
              <Tooltip content={<PremiumTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              <Bar
                yAxisId="left"
                dataKey="revenue"
                name="Monthly ₹ (L)"
                fill={BLUE}
                fillOpacity={0.85}
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
                animationDuration={1000}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cumulative"
                name="Cumulative (L)"
                stroke={AMBER}
                strokeWidth={2.5}
                dot={false}
                animationDuration={1400}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ── Row 2: State + Pie + New Registrations ───────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {/* State horizontal bar */}
        <ChartCard title="Schools by State">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={stateDistData}
              layout="vertical"
              margin={{ top: 0, right: 8, bottom: 0, left: 60 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fill: "#64748b", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="state"
                tick={{ fill: "#94a3b8", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={56}
              />
              <Tooltip content={<PremiumTooltip />} />
              <Bar
                dataKey="schools"
                name="Schools"
                radius={[0, 4, 4, 0]}
                maxBarSize={18}
                animationDuration={1100}
              >
                {stateDistData.map((entry, idx) => (
                  <Cell
                    key={entry.state}
                    fill={`rgba(59,130,246,${1 - idx * 0.07})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Subscription donut */}
        <ChartCard title="Subscription Distribution">
          <div className="flex flex-col items-center gap-3">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={subscriptionPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={PieLabel}
                  animationDuration={1200}
                >
                  {subscriptionPieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number) => [`${v}%`, "Share"]}
                  contentStyle={{
                    background: "rgba(15,20,40,0.9)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "#94a3b8" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 w-full">
              {subscriptionPieData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: item.color }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground">
                      {item.value}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* New registrations bar */}
        <ChartCard title="New School Registrations">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={newRegistrationsData}
              margin={{ top: 4, right: 4, bottom: 8, left: -16 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#64748b", fontSize: 9 }}
                tickLine={false}
                axisLine={false}
                angle={-30}
                textAnchor="end"
                height={44}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<PremiumTooltip />} />
              <Bar
                dataKey="newSchools"
                name="New Schools"
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
                animationDuration={1000}
              >
                {newRegistrationsData.map((entry) => (
                  <Cell
                    key={entry.month}
                    fill={entry.isPeak ? EMERALD : BLUE}
                    fillOpacity={entry.isPeak ? 1 : 0.75}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ── Row 3: Students/Teachers + Renewal Rate ──────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <ChartCard title="Students & Teachers by State">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={studentTeacherByState}
              margin={{ top: 4, right: 4, bottom: 0, left: -8 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                dataKey="state"
                tick={{ fill: "#64748b", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                unit="K"
              />
              <Tooltip content={<PremiumTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              <Bar
                dataKey="students"
                name="Students (K)"
                fill={BLUE}
                fillOpacity={0.9}
                radius={[3, 3, 0, 0]}
                maxBarSize={20}
                animationDuration={1000}
              />
              <Bar
                dataKey="teachers"
                name="Teachers (K)"
                fill={EMERALD}
                fillOpacity={0.9}
                radius={[3, 3, 0, 0]}
                maxBarSize={20}
                animationDuration={1200}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Renewal Rate vs Churn">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart
              data={renewalData}
              margin={{ top: 4, right: 8, bottom: 0, left: -8 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#64748b", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                unit="%"
              />
              <Tooltip content={<PremiumTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              <ReferenceLine
                y={80}
                stroke={AMBER}
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: "Target 80%",
                  fill: AMBER,
                  fontSize: 10,
                  position: "insideTopRight",
                }}
              />
              <Line
                type="monotone"
                dataKey="renewal"
                name="Renewal Rate %"
                stroke={EMERALD}
                strokeWidth={2.5}
                dot={{ fill: EMERALD, r: 3 }}
                activeDot={{ r: 5 }}
                animationDuration={1200}
              />
              <Line
                type="monotone"
                dataKey="churn"
                name="Churn Rate %"
                stroke={ROSE}
                strokeWidth={2}
                strokeDasharray="5 3"
                dot={false}
                animationDuration={1400}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ── Performance Metrics Table ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass rounded-xl border border-border/30 overflow-hidden"
        data-ocid="analytics.performance_table"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/20">
          <h3 className="text-sm font-semibold text-foreground font-display">
            State-wise Performance Metrics
          </h3>
          <Badge variant="secondary" className="text-xs">
            {performanceData.length} States
          </Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs" data-ocid="analytics.state_table">
            <thead>
              <tr className="border-b border-border/20 bg-muted/10">
                {[
                  { key: "state" as SortKey, label: "State", right: false },
                  { key: "schools" as SortKey, label: "Schools", right: true },
                  {
                    key: "students" as SortKey,
                    label: "Students",
                    right: true,
                  },
                  {
                    key: "teachers" as SortKey,
                    label: "Teachers",
                    right: true,
                  },
                  {
                    key: "revenue" as SortKey,
                    label: "Revenue (₹)",
                    right: true,
                  },
                  {
                    key: "avgRevenue" as SortKey,
                    label: "Avg Rev/School",
                    right: true,
                  },
                  { key: "growth" as SortKey, label: "Growth %", right: true },
                  {
                    key: "renewal" as SortKey,
                    label: "Renewal %",
                    right: true,
                  },
                ].map(({ key, label, right }) => (
                  <SortTh
                    key={key}
                    colKey={key}
                    label={label}
                    right={right}
                    active={sortKey === key}
                    asc={sortAsc}
                    onClick={() => toggleSort(key)}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedPerf.map((row, i) => (
                <tr
                  key={row.state}
                  data-ocid={`analytics.state_row.${i + 1}`}
                  className="border-b border-border/10 hover:bg-muted/20 transition-colors duration-150"
                >
                  <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                    {row.state}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground/80">
                    {row.schools}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground/80">
                    {row.students}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground/80">
                    {row.teachers}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-semibold text-blue-400">
                    {row.revenue}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground/80">
                    {row.avgRevenue}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={cn(
                        "font-semibold",
                        row.growth >= 10
                          ? "text-emerald-400"
                          : "text-amber-400",
                      )}
                    >
                      +{row.growth}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-14 h-1.5 rounded-full bg-muted/40 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-500 transition-all"
                          style={{ width: `${row.renewal}%` }}
                        />
                      </div>
                      <span className="text-emerald-400 font-semibold tabular-nums">
                        {row.renewal}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
