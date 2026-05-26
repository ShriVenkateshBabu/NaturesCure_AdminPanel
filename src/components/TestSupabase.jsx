import React, { useState } from "react";
import { supabase } from "../supabase";
import { Database, X, User, Phone, Activity, Calendar } from "lucide-react";

export default function TestSupabase() {
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .order("created_at", { ascending: false });

    setLoading(false);

    if (error) {
      console.log("ERROR:", error);
      alert(error.message);
    } else {
      console.log("SUCCESS:", data);

      setPatients(data);

      setOpen(true);
    }
  };

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={testConnection}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg flex items-center gap-2 transition-all"
      >
        <Database size={18} />

        {loading ? "Loading..." : "View Patient Records"}
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-7xl rounded-3xl shadow-2xl overflow-hidden">
            {/* HEADER */}
            <div className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">
                  Patient Management System
                </h2>

                <p className="text-emerald-100 text-sm mt-1">
                  AYUSH HUB — Supabase Connected Successfully
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 overflow-auto max-h-[75vh] bg-slate-50">
              {patients.length === 0 ? (
                <div className="text-center py-24">
                  <Database className="mx-auto h-14 w-14 text-slate-300 mb-4" />

                  <h3 className="text-2xl font-semibold text-slate-500">
                    No Patient Data Found
                  </h3>

                  <p className="text-slate-400 mt-2">
                    Your Supabase patients table is empty
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl shadow-sm border border-slate-200">
                  <table className="w-full border-collapse">
                    {/* TABLE HEADER */}
                    <thead>
                      <tr className="bg-emerald-100 text-emerald-900">
                        <th className="p-4 text-left font-bold">ID</th>

                        <th className="p-4 text-left font-bold">Patient ID</th>

                        <th className="p-4 text-left font-bold">
                          Patient Name
                        </th>

                        <th className="p-4 text-left font-bold">Contact</th>

                        <th className="p-4 text-left font-bold">Sex</th>

                        <th className="p-4 text-left font-bold">Diagnosis</th>

                        <th className="p-4 text-left font-bold">Visit Date</th>

                        <th className="p-4 text-left font-bold">Created At</th>
                      </tr>
                    </thead>

                    {/* TABLE BODY */}
                    <tbody>
                      {patients.map((patient) => (
                        <tr
                          key={patient.id}
                          className="hover:bg-emerald-50 transition-all border-t border-slate-200"
                        >
                          <td className="p-4 font-medium">{patient.id}</td>

                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <User size={16} className="text-emerald-600" />

                              {patient.patient_id}
                            </div>
                          </td>

                          <td className="p-4 font-semibold text-slate-800">
                            {patient.name}
                          </td>

                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Phone size={15} className="text-blue-600" />

                              {patient.contact || "-"}
                            </div>
                          </td>

                          <td className="p-4">{patient.sex || "-"}</td>

                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Activity size={15} className="text-rose-600" />

                              {patient.diagnosis || "-"}
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Calendar size={15} className="text-orange-500" />

                              {patient.visit_date || "-"}
                            </div>
                          </td>

                          <td className="p-4 text-sm text-slate-500">
                            {new Date(patient.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="bg-white border-t border-slate-200 px-6 py-4 flex justify-between items-center">
              <p className="text-sm text-slate-500 font-medium">
                Total Records: {patients.length}
              </p>

              <button
                onClick={() => setOpen(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
