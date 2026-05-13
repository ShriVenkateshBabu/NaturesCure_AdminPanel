import React from "react";
import AdminTopbar from "./AdminTopbar";
import Overview from "./Overview";
import Casesheet from "../components/CaseSheet";
import DietModule from "../components/DietModule";
import TestSupabase from "../components/TestSupabase";
const AdminDashBoard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminTopbar />

      {/* ACTION BUTTONS SECTION */}
      <div className="px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
            {/* CASE SHEET */}
            <div className="w-full sm:w-auto">
              <Casesheet />
            </div>

            {/* DIET MODULE */}
            <div className="w-full sm:w-auto">
              <DietModule />
            </div>
          </div>
        </div>
      </div>

      {/* OVERVIEW SECTION */}
      <div className="px-4 sm:px-6 lg:px-8 mt-6">
        <Overview />
      </div>
    </div>
  );
};

export default AdminDashBoard;
