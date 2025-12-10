"use client";

import { useState } from "react";
import {
  IconX,
  IconSearch,
  IconChevronDown,
  IconCheck,
} from "@tabler/icons-react";

interface CatalogItem {
  id: string;
  name: string;
  category: string;
  price: number;
  alreadyImported: boolean;
}

interface ImportCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockCatalogItems: CatalogItem[] = [
  { id: "1", name: "Extended Warranty - 5 Years", category: "Warranties", price: 399.00, alreadyImported: false },
  { id: "2", name: "Extended Warranty - 10 Years", category: "Warranties", price: 599.00, alreadyImported: true },
  { id: "3", name: "Premium Shingle Upgrade", category: "Upgrades", price: 450.00, alreadyImported: false },
  { id: "4", name: "Gutter Installation", category: "Upgrades", price: 1200.00, alreadyImported: false },
  { id: "5", name: "Debris Removal Fee", category: "Fees", price: 250.00, alreadyImported: true },
  { id: "6", name: "Permit Processing Fee", category: "Fees", price: 150.00, alreadyImported: false },
  { id: "7", name: "Veteran Discount", category: "Discounts", price: 15, alreadyImported: false },
  { id: "8", name: "Ice & Water Shield", category: "Materials", price: 8.50, alreadyImported: true },
  { id: "9", name: "Ridge Vent (per linear ft)", category: "Materials", price: 12.00, alreadyImported: false },
  { id: "10", name: "Drip Edge Flashing", category: "Materials", price: 6.50, alreadyImported: false },
  { id: "11", name: "Skylight Installation", category: "Upgrades", price: 1200.00, alreadyImported: false },
  { id: "12", name: "Attic Ventilation Fan", category: "Upgrades", price: 350.00, alreadyImported: false },
];

const categories = ["All Categories", "Upgrades", "Warranties", "Fees", "Discounts", "Materials", "Labor"];

export default function ImportCatalogModal({ isOpen, onClose }: ImportCatalogModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredItems = mockCatalogItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const selectableItems = filteredItems.filter((item) => !item.alreadyImported);

  const handleToggleItem = (id: string) => {
    const item = mockCatalogItems.find((i) => i.id === id);
    if (item?.alreadyImported) return;

    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === selectableItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(selectableItems.map((item) => item.id));
    }
  };

  const handleImport = () => {
    console.log("Importing items:", selectedItems);
    setSelectedItems([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
            <h2 className="text-lg font-semibold text-[#111827]">
              Import from Catalog
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F3F4F6] rounded-lg"
            >
              <IconX size={20} stroke={1.5} />
            </button>
          </div>

          {/* Filters */}
          <div className="px-6 py-4 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <IconSearch size={16} stroke={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Search catalog items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-[#D1D5DB] rounded-lg text-sm placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <button
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  className="flex items-center gap-6 px-4 py-2.5 bg-white border border-[#D1D5DB] rounded-lg text-sm text-[#6B7280] hover:bg-[#F9FAFB]"
                >
                  {categoryFilter || "All Categories"}
                  <IconChevronDown size={16} stroke={2} className="text-[#9CA3AF]" />
                </button>
                {categoryDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 w-44 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-10">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setCategoryFilter(cat === "All Categories" ? "" : cat);
                          setCategoryDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-[#374151] hover:bg-[#F9FAFB] first:rounded-t-lg last:rounded-b-lg"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-[#F9FAFB] sticky top-0">
                <tr className="border-b border-[#E5E7EB]">
                  <th className="px-6 py-3 text-left">
                    <label className="flex items-center cursor-pointer">
                      <button
                        onClick={handleSelectAll}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedItems.length === selectableItems.length && selectableItems.length > 0
                            ? "bg-[#3B82F6] border-[#3B82F6]"
                            : "border-[#D1D5DB] hover:border-[#9CA3AF]"
                        }`}
                      >
                        {selectedItems.length === selectableItems.length && selectableItems.length > 0 && (
                          <IconCheck size={14} stroke={3} className="text-white" />
                        )}
                      </button>
                    </label>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#4B5563]">
                    Item Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#4B5563]">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#4B5563]">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#4B5563]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className={`transition-colors ${
                      item.alreadyImported
                        ? "bg-[#F9FAFB] opacity-60"
                        : "hover:bg-[#F9FAFB] cursor-pointer"
                    }`}
                    onClick={() => handleToggleItem(item.id)}
                  >
                    <td className="px-6 py-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleItem(item.id);
                        }}
                        disabled={item.alreadyImported}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          item.alreadyImported
                            ? "border-[#E5E7EB] bg-[#F3F4F6] cursor-not-allowed"
                            : selectedItems.includes(item.id)
                            ? "bg-[#3B82F6] border-[#3B82F6]"
                            : "border-[#D1D5DB] hover:border-[#9CA3AF]"
                        }`}
                      >
                        {selectedItems.includes(item.id) && !item.alreadyImported && (
                          <IconCheck size={14} stroke={3} className="text-white" />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-sm font-medium ${item.alreadyImported ? "text-[#9CA3AF]" : "text-[#111827]"}`}>
                        {item.name}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-sm ${item.alreadyImported ? "text-[#9CA3AF]" : "text-[#6B7280]"}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-sm font-medium ${item.alreadyImported ? "text-[#9CA3AF]" : "text-[#111827]"}`}>
                        ${item.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {item.alreadyImported && (
                        <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-[#F3F4F6] text-[#6B7280]">
                          Already added
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#E5E7EB] bg-white">
            <span className="text-sm text-[#6B7280]">
              {selectedItems.length > 0 ? `${selectedItems.length} items selected` : "No items selected"}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#F3F4F6] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={selectedItems.length === 0}
                className="px-4 py-2 bg-[#3B82F6] rounded-lg text-sm font-medium text-white hover:bg-[#2563EB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Import Selected ({selectedItems.length})
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

