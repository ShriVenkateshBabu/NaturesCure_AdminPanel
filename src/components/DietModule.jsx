import { useState } from "react";
import {
  X,
  Leaf,
  Plus,
  Download,
  MessageCircle,
  ChevronDown,
} from "lucide-react";

// ─── Diet item presets per card ───────────────────────────────────────────────
const DIET_PRESETS = {
  Breakfast: [
    "Idly / Dosa",
    "Oats Porridge",
    "Fruit Salad",
    "Sprouts",
    "Ragi Kanji",
    "Poha",
    "Upma",
  ],
  Lunch: [
    "Brown Rice",
    "Millet Rice",
    "Sambar & Veg",
    "Salad",
    "Buttermilk",
    "Kootu",
    "Rasam",
  ],
  Dinner: [
    "Wheat Chapathi",
    "Vegetable Soup",
    "Steamed Veg",
    "Khichdi",
    "Herbal Tea",
    "Broken Wheat",
    "Vegetable Stew",
  ],
  "Juice Therapy": [
    "Bitter Gourd Juice",
    "Ash Gourd Juice",
    "Pomegranate Juice",
    "Wheat Grass Juice",
    "Amla Juice",
    "Carrot + Beetroot",
    "Moringa Juice",
  ],
  "Infused Water": [
    "Cumin Water",
    "Coriander Water",
    "Methi Water",
    "Triphala Water",
    "Tulsi Water",
    "Ginger Water",
    "Sabja Water",
  ],
};

const EMOJIS = {
  Breakfast: "🍚",
  Lunch: "🥗",
  Dinner: "🍲",
  "Juice Therapy": "🥤",
  "Infused Water": "🫙",
};

const CARD_COLORS = {
  Breakfast:       { border: "#bcd4c8", bg: "#f4fbf7", title: "#1a5c38", badge: "#e8f5ee" },
  Lunch:           { border: "#c8d4bc", bg: "#f7fbf4", title: "#3a5c1a", badge: "#edf5e8" },
  Dinner:          { border: "#b8c8d8", bg: "#f4f8fb", title: "#1a3c5c", badge: "#e8f0f5" },
  "Juice Therapy": { border: "#d4c8b8", bg: "#fbf8f4", title: "#5c3a1a", badge: "#f5ede8" },
  "Infused Water": { border: "#c8b8d4", bg: "#f8f4fb", title: "#3a1a5c", badge: "#ede8f5" },
};

const HOSPITAL = {
  name: "Ayush Hub",
  doctor: "Dr. MahaLakshmi",
  qualification: "BNYS",
  phone: "+91 8300065899",
};

// ─── YES / NO pill buttons ────────────────────────────────────────────────────
function YNPills({ value, onChange }) {
  return (
    <div className="flex gap-1 shrink-0">
      {[
        { opt: "YES", label: "Y", activeClass: "bg-emerald-500 border-emerald-500 text-white", inactiveClass: "bg-white border-slate-300 text-slate-400 hover:border-emerald-400 hover:text-emerald-500" },
        { opt: "NO",  label: "N", activeClass: "bg-rose-500 border-rose-500 text-white",     inactiveClass: "bg-white border-slate-300 text-slate-400 hover:border-rose-400 hover:text-rose-500" },
      ].map(({ opt, label, activeClass, inactiveClass }) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(value === opt ? "" : opt)}
          className={`w-7 h-6 rounded-full text-[10px] font-black border transition-all ${value === opt ? activeClass : inactiveClass}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ─── Single diet card (collapsible) ──────────────────────────────────────────
function DietCard({ title, vals, setVals, custom, setCustom }) {
  const [open, setOpen] = useState(true);
  const colors = CARD_COLORS[title];
  const items = DIET_PRESETS[title];

  const toggleVal = (item, v) =>
    setVals((prev) => ({ ...prev, [item]: prev[item] === v ? "" : v }));

  const addCustom = () =>
    setCustom((c) => [...c, { label: "", val: "" }]);

  const updateCustom = (i, field, v) =>
    setCustom((c) => c.map((r, idx) => (idx === i ? { ...r, [field]: v } : r)));

  const removeCustom = (i) =>
    setCustom((c) => c.filter((_, idx) => idx !== i));

  const yesCount = [
    ...items.filter((it) => vals[it] === "YES"),
    ...custom.filter((c) => c.val === "YES"),
  ].length;

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-sm transition-shadow hover:shadow-md"
      style={{ border: `1.5px solid ${colors.border}` }}
    >
      {/* Card Header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-left"
        style={{ background: colors.bg }}
      >
        <span className="text-xl leading-none">{EMOJIS[title]}</span>
        <div className="flex-1 min-w-0">
          <div className="font-black text-[11px] uppercase tracking-widest" style={{ color: colors.title }}>
            {title}
          </div>
          {yesCount > 0 && (
            <div className="text-[9px] font-semibold text-emerald-600 mt-0.5">
              {yesCount} item{yesCount > 1 ? "s" : ""} recommended
            </div>
          )}
        </div>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform shrink-0`}
          style={{ color: colors.title, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Card Body */}
      {open && (
        <div className="px-3 pb-3 pt-1 bg-white divide-y divide-slate-50">
          {/* Preset items */}
          {items.map((item) => (
            <div key={item} className="flex items-center justify-between gap-2 py-1.5">
              <span className="text-xs text-slate-700 flex-1 leading-snug">{item}</span>
              <YNPills value={vals[item] || ""} onChange={(v) => toggleVal(item, v)} />
            </div>
          ))}

          {/* Custom rows */}
          {custom.map((row, i) => (
            <div key={i} className="flex items-center gap-2 py-1.5">
              <input
                value={row.label}
                onChange={(e) => updateCustom(i, "label", e.target.value)}
                placeholder="Custom item..."
                className="flex-1 text-xs border-b border-slate-200 focus:border-emerald-400 outline-none bg-transparent py-0.5 text-slate-700 placeholder-slate-400"
              />
              <YNPills value={row.val} onChange={(v) => updateCustom(i, "val", v)} />
              <button
                type="button"
                onClick={() => removeCustom(i)}
                className="text-slate-300 hover:text-rose-400 transition-colors text-xs leading-none ml-1"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Add item */}
          <button
            type="button"
            onClick={addCustom}
            className="mt-1.5 flex items-center gap-1 text-[10px] font-bold transition-colors pt-2"
            style={{ color: colors.title }}
          >
            <Plus className="h-3 w-3" /> Add item
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Summary row in footer ────────────────────────────────────────────────────
function SummaryBadge({ title, vals, custom }) {
  const items = DIET_PRESETS[title];
  const yCount = items.filter((i) => vals[i] === "YES").length
    + custom.filter((c) => c.val === "YES").length;
  const nCount = items.filter((i) => vals[i] === "NO").length
    + custom.filter((c) => c.val === "NO").length;
  if (!yCount && !nCount) return null;
  return (
    <div className="flex items-center gap-1.5 text-[10px]">
      <span className="font-bold text-slate-500">{title}:</span>
      {yCount > 0 && <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">✓ {yCount}</span>}
      {nCount > 0 && <span className="px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-600 font-bold">✗ {nCount}</span>}
    </div>
  );
}

// ─── Build print HTML ─────────────────────────────────────────────────────────
function buildDietPrintHtml(dietState, patientName, date) {
  const allCards = Object.keys(DIET_PRESETS);
  const rows = allCards.map((title) => {
    const { vals, custom } = dietState[title];
    const items = DIET_PRESETS[title];
    const yItems = [
      ...items.filter((i) => vals[i] === "YES"),
      ...custom.filter((c) => c.label && c.val === "YES").map((c) => c.label),
    ];
    const nItems = [
      ...items.filter((i) => vals[i] === "NO"),
      ...custom.filter((c) => c.label && c.val === "NO").map((c) => c.label),
    ];
    return { title, emoji: EMOJIS[title], yItems, nItems };
  });

  return `<!DOCTYPE html><html><head>
<title>Diet Plan — ${patientName || "Patient"}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Arial,sans-serif;font-size:11px;color:#1a2e1e;background:#fff}
.page{padding:14mm 18mm;max-width:210mm;margin:0 auto}
.hdr{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #1a5c38;padding-bottom:10px;margin-bottom:14px}
.hname{font-size:20px;font-weight:900;color:#1a5c38;letter-spacing:2px}
.htag{font-size:9px;color:#b8973a;font-style:italic;margin-top:2px}
.hright{text-align:right;font-size:9px;color:#6b8f76}
.patient-bar{background:#1a5c38;color:#fff;border-radius:8px;padding:6px 14px;margin-bottom:14px;display:flex;justify-content:space-between;font-size:10px;font-weight:700}
.sec-title{font-size:8.5px;font-weight:900;letter-spacing:2px;color:#1a5c38;text-transform:uppercase;background:#e8f5ee;border-left:3px solid #b8973a;padding:4px 10px;margin:12px 0 8px}
.cards{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.card{border:1.5px solid #d4e8dc;border-radius:10px;overflow:hidden}
.card-hdr{padding:7px 10px;background:#f4fbf7;display:flex;align-items:center;gap:7px}
.card-emoji{font-size:16px}
.card-title{font-size:9px;font-weight:900;color:#1a5c38;text-transform:uppercase;letter-spacing:1px}
.card-body{padding:6px 10px}
.item-row{display:flex;align-items:center;justify-content:space-between;padding:3px 0;border-bottom:1px solid #f0f7f0;font-size:10px}
.item-row:last-child{border-bottom:none}
.badge-y{background:#dcfce7;color:#16a34a;padding:1px 8px;border-radius:20px;font-size:8px;font-weight:800}
.badge-n{background:#fee2e2;color:#dc2626;padding:1px 8px;border-radius:20px;font-size:8px;font-weight:800}
.footer{border-top:1px solid #d4e8dc;margin-top:18px;padding-top:8px;display:flex;justify-content:space-between;font-size:8px;color:#6b8f76}
@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.page{padding:10mm 14mm}}
</style></head><body><div class="page">
<div class="hdr">
  <div>
    <div class="hname">${HOSPITAL.name}</div>
    <div class="htag">Diet & Nutrition Plan — Naturopathy</div>
    <div style="font-size:9px;color:#6b8f76;margin-top:4px">📞 ${HOSPITAL.phone}</div>
  </div>
  <div class="hright">
    <div style="font-weight:800;color:#1a5c38">DIET &amp; NUTRITION PLAN</div>
    <div style="margin-top:4px">${HOSPITAL.doctor}, ${HOSPITAL.qualification}</div>
    <div>Date: ${date || new Date().toLocaleDateString("en-IN")}</div>
  </div>
</div>
<div class="patient-bar">
  <span>Patient: ${patientName || "_______________"}</span>
  <span>Mark: ✓ Recommended &nbsp;|&nbsp; ✗ Restrict / Avoid</span>
</div>
<div class="sec-title">🥗 Diet &amp; Nutrition Plan</div>
<div class="cards">
${rows.map(({ title, emoji, yItems, nItems }) => `
  <div class="card">
    <div class="card-hdr">
      <span class="card-emoji">${emoji}</span>
      <span class="card-title">${title}</span>
    </div>
    <div class="card-body">
      ${yItems.length === 0 && nItems.length === 0
        ? '<div style="font-size:10px;color:#94a3b8;font-style:italic">No items marked</div>'
        : [
            ...yItems.map((i) => `<div class="item-row"><span>${i}</span><span class="badge-y">✓ YES</span></div>`),
            ...nItems.map((i) => `<div class="item-row"><span>${i}</span><span class="badge-n">✗ NO</span></div>`),
          ].join("")
      }
    </div>
  </div>
`).join("")}
</div>
<div style="margin-top:20px;display:flex;justify-content:space-between">
  <div style="text-align:center">
    <div style="border-bottom:1px solid #1a2e1e;width:180px;min-height:24px"></div>
    <div style="font-size:8px;color:#6b8f76;text-transform:uppercase;letter-spacing:1px;margin-top:4px">Patient / Guardian Signature</div>
  </div>
  <div style="text-align:center">
    <div style="border-bottom:1px solid #1a2e1e;width:180px;min-height:24px"></div>
    <div style="font-size:8px;color:#6b8f76;text-transform:uppercase;letter-spacing:1px;margin-top:4px">${HOSPITAL.doctor} — Doctor's Signature</div>
  </div>
</div>
<div class="footer">
  <div>${HOSPITAL.name} | ${HOSPITAL.phone} | Confidential Medical Record</div>
  <div>Diet Plan — Page 1 of 1</div>
</div>
</div></body></html>`;
}

// ─── Initial state factory ────────────────────────────────────────────────────
function makeInitialDietState() {
  const state = {};
  Object.keys(DIET_PRESETS).forEach((title) => {
    state[title] = {
      vals: Object.fromEntries(DIET_PRESETS[title].map((i) => [i, ""])),
      custom: [],
    };
  });
  return state;
}

// ─── Main DietModule component ────────────────────────────────────────────────
export default function DietModule() {
  const [open, setOpen] = useState(false);
  const [dietState, setDietState] = useState(makeInitialDietState);
  const [patientName, setPatientName] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [notes, setNotes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const setCardVals = (title) => (fn) =>
    setDietState((prev) => ({
      ...prev,
      [title]: { ...prev[title], vals: fn(prev[title].vals) },
    }));

  const setCardCustom = (title) => (fn) =>
    setDietState((prev) => ({
      ...prev,
      [title]: { ...prev[title], custom: fn(prev[title].custom) },
    }));

  const reset = () => {
    setDietState(makeInitialDietState());
    setPatientName("");
    setVisitDate("");
    setNotes("");
  };

  const handleExport = (whatsapp = false) => {
    const html = buildDietPrintHtml(dietState, patientName, visitDate);
    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();

    if (whatsapp) {
      const recommended = Object.entries(dietState)
        .flatMap(([title, { vals, custom }]) => {
          const items = [
            ...DIET_PRESETS[title].filter((i) => vals[i] === "YES"),
            ...custom.filter((c) => c.label && c.val === "YES").map((c) => c.label),
          ];
          return items.length > 0 ? [`*${title}:* ${items.join(", ")}`] : [];
        })
        .join("\n");

      const msg = encodeURIComponent(
        `🌿 *Diet Plan — ${patientName || "Patient"}*\n` +
          `📅 Date: ${visitDate || new Date().toLocaleDateString("en-IN")}\n\n` +
          (recommended || "No items marked yet") +
          `\n\n_Issued by ${HOSPITAL.name}, ${HOSPITAL.doctor}_`,
      );
      setTimeout(() => window.open(`https://wa.me/?text=${msg}`, "_blank"), 600);
    }

    setTimeout(() => win.print(), 500);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Total items marked
  const totalMarked = Object.values(dietState).reduce((sum, { vals, custom }) => {
    return (
      sum +
      Object.values(vals).filter(Boolean).length +
      custom.filter((c) => c.val).length
    );
  }, 0);

  return (
    <>
      {/* ── Trigger Button — matches CaseSheet style ── */}
      <button
        onClick={() => setOpen(true)}
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-md transition-all hover:shadow-lg"
      >
        <Leaf className="h-4 w-4" />
        Diet Module
      </button>

      {/* ── Modal Overlay ── */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-4xl sm:mx-auto max-h-[97vh] sm:max-h-[94vh] flex flex-col overflow-hidden">

            {/* ── Modal Header ── */}
            <div className="flex-shrink-0 bg-gradient-to-r from-emerald-700 to-emerald-600 rounded-t-2xl">
              <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-xl p-2">
                    <Leaf className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-black text-white text-sm sm:text-base tracking-wide">
                      Diet &amp; Nutrition Plan
                    </div>
                    <div className="text-emerald-200 text-[10px]">
                      {HOSPITAL.name} — Mark Y to recommend · N to restrict
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/70 hover:text-white transition-colors p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Patient info strip */}
              <div className="px-4 sm:px-6 pb-3 flex flex-wrap gap-3">
                <input
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Patient Name"
                  className="bg-white/20 text-white placeholder-emerald-200 text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/20 focus:outline-none focus:bg-white/30 min-w-[160px]"
                />
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/20 focus:outline-none focus:bg-white/30"
                />
                {totalMarked > 0 && (
                  <span className="ml-auto bg-white/20 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">
                    {totalMarked} item{totalMarked > 1 ? "s" : ""} marked
                  </span>
                )}
              </div>
            </div>

            {/* ── Doctor strip ── */}
            <div className="flex-shrink-0 px-4 sm:px-6 py-2.5 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between">
              <div className="text-xs text-slate-600">
                <span className="font-bold text-emerald-700">{HOSPITAL.doctor}</span>
                <span className="ml-2 text-slate-400">{HOSPITAL.qualification}</span>
              </div>
              <div className="text-[10px] text-emerald-600 font-semibold">
                🌿 Naturopathy Diet Prescription
              </div>
            </div>

            {/* ── Success banner ── */}
            {showSuccess && (
              <div className="mx-4 mt-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-3 flex-shrink-0">
                <span className="text-emerald-500 text-lg">✓</span>
                <p className="text-sm font-semibold text-emerald-700">
                  Diet plan exported successfully!
                </p>
              </div>
            )}

            {/* ── Scrollable Body ── */}
            <div className="overflow-y-auto flex-1 px-3 sm:px-6 py-4">

              {/* Legend */}
              <div className="flex gap-4 mb-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-6 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center">Y</span>
                  <span className="text-slate-500">= Recommended for patient</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-6 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center">N</span>
                  <span className="text-slate-500">= Restrict / Avoid</span>
                </div>
              </div>

              {/* Diet Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {Object.keys(DIET_PRESETS).map((title) => (
                  <DietCard
                    key={title}
                    title={title}
                    vals={dietState[title].vals}
                    setVals={setCardVals(title)}
                    custom={dietState[title].custom}
                    setCustom={setCardCustom(title)}
                  />
                ))}
              </div>

              {/* Summary strip */}
              {totalMarked > 0 && (
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-4">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                    Summary
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {Object.keys(DIET_PRESETS).map((title) => (
                      <SummaryBadge
                        key={title}
                        title={title}
                        vals={dietState[title].vals}
                        custom={dietState[title].custom}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Notes */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden mb-2">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 flex items-center gap-2">
                  <span className="text-white text-sm">📝</span>
                  <span className="text-white font-bold text-sm">Additional Dietary Notes</span>
                </div>
                <div className="p-3 bg-white">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Additional instructions, special diet notes, supplement advice..."
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                  />
                </div>
              </div>

            </div>

            {/* ── Footer Actions — matches CaseSheet footer ── */}
            <div className="flex-shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
              <button
                onClick={reset}
                className="text-sm text-slate-400 hover:text-slate-600 font-medium transition-colors min-h-[44px] flex items-center"
              >
                ↺ Reset Diet Plan
              </button>
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-100 transition-all min-h-[44px]"
                >
                  Cancel
                </button>
                {/* <button
                  onClick={() => handleExport(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm transition-all min-h-[44px]"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </button> */}
                <button
                  onClick={() => handleExport(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-all min-h-[44px]"
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