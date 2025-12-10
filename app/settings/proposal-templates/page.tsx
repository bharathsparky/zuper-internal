"use client";

import SettingsHeader from "@/components/SettingsHeader";
import SettingsSidebar from "@/components/SettingsSidebar";
import ZuperIQSettings from "@/components/ZuperIQSettings";

export default function ProposalTemplatesPage() {
  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <SettingsHeader />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SettingsSidebar />

        {/* Main Content */}
        <ZuperIQSettings />
      </div>
    </div>
  );
}
