"use client";

import { useState } from "react";
import {
  IconChevronLeft,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconHome,
  IconLayoutGrid,
  IconFileText,
  IconHelpCircle,
  IconBriefcase,
  IconUsers,
  IconBuilding,
  IconHome2,
  IconCalendar,
  IconBox,
  IconReceipt,
  IconFileDescription,
  IconWallet,
  IconApps,
  IconLogout,
} from "@tabler/icons-react";

export default function SettingsSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modulesExpanded, setModulesExpanded] = useState(true);

  const moduleItems = [
    { id: "projects", label: "Projects", icon: IconFileText },
    { id: "requests", label: "Requests", icon: IconHelpCircle },
    { id: "jobs", label: "Jobs", icon: IconBriefcase },
    { id: "customers", label: "Customers/Contacts", icon: IconUsers },
    { id: "organizations", label: "Organizations", icon: IconBuilding },
    { id: "properties", label: "Properties", icon: IconHome2 },
    { id: "timesheets", label: "Timesheets", icon: IconCalendar },
    { id: "parts-services", label: "Parts & Services", icon: IconBox },
    { id: "quotes-invoices", label: "Quotes & Invoices", icon: IconReceipt, active: true },
    { id: "contracts", label: "Contracts", icon: IconFileDescription },
  ];

  return (
    <aside className="w-[240px] bg-white border-r border-[#e5e7eb] flex flex-col h-full">
      {/* Back to Workspace */}
      <div className="px-4 py-3 border-b border-[#e5e7eb]">
        <button className="flex items-center gap-2 text-[#374151] hover:text-[#111827] text-sm font-medium">
          <IconChevronLeft size={16} stroke={2} />
          Back to Workspace
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <IconSearch
            size={16}
            stroke={1.5}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
          />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-sm placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {/* Home */}
        <div className="mb-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-[#6b7280] hover:bg-[#f3f4f6] rounded-lg text-sm font-medium">
            <IconHome size={20} stroke={1.5} />
            Home
          </button>
        </div>

        {/* Modules Section */}
        <div className="mb-1">
          <button
            onClick={() => setModulesExpanded(!modulesExpanded)}
            className="w-full flex items-center justify-between px-3 py-2.5 text-[#6b7280] hover:bg-[#f3f4f6] rounded-lg text-sm font-medium"
          >
            <div className="flex items-center gap-3">
              <IconLayoutGrid size={20} stroke={1.5} />
              Modules
            </div>
            {modulesExpanded ? (
              <IconChevronUp size={16} stroke={2} />
            ) : (
              <IconChevronDown size={16} stroke={2} />
            )}
          </button>

          {modulesExpanded && (
            <div className="mt-1 ml-4 space-y-0.5">
              {moduleItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                      item.active
                        ? "bg-[#DBEAFE] text-[#3B82F6] font-medium"
                        : "text-[#6b7280] hover:bg-[#f3f4f6]"
                    }`}
                  >
                    <Icon size={20} stroke={1.5} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-[#e5e7eb] px-3 py-2">
        {/* Zuper Pay */}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-[#6b7280] hover:bg-[#f3f4f6] rounded-lg text-sm font-medium">
          <IconWallet size={20} stroke={1.5} />
          Zuper Pay
        </button>

        {/* App Store */}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-[#6b7280] hover:bg-[#f3f4f6] rounded-lg text-sm font-medium">
          <IconApps size={20} stroke={1.5} />
          App Store
        </button>

        {/* Support */}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-[#6b7280] hover:bg-[#f3f4f6] rounded-lg text-sm font-medium">
          <IconHelpCircle size={20} stroke={1.5} />
          Support
        </button>
      </div>

      {/* User Profile */}
      <div className="border-t border-[#e5e7eb] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img
              src="https://s3.ap-south-1.amazonaws.com/staging.in.pro.zuper/attachments/6c287db0-ff7c-11e7-b3a8-29b417a4f3fa/c14ddee2-4392-4224-8dc6-473caf054345.jpg"
              alt="Ajith S"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#111827] truncate">
              Ajith S
            </p>
            <p className="text-xs text-[#6b7280] truncate">ajith.s@zuper.co</p>
          </div>
          <button className="p-1 text-[#9ca3af] hover:text-[#6b7280]">
            <IconLogout size={20} stroke={1.5} />
          </button>
        </div>
      </div>
    </aside>
  );
}
