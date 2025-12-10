"use client";

import { useRouter } from "next/navigation";
import AddonsSidePanel from "@/components/settings/addons/AddonsSidePanel";

export default function NewAddonPage() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen bg-white">
      <AddonsSidePanel
        isOpen={true}
        onClose={() => router.back()}
        addon={null}
        fullPage={true}
      />
    </div>
  );
}

