"use client";

import { useSearchParams } from "next/navigation";
import ServicePackageSidePanel from "@/components/settings/service-packages/ServicePackageSidePanel";

export default function EditServicePackagePage() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("id");

  // In a real app, you would fetch the package data based on packageId
  // For now, we'll use mock data in the component

  return (
    <ServicePackageSidePanel
      isOpen={true}
      onClose={() => {}}
      packageData={null}
      fullPage={true}
    />
  );
}

