"use client";

import { useState } from "react";
import {
  CreditCard,
  Edit3,
  RefreshCw,
  Plus,
  AlertTriangle,
  Wallet,
  BarChart3,
  Headphones,
  Code,
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
  billingCycle: "Monthly" as const,
  nextBillingDate: "2024-12-15",
  status: "active" as const,
  trialEndDate: null,
  licenses: [
    {
      id: "1",
      type: "premium_zp",
      purchased: 10,
      active: 8,
      pricePerLicense: 50,
    },
    {
      id: "2",
      type: "basic",
      purchased: 25,
      active: 23,
      pricePerLicense: 20,
    },
  ],
  addons: [
    { id: "zuper_pay", name: "Zuper Pay", price: 100 },
    { id: "analytics", name: "Advanced Analytics", price: 50 },
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
  basic: "Roofing Basic User",
};

// Add-on icon mapping
const addonIcons: Record<string, { icon: LucideIcon; bgColor: string; iconColor: string }> = {
  zuper_pay: { icon: Wallet, bgColor: "bg-emerald-50", iconColor: "text-emerald-600" },
  analytics: { icon: BarChart3, bgColor: "bg-purple-50", iconColor: "text-purple-600" },
  support: { icon: Headphones, bgColor: "bg-orange-50", iconColor: "text-orange-600" },
  api: { icon: Code, bgColor: "bg-cyan-50", iconColor: "text-cyan-600" },
};

export default function Subscription() {
  const [subscription] = useState(mockSubscription);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    // Simulate sync
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };

  // Calculate totals
  const licensesTotal = subscription.licenses.reduce(
    (sum, lic) => sum + lic.purchased * lic.pricePerLicense,
    0
  );
  const addonsTotal = subscription.addons.reduce((sum, addon) => sum + addon.price, 0);
  const grandTotal = licensesTotal + addonsTotal;

  // Prepare data for edit modal
  const editModalData = {
    plan: "premium",
    billingCycle: subscription.billingCycle.toLowerCase() as "monthly" | "annually",
    licenses: subscription.licenses.map((lic) => ({
      id: lic.id,
      type: lic.type,
      quantity: lic.purchased,
      activeUsers: lic.active,
      pricePerLicense: lic.pricePerLicense,
    })),
    addons: subscription.addons.map((a) => a.id),
    trialPeriod: "none",
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

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card>
        <CardHeader
          actions={
            <div className="flex items-center gap-3">
              <SyncStatus
                state={isSyncing ? "syncing" : subscription.syncStatus.state}
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

      {/* Plan Information */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Trial End Date</p>
              <p className="text-sm text-gray-900">
                {subscription.trialEndDate
                  ? formatDate(subscription.trialEndDate)
                  : "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* License Details */}
      <Card>
        <CardHeader>
          <CardTitle>License Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    License Type
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purchased
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Active
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Available
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    $/License
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {subscription.licenses.map((license) => {
                  const available = license.purchased - license.active;

                  return (
                    <tr key={license.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <p className="text-sm font-medium text-gray-900">
                          {licenseTypeLabels[license.type] || license.type}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm text-gray-900">{license.purchased}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <LicenseCounter used={license.active} total={license.purchased} />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`text-sm font-medium ${
                            available <= 2 ? "text-yellow-600" : "text-green-600"
                          }`}
                        >
                          {available}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-sm text-gray-900">
                          {formatCurrency(license.pricePerLicense)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(license.purchased * license.pricePerLicense)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Warning for licenses approaching limit */}
          {subscription.licenses.some(
            (l) => (l.active / l.purchased) * 100 >= 80
          ) && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Some license types are approaching their limit.
                Consider increasing license count to avoid access issues.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add-ons */}
      <Card>
        <CardHeader
          actions={
            <Button variant="ghost" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Add Add-on
            </Button>
          }
        >
          <CardTitle>Add-ons</CardTitle>
        </CardHeader>
        <CardContent>
          {subscription.addons.length > 0 ? (
            <div className="space-y-3">
              {subscription.addons.map((addon) => {
                const iconConfig = addonIcons[addon.id] || {
                  icon: CreditCard,
                  bgColor: "bg-blue-50",
                  iconColor: "text-blue-600",
                };
                const IconComponent = iconConfig.icon;

                return (
                  <div
                    key={addon.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${iconConfig.bgColor} rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-4 h-4 ${iconConfig.iconColor}`} />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {addon.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {formatCurrency(addon.price)}/month
                    </span>
                  </div>
                );
              })}
              <div className="pt-3 border-t border-gray-200 flex justify-between">
                <span className="text-sm font-medium text-gray-500">Total Add-ons</span>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(addonsTotal)}/month
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-gray-500">No add-ons currently active</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Billing Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Licenses Subtotal</span>
              <span className="text-sm text-gray-900">
                {formatCurrency(licensesTotal)}/month
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Add-ons Total</span>
              <span className="text-sm text-gray-900">
                {formatCurrency(addonsTotal)}/month
              </span>
            </div>
            <div className="pt-3 border-t border-gray-200 flex justify-between">
              <span className="text-base font-semibold text-gray-900">Grand Total</span>
              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(grandTotal)}/month
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sync Status */}
      <Card>
        <CardHeader>
          <CardTitle>Sync Status</CardTitle>
        </CardHeader>
        <CardContent>
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
              <code className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">
                {subscription.syncStatus.subscriptionId}
              </code>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Chargebee Customer ID
              </p>
              <code className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">
                {subscription.syncStatus.chargebeeCustomerId}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>

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
