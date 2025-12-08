"use client";

import { useState } from "react";
import { X, Plus, Trash2, Minus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

interface License {
  id: string;
  type: string;
  quantity: number;
  pricePerLicense: number;
}

interface CreateSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const licenseTypes = [
  { value: "premium_zp", label: "Roofing Premium (w/ Zuper Pay)", defaultPrice: 50 },
  { value: "premium_no_zp", label: "Roofing Premium (w/o Zuper Pay)", defaultPrice: 50 },
  { value: "basic", label: "Roofing Basic User", defaultPrice: 20 },
];

const addons = [
  { id: "zuper_pay", name: "Zuper Pay", price: 100 },
  { id: "analytics", name: "Advanced Analytics", price: 50 },
  { id: "support", name: "Premium Support", price: 200 },
  { id: "api", name: "API Access", price: 150 },
];

export default function CreateSubscriptionModal({
  isOpen,
  onClose,
}: CreateSubscriptionModalProps) {
  const [plan, setPlan] = useState("premium");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");
  const [licenses, setLicenses] = useState<License[]>([
    { id: "1", type: "premium_zp", quantity: 10, pricePerLicense: 50 },
    { id: "2", type: "basic", quantity: 25, pricePerLicense: 20 },
  ]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["zuper_pay"]);
  const [trialPeriod, setTrialPeriod] = useState<string>("none");
  const [customTrialDate, setCustomTrialDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
          pricePerLicense: availableType.defaultPrice,
        },
      ]);
    }
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
    (sum, lic) => sum + lic.quantity * lic.pricePerLicense,
    0
  );
  const addonsTotal = addons
    .filter((a) => selectedAddons.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  const grandTotal = licensesTotal + addonsTotal;

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    onClose();
  };

  const getLicenseLabel = (type: string) => {
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
                    onChange={(e) => setPlan(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="premium">Premium</option>
                    <option value="standard" disabled>
                      Standard (Coming Soon)
                    </option>
                    <option value="core" disabled>
                      Core (Coming Soon)
                    </option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
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

          {/* License Configuration */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                License Configuration
              </h3>
              <button
                onClick={addLicense}
                disabled={licenses.length >= licenseTypes.length}
                className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                Add License Type
              </button>
            </div>

            <div className="space-y-4">
              {licenses.map((license) => (
                <div
                  key={license.id}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      {getLicenseLabel(license.type)}
                    </h4>
                    <button
                      onClick={() => removeLicense(license.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Quantity
                      </label>
                      <div className="flex items-center">
                        <button
                          onClick={() => updateLicenseQuantity(license.id, -1)}
                          className="p-2 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
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
                          className="w-16 text-center py-2 border-y border-gray-300 text-sm focus:outline-none"
                        />
                        <button
                          onClick={() => updateLicenseQuantity(license.id, 1)}
                          className="p-2 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Price/License
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          value={license.pricePerLicense}
                          onChange={(e) =>
                            updateLicensePrice(
                              license.id,
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Subtotal
                      </label>
                      <p className="py-2 text-sm font-semibold text-gray-900">
                        {formatCurrency(license.quantity * license.pricePerLicense)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Add-ons */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Add-ons (Optional)
            </h3>
            <div className="space-y-2">
              {addons.map((addon) => (
                <label
                  key={addon.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon.id)}
                      onChange={() => toggleAddon(addon.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-900">{addon.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {formatCurrency(addon.price)}/month
                  </span>
                </label>
              ))}
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
                <span className="text-sm text-slate-300">Licenses Total</span>
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


