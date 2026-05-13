import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import AdminTopbar from "../Admin/AdminTopbar";

import {
  Search,
  Eye,
  Edit,
  X,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Database,
} from "lucide-react";

export default function PatientsView() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedPatient, setSelectedPatient] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [editData, setEditData] = useState({});

  // =========================================
  // FETCH PATIENTS
  // =========================================

  const fetchPatients = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("patients table")
      .select("*")
      .order("id", { ascending: false });

    setLoading(false);

    if (error) {
      console.log(error);
      alert(error.message);
    } else {
      setPatients(data);
      setFilteredPatients(data);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // =========================================
  // SEARCH
  // =========================================

  useEffect(() => {
    const filtered = patients.filter((patient) => {
      return (
        patient.patient_name?.toLowerCase().includes(search.toLowerCase()) ||
        String(patient.patient_id || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });

    setFilteredPatients(filtered);
  }, [search, patients]);

  // =========================================
  // VIEW PATIENT
  // =========================================

  const openPatient = (patient) => {
    setSelectedPatient(patient);

    setEditData(patient);

    setViewOpen(true);

    setEditMode(false);
  };

  // =========================================
  // HANDLE EDIT
  // =========================================

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================================
  // UPDATE PATIENT
  // =========================================

  const updatePatient = async () => {
    const { error } = await supabase
      .from("patients table")
      .update({
        patient_name: editData.patient_name,
        phone: editData.phone,
        email: editData.email,
        address: editData.address,
      })
      .eq("id", editData.id);

    if (error) {
      alert(error.message);
    } else {
      alert("Patient Updated Successfully");

      fetchPatients();

      setSelectedPatient(editData);

      setEditMode(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <AdminTopbar />
      <div className="min-h-screen bg-slate-100 p-6">
        {/* HEADER */}

        <div className="bg-white rounded-3xl shadow-md p-6 mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Patients Management
            </h1>

            <p className="text-slate-500 mt-1">
              Manage and monitor all patient records
            </p>
          </div>

          {/* SEARCH */}

          <div className="relative w-full lg:w-96">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search patient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* TABLE CARD */}

        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          {/* TOP */}

          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-3 rounded-2xl">
                <Database className="text-emerald-700" size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Patients List
                </h2>

                <p className="text-sm text-slate-500">
                  Total Patients : {filteredPatients.length}
                </p>
              </div>
            </div>
          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-700">
                    ID
                  </th>

                  <th className="text-left p-4 font-semibold text-slate-700">
                    Patient ID
                  </th>

                  <th className="text-left p-4 font-semibold text-slate-700">
                    Name
                  </th>

                  <th className="text-left p-4 font-semibold text-slate-700">
                    Phone
                  </th>

                  <th className="text-left p-4 font-semibold text-slate-700">
                    Created At
                  </th>

                  <th className="text-center p-4 font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-16 text-slate-500"
                    >
                      Loading Patients...
                    </td>
                  </tr>
                ) : filteredPatients.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-16 text-slate-500"
                    >
                      No Patients Found
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-all"
                    >
                      <td className="p-4">{patient.id}</td>

                      <td className="p-4">{patient.patient_id}</td>

                      <td className="p-4 font-medium">
                        {patient.patient_name}
                      </td>

                      <td className="p-4">{patient.phone}</td>

                      <td className="p-4 text-sm text-slate-500">
                        {patient.created_at}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => openPatient(patient)}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-xl transition-all"
                          >
                            <Eye size={18} />
                          </button>

                          <button
                            onClick={() => {
                              openPatient(patient);
                              setEditMode(true);
                            }}
                            className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 p-2 rounded-xl transition-all"
                          >
                            <Edit size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================= */}
        {/* VIEW / EDIT MODAL */}
        {/* ========================================= */}

        {viewOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl">
              {/* HEADER */}

              <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 text-white p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Patient Details</h2>

                  <p className="text-emerald-100 mt-1">
                    View complete patient information
                  </p>
                </div>

                <button
                  onClick={() => setViewOpen(false)}
                  className="hover:bg-white/20 p-2 rounded-full"
                >
                  <X />
                </button>
              </div>

              {/* BODY */}

              <div className="p-6 bg-slate-50">
                <div className="grid md:grid-cols-2 gap-5">
                  {/* NAME */}

                  <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="text-emerald-600" size={18} />

                      <h3 className="font-semibold text-slate-700">
                        Patient Name
                      </h3>
                    </div>

                    {editMode ? (
                      <input
                        type="text"
                        name="patient_name"
                        value={editData.patient_name || ""}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3 outline-none"
                      />
                    ) : (
                      <p className="text-slate-600">
                        {selectedPatient.patient_name}
                      </p>
                    )}
                  </div>

                  {/* PHONE */}

                  <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="text-emerald-600" size={18} />

                      <h3 className="font-semibold text-slate-700">
                        Phone Number
                      </h3>
                    </div>

                    {editMode ? (
                      <input
                        type="text"
                        name="phone"
                        value={editData.phone || ""}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3 outline-none"
                      />
                    ) : (
                      <p className="text-slate-600">{selectedPatient.phone}</p>
                    )}
                  </div>

                  {/* EMAIL */}

                  <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="text-emerald-600" size={18} />

                      <h3 className="font-semibold text-slate-700">Email</h3>
                    </div>

                    {editMode ? (
                      <input
                        type="text"
                        name="email"
                        value={editData.email || ""}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3 outline-none"
                      />
                    ) : (
                      <p className="text-slate-600">{selectedPatient.email}</p>
                    )}
                  </div>

                  {/* DATE */}

                  <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="text-emerald-600" size={18} />

                      <h3 className="font-semibold text-slate-700">
                        Created At
                      </h3>
                    </div>

                    <p className="text-slate-600">
                      {selectedPatient.created_at}
                    </p>
                  </div>

                  {/* ADDRESS */}

                  <div className="bg-white rounded-2xl p-5 shadow-sm md:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="text-emerald-600" size={18} />

                      <h3 className="font-semibold text-slate-700">Address</h3>
                    </div>

                    {editMode ? (
                      <textarea
                        rows="4"
                        name="address"
                        value={editData.address || ""}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3 outline-none"
                      />
                    ) : (
                      <p className="text-slate-600">
                        {selectedPatient.address}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* FOOTER */}

              <div className="bg-white border-t border-slate-200 p-5 flex justify-end gap-3">
                <button
                  onClick={() => setViewOpen(false)}
                  className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-100"
                >
                  Close
                </button>

                {editMode ? (
                  <button
                    onClick={updatePatient}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
                  >
                    Edit Patient
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
