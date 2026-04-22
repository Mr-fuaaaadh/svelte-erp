import KPICard from "@/components/ui/KPICard";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockInvoices, mockSubscriptions } from "@/data/mockData";
import type { InvoiceStatus, SubscriptionPlan } from "@/types";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  IndianRupee,
  Receipt,
  RefreshCw,
  Search,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Revenue chart data ───────────────────────────────────────────────────────

const revenueChartData = [
  { month: "May", current: 58.5, prev: 42.1 },
  { month: "Jun", current: 63.2, prev: 44.8 },
  { month: "Jul", current: 67.4, prev: 48.3 },
  { month: "Aug", current: 65.8, prev: 51.2 },
  { month: "Sep", current: 72.1, prev: 55.0 },
  { month: "Oct", current: 75.6, prev: 58.4 },
  { month: "Nov", current: 78.9, prev: 61.7 },
  { month: "Dec", current: 82.3, prev: 63.9 },
  { month: "Jan", current: 86.5, prev: 66.2 },
  { month: "Feb", current: 84.2, prev: 68.5 },
  { month: "Mar", current: 91.8, prev: 71.4 },
  { month: "Apr", current: 68.5, prev: 73.0 },
];

const revenueByPlan = [
  { plan: "Enterprise", amount: "₹4.8 Cr", percent: 58, color: "#3b82f6" },
  { plan: "Professional", amount: "₹2.6 Cr", percent: 32, color: "#10b981" },
  { plan: "Basic", amount: "₹80 L", percent: 10, color: "#f59e0b" },
];

const revenueByState = [
  { state: "Delhi", schools: 3, revenue: "₹1.44 Cr", avg: "₹48.0 L" },
  { state: "Maharashtra", schools: 3, revenue: "₹1.20 Cr", avg: "₹40.0 L" },
  { state: "Gujarat", schools: 2, revenue: "₹96.0 L", avg: "₹48.0 L" },
  { state: "Madhya Pradesh", schools: 2, revenue: "₹72.0 L", avg: "₹36.0 L" },
  { state: "Haryana", schools: 1, revenue: "₹48.0 L", avg: "₹48.0 L" },
  { state: "Karnataka", schools: 1, revenue: "₹24.0 L", avg: "₹24.0 L" },
  { state: "Uttar Pradesh", schools: 1, revenue: "₹24.0 L", avg: "₹24.0 L" },
  { state: "Telangana", schools: 1, revenue: "₹24.0 L", avg: "₹24.0 L" },
];

// ─── Renewal data ─────────────────────────────────────────────────────────────

interface RenewalRecord {
  school: string;
  plan: SubscriptionPlan;
  expiresOn: string;
  daysLeft: number;
  lastInvoice: string;
  amount: string;
  status: "Safe" | "Warning" | "Critical";
  autoReminder: boolean;
}

const renewalData: RenewalRecord[] = [
  {
    school: "Notre Dame Academy, Patna",
    plan: "Basic",
    expiresOn: "30 Apr 2026",
    daysLeft: 8,
    lastInvoice: "INV-2026-0019",
    amount: "₹12,000",
    status: "Critical",
    autoReminder: true,
  },
  {
    school: "Vidya Bharati High School, Jaipur",
    plan: "Basic",
    expiresOn: "15 May 2026",
    daysLeft: 23,
    lastInvoice: "INV-2026-0020",
    amount: "₹12,000",
    status: "Warning",
    autoReminder: true,
  },
  {
    school: "Bharatiya Vidya Bhavan, Hyderabad",
    plan: "Professional",
    expiresOn: "20 May 2026",
    daysLeft: 28,
    lastInvoice: "INV-2026-0012",
    amount: "₹24,000",
    status: "Warning",
    autoReminder: false,
  },
  {
    school: "Ryan International School, Pune",
    plan: "Professional",
    expiresOn: "05 Jun 2026",
    daysLeft: 44,
    lastInvoice: "INV-2026-0006",
    amount: "₹24,000",
    status: "Safe",
    autoReminder: true,
  },
  {
    school: "Scindia School, Gwalior",
    plan: "Enterprise",
    expiresOn: "01 Aug 2026",
    daysLeft: 100,
    lastInvoice: "INV-2026-0009",
    amount: "₹48,000",
    status: "Safe",
    autoReminder: true,
  },
  {
    school: "DAV Public School, Kolkata",
    plan: "Professional",
    expiresOn: "10 Jan 2027",
    daysLeft: 263,
    lastInvoice: "INV-2026-0004",
    amount: "₹24,000",
    status: "Safe",
    autoReminder: true,
  },
  {
    school: "Sacred Heart School, Chandigarh",
    plan: "Basic",
    expiresOn: "01 Jun 2026",
    daysLeft: 40,
    lastInvoice: "INV-2026-0018",
    amount: "₹12,000",
    status: "Safe",
    autoReminder: false,
  },
  {
    school: "Amity International School, Lucknow",
    plan: "Professional",
    expiresOn: "01 May 2027",
    daysLeft: 374,
    lastInvoice: "INV-2026-0007",
    amount: "₹24,000",
    status: "Safe",
    autoReminder: true,
  },
];

// ─── GST data ─────────────────────────────────────────────────────────────────

type FilingStatus = "Filed" | "Pending" | "Overdue";

interface GSTRecord {
  month: string;
  taxable: string;
  cgst: string;
  sgst: string;
  igst: string;
  total: string;
  filing: FilingStatus;
}

const gstData: GSTRecord[] = [
  {
    month: "May 2025",
    taxable: "₹49.57 L",
    cgst: "₹4.46 L",
    sgst: "₹4.46 L",
    igst: "₹0",
    total: "₹8.92 L",
    filing: "Filed",
  },
  {
    month: "Jun 2025",
    taxable: "₹54.07 L",
    cgst: "₹4.87 L",
    sgst: "₹4.87 L",
    igst: "₹0",
    total: "₹9.73 L",
    filing: "Filed",
  },
  {
    month: "Jul 2025",
    taxable: "₹57.97 L",
    cgst: "₹5.22 L",
    sgst: "₹5.22 L",
    igst: "₹0",
    total: "₹10.44 L",
    filing: "Filed",
  },
  {
    month: "Aug 2025",
    taxable: "₹55.93 L",
    cgst: "₹5.03 L",
    sgst: "₹5.03 L",
    igst: "₹0",
    total: "₹10.07 L",
    filing: "Filed",
  },
  {
    month: "Sep 2025",
    taxable: "₹61.10 L",
    cgst: "₹5.50 L",
    sgst: "₹5.50 L",
    igst: "₹0",
    total: "₹11.00 L",
    filing: "Filed",
  },
  {
    month: "Oct 2025",
    taxable: "₹64.07 L",
    cgst: "₹5.77 L",
    sgst: "₹5.77 L",
    igst: "₹0",
    total: "₹11.53 L",
    filing: "Filed",
  },
  {
    month: "Nov 2025",
    taxable: "₹66.87 L",
    cgst: "₹6.02 L",
    sgst: "₹6.02 L",
    igst: "₹0",
    total: "₹12.04 L",
    filing: "Filed",
  },
  {
    month: "Dec 2025",
    taxable: "₹69.83 L",
    cgst: "₹6.28 L",
    sgst: "₹6.28 L",
    igst: "₹0",
    total: "₹12.57 L",
    filing: "Filed",
  },
  {
    month: "Jan 2026",
    taxable: "₹73.73 L",
    cgst: "₹6.64 L",
    sgst: "₹6.64 L",
    igst: "₹0",
    total: "₹13.27 L",
    filing: "Filed",
  },
  {
    month: "Feb 2026",
    taxable: "₹71.20 L",
    cgst: "₹6.41 L",
    sgst: "₹6.41 L",
    igst: "₹0",
    total: "₹12.82 L",
    filing: "Pending",
  },
  {
    month: "Mar 2026",
    taxable: "₹78.00 L",
    cgst: "₹7.02 L",
    sgst: "₹7.02 L",
    igst: "₹0",
    total: "₹14.04 L",
    filing: "Pending",
  },
  {
    month: "Apr 2026",
    taxable: "₹58.05 L",
    cgst: "₹5.22 L",
    sgst: "₹5.22 L",
    igst: "₹0",
    total: "₹10.45 L",
    filing: "Overdue",
  },
];

// ─── Extended invoices (25 records) ──────────────────────────────────────────

const extraInvoices = [
  {
    id: "inv21",
    invoiceNo: "AIPSA-2026-0021",
    schoolName: "G.D. Goenka Public School, Gurugram",
    amount: 40678,
    gstAmount: 7321,
    totalAmount: 48000,
    status: "Paid" as InvoiceStatus,
    date: "2026-02-05",
    dueDate: "2026-03-07",
    gstNo: "06AAAGD7722L1ZD",
    plan: "Enterprise" as SubscriptionPlan,
  },
  {
    id: "inv22",
    invoiceNo: "AIPSA-2026-0022",
    schoolName: "The Heritage School, Ahmedabad",
    amount: 40678,
    gstAmount: 7321,
    totalAmount: 48000,
    status: "Paid" as InvoiceStatus,
    date: "2026-01-15",
    dueDate: "2026-02-14",
    gstNo: "24AAATH2312J1ZL",
    plan: "Enterprise" as SubscriptionPlan,
  },
  {
    id: "inv23",
    invoiceNo: "AIPSA-2026-0023",
    schoolName: "Amity International School, Lucknow",
    amount: 20339,
    gstAmount: 3661,
    totalAmount: 24000,
    status: "Pending" as InvoiceStatus,
    date: "2026-04-10",
    dueDate: "2026-05-10",
    gstNo: "09AAAMA4411D1ZK",
    plan: "Professional" as SubscriptionPlan,
  },
  {
    id: "inv24",
    invoiceNo: "AIPSA-2026-0024",
    schoolName: "Kendriya Vidyalaya No. 1, Bengaluru",
    amount: 20339,
    gstAmount: 3661,
    totalAmount: 24000,
    status: "Paid" as InvoiceStatus,
    date: "2026-03-01",
    dueDate: "2026-03-31",
    gstNo: "29AAACK8721F1ZM",
    plan: "Professional" as SubscriptionPlan,
  },
  {
    id: "inv25",
    invoiceNo: "AIPSA-2026-0025",
    schoolName: "Lawrence School, Ooty",
    amount: 20339,
    gstAmount: 3661,
    totalAmount: 24000,
    status: "Draft" as InvoiceStatus,
    date: "2026-04-20",
    dueDate: "2026-05-20",
    gstNo: "33AAALW4422H1ZI",
    plan: "Professional" as SubscriptionPlan,
  },
];
const allInvoices = [...mockInvoices, ...extraInvoices];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

function PlanBadge({ plan }: { plan: SubscriptionPlan }) {
  const cls =
    plan === "Enterprise"
      ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
      : plan === "Professional"
        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
        : "bg-amber-500/10 text-amber-400 border-amber-500/20";
  return (
    <Badge variant="outline" className={`text-[11px] font-medium ${cls}`}>
      {plan}
    </Badge>
  );
}

function DaysLeftBadge({ days }: { days: number }) {
  const cls =
    days < 15
      ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
      : days < 30
        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  return (
    <Badge variant="outline" className={`text-xs font-semibold gap-1 ${cls}`}>
      {days < 15 && <AlertTriangle className="w-3 h-3" />}
      {days} days
    </Badge>
  );
}

function FilingBadge({ status }: { status: FilingStatus }) {
  const cls =
    status === "Filed"
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      : status === "Pending"
        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
        : "bg-rose-500/10 text-rose-400 border-rose-500/20";
  const Icon =
    status === "Filed"
      ? CheckCircle2
      : status === "Pending"
        ? Clock
        : AlertTriangle;
  return (
    <Badge variant="outline" className={`text-[11px] font-medium gap-1 ${cls}`}>
      <Icon className="w-3 h-3" />
      {status}
    </Badge>
  );
}

const ChartTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-lg p-3 text-xs border border-border/40 shadow-xl">
      <p className="font-semibold text-foreground mb-1.5">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="mb-0.5">
          {p.name}: ₹{p.value} L
        </p>
      ))}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState("revenue");
  const [invoiceSearch, setInvoiceSearch] = useState("");
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState("all");
  const [renewalToggles, setRenewalToggles] = useState<Record<number, boolean>>(
    Object.fromEntries(renewalData.map((r, i) => [i, r.autoReminder])),
  );

  const filteredInvoices = allInvoices.filter((inv) => {
    const matchSearch =
      invoiceSearch === "" ||
      inv.schoolName.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
      inv.invoiceNo.toLowerCase().includes(invoiceSearch.toLowerCase());
    const matchStatus =
      invoiceStatusFilter === "all" || inv.status === invoiceStatusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6" data-ocid="finance.page">
      <PageHeader
        title="Finance & Billing"
        description="Subscription revenue, GST invoicing, renewals, and tax compliance for AIPSA."
        actions={
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2"
              data-ocid="finance.export.button"
            >
              <Download className="w-4 h-4" />
              Export Report
            </Button>
            <Button
              type="button"
              size="sm"
              className="gap-2"
              data-ocid="finance.create-invoice.button"
            >
              <FileText className="w-4 h-4" />
              Generate Invoice
            </Button>
          </>
        }
      />

      {/* KPI Tiles */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="finance.kpi.section"
      >
        <KPICard
          title="Total Revenue FY 24-25"
          value="₹8.2 Cr"
          change={14.8}
          changeType="up"
          icon={IndianRupee}
          color="blue"
          subtitle="Annual subscription revenue"
        />
        <KPICard
          title="Monthly MRR"
          value="₹68.5 L"
          change={9.7}
          changeType="up"
          icon={TrendingUp}
          color="emerald"
          subtitle="Apr 2026 recurring revenue"
        />
        <KPICard
          title="Pending Payments"
          value="₹24.3 L"
          change={3.2}
          changeType="down"
          icon={Clock}
          color="amber"
          subtitle="6 invoices outstanding"
        />
        <KPICard
          title="GST Collected"
          value="₹1.47 Cr"
          change={12.1}
          changeType="up"
          icon={Receipt}
          color="violet"
          subtitle="CGST + SGST FY 24-25"
        />
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        data-ocid="finance.tabs"
      >
        <TabsList className="bg-card border border-border/50 p-1 h-auto gap-0.5">
          {(
            ["revenue", "subscriptions", "invoices", "renewals", "gst"] as const
          ).map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              data-ocid={`finance.${tab}.tab`}
              className="text-sm px-4 py-2 capitalize data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              {tab === "gst"
                ? "GST Reports"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ── Tab 1: Revenue Overview ─────────────────────────────────────────── */}
        <TabsContent
          value="revenue"
          className="mt-6 space-y-6"
          data-ocid="finance.revenue.section"
        >
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Area + Line chart */}
            <Card className="xl:col-span-2 glass border-border/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-foreground">
                  Monthly Revenue — FY 24-25 vs FY 23-24
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Values in ₹ Lakhs
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart
                    data={revenueChartData}
                    margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="currentGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="oklch(0.3 0.005 264 / 0.4)"
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 11, fill: "oklch(0.6 0 0)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "oklch(0.6 0 0)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Area
                      type="monotone"
                      dataKey="current"
                      name="FY 24-25"
                      stroke="#3b82f6"
                      strokeWidth={2.5}
                      fill="url(#currentGrad)"
                      dot={false}
                      activeDot={{ r: 5, fill: "#3b82f6" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="prev"
                      name="FY 23-24"
                      stroke="oklch(0.5 0.01 268)"
                      strokeWidth={1.5}
                      strokeDasharray="5 3"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Plan breakdown */}
            <Card className="glass border-border/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-foreground">
                  Revenue by Plan
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  FY 24-25 breakdown
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                {revenueByPlan.map((item) => (
                  <div key={item.plan} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">
                        {item.plan}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs">
                          {item.amount}
                        </span>
                        <span className="font-bold text-foreground">
                          {item.percent}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${item.percent}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
                <div className="pt-3 mt-3 border-t border-border/40 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      Enterprise schools
                    </span>
                    <span className="text-foreground font-medium">
                      7 schools
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      Professional schools
                    </span>
                    <span className="text-foreground font-medium">
                      8 schools
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Basic schools</span>
                    <span className="text-foreground font-medium">
                      5 schools
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue by State */}
          <Card className="glass border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-foreground">
                Revenue by State — Top 8
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/40">
                      {[
                        "State",
                        "Schools",
                        "Total Revenue",
                        "Avg Revenue / School",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3 pr-6 first:pl-0"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {revenueByState.map((row, i) => (
                      <tr
                        key={row.state}
                        className="hover:bg-muted/20 transition-colors"
                        data-ocid={`finance.state.item.${i + 1}`}
                      >
                        <td className="py-3 pr-6 font-medium text-foreground">
                          {row.state}
                        </td>
                        <td className="py-3 pr-6 text-muted-foreground">
                          {row.schools}
                        </td>
                        <td className="py-3 pr-6 font-semibold text-foreground tabular-nums">
                          {row.revenue}
                        </td>
                        <td className="py-3 text-muted-foreground tabular-nums">
                          {row.avg}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab 2: Subscriptions ──────────────────────────────────────────────── */}
        <TabsContent
          value="subscriptions"
          className="mt-6 space-y-4"
          data-ocid="finance.subscriptions.section"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                name: "Basic",
                price: "₹12,000 / year",
                limit: "Up to 500 students",
                cls: "border-amber-500/30 bg-amber-500/5",
              },
              {
                name: "Professional",
                price: "₹24,000 / year",
                limit: "Up to 2,000 students",
                cls: "border-blue-500/30 bg-blue-500/5",
              },
              {
                name: "Enterprise",
                price: "₹48,000 / year",
                limit: "Unlimited students",
                cls: "border-violet-500/30 bg-violet-500/5",
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`glass rounded-xl p-4 border ${plan.cls}`}
              >
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {plan.name}
                </p>
                <p className="text-xl font-display font-bold text-foreground mt-1">
                  {plan.price}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {plan.limit}
                </p>
              </div>
            ))}
          </div>

          <Card className="glass border-border/40">
            <CardContent className="p-0">
              <ScrollArea className="h-[520px]">
                <table className="w-full text-sm min-w-[800px]">
                  <thead className="sticky top-0 bg-card/90 backdrop-blur-sm z-10">
                    <tr className="border-b border-border/40">
                      {[
                        "School Name",
                        "Plan",
                        "Amount (₹)",
                        "Start Date",
                        "End Date",
                        "Auto-Renew",
                        "Status",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {mockSubscriptions.map((sub, i) => (
                      <tr
                        key={sub.id}
                        className="hover:bg-muted/20 transition-colors"
                        data-ocid={`finance.subscription.item.${i + 1}`}
                      >
                        <td className="px-4 py-3 font-medium text-foreground max-w-[200px]">
                          <span className="truncate block text-sm">
                            {sub.schoolName}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <PlanBadge plan={sub.plan} />
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground tabular-nums">
                          ₹{fmt(sub.amount)}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">
                          {sub.startDate}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">
                          {sub.endDate}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs font-medium ${sub.autoRenew ? "text-emerald-400" : "text-muted-foreground"}`}
                          >
                            {sub.autoRenew ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={sub.status} />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                              data-ocid={`finance.renew.button.${i + 1}`}
                            >
                              Renew
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs"
                              data-ocid={`finance.upgrade.button.${i + 1}`}
                            >
                              Upgrade
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                              data-ocid={`finance.dl-invoice.button.${i + 1}`}
                            >
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab 3: Invoices ───────────────────────────────────────────────────── */}
        <TabsContent
          value="invoices"
          className="mt-6 space-y-4"
          data-ocid="finance.invoices.section"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices or school..."
                value={invoiceSearch}
                onChange={(e) => setInvoiceSearch(e.target.value)}
                className="pl-9 bg-card border-border/50 h-9"
                data-ocid="finance.invoice.search_input"
              />
            </div>
            <Select
              value={invoiceStatusFilter}
              onValueChange={setInvoiceStatusFilter}
            >
              <SelectTrigger
                className="w-36 h-9 bg-card border-border/50"
                data-ocid="finance.invoice.status.select"
              >
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2 h-9"
              data-ocid="finance.bulk-download.button"
            >
              <Download className="w-4 h-4" />
              Bulk Download
            </Button>
          </div>

          <Card className="glass border-border/40">
            <CardContent className="p-0">
              <ScrollArea className="h-[460px]">
                <table className="w-full text-sm min-w-[900px]">
                  <thead className="sticky top-0 bg-card/90 backdrop-blur-sm z-10">
                    <tr className="border-b border-border/40">
                      {[
                        "Invoice No",
                        "School",
                        "GSTIN",
                        "Date",
                        "Sub-total",
                        "CGST (9%)",
                        "SGST (9%)",
                        "Total",
                        "Status",
                        "",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-3 whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {filteredInvoices.map((inv, i) => {
                      const cgst = Math.round(inv.gstAmount / 2);
                      const sgst = inv.gstAmount - cgst;
                      return (
                        <tr
                          key={inv.id}
                          className="hover:bg-muted/20 transition-colors"
                          data-ocid={`finance.invoice.item.${i + 1}`}
                        >
                          <td className="px-3 py-3 font-mono text-xs text-blue-400 whitespace-nowrap">
                            {inv.invoiceNo}
                          </td>
                          <td className="px-3 py-3 font-medium text-foreground max-w-[160px]">
                            <span className="truncate block text-xs">
                              {inv.schoolName}
                            </span>
                          </td>
                          <td className="px-3 py-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                            {inv.gstNo}
                          </td>
                          <td className="px-3 py-3 text-muted-foreground text-xs whitespace-nowrap">
                            {inv.date}
                          </td>
                          <td className="px-3 py-3 text-foreground tabular-nums text-xs">
                            ₹{fmt(inv.amount)}
                          </td>
                          <td className="px-3 py-3 text-emerald-400 tabular-nums text-xs">
                            ₹{fmt(cgst)}
                          </td>
                          <td className="px-3 py-3 text-emerald-400 tabular-nums text-xs">
                            ₹{fmt(sgst)}
                          </td>
                          <td className="px-3 py-3 font-semibold text-foreground tabular-nums text-xs">
                            ₹{fmt(inv.totalAmount)}
                          </td>
                          <td className="px-3 py-3">
                            <StatusBadge status={inv.status} />
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-1">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                data-ocid={`finance.invoice.download.button.${i + 1}`}
                              >
                                <Download className="w-3 h-3" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                data-ocid={`finance.invoice.view.button.${i + 1}`}
                              >
                                <FileText className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Tax summary footer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="glass border-emerald-500/20 bg-emerald-500/5">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Total CGST Collected
                </p>
                <p className="text-2xl font-display font-bold text-emerald-400 mt-1">
                  ₹18.65 L
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Feb–Apr 2026 (3 months)
                </p>
              </CardContent>
            </Card>
            <Card className="glass border-emerald-500/20 bg-emerald-500/5">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Total SGST Collected
                </p>
                <p className="text-2xl font-display font-bold text-emerald-400 mt-1">
                  ₹18.65 L
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Feb–Apr 2026 (3 months)
                </p>
              </CardContent>
            </Card>
            <Card className="glass border-blue-500/20 bg-blue-500/5">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Total GST Liability
                </p>
                <p className="text-2xl font-display font-bold text-blue-400 mt-1">
                  ₹37.31 L
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  CGST + SGST combined
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Tab 4: Renewals ───────────────────────────────────────────────────── */}
        <TabsContent
          value="renewals"
          className="mt-6 space-y-4"
          data-ocid="finance.renewals.section"
        >
          <div className="flex items-center gap-5 flex-wrap">
            {[
              { color: "bg-rose-400", label: "Critical (< 15 days)" },
              { color: "bg-amber-400", label: "Warning (15–30 days)" },
              { color: "bg-emerald-400", label: "Safe (30+ days)" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                <span className="text-xs text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <Card className="glass border-border/40">
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm min-w-[860px]">
                <thead>
                  <tr className="border-b border-border/40">
                    {[
                      "School",
                      "Plan",
                      "Expires On",
                      "Days Left",
                      "Last Invoice",
                      "Amount",
                      "Auto-Reminder",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {renewalData.map((row, i) => (
                    <tr
                      key={row.school}
                      className={`hover:bg-muted/20 transition-colors ${row.status === "Critical" ? "bg-rose-500/5" : row.status === "Warning" ? "bg-amber-500/5" : ""}`}
                      data-ocid={`finance.renewal.item.${i + 1}`}
                    >
                      <td className="px-4 py-3 font-medium text-foreground max-w-[220px]">
                        <span className="truncate block text-sm">
                          {row.school}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <PlanBadge plan={row.plan} />
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                        {row.expiresOn}
                      </td>
                      <td className="px-4 py-3">
                        <DaysLeftBadge days={row.daysLeft} />
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-blue-400">
                        {row.lastInvoice}
                      </td>
                      <td className="px-4 py-3 font-semibold text-foreground tabular-nums">
                        {row.amount}
                      </td>
                      <td className="px-4 py-3">
                        <Switch
                          checked={renewalToggles[i] ?? row.autoReminder}
                          onCheckedChange={(v) =>
                            setRenewalToggles((prev) => ({ ...prev, [i]: v }))
                          }
                          data-ocid={`finance.auto-reminder.switch.${i + 1}`}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs gap-1 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
                            data-ocid={`finance.send-reminder.button.${i + 1}`}
                          >
                            <Bell className="w-3 h-3" />
                            Remind
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs gap-1 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                            data-ocid={`finance.renew-school.button.${i + 1}`}
                          >
                            <RefreshCw className="w-3 h-3" />
                            Renew
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab 5: GST Reports ────────────────────────────────────────────────── */}
        <TabsContent
          value="gst"
          className="mt-6 space-y-6"
          data-ocid="finance.gst.section"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="glass border-blue-500/20 bg-blue-500/5">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  GSTR-1 Output Liability
                </p>
                <p className="text-2xl font-display font-bold text-blue-400 mt-1">
                  ₹1.47 Cr
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Total output GST — FY 24-25
                </p>
              </CardContent>
            </Card>
            <Card className="glass border-emerald-500/20 bg-emerald-500/5">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  GSTR-3B Net Payable
                </p>
                <p className="text-2xl font-display font-bold text-emerald-400 mt-1">
                  ₹1.32 Cr
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  After ITC adjustments
                </p>
              </CardContent>
            </Card>
            <Card className="glass border-amber-500/20 bg-amber-500/5">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Pending GST Filing
                </p>
                <p className="text-2xl font-display font-bold text-amber-400 mt-1">
                  3 Months
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Feb, Mar, Apr 2026 — action required
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                GSTR-1 Monthly Summary — FY 24-25
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <table className="w-full text-sm min-w-[700px]">
                  <thead className="sticky top-0 bg-card/90 backdrop-blur-sm z-10">
                    <tr className="border-b border-border/40">
                      {[
                        "Month",
                        "Taxable Value",
                        "CGST (9%)",
                        "SGST (9%)",
                        "IGST",
                        "Total GST",
                        "Filing Status",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {gstData.map((row, i) => (
                      <tr
                        key={row.month}
                        className="hover:bg-muted/20 transition-colors"
                        data-ocid={`finance.gst.item.${i + 1}`}
                      >
                        <td className="px-4 py-3 font-medium text-foreground">
                          {row.month}
                        </td>
                        <td className="px-4 py-3 tabular-nums text-foreground">
                          {row.taxable}
                        </td>
                        <td className="px-4 py-3 tabular-nums text-emerald-400">
                          {row.cgst}
                        </td>
                        <td className="px-4 py-3 tabular-nums text-emerald-400">
                          {row.sgst}
                        </td>
                        <td className="px-4 py-3 tabular-nums text-muted-foreground">
                          {row.igst}
                        </td>
                        <td className="px-4 py-3 tabular-nums font-semibold text-foreground">
                          {row.total}
                        </td>
                        <td className="px-4 py-3">
                          <FilingBadge status={row.filing} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
