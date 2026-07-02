import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoImg from "@/imports/ada_font_2-removebg-preview.png";
import logoIconImg from "@/imports/gaada_font_2-removebg-preview.png";
import biasaImg from "@/imports/wmremove-transformed__1___3_.png";
import cairImg from "@/imports/upscalemedia-transformed__1_.jpeg";
import {
  Search, Menu, X, MapPin, Star, ShoppingBag, Truck, Recycle,
  LogIn, Sparkles, Users, Trash2, Sprout, Leaf, ArrowLeft,
  ShieldCheck, AlertTriangle, CheckCircle, Clock, Info,
  LayoutDashboard, LogOut, History, ClipboardList, User,
  Activity, UploadCloud, Package, Inbox, CreditCard, Shield,
  QrCode, ArrowRight, Check, ChevronLeft, Camera, Tag, Scale,
  XCircle, MessageCircle, GitCommit, Zap, SlidersHorizontal,
  Map, Store, Coins, RefreshCw, Calendar, Phone, Landmark,
  FileText, Plus, AlertCircle, CheckSquare, Heart, UtensilsCrossed,
  ShoppingCart, ChevronDown, BarChart3, Globe, Factory, TreePine,
  Handshake, Wheat, Building2, TrendingDown, Cloud, DollarSign,
} from "lucide-react";
import { toast, Toaster } from "sonner";

// ─── DATA ───────────────────────────────────────────────────────────────────

const MOCK_PARTNERS_INIT = [
  { id: 1, name: "Warung Nasi Bu Sinta", type: "Restaurant", address: "Jl. Margonda Raya No. 12, Depok", distance: "0.8 km", distanceValue: 0.8, isOpen: true, hasProduct: true, categories: ["Sayuran", "Lauk Pauk"], rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400&h=300", reputation: "Mitra Terpercaya", totalTransactions: 124 },
  { id: 2, name: "Hotel Bumi Hijau", type: "Hotel", address: "Jl. Sudirman Kav 45, Jakarta", distance: "2.1 km", distanceValue: 2.1, isOpen: true, hasProduct: true, categories: ["Lauk Pauk", "Makanan Siap Saji"], rating: 4.9, reviews: 312, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400&h=300", reputation: "Mitra Terpercaya", totalTransactions: 312 },
  { id: 3, name: "Supermarket Segar", type: "Supermarket", address: "Jl. Pajajaran No. 8, Bogor", distance: "3.5 km", distanceValue: 3.5, isOpen: false, hasProduct: false, categories: [], rating: 4.5, reviews: 89, image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=400&h=300", reputation: "Mitra Dalam Pengawasan", totalTransactions: 89 },
  { id: 4, name: "Toko Roti enak", type: "Restaurant", address: "Jl. Bintaro Utama, Tangerang", distance: "1.2 km", distanceValue: 1.2, isOpen: true, hasProduct: true, categories: ["Roti & Pastry", "Minuman"], rating: 4.7, reviews: 201, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400&h=300", reputation: "Mitra Terpercaya", totalTransactions: 201 },
  { id: 5, name: "Cafe", type: "Cafe", address: "Jl. Kemang Raya, Jakarta", distance: "5.0 km", distanceValue: 5.0, isOpen: true, hasProduct: true, categories: ["Minuman", "Makanan Siap Saji", "Roti & Pastry"], rating: 4.6, reviews: 150, image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400&h=300", reputation: "Mitra Terpercaya", totalTransactions: 150 },
];

const MOCK_COMPOST = [
  { id: 1, name: "Kompos Organik", price: "Rp 15.000 / kg", rawPrice: 15000, desc: "Kompos berkualitas tinggi hasil olahan limbah makanan mitra Palang Pintu.", badge: "Sirkular Terbaik" },
  { id: 2, name: "Pupuk Cair Organik", price: "Rp 25.000 / botol", rawPrice: 25000, desc: "Nutrisi cair siap pakai untuk tanaman hias dan sayuran di rumah.", badge: "Siap Pakai" },
];

const MOCK_BRANCHES = [
  { id: "B1", name: "PALANG PINTU Jakarta Pusat", address: "Jl. Cempaka Putih No. 15, Jakarta Pusat", time: "Sen-Jum: 08:00 - 17:00", phone: "021-555-0101" },
  { id: "B2", name: "PALANG PINTU Depok", address: "Jl. Margonda Raya No. 88, Depok", time: "Sen-Jum: 08:00 - 17:00", phone: "021-555-0102" },
];

const CATEGORIES = [
  { name: "Sayuran", icon: "🥬", color: "bg-green-100 text-green-800" },
  { name: "Lauk Pauk", icon: "🍗", color: "bg-orange-100 text-orange-800" },
  { name: "Roti & Pastry", icon: "🍞", color: "bg-yellow-100 text-yellow-800" },
  { name: "Minuman", icon: "🥤", color: "bg-blue-100 text-blue-800" },
  { name: "Makanan Siap Saji", icon: "🍱", color: "bg-red-100 text-red-800" },
];

const INITIAL_COMPLAINTS = [
  {
    id: "ADU-001", date: "12 Juni 2026", partner: "Warung Nasi Bu Sinta",
    category: "Kualitas Makanan (Basi/Kurang Layak)",
    status: "Sedang Ditinjau", lastUpdated: "13 Juni 2026 - 08:15",
    desc: "Nasi kotak yang saya terima nasinya sudah berbau agak asam dan sayurnya berlendir tidak segar.",
    image: "https://placehold.co/400x300/f1f5f9/64748b?text=Bukti+Foto+Makanan",
    timeline: [
      { status: "Menunggu Verifikasi", subtitle: "Sistem Koperasi", date: "12 Juni 2026 - 10:20", done: true },
      { status: "Sedang Ditinjau", subtitle: "Tim Investigasi PALANG PINTU", date: "13 Juni 2026 - 08:15", done: true },
      { status: "Menunggu Klarifikasi Mitra", subtitle: "Warung Nasi Bu Sinta", date: "", done: false },
      { status: "Aduan Selesai", subtitle: "Asuransi / Pengembalian", date: "", done: false },
    ],
  },
  {
    id: "ADU-002", date: "05 Mei 2026", partner: "Supermarket Segar",
    category: "Toko Tutup Saat Jam Operasional Pengambilan",
    status: "Aduan Selesai", lastUpdated: "06 Mei 2026 - 14:00",
    desc: "Saya sampai di lokasi jam 20:00 (jadwal pickup max 21:00) tapi rolling door toko sudah dikunci rapat.",
    image: "https://placehold.co/400x300/f1f5f9/64748b?text=Bukti+Toko+Tutup",
    timeline: [
      { status: "Menunggu Verifikasi", subtitle: "Sistem Koperasi", date: "05 Mei 2026 - 20:15", done: true },
      { status: "Sedang Ditinjau", subtitle: "Tim Investigasi PALANG PINTU", date: "06 Mei 2026 - 09:00", done: true },
      { status: "Menunggu Klarifikasi Mitra", subtitle: "Supermarket Segar", date: "06 Mei 2026 - 11:30", done: true },
      { status: "Aduan Selesai", subtitle: "Dana Dikembalikan 100%", date: "06 Mei 2026 - 14:00", done: true },
    ],
  },
];

// ─── TYPES ──────────────────────────────────────────────────────────────────

type View = "home" | "search" | "mitra" | "detail" | "kompos" | "aduan" | "register" | "dashboard" | "login" | "register-customer" | "profile" | "purchase" | "purchase-compost" | "payment" | "order-success" | "history" | "review" | "complaint-status" | "complaint-detail";

interface Partner {
  id: number; name: string; type: string; address: string; distance: string;
  distanceValue: number; isOpen: boolean; hasProduct: boolean; categories: string[];
  rating: number; reviews: number; image: string; reputation: string; totalTransactions: number;
}

interface Order {
  id: string; date: string; type: string; partner: string; category: string;
  qty: number; total: number; paymentStatus: string; pickupStatus: string;
  reviewed: boolean; deliveryMethod?: string; deliveryDetails?: any;
}

interface Complaint {
  id: string; date: string; partner: string; category: string;
  status: string; lastUpdated: string; desc: string; image: string;
  timeline: { status: string; subtitle: string; date: string; done: boolean }[];
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function getComplaintStatusStyles(status: string) {
  switch (status) {
    case "Menunggu Verifikasi": return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Sedang Ditinjau": return "bg-blue-100 text-blue-800 border-blue-200";
    case "Menunggu Klarifikasi Mitra": return "bg-purple-100 text-purple-800 border-purple-200";
    case "Aduan Selesai": return "bg-green-100 text-green-800 border-green-200";
    case "Aduan Ditolak": return "bg-red-100 text-red-800 border-red-200";
    default: return "bg-slate-100 text-slate-800 border-slate-200";
  }
}

function getComplaintIcon(status: string) {
  switch (status) {
    case "Menunggu Verifikasi": return <Clock className="w-4 h-4" />;
    case "Sedang Ditinjau": return <Search className="w-4 h-4" />;
    case "Menunggu Klarifikasi Mitra": return <MessageCircle className="w-4 h-4" />;
    case "Aduan Selesai": return <CheckCircle className="w-4 h-4" />;
    case "Aduan Ditolak": return <XCircle className="w-4 h-4" />;
    default: return <Info className="w-4 h-4" />;
  }
}

const fmtRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

// ─── SURPLUS PRODUCT TYPE ─────────────────────────────────────────────────────

interface SurplusProduct {
  id: number;
  category: string;
  qty: number;
  price: number;
  maxTime: string;
  desc: string;
  batasKonsumsiJam: number; // hours selected by partner
  expiresAt: number;        // epoch ms when product expires
  status: "aman" | "hampir" | "kadaluarsa" | "kompos";
}

// ─── FOOD SAFETY TIMER UTILITIES ─────────────────────────────────────────────

function getSafetyStatus(expiresAt: number, now: number) {
  const rem = expiresAt - now;
  if (rem <= 0) return { key: "kadaluarsa", label: "Tidak Layak Dijual", color: "red", rem: 0 };
  if (rem < 60 * 60 * 1000) return { key: "hampir", label: "Hampir Berakhir", color: "yellow", rem };
  return { key: "aman", label: "Aman", color: "green", rem };
}

function formatRemainingTime(ms: number): string {
  if (ms <= 0) return "Waktu Habis";
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  if (h > 0) return `${h} Jam ${m} Menit Tersisa`;
  if (m > 0) return `${m} Menit ${s} Detik Tersisa`;
  return `${s} Detik Tersisa`;
}

// ─── LIVE CLOCK HOOK ──────────────────────────────────────────────────────────

function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

// ─── TIMER BADGE COMPONENT ────────────────────────────────────────────────────

function TimerBadge({ expiresAt, now }: { expiresAt: number; now: number }) {
  const { key, label, rem } = getSafetyStatus(expiresAt, now);
  const colorMap = {
    aman: "bg-green-50 text-green-700 border-green-200",
    hampir: "bg-yellow-50 text-yellow-700 border-yellow-200",
    kadaluarsa: "bg-red-50 text-red-700 border-red-200",
    kompos: "bg-orange-50 text-orange-700 border-orange-200",
  };
  const dotMap = { aman: "bg-green-500", hampir: "bg-yellow-400 animate-pulse", kadaluarsa: "bg-red-500", kompos: "bg-orange-500" };
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold ${colorMap[key as keyof typeof colorMap]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotMap[key as keyof typeof dotMap]}`} />
      ⏳ {key === "kadaluarsa" ? label : formatRemainingTime(rem)}
    </div>
  );
}

// ─── LOGO COMPONENT ──────────────────────────────────────────────────────────

function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <ImageWithFallback
      src={logoImg}
      alt="Palang Pintu"
      className={`${className} object-contain`}
    />
  );
}

function LogoIcon({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <ImageWithFallback
      src={logoIconImg}
      alt="Palang Pintu"
      className={`${className} object-contain`}
    />
  );
}

// ─── MODAL ───────────────────────────────────────────────────────────────────

interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  actions: React.ReactNode;
  onClose: () => void;
}
function Modal({ open, title, children, actions, onClose }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition"><X className="w-5 h-5" /></button>
        </div>
        <div className="my-4 text-sm text-slate-600">{children}</div>
        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100">{actions}</div>
      </div>
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar({ view, userRole, onNavigate, onLogout }: {
  view: View; userRole: string | null;
  onNavigate: (v: View) => void; onLogout: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Nav items differ completely by role
  const publicNavItems: { label: string; view: View; Icon: any }[] = [
    { label: "Beranda", view: "home", Icon: Activity },
    { label: "Cari Produk", view: "search", Icon: Search },
    { label: "Mitra Terdekat", view: "mitra", Icon: Map },
    { label: "Pupuk & Kompos", view: "kompos", Icon: Sprout },
  ];

  const customerNavItems: { label: string; view: View; Icon: any }[] = [
    { label: "Beranda", view: "home", Icon: Activity },
    { label: "Cari Produk", view: "search", Icon: Search },
    { label: "Mitra Terdekat", view: "mitra", Icon: Map },
    { label: "Pupuk & Kompos", view: "kompos", Icon: Sprout },
    { label: "Riwayat Pembelian", view: "history", Icon: History },
    { label: "Status Aduan", view: "complaint-status", Icon: ClipboardList },
  ];

  const partnerNavItems: { label: string; view: View; Icon: any }[] = [
    { label: "Ringkasan", view: "dashboard", Icon: Activity },
    { label: "Tambah Surplus", view: "dashboard", Icon: UploadCloud },
    { label: "Pesanan Masuk", view: "dashboard", Icon: Inbox },
    { label: "Penjemputan Limbah", view: "dashboard", Icon: Truck },
  ];

  const navItems = userRole === "partner" ? partnerNavItems : userRole === "customer" ? customerNavItems : publicNavItems;

  function nav(v: View) { setMobileOpen(false); onNavigate(v); }

  return (
    <>
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => nav(userRole === "partner" ? "dashboard" : "home")}>
              <LogoIcon className="h-10 w-auto flex-shrink-0" />
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[15px] font-black tracking-[0.18em] text-[#2E7D32] uppercase" style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.1 }}>PALANG</span>
                <span className="text-[15px] font-black tracking-[0.18em] text-[#2E7D32] uppercase" style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.1 }}>PINTU</span>
              </div>
              {userRole === "partner" && (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-[#2E7D32] rounded-full hidden sm:inline">MITRA</span>
              )}
              {userRole === "customer" && (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full hidden sm:inline">PELANGGAN</span>
              )}
            </div>

            {/* Desktop nav — hidden for Mitra (they use sidebar) */}
            {userRole !== "partner" && (
              <nav className="hidden md:flex items-center gap-5">
                {navItems.map(n => (
                  <button key={n.label} onClick={() => nav(n.view)}
                    className={`text-sm font-semibold transition hover:text-[#2E7D32] flex items-center gap-1 ${view === n.view ? "text-[#2E7D32]" : "text-slate-600"}`}>
                    {n.label}
                  </button>
                ))}
              </nav>
            )}

            {/* Desktop right actions */}
            <div className="hidden md:flex items-center gap-3">
              {userRole === "partner" ? (
                <div className="flex items-center gap-3">
                  <button onClick={() => nav("dashboard")} className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 shadow-sm">
                    <LayoutDashboard className="w-4 h-4" /> Panel Mitra
                  </button>
                  <button onClick={() => nav("profile")} className="text-slate-600 hover:text-[#2E7D32] transition text-sm font-medium flex items-center gap-1.5 border border-slate-200 px-3 py-2 rounded-xl">
                    <User className="w-4 h-4" /> Profil Mitra
                  </button>
                  <button onClick={onLogout} className="border border-red-200 text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-1">
                    <LogOut className="w-4 h-4" /> Keluar
                  </button>
                </div>
              ) : userRole === "customer" ? (
                <div className="flex items-center gap-3">
                  <button onClick={() => nav("aduan")} className="text-slate-600 hover:text-[#2E7D32] transition text-sm font-medium flex items-center gap-1"><AlertTriangle className="w-4 h-4" /> Portal Aduan</button>
                  <button onClick={() => nav("profile")} className="text-slate-600 hover:text-[#2E7D32] transition text-sm font-medium flex items-center gap-1.5 border border-slate-200 px-3 py-2 rounded-xl">
                    <User className="w-4 h-4" /> Profil Saya
                  </button>
                  <button onClick={onLogout} className="border border-red-200 text-red-500 hover:bg-red-50 px-3 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-1">
                    <LogOut className="w-4 h-4" /> Keluar
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button onClick={() => nav("login")} className="border border-[#2E7D32] text-[#2E7D32] hover:bg-green-50 px-4 py-2 rounded-xl text-sm font-semibold transition">Masuk</button>
                  <button onClick={() => nav("register-customer")} className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm">Daftar</button>
                  <span className="text-slate-300">|</span>
                  <button onClick={() => nav("register")} className="text-sm font-semibold text-slate-500 hover:text-[#2E7D32] transition">Mitra Koperasi?</button>
                </div>
              )}
            </div>

            <button onClick={() => setMobileOpen(v => !v)} className="flex items-center md:hidden text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden bg-white/95 backdrop-blur-md flex flex-col ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LogoIcon className="h-8 w-auto flex-shrink-0" />
            <div className="flex flex-col leading-none">
              <span className="text-[13px] font-black tracking-[0.18em] text-[#2E7D32] uppercase" style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.1 }}>PALANG</span>
              <span className="text-[13px] font-black tracking-[0.18em] text-[#2E7D32] uppercase" style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.1 }}>PINTU</span>
            </div>
            {userRole === "partner" && <span className="text-[9px] font-bold px-1.5 py-0.5 bg-green-100 text-[#2E7D32] rounded-full">MITRA</span>}
            {userRole === "customer" && <span className="text-[9px] font-bold px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full">PELANGGAN</span>}
          </div>
          <button onClick={() => setMobileOpen(false)} className="text-slate-500 p-2 hover:bg-slate-100 rounded-lg"><X className="w-6 h-6" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {navItems.map(n => (
            <button key={n.label} onClick={() => nav(n.view)}
              className={`w-full text-left px-4 py-3 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 flex items-center gap-3 ${view === n.view ? "text-[#2E7D32] bg-green-50/70" : ""}`}>
              <n.Icon className="w-4 h-4" /> {n.label}
            </button>
          ))}
          <div className="border-t border-slate-100 my-4 pt-4 space-y-2">
            {userRole === "partner" ? (
              <>
                <button onClick={() => nav("profile")} className="w-full flex items-center gap-3 px-4 py-3 text-slate-800 font-semibold hover:bg-slate-50 rounded-xl transition"><User className="w-4 h-4" /> Profil Mitra</button>
                <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-bold hover:bg-red-50 rounded-xl transition"><LogOut className="w-4 h-4" /> Keluar</button>
              </>
            ) : userRole === "customer" ? (
              <>
                <button onClick={() => nav("aduan")} className="w-full flex items-center gap-3 px-4 py-3 text-slate-800 font-semibold hover:bg-slate-50 rounded-xl transition"><AlertTriangle className="w-4 h-4" /> Portal Aduan</button>
                <button onClick={() => nav("profile")} className="w-full flex items-center gap-3 px-4 py-3 text-slate-800 font-semibold hover:bg-slate-50 rounded-xl transition"><User className="w-4 h-4" /> Profil Saya</button>
                <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-bold hover:bg-red-50 rounded-xl transition"><LogOut className="w-4 h-4" /> Keluar</button>
              </>
            ) : (
              <>
                <button onClick={() => nav("login")} className="w-full text-center bg-white border border-[#2E7D32] text-[#2E7D32] px-4 py-3 rounded-xl font-bold hover:bg-green-50 transition">Masuk</button>
                <button onClick={() => nav("register-customer")} className="w-full text-center bg-[#2E7D32] text-white px-4 py-3 rounded-xl font-bold hover:bg-[#1B5E20] transition shadow-sm mt-2">Daftar Pelanggan</button>
                <button onClick={() => nav("register")} className="w-full text-center border border-slate-200 text-slate-600 px-4 py-3 rounded-xl font-semibold hover:bg-slate-50 transition mt-2">Pendaftaran Mitra</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer({ onNavigate }: { onNavigate: (v: View) => void }) {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center text-white">
              <Logo className="h-16 w-auto bg-white rounded-xl p-2" />
            </div>
            <p className="text-sm">Koperasi Multi-Pihak Pelopor Pengurangan Food Waste di wilayah Jabodetabek.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate("search")} className="hover:text-white transition">Surplus Pangan</button></li>
              <li><button onClick={() => onNavigate("kompos")} className="hover:text-white transition">Pupuk & Kompos</button></li>
              <li><button onClick={() => onNavigate("mitra")} className="hover:text-white transition">Mitra Terdekat</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Anggota Koperasi</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate("register")} className="hover:text-white transition">Pendaftaran Kemitraan</button></li>
              <li><button onClick={() => onNavigate("aduan")} className="hover:text-white transition">Portal Aduan Kualitas</button></li>
              <li><button onClick={() => onNavigate("dashboard")} className="hover:text-white transition">Dashboard Anggota</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Hubungi Kami</h4>
            <p className="text-sm">Gedung Koperasi Palang Pintu<br />Jl. Salemba Raya No. 12, Jakarta Pusat</p>
            <p className="text-sm mt-2 text-[#81C784]">dickynovalsaputra@gmail.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs">
          <p>&copy; 2026 Koperasi Palang Pintu Jabodetabek. Seluruh hak cipta dilindungi undang-undang.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── VIEW: HOME ───────────────────────────────────────────────────────────────

// ─── ANIMATED COUNTER HOOK ───────────────────────────────────────────────────

function useCountUp(target: number, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, shouldStart]);
  return count;
}

// ─── INTERSECTION OBSERVER HOOK ───────────────────────────────────────────────

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── STAT COUNTER CARD ────────────────────────────────────────────────────────

function StatCard({ icon, value, suffix, label, color, inView }: {
  icon: React.ReactNode; value: number; suffix: string; label: string; color: string; inView: boolean;
}) {
  const count = useCountUp(value, 2200, inView);
  return (
    <div className={`relative overflow-hidden rounded-3xl p-6 flex flex-col gap-4 border ${color}`}>
      <div className="flex items-start justify-between">
        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <BarChart3 className="w-5 h-5 opacity-30" />
      </div>
      <div>
        <div className="text-3xl sm:text-4xl font-black tracking-tight">
          {count.toLocaleString("id-ID")}{suffix}
        </div>
        <p className="text-sm font-semibold mt-1 opacity-80 leading-snug">{label}</p>
      </div>
    </div>
  );
}

// ─── FLOW STEP ────────────────────────────────────────────────────────────────

function FlowStep({ icon, label, last = false }: { icon: React.ReactNode; label: string; last?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center text-[#2E7D32]">
        {icon}
      </div>
      <span className="text-xs font-bold text-slate-700 text-center leading-tight max-w-[90px]">{label}</span>
      {!last && <ChevronDown className="w-5 h-5 text-[#2E7D32] mt-1 opacity-60" />}
    </div>
  );
}

// ─── VIEW: HOME ───────────────────────────────────────────────────────────────

function HomeView({ onNavigate }: { onNavigate: (v: View) => void }) {
  const problemRef = useInView(0.15);
  const impactRef = useInView(0.15);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── SECTION 1: HERO ─────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#f0fdf4] via-white to-[#dcfce7] overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#2E7D32]/5 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#81C784]/10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left copy */}
          <div className="space-y-7 text-center lg:text-left">
            <Logo className="h-20 sm:h-24 w-auto object-contain mx-auto lg:mx-0 mix-blend-multiply" />

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-green-100 text-[#2E7D32] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> Platform Ekonomi Sirkular Pangan
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Selamatkan Makanan,<br />
                <span className="text-[#2E7D32]">Sehatkan Bumi.</span>
              </h1>
            </div>

            <p className="text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Koperasi multi-pihak pertama yang menghubungkan pelaku bisnis kuliner dan masyarakat untuk menyelamatkan surplus pangan di Jabodetabek melalui ekosistem ekonomi sirkular yang terdigitalisasi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-1">
              <button onClick={() => onNavigate("search")}
                className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-4 rounded-2xl font-bold transition-all duration-200 shadow-xl shadow-green-300/30 flex items-center justify-center gap-2 text-base">
                <Search className="w-5 h-5" /> Mulai Cari Makanan
              </button>
              <button onClick={() => onNavigate("register")}
                className="border-2 border-[#2E7D32] text-[#2E7D32] hover:bg-green-50 px-8 py-4 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center gap-2 text-base">
                <Store className="w-5 h-5" /> Bergabung Sebagai Mitra
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
              {[["✅", "Terverifikasi Koperasi"], ["🏆", "Inovasi Sosial 2026"], ["🌿", "SDGs Aligned"]].map(([ico, lbl]) => (
                <span key={lbl} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl border border-slate-100 shadow-sm text-xs font-semibold text-slate-600">
                  <span>{ico}</span> {lbl}
                </span>
              ))}
            </div>
          </div>

          {/* Right floating cards */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Central card */}
              <div className="bg-[#2E7D32] text-white rounded-3xl p-6 shadow-2xl shadow-green-300/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><Recycle className="w-5 h-5" /></div>
                  <div>
                    <p className="font-bold text-sm">Circular Economy</p>
                    <p className="text-xs text-green-200">Palang Pintu Ecosystem</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[["🍽️", "Surplus Food", "Diselamatkan"], ["♻️", "Organic Waste", "Dijadikan Kompos"], ["🌿", "Kompos", "Dijual ke Petani"], ["💰", "SHU", "Dibagikan ke Mitra"]].map(([ico, title, sub]) => (
                    <div key={title} className="bg-white/10 rounded-xl p-3">
                      <span className="text-xl">{ico}</span>
                      <p className="font-bold text-xs mt-1">{title}</p>
                      <p className="text-green-200 text-[10px]">{sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating mini cards */}
              <div className="absolute -top-5 -left-8 bg-white rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-2 animate-bounce" style={{ animationDuration: "3s" }}>
                <span className="text-2xl">🍱</span>
                <div>
                  <p className="text-xs font-black text-slate-900">1.450+</p>
                  <p className="text-[9px] text-slate-500">Porsi Diselamatkan</p>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-6 bg-white rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-2 animate-bounce" style={{ animationDuration: "4s" }}>
                <span className="text-2xl">🌱</span>
                <div>
                  <p className="text-xs font-black text-slate-900">3,1 Ton</p>
                  <p className="text-[9px] text-slate-500">Limbah Diolah</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="flex justify-center pb-8 animate-bounce">
          <ChevronDown className="w-6 h-6 text-[#2E7D32]/40" />
        </div>
      </section>

      {/* ── SECTION 2: WHY PALANG PINTU MATTERS ─────────────────────────────── */}
      <section className="bg-slate-900 text-white py-24" ref={problemRef.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest">
              <AlertTriangle className="w-3.5 h-3.5" /> Mengapa Ini Darurat
            </span>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">
              Mengapa PALANG PINTU Penting
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
              Limbah makanan bukan hanya menjadi masalah lingkungan, tetapi juga krisis sosial dan ekonomi yang berdampak luas. Untuk menjawab tantangan tersebut, PALANG PINTU hadir sebagai solusi berbasis ekonomi sirkular yang bertujuan menjembatani kesenjangan antara surplus pangan dan kebutuhan masyarakat, sekaligus mengurangi dampak negatif limbah makanan.
            </p>
          </div>

          {/* Problem stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {[
              { icon: "🍽️", big: "23–48 Juta Ton", label: "Makanan terbuang sia-sia di Indonesia setiap tahun", sub: "Food Waste Nasional Tahunan", accent: "border-red-500/30 bg-red-500/10" },
              { icon: "🌍", big: "≈8%", label: "Emisi gas rumah kaca global berasal dari food waste", sub: "Dampak Lingkungan Global", accent: "border-orange-500/30 bg-orange-500/10" },
              { icon: "💰", big: "Rp 551 T", label: "Nilai ekonomi pangan yang hilang sia-sia per tahun", sub: "Kerugian Ekonomi Nasional", accent: "border-yellow-500/30 bg-yellow-500/10" },
              { icon: "🌱", big: "70%", label: "Sampah organik perkotaan belum dikelola dengan baik", sub: "Pencemaran Limbah Organik", accent: "border-green-500/30 bg-green-500/10" },
              { icon: "👥", big: "26,5 Juta", label: "Masyarakat masih kesulitan akses pangan layak dan terjangkau", sub: "Tantangan Aksesibilitas Pangan", accent: "border-blue-500/30 bg-blue-500/10" },
              { icon: "🏙️", big: "Jabodetabek", label: "Episentrum food waste terbesar yang butuh solusi nyata segera", sub: "Prioritas Area Intervensi", accent: "border-purple-500/30 bg-purple-500/10" },
            ].map((s) => (
              <div key={s.sub} className={`rounded-2xl border p-6 ${s.accent} backdrop-blur-sm`}>
                <div className="text-4xl mb-3">{s.icon}</div>
                <div className="text-2xl sm:text-3xl font-black text-white mb-2">{s.big}</div>
                <p className="text-slate-300 text-sm leading-relaxed">{s.label}</p>
                <span className="inline-block mt-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">{s.sub}</span>
              </div>
            ))}
          </div>

          {/* Bottom callout */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <p className="text-slate-200 text-lg font-semibold max-w-3xl mx-auto leading-relaxed">
              Sementara jutaan ton makanan layak makan dibuang setiap hari,{" "}
              <span className="text-[#81C784] font-black">jutaan orang masih kekurangan akses pangan.</span>{" "}
              PALANG PINTU hadir sebagai jembatan antara kelimpahan yang terbuang dan kebutuhan yang belum terpenuhi.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: THE SOLUTION ──────────────────────────────────────────── */}
      <section className="bg-white py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-green-100 text-[#2E7D32] text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> Model Sirkular
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">PALANG PINTU</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
              Mengubah limbah makanan menjadi nilai sosial, lingkungan, dan ekonomi melalui dua alur ekonomi sirkular yang terintegrasi.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
            {/* Flow 1: Food Surplus */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-[#2E7D32] rounded-xl flex items-center justify-center"><ShoppingBag className="w-5 h-5 text-white" /></div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">Alur Surplus Pangan</h3>
                  <p className="text-xs text-slate-500">Food Redistribution Flow</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-0">
                <FlowStep icon={<Building2 className="w-7 h-7" />} label="Restoran / Hotel / Supermarket" />
                <div className="flex items-center gap-2 my-1">
                  <div className="h-8 w-0.5 bg-[#2E7D32]/30 mx-auto" />
                </div>
                <div className="bg-[#2E7D32] text-white rounded-2xl px-6 py-3 flex items-center gap-2 shadow-lg">
                  <Logo className="h-7 w-auto" />
                  <span className="font-black text-sm tracking-wider">PALANG PINTU</span>
                </div>
                <div className="h-8 w-0.5 bg-[#2E7D32]/30 mx-auto my-1" />
                <FlowStep icon={<Users className="w-7 h-7" />} label="Masyarakat / Konsumen" last />
              </div>

              <div className="mt-8 bg-white/70 rounded-2xl p-4 border border-green-100">
                <p className="text-sm text-slate-600 leading-relaxed">
                  <span className="font-bold text-[#2E7D32]">Surplus makanan</span> yang masih layak konsumsi didistribusikan ulang dan dapat diakses masyarakat dengan harga terjangkau melalui platform digital PALANG PINTU.
                </p>
              </div>
            </div>

            {/* Flow 2: Organic Waste */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center"><Recycle className="w-5 h-5 text-white" /></div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">Alur Limbah Organik</h3>
                  <p className="text-xs text-slate-500">Organic Waste Processing Flow</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-0">
                <FlowStep icon={<Building2 className="w-7 h-7" />} label="Restoran / Hotel / Supermarket" />
                <div className="h-6 w-0.5 bg-amber-400/40 mx-auto my-1" />
                <FlowStep icon={<Trash2 className="w-7 h-7" />} label="Limbah Organik Terkumpul" />
                <div className="h-6 w-0.5 bg-amber-400/40 mx-auto my-1" />
                <div className="bg-amber-600 text-white rounded-2xl px-6 py-3 flex items-center gap-2 shadow-lg">
                  <Recycle className="w-5 h-5" />
                  <span className="font-black text-sm">Koperasi Palang Pintu</span>
                </div>
                <div className="h-6 w-0.5 bg-amber-400/40 mx-auto my-1" />
                <FlowStep icon={<Sprout className="w-7 h-7" />} label="Produksi Kompos Organik" />
                <div className="h-6 w-0.5 bg-amber-400/40 mx-auto my-1" />
                <FlowStep icon={<Wheat className="w-7 h-7" />} label="Masyarakat & Petani Urban" last />
              </div>

              <div className="mt-8 bg-white/70 rounded-2xl p-4 border border-amber-100">
                <p className="text-sm text-slate-600 leading-relaxed">
                  <span className="font-bold text-amber-700">Limbah organik</span> yang tidak layak konsumsi diolah menjadi kompos berkualitas tinggi untuk mendukung pertanian dan penghijauan urban.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom platform desc */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-black">Platform Koperasi Multi-Pihak</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                PALANG PINTU adalah platform koperasi multi-pihak yang menghubungkan pelaku bisnis dan masyarakat untuk mengurangi food waste melalui ekosistem ekonomi sirkular yang terintegrasi secara digital.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Surplus pangan yang aman dikonsumsi didistribusikan untuk manfaat sosial, sementara limbah organik dikonversi menjadi produk kompos bernilai ekonomi tinggi.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[["🍽️", "Surplus Food", "Redistribusi sosial"], ["♻️", "Zero Waste", "Prinsip sirkular"], ["🌿", "Bio-Kompos", "Nilai ekonomi baru"], ["🤝", "Multi-Stakeholder", "Koperasi terintegrasi"]].map(([ico, t, s]) => (
                <div key={t} className="bg-white/10 rounded-2xl p-4 text-center">
                  <span className="text-3xl">{ico}</span>
                  <p className="font-bold text-sm mt-2">{t}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: IMPACT ────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#2E7D32] via-[#388E3C] to-[#1B5E20] text-white py-24" ref={impactRef.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-green-200 text-xs font-bold uppercase tracking-widest">
              <BarChart3 className="w-3.5 h-3.5" /> Data & Dampak
            </span>
            <h2 className="text-3xl sm:text-4xl font-black">Impact We Create</h2>
            <p className="text-green-100 max-w-2xl mx-auto text-base leading-relaxed">
              Measurable outcomes generated through the PALANG PINTU ecosystem — real numbers, real change.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            <StatCard
              icon={<UtensilsCrossed className="w-7 h-7 text-white" />}
              value={1450} suffix="+" label="Porsi Makanan Diselamatkan"
              color="border-white/20 bg-white/10" inView={impactRef.inView}
            />
            <StatCard
              icon={<Recycle className="w-7 h-7 text-white" />}
              value={3100} suffix=" Kg" label="Limbah Organik Diproses"
              color="border-white/20 bg-white/10" inView={impactRef.inView}
            />
            <StatCard
              icon={<Cloud className="w-7 h-7 text-white" />}
              value={7} suffix=" Ton CO₂" label="Emisi Karbon Berkurang"
              color="border-white/20 bg-white/10" inView={impactRef.inView}
            />
            <StatCard
              icon={<Handshake className="w-7 h-7 text-white" />}
              value={52} suffix=" Mitra" label="Pelaku Bisnis Bergabung"
              color="border-white/20 bg-white/10" inView={impactRef.inView}
            />
            <StatCard
              icon={<Users className="w-7 h-7 text-white" />}
              value={950} suffix="+" label="Konsumen Terdaftar"
              color="border-white/20 bg-white/10" inView={impactRef.inView}
            />
            <StatCard
              icon={<Coins className="w-7 h-7 text-white" />}
              value={750} suffix=" Kg" label="Kompos Organik Terjual"
              color="border-white/20 bg-white/10" inView={impactRef.inView}
            />
          </div>

          {/* SDGs alignment */}
          <div className="bg-white/10 border border-white/20 rounded-3xl p-6 md:p-8">
            <p className="text-center text-sm font-bold uppercase tracking-widest text-green-200 mb-6">Berkontribusi pada Tujuan Pembangunan Berkelanjutan (SDGs)</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[["SDG 2", "Zero Hunger", "🍽️"], ["SDG 11", "Sustainable Cities", "🏙️"], ["SDG 12", "Responsible Consumption", "♻️"], ["SDG 13", "Climate Action", "🌍"], ["SDG 15", "Life on Land", "🌿"], ["SDG 17", "Partnerships", "🤝"]].map(([code, label, ico]) => (
                <div key={code} className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 flex items-center gap-2">
                  <span>{ico}</span>
                  <div>
                    <p className="text-[10px] font-black text-green-200">{code}</p>
                    <p className="text-xs font-semibold">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: WHO IS INVOLVED ───────────────────────────────────────── */}
      <section className="bg-white py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest">
              <Handshake className="w-3.5 h-3.5" /> Ekosistem Kolaboratif
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Building Impact Together</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
              PALANG PINTU brings together multiple stakeholders within one sustainable ecosystem — each playing a vital role in closing the food waste loop.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {[
              {
                emoji: "🏪", title: "Business Partners", sub: "Restaurants, Hotels & Supermarkets",
                desc: "Contribute surplus food that is still safe for consumption and organic waste for composting.",
                tags: ["Restoran", "Hotel", "Supermarket", "Kafe"],
                color: "border-t-4 border-t-[#2E7D32]",
                iconBg: "bg-green-50 text-[#2E7D32]",
                action: "register",
              },
              {
                emoji: "👨‍👩‍👧‍👦", title: "Communities", sub: "Masyarakat & Konsumen",
                desc: "Purchase surplus food and compost products at affordable prices, reducing food inequality.",
                tags: ["Self-Pickup", "Harga Terjangkau", "Verified"],
                color: "border-t-4 border-t-blue-500",
                iconBg: "bg-blue-50 text-blue-600",
                action: "search",
              },
              {
                emoji: "🌿", title: "Cooperative", sub: "Koperasi Palang Pintu",
                desc: "Manages the platform, redistribution logistics, and organic waste composting operations.",
                tags: ["Manajemen", "Logistik", "Komposting"],
                color: "border-t-4 border-t-amber-500",
                iconBg: "bg-amber-50 text-amber-600",
                action: "home",
              },
              {
                emoji: "🚜", title: "Farmers & Urban Farming", sub: "Petani & Komunitas Urban",
                desc: "Utilize high-quality compost products to support sustainable agriculture and urban greening.",
                tags: ["Kompos Premium", "Urban Farming", "Sustainable"],
                color: "border-t-4 border-t-purple-500",
                iconBg: "bg-purple-50 text-purple-600",
                action: "kompos",
              },
            ].map((card) => (
              <div key={card.title} className={`bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${card.color}`}>
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center text-3xl flex-shrink-0`}>
                      {card.emoji}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-base leading-tight">{card.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{card.sub}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {card.tags.map(t => (
                      <span key={t} className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-slate-100 px-6 py-3">
                  <button onClick={() => onNavigate(card.action as View)}
                    className="text-xs font-bold text-[#2E7D32] hover:text-[#1B5E20] flex items-center gap-1 transition">
                    Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Ecosystem diagram */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12">
            <h3 className="text-center font-black text-slate-900 text-xl mb-8">Ekosistem Terintegrasi PALANG PINTU</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
              {[
                { label: "Mitra Bisnis", icon: "🏪", sub: "Surplus + Limbah" },
                null,
                { label: "PALANG PINTU", icon: <Logo className="h-8 w-auto" />, sub: "Platform Koperasi", center: true },
                null,
                { label: "Masyarakat", icon: "👥", sub: "Pangan Terjangkau" },
              ].map((item, i) => {
                if (!item) return (
                  <div key={i} className="flex items-center justify-center md:mx-4">
                    <div className="hidden md:flex items-center gap-1">
                      <div className="w-12 h-0.5 bg-[#2E7D32]/30" />
                      <ArrowRight className="w-4 h-4 text-[#2E7D32]/50" />
                    </div>
                    <div className="flex md:hidden flex-col items-center gap-1">
                      <div className="w-0.5 h-8 bg-[#2E7D32]/30" />
                      <ChevronDown className="w-4 h-4 text-[#2E7D32]/50" />
                    </div>
                  </div>
                );
                return (
                  <div key={item.label} className={`flex flex-col items-center text-center ${(item as any).center ? "scale-110" : ""}`}>
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-md mb-2 ${(item as any).center ? "bg-[#2E7D32] border-4 border-white shadow-xl shadow-green-200" : "bg-white border border-slate-100"}`}>
                      {typeof item.icon === "string" ? <span className="text-3xl">{item.icon}</span> : item.icon}
                    </div>
                    <p className={`text-sm font-black ${(item as any).center ? "text-[#2E7D32]" : "text-slate-900"}`}>{item.label}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{item.sub}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-2xl px-6 py-3">
                <Recycle className="w-5 h-5 text-[#2E7D32]" />
                <p className="text-sm font-bold text-slate-700">Limbah → Kompos → Petani <span className="text-[#2E7D32]">(Circular Loop)</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ──────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <Logo className="h-16 w-auto mx-auto" />
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-white">Bergabunglah dalam Gerakan Ini</h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
              Bersama-sama kita dapat mengurangi food waste, menciptakan nilai ekonomi baru, dan membangun ketahanan pangan yang berkelanjutan untuk Jabodetabek.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate("search")} className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-4 rounded-2xl font-bold transition shadow-xl shadow-green-900/30 flex items-center justify-center gap-2">
              <Search className="w-5 h-5" /> Cari Surplus Makanan Sekarang
            </button>
            <button onClick={() => onNavigate("register")} className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-2xl font-bold transition flex items-center justify-center gap-2">
              <Store className="w-5 h-5" /> Daftar Mitra Bisnis
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── VIEW: SEARCH ─────────────────────────────────────────────────────────────

function SearchView({ partners, surplusProducts, onNavigate }: { partners: Partner[]; surplusProducts: SurplusProduct[]; onNavigate: (v: View, data?: any) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const [filterDistance, setFilterDistance] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const now = useNow(10000); // check every 10s in search view

  const filtered = partners.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.categories.some(c => c.toLowerCase().includes(query.toLowerCase()));
    const matchCat = category === "Semua" || p.categories.includes(category);
    const matchDist = filterDistance === "all" || p.distanceValue <= parseFloat(filterDistance);
    const matchRating = filterRating === "all" || p.rating >= parseFloat(filterRating);
    let matchStatus = true;
    if (filterStatus === "open") matchStatus = p.isOpen;
    if (filterStatus === "available") matchStatus = p.hasProduct;
    return matchSearch && matchCat && matchDist && matchRating && matchStatus;
  });

  return (
    <div>
      <section className="bg-[#2E7D32] text-white py-12 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-3xl font-black">Cari Surplus Makanan</h1>
          <p className="text-green-100 text-sm max-w-lg mx-auto">Selamatkan porsi berkualitas dari pelaku bisnis lokal yang siap dikonsumsi.</p>
          <div className="relative max-w-xl mx-auto pt-2">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Cari warung, hotel, kue, masakan..."
              className="block w-full pl-11 pr-4 py-4 border-none rounded-2xl text-slate-900 shadow-lg focus:ring-4 focus:ring-[#81C784]/20 outline-none text-sm font-medium" />
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <button onClick={() => setCategory("Semua")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition ${category === "Semua" ? "bg-[#2E7D32] text-white border border-white/30" : "bg-white text-slate-700"}`}>
              Semua Kategori
            </button>
            {CATEGORIES.map(cat => (
              <button key={cat.name} onClick={() => setCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${category === cat.name ? "bg-[#2E7D32] text-white border border-white/30" : "bg-white text-slate-700"}`}>
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-24 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-[#2E7D32]" /> Filter Pencarian
              </span>
              <button onClick={() => { setQuery(""); setCategory("Semua"); setFilterDistance("all"); setFilterRating("all"); setFilterStatus("all"); }}
                className="text-xs text-slate-400 hover:text-[#2E7D32] transition font-semibold">Reset</button>
            </div>
            {[
              { label: "Jarak Maksimal", value: filterDistance, onChange: setFilterDistance, options: [["all", "Semua Jarak"], ["1", "Kurang dari 1 km"], ["3", "Kurang dari 3 km"], ["5", "Kurang dari 5 km"]] },
              { label: "Rating Minimal", value: filterRating, onChange: setFilterRating, options: [["all", "Semua Rating"], ["4.8", "⭐️ 4.8 ke atas"], ["4.5", "⭐️ 4.5 ke atas"]] },
              { label: "Ketersediaan & Status", value: filterStatus, onChange: setFilterStatus, options: [["all", "Semua Toko"], ["open", "Sedang Buka"], ["available", "Hanya dengan Surplus Aktif"]] },
            ].map(f => (
              <div key={f.label} className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">{f.label}</label>
                <select value={f.value} onChange={e => f.onChange(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32] outline-none text-slate-700 font-medium">
                  {f.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-4">
          <p className="text-sm text-slate-500 font-medium">Menampilkan <span className="text-slate-900 font-bold">{filtered.length}</span> mitra usaha aktif</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.length > 0 ? filtered.map(p => (
              <div key={p.id} onClick={() => onNavigate("detail", p)}
                className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-green-200 transition duration-300 p-5 flex flex-col justify-between cursor-pointer">
                <div>
                  <div className="flex justify-between items-start mb-2 gap-3">
                    <h3 className="font-bold text-slate-900 text-base leading-tight hover:text-[#2E7D32] transition">{p.name}</h3>
                    <div className="flex items-center text-xs font-bold bg-amber-50 text-amber-700 px-2 py-1 rounded-lg border border-amber-100 flex-shrink-0">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" /> {p.rating}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {p.address} • <strong className="text-[#2E7D32]">{p.distance}</strong>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.categories.length > 0 ? p.categories.map(c => {
                      const match = CATEGORIES.find(cat => cat.name === c);
                      return <span key={c} className="text-xs px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 rounded-lg font-medium flex items-center gap-1"><span>{match?.icon}</span> {c}</span>;
                    }) : <span className="text-xs text-slate-400 italic">Hanya limbah (belum ada produk surplus)</span>}
                  </div>
                </div>
                <div className="border-t border-slate-50 pt-4 mt-2 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${p.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${p.isOpen ? "bg-green-500" : "bg-red-500"}`}></span>
                      {p.isOpen ? "Buka Sekarang" : "Tutup"}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${p.hasProduct ? "bg-blue-50 text-blue-800 border border-blue-100" : "bg-slate-50 text-slate-400"}`}>
                      {p.hasProduct ? "🟢 Surplus Tersedia" : "🔴 Sedang Kosong"}
                    </span>
                  </div>
                  {(p.totalTransactions ?? 0) >= 100 && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-[#2E7D32] border border-green-200">
                      🟢 Green Label
                    </span>
                  )}
                  {/* Show timer for active surplus products from this partner */}
                  {p.hasProduct && (() => {
                    const activeSurplus = surplusProducts.filter(s => s.status !== "kompos" && getSafetyStatus(s.expiresAt, now).key !== "kadaluarsa");
                    if (activeSurplus.length === 0) return null;
                    const nearest = activeSurplus.reduce((a, b) => a.expiresAt < b.expiresAt ? a : b);
                    return <TimerBadge expiresAt={nearest.expiresAt} now={now} />;
                  })()}
                </div>
              </div>
            )) : (
              <div className="col-span-full bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-500 max-w-lg mx-auto">
                <Search className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p className="text-base font-semibold">Tidak ada produk atau mitra yang cocok.</p>
                <p className="text-xs text-slate-400 mt-1">Silakan kurangi filter pencarian Anda atau coba kata kunci lain.</p>
                <button onClick={() => { setQuery(""); setCategory("Semua"); setFilterDistance("all"); setFilterRating("all"); setFilterStatus("all"); }}
                  className="mt-4 text-[#2E7D32] font-bold hover:underline text-sm flex items-center gap-1.5 mx-auto">
                  <RefreshCw className="w-4 h-4" /> Atur Ulang Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── VIEW: MITRA ──────────────────────────────────────────────────────────────

function MitraView({ partners, onNavigate }: { partners: Partner[]; onNavigate: (v: View, data?: any) => void }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 h-[calc(100vh-64px)] bg-slate-50 overflow-hidden">
      <div className="lg:col-span-4 h-full overflow-y-auto bg-white border-r border-slate-100 flex flex-col">
        <div className="p-6 border-b border-slate-100 space-y-2">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Map className="text-[#2E7D32]" /> Peta Mitra Terdekat
          </h2>
          <p className="text-slate-500 text-xs">Pilih mitra anggota koperasi di sekitar wilayah jangkauan untuk dipesan.</p>
        </div>
        <div className="flex-1 p-4 space-y-4">
          {partners.map(p => (
            <div key={p.id} onClick={() => onNavigate("detail", p)}
              className="p-4 rounded-xl border border-slate-100 hover:border-green-200 bg-white transition duration-200 cursor-pointer flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-950 text-sm hover:text-[#2E7D32] transition">{p.name}</h4>
                    <span className="text-xs text-slate-400">{p.type} • {p.distance}</span>
                  </div>
                  <div className="flex items-center text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">⭐️ {p.rating}</div>
                </div>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> {p.address}</p>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-50 flex-wrap">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${p.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{p.isOpen ? "BUKA" : "TUTUP"}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${p.hasProduct ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-400"}`}>{p.hasProduct ? "Surplus Tersedia" : "Kosong"}</span>
                {(p.totalTransactions ?? 0) >= 100 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-green-50 text-[#2E7D32] border border-green-200">🟢 Green Label</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-8 h-full bg-slate-200 relative overflow-hidden" style={{ backgroundImage: "radial-gradient(#cbd5e1 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}>
        <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-30 pointer-events-none">
          <div className="bg-blue-600 text-white p-3 rounded-full shadow-2xl border-4 border-white animate-bounce"><User className="w-5 h-5" /></div>
          <span className="bg-blue-600 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full shadow-lg mt-1 whitespace-nowrap">Lokasi Anda</span>
        </div>
        {partners.map((p, idx) => {
          const top = 25 + idx * 15;
          const left = 20 + (idx * 15 > 65 ? 12 : idx * 15);
          return (
            <div key={p.id} className="absolute cursor-pointer group transform hover:scale-110 transition z-20" style={{ top: `${top}%`, left: `${left}%` }} onClick={() => onNavigate("detail", p)}>
              <div className="flex flex-col items-center">
                <span className="bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded-lg shadow-md whitespace-nowrap mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">{p.name} ({p.distance})</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-lg ${p.hasProduct ? "bg-[#2E7D32] text-white" : "bg-slate-400 text-slate-100"}`}>
                  <Store className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
        <div className="absolute bottom-6 right-6 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 max-w-xs space-y-3">
          <p className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-1.5 flex items-center gap-1.5"><Info className="w-4 h-4 text-[#2E7D32]" /> Legenda Peta</p>
          <div className="space-y-1.5">
            {[["bg-[#2E7D32]", "Mitra Aktif & Tersedia Makanan"], ["bg-slate-400", "Mitra Kosong / Sedang Tutup"], ["bg-blue-600", "Titik Radius Anda"]].map(([bg, label]) => (
              <div key={label} className="flex items-center text-xs text-slate-600">
                <span className={`w-3.5 h-3.5 rounded-full ${bg} border-2 border-white shadow mr-2 inline-block`}></span> {label}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 italic mt-2">Peta didesain interaktif. Ketuk pin untuk mengarahkan ke menu detail.</p>
        </div>
      </div>
    </section>
  );
}

// ─── VIEW: PARTNER DETAIL ─────────────────────────────────────────────────────

function DetailView({ partner, userRole, onNavigate }: { partner: Partner | null; userRole: string | null; onNavigate: (v: View, data?: any) => void }) {
  if (!partner) return <div className="p-12 text-center text-slate-500">Tidak ada mitra terpilih.</div>;
  const p = partner;

  function triggerBooking(categoryName: string, price: number, icon: string) {
    if (!userRole) {
      toast.warning("Silakan masuk terlebih dahulu untuk memesan surplus makanan.");
      onNavigate("login");
      return;
    }
    onNavigate("purchase", { type: "food", partner: p, category: { name: categoryName, icon }, price, qty: 1, total: price, shippingCost: 0 });
  }

  return (
    <div>
      <section className="relative h-64 sm:h-80 bg-slate-950 flex items-end">
        <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
        <button onClick={() => onNavigate("search")} className="absolute top-6 left-6 bg-white/95 hover:bg-white text-slate-800 p-2.5 rounded-full shadow-lg transition flex items-center justify-center z-10">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 z-10 relative flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold uppercase tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5" /> {p.reputation}
              </span>
              {(p.totalTransactions ?? 0) >= 100 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#2E7D32] text-xs font-bold uppercase tracking-wide border border-green-200">
                  🟢 Green Label
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">{p.name}</h1>
            <p className="text-slate-200 text-xs sm:text-sm flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-300" /> {p.address} ({p.distance})</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center w-full md:w-auto md:min-w-[140px] flex md:flex-col justify-between items-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-xl font-bold text-white"><Star className="w-5 h-5 text-amber-400 fill-amber-400" /> {p.rating}</div>
              <p className="text-[10px] text-slate-300 uppercase tracking-widest mt-0.5 font-bold">Rating Skor</p>
            </div>
            <div className="border-l border-white/10 md:border-l-0 md:border-t md:pt-2 md:mt-2 w-full text-right md:text-center">
              <span className="text-xs text-white font-semibold">{p.reviews} Ulasan</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-yellow-50 border-l-4 border-amber-500 p-4 rounded-r-2xl">
            <div className="flex gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-amber-900 text-sm">Prinsip Mystery Bag Palang Pintu</h4>
                <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">Demi menjaga privasi reputasi mitra kuliner dan menghindari penyalahgunaan, kami menampilkan produk berdasarkan kategori, bukan nama hidangan spesifik. Makanan dijamin aman, bersih, dan dipersiapkan higienis di hari yang sama.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2"><ShoppingBag className="text-[#2E7D32]" /> Pilihan Surplus Tersedia</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map(cat => (
                <div key={cat.name} className={`border border-slate-150 rounded-2xl p-5 flex flex-col items-center text-center justify-between transition duration-200 ${p.hasProduct ? "bg-white hover:border-[#2E7D32] hover:shadow-md" : "bg-slate-50/50 opacity-40 cursor-not-allowed"}`}>
                  <div className="flex flex-col items-center">
                    <span className="text-5xl mb-3">{cat.icon}</span>
                    <h4 className="font-bold text-slate-900 text-sm">Surplus {cat.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">Paket misteri porsi layak makan</p>
                    <span className="text-[#2E7D32] font-extrabold text-sm mt-2">Rp 15.000 / porsi</span>
                  </div>
                  <div className="mt-4 w-full">
                    {p.hasProduct ? (
                      <button onClick={() => triggerBooking(cat.name, 15000, cat.icon)}
                        className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow-sm">
                        <ShoppingBag className="w-3.5 h-3.5" /> Pesan & Ambil
                      </button>
                    ) : (
                      <button disabled className="w-full bg-slate-200 text-slate-400 py-2 px-3 rounded-xl text-xs font-medium cursor-not-allowed">Habis Terjual</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl font-extrabold text-slate-900">Ulasan Pelanggan Terverifikasi</h2>
            <div className="space-y-4">
              {[{ name: "Ahmad Rizki", time: "Kemarin", rating: 5, text: "Rasanya sangat enak, kemasan bersih sekali. Sangat worth it dengan harga miring!" }, { name: "Dian Safitri", time: "3 hari lalu", rating: 4, text: "Staff hotel ramah membantu klaim voucher. Terbantu menghemat pengeluaran mingguan." }].map(r => (
                <div key={r.name} className="p-5 rounded-2xl bg-white border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-950">{r.name}</span>
                    <span className="text-xs text-slate-400">{r.time}</span>
                  </div>
                  <div className="flex gap-0.5 text-amber-500">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className={`w-4 h-4 ${i <= r.rating ? "fill-amber-500 text-amber-500" : "text-slate-200"}`} />)}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-24 space-y-6">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-1.5 text-sm uppercase tracking-wider text-slate-500">
              <CheckSquare className="text-[#2E7D32] w-4 h-4" /> Standar Koperasi
            </h3>
            <div className="space-y-4 text-xs">
              {[{ Icon: Heart, color: "text-red-500", title: "Uji Kelayakan Mutu", desc: "Seluruh produk telah melewati inspeksi standar keamanan organoleptik." }, { Icon: Clock, color: "text-blue-500", title: "Jadwal Pengambilan Aman", desc: "Wajib diambil mandiri di hari pemesanan sebelum jam operasional berakhir." }, { Icon: ShieldCheck, color: "text-[#2E7D32]", title: "Proteksi Pengembalian", desc: "Jika kualitas terbukti basi atau rusak, Anda dilindungi asuransi pengembalian saldo 100% via portal aduan." }].map(({ Icon, color, title, desc }) => (
                <div key={title} className="flex gap-3">
                  <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
                  <div><h5 className="font-bold text-slate-900">{title}</h5><p className="text-slate-500 mt-0.5">{desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── VIEW: KOMPOS ─────────────────────────────────────────────────────────────

function KomposView({ userRole, onNavigate }: { userRole: string | null; onNavigate: (v: View, data?: any) => void }) {
  function triggerCompostPurchase(item: typeof MOCK_COMPOST[0]) {
    if (!userRole) {
      toast.warning("Silakan masuk terlebih dahulu untuk melakukan transaksi.");
      onNavigate("login");
      return;
    }
    onNavigate("purchase-compost", { type: "compost", item: { id: item.id, name: item.name, rawPrice: item.rawPrice }, price: item.rawPrice, qty: 1, total: item.rawPrice, deliveryMethod: "pickup", shippingCost: 0, deliveryDetails: null });
  }

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-4">
        <Logo className="h-20 w-auto object-contain mx-auto mb-6 mix-blend-multiply" />
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
          <Recycle className="w-3.5 h-3.5" /> Produk Sirkular Hijau
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Pupuk Kompos & Urban Farming</h1>
        <p className="text-slate-500 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">Diproduksi secara mandiri di pabrik komposting Koperasi Palang Pintu dengan memanfaatkan 100% limbah organik yang diselamatkan dari hotel, restoran, dan toko anggota koperasi.</p>
      </section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
        {MOCK_COMPOST.map(c => (
          <div key={c.id} className="w-full bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-green-200 transition duration-300 overflow-hidden flex flex-col justify-between">
            <div className="border-b border-slate-100 flex items-center justify-center h-56 relative overflow-hidden">
              <span className="absolute top-4 right-4 bg-[#2E7D32] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10">{c.badge}</span>
              <img src={c.id === 1 ? biasaImg : cairImg} alt={c.name} className="w-full h-full object-contain" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-lg leading-snug">{c.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Harga Koperasi</span>
                  <p className="font-black text-[#2E7D32] text-base">{c.price}</p>
                </div>
                <button onClick={() => triggerCompostPurchase(c)} className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-md shadow-green-100">
                  <ShoppingCart className="w-3.5 h-3.5" /> Beli Sekarang
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

// ─── VIEW: ADUAN ──────────────────────────────────────────────────────────────

function AduanView({ userRole, onNavigate, onAddComplaint }: { userRole: string | null; onNavigate: (v: View) => void; onAddComplaint: (c: Complaint) => void }) {
  const [invoice, setInvoice] = useState("");
  const [category, setCategory] = useState("Kualitas Makanan (Basi/Kurang Layak)");
  const [text, setText] = useState("");

  if (!userRole) return <div className="p-12 text-center text-slate-500">Silakan masuk untuk mengajukan aduan perlindungan konsumen.</div>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newId = `ADU-00${Math.floor(Math.random() * 900) + 100}`;
    const newComplaint: Complaint = {
      id: newId, date: "Hari Ini", partner: "Mitra Sistem (Otomatis)", category,
      status: "Menunggu Verifikasi", lastUpdated: "Baru Saja", desc: text,
      image: "https://placehold.co/400x300/f1f5f9/64748b?text=Bukti+Foto+Baru",
      timeline: [
        { status: "Menunggu Verifikasi", subtitle: "Sistem Koperasi", date: "Hari Ini - Sekarang", done: true },
        { status: "Sedang Ditinjau", subtitle: "Tim Investigasi PALANG PINTU", date: "", done: false },
        { status: "Menunggu Klarifikasi Mitra", subtitle: "Mitra", date: "", done: false },
        { status: "Selesai / Ditolak", subtitle: "Tindakan Akhir", date: "", done: false },
      ],
    };
    onAddComplaint(newComplaint);
    toast.success(`Aduan untuk invoice ${invoice} berhasil disubmit.`);
    onNavigate("complaint-status");
  }

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center"><AlertTriangle className="w-6 h-6" /></div>
          <div>
            <h1 className="text-xl font-black text-slate-900">Portal Perlindungan Konsumen</h1>
            <p className="text-slate-500 text-xs mt-0.5">Setiap aduan diproses dewan koperasi untuk jaminan kualitas pangan.</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">Jika Anda mendapati kualitas makanan tidak sesuai, basi, rusak, atau toko tutup saat jadwal pickup, segera laporkan di formulir ini. Reputasi kepatuhan mitra akan diaudit dan asuransi pesanan Anda dikembalikan.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider">Nomor Invoice Pesanan</label>
            <input required value={invoice} onChange={e => setInvoice(e.target.value)} type="text" placeholder="Contoh: ORD-2026-001" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500/15 focus:border-red-500 outline-none text-slate-700 font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider">Kategori Masalah</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500/15 focus:border-red-500 outline-none text-slate-700 font-medium">
              <option>Kualitas Makanan (Basi/Kurang Layak)</option>
              <option>Toko Tutup Saat Jam Operasional Pengambilan</option>
              <option>Porsi Jauh dari Standard Deskripsi</option>
              <option>Layanan Toko Kurang Menghormati Aturan</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider">Uraian Kejadian Lengkap</label>
            <textarea required value={text} onChange={e => setText(e.target.value)} rows={4} placeholder="Ceritakan secara detail kronologis masalah..." className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500/15 focus:border-red-500 outline-none text-slate-700 font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider">Unggah Foto Bukti Pendukung</label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:bg-slate-50 transition cursor-pointer flex flex-col items-center justify-center text-slate-500">
              <Camera className="w-8 h-8 text-slate-300 mb-2" />
              <span className="text-xs font-bold text-slate-700">Lampirkan Foto Kejadian</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Klik untuk memotret atau pilih berkas JPG/PNG</span>
            </div>
          </div>
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition text-sm">Kirim Laporan Perlindungan</button>
        </form>
      </div>
    </section>
  );
}

// ─── VIEW: REGISTER MITRA ─────────────────────────────────────────────────────

function RegisterView({ onNavigate, onRegisterPartner }: { onNavigate: (v: View) => void; onRegisterPartner: (name: string, type: string, address: string) => void }) {
  const [step, setStep] = useState(1);
  const [tncAccepted, setTncAccepted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", businessName: "", businessType: "Restoran / Cafe", businessAddress: "", openTime: "08:00", closeTime: "22:00", nib: "", nibFileName: "" });
  const [nibFile, setNibFile] = useState<File | null>(null);

  function f(k: string) { return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(prev => ({ ...prev, [k]: e.target.value })); }

  function handleFinish() {
    if (!form.businessName || !form.businessAddress) { toast.warning("Formulir detail bisnis wajib diisi lengkap."); return; }
    if (!form.nib) { toast.warning("Nomor Induk Berusaha (NIB) wajib diisi untuk menjadi Mitra PALANG PINTU."); return; }
    if (!nibFile) { toast.warning("Nomor Induk Berusaha (NIB) wajib diisi untuk menjadi Mitra PALANG PINTU."); return; }
    onRegisterPartner(form.businessName, form.businessType, form.businessAddress);
  }

  const progressWidth = ["0%", "0%", "33.33%", "66.66%", "100%"][step];

  return (
    <section className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Step indicator */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="flex items-center justify-between relative px-2">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-200 -z-10"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#2E7D32] -z-10 transition-all duration-300" style={{ width: progressWidth }}></div>
          {[1, 2, 3, 4].map(n => (
            <div key={n} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 ${step >= n ? "bg-[#2E7D32] border-[#2E7D32] text-white" : "bg-white border-slate-200 text-slate-400"}`}>{n}</div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-xl p-8">
        {step === 1 && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-green-50 text-[#2E7D32] flex items-center justify-center mx-auto"><Users className="w-8 h-8" /></div>
            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-slate-900">Keanggotaan Koperasi Wajib</h2>
              <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto">Berdasarkan regulasi, pendaftar surplus pangan diwajibkan tergabung sebagai anggota Koperasi Palang Pintu Jabodetabek untuk legalitas sirkular.</p>
            </div>
            <div className="space-y-3 pt-4">
              <button onClick={() => setStep(3)} className="w-full border-2 border-[#2E7D32] text-[#2E7D32] font-bold py-3 px-4 rounded-xl hover:bg-green-50 transition text-sm">Ya, Usaha Kami Sudah Terdaftar Anggota</button>
              <button onClick={() => setStep(2)} className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-3 px-4 rounded-xl transition text-sm shadow-md shadow-green-100">Belum Terdaftar (Ajukan Anggota Baru)</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold text-slate-950">Form Keanggotaan Baru</h2>
              <p className="text-slate-400 text-[11px]">Silakan isi berkas administratif pengurus koperasi</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Nama Lengkap</label><input value={form.name} onChange={f("name")} type="text" placeholder="Sinta Wijaya" className="w-full border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-[#2E7D32]" /></div>
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">No. HP</label><input value={form.phone} onChange={f("phone")} type="tel" placeholder="08xxxxxxxxx" className="w-full border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-[#2E7D32]" /></div>
            </div>
            <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Email</label><input value={form.email} onChange={f("email")} type="email" placeholder="sinta@email.com" className="w-full border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-[#2E7D32]" /></div>
            <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Alamat Lengkap</label><textarea value={form.address} onChange={f("address")} rows={2} className="w-full border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-[#2E7D32]" /></div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2">
              <h4 className="font-bold text-xs text-slate-800 border-b border-slate-200 pb-1.5">Iuran Awal Pendirian</h4>
              <div className="flex justify-between text-[11px] text-slate-600"><span>Simpanan Pokok</span><span>Rp 100.000</span></div>
              <div className="flex justify-between text-[11px] text-slate-600"><span>Simpanan Wajib (Bulan Pertama)</span><span>Rp 25.000</span></div>
              <div className="flex justify-between text-xs font-bold text-[#2E7D32] border-t border-slate-200 pt-1.5"><span>Total Bayar</span><span>Rp 125.000</span></div>
            </div>
            <div className="border-2 border-dashed border-green-200 rounded-xl p-4 bg-green-50/50 flex flex-col items-center text-center">
              <QrCode className="w-12 h-12 text-[#2E7D32]" />
              <span className="text-xs font-bold text-[#2E7D32] mt-1">Metode Pembayaran QRIS Koperasi</span>
              <span className="text-[9px] text-slate-400">Pindai kode untuk menyelesaikan transfer pendaftaran iuran.</span>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button onClick={() => setStep(1)} className="w-1/3 border border-slate-200 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition">Kembali</button>
              <button onClick={() => { if (!form.name || !form.phone || !form.email) { toast.warning("Lengkapi formulir pendaftaran terlebih dahulu."); return; } toast.success("Verifikasi iuran QRIS berhasil!"); setStep(3); }} className="w-2/3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-2.5 rounded-xl text-xs font-bold transition shadow-md shadow-green-100">Bayar & Lanjutkan</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-[#2E7D32] flex items-center justify-center mx-auto"><FileText className="w-6 h-6" /></div>
              <h2 className="text-xl font-bold text-slate-950">SYARAT DAN KETENTUAN MITRA</h2>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 max-h-[50vh] overflow-y-auto space-y-6 text-left">
              <div className="space-y-3">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2"><Scale className="w-4 h-4 text-[#2E7D32]" /> Aturan Kemitraan</h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  {/* ✅ Green check items first */}
                  <li className="flex gap-2.5 items-start"><CheckCircle className="w-4 h-4 text-[#2E7D32] flex-shrink-0 mt-0.5" /><span>Mitra wajib merupakan anggota aktif Koperasi PALANG PINTU.</span></li>
                  <li className="flex gap-2.5 items-start"><CheckCircle className="w-4 h-4 text-[#2E7D32] flex-shrink-0 mt-0.5" /><span>Mitra wajib memiliki Nomor Induk Berusaha (NIB) yang masih berlaku.</span></li>
                  <li className="flex gap-2.5 items-start"><CheckCircle className="w-4 h-4 text-[#2E7D32] flex-shrink-0 mt-0.5" /><span>Mitra wajib menjual produk yang layak konsumsi.</span></li>
                  <li className="flex gap-2.5 items-start"><CheckCircle className="w-4 h-4 text-[#2E7D32] flex-shrink-0 mt-0.5" /><span>Mitra wajib memisahkan produk layak konsumsi dan tidak layak konsumsi.</span></li>
                  <li className="flex gap-2.5 items-start"><CheckCircle className="w-4 h-4 text-[#2E7D32] flex-shrink-0 mt-0.5" /><span>Produk tidak layak konsumsi wajib dilaporkan melalui fitur Penjemputan Limbah.</span></li>
                  <li className="flex gap-2.5 items-start"><CheckCircle className="w-4 h-4 text-[#2E7D32] flex-shrink-0 mt-0.5" /><span>Koperasi berhak melakukan verifikasi data usaha dan dokumen NIB.</span></li>
                  <li className="flex gap-2.5 items-start"><CheckCircle className="w-4 h-4 text-[#2E7D32] flex-shrink-0 mt-0.5" /><span>Mitra yang berhasil menyelesaikan minimal 100 transaksi dengan mempertahankan kualitas layanan yang baik dan mematuhi standar keamanan pangan akan secara otomatis mendapatkan sertifikasi <strong>Green Label</strong> dari Koperasi PALANG PINTU sebagai pengakuan atas komitmen dan status mereka sebagai Mitra Terpercaya.</span></li>
                  {/* ⚠️ Warning items second */}
                  <li className="flex gap-2.5 items-start"><AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" /><span>Mitra yang melanggar standar keamanan pangan akan menerima poin pelanggaran dan sanksi.</span></li>
                  {/* ✕ Red cross items last */}
                  <li className="flex gap-2.5 items-start"><XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" /><span>Dilarang keras menjual makanan basi, berjamur, berbau tak wajar.</span></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2"><Coins className="w-4 h-4 text-[#2E7D32]" /> Kontribusi Koperasi (10%)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Untuk setiap transaksi surplus pangan yang berhasil, koperasi menerima kontribusi sebesar <strong>10% dari harga jual</strong> yang digunakan untuk mendukung operasional dan program koperasi.</p>
                <div className="bg-green-50 border border-green-100 rounded-xl p-3 space-y-1.5">
                  <p className="text-[10px] font-bold text-[#2E7D32] uppercase tracking-wider">Contoh Perhitungan</p>
                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex justify-between"><span>Harga Produk</span><span className="font-bold">Rp 18.000</span></div>
                    <div className="flex justify-between"><span>Pembayaran Konsumen</span><span className="font-bold">Rp 18.000</span></div>
                    <div className="flex justify-between text-[#2E7D32]"><span>Kontribusi Koperasi (10%)</span><span className="font-bold">Rp 1.800</span></div>
                    <div className="flex justify-between border-t border-green-200 pt-1 font-black text-slate-900"><span>Mitra Menerima</span><span>Rp 16.200</span></div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed">Kontribusi ini digunakan untuk: pengembangan platform PALANG PINTU, biaya operasional koperasi, program pengurangan food waste, serta layanan dan pengembangan anggota koperasi.</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" /> Sistem Poin & Aduan</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Apabila konsumen melaporkan aduan melalui fitur <strong>Portal Aduan</strong> dan terbukti benar, koperasi berhak memotong skor reputasi mitra, yang dapat berujung pada penangguhan akun dari platform.</p>
              </div>
            </div>
            <label className="flex items-start gap-3 cursor-pointer group bg-green-50/50 p-3 rounded-xl border border-green-100 hover:bg-green-50 transition">
              <input type="checkbox" checked={tncAccepted} onChange={e => setTncAccepted(e.target.checked)} className="mt-0.5 w-4 h-4 text-[#2E7D32] focus:ring-[#2E7D32] rounded border-slate-300" />
              <span className="text-xs font-semibold text-slate-700">Saya telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan.</span>
            </label>
            <div className="flex items-center gap-3">
              <button onClick={() => setStep(2)} className="w-1/3 border border-slate-200 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition">Kembali</button>
              <button disabled={!tncAccepted} onClick={() => setStep(4)} className={`w-2/3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-3 rounded-xl text-xs font-bold transition shadow-md ${!tncAccepted ? "opacity-50 cursor-not-allowed" : ""}`}>Lanjut Pendaftaran Mitra</button>
            </div>
          </div>
        )}

        {step === 4 && (() => {
          const canFinish = !!form.nib && !!nibFile;
          return (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-100 rounded-xl p-3 flex items-center text-green-800 text-xs"><CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" /> Syarat & Ketentuan Disetujui</div>
              <div className="text-center space-y-1"><h2 className="text-lg font-bold text-slate-950">Profil Bisnis / Usaha Mitra</h2></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Nama Bisnis</label><input value={form.businessName} onChange={f("businessName")} type="text" placeholder="RM Padang Minang" className="w-full border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-[#2E7D32]" /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Kategori Usaha</label><select value={form.businessType} onChange={f("businessType")} className="w-full border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-[#2E7D32]"><option>Restoran / Cafe</option><option>Hotel</option><option>Supermarket / Toko Roti</option></select></div>
              </div>
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Alamat Lengkap Toko</label><textarea value={form.businessAddress} onChange={f("businessAddress")} rows={2} className="w-full border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-[#2E7D32]" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Jam Buka</label><input value={form.openTime} onChange={f("openTime")} type="time" className="w-full border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-[#2E7D32]" /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Jam Tutup</label><input value={form.closeTime} onChange={f("closeTime")} type="time" className="w-full border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-[#2E7D32]" /></div>
              </div>

              {/* NIB Section */}
              <div className="border-t border-slate-100 pt-5 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0"><Landmark className="w-4 h-4" /></div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Nomor Induk Berusaha (NIB)</p>
                    <p className="text-[10px] text-slate-400">Wajib dimiliki untuk bergabung sebagai Mitra PALANG PINTU</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                    Nomor Induk Berusaha (NIB) <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={form.nib}
                    onChange={f("nib")}
                    type="text"
                    placeholder="Masukkan Nomor Induk Berusaha"
                    className={`w-full border rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-[#2E7D32] ${form.nib ? "border-green-300 bg-green-50/30" : "border-slate-200"}`}
                  />
                  {!form.nib && (
                    <p className="text-[10px] text-amber-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Nomor Induk Berusaha (NIB) wajib diisi untuk menjadi Mitra PALANG PINTU.</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                    Upload Dokumen NIB <span className="text-red-500">*</span>
                  </label>
                  <label className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer flex flex-col items-center gap-2 transition ${nibFile ? "border-green-400 bg-green-50" : "border-slate-200 hover:bg-slate-50"}`}>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        if (file.size > 5 * 1024 * 1024) {
                          toast.error("Ukuran file melebihi 5 MB. Mohon pilih file yang lebih kecil.");
                          return;
                        }
                        setNibFile(file);
                        setForm(prev => ({ ...prev, nibFileName: file.name }));
                      }}
                    />
                    {nibFile ? (
                      <>
                        <CheckCircle className="w-8 h-8 text-[#2E7D32]" />
                        <span className="text-xs font-bold text-[#2E7D32]">{nibFile.name}</span>
                        <span className="text-[10px] text-slate-400">Klik untuk mengganti file</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-8 h-8 text-slate-300" />
                        <span className="text-xs font-bold text-slate-700">Klik untuk mengunggah dokumen NIB</span>
                        <span className="text-[10px] text-slate-400">PDF, JPG, PNG · Maks. 5 MB</span>
                      </>
                    )}
                  </label>
                  {!nibFile && (
                    <p className="text-[10px] text-amber-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Dokumen NIB wajib diunggah untuk menyelesaikan pendaftaran.</p>
                  )}
                </div>
              </div>

              {!canFinish && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800">Nomor Induk Berusaha (NIB) wajib diisi untuk menjadi Mitra PALANG PINTU.</p>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => setStep(3)} className="w-1/3 border border-slate-200 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition">Kembali</button>
                <button
                  onClick={handleFinish}
                  disabled={!canFinish}
                  className={`w-2/3 font-bold py-3 px-4 rounded-xl transition text-sm shadow-md ${canFinish ? "bg-[#2E7D32] hover:bg-[#1B5E20] text-white" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
                >
                  Selesaikan Registrasi
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}

// ─── VIEW: DASHBOARD ──────────────────────────────────────────────────────────

function DashboardView({ orders, addedSurplus, compostRequests, storeOpen, onToggleStore, onAddSurplus, onAddCompostRequest, onApprovePickup, onConvertToCompost, partnerInvoices }: any) {
  const [tab, setTab] = useState("ringkasan");
  const [surplusForm, setSurplusForm] = useState({ category: "Sayuran", qty: "", price: "", maxTime: "", desc: "", batasKonsumsiJam: "2" });
  const [compostForm, setCompostForm] = useState({ weight: "", date: "", note: "" });
  const now = useNow(1000);

  const navItems = [
    { key: "ringkasan", label: "Ringkasan", Icon: Activity },
    { key: "tambah", label: "Tambah Surplus", Icon: UploadCloud },
    { key: "produk", label: "Daftar Produk", Icon: Package },
    { key: "pesanan", label: "Pesanan Masuk", Icon: Inbox },
    { key: "penjemputan", label: "Penjemputan Limbah", Icon: Truck },
    { key: "simpanan", label: "Info Simpanan & SHU", Icon: CreditCard },
    { key: "reputasi", label: "Reputasi Mitra", Icon: Shield, dot: true },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white border border-slate-100 shadow-sm rounded-2xl overflow-hidden sticky top-24">
            <div className="p-5 border-b border-slate-100 space-y-3 flex flex-col items-center text-center">
              <Logo className="h-16 w-auto object-contain mix-blend-multiply" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-tight">Hotel Bumi Hijau</h3>
                <span className="inline-flex px-2 py-0.5 rounded bg-green-100 text-[#2E7D32] text-[9px] font-bold tracking-wider uppercase mt-1">Anggota Koperasi</span>
              </div>
            </div>
            <nav className="flex flex-col py-2 text-xs font-semibold">
              {navItems.map(({ key, label, Icon, dot }) => (
                <button key={key} onClick={() => setTab(key)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left transition ${tab === key ? "bg-green-50 border-r-4 border-[#2E7D32] text-[#2E7D32] font-bold" : "text-slate-600 hover:bg-slate-50"}`}>
                  <span className="flex items-center gap-2.5"><Icon className="w-4 h-4" /> {label}</span>
                  {dot && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main panel */}
        <div className="flex-1 bg-white border border-slate-100 shadow-sm rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 capitalize leading-tight">Panel Administrasi</h2>
              <p className="text-slate-400 text-xs mt-0.5">Sistem koperasi digital terintegrasi otomatis.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-bold">Status Toko:</span>
              <button onClick={onToggleStore} className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${storeOpen ? "bg-[#2E7D32]" : "bg-slate-300"}`}>
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${storeOpen ? "translate-x-5" : "translate-x-0"}`}></span>
              </button>
              <span className={`text-xs font-black ${storeOpen ? "text-[#2E7D32]" : "text-slate-400"}`}>{storeOpen ? "BUKA" : "TUTUP"}</span>
            </div>
          </div>

          <div className="min-h-[400px]">
            {tab === "ringkasan" && (() => {
              const amanCount = addedSurplus.filter((s: SurplusProduct) => getSafetyStatus(s.expiresAt, now).key === "aman").length;
              const hampirCount = addedSurplus.filter((s: SurplusProduct) => getSafetyStatus(s.expiresAt, now).key === "hampir").length;
              const kadaluarsaCount = addedSurplus.filter((s: SurplusProduct) => getSafetyStatus(s.expiresAt, now).key === "kadaluarsa").length;
              const komposCount = addedSurplus.filter((s: SurplusProduct) => s.status === "kompos").length;
              return (
                <div>
                  {/* NIB Verification status banner */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0"><Clock className="w-4 h-4 text-yellow-600" /></div>
                    <div>
                      <p className="text-sm font-bold text-yellow-800">🟡 Menunggu Verifikasi NIB</p>
                      <p className="text-xs text-yellow-700 mt-0.5">Dokumen NIB Anda sedang diverifikasi oleh tim Koperasi PALANG PINTU. Setelah terverifikasi, Anda dapat mengunggah produk surplus pangan. Proses verifikasi biasanya memakan waktu 1–3 hari kerja.</p>
                    </div>
                  </div>
                  {/* Primary stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {[
                      { bg: "bg-blue-50 border-blue-100", label: "Porsi Surplus Hari Ini", val: `${addedSurplus.length} Produk`, lc: "text-blue-500", vc: "text-blue-900" },
                      { bg: "bg-green-50 border-green-100", label: "Produk Aman", val: `${amanCount} Produk`, lc: "text-[#2E7D32]", vc: "text-[#2E7D32]" },
                      { bg: "bg-amber-50 border-amber-100", label: "Limbah Organik Diolah", val: "165 Kg", lc: "text-amber-600", vc: "text-amber-900" },
                      { bg: "bg-purple-50 border-purple-100", label: "Estimasi SHU Tahun Buku", val: "Rp 1.450k", lc: "text-purple-600", vc: "text-purple-900" },
                    ].map(({ bg, label, val, lc, vc }) => (
                      <div key={label} className={`${bg} border p-5 rounded-2xl`}>
                        <span className={`text-xs font-bold uppercase tracking-wider ${lc}`}>{label}</span>
                        <p className={`text-2xl font-black ${vc} mt-1`}>{val}</p>
                      </div>
                    ))}
                  </div>

                  {/* Food Safety stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0"><Clock className="w-5 h-5 text-yellow-600" /></div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-yellow-600">Mendekati Batas Waktu</p>
                        <p className="text-2xl font-black text-yellow-800">{hampirCount} Produk</p>
                      </div>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-red-600">Tidak Layak Dijual</p>
                        <p className="text-2xl font-black text-red-800">{kadaluarsaCount} Produk</p>
                      </div>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0"><Recycle className="w-5 h-5 text-orange-600" /></div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-orange-600">Dialihkan ke Kompos</p>
                        <p className="text-2xl font-black text-orange-800">{komposCount} Produk</p>
                      </div>
                    </div>
                  </div>

                  {/* Green Label + Transaction Progress */}
                  {(() => {
                    const MOCK_TOTAL_TX = 75;
                    const GREEN_LABEL_THRESHOLD = 100;
                    const hasGreenLabel = MOCK_TOTAL_TX >= GREEN_LABEL_THRESHOLD;
                    const pct = Math.min(Math.round((MOCK_TOTAL_TX / GREEN_LABEL_THRESHOLD) * 100), 100);
                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {/* Total Transactions */}
                        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Transaksi Berhasil</p>
                          <p className="text-3xl font-black text-slate-900 mt-1">{MOCK_TOTAL_TX.toLocaleString("id-ID")}</p>
                          <p className="text-xs text-slate-400 mt-0.5">transaksi selesai</p>
                        </div>
                        {/* Green Label Status */}
                        <div className={`rounded-2xl p-5 border shadow-sm ${hasGreenLabel ? "bg-green-50 border-green-200" : "bg-slate-50 border-slate-100"}`}>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Status Green Label</p>
                          {hasGreenLabel ? (
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">🟢</span>
                              <span className="font-black text-[#2E7D32] text-sm">Green Label Aktif</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">⚪</span>
                              <span className="font-bold text-slate-500 text-sm">Belum Memenuhi Syarat</span>
                            </div>
                          )}
                          {/* Progress bar */}
                          <div className="mt-3">
                            <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                              <span>{MOCK_TOTAL_TX} / {GREEN_LABEL_THRESHOLD} Transaksi</span>
                              <span className="font-bold">{pct}%</span>
                            </div>
                            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full transition-all ${hasGreenLabel ? "bg-[#2E7D32]" : "bg-amber-400"}`} style={{ width: `${pct}%` }} />
                            </div>
                            {!hasGreenLabel && (
                              <p className="text-[10px] text-slate-400 mt-1">{GREEN_LABEL_THRESHOLD - MOCK_TOTAL_TX} transaksi lagi untuk mendapatkan Green Label</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Activity log */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider text-slate-500">Log Aktivitas Sirkular</h3>
                    <div className="space-y-3.5 text-xs">
                      {[["[SURPLUS] Berhasil menjual 5 porsi Lauk Pauk", "text-[#2E7D32]", "10 menit lalu"], ["[TIMER] Produk Roti & Pastry hampir mencapai batas waktu konsumsi", "text-yellow-600", "30 menit lalu"], ["[ADUAN] Koperasi menerima keluhan terkait kualitas untuk ADU-001", "text-red-500", "1 jam lalu"], ["[DASHBOARD] Memperbarui status ketersediaan toko menjadi AKTIF", "text-blue-500", "Pagi ini"]].map(([msg, color, time]) => (
                        <div key={msg} className="flex justify-between items-center border-b border-slate-200/50 pb-2.5">
                          <span className="text-slate-600"><span className={`${color} font-bold`}>{msg.split("]")[0]}]</span>{msg.split("]").slice(1).join("]")}</span>
                          <span className="text-slate-400">{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            {tab === "tambah" && (
              <div className="max-w-xl space-y-6">
                <div className="bg-yellow-50 border-l-4 border-amber-500 p-4 rounded-r-2xl text-xs text-amber-800 leading-relaxed">
                  <strong>⚠️ Penting:</strong> Pastikan produk yang diunggah aman konsumsi secara visual dan organoleptik. Koperasi berhak melakukan sidak audit berkala. Produk yang melewati batas waktu konsumsi akan otomatis dinonaktifkan dan dialihkan ke jalur kompos.
                </div>
                <form onSubmit={e => {
                  e.preventDefault();
                  onAddSurplus({
                    ...surplusForm,
                    qty: parseInt(surplusForm.qty),
                    price: parseFloat(surplusForm.price),
                    batasKonsumsiJam: parseInt(surplusForm.batasKonsumsiJam),
                  });
                  setSurplusForm({ category: "Sayuran", qty: "", price: "", maxTime: "", desc: "", batasKonsumsiJam: "2" });
                }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Kategori Produk</label>
                      <select value={surplusForm.category} onChange={e => setSurplusForm(p => ({ ...p, category: e.target.value }))} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-1 focus:ring-[#2E7D32] outline-none">
                        <option>Sayuran</option><option>Lauk Pauk</option><option>Roti & Pastry</option><option>Minuman</option><option>Makanan Siap Saji</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Jumlah Porsi</label>
                      <input required type="number" min="1" value={surplusForm.qty} onChange={e => setSurplusForm(p => ({ ...p, qty: e.target.value }))} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-1 focus:ring-[#2E7D32] outline-none" placeholder="cth: 20" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Harga per Porsi (Rp)</label>
                      <input required type="number" value={surplusForm.price} onChange={e => setSurplusForm(p => ({ ...p, price: e.target.value }))} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-1 focus:ring-[#2E7D32] outline-none" placeholder="cth: 15000" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Jam Tutup Toko</label>
                      <input required type="time" value={surplusForm.maxTime} onChange={e => setSurplusForm(p => ({ ...p, maxTime: e.target.value }))} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-1 focus:ring-[#2E7D32] outline-none" />
                    </div>
                  </div>

                  {/* FOOD SAFETY TIMER FIELD */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#2E7D32]" />
                      Batas Konsumsi Aman <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2 max-w-xs">
                      {[["1", "1 Jam"], ["2", "2 Jam"]].map(([val, label]) => (
                        <button key={val} type="button" onClick={() => setSurplusForm(p => ({ ...p, batasKonsumsiJam: val }))}
                          className={`py-2 px-1 rounded-xl text-xs font-bold border-2 transition-all ${surplusForm.batasKonsumsiJam === val ? "border-[#2E7D32] bg-[#2E7D32] text-white shadow-md" : "border-slate-200 bg-white text-slate-600 hover:border-green-300"}`}>
                          {label}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-start gap-2 p-3 rounded-xl text-xs bg-amber-50 text-amber-800 border border-amber-200 leading-relaxed">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                      <span>Untuk alasan keamanan makanan, waktu konsumsi aman maksimal adalah 2 jam setelah produk dipublikasikan. Setelah waktu yang ditentukan habis, produk akan otomatis dihapus dari marketplace dan ditandai tidak layak dikonsumsi. Selanjutnya, produk akan dialihkan ke proses pengelolaan limbah organik dan diolah menjadi kompos oleh Koperasi PALANG PINTU.</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Catatan Kondisi Produk</label>
                    <textarea value={surplusForm.desc} onChange={e => setSurplusForm(p => ({ ...p, desc: e.target.value }))} rows={3} placeholder="Deskripsikan kondisi produk, cara penyimpanan, dll..." className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-1 focus:ring-[#2E7D32] outline-none" />
                  </div>
                  <button type="submit" className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2">
                    <UploadCloud className="w-4 h-4" /> Unggah ke Katalog
                  </button>
                </form>
              </div>
            )}

            {tab === "produk" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Daftar Produk Surplus Aktif</h3>
                  <button onClick={() => setTab("tambah")} className="text-xs font-bold text-[#2E7D32] flex items-center gap-1 hover:underline">
                    <Plus className="w-3.5 h-3.5" /> Tambah Produk Baru
                  </button>
                </div>
                {addedSurplus.length === 0 ? (
                  <div className="py-16 text-center text-slate-400">
                    <Package className="w-12 h-12 mx-auto mb-3 text-slate-200" />
                    <p className="font-semibold">Belum ada produk surplus yang diunggah.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {addedSurplus.map((s: SurplusProduct) => {
                      const safety = getSafetyStatus(s.expiresAt, now);
                      const isExpired = safety.key === "kadaluarsa";
                      const isCompos = s.status === "kompos";
                      return (
                        <div key={s.id} className={`rounded-2xl border p-5 transition-all ${isCompos ? "bg-orange-50 border-orange-200" : isExpired ? "bg-red-50 border-red-200" : safety.key === "hampir" ? "bg-yellow-50 border-yellow-200" : "bg-white border-slate-100"}`}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-slate-900 text-sm">Surplus {s.category}</span>
                                <TimerBadge expiresAt={s.expiresAt} now={now} />
                                {isCompos && <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">♻️ Dialihkan ke Kompos</span>}
                              </div>
                              <div className="flex gap-4 text-xs text-slate-500">
                                <span>{s.qty} porsi</span>
                                <span className="font-bold text-[#2E7D32]">{fmtRp(s.price)}</span>
                                <span>Tutup: {s.maxTime} WIB</span>
                                <span>Batas: {s.batasKonsumsiJam} jam</span>
                              </div>
                              {s.desc && <p className="text-xs text-slate-400 italic">{s.desc}</p>}
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {isExpired && !isCompos && (
                                <button onClick={() => onConvertToCompost(s.id)}
                                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
                                  ♻️ Ajukan Pengolahan Kompos
                                </button>
                              )}
                              {!isExpired && !isCompos && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-800">✅ AKTIF</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {tab === "pesanan" && (
              <div className="overflow-x-auto border border-slate-150 rounded-2xl">
                <table className="min-w-full divide-y divide-slate-150">
                  <thead className="bg-slate-50"><tr>{["ID Pesanan", "Pembeli", "Kategori", "Kuantitas", "Total Harga", "Tindakan"].map(h => <th key={h} className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">{h}</th>)}</tr></thead>
                  <tbody className="divide-y divide-slate-150 bg-white">
                    {orders.filter((o: Order) => o.pickupStatus === "Menunggu Pengambilan").length === 0 ? (
                      <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">Belum ada pesanan masuk saat ini.</td></tr>
                    ) : orders.filter((o: Order) => o.pickupStatus === "Menunggu Pengambilan").map((o: Order) => (
                      <tr key={o.id} className="text-xs hover:bg-slate-50">
                        <td className="px-6 py-4 font-bold text-slate-900">{o.id}</td>
                        <td className="px-6 py-4 text-slate-500">Konsumen Terdaftar</td>
                        <td className="px-6 py-4 font-bold">Surplus {o.category}</td>
                        <td className="px-6 py-4 text-slate-500">{o.qty} porsi</td>
                        <td className="px-6 py-4 font-bold text-slate-950">{fmtRp(o.total)}</td>
                        <td className="px-6 py-4"><button onClick={() => onApprovePickup(o.id)} className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider transition">KONFIRMASI SELESAI</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "penjemputan" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-slate-400">Form Permohonan Jemput</h4>
                  <form onSubmit={e => { e.preventDefault(); onAddCompostRequest({ ...compostForm, weight: parseInt(compostForm.weight) }); setCompostForm({ weight: "", date: "", note: "" }); }} className="space-y-4">
                    <div className="space-y-1.5"><label className="block text-xs font-bold uppercase text-slate-500 tracking-wider">Berat Limbah Organik (Kg)</label><input required type="number" min="1" value={compostForm.weight} onChange={e => setCompostForm(p => ({ ...p, weight: e.target.value }))} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-1 focus:ring-[#2E7D32] outline-none" /></div>
                    <div className="space-y-1.5"><label className="block text-xs font-bold uppercase text-slate-500 tracking-wider">Tanggal Pickup</label><input required type="date" value={compostForm.date} onChange={e => setCompostForm(p => ({ ...p, date: e.target.value }))} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-1 focus:ring-[#2E7D32] outline-none" /></div>
                    <div className="space-y-1.5"><label className="block text-xs font-bold uppercase text-slate-500 tracking-wider">Instruksi Tambahan</label><textarea value={compostForm.note} onChange={e => setCompostForm(p => ({ ...p, note: e.target.value }))} rows={2} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-1 focus:ring-[#2E7D32] outline-none" /></div>
                    <button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-3 px-4 rounded-xl text-sm transition">Ajukan Penjemputan</button>
                  </form>
                </div>
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-slate-400">Riwayat Pengolahan Limbah</h4>
                  <div className="overflow-x-auto border border-slate-150 rounded-2xl">
                    <table className="min-w-full divide-y divide-slate-150">
                      <thead className="bg-slate-50"><tr>{["ID Request", "Berat", "Tanggal", "Status"].map(h => <th key={h} className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">{h}</th>)}</tr></thead>
                      <tbody className="divide-y divide-slate-150 bg-white">
                        {compostRequests.map((r: any) => (
                          <tr key={r.id} className="text-xs hover:bg-slate-50">
                            <td className="px-6 py-4 font-bold text-slate-950">{r.id}</td>
                            <td className="px-6 py-4 font-medium text-slate-600">{r.weight} Kg</td>
                            <td className="px-6 py-4 text-slate-500">{r.date}</td>
                            <td className="px-6 py-4"><span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${r.status === "Dijadwalkan" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>{r.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {tab === "simpanan" && (
              <div className="space-y-8 max-w-3xl">
                <div className="bg-[#2E7D32] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-48">
                  <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none"></div>
                  <div className="flex justify-between items-start">
                    <div><span className="text-xs uppercase tracking-widest text-green-200">Nomor Anggota Koperasi</span><p className="text-xl font-bold tracking-wider mt-1">KOP-2023-0845</p></div>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">Terverifikasi RAT</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
                    <div><span className="text-[10px] text-green-200 uppercase tracking-wider block">Simpanan Pokok</span><span className="font-bold text-sm">{fmtRp(partnerInvoices.pokok)}</span></div>
                    <div><span className="text-[10px] text-green-200 uppercase tracking-wider block">Simpanan Wajib</span><span className="font-bold text-sm">{fmtRp(partnerInvoices.wajib)}</span></div>
                    <div><span className="text-[10px] text-green-200 uppercase tracking-wider block">Sisa Hasil Usaha</span><span className="font-black text-sm">{fmtRp(partnerInvoices.pokok + partnerInvoices.wajib)}</span></div>
                  </div>
                </div>
              </div>
            )}

            {tab === "reputasi" && (() => {
              const MOCK_TOTAL_TX = 75;
              const GREEN_LABEL_THRESHOLD = 100;
              const hasGreenLabel = MOCK_TOTAL_TX >= GREEN_LABEL_THRESHOLD;
              const pct = Math.min(Math.round((MOCK_TOTAL_TX / GREEN_LABEL_THRESHOLD) * 100), 100);
              return (
                <div className="max-w-2xl space-y-6 py-4">
                  {/* Compliance score */}
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-8 border-yellow-400 bg-yellow-50 shadow-inner">
                      <span className="text-3xl font-black text-amber-600">85</span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-900">Skor Kepatuhan: Dalam Pengawasan 🟡</h3>
                      <p className="text-slate-500 text-xs">Skor Anda menurun karena adanya laporan aduan dari pelanggan minggu ini.</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-left text-xs text-blue-800 leading-relaxed">
                      <strong>Tindakan Dibutuhkan:</strong> Terdapat aduan (ADU-001) menunggu klarifikasi Anda. Silakan hubungi admin Koperasi via WhatsApp untuk memberikan penjelasan sebelum akun Anda ditangguhkan sementara.
                    </div>
                  </div>

                  {/* Green Label section */}
                  <div className={`rounded-2xl border p-6 ${hasGreenLabel ? "bg-green-50 border-green-200" : "bg-slate-50 border-slate-100"}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{hasGreenLabel ? "🟢" : "⚪"}</span>
                      <div>
                        <p className="font-black text-slate-900 text-base">Green Label</p>
                        <p className={`text-xs font-bold ${hasGreenLabel ? "text-[#2E7D32]" : "text-slate-400"}`}>
                          {hasGreenLabel ? "Aktif — Mitra Berprestasi" : "Belum Memenuhi Syarat"}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Green Label diberikan kepada mitra yang telah berhasil menyelesaikan minimal <strong>100 transaksi</strong> sebagai pengakuan atas komitmen mereka dalam mengurangi food waste dan menjaga kualitas layanan yang tinggi.
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Progress Transaksi</span>
                        <span className="font-bold">{MOCK_TOTAL_TX} / {GREEN_LABEL_THRESHOLD}</span>
                      </div>
                      <div className="h-3 bg-white border border-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${hasGreenLabel ? "bg-[#2E7D32]" : "bg-amber-400"}`} style={{ width: `${pct}%` }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>{pct}% tercapai</span>
                        {!hasGreenLabel && <span>{GREEN_LABEL_THRESHOLD - MOCK_TOTAL_TX} transaksi lagi</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── VIEW: LOGIN ──────────────────────────────────────────────────────────────

function LoginView({ onLogin, onNavigate }: { onLogin: (role: "customer" | "partner") => void; onNavigate: (v: View) => void }) {
  const [role, setRole] = useState<"customer" | "partner">("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onLogin(role);
  }

  const isPartner = role === "partner";

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gradient-to-br from-slate-50 to-green-50">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className={`p-8 text-center transition-colors duration-300 ${isPartner ? "bg-gradient-to-br from-[#2E7D32] to-[#1B5E20]" : "bg-gradient-to-br from-slate-800 to-slate-900"}`}>
            <Logo className="h-16 w-auto object-contain mx-auto mb-3" />
            <h1 className="text-2xl font-black text-white leading-tight">Selamat Datang Kembali</h1>
            <p className="text-white/60 text-xs mt-1">
              {isPartner ? "Masuk ke Panel Mitra Koperasi" : "Masuk sebagai Pelanggan"}
            </p>
          </div>

          <div className="p-8 space-y-6">
            {/* Role selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Masuk Sebagai</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("customer")}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 ${!isPartner ? "border-slate-800 bg-slate-800 text-white shadow-lg" : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${!isPartner ? "bg-white/20" : "bg-slate-100"}`}>
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-black text-sm">Pelanggan</p>
                    <p className={`text-[10px] ${!isPartner ? "text-white/60" : "text-slate-400"}`}>Beli surplus pangan</p>
                  </div>
                  {!isPartner && <span className="absolute" />}
                </button>

                <button
                  type="button"
                  onClick={() => setRole("partner")}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 ${isPartner ? "border-[#2E7D32] bg-[#2E7D32] text-white shadow-lg shadow-green-200" : "border-slate-100 bg-slate-50 text-slate-500 hover:border-green-100"}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isPartner ? "bg-white/20" : "bg-slate-100"}`}>
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-black text-sm">Mitra Bisnis</p>
                    <p className={`text-[10px] ${isPartner ? "text-white/60" : "text-slate-400"}`}>Kelola surplus toko</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  {isPartner ? "Email / ID Mitra" : "Email / ID Pelanggan"}
                </label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder={isPartner ? "mitra@restoran.com" : "pelanggan@email.com"}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] outline-none transition" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Kata Sandi</label>
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] outline-none transition" />
              </div>

              <button type="submit"
                className={`w-full text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all duration-200 text-sm flex items-center justify-center gap-2 ${isPartner ? "bg-[#2E7D32] hover:bg-[#1B5E20] shadow-green-200" : "bg-slate-800 hover:bg-slate-900"}`}>
                <LogIn className="w-4 h-4" />
                {isPartner ? "Masuk sebagai Mitra" : "Masuk sebagai Pelanggan"}
              </button>
            </form>

            {/* Demo hint */}
            <div className={`rounded-xl p-3 text-[11px] leading-relaxed ${isPartner ? "bg-green-50 border border-green-100 text-green-800" : "bg-slate-50 border border-slate-100 text-slate-500"}`}>
              <strong>Demo:</strong> Masukkan email apapun dan klik masuk untuk mencoba akses sebagai <strong>{isPartner ? "Mitra Bisnis" : "Pelanggan"}</strong>.
            </div>

            <div className="text-center border-t border-slate-100 pt-4 text-xs text-slate-500 space-y-2">
              {!isPartner && (
                <p>Belum punya akun? <button onClick={() => onNavigate("register-customer")} className="text-[#2E7D32] font-bold hover:underline">Daftar Pelanggan</button></p>
              )}
              {isPartner && (
                <p>Belum terdaftar? <button onClick={() => onNavigate("register")} className="text-[#2E7D32] font-bold hover:underline">Daftar Mitra Koperasi</button></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── VIEW: REGISTER CUSTOMER ──────────────────────────────────────────────────

function RegisterCustomerView({ onLogin, onNavigate }: { onLogin: (role: "customer") => void; onNavigate: (v: View) => void }) {
  return (
    <section className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <Logo className="h-20 w-auto object-contain mx-auto mb-4" />
          <h1 className="text-2xl font-black text-slate-900">Daftar Akun Pelanggan</h1>
          <p className="text-slate-400 text-xs">Mulai langkah kecil selamatkan bumi & saku Anda</p>
        </div>
        <form onSubmit={e => { e.preventDefault(); onLogin("customer"); toast.success("Pendaftaran pelanggan berhasil!"); }} className="space-y-4">
          <div className="space-y-1.5"><label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Nama Lengkap</label><input required type="text" placeholder="Budi Santoso" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-1 focus:ring-[#2E7D32] outline-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5"><label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Nomor HP</label><input required type="tel" placeholder="08xxxxxxxx" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-1 focus:ring-[#2E7D32] outline-none" /></div>
            <div className="space-y-1.5"><label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Email</label><input required type="email" placeholder="budi@email.com" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-1 focus:ring-[#2E7D32] outline-none" /></div>
          </div>
          <div className="space-y-1.5"><label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Alamat</label><textarea required rows={2} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-1 focus:ring-[#2E7D32] outline-none" /></div>
          <div className="space-y-1.5"><label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Password</label><input required type="password" placeholder="••••••••" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-1 focus:ring-[#2E7D32] outline-none" /></div>
          <button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-3 px-4 rounded-xl shadow-md transition text-sm">Selesaikan Pendaftaran</button>
        </form>
        <div className="text-center border-t border-slate-100 pt-4 text-xs text-slate-500">
          Sudah memiliki akun? <button onClick={() => onNavigate("login")} className="text-[#2E7D32] font-bold hover:underline">Masuk</button>
        </div>
      </div>
    </section>
  );
}

// ─── VIEW: PROFILE ────────────────────────────────────────────────────────────

function ProfileView({ orders, onNavigate }: { orders: Order[]; onNavigate: (v: View) => void }) {
  const done = orders.filter(o => o.pickupStatus === "Selesai");
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white border border-slate-100 rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-[#2E7D32] h-36 relative">
          <div className="absolute -bottom-10 left-8 border-4 border-white rounded-2xl bg-slate-100 w-24 h-24 flex items-center justify-center overflow-hidden shadow-md text-slate-400">
            <User className="w-12 h-12" />
          </div>
        </div>
        <div className="pt-14 pb-8 px-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Budi Santoso</h2>
              <p className="text-xs text-slate-400">Terdaftar sebagai Anggota Sirkular sejak Jan 2026</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 transition rounded-xl text-xs font-bold">Ubah Sandi</button>
              <button className="px-4 py-2 border border-[#2E7D32] text-[#2E7D32] hover:bg-green-50 transition rounded-xl text-xs font-bold">Ubah Profil</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-6">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Informasi Keanggotaan</h3>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2"><span className="w-4 h-4 text-slate-400">@</span> budi.santoso@email.com</div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-400" /> +62 812-3456-7890</div>
                <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-slate-400 mt-0.5" /><span>Jl. Merdeka No. 45, RT 01/RW 02, Jakarta Selatan</span></div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Akumulasi Aksi Hijau</h3>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Porsi Diselamatkan</span>
                  <span className="font-black text-[#2E7D32] text-2xl">{done.length} Porsi</span>
                </div>
                <button onClick={() => onNavigate("history")} className="text-xs text-[#2E7D32] font-bold hover:underline flex items-center gap-1">Lihat Riwayat <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── VIEW: PURCHASE (FOOD) ────────────────────────────────────────────────────

function PurchaseView({ checkout, onNavigate, onUpdateCheckout }: { checkout: any; onNavigate: (v: View) => void; onUpdateCheckout: (d: any) => void }) {
  if (!checkout) return <div className="p-12 text-center text-slate-400">Tidak ada pesanan aktif.</div>;
  const c = checkout;
  function adjust(n: number) {
    const qty = Math.max(1, c.qty + n);
    onUpdateCheckout({ ...c, qty, total: qty * c.price });
  }
  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={() => onNavigate("detail")} className="flex items-center text-xs font-bold text-slate-400 hover:text-[#2E7D32] mb-6 transition gap-1">
        <ChevronLeft className="w-4 h-4" /> KEMBALI KE DETAIL MITRA
      </button>
      <div className="bg-white border border-slate-100 rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-[#2E7D32] text-white p-6"><h2 className="text-lg font-bold flex items-center gap-2"><ShoppingBag className="w-5 h-5" /> Detail Pemesanan</h2></div>
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between border-b border-slate-100 pb-6 gap-4 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Mitra Toko</span>
              <strong className="text-sm font-bold text-slate-900 mt-0.5 block">{c.partner.name}</strong>
              <p className="text-slate-500 mt-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {c.partner.address}</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Jadwal Pickup</span>
              <strong className="text-sm text-slate-900 mt-0.5 block">Hari ini</strong>
              <p className="text-[#2E7D32] font-bold mt-1">Sebelum Toko Tutup (22:00 WIB)</p>
            </div>
          </div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{c.category.icon}</span>
              <div>
                <h4 className="font-bold text-slate-950 text-sm">Surplus {c.category.name}</h4>
                <p className="text-xs text-slate-500">{fmtRp(c.price)} / Porsi</p>
              </div>
            </div>
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
              <button onClick={() => adjust(-1)} className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm transition">-</button>
              <span className="px-4 py-2 font-bold text-slate-900 text-sm border-x border-slate-200">{c.qty}</span>
              <button onClick={() => adjust(1)} className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm transition">+</button>
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm font-bold text-slate-900">Total Harga</span>
            <span className="text-xl font-black text-[#2E7D32]">{fmtRp(c.total)}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <button onClick={() => onNavigate("detail")} className="border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold py-3 rounded-xl transition text-sm">Batal</button>
            <button onClick={() => onNavigate("payment")} className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-3 rounded-xl transition text-sm shadow-md shadow-green-100">Lanjut Pembayaran</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── VIEW: PURCHASE COMPOST ───────────────────────────────────────────────────

function PurchaseCompostView({ checkout, onNavigate, onUpdateCheckout }: { checkout: any; onNavigate: (v: View) => void; onUpdateCheckout: (d: any) => void }) {
  if (!checkout) return <div className="p-12 text-center text-slate-400">Tidak ada pesanan aktif.</div>;
  const c = checkout;

  function setMethod(m: string) { onUpdateCheckout({ ...c, deliveryMethod: m, shippingCost: m === "delivery" ? 25000 : 0, deliveryDetails: null }); }
  function selectBranch(id: string) { onUpdateCheckout({ ...c, deliveryDetails: MOCK_BRANCHES.find(b => b.id === id) }); }
  function adjustQty(n: number) {
    const qty = Math.max(1, c.qty + n);
    onUpdateCheckout({ ...c, qty, total: qty * c.item.rawPrice });
  }

  const [dlv, setDlv] = useState({ name: "", phone: "", address: "", district: "", city: "", zip: "" });

  function handleSubmit() {
    if (c.deliveryMethod === "pickup" && !c.deliveryDetails) { toast.warning("Pilih Cabang Koperasi terlebih dahulu."); return; }
    if (c.deliveryMethod === "delivery") {
      if (!dlv.name || !dlv.phone || !dlv.address || !dlv.district || !dlv.city || !dlv.zip) { toast.warning("Mohon lengkapi formulir alamat pengiriman."); return; }
      onUpdateCheckout({ ...c, deliveryDetails: dlv });
    }
    onNavigate("payment");
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={() => onNavigate("kompos")} className="flex items-center text-xs font-bold text-slate-400 hover:text-[#2E7D32] mb-6 transition gap-1">
        <ChevronLeft className="w-4 h-4" /> KEMBALI KE KATALOG
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-[#2E7D32] text-white p-6"><h2 className="text-lg font-bold flex items-center gap-2"><Truck className="w-5 h-5" /> Pengiriman Kompos</h2></div>
            <div className="p-6">
              <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                {[["pickup", "Ambil Sendiri (Pick Up)"], ["delivery", "Diantar Koperasi"]].map(([m, l]) => (
                  <button key={m} onClick={() => setMethod(m)} className={`flex-1 py-3 text-xs font-bold rounded-lg transition ${c.deliveryMethod === m ? "bg-white shadow-sm text-[#2E7D32]" : "text-slate-500 hover:text-slate-700"}`}>{l}</button>
                ))}
              </div>
              {c.deliveryMethod === "pickup" ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Pilih Cabang PALANG PINTU Terdekat</h3>
                  <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
                    {MOCK_BRANCHES.map(b => (
                      <div key={b.id} onClick={() => selectBranch(b.id)} className={`p-4 rounded-xl border-2 transition cursor-pointer flex justify-between items-center ${c.deliveryDetails?.id === b.id ? "border-[#2E7D32] bg-green-50" : "border-slate-100 hover:border-green-200 bg-white"}`}>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#2E7D32]" /> {b.name}</h4>
                          <p className="text-xs text-slate-500 mt-1">{b.address}</p>
                          <div className="text-[10px] text-slate-400 mt-2 flex gap-3">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {b.time}</span>
                            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {b.phone}</span>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${c.deliveryDetails?.id === b.id ? "border-[#2E7D32] bg-[#2E7D32]" : "border-slate-300"}`}>
                          {c.deliveryDetails?.id === b.id && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Alamat Pengiriman</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[["Nama Penerima", "text", "name", "Masukkan nama..."], ["Nomor HP", "tel", "phone", "08xxxxxxxx"]].map(([label, type, key, ph]) => (
                      <div key={key} className="space-y-1.5"><label className="block text-xs font-bold uppercase text-slate-500 tracking-wider">{label}</label><input required type={type} placeholder={ph} value={(dlv as any)[key]} onChange={e => setDlv(p => ({ ...p, [key]: e.target.value }))} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-1 focus:ring-[#2E7D32] outline-none" /></div>
                    ))}
                  </div>
                  <div className="space-y-1.5"><label className="block text-xs font-bold uppercase text-slate-500 tracking-wider">Alamat Lengkap</label><textarea required value={dlv.address} onChange={e => setDlv(p => ({ ...p, address: e.target.value }))} rows={2} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-1 focus:ring-[#2E7D32] outline-none" /></div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[["Kecamatan", "district", ""], ["Kota/Kabupaten", "city", ""], ["Kode Pos", "zip", ""]].map(([label, key]) => (
                      <div key={key} className="space-y-1.5"><label className="block text-xs font-bold uppercase text-slate-500 tracking-wider">{label}</label><input required type="text" value={(dlv as any)[key]} onChange={e => setDlv(p => ({ ...p, [key]: e.target.value }))} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-1 focus:ring-[#2E7D32] outline-none" /></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl shadow-xl p-6 space-y-6 sticky top-24">
          <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 text-xs uppercase tracking-wider text-slate-400">Ringkasan Pesanan</h3>
          <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#2E7D32] flex-shrink-0"><Sprout className="w-6 h-6" /></div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm leading-tight">{c.item.name}</h4>
              <p className="text-xs text-slate-500 mt-1">{fmtRp(c.item.rawPrice)}</p>
            </div>
          </div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-sm font-bold text-slate-700">Jumlah Produk</span>
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
              <button onClick={() => adjustQty(-1)} className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold transition text-sm">-</button>
              <span className="px-4 py-2 font-bold text-slate-900 text-sm border-x border-slate-200">{c.qty}</span>
              <button onClick={() => adjustQty(1)} className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold transition text-sm">+</button>
            </div>
          </div>
          <div className="space-y-3 text-xs text-slate-600 border-b border-slate-100 pb-4">
            <div className="flex justify-between"><span>Subtotal Produk</span><span className="font-bold text-slate-900">{fmtRp(c.total)}</span></div>
            <div className="flex justify-between"><span>Biaya Pengiriman</span><span className={`font-bold ${c.shippingCost === 0 ? "text-green-600" : "text-slate-900"}`}>{c.shippingCost === 0 ? "Gratis (Rp 0)" : fmtRp(c.shippingCost)}</span></div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="font-bold text-slate-950 text-sm">Total Tagihan</span>
            <span className="text-2xl font-black text-[#2E7D32]">{fmtRp(c.total + c.shippingCost)}</span>
          </div>
          <button onClick={handleSubmit} className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-3 px-4 rounded-xl shadow-md transition text-sm mt-4">Lanjut Pembayaran</button>
        </div>
      </div>
    </section>
  );
}

// ─── VIEW: PAYMENT ────────────────────────────────────────────────────────────

function PaymentView({ checkout, onNavigate, onProcessPayment }: { checkout: any; onNavigate: (v: View) => void; onProcessPayment: () => void }) {
  if (!checkout) return <div className="p-12 text-center text-slate-400">Tidak ada tagihan aktif.</div>;
  const c = checkout;
  const isFood = c.type === "food";
  const itemName = isFood ? `Surplus ${c.category.name}` : c.item.name;
  const total = c.total + (c.shippingCost || 0);

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={() => onNavigate(isFood ? "purchase" : "purchase-compost")} className="flex items-center text-xs font-bold text-slate-400 hover:text-[#2E7D32] mb-6 transition gap-1">
        <ChevronLeft className="w-4 h-4" /> KEMBALI KE DETAIL ORDER
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-1.5"><CreditCard className="text-[#2E7D32] w-5 h-5" /> Pilih Metode Pembayaran</h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between border-2 border-[#2E7D32] rounded-2xl p-4 bg-green-50/20 cursor-pointer transition">
              <div className="flex items-center">
                <input type="radio" defaultChecked name="payMethod" className="text-[#2E7D32] focus:ring-[#2E7D32] w-4 h-4" />
                <span className="ml-3 font-bold text-slate-900 text-sm">QRIS Koperasi Otomatis</span>
              </div>
              <QrCode className="text-[#2E7D32] w-5 h-5" />
            </label>
            <label className="flex items-center justify-between border border-slate-200 hover:bg-slate-50 rounded-2xl p-4 cursor-not-allowed transition opacity-60">
              <div className="flex items-center">
                <input disabled type="radio" name="payMethod" className="text-[#2E7D32] w-4 h-4" />
                <span className="ml-3 font-semibold text-slate-500 text-sm">Transfer Bank Virtual Account</span>
              </div>
              <Landmark className="text-slate-400 w-5 h-5" />
            </label>
          </div>
        </div>
        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2.5 text-xs uppercase tracking-wider text-slate-400">Ringkasan Biaya</h3>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between"><span>{itemName} ({c.qty}x)</span><span>{fmtRp(c.total)}</span></div>
            {c.type === "compost" && <div className="flex justify-between"><span>Biaya Pengiriman</span><span className={c.shippingCost === 0 ? "text-green-600 font-semibold" : ""}>{c.shippingCost === 0 ? "Gratis" : fmtRp(c.shippingCost)}</span></div>}
          </div>
          <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-sm">
            <span className="font-bold text-slate-950">Total Tagihan</span>
            <span className="text-xl font-black text-[#2E7D32]">{fmtRp(total)}</span>
          </div>
          <button onClick={onProcessPayment} className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-3 px-4 rounded-xl shadow-md transition text-sm">Bayar Sekarang (Konfirmasi Instan)</button>
        </div>
      </div>
    </section>
  );
}

// ─── VIEW: ORDER SUCCESS ──────────────────────────────────────────────────────

function OrderSuccessView({ order, onNavigate }: { order: Order | null; onNavigate: (v: View) => void }) {
  if (!order) return <div className="p-12 text-center text-slate-400">Tidak ada pesanan.</div>;
  return (
    <section className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-green-50 text-[#2E7D32] flex items-center justify-center mx-auto shadow-inner border border-green-100">
        <CheckCircle className="w-10 h-10" />
      </div>
      <div className="space-y-1.5"><h1 className="text-2xl font-black text-slate-900">Pembayaran Berhasil!</h1></div>
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-2xl text-left flex gap-3">
        <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 leading-relaxed">Tunjukkan halaman transaksi ini kepada staff kasir toko mitra untuk verifikasi mandiri di kasir.</p>
      </div>
      <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-xl space-y-3">
        <div className="flex justify-between border-b border-slate-100 pb-3 text-xs"><span className="text-slate-400">Kode Pengambilan</span><span className="font-bold text-slate-950 text-sm">{order.id}</span></div>
        <div className="flex justify-between border-b border-slate-100 pb-3 text-xs"><span className="text-slate-400">Mitra Penyedia</span><span className="font-bold text-slate-950">{order.partner}</span></div>
        <div className="flex justify-between border-b border-slate-100 pb-3 text-xs"><span className="text-slate-400">Rincian Paket</span><span className="font-bold text-slate-950">{order.qty}x Porsi {order.category}</span></div>
        <div className="flex justify-between text-xs pt-1"><span className="text-slate-400">Total Nominal</span><span className="font-bold text-[#2E7D32] text-sm">{fmtRp(order.total)}</span></div>
      </div>
      <button onClick={() => onNavigate("history")} className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-3 px-4 rounded-xl transition text-sm mt-4 shadow-md">Lihat Riwayat Pesanan</button>
    </section>
  );
}

// ─── VIEW: HISTORY ────────────────────────────────────────────────────────────

function HistoryView({ orders, onNavigate, onConfirmPickup, onStartReview }: { orders: Order[]; onNavigate: (v: View) => void; onConfirmPickup: (id: string) => void; onStartReview: (o: Order) => void }) {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <h2 className="text-2xl font-black text-slate-900">Riwayat Transaksi Pelanggan</h2>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm transition flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-900 text-sm">{order.partner} <span className="font-normal text-slate-400 ml-1">({order.id})</span></span>
                <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {order.date}</span>
              </div>
              <p className="text-xs text-slate-500">{order.type === "compost" ? "Produk Kompos" : `Surplus ${order.category}`} • {order.qty} {order.type === "compost" ? "Item" : "Porsi"} • <strong className="text-slate-900">{fmtRp(order.total)}</strong></p>
              <div className="flex gap-1.5 pt-1 flex-wrap">
                <span className="px-2.5 py-0.5 rounded bg-green-100 text-green-800 text-[10px] font-bold tracking-wider uppercase">LUNAS</span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${order.pickupStatus === "Selesai" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"}`}>{order.pickupStatus}</span>
              </div>
            </div>
            <div className="w-full md:w-auto flex justify-end gap-2 items-center">
              {order.pickupStatus === "Selesai" && <button onClick={() => onNavigate("aduan")} className="text-xs font-bold text-slate-400 hover:text-red-500 transition underline decoration-dotted underline-offset-4 mr-2">Ada Masalah?</button>}
              {(order.pickupStatus === "Menunggu Pengambilan" || order.pickupStatus === "Sedang Diproses") && (
                <button onClick={() => onConfirmPickup(order.id)} className="border border-[#2E7D32] text-[#2E7D32] hover:bg-green-50 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap">Konfirmasi Ambil</button>
              )}
              {order.pickupStatus === "Selesai" && !order.reviewed && (
                <button onClick={() => onStartReview(order)} className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap">Beri Ulasan</button>
              )}
              {order.pickupStatus === "Selesai" && order.reviewed && (
                <span className="text-xs text-slate-400 flex items-center gap-1"><Check className="w-4 h-4 text-green-500" /> Selesai & Diulas</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── VIEW: REVIEW ─────────────────────────────────────────────────────────────

function ReviewView({ reviewData, onNavigate, onSubmitReview }: { reviewData: Order | null; onNavigate: (v: View) => void; onSubmitReview: (id: string) => void }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  if (!reviewData) return <div className="p-12 text-center text-slate-400">Tidak ada data ulasan aktif.</div>;
  return (
    <section className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={() => onNavigate("history")} className="flex items-center text-xs font-bold text-slate-400 hover:text-[#2E7D32] mb-6 transition gap-1"><ChevronLeft className="w-4 h-4" /> BATAL & KEMBALI</button>
      <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-8 space-y-8">
        <div className="text-center space-y-1.5">
          <h2 className="text-xl font-black text-slate-900">Bagaimana Mutu & Layanan Mitra?</h2>
          <p className="text-slate-400 text-xs">Pesanan: {reviewData.partner} - Surplus {reviewData.category}</p>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSubmitReview(reviewData.id); toast.success("Terima kasih! Ulasan Anda sukses disimpan."); onNavigate("history"); }} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Penilaian Keseluruhan</label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map(i => (
                <button key={i} type="button" onClick={() => setRating(i)} className="focus:outline-none">
                  <Star className={`w-8 h-8 ${i <= rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Ceritakan Detail Pengalaman Anda</label>
            <textarea required value={text} onChange={e => setText(e.target.value)} rows={4} placeholder="Bagaimana kondisi rasa makanan? Berikan ulasan membangun..." className="w-full border border-slate-200 rounded-2xl p-3 text-sm focus:ring-1 focus:ring-[#2E7D32] outline-none" />
          </div>
          <button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-3 px-4 rounded-xl shadow-md transition text-sm">Kirim Penilaian</button>
        </form>
      </div>
    </section>
  );
}

// ─── VIEW: COMPLAINT STATUS ───────────────────────────────────────────────────

function ComplaintStatusView({ userRole, complaints, onNavigate }: { userRole: string | null; complaints: Complaint[]; onNavigate: (v: View, data?: any) => void }) {
  if (!userRole) return <div className="p-12 text-center text-slate-500">Silakan masuk untuk melihat status aduan Anda.</div>;
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2"><ClipboardList className="text-[#2E7D32]" /> Status & Pelacakan Aduan</h1>
          <p className="text-sm text-slate-500 mt-1">Pantau perkembangan laporan Anda terkait kualitas dan layanan mitra Koperasi.</p>
        </div>
        <button onClick={() => onNavigate("aduan")} className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-5 py-2.5 rounded-xl font-bold transition shadow-sm text-sm flex items-center justify-center gap-2 whitespace-nowrap">
          <Plus className="w-4 h-4" /> Ajukan Aduan
        </button>
      </div>
      {complaints.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4"><ClipboardList className="w-8 h-8" /></div>
          <h3 className="font-bold text-slate-900 text-lg">Belum Ada Aduan</h3>
          <p className="text-slate-500 text-sm mt-1">Anda belum pernah mengajukan aduan terkait kualitas produk atau layanan mitra.</p>
          <button onClick={() => onNavigate("aduan")} className="mt-6 border border-[#2E7D32] text-[#2E7D32] px-6 py-2.5 rounded-xl font-bold hover:bg-green-50 transition">Buat Aduan Baru</button>
        </div>
      ) : (
        <div className="space-y-4">
          {complaints.map(c => {
            const styles = getComplaintStatusStyles(c.status);
            const [bg] = styles.split(" ");
            return (
              <div key={c.id} onClick={() => onNavigate("complaint-detail", c)}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#2E7D32]/30 transition duration-300 p-5 cursor-pointer relative overflow-hidden group">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${bg} opacity-50 group-hover:opacity-100 transition`}></div>
                <div className="pl-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-base group-hover:text-[#2E7D32] transition">{c.id}</span>
                      <span className="text-xs text-slate-400 font-medium">• {c.date}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-700">{c.partner}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-slate-400" /> {c.category}</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${styles}`}>
                      {getComplaintIcon(c.status)} {c.status}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium italic">Pembaruan: {c.lastUpdated}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

// ─── VIEW: COMPLAINT DETAIL ───────────────────────────────────────────────────

function ComplaintDetailView({ complaint, onNavigate, onSimulateUpdate }: { complaint: Complaint | null; onNavigate: (v: View) => void; onSimulateUpdate: (id: string) => void }) {
  if (!complaint) return <div className="p-12 text-center text-slate-500">Data aduan tidak ditemukan.</div>;
  const c = complaint;
  const styles = getComplaintStatusStyles(c.status);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={() => onNavigate("complaint-status")} className="flex items-center text-xs font-bold text-slate-400 hover:text-[#2E7D32] mb-6 transition gap-1">
        <ChevronLeft className="w-4 h-4" /> KEMBALI KE DAFTAR ADUAN
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-5 gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Nomor: {c.id}</h2>
                <p className="text-xs text-slate-500 mt-1">Diajukan pada {c.date}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-bold ${styles} w-fit`}>{getComplaintIcon(c.status)} {c.status}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div><span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Mitra Dilaporkan</span><strong className="text-sm text-slate-900">{c.partner}</strong></div>
              <div><span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Kategori Masalah</span><strong className="text-sm text-slate-900">{c.category}</strong></div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Deskripsi Keluhan</span>
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">"{c.desc}"</div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Bukti Pendukung (Foto)</span>
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                <img src={c.image} alt="Bukti Aduan" className="w-full h-auto object-cover max-h-64" />
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 text-sm text-blue-900">
              <Info className="w-5 h-5 flex-shrink-0 text-blue-600" />
              <div>
                <strong className="block mb-1">Dampak Laporan terhadap Mitra</strong>
                <p className="text-xs text-blue-800 leading-relaxed">Jika aduan ini terbukti sah secara investigasi, sistem akan memberikan poin pelanggaran ke akun mitra, menurunkan skor reputasi mereka, dan menjadi catatan dalam evaluasi kelayakan keanggotaan Koperasi Palang Pintu.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-6 md:p-8 sticky top-24">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-4 text-base flex items-center gap-2 mb-6">
              <GitCommit className="text-[#2E7D32] w-5 h-5" /> Riwayat Pemrosesan
            </h3>
            <div className="space-y-0">
              {c.timeline.map((step, index) => {
                const isLast = index === c.timeline.length - 1;
                return (
                  <div key={index} className="relative pl-10 pb-6">
                    {!isLast && <div className="absolute left-2.5 top-6 bottom-[-24px] w-0.5 bg-slate-200"></div>}
                    {!isLast && step.done && c.timeline[index + 1]?.done && <div className="absolute left-2.5 top-6 bottom-[-24px] w-0.5 bg-[#2E7D32] z-0"></div>}
                    <div className={`absolute left-0 top-1 w-5 h-5 rounded-full border-2 z-10 flex items-center justify-center ${step.done ? "bg-[#2E7D32] border-[#2E7D32]" : "bg-white border-slate-300"}`}>
                      {step.done && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className={`bg-white border rounded-xl p-4 ${step.done ? "border-green-100 shadow-sm" : "border-slate-100 opacity-60"}`}>
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h5 className={`text-sm ${step.done ? "text-slate-900 font-bold" : "text-slate-400 font-semibold"}`}>{step.status}</h5>
                          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-0.5">{step.subtitle}</p>
                        </div>
                        {step.date && <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">{step.date}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {c.status !== "Aduan Selesai" && c.status !== "Aduan Ditolak" && (
              <div className="mt-8 border-t border-slate-100 pt-6">
                <button onClick={() => onSimulateUpdate(c.id)} className="w-full border-2 border-dashed border-[#2E7D32] text-[#2E7D32] hover:bg-green-50 font-bold py-3 px-4 rounded-xl transition text-xs flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" /> Simulasi Update Status Admin
                </button>
                <p className="text-[9px] text-center text-slate-400 mt-2">Tombol simulasi untuk keperluan demo notifikasi otomatis.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState<View>("home");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [partners, setPartners] = useState<Partner[]>(MOCK_PARTNERS_INIT);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [checkout, setCheckout] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([
    { id: "ORD-2026-001", date: "15 Jun 2026", type: "food", partner: "Warung Nasi Bu Sinta", category: "Sayuran", qty: 2, total: 20000, paymentStatus: "Lunas", pickupStatus: "Selesai", reviewed: true },
    { id: "ORD-2026-002", date: "18 Jun 2026", type: "food", partner: "Toko Roti Harum", category: "Roti & Pastry", qty: 1, total: 15000, paymentStatus: "Lunas", pickupStatus: "Menunggu Pengambilan", reviewed: false },
  ]);
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [reviewData, setReviewData] = useState<Order | null>(null);
  const [addedSurplus, setAddedSurplus] = useState<SurplusProduct[]>([
    { id: 101, category: "Makanan Siap Saji", qty: 25, price: 12000, maxTime: "18:00", desc: "Nasi kotak sisa prasmanan sehat", batasKonsumsiJam: 4, expiresAt: Date.now() + 3.5 * 3_600_000, status: "aman" },
    { id: 102, category: "Roti & Pastry", qty: 12, price: 8000, maxTime: "20:00", desc: "Roti croissant sisa oven pagi", batasKonsumsiJam: 2, expiresAt: Date.now() + 45 * 60_000, status: "hampir" },
  ]);
  const [compostRequests, setCompostRequests] = useState([{ id: "PU-01", weight: 45, date: "2026-06-21", status: "Dijadwalkan", note: "Ambil di dok bongkar muat utama" }]);
  const [storeOpen, setStoreOpen] = useState(true);
  const [partnerInvoices] = useState({ pokok: 100000, wajib: 1450000, shuPaid: 850000 });
  const [modal, setModal] = useState<{ open: boolean; orderId: string }>({ open: false, orderId: "" });

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [view]);

  function navigate(v: View, data?: any) {
    if (v === "detail" && data) setSelectedPartner(data);
    if (v === "purchase" && data) setCheckout(data);
    if (v === "purchase-compost" && data) setCheckout(data);
    if (v === "review" && data) setReviewData(data);
    if (v === "complaint-detail" && data) setSelectedComplaint(data);
    setView(v);
  }

  function handleLogout() { setUserRole(null); toast.success("Berhasil keluar akun"); navigate("home"); }

  function handleLogin(role: "customer" | "partner") {
    setUserRole(role);
    toast.success(role === "partner" ? "Masuk berhasil sebagai Mitra Bisnis." : "Masuk berhasil sebagai Konsumen Terverifikasi.");
    navigate(role === "partner" ? "dashboard" : "home");
  }

  function handleRegisterPartner(name: string, type: string, address: string) {
    const newPartner: Partner = { id: partners.length + 1, name, type, address, distance: "1.0 km", distanceValue: 1.0, isOpen: true, hasProduct: false, categories: [], rating: 5.0, reviews: 0, image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400&h=300", reputation: "Menunggu Verifikasi NIB", totalTransactions: 0 };
    setPartners(p => [...p, newPartner]);
    setUserRole("partner");
    toast.success(`Pendaftaran mitra "${name}" berhasil! NIB Anda sedang dalam proses verifikasi.`);
    navigate("dashboard");
  }

  function handleProcessPayment() {
    if (!checkout) return;
    const isFood = checkout.type === "food";
    const newOrder: Order = {
      id: `ORD-2026-00${orders.length + 1}`, date: "Hari Ini", type: checkout.type,
      partner: isFood ? checkout.partner.name : "Koperasi Palang Pintu",
      category: isFood ? checkout.category.name : checkout.item.name,
      qty: checkout.qty, total: checkout.total + (checkout.shippingCost || 0) + 1000,
      paymentStatus: "Lunas",
      pickupStatus: checkout.type === "compost" && checkout.deliveryMethod === "delivery" ? "Sedang Diproses" : "Menunggu Pengambilan",
      reviewed: false, deliveryMethod: checkout.deliveryMethod, deliveryDetails: checkout.deliveryDetails,
    };
    toast.info("Melakukan verifikasi pembayaran QRIS...");
    setTimeout(() => { setOrders(o => [newOrder, ...o]); toast.success("Pembayaran diverifikasi sukses!"); navigate("order-success"); }, 800);
  }

  function handleConfirmPickup(orderId: string) {
    setModal({ open: true, orderId });
  }

  function executeConfirmPickup() {
    setOrders(o => o.map(h => h.id === modal.orderId ? { ...h, pickupStatus: "Selesai" } : h));
    toast.success(`Pesanan ${modal.orderId} sukses diselesaikan.`);
    setModal({ open: false, orderId: "" });
  }

  function handleApprovePickup(orderId: string) {
    setOrders(o => o.map(h => h.id === orderId ? { ...h, pickupStatus: "Selesai" } : h));
    toast.success(`Pesanan ${orderId} terverifikasi selesai!`);
  }

  function handleSubmitReview(orderId: string) {
    setOrders(o => o.map(h => h.id === orderId ? { ...h, reviewed: true } : h));
  }

  function handleSimulateComplaintUpdate(complaintId: string) {
    setComplaints(prev => prev.map(c => {
      if (c.id !== complaintId) return c;
      const updated = { ...c, timeline: c.timeline.map(t => ({ ...t })) };
      if (c.status === "Sedang Ditinjau") {
        updated.status = "Menunggu Klarifikasi Mitra"; updated.timeline[2].done = true; updated.timeline[2].date = "Hari Ini - Baru Saja"; updated.lastUpdated = "Baru Saja";
        toast.info(`Notifikasi: Aduan ${c.id} menunggu klarifikasi mitra terkait.`);
      } else if (c.status === "Menunggu Klarifikasi Mitra") {
        updated.status = "Aduan Selesai"; updated.timeline[3].done = true; updated.timeline[3].date = "Hari Ini - Baru Saja"; updated.lastUpdated = "Baru Saja";
        toast.success(`Notifikasi: Aduan ${c.id} Anda telah diselesaikan. Dana dikembalikan.`);
      } else {
        updated.status = "Sedang Ditinjau"; updated.timeline[1].done = true; updated.timeline[1].date = "Hari Ini - Baru Saja"; updated.lastUpdated = "Baru Saja";
        toast.info(`Notifikasi: Aduan ${c.id} sedang ditinjau tim investigasi.`);
      }
      setSelectedComplaint(updated);
      return updated;
    }));
  }

  const showFooter = !["mitra"].includes(view);

  return (
    <div className="min-h-screen flex flex-col text-slate-800" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F8FAFC" }}>
      <Navbar view={view} userRole={userRole} onNavigate={navigate} onLogout={handleLogout} />

      <main className="flex-1">
        {/* Blocked-view guards */}
        {userRole === "partner" && ["search", "mitra", "purchase", "purchase-compost", "payment", "order-success", "history", "review", "complaint-status", "complaint-detail"].includes(view) ? (
          <div className="max-w-lg mx-auto px-4 py-24 text-center space-y-6">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto"><Store className="w-10 h-10 text-[#2E7D32]" /></div>
            <h2 className="text-2xl font-black text-slate-900">Fitur Khusus Pelanggan</h2>
            <p className="text-slate-500">Halaman ini hanya tersedia untuk akun Pelanggan. Anda masuk sebagai <strong>Mitra Bisnis</strong>.</p>
            <button onClick={() => navigate("dashboard")} className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-3 rounded-2xl font-bold transition shadow-md flex items-center gap-2 mx-auto">
              <LayoutDashboard className="w-5 h-5" /> Kembali ke Panel Mitra
            </button>
          </div>
        ) : userRole === "customer" && view === "dashboard" ? (
          <div className="max-w-lg mx-auto px-4 py-24 text-center space-y-6">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto"><Users className="w-10 h-10 text-blue-600" /></div>
            <h2 className="text-2xl font-black text-slate-900">Fitur Khusus Mitra</h2>
            <p className="text-slate-500">Dashboard ini hanya tersedia untuk akun <strong>Mitra Bisnis</strong>.</p>
            <button onClick={() => navigate("home")} className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold transition shadow-md flex items-center gap-2 mx-auto">
              <ArrowLeft className="w-5 h-5" /> Kembali ke Beranda
            </button>
          </div>
        ) : <>
        {view === "home" && <HomeView onNavigate={navigate} />}
        {view === "search" && <SearchView partners={partners} surplusProducts={addedSurplus} onNavigate={navigate} />}
        {view === "mitra" && <MitraView partners={partners} onNavigate={navigate} />}
        {view === "detail" && <DetailView partner={selectedPartner} userRole={userRole} onNavigate={navigate} />}
        {view === "kompos" && <KomposView userRole={userRole} onNavigate={navigate} />}
        {view === "aduan" && <AduanView userRole={userRole} onNavigate={navigate} onAddComplaint={c => setComplaints(prev => [c, ...prev])} />}
        {view === "register" && <RegisterView onNavigate={navigate} onRegisterPartner={handleRegisterPartner} />}
        {view === "dashboard" && <DashboardView
          orders={orders} addedSurplus={addedSurplus} compostRequests={compostRequests}
          storeOpen={storeOpen}
          onToggleStore={() => { setStoreOpen(s => !s); toast.success(`Toko disetel ${!storeOpen ? "BUKA" : "TUTUP"}`); }}
          onAddSurplus={(s: any) => {
            const batas = parseInt(s.batasKonsumsiJam) || 2;
            const expiresAt = Date.now() + batas * 3_600_000;
            const newProduct: SurplusProduct = { ...s, id: Date.now(), expiresAt, status: "aman" as const };
            setAddedSurplus(p => [...p, newProduct]);
            toast.success(`Katalog surplus berhasil diunggah! Batas konsumsi: ${batas} jam.`);
            setTimeout(() => {
              toast.warning(`⏰ Produk "${s.category}" akan berakhir dalam ${batas} jam.`);
            }, 1500);
          }}
          onAddCompostRequest={(r: any) => { setCompostRequests(p => [...p, { ...r, id: `PU-${p.length + 1}`, status: "Dijadwalkan" }]); toast.success("Permohonan logistik penjemputan dikirim!"); }}
          onApprovePickup={handleApprovePickup}
          onConvertToCompost={(productId: number) => {
            setAddedSurplus(p => p.map(s => s.id === productId ? { ...s, status: "kompos" as const } : s));
            setCompostRequests(prev => [...prev, { id: `PU-${prev.length + 1}`, weight: 5, date: new Date().toISOString().split("T")[0], status: "Dijadwalkan", note: "Otomatis dari produk kadaluarsa" }]);
            toast.success("♻️ Produk dialihkan ke jalur pengolahan kompos!");
          }}
          partnerInvoices={partnerInvoices}
        />}
        {view === "login" && <LoginView onLogin={handleLogin} onNavigate={navigate} />}
        {view === "register-customer" && <RegisterCustomerView onLogin={handleLogin} onNavigate={navigate} />}
        {view === "profile" && <ProfileView orders={orders} onNavigate={navigate} />}
        {view === "purchase" && <PurchaseView checkout={checkout} onNavigate={navigate} onUpdateCheckout={setCheckout} />}
        {view === "purchase-compost" && <PurchaseCompostView checkout={checkout} onNavigate={navigate} onUpdateCheckout={setCheckout} />}
        {view === "payment" && <PaymentView checkout={checkout} onNavigate={navigate} onProcessPayment={handleProcessPayment} />}
        {view === "order-success" && <OrderSuccessView order={orders[0]} onNavigate={navigate} />}
        {view === "history" && <HistoryView orders={orders} onNavigate={navigate} onConfirmPickup={handleConfirmPickup} onStartReview={o => { setReviewData(o); navigate("review"); }} />}
        {view === "review" && <ReviewView reviewData={reviewData} onNavigate={navigate} onSubmitReview={handleSubmitReview} />}
        {view === "complaint-status" && <ComplaintStatusView userRole={userRole} complaints={complaints} onNavigate={navigate} />}
        {view === "complaint-detail" && <ComplaintDetailView complaint={selectedComplaint} onNavigate={navigate} onSimulateUpdate={handleSimulateComplaintUpdate} />}
        </>}
      </main>

      {showFooter && <Footer onNavigate={navigate} />}

      <Toaster position="top-right" richColors />
      <Modal open={modal.open} title="Konfirmasi Penyelesaian" onClose={() => setModal({ open: false, orderId: "" })}
        actions={<>
          <button onClick={() => setModal({ open: false, orderId: "" })} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 transition">Batal</button>
          <button onClick={executeConfirmPickup} className="px-4 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl text-xs font-bold transition">Ya, Sudah Selesai</button>
        </>}>
        <p>Apakah Anda benar-benar telah mengambil pesanan <strong>{modal.orderId}</strong> secara fisik?</p>
      </Modal>
    </div>
  );
}
