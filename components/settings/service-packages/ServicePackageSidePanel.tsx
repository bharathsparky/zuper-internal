"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft,
  IconPlus,
  IconGripVertical,
  IconSettings,
  IconChevronUp,
  IconChevronDown,
  IconPackage,
  IconTool,
  IconCurrencyDollar,
  IconFileText,
  IconPuzzle,
  IconDotsVertical,
} from "@tabler/icons-react";
import ChooseLineItemModal from "./ChooseLineItemModal";

interface PartService {
  id: string;
  name: string;
  description?: string;
  image?: string;
  unitCost: number;
  markup: number | string;
  quantity: number;
  unit?: string;
  price: number;
  isCategory?: boolean;
  tax?: string;
}

interface AddonItem {
  id: string;
  name: string;
  description?: string;
  image?: string;
  unitCost: number;
  markup: number | string;
  quantity: number;
  price: number;
}

interface AssociatedAddon {
  id: string;
  name: string;
  description?: string;
  items: AddonItem[];
  profitMargin: number;
}

interface ServicePackage {
  id: string;
  name: string;
  description: string;
  remarks: string;
  total: number;
  partsServices: PartService[];
  profitMargin: number;
  materialCost: number;
  laborCost: number;
  cogs: number;
}

interface ServicePackageSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: ServicePackage | null;
  fullPage?: boolean;
}

// Mock Add-ons from master list
const availableAddons: AssociatedAddon[] = [
  { 
    id: "addon-1", 
    name: "Extended Warranty", 
    description: "2-year extended warranty coverage", 
    profitMargin: 25,
    items: [
      { id: "ew-1", name: "Warranty Certificate", description: "Official warranty documentation", unitCost: 50, markup: "3x", quantity: 1, price: 150 },
      { id: "ew-2", name: "Coverage Plan", description: "Extended coverage plan", unitCost: 30, markup: "1.67x", quantity: 1, price: 49.99 },
    ]
  },
  { 
    id: "addon-2", 
    name: "Priority Support", 
    description: "24/7 priority customer support", 
    profitMargin: 40,
    items: [
      { id: "ps-1", name: "Support Package", description: "Premium support access", unitCost: 20, markup: "2.5x", quantity: 1, price: 49.99 },
    ]
  },
  { 
    id: "addon-3", 
    name: "Installation Service", 
    description: "Professional installation included", 
    profitMargin: 35,
    items: [
      { id: "is-1", name: "Installation Labor", description: "Professional installation", unitCost: 80, markup: "-", quantity: 2, price: 80 },
      { id: "is-2", name: "Installation Materials", description: "Mounting hardware and supplies", unitCost: 15, markup: "-", quantity: 1, price: 15 },
    ]
  },
  { 
    id: "addon-4", 
    name: "Maintenance Package", 
    description: "Annual maintenance and inspection", 
    profitMargin: 50,
    items: [
      { id: "mp-1", name: "Annual Inspection", description: "Yearly maintenance visit", unitCost: 100, markup: "2x", quantity: 1, price: 200 },
      { id: "mp-2", name: "Parts Replacement", description: "Basic parts replacement", unitCost: 50, markup: "2x", quantity: 1, price: 99 },
    ]
  },
];

const mockPackageData: ServicePackage = {
  id: "1",
  name: "Testing Package (copy)(1)",
  description: "Testing Service Package",
  remarks: "",
  total: 5708.0,
  partsServices: [
    {
      id: "cat-1",
      name: "Testing",
      description: "",
      unitCost: 0,
      markup: "-",
      quantity: 1,
      price: 0,
      isCategory: true,
    },
    {
      id: "1",
      name: "#ak - 12 - sampletest",
      description: "Lorem ipsum dolor sit a met, consectetur adip...",
      image: "https://images.unsplash.com/photo-1586864387789-628af9feed72?w=100&h=100&fit=crop",
      unitCost: 0.0,
      markup: "-",
      quantity: 1,
      price: 1780.0,
      tax: "Custom Tax - 10%",
    },
    {
      id: "2",
      name: "Carton Box",
      description: "Carton Box",
      image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=100&h=100&fit=crop",
      unitCost: 0.0,
      markup: "-",
      quantity: 3,
      price: 12.0,
    },
    {
      id: "3",
      name: "#ZP - Product No.2...",
      description: "Pack Content & Dimensions Material: MDF D...",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
      unitCost: 100.0,
      markup: "7.56x",
      quantity: 1,
      unit: "Unit",
      price: 756.0,
    },
  ],
  profitMargin: 98.13,
  materialCost: 100.0,
  laborCost: 0.0,
  cogs: 100.0,
};

type RightPanelTab = "parts-services" | "addons";

export default function ServicePackageSidePanel({
  isOpen,
  onClose,
  packageData,
  fullPage = false,
}: ServicePackageSidePanelProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [remarks, setRemarks] = useState("");
  const [partsServices, setPartsServices] = useState<PartService[]>([]);
  const [profitMargin, setProfitMargin] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(true);
  const [materialCost, setMaterialCost] = useState(0);
  const [laborCost, setLaborCost] = useState(0);
  const [cogs, setCogs] = useState(0);
  
  // Tab state for right panel
  const [activeRightTab, setActiveRightTab] = useState<RightPanelTab>("parts-services");
  
  // Add-ons state
  const [selectedAddons, setSelectedAddons] = useState<AssociatedAddon[]>([]);
  const [addonProfitMargins, setAddonProfitMargins] = useState<Record<string, number>>({});
  const [showAddAddonDropdown, setShowAddAddonDropdown] = useState(false);
  const [expandedAddons, setExpandedAddons] = useState<Record<string, boolean>>({});
  
  // Parts & Services Add dropdown and modal
  const [showAddPartsDropdown, setShowAddPartsDropdown] = useState(false);
  const [showLineItemModal, setShowLineItemModal] = useState(false);

  const data = packageData || mockPackageData;

  useEffect(() => {
    if (data) {
      setName(data.name);
      setDescription(data.description);
      setRemarks(data.remarks);
      setPartsServices(data.partsServices);
      setProfitMargin(data.profitMargin);
      setMaterialCost(data.materialCost);
      setLaborCost(data.laborCost);
      setCogs(data.cogs);
    }
  }, [data, isOpen]);

  const handleSave = () => {
    console.log("Saving service package:", { name, description, remarks, partsServices, selectedAddons });
    if (fullPage) {
      router.push("/settings/proposal-templates");
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (fullPage) {
      router.push("/settings/proposal-templates");
    } else {
      onClose();
    }
  };

  const handleAddAddon = (addon: AssociatedAddon) => {
    if (!selectedAddons.find((a) => a.id === addon.id)) {
      setSelectedAddons([...selectedAddons, addon]);
      setAddonProfitMargins(prev => ({ ...prev, [addon.id]: addon.profitMargin }));
      setExpandedAddons(prev => ({ ...prev, [addon.id]: true })); // Expand by default
    }
    setShowAddAddonDropdown(false);
  };

  const toggleAddonExpanded = (addonId: string) => {
    setExpandedAddons(prev => ({ ...prev, [addonId]: !prev[addonId] }));
  };

  const handleAddLineItems = (items: any[]) => {
    const newParts: PartService[] = items.map((item) => ({
      id: item.id,
      name: `${item.code} - ${item.name}`,
      description: item.category,
      image: item.image,
      unitCost: item.unitCost,
      markup: item.markup || "-",
      quantity: item.quantity || 1,
      price: item.sellingPrice,
    }));
    setPartsServices((prev) => [...prev, ...newParts]);
    setShowLineItemModal(false);
  };

  const handleRemoveAddon = (addonId: string) => {
    setSelectedAddons(selectedAddons.filter((a) => a.id !== addonId));
    setAddonProfitMargins(prev => {
      const newMargins = { ...prev };
      delete newMargins[addonId];
      return newMargins;
    });
  };

  const handleAddonProfitMarginChange = (addonId: string, value: number) => {
    setAddonProfitMargins(prev => ({ ...prev, [addonId]: value }));
  };

  const filteredAvailableAddons = availableAddons.filter(
    (addon) => !selectedAddons.find((a) => a.id === addon.id)
  );

  const subTotal = partsServices
    .filter((item) => !item.isCategory)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const quoteTotal = subTotal;

  // Calculate add-on totals
  const getAddonTotal = (addon: AssociatedAddon) => {
    return addon.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  if (!isOpen && !fullPage) return null;

  return (
    <div
      className={`${fullPage ? "w-full h-full" : "fixed right-0 top-0 h-full w-full"} bg-[#F1F5F9] flex flex-col`}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-[#E2E8F0]">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm font-medium text-[#475569] hover:text-[#1E293B] transition-colors"
        >
          <IconArrowLeft size={16} stroke={2} />
          Back
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#F97316] rounded-md text-sm font-medium text-white hover:bg-[#EA580C] transition-colors"
        >
          {packageData ? "Update Package" : "Save Package"}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="flex gap-6 h-full">
          {/* Left Card - Service Package Details */}
          <div className="w-[400px] shrink-0 bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
            <div className="p-6">
              <h2 className="text-base font-semibold text-[#1E293B] mb-6">
                Service Package Details
              </h2>

              <div className="space-y-5">
                {/* Name Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium text-[#1E293B]">
                      Name <span className="text-[#DC2626]">*</span>
                    </label>
                    <span className="text-xs text-[#94A3B8]">Max 26 chars</span>
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    maxLength={26}
                    className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    rows={4}
                    className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent resize-none"
                  />
                </div>

                {/* Remarks Field */}
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-1.5">
                    Remarks
                  </label>
                  <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Remarks"
                    rows={4}
                    className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Card - Parts & Services / Add-ons Tabs */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden flex flex-col">
            {/* Tabs Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-[#E2E8F0]">
              {/* Tabs */}
              <div className="flex items-center gap-1 p-1 bg-[#F1F5F9] rounded-lg">
                <button
                  onClick={() => setActiveRightTab("parts-services")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeRightTab === "parts-services"
                      ? "bg-white text-[#1E293B] shadow-sm"
                      : "text-[#64748B] hover:text-[#1E293B]"
                  }`}
                >
                  <IconPackage size={16} />
                  Parts & Services
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    activeRightTab === "parts-services"
                      ? "bg-[#EDE9FE] text-[#7C3AED]"
                      : "bg-[#E2E8F0] text-[#64748B]"
                  }`}>
                    {partsServices.filter((p) => !p.isCategory).length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveRightTab("addons")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeRightTab === "addons"
                      ? "bg-white text-[#1E293B] shadow-sm"
                      : "text-[#64748B] hover:text-[#1E293B]"
                  }`}
                >
                  <IconPuzzle size={16} />
                  Add-ons
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    activeRightTab === "addons"
                      ? "bg-[#EDE9FE] text-[#7C3AED]"
                      : "bg-[#E2E8F0] text-[#64748B]"
                  }`}>
                    {selectedAddons.length}
                  </span>
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {activeRightTab === "parts-services" && (
                  <>
                    <button className="p-2 text-[#64748B] hover:text-[#475569] hover:bg-[#F1F5F9] rounded-md border border-[#E2E8F0] transition-colors">
                      <IconSettings size={16} stroke={2} />
                    </button>
                    <div className="relative">
                      <button 
                        onClick={() => setShowAddPartsDropdown(!showAddPartsDropdown)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E2E8F0] rounded-md text-sm font-medium text-[#475569] hover:bg-[#F8FAFC] transition-colors"
                      >
                        <IconPlus size={16} stroke={2} />
                        Add
                      </button>
                      
                      {/* Add Dropdown */}
                      {showAddPartsDropdown && (
                        <>
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setShowAddPartsDropdown(false)} 
                          />
                          <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-20 py-1">
                            <button
                              onClick={() => {
                                setShowLineItemModal(true);
                                setShowAddPartsDropdown(false);
                              }}
                              className="w-full px-4 py-2.5 text-left text-sm text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
                            >
                              Line Item
                            </button>
                            <button
                              onClick={() => {
                                // TODO: Handle Bundle
                                setShowAddPartsDropdown(false);
                              }}
                              className="w-full px-4 py-2.5 text-left text-sm text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
                            >
                              Bundle
                            </button>
                            <button
                              onClick={() => {
                                // TODO: Handle Header
                                setShowAddPartsDropdown(false);
                              }}
                              className="w-full px-4 py-2.5 text-left text-sm text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
                            >
                              Header
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
                {activeRightTab === "addons" && selectedAddons.length === 0 && (
                  <div className="relative">
                    <button 
                      onClick={() => setShowAddAddonDropdown(!showAddAddonDropdown)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E2E8F0] rounded-md text-sm font-medium text-[#475569] hover:bg-[#F8FAFC] transition-colors"
                    >
                      <IconPlus size={16} stroke={2} />
                      Add Add-on
                    </button>
                    
                    {/* Add Add-on Dropdown */}
                    {showAddAddonDropdown && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setShowAddAddonDropdown(false)} 
                        />
                        <div className="absolute right-0 top-full mt-1 w-72 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-20 max-h-64 overflow-auto">
                          {availableAddons.length > 0 ? (
                            availableAddons.map((addon) => (
                              <button
                                key={addon.id}
                                onClick={() => handleAddAddon(addon)}
                                className="w-full px-4 py-3 text-left hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9] last:border-0"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-md bg-[#EDE9FE] flex items-center justify-center">
                                    <IconPuzzle size={14} className="text-[#7C3AED]" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-[#1E293B]">{addon.name}</p>
                                    <p className="text-xs text-[#64748B]">{addon.items.length} items</p>
                                  </div>
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-3 text-sm text-[#64748B] text-center">
                              No add-ons available
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-auto flex flex-col">
              {/* Parts & Services Tab */}
              {activeRightTab === "parts-services" && (
                <>
                  {/* Table */}
                  <div className="flex-1 overflow-auto">
                    {partsServices.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center py-16">
                        <div className="mb-4">
                          <img
                            src="/figma-assets/empty-state-illustration.svg"
                            alt="Add Parts / Services"
                            className="h-[100px] w-auto"
                          />
                        </div>
                        <p className="text-base font-semibold text-[#1E293B]">Add Parts / Services</p>
                      </div>
                    ) : (
                      <table className="w-full">
                        <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-[#64748B] w-10">
                              #
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-[#64748B]">
                              Product / Service
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-[#64748B] w-24">
                              Unit Cost
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-[#64748B] w-20">
                              Markup
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-[#64748B] w-28">
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F1F5F9]">
                          {partsServices.map((item) => (
                            <tr key={item.id} className="hover:bg-[#F8FAFC]">
                              <td className="px-4 py-4">
                                <IconGripVertical size={16} className="text-[#CBD5E1] cursor-grab" />
                              </td>
                              <td className="px-4 py-4">
                                {item.isCategory ? (
                                  <span className="text-sm font-medium text-[#1E293B]">{item.name}</span>
                                ) : (
                                  <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-[#F1F5F9] flex items-center justify-center overflow-hidden shrink-0">
                                      {item.image ? (
                                        <img
                                          src={item.image}
                                          alt={item.name}
                                          className="w-full h-full object-cover"
                                          onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                          }}
                                        />
                                      ) : null}
                                      <div className={`${item.image ? 'hidden' : ''} w-full h-full bg-gradient-to-br from-[#E0E7FF] to-[#C7D2FE] flex items-center justify-center`}>
                                        <IconPackage size={20} className="text-[#6366F1]" />
                                      </div>
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-sm font-medium text-[#1E293B] truncate">
                                        {item.name}
                                      </p>
                                      {item.description && (
                                        <p className="text-xs text-[#64748B] truncate mt-0.5">
                                          {item.description}
                                        </p>
                                      )}
                                      {item.tax && (
                                        <p className="text-xs text-[#3B82F6] mt-1">{item.tax}</p>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </td>
                              <td className="px-4 py-4">
                                {!item.isCategory && (
                                  <span className="text-sm text-[#1E293B]">
                                    ${item.unitCost.toFixed(2)}
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-4">
                                {!item.isCategory && (
                                  <span className="text-sm text-[#64748B]">{item.markup}</span>
                                )}
                              </td>
                              <td className="px-4 py-4 text-right">
                                {item.isCategory ? (
                                  <span className="text-sm text-[#64748B]">-</span>
                                ) : (
                                  <div className="text-right">
                                    <span className="text-xs text-[#64748B]">
                                      {item.quantity}
                                      {item.unit ? ` ${item.unit}` : ""} ×{" "}
                                    </span>
                                    <span className="text-sm font-medium text-[#1E293B]">
                                      ${(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                    </span>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  {/* Profit Margin + Sub-Total Row (side by side) */}
                  {partsServices.length > 0 && (
                    <div className="px-6 py-4 border-t border-[#E2E8F0] bg-white">
                      <div className="flex items-start justify-between gap-6">
                        {/* Profit Margin Card - Left Side */}
                        <div className="w-[420px] shrink-0 p-4 border border-[#E2E8F0] rounded-xl">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3.33337 10H16.6667M16.6667 10L10 3.33337M16.6667 10L10 16.6667"
                                  stroke="#64748B"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span className="text-sm font-medium text-[#1E293B]">Profit Margin</span>
                              <button className="text-[#3B82F6] hover:text-[#2563EB]">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                                  <path
                                    d="M8 7V11M8 5V5.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="flex items-center gap-1 border-2 border-[#F87171] rounded-lg px-3 py-1.5 bg-white">
                              <input
                                type="number"
                                value={profitMargin}
                                onChange={(e) => setProfitMargin(parseFloat(e.target.value) || 0)}
                                className="w-14 text-sm text-right text-[#1E293B] border-0 focus:outline-none focus:ring-0 bg-transparent"
                                step="0.01"
                                min="0"
                                max="99"
                              />
                              <span className="text-sm text-[#64748B]">%</span>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="range"
                              min="0"
                              max="99"
                              step="0.01"
                              value={profitMargin}
                              onChange={(e) => setProfitMargin(parseFloat(e.target.value))}
                              className="w-full h-2 bg-[#FEE2E2] rounded-full appearance-none cursor-pointer accent-[#EF4444]"
                              style={{
                                background: `linear-gradient(to right, #EF4444 0%, #EF4444 ${profitMargin}%, #FEE2E2 ${profitMargin}%, #FEE2E2 100%)`,
                              }}
                            />
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-[#94A3B8]">
                            <span>0%</span>
                            <span>99%</span>
                          </div>
                        </div>

                        {/* Sub-Total, Add Fee, Total - Right Side */}
                        <div className="flex flex-col items-end gap-1.5 pt-2">
                          {/* Sub-Total */}
                          <div className="flex items-center gap-6 text-sm">
                            <span className="text-[#1E293B] font-medium">Sub-Total</span>
                            <span className="font-semibold text-[#1E293B] w-24 text-right">
                              ${subTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                          {/* Add Fee Link */}
                          <div className="flex items-center gap-6 text-sm">
                            <button className="text-[#3B82F6] hover:text-[#2563EB] hover:underline font-medium">
                              Add Fee?
                            </button>
                            <span className="w-24"></span>
                          </div>
                          {/* Total */}
                          <div className="flex items-center gap-6 text-sm">
                            <span className="text-[#1E293B] font-medium">Total</span>
                            <span className="font-semibold text-[#1E293B] w-24 text-right">
                              ${subTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cost & Profit Breakdown */}
                  {partsServices.length > 0 && (
                    <div className="mx-6 mb-6 border border-[#E2E8F0] rounded-xl overflow-hidden">
                      <button
                        onClick={() => setShowBreakdown(!showBreakdown)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-[#F8FAFC] transition-colors"
                      >
                        <span className="text-sm font-semibold text-[#1E293B]">
                          Cost & Profit Breakdown
                        </span>
                        {showBreakdown ? (
                          <IconChevronUp size={20} className="text-[#64748B]" />
                        ) : (
                          <IconChevronDown size={20} className="text-[#64748B]" />
                        )}
                      </button>
                      {showBreakdown && (
                        <div className="px-4 py-4 bg-white border-t border-[#E2E8F0]">
                          <div className="flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-[#EDE9FE] flex items-center justify-center">
                                <IconPackage size={16} className="text-[#7C3AED]" />
                              </div>
                              <div>
                                <p className="text-xs text-[#64748B]">Material</p>
                                <p className="text-sm font-semibold text-[#1E293B]">
                                  ${materialCost.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] flex items-center justify-center">
                                <IconTool size={16} className="text-[#16A34A]" />
                              </div>
                              <div>
                                <p className="text-xs text-[#64748B]">Labor</p>
                                <p className="text-sm font-semibold text-[#1E293B]">
                                  ${laborCost.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] flex items-center justify-center">
                                <IconCurrencyDollar size={16} className="text-[#D97706]" />
                              </div>
                              <div>
                                <p className="text-xs text-[#64748B]">COGS</p>
                                <p className="text-sm font-semibold text-[#1E293B]">${cogs.toFixed(2)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-[#DBEAFE] flex items-center justify-center">
                                <IconFileText size={16} className="text-[#3B82F6]" />
                              </div>
                              <div>
                                <p className="text-xs text-[#64748B]">Quote Total</p>
                                <p className="text-sm font-semibold text-[#1E293B]">
                                  ${quoteTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M3.33337 10H16.6667M16.6667 10L10 3.33337M16.6667 10L10 16.6667" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div>
                                <p className="text-xs text-[#64748B]">Profit</p>
                                <p className="text-sm font-semibold text-[#16A34A]">
                                  + ${(quoteTotal - cogs).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Add-ons Tab */}
              {activeRightTab === "addons" && (
                <div className="flex-1 overflow-auto">
                  {selectedAddons.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-16">
                      <div className="w-16 h-16 rounded-full bg-[#EDE9FE] flex items-center justify-center mb-4">
                        <IconPuzzle size={32} className="text-[#7C3AED]" />
                      </div>
                      <p className="text-base font-semibold text-[#1E293B] mb-2">No Add-ons Selected</p>
                      <p className="text-sm text-[#64748B] text-center max-w-xs mb-4">
                        Add-ons are optional items that can be offered separately with the service package.
                      </p>
                      <button 
                        onClick={() => setShowAddAddonDropdown(true)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#7C3AED] text-white rounded-md text-sm font-medium hover:bg-[#6D28D9] transition-colors"
                      >
                        <IconPlus size={16} stroke={2} />
                        Add Add-on
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-[#E2E8F0]">
                      {selectedAddons.map((addon) => {
                        const isExpanded = expandedAddons[addon.id] ?? true;
                        const addonTotal = getAddonTotal(addon);
                        
                        return (
                          <div key={addon.id} className="bg-white">
                            {/* Add-on Header - Clickable to expand/collapse */}
                            <button
                              onClick={() => toggleAddonExpanded(addon.id)}
                              className="w-full flex items-center justify-between px-6 py-4 bg-[#F8FAFC] border-b border-[#E2E8F0] hover:bg-[#F1F5F9] transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-[#EDE9FE] flex items-center justify-center">
                                  <IconPuzzle size={18} className="text-[#7C3AED]" />
                                </div>
                                <div className="text-left">
                                  <p className="text-sm font-semibold text-[#1E293B]">{addon.name}</p>
                                  <p className="text-xs text-[#64748B]">
                                    {addon.items.length} items • ${addonTotal.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                {/* Profit margin badge when collapsed */}
                                {!isExpanded && (
                                  <span className="px-2 py-1 bg-[#FEF2F2] text-[#EF4444] text-xs font-medium rounded">
                                    {addonProfitMargins[addon.id] || addon.profitMargin}% margin
                                  </span>
                                )}
                                <div className="flex items-center gap-2">
                                  {isExpanded ? (
                                    <IconChevronUp size={18} className="text-[#64748B]" />
                                  ) : (
                                    <IconChevronDown size={18} className="text-[#64748B]" />
                                  )}
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveAddon(addon.id);
                                    }}
                                    className="p-1.5 text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#FEF2F2] rounded-md transition-colors"
                                  >
                                    <IconDotsVertical size={16} />
                                  </button>
                                </div>
                              </div>
                            </button>

                            {/* Expandable content */}
                            {isExpanded && (
                              <>
                                {/* Add-on Items Table */}
                                <table className="w-full">
                                  <thead className="bg-[#FAFAFA] border-b border-[#E2E8F0]">
                                    <tr>
                                      <th className="px-4 py-2.5 text-left text-xs font-medium text-[#64748B] w-10">
                                        #
                                      </th>
                                      <th className="px-4 py-2.5 text-left text-xs font-medium text-[#64748B]">
                                        Item
                                      </th>
                                      <th className="px-4 py-2.5 text-left text-xs font-medium text-[#64748B] w-24">
                                        Unit Cost
                                      </th>
                                      <th className="px-4 py-2.5 text-left text-xs font-medium text-[#64748B] w-20">
                                        Markup
                                      </th>
                                      <th className="px-4 py-2.5 text-right text-xs font-medium text-[#64748B] w-28">
                                        Price
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-[#F1F5F9]">
                                    {addon.items.map((item) => (
                                      <tr key={item.id} className="hover:bg-[#F8FAFC]">
                                        <td className="px-4 py-3">
                                          <IconGripVertical size={14} className="text-[#CBD5E1] cursor-grab" />
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded bg-[#F1F5F9] flex items-center justify-center">
                                              <IconPackage size={14} className="text-[#64748B]" />
                                            </div>
                                            <div>
                                              <p className="text-sm font-medium text-[#1E293B]">{item.name}</p>
                                              {item.description && (
                                                <p className="text-xs text-[#64748B]">{item.description}</p>
                                              )}
                                            </div>
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <span className="text-sm text-[#1E293B]">${item.unitCost.toFixed(2)}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                          <span className="text-sm text-[#64748B]">{item.markup}</span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                          <span className="text-xs text-[#64748B]">{item.quantity} × </span>
                                          <span className="text-sm font-medium text-[#1E293B]">
                                            ${(item.price * item.quantity).toFixed(2)}
                                          </span>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>

                                {/* Add-on Profit Margin */}
                                <div className="px-6 py-4 border-t border-[#E2E8F0] bg-white">
                                  <div className="max-w-md">
                                    <div className="p-4 border border-[#E2E8F0] rounded-xl">
                                      <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                          <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M3.33337 10H16.6667M16.6667 10L10 3.33337M16.6667 10L10 16.6667"
                                              stroke="#64748B"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                          <span className="text-sm font-medium text-[#1E293B]">Profit Margin</span>
                                        </div>
                                        <div className="flex items-center gap-1 border-2 border-[#F87171] rounded-lg px-2.5 py-1 bg-white">
                                          <input
                                            type="number"
                                            value={addonProfitMargins[addon.id] || addon.profitMargin}
                                            onChange={(e) => handleAddonProfitMarginChange(addon.id, parseFloat(e.target.value) || 0)}
                                            className="w-12 text-sm text-right text-[#1E293B] border-0 focus:outline-none focus:ring-0 bg-transparent"
                                            step="0.01"
                                            min="0"
                                            max="99"
                                          />
                                          <span className="text-sm text-[#64748B]">%</span>
                                        </div>
                                      </div>
                                      <div className="relative">
                                        <input
                                          type="range"
                                          min="0"
                                          max="99"
                                          step="0.01"
                                          value={addonProfitMargins[addon.id] || addon.profitMargin}
                                          onChange={(e) => handleAddonProfitMarginChange(addon.id, parseFloat(e.target.value))}
                                          className="w-full h-2 bg-[#FEE2E2] rounded-full appearance-none cursor-pointer"
                                          style={{
                                            background: `linear-gradient(to right, #EF4444 0%, #EF4444 ${addonProfitMargins[addon.id] || addon.profitMargin}%, #FEE2E2 ${addonProfitMargins[addon.id] || addon.profitMargin}%, #FEE2E2 100%)`,
                                          }}
                                        />
                                      </div>
                                      <div className="flex justify-between mt-1 text-xs text-[#94A3B8]">
                                        <span>0%</span>
                                        <span>99%</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Choose Line Item Modal */}
      <ChooseLineItemModal
        isOpen={showLineItemModal}
        onClose={() => setShowLineItemModal(false)}
        onAdd={handleAddLineItems}
      />
    </div>
  );
}
