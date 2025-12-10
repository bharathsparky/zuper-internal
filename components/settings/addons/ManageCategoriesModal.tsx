"use client";

import { useState } from "react";
import {
  IconX,
  IconPlus,
  IconTrash,
  IconLock,
  IconGripVertical,
} from "@tabler/icons-react";

interface Category {
  id: string;
  name: string;
  isSystem: boolean;
}

interface ManageCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultCategories: Category[] = [
  { id: "1", name: "Upgrades", isSystem: true },
  { id: "2", name: "Warranties", isSystem: true },
  { id: "3", name: "Fees", isSystem: true },
  { id: "4", name: "Discounts", isSystem: true },
  { id: "5", name: "Materials", isSystem: true },
  { id: "6", name: "Labor", isSystem: true },
  { id: "7", name: "Accessories", isSystem: false },
  { id: "8", name: "Premium Options", isSystem: false },
];

export default function ManageCategoriesModal({ isOpen, onClose }: ManageCategoriesModalProps) {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      setCategories([
        ...categories,
        {
          id: Date.now().toString(),
          name: newCategoryName.trim(),
          isSystem: false,
        },
      ]);
      setNewCategoryName("");
    }
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleSave = () => {
    console.log("Saving categories:", categories);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-[60]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
        <div
          className="bg-white rounded-xl shadow-xl w-full max-w-md flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
            <h2 className="text-lg font-semibold text-[#111827]">
              Manage Categories
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F3F4F6] rounded-lg"
            >
              <IconX size={20} stroke={1.5} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 max-h-[400px]">
            {/* Category List */}
            <div className="space-y-2 mb-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center gap-3 px-3 py-2.5 bg-[#F9FAFB] rounded-lg group"
                >
                  <IconGripVertical size={16} stroke={1.5} className="text-[#D1D5DB] cursor-grab" />
                  <span className="flex-1 text-sm text-[#374151]">{category.name}</span>
                  {category.isSystem ? (
                    <div className="flex items-center gap-1 text-[#9CA3AF]" title="System category cannot be deleted">
                      <IconLock size={14} stroke={1.5} />
                      <span className="text-xs">System</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-1 text-[#9CA3AF] hover:text-[#DC2626] hover:bg-[#FEF2F2] rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <IconTrash size={16} stroke={1.5} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add New Category */}
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1.5">
                Add New Category
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                  className="flex-1 px-4 py-2.5 border border-[#D1D5DB] rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                />
                <button
                  onClick={handleAddCategory}
                  disabled={!newCategoryName.trim()}
                  className="flex items-center gap-1 px-4 py-2.5 bg-[#3B82F6] rounded-lg text-sm font-medium text-white hover:bg-[#2563EB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <IconPlus size={16} stroke={2} />
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E5E7EB]">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#F3F4F6] rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#3B82F6] rounded-lg text-sm font-medium text-white hover:bg-[#2563EB] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

