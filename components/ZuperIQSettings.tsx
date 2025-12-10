"use client";

import { useState } from "react";
import {
  IconHome,
  IconChevronRight,
} from "@tabler/icons-react";
import ProposalTemplatesTab from "./ProposalTemplatesTab";
import AddonsTab from "./settings/addons/AddonsTab";
import FormsTab from "./settings/authorization-forms/FormsTab";
import FormBuilder from "./settings/authorization-forms/FormBuilder";
import ServicePackagesTab from "./settings/service-packages/ServicePackagesTab";

type TabId = "proposal-templates" | "formula-library" | "service-packages" | "addons" | "authorization-forms";

interface Tab {
  id: TabId;
  label: string;
}

const tabs: Tab[] = [
  { id: "proposal-templates", label: "Proposal Templates" },
  { id: "formula-library", label: "Formula Library" },
  { id: "service-packages", label: "Service Packages" },
  { id: "addons", label: "Add-ons" },
  { id: "authorization-forms", label: "Authorization Forms" },
];

export default function ZuperIQSettings() {
  const [activeTab, setActiveTab] = useState<TabId>("proposal-templates");
  const [editingFormId, setEditingFormId] = useState<string | null | undefined>(undefined);

  // If editing a form, show the form builder full page
  if (editingFormId !== undefined) {
    return (
      <FormBuilder
        formId={editingFormId}
        onBack={() => setEditingFormId(undefined)}
      />
    );
  }

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
        {activeTab === "proposal-templates" && <ProposalTemplatesTab />}
        {activeTab === "formula-library" && (
          <div className="bg-white rounded-lg border border-[#e5e7eb] shadow-sm p-12 text-center">
            <p className="text-[#6B7280]">Formula Library content coming soon...</p>
          </div>
        )}
        {activeTab === "service-packages" && <ServicePackagesTab />}
        {activeTab === "addons" && <AddonsTab />}
        {activeTab === "authorization-forms" && (
          <FormsTab onEditForm={(formId) => setEditingFormId(formId)} />
        )}
      </div>
    </div>
  );
}

