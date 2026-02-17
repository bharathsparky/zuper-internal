"use client";

import { useState, useEffect } from "react";
import {
  X,
  Plus,
  Minus,
  ChevronDown,
  AlertTriangle,
  Check,
  ArrowRight,
  Tag,
  Search,
  DollarSign,
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

interface AddonWithDiscount {
  id: string;
  quantity?: number;
  discountType: "none" | "fixed" | "percentage";
  discountValue: number;
}

interface OneTimeChargeWithDiscount {
  id: string;
  name: string;
  amount: number;
  discountType: "none" | "fixed" | "percentage";
  discountValue: number;
}

interface SubscriptionData {
  plan: string;
  billingCycle: "monthly" | "quarterly" | "annually";
  licenses: License[];
  addons: AddonWithDiscount[];
  oneTimeCharges?: OneTimeChargeWithDiscount[];
}

interface EditSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSubscription: SubscriptionData;
}

const licenseTypes = [
  { value: "roofing_core", label: "Roofing Core", defaultPrice: 30, group: "Roofing" },
  { value: "roofing_premium", label: "Roofing Premium", defaultPrice: 50, group: "Roofing" },
  { value: "non_roofing_starter", label: "Non-Roofing Starter", defaultPrice: 15, group: "Non-Roofing" },
  { value: "non_roofing_core", label: "Non-Roofing Core", defaultPrice: 30, group: "Non-Roofing" },
  { value: "non_roofing_premium", label: "Non-Roofing Premium", defaultPrice: 50, group: "Non-Roofing" },
];

const availableAddons = [
  // Seat Add-on
  { id: "basic_seat", name: "Basic Seat (Crew)", price: 20, group: "Seats", unit: "seat", description: "Login, time tracking, geo tracking, basic job view" },
  // Zuper Connect
  { id: "zuper_connect_text", name: "Zuper Connect – Text", price: 99, group: "Zuper Connect", description: "SMS/MMS telephony with call flows, recording, notes, CRM sync. 1 number, 25 users, 2,500 mins, 2,000 SMS, 500 MMS; 1-yr recording" },
  { id: "zuper_connect_plus", name: "Zuper Connect – Plus", price: 299, group: "Zuper Connect", description: "Advanced telephony with call masking, ring groups, voicemails. 3 numbers, 25 users, 5,000 mins, 3,000 SMS, 1,000 MMS; 1-yr recording" },
  { id: "zuper_connect_intelligence", name: "Zuper Connect – Intelligence", price: 499, group: "Zuper Connect", description: "AI telephony with summaries, responder, 3-yr storage. 5 numbers, 25 users, 5,000 mins, 6,000 SMS, 2,000 MMS; 200 AI calls" },
  // Zuper Fleet
  { id: "zuper_fleet_e2e", name: "Zuper Fleet – End-to-End", price: 60, group: "Zuper Fleet", unit: "vehicle", description: "GPS tracking, AI safety cams, health monitoring" },
  { id: "zuper_fleet_safetycam", name: "Zuper Fleet – SafetyCam AI", price: 35, group: "Zuper Fleet", unit: "vehicle", description: "Dashcam for driver monitoring, safety scoring" },
  { id: "zuper_fleet_gps", name: "Zuper Fleet – GPS with Vehicle Health", price: 30, group: "Zuper Fleet", unit: "vehicle", description: "Real-time GPS, predictive alerts" },
];

const getLicenseLabel = (type: string) => {
  return licenseTypes.find((t) => t.value === type)?.label || type;
};

export default function EditSubscriptionModal({
  isOpen,
  onClose,
  currentSubscription,
}: EditSubscriptionModalProps) {
  const initLicense = currentSubscription.licenses[0];
  const [plan, setPlan] = useState(currentSubscription.plan);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "annually">(
    currentSubscription.billingCycle
  );
  const [quantity, setQuantity] = useState(initLicense?.quantity || 1);
  const [activeUsers] = useState(initLicense?.activeUsers || 0);
  const [pricePerSeat, setPricePerSeat] = useState(initLicense?.pricePerLicense || 0);
  const [discountType, setDiscountType] = useState<"none" | "fixed" | "percentage">(initLicense?.discountType || "none");
  const [discountValue, setDiscountValue] = useState(initLicense?.discountValue || 0);
  const [addonDiscounts, setAddonDiscounts] = useState<Record<string, { discountType: "none" | "fixed" | "percentage"; discountValue: number }>>(
    currentSubscription.addons.reduce((acc, addon) => ({
      ...acc,
      [addon.id]: { discountType: addon.discountType || "none", discountValue: addon.discountValue || 0 }
    }), {})
  );
  const [selectedAddons, setSelectedAddons] = useState<string[]>(
    currentSubscription.addons.map(a => a.id)
  );
  const [addonQuantities, setAddonQuantities] = useState<Record<string, number>>(
    currentSubscription.addons.reduce((acc, addon) => ({
      ...acc,
      [addon.id]: addon.quantity || 1
    }), {} as Record<string, number>)
  );
  const [oneTimeChargeDiscounts, setOneTimeChargeDiscounts] = useState<Record<string, { discountType: "none" | "fixed" | "percentage"; discountValue: number }>>(
    (currentSubscription.oneTimeCharges || []).reduce((acc, charge) => ({
      ...acc,
      [charge.id]: { discountType: charge.discountType || "none", discountValue: charge.discountValue || 0 }
    }), {})
  );
  const [addonSearch, setAddonSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const lic = currentSubscription.licenses[0];
      setPlan(currentSubscription.plan);
      setBillingCycle(currentSubscription.billingCycle);
      setQuantity(lic?.quantity || 1);
      setPricePerSeat(lic?.pricePerLicense || 0);
      setDiscountType(lic?.discountType || "none");
      setDiscountValue(lic?.discountValue || 0);
      setSelectedAddons(currentSubscription.addons.map(a => a.id));
      setAddonQuantities(currentSubscription.addons.reduce((acc, addon) => ({
        ...acc,
        [addon.id]: addon.quantity || 1
      }), {} as Record<string, number>));
      setAddonDiscounts(currentSubscription.addons.reduce((acc, addon) => ({
        ...acc,
        [addon.id]: { discountType: addon.discountType || "none", discountValue: addon.discountValue || 0 }
      }), {}));
      setOneTimeChargeDiscounts((currentSubscription.oneTimeCharges || []).reduce((acc, charge) => ({
        ...acc,
        [charge.id]: { discountType: charge.discountType || "none", discountValue: charge.discountValue || 0 }
      }), {}));
    }
  }, [isOpen, currentSubscription]);

  if (!isOpen) return null;

  const handlePlanChange = (newPlan: string) => {
    setPlan(newPlan);
    const planDef = licenseTypes.find((t) => t.value === newPlan);
    if (planDef) {
      setPricePerSeat(planDef.defaultPrice);
    }
  };

  const calculateDiscountedSeatPrice = () => {
    if (discountType === "none" || discountValue === 0) return pricePerSeat;
    if (discountType === "fixed") return Math.max(0, pricePerSeat - discountValue);
    if (discountType === "percentage") return pricePerSeat * (1 - discountValue / 100);
    return pricePerSeat;
  };

  const planSubtotal = quantity * calculateDiscountedSeatPrice();

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) => {
      if (prev.includes(addonId)) {
        return prev.filter((id) => id !== addonId);
      } else {
        // Initialize discount & quantity state for new addon
        if (!addonDiscounts[addonId]) {
          setAddonDiscounts(prevDiscounts => ({
            ...prevDiscounts,
            [addonId]: { discountType: "none", discountValue: 0 }
          }));
        }
        if (!addonQuantities[addonId]) {
          setAddonQuantities(prevQty => ({ ...prevQty, [addonId]: 1 }));
        }
        return [...prev, addonId];
      }
    });
  };

  const updateAddonQuantity = (addonId: string, qty: number) => {
    setAddonQuantities((prev) => ({ ...prev, [addonId]: Math.max(1, qty) }));
  };

  const updateAddonDiscount = (addonId: string, discountType: "none" | "fixed" | "percentage", discountValue: number) => {
    setAddonDiscounts(prev => ({
      ...prev,
      [addonId]: { discountType, discountValue }
    }));
  };

  const calculateAddonDiscountedPrice = (addon: typeof availableAddons[0]) => {
    const discount = addonDiscounts[addon.id];
    if (!discount || discount.discountType === "none" || discount.discountValue === 0) {
      return addon.price;
    }
    if (discount.discountType === "fixed") {
      return Math.max(0, addon.price - discount.discountValue);
    }
    if (discount.discountType === "percentage") {
      return addon.price * (1 - discount.discountValue / 100);
    }
    return addon.price;
  };

  const updateOneTimeChargeDiscount = (chargeId: string, discountType: "none" | "fixed" | "percentage", discountValue: number) => {
    setOneTimeChargeDiscounts(prev => ({
      ...prev,
      [chargeId]: { discountType, discountValue }
    }));
  };

  const calculateOneTimeChargeDiscountedPrice = (charge: OneTimeChargeWithDiscount) => {
    const discount = oneTimeChargeDiscounts[charge.id];
    if (!discount || discount.discountType === "none" || discount.discountValue === 0) {
      return charge.amount;
    }
    if (discount.discountType === "fixed") {
      return Math.max(0, charge.amount - discount.discountValue);
    }
    if (discount.discountType === "percentage") {
      return charge.amount * (1 - discount.discountValue / 100);
    }
    return charge.amount;
  };

  // Calculate totals
  const licensesTotal = planSubtotal;
  const addonsTotal = availableAddons
    .filter((a) => selectedAddons.includes(a.id))
    .reduce((sum, a) => sum + calculateAddonDiscountedPrice(a) * (addonQuantities[a.id] || 1), 0);
  const grandTotal = licensesTotal + addonsTotal;

  const prevLic = currentSubscription.licenses[0];
  const prevLicensesTotal = prevLic ? prevLic.quantity * prevLic.pricePerLicense : 0;
  const prevAddonsTotal = availableAddons
    .filter((a) => currentSubscription.addons.some(addon => addon.id === a.id))
    .reduce((sum, a) => {
      const prevAddon = currentSubscription.addons.find(addon => addon.id === a.id);
      return sum + a.price * (prevAddon?.quantity || 1);
    }, 0);
  const prevGrandTotal = prevLicensesTotal + prevAddonsTotal;
  const totalDifference = grandTotal - prevGrandTotal;

  // Detect changes
  const getChanges = () => {
    const changes: { type: string; description: string; from?: string; to?: string }[] = [];

    // Plan type change
    if (plan !== currentSubscription.plan) {
      changes.push({
        type: "plan",
        description: "Plan",
        from: getLicenseLabel(currentSubscription.plan),
        to: getLicenseLabel(plan),
      });
    }

    // Seat quantity change
    if (prevLic && quantity !== prevLic.quantity) {
      const diff = quantity - prevLic.quantity;
      changes.push({
        type: "seats",
        description: getLicenseLabel(plan),
        from: `${prevLic.quantity} seats`,
        to: `${quantity} seats (${diff > 0 ? "+" : ""}${diff})`,
      });
    }

    // Price change
    if (prevLic && pricePerSeat !== prevLic.pricePerLicense) {
      changes.push({
        type: "price",
        description: `${getLicenseLabel(plan)} price`,
        from: formatCurrency(prevLic.pricePerLicense),
        to: formatCurrency(pricePerSeat),
      });
    }

    // Discount change
    if (prevLic && (discountType !== (prevLic.discountType || "none") || discountValue !== (prevLic.discountValue || 0))) {
      changes.push({
        type: "discount",
        description: `${getLicenseLabel(plan)} discount`,
        from: (prevLic.discountType || "none") === "none" ? "No discount" :
              prevLic.discountType === "fixed" ? `$${prevLic.discountValue} off` : `${prevLic.discountValue}% off`,
        to: discountType === "none" ? "No discount" :
            discountType === "fixed" ? `$${discountValue} off` : `${discountValue}% off`,
      });
    }

    const prevAddonIds = currentSubscription.addons.map(a => a.id);
    const addedAddons = selectedAddons.filter(
      (id) => !prevAddonIds.includes(id)
    );
    const removedAddons = prevAddonIds.filter(
      (id) => !selectedAddons.includes(id)
    );

    addedAddons.forEach((id) => {
      const addon = availableAddons.find((a) => a.id === id);
      if (addon) {
        const discountedPrice = calculateAddonDiscountedPrice(addon);
        changes.push({
          type: "addon",
          description: addon.name,
          from: "Not active",
          to: `Active (+${formatCurrency(discountedPrice)}/mo)`,
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

    // Track addon discount changes
    selectedAddons.forEach((addonId) => {
      const prevAddon = currentSubscription.addons.find(a => a.id === addonId);
      const currentDiscount = addonDiscounts[addonId];
      if (prevAddon && currentDiscount) {
        const prevDiscountType = prevAddon.discountType || "none";
        const prevDiscountValue = prevAddon.discountValue || 0;
        if (currentDiscount.discountType !== prevDiscountType || currentDiscount.discountValue !== prevDiscountValue) {
          const addon = availableAddons.find(a => a.id === addonId);
          if (addon) {
            changes.push({
              type: "addon_discount",
              description: `${addon.name} discount`,
              from: prevDiscountType === "none" ? "No discount" : 
                    prevDiscountType === "fixed" ? `$${prevDiscountValue} off` : `${prevDiscountValue}% off`,
              to: currentDiscount.discountType === "none" ? "No discount" :
                  currentDiscount.discountType === "fixed" ? `$${currentDiscount.discountValue} off` : `${currentDiscount.discountValue}% off`,
            });
          }
        }
      }
    });

    // Track one-time charge discount changes
    (currentSubscription.oneTimeCharges || []).forEach((charge) => {
      const currentDiscount = oneTimeChargeDiscounts[charge.id];
      if (currentDiscount) {
        const prevDiscountType = charge.discountType || "none";
        const prevDiscountValue = charge.discountValue || 0;
        if (currentDiscount.discountType !== prevDiscountType || currentDiscount.discountValue !== prevDiscountValue) {
          changes.push({
            type: "one_time_charge_discount",
            description: `${charge.name} discount`,
            from: prevDiscountType === "none" ? "No discount" : 
                  prevDiscountType === "fixed" ? `$${prevDiscountValue} off` : `${prevDiscountValue}% off`,
            to: currentDiscount.discountType === "none" ? "No discount" :
                currentDiscount.discountType === "fixed" ? `$${currentDiscount.discountValue} off` : `${currentDiscount.discountValue}% off`,
          });
        }
      }
    });

    return changes;
  };

  const changes = getChanges();
  const hasChanges = changes.length > 0;

  const isConflict = quantity < activeUsers;
  const hasConflicts = isConflict;

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
                      onChange={(e) => handlePlanChange(e.target.value)}
                      className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    >
                      <optgroup label="Roofing Plans">
                        <option value="roofing_core">Roofing Core</option>
                        <option value="roofing_premium">Roofing Premium</option>
                      </optgroup>
                      <optgroup label="Non-Roofing Plans">
                        <option value="non_roofing_starter">Non-Roofing Starter</option>
                        <option value="non_roofing_core">Non-Roofing Core</option>
                        <option value="non_roofing_premium">Non-Roofing Premium</option>
                      </optgroup>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  {(plan === "roofing_core" || plan === "roofing_premium" || plan === "non_roofing_core" || plan === "non_roofing_premium") && (
                    <p className="mt-1.5 text-xs text-green-600">
                      Core & Premium plans receive a $5/license discount with Zuper Pay.
                    </p>
                  )}
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
                      onClick={() => setBillingCycle("quarterly")}
                      className={`flex-1 rounded-md text-sm font-medium transition-all ${
                        billingCycle === "quarterly"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Quarterly
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

            {/* Plan Seats Section */}
            <section>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Seats</h3>
              <div
                className={`p-5 rounded-xl border transition-all ${
                  isConflict
                    ? "bg-red-50 border-red-200 shadow-sm"
                    : prevLic && quantity !== prevLic.quantity
                    ? "bg-white border-blue-300 shadow-md ring-1 ring-blue-100"
                    : "bg-white border-gray-200 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      {getLicenseLabel(plan)}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">{activeUsers} active users</p>
                  </div>
                </div>

                {isConflict && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-700 font-medium">
                      Cannot reduce below {activeUsers} active users
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">
                      Seats
                      {prevLic && quantity !== prevLic.quantity && (
                        <span className="text-blue-600 font-normal ml-1">(was {prevLic.quantity})</span>
                      )}
                    </label>
                    <div className="inline-flex items-center h-10 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 border-r border-gray-300 transition-colors"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-12 h-full text-center text-sm font-bold text-gray-900 focus:outline-none bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 border-l border-gray-300 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">Price/Seat</label>
                    <div className="relative h-10">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">$</span>
                      <input
                        type="number"
                        value={pricePerSeat}
                        onChange={(e) => setPricePerSeat(parseFloat(e.target.value) || 0)}
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
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value as "none" | "fixed" | "percentage")}
                        className="w-20 h-full px-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                      >
                        <option value="none">None</option>
                        <option value="fixed">Fixed</option>
                        <option value="percentage">%</option>
                      </select>
                      {discountType !== "none" && (
                        <div className="relative flex-1">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                            {discountType === "fixed" ? "$" : ""}
                          </span>
                          <input
                            type="number"
                            value={discountValue}
                            onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                            placeholder="0"
                            className={`w-full h-full ${discountType === "fixed" ? "pl-6" : "pl-2.5"} pr-6 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white`}
                          />
                          {discountType === "percentage" && (
                            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">Subtotal</label>
                    <div className="h-10 flex flex-col items-end justify-center px-3 bg-gray-50 border border-gray-200 rounded-lg">
                      {discountType !== "none" && discountValue > 0 ? (
                        <>
                          <span className="text-xs text-gray-400 line-through">
                            {formatCurrency(quantity * pricePerSeat)}
                          </span>
                          <span className="text-sm font-bold text-green-600">
                            {formatCurrency(planSubtotal)}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-bold text-gray-900">
                          {formatCurrency(planSubtotal)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Discount Applied Badge */}
                {discountType !== "none" && discountValue > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md border border-green-200">
                      <Tag className="w-3 h-3" />
                      {discountType === "fixed" 
                        ? `$${discountValue} off per seat`
                        : `${discountValue}% discount applied`
                      }
                    </span>
                    <span className="text-xs text-gray-500">
                      Saving {formatCurrency((pricePerSeat * quantity) - planSubtotal)}/mo
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* Add-ons Section */}
            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Add-ons</h3>
                  <span className="text-xs text-gray-500">
                    {selectedAddons.length} selected · {formatCurrency(addonsTotal)}/mo
                  </span>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search add-ons..."
                    value={addonSearch}
                    onChange={(e) => setAddonSearch(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {(() => {
                  const filtered = availableAddons.filter(addon => 
                    addon.name.toLowerCase().includes(addonSearch.toLowerCase()) ||
                    addon.description.toLowerCase().includes(addonSearch.toLowerCase())
                  );
                  const groups = [...new Set(filtered.map(a => a.group))];
                  
                  if (filtered.length === 0) {
                    return (
                      <div className="px-5 py-8 text-center text-sm text-gray-500">
                        No add-ons found matching &quot;{addonSearch}&quot;
                      </div>
                    );
                  }
                  
                  return groups.map(group => (
                    <div key={group}>
                      <div className="px-5 py-2 bg-gray-50 border-b border-gray-100 sticky top-0">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{group}</span>
                      </div>
                      {filtered.filter(a => a.group === group).map((addon) => {
                        const isSelected = selectedAddons.includes(addon.id);
                        const prevAddonIds = currentSubscription.addons.map(a => a.id);
                        const wasSelected = prevAddonIds.includes(addon.id);
                        const isChanged = isSelected !== wasSelected;
                        const discount = addonDiscounts[addon.id] || { discountType: "none", discountValue: 0 };
                        const hasDiscount = discount.discountType !== "none" && discount.discountValue > 0;
                        const discountedPrice = calculateAddonDiscountedPrice(addon);
                        const qty = addonQuantities[addon.id] || 1;
                        const lineTotal = discountedPrice * qty;

                        return (
                          <div
                            key={addon.id}
                            className={`border-b border-gray-100 last:border-b-0 transition-colors ${
                              isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                            }`}
                          >
                            <div
                              onClick={() => toggleAddon(addon.id)}
                              className="flex items-center justify-between px-5 py-3 cursor-pointer"
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <button
                                  type="button"
                                  className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                                    isSelected 
                                      ? "bg-blue-500" 
                                      : "border-2 border-gray-300 bg-white hover:border-gray-400"
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 text-white" />}
                                </button>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-900 truncate">{addon.name}</span>
                                    {isChanged && (
                                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded flex-shrink-0 ${
                                        isSelected ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                      }`}>
                                        {isSelected ? "Adding" : "Removing"}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-500 truncate">{addon.description}</p>
                                </div>
                              </div>
                              <div className="ml-4 flex-shrink-0 text-right">
                                {addon.group === "Seats" && hasDiscount ? (
                                  <div className="flex flex-col items-end">
                                    <span className="text-xs text-gray-400 line-through">{formatCurrency(addon.price * qty)}/mo</span>
                                    <span className="text-sm font-semibold text-green-600">{formatCurrency(lineTotal)}/mo</span>
                                    {qty > 1 && <span className="text-xs text-gray-400">{formatCurrency(discountedPrice)} each</span>}
                                  </div>
                                ) : addon.group === "Seats" ? (
                                  <div className="flex flex-col items-end">
                                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(lineTotal)}/mo</span>
                                    {qty > 1 && <span className="text-xs text-gray-400">{formatCurrency(addon.price)} each</span>}
                                  </div>
                                ) : hasDiscount ? (
                                  <div className="flex flex-col items-end">
                                    <span className="text-xs text-gray-400 line-through">{formatCurrency(addon.price)}{addon.unit ? `/${addon.unit}` : ""}/mo</span>
                                    <span className="text-sm font-semibold text-green-600">{formatCurrency(discountedPrice)}{addon.unit ? `/${addon.unit}` : ""}/mo</span>
                                  </div>
                                ) : (
                                  <span className="text-sm font-semibold text-gray-900">{formatCurrency(addon.price)}{addon.unit ? `/${addon.unit}` : ""}/mo</span>
                                )}
                              </div>
                            </div>
                            
                            {/* Quantity & Discount controls for selected addons */}
                            {isSelected && (
                              <div className="px-5 pb-3 space-y-2" onClick={(e) => e.stopPropagation()}>
                                {/* Quantity - only for seat-type add-ons */}
                                {addon.group === "Seats" && (
                                  <div className="flex items-center gap-2 pl-8">
                                    <span className="text-xs font-medium text-gray-500">Qty:</span>
                                    <div className="inline-flex items-center h-7 bg-white border border-gray-300 rounded-md overflow-hidden">
                                      <button
                                        onClick={() => updateAddonQuantity(addon.id, qty - 1)}
                                        className="w-7 h-full flex items-center justify-center hover:bg-gray-50"
                                      >
                                        <Minus className="w-3 h-3 text-gray-600" />
                                      </button>
                                      <input
                                        type="number"
                                        value={qty}
                                        onChange={(e) => updateAddonQuantity(addon.id, parseInt(e.target.value) || 1)}
                                        className="w-10 h-full text-center text-xs font-medium border-x border-gray-300 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                      />
                                      <button
                                        onClick={() => updateAddonQuantity(addon.id, qty + 1)}
                                        className="w-7 h-full flex items-center justify-center hover:bg-gray-50"
                                      >
                                        <Plus className="w-3 h-3 text-gray-600" />
                                      </button>
                                    </div>
                                  </div>
                                )}
                                {/* Discount */}
                                <div className="flex items-center gap-2 pl-8">
                                  <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                    <Tag className="w-3 h-3" />
                                    Discount:
                                  </span>
                                  <select
                                    value={discount.discountType}
                                    onChange={(e) => updateAddonDiscount(
                                      addon.id,
                                      e.target.value as "none" | "fixed" | "percentage",
                                      discount.discountValue
                                    )}
                                    className="h-8 px-2 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                                  >
                                    <option value="none">None</option>
                                    <option value="fixed">Fixed ($)</option>
                                    <option value="percentage">Percentage (%)</option>
                                  </select>
                                  {discount.discountType !== "none" && (
                                    <div className="relative">
                                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                                        {discount.discountType === "fixed" ? "$" : ""}
                                      </span>
                                      <input
                                        type="number"
                                        value={discount.discountValue}
                                        onChange={(e) => updateAddonDiscount(
                                          addon.id,
                                          discount.discountType,
                                          parseFloat(e.target.value) || 0
                                        )}
                                        placeholder="0"
                                        className={`w-20 h-8 ${discount.discountType === "fixed" ? "pl-5" : "pl-2"} pr-5 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                      />
                                      {discount.discountType === "percentage" && (
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                                      )}
                                    </div>
                                  )}
                                  {hasDiscount && (
                                    <span className="text-xs text-green-600 font-medium">
                                      Saving {formatCurrency((addon.price - discountedPrice) * (addon.group === "Seats" ? qty : 1))}/mo
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ));
                })()}
              </div>
            </section>

            {/* One-time Charges Section */}
            {currentSubscription.oneTimeCharges && currentSubscription.oneTimeCharges.length > 0 && (
              <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-amber-600" />
                      One-time Charges
                    </h3>
                    <span className="text-xs text-gray-500">
                      {currentSubscription.oneTimeCharges.length} charges
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Charges are read-only. Discounts can be applied to reduce the amount.
                  </p>
                </div>
                <div className="divide-y divide-gray-100">
                  {currentSubscription.oneTimeCharges.map((charge) => {
                    const discount = oneTimeChargeDiscounts[charge.id] || { discountType: "none", discountValue: 0 };
                    const hasDiscount = discount.discountType !== "none" && discount.discountValue > 0;
                    const discountedPrice = calculateOneTimeChargeDiscountedPrice(charge);
                    const prevDiscount = (currentSubscription.oneTimeCharges || []).find(c => c.id === charge.id);
                    const isChanged = prevDiscount && (
                      discount.discountType !== (prevDiscount.discountType || "none") ||
                      discount.discountValue !== (prevDiscount.discountValue || 0)
                    );

                    return (
                      <div
                        key={charge.id}
                        className={`px-5 py-4 ${isChanged ? "bg-blue-50" : ""}`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-sm font-medium text-gray-900">{charge.name}</span>
                            {isChanged && (
                              <span className="ml-2 text-xs font-medium px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                                Discount changed
                              </span>
                            )}
                          </div>
                          {hasDiscount ? (
                            <div className="flex flex-col items-end">
                              <span className="text-xs text-gray-400 line-through">{formatCurrency(charge.amount)}</span>
                              <span className="text-sm font-semibold text-green-600">{formatCurrency(discountedPrice)}</span>
                            </div>
                          ) : (
                            <span className="text-sm font-semibold text-gray-900">{formatCurrency(charge.amount)}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            Discount:
                          </span>
                          <select
                            value={discount.discountType}
                            onChange={(e) => updateOneTimeChargeDiscount(
                              charge.id,
                              e.target.value as "none" | "fixed" | "percentage",
                              discount.discountValue
                            )}
                            className="h-8 px-2 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                          >
                            <option value="none">None</option>
                            <option value="fixed">Fixed ($)</option>
                            <option value="percentage">Percentage (%)</option>
                          </select>
                          {discount.discountType !== "none" && (
                            <div className="relative">
                              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                                {discount.discountType === "fixed" ? "$" : ""}
                              </span>
                              <input
                                type="number"
                                value={discount.discountValue}
                                onChange={(e) => updateOneTimeChargeDiscount(
                                  charge.id,
                                  discount.discountType,
                                  parseFloat(e.target.value) || 0
                                )}
                                placeholder="0"
                                className={`w-20 h-8 ${discount.discountType === "fixed" ? "pl-6" : "pl-2"} pr-6 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                              />
                              {discount.discountType === "percentage" && (
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">%</span>
                              )}
                            </div>
                          )}
                          {hasDiscount && (
                            <span className="text-xs text-green-600 font-medium">
                              Saving {formatCurrency(charge.amount - discountedPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Billing Summary Section */}
            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Billing Summary</h3>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Plan ({quantity} seats)</span>
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
