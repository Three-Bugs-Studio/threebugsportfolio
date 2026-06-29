import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Laptop, 
  Activity, 
  ShoppingBag, 
  Check, 
  Copy, 
  Search, 
  Cpu, 
  Database, 
  Lock, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  RefreshCw
} from "lucide-react";
import randomPhiTruongStore from "@/assets/randomphitruongstore.png";
import BlurUpImage from "./BlurUpImage";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
  lang: "vi" | "en";
}

export default function Lightbox({ isOpen, onClose, projectId, projectName, lang }: LightboxProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Slide 2 (Sukajan Color Thread state)
  const [threadColor, setThreadColor] = useState("#FF6A00"); // default brand orange
  const [threadName, setThreadName] = useState("Vàng Cam (Brand Orange)");

  // Slide 4 (Sukajan Copy Account state)
  const [copied, setCopied] = useState(false);

  // Kallisto Currency toggle
  const [currency, setCurrency] = useState<"USD" | "VND">("USD");

  // Plinth active search node
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText("012345678910");
    setTimeout(() => setCopied(false), 2000);
  };

  const slidesData: Record<string, { title: string; subtitle: string; desc: string }[]> = {
    sukajan_store: [
      {
        title: lang === "vi" ? "Trang Chủ Độc Quyền (Storefront)" : "Brand Storefront Landing",
        subtitle: "sukajanrandomphitruong.com",
        desc: lang === "vi" 
          ? "Giao diện tối giản mang đậm phong cách Nhật Bản đương đại, tối ưu hóa tốc độ tải và hiệu năng SEO." 
          : "Japanese-inspired minimalist e-commerce storefront layout with fluid grid lines and bold editorial design."
      },
      {
        title: lang === "vi" ? "Mô Phỏng Thêu Thủ Công Kỹ Thuật Số" : "Interactive Digital Embroidery Engine",
        subtitle: "sukajanrandomphitruong.com/previewer",
        desc: lang === "vi"
          ? "Trình xem trước đường chỉ thêu tùy chỉnh. Bạn có thể chọn màu chỉ thêu bên dưới để xem mô phỏng kết cấu trực tiếp."
          : "Interactive vector stitch wireframe simulator. Pick a thread color below to update the custom dragon embroidery preview."
      },
      {
        title: lang === "vi" ? "Danh Sách Sản Phẩm (Catalog Grid)" : "Premium Curated Catalog Layout",
        subtitle: "sukajanrandomphitruong.com/products",
        desc: lang === "vi"
          ? "Danh sách hiển thị các mẫu áo khoác Sukajan cao cấp kèm theo hiệu ứng zoom cận cảnh thớ lụa satin khi di chuột."
          : "Dynamic collection grid featuring fine satin textiles, dragon motifs, and high-fidelity custom detail zoom effects."
      },
      {
        title: lang === "vi" ? "Thanh Toán Nhanh Qua VietQR" : "Ultra-fast Checkout & VietQR Engine",
        subtitle: "sukajanrandomphitruong.com/checkout",
        desc: lang === "vi"
          ? "Trình thanh toán tối giản tự động sinh mã VietQR theo tiêu chuẩn Napas, giúp giao dịch hoàn tất trong 5 giây."
          : "Streamlined checkout interface generating dynamic VietQR bank transfer codes for frictionless transactions."
      }
    ],
    kallisto: [
      {
        title: lang === "vi" ? "Tổng Quan Tài Sản (Treasury Hub)" : "Multi-Custody Liquidity Overview",
        subtitle: "treasury.kallisto.io/dashboard",
        desc: lang === "vi"
          ? "Bảng điều khiển trung tâm đồng bộ hơn 84.2 triệu USD tài sản lưu động từ 5 tài khoản ngân hàng và ví giám hộ."
          : "Central control room consolidating $84.2M of liquid reserves across custody wallets and bank accounts."
      },
      {
        title: lang === "vi" ? "Biểu Đồ Xu Hướng (Live Cashflow Trend)" : "Dynamic Cashflow Forecasting Map",
        subtitle: "treasury.kallisto.io/analytics",
        desc: lang === "vi"
          ? "Trực quan hóa xu hướng dòng tiền lưu động bằng biểu đồ vector SVG mượt mà, hỗ trợ chuyển đổi loại tiền tệ."
          : "Animated SVG line metrics predicting treasury trends. Toggle the currency base below to watch values shift."
      },
      {
        title: lang === "vi" ? "Kiểm Tra API Giao Dịch (Sync Terminal)" : "Real-time Banking API Terminal",
        subtitle: "treasury.kallisto.io/terminal",
        desc: lang === "vi"
          ? "Kênh kiểm thử kết nối API ngân hàng, ghi lại lịch sử đồng bộ giao dịch thời gian thực với độ trễ dưới 1 giây."
          : "Transaction synchronizer recording real-time secure network handshakes between banking gateways."
      }
    ],
    plinth: [
      {
        title: lang === "vi" ? "Cổng Tra Cứu Ngữ Nghĩa (Vector Search)" : "Semantic Search Retrieval Interface",
        subtitle: "search.plinth.ai",
        desc: lang === "vi"
          ? "Cổng tra cứu tài liệu thông minh bằng ngôn ngữ tự nhiên, sử dụng thuật toán nhúng vector để so khớp ngữ nghĩa."
          : "Natural language workspace indexing internal data. Type or select a sample query below to test search."
      },
      {
        title: lang === "vi" ? "Đồ Thị Tri Thức Vector (Knowledge Graph)" : "Interactive Semantic Knowledge Node Map",
        subtitle: "search.plinth.ai/graph",
        desc: lang === "vi"
          ? "Đồ thị mô phỏng các mối quan hệ liên kết ngữ nghĩa giữa hàng ngàn hợp đồng, tài liệu PDF và email lưu trữ."
          : "Visualization of semantic distance between doc files. Click on quick queries above to focus vector clusters."
      }
    ]
  };

  const projectSlides = slidesData[projectId] || [];
  const slideCount = projectSlides.length;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideCount);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);

  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus trap and keyboard controls
  useEffect(() => {
    if (isOpen) {
      // 1. Store previous focus
      previousFocusRef.current = document.activeElement as HTMLElement;

      // 2. Focus close button or first interactive element
      const timer = setTimeout(() => {
        const firstFocusable = modalRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        if (firstFocusable) {
          firstFocusable.focus();
        }
      }, 50);

      // 3. Keydown handler for Arrow keys, Escape, and Tab (Focus Trap)
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
          return;
        }

        if (e.key === "ArrowLeft") {
          prevSlide();
          return;
        }

        if (e.key === "ArrowRight") {
          nextSlide();
          return;
        }

        if (e.key === "Tab") {
          if (!modalRef.current) return;
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            // Shift + Tab: if we are on the first element, wrap around to the last
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            // Tab: if we are on the last element, wrap around to the first
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("keydown", handleKeyDown);
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }
  }, [isOpen, currentSlide, slideCount, onClose]);

  // Render simulated contents based on project and slide index
  const renderSimulatedScreen = () => {
    if (projectId === "sukajan_store") {
      switch (currentSlide) {
        case 0: // Storefront Hero
          return (
            <div className="w-full h-full bg-[#0a0a0a] text-white flex flex-col justify-between p-6 relative overflow-hidden font-sans select-none">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#D32F2F] flex items-center justify-center font-bold text-[9px]">R</div>
                  <span className="font-mono text-[10px] tracking-widest text-[#F5F5F3]">RANDOM.PHITRUONG</span>
                </div>
                <div className="flex gap-4 font-mono text-[8px] text-[#8E8E93]">
                  <span>CỬA HÀNG</span>
                  <span>VỀ CHÚNG TÔI</span>
                  <span className="text-[#FF6A00]">ORDER</span>
                </div>
              </div>

              {/* Body */}
              <div className="grid grid-cols-2 gap-4 items-center my-auto">
                <div className="text-left space-y-2">
                  <div className="inline-block bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-[#FF6A00] text-[7px] font-mono px-2 py-0.5 rounded-sm">
                    SUKAJAN INDEPENDENT
                  </div>
                  <h1 className="font-display font-bold text-2xl md:text-3xl leading-tight text-[#F5F5F3]">
                    SUKAJAN <br />
                    <span className="text-[#8E8E93]">ĐẬM CHẤT RIÊNG</span>
                  </h1>
                  <p className="text-[9px] text-[#8E8E93] leading-relaxed max-w-[200px]">
                    Hơn 4 năm order áo khoác souvenir jacket chính hãng từ Nhật Bản. Độc đáo, không hàng nhái.
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <button className="bg-brand-orange text-white text-[8px] font-mono px-3 py-1.5 rounded-sm hover:bg-opacity-95 transition-all flex items-center gap-1">
                      {lang === "vi" ? "MUA NGAY" : "SHOP NOW"} <ArrowRight className="w-2 h-2" />
                    </button>
                    <span className="text-[8px] font-mono text-[#8E8E93]">ZALO CHAT ACTIVE</span>
                  </div>
                </div>

                {/* Simulated Image Showcase */}
                <div className="relative h-44 rounded bg-[#111] border border-white/5 overflow-hidden flex items-center justify-center group/img">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />
                  {/* Silk text background effect */}
                  <div className="absolute top-2 left-2 font-mono text-[7px] text-white/20">STITCH_01_RAW</div>
                  <BlurUpImage 
                    src={randomPhiTruongStore} 
                    alt="Sukajan jacket theme" 
                    className="w-full h-full object-cover opacity-80 scale-105"
                    wrapperClassName="w-full h-full"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 z-20 text-left">
                    <span className="font-mono text-[8px] text-[#FF6A00] block">NEW SEASONS</span>
                    <span className="font-sans text-[10px] text-white font-medium">Phoenix & Waves Satin</span>
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div className="flex justify-between items-center text-[7px] font-mono text-[#555] border-t border-white/5 pt-2">
                <span>RESPONSIVE STAGE: ONLINE</span>
                <span>SECURED PLATFORM SSL</span>
              </div>
            </div>
          );

        case 1: // Embroidery Simulator
          return (
            <div className="w-full h-full bg-[#0a0a0a] text-white flex flex-col justify-between p-6 relative overflow-hidden font-sans select-none">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-mono text-[8px] text-[#8E8E93]">CUSTOM EMBROIDERY WORKSPACE</span>
                <span className="font-mono text-[8px] text-brand-orange">[ ACTIVE SIMULATOR ]</span>
              </div>

              {/* Interactive preview area */}
              <div className="my-auto flex flex-col items-center justify-center gap-4">
                <div className="w-48 h-36 bg-[#0e0e0e] border border-white/10 rounded-sm relative flex items-center justify-center p-4 shadow-inner">
                  {/* Grid overlay */}
                  <div className="absolute inset-0 swiss-grid opacity-20 pointer-events-none" />
                  
                  {/* Interactive Crane & Dragon outline */}
                  <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-lg" style={{ color: threadColor }}>
                    <path 
                      d="M 50,12 L 32,28 L 18,22 L 12,38 L 28,48 L 22,82 L 50,88 L 78,82 L 72,48 L 88,38 L 82,22 L 68,28 Z" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="0.5" 
                      strokeOpacity="0.25"
                    />
                    {/* Simulated stitch pattern updating with thread color */}
                    <motion.path 
                      d="M 50,30 Q 30,45 50,60 T 50,78 Q 65,55 45,55" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeDasharray="4 2"
                      animate={{ strokeDashoffset: [0, -12] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    />
                    <circle cx="50" cy="30" r="1.5" fill="#F5F5F3" />
                    <circle cx="45" cy="55" r="1.5" fill="#F5F5F3" />
                  </svg>

                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded-sm border border-white/10 font-mono text-[7px] text-[#8E8E93]">
                    {lang === "vi" ? "MÀU CHỈ: " : "COLOR: "} <span style={{ color: threadColor }} className="font-bold">{threadColor}</span>
                  </div>
                </div>

                {/* Color pickers */}
                <div className="flex flex-col items-center gap-2">
                  <span className="font-mono text-[8px] text-[#8E8E93]">
                    {lang === "vi" ? "CLICK ĐỂ CHỌN MÀU CHỈ KHÁC NHAU:" : "CLICK TO SWITCH SILK THREAD COLOR:"}
                  </span>
                  <div className="flex gap-3">
                    {[
                      { hex: "#FF6A00", name: lang === "vi" ? "Cam Thương Hiệu (Brand Orange)" : "Brand Orange" },
                      { hex: "#D32F2F", name: lang === "vi" ? "Đỏ Mặt Trời (Crimson Red)" : "Crimson Red" },
                      { hex: "#388E3C", name: lang === "vi" ? "Xanh Cẩm Thạch (Jade Green)" : "Jade Green" },
                      { hex: "#F5F5F3", name: lang === "vi" ? "Bạc Tơ Tằm (Satin Silver)" : "Satin Silver" }
                    ].map((color) => (
                      <button
                        key={color.hex}
                        onClick={() => {
                          setThreadColor(color.hex);
                          setThreadName(color.name);
                        }}
                        className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                          threadColor === color.hex ? "border-white scale-110" : "border-white/10 scale-100"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {threadColor === color.hex && (
                          <Check className={`w-3.5 h-3.5 ${color.hex === "#F5F5F3" ? "text-black" : "text-white"}`} />
                        )}
                      </button>
                    ))}
                  </div>
                  <span className="font-sans text-[9px] text-[#F5F5F3] font-light">
                    {threadName}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[7px] font-mono text-[#555] border-t border-white/5 pt-2">
                <span>STITCH_COUNT: 142,504</span>
                <span>ENGINE: CANVAS_RENDER_V2</span>
              </div>
            </div>
          );

        case 2: // Product Catalog
          return (
            <div className="w-full h-full bg-[#0a0a0a] text-white flex flex-col justify-between p-5 relative overflow-hidden font-sans select-none">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-mono text-[8px] text-[#8E8E93]">COLLECTION // MIYABI AUTUMN</span>
                <span className="font-mono text-[8px] text-[#8E8E93]">VND CURRENCY</span>
              </div>

              {/* Grid of 2 premium jackets */}
              <div className="grid grid-cols-2 gap-3 my-auto">
                {[
                  {
                    title: "Miyabi Dragon Souvenir",
                    price: "12,500,000đ",
                    tag: "Best Seller",
                    img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=200&auto=format&fit=crop"
                  },
                  {
                    title: "Cherry Blossom Crane",
                    price: "9,800,000đ",
                    tag: "Limited",
                    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=200&auto=format&fit=crop"
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-[#111] border border-white/5 rounded-sm p-3 flex flex-col gap-2 text-left hover:border-white/20 transition-all">
                    <div className="h-24 bg-[#0d0d0d] rounded-sm relative overflow-hidden flex items-center justify-center">
                      <BlurUpImage 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-70"
                        wrapperClassName="w-full h-full"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-1.5 left-1.5 bg-brand-orange text-white text-[6px] font-mono px-1 py-0.5 rounded-sm">
                        {item.tag}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-sans font-medium text-[11px] text-[#F5F5F3] truncate">{item.title}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="font-mono text-[10px] text-brand-orange font-medium">{item.price}</span>
                        <span className="font-mono text-[7px] text-[#8E8E93] border border-white/10 px-1.5 py-0.5 rounded-sm">
                          ORDER
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-[7px] font-mono text-[#555] border-t border-white/5 pt-2">
                <span>CATALOG FILTER: ON</span>
                <span>ITEMS: 14 AUTHENTIC DESIGNATIONS</span>
              </div>
            </div>
          );

        case 3: // VietQR Checkout
          return (
            <div className="w-full h-full bg-[#0a0a0a] text-white flex flex-col justify-between p-5 relative overflow-hidden font-sans select-none">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-mono text-[8px] text-[#8E8E93]">SECURE CHECKOUT // MIYABI ORDER</span>
                <span className="font-mono text-[8px] text-[#4CAF50] flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" /> SECURE SSL
                </span>
              </div>

              {/* Checkout details & QR */}
              <div className="grid grid-cols-5 gap-4 items-center my-auto">
                <div className="col-span-3 text-left space-y-2">
                  <div className="space-y-1">
                    <span className="font-mono text-[7px] text-[#8E8E93] uppercase block">Tổng cộng đơn hàng</span>
                    <span className="font-mono text-base text-brand-orange font-bold block">12,500,000 VND</span>
                  </div>

                  <div className="p-2.5 bg-[#111] border border-white/5 rounded-sm space-y-1.5 text-[9px]">
                    <div className="flex justify-between">
                      <span className="text-[#8E8E93]">Ngân hàng:</span>
                      <span className="text-[#F5F5F3] font-medium">Vietcombank</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8E8E93]">Tên TK:</span>
                      <span className="text-[#F5F5F3] font-medium">PHI TRUONG SUKAJAN</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#8E8E93]">Số tài khoản:</span>
                      <span className="text-[#F5F5F3] font-mono font-medium">012345678910</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[8px] font-mono py-1.5 rounded-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-500" />
                        <span>{lang === "vi" ? "ĐÃ SAO CHÉP STK!" : "COPIED ACCOUNT NUMBER!"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#8E8E93]" />
                        <span>{lang === "vi" ? "SAO CHÉP SỐ TÀI KHOẢN" : "COPY ACCOUNT NUMBER"}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Simulated VietQR */}
                <div className="col-span-2 flex flex-col items-center justify-center gap-1.5">
                  <div className="w-28 h-28 bg-white p-1.5 rounded-md relative flex items-center justify-center shadow-lg">
                    {/* VietQR decorative elements */}
                    <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#1565C0]" />
                    <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#1565C0]" />
                    <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#1565C0]" />
                    <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#1565C0]" />

                    {/* QR grid simulation */}
                    <div className="w-full h-full bg-[#eee] p-1 rounded-sm grid grid-cols-6 grid-rows-6 gap-[2px]">
                      {Array.from({ length: 36 }).map((_, rIdx) => {
                        // Create typical QR square patterns
                        const isCorner = 
                          (rIdx < 6 && rIdx % 6 < 2) || 
                          (rIdx < 12 && rIdx >= 6 && rIdx % 6 < 2) ||
                          (rIdx >= 24 && rIdx % 6 < 2) || 
                          (rIdx < 6 && rIdx % 6 >= 4);
                        return (
                          <div 
                            key={rIdx} 
                            className={`rounded-sm ${
                              isCorner ? "bg-[#111]" : (Math.random() > 0.5 ? "bg-[#111]" : "bg-transparent")
                            }`} 
                          />
                        );
                      })}
                    </div>
                    {/* Tiny logo center */}
                    <div className="absolute w-6 h-6 bg-white rounded-sm border border-white/50 flex items-center justify-center shadow">
                      <span className="text-[6px] font-bold text-[#1565C0]">VietQR</span>
                    </div>
                  </div>
                  <span className="font-mono text-[7px] text-[#8E8E93] text-center uppercase">
                    Quét mã để thanh toán
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[7px] font-mono text-[#555] border-t border-white/5 pt-2">
                <span>GATEWAY SYNC: AUTO_CHECK</span>
                <span>NAPAS STANDARD DIRECT</span>
              </div>
            </div>
          );

        default:
          return null;
      }
    } else if (projectId === "kallisto") {
      switch (currentSlide) {
        case 0: // Assets Overview
          return (
            <div className="w-full h-full bg-[#0a0a0a] text-white flex flex-col justify-between p-6 relative overflow-hidden font-sans select-none">
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-brand-orange" />
                  <span className="font-mono text-[9px] tracking-widest text-[#F5F5F3]">KALLISTO FINANCIAL</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#4CAF50] rounded-full animate-pulse" />
                  <span className="font-mono text-[7px] text-[#4CAF50]">SYNCED 1S AGO</span>
                </div>
              </div>

              {/* Main Assets Grid */}
              <div className="grid grid-cols-3 gap-3 my-auto">
                <div className="bg-[#111] border border-white/5 rounded-sm p-3 text-left space-y-1">
                  <span className="font-mono text-[7px] text-[#8E8E93] block uppercase">TỔNG TÀI SẢN</span>
                  <span className="font-mono text-sm text-white font-semibold block">$84,204,193</span>
                  <span className="font-mono text-[7px] text-brand-orange block">+1.24% HÔM NAY</span>
                </div>
                <div className="bg-[#111] border border-white/5 rounded-sm p-3 text-left space-y-1">
                  <span className="font-mono text-[7px] text-[#8E8E93] block uppercase">DÒNG TIỀN VÀO (INFLOW)</span>
                  <span className="font-mono text-sm text-[#4CAF50] font-semibold block">+$12,404,200</span>
                  <span className="font-mono text-[7px] text-[#8E8E93] block">32 GIAO DỊCH</span>
                </div>
                <div className="bg-[#111] border border-white/5 rounded-sm p-3 text-left space-y-1">
                  <span className="font-mono text-[7px] text-[#8E8E93] block uppercase">LIÊN KẾT NGÂN HÀNG</span>
                  <span className="font-mono text-sm text-[#FFB300] font-semibold block">5 / 5 ACTIVE</span>
                  <span className="font-mono text-[7px] text-[#8E8E93] block">HSBC, VCB, STANDARD</span>
                </div>
              </div>

              {/* Sync status logging */}
              <div className="bg-[#0e0e0e] border border-white/5 rounded-sm p-2 text-left font-mono text-[7px] text-[#8E8E93] space-y-1 max-h-16 overflow-y-auto">
                <div>[11:04:32] <span className="text-[#4CAF50]">SUCCESS</span> API handshake HSBC escrow verified. Balance matching.</div>
                <div>[11:04:31] <span className="text-[#4CAF50]">SUCCESS</span> Pull asset balances via Vietcombank API (HCMC node).</div>
              </div>

              <div className="flex justify-between items-center text-[7px] font-mono text-[#555] border-t border-white/5 pt-2">
                <span>SECURED AES-256 ENCRYPTION</span>
                <span>CUSTODY: LEDGER SYSTEM B</span>
              </div>
            </div>
          );

        case 1: // Cashflow line chart simulation
          const currencyValue = currency === "USD" ? "$84,204,193.20" : "2,147,206,926,600 VND";
          return (
            <div className="w-full h-full bg-[#0a0a0a] text-white flex flex-col justify-between p-6 relative overflow-hidden font-sans select-none">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-mono text-[8px] text-[#8E8E93]">LIQUID CASHFLOW TREND LINE</span>
                <div className="flex gap-1 bg-white/5 p-0.5 rounded border border-white/10">
                  <button 
                    onClick={() => setCurrency("USD")}
                    className={`font-mono text-[7px] px-2 py-0.5 rounded-sm transition-all ${
                      currency === "USD" ? "bg-brand-orange text-white" : "text-[#8E8E93] hover:text-white"
                    }`}
                  >
                    USD
                  </button>
                  <button 
                    onClick={() => setCurrency("VND")}
                    className={`font-mono text-[7px] px-2 py-0.5 rounded-sm transition-all ${
                      currency === "VND" ? "bg-brand-orange text-white" : "text-[#8E8E93] hover:text-white"
                    }`}
                  >
                    VND
                  </button>
                </div>
              </div>

              {/* Dynamic balances & interactive graph */}
              <div className="my-auto text-left space-y-3">
                <div>
                  <span className="font-mono text-[8px] text-[#8E8E93]">TOTAL PORTFOLIO BASE VALUE</span>
                  <h3 className="font-mono text-lg font-bold text-white mt-0.5">{currencyValue}</h3>
                </div>

                <div className="h-32 bg-[#0e0e0e] border border-white/5 rounded-sm p-3 flex flex-col justify-between relative overflow-hidden">
                  {/* SVG line chart */}
                  <svg viewBox="0 0 100 30" className="w-full h-20 overflow-visible mt-2">
                    <defs>
                      <linearGradient id="chart-flow-glow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF6A00" stopOpacity="0.15"/>
                        <stop offset="100%" stopColor="#FF6A00" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,22 Q 15,18 25,12 T 50,14 T 75,6 T 100,4 L 100,30 L 0,30 Z"
                      fill="url(#chart-flow-glow)"
                    />
                    <motion.path
                      d="M 0,22 Q 15,18 25,12 T 50,14 T 75,6 T 100,4"
                      stroke="#FF6A00"
                      strokeWidth="1.2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2 }}
                    />
                    <circle cx="75" cy="6" r="2" fill="#FFF" stroke="#FF6A00" strokeWidth="1" />
                  </svg>

                  <div className="flex justify-between font-mono text-[7px] text-[#555] border-t border-white/5 pt-1">
                    <span>JAN</span>
                    <span>MAR</span>
                    <span>MAY</span>
                    <span>JUL</span>
                    <span>SEP</span>
                    <span className="text-[#FF6A00]">[ PREDICTIVE WAVE ]</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-[7px] font-mono text-[#555] border-t border-white/5 pt-2">
                <span>UPDATE INTERVAL: 60S</span>
                <span>MODEL WEIGHT: AUTO_REGRESSIVE</span>
              </div>
            </div>
          );

        case 2: // API handshakes console terminal
          return (
            <div className="w-full h-full bg-[#0a0a0a] text-white flex flex-col justify-between p-6 relative overflow-hidden font-sans select-none">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-mono text-[8px] text-[#8E8E93]">KALLISTO SECURE API GATEWAY SYSTEM</span>
                <span className="font-mono text-[8px] text-[#4CAF50]">MUTUAL_TLS_SECURE</span>
              </div>

              {/* Developer Payload Log Visualizer */}
              <div className="my-auto space-y-3 text-left">
                <span className="font-mono text-[8px] text-[#8E8E93]">MOCK BANK API DECRYPTED REQUEST PAYLOAD:</span>
                <div className="bg-[#0e0e0e] border border-white/10 rounded p-3 font-mono text-[8px] text-[#A6E22E] space-y-1 h-32 overflow-y-auto">
                  <div>{"{"}</div>
                  <div className="pl-3 text-[#F8F8F2]">"status": <span className="text-[#E6DB74]">"SUCCESS_VERIFIED"</span>,</div>
                  <div className="pl-3 text-[#F8F8F2]">"handshake_id": <span className="text-[#E6DB74]">"hs_hsbc_901a8dfb2"</span>,</div>
                  <div className="pl-3 text-[#F8F8F2]">"timestamp": <span className="text-[#AE81FF]">1719460212</span>,</div>
                  <div className="pl-3 text-[#F8F8F2]">"vault_balance": {"{"}</div>
                  <div className="pl-6 text-[#F8F8F2]">"currency": <span className="text-[#E6DB74]">"USD"</span>,</div>
                  <div className="pl-6 text-[#F8F8F2]">"liquid_reserve": <span className="text-[#AE81FF]">32049100.54</span></div>
                  <div className="pl-3 text-[#F8F8F2]">{"}"},</div>
                  <div className="pl-3 text-[#F8F8F2]">"security_protocol": <span className="text-[#E6DB74]">"mTLS_AES_GCM"</span></div>
                  <div>{"}"}</div>
                </div>
              </div>

              <div className="flex justify-between items-center text-[7px] font-mono text-[#555] border-t border-white/5 pt-2">
                <span>GATEWAYS ONLINE: 5</span>
                <span>TUNNEL STATE: SHIELDED_ESTABLISHED</span>
              </div>
            </div>
          );

        default:
          return null;
      }
    } else { // plinth
      switch (currentSlide) {
        case 0: // Search Portal
          return (
            <div className="w-full h-full bg-[#0a0a0a] text-white flex flex-col justify-between p-6 relative overflow-hidden font-sans select-none">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-mono text-[8px] text-[#8E8E93]">PLINTH NEURAL SEARCH DEV STAGE</span>
                <span className="font-mono text-[8px] text-brand-orange">[ AGENT: ONLINE ]</span>
              </div>

              {/* Main Search Bar and query matching */}
              <div className="my-auto space-y-3.5 text-left max-w-sm mx-auto">
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-[#555]" />
                    <input 
                      type="text" 
                      placeholder={lang === "vi" ? "Nhập từ khóa truy vấn ngữ nghĩa..." : "Enter semantic query request..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#111] border border-white/10 rounded-sm pl-8 pr-3 py-1.5 font-mono text-[9px] text-white placeholder-[#555] focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                  <button className="bg-brand-orange px-3 text-[9px] font-mono rounded-sm font-semibold hover:bg-opacity-95 transition-all text-white">
                    {lang === "vi" ? "TRUY VẤN" : "SEARCH"}
                  </button>
                </div>

                {/* Quick select tags */}
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="font-mono text-[7px] text-[#8E8E93] mr-1">QUICK QUERIES:</span>
                  {[
                    { q: lang === "vi" ? "hợp đồng bảo mật" : "nda contract security", id: "nda" },
                    { q: lang === "vi" ? "báo cáo tài chính" : "financial audits q4", id: "finance" },
                    { q: lang === "vi" ? "kế hoạch ra mắt" : "launch timeline 2026", id: "timeline" }
                  ].map((query) => (
                    <button
                      key={query.id}
                      onClick={() => {
                        setSearchQuery(query.q);
                        setActiveNode(query.id);
                      }}
                      className="font-mono text-[7px] text-[#8E8E93] bg-[#111] hover:text-brand-orange hover:border-brand-orange/30 border border-white/5 px-2 py-0.5 rounded-sm transition-all"
                    >
                      {query.q}
                    </button>
                  ))}
                </div>

                {/* Search Result preview */}
                {searchQuery && (
                  <div className="bg-[#111] border border-brand-orange/10 rounded p-2.5 space-y-1 relative animate-fade-in text-[9px]">
                    <div className="flex justify-between items-center text-[7px] font-mono text-[#8E8E93]">
                      <span>RESULT MATCH #1 // SCORE: 0.985</span>
                      <span className="text-brand-orange">VECTOR_COSINE_MATCH</span>
                    </div>
                    <span className="font-sans font-medium text-[#F5F5F3] block">
                      {activeNode === "nda" && (lang === "vi" ? "Hợp đồng Bảo mật NDA_PhiTruong_ThreeBugs.pdf" : "ThreeBugs_PhiTruong_NDA_Security.pdf")}
                      {activeNode === "finance" && (lang === "vi" ? "Bản đối soát quyết toán tài chính Q4.xlsx" : "Q4_Financial_Audit_Report.xlsx")}
                      {activeNode === "timeline" && (lang === "vi" ? "Kế hoạch ra mắt website Sukajan.docx" : "Sukajan_Launch_Roadmap_V2.docx")}
                      {!activeNode && (lang === "vi" ? "Tài liệu hệ thống cơ sở dữ liệu.pdf" : "Database_System_Specifications_Overview.pdf")}
                    </span>
                    <p className="text-[8px] text-[#8E8E93] leading-relaxed">
                      {lang === "vi" 
                        ? "Điều khoản thỏa thuận bảo mật mã nguồn độc quyền, quy định chuyển giao đầy đủ sở hữu và warranty." 
                        : "Includes clause sections addressing full proprietary source code handover, delivery guidelines, and warranty terms."}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center text-[7px] font-mono text-[#555] border-t border-white/5 pt-2">
                <span>AI_EMBEDDING_MODEL: TEXT_GEKKO_3</span>
                <span>LATENCY: 12MS</span>
              </div>
            </div>
          );

        case 1: // Knowledge Graph Cluster visualization
          return (
            <div className="w-full h-full bg-[#0a0a0a] text-white flex flex-col justify-between p-6 relative overflow-hidden font-sans select-none">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-mono text-[8px] text-[#8E8E93]">SEMANTIC KNOWLEDGE MAP VIEW</span>
                <span className="font-mono text-[8px] text-brand-orange">D3_GRAPH_NODE</span>
              </div>

              {/* Graphical Nodes */}
              <div className="my-auto h-40 bg-[#0e0e0e] border border-white/5 rounded-sm relative flex items-center justify-center overflow-hidden">
                {/* Node rays SVG */}
                <svg className="absolute inset-0 w-full h-full opacity-35">
                  <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#FF6A00" strokeWidth="0.5" />
                  <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="#8E8E93" strokeWidth="0.5" />
                  <line x1="50%" y1="50%" x2="75%" y2="30%" stroke="#FF6A00" strokeWidth="0.5" />
                  <line x1="50%" y1="50%" x2="75%" y2="70%" stroke="#8E8E93" strokeWidth="0.5" />
                  <line x1="25%" y1="25%" x2="15%" y2="50%" stroke="#8E8E93" strokeWidth="0.5" />
                  <line x1="75%" y1="30%" x2="85%" y2="50%" stroke="#8E8E93" strokeWidth="0.5" />
                </svg>

                {/* Central search anchor node */}
                <div className="absolute flex flex-col items-center gap-1">
                  <div className="w-5 h-5 bg-brand-orange rounded-full border-2 border-white flex items-center justify-center shadow-lg relative">
                    <div className="absolute inset-0 bg-brand-orange rounded-full animate-ping opacity-45" />
                    <Search className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="font-mono text-[6px] text-white bg-black/80 px-1 rounded border border-white/10 uppercase">
                    QUERY_VECTOR
                  </span>
                </div>

                {/* Left Top Node (NDA) */}
                <div className="absolute top-6 left-12 flex flex-col items-center gap-0.5">
                  <div className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    activeNode === "nda" ? "bg-brand-orange border-white scale-125" : "bg-[#111] border-white/20"
                  }`} />
                  <span className="font-mono text-[6px] text-[#8E8E93]">NDA_DOCS</span>
                </div>

                {/* Right Top Node (Finance) */}
                <div className="absolute top-8 right-16 flex flex-col items-center gap-0.5">
                  <div className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    activeNode === "finance" ? "bg-brand-orange border-white scale-125" : "bg-[#111] border-white/20"
                  }`} />
                  <span className="font-mono text-[6px] text-[#8E8E93]">FIN_REPORTS</span>
                </div>

                {/* Left Bottom Node (Logs) */}
                <div className="absolute bottom-6 left-14 flex flex-col items-center gap-0.5">
                  <div className="w-3 h-3 rounded-full bg-[#111] border border-white/20" />
                  <span className="font-mono text-[6px] text-[#8E8E93]">MAIL_ARCHIVE</span>
                </div>

                {/* Right Bottom Node (Timeline) */}
                <div className="absolute bottom-8 right-14 flex flex-col items-center gap-0.5">
                  <div className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    activeNode === "timeline" ? "bg-brand-orange border-white scale-125" : "bg-[#111] border-white/20"
                  }`} />
                  <span className="font-mono text-[6px] text-[#8E8E93]">LAUNCH_PLAN</span>
                </div>

                {/* Floating indicator */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/80 border border-white/10 px-2 py-0.5 rounded font-mono text-[6px] text-brand-orange">
                  <Sparkles className="w-2.5 h-2.5 animate-spin" />
                  <span>COSINE SIMILARITY FILTER &gt;= 0.85</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[7px] font-mono text-[#555] border-t border-white/5 pt-2">
                <span>TOTAL EMBEDDED NODES: 4,204</span>
                <span>GRAPH TYPE: REPELLENT_SPRING_GRID</span>
              </div>
            </div>
          );

        default:
          return null;
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 select-none" id="lightbox-container">
          {/* Backdrop glass blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#090909]/95 backdrop-blur-xl cursor-zoom-out"
          />

          {/* Lightbox Modal Shell */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#111] border border-white/10 rounded-xl overflow-hidden flex flex-col shadow-2xl z-10"
            id="lightbox-modal-content"
          >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#141414]">
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4 text-brand-orange" />
              <span className="font-sans font-medium text-[#F5F5F3] text-sm md:text-base">
                {projectName} — {lang === "vi" ? "Giao diện trải nghiệm" : "Interactive Interface"}
              </span>
            </div>

            {/* Close button */}
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/5 text-[#8E8E93] hover:text-[#F5F5F3] transition-colors focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:outline-none"
              id="lightbox-close-btn"
              aria-label={lang === "vi" ? "Đóng hộp thoại" : "Close dialog"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Core Content Body: Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[380px] md:min-h-[440px]">
            {/* Left Col: The Interactive Browser Mockup Screen (Span 7) */}
            <div className="md:col-span-7 bg-[#0d0d0d] p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5 relative">
              {/* Browser mockup container */}
              <div className="w-full max-w-lg mx-auto rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a] flex flex-col">
                {/* Browser top title bar */}
                <div className="bg-[#141414] px-4 py-2 flex items-center justify-between border-b border-white/5 text-[9px]">
                  {/* Mac OS circle buttons */}
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                    <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                  </div>
                  {/* URL Path */}
                  <div className="bg-black/40 border border-white/5 px-4 py-0.5 rounded text-[#8E8E93] font-mono w-48 text-center truncate">
                    {projectSlides[currentSlide]?.subtitle}
                  </div>
                  {/* Sync status */}
                  <div className="w-3.5 h-3.5" />
                </div>

                {/* Viewport Content */}
                <div className="h-64 md:h-72 w-full relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      {renderSimulatedScreen()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right Col: Slide Metadata & Guides (Span 5) */}
            <div className="md:col-span-5 p-6 flex flex-col justify-between bg-[#111] text-left">
              <div className="space-y-4">
                {/* Slide index badge */}
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-[#8E8E93] uppercase tracking-wider">
                    {lang === "vi" ? `Hình ảnh ${currentSlide + 1} / ${slideCount}` : `Slide ${currentSlide + 1} of ${slideCount}`}
                  </span>
                  <span className="font-mono text-[9px] text-brand-orange bg-brand-orange/10 border border-brand-orange/25 px-2 py-0.5 rounded-sm">
                    {lang === "vi" ? "THỬ TƯƠNG TÁC LIVE" : "LIVE INTERACTIVE"}
                  </span>
                </div>

                {/* Slide title */}
                <h3 className="font-display font-medium text-xl md:text-2xl text-[#F5F5F3] leading-snug">
                  {projectSlides[currentSlide]?.title}
                </h3>

                {/* Slide description */}
                <p className="font-sans text-xs md:text-sm text-[#8E8E93] leading-relaxed font-light">
                  {projectSlides[currentSlide]?.desc}
                </p>

                {/* Live interaction reminder banner */}
                <div className="p-3 bg-[#0a0a0a]/50 rounded border border-white/5 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-brand-orange shrink-0 mt-0.5 animate-pulse" />
                  <p className="font-sans text-[10px] md:text-[11px] text-[#8E8E93] leading-relaxed">
                    {lang === "vi"
                      ? "Giao diện mô phỏng phía bên trái hoàn toàn sống động. Bạn có thể bấm để trải nghiệm thử cách website hoạt động thực tế!"
                      : "The interface mockup on the left is active. Try clicking the buttons inside the browser frame to experience real behavior!"}
                  </p>
                </div>
              </div>

              {/* Slider controls & dots */}
              <div className="pt-6 border-t border-white/5 flex flex-col gap-4 mt-6">
                <div className="flex justify-between items-center">
                  {/* Prev/Next buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={prevSlide}
                      className="w-9 h-9 rounded-full bg-[#1c1c1e] hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center border border-white/5 hover:border-transparent text-[#8E8E93] focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:outline-none"
                      title={lang === "vi" ? "Hình trước" : "Previous Slide"}
                      aria-label={lang === "vi" ? "Hình trước" : "Previous Slide"}
                      id="lightbox-prev-btn"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="w-9 h-9 rounded-full bg-[#1c1c1e] hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center border border-white/5 hover:border-transparent text-[#8E8E93] focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:outline-none"
                      title={lang === "vi" ? "Hình tiếp theo" : "Next Slide"}
                      aria-label={lang === "vi" ? "Hình tiếp theo" : "Next Slide"}
                      id="lightbox-next-btn"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Indicator Dots */}
                  <div className="flex gap-1.5">
                    {Array.from({ length: slideCount }).map((_, dIdx) => (
                      <button
                        key={dIdx}
                        onClick={() => setCurrentSlide(dIdx)}
                        className={`h-1.5 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:outline-none ${
                          currentSlide === dIdx ? "w-5 bg-brand-orange" : "w-1.5 bg-white/20"
                        }`}
                        title={lang === "vi" ? `Đến hình ${dIdx + 1}` : `Go to slide ${dIdx + 1}`}
                        aria-label={lang === "vi" ? `Đến hình ${dIdx + 1}` : `Go to slide ${dIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Footer close help */}
                <span className="font-mono text-[8px] text-[#555] uppercase tracking-wider text-center">
                  {lang === "vi" ? "Bấm bên ngoài hoặc nhấn nút X để đóng" : "Click backdrop or press X to dismiss"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
