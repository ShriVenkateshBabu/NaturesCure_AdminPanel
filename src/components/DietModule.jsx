import { useState } from "react";
import { X, FileText, Download, ChevronDown, Plus } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const HOSPITAL = {
  name: "Ayush Hub",
  doctor: "Dr. G. Mahalakshmi",
  qualification: "BNYS",
  phone: "+91 83000 65899",
  email: "omnavasakthivel@gmail.com",
  location: "Srivilliputhur, Virudhunagar – 626110",
  tagline: "Natural Healing Through Yoga & Naturopathy",
};

const DIET_PRESETS = {
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
  // ── Evening / Dinner fruit-and-vegetable list ──
  "Evening Fruits": [
    "Pomegranate",
    "Apple",
    "Pear",
    "Grapes",
    "Jackfruit",
    "Orange",
    "Papaya",
    "Guava",
    "Pineapple",
    "Muskmelon",
    "Cucumber",
    "Fig",
    "Raw Banana",
  ],
  Toppings: [
    "Peanut",
    "Cashew",
    "Almond (boiled/roasted)",
    "Dried Fig",
    "Coriander (leaf)",
    "Fresh Avaram Poo",
  ],
  "Leaves & Flowers": [
    "Coriander",
    "Curry Leaves",
    "Mint",
    "Avaram Poo — fresh",
    "Avaram Poo — dried",
  ],
  "Raw / Boiled Vegetables": [
    "Cabbage",
    "Carrot",
    "Lady's Finger",
    "Ash Gourd",
    "Ridge Gourd",
    "Bottle Gourd",
    "Paneer",
    "Mushroom",
    "Ivy Gourd",
    "Avarai Kai",
    "Beans",
  ],
  "Boiled Foods": ["Soybean", "Kidney Beans", "Sundal", "Peanut", "Green Gram"],
  Sprouts: ["Sesame", "Green Gram", "Ragi", "Peanut", "Fenugreek"],
  // ── Empty-stomach / seed-cycling & herbal notes ──
  "Morning / Empty Stomach": [
    "Bitter Gourd Juice",
    "Ginger Chewing (1 tsp, ~30 min after)",
    "Cinnamon Water (~200ml, boiled)",
    "Lemon (squeezed into cinnamon water)",
  ],
  "Seed Cycling & Herbal": [
    "Seed Cycling",
    "Coconut Oil",
    "Moringa",
    "Amla",
    "Jaggery",
    "Ghee",
    "Sesame",
    "Fenugreek",
    "Jeera / Cumin",
    "Karuppatti Karasayam [unclear]",
  ],
  // ── Condition-specific suggestions from notes (verify with doctor) ──
  "Kidney Support [Discuss w/ Doctor]": [
    "Tea + Jeera + Fenugreek",
    "Karuppatti Karasayam [unclear]",
  ],
  "Lung Support [Discuss w/ Doctor]": [
    "Boiled Amla (2 pcs) + Ginger, reduced 250ml→150ml + Honey",
  ],
  "Piles / IBS [Discuss w/ Doctor]": [
    "Aloe Vera Fomentation [unclear]",
    "Buttermilk",
    "Fiber-rich foods",
  ],
  "Fatty Liver [Discuss w/ Doctor]": [
    "Orange + Mint",
    "Weight management / activity (non-food)",
  ],
  "Gallstones [Discuss w/ Doctor]": [
    "Apple + Cinnamon",
    "Low-fat dietary pattern",
  ],
  // ── Night / raw diet ──
  "Night Raw Diet": ["Guava", "Papaya", "Apple", "Pear", "Pomegranate"],
};

const DIET_EMOJIS = {
  Lunch: "🥗",
  Dinner: "🍲",
  "Juice Therapy": "🥤",
  "Infused Water": "🫙",
  "Evening Fruits": "🍎",
  Toppings: "🥜",
  "Leaves & Flowers": "🌿",
  "Raw / Boiled Vegetables": "🥦",
  "Boiled Foods": "🍲",
  Sprouts: "🌱",
  "Morning / Empty Stomach": "🌅",
  "Seed Cycling & Herbal": "🫘",
  "Kidney Support [Discuss w/ Doctor]": "🩺",
  "Lung Support [Discuss w/ Doctor]": "🩺",
  "Piles / IBS [Discuss w/ Doctor]": "🩺",
  "Fatty Liver [Discuss w/ Doctor]": "🩺",
  "Gallstones [Discuss w/ Doctor]": "🩺",
  "Night Raw Diet": "🌙",
};

const THERAPY_PRESETS = {
  Hydrotherapy: [
    "Cool Water Enema / Warm Water Enema",
    "Coffee Enema / Buttermilk Enema",
    "Neem Leaf Enema / Vitamin C Enema",
  ],
  Packs: [
    "Castor Oil Pack / Fomentation Pack",
    "Cold Compress / Facial Steam",
    "GH Pack / Kidney Pack",
  ],
  Panchakarma: ["Nasyam / Turmeric Fumes Inhalation"],
  Yoga: ["Asana (Yoga Postures)", "Yoga Therapy"],
  Pranayama: [
    "Kaphala Bathi – Standing",
    "Basthrika – Sitting",
    "Brahmari – Lyeing",
    "Ujjai – Chest Expanding",
  ],
  Kriyas: ["Jala Nethi", "Suthra Nethi", "Vammana"],
  "Juice / Nutraceutical": [
    "Bittergourd Juice",
    "Ash Gourd + Coriander Seeds or Fresh Leaves",
    "Pomegranate Juice + ½ sp. Adhimadhuram",
    "Kotha Avarai 5 + Coconut 3pc",
  ],
};

// ─── Shared styles ────────────────────────────────────────────────────────────
const S = {
  secBanner: {
    background: "linear-gradient(90deg,#1a4a2e,#2d6b42)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "5px 12px",
    borderTop: "1px solid #c9b86c",
    borderBottom: "1px solid #c9b86c",
  },
  secBannerText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  panel: {
    border: "1px solid #d4e8dc",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  panelHdr: {
    background: "#f4fbf7",
    padding: "6px 12px",
    display: "flex",
    alignItems: "center",
    gap: 6,
    borderBottom: "1px solid #d4e8dc",
  },
  panelTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: "#1a4a2e",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  panelBody: { padding: "10px 12px", background: "#fff" },
  fieldLabel: {
    fontSize: 9,
    color: "#5a7a6a",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  fieldInput: {
    border: "none",
    borderBottom: "1px solid #c9b86c",
    background: "transparent",
    fontSize: 11,
    color: "#1a2e1e",
    padding: "3px 0",
    outline: "none",
    width: "100%",
  },
  goldBanner: {
    height: 2,
    background: "linear-gradient(90deg,#b8973a,#c9b86c,#b8973a)",
  },
  chkBox: {
    width: 9,
    height: 9,
    border: "1px solid #2d6b42",
    borderRadius: 1,
    flexShrink: 0,
    marginTop: 2,
  },
  chkLabel: { fontSize: 9, color: "#3a5a4a", lineHeight: 1.4 },
};

// ─── YES / NO pill buttons (identical to DietModule) ─────────────────────────
function YNPills({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
      {[
        {
          opt: "YES",
          label: "Y",
          activeStyle: {
            background: "#10b981",
            borderColor: "#10b981",
            color: "#fff",
          },
        },
        {
          opt: "NO",
          label: "N",
          activeStyle: {
            background: "#f43f5e",
            borderColor: "#f43f5e",
            color: "#fff",
          },
        },
      ].map(({ opt, label, activeStyle }) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(value === opt ? "" : opt)}
          style={{
            width: 26,
            height: 22,
            borderRadius: 999,
            fontSize: 10,
            fontWeight: 900,
            border: "1.5px solid #cbd5e1",
            background: "#fff",
            color: "#94a3b8",
            cursor: "pointer",
            transition: "all 0.15s",
            ...(value === opt ? activeStyle : {}),
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ─── Collapsible diet card (mirrors DietModule's DietCard) ───────────────────
function DietCard({ title, vals, setVals, custom, setCustom }) {
  const [open, setOpen] = useState(true);
  const items = DIET_PRESETS[title];

  const toggleVal = (item, v) =>
    setVals((prev) => ({ ...prev, [item]: prev[item] === v ? "" : v }));
  const addCustom = () => setCustom((c) => [...c, { label: "", val: "" }]);
  const updateCustom = (i, field, v) =>
    setCustom((c) => c.map((r, idx) => (idx === i ? { ...r, [field]: v } : r)));
  const removeCustom = (i) => setCustom((c) => c.filter((_, idx) => idx !== i));

  const yesCount =
    items.filter((it) => vals[it] === "YES").length +
    custom.filter((c) => c.val === "YES").length;

  return (
    <div
      style={{
        border: "1px solid #bcd4c8",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "7px 10px",
          background: "#f4fbf7",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: 18 }}>{DIET_EMOJIS[title]}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: "#1a5c38",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {title}
          </div>
          {yesCount > 0 && (
            <div style={{ fontSize: 9, color: "#059669", marginTop: 1 }}>
              {yesCount} recommended
            </div>
          )}
        </div>
        <ChevronDown
          size={12}
          style={{
            color: "#1a5c38",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            flexShrink: 0,
          }}
        />
      </button>
      {open && (
        <div style={{ padding: "4px 10px 10px", background: "#fff" }}>
          {items.map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                padding: "5px 0",
                borderBottom: "1px solid #f0f7f0",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  color: "#374151",
                  flex: 1,
                  lineHeight: 1.3,
                }}
              >
                {item}
              </span>
              <YNPills
                value={vals[item] || ""}
                onChange={(v) => toggleVal(item, v)}
              />
            </div>
          ))}
          {custom.map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 0",
                borderBottom: "1px solid #f0f7f0",
              }}
            >
              <input
                value={row.label}
                onChange={(e) => updateCustom(i, "label", e.target.value)}
                placeholder="Custom item..."
                style={{
                  flex: 1,
                  fontSize: 10,
                  border: "none",
                  borderBottom: "1px solid #d1fae5",
                  outline: "none",
                  background: "transparent",
                  color: "#374151",
                }}
              />
              <YNPills
                value={row.val}
                onChange={(v) => updateCustom(i, "val", v)}
              />
              <button
                type="button"
                onClick={() => removeCustom(i)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: 11,
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCustom}
            style={{
              marginTop: 6,
              display: "flex",
              alignItems: "center",
              gap: 3,
              fontSize: 9,
              fontWeight: 700,
              color: "#1a5c38",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Plus size={10} /> Add item
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Collapsible therapy card ─────────────────────────────────────────────────
function TherapyCard({ title, checked, setChecked, custom, setCustom }) {
  const [open, setOpen] = useState(true);
  const items = THERAPY_PRESETS[title];
  const toggle = (item) =>
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }));
  const addCustom = () => setCustom((c) => [...c, ""]);
  const updateCustom = (i, v) =>
    setCustom((c) => c.map((r, idx) => (idx === i ? v : r)));
  const removeCustom = (i) => setCustom((c) => c.filter((_, idx) => idx !== i));

  const checkedCount =
    items.filter((i) => checked[i]).length + custom.filter(Boolean).length;

  return (
    <div
      style={{
        border: "1px solid #d4e8dc",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 10px",
          background: "#f4fbf7",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          borderBottom: "1px solid #d4e8dc",
        }}
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: "#1a4a2e",
            textTransform: "uppercase",
            letterSpacing: 1,
            flex: 1,
          }}
        >
          {title}
        </span>
        {checkedCount > 0 && (
          <span style={{ fontSize: 9, color: "#059669", marginRight: 4 }}>
            ✓ {checkedCount}
          </span>
        )}
        <ChevronDown
          size={11}
          style={{
            color: "#1a4a2e",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            flexShrink: 0,
          }}
        />
      </button>
      {open && (
        <div style={{ padding: "6px 10px 8px", background: "#fff" }}>
          {items.map((item) => (
            <label
              key={item}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 5,
                marginBottom: 4,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={!!checked[item]}
                onChange={() => toggle(item)}
                style={{ marginTop: 2, accentColor: "#2d6b42", flexShrink: 0 }}
              />
              <span
                style={{ fontSize: 9.5, color: "#3a5a4a", lineHeight: 1.4 }}
              >
                {item}
              </span>
            </label>
          ))}
          {custom.map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                marginBottom: 3,
              }}
            >
              <input
                type="checkbox"
                style={{ accentColor: "#2d6b42", flexShrink: 0 }}
              />
              <input
                value={row}
                onChange={(e) => updateCustom(i, e.target.value)}
                placeholder="Custom..."
                style={{
                  flex: 1,
                  fontSize: 9.5,
                  border: "none",
                  borderBottom: "1px solid #d1fae5",
                  outline: "none",
                  background: "transparent",
                  color: "#374151",
                }}
              />
              <button
                type="button"
                onClick={() => removeCustom(i)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: 10,
                }}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCustom}
            style={{
              marginTop: 4,
              display: "flex",
              alignItems: "center",
              gap: 3,
              fontSize: 9,
              fontWeight: 700,
              color: "#1a4a2e",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Plus size={10} /> Add
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Initial state factories ──────────────────────────────────────────────────
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

function makeInitialTherapyState() {
  const state = {};
  Object.keys(THERAPY_PRESETS).forEach((title) => {
    state[title] = {
      checked: Object.fromEntries(
        THERAPY_PRESETS[title].map((i) => [i, false]),
      ),
      custom: [],
    };
  });
  return state;
}

// ─── Build full print HTML ────────────────────────────────────────────────────
function buildFullFormHtml(patient, dietState, therapyState) {
  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-IN")
      : new Date().toLocaleDateString("en-IN");

  // Diet rows
  const dietRows = Object.keys(DIET_PRESETS).map((title) => {
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
    return { title, emoji: DIET_EMOJIS[title], yItems, nItems };
  });

  // Therapy rows
  const therapyRows = Object.keys(THERAPY_PRESETS).map((title) => {
    const { checked, custom } = therapyState[title];
    const checkedItems = [
      ...THERAPY_PRESETS[title].filter((i) => checked[i]),
      ...custom.filter(Boolean),
    ];
    return { title, checkedItems };
  });

  return `<!DOCTYPE html><html><head>
<title>Diet Chart — ${patient.name || "Patient"}</title>
<meta charset="UTF-8">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Arial,sans-serif;font-size:11px;color:#1a2e1e;background:#fff}
.page{padding:10mm 14mm;max-width:210mm;margin:0 auto}
.hdr{background:#0a1628;padding:16px 20px 12px;position:relative}
.hdr-top{display:flex;align-items:center;gap:14px;margin-bottom:8px}
.logo{width:56px;height:56px;border-radius:50%;border:2px solid #c9b86c;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.logo-inner{width:42px;height:42px;border-radius:50%;border:1px solid rgba(201,184,108,0.5);display:flex;align-items:center;justify-content:center;font-size:20px;color:#c9b86c}
.hdr-main{font-size:24px;font-weight:900;color:#c9b86c;letter-spacing:3px;text-transform:uppercase;line-height:1}
.hdr-doc{font-size:12px;color:#e8e0c8;font-weight:600;margin-top:3px}
.hdr-tag{font-size:9.5px;color:#a89a6a;font-style:italic;margin-top:1px}
.gold-line{height:1px;background:linear-gradient(90deg,transparent,#c9b86c 30%,#c9b86c 70%,transparent);margin:8px 0}
.contact-row{display:flex;gap:16px;flex-wrap:wrap}
.contact-item{font-size:9px;color:#b8a87a}
.gold-bar{height:2px;background:linear-gradient(90deg,#b8973a,#c9b86c,#b8973a)}
.sec-banner{background:linear-gradient(90deg,#1a4a2e,#2d6b42);text-align:center;padding:5px;font-size:9.5px;font-weight:800;color:#fff;letter-spacing:2px;text-transform:uppercase;border-top:1px solid #c9b86c;border-bottom:1px solid #c9b86c}
.patient-bar{background:#1a5c38;color:#fff;border-radius:6px;padding:5px 12px;margin:10px 0 8px;display:flex;justify-content:space-between;font-size:9.5px;font-weight:700}
.fields-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:8px}
.field-wrap{display:flex;flex-direction:column;gap:2px}
.f-label{font-size:8px;color:#5a7a6a;font-weight:700;text-transform:uppercase;letter-spacing:0.7px}
.f-value{border-bottom:1px solid #c9b86c;font-size:10px;color:#1a2e1e;min-height:16px;padding-bottom:2px}
.panel{border:1px solid #d4e8dc;border-radius:7px;overflow:hidden;margin-bottom:8px}
.panel-hdr{background:#f4fbf7;padding:5px 10px;font-size:8px;font-weight:800;color:#1a4a2e;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid #d4e8dc}
.panel-body{padding:7px 10px;min-height:30px;font-size:10px;color:#1a2e1e;line-height:1.7;white-space:pre-wrap}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px}
.diet-cards{display:grid;grid-template-columns:repeat(5,1fr);gap:7px;margin:8px 12px}
.diet-card{border:1px solid #d4e8dc;border-radius:7px;overflow:hidden}
.diet-card-top{background:#f4fbf7;padding:6px 4px 4px;text-align:center;border-bottom:1px solid #d4e8dc}
.diet-card-emoji{font-size:18px;line-height:1;display:block;margin-bottom:2px}
.diet-card-title{font-size:7px;font-weight:800;color:#1a4a2e;text-transform:uppercase;letter-spacing:0.8px}
.diet-card-body{padding:5px 7px}
.item-row{display:flex;align-items:center;justify-content:space-between;padding:2.5px 0;border-bottom:1px solid #f0f7f0;font-size:9px}
.item-row:last-child{border-bottom:none}
.badge-y{background:#dcfce7;color:#15803d;padding:1px 6px;border-radius:20px;font-size:7.5px;font-weight:800}
.badge-n{background:#fee2e2;color:#dc2626;padding:1px 6px;border-radius:20px;font-size:7.5px;font-weight:800}
.therapy-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:8px 12px}
.th-card{border:1px solid #d4e8dc;border-radius:7px;overflow:hidden}
.th-card-hdr{background:#f4fbf7;padding:5px 8px;font-size:7.5px;font-weight:800;color:#1a4a2e;text-transform:uppercase;letter-spacing:0.8px;border-bottom:1px solid #d4e8dc}
.th-card-body{padding:5px 8px}
.th-item{font-size:9px;color:#3a5a4a;padding:2.5px 0;border-bottom:1px solid #f0f7f0;display:flex;align-items:center;gap:4px}
.th-item:last-child{border-bottom:none}
.th-dot{width:7px;height:7px;border-radius:1px;background:#2d6b42;flex-shrink:0}
.bottom-grid{display:grid;grid-template-columns:2fr 1fr;gap:10px;margin:8px 12px}
.sig-line{border-bottom:1.5px solid #1a2e1e;min-height:20px;margin-top:6px}
.sig-label{font-size:7.5px;color:#8aaa9a;text-transform:uppercase;letter-spacing:0.5px;margin-top:2px;text-align:center}
.footer-cats{background:#f8fdf8;border-top:1px solid #c9b86c;padding:6px 20px;display:flex;justify-content:space-around}
.cat-item{text-align:center;font-size:7.5px;font-weight:700;color:#3a5a4a;text-transform:uppercase;letter-spacing:0.5px}
.footer-brand{background:#0a1628;padding:6px;text-align:center;color:#c9b86c;font-size:10px;font-weight:700;letter-spacing:2px}
@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.page{padding:8mm 12mm}}
</style></head><body><div class="page">

<div class="hdr">
  <div class="hdr-top">
    <div class="logo"><div class="logo-inner">🌿</div></div>
    <div>
      <div style="font-size:8px;color:#c9b86c;letter-spacing:2px;margin-bottom:2px">NSV'S</div>
      <div class="hdr-main">${HOSPITAL.name}</div>
      <div class="hdr-doc">${HOSPITAL.doctor} ${HOSPITAL.qualification}</div>
      <div class="hdr-tag">— ${HOSPITAL.tagline} —</div>
    </div>
  </div>
  <div class="gold-line"></div>
  <div class="contact-row">
    <span class="contact-item">📞 ${HOSPITAL.phone}</span>
    <span class="contact-item">✉ ${HOSPITAL.email}</span>
    <span class="contact-item">📍 ${HOSPITAL.location}</span>
  </div>
</div>

<div class="gold-bar"></div>
<div class="sec-banner">🧾 Patient Information</div>

<div style="padding:0 12px">
  <div class="patient-bar">
    <span>Patient: ${patient.name || "_______________"}</span>
    <span>Date: ${formatDate(patient.date)}</span>
    <span>OP No: ${patient.opNumber || "_______________"}</span>
  </div>

  <div class="fields-grid">
    <div class="field-wrap"><div class="f-label">Age</div><div class="f-value">${patient.age || ""}</div></div>
    <div class="field-wrap"><div class="f-label">Gender</div><div class="f-value">${patient.gender || ""}</div></div>
    <div class="field-wrap"><div class="f-label">Occupation</div><div class="f-value">${patient.occupation || ""}</div></div>
  </div>
  <div class="fields-grid">
    <div class="field-wrap"><div class="f-label">BP</div><div class="f-value">${patient.bp || ""} mmHg</div></div>
    <div class="field-wrap"><div class="f-label">Weight</div><div class="f-value">${patient.weight || ""} kg</div></div>
    <div class="field-wrap"><div class="f-label">Height</div><div class="f-value">${patient.height || ""} cm</div></div>
  </div>
  <div class="fields-grid">
    <div class="field-wrap"><div class="f-label">BMI</div><div class="f-value">${patient.bmi || ""}</div></div>
    <div class="field-wrap"><div class="f-label">Patient ID</div><div class="f-value">${patient.patientId || ""}</div></div>
    <div></div>
  </div>

  <div class="panel">
    <div class="panel-hdr">🩺 Diagnosis</div>
    <div class="panel-body">${patient.diagnosis || ""}</div>
  </div>

  <div class="two-col">
    <div class="panel">
      <div class="panel-hdr">💬 Complaints</div>
      <div class="panel-body">${patient.complaints || ""}</div>
    </div>
    <div class="panel">
      <div class="panel-hdr">🔬 Investigations</div>
      <div class="panel-body">${patient.investigations || ""}</div>
    </div>
  </div>
</div>

<div class="gold-bar"></div>
<div class="sec-banner">🥗 Diet &amp; Nutrition Plan</div>

<div class="diet-cards">
${dietRows
  .map(
    ({ title, emoji, yItems, nItems }) => `
  <div class="diet-card">
    <div class="diet-card-top">
      <span class="diet-card-emoji">${emoji}</span>
      <span class="diet-card-title">${title}</span>
    </div>
    <div class="diet-card-body">
      ${
        yItems.length === 0 && nItems.length === 0
          ? '<div style="font-size:9px;color:#94a3b8;font-style:italic">No items marked</div>'
          : [
              ...yItems.map(
                (i) =>
                  `<div class="item-row"><span>${i}</span><span class="badge-y">✓ YES</span></div>`,
              ),
              ...nItems.map(
                (i) =>
                  `<div class="item-row"><span>${i}</span><span class="badge-n">✗ NO</span></div>`,
              ),
            ].join("")
      }
    </div>
  </div>`,
  )
  .join("")}
</div>

<div class="gold-bar"></div>
<div class="sec-banner">💆 Treatment &amp; Therapy Plan</div>

<div class="therapy-grid">
${therapyRows
  .map(
    ({ title, checkedItems }) => `
  <div class="th-card">
    <div class="th-card-hdr">${title}</div>
    <div class="th-card-body">
      ${
        checkedItems.length === 0
          ? '<div style="font-size:9px;color:#94a3b8;font-style:italic">None selected</div>'
          : checkedItems
              .map(
                (i) =>
                  `<div class="th-item"><span class="th-dot"></span><span>${i}</span></div>`,
              )
              .join("")
      }
    </div>
  </div>`,
  )
  .join("")}
</div>

<div class="gold-bar"></div>

<div class="bottom-grid">
  <div class="panel">
    <div class="panel-hdr">📝 Others / Additional Recommendations</div>
    <div class="panel-body" style="min-height:60px">${patient.notes || ""}</div>
    <div style="text-align:center;padding:8px 0 4px;font-size:8px;color:#a89a6a;font-style:italic">Heal Naturally · Live Consciously</div>
  </div>
  <div style="border:1px solid #c9b86c;border-radius:7px;overflow:hidden">
    <div style="background:linear-gradient(90deg,#1a4a2e,#2d6b42);padding:5px 10px;font-size:8.5px;font-weight:800;color:#fff;letter-spacing:1px;text-transform:uppercase">📅 Follow Up Plan</div>
    <div style="padding:8px 10px">
      <div style="margin-bottom:8px"><div class="f-label">Next Visit Date</div><div class="f-value">${patient.nextVisit || ""}</div></div>
      <div style="margin-bottom:8px"><div class="f-label">Time</div><div class="f-value">${patient.nextTime || ""}</div></div>
      <div class="sig-line"></div>
      <div class="sig-label">${HOSPITAL.doctor} — Signature</div>
    </div>
  </div>
</div>

<div style="display:flex;justify-content:space-between;padding:0 12px 12px">
  <div style="text-align:center">
    <div class="sig-line" style="width:180px"></div>
    <div class="sig-label">Patient / Guardian Signature</div>
  </div>
  <div style="text-align:center">
    <div class="sig-line" style="width:180px"></div>
    <div class="sig-label">${HOSPITAL.doctor} — Doctor's Signature</div>
  </div>
</div>

<div class="gold-bar"></div>
<div class="footer-cats">
  <div class="cat-item">🌿 Naturopathy</div>
  <div class="cat-item">🧘 Yoga</div>
  <div class="cat-item">🌱 Ayurveda</div>
  <div class="cat-item">🥗 Diet &amp; Nutrition</div>
  <div class="cat-item">❤️ Lifestyle Medicine</div>
</div>
<div class="footer-brand">${HOSPITAL.name} | Holistic Healing &amp; Lifestyle Medicine</div>

</div></body></html>`;
}

// ─── Field component ──────────────────────────────────────────────────────────
function Field({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <div style={S.fieldLabel}>{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={S.fieldInput}
      />
    </div>
  );
}

// ─── Main PatientForm component ───────────────────────────────────────────────
export default function PatientForm() {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Patient info
  const [patient, setPatient] = useState({
    name: "",
    patientId: "",
    age: "",
    gender: "",
    occupation: "",
    date: "",
    bp: "",
    weight: "",
    height: "",
    bmi: "",
    opNumber: "",
    diagnosis: "",
    complaints: "",
    investigations: "",
    notes: "",
    nextVisit: "",
    nextTime: "",
  });

  // Diet state (same structure as DietModule)
  const [dietState, setDietState] = useState(makeInitialDietState);

  // Therapy state
  const [therapyState, setTherapyState] = useState(makeInitialTherapyState);

  const setP = (key) => (val) =>
    setPatient((prev) => ({ ...prev, [key]: val }));

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

  const setTherapyChecked = (title) => (fn) =>
    setTherapyState((prev) => ({
      ...prev,
      [title]: { ...prev[title], checked: fn(prev[title].checked) },
    }));
  const setTherapyCustom = (title) => (fn) =>
    setTherapyState((prev) => ({
      ...prev,
      [title]: { ...prev[title], custom: fn(prev[title].custom) },
    }));

  // Auto-calculate BMI
  const handleWeightHeight = (key, val) => {
    const next = { ...patient, [key]: val };
    const w = parseFloat(next.weight);
    const h = parseFloat(next.height) / 100;
    if (w && h) next.bmi = (w / (h * h)).toFixed(1);
    setPatient(next);
  };

  const reset = () => {
    setPatient({
      name: "",
      patientId: "",
      age: "",
      gender: "",
      occupation: "",
      date: "",
      bp: "",
      weight: "",
      height: "",
      bmi: "",
      opNumber: "",
      diagnosis: "",
      complaints: "",
      investigations: "",
      notes: "",
      nextVisit: "",
      nextTime: "",
    });
    setDietState(makeInitialDietState());
    setTherapyState(makeInitialTherapyState());
  };

  const handleExport = () => {
    const html = buildFullFormHtml(patient, dietState, therapyState);
    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();
    setTimeout(() => win.print(), 500);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const totalDietMarked = Object.values(dietState).reduce(
    (sum, { vals, custom }) =>
      sum +
      Object.values(vals).filter(Boolean).length +
      custom.filter((c) => c.val).length,
    0,
  );
  const totalTherapyChecked = Object.values(therapyState).reduce(
    (sum, { checked, custom }) =>
      sum +
      Object.values(checked).filter(Boolean).length +
      custom.filter(Boolean).length,
    0,
  );

  return (
    <>
      {/* Trigger button — same style as DietModule */}
      <button
        onClick={() => setOpen(true)}
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-md transition-all hover:shadow-lg"
      >
        <FileText className="h-4 w-4" />
        Diet Chart &amp; Prescription
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-5xl sm:mx-auto max-h-[97vh] sm:max-h-[94vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div
              className="flex-shrink-0"
              style={{ background: "#0a1628", borderRadius: "16px 16px 0 0" }}
            >
              <div
                style={{
                  padding: "14px 20px 10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: "2px solid #c9b86c",
                      background: "rgba(201,184,108,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      flexShrink: 0,
                    }}
                  >
                    🌿
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 8,
                        color: "#c9b86c",
                        letterSpacing: 2,
                        textTransform: "uppercase",
                      }}
                    >
                      NSV'S
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 900,
                        color: "#c9b86c",
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        lineHeight: 1.1,
                      }}
                    >
                      Ayush Hub
                    </div>
                    <div
                      style={{ fontSize: 11, color: "#e8e0c8", marginTop: 1 }}
                    >
                      {HOSPITAL.doctor} {HOSPITAL.qualification}
                    </div>
                    <div
                      style={{
                        fontSize: 9.5,
                        color: "#a89a6a",
                        fontStyle: "italic",
                      }}
                    >
                      — {HOSPITAL.tagline} —
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <X size={20} style={{ color: "rgba(255,255,255,0.7)" }} />
                </button>
              </div>
              <div
                style={{
                  height: 1,
                  background:
                    "linear-gradient(90deg,transparent,#c9b86c 30%,#c9b86c 70%,transparent)",
                  margin: "0 20px",
                }}
              ></div>
              <div
                style={{
                  padding: "8px 20px 12px",
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                {[
                  ["📞", HOSPITAL.phone],
                  ["✉", HOSPITAL.email],
                  ["📍", HOSPITAL.location],
                ].map(([icon, text]) => (
                  <span key={text} style={{ fontSize: 9.5, color: "#b8a87a" }}>
                    {icon} {text}
                  </span>
                ))}
                {(totalDietMarked > 0 || totalTherapyChecked > 0) && (
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: 10,
                      color: "#c9b86c",
                      fontWeight: 700,
                    }}
                  >
                    {totalDietMarked > 0 && `${totalDietMarked} diet`}
                    {totalDietMarked > 0 && totalTherapyChecked > 0 && " · "}
                    {totalTherapyChecked > 0 &&
                      `${totalTherapyChecked} therapy`}{" "}
                    marked
                  </span>
                )}
              </div>
            </div>

            {/* Success banner */}
            {showSuccess && (
              <div className="mx-4 mt-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-3 flex-shrink-0">
                <span className="text-emerald-500 text-lg">✓</span>
                <p className="text-sm font-semibold text-emerald-700">
                  Patient form exported successfully!
                </p>
              </div>
            )}

            {/* Scrollable body */}
            <div
              className="overflow-y-auto flex-1"
              style={{ padding: "0 0 8px" }}
            >
              {/* ── PATIENT INFORMATION ── */}
              <div style={S.secBanner}>
                <span style={S.secBannerText}>🧾 Patient Information</span>
              </div>
              <div style={{ padding: "12px 18px 0" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <Field
                    label="Patient Name"
                    value={patient.name}
                    onChange={setP("name")}
                    placeholder="Full name"
                  />
                  <Field
                    label="Patient ID"
                    value={patient.patientId}
                    onChange={setP("patientId")}
                    placeholder="ID / OP number"
                  />
                  <Field
                    label="OP Number"
                    value={patient.opNumber}
                    onChange={setP("opNumber")}
                    placeholder="OP / IP number"
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <Field
                    label="Age"
                    value={patient.age}
                    onChange={setP("age")}
                    placeholder="Years"
                  />
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <div style={S.fieldLabel}>Gender</div>
                    <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                      {["Male", "Female", "Other"].map((g) => (
                        <label
                          key={g}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 11,
                            color: "#3a5a4a",
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="radio"
                            name="gender"
                            value={g}
                            checked={patient.gender === g}
                            onChange={() => setP("gender")(g)}
                            style={{ accentColor: "#2d6b42" }}
                          />{" "}
                          {g}
                        </label>
                      ))}
                    </div>
                  </div>
                  <Field
                    label="Occupation"
                    value={patient.occupation}
                    onChange={setP("occupation")}
                    placeholder="Profession"
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <Field
                    label="Date"
                    type="date"
                    value={patient.date}
                    onChange={setP("date")}
                  />
                  <Field
                    label="BP (mmHg)"
                    value={patient.bp}
                    onChange={setP("bp")}
                    placeholder="120/80"
                  />
                  <Field
                    label="Weight (kg)"
                    value={patient.weight}
                    onChange={(v) => handleWeightHeight("weight", v)}
                    placeholder="kg"
                  />
                  <Field
                    label="Height (cm)"
                    value={patient.height}
                    onChange={(v) => handleWeightHeight("height", v)}
                    placeholder="cm"
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 3fr",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <div style={S.fieldLabel}>BMI (auto)</div>
                    <div
                      style={{
                        ...S.fieldInput,
                        background: patient.bmi ? "#f0fdf4" : "transparent",
                        color: patient.bmi ? "#166534" : "#1a2e1e",
                        fontWeight: patient.bmi ? 700 : 400,
                      }}
                    >
                      {patient.bmi || "—"}
                    </div>
                  </div>
                  <div></div>
                </div>

                {/* Diagnosis */}
                <div style={{ ...S.panel, marginBottom: 8 }}>
                  <div style={S.panelHdr}>
                    <span style={{ fontSize: 12, marginRight: 4 }}>🩺</span>
                    <span style={S.panelTitle}>Diagnosis</span>
                  </div>
                  <div style={S.panelBody}>
                    <textarea
                      value={patient.diagnosis}
                      onChange={(e) => setP("diagnosis")(e.target.value)}
                      rows={2}
                      placeholder="Primary diagnosis..."
                      style={{
                        width: "100%",
                        border: "none",
                        outline: "none",
                        resize: "none",
                        fontSize: 11,
                        color: "#1a2e1e",
                        background: "transparent",
                        fontFamily: "inherit",
                        lineHeight: 1.8,
                      }}
                    />
                  </div>
                </div>

                {/* Complaints + Investigations */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                    marginBottom: 12,
                  }}
                >
                  {[
                    ["💬", "complaints", "Complaints", "Chief complaints..."],
                    [
                      "🔬",
                      "investigations",
                      "Investigations",
                      "Lab / imaging findings...",
                    ],
                  ].map(([icon, key, label, ph]) => (
                    <div key={key} style={S.panel}>
                      <div style={S.panelHdr}>
                        <span style={{ fontSize: 12, marginRight: 4 }}>
                          {icon}
                        </span>
                        <span style={S.panelTitle}>{label}</span>
                      </div>
                      <div style={S.panelBody}>
                        <textarea
                          value={patient[key]}
                          onChange={(e) => setP(key)(e.target.value)}
                          rows={3}
                          placeholder={ph}
                          style={{
                            width: "100%",
                            border: "none",
                            outline: "none",
                            resize: "none",
                            fontSize: 11,
                            color: "#1a2e1e",
                            background: "transparent",
                            fontFamily: "inherit",
                            lineHeight: 1.8,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── DIET & NUTRITION ── */}
              <div style={{ ...S.goldBanner }}></div>
              <div style={S.secBanner}>
                <span style={S.secBannerText}>
                  🥗 Diet &amp; Nutrition Plan
                </span>
              </div>
              <div style={{ padding: "10px 18px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: 10,
                  }}
                >
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
              </div>

              {/* ── THERAPY ── */}
              <div style={S.goldBanner}></div>
              <div style={S.secBanner}>
                <span style={S.secBannerText}>
                  💆 Treatment &amp; Therapy Plan
                </span>
              </div>
              <div style={{ padding: "10px 18px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: 10,
                  }}
                >
                  {Object.keys(THERAPY_PRESETS).map((title) => (
                    <TherapyCard
                      key={title}
                      title={title}
                      checked={therapyState[title].checked}
                      setChecked={(fn) =>
                        setTherapyChecked(title)((prev) => {
                          const next = fn ? fn(prev) : prev;
                          return next;
                        })
                      }
                      custom={therapyState[title].custom}
                      setCustom={(fn) => setTherapyCustom(title)(fn)}
                    />
                  ))}
                </div>
              </div>

              {/* ── NOTES + FOLLOWUP ── */}
              <div style={S.goldBanner}></div>
              <div
                style={{
                  padding: "10px 18px 4px",
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  gap: 10,
                }}
              >
                <div style={S.panel}>
                  <div style={S.panelHdr}>
                    <span style={{ fontSize: 12, marginRight: 4 }}>📝</span>
                    <span style={S.panelTitle}>
                      Others / Additional Recommendations
                    </span>
                  </div>
                  <div style={S.panelBody}>
                    <textarea
                      value={patient.notes}
                      onChange={(e) => setP("notes")(e.target.value)}
                      rows={4}
                      placeholder="Lifestyle guidance, supplement advice, additional instructions..."
                      style={{
                        width: "100%",
                        border: "none",
                        outline: "none",
                        resize: "none",
                        fontSize: 11,
                        color: "#1a2e1e",
                        background: "transparent",
                        fontFamily: "inherit",
                        lineHeight: 1.8,
                      }}
                    />
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: 6,
                        fontSize: 10,
                        color: "#a89a6a",
                        fontStyle: "italic",
                      }}
                    >
                      Heal Naturally · Live Consciously
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    border: "1px solid #c9b86c",
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      background: "linear-gradient(90deg,#1a4a2e,#2d6b42)",
                      padding: "6px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span style={{ fontSize: 12 }}>📅</span>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: "#fff",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      Follow Up Plan
                    </span>
                  </div>
                  <div style={{ padding: "10px 12px" }}>
                    <div style={{ marginBottom: 10 }}>
                      <div style={S.fieldLabel}>Next Visit Date</div>
                      <input
                        type="date"
                        value={patient.nextVisit}
                        onChange={(e) => setP("nextVisit")(e.target.value)}
                        style={S.fieldInput}
                      />
                    </div>
                    <div style={{ marginBottom: 10 }}>
                      <div style={S.fieldLabel}>Time</div>
                      <input
                        type="time"
                        value={patient.nextTime}
                        onChange={(e) => setP("nextTime")(e.target.value)}
                        style={S.fieldInput}
                      />
                    </div>
                    <div
                      style={{
                        borderBottom: "1.5px solid #1a2e1e",
                        marginTop: 16,
                        minHeight: 20,
                      }}
                    ></div>
                    <div
                      style={{
                        fontSize: 9,
                        color: "#8aaa9a",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        marginTop: 3,
                        textAlign: "center",
                      }}
                    >
                      Doctor's Signature
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer — same pattern as DietModule */}
            <div className="flex-shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
              <button
                onClick={reset}
                className="text-sm text-slate-400 hover:text-slate-600 font-medium transition-colors min-h-[44px] flex items-center"
              >
                ↺ Reset Form
              </button>
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-100 transition-all min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
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
