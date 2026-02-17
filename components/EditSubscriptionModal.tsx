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

  const updateAddonDiscount = (addonId: string, dt: "none" | "fixed" | "percentage", dv: number) => {
    setAddonDiscounts(prev => ({
      ...prev,
      [addonId]: { discountType: dt, discountValue: dv }
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

  const updateOneTimeChargeDiscount = (chargeId: string, dt: "none" | "fixed" | "percentage", dv: number) => {
    setOneTimeChargeDiscounts(prev => ({
      ...prev,
      [chargeId]: { discountType: dt, discountValue: dv }
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

    if (plan !== currentSubscription.plan) {
      changes.push({
        type: "plan",
        description: "Plan",
        from: getLicenseLabel(currentSubscription.plan),
        to: getLicenseLabel(plan),
      });
    }

    if (prevLic && quantity !== prevLic.quantity) {
      const diff = quantity - prevLic.quantity;
      changes.push({
        type: "seats",
        description: getLicenseLabel(plan),
        from: `${prevLic.quantity} seats`,
        to: `${quantity} seats (${diff > 0 ? "+" : ""}${diff})`,
      });
    }

    if (prevLic && pricePerSeat !== prevLic.pricePerLicense) {
      changes.push({
        type: "price",
        description: `${getLicenseLabel(plan)} price`,
        from: formatCurrency(prevLic.pricePerLicense),
        to: formatCurrency(pricePerSeat),
      });
    }

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
    const addedAddons = selectedAddons.filter((id) => !prevAddonIds.includes(id));
    const removedAddons = prevAddonIds.filter((id) => !selectedAddons.includes(id));

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

  // Filtered addons for search
  const filtered = availableAddons.filter(addon =>
    addon.name.toLowerCase().includes(addonSearch.toLowerCase()) ||
    addon.description.toLowerCase().includes(addonSearch.toLowerCase())
  );
  const addonGroups = [...new Set(filtered.map(a => a.group))];

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
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0 bg-white">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Edit Subscription</h2>
            <p className="text-xs text-gray-500 mt-0.5">Modify plan, add-ons, and discounts</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-5 space-y-5">

            {/* ─── Section 1: Plan ─── */}
            <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</h3>
              </div>
              <div className="p-5 space-y-4">
                {/* Row 1: Plan + Billing Cycle */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Plan Type</label>
                    <div className="relative">
                      <select
                        value={plan}
                        onChange={(e) => handlePlanChange(e.target.value)}
                        className="w-full h-9 px-3 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                      >
                        <optgroup label="Roofing">
                          <option value="roofing_core">Roofing Core</option>
                          <option value="roofing_premium">Roofing Premium</option>
                        </optgroup>
                        <optgroup label="Non-Roofing">
                          <option value="non_roofing_starter">Non-Roofing Starter</option>
                          <option value="non_roofing_core">Non-Roofing Core</option>
                          <option value="non_roofing_premium">Non-Roofing Premium</option>
                        </optgroup>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Billing Cycle</label>
                    <div className="flex h-9 p-0.5 bg-gray-100 border border-gray-200 rounded-lg">
                      {(["monthly", "quarterly", "annually"] as const).map((cycle) => (
                        <button
                          key={cycle}
                          onClick={() => setBillingCycle(cycle)}
                          className={`flex-1 rounded-md text-xs font-medium transition-all ${
                            billingCycle === cycle
                              ? "bg-white text-gray-900 shadow-sm"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100" />

                {/* Row 2: Seats configuration */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{getLicenseLabel(plan)}</span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-gray-500">{activeUsers} active users</span>
                    </div>
                    {discountType !== "none" && discountValue > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-100">
                        <Tag className="w-2.5 h-2.5" />
                        {discountType === "fixed" ? `$${discountValue} off/seat` : `${discountValue}% off`}
                      </span>
                    )}
                  </div>

                  {isConflict && (
                    <div className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                      <p className="text-xs text-red-700 font-medium">Cannot reduce below {activeUsers} active users</p>
                    </div>
                  )}

                  <div className="grid grid-cols-4 gap-3">
                    {/* Seats */}
                    <div>
                      <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">Seats</label>
                      <div className="inline-flex items-center h-9 bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-8 h-full flex items-center justify-center hover:bg-gray-50 border-r border-gray-200 transition-colors"
                        >
                          <Minus className="w-3 h-3 text-gray-500" />
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-10 h-full text-center text-sm font-semibold text-gray-900 focus:outline-none bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-8 h-full flex items-center justify-center hover:bg-gray-50 border-l border-gray-200 transition-colors"
                        >
                          <Plus className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                    </div>

                    {/* Price/Seat */}
                    <div>
                      <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">Price/Seat</label>
                      <div className="relative h-9">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">$</span>
                        <input
                          type="number"
                          value={pricePerSeat}
                          onChange={(e) => setPricePerSeat(parseFloat(e.target.value) || 0)}
                          className="w-full h-full pl-6 pr-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                        />
                      </div>
                    </div>

                    {/* Discount */}
                    <div>
                      <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">Discount</label>
                      <div className="flex h-9 gap-1">
                        <select
                          value={discountType}
                          onChange={(e) => setDiscountType(e.target.value as "none" | "fixed" | "percentage")}
                          className="w-16 h-full px-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none cursor-pointer"
                        >
                          <option value="none">—</option>
                          <option value="fixed">$</option>
                          <option value="percentage">%</option>
                        </select>
                        {discountType !== "none" && (
                          <div className="relative flex-1">
                            <input
                              type="number"
                              value={discountValue}
                              onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                              placeholder="0"
                              className="w-full h-full px-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                            />
                            {discountType === "percentage" && (
                              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">%</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div>
                      <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">Subtotal</label>
                      <div className="h-9 flex items-center justify-end px-3 bg-gray-50 border border-gray-100 rounded-lg">
                        {discountType !== "none" && discountValue > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-gray-400 line-through">{formatCurrency(quantity * pricePerSeat)}</span>
                            <span className="text-sm font-bold text-green-600">{formatCurrency(planSubtotal)}</span>
                          </div>
                        ) : (
                          <span className="text-sm font-bold text-gray-900">{formatCurrency(planSubtotal)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── Section 2: Add-ons ─── */}
            <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Add-ons</h3>
                <span className="text-xs text-gray-400">
                  {selectedAddons.length} selected · {formatCurrency(addonsTotal)}/mo
                </span>
              </div>

              {/* Search */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search add-ons..."
                    value={addonSearch}
                    onChange={(e) => setAddonSearch(e.target.value)}
                    className="w-full h-8 pl-8 pr-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white"
                  />
                </div>
              </div>

              {/* Addon list — no nested scroll */}
              <div className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <div className="px-5 py-6 text-center text-sm text-gray-400">
                    No add-ons found matching &quot;{addonSearch}&quot;
                  </div>
                ) : (
                  addonGroups.map(group => (
                    <div key={group}>
                      <div className="px-4 py-1.5 bg-gray-50/70">
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{group}</span>
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
                        const unitLabel = addon.unit ? `/${addon.unit}` : "";

                        return (
                          <div
                            key={addon.id}
                            className={`transition-colors ${
                              isSelected ? "bg-blue-50/50" : "hover:bg-gray-50/50"
                            }`}
                          >
                            {/* Main row: checkbox + name + price */}
                            <div
                              onClick={() => toggleAddon(addon.id)}
                              className="flex items-center gap-3 px-4 py-2.5 cursor-pointer"
                            >
                              <button
                                type="button"
                                className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                                  isSelected 
                                    ? "bg-blue-500" 
                                    : "border-[1.5px] border-gray-300 bg-white hover:border-gray-400"
                                }`}
                              >
                                {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                              </button>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-sm font-medium text-gray-900">{addon.name}</span>
                                  {isChanged && (
                                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                                      isSelected ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    }`}>
                                      {isSelected ? "NEW" : "REMOVING"}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-400 truncate leading-tight">{addon.description}</p>
                              </div>
                              <div className="flex-shrink-0 text-right ml-3">
                                {addon.group === "Seats" ? (
                                  <div className="flex flex-col items-end">
                                    {hasDiscount ? (
                                      <>
                                        <span className="text-xs text-gray-400 line-through">{formatCurrency(addon.price * qty)}/mo</span>
                                        <span className="text-sm font-semibold text-green-600">{formatCurrency(lineTotal)}/mo</span>
                                      </>
                                    ) : (
                                      <span className="text-sm font-semibold text-gray-900">{formatCurrency(lineTotal)}/mo</span>
                                    )}
                                    {qty > 1 && <span className="text-[10px] text-gray-400">{formatCurrency(discountedPrice)} each</span>}
                                  </div>
                                ) : hasDiscount ? (
                                  <div className="flex flex-col items-end">
                                    <span className="text-xs text-gray-400 line-through">{formatCurrency(addon.price)}{unitLabel}/mo</span>
                                    <span className="text-sm font-semibold text-green-600">{formatCurrency(discountedPrice)}{unitLabel}/mo</span>
                                  </div>
                                ) : (
                                  <span className="text-sm font-semibold text-gray-900">{formatCurrency(addon.price)}{unitLabel}/mo</span>
                                )}
                              </div>
                            </div>

                            {/* Expanded controls — grid layout matching Plan section */}
                            {isSelected && (
                              <div className="mx-4 mb-3 ml-11 p-3 bg-gray-50 border border-gray-100 rounded-lg" onClick={(e) => e.stopPropagation()}>
                                <div className={`grid ${addon.group === "Seats" ? "grid-cols-4" : "grid-cols-3"} gap-3`}>
                                  {/* Qty — seats only */}
                                  {addon.group === "Seats" && (
                                    <div>
                                      <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">Qty</label>
                                      <div className="inline-flex items-center h-8 bg-white border border-gray-200 rounded-lg overflow-hidden">
                                        <button onClick={() => updateAddonQuantity(addon.id, qty - 1)} className="w-7 h-full flex items-center justify-center hover:bg-gray-50 border-r border-gray-200">
                                          <Minus className="w-3 h-3 text-gray-500" />
                                        </button>
                                        <input
                                          type="number"
                                          value={qty}
                                          onChange={(e) => updateAddonQuantity(addon.id, parseInt(e.target.value) || 1)}
                                          className="w-9 h-full text-center text-sm font-semibold text-gray-900 focus:outline-none bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <button onClick={() => updateAddonQuantity(addon.id, qty + 1)} className="w-7 h-full flex items-center justify-center hover:bg-gray-50 border-l border-gray-200">
                                          <Plus className="w-3 h-3 text-gray-500" />
                                        </button>
                                      </div>
                                    </div>
                                  )}

                                  {/* Price */}
                                  <div>
                                    <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                                      {addon.group === "Seats" ? "Price/Seat" : `Price${unitLabel}`}
                                    </label>
                                    <div className="h-8 flex items-center px-2.5 bg-white border border-gray-200 rounded-lg">
                                      <span className="text-sm font-medium text-gray-900">{formatCurrency(addon.price)}</span>
                                      <span className="text-xs text-gray-400 ml-0.5">/mo</span>
                                    </div>
                                  </div>

                                  {/* Discount */}
                                  <div>
                                    <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">Discount</label>
                                    <div className="flex h-8 gap-1">
                                      <select
                                        value={discount.discountType}
                                        onChange={(e) => updateAddonDiscount(addon.id, e.target.value as "none" | "fixed" | "percentage", discount.discountValue)}
                                        className="w-14 h-full px-1 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 focus:outline-none appearance-none cursor-pointer"
                                      >
                                        <option value="none">—</option>
                                        <option value="fixed">$</option>
                                        <option value="percentage">%</option>
                                      </select>
                                      {discount.discountType !== "none" && (
                                        <div className="relative flex-1">
                                          <input
                                            type="number"
                                            value={discount.discountValue}
                                            onChange={(e) => updateAddonDiscount(addon.id, discount.discountType, parseFloat(e.target.value) || 0)}
                                            placeholder="0"
                                            className="w-full h-full px-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none"
                                          />
                                          {discount.discountType === "percentage" && (
                                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">%</span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Total */}
                                  <div>
                                    <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">Total</label>
                                    <div className="h-8 flex items-center justify-end px-2.5 bg-white border border-gray-100 rounded-lg">
                                      {hasDiscount ? (
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-xs text-gray-400 line-through">{formatCurrency(addon.price * (addon.group === "Seats" ? qty : 1))}</span>
                                          <span className="text-sm font-bold text-green-600">{formatCurrency(lineTotal)}</span>
                                        </div>
                                      ) : (
                                        <span className="text-sm font-bold text-gray-900">{formatCurrency(lineTotal)}</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* ─── Section 3: One-time Charges ─── */}
            {currentSubscription.oneTimeCharges && currentSubscription.oneTimeCharges.length > 0 && (
              <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                    One-time Charges
                  </h3>
                  <span className="text-xs text-gray-400">{currentSubscription.oneTimeCharges.length} charges</span>
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
                      <div key={charge.id} className={`px-4 py-3 ${isChanged ? "bg-blue-50/50" : ""}`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">{charge.name}</span>
                            {isChanged && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">CHANGED</span>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {/* Amount */}
                          <div>
                            <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">Amount</label>
                            <div className="h-8 flex items-center px-2.5 bg-white border border-gray-200 rounded-lg">
                              <span className="text-sm font-medium text-gray-900">{formatCurrency(charge.amount)}</span>
                            </div>
                          </div>
                          {/* Discount */}
                          <div>
                            <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">Discount</label>
                            <div className="flex h-8 gap-1">
                              <select
                                value={discount.discountType}
                                onChange={(e) => updateOneTimeChargeDiscount(charge.id, e.target.value as "none" | "fixed" | "percentage", discount.discountValue)}
                                className="w-14 h-full px-1 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 focus:outline-none appearance-none cursor-pointer"
                              >
                                <option value="none">—</option>
                                <option value="fixed">$</option>
                                <option value="percentage">%</option>
                              </select>
                              {discount.discountType !== "none" && (
                                <div className="relative flex-1">
                                  <input
                                    type="number"
                                    value={discount.discountValue}
                                    onChange={(e) => updateOneTimeChargeDiscount(charge.id, discount.discountType, parseFloat(e.target.value) || 0)}
                                    placeholder="0"
                                    className="w-full h-full px-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none"
                                  />
                                  {discount.discountType === "percentage" && (
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">%</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          {/* Total */}
                          <div>
                            <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">Total</label>
                            <div className="h-8 flex items-center justify-end px-2.5 bg-white border border-gray-100 rounded-lg">
                              {hasDiscount ? (
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs text-gray-400 line-through">{formatCurrency(charge.amount)}</span>
                                  <span className="text-sm font-bold text-green-600">{formatCurrency(discountedPrice)}</span>
                                </div>
                              ) : (
                                <span className="text-sm font-bold text-gray-900">{formatCurrency(charge.amount)}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

          </div>
        </div>

        {/* ─── Sticky Footer with Live Total ─── */}
        <div className="flex-shrink-0 border-t border-gray-200 bg-white">
          {/* Change indicator */}
          {hasChanges && (
            <div className="px-5 py-2 bg-amber-50 border-b border-amber-100 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs text-amber-700 font-medium">
                {changes.length} change{changes.length !== 1 ? "s" : ""} pending
              </span>
              <span className="text-xs text-amber-500 ml-auto">
                {totalDifference >= 0 ? "+" : ""}{formatCurrency(totalDifference)}/mo
              </span>
            </div>
          )}
          <div className="px-5 py-3 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-500">Monthly Total</span>
              <span className="text-xl font-bold text-gray-900">{formatCurrency(grandTotal)}</span>
              <span className="text-xs text-gray-400">/mo</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={onClose} className="px-4 py-2 text-sm">
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!hasChanges || hasConflicts} className="px-5 py-2 text-sm">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
