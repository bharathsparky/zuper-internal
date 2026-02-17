"use client";

import { useState } from "react";
import {
  CreditCard,
  Edit3,
  RefreshCw,
  Plus,
  Wallet,
  BarChart3,
  Headphones,
  Code,
  UserX,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Users,
  Puzzle,
  DollarSign,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusBadge, LicenseCounter, Badge } from "@/components/ui/Badge";
import { SyncStatus } from "@/components/ui/SyncStatus";
import { formatCurrency, formatDate, getRelativeTime } from "@/lib/utils";
import CreateSubscriptionModal from "@/components/CreateSubscriptionModal";
import EditSubscriptionModal from "@/components/EditSubscriptionModal";

// Mock subscription data
const mockSubscription = {
  hasSubscription: true,
  planName: "Premium Plan",
  billingCycle: "Quarterly" as const,
  nextBillingDate: "2024-12-15",
  status: "active" as const,
  licenses: [
    {
      id: "1",
      type: "premium_zp",
      purchased: 10,
      active: 8,
      pricePerLicense: 50,
      discountType: "percentage" as const,
      discountValue: 10,
    },
  ],
  nonBillableLicenses: [
    {
      id: "nb1",
      type: "admin",
      count: 2,
      description: "Admin users (no charge)",
    },
    {
      id: "nb2",
      type: "support",
      count: 1,
      description: "Support access (no charge)",
    },
  ],
  addons: [
    { id: "zuper_pay", name: "Zuper Pay", price: 100, discountType: "fixed" as const, discountValue: 20 },
    { id: "analytics", name: "Advanced Analytics", price: 50, discountType: "none" as const, discountValue: 0 },
    { id: "basic_user", name: "Roofing Basic User", price: 20, discountType: "none" as const, discountValue: 0 },
  ],
  oneTimeCharges: [
    { id: "implementation", name: "Implementation Fee", amount: 2500, status: "paid" as const, paidDate: "2024-10-15", discountType: "none" as const, discountValue: 0 },
    { id: "platform", name: "Platform Setup Fee", amount: 500, status: "paid" as const, paidDate: "2024-10-15", discountType: "none" as const, discountValue: 0 },
    { id: "training", name: "Training & Onboarding", amount: 1000, status: "pending" as const, paidDate: null, discountType: "percentage" as const, discountValue: 10 },
  ],
  syncStatus: {
    lastSynced: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    state: "synced" as const,
    subscriptionId: "sub_ABC123XYZ",
    chargebeeCustomerId: "cust_456DEF",
  },
};

const licenseTypeLabels: Record<string, string> = {
  premium_zp: "Roofing Premium (w/ Zuper Pay)",
  premium_no_zp: "Roofing Premium (w/o Zuper Pay)",
};

// Sync error messages - Context: Sync between Chargebee and Internal Admin
const syncErrorMessages: Record<string, { title: string; description: string; learnMoreUrl?: string }> = {
  subscription_not_found: {
    title: "Chargebee subscription not found",
    description: "The subscription ID does not exist in Chargebee. It may have been cancelled or the ID is incorrect.",
    learnMoreUrl: "#",
  },
  customer_id_mismatch: {
    title: "Customer ID mismatch",
    description: "The customer ID in Internal Admin does not match the customer in Chargebee. Please verify the customer mapping.",
    learnMoreUrl: "#",
  },
  license_sync_failed: {
    title: "License count sync failed",
    description: "Failed to sync license quantities from Chargebee. The subscription may have been modified directly in Chargebee.",
    learnMoreUrl: "#",
  },
  invoice_fetch_failed: {
    title: "Failed to fetch invoices",
    description: "Could not retrieve invoice data from Chargebee. Please check the API connection and try again.",
  },
};

// Add-on icon mapping
const addonIcons: Record<string, { icon: LucideIcon; bgColor: string; iconColor: string }> = {
  zuper_pay: { icon: Wallet, bgColor: "bg-emerald-50", iconColor: "text-emerald-600" },
  analytics: { icon: BarChart3, bgColor: "bg-purple-50", iconColor: "text-purple-600" },
  support: { icon: Headphones, bgColor: "bg-orange-50", iconColor: "text-orange-600" },
  api: { icon: Code, bgColor: "bg-cyan-50", iconColor: "text-cyan-600" },
  basic_user: { icon: Users, bgColor: "bg-blue-50", iconColor: "text-blue-600" },
};


export default function Subscription() {
  const [subscription] = useState(mockSubscription);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isPlanExpanded, setIsPlanExpanded] = useState(true);
  const [isAddonsExpanded, setIsAddonsExpanded] = useState(true);
  const [isOneTimeChargesExpanded, setIsOneTimeChargesExpanded] = useState(true);
  
  // Sync error state - randomize on each sync
  const [syncError, setSyncError] = useState<{
    hasError: boolean;
    errorType: string;
    timestamp: string;
  } | null>(() => {
    // Initial 50% chance of error
    if (Math.random() < 0.5) {
      const errorTypes = ["subscription_not_found", "customer_id_mismatch", "license_sync_failed", "invoice_fetch_failed"];
      return {
        hasError: true,
        errorType: errorTypes[Math.floor(Math.random() * errorTypes.length)],
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      };
    }
    return null;
  });

  const handleSync = () => {
    setIsSyncing(true);
    // Simulate sync with 50% chance of error
    setTimeout(() => {
      setIsSyncing(false);
      // Randomize: 50% success, 50% error
      if (Math.random() < 0.5) {
        const errorTypes = ["subscription_not_found", "customer_id_mismatch", "license_sync_failed", "invoice_fetch_failed"];
        setSyncError({
          hasError: true,
          errorType: errorTypes[Math.floor(Math.random() * errorTypes.length)],
          timestamp: new Date().toISOString(),
        });
      } else {
        setSyncError(null);
      }
    }, 1500);
  };

  // Helper to calculate discounted price
  const calculateDiscountedPrice = (price: number, discountType: string, discountValue: number) => {
    if (discountType === "none" || discountValue === 0) return price;
    if (discountType === "fixed") return Math.max(0, price - discountValue);
    if (discountType === "percentage") return price * (1 - discountValue / 100);
    return price;
  };

  // Calculate totals with discounts
  const licensesTotal = subscription.licenses.reduce(
    (sum, lic) => {
      const discountedPrice = calculateDiscountedPrice(lic.pricePerLicense, lic.discountType || "none", lic.discountValue || 0);
      return sum + lic.purchased * discountedPrice;
    },
    0
  );
  const addonsTotal = subscription.addons.reduce((sum, addon) => {
    const discountedPrice = calculateDiscountedPrice(addon.price, addon.discountType || "none", addon.discountValue || 0);
    return sum + discountedPrice;
  }, 0);
  const oneTimeChargesTotal = subscription.oneTimeCharges?.reduce((sum, charge) => {
    const discountedAmount = calculateDiscountedPrice(charge.amount, charge.discountType || "none", charge.discountValue || 0);
    return sum + discountedAmount;
  }, 0) || 0;
  const grandTotal = licensesTotal + addonsTotal;

  // Prepare data for edit modal
  const editModalData = {
    plan: "premium",
    billingCycle: subscription.billingCycle.toLowerCase() as "monthly" | "quarterly" | "annually",
    licenses: subscription.licenses.map((lic) => ({
      id: lic.id,
      type: lic.type,
      quantity: lic.purchased,
      activeUsers: lic.active,
      pricePerLicense: lic.pricePerLicense,
      discountType: (lic.discountType || "none") as "none" | "fixed" | "percentage",
      discountValue: lic.discountValue || 0,
    })),
    addons: subscription.addons.map((a) => ({
      id: a.id,
      discountType: (a.discountType || "none") as "none" | "fixed" | "percentage",
      discountValue: a.discountValue || 0,
    })),
    oneTimeCharges: (subscription.oneTimeCharges || []).map((charge) => ({
      id: charge.id,
      name: charge.name,
      amount: charge.amount,
      discountType: (charge.discountType || "none") as "none" | "fixed" | "percentage",
      discountValue: charge.discountValue || 0,
    })),
  };

  // Empty State
  if (!subscription.hasSubscription) {
    return (
      <Card>
        <CardContent className="py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <CreditCard className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Subscription
            </h3>
            <p className="text-gray-500 max-w-md mb-8">
              This customer doesn't have an active subscription. Create one to
              enable access and billing.
            </p>
            <Button
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create Subscription
            </Button>
          </div>
        </CardContent>

        <CreateSubscriptionModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </Card>
    );
  }

  const totalLicenses = subscription.licenses.reduce((sum, l) => sum + l.purchased, 0);
  const totalNonBillable = subscription.nonBillableLicenses?.reduce((sum, l) => sum + l.count, 0) || 0;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card>
        <CardHeader
          actions={
            <div className="flex items-center gap-3">
              <SyncStatus
                state={isSyncing ? "syncing" : (syncError?.hasError ? "error" : subscription.syncStatus.state)}
                lastSynced={getRelativeTime(subscription.syncStatus.lastSynced)}
              />
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<RefreshCw className="w-4 h-4" />}
                onClick={handleSync}
                isLoading={isSyncing}
              >
                Sync Now
              </Button>
              <Button
                size="sm"
                leftIcon={<Edit3 className="w-4 h-4" />}
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit Subscription
              </Button>
            </div>
          }
        >
          <CardTitle>Subscription Details</CardTitle>
        </CardHeader>
      </Card>

      {/* Sync Error Banner - Compact */}
      {syncError?.hasError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-red-800">
                  {syncErrorMessages[syncError.errorType]?.title || "Sync Error"}
                </span>
                <span className="text-xs text-red-500">
                  {getRelativeTime(syncError.timestamp)}
                </span>
              </div>
              <p className="text-xs text-red-600 mt-0.5">
                {syncErrorMessages[syncError.errorType]?.description || "An error occurred during sync."}
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              onClick={handleSync}
              isLoading={isSyncing}
              className="border-red-200 text-red-700 hover:bg-red-100 flex-shrink-0"
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Subscription Content */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="space-y-6">
              {/* Plan Information */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Plan Information</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Plan Name</p>
                    <Badge variant="premium">{subscription.planName}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Billing Cycle</p>
                    <p className="text-sm text-gray-900">{subscription.billingCycle}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Next Billing Date</p>
                    <p className="text-sm text-gray-900">
                      {formatDate(subscription.nextBillingDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Subscription Status</p>
                    <StatusBadge status={subscription.status} />
                  </div>
                </div>
              </div>

              {/* Collapsible Plan Section */}
              <div className="bg-gray-50 rounded-xl overflow-hidden">
                <button
                  onClick={() => setIsPlanExpanded(!isPlanExpanded)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-semibold text-gray-900">Plan</h3>
                      <p className="text-xs text-gray-500">
                        {totalLicenses} billable{totalNonBillable > 0 ? ` · ${totalNonBillable} non-billable` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(licensesTotal)}/mo</span>
                    {isPlanExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                {isPlanExpanded && (
                  <div className="px-5 pb-5 space-y-4">
                    {/* Billable Licenses */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-100 bg-gray-50">
                            <th className="text-left py-2.5 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="text-center py-2.5 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                            <th className="text-center py-2.5 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                            <th className="text-center py-2.5 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                            <th className="text-right py-2.5 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {subscription.licenses.map((license) => {
                            const hasDiscount = license.discountType && license.discountType !== "none" && license.discountValue > 0;
                            const originalTotal = license.purchased * license.pricePerLicense;
                            const discountedPrice = calculateDiscountedPrice(license.pricePerLicense, license.discountType || "none", license.discountValue || 0);
                            const discountedTotal = license.purchased * discountedPrice;
                            
                            return (
                              <tr key={license.id}>
                                <td className="py-3 px-4">
                                  <span className="text-sm font-medium text-gray-900">
                                    {licenseTypeLabels[license.type] || license.type}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className="text-sm text-gray-900">{license.purchased}</span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <LicenseCounter used={license.active} total={license.purchased} />
                                </td>
                                <td className="py-3 px-4 text-center">
                                  {hasDiscount ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                                      <Tag className="w-3 h-3" />
                                      {(license.discountType as "fixed" | "percentage") === "fixed" ? `$${license.discountValue}` : `${license.discountValue}%`}
                                    </span>
                                  ) : (
                                    <span className="text-xs text-gray-400">—</span>
                                  )}
                                </td>
                                <td className="py-3 px-4 text-right">
                                  {hasDiscount ? (
                                    <div className="flex flex-col items-end">
                                      <span className="text-xs text-gray-400 line-through">
                                        {formatCurrency(originalTotal)}
                                      </span>
                                      <span className="text-sm font-medium text-green-600">
                                        {formatCurrency(discountedTotal)}
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="text-sm font-medium text-gray-900">
                                      {formatCurrency(originalTotal)}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Non-Billable Licenses - Simplified */}
                    {subscription.nonBillableLicenses && subscription.nonBillableLicenses.length > 0 && (
                      <div className="flex items-center justify-between py-3 px-4 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2">
                          <UserX className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Non-billable licenses</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-gray-900">{totalNonBillable}</span>
                          <span className="text-xs text-gray-500 ml-1">no charge</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Collapsible Add-ons Section */}
              <div className="bg-gray-50 rounded-xl overflow-hidden">
                <button
                  onClick={() => setIsAddonsExpanded(!isAddonsExpanded)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Puzzle className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-semibold text-gray-900">Add-ons</h3>
                      <p className="text-xs text-gray-500">{subscription.addons.length} active</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(addonsTotal)}/mo</span>
                    {isAddonsExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                {isAddonsExpanded && (
                  <div className="px-5 pb-5">
                    {subscription.addons.length > 0 ? (
                      <div className="space-y-2">
                        {subscription.addons.map((addon) => {
                          const iconConfig = addonIcons[addon.id] || {
                            icon: CreditCard,
                            bgColor: "bg-blue-50",
                            iconColor: "text-blue-600",
                          };
                          const IconComponent = iconConfig.icon;
                          const hasDiscount = addon.discountType && addon.discountType !== "none" && addon.discountValue > 0;
                          const discountedPrice = calculateDiscountedPrice(addon.price, addon.discountType || "none", addon.discountValue || 0);

                          return (
                            <div
                              key={addon.id}
                              className="flex items-center justify-between py-3 px-4 bg-white rounded-lg border border-gray-200"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 ${iconConfig.bgColor} rounded-lg flex items-center justify-center`}>
                                  <IconComponent className={`w-4 h-4 ${iconConfig.iconColor}`} />
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-900">{addon.name}</span>
                                  {hasDiscount && (
                                    <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                                      <Tag className="w-3 h-3" />
                                      {(addon.discountType as "fixed" | "percentage") === "fixed" ? `$${addon.discountValue} off` : `${addon.discountValue}% off`}
                                    </span>
                                  )}
                                </div>
                              </div>
                              {hasDiscount ? (
                                <div className="flex flex-col items-end">
                                  <span className="text-xs text-gray-400 line-through">
                                    {formatCurrency(addon.price)}/mo
                                  </span>
                                  <span className="text-sm font-medium text-green-600">
                                    {formatCurrency(discountedPrice)}/mo
                                  </span>
                                </div>
                              ) : (
                                <span className="text-sm font-medium text-gray-900">{formatCurrency(addon.price)}/mo</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-4 bg-white rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-500">No add-ons active</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Collapsible One-time Charges Section (Read-only) */}
              {subscription.oneTimeCharges && subscription.oneTimeCharges.length > 0 && (
                <div className="bg-gray-50 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setIsOneTimeChargesExpanded(!isOneTimeChargesExpanded)}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-sm font-semibold text-gray-900">One-time Charges</h3>
                        <p className="text-xs text-gray-500">{subscription.oneTimeCharges.length} charges</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-gray-900">{formatCurrency(oneTimeChargesTotal)}</span>
                      {isOneTimeChargesExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  {isOneTimeChargesExpanded && (
                    <div className="px-5 pb-5">
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-100 bg-gray-50">
                              <th className="text-left py-2.5 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Charge</th>
                              <th className="text-center py-2.5 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="text-center py-2.5 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                              <th className="text-center py-2.5 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Date</th>
                              <th className="text-right py-2.5 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {subscription.oneTimeCharges.map((charge) => {
                              const hasDiscount = charge.discountType && charge.discountType !== "none" && charge.discountValue > 0;
                              const discountedAmount = calculateDiscountedPrice(charge.amount, charge.discountType || "none", charge.discountValue || 0);
                              
                              return (
                                <tr key={charge.id}>
                                  <td className="py-3 px-4">
                                    <span className="text-sm font-medium text-gray-900">{charge.name}</span>
                                  </td>
                                  <td className="py-3 px-4 text-center">
                                    {charge.status === "paid" ? (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                                        <CheckCircle2 className="w-3 h-3" />
                                        Paid
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-full">
                                        <Clock className="w-3 h-3" />
                                        Pending
                                      </span>
                                    )}
                                  </td>
                                  <td className="py-3 px-4 text-center">
                                    {hasDiscount ? (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                                        <Tag className="w-3 h-3" />
                                        {(charge.discountType as "fixed" | "percentage") === "fixed" ? `$${charge.discountValue}` : `${charge.discountValue}%`}
                                      </span>
                                    ) : (
                                      <span className="text-xs text-gray-400">—</span>
                                    )}
                                  </td>
                                  <td className="py-3 px-4 text-center">
                                    <span className="text-sm text-gray-600">
                                      {charge.paidDate ? formatDate(charge.paidDate) : "—"}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 text-right">
                                    {hasDiscount ? (
                                      <div className="flex flex-col items-end">
                                        <span className="text-xs text-gray-400 line-through">
                                          {formatCurrency(charge.amount)}
                                        </span>
                                        <span className="text-sm font-medium text-green-600">
                                          {formatCurrency(discountedAmount)}
                                        </span>
                                      </div>
                                    ) : (
                                      <span className="text-sm font-medium text-gray-900">
                                        {formatCurrency(charge.amount)}
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-3 text-xs text-gray-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        One-time charges are managed in Chargebee and displayed here for reference only.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Billing Summary in Overview */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Total</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(grandTotal)}<span className="text-sm font-normal text-gray-500">/month</span></p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>Plan: {formatCurrency(licensesTotal)}</p>
                    <p>Add-ons: {formatCurrency(addonsTotal)}</p>
                  </div>
                </div>
              </div>

              {/* Sync Status in Overview */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Sync Status</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Last Synced</p>
                    <SyncStatus
                      state={subscription.syncStatus.state}
                      lastSynced={getRelativeTime(subscription.syncStatus.lastSynced)}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Sync Source</p>
                    <p className="text-sm text-gray-900">Chargebee</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Subscription ID</p>
                    <code className="text-sm text-gray-700 bg-white px-2 py-1 rounded border border-gray-200">
                      {subscription.syncStatus.subscriptionId}
                    </code>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Chargebee Customer ID
                    </p>
                    <code className="text-sm text-gray-700 bg-white px-2 py-1 rounded border border-gray-200">
                      {subscription.syncStatus.chargebeeCustomerId}
                    </code>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Modals */}
      <CreateSubscriptionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <EditSubscriptionModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentSubscription={editModalData}
      />
    </div>
  );
}
