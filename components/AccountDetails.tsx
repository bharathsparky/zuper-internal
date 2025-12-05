"use client";

import { Pencil, Ban, Search, ChevronLeft, ChevronRight } from "lucide-react";

interface AccountDetailsProps {
  customer: {
    companyId: string;
    companyUid: string;
    companyName: string;
    companyLoginName: string;
    industryType: string;
    stage: string;
    companyEmail: string;
    companyPhone: string;
    companyAddress: string;
    country: string;
    timezone: string;
    companyCurrency: string;
    accountManager: string;
    accountCreatedOn: string;
    accountCreatedBy: string;
  };
}

export default function AccountDetails({ customer }: AccountDetailsProps) {
  const renderField = (label: string, value: string) => {
    return (
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-500">{value || "----"}</p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Account Details Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Account Details</h2>
          <div className="flex items-center gap-2">
            {/* Active Badge */}
            <span className="px-4 py-1 text-sm font-medium bg-green-50 text-green-600 rounded-full">
              Active
            </span>
            {/* Edit Button */}
            <button className="w-9 h-9 flex items-center justify-center text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors">
              <Pencil className="w-4 h-4" />
            </button>
            {/* Disable Button */}
            <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <Ban className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form Fields - Read Only Display */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-x-16 gap-y-6">
            {renderField("Company ID", customer.companyId)}
            {renderField("Company UID", customer.companyUid)}
            {renderField("Company Name", customer.companyName)}
            {renderField("Company Login Name", customer.companyLoginName)}
            {renderField("Industry type", customer.industryType)}
            {renderField("Stage", customer.stage)}
            {renderField("Company Email", customer.companyEmail)}
            {renderField("Company Phone", customer.companyPhone)}
            {renderField("Company Address", customer.companyAddress)}
            {renderField("Country", customer.country)}
            {renderField("Company Currency", customer.companyCurrency)}
            {renderField("Company Timezone", customer.timezone)}
            {renderField("Account Manager", customer.accountManager)}
            {renderField("Account Created On", customer.accountCreatedOn)}
            {renderField("Account Created By", customer.accountCreatedBy)}
          </div>
        </div>
      </div>

      {/* Assigned Coworkers Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Assigned Coworkers</h2>
            <span className="px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
              0
            </span>
          </div>
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Coworkers..."
              className="pl-9 pr-4 py-2 w-56 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Primary Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">
                  No data
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end px-6 py-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-slate-800 text-white rounded text-sm font-medium">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
