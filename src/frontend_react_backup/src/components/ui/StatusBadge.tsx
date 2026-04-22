import type { badgeVariants } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

type BadgeProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof badgeVariants>;

type StatusVariant =
  | "Active"
  | "Inactive"
  | "Pending"
  | "Expired"
  | "Paid"
  | "Overdue"
  | "Partial"
  | "On Leave"
  | "Resigned"
  | "Won"
  | "Lost"
  | "New"
  | "Contacted"
  | "Demo Scheduled"
  | "Proposal Sent"
  | "Negotiation"
  | "Draft"
  | "Trial"
  | "Cancelled";

interface StatusBadgeProps extends Omit<BadgeProps, "children"> {
  status: StatusVariant;
  dot?: boolean;
}

const statusConfig: Record<
  StatusVariant,
  { label: string; className: string; dotColor: string }
> = {
  Active: {
    label: "Active",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dotColor: "bg-emerald-400",
  },
  Inactive: {
    label: "Inactive",
    className: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    dotColor: "bg-rose-400",
  },
  Pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dotColor: "bg-amber-400",
  },
  Expired: {
    label: "Expired",
    className: "bg-muted text-muted-foreground border-border",
    dotColor: "bg-muted-foreground",
  },
  Paid: {
    label: "Paid",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dotColor: "bg-emerald-400",
  },
  Overdue: {
    label: "Overdue",
    className: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    dotColor: "bg-rose-400",
  },
  Partial: {
    label: "Partial",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dotColor: "bg-amber-400",
  },
  "On Leave": {
    label: "On Leave",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    dotColor: "bg-blue-400",
  },
  Resigned: {
    label: "Resigned",
    className: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    dotColor: "bg-rose-400",
  },
  Won: {
    label: "Won",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dotColor: "bg-emerald-400",
  },
  Lost: {
    label: "Lost",
    className: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    dotColor: "bg-rose-400",
  },
  New: {
    label: "New",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    dotColor: "bg-blue-400",
  },
  Contacted: {
    label: "Contacted",
    className: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    dotColor: "bg-violet-400",
  },
  "Demo Scheduled": {
    label: "Demo",
    className: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    dotColor: "bg-cyan-400",
  },
  "Proposal Sent": {
    label: "Proposal",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dotColor: "bg-amber-400",
  },
  Negotiation: {
    label: "Negotiation",
    className: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    dotColor: "bg-orange-400",
  },
  Draft: {
    label: "Draft",
    className: "bg-muted text-muted-foreground border-border",
    dotColor: "bg-muted-foreground",
  },
  Trial: {
    label: "Trial",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    dotColor: "bg-blue-400",
  },
  Cancelled: {
    label: "Cancelled",
    className: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    dotColor: "bg-rose-400",
  },
};

export default function StatusBadge({
  status,
  dot = true,
  className,
  ...props
}: StatusBadgeProps) {
  const config = statusConfig[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground border-border",
    dotColor: "bg-muted-foreground",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[11px] font-medium px-2 py-0.5 gap-1.5 border",
        config.className,
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", config.dotColor)}
        />
      )}
      {config.label}
    </Badge>
  );
}
