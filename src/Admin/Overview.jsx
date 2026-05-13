import React from "react";
import {
  CalendarDays,
  Users,
  Activity,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const stats = [
  {
    num: "120",
    label: "Total Patients",
    badge: "+12%",
    badgeClass: "bg-green-100 text-green-700",
    icon: <Users size={20} />,
  },
  {
    num: "18",
    label: "Appointments",
    badge: "Today",
    badgeClass: "bg-blue-100 text-blue-700",
    icon: <CalendarDays size={20} />,
  },
  {
    num: "92%",
    label: "Recovery Rate",
    badge: "Excellent",
    badgeClass: "bg-purple-100 text-purple-700",
    icon: <Activity size={20} />,
  },
  {
    num: "24",
    label: "Completed",
    badge: "Updated",
    badgeClass: "bg-orange-100 text-orange-700",
    icon: <BadgeCheck size={20} />,
  },
];

const todayAppointments = [
  {
    patient: "Ravi Kumar",
    time: "10:30 AM",
    type: "Consultation",
    status: "Confirmed",
    statusClass: "bg-green-100 text-green-700",
  },
  {
    patient: "Priya Sharm",
    time: "12:00 PM",
    type: "Therapy",
    status: "Pending",
    statusClass: "bg-yellow-100 text-yellow-700",
  },
];

export default function Overview({ onViewAll }) {
  const navigate = useNavigate();
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-1.5 rounded-full bg-gradient-to-b from-emerald-500 to-cyan-500"></div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
              <span className="bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">
                Naturecure
              </span>{" "}
              Dashboard
            </h1>
          </div>

          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Welcome back! Here's your clinic summary today.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-3 rounded-2xl shadow-lg">
          <p className="text-xs opacity-80">Today's Date</p>
          <h3 className="font-semibold text-lg">
            {new Date().toLocaleDateString()}
          </h3>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <div
            key={i}
            className="group relative overflow-hidden bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition"></div>

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900">{s.num}</p>

                <p className="text-sm text-slate-500 mt-1">{s.label}</p>
              </div>

              <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700">
                {s.icon}
              </div>
            </div>

            <div className="relative mt-5 flex items-center justify-between">
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold ${s.badgeClass}`}
              >
                {s.badge}
              </span>

              <ArrowRight
                size={16}
                className="text-slate-400 group-hover:translate-x-1 transition"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Appointment Card */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 sm:px-7 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
              Today's Appointments
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Manage patient schedules and appointments
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/appointments")}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm px-4 py-2 rounded-xl transition"
          >
            View All
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-sm">
                <th className="text-left px-7 py-4 font-semibold text-slate-500">
                  Patient
                </th>

                <th className="text-left px-7 py-4 font-semibold text-slate-500">
                  Time
                </th>

                <th className="text-left px-7 py-4 font-semibold text-slate-500">
                  Type
                </th>

                <th className="text-left px-7 py-4 font-semibold text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {todayAppointments.map((a, i) => (
                <tr
                  key={i}
                  className="border-t border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="px-7 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 text-white flex items-center justify-center text-sm font-bold">
                        {a.patient[0]}
                      </div>

                      <span className="font-medium text-slate-800">
                        {a.patient}
                      </span>
                    </div>
                  </td>

                  <td className="px-7 py-5 text-slate-600">{a.time}</td>

                  <td className="px-7 py-5">
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-xs font-medium">
                      {a.type}
                    </span>
                  </td>

                  <td className="px-7 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${a.statusClass}`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {todayAppointments.length === 0 && (
            <div className="py-16 text-center text-slate-400">
              No appointments scheduled today
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-4">
          {todayAppointments.length === 0 && (
            <div className="text-center py-10 text-slate-400">
              No appointments today
            </div>
          )}

          {todayAppointments.map((a, i) => (
            <div
              key={i}
              className="border border-slate-200 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 text-white flex items-center justify-center font-bold">
                    {a.patient[0]}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {a.patient}
                    </h3>

                    <p className="text-sm text-slate-500">{a.time}</p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${a.statusClass}`}
                >
                  {a.status}
                </span>
              </div>

              <div className="mt-4">
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-xs font-medium">
                  {a.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
