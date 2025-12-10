"use client";

import { useState } from "react";
import {
  IconSearch,
  IconChevronDown,
  IconClipboardList,
  IconBroadcast,
  IconMessage,
  IconBell,
  IconPlus,
} from "@tabler/icons-react";

export default function SettingsHeader() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="h-14 bg-white border-b border-[#e5e7eb] flex items-center justify-between px-4 sticky top-0 z-50">
      {/* Left section - Logo and New dropdown */}
      <div className="flex items-center gap-4">
        {/* ACME Logo - Using actual logo from the site */}
        <img
          src="https://s3.ap-south-1.amazonaws.com/staging.in.pro.zuper/attachments/6c287db0-ff7c-11e7-b3a8-29b417a4f3fa/c7b21304-2a04-4dc7-a3cf-213e8fb384f7.png"
          alt="Company Logo"
          className="h-8 object-contain"
        />

        {/* New Dropdown */}
        <button className="flex items-center gap-2 px-4 py-1.5 bg-white border border-[#d1d5db] rounded-lg text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
          <IconPlus size={16} stroke={2} />
          New
          <IconChevronDown size={16} stroke={2} />
        </button>
      </div>

      {/* Center section - Search */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <IconSearch
            size={18}
            stroke={1.5}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
          />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-sm placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
          />
        </div>
      </div>

      {/* Right section - Action icons */}
      <div className="flex items-center gap-1">
        {/* Clipboard with 99+ Badge */}
        <button className="relative p-2 text-[#6b7280] hover:text-[#374151] hover:bg-[#f3f4f6] rounded-lg">
          <IconClipboardList size={22} stroke={1.5} />
          <span className="absolute top-0 right-0 bg-[#4F47E5] text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
            99+
          </span>
        </button>

        {/* Broadcast */}
        <button className="p-2 text-[#6b7280] hover:text-[#374151] hover:bg-[#f3f4f6] rounded-lg">
          <IconBroadcast size={22} stroke={1.5} />
        </button>

        {/* Messages */}
        <button className="p-2 text-[#6b7280] hover:text-[#374151] hover:bg-[#f3f4f6] rounded-lg">
          <IconMessage size={22} stroke={1.5} />
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-[#6b7280] hover:text-[#374151] hover:bg-[#f3f4f6] rounded-lg">
          <IconBell size={22} stroke={1.5} />
          <span className="absolute top-0 right-0 bg-[#4F47E5] text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
            14
          </span>
        </button>

        {/* Profile Avatar */}
        <button className="ml-1 w-9 h-9 rounded-full overflow-hidden border-2 border-[#3B82F6]">
          <img
            src="https://s3.ap-south-1.amazonaws.com/staging.in.pro.zuper/attachments/6c287db0-ff7c-11e7-b3a8-29b417a4f3fa/c14ddee2-4392-4224-8dc6-473caf054345.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
