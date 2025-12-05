"use client";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ProgressBar({
  value,
  max,
  showLabel = true,
  size = "md",
  className,
}: ProgressBarProps) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const isExceeded = value > max;
  const actualPercentage = max > 0 ? (value / max) * 100 : 0;

  // Determine color based on percentage
  let fillColor = "bg-green-500";
  if (actualPercentage >= 100) {
    fillColor = isExceeded ? "bg-red-500" : "bg-orange-500";
  } else if (actualPercentage >= 80) {
    fillColor = "bg-yellow-500";
  }

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "w-full bg-gray-200 rounded-full overflow-hidden",
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            fillColor
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-1 text-xs text-gray-500">
          {Math.round(actualPercentage)}% used
        </p>
      )}
    </div>
  );
}

