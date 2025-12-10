"use client";

import { useState } from "react";
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
  IconForms,
  IconEdit,
  IconCopy,
  IconEye,
  IconToggleLeft,
  IconTrash,
} from "@tabler/icons-react";

interface AuthForm {
  id: string;
  name: string;
  description: string;
  questionsCount: number;
  usedInTemplates: number;
  lastModified: string;
  status: "Active" | "Draft";
}

interface FormsTabProps {
  onEditForm?: (formId: string | null) => void;
}

const mockForms: AuthForm[] = [
  {
    id: "1",
    name: "Roofing Project Authorization",
    description: "Standard authorization form for roofing projects",
    questionsCount: 8,
    usedInTemplates: 24,
    lastModified: "12/05/2024 02:30 PM",
    status: "Active",
  },
  {
    id: "2",
    name: "Site Access & Safety",
    description: "Gate codes, pet info, and safety acknowledgments",
    questionsCount: 5,
    usedInTemplates: 18,
    lastModified: "12/03/2024 10:15 AM",
    status: "Active",
  },
  {
    id: "3",
    name: "Color Selection Form",
    description: "Customer shingle and trim color preferences",
    questionsCount: 4,
    usedInTemplates: 12,
    lastModified: "11/28/2024 04:45 PM",
    status: "Active",
  },
  {
    id: "4",
    name: "Insurance Claim Authorization",
    description: "Legal authorization for insurance claim processing",
    questionsCount: 6,
    usedInTemplates: 8,
    lastModified: "11/25/2024 09:00 AM",
    status: "Active",
  },
  {
    id: "5",
    name: "HVAC Service Agreement",
    description: "Service terms and conditions for HVAC work",
    questionsCount: 7,
    usedInTemplates: 0,
    lastModified: "11/20/2024 11:30 AM",
    status: "Draft",
  },
  {
    id: "6",
    name: "Solar Panel Installation Consent",
    description: "Consent form for solar panel installations",
    questionsCount: 9,
    usedInTemplates: 5,
    lastModified: "11/15/2024 03:20 PM",
    status: "Active",
  },
];

const statuses = ["All Status", "Active", "Draft"];

export default function FormsTab({ onEditForm }: FormsTabProps) {
  const [forms] = useState<AuthForm[]>(mockForms);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const totalForms = 23;
  const totalPages = 3;

  const handleCreateForm = () => {
    if (onEditForm) {
      onEditForm(null);
    }
  };

  const handleEditForm = (form: AuthForm) => {
    if (onEditForm) {
      onEditForm(form.id);
    }
    setActionMenuOpen(null);
  };

  // Empty state
  if (forms.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg border border-[#e5e7eb] p-12">
        <div className="w-20 h-20 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-6">
          <IconForms size={40} stroke={1.5} className="text-[#9CA3AF]" />
        </div>
        <h3 className="text-lg font-semibold text-[#111827] mb-2">No authorization forms created yet</h3>
        <p className="text-sm text-[#6B7280] text-center max-w-md mb-6">
          Create forms with custom questions that customers answer before signing proposals — like color choices, site access info, or legal acknowledgments.
        </p>
        <button
          onClick={handleCreateForm}
          className="flex items-center gap-2 px-4 py-1.5 bg-white border border-[#d1d5db] rounded-lg text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors"
        >
          <IconPlus size={16} stroke={2} />
          New Form
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-[#e5e7eb] shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[#111827]">
          Authorization Forms ({totalForms})
        </h1>
        <button
          onClick={handleCreateForm}
          className="flex items-center gap-2 px-4 py-1.5 bg-white border border-[#d1d5db] rounded-lg text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors"
        >
          <IconPlus size={16} stroke={2} />
          New Form
        </button>
      </div>

      {/* Filters */}
      <div className="px-6 py-3 border-t border-b border-[#e5e7eb] bg-white">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <IconFilter size={18} stroke={1.5} className="text-[#9ca3af]" />

            {/* Status Dropdown */}
            <div className="relative">
              <button
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
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
                Form Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#4b5563]">
                Questions
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#4b5563]">
                Used In
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#4b5563]">
                Last Modified
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
            {forms.map((form) => (
              <tr key={form.id} className="hover:bg-[#f9fafb] transition-colors">
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditForm(form)}
                    className="text-left hover:text-[#3B82F6]"
                  >
                    <p className="text-sm font-medium text-[#111827]">
                      {form.name}
                    </p>
                    <p className="text-sm text-[#6b7280] truncate max-w-[300px]">
                      {form.description}
                    </p>
                  </button>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-[#6B7280]">
                    {form.questionsCount} questions
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-[#6B7280]">
                    {form.usedInTemplates} templates
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-[#6B7280]">
                    {form.lastModified}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                    form.status === "Active"
                      ? "bg-[#D1FAE5] text-[#059669]"
                      : "bg-[#FEF3C7] text-[#D97706]"
                  }`}>
                    {form.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="relative">
                    <button
                      onClick={() => setActionMenuOpen(actionMenuOpen === form.id ? null : form.id)}
                      className="p-1 text-[#9ca3af] hover:text-[#6b7280] hover:bg-[#f3f4f6] rounded"
                    >
                      <IconDotsVertical size={18} stroke={1.5} />
                    </button>
                    {actionMenuOpen === form.id && (
                      <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-20">
                        <button
                          onClick={() => handleEditForm(form)}
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
                          <IconEye size={16} stroke={1.5} />
                          Preview
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-[#374151] hover:bg-[#F9FAFB]">
                          <IconToggleLeft size={16} stroke={1.5} />
                          {form.status === "Active" ? "Deactivate" : "Activate"}
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
  );
}

