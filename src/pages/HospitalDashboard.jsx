import { useState } from "react";
import {
  MdDashboard, MdPeople, MdLocalHospital, MdCalendarToday,
  MdApartment, MdManageAccounts, MdLocalPharmacy, MdBiotech,
  MdReceipt, MdBarChart, MdDirectionsCar, MdSettings, MdLogout,
  MdMenu, MdClose, MdSearch, MdNotifications, MdMessage,
  MdArrowDropDown, MdPersonAdd, MdBookOnline, MdSummarize,
  MdAdd, MdMoreVert, MdTrendingUp, MdTrendingDown, MdFiberManualRecord,
  MdCheckCircle, MdSchedule, MdWarning, MdCancelPresentation,
  MdBed, MdMonetizationOn, MdEmergency, MdVisibility, MdEdit, MdDelete,
  MdRefresh, MdKeyboardArrowRight, MdStar
} from "react-icons/md";
import { FaHeartbeat, FaUserMd, FaAmbulance, FaFlask, FaPills } from "react-icons/fa";

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const STATS = [
  { label: "Total Patients", value: "12,486", icon: <MdPeople />, change: "+8.2%", up: true, color: "from-cyan-500 to-teal-500", bg: "bg-cyan-50", text: "text-cyan-600" },
  { label: "Total Doctors", value: "248", icon: <FaUserMd />, change: "+3.1%", up: true, color: "from-emerald-500 to-green-500", bg: "bg-emerald-50", text: "text-emerald-600" },
  { label: "Appointments Today", value: "186", icon: <MdCalendarToday />, change: "+12.5%", up: true, color: "from-blue-500 to-indigo-500", bg: "bg-blue-50", text: "text-blue-600" },
  { label: "Revenue (₹)", value: "₹9,24,300", icon: <MdMonetizationOn />, change: "+5.7%", up: true, color: "from-violet-500 to-purple-500", bg: "bg-violet-50", text: "text-violet-600" },
  { label: "Emergency Cases", value: "14", icon: <MdEmergency />, change: "-2.3%", up: false, color: "from-rose-500 to-red-500", bg: "bg-rose-50", text: "text-rose-600" },
  { label: "Available Beds", value: "94 / 320", icon: <MdBed />, change: "+6 today", up: true, color: "from-amber-500 to-orange-500", bg: "bg-amber-50", text: "text-amber-600" },
];

const APPOINTMENTS = [
  { id: 1, patient: "Arjun Sharma", avatar: "AS", doctor: "Dr. Priya Nair", dept: "Cardiology", time: "09:00 AM", status: "Confirmed" },
  { id: 2, patient: "Meera Pillai", avatar: "MP", doctor: "Dr. Ramesh Kumar", dept: "Neurology", time: "09:45 AM", status: "In Progress" },
  { id: 3, patient: "Karthik Rajan", avatar: "KR", doctor: "Dr. Sunitha Menon", dept: "Orthopedics", time: "10:30 AM", status: "Waiting" },
  { id: 4, patient: "Divya Krishnan", avatar: "DK", doctor: "Dr. Anil Babu", dept: "Pediatrics", time: "11:15 AM", status: "Confirmed" },
  { id: 5, patient: "Suresh Nair", avatar: "SN", doctor: "Dr. Priya Nair", dept: "Cardiology", time: "12:00 PM", status: "Cancelled" },
  { id: 6, patient: "Lakshmi Devi", avatar: "LD", doctor: "Dr. Ramesh Kumar", dept: "Neurology", time: "02:30 PM", status: "Confirmed" },
];

const ACTIVITIES = [
  { icon: <MdPersonAdd />, color: "text-cyan-500 bg-cyan-50", text: "New patient Arjun Sharma registered", time: "5 min ago" },
  { icon: <MdCalendarToday />, color: "text-blue-500 bg-blue-50", text: "Appointment #1042 confirmed by Dr. Priya Nair", time: "18 min ago" },
  { icon: <MdLocalPharmacy />, color: "text-emerald-500 bg-emerald-50", text: "Pharmacy stock updated — Paracetamol refilled", time: "35 min ago" },
  { icon: <MdEmergency />, color: "text-rose-500 bg-rose-50", text: "Emergency case admitted to ICU Ward B", time: "1 hr ago" },
  { icon: <MdReceipt />, color: "text-violet-500 bg-violet-50", text: "Invoice #INV-2045 generated — ₹12,500", time: "2 hr ago" },
  { icon: <MdBiotech />, color: "text-amber-500 bg-amber-50", text: "Lab report for patient #4821 ready", time: "3 hr ago" },
];

const DOCTORS = [
  { name: "Dr. Priya Nair", dept: "Cardiology", status: "Available", patients: 12, rating: 4.9, avatar: "PN" },
  { name: "Dr. Ramesh Kumar", dept: "Neurology", status: "In Surgery", patients: 8, rating: 4.8, avatar: "RK" },
  { name: "Dr. Sunitha Menon", dept: "Orthopedics", status: "Available", patients: 10, rating: 4.7, avatar: "SM" },
  { name: "Dr. Anil Babu", dept: "Pediatrics", status: "On Leave", patients: 0, rating: 4.9, avatar: "AB" },
];

const QUICK_ACTIONS = [
  { label: "Add Patient", icon: <MdPersonAdd />, color: "from-cyan-500 to-teal-600", shadow: "shadow-cyan-200" },
  { label: "Book Appointment", icon: <MdBookOnline />, color: "from-blue-500 to-indigo-600", shadow: "shadow-blue-200" },
  { label: "Generate Report", icon: <MdSummarize />, color: "from-violet-500 to-purple-600", shadow: "shadow-violet-200" },
  { label: "Add Doctor", icon: <MdAdd />, color: "from-emerald-500 to-green-600", shadow: "shadow-emerald-200" },
];

const NAV_ITEMS = [
  { label: "Dashboard", icon: <MdDashboard />, active: true },
  { label: "Patients", icon: <MdPeople /> },
  { label: "Doctors", icon: <FaUserMd /> },
  { label: "Appointments", icon: <MdCalendarToday /> },
  { label: "Departments", icon: <MdApartment /> },
  { label: "Staff Management", icon: <MdManageAccounts /> },
  { label: "Pharmacy", icon: <MdLocalPharmacy /> },
  { label: "Laboratory", icon: <MdBiotech /> },
  { label: "Billing", icon: <MdReceipt /> },
  { label: "Reports", icon: <MdBarChart /> },
  { label: "Ambulance", icon: <FaAmbulance /> },
  { label: "Settings", icon: <MdSettings /> },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    Confirmed:    "bg-emerald-100 text-emerald-700 border border-emerald-200",
    "In Progress": "bg-blue-100 text-blue-700 border border-blue-200",
    Waiting:      "bg-amber-100 text-amber-700 border border-amber-200",
    Cancelled:    "bg-rose-100 text-rose-700 border border-rose-200",
    Available:    "bg-emerald-100 text-emerald-700",
    "In Surgery": "bg-blue-100 text-blue-700",
    "On Leave":   "bg-slate-100 text-slate-600",
  };
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${map[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
};

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ initials, size = "w-9 h-9", gradient = "from-teal-400 to-cyan-500" }) => (
  <div className={`${size} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
    {initials}
  </div>
);

// ─── Mini Chart Bar ───────────────────────────────────────────────────────────
const MiniBar = ({ h }) => (
  <div className="w-2 rounded-t-sm bg-current opacity-70 transition-all duration-300 hover:opacity-100" style={{ height: `${h}px` }} />
);

// ─── Sparkline Placeholder ────────────────────────────────────────────────────
const SparklineChart = ({ color }) => {
  const bars = [18, 28, 22, 35, 28, 42, 38, 50, 44, 58];
  return (
    <div className={`flex items-end gap-0.5 h-14 ${color}`}>
      {bars.map((h, i) => <MiniBar key={i} h={h} />)}
    </div>
  );
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }) => (
  <>
    {/* Mobile overlay */}
    {mobileOpen && (
      <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onMobileClose} />
    )}

    <aside
      className={`
        fixed top-0 left-0 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
        flex flex-col z-40 transition-all duration-300 ease-in-out shadow-2xl
        ${collapsed ? "w-[70px]" : "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-700/60">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/30">
          <FaHeartbeat className="text-white text-lg" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-white font-bold text-sm leading-tight">Nature's Cure</p>
            <p className="text-teal-400 text-[10px] font-medium tracking-widest uppercase">Hospital</p>
          </div>
        )}
        <button
          onClick={onToggle}
          className="ml-auto text-slate-400 hover:text-white transition-colors lg:flex hidden"
        >
          {collapsed ? <MdMenu className="text-xl" /> : <MdClose className="text-xl" />}
        </button>
        <button onClick={onMobileClose} className="ml-auto text-slate-400 hover:text-white lg:hidden">
          <MdClose className="text-xl" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5 scrollbar-thin">
        {NAV_ITEMS.map(({ label, icon, active }) => (
          <button
            key={label}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
              ${active
                ? "bg-gradient-to-r from-teal-500/20 to-cyan-500/10 text-teal-400 border border-teal-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"}
            `}
          >
            <span className={`text-xl shrink-0 ${active ? "text-teal-400" : "text-slate-500 group-hover:text-slate-300"}`}>
              {icon}
            </span>
            {!collapsed && <span className="truncate">{label}</span>}
            {!collapsed && active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400" />}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-slate-700/60">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all text-sm font-medium group">
          <MdLogout className="text-xl shrink-0 group-hover:text-rose-400" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  </>
);

// ─── Topbar ───────────────────────────────────────────────────────────────────
const Topbar = ({ collapsed, onMobileMenuOpen }) => {
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  return (
    <header className="fixed top-0 right-0 left-0 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 z-20 flex items-center px-4 gap-4 shadow-sm"
      style={{ left: typeof window !== "undefined" && window.innerWidth >= 1024 ? (collapsed ? "70px" : "256px") : 0 }}
    >
      {/* Mobile menu */}
      <button onClick={onMobileMenuOpen} className="lg:hidden text-slate-500 hover:text-teal-600 transition-colors">
        <MdMenu className="text-2xl" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          <input
            type="text"
            placeholder="Search patients, doctors, appointments…"
            className="w-full pl-9 pr-4 py-2 bg-slate-100 rounded-xl text-sm text-slate-700 placeholder-slate-400 border border-transparent focus:border-teal-400 focus:bg-white focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="hidden md:block text-xs text-slate-400 whitespace-nowrap">{today}</div>

      {/* Icons */}
      <div className="flex items-center gap-1">
        <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-teal-600 transition-all">
          <MdNotifications className="text-xl" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white" />
        </button>
        <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-teal-600 transition-all">
          <MdMessage className="text-xl" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border border-white" />
        </button>
      </div>

      {/* Profile */}
      <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-100 transition-all">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow">
          AD
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-xs font-semibold text-slate-700">Admin</p>
          <p className="text-[10px] text-slate-400">Super Admin</p>
        </div>
        <MdArrowDropDown className="text-slate-400" />
      </button>
    </header>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon, change, up, color, bg, text }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl ${bg} ${text} flex items-center justify-center text-2xl transition-transform duration-200 group-hover:scale-110`}>
        {icon}
      </div>
      <span className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
        {up ? <MdTrendingUp /> : <MdTrendingDown />} {change}
      </span>
    </div>
    <p className="text-2xl font-bold text-slate-800 mb-1">{value}</p>
    <p className="text-xs text-slate-500 font-medium">{label}</p>
    <div className={`mt-3 h-0.5 rounded-full bg-gradient-to-r ${color} opacity-60`} />
  </div>
);

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function HospitalDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("today");

  const sidebarWidth = collapsed ? "lg:ml-[70px]" : "lg:ml-64";

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(p => !p)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main area */}
      <div className={`${sidebarWidth} transition-all duration-300`}>
        {/* Topbar */}
        <Topbar collapsed={collapsed} onMobileMenuOpen={() => setMobileOpen(true)} />

        {/* Content */}
        <main className="pt-16 min-h-screen">
          <div className="p-5 md:p-6 space-y-6">

            {/* ── Welcome Banner ── */}
            <div className="relative overflow-hidden bg-gradient-to-r from-slate-800 via-teal-800 to-cyan-800 rounded-2xl p-6 shadow-xl">
              {/* Decorative blobs */}
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-teal-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 right-24 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl" />
              <div className="absolute top-4 right-4 opacity-10">
                <FaHeartbeat className="text-8xl text-white" />
              </div>

              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-teal-300 text-sm font-medium mb-1">Welcome back 👋</p>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Good Morning, Admin</h1>
                  <p className="text-slate-300 text-sm max-w-md">
                    Nature's Cure Hospital is operating smoothly. You have <span className="text-teal-300 font-semibold">186 appointments</span> and <span className="text-rose-300 font-semibold">14 emergency cases</span> today.
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium rounded-xl transition-all flex items-center gap-2">
                    <MdRefresh /> Refresh
                  </button>
                  <button className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-teal-500/30 flex items-center gap-2">
                    <MdBarChart /> View Reports
                  </button>
                </div>
              </div>
            </div>

            {/* ── Stats Grid ── */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
              {STATS.map(s => <StatCard key={s.label} {...s} />)}
            </div>

            {/* ── Quick Actions ── */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {QUICK_ACTIONS.map(({ label, icon, color, shadow }) => (
                  <button
                    key={label}
                    className={`bg-gradient-to-r ${color} text-white rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-lg ${shadow} hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 font-medium text-sm`}
                  >
                    <span className="text-xl bg-white/20 p-1.5 rounded-lg">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Middle Row: Appointments + Activity ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

              {/* Appointments Table */}
              <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                  <div>
                    <h2 className="font-bold text-slate-800">Today's Appointments</h2>
                    <p className="text-xs text-slate-400 mt-0.5">186 total appointments scheduled</p>
                  </div>
                  <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg">
                    {["today", "week", "month"].map(t => (
                      <button key={t} onClick={() => setActiveTab(t)}
                        className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-all ${activeTab === t ? "bg-white text-teal-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="text-left text-[11px] text-slate-400 font-semibold px-5 py-3 uppercase tracking-wide">#</th>
                        <th className="text-left text-[11px] text-slate-400 font-semibold px-3 py-3 uppercase tracking-wide">Patient</th>
                        <th className="text-left text-[11px] text-slate-400 font-semibold px-3 py-3 uppercase tracking-wide hidden md:table-cell">Doctor</th>
                        <th className="text-left text-[11px] text-slate-400 font-semibold px-3 py-3 uppercase tracking-wide hidden sm:table-cell">Time</th>
                        <th className="text-left text-[11px] text-slate-400 font-semibold px-3 py-3 uppercase tracking-wide">Status</th>
                        <th className="text-left text-[11px] text-slate-400 font-semibold px-3 py-3 uppercase tracking-wide">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {APPOINTMENTS.map((apt, i) => (
                        <tr key={apt.id} className="hover:bg-slate-50/70 transition-colors group">
                          <td className="px-5 py-3.5 text-slate-400 text-xs">{String(i + 1).padStart(2, "0")}</td>
                          <td className="px-3 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <Avatar initials={apt.avatar} size="w-8 h-8" gradient="from-teal-400 to-cyan-500" />
                              <div>
                                <p className="font-semibold text-slate-700 text-sm">{apt.patient}</p>
                                <p className="text-xs text-slate-400">{apt.dept}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-3.5 text-slate-600 text-sm hidden md:table-cell">{apt.doctor}</td>
                          <td className="px-3 py-3.5 text-slate-500 text-sm hidden sm:table-cell">
                            <span className="flex items-center gap-1.5"><MdSchedule className="text-slate-400" />{apt.time}</span>
                          </td>
                          <td className="px-3 py-3.5"><StatusBadge status={apt.status} /></td>
                          <td className="px-3 py-3.5">
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"><MdVisibility className="text-sm" /></button>
                              <button className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-500 transition-colors"><MdEdit className="text-sm" /></button>
                              <button className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 transition-colors"><MdDelete className="text-sm" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-xs text-slate-400">Showing 6 of 186 appointments</p>
                  <button className="text-xs text-teal-600 font-semibold hover:underline flex items-center gap-1">View All <MdKeyboardArrowRight /></button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                <div className="px-5 py-4 border-b border-slate-100">
                  <h2 className="font-bold text-slate-800">Recent Activities</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Live hospital updates</p>
                </div>
                <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
                  {ACTIVITIES.map((a, i) => (
                    <div key={i} className="flex gap-3 px-5 py-4 hover:bg-slate-50/60 transition-colors">
                      <div className={`w-9 h-9 rounded-xl ${a.color} flex items-center justify-center text-base shrink-0`}>
                        {a.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 leading-snug">{a.text}</p>
                        <p className="text-[11px] text-slate-400 mt-1">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 border-t border-slate-100">
                  <button className="text-xs text-teal-600 font-semibold hover:underline flex items-center gap-1">View All Activity <MdKeyboardArrowRight /></button>
                </div>
              </div>
            </div>

            {/* ── Bottom Row: Doctors + Chart ── */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

              {/* Doctor Availability */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                  <div>
                    <h2 className="font-bold text-slate-800">Doctor Availability</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Today's shift status</p>
                  </div>
                  <button className="text-xs text-teal-600 font-semibold flex items-center gap-1 hover:underline">All Doctors <MdKeyboardArrowRight /></button>
                </div>
                <div className="divide-y divide-slate-50">
                  {DOCTORS.map((doc, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/60 transition-colors group">
                      <div className="relative">
                        <Avatar initials={doc.avatar} size="w-11 h-11" gradient={
                          doc.status === "Available" ? "from-emerald-400 to-teal-500" :
                          doc.status === "In Surgery" ? "from-blue-400 to-indigo-500" :
                          "from-slate-400 to-slate-500"
                        } />
                        <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                          doc.status === "Available" ? "bg-emerald-500" :
                          doc.status === "In Surgery" ? "bg-blue-500" : "bg-slate-400"
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 text-sm">{doc.name}</p>
                        <p className="text-xs text-slate-400">{doc.dept}</p>
                      </div>
                      <div className="text-center hidden sm:block">
                        <p className="text-sm font-bold text-slate-700">{doc.patients}</p>
                        <p className="text-[10px] text-slate-400">patients</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 hidden sm:flex">
                        <MdStar className="text-sm" />
                        <span className="text-xs font-semibold text-slate-600">{doc.rating}</span>
                      </div>
                      <StatusBadge status={doc.status} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue / Chart Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                  <div>
                    <h2 className="font-bold text-slate-800">Revenue Overview</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Monthly performance</p>
                  </div>
                  <span className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                    <MdTrendingUp /> +5.7% this month
                  </span>
                </div>
                <div className="px-5 py-4 space-y-4">
                  {/* Revenue cards */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "OPD", value: "₹3.2L", color: "text-cyan-500" },
                      { label: "IPD", value: "₹4.8L", color: "text-teal-500" },
                      { label: "Lab", value: "₹1.4L", color: "text-blue-500" },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="bg-slate-50 rounded-xl p-3 text-center">
                        <p className={`text-base font-bold ${color}`}>{value}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Bar chart visualization */}
                  <div className="bg-gradient-to-br from-slate-50 to-teal-50/50 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-3">Monthly trend (Apr → Oct)</p>
                    <div className="flex items-end justify-around gap-1 h-24">
                      {[
                        { h: 55, m: "Apr", c: "bg-teal-200" },
                        { h: 68, m: "May", c: "bg-teal-300" },
                        { h: 72, m: "Jun", c: "bg-teal-400" },
                        { h: 60, m: "Jul", c: "bg-teal-300" },
                        { h: 80, m: "Aug", c: "bg-teal-500" },
                        { h: 78, m: "Sep", c: "bg-teal-400" },
                        { h: 92, m: "Oct", c: "bg-teal-600" },
                      ].map(({ h, m, c }) => (
                        <div key={m} className="flex flex-col items-center gap-1 flex-1">
                          <div className={`w-full ${c} rounded-t-lg transition-all duration-500 hover:opacity-80`} style={{ height: `${h}%` }} />
                          <span className="text-[10px] text-slate-400">{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress metrics */}
                  {[
                    { label: "Bed Occupancy", pct: 71, color: "bg-gradient-to-r from-teal-400 to-cyan-500" },
                    { label: "OPD Target", pct: 84, color: "bg-gradient-to-r from-blue-400 to-indigo-500" },
                    { label: "Staff Attendance", pct: 93, color: "bg-gradient-to-r from-emerald-400 to-green-500" },
                  ].map(({ label, pct, color }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs text-slate-600 mb-1">
                        <span className="font-medium">{label}</span>
                        <span className="font-bold">{pct}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="text-center py-4 text-xs text-slate-400">
              © 2025 Nature's Cure Hospital Management System · All rights reserved
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}