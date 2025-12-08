"use client";

import { Check, RefreshCw, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type SyncState = "synced" | "syncing" | "failed" | "delayed";

interface SyncStatusProps {
  state: SyncState;
  lastSynced?: string;
  onRetry?: () => void;
  className?: string;
}

export function SyncStatus({ state, lastSynced, onRetry, className }: SyncStatusProps) {
  const configs = {
    synced: {
      icon: Check,
      iconClass: "text-green-500",
      text: `Synced ${lastSynced || ""}`,
      textClass: "text-gray-600",
    },
    syncing: {
      icon: RefreshCw,
      iconClass: "text-blue-500 animate-spin",
      text: "Syncing...",
      textClass: "text-blue-600",
    },
    failed: {
      icon: X,
      iconClass: "text-red-500",
      text: "Sync failed",
      textClass: "text-red-600",
    },
    delayed: {
      icon: AlertTriangle,
      iconClass: "text-yellow-500",
      text: `Sync delayed (last: ${lastSynced || "unknown"})`,
      textClass: "text-yellow-700",
    },
  };

  const config = configs[state];
  const Icon = config.icon;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Icon className={cn("w-4 h-4", config.iconClass)} />
      <span className={cn("text-sm", config.textClass)}>{config.text}</span>
      {state === "failed" && onRetry && (
        <button
          onClick={onRetry}
          className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium"
        >
          Retry
        </button>
      )}
    </div>
  );
}


