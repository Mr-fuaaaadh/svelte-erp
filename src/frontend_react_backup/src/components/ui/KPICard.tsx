import { cn } from "@/lib/utils";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import type { ElementType } from "react";

interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  changeType?: "up" | "down" | "neutral";
  icon: ElementType;
  color?: "blue" | "emerald" | "amber" | "rose" | "violet" | "cyan";
  subtitle?: string;
}

const colorMap = {
  blue: {
    icon: "bg-blue-500/10 text-blue-400",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.1)]",
    border: "border-blue-500/20",
  },
  emerald: {
    icon: "bg-emerald-500/10 text-emerald-400",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.1)]",
    border: "border-emerald-500/20",
  },
  amber: {
    icon: "bg-amber-500/10 text-amber-400",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.1)]",
    border: "border-amber-500/20",
  },
  rose: {
    icon: "bg-rose-500/10 text-rose-400",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.1)]",
    border: "border-rose-500/20",
  },
  violet: {
    icon: "bg-violet-500/10 text-violet-400",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.1)]",
    border: "border-violet-500/20",
  },
  cyan: {
    icon: "bg-cyan-500/10 text-cyan-400",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.1)]",
    border: "border-cyan-500/20",
  },
};

export default function KPICard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  color = "blue",
  subtitle,
}: KPICardProps) {
  const colors = colorMap[color];

  return (
    <div
      className={cn(
        "relative glass rounded-xl p-5 border transition-all duration-200 hover:scale-[1.02] hover:shadow-glass-elevated group cursor-default",
        colors.glow,
        colors.border,
      )}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-card/60 to-card/20 pointer-events-none" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2 min-w-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-display font-bold text-foreground leading-tight">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {change !== undefined && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                changeType === "up" && "trend-up",
                changeType === "down" && "trend-down",
                changeType === "neutral" && "text-muted-foreground",
              )}
            >
              {changeType === "up" && <TrendingUp className="w-3 h-3" />}
              {changeType === "down" && <TrendingDown className="w-3 h-3" />}
              {changeType === "neutral" && <Minus className="w-3 h-3" />}
              <span>
                {changeType !== "neutral" && (changeType === "up" ? "+" : "-")}
                {Math.abs(change)}% vs last month
              </span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-lg shrink-0",
            colors.icon,
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
