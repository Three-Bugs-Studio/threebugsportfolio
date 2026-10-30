import aurelleImg from "@/assets/templates/aurelle-motors.jpg";
import voltlineImg from "@/assets/templates/voltline-garage.jpg";
import fortifyImg from "@/assets/fortifykitchen/fortify_homepage.webp";
import qmdImg from "@/assets/qmdtech/qmd_tech_homepage.webp";
import vivuImg from "@/assets/templates/vivu-travel.jpg";
import betonformImg from "@/assets/templates/betonform.jpg";
import timberaImg from "@/assets/templates/timbera.jpg";
import banhdauImg from "@/assets/templates/banhdau.jpg";
import senoiImg from "@/assets/templates/senoi.jpg";
import thanhdongImg from "@/assets/templates/thanhdong.jpg";
import tieucuImg from "@/assets/templates/tieucu.jpg";
import nepnhaImg from "@/assets/templates/nepnha.jpg";
import thienungImg from "@/assets/templates/thienung.jpg";
import vanloImg from "@/assets/templates/vanlo.jpg";
import langspaImg from "@/assets/templates/langspa.jpg";
import mamsonImg from "@/assets/templates/mamson.jpg";
import machImg from "@/assets/templates/mach.jpg";
import viaenergyImg from "@/assets/templates/viaenergy.jpg";
import lanhImg from "@/assets/templates/lanh.jpg";

// Ready-made templates shown on /templates and on the homepage showcase.
export type TemplateCategory = "ecommerce" | "food" | "booking" | "business" | "showcase";
export type Template = {
  id: string;
  cat: TemplateCategory;
  name: string;
  url: string;
  img: string;
  tag: { vi: string; en: string };
  desc: { vi: string; en: string };
};

export const TEMPLATE_CONTACT = { name: "Hoàng Đỗ", phone: "0392996307", display: "0392.996.307" };

// Filter chips, in display order; "all" is handled by the UI.
export const TEMPLATE_CATEGORIES: { id: TemplateCategory; vi: string; en: string }[] = [
  { id: "ecommerce", vi: "Bán hàng online", en: "Online stores" },
  { id: "food", vi: "Nhà hàng & ẩm thực", en: "Food & drink" },
  { id: "booking", vi: "Spa, du lịch & đặt lịch", en: "Booking & services" },
  { id: "business", vi: "Doanh nghiệp & BĐS", en: "Business & property" },
  { id: "showcase", vi: "Showroom & triển lãm", en: "Showroom & exhibition" },
];

export const TEMPLATES: Template[] = [
  {
    id: "aurelle-motors",
    cat: "showcase",
    name: "Aurelle Motors",
    url: "https://aurelle-motors.vercel.app/",
    img: aurelleImg,
    tag: { vi: "Showroom ô tô cao cấp", en: "Luxury car showroom" },
    desc: {
      vi: "Giao diện tối giản, sang trọng với video nền toàn màn hình, trưng bày bộ sưu tập xe và đặt lịch xem xe.",
      en: "Minimal, premium layout with a full-screen video hero, a curated car collection and viewing bookings.",
    },
  },
  {
    id: "voltline-garage",
    cat: "booking",
    name: "Voltline Garage",
    url: "https://voltline-garage.vercel.app/",
    img: voltlineImg,
    tag: { vi: "Gara & chăm sóc xe", en: "Garage & car care" },
    desc: {
      vi: "Website gara sửa chữa, bảo dưỡng và detailing với bảng dịch vụ, FAQ và nút đặt lịch hẹn trực tuyến.",
      en: "Garage site for servicing, repairs and detailing with a services list, FAQ and online booking.",
    },
  },
  {
    id: "fortify-kitchen",
    cat: "food",
    name: "Fortify Kitchen",
    url: "https://fortifykitchen.vercel.app/",
    img: fortifyImg,
    tag: { vi: "Nhà hàng & đặt món", en: "Restaurant & food ordering" },
    desc: {
      vi: "Website nhà hàng / bếp giao món với thực đơn, trang thông tin dinh dưỡng và luồng đặt món.",
      en: "Restaurant and delivery kitchen site with a menu, nutrition page and ordering flow.",
    },
  },
  {
    id: "qmd-tech",
    cat: "ecommerce",
    name: "QMD Tech",
    url: "https://qmd-tech.vercel.app/",
    img: qmdImg,
    tag: { vi: "Cửa hàng công nghệ / E-Commerce", en: "Tech store / E-Commerce" },
    desc: {
      vi: "Cửa hàng bán linh kiện, PC với danh mục sản phẩm, công cụ build cấu hình và thanh toán QR.",
      en: "Store for PCs and components with product catalogue, PC builder tool and QR payments.",
    },
  },
  {
    id: "vivu-travel",
    cat: "booking",
    name: "Vivu Travel",
    url: "https://vivu-eosin.vercel.app/",
    img: vivuImg,
    tag: { vi: "Công ty du lịch / Đặt tour", en: "Travel agency / Tour booking" },
    desc: {
      vi: "Website du lịch với tour trong nước & nước ngoài, combo máy bay + khách sạn, cẩm nang và ô tìm tour theo điểm đến, ngày đi.",
      en: "Travel site with domestic and international tours, flight + hotel combos, travel guides and a tour search by destination and date.",
    },
  },
  {
    id: "betonform",
    cat: "business",
    name: "Betonform",
    url: "https://betonform-three.vercel.app/",
    img: betonformImg,
    tag: { vi: "Xây dựng & Hạ tầng", en: "Construction & Infrastructure" },
    desc: {
      vi: "Website công ty xây dựng phong cách hiện đại, giới thiệu năng lực thi công công trình thương mại, công nghiệp và hạ tầng.",
      en: "Modern construction company site showcasing commercial, industrial and infrastructure projects.",
    },
  },
  {
    id: "timbera",
    cat: "business",
    name: "Timbera",
    url: "https://timbera-two.vercel.app/",
    img: timberaImg,
    tag: { vi: "Vật liệu gỗ & Nội thất", en: "Wood materials & Interiors" },
    desc: {
      vi: "Website sang trọng cho thương hiệu vật liệu gỗ, ván, sàn gỗ nội ngoại thất với bộ sưu tập sản phẩm nổi bật.",
      en: "Premium site for a wood materials brand: panels, flooring and interior / exterior collections.",
    },
  },
  {
    id: "banhdau",
    cat: "food",
    name: "Bánh Đâu",
    url: "https://banhdau.vercel.app/",
    img: banhdauImg,
    tag: { vi: "Tìm tiệm bánh / Ẩm thực", en: "Bakery finder / Food" },
    desc: {
      vi: "Ứng dụng tìm tiệm bánh quanh bạn: tìm theo món, lọc tiệm đang mở cửa, xếp theo khoảng cách, thực đơn và lưu tiệm yêu thích.",
      en: "Bakery finder: search by item, filter shops open now, sort by distance, view menus and save favourite shops.",
    },
  },
  {
    id: "senoi",
    cat: "ecommerce",
    name: "Sen Ơi",
    url: "https://senoi.vercel.app/",
    img: senoiImg,
    tag: { vi: "Pet shop / E-Commerce", en: "Pet shop / E-Commerce" },
    desc: {
      vi: "Cửa hàng đồ dùng cho chó mèo: lọc theo thú cưng, danh mục, giá, giỏ hàng với mã giảm giá, phí giao theo tỉnh và đặt hàng COD / chuyển khoản.",
      en: "Pet supplies store: filter by pet, category and price, a cart with voucher codes, shipping by province and COD / bank transfer checkout.",
    },
  },
  {
    id: "thanhdong",
    cat: "showcase",
    name: "Thành Đồng",
    url: "https://thanhdong.vercel.app/",
    img: thanhdongImg,
    tag: { vi: "Triển lãm / Bảo tàng", en: "Exhibition / Museum" },
    desc: {
      vi: "Triển lãm khí tài Việt Nam: tra cứu thông số, lọc theo quân chủng, nguồn gốc, nhà sản xuất, lập lộ trình tham quan và đặt vé đoàn với mã ưu đãi.",
      en: "Military exhibition: browse specs, filter by branch, origin and maker, build a visit route and book group tickets with promo codes.",
    },
  },
  {
    id: "tieucu",
    cat: "ecommerce",
    name: "Tiêu Cự",
    url: "https://tieucu.vercel.app/",
    img: tieucuImg,
    tag: { vi: "Cửa hàng máy ảnh / E-Commerce", en: "Camera store / E-Commerce" },
    desc: {
      vi: "Cửa hàng máy film, máy lấy liền và máy số: lọc theo loại, hãng, máy mới/cũ, trả góp 0%, giỏ hàng với mã giảm giá và phiếu gửi tráng – scan phim tính giá trực tiếp.",
      en: "Camera store for film, instant and digital cameras: filter by type, brand and new/used, 0% instalments, a cart with vouchers and a film-lab drop-off ticket with live pricing.",
    },
  },
  {
    id: "nepnha",
    cat: "business",
    name: "Nếp Nhà",
    url: "https://nepnha-three.vercel.app/",
    img: nepnhaImg,
    tag: { vi: "Bất động sản / Môi giới", en: "Real estate / Brokerage" },
    desc: {
      vi: "Sàn nhà đất mua – thuê: tìm theo khu vực, loại hình, giá, số phòng, đặt lịch xem nhà theo khung giờ, ước tính khoản vay và form ký gửi cho chủ nhà.",
      en: "Buy and rent property listings: search by city, type, price and bedrooms, book viewing slots, estimate mortgage payments and a consign form for owners.",
    },
  },
  {
    id: "thienung",
    cat: "showcase",
    name: "Thiên Ưng",
    url: "https://thienung.vercel.app/",
    img: thienungImg,
    tag: { vi: "Giới thiệu máy bay / Hàng không", en: "Aircraft showcase / Aviation" },
    desc: {
      vi: "Trang giới thiệu tiêm kích Su-30MK2 và đội bay: số liệu, thiết kế, bảng thông số, lọc theo loại, hãng và tình trạng biên chế, so sánh tối đa ba máy bay song song.",
      en: "Showcase site for the Su-30MK2 and its fleet: key figures, design, full spec sheets, filters by type, maker and service status, and a side-by-side comparison of up to three aircraft.",
    },
  },
  {
    id: "vanlo",
    cat: "business",
    name: "Vạn Lộ Logistics",
    url: "https://vanlo.vercel.app/",
    img: vanloImg,
    tag: { vi: "Công ty logistics / Vận tải", en: "Logistics / Freight company" },
    desc: {
      vi: "Website công ty logistics với container 3D, tra cứu vận đơn theo hành trình, tính cước đường biển, hàng không, đường bộ, đặt lịch lấy hàng và cổng khách hàng có biểu đồ chi phí.",
      en: "Logistics company site with 3D containers, shipment tracking with a full timeline, a sea, air and road freight calculator, pickup booking and a customer portal with cost charts.",
    },
  },
  {
    id: "langspa",
    cat: "booking",
    name: "Lặng Spa",
    url: "https://langspa.vercel.app/",
    img: langspaImg,
    tag: { vi: "Spa / Chăm sóc sức khỏe", en: "Spa / Wellness" },
    desc: {
      vi: "Website spa với đặt lịch 4 bước: chọn dịch vụ, chi nhánh, kỹ thuật viên và giờ trống, mã ưu đãi, huỷ lịch, giỏ sản phẩm chăm sóc tại nhà và khung tư vấn 24/7.",
      en: "Spa site with 4-step booking: pick a treatment, branch, therapist and free time slot, voucher codes, cancellation, a home-care product cart and a 24/7 chat helper.",
    },
  },
  {
    id: "mamson",
    cat: "food",
    name: "Mâm Son",
    url: "https://mamson.vercel.app/",
    img: mamsonImg,
    tag: { vi: "Nhà hàng / Fine dining", en: "Restaurant / Fine dining" },
    desc: {
      vi: "Website nhà hàng Việt đương đại: thực đơn lọc và tìm không dấu, gọi món trước vào mâm, đặt bàn theo khung giờ còn chỗ, tra cứu và huỷ bàn, thư viện ảnh, tuyển dụng và đặt tiệc.",
      en: "Contemporary Vietnamese restaurant site: filterable menu with accent-free search, pre-order tray, table booking by live slot availability, lookup and cancel, photo gallery, careers and event enquiries.",
    },
  },
  {
    id: "mach",
    cat: "business",
    name: "Mạch",
    url: "https://mach-delta.vercel.app/",
    img: machImg,
    tag: { vi: "SaaS / Nền tảng kỹ thuật", en: "SaaS / Engineering platform" },
    desc: {
      vi: "Website SaaS cho nền tảng vận hành kỹ thuật kèm ứng dụng demo chạy thật: bảng Kanban lệnh việc kéo thả, quản lý tài sản, sự cố có đồng hồ SLA, trợ lý AI hỏi đáp trên dữ liệu, công cụ ước tính giá trị và đặt lịch demo.",
      en: "SaaS site for an engineering operations platform with a working demo app: drag-and-drop work-order board, asset health, incidents with SLA clocks, an AI assistant over the data, a value estimator and demo booking.",
    },
  },
  {
    id: "viaenergy",
    cat: "business",
    name: "Vỉa Energy",
    url: "https://viaenergy.vercel.app/",
    img: viaenergyImg,
    tag: { vi: "Dầu khí / Quan hệ nhà đầu tư", en: "Oil & gas / Investor relations" },
    desc: {
      vi: "Website doanh nghiệp thăm dò khai thác dầu khí: bản đồ mỏ ngoài khơi tương tác, danh mục dự án lọc theo bể và trạng thái, biểu đồ giá cổ phiếu và kết quả kinh doanh, thư viện tài liệu PDF có form thu thông tin, mô phỏng lợi suất và đặt lịch gọi với IR.",
      en: "Oil & gas E&P company site: interactive offshore field map, project portfolio filtered by basin and status, share price and financial charts, a PDF document library behind a lead form, a return simulator and IR call booking.",
    },
  },
  {
    id: "lanh",
    cat: "ecommerce",
    name: "Nhà thuốc Lành",
    url: "https://lanh-psi.vercel.app/",
    img: lanhImg,
    tag: { vi: "Nhà thuốc / Y tế trực tuyến", en: "Pharmacy / Online healthcare" },
    desc: {
      vi: "Website nhà thuốc trực tuyến: tìm thuốc không dấu có gợi ý, lọc theo nhu cầu sức khỏe, giỏ hàng với mã giảm giá và giao nhanh theo tỉnh thành, gửi ảnh đơn thuốc cho dược sĩ, theo dõi đơn và đặt lịch dịch vụ sức khỏe.",
      en: "Online pharmacy site: accent-free medicine search with suggestions, filters by health need, cart with vouchers and delivery by city, prescription upload for pharmacists, order tracking and health service booking.",
    },
  },
];
