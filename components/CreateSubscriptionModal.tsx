"use client";

import { useState } from "react";
import { X, Plus, Minus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

interface CreateSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const licenseTypes = [
  { value: "roofing_core", label: "Roofing Core", defaultPrice: 30, group: "Roofing" },
  { value: "roofing_premium", label: "Roofing Premium", defaultPrice: 50, group: "Roofing" },
  { value: "non_roofing_starter", label: "Non-Roofing Starter", defaultPrice: 15, group: "Non-Roofing" },
  { value: "non_roofing_core", label: "Non-Roofing Core", defaultPrice: 30, group: "Non-Roofing" },
  { value: "non_roofing_premium", label: "Non-Roofing Premium", defaultPrice: 50, group: "Non-Roofing" },
];

const addons = [
  // Seat Add-on
  { id: "basic_seat", name: "Basic Seat (Crew)", price: 20, group: "Seats", description: "Login, time tracking, geo tracking, basic job view" },
  // Zuper Connect
  { id: "zuper_connect_text", name: "Zuper Connect – Text", price: 99, group: "Zuper Connect", description: "SMS/MMS telephony with call flows, recording, CRM sync" },
  { id: "zuper_connect_plus", name: "Zuper Connect – Plus", price: 299, group: "Zuper Connect", description: "Advanced telephony with call masking, ring groups, voicemails" },
  { id: "zuper_connect_intelligence", name: "Zuper Connect – Intelligence", price: 499, group: "Zuper Connect", description: "AI telephony with summaries, responder, 3-yr storage" },
  // Zuper Fleet
  { id: "zuper_fleet_e2e", name: "Zuper Fleet – End-to-End", price: 60, group: "Zuper Fleet", description: "GPS tracking, AI safety cams, health monitoring" },
  { id: "zuper_fleet_safetycam", name: "Zuper Fleet – SafetyCam AI", price: 35, group: "Zuper Fleet", description: "Dashcam for driver monitoring, safety scoring" },
  { id: "zuper_fleet_gps", name: "Zuper Fleet – GPS with Vehicle Health", price: 30, group: "Zuper Fleet", description: "Real-time GPS, predictive alerts" },
  // Platform Features (included in Roofing, add-on for Non-Roofing)
  { id: "customer_portal", name: "Customer Portal", price: 50, group: "Platform Features", description: "Branded self-service portal for jobs, invoices, and requests" },
  { id: "report_builder", name: "Report Builder", price: 75, group: "Platform Features", description: "Advanced reporting for custom dashboards and KPIs" },
  { id: "workflow_builder", name: "Workflow Builder", price: 80, group: "Platform Features", description: "Visual automation for processes (up to 5,000 executions/mo)" },
  { id: "platform_maintenance", name: "Platform Maintenance Fee", price: 100, group: "Platform Features", description: "Annual infrastructure, maintenance, and compliance" },
];

export default function CreateSubscriptionModal({
  isOpen,
  onClose,
}: CreateSubscriptionModalProps) {
  const [plan, setPlan] = useState("roofing_premium");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");
  const [quantity, setQuantity] = useState(10);
  const [pricePerSeat, setPricePerSeat] = useState(50);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [addonQuantities, setAddonQuantities] = useState<Record<string, number>>({});
  const [trialPeriod, setTrialPeriod] = useState<string>("none");
  const [customTrialDate, setCustomTrialDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handlePlanChange = (newPlan: string) => {
    setPlan(newPlan);
    const planDef = licenseTypes.find((t) => t.value === newPlan);
    if (planDef) {
      setPricePerSeat(planDef.defaultPrice);
    }
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) => {
      if (prev.includes(addonId)) {
        return prev.filter((id) => id !== addonId);
      } else {
        if (!addonQuantities[addonId]) {
          setAddonQuantities((q) => ({ ...q, [addonId]: 1 }));
        }
        return [...prev, addonId];
      }
    });
  };

  const updateAddonQuantity = (addonId: string, qty: number) => {
    setAddonQuantities((prev) => ({ ...prev, [addonId]: Math.max(1, qty) }));
  };

  // Calculate totals
  const licensesTotal = quantity * pricePerSeat;
  const addonsTotal = addons
    .filter((a) => selectedAddons.includes(a.id))
    .reduce((sum, a) => sum + a.price * (addonQuantities[a.id] || 1), 0);
  const grandTotal = licensesTotal + addonsTotal;

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    onClose();
  };

  const getPlanLabel = (type: string) => {
    return licenseTypes.find((t) => t.value === type)?.label || type;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Create Subscription
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Plan Selection */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Plan Selection
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Plan <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={plan}
                    onChange={(e) => handlePlanChange(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                {(plan === "roofing_core" || plan === "roofing_premium" || plan === "non_roofing_core" || plan === "non_roofing_premium") && (
                  <p className="mt-1.5 text-xs text-green-600">
                    Core & Premium plans receive a $5/license discount with Zuper Pay.
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Billing Cycle <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="billingCycle"
                      value="monthly"
                      checked={billingCycle === "monthly"}
                      onChange={() => setBillingCycle("monthly")}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Monthly</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="billingCycle"
                      value="annually"
                      checked={billingCycle === "annually"}
                      onChange={() => setBillingCycle("annually")}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Annually</span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Plan Configuration */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Plan Configuration
            </h3>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                {getPlanLabel(plan)}
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Seats
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center py-2 border-y border-gray-300 text-sm focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Price/Seat
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={pricePerSeat}
                      onChange={(e) => setPricePerSeat(parseFloat(e.target.value) || 0)}
                      className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Subtotal
                  </label>
                  <p className="py-2 text-sm font-semibold text-gray-900">
                    {formatCurrency(quantity * pricePerSeat)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Add-ons */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Add-ons (Optional)
            </h3>
            <div className="space-y-4">
              {(() => {
                const groups = [...new Set(addons.map(a => a.group))];
                return groups.map(group => (
                  <div key={group}>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{group}</p>
                    {group === "Platform Features" && plan.startsWith("roofing_") && (
                      <p className="text-xs text-green-600 mb-2">✓ Included in your Roofing plan at no extra cost</p>
                    )}
                    {group === "Platform Features" && !plan.startsWith("roofing_") && (
                      <p className="text-xs text-amber-600 mb-2">Charged as add-ons for Non-Roofing plans</p>
                    )}
                    <div className="space-y-2">
                      {addons.filter(a => a.group === group).map((addon) => {
                        const isIncluded = group === "Platform Features" && plan.startsWith("roofing_");
                        const isSelected = selectedAddons.includes(addon.id);
                        const qty = addonQuantities[addon.id] || 1;
                        return (
                          <div
                            key={addon.id}
                            className={`rounded-lg border transition-colors ${
                              isIncluded
                                ? "bg-green-50 border-green-200"
                                : isSelected
                                ? "bg-blue-50 border-blue-200"
                                : "bg-gray-50 border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            <label className="flex items-center justify-between p-3 cursor-pointer">
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={isIncluded || isSelected}
                                  onChange={() => !isIncluded && toggleAddon(addon.id)}
                                  disabled={isIncluded}
                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                                />
                                <div>
                                  <span className="text-sm text-gray-900">{addon.name}</span>
                                  <p className="text-xs text-gray-500">{addon.description}</p>
                                </div>
                              </div>
                              <span className="text-sm text-gray-600 flex-shrink-0 ml-4">
                                {isIncluded ? (
                                  <span className="text-green-600 font-medium">Included</span>
                                ) : addon.group === "Seats" ? (
                                  <>{formatCurrency(addon.price)}/mo each</>
                                ) : (
                                  <>{formatCurrency(addon.price)}/mo</>
                                )}
                              </span>
                            </label>
                            {/* Qty controls only for seat-type add-ons */}
                            {isSelected && !isIncluded && addon.group === "Seats" && (
                              <div className="px-3 pb-3 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center gap-2 pl-7">
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
                                <span className="text-sm font-medium text-gray-900">
                                  {formatCurrency(addon.price * qty)}/mo
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </section>

          {/* Trial Period */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Trial Period
            </h3>
            <div className="space-y-2">
              {[
                { value: "none", label: "No Trial" },
                { value: "7", label: "7 Days Trial" },
                { value: "30", label: "30 Days Trial" },
                { value: "custom", label: "Custom End Date" },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:border-blue-300 transition-colors"
                >
                  <input
                    type="radio"
                    name="trialPeriod"
                    value={option.value}
                    checked={trialPeriod === option.value}
                    onChange={() => setTrialPeriod(option.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900">{option.label}</span>
                  {option.value === "custom" && trialPeriod === "custom" && (
                    <input
                      type="date"
                      value={customTrialDate}
                      onChange={(e) => setCustomTrialDate(e.target.value)}
                      className="ml-auto px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </label>
              ))}
            </div>
          </section>

          {/* Billing Summary */}
          <section className="p-4 bg-slate-800 rounded-lg text-white">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-slate-300">
              Billing Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-slate-300">Plan Total</span>
                <span className="text-sm text-white">
                  {formatCurrency(licensesTotal)}/month
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-300">Add-ons Total</span>
                <span className="text-sm text-white">
                  {formatCurrency(addonsTotal)}/month
                </span>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-600 flex justify-between">
                <span className="text-base font-semibold text-white">Grand Total</span>
                <span className="text-xl font-bold text-white">
                  {formatCurrency(grandTotal)}/month
                </span>
              </div>
              {trialPeriod !== "none" && (
                <p className="text-xs text-slate-400 mt-2">
                  $0 during trial period, then {formatCurrency(grandTotal)}/month
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} isLoading={isLoading}>
            {isLoading ? "Creating..." : "Create Subscription"}
          </Button>
        </div>
      </div>
    </div>
  );
}


