"use client";

import { useState } from "react";
import {
  IconX,
  IconDeviceDesktop,
  IconDeviceMobile,
} from "@tabler/icons-react";
import type { Question } from "./FormBuilder";

interface FormPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formName: string;
  formDescription: string;
  questions: Question[];
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

export default function FormPreviewModal({
  isOpen,
  onClose,
  formName,
  formDescription,
  questions,
}: FormPreviewModalProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
            <h2 className="text-lg font-semibold text-[#111827]">
              Preview: {formName}
            </h2>
            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex bg-[#F3F4F6] rounded-lg p-1">
                <button
                  onClick={() => setViewMode("desktop")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    viewMode === "desktop"
                      ? "bg-white text-[#374151] shadow-sm"
                      : "text-[#6B7280]"
                  }`}
                >
                  <IconDeviceDesktop size={16} stroke={1.5} />
                  Desktop
                </button>
                <button
                  onClick={() => setViewMode("mobile")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    viewMode === "mobile"
                      ? "bg-white text-[#374151] shadow-sm"
                      : "text-[#6B7280]"
                  }`}
                >
                  <IconDeviceMobile size={16} stroke={1.5} />
                  Mobile
                </button>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F3F4F6] rounded-lg"
              >
                <IconX size={20} stroke={1.5} />
              </button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-y-auto bg-[#F3F4F6] p-6 flex justify-center">
            <div
              className={`bg-white rounded-lg shadow-lg transition-all ${
                viewMode === "mobile" ? "w-[375px]" : "w-full max-w-2xl"
              }`}
            >
              {/* Form Header */}
              <div className="p-6 border-b border-[#E5E7EB]">
                <h3 className="text-xl font-semibold text-[#111827] mb-2">{formName}</h3>
                {formDescription && (
                  <p className="text-sm text-[#6B7280]">{formDescription}</p>
                )}
              </div>

              {/* Questions */}
              <div className="p-6 space-y-6">
                {questions.length === 0 ? (
                  <p className="text-sm text-[#6B7280] text-center py-8">
                    No questions added yet.
                  </p>
                ) : (
                  questions.map((question, index) => (
                    <div key={question.id} className="space-y-2">
                      <label className="block">
                        <span className="text-sm font-medium text-[#374151]">
                          {index + 1}. {question.text}
                          {question.required && (
                            <span className="text-[#DC2626] ml-1">*</span>
                          )}
                        </span>
                        {question.helpText && (
                          <span className="block text-xs text-[#6B7280] mt-1">
                            {question.helpText}
                          </span>
                        )}
                      </label>

                      {/* Render input based on type */}
                      {question.type === "short_text" && (
                        <input
                          type="text"
                          placeholder={question.placeholder || "Enter text..."}
                          disabled
                          className="w-full px-4 py-2.5 border border-[#D1D5DB] rounded-lg text-sm text-[#9CA3AF] bg-[#F9FAFB]"
                        />
                      )}

                      {question.type === "long_text" && (
                        <textarea
                          placeholder={question.placeholder || "Enter text..."}
                          disabled
                          rows={3}
                          className="w-full px-4 py-2.5 border border-[#D1D5DB] rounded-lg text-sm text-[#9CA3AF] bg-[#F9FAFB] resize-none"
                        />
                      )}

                      {question.type === "dropdown" && (
                        <select
                          disabled
                          className="w-full px-4 py-2.5 border border-[#D1D5DB] rounded-lg text-sm text-[#9CA3AF] bg-[#F9FAFB]"
                        >
                          <option>Select an option...</option>
                          {question.options?.map((opt, i) => (
                            <option key={i}>{opt}</option>
                          ))}
                        </select>
                      )}

                      {question.type === "checkboxes" && (
                        <div className="space-y-2">
                          {question.options?.map((opt, i) => (
                            <label key={i} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                disabled
                                className="w-4 h-4 border-[#D1D5DB] rounded"
                              />
                              <span className="text-sm text-[#6B7280]">{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}

                      {question.type === "number" && (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            placeholder="0"
                            disabled
                            className="w-32 px-4 py-2.5 border border-[#D1D5DB] rounded-lg text-sm text-[#9CA3AF] bg-[#F9FAFB]"
                          />
                          {question.unitLabel && (
                            <span className="text-sm text-[#6B7280]">{question.unitLabel}</span>
                          )}
                        </div>
                      )}

                      {question.type === "date" && (
                        <input
                          type="date"
                          disabled
                          className="w-48 px-4 py-2.5 border border-[#D1D5DB] rounded-lg text-sm text-[#9CA3AF] bg-[#F9FAFB]"
                        />
                      )}

                      {question.type === "yes_no" && (
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`preview-${question.id}`}
                              disabled
                              className="w-4 h-4 border-[#D1D5DB]"
                            />
                            <span className="text-sm text-[#6B7280]">Yes</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`preview-${question.id}`}
                              disabled
                              className="w-4 h-4 border-[#D1D5DB]"
                            />
                            <span className="text-sm text-[#6B7280]">No</span>
                          </label>
                        </div>
                      )}

                      {question.type === "file_upload" && (
                        <div className="border-2 border-dashed border-[#D1D5DB] rounded-lg p-6 text-center bg-[#F9FAFB]">
                          <p className="text-sm text-[#6B7280]">
                            Drag & drop files here or click to upload
                          </p>
                          <p className="text-xs text-[#9CA3AF] mt-1">
                            Max {question.maxFiles || 5} files, {question.maxFileSize || 10}MB each
                          </p>
                        </div>
                      )}

                      {question.type === "signature" && (
                        <div>
                          {question.legalText && (
                            <p className="text-xs text-[#6B7280] mb-2 italic">
                              {question.legalText}
                            </p>
                          )}
                          <div className="border border-[#D1D5DB] rounded-lg p-4 bg-[#F9FAFB] h-24 flex items-center justify-center">
                            <p className="text-sm text-[#9CA3AF]">Signature pad</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Submit Button Preview */}
              {questions.length > 0 && (
                <div className="p-6 border-t border-[#E5E7EB]">
                  <button
                    disabled
                    className="w-full py-3 bg-[#3B82F6] rounded-lg text-sm font-medium text-white opacity-75"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end px-6 py-4 border-t border-[#E5E7EB]">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#3B82F6] rounded-lg text-sm font-medium text-white hover:bg-[#2563EB] transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

