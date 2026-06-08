import React, { useState, useEffect } from "react";
import {
  Laptop, Monitor, Tablet, LayoutDashboard, List, History,
  User, Building2, Phone, Mail, Calendar, AlertTriangle, CheckCircle,
  ArrowLeftCircle, Plus, Search, X, Check, Package, Send,
  Clock, Database
} from "lucide-react";

const DEVICES = [
  { id: "DEV-001", name: "Dell Laptop XPS 15", type: "laptop", serial: "DL-XPS15-001", spec: "Intel i7-13th, RAM 16GB, SSD 512GB" },
  { id: "DEV-002", name: "MacBook Pro 14 นิ้ว", type: "laptop", serial: "MB-PRO14-002", spec: "Apple M3 Pro, RAM 18GB, SSD 512GB" },
  { id: "DEV-003", name: "HP ProDesk 400 G9", type: "desktop", serial: "HP-PD400-003", spec: "Intel i5-12th, RAM 8GB, SSD 256GB" },
  { id: "DEV-004", name: "Microsoft Surface Pro 9", type: "tablet", serial: "MS-SP9-004", spec: "Intel i5-12th, RAM 8GB, SSD 256GB" },
  { id: "DEV-005", name: "Lenovo ThinkPad E15", type: "laptop", serial: "LN-TPE15-005", spec: "AMD Ryzen 5, RAM 8GB, SSD 256GB" },
  { id: "DEV-006", name: "iMac 24 นิ้ว M3", type: "desktop", serial: "AP-IMAC24-006", spec: "Apple M3, RAM 8GB, SSD 256GB" },
  { id: "DEV-007", name: "ASUS ROG Zephyrus G14", type: "laptop", serial: "AS-ROG-007", spec: "AMD Ryzen 9, RAM 32GB, SSD 1TB" },
  { id: "DEV-008", name: "iPad Pro 12.9 นิ้ว M2", type: "tablet", serial: "AP-IPADP-008", spec: "Apple M2, RAM 8GB, 256GB" },
];

const DEPARTMENTS = [
  "ฝ่ายไอที", "ฝ่ายทรัพยากรบุคคล", "ฝ่ายการเงิน",
  "ฝ่ายการตลาด", "ฝ่ายขาย", "ผู้บริหาร"
];

const TYPE_LABELS = { laptop: "โน้ตบุ๊ก", desktop: "คอมพิวเตอร์ตั้งโต๊ะ", tablet: "แท็บเล็ต" };
const IT_RETURN_PASSWORD = "2938";

const DeviceIcon = ({ type, size = 18 }) => {
  if (type === "desktop") return <Monitor size={size} />;
  if (type === "tablet") return <Tablet size={size} />;
  return <Laptop size={size} />;
};

const toThaiDate = (iso) => {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("th-TH", { day: "2-digit", month: "short", year: "numeric" });
};

const toThaiDateTime = (iso) => {
  if (!iso) return "-";
  return new Date(iso).toLocaleString("th-TH", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
  });
};

const css = `
:root {
  --font-sans: Inter, ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --border-radius-md: 12px;
  --border-radius-lg: 18px;
  --border-radius-xl: 28px;
  --color-background-primary: #ffffff;
  --color-background-secondary: #f8fafc;
  --color-background-success: #ecfdf5;
  --color-background-info: #eff6ff;
  --color-background-danger: #fef2f2;
  --color-background-warning: #fefce8;
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
  --color-text-success: #047857;
  --color-text-info: #1d4ed8;
  --color-text-danger: #b91c1c;
  --color-text-warning: #92400e;
  --color-border-primary: #cbd5e1;
  --color-border-secondary: #d1d5db;
  --color-border-tertiary: #e5e7eb;
  --color-border-success: #d1fae5;
  --color-border-info: #bfdbfe;
  --color-border-danger: #fecaca;
  --color-border-warning: #fde68a;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { min-height: 100%; }
body {
  font-family: var(--font-sans);
  background: linear-gradient(180deg, #f5f7fb 0%, #e9eef7 100%);
  color: var(--color-text-primary);
}
button, input, select {
  font: inherit;
}
.tab-btn {
  background: rgba(255,255,255,0.88); border: 1px solid transparent; cursor: pointer;
  padding: 9px 18px; font-size: 13px; font-weight: 500;
  color: var(--color-text-secondary); border-radius: var(--border-radius-lg);
  font-family: inherit; transition: background .2s, color .2s, border-color .2s, transform .2s;
  display: flex; align-items: center; gap: 6px; white-space: nowrap;
}
.tab-btn.on {
  background: #ffffff; color: var(--color-text-primary);
  border-color: var(--color-border-secondary); box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}
.tab-btn:hover:not(.on) { background: #ffffff; color: var(--color-text-primary); transform: translateY(-1px); }
.stat-card {
  background: #ffffff;
  border-radius: var(--border-radius-lg);
  padding: 1.35rem;
  border: 1px solid rgba(226,232,240,0.9);
  box-shadow: 0 18px 45px rgba(15,23,42,0.06);
}
.card {
  background: #ffffff;
  border: 1px solid rgba(226,232,240,0.95);
  border-radius: var(--border-radius-lg);
  padding: 1.25rem 1.35rem;
  transition: border-color .15s, box-shadow .15s, transform .15s;
}
.card:hover {
  border-color: rgba(148,163,184,0.8);
  box-shadow: 0 12px 30px rgba(15,23,42,0.05);
  transform: translateY(-1px);
}
.card:hover { border-color: var(--color-border-secondary); }
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 12px; font-weight: 500; padding: 3px 9px; border-radius: 100px;
}
.b-ok   { background: var(--color-background-success); color: var(--color-text-success); border: 0.5px solid var(--color-border-success); }
.b-use  { background: var(--color-background-info);    color: var(--color-text-info);    border: 0.5px solid var(--color-border-info); }
.b-late { background: var(--color-background-danger);  color: var(--color-text-danger);  border: 0.5px solid var(--color-border-danger); }
.b-warn { background: var(--color-background-warning); color: var(--color-text-warning); border: 0.5px solid var(--color-border-warning); }
.btn-out {
  background: #ffffff; border: 1px solid rgba(148,163,184,0.25);
  border-radius: 16px; padding: 10px 16px;
  font-size: 13px; font-weight: 600; cursor: pointer;
  color: var(--color-text-primary); font-family: inherit;
  transition: background .2s, border-color .2s, transform .2s;
  display: flex; align-items: center; gap: 8px;
}
.btn-out:hover {
  background: #f8fafc; border-color: rgba(148,163,184,0.45); transform: translateY(-1px);
}
.btn-ret {
  background: #fef2f2; border: 1px solid rgba(248,113,113,0.35);
  border-radius: 16px; padding: 10px 16px;
  font-size: 13px; font-weight: 600; cursor: pointer;
  color: var(--color-text-danger); font-family: inherit;
  transition: background .2s, border-color .2s, transform .2s;
  display: flex; align-items: center; gap: 8px;
}
.btn-ret:hover {
  background: #fee2e2; border-color: rgba(248,113,113,0.6); transform: translateY(-1px);
}
.btn-main {
  background: var(--color-text-primary); color: var(--color-background-primary);
  border: none; border-radius: 18px;
  padding: 12px 24px; font-size: 15px; font-weight: 700;
  cursor: pointer; font-family: inherit; transition: transform .15s, box-shadow .15s;
  display: inline-flex; align-items: center; gap: 10px;
}
.btn-main:hover { transform: translateY(-1px); box-shadow: 0 15px 35px rgba(17,24,39,0.14); }
input, select {
  font-family: inherit; font-size: 14px;
  background: #f8fafc;
  border: 1px solid rgba(148,163,184,0.4);
  border-radius: var(--border-radius-md); color: var(--color-text-primary);
  padding: 12px 14px; width: 100%; outline: none; transition: border-color .2s, box-shadow .2s, background .2s;
}
input::placeholder, select::placeholder {
  color: #94a3b8;
}
input:focus, select:focus {
  border-color: var(--color-text-info);
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(59,130,246,0.12);
}
.flabel { font-size: 0.95rem; color: var(--color-text-secondary); display: block; margin-bottom: 8px; font-weight: 600; letter-spacing: 0.01em; }
.hrow {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 12px 0; border-bottom: 0.5px solid var(--color-border-tertiary);
}
.hrow:last-child { border-bottom: none; }
.mono { font-family: var(--font-mono); font-size: 11px; color: var(--color-text-tertiary); }
.overlay {
  position: fixed; inset: 0;
  background: rgba(15, 23, 42, 0.72);
  backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: center;
  padding: 22px; z-index: 1000;
}
.modal {
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(203, 213, 225, 0.95);
  padding: 2rem 1.75rem;
  width: min(720px, calc(100% - 44px));
  max-width: 720px;
  max-height: 92vh; overflow-y: auto;
  box-shadow: 0 40px 120px rgba(15, 23, 42, 0.18);
  position: relative;
  z-index: 1001;
}
.modal h2 {
  font-size: 1.45rem;
  margin-bottom: 0.8rem;
  letter-spacing: 0.01em;
}
.modal .flabel {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  font-weight: 600;
}
.modal input, .modal select {
  min-height: 48px;
}
.toast {
  position: fixed; bottom: 20px; right: 20px;
  padding: 11px 16px; border-radius: var(--border-radius-md);
  font-size: 14px; font-weight: 500; z-index: 200;
  display: flex; align-items: center; gap: 7px; border: 0.5px solid;
}
.t-ok   { background: var(--color-background-success); color: var(--color-text-success); border-color: var(--color-border-success); }
.t-err  { background: var(--color-background-danger);  color: var(--color-text-danger);  border-color: var(--color-border-danger); }
.meta { font-size: 12px; color: var(--color-text-tertiary); display: flex; align-items: center; gap: 4px; }
`;

export default function App() {
  const [borrowings, setBorrowings] = useState([]);
  const [history, setHistory] = useState([]);
  const [tab, setTab] = useState("dashboard");
  const [modal, setModal] = useState(false);
  const [picked, setPicked] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ name: "", dept: "", phone: "", purpose: "", email: "", borrowDate: "" });
  const [returnModal, setReturnModal] = useState(false);
  const [returnDeviceId, setReturnDeviceId] = useState(null);
  const [returnPassword, setReturnPassword] = useState("");

  const notify = (msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const storageGet = async (key) => {
    if (window.storage && typeof window.storage.get === "function") {
      return await window.storage.get(key);
    }
    return { value: localStorage.getItem(key) };
  };

  const storageSet = async (key, value) => {
    if (window.storage && typeof window.storage.set === "function") {
      await window.storage.set(key, value);
    } else {
      localStorage.setItem(key, value);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const b = await storageGet("itborrow_v1");
        const h = await storageGet("ithist_v1");
        if (b && b.value) setBorrowings(JSON.parse(b.value));
        if (h && h.value) setHistory(JSON.parse(h.value));
      } catch {}
      setLoading(false);
    })();
  }, []);

  const save = async (b, h) => {
    try {
      await storageSet("itborrow_v1", JSON.stringify(b));
      await storageSet("ithist_v1", JSON.stringify(h));
    } catch {}
  };

  const getStatus = (id) => borrowings.some(x => x.deviceId === id) ? "borrowed" : "available";

  const getBorrow = (id) => borrowings.find(x => x.deviceId === id);

  const openModal = (device) => {
    setPicked(device);
    const d = new Date();
    setForm({ name: "", dept: "", phone: "", purpose: "", email: "", borrowDate: d.toISOString().split("T")[0] });
    setModal(true);
  };

  const confirmBorrow = () => {
    const email = form.email.trim().toLowerCase();
    if (!form.name.trim() || !form.dept || !email) {
      notify("กรุณากรอกข้อมูลให้ครบถ้วน", "err");
      return;
    }
    if (!/^[^\s@]+@xcmg\.com$/.test(email)) {
      notify("กรุณากรอกอีเมลองค์กร @xcmg.com", "err");
      return;
    }
    if (borrowings.some(x => x.email === email)) {
      notify("อีเมลนี้กำลังยืมอุปกรณ์อยู่แล้ว กรุณาใช้ email อื่น", "err");
      return;
    }
    const now = new Date().toISOString();
    const rec = {
      id: `BOR-${Date.now().toString().slice(-6)}`,
      deviceId: picked.id, deviceName: picked.name, deviceType: picked.type,
      borrowerName: form.name.trim(), department: form.dept,
      email, phone: form.phone.trim(), purpose: form.purpose.trim(),
      borrowedAt: now,
    };
    const nb = [...borrowings, rec];
    const nh = [{ ...rec, action: "borrow", timestamp: now }, ...history];
    setBorrowings(nb); setHistory(nh); save(nb, nh);
    setModal(false);
    notify(`ยืม "${picked.name}" เรียบร้อย`);
  };

  const doReturn = (deviceId) => {
    const rec = getBorrow(deviceId);
    if (!rec) return;
    const now = new Date().toISOString();
    const nb = borrowings.filter(x => x.deviceId !== deviceId);
    const nh = [{ ...rec, action: "return", timestamp: now }, ...history];
    setBorrowings(nb); setHistory(nh); save(nb, nh);
    notify(`คืน "${rec.deviceName}" เรียบร้อย`);
  };

  const openReturnModal = (deviceId) => {
    setReturnDeviceId(deviceId);
    setReturnPassword("");
    setReturnModal(true);
  };

  const confirmReturn = () => {
    if (returnPassword !== IT_RETURN_PASSWORD) {
      notify("รหัสผ่านฝ่ายไอทีไม่ถูกต้อง", "err");
      return;
    }
    if (returnDeviceId) {
      doReturn(returnDeviceId);
    }
    setReturnModal(false);
    setReturnDeviceId(null);
    setReturnPassword("");
  };

  const stats = {
    total: DEVICES.length,
    available: DEVICES.filter(d => getStatus(d.id) === "available").length,
    borrowed: borrowings.length,
    pendingReturn: borrowings.length,
  };

  const filtered = DEVICES.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.id.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <span style={{ color: "var(--color-text-tertiary)", fontSize: 14 }}>กำลังโหลดข้อมูล...</span>
    </div>
  );

  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      <style>{css}</style>

      {/* Header */}
      <div style={{ background: "var(--color-background-primary)", borderBottom: "0.5px solid var(--color-border-tertiary)", padding: "0 24px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Database size={17} style={{ color: "var(--color-text-primary)" }} />
            <span style={{ fontWeight: 500, fontSize: 15 }}>ระบบยืม-คืนอุปกรณ์คอมพิวเตอร์</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--color-text-success)", display: "inline-block" }} />
            <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>ออนไลน์</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "20px 24px" }}>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "var(--color-background-secondary)", padding: 5, borderRadius: "var(--border-radius-lg)", width: "fit-content", flexWrap: "wrap" }}>
          {[
            { id: "dashboard", label: "แดชบอร์ด",        Icon: LayoutDashboard },
            { id: "devices",   label: `อุปกรณ์ (${stats.total})`, Icon: Monitor },
            { id: "borrowings",label: `กำลังยืม (${stats.borrowed})`, Icon: List },
            { id: "history",   label: "ประวัติ",           Icon: History },
          ].map(({ id, label, Icon }) => (
            <button key={id} className={`tab-btn ${tab === id ? "on" : ""}`} onClick={() => setTab(id)}>
              <Icon size={13} aria-hidden="true" />{label}
            </button>
          ))}
        </div>

        {/* ── แดชบอร์ด ── */}
        {tab === "dashboard" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 24 }}>
              {[
                { label: "อุปกรณ์ทั้งหมด",    value: stats.total,       Icon: Package,       color: "var(--color-text-tertiary)" },
                { label: "พร้อมใช้งาน",        value: stats.available,   Icon: CheckCircle,   color: "var(--color-text-success)" },
                { label: "กำลังถูกยืม",        value: stats.borrowed,    Icon: Send,          color: "var(--color-text-info)" },
                { label: "ยังไม่คืน",         value: stats.pendingReturn, Icon: Clock,        color: "var(--color-text-warning)" },
              ].map(({ label, value, Icon, color }) => (
                <div key={label} className="stat-card">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{label}</span>
                    <Icon size={15} style={{ color }} aria-hidden="true" />
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 500, color }}>{value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {/* กำลังยืม */}
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 10, display: "flex", alignItems: "center", gap: 5, color: "var(--color-text-primary)" }}>
                  <Send size={14} style={{ color: "var(--color-text-info)" }} aria-hidden="true" />
                  กำลังถูกยืมอยู่
                </h3>
                {borrowings.length === 0 ? (
                  <div className="card" style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-tertiary)" }}>
                    <CheckCircle size={30} style={{ margin: "0 auto 8px", display: "block" }} aria-hidden="true" />
                    <div style={{ fontSize: 13 }}>อุปกรณ์ทุกชิ้นว่างพร้อมใช้งาน</div>
                  </div>
                ) : borrowings.map(b => (
                    <div key={b.id} className="card" style={{ marginBottom: 8, borderColor: "var(--color-border-info)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 5 }}>{b.deviceName}</div>
                          <div className="meta"><User size={11} /><span>{b.borrowerName}</span><span style={{ color: "var(--color-text-tertiary)" }}>· {b.department}</span></div>
                          <div className="meta" style={{ marginTop: 3 }}>
                            <Calendar size={11} />
                            ยืมเมื่อ <span>{toThaiDate(b.borrowedAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* พร้อมให้ยืม */}
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 10, display: "flex", alignItems: "center", gap: 5, color: "var(--color-text-primary)" }}>
                  <CheckCircle size={14} style={{ color: "var(--color-text-success)" }} aria-hidden="true" />
                  พร้อมให้ยืม
                </h3>
                {DEVICES.filter(d => getStatus(d.id) === "available").slice(0, 5).map(d => (
                  <div key={d.id} className="card" style={{ marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 500, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.name}</div>
                      <div className="mono">{d.id}</div>
                    </div>
                    <button className="btn-out" style={{ padding: "5px 12px", fontSize: 12, flexShrink: 0 }} onClick={() => openModal(d)}>ยืม</button>
                  </div>
                ))}
                {DEVICES.filter(d => getStatus(d.id) === "available").length > 5 && (
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-secondary)", fontSize: 13, fontFamily: "inherit", padding: "4px 0" }} onClick={() => setTab("devices")}>
                    ดูทั้งหมด ({DEVICES.filter(d => getStatus(d.id) === "available").length} เครื่อง) →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── อุปกรณ์ทั้งหมด ── */}
        {tab === "devices" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12 }}>
              <h2 style={{ fontSize: 17, fontWeight: 500 }}>อุปกรณ์ทั้งหมด <span style={{ color: "var(--color-text-tertiary)", fontSize: 14 }}>({DEVICES.length})</span></h2>
              <div style={{ position: "relative" }}>
                <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-tertiary)" }} aria-hidden="true" />
                <input placeholder="ค้นหาอุปกรณ์..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 30, width: 210 }} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(272px, 1fr))", gap: 14 }}>
              {filtered.map(device => {
                const status = getStatus(device.id);
                const borrow = getBorrow(device.id);
                const late = status === "overdue";
                return (
                  <div key={device.id} className="card" style={{ borderColor: status === "borrowed" ? "var(--color-border-info)" : late ? "var(--color-border-danger)" : undefined }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <div style={{ width: 34, height: 34, borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-secondary)", flexShrink: 0 }}>
                          <DeviceIcon type={device.type} size={17} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 500, fontSize: 13 }}>{device.name}</div>
                          <div className="mono">{device.id}</div>
                        </div>
                      </div>
                      <span className={`badge ${status === "available" ? "b-ok" : late ? "b-late" : "b-use"}`}>
                        {status === "available" ? <><CheckCircle size={10} />ว่าง</> :
                         late ? <><AlertTriangle size={10} />เกินกำหนด</> :
                         <><Send size={10} />ถูกยืม</>}
                      </span>
                    </div>

                    <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginBottom: 3 }}>{TYPE_LABELS[device.type]} · {device.spec}</div>
                    <div className="mono" style={{ marginBottom: 12 }}>S/N: {device.serial}</div>

                    {borrow && (
                      <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "8px 10px", marginBottom: 10 }}>
                        <div className="meta" style={{ marginBottom: 3 }}><User size={11} /><span style={{ fontWeight: 500, fontSize: 13 }}>{borrow.borrowerName}</span><span>· {borrow.department}</span></div>
                        {borrow.phone && <div className="meta" style={{ marginBottom: 2 }}><Phone size={11} /><span>{borrow.phone}</span></div>}
                    {borrow.email && <div className="meta" style={{ marginBottom: 2 }}><Mail size={11} /><span>{borrow.email}</span></div>}
                    <div className="meta">
                      <Calendar size={11} />ยืมเมื่อ {toThaiDate(borrow.borrowedAt)}
                    </div>
                    {borrow.purpose && <div className="meta" style={{ marginTop: 2 }}>วัตถุประสงค์: {borrow.purpose}</div>}
                      </div>
                    )}

                    {status === "available"
                      ? <button className="btn-out" style={{ width: "100%", justifyContent: "center" }} onClick={() => openModal(device)}><Plus size={13} />ยืมอุปกรณ์นี้</button>
                      : <button className="btn-ret" style={{ width: "100%", justifyContent: "center" }} onClick={() => openReturnModal(device.id)}><ArrowLeftCircle size={13} />คืนอุปกรณ์</button>
                    }
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── กำลังยืม ── */}
        {tab === "borrowings" && (
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 500, marginBottom: 16 }}>อุปกรณ์ที่กำลังถูกยืม</h2>
            {borrowings.length === 0 ? (
              <div className="card" style={{ textAlign: "center", padding: "4rem" }}>
                <Package size={36} style={{ color: "var(--color-text-tertiary)", margin: "0 auto 10px", display: "block" }} />
                <div style={{ fontWeight: 500, fontSize: 14, color: "var(--color-text-secondary)", marginBottom: 4 }}>ไม่มีอุปกรณ์ที่ถูกยืม</div>
                <div style={{ fontSize: 13, color: "var(--color-text-tertiary)" }}>อุปกรณ์ทุกชิ้นพร้อมใช้งาน</div>
              </div>
            ) : borrowings.map(b => {
              return (
                <div key={b.id} className="card" style={{ marginBottom: 12, borderColor: "var(--color-border-info)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flex: 1 }}>
                      <div style={{ width: 38, height: 38, borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--color-text-secondary)" }}>
                        <DeviceIcon type={b.deviceType || "laptop"} size={19} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 7 }}>
                          <span style={{ fontWeight: 500, fontSize: 14 }}>{b.deviceName}</span>
                          <span className="mono">#{b.id}</span>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "4px 18px" }}>
                          {[
                            [<User size={11} />, "ผู้ยืม", b.borrowerName, true],
                            [<Building2 size={11} />, "แผนก", b.department, false],
                            b.email ? [<Mail size={11} />, "อีเมล", b.email, false] : null,
                            b.phone ? [<Phone size={11} />, "โทร", b.phone, false] : null,
                            [<Calendar size={11} />, "ยืมเมื่อ", toThaiDate(b.borrowedAt), false],
                            b.purpose ? [null, "วัตถุประสงค์", b.purpose, false] : null,
                          ].filter(Boolean).map(([icon, label, val, warn], i) => (
                            <div key={i} className="meta">
                              {icon}{label}: <span style={{ color: warn ? "var(--color-text-danger)" : "var(--color-text-primary)", fontWeight: warn ? 500 : 400 }}>{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button className="btn-ret" style={{ alignSelf: "center", flexShrink: 0 }} onClick={() => openReturnModal(b.deviceId)}>
                      <ArrowLeftCircle size={13} />คืนอุปกรณ์
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── ประวัติ ── */}
        {tab === "history" && (
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 500, marginBottom: 16 }}>
              ประวัติการยืม-คืน <span style={{ color: "var(--color-text-tertiary)", fontSize: 14 }}>({history.length} รายการ)</span>
            </h2>
            {history.length === 0 ? (
              <div className="card" style={{ textAlign: "center", padding: "4rem" }}>
                <History size={36} style={{ color: "var(--color-text-tertiary)", margin: "0 auto 10px", display: "block" }} />
                <div style={{ fontSize: 13, color: "var(--color-text-tertiary)" }}>ยังไม่มีประวัติการทำรายการ</div>
              </div>
            ) : (
              <div className="card" style={{ padding: "0 1.25rem" }}>
                {history.map((h, i) => (
                  <div key={i} className="hrow">
                    <div style={{ width: 30, height: 30, borderRadius: "var(--border-radius-md)", background: h.action === "borrow" ? "var(--color-background-info)" : "var(--color-background-success)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: h.action === "borrow" ? "var(--color-text-info)" : "var(--color-text-success)" }}>
                      {h.action === "borrow" ? <Send size={13} /> : <ArrowLeftCircle size={13} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 3 }}>
                        <span style={{ fontWeight: 500, fontSize: 14 }}>{h.deviceName}</span>
                        <span className={`badge ${h.action === "borrow" ? "b-use" : "b-ok"}`} style={{ padding: "2px 8px", fontSize: 11 }}>
                          {h.action === "borrow" ? "ยืม" : "คืน"}
                        </span>
                      </div>
                      <div className="meta">
                        {h.borrowerName} · {h.department}
                        {h.email ? ` · ${h.email}` : ""}
                        {h.purpose ? ` · ${h.purpose}` : ""}
                      </div>
                    </div>
                    <div className="mono" style={{ textAlign: "right", flexShrink: 0, lineHeight: 1.5 }}>
                      {toThaiDateTime(h.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal คืนอุปกรณ์ด้วยรหัสผ่านฝ่ายไอที */}
      {returnModal && returnDeviceId && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && setReturnModal(false)}>
          <div className="modal">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 500, marginBottom: 3 }}>ยืนยันการคืน</h2>
                <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>กรุณาใส่รหัสผ่านฝ่ายไอทีเพื่อคืนอุปกรณ์</div>
              </div>
              <button onClick={() => setReturnModal(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--color-text-tertiary)" }}>
                <X size={17} />
              </button>
            </div>
            <div style={{ display: "grid", gap: 13 }}>
              <div>
                <label className="flabel">รหัสผ่านฝ่ายไอที</label>
                <input type="password" placeholder="รหัสผ่านฝ่ายไอที" value={returnPassword} onChange={e => setReturnPassword(e.target.value)} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button onClick={() => setReturnModal(false)} style={{ flex: 1, background: "none", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", padding: "9px", fontSize: 14, cursor: "pointer", color: "var(--color-text-secondary)", fontFamily: "inherit" }}>
                ยกเลิก
              </button>
              <button className="btn-main" onClick={confirmReturn} style={{ flex: 2, justifyContent: "center" }}>
                <Check size={13} />ยืนยันคืน
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal ยืมอุปกรณ์ */}
      {modal && picked && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="modal">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 500, marginBottom: 3 }}>ยืมอุปกรณ์</h2>
                <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{picked.name}</div>
              </div>
              <button onClick={() => setModal(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--color-text-tertiary)" }}>
                <X size={17} />
              </button>
            </div>

            {/* รายละเอียดอุปกรณ์ */}
            <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "10px 12px", marginBottom: 18, display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ width: 34, height: 34, borderRadius: "var(--border-radius-md)", background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--color-text-secondary)" }}>
                <DeviceIcon type={picked.type} size={17} />
              </div>
              <div>
                <div style={{ fontWeight: 500, fontSize: 13 }}>{picked.name}</div>
                <div className="mono">{picked.id} · {picked.serial}</div>
                <div style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>{picked.spec}</div>
              </div>
            </div>

            <div style={{ display: "grid", gap: 13 }}>
              <div>
                <label className="flabel">ชื่อ-นามสกุลผู้ยืม *</label>
                <input placeholder="กรอกชื่อ-นามสกุล" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label className="flabel">แผนก *</label>
                  <select value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })}>
                    <option value="">เลือกแผนก</option>
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="flabel">เบอร์โทรศัพท์</label>
                  <input placeholder="0812345678" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="flabel">อีเมลองค์กร @xcmg.com *</label>
                <input placeholder="example@xcmg.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 4 }}>เฉพาะอีเมลองค์กร @xcmg.com เท่านั้น</div>
              </div>
              <div>
                <label className="flabel">วันที่เริ่มยืม</label>
                <input type="date" value={form.borrowDate} disabled />
              </div>
              <div>
                <label className="flabel">วัตถุประสงค์การยืม</label>
                <input placeholder="เช่น ประชุมลูกค้า, ทำงานที่บ้าน..." value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })} />
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button onClick={() => setModal(false)} style={{ flex: 1, background: "none", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", padding: "9px", fontSize: 14, cursor: "pointer", color: "var(--color-text-secondary)", fontFamily: "inherit" }}>
                ยกเลิก
              </button>
              <button className="btn-main" onClick={confirmBorrow} style={{ flex: 2, justifyContent: "center" }}>
                <Check size={13} />ยืนยันการยืม
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`toast t-${toast.type}`}>
          {toast.type === "ok" ? <Check size={14} /> : <AlertTriangle size={14} />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}
