import React, { useState, useEffect } from "react";
import { TRANSLATIONS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { FaPaperPlane, FaArrowUpRightFromSquare, FaCheck, FaCircleExclamation, FaCoins } from "react-icons/fa6";
import ZaloQRImg from "@/assets/zalo/zalo_qr.webp";

interface ContactProps {
  lang: "vi" | "en";
}

export default function Contact({ lang }: ContactProps) {
  const t = TRANSLATIONS[lang];

  // Selected option index: 0, 1, 2
  const [budgetIndex, setBudgetIndex] = useState<number>(1);
  const [currency, setCurrency] = useState<"VND" | "USD">("VND");
  const [exchangeRate, setExchangeRate] = useState<number>(26299.87);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rates && data.rates.VND) {
          setExchangeRate(data.rates.VND);
        }
      })
      .catch((err) => console.error("Error fetching exchange rate:", err));
  }, []);

  // Listen for pricing plan selection events
  useEffect(() => {
    const handlePlanSelected = (e: Event) => {
      const customEvt = e as CustomEvent;
      if (customEvt && customEvt.detail) {
        const { planId, planName, phaseNumber, priceVnd } = customEvt.detail;
        
        // Map planId to budget option
        if (planId === "phase_1_mvp") setBudgetIndex(0);
        else if (planId === "phase_2_fullstack") setBudgetIndex(1);
        else if (planId === "phase_3_enterprise") setBudgetIndex(2);

        setFormData((prev) => ({
          ...prev,
          message: lang === "vi" 
            ? `[Đăng ký ${phaseNumber}: ${planName} - Chi phí: ${priceVnd}]\nTôi muốn tư vấn thêm chi tiết về lộ trình triển khai gói này.`
            : `[Selected ${phaseNumber}: ${planName} - Rate: ${priceVnd}]\nI would like further details regarding project execution for this plan.`
        }));
      }
    };

    window.addEventListener("select_pricing_plan", handlePlanSelected);
    return () => {
      window.removeEventListener("select_pricing_plan", handlePlanSelected);
    };
  }, [lang]);

  const budgetOptions = [
    t.contactBudgetRange1,
    t.contactBudgetRange2,
    t.contactBudgetRange3,
  ];

  // Rates and raw values for internal mapping/display
  const rawVND = [
    "Từ 8 đến 10 triệu VND (Website cơ bản)",
    "Từ 15 đến 20 triệu VND (Đầy đủ chức năng)",
    "Thương lượng qua email hoặc Zalo (Dự án App)"
  ];
  const rawUSD = [
    `About $${Math.round(8000000 / exchangeRate)} to $${Math.round(10000000 / exchangeRate)} USD (Basic Website)`,
    `About $${Math.round(15000000 / exchangeRate)} to $${Math.round(20000000 / exchangeRate)} USD (Full Website)`,
    "Negotiable via email or Zalo (App Build)"
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = lang === "vi" ? "Vui lòng nhập tên của bạn" : "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = lang === "vi" ? "Vui lòng nhập email" : "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = lang === "vi" ? "Địa chỉ email không đúng định dạng" : "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      newErrors.message = lang === "vi" ? "Vui lòng nhập mô tả yêu cầu" : "Message details are required";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Build the mailto link content
    const selectedBudget = currency === "VND" ? rawVND[budgetIndex] : rawUSD[budgetIndex];

    const subject = encodeURIComponent(`[Three Bugs Inquiry] Project Proposal by ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Company/Venture: ${formData.company || "None"}\n` +
      `Budget Range: ${selectedBudget}\n\n` +
      `Project Requirements:\n${formData.message}`
    );

    // Redirect to trigger client's email application
    window.location.href = `mailto:dongduong840@gmail.com?subject=${subject}&body=${body}`;

    // Mark as submitted to show the success panel
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as they type
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#090909] border-t border-white/5 relative">
      <div className="absolute top-[10%] left-[20%] brutalist-glow opacity-25" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct Call-out (Grid-Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange">
                  {t.contactLabel}
                </span>
                <span className="h-[1px] w-12 bg-white/10" />
              </div>

              <h2 className="font-display font-medium text-4xl md:text-5xl tracking-tight text-[#F5F5F3] leading-[1.1] mb-6">
                {t.contactHeading}
              </h2>
              
              <p className="font-sans text-sm md:text-base text-[#8E8E93] font-light leading-relaxed max-w-sm mb-8">
                {t.contactSubtitle}
              </p>
            </div>

            {/* Direct Contact details */}
            <div className="border-t border-white/5 pt-8 flex flex-wrap gap-x-12 gap-y-6">
              <div className="space-y-4">
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-brand-orange uppercase block mb-1">
                    STUDIO INBOX
                  </span>
                  <a href="mailto:dongduong840@gmail.com" className="font-sans text-sm text-[#F5F5F3] hover:text-brand-orange transition-colors interactive">
                    dongduong840@gmail.com
                  </a>
                </div>
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-[#8E8E93] uppercase block mb-1">
                    OPERATING MODEL
                  </span>
                  <span className="font-sans text-sm text-[#F5F5F3] tracking-wide">
                    100% REMOTE
                  </span>
                </div>
              </div>

              <div>
                <span className="font-mono text-[9px] tracking-widest text-[#8E8E93] uppercase block mb-1.5">
                  {lang === "vi" ? "QUÉT MÃ ZALO LIÊN HỆ" : "ZALO QUICK CONTACT"}
                </span>
                <div className="relative group/zalo w-24 h-24 bg-[#121212] border border-white/10 rounded-sm p-1 transition-all hover:border-brand-orange/30 shadow-lg">
                  <img
                    src={ZaloQRImg}
                    alt="Zalo QR Code"
                    className="w-full h-full object-cover rounded-[1px]"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/zalo:opacity-100 flex items-center justify-center transition-opacity rounded-[1px] pointer-events-none">
                    <span className="font-mono text-[6.5px] text-brand-orange tracking-widest uppercase font-bold">
                      {lang === "vi" ? "QUÉT ĐỂ CHAT" : "SCAN TO CHAT"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form Panel (Grid-Span 7) */}
          <div className="lg:col-span-7">
            <div className="bg-[#121212]/30 border border-white/5 p-8 md:p-10 rounded-sm hover:border-white/10 transition-all duration-300 relative">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                  >
                    {/* Grid Inputs: Name & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name-input" className="font-mono text-[10px] tracking-widest text-[#C0C0C5] uppercase block mb-2">
                          {t.contactFieldName} <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          id="name-input"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full bg-[#090909]/60 border px-4 py-3 text-sm text-[#F5F5F3] rounded-sm focus:outline-none transition-all ${
                            errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-brand-orange"
                          }`}
                          placeholder="Alex Mercer"
                        />
                        {errors.name && (
                          <span className="font-mono text-[9px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                          </span>
                        )}
                      </div>

                      <div>
                        <label htmlFor="company-input" className="font-mono text-[10px] tracking-widest text-[#C0C0C5] uppercase block mb-2">
                          {t.contactFieldCompany}
                        </label>
                        <input
                          id="company-input"
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full bg-[#090909]/60 border border-white/5 focus:border-brand-orange px-4 py-3 text-sm text-[#F5F5F3] rounded-sm focus:outline-none transition-all"
                          placeholder="MetaLabs Inc."
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div>
                      <label htmlFor="email-input" className="font-mono text-[10px] tracking-widest text-[#C0C0C5] uppercase block mb-2">
                        {t.contactFieldEmail} <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-[#090909]/60 border px-4 py-3 text-sm text-[#F5F5F3] rounded-sm focus:outline-none transition-all ${
                          errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-brand-orange"
                        }`}
                        placeholder="alex@metalabs.com"
                      />
                      {errors.email && (
                        <span className="font-mono text-[9px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                        </span>
                      )}
                    </div>



                    {/* Budget Options Selector with Currency Switcher */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <label className="font-mono text-[10px] tracking-widest text-[#C0C0C5] uppercase block">
                          {t.contactFieldBudget}
                        </label>

                        {/* High-end Currency Switcher Trigger */}
                        <div className="flex items-center gap-1 bg-[#090909]/80 border border-white/5 rounded-sm p-0.5">
                          <button
                            type="button"
                            onClick={() => setCurrency("VND")}
                            className={`px-3 py-1 text-[9px] font-mono rounded-sm transition-all relative ${
                              currency === "VND"
                                ? "bg-brand-orange/15 text-brand-orange border border-brand-orange/25 font-bold"
                                : "text-[#8E8E93] hover:text-[#F5F5F3]"
                            }`}
                          >
                            VND (₫)
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrency("USD")}
                            className={`px-3 py-1 text-[9px] font-mono rounded-sm transition-all relative ${
                              currency === "USD"
                                ? "bg-brand-orange/15 text-brand-orange border border-brand-orange/25 font-bold"
                                : "text-[#8E8E93] hover:text-[#F5F5F3]"
                            }`}
                          >
                            USD ($)
                          </button>
                        </div>
                      </div>

                      {/* Displaying Options with real time cross conversion text */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                        {budgetOptions.map((opt, oIdx) => {
                          const isSelected = budgetIndex === oIdx;
                          const labelText = currency === "VND" ? rawVND[oIdx] : rawUSD[oIdx];
                          const convertedText = currency === "VND" ? rawUSD[oIdx] : rawVND[oIdx];

                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => setBudgetIndex(oIdx)}
                              className={`py-3 px-4 text-left border rounded-sm transition-all focus:outline-none flex flex-col justify-between h-16 ${
                                oIdx === 2 ? "sm:col-span-2" : ""
                              } ${
                                isSelected
                                  ? "bg-brand-orange/15 border-brand-orange text-brand-orange"
                                  : "bg-[#090909]/40 border-white/5 text-[#8E8E93] hover:border-white/10 hover:text-[#F5F5F3]"
                              }`}
                            >
                              <span className="font-sans text-xs font-semibold tracking-wide">
                                {labelText}
                              </span>
                              <span className="font-mono text-[8px] opacity-60 tracking-wider">
                                {lang === "vi" ? "Quy đổi: " : "Converted: "} {convertedText}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Faint subtext stating exchange rate standard */}
                      <span className="font-mono text-[8px] text-[#8E8E93]/70 tracking-wide mt-1 block">
                        * {lang === "vi" 
                          ? `Tỷ giá quy đổi thời gian thực: 1 USD ≈ ${Math.round(exchangeRate).toLocaleString()} VND (Nguồn: ExchangeRate API)` 
                          : `Real-time exchange rate: 1 USD ≈ ${Math.round(exchangeRate).toLocaleString()} VND (Source: ExchangeRate API)`}
                      </span>
                    </div>

                    {/* Project details / Message input */}
                    <div>
                      <label htmlFor="message-input" className="font-mono text-[10px] tracking-widest text-[#C0C0C5] uppercase block mb-2">
                        {t.contactFieldMessage} <span className="text-brand-orange">*</span>
                      </label>
                      <textarea
                        id="message-input"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full bg-[#090909]/60 border px-4 py-3 text-sm text-[#F5F5F3] rounded-sm focus:outline-none transition-all resize-none ${
                          errors.message ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-brand-orange"
                        }`}
                        placeholder={
                          lang === "vi"
                            ? "Vui lòng mô tả chi tiết chức năng sản phẩm, ngăn xếp công nghệ mong muốn, tiến độ bàn giao..."
                            : "Please describe the product functionality, target stack, timelines, and main challenges..."
                        }
                      />
                      {errors.message && (
                        <span className="font-mono text-[9px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-stacked w-full mt-4 font-mono text-xs uppercase tracking-widest px-8 py-4 bg-[#F5F5F3] hover:bg-[#F5F5F3]/90 text-[#090909] font-semibold rounded-sm inline-flex items-center justify-center gap-2 transition-all relative overflow-hidden group disabled:opacity-50 interactive"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-[#090909]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t.contactSendingBtn}
                        </span>
                      ) : (
                        <>
                          {t.contactSendBtn}
                          <FaArrowUpRightFromSquare className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-brand-orange" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="contact-success"
                    className="flex flex-col items-center text-center py-12"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    id="contact-success-panel"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-6">
                      <FaCheck className="w-6 h-6 stroke-[3]" />
                    </div>

                    <h3 className="font-display font-medium text-2xl text-[#F5F5F3] mb-4">
                      {t.contactSuccessTitle}
                    </h3>

                    <p className="font-sans text-xs md:text-sm text-[#8E8E93] font-light leading-relaxed max-w-sm mb-8">
                      {t.contactSuccessMessage}
                    </p>

                    <div className="p-4 bg-[#090909]/40 border border-white/5 rounded-sm w-full max-w-xs text-left mb-8">
                      <span className="font-mono text-[8px] text-[#8E8E93] uppercase block mb-2">
                        {lang === "vi" ? "TIẾN TRÌNH TIẾP THEO" : "WHAT HAPPENS NEXT"}
                      </span>
                      <ul className="flex flex-col gap-2 font-sans text-xs text-[#F5F5F3] font-light">
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-brand-orange rounded-full" />
                          {lang === "vi" ? "Xem xét cấu trúc tham số hệ thống." : "Reviewing system architecture parameters."}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-brand-orange rounded-full" />
                          {lang === "vi" ? "Phân tích ngân sách và tối ưu hóa giải pháp." : "Analyzing budget allocation options."}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-brand-orange rounded-full" />
                          {lang === "vi" ? "Người sáng lập phản hồi trong vòng 12 giờ." : "Founder response within 12 hours."}
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => {
                        setFormData({
                          name: "",
                          email: "",
                          company: "",
                          message: "",
                        });
                        setBudgetIndex(1);
                        setIsSubmitted(false);
                      }}
                      className="font-mono text-[10px] uppercase tracking-widest px-6 py-2.5 bg-transparent border border-white/10 hover:border-brand-orange/50 text-[#8E8E93] hover:text-[#F5F5F3] transition-colors rounded-sm interactive"
                    >
                      {lang === "vi" ? "Gửi một yêu cầu khác" : "Transmit another form"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
