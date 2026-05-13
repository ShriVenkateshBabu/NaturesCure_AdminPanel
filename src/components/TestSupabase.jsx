import React, { useState } from "react";
import { supabase } from "../supabase";
import { Database, X } from "lucide-react";

export default function TestSupabase() {

  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {

    setLoading(true);

    const { data, error } = await supabase
      .from("patients table")
      .select("*");

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
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-semibold shadow-md flex items-center gap-2 transition-all"
      >
        <Database size={18} />

        {loading ? "Loading..." : "View Supabase Data"}
      </button>

      {/* POPUP */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white px-6 py-5 flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold">
                  Supabase Patient Database
                </h2>

                <p className="text-emerald-100 text-sm mt-1">
                  AYUSH HUB – Connected Successfully
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-all"
              >
                <X size={22} />
              </button>

            </div>

            {/* BODY */}
            <div className="p-6 overflow-auto max-h-[75vh] bg-slate-50">

              {patients.length === 0 ? (

                <div className="text-center py-24">

                  <h3 className="text-2xl font-semibold text-slate-500">
                    No Patient Data Found
                  </h3>

                  <p className="text-slate-400 mt-2">
                    Your Supabase table is empty
                  </p>

                </div>

              ) : (

                <div className="overflow-x-auto">

                  <table className="w-full border-collapse overflow-hidden rounded-2xl shadow-sm">

                    {/* TABLE HEADER */}
                    <thead>

                      <tr className="bg-emerald-100 text-emerald-900">

                        <th className="border border-emerald-200 p-4 text-left font-bold">
                          ID
                        </th>

                        <th className="border border-emerald-200 p-4 text-left font-bold">
                          Patient ID
                        </th>

                        <th className="border border-emerald-200 p-4 text-left font-bold">
                          Patient Name
                        </th>

                        <th className="border border-emerald-200 p-4 text-left font-bold">
                          Created At
                        </th>

                      </tr>

                    </thead>

                    {/* TABLE BODY */}
                    <tbody>

                      {patients.map((patient) => (

                        <tr
                          key={patient.id}
                          className="hover:bg-emerald-50 transition-all"
                        >

                          <td className="border border-slate-200 p-4">
                            {patient.id}
                          </td>

                          <td className="border border-slate-200 p-4">
                            {patient.patient_id}
                          </td>

                          <td className="border border-slate-200 p-4 font-medium">
                            {patient.patient_name}
                          </td>

                          <td className="border border-slate-200 p-4 text-sm text-slate-600">
                            {patient.created_at}
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

              <p className="text-sm text-slate-500">
                Total Records: {patients.length}
              </p>

              <button
                onClick={() => setOpen(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-medium"
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