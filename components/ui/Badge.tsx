"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  variant: "success" | "warning" | "error" | "info" | "neutral" | "premium";
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  success: "bg-green-500 text-white",
  warning: "bg-yellow-500 text-white",
  error: "bg-red-500 text-white",
  info: "bg-blue-500 text-white",
  neutral: "bg-gray-500 text-white",
  premium: "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-2 border-amber-400",
};

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// Subscription Status Badge
interface StatusBadgeProps {
  status: "active" | "trial" | "expired" | "cancelled";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    active: { label: "Active", variant: "success" as const },
    trial: { label: "Trial", variant: "info" as const },
    expired: { label: "Expired", variant: "error" as const },
    cancelled: { label: "Cancelled", variant: "neutral" as const },
  };

  const config = statusConfig[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}

// License Counter Badge
interface LicenseCounterProps {
  used: number;
  total: number;
  className?: string;
}

export function LicenseCounter({ used, total, className }: LicenseCounterProps) {
  const percentage = total > 0 ? (used / total) * 100 : 0;

  let colorClasses = "bg-green-100 text-green-700 border-green-300";
  if (percentage >= 100) {
    colorClasses = "bg-red-100 text-red-700 border-red-300";
  } else if (percentage >= 80) {
    colorClasses = "bg-yellow-100 text-yellow-700 border-yellow-300";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-sm font-semibold border",
        colorClasses,
        className
      )}
    >
      {used}/{total}
    </span>
  );
}

