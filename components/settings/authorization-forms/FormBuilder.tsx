"use client";

import { useState } from "react";
import {
  IconArrowLeft,
  IconEye,
  IconDeviceFloppy,
  IconPlayerPlay,
  IconPlus,
} from "@tabler/icons-react";
import FormBuilderCanvas from "./FormBuilderCanvas";
import FormBuilderPalette from "./FormBuilderPalette";
import FormPreviewModal from "./FormPreviewModal";

export interface Question {
  id: string;
  type: "short_text" | "long_text" | "dropdown" | "checkboxes" | "number" | "date" | "yes_no" | "file_upload" | "signature";
  text: string;
  helpText?: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  unitLabel?: string;
  allowPastDates?: boolean;
  allowFutureDates?: boolean;
  defaultValue?: string;
  allowedFileTypes?: string[];
  maxFileSize?: number;
  maxFiles?: number;
  legalText?: string;
  minSelections?: number;
  maxSelections?: number;
  allowOther?: boolean;
}

interface FormBuilderProps {
  formId?: string | null;
  onBack: () => void;
}

export default function FormBuilder({ formId, onBack }: FormBuilderProps) {
  const isEditing = !!formId;
  
  const [formName, setFormName] = useState(isEditing ? "Roofing Project Authorization" : "Untitled Form");
  const [formDescription, setFormDescription] = useState(isEditing ? "Please complete this form before we can proceed with your roofing project." : "");
  const [questions, setQuestions] = useState<Question[]>(isEditing ? [
    {
      id: "1",
      type: "short_text",
      text: "Property Address",
      helpText: "Enter the full address where work will be performed",
      required: true,
      placeholder: "123 Main St, City, State ZIP",
    },
    {
      id: "2",
      type: "dropdown",
      text: "Preferred Shingle Color",
      required: true,
      options: ["Charcoal Gray", "Weathered Wood", "Desert Tan", "Slate Blue", "Onyx Black"],
    },
    {
      id: "3",
      type: "yes_no",
      text: "Are there any pets on the property?",
      helpText: "This helps our crew prepare for site access",
      required: true,
    },
    {
      id: "4",
      type: "long_text",
      text: "Gate Code / Access Instructions",
      helpText: "Provide any codes or special instructions for accessing the property",
      required: false,
      placeholder: "Enter gate codes, key locations, or special access instructions...",
    },
    {
      id: "5",
      type: "checkboxes",
      text: "Which areas need attention?",
      required: true,
      options: ["Main roof", "Garage roof", "Gutters", "Skylights", "Chimney flashing"],
      minSelections: 1,
    },
    {
      id: "6",
      type: "date",
      text: "Preferred Start Date",
      helpText: "Select your preferred date for work to begin",
      required: true,
      allowPastDates: false,
      allowFutureDates: true,
    },
    {
      id: "7",
      type: "signature",
      text: "Customer Signature",
      legalText: "By signing below, I authorize the contractor to proceed with the work described in this proposal.",
      required: true,
    },
  ] : []);
  
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleAddQuestion = (type: Question["type"]) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      text: getDefaultQuestionText(type),
      required: false,
      ...getDefaultConfig(type),
    };
    setQuestions([...questions, newQuestion]);
    setExpandedQuestionId(newQuestion.id);
  };

  const handleUpdateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...updates } : q)));
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
    if (expandedQuestionId === id) {
      setExpandedQuestionId(null);
    }
  };

  const handleDuplicateQuestion = (id: string) => {
    const question = questions.find((q) => q.id === id);
    if (question) {
      const duplicated: Question = {
        ...question,
        id: Date.now().toString(),
        text: `${question.text} (Copy)`,
      };
      const index = questions.findIndex((q) => q.id === id);
      const newQuestions = [...questions];
      newQuestions.splice(index + 1, 0, duplicated);
      setQuestions(newQuestions);
    }
  };

  const handleReorderQuestions = (fromIndex: number, toIndex: number) => {
    const newQuestions = [...questions];
    const [removed] = newQuestions.splice(fromIndex, 1);
    newQuestions.splice(toIndex, 0, removed);
    setQuestions(newQuestions);
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", { formName, formDescription, questions });
  };

  const handleSaveAndActivate = () => {
    console.log("Saving and activating:", { formName, formDescription, questions });
    onBack();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex flex-col bg-[#F9FAFB]">
        {/* Top Bar */}
        <div className="h-14 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
          <div className="flex items-center gap-2 lg:gap-4 min-w-0">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm font-medium text-[#6B7280] hover:text-[#374151] transition-colors whitespace-nowrap"
            >
              <IconArrowLeft size={18} stroke={2} />
              <span className="hidden sm:inline">Back to Authorization Forms</span>
              <span className="sm:hidden">Back</span>
            </button>
            <div className="hidden md:block h-6 w-px bg-[#E5E7EB]" />
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="text-base lg:text-lg font-semibold text-[#111827] bg-transparent border-none focus:outline-none focus:ring-0 min-w-0 flex-1 max-w-[200px] lg:max-w-[300px]"
              placeholder="Form name"
            />
          </div>
          <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
            <button
              onClick={() => setPreviewOpen(true)}
              className="flex items-center gap-1.5 px-2 lg:px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#F3F4F6] rounded-lg transition-colors"
            >
              <IconEye size={18} stroke={1.5} />
              <span className="hidden lg:inline">Preview</span>
            </button>
            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-1.5 px-2 lg:px-4 py-2 bg-white border border-[#D1D5DB] rounded-lg text-sm font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors"
            >
              <IconDeviceFloppy size={18} stroke={1.5} />
              <span className="hidden lg:inline">Save Draft</span>
            </button>
            <button
              onClick={handleSaveAndActivate}
              className="flex items-center gap-1.5 px-3 lg:px-4 py-2 bg-[#3B82F6] rounded-lg text-sm font-medium text-white hover:bg-[#2563EB] transition-colors whitespace-nowrap"
            >
              <IconPlayerPlay size={18} stroke={1.5} />
              <span className="hidden sm:inline">Save & Activate</span>
              <span className="sm:hidden">Save</span>
            </button>
          </div>
        </div>

        {/* Split Pane */}
        <div className="flex-1 flex overflow-hidden">
          {/* Canvas (Left Pane) */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            <FormBuilderCanvas
              formName={formName}
              formDescription={formDescription}
              onFormDescriptionChange={setFormDescription}
              questions={questions}
              expandedQuestionId={expandedQuestionId}
              onExpandQuestion={setExpandedQuestionId}
              onUpdateQuestion={handleUpdateQuestion}
              onDeleteQuestion={handleDeleteQuestion}
              onDuplicateQuestion={handleDuplicateQuestion}
              onReorderQuestions={handleReorderQuestions}
              onAddQuestion={handleAddQuestion}
            />
          </div>

          {/* Palette (Right Pane) - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:block w-[280px] lg:w-[320px] border-l border-[#E5E7EB] bg-white overflow-y-auto flex-shrink-0">
            <FormBuilderPalette onAddQuestion={handleAddQuestion} />
          </div>
        </div>

        {/* Mobile Add Question Button */}
        <div className="md:hidden fixed bottom-4 right-4">
          <button
            onClick={() => handleAddQuestion("short_text")}
            className="w-14 h-14 bg-[#3B82F6] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#2563EB] transition-colors"
          >
            <IconPlus size={24} stroke={2} />
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      <FormPreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        formName={formName}
        formDescription={formDescription}
        questions={questions}
      />
    </>
  );
}

function getDefaultQuestionText(type: Question["type"]): string {
  const defaults: Record<Question["type"], string> = {
    short_text: "Enter your question",
    long_text: "Enter your question",
    dropdown: "Select an option",
    checkboxes: "Select all that apply",
    number: "Enter a number",
    date: "Select a date",
    yes_no: "Yes or No question",
    file_upload: "Upload a file",
    signature: "Signature",
  };
  return defaults[type];
}

function getDefaultConfig(type: Question["type"]): Partial<Question> {
  const configs: Record<Question["type"], Partial<Question>> = {
    short_text: { placeholder: "", maxLength: 255 },
    long_text: { placeholder: "", maxLength: 1000 },
    dropdown: { options: ["Option 1", "Option 2", "Option 3"], allowOther: false },
    checkboxes: { options: ["Option 1", "Option 2", "Option 3"], minSelections: 0, maxSelections: undefined },
    number: { placeholder: "", minValue: undefined, maxValue: undefined, unitLabel: "" },
    date: { placeholder: "", allowPastDates: true, allowFutureDates: true },
    yes_no: { defaultValue: "" },
    file_upload: { allowedFileTypes: ["image/*", "application/pdf"], maxFileSize: 10, maxFiles: 5 },
    signature: { legalText: "By signing, I agree to the terms and conditions." },
  };
  return configs[type];
}

