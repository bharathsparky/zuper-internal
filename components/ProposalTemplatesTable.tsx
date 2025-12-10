"use client";

import { useState } from "react";
import {
  IconHome,
  IconChevronRight,
  IconChevronDown,
  IconPlus,
  IconFilter,
  IconSearch,
  IconDotsVertical,
  IconChevronLeft,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";

interface Template {
  id: string;
  name: string;
  description: string;
  type: "Standard" | "CPQ-based";
  createdBy: {
    name: string;
    initials: string;
    bgColor: string;
    textColor: string;
  };
  createdOn: string;
  status: "Active" | "Draft";
}

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Template of CertainTeed Resi...o...",
    description: "Test - Template of CertainTeed Residential...",
    type: "Standard",
    createdBy: { name: "Sesha Ma...", initials: "S", bgColor: "bg-[#ede9fe]", textColor: "text-[#7c3aed]" },
    createdOn: "08/24/2023 03:1...",
    status: "Active",
  },
  {
    id: "2",
    name: "Template 1",
    description: "sdsd",
    type: "Standard",
    createdBy: { name: "Sesha ...", initials: "S", bgColor: "bg-[#ede9fe]", textColor: "text-[#7c3aed]" },
    createdOn: "08/30/2023 ...",
    status: "Active",
  },
  {
    id: "3",
    name: "iOS Test Template",
    description: "",
    type: "Standard",
    createdBy: { name: "Mark ...", initials: "M", bgColor: "bg-[#dbeafe]", textColor: "text-[#2563eb]" },
    createdOn: "08/31/2023 1...",
    status: "Active",
  },
  {
    id: "4",
    name: "Testing",
    description: "Placeat mollitia...",
    type: "Standard",
    createdBy: { name: "Marlon...", initials: "M", bgColor: "bg-[#dbeafe]", textColor: "text-[#2563eb]" },
    createdOn: "09/01/2023 ...",
    status: "Active",
  },
  {
    id: "5",
    name: "Sept 1",
    description: "",
    type: "Standard",
    createdBy: { name: "Sesha ...", initials: "S", bgColor: "bg-[#ede9fe]", textColor: "text-[#7c3aed]" },
    createdOn: "09/01/2023 ...",
    status: "Active",
  },
  {
    id: "6",
    name: "Empty Proposal template",
    description: "Empty Proposals template",
    type: "Standard",
    createdBy: { name: "Guru Pr...", initials: "G", bgColor: "bg-[#d1fae5]", textColor: "text-[#059669]" },
    createdOn: "09/04/2023 1...",
    status: "Active",
  },
  {
    id: "7",
    name: "Apple",
    description: "Apple",
    type: "CPQ-based",
    createdBy: { name: "Mark C...", initials: "M", bgColor: "bg-[#dbeafe]", textColor: "text-[#2563eb]" },
    createdOn: "09/07/2023 ...",
    status: "Draft",
  },
  {
    id: "8",
    name: "Cutom Bike Template",
    description: "",
    type: "Standard",
    createdBy: { name: "Mark C...", initials: "M", bgColor: "bg-[#dbeafe]", textColor: "text-[#2563eb]" },
    createdOn: "09/07/2023 ...",
    status: "Active",
  },
];

export default function ProposalTemplatesTable() {
  const [activeTab, setActiveTab] = useState("proposal-templates");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const totalTemplates = 529;
  const totalPages = 53;

  const tabs = [
    { id: "proposal-templates", label: "Proposal Templates" },
    { id: "formula-library", label: "Formula Library" },
    { id: "service-packages", label: "Service Packages" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Breadcrumb */}
      <div className="px-6 py-3 bg-white border-b border-[#e5e7eb]">
        <nav className="flex items-center gap-2 text-sm">
          <button className="text-[#9ca3af] hover:text-[#6b7280]">
            <IconHome size={18} stroke={1.5} />
          </button>
          <IconChevronRight size={16} stroke={2} className="text-[#d1d5db]" />
          <span className="text-[#6b7280]">Quote & Invoice Settings</span>
          <IconChevronRight size={16} stroke={2} className="text-[#d1d5db]" />
          <span className="text-[#111827] font-medium">Zuper IQ - Intelligent Quoting</span>
        </nav>
      </div>

      {/* Tabs */}
      <div className="px-6 py-3 bg-white border-b border-[#e5e7eb]">
        <div className="inline-flex bg-[#f3f4f6] rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === tab.id
                  ? "bg-white text-[#374151] shadow-sm"
                  : "text-[#6b7280] hover:text-[#374151]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto bg-[#f9fafb]">
        <div className="bg-white rounded-lg border border-[#e5e7eb] shadow-sm">
          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-[#111827]">
              Proposal Templates ({totalTemplates})
            </h1>
            <button className="flex items-center gap-2 px-4 py-1.5 bg-white border border-[#d1d5db] rounded-lg text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
              <IconPlus size={16} stroke={2} />
              New Template
            </button>
          </div>

          {/* Filters */}
          <div className="px-6 py-3 border-t border-b border-[#e5e7eb] bg-white">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Filter Icon */}
                <IconFilter size={18} stroke={1.5} className="text-[#9ca3af]" />

                {/* Type Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setTypeDropdownOpen(!typeDropdownOpen);
                      setStatusDropdownOpen(false);
                    }}
                    className="flex items-center gap-8 px-4 py-2 bg-white border border-[#d1d5db] rounded-lg text-sm text-[#6b7280] hover:bg-[#f9fafb]"
                  >
                    {typeFilter || "Type"}
                    <IconChevronDown size={16} stroke={2} className="text-[#9ca3af]" />
                  </button>
                  {typeDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-[#e5e7eb] rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => { setTypeFilter(""); setTypeDropdownOpen(false); }}
                        className="w-full px-4 py-2 text-left text-sm text-[#374151] hover:bg-[#f9fafb]"
                      >
                        All Types
                      </button>
                      <button
                        onClick={() => { setTypeFilter("Standard"); setTypeDropdownOpen(false); }}
                        className="w-full px-4 py-2 text-left text-sm text-[#374151] hover:bg-[#f9fafb]"
                      >
                        Standard
                      </button>
                      <button
                        onClick={() => { setTypeFilter("CPQ-based"); setTypeDropdownOpen(false); }}
                        className="w-full px-4 py-2 text-left text-sm text-[#374151] hover:bg-[#f9fafb]"
                      >
                        CPQ-based
                      </button>
                    </div>
                  )}
                </div>

                {/* Status Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setStatusDropdownOpen(!statusDropdownOpen);
                      setTypeDropdownOpen(false);
                    }}
                    className="flex items-center gap-8 px-4 py-2 bg-white border border-[#d1d5db] rounded-lg text-sm text-[#6b7280] hover:bg-[#f9fafb]"
                  >
                    {statusFilter || "Status"}
                    <IconChevronDown size={16} stroke={2} className="text-[#9ca3af]" />
                  </button>
                  {statusDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-[#e5e7eb] rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => { setStatusFilter(""); setStatusDropdownOpen(false); }}
                        className="w-full px-4 py-2 text-left text-sm text-[#374151] hover:bg-[#f9fafb]"
                      >
                        All Status
                      </button>
                      <button
                        onClick={() => { setStatusFilter("Active"); setStatusDropdownOpen(false); }}
                        className="w-full px-4 py-2 text-left text-sm text-[#374151] hover:bg-[#f9fafb]"
                      >
                        Active
                      </button>
                      <button
                        onClick={() => { setStatusFilter("Draft"); setStatusDropdownOpen(false); }}
                        className="w-full px-4 py-2 text-left text-sm text-[#374151] hover:bg-[#f9fafb]"
                      >
                        Draft
                      </button>
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
                    Template Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#4b5563]">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#4b5563]">
                    Created By
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#4b5563]">
                    Created On
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
                {mockTemplates.map((template) => (
                  <tr key={template.id} className="hover:bg-[#f9fafb] transition-colors">
                    <td className="px-6 py-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#111827]">
                          {template.name}
                        </p>
                        {template.description && (
                          <p className="text-sm text-[#6b7280] truncate max-w-[300px]">
                            {template.description}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${
                          template.type === "Standard"
                            ? "bg-[#f9fafb] text-[#6b7280] border-[#e5e7eb]"
                            : "bg-[#DBEAFE] text-[#3B82F6] border-[#93C5FD]"
                        }`}
                      >
                        {template.type}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${template.createdBy.bgColor} ${template.createdBy.textColor}`}
                        >
                          {template.createdBy.initials}
                        </div>
                        <span className="text-sm text-[#374151]">
                          {template.createdBy.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-[#6b7280] whitespace-nowrap">
                        {template.createdOn}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                          template.status === "Active"
                            ? "bg-[#dcfce7] text-[#16a34a]"
                            : "bg-[#fff7ed] text-[#ea580c]"
                        }`}
                      >
                        {template.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button className="p-1 text-[#9ca3af] hover:text-[#6b7280] hover:bg-[#f3f4f6] rounded">
                        <IconDotsVertical size={18} stroke={1.5} />
                      </button>
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
                {/* Pagination Controls */}
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
      </div>
    </div>
  );
}
