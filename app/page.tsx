"use client";

import { useState } from "react";
import Header from "@/components/Header";
import CustomerSidebar from "@/components/CustomerSidebar";
import AccountDetails from "@/components/AccountDetails";
import Subscription from "@/components/Subscription";
import Footer from "@/components/Footer";

// Mock customer data - matching the original screenshot
const mockCustomer = {
  name: "Sparky Roofing",
  createdDate: "01 Nov, 2024",
  companyId: "2500013",
  companyUid: "8b64e1c9-d445-49e2-b373-247434e688ca",
  companyName: "Sparky Roofing",
  companyLoginName: "sparky",
  industryType: "",
  stage: "",
  companyEmail: "bharath.s@zuper.co",
  companyPhone: "",
  companyAddress: "zupersoft",
  country: "United States",
  timezone: "(GMT+05:30) India Standard Time",
  companyCurrency: "United States dollar ($)",
  accountManager: "",
  accountCreatedOn: "2024-11-01",
  accountCreatedBy: "",
};

export default function CustomerDetailsPage() {
  const [activeTab, setActiveTab] = useState("account-details");

  const renderContent = () => {
    switch (activeTab) {
      case "account-details":
        return <AccountDetails customer={mockCustomer} />;
      case "subscription":
        return <Subscription />;
      case "users":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center text-gray-500">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Users</h3>
              <p className="text-sm">User management content will appear here.</p>
            </div>
          </div>
        );
      case "module-access":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center text-gray-500">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Module Access</h3>
              <p className="text-sm">Module access configuration will appear here.</p>
            </div>
          </div>
        );
      case "policy":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center text-gray-500">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Policy</h3>
              <p className="text-sm">Policy settings will appear here.</p>
            </div>
          </div>
        );
      case "zuper-pay":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center text-gray-500">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Zuper Pay</h3>
              <p className="text-sm">Zuper Pay configuration will appear here.</p>
            </div>
          </div>
        );
      case "credentials":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center text-gray-500">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Credentials</h3>
              <p className="text-sm">Credentials management will appear here.</p>
            </div>
          </div>
        );
      case "notes":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center text-gray-500">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Notes</h3>
              <p className="text-sm">Customer notes will appear here.</p>
            </div>
          </div>
        );
      case "insights":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center text-gray-500">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Insights</h3>
              <p className="text-sm">Customer insights will appear here.</p>
            </div>
          </div>
        );
      case "activity":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center text-gray-500">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Activity</h3>
              <p className="text-sm">Customer activity log will appear here.</p>
            </div>
          </div>
        );
      default:
        return <AccountDetails customer={mockCustomer} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      {/* Main content - elevated cards that overlap header */}
      <main className="flex-1 relative -mt-6">
        <div className="mx-auto max-w-[1400px] w-full px-6 lg:px-12 pb-8">
          <div className="flex gap-5 items-start">
            {/* Sidebar - Fixed width */}
            <div className="w-[280px] flex-shrink-0">
              <CustomerSidebar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                customer={{
                  name: mockCustomer.name,
                  createdDate: mockCustomer.createdDate,
                }}
                subscriptionStatus="active"
              />
            </div>

            {/* Main Content - Flexible width */}
            <div className="flex-1 min-w-0">{renderContent()}</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
