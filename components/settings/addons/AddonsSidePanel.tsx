"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft,
  IconPlus,
  IconGripVertical,
  IconCube,
  IconX,
  IconSearch,
} from "@tabler/icons-react";

interface Addon {
  id: string;
  name: string;
  description: string;
  category: string;
  priceType: "fixed" | "per_unit" | "percentage";
  price: number;
  unitLabel?: string;
  source: "Catalog" | "Custom";
  status: "Active" | "Inactive";
}

interface PartService {
  id: string;
  name: string;
  description: string;
  image?: string;
  type: "part" | "service";
  unitCost: number;
  markup: number | null;
  quantity: number;
  price: number;
}

interface AddonsSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  addon: Addon | null;
  fullPage?: boolean;
}

// Mock parts/services catalog
const mockCatalog: PartService[] = [
  {
    id: "1",
    name: "#ZP - 45345 - Drip Edge Flashing",
    description: "Premium aluminum drip edge for roof protection",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
    type: "part",
    unitCost: 100.00,
    markup: null,
    quantity: 1,
    price: 100.00,
  },
  {
    id: "2",
    name: "SC002 - Repair of Roof Damage",
    description: "Meghalaya is special for its unique blend of natural beauty and cultural heritage...",
    type: "service",
    unitCost: 0.00,
    markup: null,
    quantity: 1,
    price: 229.99,
  },
  {
    id: "3",
    name: "#ZP - 97 - Test 2",
    description: "WHAT'S INCLUDED Type: GOODMAN 13.4 SEER2 Air Conditioner Split System...",
    type: "service",
    unitCost: 12.00,
    markup: null,
    quantity: 1,
    price: 12.00,
  },
  {
    id: "4",
    name: "#ZP - 101 - Shingle Bundle",
    description: "Architectural asphalt shingles - 25 year warranty",
    type: "part",
    unitCost: 45.00,
    markup: null,
    quantity: 1,
    price: 45.00,
  },
  {
    id: "5",
    name: "SC005 - Gutter Installation",
    description: "Full gutter system installation including downspouts",
    type: "service",
    unitCost: 0.00,
    markup: null,
    quantity: 1,
    price: 350.00,
  },
];

export default function AddonsSidePanel({ isOpen, onClose, addon, fullPage = false }: AddonsSidePanelProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [remarks, setRemarks] = useState("");
  const [partsServices, setPartsServices] = useState<PartService[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (addon) {
      setName(addon.name);
      setDescription(addon.description);
    } else {
      setName("");
      setDescription("");
      setRemarks("");
    }
  }, [addon, isOpen]);

  const handleSave = () => {
    console.log("Saving addon:", { name, description, remarks, partsServices });
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

  const handleAddItem = (item: PartService) => {
    setPartsServices([...partsServices, { ...item, id: Date.now().toString() }]);
    setShowAddDialog(false);
    setSearchQuery("");
  };

  const handleRemoveItem = (id: string) => {
    setPartsServices(partsServices.filter(item => item.id !== id));
  };


  const filteredCatalog = mockCatalog.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen && !fullPage) return null;

  return (
    <div className={`${fullPage ? "w-full h-full" : "fixed right-0 top-0 h-full w-full"} bg-[#F1F5F9] flex flex-col`}>
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
          Save Add-on
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="flex gap-6 h-full">
          {/* Left Card - Add-on Details */}
          <div className="w-[440px] shrink-0 bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
            <div className="p-6">
              <h2 className="text-base font-semibold text-[#1E293B] mb-6">Add-on Details</h2>
              
              <div className="space-y-5">
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

          {/* Right Card - Parts & Services */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-semibold text-[#1E293B]">Parts & Services</h2>
                <span className="px-2.5 py-0.5 bg-[#EDE9FE] text-[#7C3AED] text-xs font-medium rounded-full">
                  {partsServices.length}
                </span>
              </div>
              <button 
                onClick={() => setShowAddDialog(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E2E8F0] rounded-md text-sm font-medium text-[#475569] hover:bg-[#F8FAFC] transition-colors"
              >
                <IconPlus size={16} stroke={2} />
                Add
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              {partsServices.length === 0 ? (
                /* Empty State */
                <div className="flex-1 flex flex-col items-center justify-center py-16 h-full">
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
                /* Parts & Services Table */
                <div className="flex flex-col h-full">
                  {/* Table */}
                  <div className="flex-1 overflow-auto">
                    <table className="w-full">
                      <thead className="sticky top-0 bg-white">
                        <tr className="border-b border-[#E2E8F0]">
                          <th className="px-4 py-3 text-left text-xs font-medium text-[#64748B] w-10">#</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-[#64748B]">Product / Service</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-[#64748B] w-24">Unit Cost</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-[#64748B] w-20">Markup</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-[#64748B] w-28">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {partsServices.map((item, index) => (
                          <tr key={item.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] group">
                            <td className="px-4 py-4">
                              <IconGripVertical size={16} className="text-[#CBD5E1] cursor-grab" />
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-start gap-3">
                                {item.image ? (
                                  <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                                  />
                                ) : (
                                  <div className="w-12 h-12 rounded-lg bg-[#DBEAFE] flex items-center justify-center shrink-0">
                                    <IconCube size={24} className="text-[#3B82F6]" />
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-[#1E293B] truncate">{item.name}</p>
                                  <p className="text-xs text-[#64748B] line-clamp-2 mt-0.5">{item.description}</p>
                                  <button className="text-xs text-[#3B82F6] hover:underline mt-1">Read More</button>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-[#1E293B]">
                              ${item.unitCost.toFixed(2)}
                            </td>
                            <td className="px-4 py-4 text-sm text-[#64748B]">
                              {item.markup !== null ? `${item.markup}%` : "-"}
                            </td>
                            <td className="px-4 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <div className="text-right">
                                  <span className="text-xs text-[#64748B]">{item.quantity}</span>
                                  <span className="text-xs text-[#64748B] mx-1">×</span>
                                  <span className="text-sm font-medium text-[#1E293B]">${item.price.toFixed(2)}</span>
                                </div>
                                <button 
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="opacity-0 group-hover:opacity-100 p-1 text-[#94A3B8] hover:text-[#EF4444] transition-all"
                                >
                                  <IconX size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Item Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-[600px] max-h-[80vh] flex flex-col">
            {/* Dialog Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
              <h3 className="text-lg font-semibold text-[#1E293B]">Add Parts / Services</h3>
              <button 
                onClick={() => {
                  setShowAddDialog(false);
                  setSearchQuery("");
                }}
                className="p-2 text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9] rounded-lg transition-colors"
              >
                <IconX size={20} />
              </button>
            </div>

            {/* Search */}
            <div className="px-6 py-4 border-b border-[#E2E8F0]">
              <div className="relative">
                <IconSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search parts & services..."
                  className="w-full pl-10 pr-4 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-auto p-4">
              <div className="space-y-2">
                {filteredCatalog.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleAddItem(item)}
                    className="w-full flex items-center gap-4 p-4 border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] hover:border-[#3B82F6] transition-colors text-left"
                  >
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-[#DBEAFE] flex items-center justify-center shrink-0">
                        <IconCube size={24} className="text-[#3B82F6]" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1E293B] truncate">{item.name}</p>
                      <p className="text-xs text-[#64748B] truncate mt-0.5">{item.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-[#1E293B]">${item.price.toFixed(2)}</p>
                      <p className="text-xs text-[#64748B]">{item.type === "part" ? "Part" : "Service"}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
