"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconPlus,
  IconFilter,
  IconSearch,
  IconGripVertical,
  IconPencil,
  IconBan,
  IconCopy,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconChevronDown,
} from "@tabler/icons-react";

interface ServicePackage {
  id: string;
  name: string;
  total: number;
  createdBy: {
    name: string;
    initials: string;
    bgColor: string;
    textColor: string;
  };
  createdAt: string;
  status: "Active" | "Inactive";
}

const mockServicePackages: ServicePackage[] = [
  {
    id: "1",
    name: "Testing of Parts",
    total: 5708.00,
    createdBy: { name: "Mark Alan", initials: "M", bgColor: "bg-[#e0f2fe]", textColor: "text-[#0284c7]" },
    createdAt: "09/07/2023 06:51 PM",
    status: "Active",
  },
  {
    id: "2",
    name: "Vicky's Package",
    total: 1920.00,
    createdBy: { name: "Vasanth K", initials: "V", bgColor: "bg-[#ede9fe]", textColor: "text-[#7c3aed]" },
    createdAt: "08/16/2023 04:11 PM",
    status: "Active",
  },
  {
    id: "3",
    name: "Custom Roofing Bundle",
    total: 941.60,
    createdBy: { name: "Marlon S A", initials: "M", bgColor: "bg-[#e0f2fe]", textColor: "text-[#0284c7]" },
    createdAt: "09/07/2023 06:12 PM",
    status: "Active",
  },
  {
    id: "4",
    name: "Package Premium",
    total: 1630.40,
    createdBy: { name: "Sesha Madhav", initials: "S", bgColor: "bg-[#ede9fe]", textColor: "text-[#7c3aed]" },
    createdAt: "08/24/2023 03:12 PM",
    status: "Active",
  },
  {
    id: "5",
    name: "Parts Bundle Pro",
    total: 5800.00,
    createdBy: { name: "Sesha Madhav", initials: "S", bgColor: "bg-[#ede9fe]", textColor: "text-[#7c3aed]" },
    createdAt: "05/24/2024 05:00 PM",
    status: "Active",
  },
  {
    id: "6",
    name: "Package Standard",
    total: 309.06,
    createdBy: { name: "Sesha Madhav", initials: "S", bgColor: "bg-[#ede9fe]", textColor: "text-[#7c3aed]" },
    createdAt: "08/31/2023 11:49 AM",
    status: "Active",
  },
  {
    id: "7",
    name: "Bug Fix Package",
    total: 2081.00,
    createdBy: { name: "Sushil S", initials: "S", bgColor: "bg-[#ede9fe]", textColor: "text-[#7c3aed]" },
    createdAt: "09/27/2023 11:11 AM",
    status: "Active",
  },
  {
    id: "8",
    name: "HVAC Installation Kit",
    total: 3250.00,
    createdBy: { name: "Guru Prasath", initials: "G", bgColor: "bg-[#dcfce7]", textColor: "text-[#16a34a]" },
    createdAt: "10/15/2023 02:30 PM",
    status: "Active",
  },
  {
    id: "9",
    name: "Plumbing Essentials",
    total: 875.50,
    createdBy: { name: "Mark Cooper", initials: "M", bgColor: "bg-[#e0f2fe]", textColor: "text-[#0284c7]" },
    createdAt: "11/02/2023 09:45 AM",
    status: "Inactive",
  },
  {
    id: "10",
    name: "Electrical Upgrade Pack",
    total: 4125.00,
    createdBy: { name: "Vasanth K", initials: "V", bgColor: "bg-[#ede9fe]", textColor: "text-[#7c3aed]" },
    createdAt: "11/20/2023 04:20 PM",
    status: "Active",
  },
];

interface ServicePackagesTabProps {
  onCreatePackage?: () => void;
}

export default function ServicePackagesTab({ onCreatePackage }: ServicePackagesTabProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [goToPage, setGoToPage] = useState("1");

  const totalPackages = mockServicePackages.length;
  const totalPages = Math.ceil(totalPackages / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const packages = mockServicePackages.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setGoToPage(page.toString());
    }
  };

  const handleGoToPage = () => {
    const page = parseInt(goToPage);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCreatePackage = () => {
    if (onCreatePackage) {
      onCreatePackage();
    } else {
      router.push("/settings/proposal-templates/service-packages/new");
    }
  };

  const getStatusBadgeColor = (status: "Active" | "Inactive") => {
    return status === "Active"
      ? "bg-[#D1FAE5] text-[#059669] border border-[#6EE7B7]"
      : "bg-[#F3F4F6] text-[#6B7280] border border-[#D1D5DB]";
  };

  return (
    <div className="bg-white rounded-lg border border-[#e5e7eb] shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[#111827]">
          Service Packages ({totalPackages})
        </h1>
        <button
          onClick={handleCreatePackage}
          className="flex items-center gap-2 px-4 py-1.5 bg-white border border-[#d1d5db] rounded-lg text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors"
        >
          <IconPlus size={16} stroke={2} />
          New Service Package
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
                Status
                <IconChevronDown size={16} stroke={2} className="text-[#9ca3af]" />
              </button>
              {statusDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-[#e5e7eb] rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => setStatusDropdownOpen(false)}
                    className="w-full text-left px-4 py-2 text-sm text-[#374151] hover:bg-[#f9fafb] rounded-t-lg"
                  >
                    All
                  </button>
                  <button
                    onClick={() => setStatusDropdownOpen(false)}
                    className="w-full text-left px-4 py-2 text-sm text-[#374151] hover:bg-[#f9fafb]"
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setStatusDropdownOpen(false)}
                    className="w-full text-left px-4 py-2 text-sm text-[#374151] hover:bg-[#f9fafb] rounded-b-lg"
                  >
                    Inactive
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <IconSearch size={18} stroke={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-1.5 w-64 border border-[#d1d5db] rounded-lg text-sm placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6b7280] w-16">#</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6b7280]">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6b7280] w-28">Total</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6b7280] w-28">Created By</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6b7280] w-44">Created At</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6b7280] w-24">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6b7280] w-28">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3f4f6]">
            {packages.map((pkg, index) => (
              <tr key={pkg.id} className="hover:bg-[#f9fafb] transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <IconGripVertical size={16} className="text-[#d1d5db] cursor-grab" />
                    <span className="text-sm text-[#6b7280]">{startIndex + index + 1}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <button 
                    onClick={() => router.push(`/settings/proposal-templates/service-packages/edit?id=${pkg.id}`)}
                    className="text-sm font-medium text-[#111827] hover:text-[#3B82F6] hover:underline text-left transition-colors"
                  >
                    {pkg.name}
                  </button>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-[#111827]">${pkg.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center justify-center w-6 h-6 text-xs font-medium rounded-full ${pkg.createdBy.bgColor} ${pkg.createdBy.textColor}`}>
                      {pkg.createdBy.initials}
                    </span>
                    <span className="text-sm text-[#6b7280] truncate max-w-[60px]">{pkg.createdBy.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-[#6b7280]">{pkg.createdAt}</span>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(pkg.status)}`}>
                    {pkg.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => router.push(`/settings/proposal-templates/service-packages/edit?id=${pkg.id}`)}
                      className="p-1.5 text-[#9ca3af] hover:text-[#6b7280] hover:bg-[#f3f4f6] rounded transition-colors"
                    >
                      <IconPencil size={16} stroke={1.5} />
                    </button>
                    <button className="p-1.5 text-[#9ca3af] hover:text-[#ef4444] hover:bg-[#fef2f2] rounded transition-colors">
                      <IconBan size={16} stroke={1.5} />
                    </button>
                    <button className="p-1.5 text-[#9ca3af] hover:text-[#6b7280] hover:bg-[#f3f4f6] rounded transition-colors">
                      <IconCopy size={16} stroke={1.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-[#e5e7eb] flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-[#6b7280]">
          <span>Items per page</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-[#d1d5db] rounded-lg px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-1" aria-label="Pagination">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="p-1.5 text-[#6b7280] hover:bg-[#f3f4f6] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconChevronsLeft size={18} stroke={1.5} />
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 text-[#6b7280] hover:bg-[#f3f4f6] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconChevronLeft size={18} stroke={1.5} />
            </button>
            <span className="px-3 py-1.5 text-sm text-[#374151]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 text-[#6b7280] hover:bg-[#f3f4f6] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconChevronRight size={18} stroke={1.5} />
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1.5 text-[#6b7280] hover:bg-[#f3f4f6] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconChevronsRight size={18} stroke={1.5} />
            </button>
          </nav>

          <div className="flex items-center gap-2 text-sm text-[#6b7280]">
            <span>Go to:</span>
            <input
              type="text"
              value={goToPage}
              onChange={(e) => setGoToPage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGoToPage()}
              onBlur={handleGoToPage}
              className="w-12 px-2 py-1 border border-[#d1d5db] rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

