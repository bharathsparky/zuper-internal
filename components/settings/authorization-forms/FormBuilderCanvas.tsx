"use client";

import { IconPlus } from "@tabler/icons-react";
import QuestionCard from "./QuestionCard";
import type { Question } from "./FormBuilder";

interface FormBuilderCanvasProps {
  formName: string;
  formDescription: string;
  onFormDescriptionChange: (description: string) => void;
  questions: Question[];
  expandedQuestionId: string | null;
  onExpandQuestion: (id: string | null) => void;
  onUpdateQuestion: (id: string, updates: Partial<Question>) => void;
  onDeleteQuestion: (id: string) => void;
  onDuplicateQuestion: (id: string) => void;
  onReorderQuestions: (fromIndex: number, toIndex: number) => void;
  onAddQuestion: (type: Question["type"]) => void;
}

export default function FormBuilderCanvas({
  formDescription,
  onFormDescriptionChange,
  questions,
  expandedQuestionId,
  onExpandQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onDuplicateQuestion,
  onAddQuestion,
}: FormBuilderCanvasProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Form Header Card */}
      <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm p-6 mb-4">
        <h2 className="text-xl font-semibold text-[#111827] mb-4">Form Instructions</h2>
        <textarea
          value={formDescription}
          onChange={(e) => onFormDescriptionChange(e.target.value)}
          placeholder="Add instructions or description for customers (optional)"
          rows={3}
          className="w-full px-4 py-3 border border-[#D1D5DB] rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent resize-none"
        />
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            isExpanded={expandedQuestionId === question.id}
            onExpand={() => onExpandQuestion(expandedQuestionId === question.id ? null : question.id)}
            onUpdate={(updates) => onUpdateQuestion(question.id, updates)}
            onDelete={() => onDeleteQuestion(question.id)}
            onDuplicate={() => onDuplicateQuestion(question.id)}
          />
        ))}
      </div>

      {/* Drop Zone / Add Button */}
      <button
        onClick={() => onAddQuestion("short_text")}
        className="w-full mt-4 py-8 border-2 border-dashed border-[#D1D5DB] rounded-lg text-sm font-medium text-[#6B7280] hover:border-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#EFF6FF] transition-colors flex items-center justify-center gap-2"
      >
        <IconPlus size={20} stroke={2} />
        Drop question here or click to add
      </button>

      {/* Empty State */}
      {questions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#6B7280] text-sm">
            Add questions from the palette on the right, or click the button above.
          </p>
        </div>
      )}
    </div>
  );
}

