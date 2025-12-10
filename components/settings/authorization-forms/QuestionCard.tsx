"use client";

import { useState } from "react";
import {
  IconGripVertical,
  IconDotsVertical,
  IconChevronDown,
  IconTrash,
  IconCopy,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import type { Question } from "./FormBuilder";

interface QuestionCardProps {
  question: Question;
  index: number;
  isExpanded: boolean;
  onExpand: () => void;
  onUpdate: (updates: Partial<Question>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const questionTypeLabels: Record<Question["type"], string> = {
  short_text: "Short Text",
  long_text: "Long Text",
  dropdown: "Dropdown",
  checkboxes: "Checkboxes",
  number: "Number",
  date: "Date",
  yes_no: "Yes/No",
  file_upload: "File Upload",
  signature: "Signature",
};

export default function QuestionCard({
  question,
  index,
  isExpanded,
  onExpand,
  onUpdate,
  onDelete,
  onDuplicate,
}: QuestionCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const getOptionCount = () => {
    if (question.options) {
      return `${question.options.length} options`;
    }
    return "";
  };

  const handleAddOption = () => {
    const currentOptions = question.options || [];
    onUpdate({ options: [...currentOptions, `Option ${currentOptions.length + 1}`] });
  };

  const handleUpdateOption = (index: number, value: string) => {
    const newOptions = [...(question.options || [])];
    newOptions[index] = value;
    onUpdate({ options: newOptions });
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...(question.options || [])];
    newOptions.splice(index, 1);
    onUpdate({ options: newOptions });
  };

  // Collapsed View
  if (!isExpanded) {
    return (
      <div
        className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={onExpand}
      >
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3">
          <div className="cursor-grab text-[#D1D5DB] hover:text-[#9CA3AF] hidden sm:block">
            <IconGripVertical size={20} stroke={1.5} />
          </div>
          <span className="text-sm font-medium text-[#6B7280] min-w-[20px] sm:min-w-[24px]">
            {index + 1}.
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#111827] truncate">
              {question.text}
            </p>
            <p className="text-xs text-[#6B7280]">
              {questionTypeLabels[question.type]}
              {getOptionCount() && ` · ${getOptionCount()}`}
            </p>
          </div>
          {question.required && (
            <span className="px-1.5 sm:px-2 py-0.5 bg-[#FEE2E2] text-[#DC2626] text-xs font-medium rounded whitespace-nowrap">
              <span className="hidden sm:inline">Required</span>
              <span className="sm:hidden">Req</span>
            </span>
          )}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              className="p-1 text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F3F4F6] rounded"
            >
              <IconDotsVertical size={18} stroke={1.5} />
            </button>
            {menuOpen && (
              <div className="absolute top-full right-0 mt-1 w-36 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onExpand();
                    setMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-[#374151] hover:bg-[#F9FAFB] rounded-t-lg"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-[#374151] hover:bg-[#F9FAFB]"
                >
                  <IconCopy size={14} stroke={1.5} />
                  Duplicate
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-[#DC2626] hover:bg-[#FEF2F2] rounded-b-lg"
                >
                  <IconTrash size={14} stroke={1.5} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Expanded View
  return (
    <div className="bg-white rounded-lg border-2 border-[#3B82F6] shadow-md">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 border-b border-[#E5E7EB]">
        <div className="cursor-grab text-[#D1D5DB] hover:text-[#9CA3AF] hidden sm:block">
          <IconGripVertical size={20} stroke={1.5} />
        </div>
        <span className="text-sm font-medium text-[#6B7280] min-w-[20px] sm:min-w-[24px]">
          {index + 1}.
        </span>
        <span className="text-sm font-medium text-[#3B82F6] truncate">
          {questionTypeLabels[question.type]}
        </span>
        <div className="flex-1" />
        <button
          onClick={onExpand}
          className="p-1 text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F3F4F6] rounded"
        >
          <IconChevronDown size={18} stroke={1.5} className="rotate-180" />
        </button>
      </div>

      {/* Form */}
      <div className="p-3 sm:p-4 space-y-4">
        {/* Question Text */}
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-1.5">
            Question Text <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="text"
            value={question.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
            className="w-full px-4 py-2.5 border border-[#D1D5DB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
          />
        </div>

        {/* Help Text */}
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-1.5">
            Help Text (optional)
          </label>
          <input
            type="text"
            value={question.helpText || ""}
            onChange={(e) => onUpdate({ helpText: e.target.value })}
            placeholder="Additional instructions for the customer"
            className="w-full px-4 py-2.5 border border-[#D1D5DB] rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
          />
        </div>

        {/* Type-specific configurations */}
        {(question.type === "short_text" || question.type === "long_text") && (
          <>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1.5">
                Placeholder
              </label>
              <input
                type="text"
                value={question.placeholder || ""}
                onChange={(e) => onUpdate({ placeholder: e.target.value })}
                placeholder="Enter placeholder text"
                className="w-full px-4 py-2.5 border border-[#D1D5DB] rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1.5">
                Max Length
              </label>
              <input
                type="number"
                value={question.maxLength || ""}
                onChange={(e) => onUpdate({ maxLength: parseInt(e.target.value) || undefined })}
                placeholder="255"
                className="w-32 px-4 py-2.5 border border-[#D1D5DB] rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
          </>
        )}

        {(question.type === "dropdown" || question.type === "checkboxes") && (
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1.5">
              Options
            </label>
            <div className="space-y-2">
              {(question.options || []).map((option, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <IconGripVertical size={16} stroke={1.5} className="text-[#D1D5DB] cursor-grab" />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleUpdateOption(idx, e.target.value)}
                    className="flex-1 px-4 py-2 border border-[#D1D5DB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  />
                  <button
                    onClick={() => handleRemoveOption(idx)}
                    className="p-2 text-[#9CA3AF] hover:text-[#DC2626] hover:bg-[#FEF2F2] rounded"
                  >
                    <IconX size={16} stroke={1.5} />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddOption}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#3B82F6] hover:bg-[#EFF6FF] rounded-lg transition-colors"
              >
                <IconPlus size={16} stroke={2} />
                Add Option
              </button>
            </div>
            {question.type === "dropdown" && (
              <label className="flex items-center gap-2 mt-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={question.allowOther || false}
                  onChange={(e) => onUpdate({ allowOther: e.target.checked })}
                  className="w-4 h-4 text-[#3B82F6] border-[#D1D5DB] rounded focus:ring-[#3B82F6]"
                />
                <span className="text-sm text-[#374151]">Allow &quot;Other&quot; option</span>
              </label>
            )}
          </div>
        )}

        {question.type === "number" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1.5">
                Min Value
              </label>
              <input
                type="number"
                value={question.minValue ?? ""}
                onChange={(e) => onUpdate({ minValue: e.target.value ? parseInt(e.target.value) : undefined })}
                className="w-full px-3 sm:px-4 py-2.5 border border-[#D1D5DB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1.5">
                Max Value
              </label>
              <input
                type="number"
                value={question.maxValue ?? ""}
                onChange={(e) => onUpdate({ maxValue: e.target.value ? parseInt(e.target.value) : undefined })}
                className="w-full px-3 sm:px-4 py-2.5 border border-[#D1D5DB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1.5">
                Unit Label
              </label>
              <input
                type="text"
                value={question.unitLabel || ""}
                onChange={(e) => onUpdate({ unitLabel: e.target.value })}
                placeholder="e.g., sq ft"
                className="w-full px-3 sm:px-4 py-2.5 border border-[#D1D5DB] rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
          </div>
        )}

        {question.type === "date" && (
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={question.allowPastDates !== false}
                onChange={(e) => onUpdate({ allowPastDates: e.target.checked })}
                className="w-4 h-4 text-[#3B82F6] border-[#D1D5DB] rounded focus:ring-[#3B82F6]"
              />
              <span className="text-sm text-[#374151]">Allow past dates</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={question.allowFutureDates !== false}
                onChange={(e) => onUpdate({ allowFutureDates: e.target.checked })}
                className="w-4 h-4 text-[#3B82F6] border-[#D1D5DB] rounded focus:ring-[#3B82F6]"
              />
              <span className="text-sm text-[#374151]">Allow future dates</span>
            </label>
          </div>
        )}

        {question.type === "signature" && (
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1.5">
              Legal Text (shown above signature)
            </label>
            <textarea
              value={question.legalText || ""}
              onChange={(e) => onUpdate({ legalText: e.target.value })}
              placeholder="By signing below, I agree to..."
              rows={2}
              className="w-full px-4 py-2.5 border border-[#D1D5DB] rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent resize-none"
            />
          </div>
        )}

        {/* Required Toggle */}
        <div className="pt-2 border-t border-[#E5E7EB]">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-medium text-[#374151]">Required</span>
            <button
              onClick={() => onUpdate({ required: !question.required })}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                question.required ? "bg-[#3B82F6]" : "bg-[#D1D5DB]"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  question.required ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </label>
        </div>

        {/* Done Button */}
        <div className="pt-2">
          <button
            onClick={onExpand}
            className="px-4 py-2 bg-[#3B82F6] rounded-lg text-sm font-medium text-white hover:bg-[#2563EB] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

