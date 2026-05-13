import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CalendarDays,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";

export default function AdminTopbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/staff/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/90 backdrop-blur-xl shadow-lg">
      <div className="px-4 sm:px-6 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 border border-white/10">
              <ShieldCheck className="text-white" size={24} />
            </div>

            {/* Online Indicator */}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-slate-950 animate-pulse"></span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-white text-lg sm:text-xl font-bold tracking-wide">
              Dr. Maha Admin
            </h1>

            <p className="text-slate-400 text-xs sm:text-sm">
              Nature Cure Management Panel
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap items-center gap-3 justify-between lg:justify-end">
          {/* Profile Card */}
          <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-2xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold shadow-md">
              AD
            </div>

            <div className="hidden sm:block">
              <p className="text-white text-sm font-semibold leading-none">
                Administrator
              </p>
              <span className="text-green-400 text-xs">Online</span>
            </div>
          </div>

          {/* Dashboard */}
          <button
            onClick={() => navigate("/admin/dashboard")}
            className={`group flex items-center gap-2 text-sm px-4 py-2 rounded-2xl transition-all duration-300 border
            ${
              isActive("/admin/dashboard")
                ? "bg-white text-slate-900 border-white shadow-lg shadow-white/20"
                : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
            }`}
          >
            <LayoutDashboard
              size={17}
              className="group-hover:scale-110 transition"
            />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

         {/* {/* Patients */}
          <button
            onClick={() => navigate("/admin/patientslist")}
            className={`group flex items-center gap-2 text-sm px-4 py-2 rounded-2xl transition-all duration-300 border
            ${
              isActive("/admin/patientslist")
                ? "bg-white text-slate-900 border-white shadow-lg shadow-white/20"
                : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
            }`}
          >
            <LayoutDashboard
              size={17}
              className="group-hover:scale-110 transition"
            />
            <span className="hidden sm:inline">Patients List</span>
          </button>

          {/* Appointments */}
          <button
            onClick={() => navigate("/admin/appointments")}
            className={`group flex items-center gap-2 text-sm px-4 py-2 rounded-2xl transition-all duration-300 border
            ${
              isActive("/admin/appointments")
                ? "bg-white text-slate-900 border-white shadow-lg shadow-white/20"
                : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
            }`}
          >
            <CalendarDays
              size={17}
              className="group-hover:scale-110 transition"
            />
            <span className="hidden sm:inline">Appointments</span>
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="group flex items-center gap-2 text-sm px-4 py-2 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-400/20 text-red-300 transition-all duration-300"
          >
            <LogOut
              size={17}
              className="group-hover:rotate-12 transition"
            />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
}