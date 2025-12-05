"use client";

import { useState, useEffect } from "react";
import {
  X,
  Plus,
  Trash2,
  Minus,
  ChevronDown,
  AlertTriangle,
  Zap,
  Calendar,
  Check,
  ArrowRight,
  Percent,
  DollarSign,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

interface License {
  id: string;
  type: string;
  quantity: number;
  activeUsers: number;
  pricePerLicense: number;
  discountType: "none" | "fixed" | "percentage";
  discountValue: number;
}

interface SubscriptionData {
  plan: string;
  billingCycle: "monthly" | "annually";
  licenses: License[];
  addons: string[];
  trialPeriod: string;
}

interface EditSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSubscription: SubscriptionData;
}

const licenseTypes = [
  { value: "premium_zp", label: "Roofing Premium (w/ Zuper Pay)", defaultPrice: 50 },
  { value: "premium_no_zp", label: "Roofing Premium (w/o Zuper Pay)", defaultPrice: 50 },
  { value: "basic", label: "Roofing Basic User", defaultPrice: 20 },
];

const availableAddons = [
  { id: "zuper_pay", name: "Zuper Pay", price: 100, description: "Accept payments in-field" },
  { id: "analytics", name: "Advanced Analytics", price: 50, description: "Deep insights & reporting" },
  { id: "support", name: "Premium Support", price: 200, description: "24/7 priority support" },
  { id: "api", name: "API Access", price: 150, description: "Custom integrations" },
];

const getLicenseLabel = (type: string) => {
  return licenseTypes.find((t) => t.value === type)?.label || type;
};

// Billing cycle constants
const BILLING_CYCLE_DAYS = 30;
const NEXT_BILLING_DATE = new Date("2024-12-15");

const getDaysRemaining = () => {
  const today = new Date();
  const diffTime = NEXT_BILLING_DATE.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, Math.min(diffDays, BILLING_CYCLE_DAYS));
};

const calculateProratedCharge = (
  quantity: number,
  pricePerLicense: number,
  daysRemaining: number
) => {
  const dailyRate = pricePerLicense / BILLING_CYCLE_DAYS;
  return quantity * dailyRate * daysRemaining;
};

export default function EditSubscriptionModal({
  isOpen,
  onClose,
  currentSubscription,
}: EditSubscriptionModalProps) {
  const [plan, setPlan] = useState(currentSubscription.plan);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    currentSubscription.billingCycle
  );
  const [licenses, setLicenses] = useState<License[]>(
    currentSubscription.licenses.map(lic => ({
      ...lic,
      discountType: lic.discountType || "none",
      discountValue: lic.discountValue || 0,
    }))
  );
  const [selectedAddons, setSelectedAddons] = useState<string[]>(
    currentSubscription.addons
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPlan(currentSubscription.plan);
      setBillingCycle(currentSubscription.billingCycle);
      setLicenses(currentSubscription.licenses.map(lic => ({
        ...lic,
        discountType: lic.discountType || "none",
        discountValue: lic.discountValue || 0,
      })));
      setSelectedAddons(currentSubscription.addons);
    }
  }, [isOpen, currentSubscription]);

  if (!isOpen) return null;

  const updateLicenseQuantity = (id: string, delta: number) => {
    setLicenses((prev) =>
      prev.map((lic) =>
        lic.id === id
          ? { ...lic, quantity: Math.max(0, lic.quantity + delta) }
          : lic
      )
    );
  };

  const updateLicensePrice = (id: string, price: number) => {
    setLicenses((prev) =>
      prev.map((lic) => (lic.id === id ? { ...lic, pricePerLicense: price } : lic))
    );
  };

  const removeLicense = (id: string) => {
    setLicenses((prev) => prev.filter((lic) => lic.id !== id));
  };

  const addLicense = () => {
    const usedTypes = licenses.map((l) => l.type);
    const availableType = licenseTypes.find((t) => !usedTypes.includes(t.value));
    if (availableType) {
      setLicenses((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: availableType.value,
          quantity: 1,
          activeUsers: 0,
          pricePerLicense: availableType.defaultPrice,
          discountType: "none",
          discountValue: 0,
        },
      ]);
    }
  };

  const updateLicenseDiscount = (id: string, discountType: "none" | "fixed" | "percentage", discountValue: number) => {
    setLicenses((prev) =>
      prev.map((lic) =>
        lic.id === id ? { ...lic, discountType, discountValue } : lic
      )
    );
  };

  const calculateDiscountedPrice = (license: License) => {
    if (license.discountType === "none" || license.discountValue === 0) {
      return license.pricePerLicense;
    }
    if (license.discountType === "fixed") {
      return Math.max(0, license.pricePerLicense - license.discountValue);
    }
    if (license.discountType === "percentage") {
      return license.pricePerLicense * (1 - license.discountValue / 100);
    }
    return license.pricePerLicense;
  };

  const calculateLicenseSubtotal = (license: License) => {
    return license.quantity * calculateDiscountedPrice(license);
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  // Calculate totals
  const licensesTotal = licenses.reduce(
    (sum, lic) => sum + calculateLicenseSubtotal(lic),
    0
  );
  const addonsTotal = availableAddons
    .filter((a) => selectedAddons.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  const grandTotal = licensesTotal + addonsTotal;

  const prevLicensesTotal = currentSubscription.licenses.reduce(
    (sum, lic) => sum + lic.quantity * lic.pricePerLicense,
    0
  );
  const prevAddonsTotal = availableAddons
    .filter((a) => currentSubscription.addons.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  const prevGrandTotal = prevLicensesTotal + prevAddonsTotal;
  const totalDifference = grandTotal - prevGrandTotal;

  // Detect changes
  const getChanges = () => {
    const changes: { type: string; description: string; from?: string; to?: string }[] = [];

    licenses.forEach((lic) => {
      const prevLic = currentSubscription.licenses.find((l) => l.type === lic.type);
      if (prevLic) {
        if (lic.quantity !== prevLic.quantity) {
          const diff = lic.quantity - prevLic.quantity;
          changes.push({
            type: "license",
            description: getLicenseLabel(lic.type),
            from: `${prevLic.quantity} licenses`,
            to: `${lic.quantity} licenses (${diff > 0 ? "+" : ""}${diff})`,
          });
        }
      } else {
        changes.push({
          type: "license",
          description: getLicenseLabel(lic.type),
          from: "Not added",
          to: `${lic.quantity} licenses`,
        });
      }
    });

    currentSubscription.licenses.forEach((prevLic) => {
      if (!licenses.find((l) => l.type === prevLic.type)) {
        changes.push({
          type: "license",
          description: getLicenseLabel(prevLic.type),
          from: `${prevLic.quantity} licenses`,
          to: "Removed",
        });
      }
    });

    const addedAddons = selectedAddons.filter(
      (id) => !currentSubscription.addons.includes(id)
    );
    const removedAddons = currentSubscription.addons.filter(
      (id) => !selectedAddons.includes(id)
    );

    addedAddons.forEach((id) => {
      const addon = availableAddons.find((a) => a.id === id);
      if (addon) {
        changes.push({
          type: "addon",
          description: addon.name,
          from: "Not active",
          to: `Active (+${formatCurrency(addon.price)}/mo)`,
        });
      }
    });

    removedAddons.forEach((id) => {
      const addon = availableAddons.find((a) => a.id === id);
      if (addon) {
        changes.push({
          type: "addon",
          description: addon.name,
          from: "Active",
          to: `Removed (-${formatCurrency(addon.price)}/mo)`,
        });
      }
    });

    return changes;
  };

  const changes = getChanges();
  const hasChanges = changes.length > 0;

  const getConflicts = () => {
    const conflicts: { license: string; activeUsers: number; newQuantity: number }[] = [];
    licenses.forEach((lic) => {
      if (lic.quantity < lic.activeUsers) {
        conflicts.push({
          license: getLicenseLabel(lic.type),
          activeUsers: lic.activeUsers,
          newQuantity: lic.quantity,
        });
      }
    });
    return conflicts;
  };

  const conflicts = getConflicts();
  const hasConflicts = conflicts.length > 0;

  // Calculate prorated charges for added licenses
  const daysRemaining = getDaysRemaining();
  const addedLicenses: { type: string; quantity: number; price: number; prorated: number }[] = [];

  licenses.forEach((lic) => {
    const prevLic = currentSubscription.licenses.find((l) => l.type === lic.type);
    if (prevLic && lic.quantity > prevLic.quantity) {
      const addedQty = lic.quantity - prevLic.quantity;
      const proratedCharge = calculateProratedCharge(addedQty, lic.pricePerLicense, daysRemaining);
      addedLicenses.push({
        type: lic.type,
        quantity: addedQty,
        price: lic.pricePerLicense,
        prorated: proratedCharge,
      });
    } else if (!prevLic) {
      const proratedCharge = calculateProratedCharge(lic.quantity, lic.pricePerLicense, daysRemaining);
      addedLicenses.push({
        type: lic.type,
        quantity: lic.quantity,
        price: lic.pricePerLicense,
        prorated: proratedCharge,
      });
    }
  });

  const totalProratedCharge = addedLicenses.reduce((sum, l) => sum + l.prorated, 0);
  const hasAddedLicenses = addedLicenses.length > 0;

  const handleSave = async () => {
    if (hasConflicts) return;

    if (!showConfirmation && hasChanges) {
      setShowConfirmation(true);
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowConfirmation(false);
    onClose();
  };

  // Confirmation Dialog
  if (showConfirmation) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowConfirmation(false)} />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Confirm Changes</h2>
            <p className="text-sm text-gray-500 mb-6">Review your subscription changes before saving.</p>

            <div className="space-y-3 mb-6">
              {changes.map((change, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-gray-700">{change.description}: {change.from} → {change.to}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Current monthly</span>
                <span className="text-sm text-gray-700">{formatCurrency(prevGrandTotal)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">New monthly</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(grandTotal)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-700">Difference</span>
                <span className={`text-sm font-semibold ${totalDifference >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {totalDifference >= 0 ? "+" : ""}{formatCurrency(totalDifference)}/mo
                </span>
              </div>
            </div>

            {hasAddedLicenses && (
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Immediate prorated charge</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(totalProratedCharge)}</p>
                <p className="text-xs text-blue-700 mt-1">Billed now for {daysRemaining} remaining days</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setShowConfirmation(false)}>
                Go Back
              </Button>
              <Button className="flex-1" onClick={handleSave} isLoading={isLoading}>
                {isLoading ? "Saving..." : "Confirm & Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Edit Subscription</h2>
            <p className="text-sm text-gray-500 mt-0.5">Modify licenses and add-ons for this customer</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6 space-y-6">

            {/* Plan & Billing Section */}
            <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Plan Details</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Plan</label>
                  <div className="relative">
                    <select
                      value={plan}
                      onChange={(e) => setPlan(e.target.value)}
                      className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    >
                      <option value="premium">Premium</option>
                      <option value="standard" disabled>Standard (Coming Soon)</option>
                      <option value="core" disabled>Core (Coming Soon)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Billing Cycle</label>
                  <div className="flex h-11 p-1 bg-gray-100 border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setBillingCycle("monthly")}
                      className={`flex-1 rounded-md text-sm font-medium transition-all ${
                        billingCycle === "monthly"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingCycle("annually")}
                      className={`flex-1 rounded-md text-sm font-medium transition-all ${
                        billingCycle === "annually"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Annually
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Licenses Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Licenses</h3>
                <button
                  onClick={addLicense}
                  disabled={licenses.length >= licenseTypes.length}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Add License Type
                </button>
              </div>

              <div className="space-y-4">
                {licenses.map((license) => {
                  const prevLicense = currentSubscription.licenses.find((l) => l.type === license.type);
                  const isChanged = prevLicense && license.quantity !== prevLicense.quantity;
                  const isConflict = license.quantity < license.activeUsers;

                  return (
                    <div
                      key={license.id}
                      className={`p-5 rounded-xl border transition-all ${
                        isConflict
                          ? "bg-red-50 border-red-200 shadow-sm"
                          : isChanged
                          ? "bg-white border-blue-300 shadow-md ring-1 ring-blue-100"
                          : "bg-white border-gray-200 shadow-sm"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">
                            {getLicenseLabel(license.type)}
                          </h4>
                          <p className="text-xs text-gray-500 mt-0.5">{license.activeUsers} active users</p>
                        </div>
                        <button
                          onClick={() => removeLicense(license.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {isConflict && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-lg flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-red-700 font-medium">
                            Cannot reduce below {license.activeUsers} active users
                          </p>
                        </div>
                      )}

                      {/* Row 1: Quantity, Price, Discount */}
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-2">
                            Quantity
                            {isChanged && prevLicense && (
                              <span className="text-blue-600 font-normal ml-1">(was {prevLicense.quantity})</span>
                            )}
                          </label>
                          <div className="inline-flex items-center h-10 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                            <button
                              onClick={() => updateLicenseQuantity(license.id, -1)}
                              className="w-9 h-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 border-r border-gray-300 transition-colors"
                            >
                              <Minus className="w-4 h-4 text-gray-700" />
                            </button>
                            <input
                              type="number"
                              value={license.quantity}
                              onChange={(e) =>
                                setLicenses((prev) =>
                                  prev.map((l) =>
                                    l.id === license.id
                                      ? { ...l, quantity: parseInt(e.target.value) || 0 }
                                      : l
                                  )
                                )
                              }
                              className="w-12 h-full text-center text-sm font-bold text-gray-900 focus:outline-none bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button
                              onClick={() => updateLicenseQuantity(license.id, 1)}
                              className="w-9 h-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 border-l border-gray-300 transition-colors"
                            >
                              <Plus className="w-4 h-4 text-gray-700" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-2">Price/License</label>
                          <div className="relative h-10">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">$</span>
                            <input
                              type="number"
                              value={license.pricePerLicense}
                              onChange={(e) => updateLicensePrice(license.id, parseFloat(e.target.value) || 0)}
                              className="w-full h-full pl-7 pr-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-2">
                            <span className="flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              Discount
                            </span>
                          </label>
                          <div className="flex h-10 gap-1">
                            <select
                              value={license.discountType}
                              onChange={(e) => updateLicenseDiscount(
                                license.id,
                                e.target.value as "none" | "fixed" | "percentage",
                                license.discountValue
                              )}
                              className="w-20 h-full px-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                            >
                              <option value="none">None</option>
                              <option value="fixed">Fixed</option>
                              <option value="percentage">%</option>
                            </select>
                            {license.discountType !== "none" && (
                              <div className="relative flex-1">
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                                  {license.discountType === "fixed" ? "$" : ""}
                                </span>
                                <input
                                  type="number"
                                  value={license.discountValue}
                                  onChange={(e) => updateLicenseDiscount(
                                    license.id,
                                    license.discountType,
                                    parseFloat(e.target.value) || 0
                                  )}
                                  placeholder="0"
                                  className={`w-full h-full ${license.discountType === "fixed" ? "pl-6" : "pl-2.5"} pr-6 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white`}
                                />
                                {license.discountType === "percentage" && (
                                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-2">Subtotal</label>
                          <div className="h-10 flex flex-col items-end justify-center px-3 bg-gray-50 border border-gray-200 rounded-lg">
                            {license.discountType !== "none" && license.discountValue > 0 ? (
                              <>
                                <span className="text-xs text-gray-400 line-through">
                                  {formatCurrency(license.quantity * license.pricePerLicense)}
                                </span>
                                <span className="text-sm font-bold text-green-600">
                                  {formatCurrency(calculateLicenseSubtotal(license))}
                                </span>
                              </>
                            ) : (
                              <span className="text-sm font-bold text-gray-900">
                                {formatCurrency(calculateLicenseSubtotal(license))}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Discount Applied Badge */}
                      {license.discountType !== "none" && license.discountValue > 0 && (
                        <div className="mt-3 flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md border border-green-200">
                            <Tag className="w-3 h-3" />
                            {license.discountType === "fixed" 
                              ? `$${license.discountValue} off per license`
                              : `${license.discountValue}% discount applied`
                            }
                          </span>
                          <span className="text-xs text-gray-500">
                            Saving {formatCurrency((license.pricePerLicense * license.quantity) - calculateLicenseSubtotal(license))}/mo
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Add-ons Section */}
            <section>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Add-ons</h3>
              <div className="grid grid-cols-2 gap-4">
                {availableAddons.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  const wasSelected = currentSubscription.addons.includes(addon.id);
                  const isChanged = isSelected !== wasSelected;

                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "bg-blue-50 border-blue-300 shadow-md ring-1 ring-blue-100"
                          : "bg-white border-gray-200 shadow-sm hover:border-gray-300 hover:shadow"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900">{addon.name}</span>
                            {isChanged && (
                              <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                                isSelected ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              }`}>
                                {isSelected ? "Adding" : "Removing"}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{addon.description}</p>
                          <p className="text-sm font-bold text-gray-900 mt-2">{formatCurrency(addon.price)}/mo</p>
                        </div>
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected ? "bg-blue-500" : "border-2 border-gray-300 bg-white"
                        }`}>
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Billing Summary Section */}
            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Billing Summary</h3>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Licenses ({licenses.reduce((sum, l) => sum + l.quantity, 0)} total)</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(licensesTotal)}/mo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Add-ons ({selectedAddons.length} active)</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(addonsTotal)}/mo</span>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-900">Monthly Total</span>
                    <span className="text-xl font-bold text-gray-900">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                {hasChanges && (
                  <div className="bg-gray-50 rounded-lg p-3 mt-3 border border-gray-200">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Previous</span>
                      <span className="text-gray-600">{formatCurrency(prevGrandTotal)}/mo</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-2">
                      <span className="text-gray-500">Change</span>
                      <span className={`font-semibold ${totalDifference >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {totalDifference >= 0 ? "+" : ""}{formatCurrency(totalDifference)}/mo
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Changes Summary */}
            {hasChanges && (
              <section className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-amber-800 uppercase tracking-wide mb-4">Changes Summary</h3>
                <div className="space-y-3">
                  {changes.map((change, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
                      </div>
                      <div className="flex-1 text-sm">
                        <span className="font-medium text-amber-900">{change.description}:</span>
                        <span className="text-amber-700 ml-1">{change.from} → {change.to}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Prorated Billing Section */}
            {hasAddedLicenses && (
              <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Prorated Billing</h3>
                      <p className="text-xs text-gray-500">{daysRemaining} days remaining in cycle</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Next billing: Dec 15, 2024</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="space-y-3">
                    {addedLicenses.map((license, idx) => {
                      const dailyRate = license.price / BILLING_CYCLE_DAYS;
                      return (
                        <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              +{license.quantity} {getLicenseLabel(license.type)}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {license.quantity} × {formatCurrency(dailyRate)}/day × {daysRemaining} days
                            </p>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{formatCurrency(license.prorated)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="px-5 py-4 bg-blue-50 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-blue-600 font-medium">Immediate charge</p>
                    <p className="text-xs text-blue-500">Billed now via Chargebee</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{formatCurrency(totalProratedCharge)}</span>
                </div>
              </section>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <div className="flex items-center justify-end gap-3">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges || hasConflicts}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
