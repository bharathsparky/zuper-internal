"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ServicePackageSidePanel from "@/components/settings/service-packages/ServicePackageSidePanel";

function EditServicePackageContent() {
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

export default function EditServicePackagePage() {
  return (
    <Suspense fallback={<div className="w-full h-full bg-[#F1F5F9] flex items-center justify-center">Loading...</div>}>
      <EditServicePackageContent />
    </Suspense>
  );
}
