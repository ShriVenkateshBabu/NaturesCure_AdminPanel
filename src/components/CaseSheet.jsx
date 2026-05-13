import { useState, useRef, useEffect } from "react";
import {
  FileText,
  Download,
  X,
  AlertCircle,
  CheckCircle,
  MessageCircle,
  ChevronDown,
  Plus,
  Trash2,
  User,
  Heart,
  Activity,
  Brain,
  ClipboardList,
  Stethoscope,
  Shield,
  Leaf,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";

// ─── Constants ─────────────────────────────────────────────────────────────

const HOSPITAL = {
  name: "Ayush Hub",
  tagline: "Healing Through Nature • AYUSH Certified",
  address:
    "347/10, Pasumpon nagar Mamsapuram,Srivilliputhur,Virudhunagar district-626110, Tamil Nadu",
  phone: "+91 8300065899",
  email: "drmahanaturopath@gmail.com",
  website: "",
  ayush: "",
  doctor: "Dr. MahaLakshmi",
  qualification: "BNYS",
  regNo: "",
};

const REQUIRED_FIELDS = [
  { key: "date", label: "Date of Visit" },
  { key: "name", label: "Patient Name" },
  { key: "contact", label: "Contact (10 digits)" },
  { key: "age", label: "Age" },
  { key: "sex", label: "Sex" },
  { key: "address", label: "Address" },
  { key: "bloodGroup", label: "Blood Group" },
  { key: "bp", label: "BP" },
  { key: "hr", label: "HR" },
  { key: "spo2", label: "SPO2" },
  { key: "temp", label: "Temperature" },
  { key: "diagnosis", label: "Diagnosis" },
  { key: "treatment", label: "Treatment" },
  { key: "psi_sad", label: "PSI: Sad/Depressed" },
  { key: "psi_anxious", label: "PSI: Anxious/Worried" },
  { key: "psi_tired", label: "PSI: Tired/Low Energy" },
  { key: "psi_concentrate", label: "PSI: Hard to Concentrate" },
  { key: "psi_hopeless", label: "PSI: Hopeless" },
  { key: "psi_interest", label: "PSI: Loss of Interest" },
  { key: "consentGiven", label: "Patient Consent" },
];

const validate = (form) => {
  const errors = {};
  REQUIRED_FIELDS.forEach(({ key, label }) => {
    const val = form[key];
    if (!val || (typeof val === "string" && val.trim() === "")) {
      errors[key] = label;
    }
  });
  if (form.contact && form.contact.length < 10)
    errors["contact"] = "Contact (10 digits)";
  return errors;
};

const initialState = {
  // Visit info
  date: "",
  followupDate: "",
  nextReviewDate: "",
  patientId: "",
  // Demographics
  name: "",
  contact: "",
  emergencyContact: "",
  emergencyName: "",
  refBy: "",
  age: "",
  dob: "",
  sex: "",
  bloodGroup: "",
  maritalStatus: "",
  occupation: "",
  religion: "",
  address: "",
  email: "",
  height: "",
  weight: "",
  bmi: "",
  // Medical flags
  foodHabits: "",
  addictionHistory: "",
  allergies: "",
  existingMeds: "",
  // Complaints

  duration: "",
  severity: "",
  onset: "",
  associatedSymptoms: "",
  aggravatingFactors: "",
  relievingFactors: "",
  // History
  pastMedicalHistory: "",
  surgicalHistory: "",
  drugHistory: "",
  familyHistory: "",
  immunizationHistory: "",
  previousTreatments: "",
  // Vitals
  bp: "",
  hr: "",
  spo2: "",
  temp: "",
  pr: "",
  ht: "",
  wt: "",
  // Menstrual (female only)
  menarche: "",
  dysmenorrhea: "",
  cycle: "",
  leucorrhea: "",
  flow: "",
  menopause: "",
  lmp: "",
  // GPE
  gait: "",
  thirst: "",
  eyes: "",
  micturition: "",
  tongue: "",
  appetite: "",
  sleep: "",
  nails: "",
  bowel: "",
  skin: "",
  sweat: "",
  generalAppearance: "",
  hydration: "",
  // Systemic
  respiratorySystem: "",
  gastrointestinalSystem: "",
  renalSystem: "",
  locomotorSystem: "",
  cardiovascularSystem: "",
  cns: "",
  obsG: "",
  obsA: "",
  obsL: "",
  obsS: "",
  others: "",
  // PSI
  psi_sad: "",
  psi_anxious: "",
  psi_tired: "",
  psi_concentrate: "",
  psi_hopeless: "",
  psi_interest: "",
  // Differential & Investigations
  differentialDiagnosis: "",
  investigations: "",
  provisionalDiagnosis: "",
  icd10: "",
  ayushDiagnosis: "",
  // Pulse Diagnosis
  pulseRhythm: "",
  pulseVolume: "",
  pulseSymmetry: "",
  pulseDosha: "",
  irisDiagnosis: "",
  prakriti: "",
  bodyConstitution: "",
  // Diagnosis & Treatment
  diagnosis: "",
  treatment: "",
  medicines: "",
  yogaTherapy: "",
  dietRecommendations: "",
  hydrotherapy: "",
  lifestyleAdvice: "",
  treatmentDuration: "",
  followupInstructions: "",
  // Consent & signatures
  consentGiven: "",
  patientSignature: "",
  doctorSignature: "",
};

const formatDate = (d) => {
  if (!d) return "___________";
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
};

const generatePatientId = () => {
  const now = new Date();
  return `ARG-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${Math.floor(Math.random() * 9000) + 1000}`;
};

// ─── Sub-Components ─────────────────────────────────────────────────────────

const SectionCard = ({ icon: Icon, title, color = "blue", children }) => {
  const [open, setOpen] = useState(true);
  const colors = {
    blue: "from-blue-600 to-blue-700",
    teal: "from-teal-600 to-teal-700",
    emerald: "from-emerald-600 to-emerald-700",
    violet: "from-violet-600 to-violet-700",
    amber: "from-amber-500 to-amber-600",
    rose: "from-rose-500 to-rose-600",
    slate: "from-slate-600 to-slate-700",
    indigo: "from-indigo-600 to-indigo-700",
  };
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r ${colors[color]} text-white`}
      >
        {Icon && <Icon className="h-4 w-4 shrink-0" />}
        <span className="font-bold text-sm tracking-wide flex-1 text-left">
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="px-4 py-4 bg-white">{children}</div>}
    </div>
  );
};

const Field = ({
  label,
  value,
  onChange,
  multiline = false,
  error = false,
  placeholder = "",
  hint = "",
}) => (
  <div>
    {label && (
      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
        {label}
        {hint && (
          <span className="ml-1 text-slate-400 font-normal normal-case tracking-normal">
            {hint}
          </span>
        )}
      </label>
    )}
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder={placeholder}
        className={`w-full border rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-slate-50 ${error ? "border-red-400 bg-red-50" : "border-slate-200"}`}
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 min-h-[44px] ${error ? "border-red-400 bg-red-50" : "border-slate-200"}`}
      />
    )}
  </div>
);

const SelectField = ({ label, value, onChange, options, error = false }) => (
  <div>
    {label && (
      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
        {label}
      </label>
    )}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full border rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 min-h-[44px] ${error ? "border-red-400 bg-red-50" : "border-slate-200"}`}
    >
      <option value="">Select…</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);

const DateField = ({ label, value, onChange, error = false }) => (
  <div>
    {label && (
      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
        {label}
      </label>
    )}
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full border rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 min-h-[44px] ${error ? "border-red-400 bg-red-50" : "border-slate-200"}`}
    />
  </div>
);

const PhoneField = ({ label, value, onChange, error = false }) => (
  <div>
    {label && (
      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
        {label}
      </label>
    )}
    <div className="flex">
      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-600 text-sm font-bold min-h-[44px]">
        +91
      </span>
      <input
        type="tel"
        maxLength={10}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
        placeholder="XXXXXXXXXX"
        className={`flex-1 border rounded-r-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 min-h-[44px] ${error ? "border-red-400 bg-red-50" : "border-slate-200"}`}
      />
    </div>
  </div>
);

const VitalField = ({
  label,
  value,
  onChange,
  unit,
  normal,
  error = false,
}) => (
  <div
    className={`rounded-xl border p-3 ${error ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"}`}
  >
    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
      {label}
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={normal}
      className={`w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none border-b border-slate-300 pb-1 min-h-[32px]`}
    />
    <div className="mt-1 flex justify-between text-[9px]">
      <span className="text-blue-500 font-semibold">{unit}</span>
      <span className="text-slate-400">Normal: {normal}</span>
    </div>
  </div>
);

const YesNo = ({ label, value, onChange, error = false }) => (
  <div
    className={`flex items-start gap-3 py-3 border-b border-slate-100 last:border-0 ${error ? "bg-red-50 rounded-xl px-2" : ""}`}
  >
    <span className="text-sm text-slate-700 flex-1 leading-snug pt-0.5">
      {label}
    </span>
    <div className="flex gap-2 shrink-0">
      {["YES", "NO"].map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all min-h-[36px] min-w-[52px] ${
            value === opt
              ? opt === "YES"
                ? "bg-rose-500 border-rose-500 text-white shadow-sm"
                : "bg-emerald-500 border-emerald-500 text-white shadow-sm"
              : "bg-white border-slate-300 text-slate-500 hover:border-blue-400"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const RadioGroup = ({ label, options, value, onChange }) => (
  <div>
    {label && (
      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
        {label}
      </label>
    )}
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all min-h-[36px] ${
            value === opt
              ? "bg-blue-600 border-blue-600 text-white shadow-sm"
              : "bg-white border-slate-300 text-slate-600 hover:border-blue-400"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const ComplaintsTable = ({ complaints, setComplaints }) => {
  const add = () =>
    setComplaints((c) => [
      ...c,
      { complaint: "", duration: "", severity: "", onset: "" },
    ]);
  const remove = (i) => setComplaints((c) => c.filter((_, idx) => idx !== i));
  const update = (i, key, val) =>
    setComplaints((c) =>
      c.map((row, idx) => (idx === i ? { ...row, [key]: val } : row)),
    );
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-100">
              {["Complaint", "Duration", "Severity", "Onset"].map((h) => (
                <th
                  key={h}
                  className="text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 py-2"
                >
                  {h}
                </th>
              ))}
              <th className="w-8" />
            </tr>
          </thead>
          <tbody>
            {complaints.map((row, i) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="px-2 py-1.5">
                  <input
                    value={row.complaint}
                    onChange={(e) => update(i, "complaint", e.target.value)}
                    placeholder="e.g. Headache"
                    className="w-full bg-transparent text-slate-800 focus:outline-none min-w-[120px]"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    value={row.duration}
                    onChange={(e) => update(i, "duration", e.target.value)}
                    placeholder="e.g. 5 days"
                    className="w-full bg-transparent text-slate-800 focus:outline-none min-w-[80px]"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <select
                    value={row.severity}
                    onChange={(e) => update(i, "severity", e.target.value)}
                    className="bg-transparent text-slate-800 focus:outline-none min-w-[100px]"
                  >
                    <option value="">Select</option>
                    {["Mild", "Moderate", "Severe"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-2 py-1.5">
                  <select
                    value={row.onset}
                    onChange={(e) => update(i, "onset", e.target.value)}
                    className="bg-transparent text-slate-800 focus:outline-none min-w-[100px]"
                  >
                    <option value="">Select</option>
                    {["Sudden", "Gradual", "Insidious"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-2 py-1.5">
                  <button
                    onClick={() => remove(i)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
      >
        <Plus className="h-3.5 w-3.5" /> Add Complaint
      </button>
    </div>
  );
};

const FollowupTable = ({ rows, setRows }) => {
  const add = () =>
    setRows((r) => [
      ...r,
      { date: "", symptoms: "", improvement: "", changes: "" },
    ]);
  const remove = (i) => setRows((r) => r.filter((_, idx) => idx !== i));
  const update = (i, key, val) =>
    setRows((r) =>
      r.map((row, idx) => (idx === i ? { ...row, [key]: val } : row)),
    );
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-100">
              {["Date", "Symptoms", "Improvement", "Treatment Changes"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 py-2"
                  >
                    {h}
                  </th>
                ),
              )}
              <th className="w-8" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="px-2 py-1.5">
                  <input
                    type="date"
                    value={row.date}
                    onChange={(e) => update(i, "date", e.target.value)}
                    className="bg-transparent text-slate-800 focus:outline-none min-w-[120px]"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    value={row.symptoms}
                    onChange={(e) => update(i, "symptoms", e.target.value)}
                    className="w-full bg-transparent text-slate-800 focus:outline-none"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <select
                    value={row.improvement}
                    onChange={(e) => update(i, "improvement", e.target.value)}
                    className="bg-transparent text-slate-800 focus:outline-none"
                  >
                    <option value="">Select</option>
                    {["Improved", "Same", "Worsened"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-2 py-1.5">
                  <input
                    value={row.changes}
                    onChange={(e) => update(i, "changes", e.target.value)}
                    className="w-full bg-transparent text-slate-800 focus:outline-none"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <button
                    onClick={() => remove(i)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
      >
        <Plus className="h-3.5 w-3.5" /> Add Follow-up Entry
      </button>
    </div>
  );
};

// ─── PDF Builder ─────────────────────────────────────────────────────────────

const buildPDFHtml = (
  form,
  complaints,
  followups,
) => `<!DOCTYPE html><html><head>
<title>Case Sheet — ${form.name || "Patient"}</title>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 10.5px; color: #1e293b; background: white; }
.page { padding: 16mm 18mm; max-width: 210mm; margin: 0 auto; }
.header { display: flex; align-items: flex-start; justify-content: space-between; border-bottom: 3px solid #1e40af; padding-bottom: 12px; margin-bottom: 14px; }
.header-left { flex: 1; }
.header-right { text-align: right; font-size: 9px; color: #64748b; }
.hosp-name { font-size: 18px; font-weight: 900; color: #1e40af; letter-spacing: 1px; }
.hosp-tagline { font-size: 9px; color: #0ea5e9; font-style: italic; margin: 2px 0 6px; }
.hosp-detail { font-size: 9px; color: #475569; line-height: 1.6; }
.doc-block { background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 8px 12px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; }
.doc-name { font-weight: 800; font-size: 12px; color: #1e40af; }
.doc-details { font-size: 9px; color: #475569; }
.patient-id-row { display: flex; justify-content: space-between; background: #1e40af; color: white; border-radius: 8px; padding: 6px 14px; margin-bottom: 12px; font-size: 10px; }
.patient-id-row span { font-weight: 700; }
.section-hdr { font-size: 8.5px; font-weight: 800; letter-spacing: 2px; color: #1e40af; text-transform: uppercase; background: #eff6ff; border-left: 3px solid #1e40af; padding: 4px 10px; margin: 12px 0 8px; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 18px; }
.grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px 18px; }
.grid4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px 18px; }
.field { margin-bottom: 5px; }
.field label { font-size: 7.5px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; display: block; }
.field .val { border-bottom: 1px solid #cbd5e1; min-height: 17px; padding: 2px 0; font-size: 10.5px; font-weight: 500; }
.field-full .val { border-bottom: 1px solid #cbd5e1; min-height: 32px; padding: 2px 0; font-size: 10.5px; }
.vital-box { border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 8px; background: #f8fafc; }
.vital-box .vl { font-size: 7px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
.vital-box .vv { font-size: 12px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #cbd5e1; min-height: 18px; }
.vital-box .vu { font-size: 7.5px; color: #3b82f6; font-weight: 600; margin-top: 2px; }
.vital-box .vn { font-size: 7px; color: #94a3b8; float: right; margin-top: 2px; }
table.complaints-tbl { width: 100%; border-collapse: collapse; margin-bottom: 6px; }
table.complaints-tbl th { background: #eff6ff; font-size: 8px; font-weight: 800; color: #1e40af; text-transform: uppercase; letter-spacing: 1px; padding: 5px 8px; border: 1px solid #bfdbfe; }
table.complaints-tbl td { padding: 5px 8px; border: 1px solid #e2e8f0; font-size: 10.5px; }
.psi-item { display: flex; justify-content: space-between; align-items: center; padding: 4px 10px; border-bottom: 1px solid #f1f5f9; font-size: 10px; }
.psi-item:last-child { border-bottom: none; }
.psi-box { border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
.followup-tbl { width: 100%; border-collapse: collapse; }
.followup-tbl th { background: #eff6ff; font-size: 8px; font-weight: 800; color: #1e40af; text-transform: uppercase; letter-spacing: 1px; padding: 5px 8px; border: 1px solid #bfdbfe; }
.followup-tbl td { padding: 5px 8px; border: 1px solid #e2e8f0; font-size: 10.5px; }
.consent-box { border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; margin: 10px 0; background: #fafafa; font-size: 10px; color: #475569; line-height: 1.7; }
.sig-row { display: flex; justify-content: space-between; margin-top: 28px; }
.sig-box { text-align: center; }
.sig-val { font-size: 11px; min-height: 24px; border-bottom: 1px solid #1e293b; width: 170px; margin: 0 auto; padding: 0 4px 2px; }
.sig-lbl { font-size: 8px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
.footer { border-top: 1px solid #e2e8f0; margin-top: 18px; padding-top: 8px; display: flex; justify-content: space-between; font-size: 8px; color: #94a3b8; }
.page-num { text-align: right; }
@media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .page { padding: 10mm 14mm; } }
</style></head><body><div class="page">
  <div class="header">
    <div class="header-left">
      <div class="hosp-name">${HOSPITAL.name}</div>
      <div class="hosp-tagline">${HOSPITAL.tagline}</div>
      <div class="hosp-detail">
        📍 ${HOSPITAL.address}<br>
        📞 ${HOSPITAL.phone} &nbsp;|&nbsp; ✉ ${HOSPITAL.email}<br>
        🌐 ${HOSPITAL.website}
      </div>
    </div>
    <div class="header-right">
      <div style="font-weight:800;color:#1e40af;font-size:10px;">PATIENT CASE SHEET</div>
      <div style="margin:4px 0;">AYUSH Reg: <b>${HOSPITAL.ayush}</b></div>
      <div>Form No: CS-2024</div>
    </div>
  </div>

  <div class="doc-block">
    <div>
      <div class="doc-name">${HOSPITAL.doctor}</div>
      <div class="doc-details">${HOSPITAL.qualification} &nbsp;|&nbsp; Reg. No: ${HOSPITAL.regNo}</div>
    </div>
    <div style="text-align:right;">
      <div style="font-size:8.5px;color:#475569;">Consultation Type: <b>OPD</b></div>
    </div>
  </div>

  <div class="patient-id-row">
    <span>UHID / Patient ID: <span style="font-family:monospace">${form.patientId}</span></span>
    <span>Date of Visit: ${formatDate(form.date)}</span>
    <span>Follow-up: ${formatDate(form.followupDate)}</span>
    <span>Next Review: ${formatDate(form.nextReviewDate)}</span>
  </div>

  <div class="section-hdr">Patient Information</div>
  <div class="grid2">
    <div class="field"><label>Full Name</label><div class="val">${form.name}</div></div>
    <div class="field"><label>Contact</label><div class="val">${form.contact ? "+91 " + form.contact : ""}</div></div>
    <div class="field"><label>Age / DOB</label><div class="val">${form.age}${form.dob ? " / " + formatDate(form.dob) : ""}</div></div>
    <div class="field"><label>Sex</label><div class="val">${form.sex}</div></div>
    <div class="field"><label>Blood Group</label><div class="val">${form.bloodGroup}</div></div>
    <div class="field"><label>Marital Status</label><div class="val">${form.maritalStatus}</div></div>
    <div class="field"><label>Email</label><div class="val">${form.email}</div></div>
    <div class="field"><label>Occupation</label><div class="val">${form.occupation}</div></div>
    <div class="field"><label>Emergency Contact</label><div class="val">${form.emergencyName ? form.emergencyName + " — " : ""}${form.emergencyContact ? "+91 " + form.emergencyContact : ""}</div></div>
    <div class="field"><label>Referred By</label><div class="val">${form.refBy}</div></div>
  </div>
  <div class="field" style="margin-top:4px"><label>Address</label><div class="val">${form.address}</div></div>

  <div class="section-hdr">Medical Flags</div>
  <div class="grid3">
    <div class="field"><label>Food Habits</label><div class="val">${form.foodHabits}</div></div>
    <div class="field"><label>Addiction History</label><div class="val">${form.addictionHistory}</div></div>
    <div class="field"><label>Known Allergies</label><div class="val">${form.allergies}</div></div>
  </div>
  <div class="field"><label>Existing Medications</label><div class="val">${form.existingMeds}</div></div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px 18px;margin-top:4px">
    <div class="field"><label>Height</label><div class="val">${form.height}</div></div>
    <div class="field"><label>Weight</label><div class="val">${form.weight}</div></div>
    <div class="field"><label>BMI</label><div class="val">${form.bmi}</div></div>
  </div>

  <div class="section-hdr">Presenting Complaints</div>
  ${
    complaints.filter((c) => c.complaint).length > 0
      ? `
  <table class="complaints-tbl">
    <thead><tr><th>Complaint</th><th>Duration</th><th>Severity</th><th>Onset</th></tr></thead>
    <tbody>${complaints
      .filter((c) => c.complaint)
      .map(
        (c) =>
          `<tr><td>${c.complaint}</td><td>${c.duration}</td><td>${c.severity}</td><td>${c.onset}</td></tr>`,
      )
      .join("")}</tbody>
  </table>`
      : `<div class="field-full"><div class="val">${form.presentingComplaints}</div></div>`
  }
  <div class="grid2" style="margin-top:6px">
    <div class="field-full"><label class="field"><label>Aggravating Factors</label></label><div class="val">${form.aggravatingFactors}</div></div>
    <div class="field-full"><label class="field"><label>Relieving Factors</label></label><div class="val">${form.relievingFactors}</div></div>
  </div>
  <div class="field-full" style="margin-top:4px"><label class="field"><label>Associated Symptoms</label></label><div class="val">${form.associatedSymptoms}</div></div>

  <div class="section-hdr">Medical History</div>
  <div class="grid2">
    <div class="field-full"><label class="field"><label>Past Medical History</label></label><div class="val">${form.pastMedicalHistory}</div></div>
    <div class="field-full"><label class="field"><label>Surgical History</label></label><div class="val">${form.surgicalHistory}</div></div>
    <div class="field-full"><label class="field"><label>Drug History</label></label><div class="val">${form.drugHistory}</div></div>
    <div class="field-full"><label class="field"><label>Family History</label></label><div class="val">${form.familyHistory}</div></div>
    <div class="field-full"><label class="field"><label>Immunization History</label></label><div class="val">${form.immunizationHistory}</div></div>
    <div class="field-full"><label class="field"><label>Previous Treatments</label></label><div class="val">${form.previousTreatments}</div></div>
  </div>

  <div class="section-hdr">Vital Signs</div>
  <div class="grid4">
    ${[
      ["BP", "bp", "mmHg", "<120/80"],
      ["HR", "hr", "bpm", "60–100"],
      ["SpO2", "spo2", "%", ">95%"],
      ["Temp", "temp", "°F", "97–99"],
      ["PR", "pr", "bpm", "60–100"],
      ["Height", "ht", "cm", "—"],
      ["Weight", "wt", "kg", "—"],
    ]
      .map(
        ([l, k, u, n]) =>
          `<div class="vital-box"><div class="vl">${l}</div><div class="vv">${form[k]}</div><div class="vu">${u}<span class="vn">${n}</span></div></div>`,
      )
      .join("")}
  </div>

  ${
    form.sex === "Female"
      ? `
  <div class="section-hdr">Menstrual History</div>
  <div class="grid3">
    <div class="field"><label>Menarche</label><div class="val">${form.menarche}</div></div>
    <div class="field"><label>LMP</label><div class="val">${formatDate(form.lmp)}</div></div>
    <div class="field"><label>Cycle</label><div class="val">${form.cycle}</div></div>
    <div class="field"><label>Flow</label><div class="val">${form.flow}</div></div>
    <div class="field"><label>Dysmenorrhea</label><div class="val">${form.dysmenorrhea}</div></div>
    <div class="field"><label>Leucorrhea</label><div class="val">${form.leucorrhea}</div></div>
    <div class="field"><label>Menopause</label><div class="val">${form.menopause}</div></div>
  </div>`
      : ""
  }

  <div class="section-hdr">General Physical Examination</div>
  <div class="grid4">
    ${[
      ["General Appearance", "generalAppearance"],
      ["Gait", "gait"],
      ["Hydration", "hydration"],
      ["Thirst", "thirst"],
      ["Eyes", "eyes"],
      ["Tongue", "tongue"],
      ["Nails", "nails"],
      ["Skin", "skin"],
      ["Appetite", "appetite"],
      ["Sleep", "sleep"],
      ["Bowel", "bowel"],
      ["Micturition", "micturition"],
      ["Sweat", "sweat"],
    ]
      .map(
        ([l, k]) =>
          `<div class="field"><label>${l}</label><div class="val">${form[k]}</div></div>`,
      )
      .join("")}
  </div>

  <div class="section-hdr">Systemic Examination</div>
  <div class="grid3">
    ${[
      ["Respiratory System", "respiratorySystem"],
      ["Gastrointestinal System", "gastrointestinalSystem"],
      ["Renal System", "renalSystem"],
      ["Locomotor System", "locomotorSystem"],
      ["Cardiovascular System", "cardiovascularSystem"],
      ["Central Nervous System", "cns"],
    ]
      .map(
        ([l, k]) =>
          `<div class="field"><label>${l}</label><div class="val">${form[k]}</div></div>`,
      )
      .join("")}
  </div>
  <div class="grid4" style="margin-top:6px">
    ${[
      ["G", "obsG"],
      ["A", "obsA"],
      ["L", "obsL"],
      ["S", "obsS"],
    ]
      .map(
        ([l, k]) =>
          `<div class="field"><label>${l}</label><div class="val">${form[k]}</div></div>`,
      )
      .join("")}
  </div>
  <div class="field-full" style="margin-top:4px"><label class="field"><label>Others</label></label><div class="val">${form.others}</div></div>

  <div class="section-hdr">Psychological Score Index (PSI)</div>
  <div class="psi-box">
    ${[
      ["Do you feel sad / low / depressed?", "psi_sad"],
      ["Do you feel anxious / nervous / worried?", "psi_anxious"],
      ["Do you feel tired / low in energy?", "psi_tired"],
      ["Do you find it hard to concentrate?", "psi_concentrate"],
      ["Do you feel hopeless about the future?", "psi_hopeless"],
      ["Do you feel loss of interest in activities?", "psi_interest"],
    ]
      .map(
        ([q, k]) =>
          `<div class="psi-item"><span>${q}</span><span style="font-weight:800;padding:2px 10px;border-radius:20px;font-size:9px;background:${form[k] === "YES" ? "#fee2e2;color:#dc2626" : form[k] === "NO" ? "#dcfce7;color:#16a34a" : "#f1f5f9;color:#94a3b8"}">${form[k] || "—"}</span></div>`,
      )
      .join("")}
  </div>

  <div class="section-hdr">Differential Diagnosis & Investigations</div>
  <div class="grid2">
    <div class="field-full"><label class="field"><label>Differential Diagnosis</label></label><div class="val">${form.differentialDiagnosis}</div></div>
    <div class="field-full"><label class="field"><label>Investigations Advised</label></label><div class="val">${form.investigations}</div></div>
  </div>

  <div class="section-hdr">Naturopathy Investigation — Pulse & Iris Diagnosis</div>
  <div class="grid4">
    <div class="field"><label>Rhythm</label><div class="val">${form.pulseRhythm}</div></div>
    <div class="field"><label>Volume</label><div class="val">${form.pulseVolume}</div></div>
    <div class="field"><label>Symmetry</label><div class="val">${form.pulseSymmetry}</div></div>
    <div class="field"><label>Dosha</label><div class="val">${form.pulseDosha}</div></div>
  </div>
  <div class="grid2" style="margin-top:6px">
    <div class="field"><label>Prakriti</label><div class="val">${form.prakriti}</div></div>
    <div class="field"><label>Body Constitution</label><div class="val">${form.bodyConstitution}</div></div>
  </div>
  <div class="field-full" style="margin-top:4px"><label class="field"><label>Iris Diagnosis</label></label><div class="val">${form.irisDiagnosis}</div></div>

  <div class="section-hdr">Diagnosis</div>
  <div class="grid3">
    <div class="field-full"><label class="field"><label>Provisional Diagnosis</label></label><div class="val">${form.provisionalDiagnosis}</div></div>
    <div class="field-full"><label class="field"><label>Final Diagnosis</label></label><div class="val">${form.diagnosis}</div></div>
    <div class="field-full"><label class="field"><label>ICD-10 Code</label></label><div class="val">${form.icd10}</div></div>
  </div>
  <div class="field-full" style="margin-top:4px"><label class="field"><label>AYUSH Diagnosis</label></label><div class="val">${form.ayushDiagnosis}</div></div>

  <div class="section-hdr">Treatment Plan</div>
  <div class="grid2">
    <div class="field-full"><label class="field"><label>Treatment</label></label><div class="val">${form.treatment}</div></div>
    <div class="field-full"><label class="field"><label>Medicines Prescribed</label></label><div class="val">${form.medicines}</div></div>
    <div class="field-full"><label class="field"><label>Yoga Therapy</label></label><div class="val">${form.yogaTherapy}</div></div>
    <div class="field-full"><label class="field"><label>Diet Recommendations</label></label><div class="val">${form.dietRecommendations}</div></div>
    <div class="field-full"><label class="field"><label>Hydrotherapy</label></label><div class="val">${form.hydrotherapy}</div></div>
    <div class="field-full"><label class="field"><label>Lifestyle Advice</label></label><div class="val">${form.lifestyleAdvice}</div></div>
  </div>
  <div class="grid2" style="margin-top:4px">
    <div class="field"><label>Treatment Duration</label><div class="val">${form.treatmentDuration}</div></div>
    <div class="field"><label>Follow-up Instructions</label><div class="val">${form.followupInstructions}</div></div>
  </div>

  ${
    followups.filter((f) => f.date).length > 0
      ? `
  <div class="section-hdr">Follow-up Monitoring</div>
  <table class="followup-tbl">
    <thead><tr><th>Date</th><th>Symptoms</th><th>Improvement</th><th>Treatment Changes</th></tr></thead>
    <tbody>${followups
      .filter((f) => f.date)
      .map(
        (f) =>
          `<tr><td>${formatDate(f.date)}</td><td>${f.symptoms}</td><td>${f.improvement}</td><td>${f.changes}</td></tr>`,
      )
      .join("")}</tbody>
  </table>`
      : ""
  }

  <div class="section-hdr">Patient Consent</div>
  <div class="consent-box">
    I, <b>${form.name || "_______________"}</b>, hereby consent to the examination, investigations, and treatment procedures recommended by the doctor. I confirm that the information provided above is accurate to the best of my knowledge. I acknowledge that this information will be used for medical record-keeping in compliance with applicable data protection laws.
    <br><br>
    Consent Given: <b style="color:${form.consentGiven === "YES" ? "#16a34a" : "#dc2626"}">${form.consentGiven || "—"}</b>
  </div>

  <div class="sig-row">
    <div class="sig-box"><div class="sig-val">${form.patientSignature || ""}</div><div class="sig-lbl">Patient / Guardian Signature</div></div>
    <div class="sig-box"><div class="sig-val">${form.doctorSignature || ""}</div><div class="sig-lbl">${HOSPITAL.doctor} — Doctor's Signature & Seal</div></div>
  </div>

  <div class="footer">
    <div>${HOSPITAL.name} | ${HOSPITAL.phone} | ${HOSPITAL.ayush}</div>
    <div class="page-num">Page 1 of 1 — Confidential Medical Record</div>
  </div>
</div></body></html>`;

// ─── Main Component ──────────────────────────────────────────────────────────

export default function CaseSheet() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    ...initialState,
    patientId: generatePatientId(),
  });
  const [errors, setErrors] = useState({});
  const [showValidation, setShowValidation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [complaints, setComplaints] = useState([
    { complaint: "", duration: "", severity: "", onset: "" },
  ]);
  const [followups, setFollowups] = useState([]);

  const set = (key) => (val) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key])
      setErrors((e) => {
        const n = { ...e };
        delete n[key];
        return n;
      });
  };

  // Auto-calc BMI
  useEffect(() => {
    const h = parseFloat(form.ht || form.height);
    const w = parseFloat(form.wt || form.weight);
    if (h > 0 && w > 0) {
      const hm = h / 100;
      set("bmi")(String((w / (hm * hm)).toFixed(1)));
    }
  }, [form.ht, form.height, form.wt, form.weight]);

  const handleExport = (shareWhatsApp = false) => {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setShowValidation(true);
      return;
    }
    setErrors({});
    setShowValidation(false);
    const html = buildPDFHtml(form, complaints, followups);
    const printWindow = window.open("", "_blank");
    printWindow.document.write(html);
    printWindow.document.close();
    if (shareWhatsApp) {
      const msg = encodeURIComponent(
        `📋 *Case Sheet — ${form.name}*\n` +
          `🆔 Patient ID: ${form.patientId}\n` +
          `📅 Date: ${formatDate(form.date)}\n` +
          `📞 Contact: +91 ${form.contact}\n` +
          `🩺 Diagnosis: ${form.diagnosis}\n\n` +
          `_Issued by ${HOSPITAL.name}_`,
      );
      const phone = form.contact ? `91${form.contact}` : "";
      setTimeout(
        () =>
          window.open(
            phone
              ? `https://wa.me/${phone}?text=${msg}`
              : `https://wa.me/?text=${msg}`,
            "_blank",
          ),
        800,
      );
    }
    setTimeout(() => printWindow.print(), 500);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const reset = () => {
    setForm({ ...initialState, patientId: generatePatientId() });
    setErrors({});
    setShowValidation(false);
    setComplaints([{ complaint: "", duration: "", severity: "", onset: "" }]);
    setFollowups([]);
  };

  const missingCount = Object.keys(errors).length;
  const isFemale = form.sex === "Female";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-md transition-all hover:shadow-lg"
      >
        <FileText className="h-4 w-4" />
        Fill Case Sheet
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-4xl sm:mx-auto max-h-[97vh] sm:max-h-[94vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex-shrink-0 bg-gradient-to-r from-blue-700 to-blue-600 rounded-t-2xl">
              <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-xl p-2">
                    <Stethoscope className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-black text-white text-sm sm:text-base tracking-wide">
                      {HOSPITAL.name}
                    </div>
                    <div className="text-blue-200 text-[10px]">
                      {HOSPITAL.tagline}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setOpen(false);
                    setShowValidation(false);
                    setErrors({});
                  }}
                  className="text-white/70 hover:text-white transition-colors p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="px-4 sm:px-6 pb-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-blue-200">
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {HOSPITAL.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {HOSPITAL.address}
                </span>
                <span className="font-semibold text-white/70">
                  AYUSH: {HOSPITAL.ayush}
                </span>
              </div>
            </div>

            {/* Doctor + Patient ID strip */}
            <div className="flex-shrink-0 px-4 sm:px-6 py-2.5 bg-blue-50 border-b border-blue-100 flex flex-wrap gap-3 items-center justify-between">
              <div className="text-xs text-slate-600">
                <span className="font-bold text-blue-700">
                  {HOSPITAL.doctor}
                </span>
                <span className="ml-2 text-slate-400">
                  {HOSPITAL.qualification} | Reg: {HOSPITAL.regNo}
                </span>
              </div>
              <div className="text-xs font-mono bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                {form.patientId}
              </div>
            </div>

            {/* Validation Banner */}
            {showValidation && missingCount > 0 && (
              <div className="mx-4 mt-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3 flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-red-700 mb-1">
                    {missingCount} required field{missingCount > 1 ? "s" : ""}{" "}
                    missing
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.values(errors).map((label) => (
                      <span
                        key={label}
                        className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setShowValidation(false)}
                  className="text-red-400 hover:text-red-600 shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {showSuccess && (
              <div className="mx-4 mt-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-3 flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                <p className="text-sm font-semibold text-emerald-700">
                  Case sheet exported successfully!
                </p>
              </div>
            )}

            {/* Body */}
            <div className="overflow-y-auto flex-1 px-3 sm:px-6 py-4 space-y-1">
              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <DateField
                  label="Date of Visit *"
                  value={form.date}
                  onChange={set("date")}
                  error={!!errors.date}
                />
                <DateField
                  label="Follow-up Date"
                  value={form.followupDate}
                  onChange={set("followupDate")}
                />
                <DateField
                  label="Next Review Date"
                  value={form.nextReviewDate}
                  onChange={set("nextReviewDate")}
                />
              </div>

              {/* Patient Info */}
              <SectionCard icon={User} title="Patient Information" color="blue">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <Field
                    label="Full Name *"
                    value={form.name}
                    onChange={set("name")}
                    error={!!errors.name}
                    placeholder="Enter full name"
                  />
                  <PhoneField
                    label="Contact *"
                    value={form.contact}
                    onChange={set("contact")}
                    error={!!errors.contact}
                  />
                  <Field
                    label="Age *"
                    value={form.age}
                    onChange={set("age")}
                    error={!!errors.age}
                    placeholder="e.g. 35 years"
                  />
                  <DateField
                    label="Date of Birth"
                    value={form.dob}
                    onChange={set("dob")}
                  />
                  <SelectField
                    label="Sex *"
                    value={form.sex}
                    onChange={set("sex")}
                    options={["Male", "Female", "Other"]}
                    error={!!errors.sex}
                  />
                  <SelectField
                    label="Blood Group *"
                    value={form.bloodGroup}
                    onChange={set("bloodGroup")}
                    options={[
                      "A+",
                      "A−",
                      "B+",
                      "B−",
                      "AB+",
                      "AB−",
                      "O+",
                      "O−",
                      "Unknown",
                    ]}
                    error={!!errors.bloodGroup}
                  />
                  <SelectField
                    label="Marital Status"
                    value={form.maritalStatus}
                    onChange={set("maritalStatus")}
                    options={[
                      "Single",
                      "Married",
                      "Divorced",
                      "Widowed",
                      "Other",
                    ]}
                  />
                  <SelectField
                    label="Occupation"
                    value={form.occupation}
                    onChange={set("occupation")}
                    options={[
                      "Student",
                      "Employed",
                      "Self-Employed",
                      "Homemaker",
                      "Retired",
                      "Unemployed",
                      "Other",
                    ]}
                  />
                  <Field
                    label="Email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="patient@email.com"
                  />
                  <Field
                    label="Referred By"
                    value={form.refBy}
                    onChange={set("refBy")}
                  />
                  <Field
                    label="Emergency Contact Name"
                    value={form.emergencyName}
                    onChange={set("emergencyName")}
                  />
                  <PhoneField
                    label="Emergency Contact Number"
                    value={form.emergencyContact}
                    onChange={set("emergencyContact")}
                  />
                  <div className="sm:col-span-2">
                    <Field
                      label="Address *"
                      value={form.address}
                      onChange={set("address")}
                      error={!!errors.address}
                      placeholder="Full address with PIN code"
                    />
                  </div>
                </div>
              </SectionCard>

              {/* Medical Flags */}
              <SectionCard
                icon={Shield}
                title="Medical Flags & Lifestyle"
                color="amber"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <SelectField
                    label="Food Habits"
                    value={form.foodHabits}
                    onChange={set("foodHabits")}
                    options={[
                      "Vegetarian",
                      "Non-Vegetarian",
                      "Vegan",
                      "Eggetarian",
                      "Mixed",
                    ]}
                  />
                  <SelectField
                    label="Addiction History"
                    value={form.addictionHistory}
                    onChange={set("addictionHistory")}
                    options={[
                      "None",
                      "Tobacco",
                      "Alcohol",
                      "Tobacco & Alcohol",
                      "Drugs",
                      "Other",
                    ]}
                  />
                  <Field
                    label="Known Allergies"
                    value={form.allergies}
                    onChange={set("allergies")}
                    placeholder="e.g. Penicillin, Dust, Peanuts"
                  />
                  <Field
                    label="Existing Medications"
                    value={form.existingMeds}
                    onChange={set("existingMeds")}
                    placeholder="Current drugs/supplements"
                  />
                  <VitalField
                    label="Height"
                    value={form.height}
                    onChange={set("height")}
                    unit="cm"
                    normal="—"
                    error={false}
                  />
                  <VitalField
                    label="Weight"
                    value={form.weight}
                    onChange={set("weight")}
                    unit="kg"
                    normal="—"
                    error={false}
                  />
                  <VitalField
                    label="BMI (Auto)"
                    value={form.bmi}
                    onChange={set("bmi")}
                    unit="kg/m²"
                    normal="18.5–24.9"
                    error={false}
                  />
                </div>
              </SectionCard>

              {/* Complaints */}
              <SectionCard
                icon={ClipboardList}
                title="Presenting Complaints"
                color="rose"
              >
                <ComplaintsTable
                  complaints={complaints}
                  setComplaints={setComplaints}
                />
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <Field
                    label="Aggravating Factors"
                    value={form.aggravatingFactors}
                    onChange={set("aggravatingFactors")}
                    multiline
                    placeholder="What makes it worse?"
                  />
                  <Field
                    label="Relieving Factors"
                    value={form.relievingFactors}
                    onChange={set("relievingFactors")}
                    multiline
                    placeholder="What makes it better?"
                  />
                  <div className="sm:col-span-2">
                    <Field
                      label="Associated Symptoms"
                      value={form.associatedSymptoms}
                      onChange={set("associatedSymptoms")}
                      multiline
                      placeholder="Other symptoms accompanying the chief complaint"
                    />
                  </div>
                </div>
              </SectionCard>

              {/* History */}
              <SectionCard
                icon={FileText}
                title="Medical History"
                color="indigo"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <Field
                    label="Past Medical History"
                    value={form.pastMedicalHistory}
                    onChange={set("pastMedicalHistory")}
                    multiline
                  />
                  <Field
                    label="Surgical History"
                    value={form.surgicalHistory}
                    onChange={set("surgicalHistory")}
                    multiline
                  />
                  <Field
                    label="Drug History"
                    value={form.drugHistory}
                    onChange={set("drugHistory")}
                    multiline
                  />
                  <Field
                    label="Family History"
                    value={form.familyHistory}
                    onChange={set("familyHistory")}
                    multiline
                  />
                  <Field
                    label="Immunization History"
                    value={form.immunizationHistory}
                    onChange={set("immunizationHistory")}
                    multiline
                  />
                  <Field
                    label="Previous Treatments"
                    value={form.previousTreatments}
                    onChange={set("previousTreatments")}
                    multiline
                  />
                </div>
              </SectionCard>

              {/* Vitals */}
              <SectionCard icon={Activity} title="Vital Signs" color="teal">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <VitalField
                    label="BP *"
                    value={form.bp}
                    onChange={set("bp")}
                    unit="mmHg"
                    normal="<120/80"
                    error={!!errors.bp}
                  />
                  <VitalField
                    label="HR *"
                    value={form.hr}
                    onChange={set("hr")}
                    unit="bpm"
                    normal="60–100"
                    error={!!errors.hr}
                  />
                  <VitalField
                    label="SpO2 *"
                    value={form.spo2}
                    onChange={set("spo2")}
                    unit="%"
                    normal=">95%"
                    error={!!errors.spo2}
                  />
                  <VitalField
                    label="Temp *"
                    value={form.temp}
                    onChange={set("temp")}
                    unit="°F"
                    normal="97–99"
                    error={!!errors.temp}
                  />
                  <VitalField
                    label="PR"
                    value={form.pr}
                    onChange={set("pr")}
                    unit="bpm"
                    normal="60–100"
                    error={false}
                  />
                  <VitalField
                    label="HT"
                    value={form.ht}
                    onChange={set("ht")}
                    unit="cm"
                    normal="—"
                    error={false}
                  />
                  <VitalField
                    label="WT"
                    value={form.wt}
                    onChange={set("wt")}
                    unit="kg"
                    normal="—"
                    error={false}
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-2">
                  * Required fields. Enter values with units where applicable
                  (e.g. 120/80 for BP).
                </p>
              </SectionCard>

              {/* Menstrual — only for female */}
              {isFemale && (
                <SectionCard
                  icon={Heart}
                  title="Menstrual History"
                  color="rose"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    <Field
                      label="Menarche"
                      value={form.menarche}
                      onChange={set("menarche")}
                      placeholder="Age at menarche"
                    />
                    <DateField
                      label="LMP (Last Menstrual Period)"
                      value={form.lmp}
                      onChange={set("lmp")}
                    />
                    <SelectField
                      label="Cycle"
                      value={form.cycle}
                      onChange={set("cycle")}
                      options={["Regular", "Irregular"]}
                    />
                    <SelectField
                      label="Flow"
                      value={form.flow}
                      onChange={set("flow")}
                      options={["Normal", "Scanty", "Excessive", "Prolonged"]}
                    />
                    <SelectField
                      label="Dysmenorrhea"
                      value={form.dysmenorrhea}
                      onChange={set("dysmenorrhea")}
                      options={["Present", "Absent"]}
                    />
                    <SelectField
                      label="Leucorrhea"
                      value={form.leucorrhea}
                      onChange={set("leucorrhea")}
                      options={["Present", "Absent"]}
                    />
                    <SelectField
                      label="Menopause"
                      value={form.menopause}
                      onChange={set("menopause")}
                      options={["No", "Yes", "Peri-menopausal"]}
                    />
                  </div>
                </SectionCard>
              )}

              {/* GPE */}
              <SectionCard
                icon={Stethoscope}
                title="General Physical Examination"
                color="emerald"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <SelectField
                    label="General Appearance"
                    value={form.generalAppearance}
                    onChange={set("generalAppearance")}
                    options={[
                      "Well-nourished",
                      "Moderately-nourished",
                      "Poorly-nourished",
                      "Obese",
                      "Cachectic",
                    ]}
                  />
                  <SelectField
                    label="Gait"
                    value={form.gait}
                    onChange={set("gait")}
                    options={[
                      "Normal",
                      "Antalgic",
                      "Ataxic",
                      "Hemiplegic",
                      "Waddling",
                      "Other",
                    ]}
                  />
                  <SelectField
                    label="Hydration"
                    value={form.hydration}
                    onChange={set("hydration")}
                    options={[
                      "Well-hydrated",
                      "Mildly dehydrated",
                      "Moderately dehydrated",
                      "Severely dehydrated",
                    ]}
                  />
                  <SelectField
                    label="Thirst"
                    value={form.thirst}
                    onChange={set("thirst")}
                    options={["Normal", "Increased", "Decreased"]}
                  />
                  <SelectField
                    label="Eyes"
                    value={form.eyes}
                    onChange={set("eyes")}
                    options={[
                      "Normal",
                      "Pale conjunctiva",
                      "Icteric sclera",
                      "Congested",
                      "Sunken",
                    ]}
                  />
                  <SelectField
                    label="Tongue"
                    value={form.tongue}
                    onChange={set("tongue")}
                    options={[
                      "Clean & moist",
                      "Coated",
                      "Dry",
                      "Furred",
                      "Geographic",
                    ]}
                  />
                  <SelectField
                    label="Nails"
                    value={form.nails}
                    onChange={set("nails")}
                    options={[
                      "Normal",
                      "Pale",
                      "Clubbing",
                      "Koilonychia",
                      "Cyanotic",
                    ]}
                  />
                  <SelectField
                    label="Skin"
                    value={form.skin}
                    onChange={set("skin")}
                    options={[
                      "Normal",
                      "Dry",
                      "Oily",
                      "Rash",
                      "Pigmentation",
                      "Jaundice",
                      "Pallor",
                    ]}
                  />
                  <SelectField
                    label="Appetite"
                    value={form.appetite}
                    onChange={set("appetite")}
                    options={["Normal", "Increased", "Decreased", "Anorexia"]}
                  />
                  <SelectField
                    label="Sleep"
                    value={form.sleep}
                    onChange={set("sleep")}
                    options={[
                      "Normal",
                      "Disturbed",
                      "Insomnia",
                      "Hypersomnia",
                      "Night terrors",
                    ]}
                  />
                  <SelectField
                    label="Bowel"
                    value={form.bowel}
                    onChange={set("bowel")}
                    options={[
                      "Normal",
                      "Constipation",
                      "Diarrhea",
                      "Alternating",
                      "Mucus/blood in stools",
                    ]}
                  />
                  <SelectField
                    label="Micturition"
                    value={form.micturition}
                    onChange={set("micturition")}
                    options={[
                      "Normal",
                      "Increased frequency",
                      "Decreased",
                      "Burning",
                      "Hesitancy",
                      "Incontinence",
                    ]}
                  />
                  <SelectField
                    label="Sweat"
                    value={form.sweat}
                    onChange={set("sweat")}
                    options={[
                      "Normal",
                      "Excessive",
                      "Reduced",
                      "Night sweats",
                      "Absence",
                    ]}
                  />
                </div>
              </SectionCard>

              {/* Systemic */}
              <SectionCard
                icon={Activity}
                title="Systemic Examination"
                color="violet"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    ["Respiratory System", "respiratorySystem"],
                    ["Gastrointestinal System", "gastrointestinalSystem"],
                    ["Renal System", "renalSystem"],
                    ["Locomotor System", "locomotorSystem"],
                    ["Cardiovascular System", "cardiovascularSystem"],
                    ["Central Nervous System", "cns"],
                  ].map(([l, k]) => (
                    <SelectField
                      key={k}
                      label={l}
                      value={form[k]}
                      onChange={set(k)}
                      options={["Normal", "Abnormal — see notes"]}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                  {[
                    ["G", "obsG"],
                    ["A", "obsA"],
                    ["L", "obsL"],
                    ["S", "obsS"],
                  ].map(([l, k]) => (
                    <Field
                      key={k}
                      label={l}
                      value={form[k]}
                      onChange={set(k)}
                    />
                  ))}
                </div>
                <div className="mt-3">
                  <Field
                    label="Others / Notes"
                    value={form.others}
                    onChange={set("others")}
                    multiline
                  />
                </div>
              </SectionCard>

              {/* PSI */}
              <SectionCard
                icon={Brain}
                title="Psychological Score Index (PSI)"
                color="violet"
              >
                <div className="bg-slate-50 rounded-xl px-3 py-1 divide-y divide-slate-100">
                  {[
                    ["Do you feel sad / low / depressed?", "psi_sad"],
                    ["Do you feel anxious / nervous / worried?", "psi_anxious"],
                    ["Do you feel tired / low in energy?", "psi_tired"],
                    ["Do you find it hard to concentrate?", "psi_concentrate"],
                    ["Do you feel hopeless about the future?", "psi_hopeless"],
                    [
                      "Do you feel loss of interest in activities?",
                      "psi_interest",
                    ],
                  ].map(([q, k]) => (
                    <YesNo
                      key={k}
                      label={q}
                      value={form[k]}
                      onChange={set(k)}
                      error={!!errors[k]}
                    />
                  ))}
                </div>
                <div className="mt-3 text-[10px] text-slate-400 bg-blue-50 rounded-xl px-3 py-2 border border-blue-100">
                  ⚠️ A score of 4+ YES responses may indicate significant
                  psychological distress. Consider referral to a mental health
                  professional.
                </div>
              </SectionCard>

              {/* Differential & Investigations */}
              <SectionCard
                icon={ClipboardList}
                title="Differential Diagnosis & Investigations"
                color="slate"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <Field
                    label="Differential Diagnosis"
                    value={form.differentialDiagnosis}
                    onChange={set("differentialDiagnosis")}
                    multiline
                  />
                  <Field
                    label="Investigations Advised"
                    value={form.investigations}
                    onChange={set("investigations")}
                    multiline
                    placeholder="Blood tests, imaging, etc."
                  />
                </div>
              </SectionCard>

              {/* Pulse & Naturopathy */}
              <SectionCard
                icon={Leaf}
                title="Naturopathy Investigation — Pulse & Iris Diagnosis"
                color="emerald"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <RadioGroup
                    label="Rhythm"
                    options={["REGULAR", "IRREGULAR"]}
                    value={form.pulseRhythm}
                    onChange={set("pulseRhythm")}
                  />
                  <RadioGroup
                    label="Volume"
                    options={["HIGH", "NORMAL", "LOW"]}
                    value={form.pulseVolume}
                    onChange={set("pulseVolume")}
                  />
                  <RadioGroup
                    label="Symmetry"
                    options={["EQUAL", "UNEQUAL"]}
                    value={form.pulseSymmetry}
                    onChange={set("pulseSymmetry")}
                  />
                  <RadioGroup
                    label="Dosha"
                    options={["VATA", "PITTA", "KAPHA", "TRIDOSHA"]}
                    value={form.pulseDosha}
                    onChange={set("pulseDosha")}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3">
                  <RadioGroup
                    label="Prakriti"
                    options={[
                      "VATA",
                      "PITTA",
                      "KAPHA",
                      "VATA-PITTA",
                      "PITTA-KAPHA",
                      "VATA-KAPHA",
                      "TRIDOSHA",
                    ]}
                    value={form.prakriti}
                    onChange={set("prakriti")}
                  />
                  <SelectField
                    label="Body Constitution"
                    value={form.bodyConstitution}
                    onChange={set("bodyConstitution")}
                    options={["Ectomorph", "Mesomorph", "Endomorph", "Mixed"]}
                  />
                </div>
                <div className="mt-3">
                  <Field
                    label="Iris Diagnosis"
                    value={form.irisDiagnosis}
                    onChange={set("irisDiagnosis")}
                    multiline
                    placeholder="Iridology findings..."
                  />
                </div>
              </SectionCard>

              {/* Diagnosis */}
              <SectionCard icon={Stethoscope} title="Diagnosis" color="blue">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <Field
                    label="Provisional Diagnosis"
                    value={form.provisionalDiagnosis}
                    onChange={set("provisionalDiagnosis")}
                    multiline
                  />
                  <Field
                    label="Final Diagnosis *"
                    value={form.diagnosis}
                    onChange={set("diagnosis")}
                    multiline
                    error={!!errors.diagnosis}
                  />
                  <Field
                    label="ICD-10 Code"
                    value={form.icd10}
                    onChange={set("icd10")}
                    placeholder="e.g. J00, M79.3"
                  />
                  <Field
                    label="AYUSH Diagnosis"
                    value={form.ayushDiagnosis}
                    onChange={set("ayushDiagnosis")}
                    multiline
                  />
                </div>
              </SectionCard>

              {/* Treatment */}
              <SectionCard icon={Heart} title="Treatment Plan" color="teal">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <Field
                    label="Treatment *"
                    value={form.treatment}
                    onChange={set("treatment")}
                    multiline
                    error={!!errors.treatment}
                  />
                  <Field
                    label="Medicines Prescribed"
                    value={form.medicines}
                    onChange={set("medicines")}
                    multiline
                    placeholder="Drug name, dose, frequency, duration"
                  />
                  <Field
                    label="Yoga Therapy"
                    value={form.yogaTherapy}
                    onChange={set("yogaTherapy")}
                    multiline
                    placeholder="Asanas, pranayama..."
                  />
                  <Field
                    label="Diet Recommendations"
                    value={form.dietRecommendations}
                    onChange={set("dietRecommendations")}
                    multiline
                  />
                  <Field
                    label="Hydrotherapy"
                    value={form.hydrotherapy}
                    onChange={set("hydrotherapy")}
                    multiline
                    placeholder="Hip bath, steam, etc."
                  />
                  <Field
                    label="Lifestyle Advice"
                    value={form.lifestyleAdvice}
                    onChange={set("lifestyleAdvice")}
                    multiline
                  />
                  <Field
                    label="Treatment Duration"
                    value={form.treatmentDuration}
                    onChange={set("treatmentDuration")}
                    placeholder="e.g. 4 weeks"
                  />
                  <Field
                    label="Follow-up Instructions"
                    value={form.followupInstructions}
                    onChange={set("followupInstructions")}
                    multiline
                  />
                </div>
              </SectionCard>

              {/* Follow-up Monitoring */}
              <SectionCard
                icon={Calendar}
                title="Follow-up Monitoring"
                color="indigo"
              >
                <FollowupTable rows={followups} setRows={setFollowups} />
              </SectionCard>

              {/* Consent */}
              <SectionCard icon={Shield} title="Patient Consent" color="slate">
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 leading-relaxed mb-4 border border-slate-200">
                  I,{" "}
                  <span className="font-bold text-slate-800">
                    {form.name || "___________"}
                  </span>
                  , hereby consent to the examination, investigations, and
                  treatment procedures recommended by the doctor. I confirm that
                  the information provided is accurate and may be used for
                  medical record-keeping.
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-slate-700">
                    Consent Given *
                  </span>
                  <div className="flex gap-2">
                    {["YES", "NO"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => set("consentGiven")(opt)}
                        className={`px-5 py-2 rounded-full text-sm font-bold border transition-all ${
                          form.consentGiven === opt
                            ? opt === "YES"
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : "bg-rose-500 border-rose-500 text-white"
                            : errors.consentGiven
                              ? "bg-red-50 border-red-300 text-red-400"
                              : "bg-white border-slate-300 text-slate-500 hover:border-blue-400"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                  <Field
                    label="Patient / Guardian Signature"
                    value={form.patientSignature}
                    onChange={set("patientSignature")}
                  />
                  <Field
                    label="Doctor's Signature"
                    value={form.doctorSignature}
                    onChange={set("doctorSignature")}
                    hint="(will appear as printed name)"
                  />
                </div>
              </SectionCard>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
              <button
                onClick={reset}
                className="text-sm text-slate-400 hover:text-slate-600 font-medium transition-colors min-h-[44px] flex items-center"
              >
                ↺ Reset & New Patient
              </button>
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    setOpen(false);
                    setShowValidation(false);
                    setErrors({});
                  }}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-100 transition-all min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleExport(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm transition-all min-h-[44px]"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </button>
                <button
                  onClick={() => handleExport(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all min-h-[44px]"
                >
                  <Download className="h-4 w-4" /> Export PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
