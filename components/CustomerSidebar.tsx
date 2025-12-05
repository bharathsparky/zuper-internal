"use client";

import {
  User,
  Users,
  LayoutGrid,
  Shield,
  Wallet,
  Eye,
  FileText,
  BarChart3,
  Zap,
  CreditCard,
} from "lucide-react";

type SubscriptionStatus = "active" | "trial" | "expired" | "cancelled" | "none";

interface CustomerSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  customer: {
    name: string;
    createdDate: string;
    avatar?: string;
  };
  subscriptionStatus?: SubscriptionStatus;
}

interface MenuItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  badge?: number | string;
  statusBadge?: SubscriptionStatus;
}

const getMenuItems = (subscriptionStatus: SubscriptionStatus): MenuItem[] => [
  { id: "account-details", name: "Account Details", icon: User },
  { id: "users", name: "Users", icon: Users },
  { id: "module-access", name: "Module Access", icon: LayoutGrid },
  { id: "policy", name: "Policy", icon: Shield },
  {
    id: "subscription",
    name: "Subscription",
    icon: CreditCard,
    statusBadge: subscriptionStatus,
  },
  { id: "zuper-pay", name: "Zuper Pay", icon: Wallet },
  { id: "credentials", name: "Credentials", icon: Eye, badge: 0 },
  { id: "notes", name: "Notes", icon: FileText, badge: 0 },
  { id: "insights", name: "Insights", icon: BarChart3 },
  { id: "activity", name: "Activity", icon: Zap },
];

// Status badge configuration
const statusBadgeConfig: Record<
  SubscriptionStatus,
  { label: string; bgColor: string; textColor: string } | null
> = {
  active: { label: "Active", bgColor: "bg-green-100", textColor: "text-green-700" },
  trial: { label: "Trial", bgColor: "bg-blue-100", textColor: "text-blue-700" },
  expired: { label: "Expired", bgColor: "bg-red-100", textColor: "text-red-700" },
  cancelled: { label: "Cancelled", bgColor: "bg-gray-100", textColor: "text-gray-600" },
  none: null,
};

export default function CustomerSidebar({
  activeTab,
  onTabChange,
  customer,
  subscriptionStatus = "active",
}: CustomerSidebarProps) {
  const menuItems = getMenuItems(subscriptionStatus);

  return (
    <aside className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Customer Header */}
      <div className="px-5 py-5">
        <div className="flex items-center gap-4">
          {/* Phone/Device Icon */}
          <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Roof */}
              <path
                d="M3 11L12 4L21 11"
                stroke="#EA580C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Roof shingles */}
              <path
                d="M5 9.5L12 4L19 9.5"
                stroke="#F97316"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* House body */}
              <path
                d="M5 11V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V11"
                stroke="#64748B"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Door */}
              <rect
                x="10"
                y="14"
                width="4"
                height="6"
                rx="0.5"
                stroke="#64748B"
                strokeWidth="1.5"
              />
              {/* Window */}
              <rect
                x="14.5"
                y="12"
                width="2.5"
                height="2.5"
                rx="0.5"
                stroke="#64748B"
                strokeWidth="1"
              />
              <rect
                x="7"
                y="12"
                width="2.5"
                height="2.5"
                rx="0.5"
                stroke="#64748B"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-gray-900 truncate">
              {customer.name}
            </h2>
            <p className="text-sm text-gray-500">
              Created {customer.createdDate}
            </p>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="mx-4 border-t border-gray-200" />

      {/* Navigation Menu */}
      <nav className="p-3">
        <ul className="space-y-0.5">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            const statusConfig = item.statusBadge
              ? statusBadgeConfig[item.statusBadge]
              : null;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-[18px] h-[18px] ${
                        isActive ? "text-blue-600" : "text-gray-400"
                      }`}
                      strokeWidth={1.5}
                    />
                    <span>{item.name}</span>
                  </div>

                  {/* Subscription Status Badge */}
                  {statusConfig && (
                    <span
                      className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-full ${statusConfig.bgColor} ${statusConfig.textColor}`}
                    >
                      {statusConfig.label}
                    </span>
                  )}

                  {/* Numeric Badge */}
                  {item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        isActive
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
