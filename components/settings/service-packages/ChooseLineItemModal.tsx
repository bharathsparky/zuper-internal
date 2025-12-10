"use client";

import { useState } from "react";
import {
  IconX,
  IconSearch,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconPackage,
} from "@tabler/icons-react";

interface LineItem {
  id: string;
  name: string;
  code: string;
  image?: string;
  availableQty: number;
  totalQty: number;
  unit: string;
  category: string;
  type: string;
  location: string;
  unitCost: number;
  markup: string;
  sellingPrice: number;
  quantity: number;
  nonBillable?: boolean;
}

interface ChooseLineItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (items: LineItem[]) => void;
  title?: string;
}

const mockLineItems: LineItem[] = [
  {
    id: "1",
    code: "#ZP - 45345",
    name: "Drip edge",
    image: "https://images.unsplash.com/photo-1586864387789-628af9feed72?w=60&h=60&fit=crop",
    availableQty: -64.82,
    totalQty: -170.82,
    unit: "Unit",
    category: "Material",
    type: "Prod...",
    location: "Bangkok Warehouse 310 (-64.82)",
    unitCost: 100,
    markup: "×",
    sellingPrice: 100,
    quantity: 0,
  },
  {
    id: "2",
    code: "#SC002",
    name: "Repair of Plumbing Defects",
    availableQty: -5,
    totalQty: 49.36,
    unit: "Unit",
    category: "Other",
    type: "Prod...",
    location: "Bangkok Warehouse 310 (-5)",
    unitCost: 0,
    markup: "×",
    sellingPrice: 229.99,
    quantity: 0,
  },
  {
    id: "3",
    code: "#ZP - 97",
    name: "Test 2",
    availableQty: 0,
    totalQty: 0,
    unit: "Unit",
    category: "Civil Items",
    type: "Servi...",
    location: "No Location Found!!",
    unitCost: 12,
    markup: "×",
    sellingPrice: 12,
    quantity: 0,
  },
  {
    id: "4",
    code: "#ZP - 78965",
    name: "Prefix check",
    availableQty: 0,
    totalQty: 0,
    unit: "Unit",
    category: "Misc Accesso...",
    type: "Servi...",
    location: "No Location Found!!",
    unitCost: 0,
    markup: "×",
    sellingPrice: 200,
    quantity: 0,
    nonBillable: true,
  },
  {
    id: "5",
    code: "#PT001 - PT001",
    name: "Lab Glassware",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=60&h=60&fit=crop",
    availableQty: -3,
    totalQty: 73,
    unit: "Unit",
    category: "Material",
    type: "Prod...",
    location: "Bangkok Warehouse 310 (-3)",
    unitCost: 1000,
    markup: "×",
    sellingPrice: 1000,
    quantity: 0,
  },
];

export default function ChooseLineItemModal({
  isOpen,
  onClose,
  onAdd,
  title = "Choose Line Item",
}: ChooseLineItemModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [productType, setProductType] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("Bangkok Warehouse 310");
  const [availability, setAvailability] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [items, setItems] = useState<LineItem[]>(mockLineItems);

  const totalPages = 243;

  const handleSelectItem = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map((item) => item.id)));
    }
  };

  const handleItemChange = (itemId: string, field: keyof LineItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddProduct = () => {
    const selectedLineItems = items.filter((item) => selectedItems.has(item.id));
    onAdd(selectedLineItems);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-[95vw] max-w-[1400px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
          <h2 className="text-lg font-semibold text-[#1E293B]">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9] rounded transition-colors"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-[280px]">
              <IconSearch
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Item"
                className="w-full pl-9 pr-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>

            {/* Product Type */}
            <div className="relative min-w-[140px]">
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full appearance-none px-3 py-2.5 pr-8 border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                <option value="">Product Type</option>
                <option value="material">Material</option>
                <option value="service">Service</option>
              </select>
              <IconChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
              />
            </div>

            {/* Category */}
            <div className="relative min-w-[120px]">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none px-3 py-2.5 pr-8 border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                <option value="">Category</option>
                <option value="material">Material</option>
                <option value="civil">Civil Items</option>
                <option value="other">Other</option>
              </select>
              <IconChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
              />
            </div>

            {/* Location */}
            <div className="relative min-w-[180px]">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full appearance-none px-3 py-2.5 pr-8 border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                <option value="Bangkok Warehouse 310">Bangkok Warehouse 310</option>
                <option value="Main Warehouse">Main Warehouse</option>
              </select>
              <IconChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
              />
            </div>

            {/* Availability */}
            <div className="relative min-w-[120px]">
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full appearance-none px-3 py-2.5 pr-8 border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                <option value="">Availability</option>
                <option value="in-stock">In Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
              <IconChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
              />
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Pagination */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#64748B]">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1.5 text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9] rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <IconChevronLeft size={18} />
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9] rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <IconChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-white sticky top-0 z-10">
              <tr className="border-b border-[#E2E8F0]">
                <th className="px-4 py-3 text-left w-10">
                  <input
                    type="checkbox"
                    checked={selectedItems.size === items.length && items.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-[#CBD5E1] text-[#F97316] focus:ring-[#F97316]"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider min-w-[280px]">
                  Item
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider min-w-[120px]">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider min-w-[80px]">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider min-w-[200px]">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider min-w-[120px]">
                  <div className="leading-tight">
                    Unit Purchase<br />
                    Price/Unit Cost (in<br />
                    USD)
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider min-w-[100px]">
                  Markup
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider min-w-[130px]">
                  <div className="leading-tight">
                    Unit Selling Price<br />
                    (in USD) <span className="text-[#EF4444]">*</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider min-w-[100px]">
                  Quantity <span className="text-[#EF4444]">*</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-[#F8FAFC]">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="w-4 h-4 rounded border-[#CBD5E1] text-[#F97316] focus:ring-[#F97316]"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#F1F5F9] flex items-center justify-center overflow-hidden shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <IconPackage size={20} className="text-[#94A3B8]" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#1E293B]">
                          {item.code} - {item.name}
                        </p>
                        {item.nonBillable && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-[#FEF2F2] text-[#EF4444] text-xs font-medium rounded">
                            Non-Billable
                          </span>
                        )}
                        {item.availableQty !== 0 && (
                          <p className="text-xs text-[#64748B] mt-0.5">
                            Available Qty: {item.availableQty} {item.unit}
                          </p>
                        )}
                        {item.totalQty !== 0 && (
                          <p className="text-xs text-[#64748B]">
                            Total Quantity: {item.totalQty}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-[#1E293B]">{item.category}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-[#1E293B]">{item.type}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="relative">
                      <select
                        value={item.location}
                        onChange={(e) => handleItemChange(item.id, "location", e.target.value)}
                        className={`w-full appearance-none px-3 py-2 pr-8 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent ${
                          item.location === "No Location Found!!"
                            ? "border-[#E2E8F0] text-[#64748B]"
                            : "border-[#E2E8F0] text-[#1E293B]"
                        }`}
                      >
                        <option value={item.location}>{item.location}</option>
                      </select>
                      <IconChevronDown
                        size={14}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <input
                      type="number"
                      value={item.unitCost || ""}
                      onChange={(e) => handleItemChange(item.id, "unitCost", parseFloat(e.target.value) || 0)}
                      placeholder="Eg: 10"
                      className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] placeholder-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        placeholder="Eg: 10"
                        className="w-16 px-2 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] placeholder-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                      />
                      <div className="relative">
                        <select className="appearance-none px-2 py-2 pr-6 border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent">
                          <option value="×">×</option>
                          <option value="%">%</option>
                        </select>
                        <IconChevronDown
                          size={12}
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <input
                      type="number"
                      value={item.sellingPrice || ""}
                      onChange={(e) => handleItemChange(item.id, "sellingPrice", parseFloat(e.target.value) || 0)}
                      placeholder="Eg: 20"
                      className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] placeholder-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={item.quantity || ""}
                        onChange={(e) => handleItemChange(item.id, "quantity", parseFloat(e.target.value) || 0)}
                        placeholder="Eg: 20"
                        className="w-20 px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] placeholder-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                      />
                      {item.unit && (
                        <span className="text-sm text-[#64748B]">{item.unit}</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E2E8F0] bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-[#E2E8F0] rounded-lg text-sm font-medium text-[#475569] hover:bg-[#F8FAFC] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddProduct}
            disabled={selectedItems.size === 0}
            className="px-6 py-2.5 bg-[#F97316] rounded-lg text-sm font-medium text-white hover:bg-[#EA580C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

