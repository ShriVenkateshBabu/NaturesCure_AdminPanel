import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  UserRound,
  BadgeCheck,
  XCircle,
  Eye,
} from "lucide-react";

import AdminTopbar from "./AdminTopbar";

const appointmentsData = [
  {
    id: "APT-1001",
    patient: "Arun Kumar",
    doctor: "Dr. Mahalakshmi",
    email: "arun@gmail.com",
    phone: "+91 9876543210",
    date: "13 May 2026",
    time: "10:00 AM",
    type: "Consultation",
    status: "Confirmed",
  },
  {
    id: "APT-1002",
    patient: "Priya Sharma",
    doctor: "Dr. Mahalakshmi",
    email: "priya@gmail.com",
    phone: "+91 9123456789",
    date: "14 May 2026",
    time: "11:30 AM",
    type: "Therapy",
    status: "Pending",
  },
  {
    id: "APT-1003",
    patient: "Rahul Das",
    doctor: "Dr. Mahalakshmi",
    email: "rahul@gmail.com",
    phone: "+91 9988776655",
    date: "15 May 2026",
    time: "03:15 PM",
    type: "Follow Up",
    status: "Completed",
  },
];

const statusStyles = {
  Confirmed:
    "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Pending: "bg-amber-100 text-amber-700 border border-amber-200",
  Completed: "bg-slate-200 text-slate-700 border border-slate-300",
  Cancelled: "bg-red-100 text-red-600 border border-red-200",
};

export default function AppointmentView() {
  const [appointments, setAppointments] = useState(appointmentsData);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch = `${appointment.patient} ${appointment.type} ${appointment.status}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        selectedStatus === "All" ||
        appointment.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, search, selectedStatus]);

  const cancelAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "Cancelled" }
          : appointment
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminTopbar />

      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Appointment Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage patient appointments and schedules efficiently
            </p>
          </div>

          <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white px-5 py-3 rounded-2xl shadow-lg transition-all duration-200 text-sm font-medium">
            <Plus size={18} />
            Create Appointment
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
          <StatCard
            title="Total"
            value={appointments.length}
            color="from-blue-500 to-cyan-500"
          />

          <StatCard
            title="Confirmed"
            value={
              appointments.filter((a) => a.status === "Confirmed").length
            }
            color="from-emerald-500 to-green-500"
          />

          <StatCard
            title="Pending"
            value={appointments.filter((a) => a.status === "Pending").length}
            color="from-amber-500 to-orange-500"
          />

          <StatCard
            title="Completed"
            value={
              appointments.filter((a) => a.status === "Completed").length
            }
            color="from-slate-600 to-slate-700"
          />
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Top Controls */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 p-5 border-b border-slate-100">
            {/* Search */}
            <div className="relative w-full xl:w-96">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search appointments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Filter size={16} />
                Filter
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All</option>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>

          {/* Appointment Cards */}
          <div className="p-5 grid grid-cols-1 xl:grid-cols-2 gap-5">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border border-slate-200 rounded-3xl p-5 hover:shadow-lg transition-all duration-300 bg-white"
                >
                  {/* Top */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center justify-center text-lg font-bold shadow-md">
                        {appointment.patient.charAt(0)}
                      </div>

                      <div>
                        <h2 className="font-semibold text-slate-900 text-lg">
                          {appointment.patient}
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                          {appointment.id}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusStyles[appointment.status]
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="mt-6 space-y-4">
                    <InfoRow
                      icon={<CalendarDays size={16} />}
                      label="Appointment Date"
                      value={appointment.date}
                    />

                    <InfoRow
                      icon={<Clock3 size={16} />}
                      label="Appointment Time"
                      value={appointment.time}
                    />

                    <InfoRow
                      icon={<BadgeCheck size={16} />}
                      label="Treatment Type"
                      value={appointment.type}
                    />

                    <InfoRow
                      icon={<UserRound size={16} />}
                      label="Doctor"
                      value={appointment.doctor}
                    />

                    <InfoRow
                      icon={<Phone size={16} />}
                      label="Phone"
                      value={appointment.phone}
                    />

                    <InfoRow
                      icon={<Mail size={16} />}
                      label="Email"
                      value={appointment.email}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <button className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-2xl text-sm font-medium transition">
                      <Eye size={16} />
                      View Details
                    </button>

                    {appointment.status !== "Completed" &&
                      appointment.status !== "Cancelled" && (
                        <button
                          onClick={() =>
                            cancelAppointment(appointment.id)
                          }
                          className="flex-1 min-w-[120px] flex items-center justify-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 py-3 rounded-2xl text-sm font-medium transition"
                        >
                          <XCircle size={16} />
                          Cancel
                        </button>
                      )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="text-slate-400 text-lg font-medium">
                  No appointments found
                </div>

                <p className="text-sm text-slate-500 mt-2">
                  Try changing your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function StatCard({ title, value, color }) {
  return (
    <div
      className={`bg-gradient-to-r ${color} rounded-3xl p-5 text-white shadow-lg`}
    >
      <p className="text-sm opacity-80">{title}</p>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-slate-500">{icon}</div>

      <div>
        <p className="text-xs text-slate-400">{label}</p>

        <p className="text-sm font-medium text-slate-700 mt-1">
          {value}
        </p>
      </div>
    </div>
  );
}