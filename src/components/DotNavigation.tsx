import React, { useEffect, useState } from "react";
import LineSidebar from "./LineSidebar";

interface SectionInfo {
  id: string;
  code: string;
  nameEn: string;
  nameVi: string;
}

const SECTIONS: SectionInfo[] = [
  { id: "hero", code: "SEC_00", nameEn: "Overview", nameVi: "Trang Chủ" },
  { id: "app-about-section", code: "SEC_01", nameEn: "Philosophy", nameVi: "Triết Lý" },
  { id: "app-services-section", code: "SEC_02", nameEn: "Capabilities", nameVi: "Dịch Vụ" },
  { id: "app-work-section", code: "SEC_03", nameEn: "Portfolio", nameVi: "Sản Phẩm" },
  { id: "app-process-section", code: "SEC_04", nameEn: "Engineering", nameVi: "Quy Trình" },
  { id: "app-pricing-section", code: "SEC_04_ALT", nameEn: "Pricing", nameVi: "Báo Giá" },
  { id: "app-technology-section", code: "SEC_05", nameEn: "Tech Stack", nameVi: "Công Nghệ" },
  { id: "app-team-section", code: "SEC_06", nameEn: "Team", nameVi: "Đội Ngũ" },
  { id: "app-testimonials-section", code: "SEC_07", nameEn: "Reviews", nameVi: "Đánh Giá" },
  { id: "app-faq-section", code: "SEC_08", nameEn: "FAQ", nameVi: "Giải Đáp" },
  { id: "app-contact-section", code: "SEC_09", nameEn: "Contact", nameVi: "Liên Hệ" }
];

interface DotNavigationProps {
  lang: "vi" | "en";
}

export default function DotNavigation({ lang }: DotNavigationProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 280; // offset to trigger slightly early for natural alignment

      let currentIdx = 0;
      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentIdx = i;
            break;
          }
        }
      }
      setActiveIdx(currentIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (index: number) => {
    const targetId = SECTIONS[index]?.id;
    if (!targetId) return;

    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const items = SECTIONS.map((sec) => (lang === "vi" ? sec.nameVi : sec.nameEn));

  return (
    <LineSidebar
      items={items}
      accentColor="#FF6A00"
      textColor="#8E8E93"
      markerColor="rgba(255, 255, 255, 0.15)"
      showIndex
      showMarker
      proximityRadius={120}
      maxShift={25}
      falloff="smooth"
      markerLength={44}
      markerGap={10}
      tickScale={0.5}
      scaleTick
      itemGap={12}
      fontSize={0.8}
      smoothing={100}
      defaultActive={0}
      activeSectionIndex={activeIdx}
      onItemClick={(index) => handleScrollTo(index)}
    />
  );
}

