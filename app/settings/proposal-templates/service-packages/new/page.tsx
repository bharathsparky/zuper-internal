"use client";

import ServicePackageSidePanel from "@/components/settings/service-packages/ServicePackageSidePanel";

// Empty package data for creating new
const emptyPackage = {
  id: "",
  name: "",
  description: "",
  remarks: "",
  total: 0,
  partsServices: [],
  profitMargin: 0,
  materialCost: 0,
  laborCost: 0,
  cogs: 0,
};

export default function NewServicePackagePage() {
  return (
    <ServicePackageSidePanel
      isOpen={true}
      onClose={() => {}}
      packageData={emptyPackage as any}
      fullPage={true}
    />
  );
}

