"use client";

import {
  IconLetterCase,
  IconAlignLeft,
  IconSelector,
  IconCheckbox,
  IconHash,
  IconCalendar,
  IconToggleRight,
  IconUpload,
  IconPencil,
} from "@tabler/icons-react";
import type { Question } from "./FormBuilder";

interface FormBuilderPaletteProps {
  onAddQuestion: (type: Question["type"]) => void;
}

interface QuestionTypeItem {
  type: Question["type"];
  label: string;
  description: string;
  icon: React.ElementType;
}

const questionTypes: QuestionTypeItem[] = [
  {
    type: "short_text",
    label: "Short Text",
    description: "Single line text input",
    icon: IconLetterCase,
  },
  {
    type: "long_text",
    label: "Long Text",
    description: "Multi-line text area",
    icon: IconAlignLeft,
  },
  {
    type: "dropdown",
    label: "Dropdown",
    description: "Single select from options",
    icon: IconSelector,
  },
  {
    type: "checkboxes",
    label: "Checkboxes",
    description: "Multi-select options",
    icon: IconCheckbox,
  },
  {
    type: "number",
    label: "Number",
    description: "Numeric input with validation",
    icon: IconHash,
  },
  {
    type: "date",
    label: "Date",
    description: "Date picker",
    icon: IconCalendar,
  },
  {
    type: "yes_no",
    label: "Yes/No",
    description: "Boolean choice",
    icon: IconToggleRight,
  },
  {
    type: "file_upload",
    label: "File Upload",
    description: "Upload images, PDFs, docs",
    icon: IconUpload,
  },
  {
    type: "signature",
    label: "Signature",
    description: "Digital signature capture",
    icon: IconPencil,
  },
];

export default function FormBuilderPalette({ onAddQuestion }: FormBuilderPaletteProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-[#111827] mb-3">Add Question</h3>
      <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">
        Click or drag a question type to add it to your form.
      </p>

      <div className="space-y-2">
        {questionTypes.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.type}
              onClick={() => onAddQuestion(item.type)}
              draggable
              className="w-full flex items-start gap-3 p-3 bg-[#F9FAFB] hover:bg-[#EFF6FF] border border-[#E5E7EB] hover:border-[#3B82F6] rounded-lg text-left transition-colors group cursor-grab active:cursor-grabbing"
            >
              <div className="w-9 h-9 bg-white border border-[#E5E7EB] group-hover:border-[#3B82F6] rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon size={18} stroke={1.5} className="text-[#6B7280] group-hover:text-[#3B82F6]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#111827] group-hover:text-[#3B82F6]">
                  {item.label}
                </p>
                <p className="text-xs text-[#6B7280]">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tips Section */}
      <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
        <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Tips</h4>
        <ul className="text-xs text-[#6B7280] space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-[#3B82F6]">•</span>
            Drag questions to reorder them
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#3B82F6]">•</span>
            Click a question card to edit it
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#3B82F6]">•</span>
            Use &quot;Required&quot; for mandatory fields
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#3B82F6]">•</span>
            Add help text to guide customers
          </li>
        </ul>
      </div>
    </div>
  );
}

