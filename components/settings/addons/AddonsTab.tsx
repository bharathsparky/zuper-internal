"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconPlus,
  IconChevronDown,
  IconFilter,
  IconSearch,
  IconDotsVertical,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconPackage,
  IconEdit,
  IconCopy,
  IconToggleLeft,
  IconTrash,
} from "@tabler/icons-react";
import AddonsSidePanel from "./AddonsSidePanel";

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
  createdBy: {
    name: string;
    initials: string;
    bgColor: string;
    textColor: string;
  };
  createdOn: string;
}

const mockAddons: Addon[] = [
  {
    id: "1",
    name: "Extended Warranty - 10 Years",
    description: "Comprehensive coverage for materials and workmanship",
    category: "Warranties",
    priceType: "fixed",
    price: 599.00,
    source: "Catalog",
    status: "Active",
    createdBy: { name: "Sesha Madhav", initials: "S", bgColor: "bg-[#ede9fe]", textColor: "text-[#7c3aed]" },
    createdOn: "08/24/2023 03:12 PM",
  },
  {
    id: "2",
    name: "Premium Underlayment Upgrade",
    description: "Synthetic underlayment for enhanced protection",
    category: "Upgrades",
    priceType: "fixed",
    price: 350.00,
    source: "Custom",
    status: "Active",
    createdBy: { name: "Mark Alan", initials: "M", bgColor: "bg-[#dbeafe]", textColor: "text-[#2563eb]" },
    createdOn: "08/30/2023 04:49 PM",
  },
  {
    id: "3",
    name: "Debris Removal Fee",
    description: "Hauling and disposal of old roofing materials",
    category: "Fees",
    priceType: "fixed",
    price: 250.00,
    source: "Catalog",
    status: "Active",
    createdBy: { name: "Sesha Madhav", initials: "S", bgColor: "bg-[#ede9fe]", textColor: "text-[#7c3aed]" },
    createdOn: "09/01/2023 06:29 PM",
  },
  {
    id: "4",
    name: "Senior Citizen Discount",
    description: "10% discount for customers 65+",
    category: "Discounts",
    priceType: "percentage",
    price: 10,
    source: "Custom",
    status: "Active",
    createdBy: { name: "Marlon S A", initials: "M", bgColor: "bg-[#dbeafe]", textColor: "text-[#2563eb]" },
    createdOn: "09/04/2023 11:20 AM",
  },
  {
    id: "5",
    name: "Additional Ridge Vent",
    description: "Per linear foot of ridge vent installation",
    category: "Materials",
    priceType: "per_unit",
    price: 15.00,
    unitLabel: "linear ft",
    source: "Catalog",
    status: "Active",
    createdBy: { name: "Guru Prasath", initials: "G", bgColor: "bg-[#d1fae5]", textColor: "text-[#059669]" },
    createdOn: "09/07/2023 05:35 PM",
  },
  {
    id: "6",
    name: "Skylight Installation",
    description: "Complete skylight with flashing and installation",
    category: "Upgrades",
    priceType: "fixed",
    price: 1200.00,
    source: "Custom",
    status: "Inactive",
    createdBy: { name: "Mark Cooper", initials: "M", bgColor: "bg-[#dbeafe]", textColor: "text-[#2563eb]" },
    createdOn: "09/07/2023 06:55 PM",
  },
  {
    id: "7",
    name: "Ice & Water Shield",
    description: "Self-adhering membrane for eaves and valleys",
    category: "Materials",
    priceType: "per_unit",
    price: 8.50,
    unitLabel: "sq ft",
    source: "Catalog",
    status: "Active",
    createdBy: { name: "Sushil S", initials: "S", bgColor: "bg-[#ede9fe]", textColor: "text-[#7c3aed]" },
    createdOn: "09/27/2023 11:08 AM",
  },
];

const categories = ["All Categories", "Upgrades", "Warranties", "Fees", "Discounts", "Materials", "Labor"];
const statuses = ["All Status", "Active", "Inactive"];

export default function AddonsTab() {
  const router = useRouter();
  const [addons] = useState<Addon[]>(mockAddons);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  
  // Side panel state
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [editingAddon, setEditingAddon] = useState<Addon | null>(null);

  const totalAddons = 47;
  const totalPages = 5;

  const formatPrice = (addon: Addon) => {
    if (addon.priceType === "percentage") {
      return `${addon.price}%`;
    } else if (addon.priceType === "per_unit") {
      return `$${addon.price.toFixed(2)}/${addon.unitLabel}`;
    }
    return `$${addon.price.toFixed(2)}`;
  };

  const getCategoryBadgeColor = (category: string) => {
    const colors: Record<string, string> = {
      "Upgrades": "bg-[#DBEAFE] text-[#1D4ED8] border-[#93C5FD]",
      "Warranties": "bg-[#FEF3C7] text-[#D97706] border-[#FCD34D]",
      "Fees": "bg-[#FEE2E2] text-[#DC2626] border-[#FCA5A5]",
      "Discounts": "bg-[#D1FAE5] text-[#059669] border-[#6EE7B7]",
      "Materials": "bg-[#E0E7FF] text-[#4338CA] border-[#A5B4FC]",
      "Labor": "bg-[#FCE7F3] text-[#DB2777] border-[#F9A8D4]",
    };
    return colors[category] || "bg-[#F3F4F6] text-[#6B7280] border-[#D1D5DB]";
  };

  const handleCreateAddon = () => {
    router.push("/settings/proposal-templates/addons/new");
  };

  const handleEditAddon = (addon: Addon) => {
    setEditingAddon(addon);
    setSidePanelOpen(true);
    setActionMenuOpen(null);
  };


  // Empty state
  if (addons.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg border border-[#e5e7eb] p-12">
        <div className="w-20 h-20 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-6">
          <IconPackage size={40} stroke={1.5} className="text-[#9CA3AF]" />
        </div>
        <h3 className="text-lg font-semibold text-[#111827] mb-2">No add-ons created yet</h3>
        <p className="text-sm text-[#6B7280] text-center max-w-md mb-6">
          Add-ons let you offer optional upgrades, warranties, and extras that customers can select on proposals.
        </p>
        <button
          onClick={handleCreateAddon}
          className="flex items-center gap-2 px-4 py-1.5 bg-white border border-[#d1d5db] rounded-lg text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors"
        >
          <IconPlus size={16} stroke={2} />
          New Add-on
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg border border-[#e5e7eb] shadow-sm">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-[#111827]">
            Add-ons ({totalAddons})
          </h1>
          <button
            onClick={handleCreateAddon}
            className="flex items-center gap-2 px-4 py-1.5 bg-white border border-[#d1d5db] rounded-lg text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors"
          >
            <IconPlus size={16} stroke={2} />
            New Add-on
          </button>
        </div>

        {/* Filters */}
        <div className="px-6 py-3 border-t border-b border-[#e5e7eb] bg-white">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <IconFilter size={18} stroke={1.5} className="text-[#9ca3af]" />

              {/* Category Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setCategoryDropdownOpen(!categoryDropdownOpen);
                    setStatusDropdownOpen(false);
                  }}
                  className="flex items-center gap-8 px-4 py-1.5 bg-white border border-[#d1d5db] rounded-lg text-sm text-[#6b7280] hover:bg-[#f9fafb]"
                >
                  {categoryFilter || "Category"}
                  <IconChevronDown size={16} stroke={2} className="text-[#9ca3af]" />
                </button>
                {categoryDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-[#e5e7eb] rounded-lg shadow-lg z-10">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setCategoryFilter(cat === "All Categories" ? "" : cat);
                          setCategoryDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-[#374151] hover:bg-[#f9fafb] first:rounded-t-lg last:rounded-b-lg"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Status Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setStatusDropdownOpen(!statusDropdownOpen);
                    setCategoryDropdownOpen(false);
                  }}
                  className="flex items-center gap-8 px-4 py-1.5 bg-white border border-[#d1d5db] rounded-lg text-sm text-[#6b7280] hover:bg-[#f9fafb]"
                >
                  {statusFilter || "Status"}
                  <IconChevronDown size={16} stroke={2} className="text-[#9ca3af]" />
                </button>
                {statusDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-[#e5e7eb] rounded-lg shadow-lg z-10">
                    {statuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setStatusFilter(status === "All Status" ? "" : status);
                          setStatusDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-[#374151] hover:bg-[#f9fafb] first:rounded-t-lg last:rounded-b-lg"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <IconSearch size={16} stroke={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 pl-10 pr-4 py-2 bg-white border border-[#d1d5db] rounded-lg text-sm placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                <th className="px-6 py-3 text-left text-sm font-medium text-[#4b5563]">
                  Add-on Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#4b5563]">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#4b5563]">
                  Created By
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#4b5563]">
                  Created At
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#4b5563]">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#4b5563]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3f4f6]">
              {addons.map((addon) => (
                <tr key={addon.id} className="hover:bg-[#f9fafb] transition-colors">
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditAddon(addon)}
                      className="text-left hover:text-[#3B82F6]"
                    >
                      <p className="text-sm font-medium text-[#111827]">
                        {addon.name}
                      </p>
                      <p className="text-sm text-[#6b7280] truncate max-w-[300px]">
                        {addon.description}
                      </p>
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-medium text-[#111827]">
                      {formatPrice(addon)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${addon.createdBy.bgColor} ${addon.createdBy.textColor}`}
                      >
                        {addon.createdBy.initials}
                      </div>
                      <span className="text-sm text-[#374151]">
                        {addon.createdBy.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-[#6b7280] whitespace-nowrap">
                      {addon.createdOn}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                      addon.status === "Active"
                        ? "bg-[#D1FAE5] text-[#059669]"
                        : "bg-[#F3F4F6] text-[#6B7280]"
                    }`}>
                      {addon.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="relative">
                      <button
                        onClick={() => setActionMenuOpen(actionMenuOpen === addon.id ? null : addon.id)}
                        className="p-1 text-[#9ca3af] hover:text-[#6b7280] hover:bg-[#f3f4f6] rounded"
                      >
                        <IconDotsVertical size={18} stroke={1.5} />
                      </button>
                      {actionMenuOpen === addon.id && (
                        <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-20">
                          <button
                            onClick={() => handleEditAddon(addon)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-[#374151] hover:bg-[#F9FAFB] rounded-t-lg"
                          >
                            <IconEdit size={16} stroke={1.5} />
                            Edit
                          </button>
                          <button className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-[#374151] hover:bg-[#F9FAFB]">
                            <IconCopy size={16} stroke={1.5} />
                            Duplicate
                          </button>
                          <button className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-[#374151] hover:bg-[#F9FAFB]">
                            <IconToggleLeft size={16} stroke={1.5} />
                            {addon.status === "Active" ? "Deactivate" : "Activate"}
                          </button>
                          <button className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-[#DC2626] hover:bg-[#FEF2F2] rounded-b-lg">
                            <IconTrash size={16} stroke={1.5} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-3 border-t border-[#e5e7eb] bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#6b7280]">Items per page</span>
              <div className="relative">
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="appearance-none bg-white border border-[#d1d5db] rounded-lg px-3 py-1.5 pr-8 text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <IconChevronDown size={14} stroke={2} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(1)}
                  className="p-1.5 text-[#9ca3af] hover:text-[#6b7280] hover:bg-[#f3f4f6] rounded disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <IconChevronsLeft size={18} stroke={1.5} />
                </button>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="p-1.5 text-[#9ca3af] hover:text-[#6b7280] hover:bg-[#f3f4f6] rounded disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <IconChevronLeft size={18} stroke={1.5} />
                </button>
              </div>

              <span className="text-sm text-[#6b7280]">
                Page {currentPage} of {totalPages}
              </span>

              <div className="flex items-center gap-0.5">
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className="p-1.5 text-[#9ca3af] hover:text-[#6b7280] hover:bg-[#f3f4f6] rounded disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <IconChevronRight size={18} stroke={1.5} />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                  className="p-1.5 text-[#9ca3af] hover:text-[#6b7280] hover:bg-[#f3f4f6] rounded disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <IconChevronsRight size={18} stroke={1.5} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-[#6b7280]">Go to:</span>
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (page >= 1 && page <= totalPages) {
                      setCurrentPage(page);
                    }
                  }}
                  className="w-14 px-2 py-1 border border-[#d1d5db] rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <AddonsSidePanel
        isOpen={sidePanelOpen}
        onClose={() => setSidePanelOpen(false)}
        addon={editingAddon}
      />

    </>
  );
}

