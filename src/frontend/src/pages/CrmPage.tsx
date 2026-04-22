import DataTable from "@/components/ui/DataTable";
import KPICard from "@/components/ui/KPICard";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockInvoices, mockLeads } from "@/data/mockData";
import { useCrmStore } from "@/store/crmStore";
import type { Invoice, InvoiceStatus, Lead, LeadStage } from "@/types";
import {
  Award,
  Calendar,
  CheckCircle2,
  Download,
  IndianRupee,
  Mail,
  MapPin,
  Phone,
  Send,
  TrendingUp,
  Users,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CommissionRecord {
  id: string;
  repName: string;
  schoolsClosed: number;
  revenueGenerated: number;
  commissionRate: number;
  commissionEarned: number;
  status: "Paid" | "Pending" | "Processing";
  tier: "Bronze" | "Silver" | "Gold";
}

// ─── Mock data ─────────────────────────────────────────────────────────────────

const mockCommissions: CommissionRecord[] = [
  {
    id: "c1",
    repName: "Arjun Mehta",
    schoolsClosed: 8,
    revenueGenerated: 336000,
    commissionRate: 7,
    commissionEarned: 23520,
    status: "Paid",
    tier: "Gold",
  },
  {
    id: "c2",
    repName: "Priya Nair",
    schoolsClosed: 11,
    revenueGenerated: 528000,
    commissionRate: 8,
    commissionEarned: 42240,
    status: "Paid",
    tier: "Gold",
  },
  {
    id: "c3",
    repName: "Vikram Rathore",
    schoolsClosed: 14,
    revenueGenerated: 672000,
    commissionRate: 8,
    commissionEarned: 53760,
    status: "Paid",
    tier: "Gold",
  },
  {
    id: "c4",
    repName: "Sneha Joshi",
    schoolsClosed: 6,
    revenueGenerated: 288000,
    commissionRate: 7,
    commissionEarned: 20160,
    status: "Processing",
    tier: "Silver",
  },
  {
    id: "c5",
    repName: "Amit Patil",
    schoolsClosed: 4,
    revenueGenerated: 144000,
    commissionRate: 6,
    commissionEarned: 8640,
    status: "Pending",
    tier: "Bronze",
  },
  {
    id: "c6",
    repName: "Deepa Krishnan",
    schoolsClosed: 17,
    revenueGenerated: 1056000,
    commissionRate: 8,
    commissionEarned: 84480,
    status: "Paid",
    tier: "Gold",
  },
  {
    id: "c7",
    repName: "Rajiv Sinha",
    schoolsClosed: 3,
    revenueGenerated: 96000,
    commissionRate: 5,
    commissionEarned: 4800,
    status: "Pending",
    tier: "Bronze",
  },
  {
    id: "c8",
    repName: "Pooja Agarwal",
    schoolsClosed: 9,
    revenueGenerated: 432000,
    commissionRate: 7,
    commissionEarned: 30240,
    status: "Processing",
    tier: "Silver",
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function commissionStatusClass(status: CommissionRecord["status"]) {
  if (status === "Paid")
    return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  if (status === "Processing")
    return "bg-blue-500/10 text-blue-400 border-blue-500/20";
  return "bg-amber-500/10 text-amber-400 border-amber-500/20";
}

function tierClass(tier: CommissionRecord["tier"]) {
  if (tier === "Gold")
    return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  if (tier === "Silver")
    return "bg-slate-400/10 text-slate-300 border-slate-400/20";
  return "bg-orange-700/10 text-orange-400 border-orange-700/20";
}

const PIPELINE_STAGES = [
  "Prospect",
  "Demo Scheduled",
  "Proposal Sent",
  "Won",
] as const;

// Group leads to 4 kanban columns (merge New/Contacted/Negotiation → Prospect)
function toKanban(leads: Lead[]) {
  const cols: Record<string, Lead[]> = {
    Prospect: [],
    "Demo Scheduled": [],
    "Proposal Sent": [],
    Won: [],
  };
  for (const l of leads) {
    if (l.stage === "Demo Scheduled") cols["Demo Scheduled"]!.push(l);
    else if (l.stage === "Proposal Sent") cols["Proposal Sent"]!.push(l);
    else if (l.stage === "Won") cols.Won!.push(l);
    else if (l.stage !== "Lost") cols.Prospect!.push(l);
  }
  return cols;
}

const KANBAN_CONFIG = {
  Prospect: {
    color: "border-blue-500/30 bg-blue-500/5",
    header: "bg-blue-500/10 text-blue-300",
    dot: "bg-blue-400",
  },
  "Demo Scheduled": {
    color: "border-cyan-500/30 bg-cyan-500/5",
    header: "bg-cyan-500/10 text-cyan-300",
    dot: "bg-cyan-400",
  },
  "Proposal Sent": {
    color: "border-amber-500/30 bg-amber-500/5",
    header: "bg-amber-500/10 text-amber-300",
    dot: "bg-amber-400",
  },
  Won: {
    color: "border-emerald-500/30 bg-emerald-500/5",
    header: "bg-emerald-500/10 text-emerald-300",
    dot: "bg-emerald-400",
  },
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function KanbanCard({ lead, index }: { lead: Lead; index: number }) {
  return (
    <div
      className="glass-hover rounded-lg p-3 cursor-pointer"
      data-ocid={`crm.pipeline.card.${index}`}
    >
      <p className="text-xs font-semibold leading-snug mb-1.5 line-clamp-2 text-foreground">
        {lead.schoolName}
      </p>
      <div className="flex items-center gap-1 mb-1">
        <MapPin className="w-2.5 h-2.5 text-muted-foreground shrink-0" />
        <span className="text-[10px] text-muted-foreground truncate">
          {lead.district}, {lead.state}
        </span>
      </div>
      <div className="flex items-center gap-1 mb-1">
        <Phone className="w-2.5 h-2.5 text-muted-foreground shrink-0" />
        <span className="text-[10px] text-muted-foreground truncate">
          {lead.contactName}
        </span>
      </div>
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/30">
        <span className="text-[11px] font-bold text-accent">
          {fmt(lead.value)}
          <span className="font-normal text-muted-foreground">/yr</span>
        </span>
        <div className="flex items-center gap-1">
          <Calendar className="w-2.5 h-2.5 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">
            {lead.nextFollowup}
          </span>
        </div>
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">
          {lead.assignedTo === "Unassigned" ? (
            <span className="text-rose-400">Unassigned</span>
          ) : (
            lead.assignedTo
          )}
        </span>
        <StatusBadge status={lead.stage} dot={false} />
      </div>
    </div>
  );
}

function KanbanColumn({
  stage,
  leads,
}: {
  stage: string;
  leads: Lead[];
}) {
  const cfg = KANBAN_CONFIG[stage as keyof typeof KANBAN_CONFIG];
  const totalValue = leads.reduce((s, l) => s + l.value, 0);

  return (
    <div
      className={`flex-1 min-w-[230px] rounded-xl border ${cfg.color} flex flex-col`}
      data-ocid={`crm.pipeline.column.${stage.toLowerCase().replace(/\s+/g, "_")}`}
    >
      {/* Column header */}
      <div
        className={`px-3 py-2 rounded-t-xl ${cfg.header} flex items-center justify-between`}
      >
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          <span className="text-[11px] font-bold uppercase tracking-wider">
            {stage}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge
            variant="outline"
            className="text-[10px] h-4 px-1.5 border-current/30"
          >
            {leads.length}
          </Badge>
          {totalValue > 0 && (
            <span className="text-[10px] font-medium opacity-80">
              {fmt(totalValue)}
            </span>
          )}
        </div>
      </div>
      {/* Cards */}
      <div className="p-2 space-y-2 flex-1 overflow-y-auto max-h-[580px]">
        {leads.map((lead, i) => (
          <KanbanCard key={lead.id} lead={lead} index={i + 1} />
        ))}
        {leads.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-8 gap-2"
            data-ocid={`crm.pipeline.column.${stage.toLowerCase().replace(/\s+/g, "_")}.empty_state`}
          >
            <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
              <Users className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-[11px] text-muted-foreground">No leads</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function CrmPage() {
  const { leads } = useCrmStore();

  // KPI calculations
  const demosThisWeek = leads.filter(
    (l) => l.stage === "Demo Scheduled",
  ).length;
  const wonLeads = leads.filter((l) => l.stage === "Won");
  const conversionRate =
    leads.length > 0
      ? ((wonLeads.length / leads.length) * 100).toFixed(1)
      : "0.0";
  const revenueThisMonth = wonLeads.reduce((s, l) => s + l.value, 0);

  // Kanban
  const kanbanCols = toKanban(leads);

  // Invoice totals
  const invoiceTotalRevenue = mockInvoices
    .filter((i) => i.status === "Paid")
    .reduce((s, i) => s + i.amount, 0);
  const invoiceTotalGst = mockInvoices
    .filter((i) => i.status === "Paid")
    .reduce((s, i) => s + i.gstAmount, 0);

  // Commission totals
  const totalCommissionPaid = mockCommissions
    .filter((c) => c.status === "Paid")
    .reduce((s, c) => s + c.commissionEarned, 0);

  return (
    <div className="space-y-6" data-ocid="crm.page">
      <PageHeader
        title="CRM & Sales Pipeline"
        description="Lead management, demos, subscriptions, invoices and commissions"
        actions={
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              data-ocid="crm.export_button"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Export
            </Button>
            <Button type="button" size="sm" data-ocid="crm.add_lead_button">
              + New Lead
            </Button>
          </>
        }
      />

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          title="Total Leads"
          value={leads.length.toString()}
          icon={TrendingUp}
          color="blue"
          change={18.3}
          changeType="up"
          subtitle="Active pipeline"
        />
        <KPICard
          title="Demos This Week"
          value={demosThisWeek.toString()}
          icon={Calendar}
          color="cyan"
          change={5.0}
          changeType="up"
          subtitle="Scheduled demos"
        />
        <KPICard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          icon={CheckCircle2}
          color="emerald"
          change={2.1}
          changeType="up"
          subtitle="Won vs total leads"
        />
        <KPICard
          title="Revenue This Month"
          value={`₹${(revenueThisMonth / 100000).toFixed(2)}L`}
          icon={IndianRupee}
          color="amber"
          change={9.7}
          changeType="up"
          subtitle="From closed deals"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pipeline" data-ocid="crm.tabs">
        <TabsList className="h-9 bg-muted/40 border border-border/50">
          <TabsTrigger
            value="pipeline"
            className="text-xs"
            data-ocid="crm.tab.pipeline"
          >
            Pipeline
          </TabsTrigger>
          <TabsTrigger
            value="leads"
            className="text-xs"
            data-ocid="crm.tab.leads"
          >
            Leads
          </TabsTrigger>
          <TabsTrigger
            value="invoices"
            className="text-xs"
            data-ocid="crm.tab.invoices"
          >
            Invoices
          </TabsTrigger>
          <TabsTrigger
            value="commissions"
            className="text-xs"
            data-ocid="crm.tab.commissions"
          >
            Commissions
          </TabsTrigger>
        </TabsList>

        {/* ── Pipeline Tab ─────────────────────────────────── */}
        <TabsContent value="pipeline" className="mt-4">
          <div className="overflow-x-auto pb-4">
            <div
              className="flex gap-3 min-w-[960px]"
              data-ocid="crm.pipeline.board"
            >
              {PIPELINE_STAGES.map((stage) => (
                <KanbanColumn
                  key={stage}
                  stage={stage}
                  leads={kanbanCols[stage] ?? []}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ── Leads Tab ────────────────────────────────────── */}
        <TabsContent value="leads" className="mt-4">
          <DataTable<Lead>
            data={leads}
            searchPlaceholder="Search school, contact, state…"
            emptyMessage="No leads found"
            columns={[
              {
                key: "schoolName",
                header: "School Name",
                render: (v) => (
                  <span className="font-medium text-xs text-foreground">
                    {String(v)}
                  </span>
                ),
              },
              {
                key: "state",
                header: "State",
                render: (v) => <span className="text-xs">{String(v)}</span>,
              },
              {
                key: "district",
                header: "District",
                render: (v) => (
                  <span className="text-xs text-muted-foreground">
                    {String(v)}
                  </span>
                ),
              },
              {
                key: "contactName",
                header: "Contact",
                render: (v) => <span className="text-xs">{String(v)}</span>,
              },
              {
                key: "phone",
                header: "Phone",
                render: (v) => (
                  <span className="text-xs text-muted-foreground font-mono">
                    {String(v)}
                  </span>
                ),
              },
              {
                key: "stage",
                header: "Stage",
                sortable: false,
                render: (v) => <StatusBadge status={v as LeadStage} />,
              },
              {
                key: "value",
                header: "Value",
                render: (v) => (
                  <span className="font-mono text-xs font-semibold text-accent">
                    {fmt(Number(v))}
                  </span>
                ),
              },
              {
                key: "assignedTo",
                header: "Assigned To",
                render: (v) => (
                  <span
                    className={`text-xs ${String(v) === "Unassigned" ? "text-rose-400" : "text-foreground"}`}
                  >
                    {String(v)}
                  </span>
                ),
              },
              {
                key: "nextFollowup",
                header: "Next Follow-up",
                render: (v) => (
                  <span className="text-xs text-muted-foreground">
                    {String(v)}
                  </span>
                ),
              },
            ]}
            rowActions={[
              {
                label: "View",
                onClick: () => {},
              },
              {
                label: "Edit",
                onClick: () => {},
              },
              {
                label: "Move Stage",
                onClick: () => {},
              },
              {
                label: "Delete",
                onClick: () => {},
                destructive: true,
              },
            ]}
          />
        </TabsContent>

        {/* ── Invoices Tab ─────────────────────────────────── */}
        <TabsContent value="invoices" className="mt-4">
          <div className="space-y-3" data-ocid="crm.invoices.section">
            <DataTable<Invoice>
              data={mockInvoices}
              searchPlaceholder="Search invoice, school, GST…"
              emptyMessage="No invoices found"
              columns={[
                {
                  key: "invoiceNo",
                  header: "Invoice #",
                  render: (v) => (
                    <span className="font-mono text-xs text-accent font-semibold">
                      {String(v)}
                    </span>
                  ),
                },
                {
                  key: "schoolName",
                  header: "School Name",
                  render: (v) => (
                    <span className="text-xs font-medium text-foreground">
                      {String(v)}
                    </span>
                  ),
                },
                {
                  key: "amount",
                  header: "Amount",
                  render: (v) => (
                    <span className="font-mono text-xs">{fmt(Number(v))}</span>
                  ),
                },
                {
                  key: "gstAmount",
                  header: "GST (18%)",
                  render: (v) => (
                    <span className="font-mono text-xs text-muted-foreground">
                      {fmt(Number(v))}
                    </span>
                  ),
                },
                {
                  key: "totalAmount",
                  header: "Total",
                  render: (v) => (
                    <span className="font-mono text-xs font-bold text-foreground">
                      {fmt(Number(v))}
                    </span>
                  ),
                },
                {
                  key: "status",
                  header: "Status",
                  sortable: false,
                  render: (v) => <StatusBadge status={v as InvoiceStatus} />,
                },
                {
                  key: "date",
                  header: "Date",
                  render: (v) => (
                    <span className="text-xs text-muted-foreground">
                      {String(v)}
                    </span>
                  ),
                },
                {
                  key: "dueDate",
                  header: "Due Date",
                  render: (v) => (
                    <span className="text-xs text-muted-foreground">
                      {String(v)}
                    </span>
                  ),
                },
                {
                  key: "plan",
                  header: "Plan",
                  sortable: false,
                  render: (v) => (
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 border-border/50"
                    >
                      {String(v)}
                    </Badge>
                  ),
                },
              ]}
              rowActions={[
                {
                  label: "Download",
                  icon: Download,
                  onClick: () => {},
                },
                {
                  label: "Send Email",
                  icon: Send,
                  onClick: () => {},
                },
                {
                  label: "Mark Paid",
                  icon: CheckCircle2,
                  onClick: () => {},
                },
              ]}
            />

            {/* Invoice totals summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
              <div className="glass rounded-xl p-4 border border-emerald-500/20">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
                  Total Revenue Collected
                </p>
                <p className="text-xl font-display font-bold text-emerald-400">
                  {fmt(invoiceTotalRevenue)}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  From paid invoices (excl. GST)
                </p>
              </div>
              <div className="glass rounded-xl p-4 border border-blue-500/20">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
                  Total GST Collected
                </p>
                <p className="text-xl font-display font-bold text-blue-400">
                  {fmt(invoiceTotalGst)}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  GST @ 18% — paid to GSTN
                </p>
              </div>
              <div className="glass rounded-xl p-4 border border-amber-500/20">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
                  Outstanding Invoices
                </p>
                <p className="text-xl font-display font-bold text-amber-400">
                  {fmt(
                    mockInvoices
                      .filter((i) => ["Pending", "Overdue"].includes(i.status))
                      .reduce((s, i) => s + i.totalAmount, 0),
                  )}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Pending + Overdue invoices
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ── Commissions Tab ──────────────────────────────── */}
        <TabsContent value="commissions" className="mt-4">
          <div className="space-y-4" data-ocid="crm.commissions.section">
            {/* Summary KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="glass rounded-xl p-4 border border-emerald-500/20">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
                  Total Commission Paid
                </p>
                <p className="text-lg font-display font-bold text-emerald-400">
                  {fmt(totalCommissionPaid)}
                </p>
              </div>
              <div className="glass rounded-xl p-4 border border-blue-500/20">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
                  Total Sales Reps
                </p>
                <p className="text-lg font-display font-bold text-blue-400">
                  {mockCommissions.length}
                </p>
              </div>
              <div className="glass rounded-xl p-4 border border-violet-500/20">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
                  Top Earner
                </p>
                <p className="text-lg font-display font-bold text-violet-400 truncate">
                  Deepa Krishnan
                </p>
              </div>
              <div className="glass rounded-xl p-4 border border-amber-500/20">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
                  Pending Payout
                </p>
                <p className="text-lg font-display font-bold text-amber-400">
                  {fmt(
                    mockCommissions
                      .filter(
                        (c) =>
                          c.status === "Pending" || c.status === "Processing",
                      )
                      .reduce((s, c) => s + c.commissionEarned, 0),
                  )}
                </p>
              </div>
            </div>

            {/* Commission Table */}
            <div
              className="rounded-xl border border-border overflow-hidden"
              data-ocid="crm.commissions.table"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left text-xs font-semibold px-4 py-3 text-muted-foreground">
                      Rep Name
                    </th>
                    <th className="text-left text-xs font-semibold px-4 py-3 text-muted-foreground">
                      Tier
                    </th>
                    <th className="text-right text-xs font-semibold px-4 py-3 text-muted-foreground">
                      Schools Closed
                    </th>
                    <th className="text-right text-xs font-semibold px-4 py-3 text-muted-foreground">
                      Revenue Generated
                    </th>
                    <th className="text-right text-xs font-semibold px-4 py-3 text-muted-foreground">
                      Commission Rate
                    </th>
                    <th className="text-right text-xs font-semibold px-4 py-3 text-muted-foreground">
                      Commission Earned
                    </th>
                    <th className="text-left text-xs font-semibold px-4 py-3 text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockCommissions.map((rec, i) => (
                    <tr
                      key={rec.id}
                      className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                      data-ocid={`crm.commissions.item.${i + 1}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold text-accent">
                              {rec.repName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <span className="text-xs font-medium text-foreground">
                            {rec.repName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-2 border ${tierClass(rec.tier)}`}
                        >
                          <Award className="w-2.5 h-2.5 mr-1" />
                          {rec.tier}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-xs font-mono font-semibold text-foreground">
                          {rec.schoolsClosed}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-xs font-mono text-foreground">
                          {fmt(rec.revenueGenerated)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-xs font-mono text-muted-foreground">
                          {rec.commissionRate}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {fmt(rec.commissionEarned)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-2 border ${commissionStatusClass(rec.status)}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              rec.status === "Paid"
                                ? "bg-emerald-400"
                                : rec.status === "Processing"
                                  ? "bg-blue-400"
                                  : "bg-amber-400"
                            }`}
                          />
                          {rec.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom actions */}
            <div className="flex items-center justify-between pt-1">
              <p className="text-xs text-muted-foreground">
                Showing all {mockCommissions.length} sales representatives · FY
                2025-26
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  data-ocid="crm.commissions.export_button"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Export
                </Button>
                <Button
                  type="button"
                  size="sm"
                  data-ocid="crm.commissions.payout_button"
                >
                  <Mail className="w-3.5 h-3.5 mr-1.5" />
                  Process Payouts
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
