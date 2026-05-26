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
  Calendar,
  Database,
  Heart,
  Activity,
  FileText,
  Stethoscope,
  Pill,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  Download,
  FileJson,
  FileSpreadsheet,
  Printer,
} from "lucide-react";

// ─── Collapsible Section ──────────────────────────────────────────────────────
function Section({ title, icon: Icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-all"
      >
        <div className="flex items-center gap-3">
          <Icon className="text-emerald-600" size={18} />
          <span className="font-semibold text-slate-700">{title}</span>
        </div>
        {open ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
      </button>
      {open && <div className="px-5 pb-5 grid md:grid-cols-2 gap-4">{children}</div>}
    </div>
  );
}

// ─── Single Field ─────────────────────────────────────────────────────────────
function Field({ label, name, value, editMode, editData, handleChange, fullWidth = false, textarea = false }) {
  return (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">{label}</p>
      {editMode ? (
        textarea ? (
          <textarea rows="3" name={name} value={editData[name] || ""} onChange={handleChange}
            className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-400 text-sm" />
        ) : (
          <input type="text" name={name} value={editData[name] || ""} onChange={handleChange}
            className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-400 text-sm" />
        )
      ) : (
        <p className="text-slate-700 text-sm">{value || <span className="text-slate-300 italic">—</span>}</p>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PatientsView() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  // ── Download / Export helpers ─────────────────────────────────────────────

  /** Download single patient as JSON */
  const downloadJSON = (patient) => {
    const blob = new Blob([JSON.stringify(patient, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `patient_${patient.patient_id || patient.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /** Download single patient as CSV (Field, Value layout) */
  const downloadCSV = (patient) => {
    const rows = Object.entries(patient).map(([key, val]) => [
      `"${key}"`,
      `"${String(val ?? "").replace(/"/g, '""')}"`,
    ]);
    const csv = ["Field,Value", ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `patient_${patient.patient_id || patient.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /** Export all (filtered) patients as one wide CSV */
  const downloadAllCSV = () => {
    if (filteredPatients.length === 0) return alert("No patients to export.");
    const headers = Object.keys(filteredPatients[0]);
    const rows = filteredPatients.map((p) =>
      headers.map((h) => `"${String(p[h] ?? "").replace(/"/g, '""')}"`).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `all_patients_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /** Open a printable HTML page for a patient (browser Save as PDF works here) */
  const printPatient = (patient) => {
    const printWindow = window.open("", "_blank");
    const SECTIONS = [
      ["Patient Information", ["patient_id","name","age","dob","sex","blood_group","marital_status","occupation","religion","ref_by","address","email"]],
      ["Contact & Emergency", ["contact","emergency_contact","emergency_name"]],
      ["Visit Dates", ["visit_date","followup_date","next_review_date"]],
      ["Body Measurements", ["height","weight","bmi"]],
      ["Vitals", ["bp","hr","spo2","temp","pr","ht","wt"]],
      ["Lifestyle", ["food_habits","addiction_history","allergies","existing_meds"]],
      ["Complaints", ["aggravating_factors","relieving_factors","associated_symptoms"]],
      ["Medical History", ["past_medical_history","surgical_history","drug_history","family_history","immunization_history","previous_treatments"]],
      ["Menstrual History", ["menarche","dysmenorrhea","cycle","leucorrhea","flow","menopause","lmp"]],
      ["GPE", ["gait","thirst","eyes","micturition","tongue","appetite","sleep","nails","bowel","skin","sweat","general_appearance","hydration"]],
      ["Systemic Examination", ["respiratory_system","gastrointestinal_system","renal_system","locomotor_system","cardiovascular_system","cns","obs_g","obs_a","obs_l","obs_s","others"]],
      ["PSI", ["psi_sad","psi_anxious","psi_tired","psi_concentrate","psi_hopeless","psi_interest"]],
      ["Diagnosis", ["differential_diagnosis","investigations","provisional_diagnosis","icd10","ayush_diagnosis"]],
      ["Pulse & Iris Diagnosis", ["pulse_rhythm","pulse_volume","pulse_symmetry","pulse_dosha","iris_diagnosis","prakriti","body_constitution"]],
      ["Treatment Plan", ["diagnosis","treatment","medicines","yoga_therapy","diet_recommendations","hydrotherapy","lifestyle_advice","treatment_duration","followup_instructions"]],
      ["Consent & Signatures", ["consent_given","patient_signature","doctor_signature"]],
    ];

    const htmlSections = SECTIONS.map(([title, fields]) => {
      const rows = fields
        .filter((f) => patient[f])
        .map((f) => {
          const label = f.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
          return `<tr><td class="lbl">${label}</td><td>${patient[f]}</td></tr>`;
        })
        .join("");
      return rows ? `<div class="sec"><h3>${title}</h3><table>${rows}</table></div>` : "";
    }).join("");

    printWindow.document.write(`<!DOCTYPE html>
<html><head><title>Patient Report — ${patient.name}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: Arial, sans-serif; font-size: 12px; color: #1f2937; margin: 0; padding: 24px; }
  header { border-bottom: 2px solid #065f46; padding-bottom: 10px; margin-bottom: 16px; display:flex; justify-content:space-between; align-items:flex-end; }
  header h1 { margin: 0; font-size: 20px; color: #065f46; }
  header p { margin: 4px 0 0; color: #6b7280; font-size: 11px; }
  .meta { display: flex; gap: 24px; margin-bottom: 20px; background: #f0fdf4; padding: 10px 14px; border-radius: 8px; flex-wrap: wrap; }
  .meta span { font-size: 11px; color: #374151; } .meta strong { color: #065f46; }
  .sec { margin-bottom: 14px; page-break-inside: avoid; }
  .sec h3 { background: #ecfdf5; color: #065f46; padding: 5px 10px; margin: 0 0 4px; font-size: 11px; border-left: 3px solid #10b981; letter-spacing: .5px; text-transform: uppercase; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 4px 8px; border-bottom: 1px solid #f3f4f6; vertical-align: top; font-size: 11px; }
  td.lbl { font-weight: 700; color: #6b7280; width: 32%; text-transform: uppercase; font-size: 10px; }
  .print-btn { background:#065f46; color:#fff; border:none; padding:8px 16px; border-radius:6px; cursor:pointer; font-size:12px; }
  @media print { body { padding: 0; } .print-btn { display: none; } }
</style></head>
<body>
  <header>
    <div><h1>Patient Medical Record</h1><p>Generated: ${new Date().toLocaleString()}</p></div>
    <button class="print-btn" onclick="window.print()">Print / Save as PDF</button>
  </header>
  <div class="meta">
    <span>ID: <strong>${patient.patient_id}</strong></span>
    <span>Name: <strong>${patient.name}</strong></span>
    <span>Age / Sex: <strong>${patient.age || "—"} / ${patient.sex || "—"}</strong></span>
    <span>Blood Group: <strong>${patient.blood_group || "—"}</strong></span>
    <span>Visit Date: <strong>${patient.visit_date || "—"}</strong></span>
  </div>
  ${htmlSections}
</body></html>`);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 600);
  };

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const fetchPatients = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .order("id", { ascending: false });
    setLoading(false);
    if (error) { 
      console.error(error); 
      alert(error.message); 
    }
    else {
       setPatients(data); setFilteredPatients(data); 
       console.log(data,"data from supbase");
      }
  };

  useEffect(() => { fetchPatients(); }, []);

  // ── Search ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const q = search.toLowerCase();
    setFilteredPatients(
      patients.filter((p) =>
        p.name?.toLowerCase().includes(q) ||
        p.patient_id?.toLowerCase().includes(q) ||
        p.contact?.toLowerCase().includes(q)
      )
    );
  }, [search, patients]);

  // ── Modal helpers ─────────────────────────────────────────────────────────
  const openPatient = (patient, startEdit = false) => {
    setSelectedPatient(patient);
    setEditData(patient);
    setViewOpen(true);
    setEditMode(startEdit);
    setShowDownloadMenu(false);
  };

  const handleChange = (e) => setEditData({ ...editData, [e.target.name]: e.target.value });

  // ── Update ────────────────────────────────────────────────────────────────
  const updatePatient = async () => {
    const { id, created_at, ...payload } = editData;
    const { error } = await supabase.from("patients").update(payload).eq("id", id);
    if (error) { alert(error.message); }
    else {
      alert("Patient Updated Successfully");
      fetchPatients();
      setSelectedPatient(editData);
      setEditMode(false);
    }
  };

  const sp = selectedPatient || {};
  const fp = (name) => ({ name, value: sp[name], editMode, editData, handleChange });

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="bg-slate-50 min-h-screen">
      <AdminTopbar />
      <div className="min-h-screen bg-slate-100 p-6">

        {/* PAGE HEADER */}
        <div className="bg-white rounded-3xl shadow-md p-6 mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Patients Management</h1>
            <p className="text-slate-500 mt-1">Manage and monitor all patient records</p>
          </div>
          <div className="relative w-full lg:w-96">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, ID, or contact..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-3xl shadow-md overflow-hidden">

          {/* Card header with Export All */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-3 rounded-2xl">
                <Database className="text-emerald-700" size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Patients List</h2>
                <p className="text-sm text-slate-500">Total Patients: {filteredPatients.length}</p>
              </div>
            </div>
            <button
              onClick={downloadAllCSV}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm"
            >
              <FileSpreadsheet size={16} />
              Export All CSV
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-emerald-50">
                <tr>
                  {["ID", "Patient ID", "Name", "Age / Sex", "Contact", "Visit Date", "Actions"].map((h) => (
                    <th key={h} className="text-left p-4 font-semibold text-slate-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="7" className="text-center py-16 text-slate-500">Loading Patients...</td></tr>
                ) : filteredPatients.length === 0 ? (
                  <tr><td colSpan="7" className="text-center py-16 text-slate-500">No Patients Found</td></tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-b border-slate-100 hover:bg-slate-50 transition-all">
                      <td className="p-4 text-slate-500 text-sm">{patient.id}</td>
                      <td className="p-4 font-mono text-sm text-emerald-700">{patient.patient_id}</td>
                      <td className="p-4 font-medium">{patient.name}</td>
                      <td className="p-4 text-sm text-slate-600">{patient.age}{patient.sex ? ` / ${patient.sex}` : ""}</td>
                      <td className="p-4 text-sm">{patient.contact}</td>
                      <td className="p-4 text-sm text-slate-500">{patient.visit_date || "—"}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {/* View */}
                          <button onClick={() => openPatient(patient)} title="View Details"
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-xl transition-all">
                            <Eye size={16} />
                          </button>
                          {/* Edit */}
                          <button onClick={() => openPatient(patient, true)} title="Edit Patient"
                            className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 p-2 rounded-xl transition-all">
                            <Edit size={16} />
                          </button>
                          {/* Print / PDF */}
                          <button onClick={() => printPatient(patient)} title="Print / Save as PDF"
                            className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-2 rounded-xl transition-all">
                            <Printer size={16} />
                          </button>
                          {/* CSV */}
                          <button onClick={() => downloadCSV(patient)} title="Download CSV"
                            className="bg-orange-100 hover:bg-orange-200 text-orange-700 p-2 rounded-xl transition-all">
                            <FileSpreadsheet size={16} />
                          </button>
                          {/* JSON */}
                          <button onClick={() => downloadJSON(patient)} title="Download JSON"
                            className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-2 rounded-xl transition-all">
                            <FileJson size={16} />
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

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* VIEW / EDIT MODAL                                                   */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {viewOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-50 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">

              {/* Modal Header */}
              <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 text-white p-6 flex items-center justify-between shrink-0">
                <div>
                  <h2 className="text-2xl font-bold">Patient Details</h2>
                  <p className="text-emerald-100 mt-1">{sp.name} — {sp.patient_id}</p>
                </div>
                <button onClick={() => setViewOpen(false)} className="hover:bg-white/20 p-2 rounded-full">
                  <X />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="overflow-y-auto flex-1 p-6">

                <Section title="Patient Information" icon={User} defaultOpen={true}>
                  <Field label="Patient ID" {...fp("patient_id")} />
                  <Field label="Full Name" {...fp("name")} />
                  <Field label="Age" {...fp("age")} />
                  <Field label="Date of Birth" {...fp("dob")} />
                  <Field label="Sex" {...fp("sex")} />
                  <Field label="Blood Group" {...fp("blood_group")} />
                  <Field label="Marital Status" {...fp("marital_status")} />
                  <Field label="Occupation" {...fp("occupation")} />
                  <Field label="Religion" {...fp("religion")} />
                  <Field label="Referred By" {...fp("ref_by")} />
                  <Field label="Address" {...fp("address")} fullWidth textarea />
                  <Field label="Email" {...fp("email")} />
                </Section>

                <Section title="Contact & Emergency" icon={Phone}>
                  <Field label="Contact Number" {...fp("contact")} />
                  <Field label="Emergency Contact" {...fp("emergency_contact")} />
                  <Field label="Emergency Contact Name" {...fp("emergency_name")} />
                </Section>

                <Section title="Visit Dates" icon={Calendar}>
                  <Field label="Visit Date" {...fp("visit_date")} />
                  <Field label="Follow-up Date" {...fp("followup_date")} />
                  <Field label="Next Review Date" {...fp("next_review_date")} />
                </Section>

                <Section title="Body Measurements" icon={Activity}>
                  <Field label="Height" {...fp("height")} />
                  <Field label="Weight" {...fp("weight")} />
                  <Field label="BMI" {...fp("bmi")} />
                </Section>

                <Section title="Vitals" icon={Heart}>
                  <Field label="Blood Pressure" {...fp("bp")} />
                  <Field label="Heart Rate" {...fp("hr")} />
                  <Field label="SpO2" {...fp("spo2")} />
                  <Field label="Temperature" {...fp("temp")} />
                  <Field label="Pulse Rate" {...fp("pr")} />
                  <Field label="HT" {...fp("ht")} />
                  <Field label="WT" {...fp("wt")} />
                </Section>

                <Section title="Lifestyle" icon={ClipboardList}>
                  <Field label="Food Habits" {...fp("food_habits")} />
                  <Field label="Addiction History" {...fp("addiction_history")} />
                  <Field label="Allergies" {...fp("allergies")} />
                  <Field label="Existing Medications" {...fp("existing_meds")} fullWidth textarea />
                </Section>

                <Section title="Complaints" icon={FileText}>
                  <Field label="Aggravating Factors" {...fp("aggravating_factors")} textarea />
                  <Field label="Relieving Factors" {...fp("relieving_factors")} textarea />
                  <Field label="Associated Symptoms" {...fp("associated_symptoms")} fullWidth textarea />
                </Section>

                <Section title="Medical History" icon={FileText}>
                  <Field label="Past Medical History" {...fp("past_medical_history")} textarea />
                  <Field label="Surgical History" {...fp("surgical_history")} textarea />
                  <Field label="Drug History" {...fp("drug_history")} textarea />
                  <Field label="Family History" {...fp("family_history")} textarea />
                  <Field label="Immunization History" {...fp("immunization_history")} textarea />
                  <Field label="Previous Treatments" {...fp("previous_treatments")} fullWidth textarea />
                </Section>

                <Section title="Menstrual History" icon={Activity}>
                  <Field label="Menarche" {...fp("menarche")} />
                  <Field label="Dysmenorrhea" {...fp("dysmenorrhea")} />
                  <Field label="Cycle" {...fp("cycle")} />
                  <Field label="Leucorrhea" {...fp("leucorrhea")} />
                  <Field label="Flow" {...fp("flow")} />
                  <Field label="Menopause" {...fp("menopause")} />
                  <Field label="LMP" {...fp("lmp")} />
                </Section>

                <Section title="General Physical Examination (GPE)" icon={Stethoscope}>
                  {[["gait","Gait"],["thirst","Thirst"],["eyes","Eyes"],["micturition","Micturition"],
                    ["tongue","Tongue"],["appetite","Appetite"],["sleep","Sleep"],["nails","Nails"],
                    ["bowel","Bowel"],["skin","Skin"],["sweat","Sweat"],
                    ["general_appearance","General Appearance"],["hydration","Hydration"]
                  ].map(([name, label]) => <Field key={name} label={label} {...fp(name)} />)}
                </Section>

                <Section title="Systemic Examination" icon={Stethoscope}>
                  <Field label="Respiratory System" {...fp("respiratory_system")} textarea />
                  <Field label="Gastrointestinal System" {...fp("gastrointestinal_system")} textarea />
                  <Field label="Renal System" {...fp("renal_system")} textarea />
                  <Field label="Locomotor System" {...fp("locomotor_system")} textarea />
                  <Field label="Cardiovascular System" {...fp("cardiovascular_system")} textarea />
                  <Field label="CNS" {...fp("cns")} textarea />
                  <Field label="OBS/G" {...fp("obs_g")} />
                  <Field label="OBS/A" {...fp("obs_a")} />
                  <Field label="OBS/L" {...fp("obs_l")} />
                  <Field label="OBS/S" {...fp("obs_s")} />
                  <Field label="Others" {...fp("others")} fullWidth textarea />
                </Section>

                <Section title="PSI (Psychological Screening)" icon={Activity}>
                  {[["psi_sad","Sad"],["psi_anxious","Anxious"],["psi_tired","Tired"],
                    ["psi_concentrate","Concentrate"],["psi_hopeless","Hopeless"],["psi_interest","Interest"]
                  ].map(([name, label]) => <Field key={name} label={label} {...fp(name)} />)}
                </Section>

                <Section title="Diagnosis" icon={ClipboardList}>
                  <Field label="Differential Diagnosis" {...fp("differential_diagnosis")} textarea />
                  <Field label="Investigations" {...fp("investigations")} textarea />
                  <Field label="Provisional Diagnosis" {...fp("provisional_diagnosis")} textarea />
                  <Field label="ICD-10" {...fp("icd10")} />
                  <Field label="AYUSH Diagnosis" {...fp("ayush_diagnosis")} fullWidth textarea />
                </Section>

                <Section title="Pulse & Iris Diagnosis" icon={Activity}>
                  <Field label="Pulse Rhythm" {...fp("pulse_rhythm")} />
                  <Field label="Pulse Volume" {...fp("pulse_volume")} />
                  <Field label="Pulse Symmetry" {...fp("pulse_symmetry")} />
                  <Field label="Pulse Dosha" {...fp("pulse_dosha")} />
                  <Field label="Iris Diagnosis" {...fp("iris_diagnosis")} />
                  <Field label="Prakriti" {...fp("prakriti")} />
                  <Field label="Body Constitution" {...fp("body_constitution")} />
                </Section>

                <Section title="Treatment Plan" icon={Pill}>
                  <Field label="Diagnosis" {...fp("diagnosis")} fullWidth textarea />
                  <Field label="Treatment" {...fp("treatment")} fullWidth textarea />
                  <Field label="Medicines" {...fp("medicines")} fullWidth textarea />
                  <Field label="Yoga Therapy" {...fp("yoga_therapy")} textarea />
                  <Field label="Diet Recommendations" {...fp("diet_recommendations")} textarea />
                  <Field label="Hydrotherapy" {...fp("hydrotherapy")} textarea />
                  <Field label="Lifestyle Advice" {...fp("lifestyle_advice")} textarea />
                  <Field label="Treatment Duration" {...fp("treatment_duration")} />
                  <Field label="Follow-up Instructions" {...fp("followup_instructions")} fullWidth textarea />
                </Section>

                <Section title="Consent & Signatures" icon={FileText}>
                  <Field label="Consent Given" {...fp("consent_given")} />
                  <Field label="Patient Signature" {...fp("patient_signature")} />
                  <Field label="Doctor Signature" {...fp("doctor_signature")} />
                </Section>

              </div>

              {/* Modal Footer */}
              <div className="bg-white border-t border-slate-200 p-5 flex flex-wrap items-center justify-between gap-3 shrink-0">

                {/* Left: file options */}
                <div className="flex items-center gap-2">
                  {/* Print / Save PDF */}
                  <button
                    onClick={() => printPatient(sp)}
                    title="Print or Save as PDF"
                    className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                  >
                    <Printer size={15} /> Print / PDF
                  </button>

                  {/* Download dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowDownloadMenu((v) => !v)}
                      className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                    >
                      <Download size={15} /> Download <ChevronDown size={13} />
                    </button>

                    {showDownloadMenu && (
                      <div className="absolute bottom-12 left-0 bg-white border border-slate-200 rounded-2xl shadow-xl z-10 overflow-hidden w-44">
                        <button
                          onClick={() => { downloadCSV(sp); setShowDownloadMenu(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-sm text-slate-700"
                        >
                          <FileSpreadsheet size={15} className="text-orange-500" /> CSV File
                        </button>
                        <button
                          onClick={() => { downloadJSON(sp); setShowDownloadMenu(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-sm text-slate-700 border-t border-slate-100"
                        >
                          <FileJson size={15} className="text-blue-500" /> JSON File
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: edit / save / close */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setViewOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-sm"
                  >
                    Close
                  </button>
                  {editMode ? (
                    <button
                      onClick={updatePatient}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm"
                    >
                      Save Changes
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditMode(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm"
                    >
                      Edit Patient
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}